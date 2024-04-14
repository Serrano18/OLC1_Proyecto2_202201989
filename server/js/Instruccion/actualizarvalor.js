"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avariable = void 0;
const instruccion_1 = require("../Abstract/instruccion");
class Avariable extends instruccion_1.Instruccion {
    constructor(id, valor, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.valor = valor;
    }
    interpretar(entorno, consola) {
        const value = entorno.getVariable(this.id);
        if (value == null) {
            throw new Error(`La variable ${this.id} no existe`);
        }
        if (this.valor != null) {
            const valor = this.valor.interpretar(entorno);
            if (value.type == valor.tipo) {
                entorno.editarVariable(this.id, valor.valor, valor.tipo, "variable", this.line, this.column);
            }
            else {
                throw new Error(`Error:  ${value.type} no es valido`);
            }
        }
        else {
            throw new Error(`Error: tipo es null`);
        }
        return null;
    }
}
exports.Avariable = Avariable;
