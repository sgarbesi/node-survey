/**
*
* Attempt to log the client in as an administrator.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/apiV1AdminPost
*
* @return {undefined} Nothing is returned from this Function.
*
*/
module.exports = function(app) {
	'use strict';

	app.service.express.post('/api/v1/admin/', function(request, response) {
		// Derive the `adminPassword` from the request.
		var adminPassword = _.get(request, 'body.adminPassword');

		// Derive the `adminUsername` from the request.
		var adminUsername = _.get(request, 'body.adminUsername');

		// If the request is malformed, then reject the request.
		if (_.isEmpty(adminPassword) || _.isEmpty(adminUsername)) {
			return response.send({
				error: 'Malformed username/password.',
				success: false
			});
		}

		// Run a series of Functions to log the client into their account.
		async.auto({
			// Validate the client username and password.
			validateAdmin: function(callback) {
				app.model.admin.findOne({
					where: {
						adminPassword: adminPassword,
						adminUsername: adminUsername
					}
				}).then(function(results) {
					// Invoke the callback.
					callback(_.isEmpty(results) ? 'Invalid username/password.' : null, results);
				}, callback);
			},

			// Generate the session for the admin.
			adminSession: ['validateAdmin', function(callback, cargo) {
				// Fetch the admin results.
				var admin = cargo.validateAdmin.get({
					simple: true
				});

				// Store the session data.
				_.set(request, 'session.admin', admin);

				// Invoke the callback.
				callback(null, admin);
			}]
		}, function(error) {
			// If there's an error, then handle it.
			if (error) {
				console.error('router', 'apiV1AdminPost', error);
			}

			// Send the response back to the client.
			response.send({
				// The error from the series if present.
				error: error,

				// The success state of the response.
				success: error ? false : true
			});
		});
	});
};
