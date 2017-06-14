(function () {
	"use strict";

	$(function () {

		/** Smooth Scroll **/

		var animateScroll = function(target) {
			$('nav a').not(target).removeClass('active');
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1000).addClass('active');
			return false;
		}

		var setScroll = function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash).addClass('active');
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					animateScroll(target);
				}
			}
		};

		/** Templating **/

		var partials_arr = [
			'header',
			'about',
			'features',
			'gallery',
			'testimonials',
			'contact',
			'footer'
		];

		var registerPartials = function (arr) {
			arr.forEach(function (name) {
				Handlebars.registerPartial(name, $('#' + name + '-template').html());
			});
		};

		var setTemplates = function (tmpl, entry) {
			var compiled_template = Handlebars.compile($('#' + tmpl).html());
			$('#' + entry).html(compiled_template(getData()));
		};

		var fixNavigationBar = function() {
				$('.navbar').toggleClass('navbar-fixed-top', $(this).scrollTop() > 64);
			var scrollPos = $(this).scrollTop() + 80;
			$('.nav a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
					$('.nav a').removeClass("active");
					currLink.addClass("active");
				}
				else {
					currLink.removeClass("active");
				}
			});
				return false;
		};

		var showActive = function(e) {
			$('.nav').find('a').removeClass('active');
			$(e.target).addClass('active');
		};

		var sendEmail = function() {
			$.ajax({
				url : 'email.php',
				method : 'POST',
				dataType: 'jsonp',
				data : {
					to  : '',
					from :  $('[name=email').val(),
					msg  : $('[name=message').val()

				},
			  success : function() {
				  alert('hello');
			  }
			});
		};

		var bindEvents = function () {
			registerPartials(partials_arr);
			setTemplates('site-template', 'main-container');
			$('nav a[href*="#"]:not([href="#"]').on('click', setScroll);
			$('.nav').on('click', 'a', showActive);
			$(document).on("scroll", fixNavigationBar);
			$('form button').on('click', sendEmail);
		};

		bindEvents();

	});

}(jQuery));
