"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empty = exports.protobufPackage = void 0;
const _m0 = require("protobufjs/minimal");
exports.protobufPackage = "google.protobuf";
function createBaseEmpty() {
    return {};
}
exports.Empty = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEmpty();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return exports.Empty.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseEmpty();
        return message;
    },
};
//# sourceMappingURL=empty.js.map