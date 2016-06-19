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

var blogTmp = ['<section><div class="info clearfix">',
						'<a class="title" href="/blog/info?id={_id}">{title}</a>',
						'<a class="type" href="/blog/list?kind={kind}">{kind}</a>',
						'<a href="javascript:void(0)"><img class="head" src="/public/imgs/head.png" width="42" /></a>',///user/info?id={owner}
					'</div>',
					'<div class="content clearfix markdown">{summary}</div>',
					'<div class="more clearfix">......<br /><a class="viewAll" href="/blog/info?id={_id}">&lt;view all&gt;</a></div>',
					'<div class="tool">',
						//'<span class="toolItem view">Views: {view}</span>',
						'<span class="toolItem talk">Comments: <a href="/blog/info?id={_id}#comments">{comment}</a></span>',
						'<span class="toolItem date">Date: {date}</span>',
					'</div></section>'].join('');
					
function renderItems( items ){
	var els = [];
	items = items.data;
	//items = items.slice(0,25)
	items.forEach( ( item, index ) => { els.push( render( item ) ) })
	console.log( els.length )
	return els.join('');
}

function render( item ){
	//item.summary += '<br>.....<br /><a class="viewAll">&lt;view all&gt;</a>';
	item.date = item.date.slice(0,10);
	
	item.summary = item.summary.slice(0,140);
	var el = blogTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
		return item[ $2 ];
	});
	return el;//'\''+ el + '\'';
}

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
				body.data.map( item => item.content = marked( item.content ));
				res.send( body );
			} );
	},
	
	
	fetchPipe( req, res, path, cb ){
		Request( req, res, path, ( body ) => {
				body = JSON.parse( body );
				body.data.map( item => item.content = marked( item.content ));
				res.write( '<script>bigpipe.fire(\'articleList\',\'' + renderItems( body ) + '\')</script>' );
				cb();
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

