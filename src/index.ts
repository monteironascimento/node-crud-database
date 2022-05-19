// Lodash library
import "reflect-metadata";
import { createConnection } from 'typeorm';
import express from "express";
import routes from './routes'
import { executarInsertOnStart } from "./controller/InitControler";

const port = (process.env.NODE_ENV === 'production' ||  process.env.NODE_ENV === 'test' ? 9999 : 9998);

const app = express();

createConnection().then( ret =>{
    executarInsertOnStart()
})

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

app.use(express.json());
app.use(routes);

app.listen(port);






