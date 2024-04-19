import { Expresion } from "../Abstract/expresion";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { errores, lerrores } from "../Tablasimbolos";
import { Case } from "./case";
import { Default } from "./default";
import { createEdge,createNode } from "../graphivz/graphviz";
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
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Instrucción Switch');
        createEdge(padre, nodoPadre);
    
        const nodoSwitch = createNode('switch');
        createEdge(nodoPadre, nodoSwitch);
    
        const nodoExpresion = createNode('Expresion');
        createEdge(nodoPadre, nodoExpresion);
        this.expresion.crearGrafico(nodoExpresion);
    
        const nodoCases = createNode('Cases');
        createEdge(nodoPadre, nodoCases);
        if(this.listacase != null){
            for(const caso of this.listacase){
                caso.crearGrafico(nodoCases);
            }
        }
    
        if(this.def != null){
            const nodoDefault = createNode('Default');
            createEdge(nodoPadre, nodoDefault);
            this.def.crearGrafico(nodoDefault);
        }
    }
    public interpretar(entorno : Environment): any {
        if( this.listacase == null && this.def == null){
            throw lerrores.push(new errores(this.line,this.column,'Semantico',"El switch esta vacio no valido"));
        }
        let estado = false;
        
        let condicion = this.expresion.interpretar(entorno)
        const newEntorno:Environment = new Environment(entorno)
        if(this.listacase!=null){
            for (const cases of this.listacase){
              
                let con = cases.expresion.interpretar(newEntorno)
                //por si no funciona interpretar resultados
                if(con.valor == condicion.valor && con.tipo == condicion.tipo  && !estado){
                    
                    const inscases = cases.interpretar(newEntorno)
                    if(inscases != null || inscases != undefined){
                        if(inscases=="break"){
                            return;
                        }else if (inscases.tV == 'return'){
                            return inscases;
                        }else{
                            throw lerrores.push(new errores(this.line,this.column,'Semantico',`Instruccion no valida dentro en el Switch`));
                        }
                    }
                    estado = true;
                }else if(estado){
                    const inscases = cases.interpretar(newEntorno)
                    if(inscases != null || inscases != undefined){
                        if(inscases=="break"){
                            return;
                        }else if(inscases.tV == 'return'){
                            return inscases
                        }else{
                            throw lerrores.push(new errores(this.line,this.column,'Semantico',`Instruccion no valida dentro en el Switch`));
                        }
                    }
                }
            }
            if(this.def != null){
                const ins = this.def.interpretar(newEntorno);
                if(ins != null || ins != undefined){
                    if(ins=="break"){
                        return;
                    }else if(ins.tV == 'return'){
                        return ins
                    }else{
                        throw lerrores.push(new errores(this.line,this.column,'Semantico',`Instruccion no valida dentro en el Switch`));
                    }
                }
            }

        }else if (this.def != null){
            const ins = this.def.interpretar(newEntorno);
            if(ins != null){
                if(ins=="break"){
                    return;
                }else if(ins.tV == 'return'){
                    return ins
                }else{
                    throw lerrores.push(new errores(this.line,this.column,'Semantico',`Instruccion no valida dentro en el Switch`));
                }
            }
        }
    }
}