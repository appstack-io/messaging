import { Global, Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationLogic } from './conversation.logic';
import { LimitsModule } from '@appstack-io/limits';
import { PermissionModule } from '@appstack-io/permissions';

@Global()
@Module({
  imports: [LimitsModule, PermissionModule],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationLogic],
  exports: [ConversationLogic, ConversationService],
})
export class ConversationModule {}
