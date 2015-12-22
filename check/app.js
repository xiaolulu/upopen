
'use strict';
/*
module dependencies
*/
var koa			= require( 'koa' ),
	controller	= require( './controller' ),
	render 		= require( 'koa-views' ),
	bodyParser	= require( 'koa-bodyparser' ),
	statics		= require( 'koa-static' ),
	logger		= require( './lib/logger' ),
	path		= require( 'path' );

var app = koa();

/*
middleware
*/
app.use( statics( path.join( __dirname, './')))
	.use( render( path.join( __dirname, './views' ), { default: 'ejs' }))
	.use( bodyParser() )
	.use( function *( next ){
		this.body = this.request.body;
		yield next;
	});

controller.all( app );

app.listen( '3004', function(){
	logger.logInfo.info( 'server start on port 3004')
	console.log( 'check server listening on port 3004');
});
