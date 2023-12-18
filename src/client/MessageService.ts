
  export interface MessageCreateOneInput {
  conversationId: string;
  media: MessageMedia | undefined;
  senderId: string;
  uniqueness: string;
}

export interface MessageMedia {
  text: string;
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

export interface MessageFindByConversationInput {
  filter: MessageFindByConversationFilter | undefined;
  opts: MessageFindByConversationOpts | undefined;
}

export interface MessageFindByConversationFilter {
  conversationId: string;
}

export interface MessageFindByConversationOpts {
  limit: number;
  offset: number;
}

export interface MessageFindByConversationResult {
  meta: MessageFindByConversationResultMeta | undefined;
  results: Message[];
}

export interface MessageFindByConversationResultMeta {
  offset: number;
}
  import { postToUnary } from './utils';
  import { Metadata } from 'nice-grpc';
 
  export class MessageService {
    private readonly serviceName: string = "MessageService";
    
    constructor(private opts?: {port?: string, host?: string}){}
    
    
    async createOne(data: Partial<MessageCreateOneInput>, metadata: Metadata=new Metadata()): Promise<Message> {
      return postToUnary<Message>(this.serviceName, 'createOne', data, metadata, this.opts);
    }
  
    async updateOne(data: Partial<MessageUpdateOneInput>, metadata: Metadata=new Metadata()): Promise<Message> {
      return postToUnary<Message>(this.serviceName, 'updateOne', data, metadata, this.opts);
    }
  
    async findOne(data: Partial<MessageFindOneInput>, metadata: Metadata=new Metadata()): Promise<Message> {
      return postToUnary<Message>(this.serviceName, 'findOne', data, metadata, this.opts);
    }
  
    async findUnique(data: Partial<MessageFindUniqueInput>, metadata: Metadata=new Metadata()): Promise<Message> {
      return postToUnary<Message>(this.serviceName, 'findUnique', data, metadata, this.opts);
    }
  
    async removeOne(data: Partial<MessageRemoveOneInput>, metadata: Metadata=new Metadata()): Promise<Message> {
      return postToUnary<Message>(this.serviceName, 'removeOne', data, metadata, this.opts);
    }
  
    async findByConversation(data: Partial<MessageFindByConversationInput>, metadata: Metadata=new Metadata()): Promise<MessageFindByConversationResult> {
      return postToUnary<MessageFindByConversationResult>(this.serviceName, 'findByConversation', data, metadata, this.opts);
    }
  
  }
