/**
*
* Loads the configuration for the project.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module bootstrap/config
*
**/
module.exports = !function() {
	'use strict';

	// Establish the root directory the project.
	var uriRoot = path.join(__dirname, '..');

	// Load all of the configuration and utility services.
	expressLoad('service', {
		// The directory to work from.
		cwd: uriRoot
	}).into(app);

	// Set the URIs for the project.
	app.service.uri = app.service.config.uri(uriRoot);

	// Load and store the environment configuration.
	app.service.environment = JSON.parse(fs.readFileSync(path.join(app.service.uri.config, 'local.json')));

	// Load and store the package configuration.
	app.service.package = JSON.parse(fs.readFileSync(path.join(app.service.uri.root, 'package.json')));

	// Load the projects controllers.
	app.service.config.directory('controller');
}();
