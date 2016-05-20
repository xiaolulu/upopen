import {mkdirSync, existsSync} from 'fs';
import path from 'path';

/*
* create dirname sync
* @param dirname
* @param dirname mode
* return boolean
*/
function mkdirsSync( dirname, mode ){
	
	if( existsSync( dirname )){
		return true;
	} else {
		if( mkdirsSync( path.dirname( dirname), mode )){
			mkdirSync( dirname, mode )
			return true;
		}
	}
	
}

export {
	mkdirsSync
}