import { Global, Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationLogic } from './conversation.logic';
import { LimitsModule } from '@appstack-io/limits';

@Global()
@Module({
  imports: [LimitsModule],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationLogic],
  exports: [],
})
export class ConversationModule {}
