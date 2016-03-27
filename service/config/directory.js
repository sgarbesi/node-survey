/**
*
* Load all modules that are contained in the directory specified recursively into the global `app` Object.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module service/config/directory
*
* @param {string} directory The directory to recursive load and reference all the modules for.
* @param {callback} callback If present, will be invoked with the results.
*
* @callback callback
* @param {string|undefined} If there's an error it'll be a String, if there's no error it'll be undefined.
* @param {object} Upon success, the results will reside in this Object.
*
**/
module.exports = function() {
	'use strict';

	return function(directory, callback) {
		// Load all files recursively within the given directory.
		expressLoad(directory, {
			// Establish the current working directory for proper namespacing in the exported Object.
			cwd: app.service.config.uri.root
		}).into(app, callback);
	};
};
