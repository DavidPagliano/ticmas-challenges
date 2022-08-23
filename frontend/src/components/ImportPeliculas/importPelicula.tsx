import React, { ChangeEvent, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { pelicula } from "../peliculas/pelicula";

function import_csv() {
    const [file, setFile] = useState('');
    const [array, setArray] = useState();

    const fileReader = new FileReader();

    const csvFileToArray = (string: string) => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        })
    };

    const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.currentTarget.value);
    }

    const OnSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(file)
        {
            fileReader.onload = function(ev){
                const text = ev.target?.result;
                csvFileToArray(text?.toString()!);
            }
            fileReader.readAsText(blob, file);
        }
    }

    const headerKeys = Object.keys(Object.assign({}, array));
    return (
        <Modal  size="lg" aria-labelledby="contained-modal-title-vcenter" centered>       
            <div>
                <Modal.Header>
                    <Modal.Title>
                    <label htmlFor="csvInput" style={{ display: "block" }}>
                        Enter CSV File
                    </label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <input
                    onChange={OnChange}
                    id="csvInput"
                    name="file"
                    type="File"
                />
                <div>
                    <Button onClick={ OnSubmit}>
                        Parse
                    </Button>  
                </div>
                <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>  
          {array.map(function (item: pelicula): JSX.Element {
              return (
                  <tr key={item.titulo}>
                      {Object.values(item).map((val: pelicula) => {
                          return (
                              <tr>
                                  <td>{val.titulo}</td>
                                  <td>{val.genero}</td>
                                  <td>{val.año}</td>
                                  <td>{val.director}</td>
                                  <td>{val.actor}</td>
                              </tr>
                          );
                      })}
                  </tr>
              );
          })}
        </tbody>
      </table>
                </Modal.Body>               
            </div>
        </Modal>
        
    );
};

export default import_csv;


