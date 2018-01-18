import { Schema, model } from "mongoose";

let ProjectSchema: Schema = new Schema({
    nombre: {
        type: String,
        default: '',
        required: true
    },
    descripcion: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    fecha_inicio: {
        type: Date,
        default: new Date('2017-01-01 18:00:00.000'),
        required: true
    },
    estado:{
        type: String,
        default: '',        
    },
    miembros: Array
})

export default model('proyectos', ProjectSchema)