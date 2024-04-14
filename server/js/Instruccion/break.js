"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const instruccion_1 = require("../Abstract/instruccion");
class Break extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    interpretar(environment, consola) {
        return "break";
    }
}
exports.Break = Break;
