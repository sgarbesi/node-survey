/**
*
* This table contains the administrator user records.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module model/admin
*
**/
module.exports = function(app) {
	'use strict';

	// Create the model.
	return app.service.sequelize.define('admin', {
		adminId: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: sequelize.INTEGER.UNSIGNED
		},

		adminPassword: {
			allowNull: false,
			type: sequelize.STRING
		},

		adminUsername: {
			allowNull: false,
			type: sequelize.STRING
		}
	});
};
