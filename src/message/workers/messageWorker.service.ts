import { Injectable, OnModuleInit } from '@nestjs/common';
import { MqService } from '@appstack-io/mq';
import { Job } from 'bullmq';
import { WorkerJobData } from '@appstack-io/workers';
import {
  ClientService,
  ConversationParticipantServiceClient,
  ConversationParticipantServiceDefinition,
  MessageJobPayload,
  MessageServiceClient,
  MessageServiceDefinition,
} from '@appstack-io/client';
import { PubsubService } from '@appstack-io/pubsub';

export type MessageJobData = WorkerJobData<MessageJobPayload>;

@Injectable()
export class MessageWorkerService implements OnModuleInit {
  private messageServiceClient: MessageServiceClient;
  private conversationParticipantServiceClient: ConversationParticipantServiceClient;

  constructor(
    private mq: MqService,
    private clientService: ClientService,
    private pubsub: PubsubService,
  ) {
    this.messageServiceClient =
      this.clientService.getServiceInternalClient<MessageServiceClient>(
        MessageServiceDefinition,
      );

    this.conversationParticipantServiceClient =
      this.clientService.getServiceInternalClient<ConversationParticipantServiceClient>(
        ConversationParticipantServiceDefinition,
      );
  }

  async onJob(messageJobData: MessageJobData): Promise<void> {
    const { data } = messageJobData;
    const message = await this.messageServiceClient.findOne({ id: data.id });
    const participants =
      await this.conversationParticipantServiceClient.findByConversation({
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
