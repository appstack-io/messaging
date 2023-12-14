import { Injectable, OnModuleInit } from '@nestjs/common';
import { ArangodbService } from '@appstack-io/arangodb';
import { DocumentCollection } from 'arangojs/collection';
import {
  Conversation,
  ConversationCreateOneInput,
  ConversationFindByParticipantInput,
  ConversationFindByParticipantResult,
  ConversationFindOneInput,
  ConversationRemoveOneInput,
  ConversationUpdateOneInput,
} from '../combined.interfaces';

@Injectable()
export class ConversationService implements OnModuleInit {
  conversationCollection: DocumentCollection;

  constructor(private arangodb: ArangodbService) {
    this.conversationCollection = this.arangodb.db.collection('conversation');
  }

  async createOne(input: ConversationCreateOneInput): Promise<Conversation> {
    return this.arangodb.utils.format(
      (
        await this.conversationCollection.save(
          this.arangodb.utils.addTs(input),
          {
            returnNew: true,
          },
        )
      ).new,
    );
  }

  async findOne(input: ConversationFindOneInput): Promise<Conversation | void> {
    try {
      return this.arangodb.utils.format(
        await this.conversationCollection.document(input.id),
      );
    } catch (e) {
      if (e.message === 'document not found') {
        return;
      }
      throw e;
    }
  }

  async updateOne(
    input: Partial<
      ConversationUpdateOneInput & {
        isTemp: boolean;
        integrityWarning: boolean;
      }
    >,
  ): Promise<Conversation> {
    return this.arangodb.utils.format(
      (
        await this.conversationCollection.update(
          input.id,
          this.arangodb.utils.addUpdatedAt(input),
          { returnNew: true },
        )
      ).new,
    );
  }

  async removeOne(
    input: ConversationRemoveOneInput,
  ): Promise<Conversation | void> {
    const found = await this.findOne(input);
    if (found) {
      await this.conversationCollection.remove(found.id);
      return found;
    }
  }

  async findByParticipant(
    input: ConversationFindByParticipantInput,
  ): Promise<ConversationFindByParticipantResult> {
    const { filter, opts } = input;
    const query = `
      FOR p IN conversationParticipant
      FILTER p.participantId == @participantId
        FOR c in conversation
        FILTER c.id == p.conversationId
        AND c.lastMessageAt >= @fromLastMessageAt
      LIMIT @offset, @limit
      RETURN c
    `;
    const vars = {
      ...filter,
      offset: Number(opts.offset) || 0,
      limit: Number(opts.limit) || 0,
    };
    const cursor = await this.arangodb.db.query(query, vars);
    const results = (await cursor.all()).map(this.arangodb.utils.format);
    return {
      meta: { offset: results.length },
      results,
    };
  }

  async onModuleInit(): Promise<void> {
    await this.arangodb.utils.tryDdl(
      () => this.arangodb.db.createCollection('conversation', {}),
      () =>
        this.arangodb.db.collection('conversation').ensureIndex({
          name: 'idx-conversation-v6',
          type: 'persistent',
          fields: ['id', 'lastMessageAt'],
        }),
    );
  }
}
