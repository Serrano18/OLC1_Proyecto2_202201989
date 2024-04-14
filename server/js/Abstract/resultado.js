"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpLogico = exports.OpRelacional = exports.OpAritmetica = exports.TipoDato = void 0;
var TipoDato;
(function (TipoDato) {
    TipoDato[TipoDato["NUMBER"] = 0] = "NUMBER";
    TipoDato[TipoDato["DOUBLE"] = 1] = "DOUBLE";
    TipoDato[TipoDato["BOOLEANO"] = 2] = "BOOLEANO";
    TipoDato[TipoDato["CHAR"] = 3] = "CHAR";
    TipoDato[TipoDato["STRING"] = 4] = "STRING";
    TipoDato[TipoDato["NULO"] = 5] = "NULO";
})(TipoDato || (exports.TipoDato = TipoDato = {}));
var OpAritmetica;
(function (OpAritmetica) {
    OpAritmetica[OpAritmetica["SUMA"] = 0] = "SUMA";
    OpAritmetica[OpAritmetica["RESTA"] = 1] = "RESTA";
    OpAritmetica[OpAritmetica["PRODUCTO"] = 2] = "PRODUCTO";
    OpAritmetica[OpAritmetica["DIVISION"] = 3] = "DIVISION";
    OpAritmetica[OpAritmetica["MOD"] = 4] = "MOD";
    OpAritmetica[OpAritmetica["POW"] = 5] = "POW";
})(OpAritmetica || (exports.OpAritmetica = OpAritmetica = {}));
var OpRelacional;
(function (OpRelacional) {
    OpRelacional[OpRelacional["IGUAL"] = 0] = "IGUAL";
    OpRelacional[OpRelacional["DISTINTO"] = 1] = "DISTINTO";
    OpRelacional[OpRelacional["MENOR"] = 2] = "MENOR";
    OpRelacional[OpRelacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    OpRelacional[OpRelacional["MAYOR"] = 4] = "MAYOR";
    OpRelacional[OpRelacional["MAYORIGUAL"] = 5] = "MAYORIGUAL";
})(OpRelacional || (exports.OpRelacional = OpRelacional = {}));
var OpLogico;
(function (OpLogico) {
    OpLogico[OpLogico["AND"] = 0] = "AND";
    OpLogico[OpLogico["OR"] = 1] = "OR";
    OpLogico[OpLogico["NOT"] = 2] = "NOT";
})(OpLogico || (exports.OpLogico = OpLogico = {}));
