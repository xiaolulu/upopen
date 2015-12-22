var db		= require( '../model/comment' ),
	qs		= require( 'querystring' ),
	toys	= require( '../lib/toys' ),
	Validate= require( '../lib/validate' );

var Schema = {
	model: {
			id: {
				min: [1, '102001'],
				max: [10, '102002'],
				num: 102003
			},
			username: {
				required: 102010,
				min: [1, '102011'],
				max: [40, '102012']
			},
			content: {	
				required: 102020,
				min: [1, 102021],
				max: [2000, 102022]
			},
			owner: {
				required: 102030,
				min: [6, 101031],
				max: [40, 101032]
			},
			belong: {
				required: 102040,
				min: [1, 102041],
				max: [60, 102042]
			}
		}
};

function create( req, res ){
	
	var data = req.body;
	data = Validate( data, Schema.model );
	if( data.code ){
		res.send( data );
		return false
	}
	db.create( data, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else {
			res.send({ code: 0, msg: 'create comment success', data: docs } );
		}
	});
	
}

function fetch( req, res ){
	var data = req.query,
		condition = [];
	for( var con in data ){
		condition.push( con );
	}
	data = Validate( data, Schema.model, condition );
	if( data.code ){
		res.send( data );
		return false
	}
	db.fetch( data, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else {
			for( var i = 0; i < docs.length; i++ ){
				for( var key in docs[i] ){
					docs[i][ key ] = qs.unescape( docs[i][ key ] );
				}
			}
			res.send({ code: 0, msg: 'fetch comment success', data: docs } );
		}
	});

}

function update( req, res ){

	var data = req.body;
	var id = data.id;
	delete data.id;
	db.update( id, data, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else {
			res.send({ code: 0, msg: 'update comment success', data: docs } );
		}
	});
}

function remove( req, res ){
	
	var data = req.body;
	data = Validate( data, Schema.model, ['id'] );
	if( data.code ){
		res.send( data );
		return false
	}
	db.remove( data.id, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else {
			res.send({ code: 0, msg: 'remove comment success', data: docs } );
		}
	});
	
}

module.exports = {
	create: create,
	fetch: fetch,
	update: update,
	remove: remove
}
