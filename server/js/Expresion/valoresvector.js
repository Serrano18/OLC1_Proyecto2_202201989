"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vvector = void 0;
//solo con fila y columna obtiene un valor
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Vvector extends expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(id, fila, col, linea, columna) {
        super(linea, columna);
        this.fila = fila;
        this.col = col;
        this.id = id;
    }
    interpretar(entorno) {
        const vector = entorno.obtenerVector(this.id);
        const fila = this.fila.interpretar(entorno);
        if (fila.tipo != resultado_1.TipoDato.NUMBER) {
            throw new Error("El tipo de dato no es un entero");
        }
        let col;
        if (this.col != null) {
            col = this.col.interpretar(entorno).valor;
            console.log("dato que interpreta", col);
        }
        else {
            col = 0;
        }
        if (vector == null) {
            throw new Error("No existe el vector");
        }
        return { valor: vector.getValue(fila.valor, col).value, tipo: vector.tipo };
    }
}
exports.Vvector = Vvector;
