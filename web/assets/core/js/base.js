
define(function(){
	
	String.prototype.trim = function(){
		return this.replace(/^\s*/,'').replace(/\s*$/,'');
	}
	
	/******************/
	function apply( destination ){
		var args = Array.prototype.slice.call(arguments, 1),
			source;
		while( source = args.shift()){
			for( var prop in source){
				 destination[prop] = source[prop];
			}
		};
		return destination
	};

	function isArray( data ){
		
		return Object.prototype.toString.call( data ).toLowerCase() == '[object array]';

	}

	function searchHref( location, id ){
		if( !id ){
			id = location;
			location = window.location.search.slice(1);
		}
		try{
			var _search = location.split(';'),
				data = {};
			for( var i = 0; i < _search.length; i++ ){
				var li = _search[i].split( '=' );
				data[ li[0] ] = li[1];
			}
			return data[ id ];
		} catch (e){
			return null;
		}

	}

	return {
		apply: apply,
		isArray: isArray,
		searchHref: searchHref
	}
})
