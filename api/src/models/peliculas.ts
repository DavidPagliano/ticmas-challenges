import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { number } from "zod";

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
class Peliculas {
  @prop({ type: String, required: true, unique: true,  })
  titulo: string;

  @prop({ type: String, required: true })
  genero: string;

  @prop({ type: Number, required: true })
  año: number;
  @prop({ type: String, required: true })
  Director: string;

  @prop({ type: String, required: true})
  Actores: string;
  
}

const PeliculaModel = getModelForClass(Peliculas);
export default PeliculaModel;