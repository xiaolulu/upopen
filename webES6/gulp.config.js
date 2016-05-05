const path = require( `path` );
const src = path.join( __dirname, './resource' );
const dest = path.join( __dirname, './assets' );

module.exports =  {
	images: {
		src: `${src}/**/*.{png,jpg}`,
		dest: `${dest}`
	},
	webpack: {
		devtool: 'source-map',
		entry: {
			'/module/blog/list/list': `${src}/module/blog/list/list`,
			'/module/blog/edit/edit': `${src}/module/blog/edit/edit`,
			'/module/blog/info/info': `${src}/module/blog/info/info`,
			'/module/blog/preview/preview': `${src}/module/blog/preview/preview`,
			'/module/blog/mis/mis': `${src}/module/blog/mis/mis`
		},
		output: {
			path: dest,
			filename: `[name].js`
		},
		resolve: {
			extensions: [``,`.js`]
		},
		module: {
			loaders: [
				{ test: /\.scss$/, loader: `style!css!sass` }
			]
		}
	},
	sass: {
		src: `${src}/**/*.scss`,
		dest: `${dest}`
	}
	
}