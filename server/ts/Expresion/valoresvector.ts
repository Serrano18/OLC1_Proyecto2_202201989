//solo con fila y columna obtiene un valor
import { Expresion } from "../Abstract/expresion";
import { Environment } from "../Symbol/Evironment";
import { TipoDato,Resultado } from "../Abstract/resultado";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Vvector extends Expresion{
    public fila:Expresion;
    public col:Expresion|null;
   public id : string
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(id:string, fila:Expresion,col:Expresion|null,linea:number,columna:number){
        super(linea,columna)
        this.fila = fila;
        this.col = col
        this.id=id.toLowerCase()
    }
    public crearGrafico(padre: any) {
      const nodoPadre = createNode('Valor Vector');
      createEdge(padre, nodoPadre);
  
      const nodoId = createNode(`${this.id}`);
      createEdge(nodoPadre, nodoId);
  
      const nodoLBracket = createNode('[');
      createEdge(nodoPadre, nodoLBracket);
  
      const nodoExpresion = createNode('Expresion');
      createEdge(nodoPadre, nodoExpresion);
      this.fila.crearGrafico(nodoExpresion);
  
      const nodoRBracket = createNode(']');
      createEdge(nodoPadre, nodoRBracket);
  
      if (this.col != null) {
          const nodoLBracket2 = createNode('[');
          createEdge(nodoPadre, nodoLBracket2);
  
          const nodoExpresion2 = createNode('Expresion');
          createEdge(nodoPadre, nodoExpresion2);
          this.col.crearGrafico(nodoExpresion2);
  
          const nodoRBracket2 = createNode(']');
          createEdge(nodoPadre, nodoRBracket2);
      }
  }

    public interpretar(entorno : Environment): Resultado {

       const vector = entorno.obtenerVector(this.id.toLowerCase())
       const fila = this.fila.interpretar(entorno)
       if(fila.tipo!=TipoDato.NUMBER){
          throw lerrores.push(new errores(this.line,this.column,"Semantico",`El tipo de dato de la fila ${fila.valor} no es un entero`))
       }
       let col 
       if(this.col != null){
            col = this.col.interpretar(entorno).valor
       }else{
            col=0
       }
       if(vector == null){
          throw lerrores.push(new errores(this.line,this.column,"Semantico",`No existe el vector ${this.id}`))     
       }
       return {valor: vector.getValue(fila.valor,col).value,tipo:vector.tipo} 
    }
}