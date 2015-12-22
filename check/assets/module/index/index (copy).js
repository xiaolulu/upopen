
require.config({
	paths: {
        common: '/assets/public/js/common',
		hint: '/assets/widget/hint/hint'
	}
})

require([ 'hint', 'common' ], function( hint ){
	var wrapper = $( '.wrapper' ),
		host = $( '.host' );

	host.val( window.location.host );

	function extend( source, parent ){
		
		//var args = Array.prototype.slice( arguments, 1 );
		for( var p in parent ){
			source[p] = parent[p]
		}
		return source;

	}

	var KINDS = [ 'choose','user'];

	function Demo( config, renderTo ){
		this.isExit = !!config;
		this.init( config, renderTo );
	}

	extend( Demo.prototype, {

		defaults: {
			name: '',
			url: '',
			kind: 'user',
			type: 1,
			description: '',
			params: {'': ''}
		},

		init: function( config, renderTo ){
			config = config || this.defaults
			var el = this.render( config );
			this.setValue( config );
			if( typeof renderTo == 'function' ){
				renderTo( el );
			} else {
				wrapper.prepend( el );
			}
		
		},

		render: function( config ){
			var me = this,
				section = this.section = $( '<section>' ).addClass( 'clearfix' ).attr( 'id', config.url ),
				h2 = $( '<h2>' ),
				name = this.name = $( '<input>' ).attr( { 'type': 'text', placeHolder: 'action name'} ).addClass( 'name' ),
				kind = this.kind = $( '<select>' ),
		        del = $( '<tt>' ).html( '-' ).addClass( 'remove' ),
				label = $( '<label>' ).addClass( 'clearfix' ),
				url = this.url = $( '<input>' ).attr( { 'type': 'text', placeHolder: 'action url'} ).addClass( 'url' ),
				type = this.method = $( '<select>' ).addClass( 'type' ).append( new Option( 'POST', 'POST' ), new Option( 'GET', 'GET' ), new Option( 'DELETE', 'DELETE' ) ),
				description = this.description = $( '<textarea>' ).attr( { placeHolder: 'action description'} ),
				form = this.form = $( '<form>' ),
				result = this.result = $( '<pre>' ),
				submit = this.submit = $( '<button>' ).attr( { type: 'submit' } ).html( 'test' ),
				save = $( '<button>' ).attr( { type: 'button' } ).addClass( 'save' ).html( 'save' );
		
			$.each( KINDS, function( k, v ){
				kind.append( new Option( v + ' system', k ) );
			});

			label.append( url, type );
			form.append( description, label, submit, save );
			h2.append( [ name, kind, del ] );
			section.append( [ h2, form, result ] );
			form.on( 'submit', function(){
				me.check( config );
				return false;
			} );

			save.on( 'click', function(){
				me.save( config );
			});

		    del.on( 'click', function(){
		        confirm('Can not be restored！！') && me.remove( config._id );
		    });
		
			return section;
		
		},

		setValue: function( config ){
			this.name.val( config.name );
			this.kind.val( config.kind );
			this.description.val( config.description );
			this.url.val( config.url );
			this.method.val( config.method );
			if( typeof config.params == 'string' ){
				config.params = JSON.parse( config.params );
			}
			this.submit.before( this.createItems( config.params || {} ) );
		},

		remove: function( id ){
		    
		    var me = this;
		    $.ajax({
				url: '/action/remove',
				type: 'delete',
				dataType: 'json',
				data: { 'id': id },
				success: function( ret ){
					if( ret.code == 0 ){
		                me.section.remove();
		            }
				},
				error: function( e ){
					console.log( e )
				},
				failed: function( e ){
					console.log( e )
				}
			});

		},

		check: function( config ){

			var me = this,
				data = {};
			$.each( this.form.find( '.filedset' ), function( k, item ){
				var fields = $( item ).find( 'input' );
				if( fields[0].value.trim() ){
					data[ fields[0].value ] = fields[1].value;
				}
			} );

			data.actionConfig = {
				host: host.val(),
				path: this.url.val(),
				method: this.type.val()
			}

			data.actionConfig = JSON.stringify( data.actionConfig );
	
			$.ajax({
				url: '/action/check',
				type: 'post',
				dataType: 'json',
				data: data,
				success: function( ret ){
					me.result.html( JSON.stringify( ret, null, 8 ) );
				},
				error: function( e ){
					console.log( e )
				},
				failed: function( e ){
					console.log( e )
				}
			});

		},

		save: function( config ){
		
			var me = this,
				params = {},
				data = {
					id: config._id,
					name: this.name.val(),
					kind: this.kind.val(),
					description: this.description.val(),
					url: this.url.val(),
					method: this.method.val(),
					params: params
				};
			$.each( this.form.find( '.filedset' ), function( k, item ){
				var fields = $( item ).find( 'input' );
				params[ fields[0].value ] = fields[1].value;
			} );
			params = JSON.stringify( params )
			data.params = params;

			$.ajax({
				url: config._id ? '/action/update' : '/action/create',
				type: 'post',
				dataType: 'json',
				data: data,
				success: function( ret ){
					me.result.html( !config._id ? '<p style="text-align:center;">|<br />|<br />|<br />|<br />V<p>' :JSON.stringify( ret, null, 8 ) );
					!config._id ? new Demo( ret.data, function( el ){ $( 'section' ).first().after( el )} ) : '';
				},
				error: function( e ){
					console.log( e )
				},
				failed: function( e ){
					console.log( e )
				}
			});

		},

		createItems: function( data ){

			var me = this,
				items = [];

			$.each( data, function( field, value ){
				items.push( me.createItem( field, value ) );
			} );
		
			return items;

		},

		createItem: function( field, value ){
			var me = this,
				label = $( '<label>' ).addClass( 'filedset clearfix' ),
				field = $( '<input>' ).attr( { 'type': 'text', placeHolder: 'param key'} ).addClass( 'field' ).val( field || '' ),
				value = $( '<input>' ).attr( { 'type': 'text', placeHolder: 'param value'} ).addClass( 'value' ).val( value || '' ),
				del = $( '<tt>' ).addClass( 'del' ).html( '-' )
				add = $( '<tt>' ).addClass( 'add' ).html( '+' );
		
			label.append( [ field,'：', value, add, del ] );
			add.on( 'click', function(){
		
				label.after( me.createItem() );

			} );
			del.on( 'click', function(){
			
				label.remove();

			})
			return label;
		}

	} );

	//var demo = new Demo();

	function init( data ){

		$.ajax({
			url: '/action/fetch',
			type: 'get',
			data: {},
			dataType: 'json',
			success: function( ret ){
				if( ret.code == 0 ){
		            ret.data.length && catalogInit( ret.data );
					ret.data.push( null );
					$.each( ret.data, function( k, item ){
						new Demo( item )
					} );
				}
			}
		});

	}

	init();


	/********************************************************/
	//catalog
	var catalogBox = $( 'catalog' ),
		mask = $( 'mask' ),
		catalog = $( '.catalog' );
	mask.on( 'click', function(){
		catalogBox.fadeOut();
		mask.fadeOut();
	} )

	wrapper.on( 'dblclick', function(e){
		e.preventDefault;
	})

	$( 'body' ).on( 'dblclick', function(){
		catalogBox.fadeIn();
		mask.fadeIn();
	});

	function Catalog( config ){
		this.init( config )
	}

	extend( Catalog.prototype, {

		init: function( config ){
		    this.render( config )
		},

		render: function( config ){
		    
		    var menu = this.createMenu( config.kinds ),
		        main = this.createMain( config.main );
		    catalog.append( menu, $( '<div>' ).addClass( 'clearfix catalogMainBox' ).append( main ) );

		},

		createMenu: function( data ){
		    
		    var me = this,
		        el = this.menu = $( '<ul>' ).addClass( 'clearfix catalogMenu' ),
		        li;
		    $.each( data, function( key, value ){
		        li = $( '<li>' ).html( KINDS[ value ] ).addClass( 'catalogMenuLi' + ( !key ? ' catalogMenuLiCur': '' ) );
		        li.on( 'click', function(){
		            me.handler( key )    
		        });
		        el.append( li );
		    });
		    return el;

		},

		handler: function( key ){
		    
		    this.menu.find( 'li' ).removeClass( 'catalogMenuLiCur' );
		    $( this.menu.find( 'li' ).get( key ) ).addClass( 'catalogMenuLiCur' );
		    $.each( this.els, function( k, el ){
		        ( k != key ) ? el.hide() : el.show() ;
		    })

		},

		createMain: function( data ){
		    
		    var els = this.els = [];
		    $.each( data, function( key, tree ){
		        var el = $( '<p>' ).addClass( 'clearfix catalogMain' );
		        $.each( tree, function( key, value ){
		            el.append( $( '<a>' ).html( value.name ).addClass( 'catalogMainLi' ).attr( 'href', '#' + value.url ) );
		        });
		        els.push( el );
		    });
		    els[0].show();
		    return els;

		}

	} );

	function catalogInit( data ){
		var kinds = [1,2,3,4],
		    tree = [[],[],[],[]];
		$.each( data, function( key, value ){
		    tree[ value.kind-1 ] && tree[ value.kind-1 ].push( { url: value.url, name: value.name } );
		} );
		new Catalog( { kinds: kinds, main: tree } );
	};
});
