module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                //banner: ';',
                separator: '\n',
                //footer: ';',
                process: function(src, filepath) {

                    var filename = filepath.replace(/^.*[\\\/]/, '').slice(0, -5);

                    return '// Source: ' + filename + '\n' +
                        //src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                        src;
                },
            },
            dist: {
                // the files to concatenate
                src: ['static/src/templates/**/*.html'],
                // the location of the resulting JS file
                dest: 'static/src/templates.js',
            }
        },
        jst: {
            compile: {
                files: {
                    "static/src/templates.js": ["static/src/templates/**/*.html"]
                }
            },
            options: {
                prettify: false
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jst');

    // grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('default', ['concat']);

};
