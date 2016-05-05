/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	
	var blogTmp = ['<div class="info">',
							'<a href="/blog/preview?id={_id}">{title}</a>',
							'<a class="kind" href="/blog/kind?kind={kind}">{kind}</a>',
						'</div>',
						'<div class="handle">',
							'<a href="javascript:void(0)" class="delete">delete</a>',
							'<a href="/blog/edit?id={_id}">edit</a>',
						'</div>'].join('');
						//'<div class="tool">',
							//'<span>views: {view}</span>',
							//'<span>comments: {comment}</span>',
							//'<span>date: {date}</span>',
						//'</div>'].join('');
	
	function fetchBlog( kind, start, limit ){
		var data = kind ? {kind: kind} : {};
		loading = true;
		//data.start = start;
		//data.limit = limit;
		$.ajax({
			url: '/blog/fetchEdit',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					renderItems( ret.data );
				} else {
	
				}
			}
		})
	}
	
	function renderItems( items ){
		var els = [];
		$.each( items, function( index, item ){
			els.push( render( item ) );
		});
		$( '#blogBox' ).append( els );
	}
	
	function render( item ){
		//item.summary += '<br>.....<br /><a class="viewAll">&lt;view all&gt;</a>';
		item.date = item.date.slice(0,10);
		
		item.summary = item.summary.slice(0,140);
		var el = blogTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		});
		el = $( el );
		el.find( '.delete' ).on( 'click', function(){
			blogRemove( item._id );
		})
		return $( '<div>' ).addClass('blogItem').append( el );
	}
	
	function blogRemove( id ){
		var data = {id: id };
		$.ajax({
			url: '/blog/remove',
			type: 'delete',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					
				} else {
	
				}
			}
		})
	}
	
	var loading = false,
		start = 0,
		limit = 50;
	
	!function(){
		var _search = '';
		if( location.search ){
			_search = location.search.slice(1).split('=')[1];
		}
		fetchBlog( _search, start, limit );
		$( window ).on( 'scrollLoading', function(){
			if( !loading ){
				fetchBlog( _search, start += limit, limit )
			}
		})
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=mis.js.map