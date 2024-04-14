"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subebaja = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
class Subebaja extends instruccion_1.Instruccion {
    constructor(id, tipo, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.tipo = tipo;
    }
    interpretar(entorno, consola) {
        const value = entorno.getVariable(this.id);
        if (value == null) {
            throw new Error(`La variable ${this.id} no existe`);
        }
        if (value.type == resultado_1.TipoDato.NUMBER || value.type == resultado_1.TipoDato.DOUBLE) {
            if (this.tipo) {
                entorno.editarVariable(this.id, value.value + 1, value.type, "variable", this.line, this.column);
            }
            else {
                entorno.editarVariable(this.id, value.value - 1, value.type, "variable", this.line, this.column);
            }
        }
        else {
            throw new Error(`Error:  ${value.type} no es valido`);
        }
        return null;
    }
}
exports.Subebaja = Subebaja;
