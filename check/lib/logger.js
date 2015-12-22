var log4js = require( 'log4js' ),
	config = require( '../config/logger' );

log4js.configure( config );

module.exports = {
	logFile: log4js.getLogger( 'file' ),
	logInfo: log4js.getLogger( 'info' ),
	logWarn: log4js.getLogger( 'warn' ),
	logCon: log4js.getLogger( 'console' )
}
