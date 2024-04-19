"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Evironment_1 = require("../Symbol/Evironment");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Switch extends instruccion_1.Instruccion {
    constructor(expresion, listacase, def, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.listacase = listacase;
        this.def = def;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instrucción Switch');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoSwitch = (0, graphviz_1.createNode)('switch');
        (0, graphviz_1.createEdge)(nodoPadre, nodoSwitch);
        const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
        this.expresion.crearGrafico(nodoExpresion);
        const nodoCases = (0, graphviz_1.createNode)('Cases');
        (0, graphviz_1.createEdge)(nodoPadre, nodoCases);
        if (this.listacase != null) {
            for (const caso of this.listacase) {
                caso.crearGrafico(nodoCases);
            }
        }
        if (this.def != null) {
            const nodoDefault = (0, graphviz_1.createNode)('Default');
            (0, graphviz_1.createEdge)(nodoPadre, nodoDefault);
            this.def.crearGrafico(nodoDefault);
        }
    }
    interpretar(entorno) {
        if (this.listacase == null && this.def == null) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', "El switch esta vacio no valido"));
        }
        let estado = false;
        let condicion = this.expresion.interpretar(entorno);
        const newEntorno = new Evironment_1.Environment(entorno);
        if (this.listacase != null) {
            for (const cases of this.listacase) {
                let con = cases.expresion.interpretar(newEntorno);
                //por si no funciona interpretar resultados
                if (con.valor == condicion.valor && con.tipo == condicion.tipo && !estado) {
                    const inscases = cases.interpretar(newEntorno);
                    if (inscases != null || inscases != undefined) {
                        if (inscases == "break") {
                            return;
                        }
                        else if (inscases.tV == 'return') {
                            return inscases;
                        }
                        else {
                            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Instruccion no valida dentro en el Switch`));
                        }
                    }
                    estado = true;
                }
                else if (estado) {
                    const inscases = cases.interpretar(newEntorno);
                    if (inscases != null || inscases != undefined) {
                        if (inscases == "break") {
                            return;
                        }
                        else if (inscases.tV == 'return') {
                            return inscases;
                        }
                        else {
                            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Instruccion no valida dentro en el Switch`));
                        }
                    }
                }
            }
            if (this.def != null) {
                const ins = this.def.interpretar(newEntorno);
                if (ins != null || ins != undefined) {
                    if (ins == "break") {
                        return;
                    }
                    else if (ins.tV == 'return') {
                        return ins;
                    }
                    else {
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Instruccion no valida dentro en el Switch`));
                    }
                }
            }
        }
        else if (this.def != null) {
            const ins = this.def.interpretar(newEntorno);
            if (ins != null) {
                if (ins == "break") {
                    return;
                }
                else if (ins.tV == 'return') {
                    return ins;
                }
                else {
                    throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Instruccion no valida dentro en el Switch`));
                }
            }
        }
    }
}
exports.Switch = Switch;
