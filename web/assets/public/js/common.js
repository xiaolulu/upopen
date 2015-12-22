
require.config({

	paths: {
		hint: '/assets/widget/hint/hint',
		doc: '/assets/public/js/zh',
		md5: '/assets/core/js/md5',
		base: '/assets/core/js/base',
		validate: '/assets/widget/validate/validate',
		event: '/assets/core/js/event'
	}
	
});

define( [ 'hint', 'doc', 'md5', 'validate', 'base', 'event' ],  function( hint, DOC, MD5, Validate, Base, Event ){
	
	//$.ajaxSetup( { cache: false } );

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


});

