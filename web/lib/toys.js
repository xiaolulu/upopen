
var http	= require( 'http' ),
	qs		= require( 'querystring' ),
	config	= require( '../config/server' ),
	logger	= require( './logger' ),
	domain	= require( 'domain' ),
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

function request( options, req, res, cb, fixed ){
	
	if( options.method == 'GET' ){
		options.path += '?' + qs.stringify( req.query )
	} else {
		req.headers[ 'content-length' ] = qs.stringify( options.data ).length;
	}
	req.headers[ 'host' ] = config.hostname;

	options.host = config.host;
	options.port = config.port;
	options.headers = req.headers;
	
	var HReq = http.request( options, function( HRes ){
			var cookies = HRes.headers['set-cookie'];
				cookies && res.setHeader("Set-Cookie",cookies );
			if( fixed ){
				HRes.pipe( res );
				return;
			}

			HRes.on( 'data', function( stream ){
				data += stream;
			}).on( 'end', function(){
				cb( data );
			});
		}),
		data = '';

	HReq.on( 'error', function( e ){
		console.log( e );
	});

	HReq.write( qs.stringify( options.data ) );
	HReq.end();

}

module.exports = {
	exist: exist,
	createSID: createSID,
	checkSID: checkSID,
	request: request,
	Domain: Domain,
	Cookie: Cookie
}
