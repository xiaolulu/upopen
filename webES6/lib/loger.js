import log4js from 'log4js';
import {mkdir, existsSync} from 'fs';
import { logPath } from '../config/config';

const path = `${logPath}/web/`;

if( !existsSync(path) ){
	mkdir( `${path}`, (err) => {console.log(`mkdir log server ${err}`)} );
};

const logConfig = {
	'appenders':[
		{
			'type': 'console',
			'category':'console'
		},
		{
			'type': 'dateFile',
			'category':'info',
			'filename': `${path}`,
			'pattern':'yyyyMMdd_info.log',
			'alwaysIncludePattern':true
		},
		{
			'type': 'dateFile',
			'category':'warn',
			'filename':`${path}`,
			'pattern':'yyyyMMdd_warn.log',
			'alwaysIncludePattern':true
		},
		{
			'type': 'file',
			'category': 'file',
			'filename': `${path}/file.log`,
			'maxLogSize': 1024*1028*10,		
			'backups': 2
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

log4js.configure( logConfig );

const logFile = log4js.getLogger( 'file' );
const logInfo = log4js.getLogger( 'info' );
const logWarn = log4js.getLogger( 'warn' );
const logCon = log4js.getLogger( 'console' );

export {
	logFile,
	logInfo,
	logWarn,
	logCon
};
