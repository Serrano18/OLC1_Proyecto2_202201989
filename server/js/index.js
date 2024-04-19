"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tablasimbolos_1 = require("./Tablasimbolos");
const graphviz_1 = require("./graphivz/graphviz");
const parser = require("../Gramatica/gramatica");
const path = require('path');
function interprete(contenido) {
    let raiz = (0, graphviz_1.createNode)("Raiz");
    try {
        (0, Tablasimbolos_1.vaciarGlobalMap)();
        (0, Tablasimbolos_1.vaciarconsola)();
        (0, Tablasimbolos_1.vaciarlerrores)();
        const ast = parser.parse(contenido);
        ast.Ejecutar();
        ast.crearGrafico(raiz);
        console.log("Análisis finalizado 2");
        return ast.getConsola();
    }
    catch (e) {
        return "Error1: " + e;
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
    const interpretado = interprete(contenido);
    res.send(interpretado);
});
app.get('/globalmap', (req, res) => {
    res.send(Tablasimbolos_1.globalMap); // Envía globalMap
});
app.get('/errores', (req, res) => {
    res.send(Tablasimbolos_1.lerrores); // Envía lista errores
});
app.get('/', (req, res) => {
    res.send("Esta Funcionando");
});
app.get('/graph', (req, res) => {
    res.sendFile(path.join(__dirname, 'graphviz.png')); // Envía el archivo de gráfico
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
