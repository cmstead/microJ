var exec = require('child_process').exec,
    test = require('./run-tests');

console.log('Preparing for testing')
exec('grunt test', function (err, output) {
    console.log(output);
    
    if(!err) {
        test();
    } else {
        console.log('Testing Halted')
    }
});