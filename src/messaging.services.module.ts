import { Module } from '@nestjs/common';
import { ArangodbModule } from '@appstack-io/arangodb';
import { ClientModule } from '@appstack-io/client';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { ConversationParticipantModule } from './conversationParticipant/conversationParticipant.module';

@Module({
  imports: [
    MessageModule,
    ConversationModule,
    ConversationParticipantModule,
    ArangodbModule,
    ClientModule,
  ],
})
export class MessagingServicesModule {
  static getDirname() {
    return __dirname;
  }
}
