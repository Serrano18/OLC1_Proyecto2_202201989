"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const instruccion_1 = require("../Abstract/instruccion");
class Function extends instruccion_1.Instruccion {
    constructor(id, statment, parametros, line, column) {
        super(line, column);
        this.id = id;
        this.statment = statment;
        this.parametros = parametros;
    }
    interpretar(environment) {
        environment.guardarFuncion(this.id, this);
    }
}
exports.Function = Function;
/*
    function fact(n : numero){
        if(n == 0)
            return 1;
        else
            return n * fact(n - 1);
    }
*/
/*

    Lenguaje Entrada -> Traducis -> Lenguaje Salida;

    Lenguaje Salida -> Intepretas -> Salida en consola | Reportes | TS;

*/ 
