/**
*
* This table contains the available questions for the survey.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module model/question
*
**/
module.exports = function(app) {
	'use strict';

	// Create the model.
	var model = app.service.sequelize.define('question', {
		questionId: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: sequelize.INTEGER.UNSIGNED
		},

		adminId: {
			allowNull: false,
			type: sequelize.INTEGER.UNSIGNED,

			references: {
				model: app.model.admin,
				key: 'adminId'
			}
		},

		questionValue: {
			allowNull: false,
			type: sequelize.STRING
		}
	});

	// Process the association after all the models have initially loaded.
	process.nextTick(function() {
		// Associate the model with the `questionAnswer` table.
		model.hasOne(app.model.questionAnswer, {
			foreignKey: 'questionId',
			targetKey: 'questionId'
		});
	});

	// Return the model.
	return model;
};
