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