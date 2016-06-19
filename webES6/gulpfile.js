const gulp = require( 'gulp' );
const gutil = require( 'gulp-util');
const webpack = require( 'webpack' );
const sass = require( 'gulp-sass' );
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const md5 = require('gulp-md5-plus');
const minifycss = require('gulp-minify-css');

const htmlmin = require('gulp-htmlmin');

const config = require( './gulp.config.js' );

gulp.task( 'jshint', function(){
	gulp.src( config.jshint.src )
		.pipe( jshint() )
		.pipe( jshint.reporter('YOUR_REPORTER_HERE') );
});

gulp.task('lint', function() {
	return gulp.src( config.jshint.src )
		.pipe(jshint())
		.pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

gulp.task( 'webpackmin', function(){
	webpack( config.webpack, function( err, status ){});
});

gulp.task( 'sassmin', function(){
	gulp.src( config.sass.src )
		.pipe( sass().on( 'error', sass.logError ))
		.pipe( minifycss() )
		.pipe( gulp.dest( config.sass.dest ));
});

gulp.task( 'webpack', function(){
	webpack( config.webpack, function( err, status ){});
});

gulp.task( 'sass', function(){
	gulp.src( config.sass.src )
		.pipe( sass().on( 'error', sass.logError ))
		.pipe( gulp.dest( config.sass.dest ));
});

gulp.task('imagemin', function(){

	return gulp.src( config.images.src)
		//.pipe(imagemin())
		.pipe(gulp.dest(config.images.dest))
});

gulp.task( 'md5', function(){
	gulp.src( config.md5.src )
		.pipe( md5(10, config.md5.html ))
		.pipe( gulp.dest( config.md5.dest ));
} );

gulp.task( 'htmlmin', function(){
	gulp.src( config.html.src )
		.pipe( htmlmin({collapseWhitespace: true}) )
		.pipe( gulp.dest( config.html.dest ));
} );


gulp.task( 'default', ['webpack', 'imagemin', 'sass', 'htmlmin' ], function(){
	gutil.log( 'this is gulp default' );
});

/*
gulp.task( 'default', [ ], function(){
	gulp.start('webpack', 'imagemin', 'sass', 'md5');
	gutil.log( 'this is gulp default' );
});
*/



var watcher = gulp.watch( './resource/**/*', ['webpack', 'imagemin', 'sass' ], function(){
	gutil.log( 'this is gulp default' );
});

/*
const requireDir = require( 'require-dir' );
requireDir( './gulp', { recure: true } );
*/