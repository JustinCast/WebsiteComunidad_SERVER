import { Schema, model } from "mongoose";

let MemberSchema: Schema = new Schema({
    nombre: {
        type: String,
        default: '',
        required: true
    },
    apellidos: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    especialidad: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    github_user: {
        type: String,
        default: '',
        required: true,
        unique: true
    }
})

export default model('Miembros', MemberSchema)