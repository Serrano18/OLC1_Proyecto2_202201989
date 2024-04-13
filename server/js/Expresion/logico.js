"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Logico extends expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1, e2, op, linea, columna) {
        super(linea, columna);
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    interpretar() {
        let resultado1 = null;
        if (this.Operacion != resultado_1.OpLogico.NOT)
            resultado1 = this.exp1.interpretar();
        const resultado2 = this.exp2.interpretar();
        if (this.Operacion == resultado_1.OpLogico.AND) {
            if ((resultado1 === null || resultado1 === void 0 ? void 0 : resultado1.tipo) == resultado_1.TipoDato.BOOLEANO && resultado2.tipo == resultado_1.TipoDato.BOOLEANO)
                return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor && resultado2.valor };
        }
        else if (this.Operacion == resultado_1.OpLogico.OR) {
            if ((resultado1 === null || resultado1 === void 0 ? void 0 : resultado1.tipo) == resultado_1.TipoDato.BOOLEANO && resultado2.tipo == resultado_1.TipoDato.BOOLEANO)
                return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor || resultado2.valor };
        }
        else if (this.Operacion == resultado_1.OpLogico.NOT) {
            if (resultado2.tipo == resultado_1.TipoDato.BOOLEANO)
                console.log(resultado2);
            return { tipo: resultado_1.TipoDato.BOOLEANO, valor: !resultado2.valor };
        }
        return { tipo: resultado_1.TipoDato.NULO, valor: null };
    }
}
exports.Logico = Logico;
