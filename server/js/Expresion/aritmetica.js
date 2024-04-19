"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Aritmetica extends expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1, e2, op, linea, columna) {
        super(linea, columna);
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    crearGrafico(parent) {
        let operacionStr = '';
        switch (this.Operacion) {
            case resultado_1.OpAritmetica.SUMA:
                operacionStr = '+';
                break;
            case resultado_1.OpAritmetica.RESTA:
                operacionStr = '-';
                break;
            case resultado_1.OpAritmetica.PRODUCTO:
                operacionStr = '*';
                break;
            case resultado_1.OpAritmetica.DIVISION:
                operacionStr = '/';
                break;
            case resultado_1.OpAritmetica.MOD:
                operacionStr = '%';
                break;
            case resultado_1.OpAritmetica.POW:
                operacionStr = '^';
                break;
            case resultado_1.OpAritmetica.UNARIA:
                operacionStr = '-';
                break;
            default:
                break;
        }
        const parentNode = (0, graphviz_1.createNode)('Aritmetica');
        const operationNode = (0, graphviz_1.createNode)(`${operacionStr}`);
        this.exp1.crearGrafico(operationNode);
        if (this.Operacion != resultado_1.OpAritmetica.UNARIA) {
            this.exp2.crearGrafico(operationNode);
        }
        (0, graphviz_1.createEdge)(parent, parentNode);
        (0, graphviz_1.createEdge)(parentNode, operationNode);
    }
    interpretar(entorno) {
        // Ejecutamos los noterminales
        const resultadoIzq = this.exp1.interpretar(entorno);
        const resultadoDer = this.exp2.interpretar(entorno);
        // Lógica del intérprete
        // Comparamos el tipo de operación
        if (this.Operacion == resultado_1.OpAritmetica.UNARIA) {
            const dominante = UNARIA[resultadoIzq.tipo];
            if (dominante == resultado_1.TipoDato.NULO) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `tipo dato ${dominante} no valido para la UNARIO`));
            }
            else if (dominante == resultado_1.TipoDato.DOUBLE) {
                return { valor: resultadoIzq.valor * -1, tipo: dominante };
            }
            else if (dominante == resultado_1.TipoDato.NUMBER) {
                return { valor: resultadoIzq.valor * -1, tipo: dominante };
            }
            else {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `tipo dato ${dominante} no valido para la UNARIA`));
            }
        }
        if (this.Operacion == resultado_1.OpAritmetica.SUMA) {
            // Valor dominante
            const dominante = SUMAS[resultadoIzq.tipo][resultadoDer.tipo];
            switch (dominante) {
                case resultado_1.TipoDato.NULO:
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `tipo dato ${dominante} no valido para la suma`));
                case resultado_1.TipoDato.NUMBER:
                    convertir(resultadoIzq);
                    convertir(resultadoDer);
                    return { valor: resultadoIzq.valor + resultadoDer.valor, tipo: dominante };
                case resultado_1.TipoDato.DOUBLE:
                    convertir(resultadoIzq);
                    convertir(resultadoDer);
                    const resultado = resultadoIzq.valor + resultadoDer.valor;
                    return { valor: resultado, tipo: dominante };
                case resultado_1.TipoDato.STRING:
                    return { valor: resultadoIzq.valor.toString() + resultadoDer.valor.toString(), tipo: dominante };
                default:
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `tipo dato ${dominante} no valido para la suma`));
            }
        }
        else if (this.Operacion == resultado_1.OpAritmetica.RESTA) {
            const dominante = RESTAS[resultadoIzq.tipo][resultadoDer.tipo];
            if (dominante == resultado_1.TipoDato.NULO) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Los tipos de datos no son valido para la resta`));
            }
            convertir(resultadoIzq);
            convertir(resultadoDer);
            const resultado = resultadoIzq.valor - resultadoDer.valor;
            if (dominante == resultado_1.TipoDato.DOUBLE) {
                return { valor: resultado, tipo: dominante };
            }
            return { valor: resultado, tipo: dominante };
        }
        else if (this.Operacion == resultado_1.OpAritmetica.PRODUCTO) {
            const dominante = PRODUCTO[resultadoIzq.tipo][resultadoDer.tipo];
            if (resultadoIzq.tipo == resultado_1.TipoDato.CHAR)
                resultadoIzq.valor = resultadoIzq.valor.charCodeAt(0);
            if (resultadoDer.tipo == resultado_1.TipoDato.CHAR)
                resultadoDer.valor = resultadoDer.valor.charCodeAt(0);
            if (dominante == resultado_1.TipoDato.NULO) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Los tipos de dato no son valido para la multiplicacion`));
            }
            if (dominante == resultado_1.TipoDato.DOUBLE) {
                if (resultadoIzq.tipo == resultado_1.TipoDato.CHAR)
                    resultadoIzq.valor = resultadoIzq.valor.charCodeAt(0);
                if (resultadoDer.tipo == resultado_1.TipoDato.CHAR)
                    resultadoDer.valor = resultadoDer.valor.charCodeAt(0);
                const resultado = resultadoIzq.valor * resultadoDer.valor;
                return { valor: resultado, tipo: dominante };
            }
            return { valor: resultadoIzq.valor * resultadoDer.valor, tipo: dominante };
        }
        else if (this.Operacion == resultado_1.OpAritmetica.DIVISION) {
            const dominante = DIVISION[resultadoIzq.tipo][resultadoDer.tipo];
            if (resultadoDer.valor == 0) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `No se puede dividir en 0`));
            }
            if (dominante == resultado_1.TipoDato.NULO) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Los tipos de dato no son valido para la division`));
            }
            const resultado = resultadoIzq.valor / resultadoDer.valor;
            return { valor: resultado, tipo: dominante };
        }
        else if (this.Operacion == resultado_1.OpAritmetica.MOD) {
            const dominante = MODULO[resultadoIzq.tipo][resultadoDer.tipo];
            switch (dominante) {
                case resultado_1.TipoDato.DOUBLE:
                    const resultado = resultadoIzq.valor % resultadoDer.valor;
                    return { valor: resultado, tipo: resultado_1.TipoDato.DOUBLE };
                default:
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Los tipos de dato no son valido para el Modulo`));
            }
        }
        else if (this, this.Operacion == resultado_1.OpAritmetica.POW) {
            const dominante = POTENCIA[resultadoIzq.tipo][resultadoDer.tipo];
            switch (dominante) {
                case resultado_1.TipoDato.NUMBER:
                    return { valor: Math.pow(resultadoIzq.valor, resultadoDer.valor), tipo: resultado_1.TipoDato.NUMBER };
                case resultado_1.TipoDato.DOUBLE:
                    const resultado = Math.pow(resultadoIzq.valor, resultadoDer.valor);
                    return { valor: resultado, tipo: resultado_1.TipoDato.DOUBLE };
                default:
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Los tipos de dato no son valido para la potencia`));
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
const UNARIA = [resultado_1.TipoDato.NUMBER, resultado_1.TipoDato.DOUBLE, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO, resultado_1.TipoDato.NULO];
function convertir(tipoR) {
    if (tipoR.tipo == resultado_1.TipoDato.BOOLEANO)
        tipoR.valor = tipoR.valor ? 1 : 0;
    if (tipoR.tipo == resultado_1.TipoDato.CHAR)
        tipoR.valor = tipoR.valor.charCodeAt(0);
}
