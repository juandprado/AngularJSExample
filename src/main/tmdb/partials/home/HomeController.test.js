/**
* the controller needs to be loaded explicitly with requireJS as the normal application only registers the
* controllers inside the route definitions, which are not evaluated during testing, so they are not known to angularJS
*/
define([ 'angular',
         'config/config',
         'tmdb/partials/home/HomeController' ], 
    function( angular, config, HomeController ) {
        "use strict";
        describe("the homecontroller", function () {
            var homecontroller, scope, mockService;

            beforeEach(function () {
                /**
                * Load the required modules
                */
                module("config");
                module("ngRoute");

                /**
                * Injection
                */
                inject(["$rootScope", "$controller", function ($rootScope, $controller) {
                    //instantiate the controller with a newly created scope
                    scope       = $rootScope.$new();
                    mockService = {
                        Discover: function () {
                            return {
                                discover: {
                                    movies: function () {
                                        return {
                                            then: function () {
                                                return {};
                                            }
                                        };
                                    }
                                }
                            };
                        }
                    };
                    homecontroller = $controller(HomeController, {$scope: scope, 
                                                                  TMDBAPIService: mockService}
                                     );
                }]);
            });

            /*
            * Test default initialization variables
            */
            it("should have matching defaults", function () {
                expect(scope.view.movies).toEqual([]);
            });

            /*
            * Test base functionality
            */

        });
    }
);