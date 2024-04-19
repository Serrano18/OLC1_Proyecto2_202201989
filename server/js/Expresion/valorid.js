"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Valorid = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Valorid extends expresion_1.Expresion {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Valor Id');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoId = (0, graphviz_1.createNode)(`${this.id}`);
        (0, graphviz_1.createEdge)(nodoPadre, nodoId);
    }
    interpretar(entorno) {
        const value = entorno.getVariable(this.id.toLowerCase());
        if (value != null) {
            return { valor: value.value, tipo: value.type };
        }
        else {
            const arreglo = entorno.getVector(this.id.toLowerCase());
            if (arreglo != null) {
                return { valor: arreglo.id, tipo: resultado_1.TipoDato.ID };
            }
            else {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `La variable o vector ${this.id} no existe`));
            }
        }
    }
}
exports.Valorid = Valorid;
