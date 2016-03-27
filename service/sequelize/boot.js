/**
*
* Loads the Sequelize connection to the MySQL datastore.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module service/sequelize/boot
*
* @param {callback} callback If present, will be invoked with the reference of the Express server.
*
* @callback callback
* @param {string|undefined} If there's an error it'll be a String, if there's no error it'll be undefined.
* @param {object} Upon success, the results will reside in this Object.
*
**/
module.exports = function(app) {
	'use strict';

	return function(callback) {
		// Throw a log to console.
		console.info('service', 'sequelize', 'boot');

		// Reference the datastore configuration.
		var config = app.service.environment.mysql;

		// Establish the datastore connection.
		var me = app.service.sequelize = new sequelize(config.database, config.username, config.password, {
			// Definition options.
			define: {
				// Don't rename tables automatically.
				freezeTableName: true
			},

			// Use MySQL for the datastore.
			dialect: 'mysql',

			// The hostname of the server.
			host: config.host,

			// The server port.
			port: config.port
		});

		// Verify that the datastore connection is established.
		me.authenticate().then(function() {
			// Load the models and invoke the callback.
			app.service.config.directory('model', callback);
		}, callback);
	};
};
