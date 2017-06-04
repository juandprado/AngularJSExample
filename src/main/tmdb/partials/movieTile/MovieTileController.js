define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";

        var MovieTileController = function($scope, TMDBAPIService, $routeParams ) {

            $scope.view   = {
                images: config.apiImg
            };
        };

        MovieTileController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

        return MovieTileController;
    }
);