import { Injectable } from '@nestjs/common';
import {
  Message,
  MessageCreateOneInput,
  MessageFindByConversationInput,
  MessageFindOneInput,
  MessageFindUniqueInput,
  MessageRemoveOneInput,
  MessageUpdateOneInput,
} from '../combined.interfaces';
import { MessageService } from './message.service';
import {
  ClientService,
  ConversationServiceClient,
  ConversationServiceDefinition,
} from '@appstack-io/client';
import { MqService } from '@appstack-io/mq';

@Injectable()
export class MessageLogic {
  private conversationServiceClient: ConversationServiceClient;

  constructor(
    private service: MessageService,
    private clientService: ClientService,
    private mq: MqService,
  ) {
    this.conversationServiceClient =
      this.clientService.getServiceInternalClient<ConversationServiceClient>(
        ConversationServiceDefinition,
      );
  }

  async createOne(input: MessageCreateOneInput): Promise<Message> {
    const conversation = await this.conversationServiceClient.findOne({
      id: input.conversationId,
    });
    const created = await this.service.createOne(input);
    await this.conversationServiceClient.updateOne({
      id: conversation.id,
      lastMessageAt: created.createdAt,
    });
    this.mq.publish({
      queue: 'message.published',
      message: { id: created.id },
    });
    return created;
  }

  async findOne(input: MessageFindOneInput): Promise<Message | void> {
    return await this.service.findOne(input);
  }

  async findUnique(input: MessageFindUniqueInput): Promise<Message | void> {
    return await this.service.findUnique(input);
  }

  async updateOne(input: MessageUpdateOneInput): Promise<Message> {
    const updated = await this.service.updateOne(input);
    const conversation = await this.conversationServiceClient.findOne({
      id: updated.conversationId,
    });
    await this.conversationServiceClient.updateOne({
      id: conversation.id,
      lastMessageAt: updated.updatedAt,
    });
    this.mq.publish({
      queue: 'message.published',
      message: { id: updated.id },
    });
    return updated;
  }

  async removeOne(input: MessageRemoveOneInput): Promise<Message | void> {
    return await this.service.removeOne(input);
  }

  async findByConversation(
    input: MessageFindByConversationInput,
  ): Promise<Message[]> {
    return await this.service.findByConversation(input);
  }
}
