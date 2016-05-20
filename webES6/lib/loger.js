import log4js from 'log4js';
import { logDir } from '../config/config';
import { mkdirsSync } from '../lib/utils';

const path = `${logDir}/web/`;
console.log( path )

mkdirsSync( path, '0777' ) && console.log(`mkdir log directory success`)

const config = {
	'appenders':[
		{
			'type': 'console',
			'category':'console'
		},
		{
			'type': 'dateFile',
			'category':'info',
			'filename': '',
			'pattern':'yyyyMMdd_info.log',
			'alwaysIncludePattern':true
		},
		{
			'type': 'dateFile',
			'category':'warn',
			'filename':'',
			'pattern':'yyyyMMdd_warn.log',
			'alwaysIncludePattern':true
		},
		{
			'type': 'file',
			'category': 'file',
			'filename': '/file.log',
			'maxLogSize': 1024*1028*10,		
			'backups': 10
		}
	],
	replaceConsole: true,
	'levels':{
		'console':'all',
		'file': 'all',
		'info': 'all',
		'warn': 'warn'
	} 
}

log4js.configure( config, { cwd: `${path}`} );

const logFile = log4js.getLogger( 'file' );
const logInfo = log4js.getLogger( 'info' );
const logWarn = log4js.getLogger( 'warn' );

export {
	logFile,
	logInfo,
	logWarn
};
