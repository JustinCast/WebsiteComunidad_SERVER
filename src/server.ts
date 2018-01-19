import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as path from 'path';


// custom modules
import ProjectRouter from './routes/ProjectRouter';
import MemberRouter from './routes/MemberRouter';

// Server class
class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  
  // application config
  public config() {

    const MONGO_URI: string = 'mongodb://localhost/WebsiteComunidad'; 
    mongoose.connect(MONGO_URI, {
      useMongoClient: true,

      /* other options */
    });

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  // application routes
  public routes(): void {

    let router: express.Router;
    router = express.Router();
    router.get('', (req, res) => {
      res.json({
        message: 'Ruta inicial del backend'
      })
    })
    this.app.use('/', router)
    this.app.use('/proyectos', ProjectRouter);
    this.app.use('/miembros', MemberRouter);
  }
}

// export
export default new Server().app;
