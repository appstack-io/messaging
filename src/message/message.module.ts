import { Global, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageLogic } from './message.logic';
import { MqModule } from '@appstack-io/mq';
import { LimitsModule } from '@appstack-io/limits';
import { ConversationModule } from '../conversation/conversation.module';
import { PermissionModule } from '@appstack-io/permissions';

@Global()
@Module({
  imports: [LimitsModule, MqModule, ConversationModule, PermissionModule],
  controllers: [MessageController],
  providers: [MessageService, MessageLogic],
  exports: [MessageService, MessageLogic],
})
export class MessageModule {}
