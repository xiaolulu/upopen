var config = {

	title: '',
	page: {

	},
	basePath: '',
	min: ''

};

module.exports = function( req, path ){
	return {
		title: config.title,
		basePath: config.basePath,
		path: path || req.path.replace(/(\/[a-z|A-Z]*)?$/,function($1){ ;return $1 + $1})
	}
};
