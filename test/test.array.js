/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	floor = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array floor', function tests() {

	it( 'should export a function', function test() {
		expect( floor ).to.be.a( 'function' );
	});

	it( 'should evaluate the floor function', function test() {
		var data, actual, expected;
		
		data = [
			-9.4,
			-4.1,
			-2.9,
			-0.5,
			0,
			0.3,
			2,
			3.9,
			4.2,
			5.1
		];
		actual = new Array( data.length );

		actual = floor( actual, data );

		expected = [
			-10,
			-5,
			-3,
			-1,
			0,
			0,
			2,
			3,
			4,
			5
		];

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( floor( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = floor( actual, data );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
