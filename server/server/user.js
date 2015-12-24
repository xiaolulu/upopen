var db		= require( '../model/user' ),
	qs		= require( 'querystring' ),
	toys	= require( '../lib/toys' ),
	redis	= require( '../lib/redis' ),
	md5		= require( '../lib/md5' ),
	mailer	= require( '../lib/mailer' ),
	uuid	= require( '../lib/uuid' ),
	Validate= require( '../lib/validate' );

var Schema = {
	model: {
			id: {
				min: [1, '100001'],
				max: [40, '100002']
			},
			username: {
				required: 100010,
				min: [6, '100011'],
				max: [30, '100012'],
				email: 100013
			},
			password: {
				required: 100020,
				min: [6, 100021],
				max: [40, 100022]
			},
			nickname: {
				required: 100030,
				min: [6, 100031],
				max: [30, 100032]
			},
			sex: {
				required: 100040,
				num: 100041,
				max: [1, 100042]
			},
			qq: {
				num: 100050,
				min: [4, 100051],
				max: [12, 100052]
			},
			disabled: {
				required: 100060,
				min: [1,100061],
				max: [1,100062],
				num: 100053
			},
			auth: {
				required: 100070,
				min: [3, 100071],
				max: [3,100072],
				num: 100073
			},
			head: {
				required: 100080,
				max: [80, 100081]
			}
		},
	fields: function(){
		var fields = [],
			exclude = [ 'password', 'disabled', 'auth' ],
			model = this.model;
		for( var field in model ){
			( exclude.indexOf(field) == -1 ) && fields.push( field )			
		}
		return fields;
	}
};

function register( req, res ){

	var data = req.body;
	data = Validate( data, Schema.model, ['username'], true );
	if( data.code ){
		res.send( data );
		return false
	}
	db.fetch( Schema.fields().join(','), data, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else if( docs.length ) {
			res.send( {code: 100002, msg: 'The user name already exists'});
		} else {
			create( req, res );
		}
	});

}

function create( req, res ){

	var data = req.body;
	data.id = uuid.v4();
	data.password = md5( data.password );
	data = Validate( data, Schema.model );
	if( data.code ){
		res.send( data );
		return false
	}
	db.create( data, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else {
			var jsessionid = toys.createSID( req, docs ),
				redisData = {
					id: data.id,
					username: req.body.username
				};
			redis.set( jsessionid, qs.stringify( redisData ) );
			res.cookie( 'JSESSIONID', jsessionid, {path: '/',domain:'upopen.cn', maxAge: 36000*1000 } );
			res.cookie( 'username', req.body.username, {path: '/',domain:'upopen.cn', maxAge: 36000*1000 } );
			res.send({ code: 0, msg: 'create user success', data: docs } );
			mailer({
				to: redisData.username,
				subject: 'hi, welcome to upopen.cn',
				html: 'Congratulations, you have successfully registered as a member of upopen.cn,We won\'t bother you unless you have to'
			});
		}
	});
	
}


function login( req, res ){
	var data = req.query;
	data = Validate( data, Schema.model, ['username', 'password'], true );
	if( data.code ){
		res.send( data );
		return false
	}
	data.password = md5( data.password );
	fetch( data, res, function( docs ){
		var jsessionid = toys.createSID( req, docs ),
				redisData = {
					id: docs[0].id,
					username: req.query.username
				};
			redis.set( jsessionid, qs.stringify( redisData ) );
		res.cookie( 'JSESSIONID', jsessionid, {path: '/',domain:'upopen.cn' } );
		res.cookie( 'username', req.query.username, {path: '/',domain:'upopen.cn', maxAge: 36000*1000 } );
		res.send({ code: 0, msg: 'fetch user success', data: docs } );
	})

}

function fetch( data, res, cb){
	
	db.fetch( Schema.fields().join(','), data, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else if( docs.length ) {
			cb( docs );
		} else {
			res.send({ code: 100000, msg: 'no this user', data: docs } );
		}
	});

}

function logout( req, res ){

	if( !toys.checkSID( req ) ){
		res.send( {code: 100000, msg: 'must to be login first'} );
		return;
	}
	var jsessionid = toys.Cookie.get( req, 'JSESSIONID' );
	redis.set( jsessionid, null );			
	res.cookie( 'JSESSIONID', '', {path: '/',domain:'upopen.cn', maxAge: -1000 } );
	res.send({ code: 0, msg: 'logout success', data: [] } );

}

function fetchInfo( req, res, cb){

	var data = req.query,
		fields = [];
	data = Validate( data, Schema.model, ['id'], true );
	if( data.code ){
		res.send( data );
		return false
	}
	db.fetch( Schema.fields().join(','), data, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else {
			res.send({ code: 0, msg: 'fetch this user', data: docs } );
		}
	});

}

function update( req, res ){
	
}

module.exports = {
	create: create,
	fetchInfo: fetchInfo,
	register: register,
	update: update,
	login: login,
	logout: logout
}
