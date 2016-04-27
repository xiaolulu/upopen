import Comment from '../server/comment';

export default [
	{
		path: '/fetch',
		method: 'get',
		premission: 0,
		request: ( req, res ) => {
			Comment.fetch( req, res );
		}
	},
	{
		path: '/save',
		method: 'post',
		premission: 0,
		request: ( req, res ) => {
			Comment.save( req, res );
		}
	},
	{
		path: '/update',
		method: 'post',
		premission: 0,
		request: ( req, res ) => {
			Comment.update( req, res );
		}
	},
	{
		path: '/remove',
		method: 'delete',
		premission: 0,
		request: ( req, res ) => {
			Comment.remove( req, res );
		}
	}
]