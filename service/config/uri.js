/**
*
* Fetch the common folder URIs for the project prefixed by the root directory that's specified.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module service/config/uri
*
* @param {string} directory The directory to prefix all of the URIs with.
*
* @return {object} An Object containing the URIs for the project.
*
**/
module.exports = function() {
	'use strict';

	return function(directory) {
		// Return the paths for the project relative to the `directory` variable.
		return {
			// The configuration directory.
			config: path.join(directory, 'config'),

			// The controller directory.
			controller: path.join(directory, 'controller'),

			// The model directory that interacts with the MySQL datastore.
			model: path.join(directory, 'model'),

			// The modules directory, which contains the required modules for the project.
			module: path.join(directory, 'module'),

			// The root directory of the project.
			root: directory,

			// The directory containing the express routes.
			router: path.join(directory, 'router'),

			// Services that are loaded for the project.
			service: path.join(directory, 'service'),

			// The back-end script directory for the project.
			script: path.join(directory, 'script'),

			// The static files to serve to the HTTP server.
			static: path.join(directory, 'static'),

			// The templates for the project.
			views: path.join(directory, 'views')
		};
	};
};
