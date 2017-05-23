/**
 * Abstraction for the tmdb.org API.
 *
 * @module tmdb.services.TMDBAPIService
 *
 * @requires angular
 * @requires ngRoute
 * @requires ngResource
 * @requires LocalStorageModule
 * @requires config/config
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns Wrapper for several TMDB API's
 *
 */

define( [ 'angular', 
          'ngRoute',
          'ngResource',
          'LocalStorageModule',
          'config/config' ], 
    function ( angular ) {
        "use strict";

        var TMDBAPIService = function ( $rootScope, $http, $timeout, $resource, localStorageService, $location ) {

            this.ServiceCache = [];

            /* http://docs.themoviedb.apiary.io/reference/discover */
            /*
             * We support very little of this API, it has many many options.
             */
            this.Discover = function () {
                return this.GetCachedService( "discover", function () {
                    var serviceVersion = "3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "discover" );

                    /* http://docs.themoviedb.apiary.io/reference/discover/discovermovie */
                    var movieList = function ( sortBy, page, includeAdult ) {
                        if ( sortBy === undefined ) {
                            sortBy = 'popularity.desc';
                        }
                        if ( page === undefined ) {
                            page = 1;
                        }
                        if ( includeAdult === undefined ) {
                            includeAdult = 'false';
                        }
                        var uri = serviceBase.url + '/movie/now_playing?page=' + page + '&include_adult=' + includeAdult + '&sort_by=' + sortBy + '&api_key=' + serviceBase.apiKey;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/discover/discovertv */
                    var televisionList = function ( sortBy, page ) {
                        if ( sortBy === undefined ) {
                            sortBy = 'popularity.desc';
                        }
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/discover/tv?page=' + page + '&sort_by=' + sortBy + '&api_key=' + serviceBase.apiKey;
                        return $http.get( uri );
                    };

                    return {
                        discover: {
                            movies: movieList,
                            tv: televisionList
                        }
                    };


                });
            };
            this.GetCachedService = function( serviceName, instantiateFunction ) {

                if ( this.ServiceCache[serviceName] !== undefined ) {
                    return this.ServiceCache[serviceName];
                }

                if ( instantiateFunction ) {
                    var serviceInstance = instantiateFunction.call( this );
                    if ( serviceInstance !== undefined ) {
                        this.ServiceCache[serviceName] = serviceInstance;
                        return serviceInstance;
                    }
                }

                return undefined;
            };

            this._normalizeEndpoint = function( version ) {
                var config = angular.module("config");

                return {'url': config.apiUrl + version,
                        'apiKey': config.apiKey};
            };
        };

        TMDBAPIService.$inject = [ '$rootScope', '$http', '$timeout', '$resource', 'localStorageService', '$location' ];

        return TMDBAPIService;
}
);