"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Evironment_1 = require("./Symbol/Evironment");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
        this.entornoglobal = new Evironment_1.Environment(null);
    }
    Ejecutar() {
        // Primera pasada
        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(this.entornoglobal, this.consola);
        });
    }
    getConsola() {
        console.log(this.consola);
        let salid = "";
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }
        console.log(salid);
        return salid;
    }
}
exports.AST = AST;
