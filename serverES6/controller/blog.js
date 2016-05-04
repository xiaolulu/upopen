import Blog from '../server/blog';

export default [
	{
		path: '/fetch',
		method: 'get',
		premission: 0,
		request: ( req, res ) => {
			Blog.fetch( req, res );
		}
	},
	{
		path: '/save',
		method: 'post',
		premission: 0,
		request: ( req, res ) => {
			Blog.save( req, res );
		}
	},
	{
		path: '/update',
		method: 'post',
		premission: 0,
		request: ( req, res ) => {
			Blog.update( req, res );
		}
	},
	{
		path: '/updateViewNum',
		method: 'get',
		premission: 0,
		request: ( req, res ) => {
			Blog.updateViewNum( req, res );
		}
	},
	{
		path: '/remove',
		method: 'delete',
		premission: 0,
		request: ( req, res ) => {
			Blog.remove( req, res );
		}
	}
]