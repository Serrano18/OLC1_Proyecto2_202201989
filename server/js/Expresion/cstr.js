"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cstr = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const primitivo_1 = require("./primitivo");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Cstr extends expresion_1.Expresion {
    // Esta clase siempre pedirá línea y columna
    constructor(expre, line, colum) {
        super(line, colum);
        this.expre = expre;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('C_str');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
        this.expre.crearGrafico(nodoExpresion);
        const nodoPunto = (0, graphviz_1.createNode)('.');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPunto);
        const nodoC_str = (0, graphviz_1.createNode)('c_str');
        (0, graphviz_1.createEdge)(nodoPadre, nodoC_str);
        const nodoLParen = (0, graphviz_1.createNode)('(');
        (0, graphviz_1.createEdge)(nodoPadre, nodoLParen);
        const nodoRParen = (0, graphviz_1.createNode)(')');
        (0, graphviz_1.createEdge)(nodoPadre, nodoRParen);
    }
    // Método que siempre debe ejecutarse en todos los objetos que hereda
    interpretar(entorno) {
        try {
            const value = this.expre.interpretar(entorno);
            if (value.tipo != resultado_1.TipoDato.STRING) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", "Error de tipos en la funcion CSTR"));
            }
            if (value != null) {
                const cadena = value.valor;
                const caracteres = [];
                for (let i = 0; i < cadena.length; i++) {
                    caracteres.push(new primitivo_1.Primitivo(value.valor[i], resultado_1.TipoDato.CHAR, this.line, this.column));
                }
                return { valor: caracteres, tipo: resultado_1.TipoDato.CHAR };
            }
            else {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", "El valor es nulo en la funcion CSTR"));
            }
        }
        catch (e) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", "Error en la funcion CSTR"));
        }
    }
}
exports.Cstr = Cstr;
