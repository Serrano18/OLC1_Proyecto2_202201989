"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Execute = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Execute extends instruccion_1.Instruccion {
    constructor(funcion, line, column) {
        super(line, column);
        this.funcion = funcion;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instrucción Execute');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoExecute = (0, graphviz_1.createNode)('execute');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExecute);
        const nodoFunction = (0, graphviz_1.createNode)('Valor Funcion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoFunction);
        this.funcion.crearGrafico(nodoFunction);
        const nodoPuntoComa = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPuntoComa);
    }
    interpretar(entorno) {
        if (entorno.getFuncion(this.funcion.id) == null) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `La funcion ${this.funcion.id} no existe en el entorno actual`));
        }
        else {
            const resultado = this.funcion.interpretar(entorno);
            if (resultado != null) {
                return { valor: resultado.valor, tipo: resultado.tipo };
            }
            else {
                return { valor: null, tipo: resultado_1.TipoDato.NULO };
            }
        }
    }
}
exports.Execute = Execute;
