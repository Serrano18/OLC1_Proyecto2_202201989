"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dvariables = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
class Dvariables extends instruccion_1.Instruccion {
    constructor(tipo, id, valor, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
    }
    interpretar(entorno, consola) {
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
        if (this.valor != null) {
            const value = this.valor.interpretar(entorno);
            if (dtipo == value.tipo) {
                this.id.forEach(id => {
                    entorno.guardar(id, value.valor, value.tipo, "Variable", this.line, this.column);
                });
            }
            else {
                throw new Error("Error: Los tipos de datos no coinciden1");
            }
        }
        else {
            this.id.forEach(id => {
                entorno.guardar(id, valordefecto, dtipo, "Variable", this.line, this.column);
            });
        }
        return null;
    }
}
exports.Dvariables = Dvariables;
