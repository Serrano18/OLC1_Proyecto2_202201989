"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Function extends instruccion_1.Instruccion {
    constructor(id, tipostring, parametros, bloque, line, column) {
        super(line, column);
        this.id = id.toLowerCase();
        this.parametros = parametros;
        this.bloque = bloque;
        this.tipo = resultado_1.TipoDato.NULO;
        this.tipostring = tipostring;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Declaración Funcion');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoTipo = (0, graphviz_1.createNode)(this.tipostring);
        (0, graphviz_1.createEdge)(nodoPadre, nodoTipo);
        const nodoId = (0, graphviz_1.createNode)(this.id);
        (0, graphviz_1.createEdge)(nodoPadre, nodoId);
        const nodoLParen = (0, graphviz_1.createNode)('(');
        (0, graphviz_1.createEdge)(nodoPadre, nodoLParen);
        if (this.parametros.length != 0) {
            for (let i = 0; i < this.parametros.length; i++) {
                const nodoFirst = (0, graphviz_1.createNode)('Parametros');
                (0, graphviz_1.createEdge)(nodoPadre, nodoFirst);
                const nodoTipo = (0, graphviz_1.createNode)(this.parametros[i].tipo);
                (0, graphviz_1.createEdge)(nodoFirst, nodoTipo);
                let nodoId;
                if (this.parametros[i].vect) {
                    if (this.parametros[i].vsimple) {
                        nodoId = (0, graphviz_1.createNode)(`${this.parametros[i].id}[]`);
                    }
                    else {
                        nodoId = (0, graphviz_1.createNode)(`${this.parametros[i].id}[][]`);
                    }
                }
                else {
                    nodoId = (0, graphviz_1.createNode)(this.parametros[i].id);
                }
                (0, graphviz_1.createEdge)(nodoFirst, nodoId);
                if (i < this.parametros.length - 1) {
                    const nodoComa = (0, graphviz_1.createNode)(',');
                    (0, graphviz_1.createEdge)(nodoPadre, nodoComa);
                }
            }
        }
        const nodoRParen = (0, graphviz_1.createNode)(')');
        (0, graphviz_1.createEdge)(nodoPadre, nodoRParen);
        const nodoBloque = (0, graphviz_1.createNode)('Bloque');
        (0, graphviz_1.createEdge)(nodoPadre, nodoBloque);
        this.bloque.crearGrafico(nodoBloque);
    }
    interpretar(environment) {
        let dtipo;
        switch (this.tipostring.toLowerCase()) {
            case "int":
                dtipo = resultado_1.TipoDato.NUMBER;
                break;
            case "double":
                dtipo = resultado_1.TipoDato.DOUBLE;
                break;
            case "char":
                dtipo = resultado_1.TipoDato.CHAR;
                break;
            case "std::string":
                dtipo = resultado_1.TipoDato.STRING;
                break;
            case "bool":
                dtipo = resultado_1.TipoDato.BOOLEANO;
                break;
            case "void":
                dtipo = resultado_1.TipoDato.NULO;
                break;
            default:
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipostring} no valido`));
        }
        this.tipo = dtipo;
        environment.guardarFuncion(this.id, this);
    }
}
exports.Function = Function;
