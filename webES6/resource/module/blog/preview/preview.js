require( '../../../public/css/markdown.scss' )
var title = $( '#title' ),
	date = $( '#date' ),
	summary = $( '#summary' ),
	content = $( '#content' ),
	kind = $( '#kind' ),
	editorBtn = $( '#editorBtn' ),
	_id = '';

function fetchBlog( id ){
	$.ajax({
		url: '/blog/fetch',
		type: 'get',
		dataType: 'json',
		data: { id: id },
		success: function( ret ){
			if( ret.code == 0 ){
				title.html( ret.data[0].title );
				_id = ret.data[0].id;
				date.html( ret.data[0].date );
				kind.html( ret.data[0].kind );
				content.html( ret.data[0].content );
				summary.html( ret.data[0].summary );
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