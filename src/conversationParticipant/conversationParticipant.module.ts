import { Global, Module } from '@nestjs/common';
import { ConversationParticipantController } from './conversationParticipant.controller';
import { ConversationParticipantService } from './conversationParticipant.service';
import { ConversationParticipantLogic } from './conversationParticipant.logic';
import { LimitsModule } from '@appstack-io/limits';

@Global()
@Module({
  imports: [LimitsModule],
  controllers: [ConversationParticipantController],
  providers: [ConversationParticipantService, ConversationParticipantLogic],
  exports: [],
})
export class ConversationParticipantModule {}
