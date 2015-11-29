var jfp = (function () {
    'use strict';
    
    return function () {};
})();

(function (j) {
    'use strict';
    
    j.identity = function (val) {
        return val;
    };
    
    j.getType = function (val) {
        return Object.prototype.toString.call(val) === '[object Array]' ? 'array' : typeof val;
    };
    
    j.isType = function (type, val) {
        return j.getType(val) === 'array' && type === 'object' ? true : j.getType(val) === type;
    };
    
    j.isUndefined = function (val) {
        return j.isType('undefined', val);
    };
    
    j.isNull = function (val) {
        return val === null;
    };
    
    j.not = function (val) {
        return !val;
    };
    
    j.maybe = function (val) {
        var notNullable = j.isUndefined(arguments[1]) && Boolean(val);
        return j.isType(arguments[1], val) || notNullable ? val : null;
    };
    
    j.either = function (defaultVal, val) {
        return j.isNull(j.maybe(val, arguments[2])) ? defaultVal : val;
    };
    
    j.pick = function (key, obj) {
        var dereferenceable = !j.isNull(obj) && (j.isType('object', obj) || j.isType('array', obj)),
            pickedval = dereferenceable ? obj[key] : null;
        return j.isUndefined(pickedval) ? null : pickedval;
    };
    
    j.slice = function (start, userArray, end) {
        return Array.prototype.slice.call(userArray, start, end);
    };
    
    j.apply = function (userFn, args) {
        return userFn.apply(null, args);
    }
    
    j.partial = function (userFn) {
        return function (partialArgs) {
            return j.apply(partialArgs[0], partialArgs[1].concat(j.slice(1, arguments)));
        }.bind(null, [j.either(j.identity, userFn, 'function'), j.slice(1, arguments)]);
    };

    j.rpartial = function (userFn) {
        return function (partialArgs) {
            return j.apply(partialArgs[0], j.slice(1, arguments).concat(partialArgs[1]));
        }.bind(null, [j.either(j.identity, userFn, 'function'), j.slice(1, arguments)]);
    };
    
    j.splitPartial = function (userFn, left, right) {
        return j.apply(j.rpartial,
                      [j.apply(j.partial,
                              [j.either(j.identity, userFn, 'function')]
                                .concat(j.either([], left, 'array')))]
                                    .concat(j.either([], right, 'array')));
    };
    
})(jfp);

var j = jfp;

if(typeof module !== 'undefined' && module.exports) {
    module.exports = jfp;
}