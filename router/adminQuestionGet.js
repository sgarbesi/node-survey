/**
*
* Fetch the current list of questions available.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/adminQuestionGet
*
* @return {undefined} Nothing is returned from this Function.
*
*/
module.exports = function(app) {
	'use strict';

	app.service.express.get('/admin/question/', function(request, response) {
		// If the client isn't an admin, then reject the request.
		if (!_.get(request, 'session.admin.adminId')) {
			return response.redirect(302, '/admin/?loginRequired=1');
		}

		// Define the options for the query.
		var options = app.controller.pagination.router({
			// The current page.
			page: _.get(request, 'query.page'),

			// The ordering of the query.
			order: '`question`.`questionId` DESC'
		});

		// Fetch the user accounts.
		async.auto({
			// Fetch the user question.
			question: function(callback) {
				app.model.question.findAndCount(options).then(callback.bind(null, null), callback);
			},

			// Fetch the answers for the questions.
			questionAnswer: ['question', function(callback, cargo) {
				// Derive the question identifiers.
				var questionIds = _.pluck(_.get(cargo, 'question.rows'), 'questionId');

				// If there's no question identifiers, then skip the query.
				if (!questionIds.length) {
					return callback();
				}

				// Fetch the answers.
				app.model.questionAnswer.findAll({
					raw: true,

					where: {
						questionId: {
							$in: questionIds
						}
					}
				}).then(callback.bind(null, null), callback);
			}],

			// Normalize the results from the datastore.
			normalize: ['questionAnswer', function(callback, cargo) {
				// Assign the answers to the question results.
				_.each(_.get(cargo, 'question.rows'), function(value, key) {
					_.set(cargo, 'question.rows["' + key + '"].questionAnswer', _.where(_.get(cargo, 'questionAnswer'), {
						questionId: value.questionId
					}));
				});

				// Invoke the callback with the results.
				callback(null, cargo.question);
			}]
		}, function(error, results) {
			// If there's an error, then handle it.
			if (error) {
				console.error('router', 'adminQuestionGet', error);
			}

			// Render the template and ship it to the client.
			response.render('admin/question', {
				// Display the error to the client if it exists.
				error: error,

				// The dataset from the datastore.
				data: _.get(results, 'normalize'),

				// The page heading.
				h1: 'Questions',

				// The secondary page heading.
				h2: _.get(results, 'normalize.count') + ' Results',

				// The current page.
				page: options.page,

				// The pagination pages to display.
				pagination: app.controller.pagination.handlebars(options.page, options.limit, _.get(results, 'normalize.count')),

				// The page title.
				title: app.service.package.title,

				// The URL for the page.
				url: './admin/question/'
			});
		});
	});
};
