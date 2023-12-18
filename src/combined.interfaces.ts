import { Empty } from './google/protobuf/empty';

import { Observable } from 'rxjs';

import type { CallContext, CallOptions } from "nice-grpc-common";

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
      : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
      : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
      : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
      : Partial<T>;
    

export interface Conversation {
  id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  description: string;
  lastMessageAt: number;
}

export interface ConversationCreateOneInput {
  name: string;
  description: string;
}

export interface ConversationUpdateOneInput {
  id: string;
  name: string;
  description: string;
  lastMessageAt: number;
}

export interface ConversationFindOneInput {
  id: string;
}

export interface ConversationRemoveOneInput {
  id: string;
}

export interface ConversationFindByParticipantFilter {
  participantId: string;
  fromLastMessageAt: number;
}

export interface ConversationFindByParticipantOpts {
  limit: number;
  offset: number;
}

export interface ConversationFindByParticipantInput {
  filter: ConversationFindByParticipantFilter | undefined;
  opts: ConversationFindByParticipantOpts | undefined;
}

export interface ConversationFindByParticipantResultMeta {
  offset: number;
}

export interface ConversationFindByParticipantResult {
  meta: ConversationFindByParticipantResultMeta | undefined;
  results: Conversation[];
}

export interface ConversationParticipant {
  id: string;
  createdAt: number;
  updatedAt: number;
  conversationId: string;
  participantId: string;
  writeableAs: AuthorizableAs | undefined;
}

export interface ConversationParticipantCreateOneInput {
  conversationId: string;
  participantId: string;
}

export interface ConversationParticipantFindOneInput {
  id: string;
}

export interface ConversationParticipantRemoveOneInput {
  id: string;
}

export interface ConversationParticipantFindByConversationFilter {
  conversationId: string;
}

export interface ConversationParticipantFindByConversationOpts {
  limit: number;
  offset: number;
}

export interface ConversationParticipantFindByConversationInput {
  filter: ConversationParticipantFindByConversationFilter | undefined;
  opts: ConversationParticipantFindByConversationOpts | undefined;
}

export interface ConversationParticipantFindByConversationResultMeta {
  offset: number;
}

export interface ConversationParticipantFindByConversationResult {
  meta: ConversationParticipantFindByConversationResultMeta | undefined;
  results: ConversationParticipant[];
}

export interface AuthorizableAs {
  entity: string;
  entityId: string;
}

export interface Message {
  id: string;
  createdAt: number;
  updatedAt: number;
  conversationId: string;
  media: MessageMedia | undefined;
  senderId: string;
  sentToIds: string[];
  receivedByIds: string[];
  seenByIds: string[];
  deleted: boolean;
  uniqueness: string;
}

export interface MessageMedia {
  text: string;
}

export interface MessageCreateOneInput {
  conversationId: string;
  media: MessageMedia | undefined;
  senderId: string;
  uniqueness: string;
}

export interface MessageUpdateOneInput {
  id: string;
  media: MessageMedia | undefined;
}

export interface MessageFindOneInput {
  id: string;
}

export interface MessageFindUniqueInput {
  uniqueness: string;
}

export interface MessageRemoveOneInput {
  id: string;
}

export interface MessageFindByConversationFilter {
  conversationId: string;
}

export interface MessageFindByConversationOpts {
  limit: number;
  offset: number;
}

export interface MessageFindByConversationInput {
  filter: MessageFindByConversationFilter | undefined;
  opts: MessageFindByConversationOpts | undefined;
}

export interface MessageFindByConversationResultMeta {
  offset: number;
}

export interface MessageFindByConversationResult {
  meta: MessageFindByConversationResultMeta | undefined;
  results: Message[];
}

export interface MessageJobPayload {
  id: string;
}

export interface ConversationServiceImplementation<CallContextExt = {}> {
  createOne(
    request: ConversationCreateOneInput,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Conversation>>;
  updateOne(
    request: ConversationUpdateOneInput,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Conversation>>;
  findOne(request: ConversationFindOneInput, context: CallContext & CallContextExt): Promise<DeepPartial<Conversation>>;
  removeOne(
    request: ConversationRemoveOneInput,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Conversation>>;
  findByParticipant(
    request: ConversationFindByParticipantInput,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ConversationFindByParticipantResult>>;
}

export interface ConversationServiceClient<CallOptionsExt = {}> {
  createOne(
    request: DeepPartial<ConversationCreateOneInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Conversation>;
  updateOne(
    request: DeepPartial<ConversationUpdateOneInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Conversation>;
  findOne(
    request: DeepPartial<ConversationFindOneInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Conversation>;
  removeOne(
    request: DeepPartial<ConversationRemoveOneInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Conversation>;
  findByParticipant(
    request: DeepPartial<ConversationFindByParticipantInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ConversationFindByParticipantResult>;
}

export interface ConversationParticipantServiceImplementation<CallContextExt = {}> {
  createOne(
    request: ConversationParticipantCreateOneInput,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ConversationParticipant>>;
  findOne(
    request: ConversationParticipantFindOneInput,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ConversationParticipant>>;
  removeOne(
    request: ConversationParticipantRemoveOneInput,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ConversationParticipant>>;
  findByConversation(
    request: ConversationParticipantFindByConversationInput,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ConversationParticipantFindByConversationResult>>;
}

export interface ConversationParticipantServiceClient<CallOptionsExt = {}> {
  createOne(
    request: DeepPartial<ConversationParticipantCreateOneInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ConversationParticipant>;
  findOne(
    request: DeepPartial<ConversationParticipantFindOneInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ConversationParticipant>;
  removeOne(
    request: DeepPartial<ConversationParticipantRemoveOneInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ConversationParticipant>;
  findByConversation(
    request: DeepPartial<ConversationParticipantFindByConversationInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ConversationParticipantFindByConversationResult>;
}

export interface MessageServiceImplementation<CallContextExt = {}> {
  createOne(request: MessageCreateOneInput, context: CallContext & CallContextExt): Promise<DeepPartial<Message>>;
  updateOne(request: MessageUpdateOneInput, context: CallContext & CallContextExt): Promise<DeepPartial<Message>>;
  findOne(request: MessageFindOneInput, context: CallContext & CallContextExt): Promise<DeepPartial<Message>>;
  findUnique(request: MessageFindUniqueInput, context: CallContext & CallContextExt): Promise<DeepPartial<Message>>;
  removeOne(request: MessageRemoveOneInput, context: CallContext & CallContextExt): Promise<DeepPartial<Message>>;
  findByConversation(
    request: MessageFindByConversationInput,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<MessageFindByConversationResult>>;
}

export interface MessageServiceClient<CallOptionsExt = {}> {
  createOne(request: DeepPartial<MessageCreateOneInput>, options?: CallOptions & CallOptionsExt): Promise<Message>;
  updateOne(request: DeepPartial<MessageUpdateOneInput>, options?: CallOptions & CallOptionsExt): Promise<Message>;
  findOne(request: DeepPartial<MessageFindOneInput>, options?: CallOptions & CallOptionsExt): Promise<Message>;
  findUnique(request: DeepPartial<MessageFindUniqueInput>, options?: CallOptions & CallOptionsExt): Promise<Message>;
  removeOne(request: DeepPartial<MessageRemoveOneInput>, options?: CallOptions & CallOptionsExt): Promise<Message>;
  findByConversation(
    request: DeepPartial<MessageFindByConversationInput>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<MessageFindByConversationResult>;
}