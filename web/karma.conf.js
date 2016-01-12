module.exports = function( config ){

	config.set({
		basePath: '',
		frameworks: ['should', 'jasmine', 'requirejs' ],
		files: [
			{pattern: 'lib/**/*.js', included: false },
			{pattern: 'assets/**/*.js', included: false },
			{pattern: 'test/**/*.js', included: false },
			'test/test-main.js'
		],
		exclude: [],
		reporters: ['progress','coverage'],
		preprocessors: {
			'test/**/*.js':'coverage',
			'assets/core/**/*.js':'coverage'
		},
		coverageReporter:{
			type:'html',
			dir:'test/coverage/'
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		captureTimeout: 60000,
		singleRun: false
	});

};
