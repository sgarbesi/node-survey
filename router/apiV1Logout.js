/**
*
* Log the client out of their account.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/apiV1Logout
*
* @return {undefined} Nothing is returned from this Function.
*
*/
module.exports = function(app) {
	'use strict';

	app.service.express.post('/api/v1/logout/', function(request, response) {
		// If the client isn't an admin, then reject the request.
		if (!_.get(request, 'session.admin.adminId')) {
			return response.send({
				error: 'You must be logged in to perfrom this action.',
				success: false
			});
		}

		// Destroy the session.
		request.session.destroy();

		// Send the response back to the client.
		response.send({
			// The a success state.
			success: true
		});
	});
};
