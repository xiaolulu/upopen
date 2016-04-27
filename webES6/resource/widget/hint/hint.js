require( './hint.scss' );
function Hint( config ){
	this.config = config || {};
	this.init();
}

Hint.prototype = {
	defaults: {
		content: '操作成功'
	},
	
	init: function(){
		this.render();
	},
	
	render: function(){
		this.el = $( '<div>' ).addClass( 'Hint' );
		$('body').append( this.el );
		return this;
	},
	
	setValue: function( txt ){
		this.el.html( txt );
		return this;
	},
	
	show: function( txt ){
		var me = this;
		this.setValue( txt );
		this.el.removeClass('Hintdown').addClass('Hintup');
		setTimeout(function(){
			me.el.css('bottom',0);
			me.hide();
		},3000)
	
	},
	
	hide: function(){
		this.el.addClass('Hintdown').removeClass('Hintup');
	}
}

var hint = new Hint();

module.exports = {
	hint: hint,
	Hint: Hint
}