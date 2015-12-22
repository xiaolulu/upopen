

var hint = require( '../../widget/hint/hint.js' ),
	DOC = require( './zh.js' );

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

