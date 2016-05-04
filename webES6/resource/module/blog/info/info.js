require( '../../../public/css/markdown.scss' );
var hint = require( '../../../widget/hint/hint' ).hint;
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
	/*if( Validate( commentUser, commentUserRule ) !== true || Validate( commentContent, commentContentRule ) !== true ){
		return false;
	}*/
	commentBtn.get(0).setAttribute( 'disabled', true );
	var data = {
		blogId: blogId,
		owner: commentUser.val(),
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
				hint.show('保存成功')
				$( '#commentWrap' ).append( renderCommentItem( 0, ret.data ));
				setTimeout( function(){
					commentBtn.get(0).removeAttribute( 'disabled' );	
				}, 1000 );
			}
		}
	});
	return false;
});

var commentTmp = ['<div><a href="javascript:void(0)" class="user">{owner}</a><span class="date">{date}</span></div><div class="content markdown">{content}</div>'].join('');
function fetchComment( blogId ){
	$.ajax({
		url: '/comment/fetch',
		type: 'get',
		dataType: 'json',
		data: { blogId: blogId },
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
	item.date = item.date.slice(0,19).replace('T',' ');
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

function updateBlogView( id ){
	var data = { id: id };
	$.ajax({
		url: '/blog/updateViewNum',
		type: 'get',
		dataType: 'json',
		data: data,
		success: function( ret ){
			if( ret.code == 0 ){
				//logo3d(0);
			} else {

			}
		}
	})
}

!function(){
	blogId = location.search.slice(1).split('=')[1]
	//fetchBlog( blogId)
	updateBlogView( blogId )
	fetchComment( blogId );
}();