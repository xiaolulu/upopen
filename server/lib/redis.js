
var redis	= require( 'redis' ),
	qs		= require( 'querystring' ),
	config	= require( '../config/redis' );

/******************************* redis client create ***************************************/
var client = redis.createClient( redis.port, redis.host );

/******************************* redis client create ***************************************/
client.on("error", function (err) {
	console.log( 'redis error ' );
});

client.on( 'connect', function(){
	console.log( 'redis connect ' );
});

/******************************* redis checked is connected before do something ***************************************/
function connect( cb ){
	if( client.connected ){
		cb();
	} else {
		client = redis.createClient( redis.port, redis.host );
		client.on( 'connect', function( err, ret ){
			cb();
		})
	}
}

function get( key, cb ){
	
	connect( function(){
		client.get( key, function( err, reply ){
			if( !err && reply ){
				console.log( reply );
				reply = qs.parse( reply.toString() );
			}
			cb( reply );
		});
	});

}

function set( key, value ){

	connect( function(){
		client.set( key, value );
	});

}

module.exports = { 
	get: get,
	set: set
}
