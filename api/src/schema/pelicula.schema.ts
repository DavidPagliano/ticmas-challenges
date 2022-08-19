import fileUpload, {FileArray} from 'express-fileupload';
import {z} from 'zod';

export const CreatePeliculaSchema = z.object({
    body: z.object({
        titulo: z.string().nonempty(),
        genero: z.string().nonempty(),
        año: z.number().lte(4).int(),
        director: z.string().nonempty(),
        actor: z.string().nonempty()
    })
});

export type CreatePelicula = z.infer<typeof CreatePeliculaSchema>["body"];