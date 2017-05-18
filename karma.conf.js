/*global module: true */
module.exports = function (config) {
    "use strict";
    config.set({
        basePath: '.',

        files: [
            'src/main/vendor/jquery/dist/jquery.min.js',
            'src/main/vendor/angular/angular.js',
            {pattern: 'src/main/mocks/data/**/*.json', included: false, watched: true, served: true },
            {pattern: 'src/main/**/*.js', included: false, served: true },
            {pattern: 'src/test/main-test.js', included: true },                                        /*  set up require framework and specify which tests to run */
            {pattern: 'src/test/**/*.js', included: false, served: true }                               /*  allow access to test configurations */
        ],

        autoWatch: false,

        colors: false,

        logLevel: config.LOG_WARN,

        frameworks: ['jasmine', 'requirejs'],

        browsers: ['PhantomJS'],

        reporters: ['progress', 'coverage', 'junit'],

        preprocessors: {
            'src/main/tmdb/**/*.js': 'coverage',
        },

        coverageReporter: {
            reporters: [
                {type: 'html', dir: 'src/main/coverage', subdir: 'PhantomJS' },
                {type: 'cobertura', dir: 'coverage', subdir: 'PhantomJS' }
            ]
        },

        junitReporter: {
            outputFile: 'src/main/integration/junit/unit-tests.xml',
            outputDir: 'src/main/integration/junit/',
            suite: ''
        },

        plugins: [
            'karma-requirejs',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-junit-reporter'
        ]

    });
};
