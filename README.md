floor
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes element-wise the largest integer less than or equal to a numeric value

The [floor function](https://en.wikipedia.org/wiki/Floor_and_ceiling_functions) is defined as

<div class="equation" align="center" data-raw-text="
    \operatorname{floor}(x) =\lfloor x \rfloor=\max\, \{m\in\mathbb{Z}\mid m\le x\}" data-equation="eq:floor_function">
	<img src="" alt="Equation of the floor function.">
	<br>
</div>


## Installation

``` bash
$ npm install compute-floor
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var floor = require( 'compute-floor' );
```


#### floor( x[, options] )

Evaluates the [floor function](https://en.wikipedia.org/wiki/Floor_and_ceiling_functions) (element-wise). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). Values may include `NaN`, `+infinity`, and `-infinity`.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = floor( 2.3 );
// returns 2

out = floor( -1.4 );
// returns -2

out = floor( [ -10.3, -1.2, 0, 1, 10.9 ] );
// returns [ -11, -2, 0, 1, 11 ]

data = [ 0.3, 1.9, 2.3 ];
out = floor( data );
// returns [ 0, 1, 2 ]

data = new Int8Array( data );
out = floor( data );
// returns Float64Array( [ 0, 1, 2 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = floor( mat );
/*
	[ 0 0
      1 1
      2 2 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', -5.3],
	['boop', -1.4],
	['bip', 0.8],
	['bap', 1.4],
	['baz', 10.5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = floor( data, {
	'accessor': getValue
});
// returns [ -6, -2, 0, 1, 10 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,-5.3]},
	{'x':[1,-1.4]},
	{'x':[2,0.8]},
	{'x':[3,1.4]},
	{'x':[4,10.5]}
];

var out = floor( data, 'x|1', '|' );
/*
	[
		{'x':[0,-6]},
		{'x':[1,-2]},
		{'x':[2,0]},
		{'x':[3,1]},
		{'x':[4,10]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `int32` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Float32Array( [0.2, 1.4, 2.9] );

out = floor( data, {
	'dtype': 'int16'
});
// returns Int16Array( [0,1,2] )

// Works for plain arrays, as well...
out = floor( [0.2, 1.4, 2.9], {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,1,2] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ -5.3, -1.4, 0.8, 1.4, 10.5 ];

var out = floor( data, {
	'copy': false
});
// returns [ -6, -2, 0, 1, 10 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = floor( mat, {
	'copy': false
});
/*
	[ 0 0
      1 1
      2 2 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [error function](http://en.wikipedia.org/wiki/Error_function) is `NaN`.

	``` javascript
	var data, out;

	out = floor( null );
	// returns NaN

	out = floor( true );
	// returns NaN

	out = floor( {'a':'b'} );
	// returns NaN

	out = floor( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = floor( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = floor( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = floor( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	floor = require( 'compute-floor' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 20 - 10;
}
out = floor( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = floor( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = floor( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 20 - 10;
}
tmp = floor( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = floor( mat );


// Matrices (custom output data type)...
out = floor( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-floor.svg
[npm-url]: https://npmjs.org/package/compute-floor

[travis-image]: http://img.shields.io/travis/compute-io/floor/master.svg
[travis-url]: https://travis-ci.org/compute-io/floor

[coveralls-image]: https://img.shields.io/coveralls/compute-io/floor/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/floor?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/floor.svg
[dependencies-url]: https://david-dm.org/compute-io/floor

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/floor.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/floor

[github-issues-image]: http://img.shields.io/github/issues/compute-io/floor.svg
[github-issues-url]: https://github.com/compute-io/floor/issues
