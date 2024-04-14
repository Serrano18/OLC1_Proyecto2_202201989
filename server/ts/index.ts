import { Request, Response } from "express"
import { exec } from "child_process"

const parser = require("../Gramatica/gramatica")

function interprete(contenido:string){
    try {
        const ast = parser.parse(contenido)
        ast.Ejecutar()    
        console.log("Análisis finalizado 2")
        return ast.getConsola()
    } catch (error) {
       console.error(error) 
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