/**
 * Configuration for pathing for requireJS to include modules
 *
 * @module RequireJS
 * 
 * @requires config/config
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @copyright Alert Logic, Inc 2014
 */

(function (require) {
	"use strict";

    //  Set up the minimal require config -- this will allow us to retrieve the configuration and angular, and nothing more.
    require.config( { baseUrl: "/", paths: { "angular" : "vendor/angular/angular.min" }, shim: { "angular": { deps: [], exports: 'angular' } }, urlArgs: "bust=" + 'release.version' } );

    require( ["config/config"], function( config ) {

        //  Now that we have the configuration, use it to fully configure require
        require.config( config.requireConfiguration );

        var requireModules = [ "angular" ].concat( config.standardRequireModules );        //  guarantee angular is the first requirement

        require( requireModules, function ( angular ) {

            try
            {
                angular.bootstrap(document, ["app"]);
            }
            catch( e )
            {
                console.error("Caught an error during bootstrap: %s", e.message );
            }

        });

    } );

}(require));
