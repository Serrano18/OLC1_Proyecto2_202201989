import { Environment } from "../Symbol/Evironment";
export abstract class  Instruccion{
    public line: number;
    public column: number; 
    // Esta clase siempre pedirá línea y columna
    constructor(line: number, colum:number){
        this.line = line;
        this.column = colum;
    }
    // Método que siempre debe ejecutarse en todos los objetos que hereda
    public abstract interpretar(environment : Environment,consola:string[]):any;
        
 }