import { mongoose, savedb, removedb, updatedb, fetchdb } from '../model/db';
import blog from './blog';

const Schema = mongoose.Schema;
const CommentSchema = mongoose.Schema({
	id: { type: String, index: true },
	content: { type: String, default: 'content' },
	date: { type: Date, default: new Date },
	owner: { type: String, default: 'owner' },
	disabled: { type: Boolean, default: true },
	blogId: { type: mongoose.Schema.Types.ObjectId }
});

const Comment = mongoose.model( 'comment', CommentSchema, 'comment' );

const comment = {
	save( req, res ){		
		const data = req.body;		
		savedb( Comment, CommentSchema, data, ( ret ) => { 
			res.send( ret );
			blog.Blog.update({'_id': data.blogId},{$inc:{comment: 1}}, function(err){
				console.log(err);
			});
		})
	},
	fetch( req, res ){
		const data = req.query;
		fetchdb( Comment, data, ( ret ) => { res.send( ret )} )	
	},
	update( req, res ){
		const data = req.body
		const id = data.id;
		delete data.id;
		updatedb( Comment, id, data, ( ret ) => {res.send( ret )} )	
	},
	remove( req, res ){
		const id = req.body.id;
		removedb( Comment, id, ( ret ) => { 
			res.send( ret );
			Blog.update({'_id': data.blogId},{$inc:{comment: 1}});
		})
	}
}

export default comment;