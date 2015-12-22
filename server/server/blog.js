var db		= require( '../model/blog' ),
	qs		= require( 'querystring' ),
	toys	= require( '../lib/toys' ),
	Validate= require( '../lib/validate' );

var Schema = {
	model: {
			id: {
				min: [1, '101001'],
				max: [10, '101002'],
				num: 101003
			},
			title: {
				required: 101010,
				min: [6, '101011'],
				max: [40, '101012']
			},
			summary: {
				required: 101020,
				min: [6, 101021],
				max: [1000, 101022]
			},
			content: {
				required: 101030,
				min: [6, 101031],
				max: [8000, 101032]
			},
			owner: {
				required: 101040,
				min: [6, 101041],
				max: [40, 101042]
			},
			sort: {
				num: 101050,
				min: [1, 101051],
				max: [2, 101052]
			},
			view: {
				num: 101060,
				min: [1, 101061],
				max: [10, 101062]
			},
			comment: {
				num: 101070,
				min: [1, 101071],
				max: [5, 101072]
			},
			disabled: {
				required: 101080,
				min: [1,101081],
				max: [1,1001082],
				num: 101083
			},
			kind: {
				min: [1, 101091],
				max: [30,101092]
			},
			tags: {
				required: 101100,
				max: [100, 101101]
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
			res.send({ code: 0, msg: 'create blog success', data: docs } );
		}
	});
	
}

function fetch( req, res ){

	var data = req.query,
		condition = [];
	for( var con in data ){
		if( con != 'limit' && con != 'start' ){
			condition.push( con );
		}
	}
	data = Validate( data, Schema.model, condition );
	if( data.code ){
		res.send( data );
		return false
	}
	data.limit = req.query.limit || 15;
	data.start = req.query.start || 0;
	db.fetch( data, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else {
			res.send({ code: 0, msg: 'fetch blog success', data: docs } );
			if( data.id ){
				var view = docs[0].view - 0;
				db.update( data.id, {view: view += 1}, function( err, docs ){
				
				});
			}
			
		}
	});

}

function update( req, res ){

	var data = req.body,
		condition = [];
	for( var con in data ){
		condition.push( con );
	}
	data = Validate( data, Schema.model, condition );
	if( data.code ){
		res.send( data );
		return false
	}
	
	var id = data.id;
	delete data.id;
	db.update( id, data, function( err, docs ){
		if( err ){
			res.send({ code: -1, msg: err } )
		} else {
			res.send({ code: 0, msg: 'update blog success', data: docs } );
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
			res.send({ code: 0, msg: 'remove blog success', data: docs } );
		}
	});
	
}

module.exports = {
	create: create,
	fetch: fetch,
	update: update,
	remove: remove
}
