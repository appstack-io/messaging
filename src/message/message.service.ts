import { Injectable, OnModuleInit } from '@nestjs/common';
import { ArangodbService } from '@appstack-io/arangodb';
import { DocumentCollection } from 'arangojs/collection';
import {
  Message,
  MessageCreateOneInput,
  MessageFindByConversationInput,
  MessageFindOneInput,
  MessageFindUniqueInput,
  MessageRemoveOneInput,
  MessageUpdateOneInput,
} from '../combined.interfaces'; // TODO: implement seenBy etc.

// TODO: implement seenBy etc.

@Injectable()
export class MessageService implements OnModuleInit {
  collection: DocumentCollection;

  constructor(private arangodb: ArangodbService) {
    this.collection = this.arangodb.db.collection('message');
  }

  async createOne(input: MessageCreateOneInput): Promise<Message> {
    return await this.arangodb.utils.tryCreateUnique(
      async () =>
        this.arangodb.utils.format(
          (
            await this.collection.save(this.arangodb.utils.addTs(input), {
              returnNew: true,
            })
          ).new,
        ),
      async () =>
        this.findUnique({
          uniqueness: input.uniqueness,
        }),
    );
  }

  async updateOne(input: Partial<MessageUpdateOneInput>): Promise<Message> {
    return this.arangodb.utils.format(
      (
        await this.collection.update(
          input.id,
          this.arangodb.utils.addUpdatedAt(input),
          { returnNew: true },
        )
      ).new,
    );
  }

  async findOne(input: MessageFindOneInput): Promise<Message | void> {
    try {
      return this.arangodb.utils.format(
        await this.collection.document(input.id),
      );
    } catch (e) {
      if (e.message === 'document not found') {
        return;
      }
      throw e;
    }
  }

  async findUnique(input: MessageFindUniqueInput): Promise<Message | void> {
    const { uniqueness } = input;
    const query = `
      FOR doc IN message
      FILTER doc.uniqueness == @uniqueness
      LIMIT 0, 1
      RETURN doc
    `;
    const vars = {
      uniqueness,
    };
    const cursor = await this.arangodb.db.query(query, vars);
    const found = (await cursor.all()).map(this.arangodb.utils.format);
    if (found?.length > 0) {
      return found[0];
    }
  }

  async removeOne(input: MessageRemoveOneInput): Promise<Message | void> {
    const found = await this.findOne(input);
    if (found) {
      await this.collection.remove(found.id);
      return found;
    }
  }

  async findByConversation(
    input: MessageFindByConversationInput,
  ): Promise<Message[]> {
    const { filter, opts } = input;
    const query = `
      FOR doc IN message
      FILTER doc.conversationId == @conversationId
      SORT doc.createdAt DESC
      LIMIT @offset, @limit
      RETURN doc
    `;
    const vars = {
      ...filter,
      offset: Number(opts.offset) || 0,
      limit: Number(opts.limit) || 0,
    };
    const cursor = await this.arangodb.db.query(query, vars);
    return (await cursor.all()).map(this.arangodb.utils.format);
  }

  async onModuleInit(): Promise<void> {
    await this.arangodb.utils.tryDdl(
      () => this.arangodb.db.createCollection('message', {}),
      () =>
        this.arangodb.db.collection('message').ensureIndex({
          name: 'idx-message-v2',
          type: 'persistent',
          fields: ['conversationId', 'createdAt'],
        }),
      () =>
        this.arangodb.db.collection('message').ensureIndex({
          name: 'idx-message-uniqueness',
          type: 'persistent',
          fields: ['uniqueness'],
          unique: true,
        }),
    );
  }
}
