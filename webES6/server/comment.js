import Request from '../lib/request';
import fs from 'fs';
import {markdown} from 'markdown';

const htx2ejs = function( data, doc ){
	data.content = markdown.toHTML( data.content );
	data.date = data.date.slice(0,10);
	doc = doc.replace( /\{(.*?)\}/g, ( $1, $2 ) => { return data[$2] });
	fs.writeFile( `views/blog/info/${data._id}.ejs`, doc, (err) => { console.log( err )} );
}

export default {
	fetch( req, res, path ){
		Request( req, res, path, ( body ) => {
				body = JSON.parse( body );
				body.data.map( item => item.content = markdown.toHTML( item.content ));
				res.send( body );
			} );
	},
	
	add( req, res, path ){
		Request( req, res, path, ( body ) => {
				res.send( body );
			} )
	},
	
	update( req, res, path ){
		Request( req, res, path, ( body ) => {
				res.send( body );
			} )
	},
	
	remove( req, res, path ){
		Request( req, res, path, ( body ) => {
				res.send( body );
			} )
	}
}

