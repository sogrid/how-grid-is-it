module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('assemble');

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        assemble: {
            options: {
                assets: '<%= connect.site.options.base %>/assets',
                data: ['bower.json', 'src/data/*.json'],
                helpers: 'src/templates/helpers/helper-*.js',
                layoutdir: 'src/templates/layouts',
                partials: 'src/templates/partials/*.hbs',
                layout: 'default.hbs',
                language: grunt.option('language') || 'en',
                flatten: true
            },
            index: {
                files: {
                    '<%= connect.site.options.base %>/': ['src/templates/pages/*.hbs']
                }
            }
        },
        autoprefixer: {

            dist: {
                expand: true,
                flatten: true,
                src: '.grunt/css/*.css',
                dest: 'dist/css/'
            },
            site: {
                expand: true,
                flatten: true,
                src: '.grunt/css/*.css',
                dest: '<%= assemble.options.assets %>/css/'
            }
        },
        clean: {
            temp: ['.grunt'],
            dist: ['dist']
        },
        connect: {
            options: {
                hostname: grunt.option('connect-hostname') || 'localhost',
                port: 9000
            },
            site: {
                options: {
                    base: '.grunt/assemble/<%= pkg.name %>',
                    livereload: true,
                    open: true
                }
            }
        },
        copy: {
            assets: {
                files: [{
                    expand: true,
                    cwd: 'src/assets',
                    src: ['**/*'],
                    dest: '<%= connect.site.options.base %>/assets/',
                    filter: 'isFile'
                }]
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc',
                formatters: [
                    { id: 'junit-xml', dest: '.grunt/report/csslint_junit.xml'},
                    { id: 'csslint-xml', dest: '.grunt/report/csslint.xml'}
                ]
            },
            site: {
                src: ['<%= autoprefixer.site.dest %>*.css']
            },
            dist: {
                src: ['<%= autoprefixer.dist.dest %>*.css']
            }
        },
        'gh-pages': {
            options: {
                base: '<%= connect.site.options.base %>'
            },
            src: '**/*'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            configurations: ['Gruntfile.js','bower.json','package.json'],
            sources: {
                options: { jshintrc: '.jshintrc' },
                files: {
                    src: ['src/js/**/*.js']
                }
            }
        },
        less: {
            files: {
                expand: true,
                cwd: 'src/less',
                src: ['*.less'],
                dest: '.grunt/css/',
                ext: '.css'
            }
        },
        release: {
            options: {
                file: 'bower.json'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            asset: {
                files: ['src/assets/**/*'],
                tasks: ['copy:assets']
            },
            json: {
                files: ['src/data/**/*'],
                tasks: ['jshint', 'assemble']
            },
            less: {
                files: 'src/less/**/*.less',
                tasks: ['less', 'autoprefixer:site', 'csslint:site']
            },
            template: {
                files: 'src/templates/**/*.hbs',
                tasks: ['assemble']
            }
        }
    });

    grunt.registerTask('default', [ 'test' ]);
    grunt.registerTask('test', ['clean', 'jshint', 'less', 'autoprefixer', 'csslint']);
    grunt.registerTask('build', ['clean', 'jshint', 'less', 'autoprefixer:dist', 'csslint:dist']);
    grunt.registerTask('site', ['clean', 'jshint', 'less', 'autoprefixer:site', 'csslint:site', 'assemble', 'copy:assets']);
    grunt.registerTask('deploy', ['site', 'gh-pages']);
    grunt.registerTask('live', ['site', 'connect:site', 'watch']);
};