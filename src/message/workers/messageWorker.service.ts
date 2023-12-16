import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MqService } from '@appstack-io/mq';
import { Job } from 'bullmq';
import { WorkerJobData } from '@appstack-io/workers';
import { MessageJobPayload } from '../../combined';
import { PubsubService } from '@appstack-io/pubsub';
import { MessageService } from '../message.service';
import { ConversationParticipantService } from '../../conversationParticipant/conversationParticipant.service';

export type MessageJobData = WorkerJobData<MessageJobPayload>;

@Injectable()
export class MessageWorkerService implements OnModuleInit {
  private logger: Logger = new Logger(MessageWorkerService.name);
  constructor(
    private mq: MqService,
    private pubsub: PubsubService,
    private messageService: MessageService,
    private conversationParticipantService: ConversationParticipantService,
  ) {}

  async onJob(messageJobData: MessageJobData): Promise<void> {
    const { data } = messageJobData;
    const message = await this.messageService.findOne({ id: data.id });
    if (!message) {
      this.logger.warn(`message ${data.id} not found`);
      return;
    }
    const participants =
      await this.conversationParticipantService.findByConversation({
        filter: { conversationId: message.conversationId },
        opts: { limit: 99999, offset: 0 },
      });
    const participantIds = participants.results.map((p) => p.participantId);
    this.pubsub.publishToUsers('message.published', participantIds, message);
  }

  async onModuleInit(): Promise<void> {
    await this.mq.startWorker({
      queue: 'message.published',
      handler: async (job: Job) => {
        const { data, id } = job;
        const messageJobData: MessageJobData = {
          jobId: id,
          data,
        };
        await this.onJob(messageJobData);
      },
    });
  }
}
