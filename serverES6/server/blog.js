import { mongoose, savedb, removedb, updatedb, fetchdb } from '../model/db';
import comment from './comment';

const Schema = mongoose.Schema;
const BlogSchema = mongoose.Schema({
	title: { type: String, default: 'title' },
	summary: { type: String, default: 'summary' },
	content: { type: String, default: 'content' },
	date: { type: Date, default: new Date },
	owner: { type: String, default: 'owner' },
	sort: { type: Number, default: 0 },
	view: { type: Number, default: 0 },
	disabled: { type: Boolean, default: false },
	kind: { type: String, default: 'kind' },
	tags: { type: String, default: '' },
	comment: { type: Number, default: 0 }
});

const Blog = mongoose.model( 'blog', BlogSchema, 'blog' );

const blog = {
	save( req, res ){		
		req.body.date = new Date;
		const data = req.body;
		savedb( Blog, BlogSchema, data, ( ret ) => { res.send( ret )})
	},
	fetch( req, res ){
		const data = req.query;
		fetchdb( Blog, data, ( ret ) => { 
			res.send( ret );
			Blog.update({'_id': data.blogId},{$inc:{view: 1}}, function(err){
				console.log(err);
			});
		} )	
		/*Blog.find( data ).populate( 'oid' ).exec( function( err, docs ){
			console.log(`${err}--${docs}`);
			if( err ){
				res.send( {code: -1, data: [], msg: err } );
			} else {
				res.send( {code: 0, data: docs, msg: `fetch success`})
			}
		})*/
	},
	update( req, res ){
		req.body.date = new Date;
		const data = req.body
		const id = data.id;
		delete data.id;
		updatedb( Blog, id, data, ( ret ) => {res.send( ret )} )	
	},
	updateViewNum( req, res ){
		const data = req.query
		const id = data.id;
		Blog.update({'_id': id },{$inc:{view: 1}}, ( err, docs ) => {
			console.log(`${err} == ${docs}`)
			if( err ){
				res.send( {code: -1, data: [], msg: err } );
			} else {
				res.send( {code: 0, data: docs, msg: `update success`})
			}
		} );	
	},
	remove( req, res ){
		const id = req.body.id;
		removedb( Blog, id, ( ret ) => {res.send( ret )});
	},
	
	Blog
}

export default blog;