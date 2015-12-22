
require.config({
	//baseUrl: basePath,
	paths: {
        common: '/assets/public/js/common',
		hint: '/assets/widget/hint/hint',
		validate: '/assets/widget/validate/validate'
	}
})

require([ 'hint', 'validate', 'common' ], function( hint, Validate ){

	var blogTmp = ['<div class="info clearfix">',
						'<span class="title">{title}</span>',
						'<a class="type" href="/blog/list?kind={kind}">{kind}</a>',
						'<img class="head" src="/assets/public/imgs/head.png" width="42" />',
					'</div>',
					'<div class="tool">',
						'<span class="toolItem view">Views: {view}</span>',
						'<span class="toolItem talk">Comments: {comment}</span>',
						'<span class="toolItem date">Date: {date}</span>',
					'</div>',
					'<div class="content clearfix markdown">{content}</div>'].join(''),
		blogId;

	function fetchBlog( id ){
		var data = {id: id };
		$.ajax({
			url: '/blog/fetchList',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					fetchComment( id );
					render( ret.data[0] );
					$( '#commentUser' ).val( $.cookies.get('username') || '' )
				} else {

				}
			}
		})
	}

	function render( item ){
		var el = blogTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		});
		$( '#blogBox' ).prepend( $( '<section>' ).append( el ) );
	}

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

	var commentTmp = ['<div><span class="user">{username}</span><span class="date">{date}</span></div><div class="content markdown">{content}</div>'].join('');
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
		var el = $( '<div>' ).addClass( 'commentItem' ).append( commentTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		}));
		return el;
	}

	!function(){
		fetchBlog( blogId = location.search.slice(1).split('=')[1] );
	}();

})


