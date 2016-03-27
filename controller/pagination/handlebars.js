/**
*
* Generate a pagination based upon a limit and the current page for a Handlebars partial template.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module controller/pagination/handlebars
*
* @param {number} page The current page of the pagination.
* @param {number} limitPerPage The number of items to display per page.
* @param {number} total The number of possible items that can be displayed.
*
* @return {object} An Object containing the pagination data needed for the Handlebars partial.
*
*/
module.exports = function() {
	'use strict';

	return function(page, limitPerPage, total) {
		// Determine the minimum page of the set to display.
		var minimum = page - 5 < 1 ? 1 : page;

		// Determine the maximum page of the set to display.
		var maximum = Math.ceil(total / limitPerPage) + 1;

		// Make sure the maximum doesn't go over it's threshold.
		maximum = maximum > page + 4 ? page + 4 : maximum;

		// Build a range for the set of pages.
		var range = _.range(minimum, maximum);

		// Convert the range into an Object.
		var pagination = _.zipObject(range, range);

		// Flag the current page with special values.
		pagination[page + 1] = {
			// Flag the page as active.
			active: true,

			// Handlebars cannot do simple addition, so reference the actual page number.
			page: page + 1
		};

		// Return the pagination Object.
		return pagination;
	};
};
