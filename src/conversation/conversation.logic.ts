import { Injectable } from '@nestjs/common';
import {
  Conversation,
  ConversationCreateOneInput,
  ConversationFindByParticipantInput,
  ConversationFindByParticipantResult,
  ConversationFindOneInput,
  ConversationRemoveOneInput,
  ConversationUpdateOneInput,
} from '../combined.interfaces';
import { ConversationService } from './conversation.service';

@Injectable()
export class ConversationLogic {
  constructor(private service: ConversationService) {}

  async createOne(input: ConversationCreateOneInput): Promise<Conversation> {
    const created = await this.service.createOne(input);
    return created;
  }

  async findOne(input: ConversationFindOneInput): Promise<Conversation | void> {
    return await this.service.findOne(input);
  }

  async updateOne(input: ConversationUpdateOneInput): Promise<Conversation> {
    return await this.service.updateOne(input);
  }

  async removeOne(
    input: ConversationRemoveOneInput,
  ): Promise<Conversation | void> {
    return await this.service.removeOne(input);
  }

  async findByParticipant(
    input: ConversationFindByParticipantInput,
  ): Promise<ConversationFindByParticipantResult> {
    return await this.service.findByParticipant(input);
  }
}
