
require.config({
	//baseUrl: basePath,
	paths: {
        common: '/assets/public/js/common',
		hint: '/assets/widget/hint/hint'
	}
})

require([ 'hint', 'common' ], function( hint ){

	var blogTmp = ['<div class="info">',
						'<a href="/blog/info?id={id}">{title}</a>',
						'<a class="kind" href="/blog/kind?kind={kind}">{kind}</a>',
					'</div>',
					'<div class="handle">',
						'<a href="javascript:void(0)" class="delete">delete</a>',
						'<a href="/user/edit?id={id}">edit</a>',
					'</div>',
					'<div class="tool">',
						'<span>views: {view}</span>',
						'<span>comments: {comment}</span>',
						'<span>date: {date}</span>',
					'</div>'].join('');	

	function fetchBlog(){
		$.ajax({
			url: '/blog/fetchEdit',
			type: 'get',
			dataType: 'json',
			data: {},
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
		var el = $( '<div>' ).addClass( 'blogItem' ).append( blogTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		}));
		el.find( '.delete' ).on( 'click', function(){
			$.ajax({
				url: '/blog/remove',
				type: 'delete',
				data: {id: item.id},
				dataType: 'json',
				success: function( ret ){
					if( ret.code == 0 ){
						el.remove();
					}
				}
			})
		})
		return  el;
	}

	var commentTmp = ['<div class="info">',
						'<a href="/blog/info?id={belong}">{content}</a>',
					'</div>',
					'<div class="handle">',
						'<a href="javascript:void(0)" class="delete">delete</a>',
					'</div>',
					'<div class="tool">',
						'<span>date: {date}</span>',
					'</div>'].join('');	

	function fetchComment(){
		$.ajax({
			url: '/comment/fetchEdit',
			type: 'get',
			dataType: 'json',
			data: {},
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
		var el = $( '<div>' ).addClass( 'blogItem' ).append( commentTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		}));
		el.find( '.delete' ).on( 'click', function(){
			$.ajax({
				url: '/comment/remove',
				type: 'delete',
				data: {id: item.id},
				dataType: 'json',
				success: function( ret ){
					if( ret.code == 0 ){
						el.remove();
					}
				}
			})
		})
		return el;
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


