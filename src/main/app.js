/**
 * Creates the application root for an angular application at uri (/)
 *
 * @module app
 * 
 * @requires config/config
 * @requires ngRoute
 * @requires ngResource
 * @requires LocalStorageModule
 *
 * @param angular RequireJS inclusion of AngularJS library
 * @param config RequireJS inclusion of config/config
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the app
 *
 * @copyright Alert Logic, Inc 2014
 */

define([ 'angular',
         'config/config',
         'ngRoute', 'ngResource', 'LocalStorageModule',
         'tmdb/partials/home/HomeController', 'tmdb/partials/movieDetailTwo/MovieDetailTwoController', 
         'tmdb/partials/movieTile/MovieTileController', 'tmdb/partials/trailer/TrailerController',
         'tmdb/services/TMDBAPIService', 'tmdb/services/YTAPIService', 'tmdb/directives/movieDetailTwo', 'tmdb/directives/movieTile', 'tmdb/directives/trailer'], 
    function( angular, config, $resource, $location, LocalStorageModule, 
              HomeController, MovieDetailTwoController, MovieTileController, TrailerController, TMDBAPIService, YTAPIService, movieDetailTwoDirective,
              movieTileDirective, trailerDirective ) {
    	"use strict";

        /** @constructs app */
        var angularModules = config.standardAngularModules.concat( 'LocalStorageModule' );

        /** @constructs app */
        var app = angular.module("app", angularModules );

        //  Configure $locationProvider and $routeProvider to allow top-level navigation within this route
    	app.config(['$locationProvider', function($locationProvider) {
                            
            $locationProvider.html5Mode(false);
            
    	}]);

        app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
           $sceDelegateProvider.resourceUrlWhitelist([
               // Allow same origin resource loads.
               'self',
               // Allow loading from our assets domain.
              // Notice the difference between * and **.
               'https://www.youtube.com/**'
           ]);
        }]);

        app.service("TMDBAPIService", TMDBAPIService);

        app.service("YTAPIService", YTAPIService);

        app.controller( "HomeController", HomeController );

        app.controller( "MovieDetailTwoController", MovieDetailTwoController );

        app.controller( "MovieTileController", MovieTileController );

        app.controller( "TrailerController", TrailerController );

        app.directive( "movieDetailTwo", movieDetailTwoDirective );

        app.directive( "movieTile", movieTileDirective );

        app.directive( "trailer", trailerDirective );


        app.config(['$routeProvider', function($routeProvider) {
            $routeProvider.when( '/', { templateUrl: '/tmdb/partials/home/home.html', controller: 'HomeController' } );
            $routeProvider.when( '/movie/:id', { templateUrl: '/tmdb/partials/movieDetailTwo/movieDetailTwo.html', controller: 'MovieDetailTwoController' } );
            $routeProvider.otherwise( {
                template: function() {
                    throw 'An internal error occurred because the given path does not resolve to a known route.';
                }
            });
        }]);

    	return app;
    }
);