
var DB	= require( './db' );

/**
user
*/
var User = {};

User.insert = function(data, cb ){
	DB.insert( data, 'user', cb );
}

User.fetch = function( fields, data, cb ){
	DB.fetch( fields, data, 'user', cb );
}

User.update = function( data, cb ){
	var id = data.id;
	delete data.id;
	DB.update( id, data, 'user', cb );
}

User.remove = function( data, cb ){
	DB.remove( data.id, 'user', cb );
}

var user = {
	create: User.insert,
	fetch: User.fetch,
	update: User.update,
	remove: User.remove
}

module.exports = user
