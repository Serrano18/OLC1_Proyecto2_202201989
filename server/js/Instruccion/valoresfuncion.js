"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vfuncion = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Evironment_1 = require("../Symbol/Evironment");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Vfuncion extends instruccion_1.Instruccion {
    constructor(id, parametros, tipo, line, column) {
        super(line, column);
        this.id = id.toLowerCase();
        this.parametros = parametros;
        this.tipo = tipo;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Valor Funccion');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoId = (0, graphviz_1.createNode)(this.id);
        (0, graphviz_1.createEdge)(nodoPadre, nodoId);
        const nodopari = (0, graphviz_1.createNode)('(');
        (0, graphviz_1.createEdge)(nodoPadre, nodopari);
        if (this.parametros != null && this.parametros.length > 0) {
            const nodoParametros = (0, graphviz_1.createNode)('Parametros');
            (0, graphviz_1.createEdge)(nodoPadre, nodoParametros);
            this.parametros[0].crearGrafico(nodoParametros);
            for (let i = 1; i < this.parametros.length; i++) {
                const nodoComa = (0, graphviz_1.createNode)(',');
                (0, graphviz_1.createEdge)(nodoPadre, nodoComa);
                const nodoParam = (0, graphviz_1.createNode)('Parametro');
                (0, graphviz_1.createEdge)(nodoPadre, nodoParam);
                this.parametros[i].crearGrafico(nodoParam);
            }
        }
        const nodopard = (0, graphviz_1.createNode)(')');
        (0, graphviz_1.createEdge)(nodoPadre, nodopard);
    }
    interpretar(entorno) {
        var _a, _b;
        const funcion = entorno.getFuncion(this.id);
        if (funcion != null) {
            const nuevo = new Evironment_1.Environment(entorno.getGlobal());
            if (funcion.parametros.length != this.parametros.length) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', "La cantidad de parametros no coincide"));
            }
            for (let i = 0; i < this.parametros.length; i++) {
                const valor = funcion.parametros[i]; //son valores entre llave no se interpretan 
                const expresion = this.parametros[i].interpretar(entorno);
                let dtipo;
                switch (valor.tipo.toLowerCase()) {
                    case "int":
                        dtipo = resultado_1.TipoDato.NUMBER;
                        break;
                    case "double":
                        dtipo = resultado_1.TipoDato.DOUBLE;
                        break;
                    case "char":
                        dtipo = resultado_1.TipoDato.CHAR;
                        break;
                    case "std::string":
                        dtipo = resultado_1.TipoDato.STRING;
                        break;
                    case "bool":
                        dtipo = resultado_1.TipoDato.BOOLEANO;
                        break;
                    default:
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no valido`));
                }
                if (valor.vect) {
                    if (expresion.tipo == resultado_1.TipoDato.ID) {
                        const vector = entorno.getVector(expresion.valor);
                        if (vector != null) {
                            if (vector.tipo == dtipo) {
                                if (valor.vsimple && vector.values[0].length == 1) {
                                    nuevo.guardarVector(valor.id, dtipo, vector.values.length, 1, this.line, this.column);
                                    (_a = nuevo.getVector(valor.id)) === null || _a === void 0 ? void 0 : _a.setVector(vector.values);
                                }
                                else if (!(valor.vsimple) && vector.values[0].length > 1) {
                                    nuevo.guardarVector(valor.id, dtipo, vector.values.length, vector.values[0].length, this.line, this.column);
                                    (_b = nuevo.getVector(valor.id)) === null || _b === void 0 ? void 0 : _b.setVector(vector.values);
                                }
                                else {
                                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `No es un vector valido`));
                                }
                            }
                            else {
                                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Tipo de dato ${this.tipo} no coincide con el valor asignado`));
                            }
                        }
                        else {
                            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `El vector ${this.id} no existe`));
                        }
                    }
                }
                else {
                    if (expresion.tipo != dtipo) {
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Tipo de dato ${this.tipo} no coincide con el valor asignado`));
                    }
                    else {
                        nuevo.guardar(valor.id, expresion.valor, dtipo, "Variable", this.line, this.column);
                    }
                }
            }
            const bloque = funcion.bloque;
            const elemento = bloque.interpretar(nuevo);
            if ((elemento != null || elemento != undefined) && this.tipo) {
                if (elemento.tV == "return" && funcion.tipo == elemento.type) {
                    return { valor: elemento.value, tipo: elemento.type };
                }
                if (elemento == "continue") {
                    return { valor: null, tipo: resultado_1.TipoDato.NULO };
                }
                else if (elemento == "break") {
                    return { valor: null, tipo: resultado_1.TipoDato.NULO };
                }
                else if (funcion.tipo == elemento.type && elemento.valor == null) {
                    return { valor: null, tipo: resultado_1.TipoDato.NULO };
                }
                else {
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Instruccion no valida dentro de una Funcion`));
                }
            }
            else {
                if (funcion.tipo == resultado_1.TipoDato.NULO) {
                    return null;
                }
                else {
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `El tipo de retorno no es valido para la funcion ${this.id}`));
                }
            }
        }
        else {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `La funcion ${this.id} no existe`));
        }
    }
}
exports.Vfuncion = Vfuncion;
