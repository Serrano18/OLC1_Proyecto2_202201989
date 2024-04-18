"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cstr = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const primitivo_1 = require("./primitivo");
class Cstr extends expresion_1.Expresion {
    // Esta clase siempre pedirá línea y columna
    constructor(expre, line, colum) {
        super(line, colum);
        this.expre = expre;
    }
    // Método que siempre debe ejecutarse en todos los objetos que hereda
    interpretar(entorno) {
        try {
            const value = this.expre.interpretar(entorno);
            if (value.tipo != resultado_1.TipoDato.STRING) {
                console.log("Error de tipo");
                throw new Error("Error de tipos");
            }
            if (value != null) {
                const cadena = value.valor;
                const caracteres = [];
                for (let i = 0; i < cadena.length; i++) {
                    caracteres.push(new primitivo_1.Primitivo(value.valor[i], resultado_1.TipoDato.CHAR, this.line, this.column));
                }
                return caracteres;
            }
            else {
                throw new Error("No se pudo Interpretar la cadena ");
            }
        }
        catch (e) {
            console.log("Ya valio");
        }
    }
}
exports.Cstr = Cstr;
