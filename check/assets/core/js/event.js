
define(function(){
	
	var Event = {
		on: function( name, callback){
		    this._event = this._event || {};
		    this._event[ name ] = this._event[ name ] || [];
		    this._event[ name ].push( callback );
		},
		emit: function( name ){
		    this._event = this._event || {};
		    var args = Array.prototype.slice.call( arguments, 1 ),
		          me = this;
		    if( this._event[ name ] ){
		        $.each( this._event[ name ], function( k, v ){
		            v.call( me, args );
		        } )
		    }
		}     
	}

	return Event
})
