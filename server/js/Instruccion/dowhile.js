"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dowhile = void 0;
const resultado_1 = require("../Abstract/resultado");
const instruccion_1 = require("../Abstract/instruccion");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Dowhile extends instruccion_1.Instruccion {
    constructor(condicion, bloquedo, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloquedo = bloquedo;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instrucción DoWhile');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoDo = (0, graphviz_1.createNode)('do');
        (0, graphviz_1.createEdge)(nodoPadre, nodoDo);
        const nodoBloque = (0, graphviz_1.createNode)('block');
        (0, graphviz_1.createEdge)(nodoPadre, nodoBloque);
        this.bloquedo.crearGrafico(nodoBloque);
        const nodoWhile = (0, graphviz_1.createNode)('while');
        (0, graphviz_1.createEdge)(nodoPadre, nodoWhile);
        const nodoLParen = (0, graphviz_1.createNode)('(');
        (0, graphviz_1.createEdge)(nodoPadre, nodoLParen);
        const nodoExpresion = (0, graphviz_1.createNode)('Expression');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
        this.condicion.crearGrafico(nodoExpresion);
        const nodoRParen = (0, graphviz_1.createNode)(')');
        (0, graphviz_1.createEdge)(nodoPadre, nodoRParen);
        const nodoPuntoComa = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPuntoComa);
    }
    interpretar(entorno) {
        let condicion = this.condicion.interpretar(entorno);
        if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', "La condicion no es booleana ciclo Dowhile"));
        }
        do {
            const bloquedo = this.bloquedo.interpretar(entorno);
            if (bloquedo != null || bloquedo != undefined) {
                if (bloquedo == "continue") {
                    continue;
                }
                else if (bloquedo == "break") {
                    break;
                }
                else if (bloquedo.tV == "return") {
                    return bloquedo;
                }
                else {
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Instruccion no valida dentro de DoWhile`));
                }
            }
            condicion = this.condicion.interpretar(entorno);
            if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', "La condicion no es booleana ciclo Dowhile"));
            }
        } while (condicion.valor);
    }
}
exports.Dowhile = Dowhile;
