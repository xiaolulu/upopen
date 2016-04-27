import express from 'express';
import Router from './controller/route';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();
const port = '3001';

app
.set( 'views', `${__dirname}/views`)
.set( 'view engine', 'ejs' )
.use( express.static( `${__dirname}/assets`, {
	index: 0,
	maxAge: 600000
}))
.use( bodyParser.urlencoded({
	extended: 1
}))
.use( Router( router ))
.listen( port, function(){
	console.log(`server start listening on ${port}`);
})