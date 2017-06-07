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
                        var uri = serviceBase.url + '/discover/movie?page=' + page + '&include_adult=' + includeAdult + '&sort_by=' + sortBy + '&api_key=' + serviceBase.apiKey;
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

            /* http://docs.themoviedb.apiary.io/reference/movies */
            this.Movie = function () {
                return this.GetCachedService( "movie", function () {
                    var serviceVersion = "3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "movie" );

                    /* http://docs.themoviedb.apiary.io/reference/movies/movieid */
                    var getMovie = function ( movie ) {
                        var uri = serviceBase.url + '/movie/' + movie + '?api_key=' + serviceBase.apiKey + '&append_to_response=alternative_titles,credits,releases,videos,similar,reviews,images';
                        return $http.get( uri );
                    };

                    return {
                        movie: {
                            movie: getMovie
                        }
                    };
                });
            };

            /* http://docs.themoviedb.apiary.io/reference/people */
            this.Person = function () {
                return this.GetCachedService( "person", function () {
                    var serviceVersion = "3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "person" );

                    /* http://docs.themoviedb.apiary.io/reference/people/personid */
                    var getPerson = function ( person ) {
                        var uri = serviceBase.url + '/person/' + person + '?api_key=' + serviceBase.apiKey + '&append_to_response=movie_credits,tv_credits,images';
                        return $http.get( uri );
                    };

                    return {
                        person: {
                            person: getPerson
                        }
                    };
                });
            };

            /* http://docs.themoviedb.apiary.io/reference/search */
            this.Search = function() {
                return this.GetCachedService( "search", function () {
                    var serviceVersion = "3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "search" );

                    /* http://docs.themoviedb.apiary.io/reference/search/searchcompany */
                    var byCompany = function ( company, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/company?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + company;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/search/searchmovie */
                    var byMovie = function ( movie, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/movie?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + movie;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/search/searchmulti */
                    var byMulti = function ( multi, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/multi?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + multi;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/search/searchperson */
                    var byPerson = function ( person, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/person?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + person;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/search/searchtv */
                    var byTv = function ( tv, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/tv?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + tv;
                        return $http.get( uri );
                    };

                    return {
                        search: {
                            company: byCompany,
                            movie: byMovie,
                            multi: byMulti,
                            person: byPerson,
                            tv: byTv
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