/**********
modules
**********/
var express		= require( 'express' ),
	http		= require( 'http' ),
	ejs			= require( 'ejs' ),
	logger		= require( './lib/logger' ),
	bodyParser 	= require( 'body-parser' ),
	controller	= require( './controller' );

var app = express();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( '/assets', express.static( 'assets' ));
app.use( bodyParser.urlencoded({ extended: false }));

controller( app );

http.createServer( app ).listen( 3000, function(){
	console.log( 'upopen server start' );
} );
