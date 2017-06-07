/**
 * Abstraction for the Youtube v3 API.
 *
 * @module yt.services.YTAPIService
 *
 * @requires angular
 * @requires ngRoute
 * @requires ngResource
 * @requires LocalStorageModule
 * @requires config/config
 *
 * @author Juan Diego Prado <juandipra@hotmail.com>
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

        var YTAPIService = function ( $rootScope, $http, $timeout, $resource, localStorageService, $location ) {

            this.ServiceCache = [];


            /* http://docs.themoviedb.apiary.io/reference/movies */
            this.Video = function () {
                return this.GetCachedService( "video", function () {
                    var serviceVersion = "v3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "video" );

                    /* http://docs.themoviedb.apiary.io/reference/movies/movieid */
                    var getMovie = function ( movie ) {
                        
                        var uri = serviceBase.url + '/search?q=' + movie + '&maxResults=1&part=snippet&key=' + serviceBase.apiKey;
                        return $http.get( "https:" + uri );
                    };

                    return {
                        video: {
                            video: getMovie
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

                return {'url': config.ytApiUrl + version,
                        'apiKey': config.ytApiKey};
            };
        };

        YTAPIService.$inject = [ '$rootScope', '$http', '$timeout', '$resource', 'localStorageService', '$location' ];

        return YTAPIService;
}
);