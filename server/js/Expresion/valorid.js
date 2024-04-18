"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Valorid = void 0;
const expresion_1 = require("../Abstract/expresion");
class Valorid extends expresion_1.Expresion {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    interpretar(entorno) {
        const value = entorno.getVariable(this.id);
        console.log(value);
        if (value != null) {
            return { valor: value.value, tipo: value.type };
        }
        else {
            const arreglo = entorno.getVector(this.id);
            if (arreglo != null) {
                return { valor: arreglo.values, tipo: arreglo.tipo };
            }
            else {
                throw new Error(`La variable o vector ${this.id} no existe`);
            }
        }
    }
}
exports.Valorid = Valorid;
