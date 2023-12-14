import { Injectable } from '@nestjs/common';
import {
  ConversationParticipant,
  ConversationParticipantCreateOneInput,
  ConversationParticipantFindByConversationInput,
  ConversationParticipantFindByConversationResult,
  ConversationParticipantFindOneInput,
  ConversationParticipantRemoveOneInput,
} from '../combined.interfaces';
import { ConversationParticipantService } from './conversationParticipant.service';

@Injectable()
export class ConversationParticipantLogic {
  constructor(private service: ConversationParticipantService) {}

  async createOne(
    input: ConversationParticipantCreateOneInput,
  ): Promise<ConversationParticipant> {
    const created = await this.service.createOne(input);
    return created;
  }

  async findOne(
    input: ConversationParticipantFindOneInput,
  ): Promise<ConversationParticipant | void> {
    return await this.service.findOne(input);
  }

  async removeOne(
    input: ConversationParticipantRemoveOneInput,
  ): Promise<ConversationParticipant | void> {
    return await this.service.removeOne(input);
  }

  async findByConversation(
    input: ConversationParticipantFindByConversationInput,
  ): Promise<ConversationParticipantFindByConversationResult> {
    return await this.service.findByConversation(input);
  }
}
