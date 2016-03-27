/**
*
* Store a survey answer for the client.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/apiV1UserAnswerPut
*
* @return {undefined} Nothing is returned from this Function.
*
*/
module.exports = function(app) {
	'use strict';

	app.service.express.put('/api/v1/user/answer/', function(request, response) {
		// Derive the `question` identifier from the request.
		var questionId = _.parseInt(_.get(request, 'body.questionId')) || null;

		// Derive the `questionAnswer` identifier from the request.
		var questionAnswerId = _.parseInt(_.get(request, 'body.questionAnswerId')) || null;

		// If the request is malformed, then reject the request.
		if (!_.isNumber(questionId) || _.isNaN(questionId) || !_.isNumber(questionAnswerId) || _.isNaN(questionAnswerId)) {
			return response.send({
				error: 'Malformed question/answer.',
				success: false
			});
		}

		// Run a series of Functions to validate and import the clients answer.
		async.auto({
			// Validate that question and answer have a relationship.
			validateQuestionAnswer: function(callback) {
				app.model.questionAnswer.findOne({
					where: {
						questionAnswerId: questionAnswerId,
						questionId: questionId
					}
				}).then(function(results) {
					// Invoke the callback.
					callback(_.isEmpty(results) ? 'Invalid question/answer.' : null);
				}, callback);
			},

			// Validate that the `user` hasn't already answered the given question.
			validateUserQuestion: ['validateQuestionAnswer', function(callback) {
				app.model.userQuestionAnswer.findOne({
					include: [{
						key: 'questionAnswerId',
						model: app.model.questionAnswer,
						required: true,

						where: {
							questionId: questionId
						}
					}, {
						key: 'userId',
						model: app.model.user,
						required: true,

						where: {
							userHash: request.sessionID
						}
					}]
				}).then(function(results) {
					// Invoke the callback with the error and/or results.
					callback(!_.isEmpty(results) ? 'You\'ve already answered this question!' : null, results);
				}, callback);
			}],

			// Find or create the `user` record.
			userInsert: ['validateUserQuestion', function(callback) {
				app.model.user.findOrCreate({
					// The insert.
					defaults: {
						userAgent: _.get(request, 'headers["user-agent"]'),
						userHash: request.sessionID,
						userIp: _.get(request, 'headers["x-forwarded-for"]') || _.get(request, 'connection.remoteAddress')
					},

					// The lookup.
					where: {
						userHash: request.sessionID
					}
				}).spread(function(results) {
					// Invoke the callback with the error and/or results.
					callback(_.isEmpty(results) ? 'Failed to create user!' : null, results);
				}).catch(callback);
			}],

			// Map the users answer to their account.
			userQuestionAnswerInsert: ['userInsert', function(callback, cargo) {
				// Derive the user record.
				var user = cargo.userInsert.get({
					plain: true
				});

				// Store the users answers.
				app.model.userQuestionAnswer.create({
					questionAnswerId: questionAnswerId,
					userId: user.userId
				}).then(function(results) {
					callback(_.isEmpty(results) ? 'Failed to save answer!' : null, results);
				}, callback);
			}]
		}, function(error) {
			// If there's an error, then handle it.
			if (error) {
				console.error('router', 'apiV1UserAnswerPut', error);
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
