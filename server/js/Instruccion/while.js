"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const resultado_1 = require("../Abstract/resultado");
const instruccion_1 = require("../Abstract/instruccion");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class While extends instruccion_1.Instruccion {
    constructor(condicion, bloquedo, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloquedo = bloquedo;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instrucción While');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoWhile = (0, graphviz_1.createNode)('While');
        (0, graphviz_1.createEdge)(nodoPadre, nodoWhile);
        const nodopari = (0, graphviz_1.createNode)('(');
        (0, graphviz_1.createEdge)(nodoPadre, nodopari);
        const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
        this.condicion.crearGrafico(nodoExpresion);
        const nodopard = (0, graphviz_1.createNode)(')');
        (0, graphviz_1.createEdge)(nodoPadre, nodopard);
        const nodoBloque = (0, graphviz_1.createNode)('Bloque');
        (0, graphviz_1.createEdge)(nodoPadre, nodoBloque);
        this.bloquedo.crearGrafico(nodoBloque);
    }
    interpretar(entorno) {
        let condicion = this.condicion.interpretar(entorno);
        if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', "La condicion no es de tipo booleano"));
        }
        while (condicion.valor) {
            condicion = this.condicion.interpretar(entorno);
            if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', "La condicion no es de tipo booleano"));
            }
            const bloquedo = this.bloquedo.interpretar(entorno);
            if (bloquedo != null || bloquedo != undefined) {
                if (bloquedo == "continue") {
                    continue;
                }
                else if (bloquedo == "break") {
                    break;
                }
                else if (bloquedo.tV == 'return') {
                    return bloquedo;
                }
                else {
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Instruccion no valida dentro de ciclo While`));
                }
            }
        }
    }
}
exports.While = While;
