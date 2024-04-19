"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const symbol_1 = require("./symbol");
const datosts_1 = require("../datosts");
const Tablasimbolos_1 = require("../Tablasimbolos");
const vector_1 = require("./vector");
const Tablasimbolos_2 = require("../Tablasimbolos");
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
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Variable ${id} ya declarada anteriormente`));
        }
        else if (env.arreglos.has(id)) {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Arreglo ${id} declarado anteriormente`));
        }
        else if (env.funciones.has(id)) {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Funcion ${id} declarado anteriormente`));
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
        throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Variable ${id} no declarada`));
    }
    guardarVariablesTablaSimbolos(id, valor, tipo, tipo2, entorno, fila, columna) {
        // Verificar si ya existe una entrada con el mismo id, tipo y entorno
        const existingIndex = Tablasimbolos_1.globalMap.some((variable) => {
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo && variable.entorno == entorno;
        });
        if (existingIndex) {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Variable ${id} ya declarada anteriormente`));
        }
        // Si no existe, agregar una nueva entrada al array
        Tablasimbolos_1.globalMap.push(new datosts_1.Datosts(id, tipo, valor, tipo2, entorno, fila, columna));
    }
    editarVariableTablaSimbolos(id, valor, tipo, tipo2, entorno, fila, columna) {
        // Buscar la variable en el array
        const existingIndex = Tablasimbolos_1.globalMap.findIndex((variable) => {
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo;
        });
        if (existingIndex >= 0) {
            Tablasimbolos_1.globalMap[existingIndex] = new datosts_1.Datosts(id, tipo, valor, tipo2, entorno, Tablasimbolos_1.globalMap[existingIndex].fila, Tablasimbolos_1.globalMap[existingIndex].columna);
        }
        else {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Variable ${id} no declarada`));
        }
    }
    //vectores
    guardarVector(id, tipo, nfila, ncolumna, fila, columna) {
        let env = this;
        if (env.arreglos.has(id)) {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Vector ${id} ya declarado anteriormente`));
        }
        else if (env.variables.has(id)) {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Variable ${id} ya declarada anteriormente`));
        }
        else if (env.funciones.has(id)) {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Funcion ${id} declarado anteriormente`));
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
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Vector ${id} ya declarado anteriormente`));
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
        throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(fila, columna, "Semantico", `Vector ${id} no declarado`));
        // Si se encuentra, actualizar su valor
    }
    guardarFuncion(id, funcion) {
        let env = this;
        if (env.funciones.has(id)) {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(funcion.line, funcion.column, "Semantico", `Funcion ${id} declarado anteriormente`));
        }
        else if (env.arreglos.has(id)) {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(funcion.line, funcion.column, "Semantico", `Arreglo ${id} declarado anteriormente`));
        }
        else if (env.variables.has(id)) {
            throw Tablasimbolos_2.lerrores.push(new Tablasimbolos_2.errores(funcion.line, funcion.column, "Semantico", `Variable ${id} declarada anteriormente`));
        }
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
