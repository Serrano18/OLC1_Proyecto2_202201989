"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Evironment_1 = require("./Symbol/Evironment");
const Errores_1 = require("./Errores");
const Error_1 = require("./Error");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
        this.entornoglobal = new Evironment_1.Environment(null);
    }
    Ejecutar() {
        // Primera pasada
        this.instrucciones.forEach(instruccion => {
            try {
                instruccion.interpretar(this.entornoglobal, this.consola);
            }
            catch (error) {
                if (error instanceof Error_1.Error_) {
                    Errores_1.errores.push(error);
                }
            }
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
