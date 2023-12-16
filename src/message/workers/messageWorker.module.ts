import { Module } from '@nestjs/common';
import { MessageWorkerService } from './messageWorker.service';
import { MqModule } from '@appstack-io/mq';
import { PubsubModule } from '@appstack-io/pubsub';
import { MessageModule } from '../message.module';
import { ConversationParticipantModule } from '../../conversationParticipant/conversationParticipant.module';
import { IntegrityWorkerModule } from '@appstack-io/integrity';

@Module({
  imports: [
    PubsubModule,
    MqModule,
    MessageModule,
    ConversationParticipantModule,
    IntegrityWorkerModule,
  ],
  providers: [MessageWorkerService],
})
export class MessageWorkerModule {
  static getDirname() {
    return __dirname;
  }
}
