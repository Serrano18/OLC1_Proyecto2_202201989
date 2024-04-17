"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Evironment_1 = require("../Symbol/Evironment");
class Switch extends instruccion_1.Instruccion {
    constructor(expresion, listacase, def, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.listacase = listacase;
        this.def = def;
    }
    interpretar(entorno, consola) {
        if (this.listacase == null && this.def == null) {
            throw new Error("El switch esta vacio no valido");
        }
        let estado = false;
        const newEntorno = new Evironment_1.Environment(entorno);
        let condicion = this.expresion.interpretar(newEntorno);
        if (this.listacase != null) {
            for (const cases of this.listacase) {
                console.log(condicion.valor);
                let con = cases.expresion.interpretar(newEntorno);
                console.log(con.valor);
                //por si no funciona interpretar resultados
                if (con.valor == condicion.valor && !estado) {
                    console.log("Entro a verificar");
                    const inscases = cases.interpretar(newEntorno, consola);
                    if (inscases != null) {
                        if (inscases == "break") {
                            return;
                        }
                        else {
                            throw new Error("No acepta coninue nu return no es valido");
                        }
                    }
                    estado = true;
                }
                else if (estado) {
                    const inscases = cases.interpretar(newEntorno, consola);
                    if (inscases != null) {
                        if (inscases == "break") {
                            return;
                        }
                        else {
                            throw new Error("No acepta coninue nu return no es valido");
                        }
                    }
                }
            }
            if (this.def != null) {
                const ins = this.def.interpretar(newEntorno, consola);
                if (ins != null) {
                    if (ins == "break") {
                        return;
                    }
                    else {
                        throw new Error("No acepta coninue nu return no es valido");
                    }
                }
            }
        }
        else if (this.def != null) {
            const ins = this.def.interpretar(newEntorno, consola);
            if (ins != null) {
                if (ins == "break") {
                    return;
                }
                else {
                    throw new Error("No acepta coninue nu return no es valido");
                }
            }
        }
    }
}
exports.Switch = Switch;
