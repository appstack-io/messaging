import { Module, OnModuleInit } from '@nestjs/common';
import { ArangodbModule } from '@appstack-io/arangodb';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { ConversationParticipantModule } from './conversationParticipant/conversationParticipant.module';
import { MessageWorkerModule } from './message/workers/messageWorker.module';
import {
  IntegrityWarningWorkerService,
  IntegrityWorkerModule,
  RemoveTempsWorkerService,
} from '@appstack-io/integrity';
import { ConversationLogic } from './conversation/conversation.logic';

@Module({
  imports: [
    MessageModule,
    ConversationModule,
    ConversationParticipantModule,
    ArangodbModule,
    MessageWorkerModule,
    IntegrityWorkerModule,
  ],
})
export class MessagingWorkersModule implements OnModuleInit {
  constructor(
    private integrity: IntegrityWarningWorkerService,
    private removeTemps: RemoveTempsWorkerService,
    private conversationLogic: ConversationLogic,
  ) {}

  async onModuleInit() {
    await Promise.all([
      this.integrity.init('conversation', async (id: string) => {
        await this.conversationLogic.updateOne({ id });
      }),
      this.removeTemps.init('conversation'),
    ]);
  }
}
