import {z} from 'zod';

export const CreatePeliculasSchema = z.object({
    titulo: z.string().nonempty({
        message: "Titulo is required"
    }),
    genero: z.string().nonempty({
        message: "Genero is required"
    }),
    año: z.number(),
    Director: z.string().nonempty({
        message: "Director is required"
    }),
    Actores: z.string().nonempty({
        message: "Actores is required"
    }),

})

export type CreatePelicula = z.infer<typeof CreatePeliculasSchema>;