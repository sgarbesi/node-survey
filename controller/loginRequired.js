/**
*
* Enforce the client to be logged in to access a specific area.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module controller/loginRequired
*
* @param {object} request Express request Object from an incoming request.
* @param {object} response Express response Object from an incoming request.
* @param {boolean} redirect Whether to redirect the client instead of sending a JSON response.
*
* @return {boolean} Whether the request was rejected or not.
*
*/
module.exports = function() {
	'use strict';

	return function(request, response, redirect) {
		// If the client isn't logged in, then reject the request.
		if (!_.get(request, 'session.admin.adminId')) {
			// If we need to redirect the client, then do it now.
			if (redirect === true) {
				response.redirect(302, '/admin/?loginRequired=1');
			} else {
				response.send({
					error: 'You must be logged in to perfrom this action.',
					success: false
				});
			}

			// Return a fail state.
			return false;
		}

		// Otherwise return a success state.
		return true;
	};
};
