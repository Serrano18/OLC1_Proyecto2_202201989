"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Evironment_1 = require("./Symbol/Evironment");
const Tablasimbolos_1 = require("./Tablasimbolos");
const dvariables_1 = require("./Instruccion/dvariables");
const dvectores_1 = require("./Instruccion/dvectores");
const dvectores2_1 = require("./Instruccion/dvectores2");
const declafuncion_1 = require("./Instruccion/declafuncion");
const execute_1 = require("./Instruccion/execute");
const graphviz_1 = require("./graphivz/graphviz");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
        this.lerrores = [];
        this.entornoglobal = new Evironment_1.Environment(null);
    }
    Ejecutar() {
        Tablasimbolos_1.consola.length = 0;
        // Primera pasada
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof dvariables_1.Dvariables || instruccion instanceof dvectores_1.Dvectores || instruccion instanceof dvectores2_1.Dvectores2 || instruccion instanceof declafuncion_1.Function) {
                instruccion.interpretar(this.entornoglobal);
            }
        });
        for (let instruccion of this.instrucciones) {
            if (instruccion instanceof execute_1.Execute) {
                instruccion.interpretar(this.entornoglobal);
                break;
            }
        }
        this.consola = Tablasimbolos_1.consola;
    }
    getConsola() {
        let salid = "";
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }
        for (let i = 0; i < Tablasimbolos_1.lerrores.length; i++) {
            salid += "Error " + Tablasimbolos_1.lerrores[i].tipo + ": " + Tablasimbolos_1.lerrores[i].mensaje + " en F: " + Tablasimbolos_1.lerrores[i].linea + " y C: " + Tablasimbolos_1.lerrores[i].columna + "\n";
        }
        return salid.replace("\\n", "\n").replace("\\t", "\t").replace("\\\"", "\"").replace("\\\'", "\'").replace("\\", "\\");
    }
    crearGrafico() {
        // Create a node for the root of the AST
        let rootNode = (0, graphviz_1.createNode)('AST');
        // Traverse the AST and create a node for each instruction
        this.instrucciones.forEach((instruccion, index) => {
            // Create a node for the instruction
            let instructionNode = (0, graphviz_1.createNode)(`Instruction ${index}`);
            // Create an edge from the root node to the instruction node
            (0, graphviz_1.createEdge)(rootNode, instructionNode);
            // If the instruction has a crearGrafica method, call it to create the graph for the instruction
            if (typeof instruccion.crearGrafico === 'function') {
                instruccion.crearGrafico(instructionNode);
            }
        });
        // Save the graph to a file
        (0, graphviz_1.save)();
    }
}
exports.AST = AST;
