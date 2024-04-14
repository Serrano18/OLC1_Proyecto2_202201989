"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = void 0;
class Struct {
    constructor() {
        this.attributes = new Map();
    }
    getAttribute(id) {
        return this.attributes.get(id);
    }
    setAttribute(id, value) {
        this.attributes.set(id, value);
    }
}
exports.Struct = Struct;
