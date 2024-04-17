import { Expresion } from "../Abstract/expresion";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { Case } from "./case";
import { Default } from "./default";
export class Switch extends Instruccion{
    expresion: Expresion
    listacase : Case[]|null
    def: Default|null


    constructor(expresion:Expresion,listacase:Case[]|null,def:Default|null,linea:number,columna:number){
        super(linea,columna)
        this.expresion = expresion
        this.listacase = listacase
        this.def = def
    }

    public interpretar(entorno : Environment,consola: string[]): any {
        if( this.listacase == null && this.def == null){
            throw new Error("El switch esta vacio no valido")
        }
        let estado = false;
        const newEntorno:Environment = new Environment(entorno)
        let condicion = this.expresion.interpretar(newEntorno)
        if(this.listacase!=null){
            for (const cases of this.listacase){
                console.log(condicion.valor)
                
                let con = cases.expresion.interpretar(newEntorno)
                console.log(con.valor)
                //por si no funciona interpretar resultados
                if(con.valor == condicion.valor  && !estado){
                    console.log("Entro a verificar")
                    const inscases = cases.interpretar(newEntorno,consola)
                    if(inscases != null){
                        if(inscases=="break"){
                            return;
                        }else{
                            throw new Error("No acepta coninue nu return no es valido")
                        }
                    }
                    estado = true;
                }else if(estado){
                    const inscases = cases.interpretar(newEntorno,consola)
                    if(inscases != null){
                        if(inscases=="break"){
                            return;
                        }else{
                            throw new Error("No acepta coninue nu return no es valido")
                        }
                    }
                }
            }
            if(this.def != null){
                const ins = this.def.interpretar(newEntorno,consola);
                if(ins != null){
                    if(ins=="break"){
                        return;
                    }else{
                        throw new Error("No acepta coninue nu return no es valido")
                    }
                }
            }

        }else if (this.def != null){
            const ins = this.def.interpretar(newEntorno,consola);
            if(ins != null){
                if(ins=="break"){
                    return;
                }else{
                    throw new Error("No acepta coninue nu return no es valido")
                }
            }
        }
    }
}