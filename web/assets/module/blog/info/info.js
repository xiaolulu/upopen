
require.config({
	//baseUrl: basePath,
	paths: {
        common: '/assets/public/js/common',
		hint: '/assets/widget/hint/hint',
		validate: '/assets/widget/validate/validate'
	}
})

require([ 'hint', 'validate', 'common' ], function( hint, Validate ){

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

	!function(){
		fetchComment( blogId = location.search.slice(1).split('=')[1] );
	}();

})


