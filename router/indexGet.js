/**
*
* Handles loading the homepage containing the survey.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/indexGet
*
* @return {undefined} Nothing is returned from this Function.
*
**/
module.exports = function(app) {
	'use strict';

	app.service.express.get('/', function(request, response) {
		// Run a series of Functions to load the page.
		async.auto({
			question: function(callback) {
				// Fetch the unanswered questions for the client.
				app.model.question.findOne({
					group: ['`question`.`questionId`'],

					having: ['MAX(`questionAnswer.userQuestionAnswer.user`.`userId`) IS NULL'],

					include: [{
						key: 'questionId',
						model: app.model.questionAnswer,
						required: true,

						include: [{
							key: 'questionAnswerId',
							model: app.model.userQuestionAnswer,
							required: false,

							include: [{
								key: 'userId',
								model: app.model.user,
								required: false,
								where: {
									userHash: request.sessionID
								}
							}]
						}]
					}],

					limit: 1,

					order: [sequelize.fn('RAND')]
				}).then(callback.bind(null, null), callback);
			},

			// Fetch the answers for the fetched question.
			questionAnswer: ['question', function(callback, cargo) {
				// Derive the question identifier from the cargo.
				var questionId = _.get(cargo, 'question.questionId');

				// If a question doesn't exist, then skip fetching the answers.
				if (!_.isNumber(questionId) || _.isNaN(questionId)) {
					return callback();
				}

				// Fetch the anwers for the question.
				app.model.questionAnswer.findAll({
					where: {
						questionId: questionId
					}
				}).then(callback.bind(null, null), callback);
			}]
		}, function(error, results) {
			// If there's an error, then handle it.
			if (error) {
				console.error('router', 'indexGet', error);
			}

			// Render the homepage and ship it to the client.
			response.render('index', {
				// The data for the page.
				data: results,

				// The error from the results, if it exists.
				error: error,

				// The page heading.
				h1: app.service.package.title,

				// The success state of the page.
				success: error ? false : true,

				// The page title.
				title: app.service.package.title
			});
		});
	});
};
