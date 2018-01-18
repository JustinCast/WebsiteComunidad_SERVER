import { Router, Request, Response } from 'express';
import Member from '../models/Member';

class MemberRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * Metodo que obtendra todos los miembros de la BD
   * @param req 
   * @param res 
   */
  public GetMembers(req: Request, res: Response): void {    
    Member.find()
    .then((members) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        members
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
   * Metodo que obtendra un miembro mediante su ID
   * @param req 
   * @param res 
   */
  public GetMember(req: Request, res: Response): void {
    const memberId: string = req.params.memberId;

    Member.findOne({ memberId })
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
   * Metodo que creara un miembro en la BD
   * @param req 
   * @param res 
   */
  public CreateMember(req: Request, res: Response): void {
    const nombre: string = req.body.nombre;
    const apellidos: string = req.body.apellidos;
    const especialidad: string = req.body.especialidad;
    const github_user: string = req.body.github_user

    const member = new Member({
      nombre,
      apellidos,
      especialidad,
      github_user
    })

    member.save()
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
   * Metodo que actualizara un miembro en la BD
   * @param req 
   * @param res 
   */
  public UpdateMember(req: Request, res: Response): void {
    const memberId: string = req.params.memberId;

    Member.findOneAndUpdate({ memberId }, req.body)
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
   * Metodo que eliminara un miembro de la BD mediante su ID
   * @param req 
   * @param res 
   */
  public DeleteMember(req: Request, res: Response): void {
    const memberId: string = req.params.memberId;

    Member.findOneAndRemove({ memberId })
    .then(() => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        "success": "Member was deleted."
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

  // set up our routes
  routes() {
    this.router.get('/', this.GetMembers);
    this.router.get('/:memberId', this.GetMember)
    this.router.post('/', this.CreateMember);
    this.router.put('/:memberId', this.UpdateMember);
    this.router.delete('/:memberId', this.DeleteMember);
  }

}

const memberRoutes = new MemberRouter();
memberRoutes.routes();


export default memberRoutes.router;
