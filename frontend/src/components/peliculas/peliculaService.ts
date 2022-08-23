import axios from "axios";
import { pelicula } from "./pelicula";

const API = process.env.REACT_APP_API;

export const getPeliculas = async () => {
  return await axios.get<pelicula[]>(`${API}/Peliculas`);
};

export const getPeliculaById = async (id: string) => {
  return await axios.get<pelicula>(`${API}/Peliculas/${id}`);
};

export const createNewpelicula = async (pelicula: pelicula) => {
  return await axios.post(`${API}/Peliculas`, pelicula);
};

export const deletepeliculaById = async (id: string) => {
  return await axios.delete(`${API}/Peliculas/${id}`);
};

export const updatepelicula = async (id: string, pelicula: pelicula) => {
  return await axios.put(`${API}/Peliculas/${id}`, pelicula);
};