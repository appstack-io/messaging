/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "main";

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

function createBaseConversation(): Conversation {
  return { id: "", createdAt: 0, updatedAt: 0, name: "", description: "", lastMessageAt: 0 };
}

export const Conversation = {
  encode(message: Conversation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.createdAt !== 0) {
      writer.uint32(16).uint64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(24).uint64(message.updatedAt);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.lastMessageAt !== 0) {
      writer.uint32(48).uint64(message.lastMessageAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Conversation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.createdAt = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.updatedAt = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.lastMessageAt = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Conversation {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      lastMessageAt: isSet(object.lastMessageAt) ? globalThis.Number(object.lastMessageAt) : 0,
    };
  },

  toJSON(message: Conversation): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      obj.updatedAt = Math.round(message.updatedAt);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.lastMessageAt !== 0) {
      obj.lastMessageAt = Math.round(message.lastMessageAt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Conversation>, I>>(base?: I): Conversation {
    return Conversation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Conversation>, I>>(object: I): Conversation {
    const message = createBaseConversation();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.lastMessageAt = object.lastMessageAt ?? 0;
    return message;
  },
};

function createBaseConversationCreateOneInput(): ConversationCreateOneInput {
  return { name: "", description: "" };
}

export const ConversationCreateOneInput = {
  encode(message: ConversationCreateOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationCreateOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationCreateOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationCreateOneInput {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: ConversationCreateOneInput): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationCreateOneInput>, I>>(base?: I): ConversationCreateOneInput {
    return ConversationCreateOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationCreateOneInput>, I>>(object: I): ConversationCreateOneInput {
    const message = createBaseConversationCreateOneInput();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseConversationUpdateOneInput(): ConversationUpdateOneInput {
  return { id: "", name: "", description: "", lastMessageAt: 0 };
}

export const ConversationUpdateOneInput = {
  encode(message: ConversationUpdateOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.lastMessageAt !== 0) {
      writer.uint32(48).uint64(message.lastMessageAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationUpdateOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationUpdateOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.lastMessageAt = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationUpdateOneInput {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      lastMessageAt: isSet(object.lastMessageAt) ? globalThis.Number(object.lastMessageAt) : 0,
    };
  },

  toJSON(message: ConversationUpdateOneInput): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.lastMessageAt !== 0) {
      obj.lastMessageAt = Math.round(message.lastMessageAt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationUpdateOneInput>, I>>(base?: I): ConversationUpdateOneInput {
    return ConversationUpdateOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationUpdateOneInput>, I>>(object: I): ConversationUpdateOneInput {
    const message = createBaseConversationUpdateOneInput();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.lastMessageAt = object.lastMessageAt ?? 0;
    return message;
  },
};

function createBaseConversationFindOneInput(): ConversationFindOneInput {
  return { id: "" };
}

export const ConversationFindOneInput = {
  encode(message: ConversationFindOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationFindOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationFindOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationFindOneInput {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: ConversationFindOneInput): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationFindOneInput>, I>>(base?: I): ConversationFindOneInput {
    return ConversationFindOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationFindOneInput>, I>>(object: I): ConversationFindOneInput {
    const message = createBaseConversationFindOneInput();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseConversationRemoveOneInput(): ConversationRemoveOneInput {
  return { id: "" };
}

export const ConversationRemoveOneInput = {
  encode(message: ConversationRemoveOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationRemoveOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationRemoveOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationRemoveOneInput {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: ConversationRemoveOneInput): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationRemoveOneInput>, I>>(base?: I): ConversationRemoveOneInput {
    return ConversationRemoveOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationRemoveOneInput>, I>>(object: I): ConversationRemoveOneInput {
    const message = createBaseConversationRemoveOneInput();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseConversationFindByParticipantFilter(): ConversationFindByParticipantFilter {
  return { participantId: "", fromLastMessageAt: 0 };
}

export const ConversationFindByParticipantFilter = {
  encode(message: ConversationFindByParticipantFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.participantId !== "") {
      writer.uint32(10).string(message.participantId);
    }
    if (message.fromLastMessageAt !== 0) {
      writer.uint32(16).uint64(message.fromLastMessageAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationFindByParticipantFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationFindByParticipantFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.participantId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.fromLastMessageAt = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationFindByParticipantFilter {
    return {
      participantId: isSet(object.participantId) ? globalThis.String(object.participantId) : "",
      fromLastMessageAt: isSet(object.fromLastMessageAt) ? globalThis.Number(object.fromLastMessageAt) : 0,
    };
  },

  toJSON(message: ConversationFindByParticipantFilter): unknown {
    const obj: any = {};
    if (message.participantId !== "") {
      obj.participantId = message.participantId;
    }
    if (message.fromLastMessageAt !== 0) {
      obj.fromLastMessageAt = Math.round(message.fromLastMessageAt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationFindByParticipantFilter>, I>>(
    base?: I,
  ): ConversationFindByParticipantFilter {
    return ConversationFindByParticipantFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationFindByParticipantFilter>, I>>(
    object: I,
  ): ConversationFindByParticipantFilter {
    const message = createBaseConversationFindByParticipantFilter();
    message.participantId = object.participantId ?? "";
    message.fromLastMessageAt = object.fromLastMessageAt ?? 0;
    return message;
  },
};

function createBaseConversationFindByParticipantOpts(): ConversationFindByParticipantOpts {
  return { limit: 0, offset: 0 };
}

export const ConversationFindByParticipantOpts = {
  encode(message: ConversationFindByParticipantOpts, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== 0) {
      writer.uint32(8).uint64(message.limit);
    }
    if (message.offset !== 0) {
      writer.uint32(16).uint64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationFindByParticipantOpts {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationFindByParticipantOpts();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationFindByParticipantOpts {
    return {
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
    };
  },

  toJSON(message: ConversationFindByParticipantOpts): unknown {
    const obj: any = {};
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationFindByParticipantOpts>, I>>(
    base?: I,
  ): ConversationFindByParticipantOpts {
    return ConversationFindByParticipantOpts.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationFindByParticipantOpts>, I>>(
    object: I,
  ): ConversationFindByParticipantOpts {
    const message = createBaseConversationFindByParticipantOpts();
    message.limit = object.limit ?? 0;
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseConversationFindByParticipantInput(): ConversationFindByParticipantInput {
  return { filter: undefined, opts: undefined };
}

export const ConversationFindByParticipantInput = {
  encode(message: ConversationFindByParticipantInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      ConversationFindByParticipantFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.opts !== undefined) {
      ConversationFindByParticipantOpts.encode(message.opts, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationFindByParticipantInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationFindByParticipantInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = ConversationFindByParticipantFilter.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.opts = ConversationFindByParticipantOpts.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationFindByParticipantInput {
    return {
      filter: isSet(object.filter) ? ConversationFindByParticipantFilter.fromJSON(object.filter) : undefined,
      opts: isSet(object.opts) ? ConversationFindByParticipantOpts.fromJSON(object.opts) : undefined,
    };
  },

  toJSON(message: ConversationFindByParticipantInput): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = ConversationFindByParticipantFilter.toJSON(message.filter);
    }
    if (message.opts !== undefined) {
      obj.opts = ConversationFindByParticipantOpts.toJSON(message.opts);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationFindByParticipantInput>, I>>(
    base?: I,
  ): ConversationFindByParticipantInput {
    return ConversationFindByParticipantInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationFindByParticipantInput>, I>>(
    object: I,
  ): ConversationFindByParticipantInput {
    const message = createBaseConversationFindByParticipantInput();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? ConversationFindByParticipantFilter.fromPartial(object.filter)
      : undefined;
    message.opts = (object.opts !== undefined && object.opts !== null)
      ? ConversationFindByParticipantOpts.fromPartial(object.opts)
      : undefined;
    return message;
  },
};

function createBaseConversationFindByParticipantResultMeta(): ConversationFindByParticipantResultMeta {
  return { offset: 0 };
}

export const ConversationFindByParticipantResultMeta = {
  encode(message: ConversationFindByParticipantResultMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offset !== 0) {
      writer.uint32(8).uint64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationFindByParticipantResultMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationFindByParticipantResultMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationFindByParticipantResultMeta {
    return { offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0 };
  },

  toJSON(message: ConversationFindByParticipantResultMeta): unknown {
    const obj: any = {};
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationFindByParticipantResultMeta>, I>>(
    base?: I,
  ): ConversationFindByParticipantResultMeta {
    return ConversationFindByParticipantResultMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationFindByParticipantResultMeta>, I>>(
    object: I,
  ): ConversationFindByParticipantResultMeta {
    const message = createBaseConversationFindByParticipantResultMeta();
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseConversationFindByParticipantResult(): ConversationFindByParticipantResult {
  return { meta: undefined, results: [] };
}

export const ConversationFindByParticipantResult = {
  encode(message: ConversationFindByParticipantResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.meta !== undefined) {
      ConversationFindByParticipantResultMeta.encode(message.meta, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.results) {
      Conversation.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationFindByParticipantResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationFindByParticipantResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.meta = ConversationFindByParticipantResultMeta.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.results.push(Conversation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationFindByParticipantResult {
    return {
      meta: isSet(object.meta) ? ConversationFindByParticipantResultMeta.fromJSON(object.meta) : undefined,
      results: globalThis.Array.isArray(object?.results)
        ? object.results.map((e: any) => Conversation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ConversationFindByParticipantResult): unknown {
    const obj: any = {};
    if (message.meta !== undefined) {
      obj.meta = ConversationFindByParticipantResultMeta.toJSON(message.meta);
    }
    if (message.results?.length) {
      obj.results = message.results.map((e) => Conversation.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationFindByParticipantResult>, I>>(
    base?: I,
  ): ConversationFindByParticipantResult {
    return ConversationFindByParticipantResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationFindByParticipantResult>, I>>(
    object: I,
  ): ConversationFindByParticipantResult {
    const message = createBaseConversationFindByParticipantResult();
    message.meta = (object.meta !== undefined && object.meta !== null)
      ? ConversationFindByParticipantResultMeta.fromPartial(object.meta)
      : undefined;
    message.results = object.results?.map((e) => Conversation.fromPartial(e)) || [];
    return message;
  },
};

function createBaseConversationParticipant(): ConversationParticipant {
  return { id: "", createdAt: 0, updatedAt: 0, conversationId: "", participantId: "", writeableAs: undefined };
}

export const ConversationParticipant = {
  encode(message: ConversationParticipant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.createdAt !== 0) {
      writer.uint32(16).uint64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(24).uint64(message.updatedAt);
    }
    if (message.conversationId !== "") {
      writer.uint32(34).string(message.conversationId);
    }
    if (message.participantId !== "") {
      writer.uint32(42).string(message.participantId);
    }
    if (message.writeableAs !== undefined) {
      AuthorizableAs.encode(message.writeableAs, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationParticipant {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationParticipant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.createdAt = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.updatedAt = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.conversationId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.participantId = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.writeableAs = AuthorizableAs.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationParticipant {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : 0,
      conversationId: isSet(object.conversationId) ? globalThis.String(object.conversationId) : "",
      participantId: isSet(object.participantId) ? globalThis.String(object.participantId) : "",
      writeableAs: isSet(object.writeableAs) ? AuthorizableAs.fromJSON(object.writeableAs) : undefined,
    };
  },

  toJSON(message: ConversationParticipant): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      obj.updatedAt = Math.round(message.updatedAt);
    }
    if (message.conversationId !== "") {
      obj.conversationId = message.conversationId;
    }
    if (message.participantId !== "") {
      obj.participantId = message.participantId;
    }
    if (message.writeableAs !== undefined) {
      obj.writeableAs = AuthorizableAs.toJSON(message.writeableAs);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationParticipant>, I>>(base?: I): ConversationParticipant {
    return ConversationParticipant.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationParticipant>, I>>(object: I): ConversationParticipant {
    const message = createBaseConversationParticipant();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.conversationId = object.conversationId ?? "";
    message.participantId = object.participantId ?? "";
    message.writeableAs = (object.writeableAs !== undefined && object.writeableAs !== null)
      ? AuthorizableAs.fromPartial(object.writeableAs)
      : undefined;
    return message;
  },
};

function createBaseConversationParticipantCreateOneInput(): ConversationParticipantCreateOneInput {
  return { conversationId: "", participantId: "" };
}

export const ConversationParticipantCreateOneInput = {
  encode(message: ConversationParticipantCreateOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.conversationId !== "") {
      writer.uint32(34).string(message.conversationId);
    }
    if (message.participantId !== "") {
      writer.uint32(42).string(message.participantId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationParticipantCreateOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationParticipantCreateOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.conversationId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.participantId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationParticipantCreateOneInput {
    return {
      conversationId: isSet(object.conversationId) ? globalThis.String(object.conversationId) : "",
      participantId: isSet(object.participantId) ? globalThis.String(object.participantId) : "",
    };
  },

  toJSON(message: ConversationParticipantCreateOneInput): unknown {
    const obj: any = {};
    if (message.conversationId !== "") {
      obj.conversationId = message.conversationId;
    }
    if (message.participantId !== "") {
      obj.participantId = message.participantId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationParticipantCreateOneInput>, I>>(
    base?: I,
  ): ConversationParticipantCreateOneInput {
    return ConversationParticipantCreateOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationParticipantCreateOneInput>, I>>(
    object: I,
  ): ConversationParticipantCreateOneInput {
    const message = createBaseConversationParticipantCreateOneInput();
    message.conversationId = object.conversationId ?? "";
    message.participantId = object.participantId ?? "";
    return message;
  },
};

function createBaseConversationParticipantFindOneInput(): ConversationParticipantFindOneInput {
  return { id: "" };
}

export const ConversationParticipantFindOneInput = {
  encode(message: ConversationParticipantFindOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationParticipantFindOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationParticipantFindOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationParticipantFindOneInput {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: ConversationParticipantFindOneInput): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationParticipantFindOneInput>, I>>(
    base?: I,
  ): ConversationParticipantFindOneInput {
    return ConversationParticipantFindOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationParticipantFindOneInput>, I>>(
    object: I,
  ): ConversationParticipantFindOneInput {
    const message = createBaseConversationParticipantFindOneInput();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseConversationParticipantRemoveOneInput(): ConversationParticipantRemoveOneInput {
  return { id: "" };
}

export const ConversationParticipantRemoveOneInput = {
  encode(message: ConversationParticipantRemoveOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationParticipantRemoveOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationParticipantRemoveOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationParticipantRemoveOneInput {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: ConversationParticipantRemoveOneInput): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationParticipantRemoveOneInput>, I>>(
    base?: I,
  ): ConversationParticipantRemoveOneInput {
    return ConversationParticipantRemoveOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationParticipantRemoveOneInput>, I>>(
    object: I,
  ): ConversationParticipantRemoveOneInput {
    const message = createBaseConversationParticipantRemoveOneInput();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseConversationParticipantFindByConversationFilter(): ConversationParticipantFindByConversationFilter {
  return { conversationId: "" };
}

export const ConversationParticipantFindByConversationFilter = {
  encode(
    message: ConversationParticipantFindByConversationFilter,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.conversationId !== "") {
      writer.uint32(10).string(message.conversationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationParticipantFindByConversationFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationParticipantFindByConversationFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.conversationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationParticipantFindByConversationFilter {
    return { conversationId: isSet(object.conversationId) ? globalThis.String(object.conversationId) : "" };
  },

  toJSON(message: ConversationParticipantFindByConversationFilter): unknown {
    const obj: any = {};
    if (message.conversationId !== "") {
      obj.conversationId = message.conversationId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationParticipantFindByConversationFilter>, I>>(
    base?: I,
  ): ConversationParticipantFindByConversationFilter {
    return ConversationParticipantFindByConversationFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationParticipantFindByConversationFilter>, I>>(
    object: I,
  ): ConversationParticipantFindByConversationFilter {
    const message = createBaseConversationParticipantFindByConversationFilter();
    message.conversationId = object.conversationId ?? "";
    return message;
  },
};

function createBaseConversationParticipantFindByConversationOpts(): ConversationParticipantFindByConversationOpts {
  return { limit: 0, offset: 0 };
}

export const ConversationParticipantFindByConversationOpts = {
  encode(message: ConversationParticipantFindByConversationOpts, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== 0) {
      writer.uint32(8).uint64(message.limit);
    }
    if (message.offset !== 0) {
      writer.uint32(16).uint64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationParticipantFindByConversationOpts {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationParticipantFindByConversationOpts();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationParticipantFindByConversationOpts {
    return {
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
    };
  },

  toJSON(message: ConversationParticipantFindByConversationOpts): unknown {
    const obj: any = {};
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationParticipantFindByConversationOpts>, I>>(
    base?: I,
  ): ConversationParticipantFindByConversationOpts {
    return ConversationParticipantFindByConversationOpts.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationParticipantFindByConversationOpts>, I>>(
    object: I,
  ): ConversationParticipantFindByConversationOpts {
    const message = createBaseConversationParticipantFindByConversationOpts();
    message.limit = object.limit ?? 0;
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseConversationParticipantFindByConversationInput(): ConversationParticipantFindByConversationInput {
  return { filter: undefined, opts: undefined };
}

export const ConversationParticipantFindByConversationInput = {
  encode(
    message: ConversationParticipantFindByConversationInput,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.filter !== undefined) {
      ConversationParticipantFindByConversationFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.opts !== undefined) {
      ConversationParticipantFindByConversationOpts.encode(message.opts, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationParticipantFindByConversationInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationParticipantFindByConversationInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = ConversationParticipantFindByConversationFilter.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.opts = ConversationParticipantFindByConversationOpts.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationParticipantFindByConversationInput {
    return {
      filter: isSet(object.filter)
        ? ConversationParticipantFindByConversationFilter.fromJSON(object.filter)
        : undefined,
      opts: isSet(object.opts) ? ConversationParticipantFindByConversationOpts.fromJSON(object.opts) : undefined,
    };
  },

  toJSON(message: ConversationParticipantFindByConversationInput): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = ConversationParticipantFindByConversationFilter.toJSON(message.filter);
    }
    if (message.opts !== undefined) {
      obj.opts = ConversationParticipantFindByConversationOpts.toJSON(message.opts);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationParticipantFindByConversationInput>, I>>(
    base?: I,
  ): ConversationParticipantFindByConversationInput {
    return ConversationParticipantFindByConversationInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationParticipantFindByConversationInput>, I>>(
    object: I,
  ): ConversationParticipantFindByConversationInput {
    const message = createBaseConversationParticipantFindByConversationInput();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? ConversationParticipantFindByConversationFilter.fromPartial(object.filter)
      : undefined;
    message.opts = (object.opts !== undefined && object.opts !== null)
      ? ConversationParticipantFindByConversationOpts.fromPartial(object.opts)
      : undefined;
    return message;
  },
};

function createBaseConversationParticipantFindByConversationResultMeta(): ConversationParticipantFindByConversationResultMeta {
  return { offset: 0 };
}

export const ConversationParticipantFindByConversationResultMeta = {
  encode(
    message: ConversationParticipantFindByConversationResultMeta,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.offset !== 0) {
      writer.uint32(8).uint64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationParticipantFindByConversationResultMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationParticipantFindByConversationResultMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationParticipantFindByConversationResultMeta {
    return { offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0 };
  },

  toJSON(message: ConversationParticipantFindByConversationResultMeta): unknown {
    const obj: any = {};
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationParticipantFindByConversationResultMeta>, I>>(
    base?: I,
  ): ConversationParticipantFindByConversationResultMeta {
    return ConversationParticipantFindByConversationResultMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationParticipantFindByConversationResultMeta>, I>>(
    object: I,
  ): ConversationParticipantFindByConversationResultMeta {
    const message = createBaseConversationParticipantFindByConversationResultMeta();
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseConversationParticipantFindByConversationResult(): ConversationParticipantFindByConversationResult {
  return { meta: undefined, results: [] };
}

export const ConversationParticipantFindByConversationResult = {
  encode(
    message: ConversationParticipantFindByConversationResult,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.meta !== undefined) {
      ConversationParticipantFindByConversationResultMeta.encode(message.meta, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.results) {
      ConversationParticipant.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConversationParticipantFindByConversationResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConversationParticipantFindByConversationResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.meta = ConversationParticipantFindByConversationResultMeta.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.results.push(ConversationParticipant.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConversationParticipantFindByConversationResult {
    return {
      meta: isSet(object.meta) ? ConversationParticipantFindByConversationResultMeta.fromJSON(object.meta) : undefined,
      results: globalThis.Array.isArray(object?.results)
        ? object.results.map((e: any) => ConversationParticipant.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ConversationParticipantFindByConversationResult): unknown {
    const obj: any = {};
    if (message.meta !== undefined) {
      obj.meta = ConversationParticipantFindByConversationResultMeta.toJSON(message.meta);
    }
    if (message.results?.length) {
      obj.results = message.results.map((e) => ConversationParticipant.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConversationParticipantFindByConversationResult>, I>>(
    base?: I,
  ): ConversationParticipantFindByConversationResult {
    return ConversationParticipantFindByConversationResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConversationParticipantFindByConversationResult>, I>>(
    object: I,
  ): ConversationParticipantFindByConversationResult {
    const message = createBaseConversationParticipantFindByConversationResult();
    message.meta = (object.meta !== undefined && object.meta !== null)
      ? ConversationParticipantFindByConversationResultMeta.fromPartial(object.meta)
      : undefined;
    message.results = object.results?.map((e) => ConversationParticipant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAuthorizableAs(): AuthorizableAs {
  return { entity: "", entityId: "" };
}

export const AuthorizableAs = {
  encode(message: AuthorizableAs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.entity !== "") {
      writer.uint32(10).string(message.entity);
    }
    if (message.entityId !== "") {
      writer.uint32(18).string(message.entityId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthorizableAs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthorizableAs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entity = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.entityId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthorizableAs {
    return {
      entity: isSet(object.entity) ? globalThis.String(object.entity) : "",
      entityId: isSet(object.entityId) ? globalThis.String(object.entityId) : "",
    };
  },

  toJSON(message: AuthorizableAs): unknown {
    const obj: any = {};
    if (message.entity !== "") {
      obj.entity = message.entity;
    }
    if (message.entityId !== "") {
      obj.entityId = message.entityId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthorizableAs>, I>>(base?: I): AuthorizableAs {
    return AuthorizableAs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthorizableAs>, I>>(object: I): AuthorizableAs {
    const message = createBaseAuthorizableAs();
    message.entity = object.entity ?? "";
    message.entityId = object.entityId ?? "";
    return message;
  },
};

function createBaseMessage(): Message {
  return {
    id: "",
    createdAt: 0,
    updatedAt: 0,
    conversationId: "",
    media: undefined,
    senderId: "",
    sentToIds: [],
    receivedByIds: [],
    seenByIds: [],
    deleted: false,
    uniqueness: "",
  };
}

export const Message = {
  encode(message: Message, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.createdAt !== 0) {
      writer.uint32(16).uint64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(24).uint64(message.updatedAt);
    }
    if (message.conversationId !== "") {
      writer.uint32(34).string(message.conversationId);
    }
    if (message.media !== undefined) {
      MessageMedia.encode(message.media, writer.uint32(42).fork()).ldelim();
    }
    if (message.senderId !== "") {
      writer.uint32(50).string(message.senderId);
    }
    for (const v of message.sentToIds) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.receivedByIds) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.seenByIds) {
      writer.uint32(74).string(v!);
    }
    if (message.deleted === true) {
      writer.uint32(80).bool(message.deleted);
    }
    if (message.uniqueness !== "") {
      writer.uint32(90).string(message.uniqueness);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.createdAt = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.updatedAt = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.conversationId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.media = MessageMedia.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.senderId = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.sentToIds.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.receivedByIds.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.seenByIds.push(reader.string());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.deleted = reader.bool();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.uniqueness = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : 0,
      conversationId: isSet(object.conversationId) ? globalThis.String(object.conversationId) : "",
      media: isSet(object.media) ? MessageMedia.fromJSON(object.media) : undefined,
      senderId: isSet(object.senderId) ? globalThis.String(object.senderId) : "",
      sentToIds: globalThis.Array.isArray(object?.sentToIds)
        ? object.sentToIds.map((e: any) => globalThis.String(e))
        : [],
      receivedByIds: globalThis.Array.isArray(object?.receivedByIds)
        ? object.receivedByIds.map((e: any) => globalThis.String(e))
        : [],
      seenByIds: globalThis.Array.isArray(object?.seenByIds)
        ? object.seenByIds.map((e: any) => globalThis.String(e))
        : [],
      deleted: isSet(object.deleted) ? globalThis.Boolean(object.deleted) : false,
      uniqueness: isSet(object.uniqueness) ? globalThis.String(object.uniqueness) : "",
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      obj.updatedAt = Math.round(message.updatedAt);
    }
    if (message.conversationId !== "") {
      obj.conversationId = message.conversationId;
    }
    if (message.media !== undefined) {
      obj.media = MessageMedia.toJSON(message.media);
    }
    if (message.senderId !== "") {
      obj.senderId = message.senderId;
    }
    if (message.sentToIds?.length) {
      obj.sentToIds = message.sentToIds;
    }
    if (message.receivedByIds?.length) {
      obj.receivedByIds = message.receivedByIds;
    }
    if (message.seenByIds?.length) {
      obj.seenByIds = message.seenByIds;
    }
    if (message.deleted === true) {
      obj.deleted = message.deleted;
    }
    if (message.uniqueness !== "") {
      obj.uniqueness = message.uniqueness;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Message>, I>>(base?: I): Message {
    return Message.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.conversationId = object.conversationId ?? "";
    message.media = (object.media !== undefined && object.media !== null)
      ? MessageMedia.fromPartial(object.media)
      : undefined;
    message.senderId = object.senderId ?? "";
    message.sentToIds = object.sentToIds?.map((e) => e) || [];
    message.receivedByIds = object.receivedByIds?.map((e) => e) || [];
    message.seenByIds = object.seenByIds?.map((e) => e) || [];
    message.deleted = object.deleted ?? false;
    message.uniqueness = object.uniqueness ?? "";
    return message;
  },
};

function createBaseMessageMedia(): MessageMedia {
  return { text: "" };
}

export const MessageMedia = {
  encode(message: MessageMedia, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageMedia {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageMedia();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.text = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageMedia {
    return { text: isSet(object.text) ? globalThis.String(object.text) : "" };
  },

  toJSON(message: MessageMedia): unknown {
    const obj: any = {};
    if (message.text !== "") {
      obj.text = message.text;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageMedia>, I>>(base?: I): MessageMedia {
    return MessageMedia.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageMedia>, I>>(object: I): MessageMedia {
    const message = createBaseMessageMedia();
    message.text = object.text ?? "";
    return message;
  },
};

function createBaseMessageCreateOneInput(): MessageCreateOneInput {
  return { conversationId: "", media: undefined, senderId: "", uniqueness: "" };
}

export const MessageCreateOneInput = {
  encode(message: MessageCreateOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.conversationId !== "") {
      writer.uint32(34).string(message.conversationId);
    }
    if (message.media !== undefined) {
      MessageMedia.encode(message.media, writer.uint32(42).fork()).ldelim();
    }
    if (message.senderId !== "") {
      writer.uint32(50).string(message.senderId);
    }
    if (message.uniqueness !== "") {
      writer.uint32(90).string(message.uniqueness);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageCreateOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageCreateOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.conversationId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.media = MessageMedia.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.senderId = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.uniqueness = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageCreateOneInput {
    return {
      conversationId: isSet(object.conversationId) ? globalThis.String(object.conversationId) : "",
      media: isSet(object.media) ? MessageMedia.fromJSON(object.media) : undefined,
      senderId: isSet(object.senderId) ? globalThis.String(object.senderId) : "",
      uniqueness: isSet(object.uniqueness) ? globalThis.String(object.uniqueness) : "",
    };
  },

  toJSON(message: MessageCreateOneInput): unknown {
    const obj: any = {};
    if (message.conversationId !== "") {
      obj.conversationId = message.conversationId;
    }
    if (message.media !== undefined) {
      obj.media = MessageMedia.toJSON(message.media);
    }
    if (message.senderId !== "") {
      obj.senderId = message.senderId;
    }
    if (message.uniqueness !== "") {
      obj.uniqueness = message.uniqueness;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageCreateOneInput>, I>>(base?: I): MessageCreateOneInput {
    return MessageCreateOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageCreateOneInput>, I>>(object: I): MessageCreateOneInput {
    const message = createBaseMessageCreateOneInput();
    message.conversationId = object.conversationId ?? "";
    message.media = (object.media !== undefined && object.media !== null)
      ? MessageMedia.fromPartial(object.media)
      : undefined;
    message.senderId = object.senderId ?? "";
    message.uniqueness = object.uniqueness ?? "";
    return message;
  },
};

function createBaseMessageUpdateOneInput(): MessageUpdateOneInput {
  return { id: "", media: undefined };
}

export const MessageUpdateOneInput = {
  encode(message: MessageUpdateOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.media !== undefined) {
      MessageMedia.encode(message.media, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageUpdateOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageUpdateOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.media = MessageMedia.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageUpdateOneInput {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      media: isSet(object.media) ? MessageMedia.fromJSON(object.media) : undefined,
    };
  },

  toJSON(message: MessageUpdateOneInput): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.media !== undefined) {
      obj.media = MessageMedia.toJSON(message.media);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageUpdateOneInput>, I>>(base?: I): MessageUpdateOneInput {
    return MessageUpdateOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageUpdateOneInput>, I>>(object: I): MessageUpdateOneInput {
    const message = createBaseMessageUpdateOneInput();
    message.id = object.id ?? "";
    message.media = (object.media !== undefined && object.media !== null)
      ? MessageMedia.fromPartial(object.media)
      : undefined;
    return message;
  },
};

function createBaseMessageFindOneInput(): MessageFindOneInput {
  return { id: "" };
}

export const MessageFindOneInput = {
  encode(message: MessageFindOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageFindOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageFindOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageFindOneInput {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: MessageFindOneInput): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageFindOneInput>, I>>(base?: I): MessageFindOneInput {
    return MessageFindOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageFindOneInput>, I>>(object: I): MessageFindOneInput {
    const message = createBaseMessageFindOneInput();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMessageFindUniqueInput(): MessageFindUniqueInput {
  return { uniqueness: "" };
}

export const MessageFindUniqueInput = {
  encode(message: MessageFindUniqueInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uniqueness !== "") {
      writer.uint32(10).string(message.uniqueness);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageFindUniqueInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageFindUniqueInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uniqueness = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageFindUniqueInput {
    return { uniqueness: isSet(object.uniqueness) ? globalThis.String(object.uniqueness) : "" };
  },

  toJSON(message: MessageFindUniqueInput): unknown {
    const obj: any = {};
    if (message.uniqueness !== "") {
      obj.uniqueness = message.uniqueness;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageFindUniqueInput>, I>>(base?: I): MessageFindUniqueInput {
    return MessageFindUniqueInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageFindUniqueInput>, I>>(object: I): MessageFindUniqueInput {
    const message = createBaseMessageFindUniqueInput();
    message.uniqueness = object.uniqueness ?? "";
    return message;
  },
};

function createBaseMessageRemoveOneInput(): MessageRemoveOneInput {
  return { id: "" };
}

export const MessageRemoveOneInput = {
  encode(message: MessageRemoveOneInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageRemoveOneInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageRemoveOneInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageRemoveOneInput {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: MessageRemoveOneInput): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageRemoveOneInput>, I>>(base?: I): MessageRemoveOneInput {
    return MessageRemoveOneInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageRemoveOneInput>, I>>(object: I): MessageRemoveOneInput {
    const message = createBaseMessageRemoveOneInput();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMessageFindByConversationFilter(): MessageFindByConversationFilter {
  return { conversationId: "" };
}

export const MessageFindByConversationFilter = {
  encode(message: MessageFindByConversationFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.conversationId !== "") {
      writer.uint32(10).string(message.conversationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageFindByConversationFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageFindByConversationFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.conversationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageFindByConversationFilter {
    return { conversationId: isSet(object.conversationId) ? globalThis.String(object.conversationId) : "" };
  },

  toJSON(message: MessageFindByConversationFilter): unknown {
    const obj: any = {};
    if (message.conversationId !== "") {
      obj.conversationId = message.conversationId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageFindByConversationFilter>, I>>(base?: I): MessageFindByConversationFilter {
    return MessageFindByConversationFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageFindByConversationFilter>, I>>(
    object: I,
  ): MessageFindByConversationFilter {
    const message = createBaseMessageFindByConversationFilter();
    message.conversationId = object.conversationId ?? "";
    return message;
  },
};

function createBaseMessageFindByConversationOpts(): MessageFindByConversationOpts {
  return { limit: 0, offset: 0 };
}

export const MessageFindByConversationOpts = {
  encode(message: MessageFindByConversationOpts, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== 0) {
      writer.uint32(8).uint64(message.limit);
    }
    if (message.offset !== 0) {
      writer.uint32(16).uint64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageFindByConversationOpts {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageFindByConversationOpts();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageFindByConversationOpts {
    return {
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
    };
  },

  toJSON(message: MessageFindByConversationOpts): unknown {
    const obj: any = {};
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageFindByConversationOpts>, I>>(base?: I): MessageFindByConversationOpts {
    return MessageFindByConversationOpts.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageFindByConversationOpts>, I>>(
    object: I,
  ): MessageFindByConversationOpts {
    const message = createBaseMessageFindByConversationOpts();
    message.limit = object.limit ?? 0;
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseMessageFindByConversationInput(): MessageFindByConversationInput {
  return { filter: undefined, opts: undefined };
}

export const MessageFindByConversationInput = {
  encode(message: MessageFindByConversationInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      MessageFindByConversationFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.opts !== undefined) {
      MessageFindByConversationOpts.encode(message.opts, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageFindByConversationInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageFindByConversationInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = MessageFindByConversationFilter.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.opts = MessageFindByConversationOpts.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageFindByConversationInput {
    return {
      filter: isSet(object.filter) ? MessageFindByConversationFilter.fromJSON(object.filter) : undefined,
      opts: isSet(object.opts) ? MessageFindByConversationOpts.fromJSON(object.opts) : undefined,
    };
  },

  toJSON(message: MessageFindByConversationInput): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = MessageFindByConversationFilter.toJSON(message.filter);
    }
    if (message.opts !== undefined) {
      obj.opts = MessageFindByConversationOpts.toJSON(message.opts);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageFindByConversationInput>, I>>(base?: I): MessageFindByConversationInput {
    return MessageFindByConversationInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageFindByConversationInput>, I>>(
    object: I,
  ): MessageFindByConversationInput {
    const message = createBaseMessageFindByConversationInput();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? MessageFindByConversationFilter.fromPartial(object.filter)
      : undefined;
    message.opts = (object.opts !== undefined && object.opts !== null)
      ? MessageFindByConversationOpts.fromPartial(object.opts)
      : undefined;
    return message;
  },
};

function createBaseMessageFindByConversationResultMeta(): MessageFindByConversationResultMeta {
  return { offset: 0 };
}

export const MessageFindByConversationResultMeta = {
  encode(message: MessageFindByConversationResultMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offset !== 0) {
      writer.uint32(8).uint64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageFindByConversationResultMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageFindByConversationResultMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageFindByConversationResultMeta {
    return { offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0 };
  },

  toJSON(message: MessageFindByConversationResultMeta): unknown {
    const obj: any = {};
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageFindByConversationResultMeta>, I>>(
    base?: I,
  ): MessageFindByConversationResultMeta {
    return MessageFindByConversationResultMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageFindByConversationResultMeta>, I>>(
    object: I,
  ): MessageFindByConversationResultMeta {
    const message = createBaseMessageFindByConversationResultMeta();
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseMessageFindByConversationResult(): MessageFindByConversationResult {
  return { meta: undefined, results: [] };
}

export const MessageFindByConversationResult = {
  encode(message: MessageFindByConversationResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.meta !== undefined) {
      MessageFindByConversationResultMeta.encode(message.meta, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.results) {
      Message.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageFindByConversationResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageFindByConversationResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.meta = MessageFindByConversationResultMeta.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.results.push(Message.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageFindByConversationResult {
    return {
      meta: isSet(object.meta) ? MessageFindByConversationResultMeta.fromJSON(object.meta) : undefined,
      results: globalThis.Array.isArray(object?.results) ? object.results.map((e: any) => Message.fromJSON(e)) : [],
    };
  },

  toJSON(message: MessageFindByConversationResult): unknown {
    const obj: any = {};
    if (message.meta !== undefined) {
      obj.meta = MessageFindByConversationResultMeta.toJSON(message.meta);
    }
    if (message.results?.length) {
      obj.results = message.results.map((e) => Message.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageFindByConversationResult>, I>>(base?: I): MessageFindByConversationResult {
    return MessageFindByConversationResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageFindByConversationResult>, I>>(
    object: I,
  ): MessageFindByConversationResult {
    const message = createBaseMessageFindByConversationResult();
    message.meta = (object.meta !== undefined && object.meta !== null)
      ? MessageFindByConversationResultMeta.fromPartial(object.meta)
      : undefined;
    message.results = object.results?.map((e) => Message.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMessageJobPayload(): MessageJobPayload {
  return { id: "" };
}

export const MessageJobPayload = {
  encode(message: MessageJobPayload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageJobPayload {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageJobPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageJobPayload {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: MessageJobPayload): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageJobPayload>, I>>(base?: I): MessageJobPayload {
    return MessageJobPayload.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageJobPayload>, I>>(object: I): MessageJobPayload {
    const message = createBaseMessageJobPayload();
    message.id = object.id ?? "";
    return message;
  },
};

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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
