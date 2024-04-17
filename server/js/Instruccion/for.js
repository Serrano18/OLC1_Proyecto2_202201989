"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const resultado_1 = require("../Abstract/resultado");
const instruccion_1 = require("../Abstract/instruccion");
const Evironment_1 = require("../Symbol/Evironment");
class For extends instruccion_1.Instruccion {
    constructor(declaracion, condicion, actualizacion, bloquef, linea, columna) {
        super(linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.bloquef = bloquef;
    }
    interpretar(entorno, consola) {
        const newEntorno = new Evironment_1.Environment(entorno);
        this.declaracion.interpretar(newEntorno, consola);
        let condicion = this.condicion.interpretar(newEntorno);
        if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
            throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
        }
        while (condicion.valor) {
            const bloquef = this.bloquef.interpretar(newEntorno, consola);
            if (bloquef != null) {
                if (bloquef == "continue") {
                    continue;
                }
                else if (bloquef == "break") {
                    break;
                }
                else {
                    throw new Error("Instruccion no valida");
                }
            }
            this.actualizacion.interpretar(newEntorno, consola);
            condicion = this.condicion.interpretar(newEntorno);
            if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
                throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
            }
        }
    }
}
exports.For = For;
