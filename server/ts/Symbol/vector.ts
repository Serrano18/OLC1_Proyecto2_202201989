import { Symbol } from "./symbol";
import { TipoDato } from "../Abstract/resultado";
export class Vector{
    public values : Symbol[][];
    public id:string;
    public tipo:TipoDato;
    public line:number;
    public column:number;

    constructor(id:string,tipo:TipoDato,nfila:number,ncolumna:number,line:number,column:number){
        this.id = id.toLowerCase()
        this.tipo =tipo
        this.line = line
        this.column = column
        this.values = new Array(nfila);
        for(let i =0;i<nfila;i++){
            this.values[i]=new Array(ncolumna)
        }
    }

    public getValue(fila: number, columna: number): Symbol {
            if (fila < 0 || fila >= this.values.length || columna < 0 || columna >= this.values[0].length) {
                throw new Error('Índices de fila o columna fuera de rango');
            }
            return this.values[fila][columna];
    }
    public addValue(fila: number, columna: number,id:string, valor: any, tipo: TipoDato,line:number,column:number): void {
        if (fila < 0 || fila >= this.values.length || columna < 0 || columna >= this.values[0].length) {
            throw new Error('Índices de fila o columna fuera de rango');
        }
        this.values[fila][columna] = new Symbol(id, tipo, valor, "Vector", line,column); // Crear un nuevo Symbol con los valores proporcionados
    }
    public llenarpordefecto(id:string, valor: any, tipo: TipoDato,line:number,column:number){
        for(let i=0; i<this.values.length;i++){
            for(let j=0; j<this.values[i].length;j++){
                this.values[i][j] = new Symbol(id, tipo, valor, "Vector", line,column); 
            }
        }
    }
    public setVector(vector:Symbol[][]){    
        this.values = vector
    }

}