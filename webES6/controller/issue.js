import {Kind} from '../lib/code';
export default [
	{
		path: '/job',
		method: 'get',
		render: 'static/articles/job',
		premission: 0,
		config: {
			title: '工作简历',
			assets: '/module/blog/info/info',
			Kind
		}
	}
]