define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],

    function( angular, $routeParams, config, TMDBAPIService ) {

        "use strict";

        var MovieDetailTwoController = function($scope, TMDBAPIService, $routeParams ) {
            $scope.view   = {
                details: {},
                images: config.apiImg,
            };

            $scope.getIframeSrc = function (videoId) {
              return 'https://www.youtube.com/embed/' + videoId;
            };

            var api = TMDBAPIService.Movie();
            api.movie.movie($routeParams.id).then( function ( response ) {
                $scope.view.details = response.data;
            });
        };
        MovieDetailTwoController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];
        return MovieDetailTwoController;
    }
);