/**
 * MovieController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.trailer.TrailerController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Juan Diego Prado <juandipra@hotmail.com>
 *
 * @returns instance of the TrailerController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/YTAPIService'],
    function( angular, $routeParams, config, YTAPIService ) {
        "use strict";

        var TrailerController = function($scope, YTAPIService, $routeParams ) {

            $scope.view   = {
                trailer: {},
                path: ""
            };

            $scope.movie = "";
            
            var api = YTPIService.Video();
            api.video.video($scope.movie).then( function ( response ) {
                $scope.view.trailer = response.data;
            });

        };

        MovieController.$inject = [ '$scope', 'YTAPIService', '$routeParams' ];

        return TrailerController;
    }
);