/**
 * HomeController provides controller support for loading the main page with Search and Popular Movies
 *
 * @module tmdb.partials.home.HomeController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the HomeController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'config/config'],
    function( angular, config) {
        "use strict";

        var HomeController = function($scope) {

            $scope.view   = {
                movies: {results: ["holi", "mundo"]},
            };

            /*
            var api = TMDBAPIService.Discover();
            api.discover.movies().then(function ( response ) {
                $scope.view.movies = response.data;
            });
            */
            
        };

        HomeController.$inject = [ '$scope'];

        return HomeController;
    }
);