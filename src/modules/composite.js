(function (j) {
	'use strict';
	
	function compositor(f, g){
        var _f = j.either(j.identity, f, 'function'),
            _g = j.either(j.identity, g, 'function');
            
        return function () {
            return _f(j.apply(_g, j.slice(0, arguments)));
        }
    }

    j.compose = function () {
        return j.reduce(compositor, j.slice(0, arguments), j.identity);
    }
	
	j.pipeline = function (value){
        return j.apply(j.compose, j.slice(1, arguments).reverse())(value);
    }
	
})(jfp);