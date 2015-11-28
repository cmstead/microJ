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