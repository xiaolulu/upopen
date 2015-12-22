
'use strict';
/*******************
module
*******************/
var action	= require( '../server/action' ),
	redis	= require( '../lib/redis' ),
	qs		= require( 'querystring' ),
	logger	= require( '../lib/logger' ),
	util	= require( 'util' ),
	Router	= require( 'koa-router' );

/*******************
all router
*******************/
var router = new Router();

exports.all = function( app ){

	app.use( function *(next){

		try{
			
			if( this.path == '/' ){
				yield next;
				return;
			}
			logger.logInfo.info( this.method + '::::' + this.path );
			var _time = (new Date).getTime();
			var cookie = this.cookies.get( 'JSESSIONID' ),
				owner = 'visitor';
			if( cookie && (owner = yield redis.get( cookie )) ){
				owner = qs.parse( owner ).id;
			}
			this.request.query.owner = this.request.body.owner = owner;
			yield next;
			var _timeE = (new Date).getTime(),
				_timeU = _timeE - _time;
			if( _timeU >= 1000*2 ){
				logger.logWarn.warn( this.method + '::::' + this.path + ' use time ' + _timeU );
			}
			logger.logInfo.info( this.method + '::::' + this.path + 'end use time ' + _timeU );
		} catch (e){
			logger.logWarn.error( e );
		}

	});

	router.get( '/', function *( next ){

		yield this.render( 'index' );

	});

	router.post( '/action/create', function *( next ){

		this.body = yield action.create( this );

	});

	router.get( '/action/fetch', function *( next ){
		
		this.body = yield action.fetch( this );
		logger.logInfo.info( this.method + '::::' + this.path + '11end' );

	});

	router.post( '/action/update', function *(){

		this.body = yield action.update( this );

	});

	router.delete( '/action/remove', function *(){

		this.body = yield action.remove( this );

	});

	router.post( '/action/check', function *(){

		this.body = yield action.check( this );

	});

	router.all( '*', function *(){

		this.body = '404';

	});
	
	app.use( router.middleware() );

}
