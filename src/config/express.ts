import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { loggerMiddleware, handlerResponse } from '@helpers/logger.helper';
import routes from '@routes/index';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(
            cors({
                origin: '*',
                credentials: false,
                exposedHeaders: ['X-Requested-With', 'X-Request-Project'],
            }),
        );
        this.express.use(loggerMiddleware);
    }

    private routes() {
        this.express.use(`/${process.env.APP_VERSION}/`, routes);
        this.express.use((req: Request, res: Response) => handlerResponse(res, 404, { message: 'Route not found !' }));
        this.express.use((req: Request, res: Response) => handlerResponse(res, 500, { message: 'Server error  !' }));
    }
}

export default new App().express;
