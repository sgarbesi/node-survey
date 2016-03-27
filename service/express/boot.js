/**
*
* Loads the Express HTTP listening server.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module service/express/boot
*
* @param {callback} callback If present, will be invoked with the reference of the Express server.
*
* @callback callback
* @param {string|undefined} If there's an error it'll be a String, if there's no error it'll be undefined.
* @param {object} Upon success, the results will reside in this Object.
*
**/
module.exports = function(app) {
	'use strict';

	return function(callback) {
		// Throw a log to console.
		console.info('service', 'express', 'boot');

		// Reference the Express configuration.
		var config = app.service.environment.express;

		// Create a new instance of the Express module.
		var me = app.service.express = new express();

		// Enable template compilation and caching.
		me.enable('view cache');

		// Enable the Handlebars template parser.
		me.engine('handlebars', expressHandlebars({
			defaultLayout: 'main'
		}));

		// Set the view parser to use Handlebars.
		me.set('view engine', 'handlebars');

		// Log requests in a Apache standard format.
		me.use(morgan('combined', {
			stream: {
				write: console.info.bind(null, 'service', 'express')
			}
		}));

		// Enable the `bodyParser` module to encode URLs properly.
		me.use(bodyParser.urlencoded({
			 extended: true
		}));

		// Enable the `bodyParser` module to enable returning JSON.
		me.use(bodyParser.json({
			 extended: true
		}));

		// Enable the cookie parser.
		me.use(cookieParser());

		// Attach cookie based sessions to Express.
		me.use(expressSession({
			// Force the session to be saved.
			resave: true,

			// Force a new, but unmodified session to be saved.
			saveUninitialized: true,

			// Secret signature for the cookie.
			secret: config.secret
		}));

		// Use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
		me.use(methodOverride());

		// Serve the static directory.
		me.use(express.static(app.service.uri.static));

		// Load the dynamic routes.
		app.service.config.directory('router', function() {
			// Start the listening server.
			me.listen(config.port, config.host, function(error) {
				// If there's an error, then handle it.
				if (error) {
					// Throw an error log to console.
					console.error('service', 'express', 'boot', error);
				} else {
					// Throw a info log to console.
					console.info('service', 'express', 'boot', 'http://' + config.host + ':' + config.port + '/');
				}

				// Invoke the callback.
				callback(error);
			});
		});
	};
};
