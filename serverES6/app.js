import express from 'express';
import bodyParser from 'body-parser';
import { self as selfConfig } from './config/config';
import { Router } from './controller/route';

const app = express();
const port = selfConfig.port;
const router = express.Router();

app
.use( bodyParser() )
.use( Router(router) )
.listen( port, function(){
	console.log(`upopen server starting on listen ${port}`)
})