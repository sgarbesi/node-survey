/**
*
* The setup script to configure the current environment.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module script/setup
*
**/
module.exports = !function() {
	'use strict';

	// Throw a log to console.
	console.info('script', 'setup');

	// Load the Lodash utility library.
	var _ = require('lodash');

	// Load the native file system module.
	var fs = require('fs');

	// Load the native path module.
	var path = require('path');

	// Load the default configuration for the project.
	var defaults = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'defaults.json')));

	// Load the projects package.
	var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')));

	// Load the prompt library.
	var prompt = require('prompt');

	// Define the prefixed message for the prompt.
	prompt.message = pkg.name;

	// Start the prompt.
	prompt.start();

	// Define the prompt schema for the client.
	var promptSchema = [];

	// Loop through each of the configuration properties to prompt to the client.
	_.each(['express', 'mysql'], function(service) {
		// Loop through each of the configuration properties.
		_.each(defaults[service], function(value, parameter) {
			// Push the schema off to the prompt.
			promptSchema.push({
				default: value,
				description: service + ' ' + parameter,
				name: service + '.' + parameter,
				required: true,
				type: typeof value
			});
		});
	});

	// Prompt the client.
	prompt.get(promptSchema, function(error, results) {
		// If there's an error, then handle it.
		if (error) {
			// Throw a log to console.
			return console.error(error);
		}

		// Store each of the results in the defaults configuration.
		_.each(results, function(value, key) {
			_.set(defaults, key, value);
		});

		// The coniguration file.
		var configFile = path.join(__dirname, '..', 'config', 'local.json');

		// Save the configuration.
		fs.writeFileSync(configFile, JSON.stringify(defaults, null, 2));

		// Throw a log to console telling the client where the configuration file was saved to.
		console.info(pkg.name, 'Configuration saved to:', configFile);

		// Throw a log to console telling the client how to load the application.
		console.info(pkg.name, 'Run the application with the command `npm start` from the CLI when completed.');
	});
}();
