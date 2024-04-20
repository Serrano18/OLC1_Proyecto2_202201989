import React, {useCallback, useState,useRef } from 'react';
import {saveAs} from 'file-saver';

import axios from 'axios';

import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

export function Home(){
  const [myvalue,setMyValue] = useState("");
  const [contenido,setContenido] = useState("");
  const [globalMap, setGlobalMap] = useState([]);
  const [lerrores, setLerrores] = useState([]);
  const [showPDF, setShowPDF] = useState(false); 
  const [abrirTe, setAbrirTe] = useState(false); 
  const [abrirAST, setAbrirAST] = useState(false); 
  const [graphImage, setGraphImage] = useState(null);

const fetchGraphImage = async () => {
  try {
    const response = await axios.get('http://localhost:3000/graph', { responseType: 'arraybuffer' });
    const blob = new Blob([response.data], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    setShowPDF(false)
    setAbrirTe(false)
    setAbrirAST(true)
    setGraphImage(url);
  } catch (error) {
    console.error(error);
  }
};

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
      setAbrirTe(false);
      setAbrirAST(false);
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
      setAbrirTe(false);
      setAbrirAST(false);
      TablaSimbolos(); // Llama a la función TablaSimbolos al hacer clic en el botón
  };
  const botonerrores = () => {
    setShowPDF(false);
    setAbrirAST(false);
    TablaErrores(); 
  };
    const readFile=(e)=> {
      setShowPDF(false);
      setAbrirTe(false);
      setContenido('');
      const file = e.target.files[0];
      if ( !file ) return;

      const fileExtension = file.name.split('.').pop();
      if (fileExtension !== 'sc') {
        console.log('Solo archivos .sc son permitidos');
        return;
      }
    
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

    const createBlankFile = async () => {
        setMyValue('');
        setContenido('');
        setShowPDF(false);
        setAbrirTe(false);
        setAbrirAST(false);
        await axios.get('http://localhost:3000/vaciar');
        
      };
      
      const TablaSimbolos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/globalmap');
            await setGlobalMap(response.data) 
            await console.log("GlobalMap: ",globalMap)
            await setShowPDF(true);
            setAbrirAST(false);
            setAbrirTe(false);
        } catch (error) {
            console.error(error);
        }
    };

    const TablaErrores = async () => {
      try {
        
          const response = await axios.get('http://localhost:3000/errores');
          await setLerrores(response.data) 
          await console.log(response.data)
          await setAbrirTe(true);
          setAbrirAST(false);
          setShowPDF(false);
      } catch (error) {
          console.error(error);
      }
  };
    const Ejecutar = () => {
       setShowPDF(false);
       setAbrirTe(false);
       setAbrirAST(false);
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
    const ImageDisplay = ({ image }) => (
      <div className="contenedor">
        <h2>Arbol AST</h2>
        {image && <img src={image} alt="Gráfico" />}
      </div>
    );
    const PDFGenerator2 = ({data}) => (
      <div className="contenedor2">
        <h2>Tabla de Errores</h2>
         <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Tipo</th>
                <th>Mensaje</th>
                <th>Fila</th>
                <th>Columna</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item,index) => (
                  <tr key={item.index}>
                  <td>{index+1}</td>
                  <td>{item.tipo}</td>
                  <td>{item.mensaje}</td>
                  <td>{item.linea}</td>
                  <td>{item.columna}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
  );
    const PDFGenerator = ({ data }) => (
      <div className="contenedor">
        <h2>Tabla de Simbolos</h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Id</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Fila</th>
              <th>Columna</th>
              <th>Tipo2</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
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
                <td> {(() => {
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
            <input  type='file'  accept='.sc' ref={fileInputRef} style={{ display: 'none' }}  onChange={readFile}  />
            <a  onClick={openFilePicker}>Abrir archivos</a></li>
          <li><a onClick={saveFile}>Guardar archivo</a></li>
          <li><a onClick={Ejecutar}>Ejecutar</a></li>
          <li><a onClick={botonerrores}>Reporte de Errores</a></li>
          <li><a onClick={fetchGraphImage}>Generar Árbol AST</a></li>
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
              {abrirTe && <PDFGenerator2 data={lerrores} />} {/* Mostrar el PDF si showPDF es true */}
              {abrirAST && <ImageDisplay image={graphImage} />}
        </>
    )
}