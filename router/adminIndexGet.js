/**
*
* If the client is logged in, then display the admin dashboard, otherwise dispay the admin log in.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/adminIndexGet
*
* @return {undefined} Nothing is returned from this Function.
*
**/
module.exports = function(app) {
	'use strict';

	app.service.express.get('/admin/', function(request, response) {
		// Attempt to derive the admin identifier for the current session.
		var adminId = _.get(request, 'session.admin.adminId');

		// Determine the template to render based upon whether the client is logged in or not.
		var template = adminId ? 'admin/index' : 'admin/login';

		// Render the template and ship it to the client.
		response.render(template, {
			// An error to display on the page.
			error: _.get(request, 'query.loginRequired') ? 'You must be logged in to access this area.' : '',

			// The page heading.
			h1: adminId ? 'Dashboard' : 'Log in',

			// The page title.
			title: app.service.package.title
		});
	});
};
