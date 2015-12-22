
var qs		= require( 'querystring' ),
	Sconfig	= require( '../config/site' ),
	redis	= require( '../lib/redis' ),
	validate= require( '../lib/validate' ),
	toys	= require( '../lib/toys' );

function register( req, res ){
	
	if( !toys.exist( req, res, 'POST' ) ){
		return;
	}
	var data = req.body;
	data.nickname = data.nickname || data.username;
	data.sex = data.sex || 0;
	data.disabled = 1;
	data.auth = 775;
	data.qq = data.qq || '';
	data.nickname = data.nickname || data.username;
	data.head = '/assets/public/imgs/head.png';
	var config = {
			path : '/user/register',
			method : 'POST',
			data: data
		},
		callback = function( ret ){
			res.send( ret );
		};

	toys.request( config, req, res, callback );

}

function login( req, res ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	var config = {
			path : '/user/login',
			method : 'GET'
		},
		callback = function( ret ){
			ret = JSON.parse( ret );
			res.send( ret );
		};

	toys.request( config, req, res, callback );

}

function logout( req, res ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	var config = {
			path : '/user/logout',
			method : 'GET'
		},
		callback = function( ret ){
			res.cookie( 'JSESSIONID', '', {path: '/',domain:'upopen.com', maxAge: -1000 } );
			ret = JSON.parse( ret );
			res.send( ret );
		};

	toys.request( config, req, res, callback );

}

function info( req, res ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	fetch( req, res, function( setting ){
		res.render( 'user/info.ejs', setting );
	} )
}

function self( req, res ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	if( !toys.checkSID( req ) ){
		res.send( 'sid error' );
		return;
	}
	req.query.id = req.query.owner;
	fetch( req, res, function( setting ){
		res.render( 'user/self.ejs', setting );
	} )

}

function edit( req, res ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	res.render( 'user/edit.ejs', Sconfig( req ) );	

}

function fetch( req, res, cb ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	var config = {
			path : '/user/fetchInfo',
			method : 'GET'
		},
		callback = function( ret ){
			ret = JSON.parse( ret );
			var data = ret.data[0],
				_setting = Sconfig( req );
			_setting.head = data.head;
			_setting.username = data.username;
			cb( _setting );
		};

	toys.request( config, req, res, callback );
}

module.exports = {
	register: register,
	login: login,
	logout: logout,
	info: info,
	self: self,
	edit: edit
}
