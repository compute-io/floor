/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	floor = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array floor', function tests() {

	it( 'should export a function', function test() {
		expect( floor ).to.be.a( 'function' );
	});

	it( 'should evaluate the floor function', function test() {
		var data, actual, expected;

		data = new Float64Array([
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
		]);
		actual = new Float64Array( data.length );

		actual = floor( actual, data );

		expected = new Float64Array([
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
		]);

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( floor( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
