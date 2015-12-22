
'use strict';
/*******************
module
*******************/
var action	= require( '../model/action' ),
	toys 	= require( '../lib/toys' ),
	qs 		= require( 'querystring' );


function *create( config ){

	var data = config.request.body,
		ret = yield action.create( data );
	if( ret ){
		return { code: 0, data: ret, msg: 'create action success'};
	} else {
		return { code: -1, data: null, msg: 'create action faile'};
	}
	
}

function *fetch( config ){ 

	var data = config.request.query,
		ret = yield action.fetch( data );
	if( ret ){
		return { code: 0, data: ret, msg: 'fetch action success'};
	} else {
		return { code: -1, data: null, msg: 'fetch action faile'};
	}
}

function *update( config ){

	var data = config.request.body,
		ret = yield action.update( data );
	if( ret ){
		return { code: 0, data: ret, msg: 'update action success'};
	} else {
		return { code: -1, data: null, msg: 'update action faile'};
	}

}

function *remove( config ){

	var data = config.request.body,
		ret = yield action.remove( data );
	if( ret ){
		return { code: 0, data: ret, msg: 'remove action success'};
	} else {
		return { code: -1, data: null, msg: 'remove action faile'};
	}

}

function *check( config ){

	var data = config.request.body,
		ret = yield checkAction( data );
	if( ret ){
		return { code: 0, data: ret, msg: 'check action success'};
	} else {
		return { code: -1, data: null, msg: 'check action faile'};
	}

}

function *checkAction( data ){

	var config = data.actionConfig;
	delete data.actionConfig;
	
	var method = data.method.toUpperCase(),
		path = config.path + ( method == 'GET' ? '?' + qs.stringify( data.params ) : '' );
		
	var options = {
		hostname: config.host,
		port: 80,
		method: method,
		path: path,
		data: data.params,
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	}
	if( method == 'POST' ){
		options[ 'headers' ]['content-length'] = qs.stringify( data ).length;
	}

	return yield toys.request( options );
}


module.exports = {
	create: create,
	fetch: fetch,
	update: update,
	remove: remove,
	check: check
}
