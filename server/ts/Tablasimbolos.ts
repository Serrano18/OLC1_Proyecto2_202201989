import { Datosts } from "./datosts";
export class errores{
    
    constructor(public linea : number, public columna: number, public tipo : string, public mensaje : string){

    }
}
export let globalMap:Datosts[] = [];

export let consola: string[] = []

export let lerrores:errores[] = [];

export function vaciarconsola() {
    consola = [];
}
export function vaciarlerrores() {
    lerrores = [];
}
export function vaciarGlobalMap() {
    globalMap = [];
}