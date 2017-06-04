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
    function( angular, config, YTAPIService ) {
        "use strict";

        var TrailerController = function($scope, YTAPIService) {

            $scope.view   = {
                trailer: undefined,
                path: ""
            };


            console.log($scope.movie);
            
            var api = YTAPIService.Video();
            console.log("Holi1");
            api.video.video($scope.movie + " trailer").then( function ( response ) {
                console.log("Holi2");
                $scope.view.trailer = "https://www.youtube.com/watch?v=" + response.data.items[0].id.videoId;
                console.log($scope.view.trailer);
            });

        };

        TrailerController.$inject = [ '$scope', 'YTAPIService'];

        return TrailerController;
    }
);