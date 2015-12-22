var mongoose = require( 'mongoose' ),
	config   = require( '../config/mongo' );

var path = 'mongodb://' + config.host + '/' + config.db;
mongoose.connect( path, function( err ){
	if( !err ){
		console.log( 'connect to mongodb' );
	}
});

var Schema = mongoose.Schema;

var model = {
	mongoose: mongoose,
	Schema: Schema
}

module.exports = model;
