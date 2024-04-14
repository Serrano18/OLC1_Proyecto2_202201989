"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array = void 0;
class Array {
    constructor() {
        this.values = [];
    }
    getAttribute(index) {
        return this.values[index];
    }
    setAttribute(index, value) {
        this.values[index] = value;
    }
}
exports.Array = Array;
