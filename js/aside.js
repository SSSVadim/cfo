'use strict';

/* Drop submenu add class on hover li*/
var menuParents = document.querySelectorAll('.aside-menu__link-parent');

var _loop = function _loop(i) {
	var menuParent = menuParents[i];
	menuParent.addEventListener("mouseenter", function (e) {
		menuParent.classList.add('active');
	});
	menuParent.addEventListener("mouseleave", function (e) {
		menuParent.classList.remove('active');
	});
};

for (var i = 0; i < menuParents.length; i++) {
	_loop(i);
}

/* Burger + dropdown animation */
var asideBurgerIco = document.querySelector('.aside-menu__icon');
var asideBlock = document.querySelector('.aside-menu__body');
var disabledClick = false;
var time = 300;
asideBurgerIco.addEventListener('click', function (e) {

	// Если нажатие заблокировано
	if (disabledClick === true) {
		return false;
	}

	// Блокируем нажание
	disabledClick = true;

	// Разблокируем нажатие когда анимация (предположительно) должна завершится
	setTimeout(function () {
		disabledClick = false;
	}, time);

	asideBurgerIco.classList.toggle('active');
	_slideToggle(asideBlock, time);
});

//SlideToggle
var _slideUp = function _slideUp(target) {
	var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(function () {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
};
var _slideDown = function _slideDown(target) {
	var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

	target.style.removeProperty('display');
	var display = window.getComputedStyle(target).display;
	if (display === 'none') display = 'block';

	target.style.display = display;
	var height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(function () {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
};
var _slideToggle = function _slideToggle(target) {
	var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
};
//========================================