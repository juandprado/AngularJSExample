define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],

    function( angular, $routeParams, config, TMDBAPIService ) {

        "use strict";

        var MovieDetailTwoController = function($scope, TMDBAPIService, $routeParams ) {
            $scope.view   = {
                details: {},
            };

            var api = TMDBAPIService.Movie();
            api.movie.movie($routeParams.id).then( function ( response ) {
                $scope.view.details = response.data;
                console.log($scope.view.details);
            });
        };
        MovieDetailTwoController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];
        return MovieDetailTwoController;
    }
);