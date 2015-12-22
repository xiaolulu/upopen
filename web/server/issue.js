
var config = require( '../config/site' );

function index( req, res ){
	res.render( 'issue/index.ejs', config( req, '/issue/index/index') );
}

function error( req, res ){
	res.render( 'issue/index.ejs', config( req, '/issue/error/error') );
}

module.exports = {
	index: index,
	error: error
}
