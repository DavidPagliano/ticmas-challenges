import { Router } from "express";
const router = Router();

import {
  crearPelicula,
  eliminarPelicula,
  buscarPeliculas,
  buscarPelicula,
  actualizarPelicula,
} from "../controllers/Peliculas.controller";
import { validateSchema } from "../middleware/validateSchema.middleware";
import { CreatePeliculasSchema } from "../schema/pelicula.schema";

router.get("/peliculas", buscarPeliculas);

router.get("/peliculas/:id", buscarPelicula);

router.post("/peliculas", validateSchema(CreatePeliculasSchema), crearPelicula);

router.delete("/peliculas/:id", eliminarPelicula);

router.put("/peliculas/:id", actualizarPelicula);

export default router;