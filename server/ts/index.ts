import { Request, Response } from "express"
import { exec } from "child_process"
import { globalMap,vaciarGlobalMap,vaciarconsola,vaciarlerrores,lerrores,errores} from "./Tablasimbolos";
import { crearGrafico,createNode,save } from "./graphivz/graphviz";
const parser = require("../Gramatica/gramatica")
const path = require('path');
function interprete(contenido:string){
    let raiz = createNode("Raiz")
    try {

        vaciarGlobalMap()
        vaciarconsola()
        
        const ast = parser.parse(contenido)
        ast.Ejecutar() 
        ast.crearGrafico(raiz)   
        console.log("Análisis finalizado 2")
        
        return ast.getConsola()
        
       
    } catch (e) {
        return "Error1: " + e;
    
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
  const interpretado = interprete(contenido)
  res.send(interpretado)
})
app.get('/globalmap', (req: Request, res: Response) => {
  res.send(globalMap); // Envía globalMap
});
app.get('/errores', (req: Request, res: Response) => {
  res.send(lerrores); // Envía lista errores
});
app.get('/', (req:Request, res:Response) => {

    res.send("Esta Funcionando")
})
app.get('/vaciar', (req:Request, res:Response) => {
  vaciarlerrores()
})

app.get('/graph', (req: Request, res: Response) => {
  save()
  res.sendFile(path.join(__dirname, '../graphviz.png')); // Envía el archivo de gráfico
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})