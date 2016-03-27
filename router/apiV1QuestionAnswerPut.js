/**
*
* Add a new answer for a question.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/apiV1QuestionAnswerPut
*
* @return {undefined} Nothing is returned from this Function.
*
*/
module.exports = function(app) {
	'use strict';

	app.service.express.put('/api/v1/question/answer/', function(request, response) {
		// If the client isn't an admin, then reject the request.
		if (!_.get(request, 'session.admin.adminId')) {
			return response.send({
				error: 'You must be logged in to perfrom this action.',
				success: false
			});
		}

		// Derive the `questionAnswerValue` from the request.
		var questionAnswerValue = _.get(request, 'body.questionAnswerValue');

		// Derive the `questionId` from the request.
		var questionId = _.parseInt(_.get(request, 'body.questionId')) || null;

		// If the request is malformed, then reject the request.
		if (_.isEmpty(questionAnswerValue) || !_.isNumber(questionId) || _.isNaN(questionId)) {
			return response.send({
				error: 'Malformed question answer.',
				success: false
			});
		}

		// Run a series of Functions to log the client into their account.
		async.auto({
			// Validate that question identifier.
			validateQuestionId: function(callback) {
				app.model.question.findOne({
					where: {
						questionId: questionId
					}
				}).then(function(results) {
					// Invoke the callback.
					callback(_.isEmpty(results) ? 'Invalid question.' : null);
				}, callback);
			},

			// Insert the question into the datastore.
			questionAnswerInsert: ['validateQuestionId', function(callback) {
				app.model.questionAnswer.create({
					adminId: _.get(request, 'session.admin.adminId'),
					questionAnswerValue: questionAnswerValue,
					questionId: questionId
				}).then(function(results) {
					// Invoke the callback.
					callback(_.isEmpty(results) ? 'Failed to add answer.' : null, results);
				}, callback);
			}]
		}, function(error) {
			// If there's an error, then handle it.
			if (error) {
				console.error('router', 'apiV1QuestionAnswerPut', error);
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
