
var qs		= require( 'querystring' ),
	config	= require( '../config/site' ),
	redis	= require( '../lib/redis' ),
	marked	= require( 'marked' ),
	toys	= require( '../lib/toys' );

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});

function create( req, res ){
	
	if( !toys.exist( req, res, 'POST' ) ){
		return;
	}
	var data = req.body;
	var config = {
			path : '/comment/create',
			method : 'POST',
			data: data
		},
		callback = function( ret ){
			res.send( ret );
		};

	toys.request( config, req, res, callback );
}

function update( req, res ){
	
	if( !toys.exist( req, res, 'POST' ) ){
		return;
	}
	var data = req.body;
	var config = {
			path : '/comment/update',
			method : 'POST',
			data: data
		},
		callback = function( ret ){
			res.send( ret );
		};

	toys.request( config, req, res, callback );
}

function fetchList( req, res ){
	fetch( req, res, function( ret ){
		res.send( ret );
	});
}

function fetchList( req, res ){
	fetch( req, res, function( ret ){
		ret = JSON.parse( ret );
		ret.data.map( function( item ){
			item.content = marked( item.content );
		});
		res.send( ret );
	});
}

function fetchEdit( req, res ){
	fetchSelf( req, res, function( ret ){
		res.send( ret );
	});
}

function fetchSelf( req, res, cb ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	var data = req.query;
	var config = {
			path : '/comment/fetch',
			method : 'GET',
			data: data
		};

	toys.request( config, req, res, cb );
	
}

function fetch( req, res, cb ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	
	var config = {
		path : '/comment/fetch',
		method : 'GET',
		data: req.query
	};

	toys.request( config, req, res, cb );
	
}

function remove( req, res ){
	
	if( !toys.exist( req, res, 'DELETE' ) ){
		return;
	}
	var data = req.body;
	data.owner;
	var config = {
			path : '/comment/remove',
			method : 'DELETE',
			data: data
		},
		callback = function( ret ){
			res.send( ret );
		};

	console.log( data );

	toys.request( config, req, res, callback );
}


module.exports = {
	
	create: create,
	fetch: fetch,
	update: update,
	remove: remove,
	fetchList: fetchList,
	fetchEdit: fetchEdit

}
