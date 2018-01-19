import { Router, Request, Response, NextFunction } from "express";
import Project from "../models/Project";

class ProjectRouter {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    /**
     * Metodo que obtendra todos los proyectos de la BD
     * @param req 
     * @param res 
     */
    public GetProjects(req: Request, res: Response): void {
        Project.find({})
            .then(data => {
                const status = req.statusCode
                res.json({
                    status,
                    data
                })
            })
            .catch(err => {
                const status = req.statusCode
                res.json({
                    status,
                    err
                })
            })
    }

    /**
     * Metodo que obtendra un proyecto
     * @param req 
     * @param res 
     */
    public GetProject(req: Request, res: Response): void {
        const projectId: string = req.params.projectId;

        Project.findById(projectId)
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
     * Metodo que creara un proyecto
     * @param req 
     * @param res 
     */
    public CreateProject(req: Request, res: Response): void {
        const nombre: string = req.body.nombre;
        const descripcion: string = req.body.descripcion;
        const fecha_inicio: Date = req.body.fecha_inicio;
        const estado: string = req.body.estado

        const project = new Project({
        nombre,
        descripcion,
        fecha_inicio,
        estado
        })

        project.save()
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
     * Metodo que actualizara un proyecto
     * @param req 
     * @param res 
     */
    public UpdateProject(req: Request, res: Response): void {
        const projectId: string = req.params.projectId;

        Project.findByIdAndUpdate(projectId, req.body)
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
     * Metodo que eliminara un proyecto
     * @param req 
     * @param res 
     */
    public DeleteProject(req: Request, res: Response): void {
        const projectId: string = req.params.projectId;

        Project.findByIdAndRemove(projectId)
        .then(() => {
        let code = res.statusCode;
        let msg = res.statusMessage;
        res.json({
            code,
            msg,
            "success": "Project was deleted."
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
     * Seteo de los metodos manejadores
     */
    public routes() {
        this.router.get('/', this.GetProjects);
        this.router.get('/:projectId', this.GetProject)
        this.router.post('/', this.CreateProject);
        this.router.put('/:projectId', this.UpdateProject);
        this.router.delete('/:projectId', this.DeleteProject);
    }
}

// export
const projectRoutes = new ProjectRouter()
projectRoutes.routes()

export default projectRoutes.router