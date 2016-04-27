import request from 'request';
import fetch from 'node-fetch';
import {stringify} from 'querystring';
import { server as config } from '../config/config';

const Request = ( req, res, path, cb ) => {
	let query = '';
	if( req.method === 'GET' ){
		query = '?' + stringify( req.query );
	}
	
	const option = {
		url: `${config.host}:${config.port}${path}${query}`,
		form: req.body
	}
	
	console.log( `${config.host}:${config.port}${path}${query}` );
	
	request[ req.method.toLowerCase() ]( option, ( err, response, body ) => {
		cb( body )
	});

}

export default Request;