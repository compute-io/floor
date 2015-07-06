'use strict';

// MODULES //

var FLOOR = require( './number.js' );


// FLOOR FUNCTION //

/**
* FUNCTION: floor( out, matrix )
*	Evaluates the floor function for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function floor( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'floor()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = FLOOR( x.data[ i ] );
	}
	return y;
} // end FUNCTION floor()


// EXPORTS //

module.exports = floor;
