
var http	= require( 'http' ),
	qs		= require( 'querystring' ),
	logger	= require( './logger' ),
	domain	= require( 'domain' ),
	request	= require( 'koa-request' ),
	crypto	= require( 'crypto' );

var Domain = domain.create();

Domain.on( 'error', function( e ){
	logger.error( e );
});

function exist( req, res, method ){
	if( req.method == method ){
		return true;
	} else {
		res.redirect( '/404.ejs' );
		return false;
	}
}

function getClientIp( req ){
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

var Cookie = {

	get: function( req, name ){
		var cookie = qs.parse( req.headers.cookie, ';', '=' );
		return name ? cookie[ name ] : cookie;
	}

}

function createSID( req ){
	var sha1 = crypto.createHash( 'sha1' ),
		ip = getClientIp( req );
	sha1.update( ip );
	return sha1.digest( 'hex' );
}

function checkSID( req ){
	var _cookie = Cookie.get( req, 'JSESSIONID' );
	return createSID( req ) == _cookie;
}

function *requestA( options ){
	var options = {
		url: options.hostname + options.path,
		method: options.method,
		form: options.data,
		headers: options.headers
	};
	console.log( options );
	var ret = yield request(options); //Yay, HTTP requests with no callbacks! 
	return JSON.parse(ret.body);
	
}

module.exports = {
	exist: exist,
	createSID: createSID,
	checkSID: checkSID,
	requestA: requestA,
	Cookie: Cookie,
	Domain: Domain
}
