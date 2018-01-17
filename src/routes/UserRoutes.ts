import { Router, Request, Response } from 'express';
import User from '../models/User';

class UserRoutes {
    router: Router
    constructor() {
        this.router = Router()
        this.routes()
    }
    
    /**
     * Metodo encargado de obtener todos los usuarios de la BD 
     * @param req 
     * @param res 
     */
    public GetUsers(req: Request, res: Response): void {    
        User.find()
        .then((users) => {
            let code = res.statusCode;
            let msg = res.statusMessage;
            res.json({
            code,
            msg,
            users
            });
        })
        .catch((error) => {
            let code = res.statusCode;
            let msg = res.statusMessage;
            res.json({
            code,
            msg,
            error
            });
        })  
    }

    /**
     * Metodo que obtiene el usuario solicitado
     * @param req 
     * @param res 
     */
    public GetUser(req: Request, res: Response): void {
        const objectId: string = req.params.objectId;
    
        User.findOne({ objectId })
        .then((data) => {
          let code = res.statusCode;
          let msg = res.statusMessage;
          res.json({
            code,
            msg,
            data
          });
        })
        .catch((error) => {
          let code = res.statusCode;
          let msg = res.statusMessage;
          res.json({
            code,
            msg,
            error
          });
        })
    }

    /**
     * Metodo para crear un usuario en la BD
     * @param req 
     * @param res 
     */
    public CreateUser(req: Request, res: Response): void {
        const nombre: string = req.body.nombre;
        const apellidos: string = req.body.apellidos;
        const especialidad: string = req.body.especialidad;
        const github_user: string = req.body.github_user
    
        const user = new User({
          nombre,
          apellidos,
          especialidad,
          github_user
        })
    
        user.save()
        .then((data) => {
          let code = res.statusCode;
          let msg = res.statusMessage;
          res.json({
            code,
            msg,
            data
          });
        })
        .catch((error) => {
          let code = res.statusCode;
          let msg = res.statusMessage;
          res.json({
            code,
            msg,
            error
          });
        })
    
    }

    /**
     * Metodo que actualizara un usuario
     * @param req 
     * @param res 
     */
    public UpdateUser(req: Request, res: Response): void {
        const objectId: string = req.params.objectId;
    
        User.findOneAndUpdate({ objectId }, req.body)
        .then((data) => {
          let code = res.statusCode;
          let msg = res.statusMessage;
          res.json({
            code,
            msg,
            data
          });
        })
        .catch((error) => {
          let code = res.statusCode;
          let msg = res.statusMessage;
          res.json({
            code,
            msg,
            error
          });
        })
    
    }

    /**
     * Metodo que eliminara un usuario
     * @param req
     * @param res 
     */
    public DeleteUser(req: Request, res: Response): void {
        const objectId: string = req.params.objectId;
    
        User.findOneAndRemove({ objectId })
        .then(() => {
          let code = res.statusCode;
          let msg = res.statusMessage;
          res.json({
            code,
            msg,
            "success": "User was deleted."
          });
        })
        .catch((error) => {
          let code = res.statusCode;
          let msg = res.statusMessage;
          res.json({
            code,
            msg,
            error
          });
        })    
    }

    /**
     * Se setean todas las rutas con sus respectivos metodos manejadores
     */
    routes(): void {
    this.router.get('/', this.GetUsers);
    this.router.get('/:objectId', this.GetUser);
    this.router.post('/', this.CreateUser);
    this.router.put('/:objectId', this.UpdateUser);
    this.router.delete('/:objectId', this.DeleteUser);
    }
}

const userRoutes = new UserRoutes(); // creacion de la instacia de la clase
userRoutes.routes(); // seteo de las rutas

// exportacion
export default userRoutes.router;