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

	var blogId;


	/***************
	comment
	***************/
	var commentUser = $( '#commentUser' ),
		commentContent = $( '#commentContent' ),
		commentBtn = $( '#commentBtn' );

	var commentUserRule = [
			{
				'required': 'username can not be empty',
				'max': [30]
			},
			function( prop ){
				prop && hint.show( prop );
			}
		],
		commentContentRule = [
			{
				'required': 'content can not be empty',
				'max': [1000]
			},
			function( prop ){
				prop && hint.show( prop );
			}
		];
	$( '#commentForm' ).on( 'submit', function(){
		if( Validate( commentUser, commentUserRule ) !== true || Validate( commentContent, commentContentRule ) !== true ){
			return false;
		}
		commentBtn.get(0).setAttribute( 'disabled', true );
		var data = {
			belong: blogId,
			username: commentUser.val(),
			content: commentContent.val()
		}
		$.ajax({
			url: '/comment/create',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function( ret ){
				console.log( ret );
				if( ret.code == 0 ){
					//hint.show( 'Comment save success!' );
					data.date = new Date;
					$( '#commentWrap' ).append( renderCommentItem( 0, data ));
					setTimeout( function(){
						commentBtn.get(0).removeAttribute( 'disabled' );	
					}, 1000 );
				}
			}
		});
		return false;
	});

	var commentTmp = ['<div><a href="{href}" class="user">{username}</a><span class="date">{date}</span></div><div class="content markdown">{content}</div>'].join('');
	function fetchComment( belong ){
		$.ajax({
			url: '/comment/fetchList',
			type: 'get',
			dataType: 'json',
			data: { belong: belong },
			success: function( ret ){
				if( ret.code == 0 ){
					renderComment( ret.data );				
				}
			}
		});
	}

	function renderComment( items ){
		var els = [];
		$.each( items, function( key, item ){
			els.push( renderCommentItem( key, item ) );
		});
		$( '#commentWrap' ).append( els );
	}

	function renderCommentItem( key, item ){
		if( item.OWNER == 'visitor' ){
			item.href =  'javascript:void(0)'
		} else {
			item.href = '/user/info?id=' + item.OWNER;
		}
		var el = $( '<div>' ).addClass( 'commentItem' ).append( commentTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		}));
		return el;
	}

	var blogTmp = ['<section>',	
			'<div class="info clearfix">',
				'<span class="title">{title}</span>',
				'<a class="type" href="/blog/list?kind={kind}">{kind}</a>',
				'<img class="head" src="/public/imgs/head.png" width="42" />',
			'</div>',
			'<div class="tool">',
				'<span class="toolItem view">Views: {view}</span>',
				'<span class="toolItem talk">Comments: {comment}</span>',
				'<span class="toolItem date">Date: {date}</span>',
			'</div>',
			'<div class="content clearfix markdown">{content}</div>',
		'</section>'].join('');

	function fetchBlog( id ){
		var data = { id: id };
		$.ajax({
			url: '/blog/fetchList',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					
					var item = ret.data[0];
					$( '#blogBox' ).prepend( blogTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
						return item[ $2 ];
					}));
					//logo3d(0);
				} else {

				}
			}
		})
	}

	!function(){
		blogId = location.search.slice(1).split('=')[1]
		//fetchBlog( blogId)
		//fetchComment( blogId );
	}();

/***/ }
/******/ ]);