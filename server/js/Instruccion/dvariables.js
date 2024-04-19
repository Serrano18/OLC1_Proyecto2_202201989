"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dvariables = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Dvariables extends instruccion_1.Instruccion {
    constructor(tipo, id, valor, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Declaración');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoTipo = (0, graphviz_1.createNode)(this.tipo);
        (0, graphviz_1.createEdge)(nodoPadre, nodoTipo);
        for (let i = 0; i < this.id.length; i++) {
            const nodoId = (0, graphviz_1.createNode)(this.id[i]);
            (0, graphviz_1.createEdge)(nodoPadre, nodoId);
            if (i < this.id.length - 1) {
                const nodoComa = (0, graphviz_1.createNode)(',');
                (0, graphviz_1.createEdge)(nodoPadre, nodoComa);
            }
        }
        if (this.valor != null) {
            const nodoIgual = (0, graphviz_1.createNode)('=');
            (0, graphviz_1.createEdge)(nodoPadre, nodoIgual);
            const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
            (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
            this.valor.crearGrafico(nodoExpresion);
        }
        const nodoPuntoComa = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPuntoComa);
    }
    interpretar(entorno) {
        let dtipo;
        let valordefecto;
        switch (this.tipo.toLowerCase()) {
            case "int":
                dtipo = resultado_1.TipoDato.NUMBER;
                valordefecto = Number(0);
                break;
            case "double":
                dtipo = resultado_1.TipoDato.DOUBLE;
                valordefecto = Number(0.0);
                break;
            case "char":
                dtipo = resultado_1.TipoDato.CHAR;
                valordefecto = '0';
                break;
            case "std::string":
                dtipo = resultado_1.TipoDato.STRING;
                valordefecto = "";
                break;
            case "bool":
                dtipo = resultado_1.TipoDato.BOOLEANO;
                valordefecto = true;
                break;
            default:
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no valido`));
        }
        if (this.valor != null) {
            const value = this.valor.interpretar(entorno);
            if (dtipo == value.tipo) {
                this.id.forEach(id => {
                    entorno.guardar(id.toLowerCase(), value.valor, value.tipo, "Variable", this.line, this.column);
                    entorno.guardarVariablesTablaSimbolos(id.toLowerCase(), value.valor, value.tipo, "Variable", entorno, this.line, this.column);
                });
            }
            else {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
            }
        }
        else {
            this.id.forEach(id => {
                entorno.guardar(id.toLowerCase(), valordefecto, dtipo, "Variable", this.line, this.column);
                entorno.guardarVariablesTablaSimbolos(id.toLowerCase(), valordefecto, dtipo, "Variable", entorno, this.line, this.column);
            });
        }
    }
}
exports.Dvariables = Dvariables;
