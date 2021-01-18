'use strict';

//Adaptive functions
$(window).resize(function (event) {
	adaptive_function();
});
function adaptive_header(w, h) {
	/*Вводим пременные для объектов, которые нужно перекидывать*/
	var mobileMenu = $('.adaptive-header-menu');
	var menu = $('.header-menu');

	/*На определенной ширине, перекидывает элементы appendTo prependTo insertAfter insertBefore*/
	/*По порядку*/
	if (w < 993) {
		if (!menu.hasClass('done')) {
			menu.addClass('done').appendTo(mobileMenu);
		}

		/*Если экран шире, то кидаем обратно appendTo prependTo insertAfter insertBefore*/
	} else {
		if (menu.hasClass('done')) {
			menu.removeClass('done').appendTo($('.header-bottom .container .header-bottom__body'));
		}
	}
}

function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_header(w, h);
}
adaptive_function();