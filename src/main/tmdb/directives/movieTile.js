/**

 * Movie example

 */

define(['angular',
     'tmdb/partials/movieTile/MovieTileController'], 
  function( angular, MovieTileController ) {
    "use strict";

    return function() {
      return {
        transclude: true,
        replace: true,
        controller: MovieTileController,
        templateUrl: '/tmdb/partials/movieTile/movieTile.html',
        restrict: 'E',
        scope: {
          movie: '=ngModel'
        }
      };
    };
  }
);