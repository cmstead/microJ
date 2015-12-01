var jfp = (function(){
    'use strict';
    
    function curryAlias(){
        var args = jfp.slice(0, arguments);

        args[0] = jfp.isType('string', args[0]) ? jfp[args[0]] : args[0];
        
        return jfp.apply(jfp.curry, args);
    }
    
    function pickAlias(key, val){
        var _key = key.slice(1);
        return jfp.isUndefined(val) ? jfp.partial(jfp.pick, _key) : jfp.pick(_key, val);
    }
    
    return function(){
        var args = jfp.slice(0, arguments),
            resolver = jfp.isType('string', args[0]) && args[0][0] === ':' ? pickAlias : curryAlias;
        
        return jfp.apply(resolver, args);
    };
    
})();

(function (j) {
    'use strict';
    
    j.equal = function (a, b) {
        return a === b;
    };
    
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
        return j.isType(arguments[1], val) || (j.isUndefined(arguments[1]) && Boolean(val)) ? val : null;
    };
    
    j.either = function (defaultVal, val) {
        return j.isNull(j.maybe(val, arguments[2])) ? defaultVal : val;
    };
    
    j.pick = function (key, obj) {
        var pickedval = !j.isNull(obj) && (j.isType('object', obj) || j.isType('array', obj)) ? obj[key] : null;
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
        return args.length < userFn.length ? j.apply(j.partial, [j.curry, userFn].concat(args)) : j.apply(userFn, args);
    };

    j.always = function (value) {
        return j.partial(j.identity, value);
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
	
	j.conj = function (value, list) {
		return j.either(j.cons(list), list, 'array').concat(j.cons(value));
	};
	
	j.reduce = function (userFn, list) {
		return j.isType('array', list) ? list.reduce.apply(list, j.cons(userFn, j.cons(arguments[2]))) : null;
	};
	
	j.map = function (userFn, list) {
		return j.either([], list, 'array').map(j.either(j.identity, userFn, 'function'));
	};
	
	j.filter = function (predicate, list) {
		return j.either([], list, 'array').filter(j.either(j.always(true), predicate, 'function'));
	};
    
    j.some = function (predicate, list) {
        return j.filter(predicate, list).length > 0;
    };
	
})(jfp);

(function (j) {
	'use strict';
	
	j.pluckKeys = function (keys, obj) {
		var _obj = j.either({}, obj, 'object');
		return j.reduce(function (state, key) {
							state[key] = _obj[key];
							return state;
						}, j.either([], keys, 'array'), {});
	};
	
	j.pluck = function (key, obj) {
		return j.pluckKeys([key], obj);
	}
	
	j.deref = function (key, obj) {
		return j.reduce(function (state, key) {
							return j.pick(key, state);
						}, j.either('', key, 'string').split('.'), obj);
	};
	
	j.getKeys = function (obj) {
		return Object.keys(j.either({}, obj, 'object'));
	};
	
	j.toValues = function (obj) {
		return j.reduce(function (state, key) {
							return j.conj(j.pick(key, obj), state);
						}, j.getKeys(obj), []);
	};
	
})(jfp);

(function (j) {
	'use strict';
	
    j.compose = function () {
        return j.reduce(function (f, g) {
            return function () {
                return j.either(j.identity, f, 'function')(j.apply(j.either(j.identity, g, 'function'),
                                                                j.slice(0, arguments)));
            }
        }, j.slice(0, arguments), j.identity);
    }
	
	j.pipeline = function (value){
        return j.apply(j.compose, j.slice(1, arguments).reverse())(value);
    }
	
})(jfp);

var j = jfp;

if(typeof module !== 'undefined' && module.exports) {
    module.exports = jfp;
}