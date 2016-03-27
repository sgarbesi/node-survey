/*global $, window*/

$(function() {
	'use strict';

	var me = {};

	me.init = function() {
		$('.navbar a[href=".' + window.location.pathname + '"], .navbar a[href=".' + window.location.pathname + '/"]').parent().addClass('active');

		// Mobile table fix.
		$('tbody tr').each(function() {
			$('td', this).each(function(index) {
				$(this).attr('data-label', $('thead th:nth-child(' + (index + 1) + ')', $(this).parent().parent().parent()).text());
			});
		});
	};

	me.admin = {};

	me.admin.login = {};

	me.admin.login.init = function() {
		$('#adminLogin form').submit(me.admin.login.submit);
	};

	me.admin.login.reject = function(message) {
		message = message || 'An unknown error has occurred, please try again later.';

		$('#adminLogin .alert span').html(message);
		$('#adminLogin .alert, #adminLogin hr, #adminLogin .form').removeClass('hide');
		$('#adminLogin .loader').addClass('hide');

		me.admin.login.working = false;
	};

	me.admin.login.resolve = function(results) {
		if (_.get(results, 'success') === false) {
			return me.admin.login.reject(_.get(results, 'error'));
		}

		window.location = '/admin';
	};

	me.admin.login.submit = function() {
		var adminPassword = $('#adminLogin .form input[name="adminPassword"]').val();
		var adminUsername = $('#adminLogin .form input[name="adminUsername"]').val();

		if (!adminPassword || !adminUsername || me.admin.login.working === true) {
			return false;
		}

		me.admin.login.working = true;

		$('#adminLogin .alert, #adminLogin hr, #adminLogin .form').addClass('hide');
		$('#adminLogin .loader').removeClass('hide');

		$.ajax({
			type: 'POST',
			url: '/api/v1/admin/',

			data: {
				adminPassword: adminPassword,
				adminUsername: adminUsername
			},

			error: function() {
				setTimeout(me.admin.login.reject, 1000);
			},

			success: function(results) {
				setTimeout(me.admin.login.resolve.bind(null, results), 1000);
			}
		});

		return false;
	};

	me.admin.login.working = false;

	me.admin.login.init();

	me.modal = {};

	me.modal.answer = {};

	me.modal.answer.init = function() {
		$('#modalAnswer form').submit(me.modal.answer.submit);
		$('#modalAnswer .action').click(me.modal.answer.submit);
	};

	me.modal.answer.boot = function(questionId) {
		$('#modalAnswer #modalAnswerQuestionValue').html($('#questionValue' + questionId).text());
		$('#modalAnswer .form input[name="questionId"]').val(questionId);

		$('#modalAnswer').modal({
			show: true
		});
	};

	me.modal.answer.reject = function(message) {
		message = message || 'An unknown error has occurred, please try again later.';

		$('#modalAnswer .alert span').html(message);
		$('#modalAnswer .alert, #modalAnswer .modal-footer, #modalAnswer hr, #modalAnswer .form').removeClass('hide');
		$('#modalAnswer .loader').addClass('hide');

		me.modal.answer.working = false;
	};

	me.modal.answer.resolve = function(results) {
		if (_.get(results, 'success') === false) {
			return me.modal.answer.reject(_.get(results, 'error'));
		}

		var questionId = $('#modalAnswer .form input[name="questionId"]').val();
		$('ol', $('#questionValue' + questionId).parent()).append('<li>' + $('#modalAnswer .form input[name="questionAnswerValue"]').val() + '</li>');

		me.modal.answer.working = false;

		$('#modalAnswer').modal('hide');

		$('#modalAnswer .form input[name="questionAnswerValue"]').val('');
		$('#modalAnswer .modal-footer, #modalAnswer hr, #modalAnswer .form').removeClass('hide');
		$('#modalAnswer .alert, #modalAnswer .loader').addClass('hide');
	};

	me.modal.answer.submit = function() {
		var questionAnswerValue = $('#modalAnswer .form input[name="questionAnswerValue"]').val();
		var questionId = $('#modalAnswer .form input[name="questionId"]').val();

		$('#modalAnswer .alert').addClass('hide');

		if (!questionAnswerValue) {
			$('#modalAnswer .alert span').html('Your answer cannot be empty!');
			$('#modalAnswer .alert').removeClass('hide');
		}

		if (!questionAnswerValue || !questionId || me.modal.answer.working === true) {
			return false;
		}

		me.modal.answer.working = true;

		$('#modalAnswer .modal-footer, #modalAnswer .alert, #modalAnswer hr, #modalAnswer .form').addClass('hide');
		$('#modalAnswer .loader').removeClass('hide');

		$.ajax({
			type: 'PUT',
			url: '/api/v1/question/answer/',

			data: {
				questionAnswerValue: questionAnswerValue,
				questionId: questionId
			},

			error: function() {
				setTimeout(me.modal.answer.reject, 1000);
			},

			success: function(results) {
				setTimeout(me.modal.answer.resolve.bind(null, results), 1000);
			}
		});

		return false;
	};

	me.modal.answer.working = false;

	me.modal.answer.init();

	me.modal.logout = {};

	me.modal.logout.init = function() {
		$('#modalLogout .action').click(me.modal.logout.submit);
	};

	me.modal.logout.reject = function(message) {
		message = message || 'An unknown error has occurred, please try again later.';

		$('#modalLogout .alert span').html(message);
		$('#modalLogout .alert, #modalLogout .modal-footer, #modalLogout hr, #modalLogout .form').removeClass('hide');
		$('#modalLogout .loader').addClass('hide');

		me.modal.logout.working = false;
	};

	me.modal.logout.resolve = function(results) {
		if (_.get(results, 'success') === false) {
			return me.modal.logout.reject(_.get(results, 'error'));
		}

		window.location = '/admin';
	};

	me.modal.logout.submit = function() {
		me.modal.logout.working = true;

		$('#modalLogout .modal-footer, #modalLogout .alert, #modalLogout hr, #modalLogout .form').addClass('hide');
		$('#modalLogout .loader').removeClass('hide');

		$.ajax({
			type: 'POST',
			url: '/api/v1/logout/',

			error: function() {
				setTimeout(me.modal.logout.reject, 1000);
			},

			success: function(results) {
				setTimeout(me.modal.logout.resolve.bind(null, results), 1000);
			}
		});

		return false;
	};

	me.modal.logout.working = false;

	me.modal.logout.init();

	me.modal.question = {};

	me.modal.question.init = function() {
		$('#modalQuestion form').submit(me.modal.question.submit);
		$('#modalQuestion .action').click(me.modal.question.submit);
	};

	me.modal.question.reject = function(message) {
		message = message || 'An unknown error has occurred, please try again later.';

		$('#modalQuestion .alert span').html(message);
		$('#modalQuestion .alert, #modalQuestion .modal-footer, #modalQuestion hr, #modalQuestion .form').removeClass('hide');
		$('#modalQuestion .loader').addClass('hide');

		me.modal.question.working = false;
	};

	me.modal.question.resolve = function(results) {
		if (_.get(results, 'success') === false) {
			return me.modal.question.reject(_.get(results, 'error'));
		}

		window.location = '/admin/question/';
	};

	me.modal.question.submit = function() {
		var questionValue = $('#modalQuestion .form input[name="questionValue"]').val();

		$('#modalQuestion .alert').addClass('hide');

		if (!questionValue) {
			$('#modalQuestion .alert span').html('Your question cannot be empty!');
			$('#modalQuestion .alert').removeClass('hide');
		}

		if (!questionValue || me.modal.question.working === true) {
			return false;
		}

		me.modal.question.working = true;

		$('#modalQuestion .modal-footer, #modalQuestion .alert, #modalQuestion hr, #modalQuestion .form').addClass('hide');
		$('#modalQuestion .loader').removeClass('hide');

		$.ajax({
			type: 'PUT',
			url: '/api/v1/question/',

			data: {
				questionValue: questionValue
			},

			error: function() {
				setTimeout(me.modal.question.reject, 1000);
			},

			success: function(results) {
				setTimeout(me.modal.question.resolve.bind(null, results), 1000);
			}
		});

		return false;
	};

	me.modal.question.working = false;

	me.modal.question.init();

	me.survey = {};

	me.survey.init = function() {
		$('#survey #form').submit(me.survey.submit);
		$('#survey #form .radio label').click(me.survey.submit);
	};

	me.survey.reject = function(message) {
		message = message || 'An unknown error has occurred, please try again later.';

		$('#survey .alert span').html(message);
		$('#form input:checked').prop('checked', false);
		$('.loader').addClass('hide');
		$('#survey .alert, #survey hr, #form').removeClass('hide');

		me.survey.working = false;
	};

	me.survey.resolve = function(results) {
		if (_.get(results, 'success') === false) {
			return me.survey.reject(_.get(results, 'error'));
		}

		$('#thanks').removeClass('hide');
		$('#survey .alert, #survey hr, #form, .loader').addClass('hide');

		me.survey.working = false;
	};

	me.survey.submit = function() {
		var questionAnswerId = parseInt($('#form input:checked').val(), 10);
		var questionId = parseInt($('#form input:checked').attr('name'), 10);

		if (!questionAnswerId || !questionId || me.survey.working === true) {
			return;
		}

		me.survey.working = true;

		$('#survey .alert, #survey hr, #form').addClass('hide');
		$('.loader').removeClass('hide');

		$.ajax({
			type: 'PUT',
			url: '/api/v1/user/answer/',

			data: {
				questionAnswerId: questionAnswerId,
				questionId: questionId
			},

			error: function() {
				setTimeout(me.survey.reject, 1000);
			},

			success: function(results) {
				setTimeout(me.survey.resolve.bind(null, results), 1000);
			}
		});
	};

	me.survey.working = false;

	me.survey.init();

	me.init();

	window.app = me;
});
