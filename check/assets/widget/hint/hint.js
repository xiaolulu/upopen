

var base = require( '../../core/js/base.js' );
require( './hint.css' );

var Hint = function(){
	this.init();
};

base.apply( Hint.prototype, {

	defaults: {
		width: 300,
		height: 100
	},		
	
	init: function(){

		this.render()

	},

	render: function(){

		this.el = $( '<div>' ).addClass( 'hint' );
		this.content = $( '<span>' ).addClass( 'hintContent' );
		this.el.append( this.content );
		$( 'body' ).append( this.el );

	},

	html: function( txt ){

		this.content.html( txt );

	},

	show: function( txt ){

		this.html( txt || '' );
		this.el.fadeIn();
		var me = this;
		setTimeout( function(){ me.hide() }, 2000 );	

	},

	hide: function(){

		this.el.fadeOut();

	}

});	

var hint = new Hint();

module.exports = hint;
