var path = require( 'path' );
console.log('webpack file')
module.exports = {
	entry: {
		'/module/blog/list/list': './resource/module/blog/list/list',
		'/module/blog/edit/edit': './resource/module/blog/edit/edit',
		'/module/blog/info/info': './resource/module/blog/info/info'
	},
	output: {
		path: path.join( __dirname, '../assets' ),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['','.js']
	},
	module: {
		loaders: [
			{ test: /\.scss$/, loader: 'style!css!sass' }
			/*, // use ! to chain loaders
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest*/
		]
	}
}
console.log( path.join( __dirname, '../assets' ) );