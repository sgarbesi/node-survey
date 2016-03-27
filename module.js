/**
*
* Load the modules for the project.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module module
*
**/
module.exports = !function() {
	'use strict';

	// Throw a log to console.
	console.info('module');

	// Load the `glob` module.
	var glob = require('glob');

	// Load the path module.
	var path = require('path');

	// Define the `module` directory pattern.
	var moduleDirectoryPattern = path.join(__dirname, 'module', '*.js');

	// Get a listing of files in the `module` directory.
	var moduleDirectoryFiles = glob.sync(moduleDirectoryPattern);

	// Load each of the `module` files.
	moduleDirectoryFiles.forEach(require);
}(this);
