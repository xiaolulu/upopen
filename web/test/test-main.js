var tests = [];
for( var file in window.__karma__.files ){
	if( /_case\.js$/.test( file )){
		tests.push( file );
	}
}

requirejs.config({
	
	baseUrl: '/base',
	
	paths: {
		'jquery': 'assets/core/js/jquery.min'
	},

	deps: tests,

	callback: window.__karma__.start

});
