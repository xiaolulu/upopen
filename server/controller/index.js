var user	= require( '../server/user' ),
	blog	= require( '../server/blog' ),
	comment	= require( '../server/comment' ),
	toys	= require( '../lib/toys' ),
	logger	= require( '../lib/logger' );

module.exports = function( app ){

	app.use( function( req, res, next ){
		logger.info( req.method + '::::' + req.path );
		console.log( req.method + '::::' + req.path );
		toys.Domain.run( function(){
			next();
		});
	});

	app.post( '/user/register', function( req, res ){
		user.register( req, res );
	});

	app.get( '/user/fetchInfo', function( req, res ){
		user.fetchInfo( req, res );
	});

	app.get( '/user/login', function( req, res ){
		user.login( req, res );
	});

	app.get( '/user/logout', function( req, res ){
		user.logout( req, res );
	});

	app.post( '/user/update', function( req, res ){
		user.update( req,res );
	});

	app.post( '/blog/update', function( req, res ){
		blog.update( req, res );
	});

	app.post( '/blog/create', function( req, res ){
		blog.create( req, res );
	});

	app.delete( '/blog/remove', function( req, res ){
		blog.remove( req, res );
	});

	app.get( '/blog/fetch', function( req, res ){
		blog.fetch( req, res );
	});

	app.get( '/comment/fetch', function( req, res ){
		comment.fetch( req, res );
	});


	app.post( '/comment/update', function( req, res ){
		comment.update( req, res );
	});

	app.post( '/comment/create', function( req, res ){
		comment.create( req, res );
	});
	
	app.delete( '/comment/remove', function( req, res ){
		comment.remove( req, res );
	});

	app.use( function( req, res ){

		res.send({code: 404, msg: '404 error'});

	})

}


