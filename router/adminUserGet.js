/**
*
* Fetch a listing of user accounts.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/adminUserGet
*
* @return {undefined} Nothing is returned from this Function.
*
*/
module.exports = function(app) {
	'use strict';

	app.service.express.get('/admin/user/', function(request, response) {
		// If the client isn't an admin, then reject the request.
		if (!_.get(request, 'session.admin.adminId')) {
			return response.redirect(302, '/admin/?loginRequired=1');
		}

		// Define the options for the query.
		var options = app.controller.pagination.router({
			// The current page.
			page: _.get(request, 'query.page'),

			// The ordering of the query.
			order: '`user`.`userId` DESC'
		});

		// Fetch the user accounts.
		async.auto({
			// Fetch the user listing.
			user: function(callback) {
				app.model.user.findAndCount(options).then(callback.bind(null, null), callback);
			}
		}, function(error, results) {
			// If there's an error, then handle it.
			if (error) {
				console.error('router', 'adminUserGet', error);
			}

			// Render the template and ship it to the client.
			response.render('admin/user', {
				// Display the error to the client if it exists.
				error: error,

				// The dataset from the datastore.
				data: _.get(results, 'user'),

				// The current page.
				page: options.page,

				// The pagination pages to display.
				pagination: app.controller.pagination.handlebars(options.page, options.limit, _.get(results, 'user.count')),

				// The page heading.
				h1: 'Users',

				// The secondary page heading.
				h2: _.get(results, 'user.count') + ' Results',

				// The page title.
				title: app.service.package.title,

				// The URL for the page.
				url: './admin/user/'
			});
		});
	});
};
