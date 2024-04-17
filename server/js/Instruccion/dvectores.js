"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dvectores = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
//Esta es para la declaracion tipo1 de vectores
class Dvectores extends instruccion_1.Instruccion {
    constructor(tipo, id, confirTipoDato, nfila, ncol, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.confirTipoDato = confirTipoDato;
        this.nfila = nfila;
        this.ncol = ncol;
    }
    interpretar(entorno, consola) {
        var _a, _b;
        if (this.tipo != this.confirTipoDato) {
            throw new Error("Ya valio jajaja");
        }
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
        const numfila = this.nfila.interpretar(entorno);
        if (this.ncol != null) {
            const numcol = this.ncol.interpretar(entorno);
            if (numfila.tipo != resultado_1.TipoDato.NUMBER || numcol.tipo != resultado_1.TipoDato.NUMBER) {
                throw new Error("No es un numero");
            }
            entorno.guardarVector(this.id, dtipo, numfila.valor, numcol.valor, this.line, this.column);
            (_a = entorno.obtenerVector(this.id)) === null || _a === void 0 ? void 0 : _a.llenarpordefecto(this.id, valordefecto, dtipo, this.line, this.column);
            entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), numfila.valor, numcol.valor, this.line, this.column, entorno);
        }
        else {
            if (numfila.tipo != resultado_1.TipoDato.NUMBER) {
                throw new Error("No es un numero");
            }
            entorno.guardarVector(this.id, dtipo, numfila.valor, 1, this.line, this.column);
            (_b = entorno.obtenerVector(this.id)) === null || _b === void 0 ? void 0 : _b.llenarpordefecto(this.id, valordefecto, dtipo, this.line, this.column);
            entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), numfila.valor, 1, this.line, this.column, entorno);
        }
    }
}
exports.Dvectores = Dvectores;
