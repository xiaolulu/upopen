var hint = require( '../../../widget/hint/hint' ).hint;

var title = $( '#title' ),
	summary = $( '#summary' ),
	content = $( '#content' ),
	type = $( '#type' ),
	editorBtn = $( '#editorBtn' ),
	_id = '';

$( '#editorForm' ).on( 'submit', function(){
	var data = {
			title: title.val(),
			summary: summary.val(),
			content: content.val(),
			kind: type.val(),
			tags: type.val()
		}
		url = '/blog/create';
	if( _id = location.search.slice(1).split('=')[1] ){
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
				hint.show( '保存成功' );
				return;
				setTimeout( function(){
					window.location.href = '/blog/mis';
				}, 1000 )
			}
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
				content.val( ret.data[0].content );
				summary.val( ret.data[0].summary );
				type.val( ret.data[0].kind )
				
			}
			console.log( ret );
		}
	});
}

!function(){
	if( location.search ){
		_id = location.search.slice(1).split('=')[1];
		fetchBlog( _id );
	}
}();