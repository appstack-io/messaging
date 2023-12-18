
  export interface ConversationCreateOneInput {
  name: string;
  description: string;
}

export interface Conversation {
  id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  description: string;
  lastMessageAt: number;
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

export interface ConversationFindByParticipantInput {
  filter: ConversationFindByParticipantFilter | undefined;
  opts: ConversationFindByParticipantOpts | undefined;
}

export interface ConversationFindByParticipantFilter {
  participantId: string;
  fromLastMessageAt: number;
}

export interface ConversationFindByParticipantOpts {
  limit: number;
  offset: number;
}

export interface ConversationFindByParticipantResult {
  meta: ConversationFindByParticipantResultMeta | undefined;
  results: Conversation[];
}

export interface ConversationFindByParticipantResultMeta {
  offset: number;
}
  import { postToUnary } from './utils';
  import { Metadata } from 'nice-grpc';
 
  export class ConversationService {
    private readonly serviceName: string = "ConversationService";
    
    constructor(private opts?: {port?: string, host?: string}){}
    
    
    async createOne(data: Partial<ConversationCreateOneInput>, metadata: Metadata=new Metadata()): Promise<Conversation> {
      return postToUnary<Conversation>(this.serviceName, 'createOne', data, metadata, this.opts);
    }
  
    async updateOne(data: Partial<ConversationUpdateOneInput>, metadata: Metadata=new Metadata()): Promise<Conversation> {
      return postToUnary<Conversation>(this.serviceName, 'updateOne', data, metadata, this.opts);
    }
  
    async findOne(data: Partial<ConversationFindOneInput>, metadata: Metadata=new Metadata()): Promise<Conversation> {
      return postToUnary<Conversation>(this.serviceName, 'findOne', data, metadata, this.opts);
    }
  
    async removeOne(data: Partial<ConversationRemoveOneInput>, metadata: Metadata=new Metadata()): Promise<Conversation> {
      return postToUnary<Conversation>(this.serviceName, 'removeOne', data, metadata, this.opts);
    }
  
    async findByParticipant(data: Partial<ConversationFindByParticipantInput>, metadata: Metadata=new Metadata()): Promise<ConversationFindByParticipantResult> {
      return postToUnary<ConversationFindByParticipantResult>(this.serviceName, 'findByParticipant', data, metadata, this.opts);
    }
  
  }
