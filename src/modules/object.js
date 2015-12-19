/* global jfp */

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
    };
    
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