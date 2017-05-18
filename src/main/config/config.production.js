define( [ 'angular' ],
        function(angular) {
           'use strict';

            var config = angular.module('config', []);

            /**
             * These are the AMD modules that every *application instance* should require prior to execution.
             * ngStart's src/main/main.js file should include the appropriate requirejs configuration to
             * facilitate the inclusion for objects stored in idiosyncratic locations.
             */
            config.standardRequireModules = [   'angular', 'ngAnimate', 'ui.bootstrap',
                                                'ngSanitize', 'ui.select', 'ngRoute', 'gettext', 'app',
                                                'LocalStorageModule'
                                                ];

            /**
             * These are the angular modules that every application module should require in order to execute.
             */
            config.standardAngularModules = [   'ngRoute', 'ngResource', 'gettext', 'LocalStorageModule',
                                                'config'    ];

            /**
             * Development or production
             */
            config.system = "production";

            /**
             * TMDB API
             */
            config.apiUrl = '//api.themoviedb.org/';
            config.apiKey = '802cd9bec58e75474a66bfa717fd1106';
            config.apiImg = '//image.tmdb.org/t/p/w500';

            //  set to true to load automatically angular-mocks via requireJS and add ngMockE2E to angular module dependencies,
            //  remember that you then have to mock every $http request made by angular
            config.useMock = false;

            /**
             * The URL to redirect to on logout
             * */
            config.loginPage = "/#/login";

            /**
             * The URL to treat as the "home" page
             */
            config.homePage = "/#/";

            /**
             *  The frequency (in seconds) to check strawboss for tasklist updates.
             */
            config.taskRefreshFrequency = 5;

            /**
            * The RoutingTable allows individual webserbices to be directed to specific endpoints.
            * To change the root path for constructing URLs against yarp, add a _default key as follows:
            *
            *     _default: { url: "alternate-base-path/"; }
            */
            /*	To force the use of the integration environment's backend stack, uncomment these lines and comment out the empty RoutingTable: */
            /*
            config.RoutingTable = {
                _default: { url: 'https://api.route105.net' }
            };
            */
            config.RoutingTable = {};

            /**
             * This is the default require configuration.  Note that putting this in the main configuration file means
             * that the location of non-"standard" (i.e., not in standardRequireModules above) can be maintained in
             * a single location without the need for synchronization across many applications.
             *
             * Also of significance: baseUrl MUST refer to root in order to support normalized pathing across all
             * sub-applications.  For applications outside of the root folder, add an 'app' entry to path referring
             * to the location of the correct app module.
             */
            config.requireConfiguration = {
                baseUrl: "/",
                paths: {
                    'angular': 'vendor/angular/angular.min',
                    'ngAnimate': 'vendor/angular-animate/angular-animate.min',
                    'ui.bootstrap': 'vendor/angular-bootstrap/ui-bootstrap-tpls.min',
                    'ui.select': 'vendor/angular-ui-select/dist/select',
                    'LocalStorageModule': 'vendor/angular-local-storage/dist/angular-local-storage.min',
                    'gettext': 'vendor/angular-gettext/dist/angular-gettext.min',
                    'angular-mocks': 'vendor/angular-mocks/angular-mocks',
                    'ngResource': 'vendor/angular-resource/angular-resource.min',
                    'ngRoute': 'vendor/angular-route/angular-route.min',
                    'ngSanitize': 'vendor/angular-sanitize/angular-sanitize.min'
                },
                shim: {
                    'angular': { deps: [], exports: 'angular' },
                    'ngAnimate': {deps: ['angular']},
                    'ui.bootstrap': {deps: ['angular']},
                    'ui.select': {deps: ['angular']},
                    'LocalStorageModule': {deps: ['angular']},
                    'gettext': {deps: ['angular']},
                    'angular-mocks': {deps: ['angular']},
                    'ngResource': {deps: ['angular']},
                    'ngRoute': {deps: ['angular']},
                    'ngSanitize': {deps: ['angular']}
                }
            };

            return config;
        } );
