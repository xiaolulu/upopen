/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	
	var title = $( '#title' ),
		editor = $( '#editor' ),
		type = $( '#type' ),
		editorBtn = $( '#editorBtn' ),
		_id = '';

	$( '#editorForm' ).on( 'submit', function(){
		var data = {
				title: title.val(),
				content: editor.val(),
				kind: type.val(),
				tags: type.val()
			}
			url = '/blog/create';
		if( _id ){
			data.id = _id;
			url = '/blog/update'
		}
		editorBtn.attr( 'disabled', true );
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					editorBtn.attr( 'disabled', false );
					return;
					hint.show( '保存成功' );
					setTimeout( function(){
						window.location.href = window.location.protocol + '//' + window.location.host + '/user/self';
					}, 1000 )
				}
				console.log( ret );
			}
		});
		return false;
	});

	function fetchBlog( id ){
		$.ajax({
			url: '/blog/fetchEdit',
			type: 'get',
			dataType: 'json',
			data: { id: id },
			success: function( ret ){
				if( ret.code == 0 ){
					title.val( ret.data[0].title );
					_id = ret.data[0].id;
					editor.val( ret.data[0].content );
				}
				console.log( ret );
			}
		});
	}

	!function(){
		if( location.search ){
			fetchBlog( location.search.slice(1).split('=')[1] );
		}
	}();

/***/ }
/******/ ]);