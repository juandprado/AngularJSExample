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

            
            var api = YTAPIService.Video();
            api.video.video($scope.movie + " trailer subtitulado").then( function ( response ) {
                $scope.view.trailer = "https://www.youtube.com/embed/" + response.data.items[0].id.videoId;
            });

        };

        TrailerController.$inject = [ '$scope', 'YTAPIService'];

        return TrailerController;
    }
);