
require.config({
	//baseUrl: basePath,
	paths: {
        common: '/assets/public/js/common',
		hint: '/assets/widget/hint/hint',
		base: '/assets/core/js/base'
	}
})

require([ 'hint', 'base', 'common' ], function( hint, Base ){

	var userId = Base.searchHref( 'id' );

	/***
	fetch and render blog
	***/
	var blogTmp = ['<div class="info">',
						'<a href="/blog/info?id={id}">{title}</a>',
						'<a class="kind" href="/blog/kind?kind={kind}">{kind}</a>',
					'</div>',
					'<div class="tool">',
						'<span>views: {view}</span>',
						'<span>comments: {comment}</span>',
						'<span>date: {date}</span>',
					'</div>'].join('');	

	function fetchBlog(){
		var data = {
			owner: userId
		}
		$.ajax({
			url: '/blog/fetchList',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					render( ret.data );
				}
				console.log( ret );
			}
		});
	}

	function render( items ){
		$( '.articles' ).html( '' );
		var els = [];
		$.each( items, function( index, item ){
			els.push( create( item ) );
		});
		$( '.articles' ).append( els );
	}

	function create( item ){
		var el = $( blogTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		}));
		return $( '<div>' ).addClass( 'blogItem' ).append( el );
	}

	/***
	fetch and render comment
	***/
	var commentTmp = ['<div class="info">',
						'<a href="/blog/info?id={belong}">{content}</a>',
					'</div>',
					'<div class="tool">',
						'<span>date: {date}</span>',
					'</div>'].join('');	

	function fetchComment(){
		var data = {
			owner: userId	
		}
		$.ajax({
			url: '/comment/fetchList',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					renderComment( ret.data );
				}
				console.log( ret );
			}
		});
	}

	function renderComment( items ){
		$( '.articles' ).html( '' );
		var els = [];
		$.each( items, function( index, item ){
			els.push( createComment( item ) );
		});
		$( '.articles' ).append( els );
	}

	function createComment( item ){
		var el = $( commentTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		}));
		return $( '<div>' ).addClass( 'blogItem' ).append( el );
	}
	var tabMenu = $( '.tabMenu' );

	tabMenu.on( 'click', function(){
		tabMenu.removeClass( 'tabMenuCurrent' );
		$( this ).addClass( 'tabMenuCurrent' );
		if( $( this ).index() == 1 ){
			fetchComment();	
		} else {
			fetchBlog();	
		}
	});

	!function(){
		fetchBlog();
	}();

})


