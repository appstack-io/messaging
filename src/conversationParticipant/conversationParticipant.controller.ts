import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod, Payload, RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { ConversationParticipantLogic } from './conversationParticipant.logic';
import {
  ConversationParticipant,
  ConversationParticipantCreateOneInput,
  ConversationParticipantFindByConversationInput,
  ConversationParticipantFindByConversationResult,
  ConversationParticipantFindOneInput,
  ConversationParticipantRemoveOneInput,
} from '../combined.interfaces';
import {
  RpcAuthAlsoOwnedByInterceptor,
  RpcAuthAlsoWriteableAsInterceptor,
  RpcAuthEntityAssertReadableInterceptor,
  RpcAuthEntityAssertWriteableInterceptor,
  RpcAuthEntityCreateOwnershipInterceptor,
  RpcAuthRequiredInterceptor,
} from '@appstack-io/authnz';
import {
  RpcRateLimitReadInterceptor,
  RpcRateLimitWriteInterceptor,
} from '@appstack-io/limits';

@Controller()
export class ConversationParticipantController {
  constructor(private logic: ConversationParticipantLogic) {}

  @UseInterceptors(
    RpcAuthEntityAssertReadableInterceptor,
    RpcRateLimitReadInterceptor,
  )
  @GrpcMethod('ConversationParticipantService', 'FindOne')
  async findOne(
    @Payload() input: ConversationParticipantFindOneInput,
  ): Promise<ConversationParticipant> {
    const found = await this.logic.findOne(input);
    if (!found) {
      throw new RpcException({
        message: 'not found',
        code: grpc.status.NOT_FOUND,
      });
    }
    return found;
  }

  @UseInterceptors(
    new RpcAuthAlsoWriteableAsInterceptor({
      entity: 'conversation',
      entityIdPath: 'conversationId',
    }),
    RpcAuthEntityAssertWriteableInterceptor,
    new RpcAuthAlsoOwnedByInterceptor({
      permittedEntity: 'user',
      permittedEntityIdPath: 'participantId',
    }),
    RpcAuthEntityCreateOwnershipInterceptor,
    RpcRateLimitWriteInterceptor,
  )
  @GrpcMethod('ConversationParticipantService', 'CreateOne')
  async createOne(
    @Payload() input: ConversationParticipantCreateOneInput,
  ): Promise<ConversationParticipant> {
    return await this.logic.createOne(input);
  }

  @UseInterceptors(
    RpcAuthEntityAssertWriteableInterceptor,
    RpcRateLimitWriteInterceptor,
  )
  @GrpcMethod('ConversationParticipantService', 'RemoveOne')
  async removeOne(
    @Payload() input: ConversationParticipantRemoveOneInput,
  ): Promise<ConversationParticipant> {
    const removed = await this.logic.removeOne(input);
    if (!removed) {
      throw new RpcException({
        message: 'not found',
        code: grpc.status.NOT_FOUND,
      });
    }
    return removed;
  }

  @UseInterceptors(RpcAuthRequiredInterceptor, RpcRateLimitReadInterceptor)
  @GrpcMethod('ConversationParticipantService', 'FindByConversation')
  async findByConversation(
    @Payload() input: ConversationParticipantFindByConversationInput,
  ): Promise<ConversationParticipantFindByConversationResult> {
    const result = await this.logic.findByConversation(input);
    return result;
  }
}
