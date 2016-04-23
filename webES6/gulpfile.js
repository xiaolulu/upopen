const gulp = require( 'gulp' );
const gutil = require( 'gulp-util');
const webpack = require( 'webpack' );
const sass = require( 'gulp-sass' );
const imagemin = require('gulp-imagemin');
const config = require( './gulp.config.js' );


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
})

gulp.task( 'default', ['webpack', 'imagemin', 'sass' ], function(){
	gutil.log( 'this is gulp default' );
});

gulp.watch( './resource/**/*', ['webpack', 'imagemin', 'sass' ], function(){
	gutil.log( 'this is gulp default' );
});

/*
const requireDir = require( 'require-dir' );
requireDir( './gulp', { recure: true } );
*/