
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

function list( req, res ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	res.render( 'blog/list.ejs', config( req ) );

}

function info( req, res ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	res.render( 'blog/info.ejs', config( req ) );

}

function create( req, res ){
	
	if( !toys.exist( req, res, 'POST' ) ){
		return;
	}
	var data = req.body;
	
	data.summary = data.content.slice( 0, 300 );
	data.date = new Date;
	data.sort = 0;
	data.comment = 0;
	data.view = 0;
	data.disabled = 0;
	var config = {
			path : '/blog/create',
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
			path : '/blog/update',
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
		ret = JSON.parse( ret );
		ret.data.map( function( item ){
			item.content = marked( item.content );
			item.summary = marked( item.summary );
		});
		res.send( ret );
	});
}

function fetchEdit( req, res ){
	fetchSelf( req, res, function( ret ){
		ret = JSON.parse( ret );
		res.send( ret );
	});
}

function fetchSelf( req, res, cb ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	var data = req.query;
	var config = {
			path : '/blog/fetch',
			method : 'GET'
		};

	toys.request( config, req, res, cb );
	
}

function fetch( req, res, cb ){
	
	if( !toys.exist( req, res, 'GET' ) ){
		return;
	}
	console.log( 'blog fetch' );
	console.log( req.query );
	var config = {
			path : '/blog/fetch',
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
	
	var config = {
			path : '/blog/remove',
			method : 'DELETE',
			data: data
		},
		callback = function( ret ){
			res.send( ret );
		};

	toys.request( config, req, res, callback );
}


module.exports = {
	
	list: list,
	info: info,
	create: create,
	fetch: fetch,
	update: update,
	remove: remove,
	fetchList: fetchList,
	fetchEdit: fetchEdit

}
