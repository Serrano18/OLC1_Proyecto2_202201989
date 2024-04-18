import { Instruccion } from "../Abstract/instruccion";
import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
//Esta es para la declaracion tipo1 de vectores
export class Dvectores2 extends Instruccion{
    
    public tipo:string
    public id:string
    public valores:Expresion[]| Expresion[][]
    public estado:boolean
    constructor(tipo:string,id:string,estado:boolean,valores:Expresion[]| Expresion[][],line:number,column:number){
        super(line,column,);
        this.tipo = tipo;
        this.id = id;
        this.valores = valores
        this.estado =estado
    }
    public interpretar(entorno : Environment,consola:string[]):any{
       
        let dtipo:TipoDato;
        let valordefecto : any;
        switch(this.tipo.toString()){
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
                throw new Error('Error: Tipo de dato invalido');
        
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
                            throw new Error ("Los tipos de datos no son validos");
                        }
                        entorno.getVector(this.id)?.addValue(i,0,this.id,valores.valor,dtipo,this.line,this.column)
                        }catch(e){console.log("no interpreta")}
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),maxFilas,0,this.line,this.column,entorno);
                       
               
            }else{
                throw new Error ("Error Semantico estas creando una matriz");
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
                                throw new Error ("Los tipos de datos no son validos");
                            }else{
                                entorno.getVector(this.id)?.addValue(i,j,this.id,valores.valor,dtipo,this.line,this.column)
                            }
                        }catch(e){console.log("No Interpreta vec 2")}
                    }
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),maxFilas,maxcolumnas,this.line,this.column,entorno);       
            }else{
                throw new Error ("Error Semantico: estas creando una vector simple {$this.line}");
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
                            throw new Error ("Los tipos de datos no son validos");
                        }
                        entorno.getVector(this.id)?.addValue(i,0,this.id,valores.valor,dtipo,this.line,this.column)
                        }catch(e){console.log("no interpreta")}
                }
                entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),arreglo.length,0,this.line,this.column,entorno);
                       
            }catch(e){console.log("Ha ocurrido un error no se puede guardar el arreglo")}
            
        
    }
}}