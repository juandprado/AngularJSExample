/**

 * Movie example

 */

define(['angular',
     'tmdb/partials/trailer/TrailerController'], 
  function( angular, TrailerController ) {
    "use strict";

    return function() {
      return {
        transclude: true,
        replace: true,
        controller: TrailerController,
        templateUrl: '/tmdb/partials/trailer/trailer.html',
        restrict: 'E',
        scope: {
          movie: '=ngModel'
        }
      };
    };
  }
);