import { Expresion } from "../Abstract/expresion";
import { OpAritmetica, Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Aritmetica extends Expresion{
    public exp1:Expresion;
    public exp2:Expresion;
    public Operacion: OpAritmetica;
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1:Expresion,e2:Expresion,op:OpAritmetica,linea:number,columna:number){
        super(linea,columna)
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2
    }

    public crearGrafico(parent: any) {
        let operacionStr = '';
        switch (this.Operacion) {
            case OpAritmetica.SUMA:
                operacionStr = '+';
                break;
            case OpAritmetica.RESTA:
                operacionStr = '-';
                break;
            case OpAritmetica.PRODUCTO:
                operacionStr = '*';
                break;
            case OpAritmetica.DIVISION:
                operacionStr = '/';
                break;
            case OpAritmetica.MOD:
                operacionStr = '%';
                break;
            case OpAritmetica.POW:
                operacionStr = '^';
                break;
            case OpAritmetica.UNARIA:
                operacionStr = '-';
                break;
            default:
                break;
        }

    const parentNode = createNode('Aritmetica');
    const operationNode = createNode(`${operacionStr}`);
    this.exp1.crearGrafico(operationNode);
    if (this.Operacion != OpAritmetica.UNARIA) {
        this.exp2.crearGrafico(operationNode);
    }
    createEdge(parent, parentNode);
    createEdge(parentNode, operationNode);
    
}

    public interpretar(entorno : Environment): Resultado {
        // Ejecutamos los noterminales
        const resultadoIzq = this.exp1.interpretar(entorno)
        const resultadoDer = this.exp2.interpretar(entorno)
        // Lógica del intérprete
        // Comparamos el tipo de operación
        if(this.Operacion == OpAritmetica.UNARIA){
            const dominante = UNARIA[resultadoIzq.tipo]
            if(dominante == TipoDato.NULO){
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `tipo dato ${dominante} no valido para la UNARIO`));
            }else if(dominante == TipoDato.DOUBLE){
                return {valor:resultadoIzq.valor*-1,tipo:dominante}
            }else if(dominante == TipoDato.NUMBER){
                return {valor:resultadoIzq.valor*-1,tipo:dominante}
            }else{
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `tipo dato ${dominante} no valido para la UNARIA`));
            }
        }
        if (this.Operacion == OpAritmetica.SUMA){
            // Valor dominante
            const dominante = SUMAS[resultadoIzq.tipo][resultadoDer.tipo];
         
            switch (dominante) {
                case TipoDato.NULO:
                    throw lerrores.push(new errores(this.line, this.column, "Semantico", `tipo dato ${dominante} no valido para la suma`));
                case TipoDato.NUMBER:
                    convertir(resultadoIzq)
                    convertir(resultadoDer)
                   return { valor: resultadoIzq.valor + resultadoDer.valor, tipo: dominante };
                case TipoDato.DOUBLE:
                    convertir(resultadoIzq)
                    convertir(resultadoDer)
                    const resultado = resultadoIzq.valor + resultadoDer.valor;
                    return { valor: resultado, tipo: dominante };
                case TipoDato.STRING:
                    return { valor: resultadoIzq.valor.toString() + resultadoDer.valor.toString(), tipo: dominante };
                default:
                    throw lerrores.push(new errores(this.line, this.column, "Semantico", `tipo dato ${dominante} no valido para la suma`));
              
            }

        } else if (this.Operacion == OpAritmetica.RESTA){
           const dominante = RESTAS[resultadoIzq.tipo][resultadoDer.tipo] 
           
           if (dominante == TipoDato.NULO){
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Los tipos de datos no son valido para la resta`));
           }
           convertir(resultadoIzq)
           convertir(resultadoDer)
           const resultado = resultadoIzq.valor - resultadoDer.valor;
           if(dominante == TipoDato.DOUBLE){return {valor: resultado,tipo:dominante}}
           return {valor: resultado,tipo:dominante}

        } else if (this.Operacion == OpAritmetica.PRODUCTO){
           const dominante = PRODUCTO[resultadoIzq.tipo][resultadoDer.tipo] 

           if(resultadoIzq.tipo == TipoDato.CHAR) resultadoIzq.valor = resultadoIzq.valor.charCodeAt(0);
           if(resultadoDer.tipo == TipoDato.CHAR) resultadoDer.valor = resultadoDer.valor.charCodeAt(0);

           if (dominante == TipoDato.NULO){
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Los tipos de dato no son valido para la multiplicacion`));
           }
           if (dominante == TipoDato.DOUBLE){
            if(resultadoIzq.tipo == TipoDato.CHAR) resultadoIzq.valor = resultadoIzq.valor.charCodeAt(0);
            if(resultadoDer.tipo == TipoDato.CHAR) resultadoDer.valor = resultadoDer.valor.charCodeAt(0);
            const resultado = resultadoIzq.valor * resultadoDer.valor;
            return {valor: resultado,tipo:dominante}
           }
            return {valor: resultadoIzq.valor*resultadoDer.valor,tipo:dominante}

        } else if (this.Operacion == OpAritmetica.DIVISION){

           const dominante = DIVISION[resultadoIzq.tipo][resultadoDer.tipo] 
           if (resultadoDer.valor == 0){
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `No se puede dividir en 0`));        
           }
           if (dominante == TipoDato.NULO){
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Los tipos de dato no son valido para la division`));  
           }
           const resultado = resultadoIzq.valor / resultadoDer.valor;
            return {valor: resultado,tipo:dominante}

        } else if (this.Operacion == OpAritmetica.MOD){

            const dominante = MODULO[resultadoIzq.tipo][resultadoDer.tipo] 
       
            switch(dominante){
                case TipoDato.DOUBLE:
                    const resultado = resultadoIzq.valor % resultadoDer.valor;
                    return {valor:resultado,tipo:TipoDato.DOUBLE}
                default:
                 throw lerrores.push(new errores(this.line, this.column, "Semantico", `Los tipos de dato no son valido para el Modulo`));
            }
        } else if(this,this.Operacion == OpAritmetica.POW){
                const dominante = POTENCIA[resultadoIzq.tipo][resultadoDer.tipo]
                switch(dominante){
                    case TipoDato.NUMBER:
                        return {valor:Math.pow(resultadoIzq.valor,resultadoDer.valor),tipo:TipoDato.NUMBER}
                    case TipoDato.DOUBLE:
                        const resultado = Math.pow(resultadoIzq.valor,resultadoDer.valor)
                        return {valor:resultado,tipo:TipoDato.DOUBLE}
                    default:
                        throw lerrores.push(new errores(this.line, this.column, "Semantico", `Los tipos de dato no son valido para la potencia`));
                }
        }
        return {valor:null,tipo:TipoDato.NULO}
    }
}
const SUMAS = [
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NUMBER ,TipoDato.NUMBER ,TipoDato.STRING ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.STRING ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.STRING ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.STRING ,TipoDato.STRING ],
    [TipoDato.STRING ,TipoDato.STRING ,TipoDato.STRING ,TipoDato.STRING ,TipoDato.STRING ],
]

const RESTAS = [
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NUMBER ,TipoDato.NUMBER ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]

const PRODUCTO = [
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NUMBER ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.DOUBLE ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]

const DIVISION = [
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.DOUBLE ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.DOUBLE ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]
const MODULO = [
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]

const POTENCIA = [
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]

const UNARIA = [TipoDato.NUMBER, TipoDato.DOUBLE, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO]

function convertir(tipoR:Resultado):void{
    if(tipoR.tipo==TipoDato.BOOLEANO) tipoR.valor = tipoR.valor?1:0;
    if(tipoR.tipo==TipoDato.CHAR) tipoR.valor = tipoR.valor.charCodeAt(0);
}