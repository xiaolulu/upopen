
define(function(){
	
	String.prototype.trim = String.prototype.trim || function(){
		return this.replace(/^\s*/,'').replace(/\s*$/,'');
	}
	
	/******************/
	//extend
	function extend( source, parent ){
		
		//var args = Array.prototype.slice( arguments, 1 );
		for( var p in parent ){
			source[p] = parent[p]
		}
		return source;

	}

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

	return {
		extend: extend,
		apply: apply,
		isArray: isArray
	}
})
