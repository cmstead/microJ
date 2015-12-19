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