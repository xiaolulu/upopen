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
					React.createElement("pre", {refs: "result"})
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
			params: '{"":""}'
		},

		getInitialState: function(){
		
			return {data:[{
					id: '',
					name: '',
					kind: '0',
					description: '',
					url: '',
					method: 'POST',
					params: '{"":""}'
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
					if( ret.code === 0 ){
						if( index ){
							this.state.data.splice( index, 1, data )
						} else {
							this.state.data.splice( index+1, 0, data )
						}
						
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
					//me.result.html( JSON.stringify( ret, null, 8 ) );
					console.log( ret );
				},
				error: function( e ){
					console.log( e )
				},
				failed: function( e ){
					console.log( e )
				}
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
		DOC = __webpack_require__( 4 );

	var singIn = true,
		username = $( '#username' ),
		password = $( '#password' )

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
		if( this.value ){
			forUsername.addClass( 'hide' );
		} else {
			forUsername.removeClass( 'hide' );
		}
		forUsername.removeClass( 'holderOn' ).addClass( 'holderOff' );
	}).on( 'focus', function(){
		forUsername.addClass( 'holderOn' ).removeClass( 'holderOff' );
		username.get( 0 ).focus();
	});

	forPassword.on( 'click', function(){
		forPassword.addClass( 'holderOn' );
		password.get( 0 ).focus();
	});

	password.on( 'blur', function(){
		if( this.value ){
			forPassword.addClass( 'hide' );
		} else {
			forPassword.removeClass( 'hide' );
		}
		forPassword.removeClass( 'holderOn' ).addClass( 'holderOff' );
	}).on( 'focus', function(){
		forPassword.addClass( 'holderOn' ).removeClass( 'holderOff' );
		password.get( 0 ).focus();
	});

	$( '.signInForm' ).on( 'submit', function(){

		var data = {
				username: username.val(),
				password: password.val()
			},
			_singIn = singIn;
		$.ajax({
			url: _singIn ? '/user/login' : '/user/register',
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

		return {
			extend: extend,
			apply: apply,
			isArray: isArray
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




/***/ }
/******/ ]);