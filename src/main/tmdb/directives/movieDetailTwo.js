/**

 * Movie example

 */

define(['angular',
     'tmdb/partials/movieDetailTwo/MovieDetailTwoController'], 
  function( angular, MovieDetailTwoController ) {
    "use strict";

    return function() {
      return {
        transclude: true,
        replace: true,
        controller: MovieDetailTwoController,
        templateUrl: '/tmdb/partials/movieDetailTwo/movieDetailTwo.html',
        restrict: 'E',
        scope: {
          detail: '=ngModel'
        }
      };
    };
  }
);