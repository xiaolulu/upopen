/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	__webpack_require__( 1 );
	var Hint = __webpack_require__( 2 );

	var ActionParam = React.createClass({displayName: "ActionParam",
		addItem: function(){
			this.props.addActionItem( this.props.index );
		},
		delItem: function(){
			this.props.delActionItem( this.props.index );
		},
		changeValue: function(event){
			console.log( 1 );
			this.props.changeState( this.props.index, {field: this.refs.field.value, value: this.refs.value.value });
		},
		render: function(){
			return (
				React.createElement("label", {className: "filedset clearfix"}, 
					React.createElement("input", {type: "text", placeholder: "param key", onChange: this.changeValue, value: this.props.data.field, ref: "field", className: "field"}), "：", 
					React.createElement("input", {type: "text", placeholder: "param value", onChange: this.changeValue, defaultValue: this.props.data.value, ref: "value", className: "value"}), 
					React.createElement("button", {type: "button", onClick: this.addItem, className: "itemEdit add"}, "+"), 
					React.createElement("button", {type: "button", onClick: this.delItem, className: "itemEdit del"}, "-")
				)
			)
		}
	})

	var ActionBox = React.createClass({displayName: "ActionBox",
		handleState: function(index, data){
			this.state.data.splice( index, 1, data );
			this.setState({data: this.state.data });
		},
		remove: function(){
			this.props.handleRemove( this.props.index );
		},
		save: function(){
			var data = {
				name: this.refs.name.value,
				kind: this.refs.kind.value,
				description: this.refs.description.value,
				url: this.refs.url.value,
				method: this.refs.method.value
			};
			var params = {};
			for( var i = 0; i < this.state.data.length; i++ ){
				params[ this.state.data[i].field ] = this.state.data[i].value;
			}
			data.params = JSON.stringify( params );
			this.props.handleSave( this.props.index, data );
			return false;
		},
		test: function(){
			var data = {
				name: this.refs.name.value,
				kind: this.refs.kind.value,
				description: this.refs.description.value,
				url: this.refs.url.value,
				id: this.props.data.id,
				method: this.refs.method.value
			};
			var params = {};
			for( var i = 0; i < this.state.data.length; i++ ){
				params[ this.state.data[i].field ] = this.state.data[i].value;
			}
			data.params = JSON.stringify( params );
			this.props.handleTest( this.props.index, data );
			return false;
		},
		getInitialState: function(){
			var params = JSON.parse( this.props.data.params ),
				data = [];
			for( var field in params ){
				data.push({field: field, value: params[field]});
			}
			return { data: data }
		},
		conponentDidMount: function(){
			this.setState({data: [{name:1},{name:2}]})
		},
		addActionItem: function( index ){	
			console.log( 'addActionItem :' + index )
			this.state.data.splice( index+1, 0, {field: ' ', value: ' ' } );
			this.setState({data: this.state.data });
		},
		delActionItem: function( index ){
			console.log( 'delActionItem :' + index );
			this.state.data.splice( index, 1 );
			this.setState({data: this.state.data });
		},
		render: function(){
			var me = this;
			var ActionParams = this.state.data.map( function( item, index ){
				return (
					React.createElement(ActionParam, {key: index, index: index, changeState: me.handleState, addActionItem: me.addActionItem, data: item, delActionItem: me.delActionItem})
				)
			})
		
			return  (
				React.createElement("section", {className: "clearfix"}, 
					React.createElement("h2", null, 
						React.createElement("input", {type: "text", placeholder: "action name", ref: "name", defaultValue: this.props.data.name, className: "name"}), 
						React.createElement("select", {defaultValue: this.props.data.kind, ref: "kind"}, 
							React.createElement("option", {value: "0"}, "choose system"), 
							React.createElement("option", {value: "1"}, "user system")
						), 
						React.createElement("a", {href: "javascript:void(0)", onClick: this.remove, className: "itemEdit del remove"}, "-")
					), 
					React.createElement("form", {onSubmit: this.save}, 
						React.createElement("textarea", {placeholder: "action description", ref: "description", defaultValue: this.props.data.description}), 
						React.createElement("label", {className: "clearfix"}, 
							React.createElement("input", {type: "text", placeholder: "action url", ref: "url", defaultValue: this.props.data.url, className: "url"}), 
							React.createElement("select", {className: "type", ref: "method", defaultValue: this.props.data.method}, 
								React.createElement("option", {value: "POST"}, "POST"), 
								React.createElement("option", {value: "GET"}, "GET"), 
								React.createElement("option", {value: "DELETE"}, "DELETE")					
							)
						), 
						ActionParams, 
						React.createElement("button", {type: "button", onClick: this.test, className: "test"}, "test"), 
						React.createElement("button", {type: "button", onClick: this.save, className: "save"}, "save")
					), 
					React.createElement("pre", {refs: "result"}, this.props.data.result)
				)
			)
		}
	})

	var ActionWrap = React.createClass({displayName: "ActionWrap",

		defaults: {
			id: '',
			name: '',
			kind: '0',
			description: '',
			url: '',
			method: 'POST',
			params: '{"":""}',
			result: ''
		},

		getInitialState: function(){
		
			return {data:[{
					id: '',
					name: '',
					kind: '0',
					description: '',
					url: '',
					method: 'POST',
					params: '{"":""}',
					result: ''
				}]}	
		},
		remove: function( index ){
			var id = this.state.data[index]._id;
			$.ajax({
				url: '/action/remove',
				type: 'delete',
				dataType: 'json',
				data: { 'id': id },
				success: function( ret ){
					if( ret.code == 0 ){
		            	this.state.data.splice( index, 1 );
						this.setState( { data: this.state.data } );
		            }
				}.bind( this ),
				error: function( e ){
					console.log( e )
				},
				failed: function( e ){
					console.log( e )
				}
			});
		},
		
		save: function( index, data ){
			var url = '/action/create';
			if( index ){
				url = '/action/update';
				data._id = this.state.data[index]._id;
			}
			$.ajax({
				url: url,
				type: 'post',
				dataType: 'json',
				data: data,
				success: function( ret ){
					//me.result.html( JSON.stringify( ret, null, 8 ) );
					//new Demo( ret.data, function( el ){ $( 'section' ).first().after( el )} );
					data.result = '';
					if( ret.code === 0 ){
						if( index ){
							this.state.data.splice( index, 1, data )
						} else {
							this.state.data.splice( index+1, 0, data )
						}
						this.setState( { data: this.state.data } );
					}
					Hint.show( ret.msg );
				}.bind( this )
			});
			return false;
		},
		check: function( index, data ){
			debugger
			/*
			var data = [].concat( this.state.data );
			data = data[index];
			if( typeof data.params == 'string' ){
				data.params = JSON.parse( data.params )
			}
			*/
			data.params = JSON.parse( data.params )
			data.actionConfig = {
				host: $('.host').val(),
				path: data.url,
				method: data.type
			}

			$.ajax({
				url: '/action/check',
				type: 'post',
				dataType: 'json',
				data: data,
				success: function( ret ){
					data.result = JSON.stringify(ret.data,null,8);
					delete data.actionConfig;
					data.params = JSON.stringify( data.params );
					this.state.data.splice( index, 1, data );
					this.setState( { data: this.state.data } );
					console.log( ret );
				}.bind( this )
			});
		},
		fetchData: function(){
			$.ajax({
				url: '/action/fetch',
				type: 'get',
				data: {},
				dataType: 'json',
				success: function( ret ){
					if( ret.code == 0 ){
						this.setState( {data: [this.defaults].concat( ret.data )} );
					}
				}.bind(this)
			});
		},
		componentDidMount: function(){
			this.fetchData();
		},
		render: function(){
			var me = this;
			var ActionBoxs = this.state.data.map( function( item, index ){
				return (
					React.createElement(ActionBox, {key: index, handleTest: me.check, handleSave: me.save, handleRemove: me.remove, index: index, data: item})
				)
			});
			return (
				React.createElement("div", {className: "actionWrap"}, 
					ActionBoxs
				)
			)
		}
	});

	ReactDOM.render(
		React.createElement(ActionWrap, null),
		document.getElementById( 'wrapper' )
	);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	

	var hint = __webpack_require__( 2 ),
		DOC = __webpack_require__( 4 ),
		MD5 = __webpack_require__( 5 ),
		Base = __webpack_require__( 3 ),
		Validate = __webpack_require__( 6 ),
		Event = __webpack_require__( 7 );

	var singIn = true,
		username = $( '#username' ),
		usernameErr = $( '#usernameErr' ),
		password = $( '#password' ),
		passwordErr = $( '#passwordErr' );

	function signInDialogToggle( show ){
		if( show ){
			$( '.signInDialog' ).fadeIn();
			$( '.signInMask' ).fadeIn();
		} else {
			$( '.signInMask' ).fadeOut();
			$( '.signInDialog' ).fadeOut();
			username.val( '' );
			password.val( '' );
			forUsername.removeClass( 'hide' );
			forPassword.removeClass( 'hide' );
		}
	}

	function signInDialogError(){
		hint.show( 'User isn\'t exist' );
		$( '.signInDialog' ).addClass( 'dialogWrapError' );
		setTimeout( function(){
			$( '.signInDialog' ).removeClass( 'dialogWrapError' );
		}, 1000 );
	}

	$( '.signInMask' ).on( 'click', function(){
		signInDialogToggle( false );
	});

	$( '#toSignIn' ).on( 'click', function(){
		signInDialogToggle( true );
	});

	$( '#singInLink' ).on( 'click', function(){

		singIn = !singIn;
		
		var _btn, _des, _link;
		if( singIn ){
			_btn = 'SIGN IN';
			_des = 'Don\'t have an account yet?';
			_link = 'Sign up';
		} else {
			_btn = 'CREATE ACCOUNT';
			_des = 'Already have an account?';
			_link = 'Sign in';
		}
		$( '#singInLink' ).html( _link );
		$( '.signInDes' ).html( _des );
		$( '.signInBtn' ).html( _btn );
	});

	var forUsername = $( '.forUsername' ),
		forPassword = $( '.forPassword' );
	forUsername.on( 'click', function(){
		forUsername.addClass( 'holderOn' );
		username.get( 0 ).focus();
	});

	username.on( 'blur', function(){
		if( Validate( username, usernameRule ) !== true ){
			return;
		}
		if( this.value ){
			forUsername.addClass( 'hide' );
		} else {
			forUsername.removeClass( 'hide' );
		}
		forUsername.removeClass( 'holderOn' ).addClass( 'holderOff' );
	}).on( 'focus', function(){
		forUsername.removeClass( 'hide' );
		forUsername.addClass( 'holderOn' ).removeClass( 'holderOff' );
		username.get( 0 ).focus();
	});

	forPassword.on( 'click', function(){
		forPassword.addClass( 'holderOn' );
		password.get( 0 ).focus();
	});

	password.on( 'blur', function(){
		if( Validate( password, passwordRule ) !== true ){
			return;
		}
		if( this.value ){
			forPassword.addClass( 'hide' );
		} else {
			forPassword.removeClass( 'hide' );
		}
		forPassword.removeClass( 'holderOn' ).addClass( 'holderOff' );
	}).on( 'focus', function(){
		forPassword.removeClass( 'hide' );
		forPassword.addClass( 'holderOn' ).removeClass( 'holderOff' );
		password.get( 0 ).focus();
	});

	var usernameRule = [
			{
				'required': '',
				'email': '',
				'max': [30]
			},
			function cb( prompt ){
				usernameErr.html( ' ' + prompt );
			}
		],
		passwordRule = [
			{
				'required': '',
				'min': [6],
				'max': [30]
			},
			function cb( prompt ){
				passwordErr.html( ' ' + prompt );
			}
		];

	$( '.signInForm' ).on( 'submit', function(){
		/*var uRet = Validate( username, usernameRule ),
			pRet = Validate( password, passwordRule );
		if( uRet !== true ||  pRet !== true ){
			return false;
		}*/
		var data = {
				username: username.val(),
				password: MD5.hex_md5( password.val() )
			},
			_singIn = singIn;
		$.ajax({
			url: _singIn ? 'http://web.upopen.com/user/login' : 'http://web.upopen.com/user/register',
			type: _singIn ? 'get': 'post',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code === 0 ){
					signInDialogToggle( false );
					userState( true );
				} else {
					signInDialogError( DOC[ ret.code ] );
				}
			}
		});
		return false;
	});

	function userState( state ){
		if( state ){
			$( '.beforeSignIn' ).hide();
			$( '.afterSignIn' ).show();			
		} else {
			$( '.beforeSignIn' ).show();
			$( '.afterSignIn' ).hide();
		}
	}

	function checkState(){
		var cookie = $.cookies.get( 'userhead' ),
			jsid = $.cookies.get( 'JSESSIONID' );
		userState( jsid || false );
	}

	$( '.logout' ).on( 'click', function( ret ){
		$.ajax({
			url: '/user/logout',
			type: 'get',
			dataType: 'json',
			data: {},
			success: function( ret ){
				window.location.href = window.location.protocol + '//' + window.location.host;
			}
		});
	});

	var userHeadMenu = $( '#userHeadMenu' ),
		_userHeadMenuSet;
	$( '#userHead' ).on( 'mouseenter', function(){
		clearTimeout( _userHeadMenuSet );
		userHeadMenu.show();
	}).on( 'mouseleave', function(){
		_userHeadMenuSet = setTimeout( function(){ userHeadMenu.hide() },500 );
	});

	userHeadMenu.on( 'mouseenter', function(){
		clearTimeout( _userHeadMenuSet );
	}).on( 'mouseleave', function(){
		_userHeadMenuSet = setTimeout( function(){ userHeadMenu.hide() },500 );
	});

	/******
	logo 3d
	******/
	window.logo3d = function( add ){
		if( add ){
			$( '.logo_icon' ).addClass( 'logo_3d' )
		} else {
			$( '.logo_icon' ).removeClass( 'logo_3d' )
		}
	};



	$(window).scroll(function(){
		if( $('body').height() - this.scrollY < 800 ){
			$( this ).trigger( 'scrollLoading' );
		}
	});



	(function(){
		checkState();
	})();


	$(window).scroll(function(){
		if( this.scrollY >= 64 ){
			$('.topbar').css({'position':'fixed','top': -65,background: 'linear-gradient(90deg, #7F8CFF 0%, #02CEFF 100%)'})
		} else {
			$('.topbar').css({'position':'absolute','top': 0,'background': 'rgba(255,255,255,.5)'})
		}
	})



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	

	var base = __webpack_require__( 3 );
	__webpack_require__( 8 );

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
		
		String.prototype.trim = String.prototype.trim || function(){
			return this.replace(/^\s*/,'').replace(/\s*$/,'');
		}
		
		/******************/
		//extend
		function extend( source, parent ){
			
			//var args = Array.prototype.slice( arguments, 1 );
			for( var p in parent ){
				source[p] = parent[p]
			}
			return source;

		}

		function apply( destination ){
			var args = Array.prototype.slice.call(arguments, 1),
				source;
			while( source = args.shift()){
				for( var prop in source){
					 destination[prop] = source[prop];
				}
			};
			return destination
		};

		function isArray( data ){
			
			return Object.prototype.toString.call( data ).toLowerCase() == '[object array]';

		}

		function searchHref( id ){
			
			try{
				var _search = window.location.search.slice(1).split(';'),
					data = {};
				for( var i = 0; i < _search.length; i++ ){
					var li = _search[i].split( '=' );
					data[ li[0] ] = li[1];
				}
				return data[ id ];
			} catch (e){
				return null;
			}

		}

		return {
			extend: extend,
			apply: apply,
			isArray: isArray,
			searchHref: searchHref
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){

		Msg = {
			error: {
				10001: 'User isn\'t exist!',
				10100: 'Need to sign in!'
			}
		};

		return Msg;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))




/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){


		/*
		 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
		 * Digest Algorithm, as defined in RFC 1321.
		 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
		 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
		 * Distributed under the BSD License
		 * See http://pajhome.org.uk/crypt/md5 for more info.
		 */

		/*
		 * Configurable variables. You may need to tweak these to be compatible with
		 * the server-side, but the defaults work in most cases.
		 */
		var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
		var b64pad = "";  /* base-64 pad character. "=" for strict RFC compliance   */

		/*
		 * These are the functions you'll usually want to call
		 * They take string arguments and return either hex or base-64 encoded strings
		 */
		function hex_md5(s) {
			return rstr2hex(rstr_md5(str2rstr_utf8(s)));
		}
		function b64_md5(s) {
			return rstr2b64(rstr_md5(str2rstr_utf8(s)));
		}
		function any_md5(s, e) {
			return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
		}
		function hex_hmac_md5(k, d)
		{
			return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
		}
		function b64_hmac_md5(k, d)
		{
			return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
		}
		function any_hmac_md5(k, d, e)
		{
			return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
		}

		/*
		 * Perform a simple self-test to see if the VM is working
		 */
		function md5_vm_test()
		{
			return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
		}

		/*
		 * Calculate the MD5 of a raw string
		 */
		function rstr_md5(s)
		{
			return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
		}

		/*
		 * Calculate the HMAC-MD5, of a key and some data (raw strings)
		 */
		function rstr_hmac_md5(key, data)
		{
			var bkey = rstr2binl(key);
			if (bkey.length > 16)
			    bkey = binl_md5(bkey, key.length * 8);

			var ipad = Array(16), opad = Array(16);
			for (var i = 0; i < 16; i++)
			{
			    ipad[i] = bkey[i] ^ 0x36363636;
			    opad[i] = bkey[i] ^ 0x5C5C5C5C;
			}

			var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
			return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
		}

		/*
		 * Convert a raw string to a hex string
		 */
		function rstr2hex(input)
		{
			try {
			    hexcase
			} catch (e) {
			    hexcase = 0;
			}
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var output = "";
			var x;
			for (var i = 0; i < input.length; i++)
			{
			    x = input.charCodeAt(i);
			    output += hex_tab.charAt((x >>> 4) & 0x0F)
			            + hex_tab.charAt(x & 0x0F);
			}
			return output;
		}

		/*
		 * Convert a raw string to a base-64 string
		 */
		function rstr2b64(input)
		{
			try {
			    b64pad
			} catch (e) {
			    b64pad = '';
			}
			var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			var output = "";
			var len = input.length;
			for (var i = 0; i < len; i += 3)
			{
			    var triplet = (input.charCodeAt(i) << 16)
			            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
			            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
			    for (var j = 0; j < 4; j++)
			    {
			        if (i * 8 + j * 6 > input.length * 8)
			            output += b64pad;
			        else
			            output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
			    }
			}
			return output;
		}

		/*
		 * Convert a raw string to an arbitrary string encoding
		 */
		function rstr2any(input, encoding)
		{
			var divisor = encoding.length;
			var i, j, q, x, quotient;

			/* Convert to an array of 16-bit big-endian values, forming the dividend */
			var dividend = Array(Math.ceil(input.length / 2));
			for (i = 0; i < dividend.length; i++)
			{
			    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
			}

			/*
			 * Repeatedly perform a long division. The binary array forms the dividend,
			 * the length of the encoding is the divisor. Once computed, the quotient
			 * forms the dividend for the next step. All remainders are stored for later
			 * use.
			 */
			var full_length = Math.ceil(input.length * 8 /
			        (Math.log(encoding.length) / Math.log(2)));
			var remainders = Array(full_length);
			for (j = 0; j < full_length; j++)
			{
			    quotient = Array();
			    x = 0;
			    for (i = 0; i < dividend.length; i++)
			    {
			        x = (x << 16) + dividend[i];
			        q = Math.floor(x / divisor);
			        x -= q * divisor;
			        if (quotient.length > 0 || q > 0)
			            quotient[quotient.length] = q;
			    }
			    remainders[j] = x;
			    dividend = quotient;
			}

			/* Convert the remainders to the output string */
			var output = "";
			for (i = remainders.length - 1; i >= 0; i--)
			    output += encoding.charAt(remainders[i]);

			return output;
		}

		/*
		 * Encode a string as utf-8.
		 * For efficiency, this assumes the input is valid utf-16.
		 */
		function str2rstr_utf8(input)
		{
			var output = "";
			var i = -1;
			var x, y;

			while (++i < input.length)
			{
			    /* Decode utf-16 surrogate pairs */
			    x = input.charCodeAt(i);
			    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
			    if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
			    {
			        x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
			        i++;
			    }

			    /* Encode output as utf-8 */
			    if (x <= 0x7F)
			        output += String.fromCharCode(x);
			    else if (x <= 0x7FF)
			        output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
			                0x80 | (x & 0x3F));
			    else if (x <= 0xFFFF)
			        output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
			                0x80 | ((x >>> 6) & 0x3F),
			                0x80 | (x & 0x3F));
			    else if (x <= 0x1FFFFF)
			        output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
			                0x80 | ((x >>> 12) & 0x3F),
			                0x80 | ((x >>> 6) & 0x3F),
			                0x80 | (x & 0x3F));
			}
			return output;
		}

		/*
		 * Encode a string as utf-16
		 */
		function str2rstr_utf16le(input)
		{
			var output = "";
			for (var i = 0; i < input.length; i++)
			    output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
			            (input.charCodeAt(i) >>> 8) & 0xFF);
			return output;
		}

		function str2rstr_utf16be(input)
		{
			var output = "";
			for (var i = 0; i < input.length; i++)
			    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
			            input.charCodeAt(i) & 0xFF);
			return output;
		}

		/*
		 * Convert a raw string to an array of little-endian words
		 * Characters >255 have their high-byte silently ignored.
		 */
		function rstr2binl(input)
		{
			var output = Array(input.length >> 2);
			for (var i = 0; i < output.length; i++)
			    output[i] = 0;
			for (var i = 0; i < input.length * 8; i += 8)
			    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
			return output;
		}

		/*
		 * Convert an array of little-endian words to a string
		 */
		function binl2rstr(input)
		{
			var output = "";
			for (var i = 0; i < input.length * 32; i += 8)
			    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
			return output;
		}

		/*
		 * Calculate the MD5 of an array of little-endian words, and a bit length.
		 */
		function binl_md5(x, len)
		{
			/* append padding */
			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;

			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;

			for (var i = 0; i < x.length; i += 16)
			{
			    var olda = a;
			    var oldb = b;
			    var oldc = c;
			    var oldd = d;

			    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

			    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

			    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

			    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

			    a = safe_add(a, olda);
			    b = safe_add(b, oldb);
			    c = safe_add(c, oldc);
			    d = safe_add(d, oldd);
			}
			return Array(a, b, c, d);
		}

		/*
		 * These functions implement the four basic operations the algorithm uses.
		 */
		function md5_cmn(q, a, b, x, s, t)
		{
			return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
		}
		function md5_ff(a, b, c, d, x, s, t)
		{
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}
		function md5_gg(a, b, c, d, x, s, t)
		{
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}
		function md5_hh(a, b, c, d, x, s, t)
		{
			return md5_cmn(b ^ c ^ d, a, b, x, s, t);
		}
		function md5_ii(a, b, c, d, x, s, t)
		{
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		/*
		 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
		 * to work around bugs in some JS interpreters.
		 */
		function safe_add(x, y)
		{
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}

		/*
		 * Bitwise rotate a 32-bit number to the left.
		 */
		function bit_rol(num, cnt)
		{
			return (num << cnt) | (num >>> (32 - cnt));
		}
		return {
			hex_md5: hex_md5
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	var base = __webpack_require__( 3 )

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
		
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!!./hint.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!!./hint.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".hint{\n\twidth: 400px;\n\theight: 100px;\n\tposition: fixed;\n\ttop: 48%;\n\tleft: 50%;\n\tdisplay: none;\n\tmargin-left: -200px;\n\tmargin-top: -50px;\n\ttext-align: center;\n\tz-index: 200;\n}\n\n.hintContent{\n\tpadding: 20px;\n\tcolor: #fff;\n\tbackground: rgba( 0, 0, 0, .8 );\n}\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);