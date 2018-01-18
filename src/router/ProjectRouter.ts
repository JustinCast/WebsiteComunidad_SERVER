import { Router, Request, Response, NextFunction } from "express";
import Post from "../models/Project";

class ProjectRouter {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    public GetProjects(req: Request, res: Response): void {
        Post.find({})
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

    }

    public CreateProject(req: Request, res: Response): void {

    }

    public UpdateProject(req: Request, res: Response): void {

    }

    public DeleteProject(req: Request, res: Response): void {

    }

    public routes() {
        this.router.get('/', this.GetProjects)
    }
}

// export
const projectRoutes = new ProjectRouter()
projectRoutes.routes()

export default projectRoutes.router