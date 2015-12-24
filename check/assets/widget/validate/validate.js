
var base = require( '../../core/js/base' )

function cardId( text ){
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
	var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];

	if (text.length == 15) {   
		return isValidityBrithBy15IdCard(text);   
	}else if (text.length == 18){   
		var a_idCard = text.split("");  
		if (isValidityBrithBy18IdCard(text)&&isTrueValidateCodeBy18IdCard(a_idCard)) {   
			return true;   
		}   
		return false;
	}
	return false;
	
	function isTrueValidateCodeBy18IdCard(a_idCard) {   
		var sum = 0; 
		if (a_idCard[17].toLowerCase() == 'x') {   
			a_idCard[17] = 10;
		}   
		for ( var i = 0; i < 17; i++) {   
			sum += Wi[i] * a_idCard[i];   
		}   
		valCodePosition = sum % 11; 
		if (a_idCard[17] == ValideCode[valCodePosition]) {   
			return true;   
		}
		return false;   
	}
	
	function isValidityBrithBy18IdCard(idCard18){   
		var year = idCard18.substring(6,10);   
		var month = idCard18.substring(10,12);   
		var day = idCard18.substring(12,14);   
		var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));  
		if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
			return false;   
		}
		return true;   
	}
	
	function isValidityBrithBy15IdCard(idCard15){   
		var year =  idCard15.substring(6,8);   
		var month = idCard15.substring(8,10);   
		var day = idCard15.substring(10,12);
		var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day)); 
		if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
			return false;   
		}
		return true;
	}   
	 
}

var Regular = {

	required: {
		fn: function( value ){
			return !!value;
		},
		prompt: 'can not be empty'
	},

	min: {
		fn: function( value, rule ){
			return value.length >= rule;
		},
		prompt: 'not less than ?'
	},

	max: {
		fn: function( value, rule ){
			return value.length <= rule;
		},
		prompt: 'no more than ?'
	},

	zh: {
		fn: function( value ){
			return /^[\u4E00-\u9FA5\uf900-\ufa2d\uFE30-\uFFA0]+$/.test( value );
		},
		prompt: 'must be chinese'
	},

	en: {
		fn: function( value ){
			return /^[0-9|a-z|A-Z]+$/.test( value );
		},
		prompt: 'must be in english'
	},

	num: {
		fn: function( value ){
			return /^[0-9]+$/.test( value );
		},
		prompt: 'must be a numeric type'
	},

	phone: {
		fn: function( value ){
			return /^1[0-9]{10}$/.test( value );
		},
		prompt: 'must be a phone'
	},

	email: {
		fn: function( value ){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)
		},
		prompt: 'must be a email accout'
	},

	idCard: {
		fn: function( value ){
			return cardId( value );
		},
		prompt: 'must be a i.d.card'
	}

};

function check( rules, cb ){

	var rule,
		prompt,
		codex,
		value = this.value;
	for ( rule in rules ){

		prompt = rules[ rule ];
		base.isArray( prompt ) && ( codex = prompt[0] ) && ( prompt = prompt[1] );

		if( rule == 'self' ){
			if( rules[ rule ].call( this, cb ) !== true ){
				return false;
			};
			continue;
		}

		if( rule.indexOf( ' && ') > -1 ){
			var rs = rule.split( ' && ' ),
				rets = [];
			for( var i = 0; i < rs.length; i++ ){
				if( !Regular[ rule ]( value, codex ) ){
					cb( (prompt || Regular[ rule ].prompt).replace('?',codex ) )
					return prompt;
				}
			}
		} else if( !Regular[ rule ].fn( value, codex ) ){
			cb( (prompt || Regular[ rule ].prompt).replace('?',codex ) )
			return prompt;
		}
		cb( '' );
	}
	return true;

}

function validate( el, events, rules, cb ){
	
	if( rules ){

		cb = rules[1];
		rules = rules[0];
		$.each( events, function( k, event ){
			el.on( event, function(){
				check.call( this, rules, cb );
			});
		});
	
	} else {
		
		cb = events[1];
		rules = events[0];
		return check.call( el.get( 0 ), rules, cb );
	
	}

}

module.exports = validate
