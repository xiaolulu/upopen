var gulp	= require( 'gulp' ),
	jshint	= require( 'gulp-jshint' ),
	uglify	= require( 'gulp-uglify' ),
	Server	= require( 'karma' ).Server,
	map		= require( 'map-stream' ),
	stylish	= require( 'jshint-stylish' );

gulp.task( 'karma', function( cb ){
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, cb ).start();
})

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

gulp.task( 'default',[ 'karma','jshint', 'uglify' ], function( err ){
	console.log( arguments );
})
