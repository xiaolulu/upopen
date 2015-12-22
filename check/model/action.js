
/*******************
module
*******************/
var DB	= require( './db' );

/*******************
model
*******************/
var ActionSchema = new DB.Schema({
	name: String,
	kind: String,
	description: String,
	url: String,
	method: String,
	params: Object,
	owner: String,
	date: Date,
	sort: Number
});

var ActionModel = DB.mongoose.model( 'action', ActionSchema, 'action' );

/*******************
method
*******************/
function *create( data, cb ){
	
	return yield ( new ActionModel( data )).save();
}

function *fetch( data ){

	return yield ActionModel.find( data ).exec();

}

function *update( data, cb ){

	var id = data._id,
		owner = data.owner;
	delete data._id;
	delete data.owner;
	return yield ActionModel.update( {_id: id, owner: owner}, data, {} );

}

function *remove( data, cb ){

	return yield ActionModel.remove( {_id: data.id} );

}

module.exports = {
	create: create,
	fetch: fetch,
	update: update,
	remove: remove
}

