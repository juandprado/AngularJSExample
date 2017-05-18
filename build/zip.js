/*
 * Build dependencies and configuration
 */
var cssmin    = require('cssmin');
var fs        = require('fs');
var glob      = require('glob-all');
var mkdirp    = require('mkdirp');
var path      = require('path');
var requirejs = require('requirejs');
var uglifyjs  = require('uglify-js');
var pkg       = require('../package.json');
var base      = pkg.folders.jsSource;
var deploy    = pkg.name + '-' + pkg.version + '/';
var zipped    = 'ui-' + pkg.version + '.tar.gz';
var execfile  = require('child_process').execFile;

console.log("> Created: target/" + deploy);
console.log("");
process.chdir('target');
console.log("> Zipping: target/" + deploy);
execfile('tar', ['-czvf', zipped, deploy], function(err, stdout) {
});
console.log("> Created: target/" + zipped);
console.log("");
console.log("> Build Complete!");
