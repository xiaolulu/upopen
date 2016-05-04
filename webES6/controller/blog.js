import Blog from '../server/blog';
export default [
	{
		path: '/list',
		method: 'get',
		render: 'blog/list',
		premission: 0,
		config: {
			title: '文章列表',
			assets: '/module/blog/list/list'
		}
	},
	{
		path: '/fetch',
		method: 'get',
		premission: 0,
		request: ( req, res ) => {
			Blog.fetchList( req, res, '/blog/fetch' );
		}
	},
	{
		path: '/mis',
		method: 'get',
		render: 'blog/mis',
		premission: 0,
		config: {
			title: '文章管理',
			assets: '/module/blog/mis/mis'
		}
	},
	{
		path: '/fetchEdit',
		method: 'get',
		premission: 0,
		request: ( req, res ) => {
			Blog.fetchEdit( req, res, '/blog/fetch' );
		}
	},
	{
		path: '/edit',
		method: 'get',
		render: 'blog/edit',
		premission: 0,
		config: {
			title: '文章编辑',
			assets: '/module/blog/edit/edit'
		}
	},
	{
		path: '/create',
		method: 'post',
		premission: 0,
		request: ( req, res ) => {
			Blog.add( req, res, '/blog/save' );
		}
	},
	{
		path: '/update',
		method: 'post',
		premission: 0,
		request: ( req, res ) => {
			Blog.update( req, res, '/blog/update' );
		}
	},
	{
		path: '/updateViewNum',
		method: 'get',
		premission: 0,
		request: ( req, res ) => {
			Blog.updateViewNum( req, res, '/blog/updateViewNum' );
		}
	},
	{
		path: '/info',
		method: 'get',
		render: ( id ) => { return `blog/info/${id}` },
		premission: 0,
		config: {
			title: '文章详情',
			assets: '/module/blog/info/info'
		}
	},
	{
		path: '/preview',
		method: 'get',
		render: 'blog/preview',
		premission: 0,
		config: {
			title: '文章详情',
			assets: '/module/blog/preview/preview'
		}
	},
	{
		path: '/remove',
		method: 'delete',
		premission: 0,
		request: ( req, res ) => {
			Blog.remove( req, res, '/blog/remove' );
		}
	},
	{
		path: '/rebuild',
		method: 'get',
		premission: 0,
		request: ( req, res ) => {
			Blog.rebuild( req, res, '/blog/fetch' );
		}
	}
]