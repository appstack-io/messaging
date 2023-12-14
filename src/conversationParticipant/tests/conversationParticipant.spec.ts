import { createChannel, createClient, Metadata } from 'nice-grpc';
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
import {
  ConversationParticipantCreateOneInput,
  ConversationParticipantServiceClient,
  ConversationParticipantServiceDefinition,
  ConversationServiceClient,
  ConversationServiceDefinition,
} from '@appstack-io/client';
import { MainMicroservicesModule } from './components/main.microservices.module';
import { MainHttpModule } from './components/main.http.module';

describe('ConversationParticipant', () => {
  let client: ConversationParticipantServiceClient;
  let conversationClient: ConversationServiceClient;
  const metadata = new Metadata();
  let ports: {
    protoInternal: number;
    proto: number;
    http: number;
    httpInternal: number;
    ws: number;
    workers: number;
  };

  beforeAll(async () => {
    await setupArangoDb();
    ports = await usePorts();
    const host = useHost();
    const channel = createChannel(`${host}:${ports.proto}`);
    client = createClient(ConversationParticipantServiceDefinition, channel);
    conversationClient = createClient(ConversationServiceDefinition, channel);
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
    const conversation = await conversationClient.createOne(
      { name: uuid() },
      { metadata },
    );
    const { accessToken, userId } = await login(ports);
    const testMetadata = new Metadata();
    testMetadata.set('jwt', accessToken);

    const input: ConversationParticipantCreateOneInput = {
      conversationId: conversation.id,
      participantId: userId,
    };

    // Act
    const created = await client.createOne(input, { metadata });
    const found = await client.findOne(
      { id: created.id },
      { metadata: testMetadata },
    );

    // Assert
    expect(found).toEqual({
      ...created,
      updatedAt: expect.any(Number),
    });
  });

  test('RemoveOne', async () => {
    // Arrange
    const conversation = await conversationClient.createOne(
      { name: uuid() },
      { metadata },
    );
    const { accessToken, userId } = await login(ports);
    const testMetadata = new Metadata();
    testMetadata.set('jwt', accessToken);

    const input: ConversationParticipantCreateOneInput = {
      conversationId: conversation.id,
      participantId: userId,
    };
    const created = await client.createOne(input, { metadata });

    // Act
    await client.removeOne({ id: created.id }, { metadata: testMetadata });

    // Assert
    await expect(
      client.findOne({ id: created.id }, { metadata }),
    ).rejects.toThrow('not found');
  });

  test('FindByConversation', async () => {
    // Arrange
    const conversation = await conversationClient.createOne(
      { name: uuid() },
      { metadata },
    );
    for (let i = 0; i < 3; i++) {
      await client.createOne(
        {
          conversationId: conversation.id,
          participantId: uuid(),
        },
        { metadata },
      );
    }

    // Act
    const all = await client.findByConversation(
      {
        filter: {
          conversationId: conversation.id,
        },
        opts: { limit: 10 },
      },
      { metadata },
    );

    // Assert
    expect(all.results.length).toEqual(3);
  });
});
