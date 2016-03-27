/**
*
* This table contains the user records whom have taken the survey.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module model/user
*
**/
module.exports = function(app) {
	'use strict';

	// Create the model.
	return app.service.sequelize.define('user', {
		userId: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: sequelize.INTEGER.UNSIGNED
		},

		userAgent: {
			allowNull: false,
			type: sequelize.STRING
		},

		userHash: {
			allowNull: false,
			type: sequelize.STRING,
			unique: true
		},

		userIp: {
			allowNull: false,
			type: sequelize.STRING
		}
	});
};
