/**
*
* Log the client out of their account.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/apiV1LogoutPost
*
* @return {undefined} Nothing is returned from this Function.
*
*/
module.exports = function(app) {
	'use strict';

	app.service.express.post('/api/v1/logout/', function(request, response) {
		// If the client isn't logged in, then reject the request.
		if (app.controller.loginRequired(request, response) === false) {
			return;
		}

		// Destroy the session.
		request.session.destroy();

		// Send the response back to the client.
		response.send({
			// Return a success state.
			success: true
		});
	});
};
