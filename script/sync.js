/**
*
* Sync the datastore.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module script/sync
*
**/
module.exports = !function() {
	'use strict';

	// Throw a log to console.
	console.info('script', 'sync');

	// Load the native path library.
	var path = require('path');

	// Load the project bootstrap.
	require(path.join(__dirname, '..', 'bootstrap'));

	// Load the Sequelize service.
	app.service.sequelize.boot(function(error) {
		// If there's an error, log it to console.
		if (error) {
			console.error('script', 'sync', error);
		} else {
			// Sync the datastore.
			app.service.sequelize.sync({
				force: true
			}).then(function() {
				// Import some initial data.
				app.model.admin.create({
					adminPassword: 'pass',
					adminUsername: 'admin'
				}).then(function() {
					app.model.question.bulkCreate([{
						adminId: 1,
						questionValue: 'How old is Homer Simpson?'
					}]).then(function() {
						app.model.questionAnswer.bulkCreate([{
							questionId: 1,
							adminId: 1,
							questionAnswerValue: '39'
						}, {
							questionId: 1,
							adminId: 1,
							questionAnswerValue: '42'
						}, {
							questionId: 1,
							adminId: 1,
							questionAnswerValue: '45'
						}, {
							questionId: 1,
							adminId: 1,
							questionAnswerValue: 'Did I just get you to Google the answer? :D'
						}]).then(function() {
							// Log the sync as successful.
							console.info('script', 'sync', 'Completed!');

							// Kill the process.
							process.exit(0);
						});
					});
				});
			}, function(error) {
				// Log the error.
				console.error('script', 'sync', error);
			});
		}
	});

	// Return the application instance.
	return app;
}();
