var gulp	= require( 'gulp' ),
	jshint	= require( 'gulp-jshint' ),
	uglify	= require( 'gulp-uglify' ),
	map		= require( 'map-stream' ),
	stylish	= require( 'jshint-stylish' );

gulp.task( 'jshint', function(){
	return gulp.src( 'assets/**/**.js')
		.pipe( jshint() )
		.pipe( jshint.reporter( stylish ) );
});

gulp.task( 'uglify', function(){
	gulp.src('assets/**/**.js' )
		.pipe( uglify() )
		.pipe( gulp.dest( '/home/cc/Work/upopen/static' ));
});

gulp.task( 'default',['jshint', 'uglify' ], function( err ){
	console.log( arguments );
})
