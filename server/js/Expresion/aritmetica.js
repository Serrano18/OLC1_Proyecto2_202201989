"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Aritmetica extends expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1, e2, op, linea, columna) {
        super(linea, columna);
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    interpretar(entorno) {
        // Ejecutamos los noterminales
        const resultadoIzq = this.exp1.interpretar(entorno);
        const resultadoDer = this.exp2.interpretar(entorno);
        // Lógica del intérprete
        // Comparamos el tipo de operación
        if (this.Operacion == resultado_1.OpAritmetica.SUMA) {
            // Valor dominante
            const dominante = SUMAS[resultadoIzq.tipo][resultadoDer.tipo];
            if (dominante == resultado_1.TipoDato.NULO) {
                throw Error("tipo dato no valido");
            }
            if (dominante == resultado_1.TipoDato.NUMBER || resultado_1.TipoDato.DOUBLE == dominante) {
                if (resultadoIzq.tipo == resultado_1.TipoDato.BOOLEANO)
                    resultadoIzq.valor = resultadoIzq.valor ? 1 : 0;
                if (resultadoDer.tipo == resultado_1.TipoDato.BOOLEANO)
                    resultadoDer.valor = resultadoDer.valor ? 1 : 0;
            }
            else if (dominante == resultado_1.TipoDato.STRING) {
                return { valor: resultadoIzq.valor.toString() + resultadoDer.valor.toString(), tipo: dominante };
            }
            // Operacion
            return { valor: resultadoIzq.valor + resultadoDer.valor, tipo: dominante };
        }
        else if (this.Operacion == resultado_1.OpAritmetica.RESTA) {
            const dominante = RESTAS[resultadoIzq.tipo][resultadoDer.tipo];
            if (resultadoIzq.tipo == resultado_1.TipoDato.BOOLEANO)
                resultadoIzq.valor = resultadoIzq.valor ? 1 : 0;
            if (resultadoDer.tipo == resultado_1.TipoDato.BOOLEANO)
                resultadoDer.valor = resultadoDer.valor ? 1 : 0;
            if (dominante == resultado_1.TipoDato.NULO) {
                throw Error("tipo dato no valido");
            }
            return { valor: resultadoIzq.valor - resultadoDer.valor, tipo: dominante };
        }
        else if (this.Operacion == resultado_1.OpAritmetica.PRODUCTO) {
            const dominante = PRODUCTO[resultadoIzq.tipo][resultadoDer.tipo];
            if (dominante == resultado_1.TipoDato.NULO) {
                throw Error("tipo dato no valido");
            }
            return { valor: resultadoIzq.valor * resultadoDer.valor, tipo: dominante };
        }
        else if (this.Operacion == resultado_1.OpAritmetica.DIVISION) {
            const dominante = DIVISION[resultadoIzq.tipo][resultadoDer.tipo];
            if (dominante == resultado_1.TipoDato.NULO) {
                throw Error("tipo dato no valido");
            }
            return { valor: resultadoIzq.valor / resultadoDer.valor, tipo: dominante };
        }
        else if (this.Operacion == resultado_1.OpAritmetica.MOD) {
            const dominante = MODULO[resultadoIzq.tipo][resultadoDer.tipo];
            switch (dominante) {
                case resultado_1.TipoDato.DOUBLE:
                    return { valor: resultadoIzq.valor % resultadoDer.valor, tipo: resultado_1.TipoDato.DOUBLE };
                default:
                    throw Error(`Error: No se puede modular ${resultado_1.TipoDato[resultadoIzq.tipo]} con ${resultado_1.TipoDato[resultadoDer.tipo]}`);
            }
        }
        else if (this, this.Operacion == resultado_1.OpAritmetica.POW) {
            const dominante = POTENCIA[resultadoIzq.tipo][resultadoDer.tipo];
            switch (dominante) {
                case resultado_1.TipoDato.NUMBER:
                    return { valor: Math.pow(resultadoIzq.valor, resultadoDer.valor), tipo: resultado_1.TipoDato.NUMBER };
                case resultado_1.TipoDato.DOUBLE:
                    return { valor: Math.pow(resultadoIzq.valor, resultadoDer.valor), tipo: resultado_1.TipoDato.DOUBLE };
                default:
                    throw Error(`Error: No se puede potenciar ${resultado_1.TipoDato[resultadoIzq.tipo]} con ${resultado_1.TipoDato[resultadoDer.tipo]}`);
            }
        }
        return { valor: null, tipo: resultado_1.TipoDato.NULO };
    }
}
exports.Aritmetica = Aritmetica;
const SUMAS = [
    [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.STRING],
    [resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.STRING],
    [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.STRING],
    [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.STRING, resultado_1.TipoDato.STRING],
    [resultado_1.TipoDato.STRING, resultado_1.TipoDato.STRING, resultado_1.TipoDato.STRING, resultado_1.TipoDato.STRING, resultado_1.TipoDato.STRING],
];
const RESTAS = [
    [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
];
const PRODUCTO = [
    [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
];
const DIVISION = [
    [resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
];
const MODULO = [
    [resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
];
const POTENCIA = [
    [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
    [resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO],
];
function convertir(tipoR) {
    if (tipoR.tipo == resultado_1.TipoDato.BOOLEANO)
        tipoR.valor = tipoR.valor ? 1 : 0;
    if (tipoR.tipo == resultado_1.TipoDato.CHAR)
        tipoR.valor = tipoR.valor.charCodeAt(0);
}
