"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avariable = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Avariable extends instruccion_1.Instruccion {
    constructor(id, valor, linea, columna) {
        super(linea, columna);
        this.id = id.toLowerCase();
        this.valor = valor;
    }
    crearGrafico(padre) {
        var _a;
        const nodoPadre = (0, graphviz_1.createNode)('Actualizar Valor');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoId = (0, graphviz_1.createNode)(`${this.id}`);
        (0, graphviz_1.createEdge)(nodoPadre, nodoId);
        const nodoAssign = (0, graphviz_1.createNode)('=');
        (0, graphviz_1.createEdge)(nodoPadre, nodoAssign);
        const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
        (_a = this.valor) === null || _a === void 0 ? void 0 : _a.crearGrafico(nodoExpresion);
        const nodopyc = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodopyc);
    }
    //Esto es la asignacion tengo que crear la validacion para que pueda igualar vectores solo si son del mismo tamaño
    interpretar(entorno) {
        var _a;
        const value = entorno.getVariable(this.id.toLowerCase());
        if (value == null) {
            const vector = entorno.getVector(this.id.toLowerCase());
            if (vector == null) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `La variable o vector ${this.id} no existe`));
            }
            else {
                if (this.valor == null) {
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `La variable o vector ${this.id} no existe`));
                }
                else {
                    if (this.valor != null) {
                        const valor = this.valor.interpretar(entorno);
                        if (valor.tipo == resultado_1.TipoDato.ID) {
                            const vector2 = entorno.getVector(valor.valor);
                            if (vector2 == null) {
                                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El vector ${this.id} no existe`));
                            }
                            else {
                                if (vector.values.length != vector2.values.length || vector.values[0].length != vector2.values[0].length) {
                                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El vector ${this.id} no tiene las mismas dimensiones que ${vector2.id}`));
                                }
                                else {
                                    (_a = entorno.getVector(this.id.toLowerCase())) === null || _a === void 0 ? void 0 : _a.setVector(vector2.values);
                                    entorno.editarVectorTablaSimbolos(this.id.toLowerCase(), vector2, vector.tipo, vector.line, vector.column);
                                }
                            }
                        }
                        else {
                            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Los tiopos de datos no coinciden con el vector ${this.id}`));
                        }
                    }
                    else {
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El valor asignado es null`));
                    }
                }
            }
        }
        else {
            if (this.valor != null) {
                const valor = this.valor.interpretar(entorno);
                if (value.type == valor.tipo) {
                    entorno.editarVariable(this.id.toLowerCase(), valor.valor, valor.tipo, "variable", value.fila, value.columna);
                    entorno.editarVariableTablaSimbolos(this.id.toLowerCase(), valor.valor, valor.tipo, "Variable", entorno, value.fila, value.columna);
                }
                else {
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Los tipos de datos no coinciden con la variable ${this.id}`));
                }
            }
            else {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El valor asignado es null`));
            }
        }
        return null;
    }
}
exports.Avariable = Avariable;
