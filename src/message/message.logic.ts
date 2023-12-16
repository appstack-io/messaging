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
import { MqService } from '@appstack-io/mq';
import { ConversationService } from '../conversation/conversation.service';

@Injectable()
export class MessageLogic {
  constructor(
    private service: MessageService,
    private mq: MqService,
    private conversationService: ConversationService,
  ) {}

  async createOne(input: MessageCreateOneInput): Promise<Message> {
    const conversation = await this.conversationService.findOne({
      id: input.conversationId,
    });
    if (!conversation) {
      throw new Error(`conversation ${input.conversationId} not found`);
    }
    const created = await this.service.createOne(input);
    await this.conversationService.updateOne({
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
    const conversation = await this.conversationService.findOne({
      id: updated.conversationId,
    });
    if (!conversation) {
      throw new Error(`conversation ${updated.conversationId} not found`);
    }
    await this.conversationService.updateOne({
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
