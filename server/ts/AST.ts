import { Expresion } from "./Abstract/expresion";
import { Instruccion } from "./Abstract/instruccion";
import { Environment } from "./Symbol/Evironment";   
import { consola,errores,lerrores } from "./Tablasimbolos";
import { Dvariables } from "./Instruccion/dvariables";
import { Dvectores } from "./Instruccion/dvectores";
import { Dvectores2 } from "./Instruccion/dvectores2";
import { Function } from "./Instruccion/declafuncion";
import { Execute } from "./Instruccion/execute";
import { createEdge,createNode,save } from "./graphivz/graphviz";
export class AST {
    public instrucciones: Instruccion[]
    public consola:string[]
    public entornoglobal : Environment
    public lerrores: errores[]
    constructor(instrucciones: Instruccion[]){
        this.instrucciones = instrucciones
        this.consola = []
        this.lerrores = []
        this.entornoglobal = new Environment(null)
    }

    public Ejecutar(){
        consola.length = 0
       // Primera pasada
       this.instrucciones.forEach(instruccion => {
        
            if(instruccion instanceof Dvariables || instruccion instanceof Dvectores || instruccion instanceof Dvectores2 || instruccion instanceof Function){       
                 instruccion.interpretar(this.entornoglobal)
            }
      
       });
       for(let instruccion of this.instrucciones){
               if(instruccion instanceof Execute){
                   instruccion.interpretar(this.entornoglobal)
                   break;
               }
       }
       this.consola = consola
    }
    public getConsola(){
        let salid = ""
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }  
        for(let i = 0; i < lerrores.length; i++){
            salid += "Error "+ lerrores[i].tipo + ": " + lerrores[i].mensaje + " en F: " + lerrores[i].linea + " y C: " + lerrores[i].columna + "\n"
        }
        return salid.replace("\\n", "\n").replace("\\t", "\t").replace("\\\"", "\"").replace("\\\'", "\'").replace("\\", "\\") 
    }
    
    public crearGrafico() {
        // Create a node for the root of the AST
        let rootNode = createNode('AST');

        // Traverse the AST and create a node for each instruction
        this.instrucciones.forEach((instruccion, index) => {
            // Create a node for the instruction
            let instructionNode = createNode(`Instruction ${index}`);

            // Create an edge from the root node to the instruction node
            createEdge(rootNode, instructionNode);

            // If the instruction has a crearGrafica method, call it to create the graph for the instruction
            if (typeof instruccion.crearGrafico === 'function') {
                instruccion.crearGrafico(instructionNode);
            }
        });

        // Save the graph to a file
        save();
    }
}