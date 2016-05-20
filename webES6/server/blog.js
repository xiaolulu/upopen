import Request from '../lib/request';
import fs from 'fs';
import marked from 'marked';
import {Highlight} from 'highlight';
import {logFile} from '../lib/loger';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function( code ){
	  return Highlight(code).value;
  }
});

const htx2ejs = function( data, doc ){
	data.content = marked( data.content );
	data.date = data.date.slice(0,10);
	doc = doc.replace( /\{(.*?)\}/g, ( $1, $2 ) => { return data[$2] });
	fs.writeFile( `views/blog/info/${data._id}.ejs`, doc, (err) => { console.log( err )} );
}

export default {
	fetchList( req, res, path ){
		Request( req, res, path, ( body ) => {
				body = JSON.parse( body );
				logFile.info(body);
				body.data.map( item => item.content = marked( item.content ));
				res.send( body );
			} );
	},
	
	fetchEdit( req, res, path ){
		Request( req, res, path, ( body ) => {
				body = JSON.parse( body );
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
	
	updateViewNum( req, res, path ){
		Request( req, res, path, ( body ) => {
				res.send( body );
			} )
	},
	
	remove( req, res, path ){
		Request( req, res, path, ( body ) => {
				res.send( body );
			} )
	},
	
	rebuild( req, res, path ){
		Request( req, res, path, ( body ) => {
			body = JSON.parse( body );
			fs.readFile( `views/blog/info.htx`, 'utf8', function( err, doc ){
				body.data.map( item => htx2ejs( item, doc ) );
			})
			res.send( `rebuild success, items=${body.data.length}` );
		} );
	}
}

