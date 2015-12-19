(function (j) {
    'use strict';
    
    j.compose = function () {
        return j.reduce(function (f, g) {
            return function () {
                return j.either(j.identity, f, 'function')(j.apply(j.either(j.identity, g, 'function'),
                                                                j.slice(0, arguments)));
            };
        }, j.slice(0, arguments), j.identity);
    };
    
    j.pipeline = function (value){
        return j.apply(j.compose, j.slice(1, arguments).reverse())(value);
    };
    
})(jfp);