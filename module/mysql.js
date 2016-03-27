/**
*
* Loads all of the MySQL services for the project.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module bootstrap/mysql
*
**/
module.exports = !function(global) {
	'use strict';

	// MySQL connector.
	global.mysql = require('mysql');

	// The ORM for the project.
	global.sequelize = require('sequelize');
}(global);
