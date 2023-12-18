
  export interface ConversationParticipantCreateOneInput {
  conversationId: string;
  participantId: string;
}

export interface ConversationParticipant {
  id: string;
  createdAt: number;
  updatedAt: number;
  conversationId: string;
  participantId: string;
  writeableAs: AuthorizableAs | undefined;
}

export interface AuthorizableAs {
  entity: string;
  entityId: string;
}

export interface ConversationParticipantFindOneInput {
  id: string;
}

export interface ConversationParticipantRemoveOneInput {
  id: string;
}

export interface ConversationParticipantFindByConversationInput {
  filter: ConversationParticipantFindByConversationFilter | undefined;
  opts: ConversationParticipantFindByConversationOpts | undefined;
}

export interface ConversationParticipantFindByConversationFilter {
  conversationId: string;
}

export interface ConversationParticipantFindByConversationOpts {
  limit: number;
  offset: number;
}

export interface ConversationParticipantFindByConversationResult {
  meta: ConversationParticipantFindByConversationResultMeta | undefined;
  results: ConversationParticipant[];
}

export interface ConversationParticipantFindByConversationResultMeta {
  offset: number;
}
  import { postToUnary } from './utils';
  import { Metadata } from 'nice-grpc';
 
  export class ConversationParticipantService {
    private readonly serviceName: string = "ConversationParticipantService";
    
    constructor(private opts?: {port?: string, host?: string}){}
    
    
    async createOne(data: Partial<ConversationParticipantCreateOneInput>, metadata: Metadata=new Metadata()): Promise<ConversationParticipant> {
      return postToUnary<ConversationParticipant>(this.serviceName, 'createOne', data, metadata, this.opts);
    }
  
    async findOne(data: Partial<ConversationParticipantFindOneInput>, metadata: Metadata=new Metadata()): Promise<ConversationParticipant> {
      return postToUnary<ConversationParticipant>(this.serviceName, 'findOne', data, metadata, this.opts);
    }
  
    async removeOne(data: Partial<ConversationParticipantRemoveOneInput>, metadata: Metadata=new Metadata()): Promise<ConversationParticipant> {
      return postToUnary<ConversationParticipant>(this.serviceName, 'removeOne', data, metadata, this.opts);
    }
  
    async findByConversation(data: Partial<ConversationParticipantFindByConversationInput>, metadata: Metadata=new Metadata()): Promise<ConversationParticipantFindByConversationResult> {
      return postToUnary<ConversationParticipantFindByConversationResult>(this.serviceName, 'findByConversation', data, metadata, this.opts);
    }
  
  }
