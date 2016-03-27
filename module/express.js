/**
*
* Loads all of the Express dependencies required by the project.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module bootstrap/express
*
**/
module.exports = !function(global) {
	'use strict';

	// Parsers the body of the incoming requests from clients.
	global.bodyParser = require('body-parser');

	// Parses client cookies.
	global.cookieParser = require('cookie-parser');

	// The Express library which contains the listening server.
	global.express = require('express');

	// Handlebars template compiler for Express.
	global.expressHandlebars = require('express-handlebars');

	// Automatically load files throughout the project into a specific namespace.
	global.expressLoad = require('express-load');

	// Enable session handling.
	global.expressSession = require('express-session');

	// Backwards compatability for clients that can't recognize request methods such as `DELETE`, `PATCH` or `PUT`.
	global.methodOverride = require('method-override');

	// A log formatter that will output incoming requests in the form of an Apache log.
	global.morgan = require('morgan');
}(global);
