import { Expresion } from "../Abstract/expresion";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Vfuncion extends Instruccion{
    public id : string;
    public parametros : Array<Expresion>
    public tipo : boolean
    constructor(id:string, parametros:Array<Expresion>, tipo:boolean,line:number, column:number){
        super(line, column);
        this.id = id.toLowerCase();
        this.parametros = parametros
        this.tipo = tipo
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Valor Funccion');
        createEdge(padre, nodoPadre);
    
        const nodoId = createNode(this.id);
        createEdge(nodoPadre, nodoId);
    
        const nodopari = createNode('(');
        createEdge(nodoPadre, nodopari);
       
        if(this.parametros != null && this.parametros.length > 0){
            const nodoParametros = createNode('Parametros');
            createEdge(nodoPadre, nodoParametros);
            this.parametros[0].crearGrafico(nodoParametros);

            for(let i = 1; i < this.parametros.length; i++){
                const nodoComa = createNode(',');
                createEdge(nodoPadre, nodoComa);
                const nodoParam = createNode('Parametro');
                createEdge(nodoPadre, nodoParam);
                this.parametros[i].crearGrafico(nodoParam);
            }
        }
        const nodopard = createNode(')');
        createEdge(nodoPadre, nodopard);
    }
    public interpretar(entorno : Environment) {
        const funcion = entorno.getFuncion(this.id);
        if(funcion != null){
            const nuevo = new Environment(entorno.getGlobal());
            if(funcion.parametros.length != this.parametros.length){
                throw lerrores.push(new errores(this.line,this.column,'Semantico',"La cantidad de parametros no coincide"));
            }
            for(let i = 0; i < this.parametros.length; i++){
                const valor = funcion.parametros[i];//son valores entre llave no se interpretan 
                const expresion = this.parametros[i].interpretar(entorno);
                let dtipo:TipoDato;
                
                switch(valor.tipo.toLowerCase()){
                    case "int":
                        dtipo = TipoDato.NUMBER;
                        break;
                    case "double":
                        dtipo = TipoDato.DOUBLE;
                        break;
                    case "char":
                        dtipo = TipoDato.CHAR;
                        break;
                    case "std::string":
                        dtipo=TipoDato.STRING;
                        break;
                    case "bool":
                        dtipo=TipoDato.BOOLEANO;
                        break
                    default:
                        throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no valido`));
        
                }

                if(valor.vect){
                    if(expresion.tipo == TipoDato.ID){
                        const vector = entorno.getVector(expresion.valor)
                        if(vector != null){
                            if(vector.tipo == dtipo){
                                if(valor.vsimple && vector.values[0].length == 1){
                                    nuevo.guardarVector(valor.id,dtipo,vector.values.length,1,this.line,this.column)
                                    nuevo.getVector(valor.id)?.setVector(vector.values)
                                }else if(!(valor.vsimple) && vector.values[0].length > 1){
                                    nuevo.guardarVector(valor.id,dtipo,vector.values.length,vector.values[0].length,this.line,this.column)
                                    nuevo.getVector(valor.id)?.setVector(vector.values)
                                }else{
                                    throw lerrores.push(new errores(this.line,this.column,'Semantico',`No es un vector valido`));
                                    
                                }
                            }else{
                                throw lerrores.push(new errores(this.line,this.column,'Semantico',`Tipo de dato ${this.tipo} no coincide con el valor asignado`));
                                  
                            }
                        }else{
                            throw lerrores.push(new errores(this.line,this.column,'Semantico',`El vector ${this.id} no existe`));
                      
                        }
                        
                    }
                }else{
                    if(expresion.tipo != dtipo){
                        throw lerrores.push(new errores(this.line,this.column,'Semantico',`Tipo de dato ${this.tipo} no coincide con el valor asignado`));
                    }else{
                        nuevo.guardar(valor.id,expresion.valor,dtipo,"Variable",this.line,this.column)
                    }
                }
            }
            const bloque:Bloque = funcion.bloque;
            const elemento = bloque.interpretar(nuevo);
            if((elemento!= null || elemento != undefined)&& this.tipo){
                if(elemento.tV == "return" && funcion.tipo == elemento.type){   
                    return {valor:elemento.value,tipo:elemento.type}
                } if(elemento=="continue"){
                    return {valor:null,tipo:TipoDato.NULO}
                }else if(elemento=="break"){
                    return {valor:null,tipo:TipoDato.NULO}
                }else if(funcion.tipo == elemento.type && elemento.valor == null){
                    return {valor:null,tipo:TipoDato.NULO}
                }else{
                    throw lerrores.push(new errores(this.line,this.column,'Semantico',`Instruccion no valida dentro de una Funcion`));
                }
            }else{
                if (funcion.tipo == TipoDato.NULO){
                    return null;
                } else{
                    throw lerrores.push(new errores(this.line,this.column,'Semantico',`El tipo de retorno no es valido para la funcion ${this.id}`));
                }
            }

        }else{
            throw lerrores.push(new errores(this.line,this.column,'Semantico',`La funcion ${this.id} no existe`));
        }
    }
}