var j = require('../dist/jfp.js');

describe('pluckKeys', function () {
	
	var obj;
	
	beforeEach(function () {
		obj = {
			foo: 1,
			bar: 2,
			baz: 3,
			quux: 4
		};
	});
	
	it('should return an object', function () {
		expect(j.getType(j.pluckKeys())).toBe('object');
	});
	
	it('should return an object contianing single key', function () {
		expect(JSON.stringify(j.pluckKeys(['foo'], obj))).toBe('{"foo":1}');
	});
	
	it('should return an object contianing multiple keys', function () {
		expect(JSON.stringify(j.pluckKeys(['foo', 'baz', 'quux'], obj))).toBe('{"foo":1,"baz":3,"quux":4}');
	});
	
	it('should return an empty object if keys argument is not an array', function () {
		expect(JSON.stringify(j.pluckKeys(null, obj))).toBe('{}');
	});
	
	it('should return an empty object if obj argument is not an object', function () {
		expect(JSON.stringify(j.pluckKeys(['foo'], null))).toBe('{}');
	});
	
});

describe('pluck', function () {
	
	var obj;
	
	beforeEach(function () {
		obj = {
			foo: 1,
			bar: 2,
			baz: 3,
			quux: 4
		};
	});

	it('should return an object', function () {
		expect(j.getType(j.pluck('foo', obj))).toBe('object');
	});
	
});

describe('deref', function () {
	
	var obj;
	
	beforeEach(function () {
		obj = {
			foo: {
				bar: [1, 2, 3, 4]
			}
		};
	});
	
	it('should return the value at a key', function () {
		expect(j.deref('foo', obj)).toBe(obj['foo']);
	});
	
	it('should return the value at a key', function () {
		expect(j.deref('foo.bar', obj)).toBe(obj['foo']['bar']);
	});
	
	it('should return the null if key is not a string', function () {
		expect(j.deref(null, obj)).toBe(null);
	});
	
	it('should return the null if obj is not an object', function () {
		expect(j.deref('foo', 'obj')).toBe(null);
	});
	
});

describe('getKeys', function () {
	
	var obj;
	
	beforeEach(function () {
		obj = {
			foo: 1,
			bar: 2,
			baz: 3,
			quux: 4
		};
	});
	
	it('should return an array of keys', function () {
		expect(JSON.stringify(j.getKeys(obj))).toBe('["foo","bar","baz","quux"]');
	});
	
	it('should return an empty array if argument is null', function () {
		expect(JSON.stringify(j.getKeys(null))).toBe('[]');
	});
	
	it('should return an empty array if argument is not an object', function () {
		expect(JSON.stringify(j.getKeys(''))).toBe('[]');
	});
	
});

describe('toValues', function () {
	
	var obj;
	
	beforeEach(function () {
		obj = {
			foo: 1,
			bar: 2,
			baz: 3,
			quux: 4
		};
	});
	
	it('should return object values in an array', function () {
		expect(JSON.stringify(j.toValues(obj))).toBe('[1,2,3,4]');
	});
	
	it('should return empty array if argument is not an object', function () {
		expect(JSON.stringify(j.toValues(null))).toBe('[]');
	});
	
});