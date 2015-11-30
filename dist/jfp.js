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
    
    j.slice = function (start, list) {
        return Array.prototype.slice.call(list, start, arguments[2]);
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
    
    j.curry = function (userFn) {
        var args = j.slice(1, arguments);
        return args.length < userFn.length ? j.apply(j.partial, [userFn].concat(args)) : j.apply(userFn, args);
    };
    
    j.equal = function (a, b) {
        return a === b;
    };
    
})(jfp);

(function (j) {
	'use strict';
	
	j.first = j.partial(j.pick, 0);
	
	j.last = function (list) {
		return j.pick(list.length - 1, list);
	};
	
	j.rest = function (list) {
		return j.either([], list, 'array').slice(1);
	};
	
	j.dropLast = function (list) {
		var _list = j.either([], list, 'array');
		return j.slice(0, _list, _list.length - 1);
	};
	
	j.cons = function (value, list) {
		return j.isUndefined(value) ? [] : [value].concat(j.either(j.cons(list), list, 'array'));
	};
	
	j.reduce = function (userFn, list) {
		return Array.prototype.reduce.apply(list, j.cons(userFn, arguments[2]));
	}
	
})(jfp);

var j = jfp;

if(typeof module !== 'undefined' && module.exports) {
    module.exports = jfp;
}