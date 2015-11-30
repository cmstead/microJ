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