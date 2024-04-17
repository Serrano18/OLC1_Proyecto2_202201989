"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tablasimbolos_1 = require("./Tablasimbolos");
const parser = require("../Gramatica/gramatica");
function interprete(contenido) {
    try {
        (0, Tablasimbolos_1.vaciarGlobalMap)();
        const ast = parser.parse(contenido);
        ast.Ejecutar();
        console.log("Análisis finalizado 2");
        console.log(Tablasimbolos_1.globalMap);
        return ast.getConsola();
    }
    catch (e) {
        return e;
    }
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.post('/interpretar', (req, res) => {
    const contenido = req.body.contenido;
    console.log(contenido);
    const interpretado = interprete(contenido.toLowerCase());
    res.send(interpretado);
});
app.get('/', (req, res) => {
    res.send("Esta Funcionando");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
