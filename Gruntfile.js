var cleanConfig = require('./grunt/clean.json'),
    concatConfig = require('./grunt/concat.json'),
    copyConfig = require('./grunt/copy.json'),
    eslintConfig = require('./grunt/eslint.json'),
    uglifyConfig = require('./grunt/uglify.json');

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: cleanConfig,
        concat: concatConfig,
        copy: copyConfig,
        eslint: eslintConfig,
        uglify: uglifyConfig
    });

    /* Load grunt task adapters */

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');

    /* Register composite grunt tasks */

    grunt.registerTask('test', ['clean', 'concat', 'eslint']);
    grunt.registerTask('build', ['uglify', 'copy:nuget']);

    grunt.registerTask('default', ['build']);
};
