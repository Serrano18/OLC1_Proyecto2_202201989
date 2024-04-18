import React, {useCallback, useState,useRef } from 'react';
import {saveAs} from 'file-saver';

import axios from 'axios';

import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

export function Home(){
  const [myvalue,setMyValue] = useState("cout<<5;");
  const [contenido,setContenido] = useState("");
  const [globalMap, setGlobalMap] = useState([]);
  const [showPDF, setShowPDF] = useState(false); 

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        width: '100%',
        marginBottom: 10,
    },
    tableRow: {
        width:'100%',
        margin: 'auto',
        flexDirection: 'row',
    },
    tableCell: {
        width:'120px',
        margin: 'auto',
        padding: 5,
        borderWidth: 1,
        borderColor: '#bfbfbf',
    },
});


    const saveFile =  () =>{
      setShowPDF(false);
      const fileName = window.prompt("Por favor, ingrese el nombre del archivo:", "archivo.sc");
      if(fileName) {
          const blob = new Blob([myvalue], {type: 'text/plain;charset=utf-8'});
          saveAs(blob, fileName);
      }
    }
    const fileInputRef = useRef(null);

    const openFilePicker = () => {
      fileInputRef.current.click();
    };
    const handleButtonClick = () => {
      TablaSimbolos(); // Llama a la función TablaSimbolos al hacer clic en el botón
  };
    const readFile=(e)=> {
      setShowPDF(false);
      const file = e.target.files[0];
      if ( !file ) return;
  
      const fileReader = new FileReader();
  
      fileReader.readAsText( file );
  
      fileReader.onload = () => {
        console.log( fileReader.result );
        setMyValue( fileReader.result );
      }
  
      fileReader.onerror = () => {
        console.log( fileReader.error );
      }
    }

    const createBlankFile = () => {
        setMyValue('');
        setContenido('');
        setShowPDF(false);
      };
      
      const TablaSimbolos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/globalmap');
            await setGlobalMap(response.data) 
            await console.log("GlobalMap: ",globalMap)
            await setShowPDF(true);
        } catch (error) {
            console.error(error);
        }
    };

    const Ejecutar = () => {
       setShowPDF(false);
        console.log(myvalue);
        setContenido('');
        fetch("http://localhost:3000/interpretar", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
        
          body: JSON.stringify({ contenido: myvalue })
      })
      .then(response => response.text()) // Recibe la respuesta como texto
      .then(data => {
          console.log(data); // Muestra el resultado en la consola
          setContenido(data); // Establece el resultado en el editor de consola
     
      })
      .catch(error => console.error(error));

    }

    const PDFGenerator = ({ data }) => (
      <div className="contenedor">
        <h2>Tabla de Simbolos</h2>
    <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Fila</th>
                  <th>Columna</th>
                  <th>Type2</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{(() => {
                      switch (item.type) {
                        case 0:
                          return "int";
                        case 1:
                          return "double";
                        case 2:
                          return "bool";
                        case 3:
                          return "char";
                        case 4:
                          return "std::string";
                        default:
                          return "null";
                      }
                    })()}</td>
                    <td>
                    {(() => {
                      if (item.type == 2) {
                          if(item.value){
                            return "True"
                          }else if(!(item.value)){
                            return "false"
                          }else{
                            return item.value
                          }
                      }else if(item.type2 == "Variable"){
                        return item.value
                        
                      }else if(item.type2 == "Vector"){
                        
                         console.log(item.value.values[0][0].value)
                         let valor  = "[";
                         
                         for(let i=0; i < item.value.values.length;i++){
                          if (item.value.values[i].length != 1){
                            valor = valor + "["
                          }
                          for (let j = 0; j<item.value.values[i].length;j++){
                            valor = valor+ " " + item.value.values[i][j].value 
                            if(j < item.value.values[i].length-1){
                              valor = valor + ","
                            }
                          }
                          if (item.value.values[i].length != 1){
                            valor = valor + "]"
                          } else if( i != item.value.values.length-1){
                            valor = valor + ","
                          } 
                           if (item.value.values[i].length != 1 && i < item.value.values.length-1){
                            valor = valor + ","
                          }
                        
                         }
                         valor = valor + " ]"
                        return valor
                       
                      
                      }

                    })()}</td>
                    <td>{item.fila}</td>
                    <td>{item.columna}</td>
                    <td>{item.type2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
        
       
  );
    return (
    <>
      <nav>
        <ul>
         <li><a href="#">CompiScript+</a></li>
          <li><a onClick={createBlankFile}>Crear archivos</a></li>
          <li>
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={readFile}
            />
            <a href="#" onClick={openFilePicker}>Abrir archivos</a>
          </li>
          <li><a onClick={saveFile}>Guardar archivo</a></li>
          <li><a onClick={Ejecutar}>Ejecutar</a></li>
          <li><a href="#">Reporte de Errores</a></li>
          <li><a href="#">Generar Árbol AST</a></li>
          <li><a onClick={handleButtonClick}>Reporte de Tabla de Símbolos</a> </li>
        </ul>
      </nav> 
      <br></br>  <br></br> <br></br> 
        <div className="contain">
            <h3>Entrada</h3>
            <h3>Consola</h3>
        </div>
            <div className="container ">
                <div className="editor">
                <textarea
                      className="textarea-left"
                      placeholder="Escribe tu código aquí..."
                      value={myvalue}
                      onChange={(e)=> setMyValue(e.target.value)}
                    />
                </div>
                <div className="editor" >
                  <textarea
                    className="textarea-right"
                    value={contenido}
                    onChange={(e)=> setContenido(e.target.value)}
                  />
                </div>
              
              </div>
              {showPDF && <PDFGenerator data={globalMap} />} {/* Mostrar el PDF si showPDF es true */}
        </>
    )
}