import React, {useCallback, useState,useRef } from 'react';
import {saveAs} from 'file-saver';
import { githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
export function Home(){
    const [myvalue,setMyValue] = useState("cout<<5;");
    const [contenido,setContenido] = useState("");
    const saveFile =  () =>{
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
  
    const readFile=(e)=> {
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
      };

    const Ejecutar = () => {
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
          <li><a href="#">Reporte de Tabla de Símbolos</a></li>
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
        </>
    )
}