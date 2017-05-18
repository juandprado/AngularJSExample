/*global module: true */
module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nggettext_extract: {
            pot: {
                files: {
                    'po/template.pot': ['<%=pkg.folders.jsSource %>/**/*.html',
                                        '<%=pkg.folders.jsSource %>/*.js' ]
                }
            },
        },
        nggettext_compile: {
            all: {
                options: {
                    module: 'app'
                },
                files: {
                    'src/main/translations.js': ['po/*.po']
                }
            },
        }
    });
    grunt.registerTask("install", "Create a deployable artifact for production servers",
        function (system) {
            grunt.task.run("nggettext_extract");
            grunt.task.run("nggettext_compile");
        }
    );
    //call grunt.loadNpmTasks for all dependencies in package.json which names start with "grunt-"
    require('load-grunt-tasks')(grunt);
};
