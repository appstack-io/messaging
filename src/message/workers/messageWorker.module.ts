import { Module } from '@nestjs/common';
import { MessageWorkerService } from './messageWorker.service';
import { MqModule } from '@appstack-io/mq';
import { PubsubModule } from '@appstack-io/pubsub';
import { ClientModule } from '@appstack-io/client';

@Module({
  imports: [PubsubModule, MqModule, ClientModule],
  providers: [MessageWorkerService],
})
export class MessageWorkerModule {
  static getDirname() {
    return __dirname;
  }
}
