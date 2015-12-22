/**********
modules
**********/
var issue	= require( '../server/issue' ),
	user	= require( '../server/user' ),
	redis	= require( '../lib/redis' ),
	toys	= require( '../lib/toys'),
	guard	= require( '../config/guard' ),
	blog	= require( '../server/blog' ),
	cases	= require( '../server/case' ),
	logger	= require( '../lib/logger' ),
	domain	= require( 'domain' ),
	comment	= require( '../server/comment' );

module.exports = function( app ){
	
	/**********
	验证请求权限
	**********/
	function pathGuard( req, cb ){
		
		if( !guard[ req.path ] ){
			return cb( true );
		} 
		
		var _cookie = toys.Cookie.get( req, 'JSESSIONID' );
		if( !_cookie ){
			if( guard[ req.path ] == 2 ){
				return cb( 'visitor' );
			}
			return cb( 0 );
		}
		redis.get( _cookie, function( value ){
			if( value || guard[ req.path ] == 2  ){
				cb( value ? value.id : 'visitor' );
			} else {
				cb( false )
			}			
		} )

	}

	app.use( function( req, res, next ){
		
		console.log( req.method + '::::' + req.path );
		if( req.path == '/favicon.ico' ){
			res.send('favicon')
			return;
		} else if( req.path == '/' ){
			next();
			return;
		}
		
		toys.Domain.run( function(){

			pathGuard( req, function( pass ){
			
				if( !pass ){
					if( req.method == 'GET' ){
						res.redirect( '/' );
					} else {
						res.send( { code: 10100, msg: 'need to sign in'} );
					}
				} else {
					if( pass !== true ){
						req.query.owner = req.body.owner = pass;
					}
					next();
				}

			});

		});

	});

	app.get( '/', function( req, res ){

		issue.index( req, res );

	});

	app.all( '/user/:path', function( req, res, next ){
		var path = req.params.path;	
		if( user[ path ] ){
			user[ path ]( req, res );
		} else {
			next();
		}
	});

	app.all( '/blog/:path', function( req, res, next ){
		var path = req.params.path;	
		if( blog[ path ] ){
			blog[ path ]( req, res );
		} else {
			next();
		}
	});

	app.all( '/comment/:path', function( req, res, next ){
		var path = req.params.path;	
		if( comment[ path ] ){
			comment[ path ]( req, res );
		} else {
			next();
		}
	});

	app.get( '/case/list', function( req, res ){
		cases.list( req, res );
	});

	app.all( '*', function( req, res ){
		issue.error( req, res );
	})

}
