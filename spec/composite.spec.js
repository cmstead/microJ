var j = require('../dist/jfp.js');

function add (a, b) {
	return a + b;
}

function multiply (a, b) {
	return a * b;
}

function isEven (value) {
	return value % 2 === 0;
}

describe('compose', function(){

	it('should return identity function if no function is passed', function(){
		expect(j.compose()).toBe(j.identity);
	});

	it('should call function passed into compose', function(){
		var spy = jasmine.createSpy('userFn');
		j.compose(spy)();
		expect(spy).toHaveBeenCalled();
	});

	it('should call two functions in serial', function(){
		var spy = jasmine.createSpy('userFn');

		function userFn(){
			return 'test';
		}

		j.compose(spy, userFn)();

		expect(spy).toHaveBeenCalledWith('test');
	});

	it('should return the result of the composed functions', function(){
		function add3(value){
			return value + 3;
		}

		expect(j.compose(add3, add3, add3)(5)).toBe(14);
	});

	it('should support complex compositions', function () {
		function compositeFn (data) {
			return j.compose(j.partial(j.reduce, add),
							 j('map', j('pick', 'value')),
							 j('filter', j.compose(isEven, j('pick', 'value'))))(data);
		}

		var testData = [
			{ value: 3 },
			{ value: 4 },
			{ value: 2 },
			{ value: 1 },
			{ value: 5 },
			{ value: 6 }
		],
		result = compositeFn(testData);
					
		expect(result).toBe(12);
	});

});

describe('pipeline', function(){

	it('should return passed value when no functions are passed', function(){
		expect(j.pipeline('foo')).toBe('foo');
	});

	it('should execute composed functions in left-right order', function(){
		var add5 = j.partial(add, 5),
			multiply2 = j.partial(multiply, 2),
			add2 = j.partial(add, 2);

		expect(j.pipeline(0, add5, multiply2, add2)).toBe(12)
	});

});