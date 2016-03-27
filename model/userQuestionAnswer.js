/**
*
* This table contains the users answers to the survey.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module model/userQuestionAnswer
*
**/
module.exports = function(app) {
	'use strict';

	// Create the model.
	var model = app.service.sequelize.define('userQuestionAnswer', {
		userQuestionAnswerId: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: sequelize.INTEGER.UNSIGNED
		},

		userId: {
			allowNull: false,
			type: sequelize.INTEGER.UNSIGNED,

			references: {
				model: app.model.user,
				key: 'userId'
			}
		},

		questionAnswerId: {
			allowNull: false,
			type: sequelize.INTEGER.UNSIGNED,

			references: {
				model: app.model.questionAnswer,
				key: 'questionAnswerId'
			}
		}
	});

	// Process the association after all the models have initially loaded.
	process.nextTick(function() {
		// Associate the model with the `user` table.
		model.belongsTo(app.model.user, {
			foreignKey: 'userId',
			targetKey: 'userId'
		});

		// Associate the model with the `questionAnswer` table.
		model.belongsTo(app.model.questionAnswer, {
			foreignKey: 'questionAnswerId',
			targetKey: 'questionAnswerId'
		});
	});

	// Return the model.
	return model;
};
