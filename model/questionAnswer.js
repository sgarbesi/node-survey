/**
*
* This table contains the available answers for a given question.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module model/questionAnswer
*
**/
module.exports = function(app) {
	'use strict';

	// Create the model.
	var model = app.service.sequelize.define('questionAnswer', {
		questionAnswerId: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: sequelize.INTEGER.UNSIGNED
		},

		questionId: {
			allowNull: false,
			type: sequelize.INTEGER.UNSIGNED,

			references: {
				model: app.model.question,
				key: 'questionId'
			}
		},

		adminId: {
			allowNull: false,
			type: sequelize.INTEGER.UNSIGNED,

			references: {
				model: app.model.admin,
				key: 'adminId'
			}
		},

		questionAnswerValue: sequelize.STRING
	});

	// Process the association after all the models have initially loaded.
	process.nextTick(function() {
		// Associate the model with the `question` table.
		model.belongsTo(app.model.question, {
			foreignKey: 'questionId',
			targetKey: 'questionId'
		});

		// Associate the model with the `userQuestionAnswer` table.
		model.hasOne(app.model.userQuestionAnswer, {
			foreignKey: 'questionAnswerId',
			targetKey: 'questionAnswerId'
		});
	});

	// Return the model.
	return model;
};
