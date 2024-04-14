"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const instruccion_1 = require("../Abstract/instruccion");
class Continue extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    interpretar(environment, consola) {
        return 'continue';
    }
}
exports.Continue = Continue;
