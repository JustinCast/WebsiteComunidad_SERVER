import { Router, Request, Response, NextFunction } from "express";
import Project from "../models/Project";

class ProjectRouter {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

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

    public GetProject(req: Request, res: Response): void {
        const projectId: string = req.params.projectId;

        Project.findOne({ projectId })
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

    public UpdateProject(req: Request, res: Response): void {
        const projectId: string = req.params.projectId;

        Project.findOneAndUpdate({ projectId }, req.body)
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

    public DeleteProject(req: Request, res: Response): void {
        const projectId: string = req.params.projectId;

        Project.findOneAndRemove({ projectId })
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