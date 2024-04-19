"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dvectores = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
//Esta es para la declaracion tipo1 de vectores
class Dvectores extends instruccion_1.Instruccion {
    constructor(estado, tipo, id, confirTipoDato, nfila, ncol, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id.toLowerCase();
        this.confirTipoDato = confirTipoDato;
        this.nfila = nfila;
        this.ncol = ncol;
        this.estado = estado;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Declaración Vector');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoTipo = (0, graphviz_1.createNode)(this.tipo);
        (0, graphviz_1.createEdge)(nodoPadre, nodoTipo);
        const nodoId = (0, graphviz_1.createNode)(this.estado ? `${this.id}[]` : `${this.id}[][]`);
        (0, graphviz_1.createEdge)(nodoPadre, nodoId);
        const nodoAsignacion = (0, graphviz_1.createNode)('=');
        (0, graphviz_1.createEdge)(nodoPadre, nodoAsignacion);
        const nodoNuevo = (0, graphviz_1.createNode)('new');
        (0, graphviz_1.createEdge)(nodoPadre, nodoNuevo);
        const nodoTipo2 = (0, graphviz_1.createNode)(this.confirTipoDato);
        (0, graphviz_1.createEdge)(nodoPadre, nodoTipo2);
        const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
        this.nfila.crearGrafico(nodoExpresion);
        if (this.ncol != null) {
            const nodoExpresion2 = (0, graphviz_1.createNode)('Expresion');
            (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion2);
            this.ncol.crearGrafico(nodoExpresion2);
        }
        const nodoPuntoComa = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPuntoComa);
    }
    interpretar(entorno) {
        var _a, _b;
        if (this.tipo != this.confirTipoDato) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
        }
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
        const numfila = this.nfila.interpretar(entorno);
        if (this.ncol != null) {
            const numcol = this.ncol.interpretar(entorno);
            if (numfila.tipo != resultado_1.TipoDato.NUMBER || numcol.tipo != resultado_1.TipoDato.NUMBER) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${numfila.tipo} no es entero`));
            }
            entorno.guardarVector(this.id, dtipo, numfila.valor, numcol.valor, this.line, this.column);
            (_a = entorno.obtenerVector(this.id)) === null || _a === void 0 ? void 0 : _a.llenarpordefecto(this.id, valordefecto, dtipo, this.line, this.column);
            entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), numfila.valor, numcol.valor, this.line, this.column, entorno);
        }
        else {
            if (numfila.tipo != resultado_1.TipoDato.NUMBER) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${numfila.tipo} no es entero`));
            }
            entorno.guardarVector(this.id, dtipo, numfila.valor, 1, this.line, this.column);
            (_b = entorno.obtenerVector(this.id)) === null || _b === void 0 ? void 0 : _b.llenarpordefecto(this.id, valordefecto, dtipo, this.line, this.column);
            entorno.guardarVectorTablaSimbolos(this.id, dtipo, entorno.obtenerVector(this.id), numfila.valor, 1, this.line, this.column, entorno);
        }
    }
}
exports.Dvectores = Dvectores;
