"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subebaja = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Subebaja extends instruccion_1.Instruccion {
    constructor(id, tipo, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.tipo = tipo;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instrucción Incremento o Decremento');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoId = (0, graphviz_1.createNode)(this.id);
        (0, graphviz_1.createEdge)(nodoPadre, nodoId);
        const nodoIncDec = (0, graphviz_1.createNode)(this.tipo ? '++' : '--');
        (0, graphviz_1.createEdge)(nodoPadre, nodoIncDec);
        const nodoPuntoComa = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPuntoComa);
    }
    interpretar(entorno) {
        const value = entorno.getVariable(this.id);
        if (value == null) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `La variable ${this.id} no existe`));
        }
        if (value.type == resultado_1.TipoDato.NUMBER || value.type == resultado_1.TipoDato.DOUBLE) {
            if (this.tipo) {
                entorno.editarVariable(this.id, value.value + 1, value.type, "Variable", value.fila, value.columna);
                entorno.editarVariableTablaSimbolos(this.id, value.value + 1, value.type, "Variable", entorno, value.fila, value.columna);
                return { valor: value.value + 1, tipo: value.type };
            }
            else {
                entorno.editarVariable(this.id, value.value - 1, value.type, "Variable", value.fila, value.columna);
                entorno.editarVariableTablaSimbolos(this.id, value.value - 1, value.type, "Variable", entorno, value.fila, value.columna);
                return { valor: value.value - 1, tipo: value.type };
            }
        }
        else {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `La variable ${this.id} no es de tipo int o double`));
        }
    }
}
exports.Subebaja = Subebaja;
