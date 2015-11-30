var j = require('../dist/jfp.js');

describe('first', function () {
	
	it('should return the first value of an array', function () {
		expect(j.first([1, 2, 3, 4])).toBe(1);
	});
	
	it('should return null if first value does not exist', function () {
		expect(j.first([])).toBe(null);
	});
	
	it('should return null if argument is not a list', function () {
		expect(j.first('foo')).toBe(null);
	});
	
});

describe('last', function () {
	
	it('should return the last value of an array', function () {
		expect(j.last([1, 2, 3, 4])).toBe(4);
	});
	
	it('should return null if last value does not exist', function () {
		expect(j.last([])).toBe(null);
	});
	
	it('should return null if argument is not a list', function () {
		expect(j.last('foo')).toBe(null);
	});
	
});

describe('rest', function () {
	
	it('should return a slice of the array starting at index 1', function () {
		expect(JSON.stringify(j.rest([1, 2, 3, 4]))).toBe('[2,3,4]');
	});
	
	it('should return an empty array if array contains one element', function () {
		expect(JSON.stringify(j.rest([1]))).toBe('[]');
	});
	
	it('should return an empty array if argument is an empty array', function () {
		expect(JSON.stringify(j.rest([]))).toBe('[]');
	});
	
	it('should return an empty array if argument is not an array', function () {
		expect(JSON.stringify(j.rest('foo'))).toBe('[]');
	});
	
});

describe('dropLast', function () {
	
	it('should return a slice of the array dropping the last element', function () {
		expect(JSON.stringify(j.dropLast([1, 2, 3, 4]))).toBe('[1,2,3]');
	});
	
	it('should return an empty array if array contains one element', function () {
		expect(JSON.stringify(j.dropLast([1]))).toBe('[]');
	});
	
	it('should return an empty array if argument is an empty array', function () {
		expect(JSON.stringify(j.dropLast([]))).toBe('[]');
	});
	
	it('should return an empty array if argument is not an array', function () {
		expect(JSON.stringify(j.dropLast('foo'))).toBe('[]');
	});
	
});

describe('cons', function () {
	
	it('should return an array', function () {
		expect(j.getType(j.cons())).toBe('array');
	});
	
	it('should insert first argument into array', function () {
		expect(JSON.stringify(j.cons(1))).toBe('[1]');
	});
	
	it('should create new list from original list and first argument', function () {
		expect(JSON.stringify(j.cons(1, [2, 3, 4]))).toBe('[1,2,3,4]');
	});
	
	it('should create new list from two non-list arguments', function () {
		expect(JSON.stringify(j.cons(1, 2))).toBe('[1,2]');
	});
	
});

describe('conj', function () {
	
	it('should return an array', function () {
		expect(j.getType(j.conj())).toBe('array');
	});
	
	it('should insert first argument into array', function () {
		expect(JSON.stringify(j.conj(1))).toBe('[1]');
	});
	
	it('should create new list from original list and first argument', function () {
		expect(JSON.stringify(j.conj(1, [2, 3, 4]))).toBe('[2,3,4,1]');
	});
	
	it('should create new list from two non-list arguments', function () {
		expect(JSON.stringify(j.conj(1, 2))).toBe('[2,1]');
	});
	
});

describe('reduce', function () {
	
	function add (a, b) {
		return a + b;
	}
	
	it('should reduce using a reduction function', function () {
		expect(j.reduce(add, [1, 2, 3, 4])).toBe(10);
	});
	
	it('should reduce with an initial value', function () {
		expect(j.reduce(add, [1, 2, 3, 4], 5)).toBe(15);
	});
	
	it('should return null if list argument is not an array', function () {
		expect(j.reduce(add, 'foo')).toBe(null);
	});
	
});

describe('map', function () {
	
	function add3 (a) {
		return a + 3;
	}
	
	it('should apply the function to all elements of an array', function () {
		expect(JSON.stringify(j.map(add3, [1, 2, 3, 4]))).toBe('[4,5,6,7]');
	});
	
	it('should return an empty array if list argument is not an array', function () {
		expect(JSON.stringify(j.map(add3, 'foo'))).toBe('[]');
	});
	
	it('should return a copy of the original array if userFn argument is not a function', function () {
		expect(JSON.stringify(j.map('foo', [1, 2, 3, 4]))).toBe('[1,2,3,4]');
	});
	
});

describe('filter', function () {
	
	function isEven (value) {
		return value % 2 === 0;
	}
	
	it('should filter using provided function', function () {
		expect(JSON.stringify(j.filter(isEven, [1, 2, 3, 4]))).toBe('[2,4]');
	});
	
	it('should return an empty array if list argument is not an array', function () {
		expect(JSON.stringify(j.filter(isEven, 'foo'))).toBe('[]');
	});
	
	it('should return a copy of the original array if predicate argument is not a function', function () {
		expect(JSON.stringify(j.filter('foo', [1, 2, 3, 4]))).toBe('[1,2,3,4]');
	});
	
});
