var j = require('../dist/jfp.js');

describe('getType', function () {
    
    it('should return "undefined" when no value is provided', function () {
        expect(j.getType()).toBe('undefined');
    });
    
    it('should return type for provided value', function () {
        expect(j.getType('foo')).toBe('string');
    });

    it('should return array type', function () {
        expect(j.getType([])).toBe('array');
    });

});

describe('isType', function () {
    
    it('should return false if value does not match type', function () {
        expect(j.isType('string', 99)).toBe(false);
    });
    
    it('should return true if value matches type', function () {
        expect(j.isType('string', 'foo')).toBe(true);
    });
    
    it('should return true if testing for object and array provided', function () {
        expect(j.isType('object', [])).toBe(true);
    });
    
});

describe('isUndefined', function () {
    
    it('should return true if value is undefined', function () {
        expect(j.isUndefined(undefined)).toBe(true);
    });
    
    it('should return false if value is not undefined', function () {
        expect(j.isUndefined('foo')).toBe(false);
    });
    
});

describe('isNull', function () {
    
    it('should return true if value is null', function () {
        expect(j.isNull(null)).toBe(true);
    });
    
    it('should return false if value is not null', function () {
        expect(j.isNull('foo')).toBe(false);
    });
    
});

describe('maybe', function () {
    
    it('should return null if value is falsey', function () {
        expect(j.maybe(false)).toBe(null);
    });
    
    it('should return passed value if it is not falsey', function () {
        expect(j.maybe('foo')).toBe('foo');
    });
    
    it('should return null if it does not match optional type string', function () {
        expect(j.maybe('foo', 'boolean')).toBe(null);
    });
    
    it('should return value if it matches optional type string', function () {
        expect(j.maybe('foo', 'string')).toBe('foo');
    });
    
    it('should return falsey value if it matches optional type string', function () {
        expect(j.maybe(0, 'number')).toBe(0);
    });
    
});

describe('either', function () {
    
    it('should return value if it is not falsey', function () {
        expect(j.either('foo', 'bar')).toBe('bar');
    });
    
    it('should return falsey value if it matches optional type string', function () {
        expect(j.either(5, 0, 'number')).toBe(0);
    });
    
    it('should return default value if test value is falsey', function () {
        expect(j.either(5, 0)).toBe(5);
    });
    
    it('should return default value if test value does not match optional type string', function () {
        expect(j.either('foo', true, 'string')).toBe('foo');
    });
    
});

describe('pick', function () {
    
    it('should return null if reference does not exist', function () {
        expect(j.pick('foo', {})).toBe(null);
    });
    
    it('should return dereferenced value', function () {
        expect(j.pick(0, ['bar'])).toBe('bar');
    });
    
    it('should return null if value is not dereferenceable', function () {
        expect(j.pick('foo', null)).toBe(null);
    });
    
});

describe('identity', function () {
    
    it('should return value argument', function () {
        expect(j.identity('foo')).toBe('foo');
    });
    
});

describe('slice', function () {
    
    it('should return an array', function () {
        expect(j.getType(j.slice(0, []))).toBe('array');
    });
    
    it('should slice an array starting at an index', function () {
        var result = j.slice(1, [1, 2, 3, 4]);
        expect(JSON.stringify(result)).toBe('[2,3,4]');
    });
    
    it('should slice an array ending at a count index', function () {
        var result = j.slice(1, [1, 2, 3, 4], 3);
        expect(JSON.stringify(result)).toBe('[2,3]');
    });
    
});

describe('apply', function () {
    
    it('should apply passed function', function () {
        var spy = jasmine.createSpy('spy');
        j.apply(spy);
        expect(spy).toHaveBeenCalled();
    });
    
    it('should apply passed function with argument array', function () {
        var spy = jasmine.createSpy('spy');
        j.apply(spy, [1, 2, 3, 4]);
        expect(spy).toHaveBeenCalledWith(1, 2, 3, 4);
    });
    
});

describe('partial', function () {
    
    it('should return a function', function () {
        expect(typeof j.partial()).toBe('function');
    });
    
    it('should return a partially applied function', function () {
        var spy = jasmine.createSpy('spy');
        j.partial(spy, 'foo')()
        
        expect(spy).toHaveBeenCalledWith('foo');
    });
    
    it('should return a partially applied function with multiple arguments', function () {
        var spy = jasmine.createSpy('spy');
        j.partial(spy, 1, 2, 3)();
        
        expect(spy).toHaveBeenCalledWith(1, 2, 3);
    });
    
    it('should return a partially applied function with multiple arguments and new args', function () {
        var spy = jasmine.createSpy('spy');
        j.partial(spy, 1, 2, 3)(4, 5);
        
        expect(spy).toHaveBeenCalledWith(1, 2, 3, 4, 5);
    });
    
});

describe('rpartial', function () {
    
    it('should return a function', function () {
        expect(j.getType(j.rpartial())).toBe('function');
    });
    
    it('should apply arguments to a function', function () {
        var spy = jasmine.createSpy('spy');
        j.rpartial(spy, 'foo')();
        
        expect(spy).toHaveBeenCalledWith('foo');
    });
    
    it('should apply arguments in correct order', function () {
        var spy = jasmine.createSpy('spy');
        j.rpartial(spy, 1, 2)(3, 4);
        
        expect(spy).toHaveBeenCalledWith(3, 4, 1, 2);
    });
    
});

describe('not', function () {
    
    it('should return false when true is passed', function () {
        expect(j.not(true)).toBe(false);
    });
    
    it('should return true when false is passed', function () {
        expect(j.not(false)).toBe(true);
    });
    
});

describe('curry', function () {
    
    it('should return a curried function', function () {
        expect(j.curry(j.identity)(5)).toBe(5);
    });
    
    it('should execute the function if all arguments are satisfied', function () {
        expect(j.curry(j.identity, 5)).toBe(5);
    });
    
    it('should partially apply some arguments', function () {
        expect(j.curry(function (a, b){ return a * b; }, 3)(7)).toBe(21);
    });
    
});

describe('equal', function () {
    
    it('should return true if the two values are equal', function () {
        expect(j.equal('foo', 'foo')).toBe(true);
    });
    
    it('should return false if the two values are not equal', function () {
        expect(j.equal('foo', 'bar')).toBe(false);
    });
    
});