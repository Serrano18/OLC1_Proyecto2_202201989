"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dvectores2 = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
//Esta es para la declaracion tipo1 de vectores
class Dvectores2 extends instruccion_1.Instruccion {
    constructor(tipo, id, estado, valores, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id.toLowerCase();
        this.valores = valores;
        this.estado = estado;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Declaración de Vector');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoTipo = (0, graphviz_1.createNode)(this.tipo);
        (0, graphviz_1.createEdge)(nodoPadre, nodoTipo);
        const nodoId = (0, graphviz_1.createNode)(this.estado ? `${this.id}[]` : `${this.id}[][]`);
        (0, graphviz_1.createEdge)(nodoPadre, nodoId);
        const nodoIgual = (0, graphviz_1.createNode)(' = ');
        (0, graphviz_1.createEdge)(nodoPadre, nodoIgual);
        const nodoValores = (0, graphviz_1.createNode)('Lista de Expresiones');
        (0, graphviz_1.createEdge)(nodoPadre, nodoValores);
        if (this.valores instanceof expresion_1.Expresion) {
            this.valores.crearGrafico(nodoValores);
        }
        else {
            const cori = (0, graphviz_1.createNode)('[');
            (0, graphviz_1.createEdge)(nodoPadre, cori);
            if (!(this.valores[0] instanceof Array)) {
                for (let i = 0; i < this.valores.length; i++) {
                    const nodoFirst = (0, graphviz_1.createNode)('Expresion');
                    (0, graphviz_1.createEdge)(nodoPadre, nodoFirst);
                    const valor = this.valores[i];
                    valor.crearGrafico(nodoValores);
                    if (i < this.valores.length - 1) {
                        const cord = (0, graphviz_1.createNode)(']');
                        (0, graphviz_1.createEdge)(nodoPadre, cord);
                    }
                }
            }
            else {
                for (let i = 0; i < this.valores.length; i++) {
                    const column = this.valores[i];
                    const cori = (0, graphviz_1.createNode)('[');
                    (0, graphviz_1.createEdge)(nodoPadre, cori);
                    for (let j = 0; j < column.length; j++) {
                        const nodoFirst = (0, graphviz_1.createNode)('Expresion');
                        (0, graphviz_1.createEdge)(nodoPadre, nodoFirst);
                        const exp = column[j];
                        exp.crearGrafico(nodoFirst);
                        if (j < column.length - 1) {
                            const cord = (0, graphviz_1.createNode)(',');
                            (0, graphviz_1.createEdge)(nodoPadre, cord);
                        }
                        else {
                            const cord = (0, graphviz_1.createNode)(']');
                            (0, graphviz_1.createEdge)(nodoPadre, cord);
                        }
                    }
                }
            }
            const cord = (0, graphviz_1.createNode)(']');
            (0, graphviz_1.createEdge)(nodoPadre, cord);
        }
        const pyc = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, pyc);
    }
    interpretar(entorno) {
        var _a, _b, _c, _d, _e;
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
        if (this.estado && !(this.valores instanceof expresion_1.Expresion)) {
            if (!(this.valores[0] instanceof Array)) {
                const maxFilas = this.valores.length;
                const maxcolumnas = 1;
                entorno.guardarVector(this.id, dtipo, maxFilas, maxcolumnas, this.line, this.column);
                (_a = entorno.obtenerVector(this.id)) === null || _a === void 0 ? void 0 : _a.llenarpordefecto(this.id, valordefecto, dtipo, this.line, this.column);
                for (let i = 0; i < maxFilas; i++) {
                    //recibo una expresion simple
                    const expr = this.valores[i];
                    try {
                        const valores = expr.interpretar(entorno);
                        if (dtipo != valores.tipo) {
                            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
                        }
                        (_b = entorno.getVector(this.id)) === null || _b === void 0 ? void 0 : _b.addValue(i, 0, this.id, valores.valor, dtipo, this.line, this.column);
                    }
                    catch (e) {
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Error en la interpretacion de la expresion`));
                    }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), maxFilas, 0, this.line, this.column, entorno);
            }
            else {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Error Semantico estas creando una matriz`));
            }
        }
        else if (!(this.valores instanceof expresion_1.Expresion)) {
            if (this.valores[0] instanceof Array) {
                const maxFilas = this.valores.length;
                const maxcolumnas = Math.max(...this.valores.map(columnas => columnas instanceof Array ? columnas.length : 0));
                entorno.guardarVector(this.id, dtipo, maxFilas, maxcolumnas, this.line, this.column);
                (_c = entorno.obtenerVector(this.id)) === null || _c === void 0 ? void 0 : _c.llenarpordefecto(this.id, valordefecto, dtipo, this.line, this.column);
                for (let i = 0; i < maxFilas; i++) {
                    //recibo una expresion simple
                    const columna = this.valores[i];
                    for (let j = 0; j < columna.length; j++) {
                        const expr = columna[j];
                        try {
                            const valores = expr.interpretar(entorno);
                            if (dtipo != valores.tipo) {
                                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
                            }
                            else {
                                (_d = entorno.getVector(this.id)) === null || _d === void 0 ? void 0 : _d.addValue(i, j, this.id, valores.valor, dtipo, this.line, this.column);
                            }
                        }
                        catch (e) {
                            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Error en la interpretacion de la expresion`));
                        }
                    }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), maxFilas, maxcolumnas, this.line, this.column, entorno);
            }
            else {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Error Semantico estas creando un vector simple`));
            }
        }
        else {
            try {
                const expr = this.valores.interpretar(entorno);
                const arreglo = expr.valor;
                entorno.guardarVector(this.id, dtipo, arreglo.length, 1, this.line, this.column);
                for (let i = 0; i < arreglo.length; i++) {
                    try {
                        const valores = arreglo[i].interpretar(entorno);
                        if (dtipo != valores.tipo) {
                            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
                        }
                        (_e = entorno.getVector(this.id)) === null || _e === void 0 ? void 0 : _e.addValue(i, 0, this.id, valores.valor, dtipo, this.line, this.column);
                    }
                    catch (e) {
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Error en la interpretacion de los valores del vector`));
                    }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), arreglo.length, 0, this.line, this.column, entorno);
            }
            catch (e) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Error en la interpretacion de la expresion`));
            }
        }
    }
}
exports.Dvectores2 = Dvectores2;
