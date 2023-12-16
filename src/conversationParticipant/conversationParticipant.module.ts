import { Global, Module } from '@nestjs/common';
import { ConversationParticipantController } from './conversationParticipant.controller';
import { ConversationParticipantService } from './conversationParticipant.service';
import { ConversationParticipantLogic } from './conversationParticipant.logic';
import { LimitsModule } from '@appstack-io/limits';
import { PermissionModule } from '@appstack-io/permissions';

@Global()
@Module({
  imports: [LimitsModule, PermissionModule],
  controllers: [ConversationParticipantController],
  providers: [ConversationParticipantService, ConversationParticipantLogic],
  exports: [ConversationParticipantService, ConversationParticipantLogic],
})
export class ConversationParticipantModule {}
