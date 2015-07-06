/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	floor = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number floor', function tests() {

	it( 'should export a function', function test() {
		expect( floor ).to.be.a( 'function' );
	});

	it( 'should evaluate the floor function', function test() {
		assert.strictEqual( floor( 9.5 ), 9 );
		assert.strictEqual( floor( -3.1 ), -4 );
		assert.strictEqual( floor( 4.7 ), 4 );
		assert.strictEqual( floor( 12.2 ), 12 );
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = floor( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( floor( 1.5 ) );
	});

});
