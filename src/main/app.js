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
         'tmdb/partials/movieTile/MovieTileController',
         'tmdb/services/TMDBAPIService', 'tmdb/directives/movieDetailTwo', 'tmdb/directives/movieTile'], 
    function( angular, config, $resource, $location, LocalStorageModule, 
              HomeController, MovieDetailTwoController, MovieTileController, TMDBAPIService, movieDetailTwoDirective,
              movieTileDirective ) {
    	"use strict";

        /** @constructs app */
        var angularModules = config.standardAngularModules.concat( 'LocalStorageModule' );

        /** @constructs app */
        var app = angular.module("app", angularModules );

        //  Configure $locationProvider and $routeProvider to allow top-level navigation within this route
    	app.config(['$locationProvider', function($locationProvider) {
                            
            $locationProvider.html5Mode(false);
            
    	}]);

        app.service("TMDBAPIService", TMDBAPIService);

        app.controller( "HomeController", HomeController );

        app.controller( "MovieDetailTwoController", MovieDetailTwoController );

        app.controller( "MovieTileController", MovieTileController );

        app.directive( "movieDetailTwo", movieDetailTwoDirective );

        app.directive( "movieTile", movieTileDirective );


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