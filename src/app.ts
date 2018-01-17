import * as express from 'express'
import UserRoutes from './routes/UserRoutes';

class Server {
  public app

  constructor () {
    this.app = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.app.use('/', router)
    this.app.use('/user', UserRoutes)
  }
}

export default new Server().app