"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dvectores2 = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
//Esta es para la declaracion tipo1 de vectores
class Dvectores2 extends instruccion_1.Instruccion {
    constructor(tipo, id, estado, valores, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.valores = valores;
        this.estado = estado;
    }
    interpretar(entorno, consola) {
        var _a, _b, _c, _d, _e;
        let dtipo;
        let valordefecto;
        switch (this.tipo.toString()) {
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
                throw new Error('Error: Tipo de dato invalido');
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
                            throw new Error("Los tipos de datos no son validos");
                        }
                        (_b = entorno.getVector(this.id)) === null || _b === void 0 ? void 0 : _b.addValue(i, 0, this.id, valores.valor, dtipo, this.line, this.column);
                    }
                    catch (e) {
                        console.log("no interpreta");
                    }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), maxFilas, 0, this.line, this.column, entorno);
            }
            else {
                throw new Error("Error Semantico estas creando una matriz");
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
                                throw new Error("Los tipos de datos no son validos");
                            }
                            else {
                                (_d = entorno.getVector(this.id)) === null || _d === void 0 ? void 0 : _d.addValue(i, j, this.id, valores.valor, dtipo, this.line, this.column);
                            }
                        }
                        catch (e) {
                            console.log("No Interpreta vec 2");
                        }
                    }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), maxFilas, maxcolumnas, this.line, this.column, entorno);
            }
            else {
                throw new Error("Error Semantico: estas creando una vector simple {$this.line}");
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
                            throw new Error("Los tipos de datos no son validos");
                        }
                        (_e = entorno.getVector(this.id)) === null || _e === void 0 ? void 0 : _e.addValue(i, 0, this.id, valores.valor, dtipo, this.line, this.column);
                    }
                    catch (e) {
                        console.log("no interpreta");
                    }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), arreglo.length, 0, this.line, this.column, entorno);
            }
            catch (e) {
                console.log("Ha ocurrido un error no se puede guardar el arreglo");
            }
        }
    }
}
exports.Dvectores2 = Dvectores2;
