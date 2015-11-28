var jfp = (function () {
    'use strict';
    
    return function () {};
})();

(function (j) {
    'use strict';
    
    j.getType = function getType (value) {
        return Object.prototype.toString.call(value) === '[object Array]' ? 'array' : typeof value;
    };
    
    j.isType = function isType (type, value) {
        return j.getType(value) === type;
    };
    
    j.isUndefined = function isUndefined (value) {
        return j.isType('undefined', value);
    };
    
    j.isNull = function isNull (value) {
        return value === null;
    };
    
    j.maybe = function maybe (value) {
        var notNullable = j.isUndefined(arguments[1]) && Boolean(value);
        return j.isType(arguments[1], value) || notNullable ? value : null;
    };
    
    j.either = function either (defaultValue, value) {
        return j.isNull(j.maybe(value, arguments[2])) ? defaultValue : value;
    };
    
    j.pick = function pick (key, obj) {
        var dereferenceable = !j.isNull(obj) && (j.isType('object', obj) || j.isType('array', obj)),
            pickedValue = dereferenceable ? obj[key] : null;
        return j.isUndefined(pickedValue) ? null : pickedValue;
    }
    
})(jfp);

var j = jfp;

if(typeof module !== 'undefined' && module.exports) {
    module.exports = jfp;
}