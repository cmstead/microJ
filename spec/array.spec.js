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
	
});