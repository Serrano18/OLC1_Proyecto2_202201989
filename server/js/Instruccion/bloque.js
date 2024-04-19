"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Evironment_1 = require("../Symbol/Evironment");
const graphviz_1 = require("../graphivz/graphviz");
class Bloque extends instruccion_1.Instruccion {
    constructor(instrucciones, fila, columna) {
        super(fila, columna);
        this.instrucciones = instrucciones;
    }
    crearGrafico(padre) {
        const nodoLlaveAbierta = (0, graphviz_1.createNode)('{');
        (0, graphviz_1.createEdge)(padre, nodoLlaveAbierta);
        for (const instruccion of this.instrucciones) {
            instruccion.crearGrafico(padre);
        }
        const nodoLlaveCerrada = (0, graphviz_1.createNode)('}');
        (0, graphviz_1.createEdge)(padre, nodoLlaveCerrada);
    }
    interpretar(entorno) {
        const newEntorno = new Evironment_1.Environment(entorno);
        for (const instruct of this.instrucciones) {
            try {
                const elemento = instruct.interpretar(newEntorno);
                if (elemento != null || elemento != undefined) {
                    if (elemento == 'continue') {
                        continue;
                    }
                    return elemento;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        return null;
    }
}
exports.Bloque = Bloque;
