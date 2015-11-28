var cleanConfig = require('./grunt/clean.json'),
    concatConfig = require('./grunt/concat.json'),
    copyConfig = require('./grunt/copy.json'),
    eslintConfig = require('./grunt/eslint.json'),
    uglifyConfig = require('./grunt/uglify.json'),
    jasmine = require('./grunt/jasmine.json');

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: cleanConfig,
        concat: concatConfig,
        copy: copyConfig,
        eslint: eslintConfig,
        jasmine_nodejs: jasmine,
        uglify: uglifyConfig
    });

    /* Load grunt task adapters */

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');

    /* Register composite grunt tasks */

    grunt.registerTask('test', ['clean', 'eslint', 'concat', 'jasmine_nodejs']);
    grunt.registerTask('build', ['test', 'uglify', 'copy:nuget']);

    grunt.registerTask('default', ['build']);
};
