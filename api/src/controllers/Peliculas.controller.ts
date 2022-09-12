import { Response, Request, NextFunction} from 'express';
import { nextTick } from 'process';
import pelicula from '../models/peliculas';
import { CreatePelicula, CreatePeliculasSchema } from '../schema/pelicula.schema';

export const crearPelicula = async(
    req: Request<unknown,unknown, CreatePelicula>,
    res: Response,
    siguiente: NextFunction
) => {
    try {
        const {titulo, genero, año, Director , Actores} = req.body;

        //Busqueda de alguna pelicula existentes con el mismo titulo
        const peliculaFound = await pelicula.findOne({ titulo });

        //si la pelicula existe le debe salir un mensaje diciendo: "la pelicula ya existe en la base de datos".
        if(peliculaFound) return res.status(400).json({message: "la pelicula ya existe en la base de datos"});

        //Se crea una nueva pelicula
        const nuevaPelicula = new pelicula({titulo, genero, año, Director, Actores});

        await nuevaPelicula.save();
        res.redirect("/movie/list");
    } catch (error) {
        siguiente(error);
    }
};

export const buscarPeliculas = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const videos = await pelicula.find();
      res.render("/movie/list", {
        videos
      });
      return res.json(videos);
    } catch (error) {
      next(error);
    }
  };
  
  export const buscarPelicula = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const videoFound = await pelicula.findById(req.params.id);
      if (!videoFound) return res.status(204).json();
      res.render("/movie/list", {
       videoFound
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const eliminarPelicula = async (req: Request, res: Response) => {
    const videoFound = await pelicula.findByIdAndDelete(req.params.id);
  
    if (!videoFound) return res.status(204).json();
    res.redirect("/movie/list");
  };
  
  export const actualizarPelicula = async (
    req: Request,
    res: Response
  ) => {
    const videoUpdated = await pelicula.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!videoUpdated) return res.status(204).json();
    res.redirect("/movie/list");
  };