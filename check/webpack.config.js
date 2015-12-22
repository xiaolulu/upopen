module.exports = {
    entry: {
		index: './assets/module/index/index'
	},
    output: {
		path: './assets',
        filename: '[name].js'
     },
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader!' },
			{ test: /\.js$/, loader: 'jsx-loader' },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }		
		]
	},
	resolve: {
		extensions: ['','.jsx','.js','.css']
	}
}
