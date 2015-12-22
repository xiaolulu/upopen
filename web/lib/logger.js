var log4js = require( 'log4js' ),
	config = require( '../config/logger' );



log4js.configure( config );

module.exports = log4js.getLogger('logInfo');
