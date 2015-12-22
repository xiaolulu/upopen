
var redis	= require( 'redis' ),
	coRedis	= require( 'co-redis' ),
	qs		= require( 'querystring' ),
	config	= require( '../config/redis' );

/******************************* redis client create ***************************************/
var client = redis.createClient( redis.port, redis.host ),
	coClient = coRedis( client );

/******************************* redis client create ***************************************/
client.on("error", function (err) {
	console.log( 'redis error ' );
});

client.on( 'connect', function(){
	console.log( 'redis connect ' );
});

/******************************* redis checked is connected before do something ***************************************/
function *connect(){

	if( !client.connected ){
		redis.createClient( redis.port, redis.host );
		yield client.on( 'connect' );
	}

}

function *get( key,cb ){

	yield connect();
	return yield coClient.get( key );

}

function *set( key, value ){

	yield connect();
	return yield coClient.set( key, value );

}

module.exports = { 
	get: get,
	set: set
}
