
var qs		= require( 'querystring' ),
	config	= require( '../config/site' ),
	redis	= require( '../lib/redis' ),
	toys	= require( '../lib/toys' );

function list( req, res ){
	
	res.render( 'case/list.ejs', config( req ) );	

}

module.exports = {
	list: list
}
