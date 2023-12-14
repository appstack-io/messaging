import { Injectable, OnModuleInit } from '@nestjs/common';
import { ArangodbService } from '@appstack-io/arangodb';
import { DocumentCollection } from 'arangojs/collection';
import {
  ConversationParticipant,
  ConversationParticipantCreateOneInput,
  ConversationParticipantFindByConversationInput,
  ConversationParticipantFindByConversationResult,
  ConversationParticipantFindOneInput,
  ConversationParticipantRemoveOneInput,
} from '../combined.interfaces';

@Injectable()
export class ConversationParticipantService implements OnModuleInit {
  conversationParticipantCollection: DocumentCollection;

  constructor(private arangodb: ArangodbService) {
    this.conversationParticipantCollection = this.arangodb.db.collection(
      'conversationParticipant',
    );
  }

  async createOne(
    input: ConversationParticipantCreateOneInput,
  ): Promise<ConversationParticipant> {
    return this.arangodb.utils.format(
      (
        await this.conversationParticipantCollection.save(
          this.arangodb.utils.addTs(input),
          {
            returnNew: true,
          },
        )
      ).new,
    );
  }

  async findOne(
    input: ConversationParticipantFindOneInput,
  ): Promise<ConversationParticipant | void> {
    try {
      return this.arangodb.utils.format(
        await this.conversationParticipantCollection.document(input.id),
      );
    } catch (e) {
      if (e.message === 'document not found') {
        return;
      }
      throw e;
    }
  }

  async removeOne(
    input: ConversationParticipantRemoveOneInput,
  ): Promise<ConversationParticipant | void> {
    const found = await this.findOne(input);
    if (found) {
      await this.conversationParticipantCollection.remove(found.id);
      return found;
    }
  }

  async findByConversation(
    input: ConversationParticipantFindByConversationInput,
  ): Promise<ConversationParticipantFindByConversationResult> {
    const { filter, opts } = input;
    const query = `
      FOR p IN conversationParticipant
      FILTER p.conversationId == @conversationId
      LIMIT @offset, @limit
      RETURN p
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
      () => this.arangodb.db.createCollection('conversationParticipant', {}),
      () =>
        this.arangodb.db.collection('conversationParticipant').ensureIndex({
          name: 'idx-conversationParticipant-byParticipant-v2',
          type: 'persistent',
          fields: ['participantId'],
        }),
      () =>
        this.arangodb.db.collection('conversationParticipant').ensureIndex({
          name: 'idx-conversationParticipant-byConversation-v2',
          type: 'persistent',
          fields: ['conversationId'],
        }),
    );
  }
}
