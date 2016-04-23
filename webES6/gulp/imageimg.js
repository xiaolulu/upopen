const gulp = require( 'gulp' );
const config = require( './config' ).images;
const imagemin = require( 'gulp-imagemin' );

gulp.task( 'imagemin', function(){
	return gulp.src( config.src )
				.pipe( gulp.dest( config.dest ));
});