const path = require( `path` );
const webpack = require(`webpack`);
const src = path.join( __dirname, './resource' );
const dest = path.join( __dirname, '../assets' );
//const dest = path.join( __dirname, '../dev_assets/dev' );
const cview = path.join( __dirname, './cview' );

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
			//'/vendor/js/jquery': `${src}/vendor/js/jquery`
		},
		output: {
			path: dest,
			filename: `[name].js`
		},
		resolve: {
			extensions: [``,`.js`],
			alias: {
				$: `jquery`
			}
		},
		module: {
			loaders: [
				{ test: /\.scss$/, loader: `style!css!sass` }
			]
		},
		plugins : [
			/*new webpack.optimize.MinChunkSizePlugin({
				compress : {
					warnings: false
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})*/
		]
	},
	sass: {
		src: `${src}/**/*.scss`,
		dest: `${dest}`
	},
	jshint: {
		src: `${src}/**/*.js`
	},
	md5: {
		src: `${dest}/**/*.css`,
		html: `./views/**/*.ejs`,
		dest: `${dest}`
	},
	html: {
		src: `${cview}/**/*.ejs`,
		dest: `./views`
	}
	
}