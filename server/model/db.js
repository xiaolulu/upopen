/************
modules
************/
var mysql	= require( 'mysql' ),
	qs		= require( 'querystring' ),
	config	= require( '../config/mysql' );

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
	console.log( sql );
	var callback = function( err, docs ){
		
		cb( err, docs );
	}	
	if( Object.prototype.toString.call( value ) == '[object Function]' ){
		cb = value;
		client.query( sql, callback );
	} else {
		console.log( value );
		client.query( sql, value, callback );
	}	
}

function format( data, type ){

	try{

		var where = '',
			limit = '',
			update = '',
			_s = '';
		
		if( isNaN( data.start - 0 ) ){
			data.start = 0;
		}

		if( isNaN( data.limit - 0 ) ){
			data.limit = 15;
		}

		limit = ' limit ' + ( data.start ) + ', ' + ( data.limit );

		delete data.start;
		delete data.limit;

		if( type == 'update' ){
			for( var key in data ){
				_s ? _s += ', ': _s;
				_s +=  key + '=' + client.escape( data[key] ) + '';
			}
			update = _s;
		} else {
			for( var key in data ){
				_s ? _s += ' and ': _s;
				_s += '' + key + '=' + client.escape( data[key] );
			}
			where = _s ? ' where ' + _s : _s ;
		}
		return { where: where, limit: limit, update: update };
	
	} catch (e){
		
	}
}

function formatInsert( data ){

	var key = [],
		index = [],
		value = [];

	for( var prop in data ){
		key.push( prop );
		index.push( '?' );
		value.push( data[ prop ] );
	}
	return { key: key.join(','), index: index.join(','), value: value };

};

function insert( data, table, cb ){
	data = formatInsert( data );
	var sql = 'insert into ' + table + ' (' + data.key + ') values ( ' + data.index + ' )';
	query( sql, data.value, cb );
};

function fetch( data, db, cb ){
	var condition = format( data, 'where' );
	var sql = 'select * from ' + db + condition.where + condition.limit;
	query( sql, cb )
}

function update( id, data, db, cb ){
	var condition = format( data, 'update' );
	var sql = 'update ' + db + ' set ' + condition.update + ' where id = ' + id;
	query( sql, cb );
}

function remove( id, db, cb ){
	var sql = 'delete from ' + db + ' where id= ' + id;
	query( sql, cb )
}

module.exports = {
	insert: insert,
	update: update,
	fetch:  fetch,
	remove: remove
}
