module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            dist: ['dist']
        },
        copy: {
            main: {
                files: [{
                        expand: true,
                        cwd: 'src',
                        src: ['less/loop.less'],
                        dest: 'dist/',
                        filter: 'isFile'
                    }]
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                src: ['dist/css/*.css']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: ['Gruntfile.js']
        },
        less: {
            options: {
                strictMath: true,
                strictUnits: true
            },
            specimen: {
                files: [
                    {'dist/css/specimen.css': 'src/less/specimen/*.less'}
                ]
            }
        },
        release: {
            options: {
                file: 'bower.json'
            }
        },
        watch: {
            less: {
                files: 'src/less/**/*.less',
                tasks: ['less', 'csslint']
            }
        }
    });

    grunt.registerTask('default', ['build']);
    grunt.registerTask('test', ['jshint', 'csslint']);
    grunt.registerTask('build', ['clean', 'less', 'test', 'copy']);
};
