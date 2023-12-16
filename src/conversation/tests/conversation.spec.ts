import { createChannel, createClient, Metadata } from 'nice-grpc';
import {
  ConversationParticipantServiceClient,
  ConversationParticipantServiceDefinition,
  ConversationServiceClient,
  ConversationServiceDefinition,
} from '../../tests/combined.client';
import { shutdownComponents } from '@appstack-io/main';
import { v4 as uuid } from 'uuid';
import {
  isE2E,
  login,
  runMain,
  setupArangoDb,
  useHost,
  usePorts,
} from '@appstack-io/tests';
import { ConversationCreateOneInput } from '../../combined.interfaces';
import { MainMicroservicesModule } from './components/main.microservices.module';
import { MainHttpModule } from './components/main.http.module';

describe('Conversation', () => {
  let client: ConversationServiceClient;
  let participantClient: ConversationParticipantServiceClient;
  const metadata = new Metadata();

  beforeAll(async () => {
    await setupArangoDb();
    const ports = await usePorts();
    const host = useHost();
    const channel = createChannel(`${host}:${ports.proto}`);
    client = createClient(ConversationServiceDefinition, channel);
    participantClient = createClient(
      ConversationParticipantServiceDefinition,
      channel,
    );
    if (!isE2E())
      await runMain({
        publicMicroservicesModule: MainMicroservicesModule,
        privateMicroservicesModule: MainMicroservicesModule,
        publicHttpModule: MainHttpModule,
        privateHttpModule: MainHttpModule,
      });
    const { accessToken } = await login(ports);
    metadata.set('jwt', accessToken);
  });

  afterAll(async () => {
    if (!isE2E()) await shutdownComponents();
  });

  test('CreateOne + FindOne', async () => {
    // Arrange
    const input: ConversationCreateOneInput = {
      name: uuid(),
      description: uuid(),
    };

    // Act
    const created = await client.createOne(input, { metadata });
    const found = await client.findOne({ id: created.id }, { metadata });

    // Assert
    expect(found).toEqual({
      ...created,
      updatedAt: expect.any(Number),
    });
  });

  test('UpdateOne', async () => {
    // Arrange
    const input = {
      name: uuid(),
      description: uuid(),
    };
    const update = {
      name: uuid(),
      description: uuid(),
    };
    const created = await client.createOne(input, { metadata });

    // Act
    const updated = await client.updateOne(
      { id: created.id, ...update },
      { metadata },
    );

    // Assert
    expect(updated).toEqual({ ...created, ...updated });
  });

  test('RemoveOne', async () => {
    // Arrange
    const input: ConversationCreateOneInput = {
      name: uuid(),
      description: uuid(),
    };
    const created = await client.createOne(input, { metadata });

    // Act
    await client.removeOne({ id: created.id }, { metadata });

    // Assert
    await expect(
      client.findOne({ id: created.id }, { metadata }),
    ).rejects.toThrow('not found');
  });

  test('FindByParticipant', async () => {
    // Arrange
    const start = Date.now();
    const participantId0 = uuid();
    const input: ConversationCreateOneInput = {
      name: uuid(),
      description: uuid(),
    };
    for (let i = 0; i < 7; i++) {
      const created = await client.createOne(input, { metadata });
      await participantClient.createOne(
        {
          conversationId: created.id,
          participantId: participantId0,
        },
        { metadata },
      );
      await client.updateOne(
        { id: created.id, lastMessageAt: start + i * 10 },
        { metadata },
      );
    }

    // Act
    const all = await client.findByParticipant(
      {
        filter: {
          participantId: participantId0,
          fromLastMessageAt: start + 30,
        },
        opts: { limit: 10 },
      },
      { metadata },
    );

    // Assert
    expect(all.results.length).toEqual(4);
  });
});
