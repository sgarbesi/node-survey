/**
*
* Insert a new question into the datastore.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module router/apiV1QuestionPut
*
* @return {undefined} Nothing is returned from this Function.
*
*/
module.exports = function(app) {
	'use strict';

	app.service.express.put('/api/v1/question/', function(request, response) {
		// If the client isn't logged in, then reject the request.
		if (app.controller.loginRequired(request, response) === false) {
			return;
		}

		// Derive the `questionValue` from the request.
		var questionValue = _.get(request, 'body.questionValue');

		// If the request is malformed, then reject the request.
		if (_.isEmpty(questionValue)) {
			return response.send({
				error: 'Malformed question.',
				success: false
			});
		}

		// Run a series of Functions to log the client into their account.
		async.auto({
			// Insert the question into the datastore.
			questionInsert: function(callback) {
				app.model.question.create({
					adminId: _.get(request, 'session.admin.adminId'),
					questionValue: questionValue
				}).then(function(results) {
					// Invoke the callback.
					callback(_.isEmpty(results) ? 'Failed to add question.' : null, results);
				}, callback);
			}
		}, function(error) {
			// If there's an error, then handle it.
			if (error) {
				console.error('router', 'apiV1QuestionPut', error);
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
