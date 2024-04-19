import { Instruccion } from "../Abstract/instruccion";
import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
//Esta es para la declaracion tipo1 de vectores
export class Dvectores2 extends Instruccion{
    
    public tipo:string
    public id:string
    public valores:Expresion | Expresion[]| Expresion[][]
    public estado:boolean
    constructor(tipo:string,id:string,estado:boolean,valores:Expresion |Expresion[]| Expresion[][],line:number,column:number){
        super(line,column,);
        this.tipo = tipo;
        this.id = id.toLowerCase();
        this.valores = valores
        this.estado =estado
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Declaración de Vector');
        createEdge(padre, nodoPadre);
    
        const nodoTipo = createNode(this.tipo);
        createEdge(nodoPadre, nodoTipo);
    
        const nodoId = createNode(this.estado ? `${this.id}[]` : `${this.id}[][]`);
        createEdge(nodoPadre, nodoId);
        const nodoIgual = createNode(' = ');
        createEdge(nodoPadre, nodoIgual);
        const nodoValores = createNode('Lista de Expresiones');
        createEdge(nodoPadre, nodoValores);
    
        if(this.valores instanceof Expresion){
            this.valores.crearGrafico(nodoValores);
        } else {
            const cori = createNode('[');
            createEdge(nodoPadre, cori);
            if(!(this.valores[0] instanceof Array)){
                for(let i = 0; i < this.valores.length; i++){
                    const nodoFirst = createNode('Expresion');
                    createEdge(nodoPadre, nodoFirst);
                    const valor = <Expresion>this.valores[i];
                    valor.crearGrafico(nodoValores); 
                     if (i < this.valores.length - 1){
                        const cord = createNode(']');
                        createEdge(nodoPadre, cord);
                    }
                }
            }else{
                for (let i = 0; i < this.valores.length; i++) {
                    const column = <Expresion[]>this.valores[i]
                    const cori = createNode('[');
                    createEdge(nodoPadre, cori);
                    for (let j = 0; j < column.length; j++){
                        const nodoFirst = createNode('Expresion');
                        createEdge(nodoPadre, nodoFirst);
                        const exp = <Expresion>column[j]
                        exp.crearGrafico(nodoFirst);
                        if (j < column.length - 1){
                            const cord = createNode(',');
                            createEdge(nodoPadre, cord);
                        } else{
                            const cord = createNode(']');
                            createEdge(nodoPadre, cord);
                        }
                    }
                }
            }
            const cord = createNode(']');
            createEdge(nodoPadre, cord);
        }
        const pyc = createNode(';');
        createEdge(nodoPadre, pyc);   
        

    }
    public interpretar(entorno : Environment,):any{
       
        let dtipo:TipoDato;
        let valordefecto : any;
        switch(this.tipo.toLowerCase()){
            case "int":
                dtipo = TipoDato.NUMBER;
                valordefecto = Number(0);
                break;
            case "double":
                dtipo = TipoDato.DOUBLE;
                valordefecto = Number(0.0);
                break;
            case "char":
                dtipo = TipoDato.CHAR;
                valordefecto = '0';
                break;
            case "std::string":
                dtipo=TipoDato.STRING;
                valordefecto = "";
                break;
            case "bool":
                dtipo=TipoDato.BOOLEANO;
                valordefecto = true;
                break
            default:
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no valido`));
        
        }
        if(this.estado && !(this.valores instanceof Expresion)){
            if(!(this.valores[0] instanceof Array)){
                const maxFilas = this.valores.length;
                const maxcolumnas = 1
                entorno.guardarVector(this.id,dtipo,maxFilas,maxcolumnas,this.line,this.column)
                entorno.obtenerVector(this.id)?.llenarpordefecto(this.id,valordefecto,dtipo,this.line,this.column) 
                
                for(let i = 0; i<maxFilas;i++){
                    //recibo una expresion simple
                    const expr = <Expresion>this.valores[i]
                    try{   
                        const valores = expr.interpretar(entorno)
                        if(dtipo != valores.tipo){
                            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
                        }
                        entorno.getVector(this.id)?.addValue(i,0,this.id,valores.valor,dtipo,this.line,this.column)
                    }catch(e){
                        throw lerrores.push(new errores(this.line, this.column, "Semantico", `Error en la interpretacion de la expresion`));
                    }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),maxFilas,0,this.line,this.column,entorno);
                       
               
            }else{
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Error Semantico estas creando una matriz`));   
            }
            
        }else if(!(this.valores instanceof Expresion)){
            if(this.valores[0] instanceof Array){
                const maxFilas = this.valores.length;
                const maxcolumnas = Math.max(...this.valores.map(columnas=>columnas instanceof Array ? columnas.length:0))
                entorno.guardarVector(this.id,dtipo,maxFilas,maxcolumnas,this.line,this.column)
                entorno.obtenerVector(this.id)?.llenarpordefecto(this.id,valordefecto,dtipo,this.line,this.column) 
              
                for(let i = 0; i<maxFilas;i++){
                    //recibo una expresion simple
                    const columna = <Expresion[]>this.valores[i]
                    for(let j=0;j<columna.length;j++){
                        const expr = columna[j]
                        try{
                            const valores = expr.interpretar(entorno)
                            if(dtipo != valores.tipo){
                                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
                      
                            }else{
                                entorno.getVector(this.id)?.addValue(i,j,this.id,valores.valor,dtipo,this.line,this.column)
                            }
                        }catch(e){
                            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Error en la interpretacion de la expresion`));
                
                        }
                    }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),maxFilas,maxcolumnas,this.line,this.column,entorno);       
            }else{
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Error Semantico estas creando un vector simple`));  
            }
        }else{
            try{
                const expr = this.valores.interpretar(entorno);
                const arreglo = expr.valor;
                entorno.guardarVector(this.id,dtipo,arreglo.length,1,this.line,this.column)
                for(let i = 0; i<arreglo.length;i++){
                    try{   
                        const valores = arreglo[i].interpretar(entorno)
                        if(dtipo != valores.tipo){
                            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
                      
                        }
                        entorno.getVector(this.id)?.addValue(i,0,this.id,valores.valor,dtipo,this.line,this.column)
                        }catch(e){
                            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Error en la interpretacion de los valores del vector`));
                
                        }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),arreglo.length,0,this.line,this.column,entorno);
                       
            }catch(e){
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Error en la interpretacion de la expresion`));
                
            }
            
        
    }
}}