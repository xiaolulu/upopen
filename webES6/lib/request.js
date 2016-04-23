import request from 'request';
import fetch from 'node-fetch';
import {stringify} from 'querystring';
import config from '../config/server';

const Request = ( req, res, path, cb ) => {
	let query = '';
	if( req.method === 'GET' ){
		query = '?' + stringify( req.query );
	}
	
	const option = {
		url: `${config.host}${path}${query}`,
		form: req.body
	}
	
	request[ req.method.toLowerCase() ]( option, ( err, response, body ) => {
		cb( body )
	});

}

export {
	Request
}