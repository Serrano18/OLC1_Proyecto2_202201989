import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";

export class Function extends Instruccion{

    constructor(private id: string, public statment: Instruccion, public parametros : Array<string>, line : number, column : number){
        super(line, column);
    }

    public interpretar(environment : Environment) {
        environment.guardarFuncion(this.id, this);
    }
}

/*
    function fact(n : numero){
        if(n == 0)
            return 1;
        else
            return n * fact(n - 1);
    }
*/



/*

    Lenguaje Entrada -> Traducis -> Lenguaje Salida;

    Lenguaje Salida -> Intepretas -> Salida en consola | Reportes | TS;

*/