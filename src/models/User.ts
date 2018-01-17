import { Schema, model } from "mongoose";

let UserSchema: Schema = new Schema({
    _id: String,
    nombre: String,
    apellidos: String,
    especialidad: String,
    github_user: String
})

export default model('Miembros', UserSchema)