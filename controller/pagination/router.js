/**
*
* Normalizing a set of pagination parameters for a query.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module controller/pagination/router
*
* @param {object} input A set of parameters to apply to the query.
*
* @return {object} A normalized set of query parameters.
*
*/
module.exports = function() {
	'use strict';

	return function(input) {
		// Normalize the `input` to an Object.
		input = _.isObject(input) ? input : {};

		// Set the query limit.
		input.limit = 10;

		// Subtract one from the page.
		input.page = _.parseInt(input.page) - 1;

		// Normalize the page.
		input.page = !_.isNumber(input.page) || _.isNaN(input.page) || input.page < 0 ? 0 : input.page;

		// Define the offset based upon the page.
		input.offset = input.page * input.limit;

		// Only fetch the raw results.
		input.raw = true;

		// Return the normalized `input`.
		return input;
	};
};
