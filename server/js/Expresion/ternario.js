"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Ternario extends expresion_1.Expresion {
    constructor(condicion, exp1, exp2, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    crearGrafico(parent) {
        const parentNode = (0, graphviz_1.createNode)('Ternario');
        (0, graphviz_1.createEdge)(parent, parentNode);
        const condicionNode = (0, graphviz_1.createNode)('Condicion');
        (0, graphviz_1.createEdge)(parentNode, condicionNode);
        this.condicion.crearGrafico(condicionNode);
        const ternaryNode = (0, graphviz_1.createNode)('?');
        (0, graphviz_1.createEdge)(parentNode, ternaryNode);
        const exp1Node = (0, graphviz_1.createNode)('If');
        (0, graphviz_1.createEdge)(parentNode, exp1Node);
        this.exp1.crearGrafico(exp1Node);
        const colonNode = (0, graphviz_1.createNode)(':');
        (0, graphviz_1.createEdge)(parentNode, colonNode);
        const exp2Node = (0, graphviz_1.createNode)('Else');
        (0, graphviz_1.createEdge)(parentNode, exp2Node);
        this.exp2.crearGrafico(exp2Node);
    }
    interpretar(entorno) {
        const con = this.condicion.interpretar(entorno);
        if (con.tipo == resultado_1.TipoDato.BOOLEANO) {
            if (con.valor) {
                return this.exp1.interpretar(entorno);
            }
            else {
                return this.exp2.interpretar(entorno);
            }
        }
        else {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `La condicion no es booleana.`));
        }
    }
}
exports.Ternario = Ternario;
