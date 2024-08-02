import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { router } from "./config/routes";

/*
* App class
* This class is responsible for creating the express application
* and setting up the routes
*/

export class ExpressApp {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.server.use(bodyParser.urlencoded({ extended: false }))
    this.server.use(bodyParser.json())
    this.router();
    
  }

  public router() {
    this.server.use(router);
  }
}
