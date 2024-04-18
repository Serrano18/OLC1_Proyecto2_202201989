"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const symbol_1 = require("./symbol");
const datosts_1 = require("../datosts");
const Tablasimbolos_1 = require("../Tablasimbolos");
const vector_1 = require("./vector");
class Environment {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();
        this.arreglos = new Map();
    }
    guardar(id, valor, tipo, tipo2, fila, columna) {
        let env = this;
        if (env.variables.has(id)) {
            throw Error(`Variable ${id} ya declarada anteriormente`);
        }
        else if (env.arreglos.has(id)) {
            throw Error(`Arreglo ${id} declarado anteriormente`);
        }
        else if (env.funciones.has(id)) {
            throw Error(`Funcion ${id} declarado anteriormente`);
        }
        this.variables.set(id, new symbol_1.Symbol(id, tipo, valor, tipo2, fila, columna));
    }
    editarVariable(id, valor, tipo, tipo2, fila, columna) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new symbol_1.Symbol(id, tipo, valor, tipo2, fila, columna));
                return;
            }
            env = env.anterior;
        }
        throw Error("Variable no existente");
    }
    guardarVariablesTablaSimbolos(id, valor, tipo, tipo2, entorno, fila, columna) {
        // Verificar si ya existe una entrada con el mismo id, tipo y entorno
        const existingIndex = Tablasimbolos_1.globalMap.some((variable) => {
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo && variable.entorno == entorno;
        });
        if (existingIndex) {
            throw Error("Variable ya declarada anteriormente hash");
        }
        // Si no existe, agregar una nueva entrada al array
        Tablasimbolos_1.globalMap.push(new datosts_1.Datosts(id, tipo, valor, tipo2, entorno, fila, columna));
    }
    editarVariableTablaSimbolos(id, valor, tipo, tipo2, entorno, fila, columna) {
        console.log(this.variables);
        // Buscar la variable en el array
        console.log("El id: ", id, " fila: ", fila, " col: ", columna, " El tipo: ", tipo);
        const existingIndex = Tablasimbolos_1.globalMap.findIndex((variable) => {
            console.log("Id: ", variable.id, " F: ", variable.fila, " C: ", variable.columna, " Tipo: ", variable.type);
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo;
        });
        console.log("iNDICE: ", existingIndex);
        console.log("findice: ", Tablasimbolos_1.globalMap[existingIndex].fila);
        if (existingIndex >= 0) {
            Tablasimbolos_1.globalMap[existingIndex] = new datosts_1.Datosts(id, tipo, valor, tipo2, entorno, Tablasimbolos_1.globalMap[existingIndex].fila, Tablasimbolos_1.globalMap[existingIndex].columna);
        }
        else {
            throw Error("Variable no existente");
        }
    }
    //vectores
    guardarVector(id, tipo, nfila, ncolumna, fila, columna) {
        let env = this;
        if (env.arreglos.has(id)) {
            throw new Error("Vector ya declarado");
        }
        else if (env.variables.has(id)) {
            throw Error(`Arreglo ${id} declarado anteriormente`);
        }
        else if (env.funciones.has(id)) {
            throw Error(`Funcion ${id} declarado anteriormente`);
        }
        this.arreglos.set(id, new vector_1.Vector(id, tipo, nfila, ncolumna, fila, columna));
    }
    obtenerVector(id) {
        let env = this;
        while (env != null) {
            if (env.arreglos.has(id)) {
                return env.arreglos.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
    guardarVectorTablaSimbolos(id, tipo, valores, nfila, ncolumna, fila, columna, entorno) {
        // Verificar si ya existe una entrada con el mismo id, tipo y entorno
        const existingIndex = Tablasimbolos_1.globalMap.some((variable) => {
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo;
        });
        if (existingIndex) {
            throw Error("Vector ya declarado anteriormente hash");
        }
        // Si no existe, agregar una nueva entrada al array
        Tablasimbolos_1.globalMap.push(new datosts_1.Datosts(id, tipo, valores, "Vector", entorno, fila, columna));
    }
    editarVectorTablaSimbolos(id, valor, tipo, fila, columna) {
        // Buscar la variable en el array
        const existingIndex = Tablasimbolos_1.globalMap.findIndex((variable) => {
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo;
        });
        if (existingIndex) {
            Tablasimbolos_1.globalMap[existingIndex] = new datosts_1.Datosts(id, Tablasimbolos_1.globalMap[existingIndex].type, valor, Tablasimbolos_1.globalMap[existingIndex].type2, Tablasimbolos_1.globalMap[existingIndex].entorno, Tablasimbolos_1.globalMap[existingIndex].fila, Tablasimbolos_1.globalMap[existingIndex].columna);
        }
        throw Error("Variable no existente");
        // Si se encuentra, actualizar su valor
    }
    guardarFuncion(id, funcion) {
        //TODO ver si la funcion ya existe, reportar error
        this.funciones.set(id, funcion);
    }
    getVariable(id) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
    getVector(id) {
        let env = this;
        while (env != null) {
            if (env.arreglos.has(id)) {
                return env.arreglos.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
    getFuncion(id) {
        let env = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    getGlobal() {
        let env = this;
        while ((env === null || env === void 0 ? void 0 : env.anterior) != null) {
            env = env.anterior;
        }
        return env;
    }
}
exports.Environment = Environment;
/*envGlobal

function X() {
    env
    env.anterior = envGlobal;
    if(1){
        envIf
        envIf.anterior = env

    }
}*/ 
