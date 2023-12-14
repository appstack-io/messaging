import { Global, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageLogic } from './message.logic';
import { MqModule } from '@appstack-io/mq';
import { LimitsModule } from '@appstack-io/limits';

@Global()
@Module({
  imports: [LimitsModule, MqModule],
  controllers: [MessageController],
  providers: [MessageService, MessageLogic],
  exports: [],
})
export class MessageModule {}
