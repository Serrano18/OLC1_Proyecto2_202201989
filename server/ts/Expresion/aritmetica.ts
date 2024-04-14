import { Expresion } from "../Abstract/expresion";
import { OpAritmetica, Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
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
    public interpretar(entorno : Environment): Resultado {
        // Ejecutamos los noterminales
        const resultadoIzq = this.exp1.interpretar(entorno)
        const resultadoDer = this.exp2.interpretar(entorno)
        // Lógica del intérprete
        // Comparamos el tipo de operación
        if (this.Operacion == OpAritmetica.SUMA){
            // Valor dominante
           const dominante = SUMAS[resultadoIzq.tipo][resultadoDer.tipo] 
           if (dominante == TipoDato.NULO){
             throw Error("tipo dato no valido")
           }
           if (dominante == TipoDato.NUMBER  || TipoDato.DOUBLE == dominante){

           if(resultadoIzq.tipo == TipoDato.BOOLEANO) resultadoIzq.valor = resultadoIzq.valor?1:0
           if(resultadoDer.tipo == TipoDato.BOOLEANO) resultadoDer.valor = resultadoDer.valor?1:0

           }else if (dominante == TipoDato.STRING){
            return {valor: resultadoIzq.valor.toString()+resultadoDer.valor.toString(),tipo:dominante}
           }
           // Operacion
            return {valor: resultadoIzq.valor+resultadoDer.valor,tipo:dominante}

        } else if (this.Operacion == OpAritmetica.RESTA){
           const dominante = RESTAS[resultadoIzq.tipo][resultadoDer.tipo] 
           if (dominante == TipoDato.NULO){
             throw Error("tipo dato no valido")
           }
            return {valor: resultadoIzq.valor-resultadoDer.valor,tipo:dominante}

        } else if (this.Operacion == OpAritmetica.PRODUCTO){
           const dominante = PRODUCTO[resultadoIzq.tipo][resultadoDer.tipo] 
           if (dominante == TipoDato.NULO){
             throw Error("tipo dato no valido")
           }
            return {valor: resultadoIzq.valor*resultadoDer.valor,tipo:dominante}
        } else if (this.Operacion == OpAritmetica.DIVISION){
           const dominante = DIVISION[resultadoIzq.tipo][resultadoDer.tipo] 
           if (dominante == TipoDato.NULO){
             throw Error("tipo dato no valido")
           }
            return {valor: resultadoIzq.valor/resultadoDer.valor,tipo:dominante}
        } else if (this.Operacion == OpAritmetica.MOD){
            const dominante = MODULO[resultadoIzq.tipo][resultadoDer.tipo] 
            switch(dominante){
                case TipoDato.DOUBLE:
                    return {valor:resultadoIzq.valor % resultadoDer.valor,tipo:TipoDato.DOUBLE}
                default:
                    throw Error(`Error: No se puede modular ${TipoDato[resultadoIzq.tipo]} con ${TipoDato[resultadoDer.tipo]}`)
            }
        } else if(this,this.Operacion == OpAritmetica.POW){
                const dominante = POTENCIA[resultadoIzq.tipo][resultadoDer.tipo]
                switch(dominante){
                    case TipoDato.NUMBER:
                        return {valor:Math.pow(resultadoIzq.valor,resultadoDer.valor),tipo:TipoDato.NUMBER}
                    case TipoDato.DOUBLE:
                        return {valor:Math.pow(resultadoIzq.valor,resultadoDer.valor),tipo:TipoDato.DOUBLE}
                    default:
                        throw Error(`Error: No se puede potenciar ${TipoDato[resultadoIzq.tipo]} con ${TipoDato[resultadoDer.tipo]}`)
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