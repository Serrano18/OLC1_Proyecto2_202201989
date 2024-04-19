"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_IF = void 0;
const resultado_1 = require("../../Abstract/resultado");
const instruccion_1 = require("../../Abstract/instruccion");
const Tablasimbolos_1 = require("../../Tablasimbolos");
class FN_IF extends instruccion_1.Instruccion {
    constructor(condicion, bloqueIf, bloqueElse, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloqueIf = bloqueIf;
        this.bloqueElse = bloqueElse;
    }
    crearGrafico(padre) {
        return "";
    }
    interpretar(entorno) {
        const condicion = this.condicion.interpretar(entorno);
        if (condicion.tipo != resultado_1.TipoDato.BOOLEANO)
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `La condicion no es booleana.`));
        if (condicion.valor) {
            return this.bloqueIf.interpretar(entorno);
        }
        else if (this.bloqueElse != null) {
            return this.bloqueElse.interpretar(entorno);
        }
        return null;
    }
}
exports.FN_IF = FN_IF;
