
var DB	= require( './db' );

/**
comment
*/
var Comment = {
	params: ['id','owner', 'username', 'content','belong','date']
};

Comment.insert = function(data, cb ){
	DB.insert( data, 'comment', cb );
}

Comment.fetch = function( data, cb ){
	DB.fetch( data, 'comment', cb );
}

Comment.update = function( data, cb ){
	var id = data.id;
	delete data.id;
	DB.update( id, data, 'comment', cb );
}

Comment.remove = function( id, cb ){
	DB.remove( id, 'comment', cb );
}

var comment = {
	create: Comment.insert,
	fetch: Comment.fetch,
	update: Comment.update,
	remove: Comment.remove
}

module.exports = comment
