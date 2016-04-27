import Comment from '../server/comment';
export default [
	{
		path: '/fetch',
		method: 'get',
		premission: 0,
		request: ( req, res ) => {
			Comment.fetch( req, res, '/comment/fetch' );
		}
	},
	{
		path: '/create',
		method: 'post',
		premission: 0,
		request: ( req, res ) => {
			Comment.add( req, res, '/comment/save' );
		}
	},
	{
		path: '/update',
		method: 'post',
		premission: 0,
		request: ( req, res ) => {
			Comment.update( req, res, '/comment/update' );
		}
	},
	{
		path: '/remove',
		method: 'delete',
		premission: 0,
		request: ( req, res ) => {
			Comment.remove( req, res, '/comment/remove' );
		}
	}
]