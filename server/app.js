var express 	= require( 'express' ),
	http 		= require( 'http' ),
	bodyParser 	= require( 'body-parser' ),
	controller	= require( './controller' );

var app = express()

app.set( 'port', '3003' );
app.use( bodyParser.urlencoded({ extended: false }));

controller( app );

app.listen( app.get( 'port' ), function(){
	console.log( 'server listening on port ' + app.get( 'port' ));
})


