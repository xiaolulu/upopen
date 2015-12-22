/************
modules
************/
var mysql	= require( 'mysql' ),
	qs		= require( 'querystring' ),
	config	= require( '../config/server' ).sql;

var options = {
	host: config.host,
	port: config.port,
	user: config.user,
	password: config.password,
	database: config.database
}

var client = new mysql.createConnection( options );
client.connect();

function query( sql, value, cb ){
	
	var callback = function( err, docs ){
		/*
		if( docs.length ){
			docs.map( function( v, i ){
				for( var k in v ){
					v[k] = client.unescape( v[k] );
				}
				docs[i] = v;
			});
		}*/
		cb( err, docs );
	}	
	console.log( sql );
	if( Object.prototype.toString.call( value ) == '[object Function]' ){
		cb = value;
		client.query( sql, callback );
	} else {
		/*value.map( function( v, i ){
			value[i] = client.escape( v );
		})*/
		client.query( sql, value, callback );
	}	
}

function format( data, DB, type ){
	try{

		var _where = '',
			_limit = '',
			_update = '',
			s = '';
		
		if( isNaN( data.start - 0 ) ){
			data.start = 0;
		}

		if( isNaN( data.pageSize - 0 ) ){
			data.pageSize = 15;
		}

		_limit = ' limit ' + ( data.start || 0 ) + ', ' + ( data.pageSize || 15 );

		delete data.start;
		delete data.pageSize;
		
		var _db = DB.params;
		/*
		for( var key in data ){
			if( !_db[ key ] ){
				delete data[ key ];
				continue;
			}
			if( data[ key ].length > _db[ key ] ){
				data[ key ] = data[ key ].slice( 0, _db[ key ] );
			}
			data[ key ] = mysql.escape( data[ key ] );
		}
		*/
		//data = tool.escape( data );

		if( type == 'update' ){
			for( var key in data ){
				s ? s += ', ': s;
				s +=  key + '=' + client.escape( data[key] ) + '';
			}
			_update = s;
		} else {
			for( var key in data ){
				s ? s += ' and ': s;
				s += '' + key + '=' + client.escape( data[key] );
			}
			_where = s ? ' where ' + s : s ;
		}
		return { where: _where, limit: _limit, update: _update };
	
	} catch (e){
		
	}
}

/**
user
*/
var User = {
	params: [ 'id', 'username', 'password', 'date' ]
};

User.save = function(data, cb ){
	var sql = 'insert into user (' + User.params.join( ',') + ') values (?,?,?,?)',
		value = [ data.id, data.username, data.password, data.date ];
	query( sql, value, cb );
}

User.fetch = function( data, cb ){
	var condition = format( data, User, 'where' );
	var sql = 'select * from user ' + condition.where;
	query( sql, cb )
}

var user = {
	create: User.save,
	fetch: User.fetch
}

/**
blog
*/
var Blog = {
	params: ['title','summary','content','date','owner','sort','comment','view','disabled','kind','tags']
};

Blog.create = function(data, cb ){
	var sql = 'insert into blog (' + Blog.params.join( ',') + ') values ( ' + (new Array(Blog.params.length + 1)).join(',?').slice(1) + ')',
		value = [ data.title, data.summary, data.content, data.date, data.owner, data.sort, data.comment, data.view, data.disabled, data.kind, data.tags ];
	console.log( sql );
	console.log( value );
	query( sql, value, cb );
}

Blog.update = function( id, data, cb ){
	var condition = format( data, Blog, 'update' );
	var sql = 'update blog set ' + condition.update + ' where id = ' + id;
	console.log( sql );
	query( sql, cb );
}

Blog.fetch = function( data, cb ){
	var condition = format( data, User, 'where' );
	var sql = 'select * from blog ' + condition.where;
	query( sql, cb )
}

var fetch = function(){
	var sql = 'select * from blog left join user on user.id = blog.owner ' + condition.where;
	query( sql, cb )
}

Blog.remove = function( id, cb ){
	var sql = 'delete from blog where id= ' + id;
	query( sql, cb )
}

/**
comment
*/
var Comment = {
	params: [ 'owner','content','userid','date' ]
};

Comment.create = function(data, cb ){
	var sql = 'insert into comment (' + Comment.params.join( ',') + ') values ( ' + (new Array(Comment.params.length + 1)).join(',?').slice(1) + ')',
		value = [ data.owner, data.content, data.userid, data.owner, data.date ];
	query( sql, value, cb );
}

Comment.update = function( id, data, cb ){
	var condition = format( data, Comment, 'update' );
	var sql = 'update comment set ' + condition.update + ' where id = ' + id;
	query( sql, cb );
}

Comment.fetch = function( data, cb ){
	var condition = format( data, Comment, 'where' );
	var sql = 'select * from comment ' + condition.where;
	query( sql, cb )
}

Comment.remove = function( id, cb ){
	var sql = 'delete from comment where id= ' + id;
	query( sql, cb )
}

module.exports = {
	user: User,
	blog: Blog,
	comment: Comment
}
