import { Empty } from './google/protobuf/empty';

import { Observable } from 'rxjs';

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

export interface ConversationService {
  CreateOne(request: ConversationCreateOneInput): Promise<Conversation>;
  UpdateOne(request: ConversationUpdateOneInput): Promise<Conversation>;
  FindOne(request: ConversationFindOneInput): Promise<Conversation>;
  RemoveOne(request: ConversationRemoveOneInput): Promise<Conversation>;
  FindByParticipant(request: ConversationFindByParticipantInput): Promise<ConversationFindByParticipantResult>;
}

export interface ConversationParticipantService {
  CreateOne(request: ConversationParticipantCreateOneInput): Promise<ConversationParticipant>;
  FindOne(request: ConversationParticipantFindOneInput): Promise<ConversationParticipant>;
  RemoveOne(request: ConversationParticipantRemoveOneInput): Promise<ConversationParticipant>;
  FindByConversation(
    request: ConversationParticipantFindByConversationInput,
  ): Promise<ConversationParticipantFindByConversationResult>;
}

export interface MessageService {
  CreateOne(request: MessageCreateOneInput): Promise<Message>;
  UpdateOne(request: MessageUpdateOneInput): Promise<Message>;
  FindOne(request: MessageFindOneInput): Promise<Message>;
  FindUnique(request: MessageFindUniqueInput): Promise<Message>;
  RemoveOne(request: MessageRemoveOneInput): Promise<Message>;
  FindByConversation(request: MessageFindByConversationInput): Promise<MessageFindByConversationResult>;
}