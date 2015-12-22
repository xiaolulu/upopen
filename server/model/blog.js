
var DB	= require( './db' );

/**
blog
*/
var Blog = {
	params: ['id','title','summary','content','date','owner','sort','comment','view','disabled','kind','tags']
};

Blog.insert = function(data, cb ){
	DB.insert( data, 'blog', cb );
}

Blog.fetch = function( data, cb ){
	DB.fetch( data, 'blog', cb );
}

Blog.update = function( id, data, cb ){
	DB.update( id, data, 'blog', cb );
}

Blog.remove = function( id, cb ){
	DB.remove( id, 'blog', cb );
}

var blog = {
	create: Blog.insert,
	fetch: Blog.fetch,
	update: Blog.update,
	remove: Blog.remove
}

module.exports = blog
