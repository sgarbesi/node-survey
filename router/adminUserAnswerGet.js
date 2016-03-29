/**
*
* Fetch a listing of user accounts.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/adminUserAnswerGet
*
* @return {undefined} Nothing is returned from this Function.
*
*/
module.exports = function(app) {
	'use strict';

	app.service.express.get('/admin/user/answer/', function(request, response) {
		// If the client isn't logged in, then reject the request.
		if (app.controller.loginRequired(request, response, true) === false) {
			return;
		}

		// Define the options for the query.
		var options = app.controller.pagination.router({
			// Derive the question and answer values.
			include: [{
				key: 'questionAnswerId',
				model: app.model.questionAnswer,
				required: true,

				include: [{
					key: 'questionId',
					model: app.model.question,
					required: true
				}]
			}],

			// The current page.
			page: _.get(request, 'query.page'),

			// The ordering of the query.
			order: '`userQuestionAnswer`.`createdAt` DESC'
		});

		// Fetch the user accounts.
		async.auto({
			// Fetch the user answers.
			userQuestionAnswer: function(callback) {
				app.model.userQuestionAnswer.findAndCount(options).then(callback.bind(null, null), callback);
			}
		}, function(error, results) {
			// If there's an error, then handle it.
			if (error) {
				console.error('router', 'adminUserAnswerGet', error);
			}

			// Render the template and ship it to the client.
			response.render('admin/user/answer', {
				// Display the error to the client if it exists.
				error: error,

				// The dataset from the datastore.
				data: _.get(results, 'userQuestionAnswer'),

				// The page heading.
				h1: 'User Answers',

				// The secondary page heading.
				h2: _.get(results, 'userQuestionAnswer.count') + ' Results',

				// The current page.
				page: options.page,

				// The pagination pages to display.
				pagination: app.controller.pagination.handlebars(options.page, options.limit, _.get(results, 'userQuestionAnswer.count')),

				// The page title.
				title: app.service.package.title,

				// The URL for the page.
				url: './admin/user/answer/'
			});
		});
	});
};
