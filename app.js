/**
*
* Running this will load all services and ready the project for public access from the web.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module app
*
**/
module.exports = !function() {
	'use strict';

	// Throw a log to console.
	console.info('app');

	// Load the native path library.
	var path = require('path');

	// Load the project bootstrap.
	require(path.join(__dirname, 'bootstrap'));

	// Load each of the required services.
	async.auto({
		// Boot the Express HTTP listening server.
		express: ['sequelize', app.service.express.boot],

		// Boot the MySQL connections.
		sequelize: app.service.sequelize.boot
	}, function(error) {
		// If there's an error, log it to console.
		if (error) {
			console.error('app', error);
		}

		// Log the application as being in a ready state.
		console.info('app', 'ready');
	});

	// Return the application instance.
	return app;
}();
