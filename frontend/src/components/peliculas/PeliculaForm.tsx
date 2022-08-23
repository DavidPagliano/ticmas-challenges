import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import * as peliculaService from "./peliculaService";
import { pelicula } from "./pelicula";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Parameter {
  id: String;
}

const PeliculaForm = () => {
  const initialState = {
    titulo: "",
    genero: "",
    año: 0,
    director: "",
    actor:  ""
  };

  const [pelicula, setPelicula] = useState<pelicula>(initialState);

  const history = useNavigate();
  const params = useParams();

  const getPelicula = async (id: string) => {
    const res = await peliculaService.getPeliculaById(id);
    const { titulo, genero, año, director, actor } = res.data;
    setPelicula({ titulo, genero, año, director, actor });
  };

  useEffect(() => {
    if (params.id) getPelicula(params.id);
  }, [params.id]);

  const handleInputChange = (e: InputChange) =>
  setPelicula({ ...pelicula, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await peliculaService.createNewpelicula;
      setPelicula(initialState);
      toast.success("New Video Added");
    } else {
      await peliculaService.updatepelicula(params.id, pelicula);
    }
    history.caller("/Peliculas");
  };

  return (
    <Modal>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="card my-auto">
              <div className="card-body">
                <Modal.Header>
                  <Modal.Title>
                    <h3>Nueva Pelicula</h3>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="title"
                      placeholder="Write a Title for this video"
                      className="form-control"
                      autoFocus
                      minLength={4}
                      onChange={handleInputChange}
                      value={pelicula.titulo}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="url"
                      placeholder="https://somesite.com"
                      className="form-control"
                      onChange={handleInputChange}
                      value={pelicula.genero}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      name="año"
                      className="form-control"
                      placeholder="Write a description"
                      onChange={handleInputChange}
                      maxLength= {4}
                      minLength= {2}
                      min={1600}
                      max= {2022}
                      value={pelicula.año}
                    ></input>
                  </div>

                  {params.id ? (
                    <button className="btn btn-info">Update</button>
                  ) : (
                    <button className="btn btn-primary">Create</button>
                  )}
                </form>
                </Modal.Body>
                
              </div>
            </div>
          </div>
        </div>
    </Modal>
    
  );
};

export default PeliculaForm;