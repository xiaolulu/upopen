const gulp = require( 'gulp' );
const webpack = require( 'webpack' );
const config = require( './config' ).webpack;

console.log( config );
gulp.task( 'webpack', function(){
	webpack( config )
})

