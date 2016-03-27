/**
*
* Load the core components of the project.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module bootstrap
*
**/
module.exports = !function() {
	'use strict';

	// Throw a log to console.
	console.info('bootstrap');

	// Load the `glob` module.
	var glob = require('glob');

	// Load the path module.
	var path = require('path');

	// Get a listing of files in the `bootstrap` directory.
	var bootstrapDirectoryFiles = glob.sync(path.join(__dirname, 'bootstrap', '*.js'));

	// Load the modules for the project.
	require(path.join(__dirname, 'module'));

	// Load each of the `bootstrap` files.
	bootstrapDirectoryFiles.forEach(require);
}(this);
