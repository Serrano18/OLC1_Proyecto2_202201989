"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const symbol_1 = require("./symbol");
class Environment {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();
    }
    guardar(id, valor, tipo, tipo2, fila, columna) {
        let env = this;
        if (env.variables.has(id)) {
            throw Error("Variable ya declarada anteriormente");
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
