"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const graphviz_1 = require("../graphivz/graphviz");
class Primitivo extends expresion_1.Expresion {
    // Estos parámetros deben pasarlo en el archivo de JISON
    // En jison ustedes saber qué tipo de dato es el terminal según su gramática de expresiones
    constructor(e1, tipo, linea, columna) {
        super(linea, columna);
        this.exp1 = e1;
        this.tipo = tipo;
    }
    interpretar() {
        // Ejecutamos los noterminales
        // Comparamos el tipo
        if (resultado_1.TipoDato.NUMBER == this.tipo) {
            return { valor: Number(this.exp1), tipo: this.tipo };
        }
        else if (resultado_1.TipoDato.DOUBLE == this.tipo) {
            return { valor: Number(this.exp1), tipo: this.tipo };
        }
        else if (resultado_1.TipoDato.BOOLEANO == this.tipo) {
            return { valor: this.exp1.toLowerCase() == "true" ? true : false, tipo: this.tipo };
        }
        else if (resultado_1.TipoDato.STRING == this.tipo) {
            return { valor: this.exp1.toString(), tipo: this.tipo };
        }
        else if (resultado_1.TipoDato.CHAR == this.tipo) {
            return { valor: this.exp1, tipo: this.tipo };
        }
        // en caso que no sea ninguno
        return { valor: null, tipo: resultado_1.TipoDato.NULO };
    }
    crearGrafico(parent) {
        let color = "";
        switch (this.tipo) {
            case resultado_1.TipoDato.NUMBER:
                color = "blue";
                break;
            case resultado_1.TipoDato.DOUBLE:
                color = "gold";
                break;
            case resultado_1.TipoDato.BOOLEANO:
                color = "green";
                break;
            case resultado_1.TipoDato.STRING:
                color = "orange";
                break;
            case resultado_1.TipoDato.CHAR:
                color = "red";
                break;
            default:
                break;
        }
        (0, graphviz_1.createEdge)(parent, (0, graphviz_1.createNodeColor)(`${this.exp1}`, color));
    }
}
exports.Primitivo = Primitivo;
