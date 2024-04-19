"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const resultado_1 = require("../Abstract/resultado");
const instruccion_1 = require("../Abstract/instruccion");
const Evironment_1 = require("../Symbol/Evironment");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class For extends instruccion_1.Instruccion {
    constructor(declaracion, condicion, actualizacion, bloquef, linea, columna) {
        super(linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.bloquef = bloquef;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instrucción For');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoFor = (0, graphviz_1.createNode)('for');
        (0, graphviz_1.createEdge)(nodoPadre, nodoFor);
        const nodoLParen = (0, graphviz_1.createNode)('(');
        (0, graphviz_1.createEdge)(nodoPadre, nodoLParen);
        const nodoInstruction = (0, graphviz_1.createNode)('Instucciones');
        (0, graphviz_1.createEdge)(nodoPadre, nodoInstruction);
        this.declaracion.crearGrafico(nodoInstruction);
        const nodoSemiColon1 = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoSemiColon1);
        const nodoExpression = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpression);
        this.condicion.crearGrafico(nodoExpression);
        const nodoSemiColon2 = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoSemiColon2);
        const nodoInstruction2 = (0, graphviz_1.createNode)('Instrucciones');
        (0, graphviz_1.createEdge)(nodoPadre, nodoInstruction2);
        this.actualizacion.crearGrafico(nodoInstruction2);
        const nodoRParen = (0, graphviz_1.createNode)(')');
        (0, graphviz_1.createEdge)(nodoPadre, nodoRParen);
        const nodoBlock = (0, graphviz_1.createNode)('Block');
        (0, graphviz_1.createEdge)(nodoPadre, nodoBlock);
        this.bloquef.crearGrafico(nodoBlock);
    }
    interpretar(entorno) {
        const newEntorno = new Evironment_1.Environment(entorno);
        this.declaracion.interpretar(newEntorno);
        let condicion = this.condicion.interpretar(newEntorno);
        if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', "La condicion no es booleana ciclo For"));
        }
        while (condicion.valor) {
            const bloquef = this.bloquef.interpretar(newEntorno);
            if (bloquef != null) {
                if (bloquef == "continue") {
                    continue;
                }
                else if (bloquef == "break") {
                    break;
                }
                else if (bloquef.tV == 'return') {
                    return bloquef;
                }
                else {
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Instruccion no valida dentro de For`));
                }
            }
            this.actualizacion.interpretar(newEntorno);
            condicion = this.condicion.interpretar(newEntorno);
            if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', "La condicion no es booleana ciclo For"));
            }
        }
    }
}
exports.For = For;
