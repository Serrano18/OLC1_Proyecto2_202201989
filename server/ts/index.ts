import { Request, Response } from "express"
import { exec } from "child_process"
import { errores } from './Errores';
import { Error_ } from "./Error";
import { globalMap,vaciarGlobalMap} from "./Tablasimbolos";
const parser = require("../Gramatica/gramatica")

function interprete(contenido:string){
    try {
        vaciarGlobalMap()
        const ast = parser.parse(contenido)
        ast.Ejecutar()    
        console.log("Análisis finalizado 2")
        console.log(globalMap)
        return ast.getConsola()
    } catch (e) {
        return e;
    
    }

}

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.post('/interpretar', (req:Request, res:Response) => {
  const contenido = req.body.contenido
  console.log(contenido)
  const interpretado = interprete(contenido.toLowerCase())
  res.send(interpretado)
})

app.get('/', (req:Request, res:Response) => {

    res.send("Esta Funcionando")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})