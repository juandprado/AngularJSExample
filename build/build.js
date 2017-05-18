/*
 * Build dependencies and configuration
 */
var cssmin        = require('cssmin');
var process       = require('process');
var fs            = require('fs');
var glob          = require('glob-all');
var mkdirp        = require('mkdirp');
var path          = require('path');
var requirejs     = require('requirejs');
var uglifyjs      = require('uglify-js');
var replaceStream = require('replacestream')
var pkg           = require('../package.json');
var base          = pkg.folders.jsSource;
var sourceBasePath = pkg.folders.jsSource.replace(/\/+$/,'');       /*  no trailing slash, thank you */

var deploy        = pkg.folders.build + pkg.name + '-' + pkg.version + '/';

process.stdout.write( "Building Deployable Artifact\n" );
process.stdout.write("-----------------------------------------------------------\n" );

var ignorePatterns = [ "!BASE_PATH/**/.build-ignore" ];       /*  always ignore the list of files to ignore :) */

glob.sync("**/.build-ignore" ).forEach( function( ignoreSpecFile ) {
    var container = ignoreSpecFile.substring( 0, ignoreSpecFile.lastIndexOf( "/" ) );
    contents = new Buffer( fs.readFileSync( ignoreSpecFile ), "utf-8" ).toString()      /*  get the contents of the file */
        .replace("\r\n", "\n" )         /*  convert CRLFs to CRs */
        .split("\n")                    /*  break into an array of one string per line */
        .map( function( el ) {          /*  map the ignore file's base path back into the ignore pattern */
                return ( el.length === 0 || el[0] === '#' ) ? null : "!" + container + "/" + el;
            } )
        .filter( function( el ) {       /*  filter out empty lines and comments */
                return el !== null ? true : false;
            } );

    contents.forEach( function( ignorePattern ) {
        try {
            var matchingFiles = glob.sync( ignorePattern );         /*  Is this a valid pattern?  */
            ignorePatterns.push( ignorePattern );                   /*  Well, allrighty then. */
        } catch( e ) {
            console.log("WARNING: .build-ignore '" + ignoreSpecFile + "' contains invalid sequence '" + ignorePattern + "'.  This pattern is being ignored." );
        }
    } );

} );

process.stdout.write( "    - Processed " + ignorePatterns.length + " ignore patterns.\n" );

/*
 * Type/file mappings for elements of the build artifact.
 * Each type should be an object with the following properties:
 *     - name: the textual name of the file category type
 *     - patterns: an array of glob patterns to match files of this type.
 *         (the token "BASE_PATH" will automatically be replaced with the actual root path)
 */
var buildSource = {
    "css" : {
        name: "CSS files",
        patterns: [
            'BASE_PATH/**/*.css'
        ] },
    "html" : {
        name: "HTML files",
        patterns: [
            'BASE_PATH/**/*.html'
        ] },
    "images" : {
        name: "Fonts and Images",
        patterns: [
            'BASE_PATH/**/*.ai',
            'BASE_PATH/**/*.eot',
            'BASE_PATH/**/*.gif',
            'BASE_PATH/**/*.ico',
            'BASE_PATH/**/*.jpg',
            'BASE_PATH/**/*.otf',
            'BASE_PATH/**/*.png',
            'BASE_PATH/**/*.svg',
            'BASE_PATH/**/*.ttf',
            'BASE_PATH/**/*.woff',
            'BASE_PATH/**/*.woff2'
        ] },
    "vendor": {
        name: "Dependencies",
        patterns: [
            base + 'vendor/**/*.min.js',
            base + 'vendor/**/*.min.js.map',
            base + 'vendor/**/*.min.map',
            base + 'vendor/almond/almond.js',
            base + 'vendor/angular/angular.js',
            base + 'vendor/angular-animate/angular-animate.js',
            base + 'vendor/angular-resource/angular-resource.js',
            base + 'vendor/angular-route/angular-route.js',
            base + 'vendor/angular-sanitize/angular-sanitize.js',
            base + 'vendor/font-awesome/fonts/**',
            base + 'vendor/marked/lib/marked.js',
            base + 'vendor/requirejs/require.js',
            base + 'vendor/angular-ui-select/dist/select.js'
        ] },
    "application": {
        name: "Javascript/Application",
        patterns: [
            base + '**/*.js',
            '!' + base + 'vendor/**',
            '!' + base + '**/*.test.js'
        ] },
    "to-minify": {
        name: "Javascript/Application (with Minification)",
        patterns: [
        ] }
};

/*
 * Execute glob based distribution of source files
 */

var totalFiles = 0;
var totalFileSize = 0;

for ( var section in buildSource ) {
    var sectionName = buildSource[section].name;
    var sectionPatterns = buildSource[section].patterns.concat( ignorePatterns ).map( function( el ) { return el.replace("BASE_PATH", sourceBasePath ); } );
    var typeFiles = 0;
    var typeFileSize = 0;
    process.stdout.write( "    - Processing " + sectionName + "...\r" );
    glob.sync(sectionPatterns).forEach(function(item) {
        var itemInfo = fs.statSync( item );
        typeFiles++;
        typeFileSize += itemInfo.size;

        mkdirp(path.dirname(item.replace(base, deploy)), function (err) {
            if (err) {
                console.error(err);
                return false;
            }

            try {
                switch (this.section) {
                    case 'application':
                        var minified = uglifyjs.minify(item, {mangle: false});
                        fs.writeFile(item.replace(base, deploy), minified.code.replace('release.version', pkg.version));
                        break;
                    case 'to-minify':
                        var minified = uglifyjs.minify(item, {mangle: false});
                        fs.writeFile(item.replace(base, deploy), minified.code);
                        break;
                    case 'css':
                        var css      = fs.readFileSync(item, encoding='utf8');
                        var minified = cssmin(css);
                        fs.writeFile(item.replace(base, deploy), minified);
                        break;
                    case 'html':
                        fs.createReadStream(item).pipe(replaceStream('release.version', pkg.version)).pipe(fs.createWriteStream(item.replace(base, deploy)));
                        break;
                    case 'json':
                        fs.createReadStream(item).pipe(replaceStream('release.version', pkg.version)).pipe(fs.createWriteStream(item.replace(base, deploy)));
                        break;
                    default:
                        fs.createReadStream(item).pipe(fs.createWriteStream(item.replace(base, deploy)));
                        break;
                }
            } catch( err ) {
                console.error("WARNING: failed to process " + item );
            }

        }.bind({section: section}));
    });

    process.stdout.write( "\r    - Processed \033[0;36m" + Math.floor( typeFileSize / 1024 ) + "\033[0m Kb of " + sectionName + " in \033[0;36m" + typeFiles + "\033[0m files\r\n" );

    totalFiles += typeFiles;
    totalFileSize += typeFileSize;
}

process.stdout.write("-----------------------------------------------------------\n" );
process.stdout.write("\033[0;32mSUCCESS\033[0m: \033[0;36m" + Math.floor( totalFileSize / 1024 ) + "\033[0m Kb in \033[0;36m" + totalFiles + "\033[0m files\n" );
