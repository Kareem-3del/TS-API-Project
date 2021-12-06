import express from 'express';
import * as bodyParser from 'body-parser';
import Controller from "./interfaces/controller.interface";
import {Private} from "./WebSettings.json"
import https from 'https';
import http from 'http';
import mongoose from "mongoose";
import chalk from 'chalk';
import SecurityMiddleware from './security/security.middleware'
import errorMiddleware from  './middleware/error.middleware'
class App {
    public app: express.Application; // Express Application
    public port: number | string; // Port Listen IN
    public domain : String;

    constructor(controllers: Controller[]) {
        this.app = express();
        const {PORT, DOMAIN} = process.env
        this.domain = DOMAIN || ' localhost'
        this.port = PORT || 8000;
        this.ConnectDB();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();

    }


    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    // initialize
    private initializeControllers(controllers: Controller[]) {
        this.app.use(SecurityMiddleware)
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }


    // Run Server
    public listen() {
        console.clear()
        const http_ = http.createServer(this.app).listen(this.port);
        const https_ = https.createServer(Private.https, this.app).listen(443);
        (http_.listening) ?
            console.log(chalk.bgGreen.black(`SERVER CONNECTED ON [${(this.port == 80) ? "HTTP" : this.port}] => [${(http_.listening).toString().toUpperCase()}]`)) :
            console.log(chalk.bgRed.black(`SERVER CONNECTED ON [${(this.port == 80) ? "HTTP" : this.port}] => [${(http_.listening).toString().toUpperCase()}]`));
        (https_.listening) ?
            console.log(chalk.bgGreen.black(`SERVER CONNECTED ON [HTTPS] => [${(https_.listening).toString().toUpperCase()}]`)) :
            console.log(chalk.bgRed.black(`SERVER CONNECTED ON [HTTPS] => [${(https_.listening).toString().toUpperCase()}]`));
    }


    // Connect To Database ()==()
    private ConnectDB() {
        const {MONGO_PATH, MONGO_USER, MONGO_PASSWORD} = process.env
        mongoose.connect(`mongodb://${(MONGO_USER && MONGO_PASSWORD) ?? MONGO_USER + ':' + MONGO_PASSWORD + '@'}${MONGO_PATH}`, (err) => {
            if (err) {
                console.log(chalk.bgRed.black(`SERVER CONNECTED TO [DATABASE] => [${(!err).toString().toUpperCase()}]`))
            } else {
                console.log(chalk.bgGreen.black(`SERVER CONNECTED TO [DATABASE] => [${(!err).toString().toUpperCase()}]`))
            }
        });
    }


}

export default App;