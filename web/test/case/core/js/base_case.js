
define(['assets/core/js/base'], function( Base ){

	describe( 'checking String.trim', function(){
		
		it( '\' str \' will be equal \'str\' ', function(){
			expect( ' str '.trim() ).toEqual( 'str' );
		});

	});

	describe( 'checking isArray', function(){
		
		it( ' [] will be equal true ', function(){
			expect( Base.isArray([]) ).toEqual( true );
		});

		it( ' {} will be equal false ', function(){
			expect( Base.isArray({}) ).toEqual( false );
		});

	});

	describe( 'checking apply', function(){
		
		it( 'apply', function(){
			var objA = {
					name: 'xiao',
					height: 174		
				},
				objB = {
					name: 'lulu',
					weight: 162,
					sex: 'miss'
				},
				objC = {
					name: 'nana',
					education: 'undergraduate'
				},
				obj = Base.apply( objA, objB, objC );
			obj.should.have.property( 'name', 'nana' );
			obj.should.have.property( 'height', 174 );
			obj.should.have.property( 'weight', 162 );
			obj.should.have.property( 'sex', 'miss' );
			obj.should.have.property( 'education', 'undergraduate' );
		});

	});

	describe( 'checking searchHref', function(){
		
		it( 'searchHref', function(){
			var location = 'id=account;name=upopen',
				id = 'id';
			expect( Base.searchHref( location, id ) ).toEqual( 'account' );
		});

	});

	

});
