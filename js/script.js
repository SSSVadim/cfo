"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* ====== start "START JS" ======== */
$(document).ready(function () {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var isMobile = { Android: function Android() {
			return navigator.userAgent.match(/Android/i);
		}, BlackBerry: function BlackBerry() {
			return navigator.userAgent.match(/BlackBerry/i);
		}, iOS: function iOS() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		}, Opera: function Opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		}, Windows: function Windows() {
			return navigator.userAgent.match(/IEMobile/i);
		}, any: function any() {
			return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
		} };
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}
	if (isIE()) {
		$('body').addClass('ie');
	}
	if (isMobile.any()) {
		$('body').addClass('touch');
	}
	/* ===== end "START JS" ======= */

	/* ======== start "MAIN SCRIPT BLOCK" ======== */

	/*========================= МЕНЮ, ХЭДДЕР ===============================*/
	/*======================================================================*/
	/*======================================================================*/
	$('.header-menu__icon').click(function (event) {
		$(this).toggleClass('active');
		$('.adaptive-header-menu').toggleClass('active');
		$('.adaptive-header-menu__mask').toggleClass('active');
		if ($(this).hasClass('active')) {
			$('body').data('scroll', $(window).scrollTop());
		}
		$('body').toggleClass('lock');
		if (!$(this).hasClass('active')) {
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	});

	/* Клик вне области для меню и других элементов */
	document.documentElement.addEventListener("click", function (e) {

		/* Это для других элементов, которые всплывают 
  		if (!e.target.closest('.user-header')) {    //Если у target нет родителя с классом 
  let user_menu = document.querySelector('.user-header__menu');  //Сохр в переменную 
  user_menu.classList.remove('active'); //удлаляем класс
  }
  */

		/* Это для меню уже */

		if (!e.target.closest('.header-menu__icon') && !e.target.closest('.adaptive-header-menu') && !e.target.closest('.popup')) {
			/*Если клик не был по одному из объектов  */
			var menuAd = document.querySelector('.adaptive-header-menu'); /*Сохр в переменную */
			var menuAdMask = document.querySelector('.adaptive-header-menu__mask'); /*Сохр в переменную */
			var menuIco = document.querySelector('.header-menu__icon'); /*Сохр в переменную */
			var body = document.querySelector('body'); /*Сохр в переменную */
			menuAd.classList.remove('active'); /*удлаляем класс */
			menuAdMask.classList.remove('active'); /*удлаляем класс */
			menuIco.classList.remove('active'); /*удлаляем класс */
			body.classList.remove('lock'); /*удлаляем класс */
		}
	});

	/*SCROLL MENU*/
	var fixed_menu = function fixed_menu(e) {

		if ($(window).outerWidth() > 992.98) {

			if ($(document).scrollTop() > 200) {
				$('.header').addClass('header_scroll'); //задаем класс, который "готовит" меню на top:-200 например
			} else {
				$('.header').removeClass('header_scroll');
			}

			if ($(document).scrollTop() > 310) {
				$('.header').removeClass('header_scroll');
				$('.header').addClass('header_ready'); //задаем класс, который "готовит" меню на top:-200 например
			} else {
				$('.header').removeClass('header_ready');
			}

			if ($(document).scrollTop() > 500) {
				$('.header').addClass('header_fixed'); //класс который меняет top: 0 и меню выплывает сверху
			} else {
				$('.header').removeClass('header_fixed');
			}
		}
	};
	$(window).scroll(fixed_menu).resize(fixed_menu);

	/*SCROLL MENU for Phone*/
	var scrollNow = 0;
	var scrollBefore = 0;

	var phoneScrollMenu = function phoneScrollMenu(e) {

		if ($(window).outerWidth() < 992.98 && $(document).scrollTop() > 200) {
			$('.header').removeClass('header_fixed'); //fix for change outerWidth from pc to phone
			$('.header').removeClass('header_ready'); //fix for change outerWidth from pc to phone
			scrollNow = $(document).scrollTop();

			if (scrollNow > scrollBefore) {
				scrollBefore = scrollNow;
				$('.header').removeClass('mobile_scrollUp');
				$('.header').addClass('mobile_scrollDown');
			} else {
				scrollBefore = scrollNow;
				$('.header').addClass('mobile_scrollUp');
				$('.header').removeClass('mobile_scrollDown');
			}
		} else {
			$('.header').removeClass('mobile_scrollUp');
			$('.header').removeClass('mobile_scrollDown');
		}
	};
	$(window).scroll(phoneScrollMenu).resize(phoneScrollMenu);

	/* GoTo */
	$('.goto').click(function () {
		var el = $(this).attr('href').replace('#', ''); //получаем имя из href
		var offset = $('.header').innerHeight(); //offset - переменная для обратного отступа
		$('body,html').animate({ scrollTop: $('.' + el).offset().top - offset }, 500, function () {});

		if ($('.adaptive-header-menu').hasClass('active')) {
			$('.adaptive-header-menu,.header-menu__icon,.adaptive-header-menu__mask').removeClass('active');
			$('body').removeClass('lock');
		}
		return false;
	});

	/* Active scroll nav link  */
	// Polyfill 
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	window.addEventListener('scroll', function () {

		var scrollDistance = window.scrollY; // переменная для замера дистанции (сколько проскролили)
		var scrollable = document.documentElement.scrollHeight - window.innerHeight; // вспомогательная переменная (высота док-та минус высота экрана)
		var scrolledInPerc = scrollDistance / scrollable * 100; // вычисление сколько проскролено в процентах

		//console.log('Now scrolled: ' + scrollDistance);
		//console.log('Now scrolled in %: ' + scrolledInPerc);
		//console.log('Scrollable ' + scrollable);

		var sectionsForScroll = document.querySelectorAll("[data-scroll='active']"); //получение всех секций для скрола в массив по дата атрибуту
		var linksForScroll = document.querySelectorAll('.header-menu__link'); // получение в массив всех пунктов меню для скрола

		sectionsForScroll.forEach(function (el, i) {

			if (el.offsetTop - document.querySelector('.header').clientHeight <= scrollDistance + 200) {
				linksForScroll.forEach(function (el) {
					if (el.classList.contains('activePoint')) {
						el.classList.remove('activePoint');
					}
				});
				linksForScroll[i].classList.add('activePoint');

				if (scrolledInPerc > 95) {
					linksForScroll[i].classList.remove('activePoint');
					linksForScroll[linksForScroll.length - 1].classList.add('activePoint');
				}
			}
		});
	});

	/*========================= Other ===============================*/
	/*======================================================================*/
	/*======================================================================*/

	/* Ibg */

	function ibg() {
		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}
	ibg();

	/* Ibg Parallax*/
	function ibgparallax() {
		$.each($('.ibgparallax'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}
	ibgparallax();

	/* Autoheight elements */

	function ah() {
		$(".autoheight").each(function () {
			var container = $(this);
			var same = $(".same", this);
			var mh = 0;
			if ($(window).outerWidth() > 992.98) {
				container.find(same).each(function () {
					same.height('auto');
					var h_block = parseInt($(this).height());
					if (h_block > mh) {
						mh = h_block;
					};
				});
			} else {
				mh = same.height('auto');
			};
			container.find(same).height(mh);
		});
	};
	ah();
	window.onresize = ah;

	/* nouislider №1 */
	var slider = document.getElementById('rangecredit');

	noUiSlider.create(slider, {
		start: [20],
		connect: [true, false],
		range: {
			'min': [10000, 10000],
			'max': [15000000]
		}

	});

	var inputNumber = document.getElementById('credit-value');
	slider.noUiSlider.on('update', function (values) {
		var value = values;
		inputNumber.value = Math.round(value);
	});
	inputNumber.addEventListener('change', function () {
		slider.noUiSlider.set([this.value, null]);
	});

	/* nouislider №2 */
	var sliderperiod = document.getElementById('rangecredit-period');

	noUiSlider.create(sliderperiod, {
		start: [3],
		connect: [true, false],
		range: {
			'min': 1,
			'max': 30
		}
	});

	var inputNumberPeriod = document.getElementById('credit-period');
	sliderperiod.noUiSlider.on('update', function (values) {
		var value = values;
		inputNumberPeriod.value = Math.round(value);
	});
	inputNumberPeriod.addEventListener('change', function () {
		sliderperiod.noUiSlider.set([this.value, null]);
	});

	/*FORM AJAX*/
	/*CREDIT FORM*/
	$('.credit-form').submit(function (event) {
		event.preventDefault();
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			popupOpen('message');
			$(".credit-form__field-phone").val("");
			$(".credit-form__field-phone").focus();
		});
		return false;
	});

	/*CONSULTATION FORM*/
	$('.consultation-form').submit(function (event) {
		event.preventDefault();
		$.ajax({
			type: "POST",
			url: "consultation.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			popupOpen('message');
			$(".consultation-form").trigger("reset");
			$(".consultation-form__field-name").focus();
			$(".consultation-form__field-phone").focus();
			$(".consultation-form__field-mail").focus();
		});
		return false;
	});

	/*POPUP FORM*/
	$('.form-callback').submit(function (event) {
		event.preventDefault();
		$.ajax({
			type: "POST",
			url: "popup.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$('.form-callback').trigger("reset");
			$('.form-callback input').focus();
			popupClose();
			popupOpen('message');
		});
		return false;
	});

	/* jquery.nicescroll v3.7.6 InuYaksa - MIT - https://nicescroll.areaaperta.com */
	!function (e) {
		"function" == typeof define && define.amd ? define(["jquery"], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) ? module.exports = e(require("jquery")) : e(jQuery);
	}(function (e) {
		"use strict";
		var o = !1,
		    t = !1,
		    r = 0,
		    i = 2e3,
		    s = 0,
		    n = e,
		    l = document,
		    a = window,
		    c = n(a),
		    d = [],
		    u = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || !1,
		    h = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || !1;if (u) a.cancelAnimationFrame || (h = function h(e) {});else {
			var p = 0;u = function u(e, o) {
				var t = new Date().getTime(),
				    r = Math.max(0, 16 - (t - p)),
				    i = a.setTimeout(function () {
					e(t + r);
				}, r);return p = t + r, i;
			}, h = function h(e) {
				a.clearTimeout(e);
			};
		}var m = a.MutationObserver || a.WebKitMutationObserver || !1,
		    f = Date.now || function () {
			return new Date().getTime();
		},
		    g = { zindex: "auto", cursoropacitymin: 0, cursoropacitymax: 1, cursorcolor: "#424242", cursorwidth: "6px", cursorborder: "1px solid #fff", cursorborderradius: "5px", scrollspeed: 40, mousescrollstep: 27, touchbehavior: !1, emulatetouch: !1, hwacceleration: !0, usetransition: !0, boxzoom: !1, dblclickzoom: !0, gesturezoom: !0, grabcursorenabled: !0, autohidemode: !0, background: "", iframeautoresize: !0, cursorminheight: 32, preservenativescrolling: !0, railoffset: !1, railhoffset: !1, bouncescroll: !0, spacebarenabled: !0, railpadding: { top: 0, right: 0, left: 0, bottom: 0 }, disableoutline: !0, horizrailenabled: !0, railalign: "right", railvalign: "bottom", enabletranslate3d: !0, enablemousewheel: !0, enablekeyboard: !0, smoothscroll: !0, sensitiverail: !0, enablemouselockapi: !0, cursorfixedheight: !1, directionlockdeadzone: 6, hidecursordelay: 400, nativeparentscrolling: !0, enablescrollonselection: !0, overflowx: !0, overflowy: !0, cursordragspeed: .3, rtlmode: "auto", cursordragontouch: !1, oneaxismousemode: "auto", scriptpath: function () {
				var e = l.currentScript || function () {
					var e = l.getElementsByTagName("script");return !!e.length && e[e.length - 1];
				}(),
				    o = e ? e.src.split("?")[0] : "";return o.split("/").length > 0 ? o.split("/").slice(0, -1).join("/") + "/" : "";
			}(), preventmultitouchscrolling: !0, disablemutationobserver: !1, enableobserver: !0, scrollbarid: !1 },
		    v = !1,
		    w = function w() {
			if (v) return v;var e = l.createElement("DIV"),
			    o = e.style,
			    t = navigator.userAgent,
			    r = navigator.platform,
			    i = {};return i.haspointerlock = "pointerLockElement" in l || "webkitPointerLockElement" in l || "mozPointerLockElement" in l, i.isopera = "opera" in a, i.isopera12 = i.isopera && "getUserMedia" in navigator, i.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(a.operamini), i.isie = "all" in l && "attachEvent" in e && !i.isopera, i.isieold = i.isie && !("msInterpolationMode" in o), i.isie7 = i.isie && !i.isieold && (!("documentMode" in l) || 7 === l.documentMode), i.isie8 = i.isie && "documentMode" in l && 8 === l.documentMode, i.isie9 = i.isie && "performance" in a && 9 === l.documentMode, i.isie10 = i.isie && "performance" in a && 10 === l.documentMode, i.isie11 = "msRequestFullscreen" in e && l.documentMode >= 11, i.ismsedge = "msCredentials" in a, i.ismozilla = "MozAppearance" in o, i.iswebkit = !i.ismsedge && "WebkitAppearance" in o, i.ischrome = i.iswebkit && "chrome" in a, i.ischrome38 = i.ischrome && "touchAction" in o, i.ischrome22 = !i.ischrome38 && i.ischrome && i.haspointerlock, i.ischrome26 = !i.ischrome38 && i.ischrome && "transition" in o, i.cantouch = "ontouchstart" in l.documentElement || "ontouchstart" in a, i.hasw3ctouch = (a.PointerEvent || !1) && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), i.hasmstouch = !i.hasw3ctouch && (a.MSPointerEvent || !1), i.ismac = /^mac$/i.test(r), i.isios = i.cantouch && /iphone|ipad|ipod/i.test(r), i.isios4 = i.isios && !("seal" in Object), i.isios7 = i.isios && "webkitHidden" in l, i.isios8 = i.isios && "hidden" in l, i.isios10 = i.isios && a.Proxy, i.isandroid = /android/i.test(t), i.haseventlistener = "addEventListener" in e, i.trstyle = !1, i.hastransform = !1, i.hastranslate3d = !1, i.transitionstyle = !1, i.hastransition = !1, i.transitionend = !1, i.trstyle = "transform", i.hastransform = "transform" in o || function () {
				for (var e = ["msTransform", "webkitTransform", "MozTransform", "OTransform"], t = 0, r = e.length; t < r; t++) {
					if (void 0 !== o[e[t]]) {
						i.trstyle = e[t];break;
					}
				}i.hastransform = !!i.trstyle;
			}(), i.hastransform && (o[i.trstyle] = "translate3d(1px,2px,3px)", i.hastranslate3d = /translate3d/.test(o[i.trstyle])), i.transitionstyle = "transition", i.prefixstyle = "", i.transitionend = "transitionend", i.hastransition = "transition" in o || function () {
				i.transitionend = !1;for (var e = ["webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"], t = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"], r = ["webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"], s = 0, n = e.length; s < n; s++) {
					if (e[s] in o) {
						i.transitionstyle = e[s], i.prefixstyle = t[s], i.transitionend = r[s];break;
					}
				}i.ischrome26 && (i.prefixstyle = t[1]), i.hastransition = i.transitionstyle;
			}(), i.cursorgrabvalue = function () {
				var e = ["grab", "-webkit-grab", "-moz-grab"];(i.ischrome && !i.ischrome38 || i.isie) && (e = []);for (var t = 0, r = e.length; t < r; t++) {
					var s = e[t];if (o.cursor = s, o.cursor == s) return s;
				}return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize";
			}(), i.hasmousecapture = "setCapture" in e, i.hasMutationObserver = !1 !== m, e = null, v = i, i;
		},
		    b = function b(e, p) {
			function v() {
				var e = T.doc.css(P.trstyle);return !(!e || "matrix" != e.substr(0, 6)) && e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/);
			}function b() {
				var e = T.win;if ("zIndex" in e) return e.zIndex();for (; e.length > 0;) {
					if (9 == e[0].nodeType) return !1;var o = e.css("zIndex");if (!isNaN(o) && 0 !== o) return parseInt(o);e = e.parent();
				}return !1;
			}function x(e, o, t) {
				var r = e.css(o),
				    i = parseFloat(r);if (isNaN(i)) {
					var s = 3 == (i = I[r] || 0) ? t ? T.win.outerHeight() - T.win.innerHeight() : T.win.outerWidth() - T.win.innerWidth() : 1;return T.isie8 && i && (i += 1), s ? i : 0;
				}return i;
			}function S(e, o, t, r) {
				T._bind(e, o, function (r) {
					var i = { original: r = r || a.event, target: r.target || r.srcElement, type: "wheel", deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1, deltaX: 0, deltaZ: 0, preventDefault: function preventDefault() {
							return r.preventDefault ? r.preventDefault() : r.returnValue = !1, !1;
						}, stopImmediatePropagation: function stopImmediatePropagation() {
							r.stopImmediatePropagation ? r.stopImmediatePropagation() : r.cancelBubble = !0;
						} };return "mousewheel" == o ? (r.wheelDeltaX && (i.deltaX = -.025 * r.wheelDeltaX), r.wheelDeltaY && (i.deltaY = -.025 * r.wheelDeltaY), !i.deltaY && !i.deltaX && (i.deltaY = -.025 * r.wheelDelta)) : i.deltaY = r.detail, t.call(e, i);
				}, r);
			}function z(e, o, t, r) {
				T.scrollrunning || (T.newscrolly = T.getScrollTop(), T.newscrollx = T.getScrollLeft(), D = f());var i = f() - D;if (D = f(), i > 350 ? A = 1 : A += (2 - A) / 10, e = e * A | 0, o = o * A | 0, e) {
					if (r) if (e < 0) {
						if (T.getScrollLeft() >= T.page.maxw) return !0;
					} else if (T.getScrollLeft() <= 0) return !0;var s = e > 0 ? 1 : -1;X !== s && (T.scrollmom && T.scrollmom.stop(), T.newscrollx = T.getScrollLeft(), X = s), T.lastdeltax -= e;
				}if (o) {
					if (function () {
						var e = T.getScrollTop();if (o < 0) {
							if (e >= T.page.maxh) return !0;
						} else if (e <= 0) return !0;
					}()) {
						if (M.nativeparentscrolling && t && !T.ispage && !T.zoomactive) return !0;var n = T.view.h >> 1;T.newscrolly < -n ? (T.newscrolly = -n, o = -1) : T.newscrolly > T.page.maxh + n ? (T.newscrolly = T.page.maxh + n, o = 1) : o = 0;
					}var l = o > 0 ? 1 : -1;B !== l && (T.scrollmom && T.scrollmom.stop(), T.newscrolly = T.getScrollTop(), B = l), T.lastdeltay -= o;
				}(o || e) && T.synched("relativexy", function () {
					var e = T.lastdeltay + T.newscrolly;T.lastdeltay = 0;var o = T.lastdeltax + T.newscrollx;T.lastdeltax = 0, T.rail.drag || T.doScrollPos(o, e);
				});
			}function k(e, o, t) {
				var r, i;return !(t || !q) || (0 === e.deltaMode ? (r = -e.deltaX * (M.mousescrollstep / 54) | 0, i = -e.deltaY * (M.mousescrollstep / 54) | 0) : 1 === e.deltaMode && (r = -e.deltaX * M.mousescrollstep * 50 / 80 | 0, i = -e.deltaY * M.mousescrollstep * 50 / 80 | 0), o && M.oneaxismousemode && 0 === r && i && (r = i, i = 0, t && (r < 0 ? T.getScrollLeft() >= T.page.maxw : T.getScrollLeft() <= 0) && (i = r, r = 0)), T.isrtlmode && (r = -r), z(r, i, t, !0) ? void (t && (q = !0)) : (q = !1, e.stopImmediatePropagation(), e.preventDefault()));
			}var T = this;this.version = "3.7.6", this.name = "nicescroll", this.me = p;var E = n("body"),
			    M = this.opt = { doc: E, win: !1 };if (n.extend(M, g), M.snapbackspeed = 80, e) for (var L in M) {
				void 0 !== e[L] && (M[L] = e[L]);
			}if (M.disablemutationobserver && (m = !1), this.doc = M.doc, this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || "" : "", this.ispage = /^BODY|HTML/.test(M.win ? M.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = !1 !== M.win, this.win = M.win || (this.ispage ? c : this.doc), this.docscroll = this.ispage && !this.haswrapper ? c : this.win, this.body = E, this.viewport = !1, this.isfixed = !1, this.iframe = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != M.autohidemode, this.onmousedown = !1, this.onmouseup = !1, this.onmousemove = !1, this.onmousewheel = !1, this.onkeypress = !1, this.ongesturezoom = !1, this.onclick = !1, this.onscrollstart = !1, this.onscrollend = !1, this.onscrollcancel = !1, this.onzoomin = !1, this.onzoomout = !1, this.view = !1, this.page = !1, this.scroll = { x: 0, y: 0 }, this.scrollratio = { x: 0, y: 0 }, this.cursorheight = 20, this.scrollvaluemax = 0, "auto" == M.rtlmode) {
				var C = this.win[0] == a ? this.body : this.win,
				    N = C.css("writing-mode") || C.css("-webkit-writing-mode") || C.css("-ms-writing-mode") || C.css("-moz-writing-mode");"horizontal-tb" == N || "lr-tb" == N || "" === N ? (this.isrtlmode = "rtl" == C.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == N || "tb" == N || "tb-rl" == N || "rl-tb" == N, this.isvertical = "vertical-rl" == N || "tb" == N || "tb-rl" == N);
			} else this.isrtlmode = !0 === M.rtlmode, this.isvertical = !1;if (this.scrollrunning = !1, this.scrollmom = !1, this.observer = !1, this.observerremover = !1, this.observerbody = !1, !1 !== M.scrollbarid) this.id = M.scrollbarid;else do {
				this.id = "ascrail" + i++;
			} while (l.getElementById(this.id));this.rail = !1, this.cursor = !1, this.cursorfreezed = !1, this.selectiondrag = !1, this.zoom = !1, this.zoomactive = !1, this.hasfocus = !1, this.hasmousefocus = !1, this.railslocked = !1, this.locked = !1, this.hidden = !1, this.cursoractive = !0, this.wheelprevented = !1, this.overflowx = M.overflowx, this.overflowy = M.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltax = 0, this.lastdeltay = 0, this.detected = w();var P = n.extend({}, this.detected);this.canhwscroll = P.hastransform && M.hwacceleration, this.ishwscroll = this.canhwscroll && T.haswrapper, this.isrtlmode ? this.isvertical ? this.hasreversehr = !(P.iswebkit || P.isie || P.isie11) : this.hasreversehr = !(P.iswebkit || P.isie && !P.isie10 && !P.isie11) : this.hasreversehr = !1, this.istouchcapable = !1, P.cantouch || !P.hasw3ctouch && !P.hasmstouch ? !P.cantouch || P.isios || P.isandroid || !P.iswebkit && !P.ismozilla || (this.istouchcapable = !0) : this.istouchcapable = !0, M.enablemouselockapi || (P.hasmousecapture = !1, P.haspointerlock = !1), this.debounced = function (e, o, t) {
				T && (T.delaylist[e] || !1 || (T.delaylist[e] = { h: u(function () {
						T.delaylist[e].fn.call(T), T.delaylist[e] = !1;
					}, t) }, o.call(T)), T.delaylist[e].fn = o);
			}, this.synched = function (e, o) {
				T.synclist[e] ? T.synclist[e] = o : (T.synclist[e] = o, u(function () {
					T && (T.synclist[e] && T.synclist[e].call(T), T.synclist[e] = null);
				}));
			}, this.unsynched = function (e) {
				T.synclist[e] && (T.synclist[e] = !1);
			}, this.css = function (e, o) {
				for (var t in o) {
					T.saved.css.push([e, t, e.css(t)]), e.css(t, o[t]);
				}
			}, this.scrollTop = function (e) {
				return void 0 === e ? T.getScrollTop() : T.setScrollTop(e);
			}, this.scrollLeft = function (e) {
				return void 0 === e ? T.getScrollLeft() : T.setScrollLeft(e);
			};var R = function R(e, o, t, r, i, s, n) {
				this.st = e, this.ed = o, this.spd = t, this.p1 = r || 0, this.p2 = i || 1, this.p3 = s || 0, this.p4 = n || 1, this.ts = f(), this.df = o - e;
			};if (R.prototype = { B2: function B2(e) {
					return 3 * (1 - e) * (1 - e) * e;
				}, B3: function B3(e) {
					return 3 * (1 - e) * e * e;
				}, B4: function B4(e) {
					return e * e * e;
				}, getPos: function getPos() {
					return (f() - this.ts) / this.spd;
				}, getNow: function getNow() {
					var e = (f() - this.ts) / this.spd,
					    o = this.B2(e) + this.B3(e) + this.B4(e);return e >= 1 ? this.ed : this.st + this.df * o | 0;
				}, update: function update(e, o) {
					return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = f(), this.df = this.ed - this.st, this;
				} }, this.ishwscroll) {
				this.doc.translate = { x: 0, y: 0, tx: "0px", ty: "0px" }, P.hastranslate3d && P.isios && this.doc.css("-webkit-backface-visibility", "hidden"), this.getScrollTop = function (e) {
					if (!e) {
						var o = v();if (o) return 16 == o.length ? -o[13] : -o[5];if (T.timerscroll && T.timerscroll.bz) return T.timerscroll.bz.getNow();
					}return T.doc.translate.y;
				}, this.getScrollLeft = function (e) {
					if (!e) {
						var o = v();if (o) return 16 == o.length ? -o[12] : -o[4];if (T.timerscroll && T.timerscroll.bh) return T.timerscroll.bh.getNow();
					}return T.doc.translate.x;
				}, this.notifyScrollEvent = function (e) {
					var o = l.createEvent("UIEvents");o.initUIEvent("scroll", !1, !1, a, 1), o.niceevent = !0, e.dispatchEvent(o);
				};var _ = this.isrtlmode ? 1 : -1;P.hastranslate3d && M.enabletranslate3d ? (this.setScrollTop = function (e, o) {
					T.doc.translate.y = e, T.doc.translate.ty = -1 * e + "px", T.doc.css(P.trstyle, "translate3d(" + T.doc.translate.tx + "," + T.doc.translate.ty + ",0)"), o || T.notifyScrollEvent(T.win[0]);
				}, this.setScrollLeft = function (e, o) {
					T.doc.translate.x = e, T.doc.translate.tx = e * _ + "px", T.doc.css(P.trstyle, "translate3d(" + T.doc.translate.tx + "," + T.doc.translate.ty + ",0)"), o || T.notifyScrollEvent(T.win[0]);
				}) : (this.setScrollTop = function (e, o) {
					T.doc.translate.y = e, T.doc.translate.ty = -1 * e + "px", T.doc.css(P.trstyle, "translate(" + T.doc.translate.tx + "," + T.doc.translate.ty + ")"), o || T.notifyScrollEvent(T.win[0]);
				}, this.setScrollLeft = function (e, o) {
					T.doc.translate.x = e, T.doc.translate.tx = e * _ + "px", T.doc.css(P.trstyle, "translate(" + T.doc.translate.tx + "," + T.doc.translate.ty + ")"), o || T.notifyScrollEvent(T.win[0]);
				});
			} else this.getScrollTop = function () {
				return T.docscroll.scrollTop();
			}, this.setScrollTop = function (e) {
				T.docscroll.scrollTop(e);
			}, this.getScrollLeft = function () {
				return T.hasreversehr ? T.detected.ismozilla ? T.page.maxw - Math.abs(T.docscroll.scrollLeft()) : T.page.maxw - T.docscroll.scrollLeft() : T.docscroll.scrollLeft();
			}, this.setScrollLeft = function (e) {
				return setTimeout(function () {
					if (T) return T.hasreversehr && (e = T.detected.ismozilla ? -(T.page.maxw - e) : T.page.maxw - e), T.docscroll.scrollLeft(e);
				}, 1);
			};this.getTarget = function (e) {
				return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement);
			}, this.hasParent = function (e, o) {
				if (!e) return !1;for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) {
					t = t.parentNode || !1;
				}return !1 !== t;
			};var I = { thin: 1, medium: 3, thick: 5 };this.getDocumentScrollOffset = function () {
				return { top: a.pageYOffset || l.documentElement.scrollTop, left: a.pageXOffset || l.documentElement.scrollLeft };
			}, this.getOffset = function () {
				if (T.isfixed) {
					var e = T.win.offset(),
					    o = T.getDocumentScrollOffset();return e.top -= o.top, e.left -= o.left, e;
				}var t = T.win.offset();if (!T.viewport) return t;var r = T.viewport.offset();return { top: t.top - r.top, left: t.left - r.left };
			}, this.updateScrollBar = function (e) {
				var o, t;if (T.ishwscroll) T.rail.css({ height: T.win.innerHeight() - (M.railpadding.top + M.railpadding.bottom) }), T.railh && T.railh.css({ width: T.win.innerWidth() - (M.railpadding.left + M.railpadding.right) });else {
					var r = T.getOffset();if (o = { top: r.top, left: r.left - (M.railpadding.left + M.railpadding.right) }, o.top += x(T.win, "border-top-width", !0), o.left += T.rail.align ? T.win.outerWidth() - x(T.win, "border-right-width") - T.rail.width : x(T.win, "border-left-width"), (t = M.railoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left)), T.railslocked || T.rail.css({ top: o.top, left: o.left, height: (e ? e.h : T.win.innerHeight()) - (M.railpadding.top + M.railpadding.bottom) }), T.zoom && T.zoom.css({ top: o.top + 1, left: 1 == T.rail.align ? o.left - 20 : o.left + T.rail.width + 4 }), T.railh && !T.railslocked) {
						o = { top: r.top, left: r.left }, (t = M.railhoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left));var i = T.railh.align ? o.top + x(T.win, "border-top-width", !0) + T.win.innerHeight() - T.railh.height : o.top + x(T.win, "border-top-width", !0),
						    s = o.left + x(T.win, "border-left-width");T.railh.css({ top: i - (M.railpadding.top + M.railpadding.bottom), left: s, width: T.railh.width });
					}
				}
			}, this.doRailClick = function (e, o, t) {
				var r, i, s, n;T.railslocked || (T.cancelEvent(e), "pageY" in e || (e.pageX = e.clientX + l.documentElement.scrollLeft, e.pageY = e.clientY + l.documentElement.scrollTop), o ? (r = t ? T.doScrollLeft : T.doScrollTop, s = t ? (e.pageX - T.railh.offset().left - T.cursorwidth / 2) * T.scrollratio.x : (e.pageY - T.rail.offset().top - T.cursorheight / 2) * T.scrollratio.y, T.unsynched("relativexy"), r(0 | s)) : (r = t ? T.doScrollLeftBy : T.doScrollBy, s = t ? T.scroll.x : T.scroll.y, n = t ? e.pageX - T.railh.offset().left : e.pageY - T.rail.offset().top, i = t ? T.view.w : T.view.h, r(s >= n ? i : -i)));
			}, T.newscrolly = T.newscrollx = 0, T.hasanimationframe = "requestAnimationFrame" in a, T.hascancelanimationframe = "cancelAnimationFrame" in a, T.hasborderbox = !1, this.init = function () {
				if (T.saved.css = [], P.isoperamini) return !0;if (P.isandroid && !("hidden" in l)) return !0;M.emulatetouch = M.emulatetouch || M.touchbehavior, T.hasborderbox = a.getComputedStyle && "border-box" === a.getComputedStyle(l.body)["box-sizing"];var e = { "overflow-y": "hidden" };if ((P.isie11 || P.isie10) && (e["-ms-overflow-style"] = "none"), T.ishwscroll && (this.doc.css(P.transitionstyle, P.prefixstyle + "transform 0ms ease-out"), P.transitionend && T.bind(T.doc, P.transitionend, T.onScrollTransitionEnd, !1)), T.zindex = "auto", T.ispage || "auto" != M.zindex ? T.zindex = M.zindex : T.zindex = b() || "auto", !T.ispage && "auto" != T.zindex && T.zindex > s && (s = T.zindex), T.isie && 0 === T.zindex && "auto" == M.zindex && (T.zindex = "auto"), !T.ispage || !P.isieold) {
					var i = T.docscroll;T.ispage && (i = T.haswrapper ? T.win : T.doc), T.css(i, e), T.ispage && (P.isie11 || P.isie) && T.css(n("html"), e), !P.isios || T.ispage || T.haswrapper || T.css(E, { "-webkit-overflow-scrolling": "touch" });var d = n(l.createElement("div"));d.css({ position: "relative", top: 0, float: "right", width: M.cursorwidth, height: 0, "background-color": M.cursorcolor, border: M.cursorborder, "background-clip": "padding-box", "-webkit-border-radius": M.cursorborderradius, "-moz-border-radius": M.cursorborderradius, "border-radius": M.cursorborderradius }), d.addClass("nicescroll-cursors"), T.cursor = d;var u = n(l.createElement("div"));u.attr("id", T.id), u.addClass("nicescroll-rails nicescroll-rails-vr");var h,
					    p,
					    f = ["left", "right", "top", "bottom"];for (var g in f) {
						p = f[g], (h = M.railpadding[p] || 0) && u.css("padding-" + p, h + "px");
					}u.append(d), u.width = Math.max(parseFloat(M.cursorwidth), d.outerWidth()), u.css({ width: u.width + "px", zIndex: T.zindex, background: M.background, cursor: "default" }), u.visibility = !0, u.scrollable = !0, u.align = "left" == M.railalign ? 0 : 1, T.rail = u, T.rail.drag = !1;var v = !1;!M.boxzoom || T.ispage || P.isieold || (v = l.createElement("div"), T.bind(v, "click", T.doZoom), T.bind(v, "mouseenter", function () {
						T.zoom.css("opacity", M.cursoropacitymax);
					}), T.bind(v, "mouseleave", function () {
						T.zoom.css("opacity", M.cursoropacitymin);
					}), T.zoom = n(v), T.zoom.css({ cursor: "pointer", zIndex: T.zindex, backgroundImage: "url(" + M.scriptpath + "zoomico.png)", height: 18, width: 18, backgroundPosition: "0 0" }), M.dblclickzoom && T.bind(T.win, "dblclick", T.doZoom), P.cantouch && M.gesturezoom && (T.ongesturezoom = function (e) {
						return e.scale > 1.5 && T.doZoomIn(e), e.scale < .8 && T.doZoomOut(e), T.cancelEvent(e);
					}, T.bind(T.win, "gestureend", T.ongesturezoom))), T.railh = !1;var w;if (M.horizrailenabled && (T.css(i, { overflowX: "hidden" }), (d = n(l.createElement("div"))).css({ position: "absolute", top: 0, height: M.cursorwidth, width: 0, backgroundColor: M.cursorcolor, border: M.cursorborder, backgroundClip: "padding-box", "-webkit-border-radius": M.cursorborderradius, "-moz-border-radius": M.cursorborderradius, "border-radius": M.cursorborderradius }), P.isieold && d.css("overflow", "hidden"), d.addClass("nicescroll-cursors"), T.cursorh = d, (w = n(l.createElement("div"))).attr("id", T.id + "-hr"), w.addClass("nicescroll-rails nicescroll-rails-hr"), w.height = Math.max(parseFloat(M.cursorwidth), d.outerHeight()), w.css({ height: w.height + "px", zIndex: T.zindex, background: M.background }), w.append(d), w.visibility = !0, w.scrollable = !0, w.align = "top" == M.railvalign ? 0 : 1, T.railh = w, T.railh.drag = !1), T.ispage) u.css({ position: "fixed", top: 0, height: "100%" }), u.css(u.align ? { right: 0 } : { left: 0 }), T.body.append(u), T.railh && (w.css({ position: "fixed", left: 0, width: "100%" }), w.css(w.align ? { bottom: 0 } : { top: 0 }), T.body.append(w));else {
						if (T.ishwscroll) {
							"static" == T.win.css("position") && T.css(T.win, { position: "relative" });var x = "HTML" == T.win[0].nodeName ? T.body : T.win;n(x).scrollTop(0).scrollLeft(0), T.zoom && (T.zoom.css({ position: "absolute", top: 1, right: 0, "margin-right": u.width + 4 }), x.append(T.zoom)), u.css({ position: "absolute", top: 0 }), u.css(u.align ? { right: 0 } : { left: 0 }), x.append(u), w && (w.css({ position: "absolute", left: 0, bottom: 0 }), w.css(w.align ? { bottom: 0 } : { top: 0 }), x.append(w));
						} else {
							T.isfixed = "fixed" == T.win.css("position");var S = T.isfixed ? "fixed" : "absolute";T.isfixed || (T.viewport = T.getViewport(T.win[0])), T.viewport && (T.body = T.viewport, /fixed|absolute/.test(T.viewport.css("position")) || T.css(T.viewport, { position: "relative" })), u.css({ position: S }), T.zoom && T.zoom.css({ position: S }), T.updateScrollBar(), T.body.append(u), T.zoom && T.body.append(T.zoom), T.railh && (w.css({ position: S }), T.body.append(w));
						}P.isios && T.css(T.win, { "-webkit-tap-highlight-color": "rgba(0,0,0,0)", "-webkit-touch-callout": "none" }), M.disableoutline && (P.isie && T.win.attr("hideFocus", "true"), P.iswebkit && T.win.css("outline", "none"));
					}if (!1 === M.autohidemode ? (T.autohidedom = !1, T.rail.css({ opacity: M.cursoropacitymax }), T.railh && T.railh.css({ opacity: M.cursoropacitymax })) : !0 === M.autohidemode || "leave" === M.autohidemode ? (T.autohidedom = n().add(T.rail), P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursor)), T.railh && (T.autohidedom = T.autohidedom.add(T.railh)), T.railh && P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursorh))) : "scroll" == M.autohidemode ? (T.autohidedom = n().add(T.rail), T.railh && (T.autohidedom = T.autohidedom.add(T.railh))) : "cursor" == M.autohidemode ? (T.autohidedom = n().add(T.cursor), T.railh && (T.autohidedom = T.autohidedom.add(T.cursorh))) : "hidden" == M.autohidemode && (T.autohidedom = !1, T.hide(), T.railslocked = !1), P.cantouch || T.istouchcapable || M.emulatetouch || P.hasmstouch) {
						T.scrollmom = new y(T);T.ontouchstart = function (e) {
							if (T.locked) return !1;if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;if (T.hasmoving = !1, T.scrollmom.timer && (T.triggerScrollEnd(), T.scrollmom.stop()), !T.railslocked) {
								var o = T.getTarget(e);if (o && /INPUT/i.test(o.nodeName) && /range/i.test(o.type)) return T.stopPropagation(e);var t = "mousedown" === e.type;if (!("clientX" in e) && "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), T.forcescreen) {
									var r = e;(e = { original: e.original ? e.original : e }).clientX = r.screenX, e.clientY = r.screenY;
								}if (T.rail.drag = { x: e.clientX, y: e.clientY, sx: T.scroll.x, sy: T.scroll.y, st: T.getScrollTop(), sl: T.getScrollLeft(), pt: 2, dl: !1, tg: o }, T.ispage || !M.directionlockdeadzone) T.rail.drag.dl = "f";else {
									var i = { w: c.width(), h: c.height() },
									    s = T.getContentSize(),
									    l = s.h - i.h,
									    a = s.w - i.w;T.rail.scrollable && !T.railh.scrollable ? T.rail.drag.ck = l > 0 && "v" : !T.rail.scrollable && T.railh.scrollable ? T.rail.drag.ck = a > 0 && "h" : T.rail.drag.ck = !1;
								}if (M.emulatetouch && T.isiframe && P.isie) {
									var d = T.win.position();T.rail.drag.x += d.left, T.rail.drag.y += d.top;
								}if (T.hasmoving = !1, T.lastmouseup = !1, T.scrollmom.reset(e.clientX, e.clientY), o && t) {
									if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName)) return P.hasmousecapture && o.setCapture(), M.emulatetouch ? (o.onclick && !o._onclick && (o._onclick = o.onclick, o.onclick = function (e) {
										if (T.hasmoving) return !1;o._onclick.call(this, e);
									}), T.cancelEvent(e)) : T.stopPropagation(e);/SUBMIT|CANCEL|BUTTON/i.test(n(o).attr("type")) && (T.preventclick = { tg: o, click: !1 });
								}
							}
						}, T.ontouchend = function (e) {
							if (!T.rail.drag) return !0;if (2 == T.rail.drag.pt) {
								if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;T.rail.drag = !1;var o = "mouseup" === e.type;if (T.hasmoving && (T.scrollmom.doMomentum(), T.lastmouseup = !0, T.hideCursor(), P.hasmousecapture && l.releaseCapture(), o)) return T.cancelEvent(e);
							} else if (1 == T.rail.drag.pt) return T.onmouseup(e);
						};var z = M.emulatetouch && T.isiframe && !P.hasmousecapture,
						    k = .3 * M.directionlockdeadzone | 0;T.ontouchmove = function (e, o) {
							if (!T.rail.drag) return !0;if (e.targetTouches && M.preventmultitouchscrolling && e.targetTouches.length > 1) return !0;if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !0;if (2 == T.rail.drag.pt) {
								"changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY);var t, r;if (r = t = 0, z && !o) {
									var i = T.win.position();r = -i.left, t = -i.top;
								}var s = e.clientY + t,
								    n = s - T.rail.drag.y,
								    a = e.clientX + r,
								    c = a - T.rail.drag.x,
								    d = T.rail.drag.st - n;if (T.ishwscroll && M.bouncescroll) d < 0 ? d = Math.round(d / 2) : d > T.page.maxh && (d = T.page.maxh + Math.round((d - T.page.maxh) / 2));else if (d < 0 ? (d = 0, s = 0) : d > T.page.maxh && (d = T.page.maxh, s = 0), 0 === s && !T.hasmoving) return T.ispage || (T.rail.drag = !1), !0;var u = T.getScrollLeft();if (T.railh && T.railh.scrollable && (u = T.isrtlmode ? c - T.rail.drag.sl : T.rail.drag.sl - c, T.ishwscroll && M.bouncescroll ? u < 0 ? u = Math.round(u / 2) : u > T.page.maxw && (u = T.page.maxw + Math.round((u - T.page.maxw) / 2)) : (u < 0 && (u = 0, a = 0), u > T.page.maxw && (u = T.page.maxw, a = 0))), !T.hasmoving) {
									if (T.rail.drag.y === e.clientY && T.rail.drag.x === e.clientX) return T.cancelEvent(e);var h = Math.abs(n),
									    p = Math.abs(c),
									    m = M.directionlockdeadzone;if (T.rail.drag.ck ? "v" == T.rail.drag.ck ? p > m && h <= k ? T.rail.drag = !1 : h > m && (T.rail.drag.dl = "v") : "h" == T.rail.drag.ck && (h > m && p <= k ? T.rail.drag = !1 : p > m && (T.rail.drag.dl = "h")) : h > m && p > m ? T.rail.drag.dl = "f" : h > m ? T.rail.drag.dl = p > k ? "f" : "v" : p > m && (T.rail.drag.dl = h > k ? "f" : "h"), !T.rail.drag.dl) return T.cancelEvent(e);T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), T.hasmoving = !0;
								}return T.preventclick && !T.preventclick.click && (T.preventclick.click = T.preventclick.tg.onclick || !1, T.preventclick.tg.onclick = T.onpreventclick), T.rail.drag.dl && ("v" == T.rail.drag.dl ? u = T.rail.drag.sl : "h" == T.rail.drag.dl && (d = T.rail.drag.st)), T.synched("touchmove", function () {
									T.rail.drag && 2 == T.rail.drag.pt && (T.prepareTransition && T.resetTransition(), T.rail.scrollable && T.setScrollTop(d), T.scrollmom.update(a, s), T.railh && T.railh.scrollable ? (T.setScrollLeft(u), T.showCursor(d, u)) : T.showCursor(d), P.isie10 && l.selection.clear());
								}), T.cancelEvent(e);
							}return 1 == T.rail.drag.pt ? T.onmousemove(e) : void 0;
						}, T.ontouchstartCursor = function (e, o) {
							if (!T.rail.drag || 3 == T.rail.drag.pt) {
								if (T.locked) return T.cancelEvent(e);T.cancelScroll(), T.rail.drag = { x: e.touches[0].clientX, y: e.touches[0].clientY, sx: T.scroll.x, sy: T.scroll.y, pt: 3, hr: !!o };var t = T.getTarget(e);return !T.ispage && P.hasmousecapture && t.setCapture(), T.isiframe && !P.hasmousecapture && (T.saved.csspointerevents = T.doc.css("pointer-events"), T.css(T.doc, { "pointer-events": "none" })), T.cancelEvent(e);
							}
						}, T.ontouchendCursor = function (e) {
							if (T.rail.drag) {
								if (P.hasmousecapture && l.releaseCapture(), T.isiframe && !P.hasmousecapture && T.doc.css("pointer-events", T.saved.csspointerevents), 3 != T.rail.drag.pt) return;return T.rail.drag = !1, T.cancelEvent(e);
							}
						}, T.ontouchmoveCursor = function (e) {
							if (T.rail.drag) {
								if (3 != T.rail.drag.pt) return;if (T.cursorfreezed = !0, T.rail.drag.hr) {
									T.scroll.x = T.rail.drag.sx + (e.touches[0].clientX - T.rail.drag.x), T.scroll.x < 0 && (T.scroll.x = 0);var o = T.scrollvaluemaxw;T.scroll.x > o && (T.scroll.x = o);
								} else {
									T.scroll.y = T.rail.drag.sy + (e.touches[0].clientY - T.rail.drag.y), T.scroll.y < 0 && (T.scroll.y = 0);var t = T.scrollvaluemax;T.scroll.y > t && (T.scroll.y = t);
								}return T.synched("touchmove", function () {
									T.rail.drag && 3 == T.rail.drag.pt && (T.showCursor(), T.rail.drag.hr ? T.doScrollLeft(Math.round(T.scroll.x * T.scrollratio.x), M.cursordragspeed) : T.doScrollTop(Math.round(T.scroll.y * T.scrollratio.y), M.cursordragspeed));
								}), T.cancelEvent(e);
							}
						};
					}if (T.onmousedown = function (e, o) {
						if (!T.rail.drag || 1 == T.rail.drag.pt) {
							if (T.railslocked) return T.cancelEvent(e);T.cancelScroll(), T.rail.drag = { x: e.clientX, y: e.clientY, sx: T.scroll.x, sy: T.scroll.y, pt: 1, hr: o || !1 };var t = T.getTarget(e);return P.hasmousecapture && t.setCapture(), T.isiframe && !P.hasmousecapture && (T.saved.csspointerevents = T.doc.css("pointer-events"), T.css(T.doc, { "pointer-events": "none" })), T.hasmoving = !1, T.cancelEvent(e);
						}
					}, T.onmouseup = function (e) {
						if (T.rail.drag) return 1 != T.rail.drag.pt || (P.hasmousecapture && l.releaseCapture(), T.isiframe && !P.hasmousecapture && T.doc.css("pointer-events", T.saved.csspointerevents), T.rail.drag = !1, T.cursorfreezed = !1, T.hasmoving && T.triggerScrollEnd(), T.cancelEvent(e));
					}, T.onmousemove = function (e) {
						if (T.rail.drag) {
							if (1 !== T.rail.drag.pt) return;if (P.ischrome && 0 === e.which) return T.onmouseup(e);if (T.cursorfreezed = !0, T.hasmoving || T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), T.hasmoving = !0, T.rail.drag.hr) {
								T.scroll.x = T.rail.drag.sx + (e.clientX - T.rail.drag.x), T.scroll.x < 0 && (T.scroll.x = 0);var o = T.scrollvaluemaxw;T.scroll.x > o && (T.scroll.x = o);
							} else {
								T.scroll.y = T.rail.drag.sy + (e.clientY - T.rail.drag.y), T.scroll.y < 0 && (T.scroll.y = 0);var t = T.scrollvaluemax;T.scroll.y > t && (T.scroll.y = t);
							}return T.synched("mousemove", function () {
								T.cursorfreezed && (T.showCursor(), T.rail.drag.hr ? T.scrollLeft(Math.round(T.scroll.x * T.scrollratio.x)) : T.scrollTop(Math.round(T.scroll.y * T.scrollratio.y)));
							}), T.cancelEvent(e);
						}T.checkarea = 0;
					}, P.cantouch || M.emulatetouch) T.onpreventclick = function (e) {
						if (T.preventclick) return T.preventclick.tg.onclick = T.preventclick.click, T.preventclick = !1, T.cancelEvent(e);
					}, T.onclick = !P.isios && function (e) {
						return !T.lastmouseup || (T.lastmouseup = !1, T.cancelEvent(e));
					}, M.grabcursorenabled && P.cursorgrabvalue && (T.css(T.ispage ? T.doc : T.win, { cursor: P.cursorgrabvalue }), T.css(T.rail, { cursor: P.cursorgrabvalue }));else {
						var L = function L(e) {
							if (T.selectiondrag) {
								if (e) {
									var o = T.win.outerHeight(),
									    t = e.pageY - T.selectiondrag.top;t > 0 && t < o && (t = 0), t >= o && (t -= o), T.selectiondrag.df = t;
								}if (0 !== T.selectiondrag.df) {
									var r = -2 * T.selectiondrag.df / 6 | 0;T.doScrollBy(r), T.debounced("doselectionscroll", function () {
										L();
									}, 50);
								}
							}
						};T.hasTextSelected = "getSelection" in l ? function () {
							return l.getSelection().rangeCount > 0;
						} : "selection" in l ? function () {
							return "None" != l.selection.type;
						} : function () {
							return !1;
						}, T.onselectionstart = function (e) {
							T.ispage || (T.selectiondrag = T.win.offset());
						}, T.onselectionend = function (e) {
							T.selectiondrag = !1;
						}, T.onselectiondrag = function (e) {
							T.selectiondrag && T.hasTextSelected() && T.debounced("selectionscroll", function () {
								L(e);
							}, 250);
						};
					}if (P.hasw3ctouch ? (T.css(T.ispage ? n("html") : T.win, { "touch-action": "none" }), T.css(T.rail, { "touch-action": "none" }), T.css(T.cursor, { "touch-action": "none" }), T.bind(T.win, "pointerdown", T.ontouchstart), T.bind(l, "pointerup", T.ontouchend), T.delegate(l, "pointermove", T.ontouchmove)) : P.hasmstouch ? (T.css(T.ispage ? n("html") : T.win, { "-ms-touch-action": "none" }), T.css(T.rail, { "-ms-touch-action": "none" }), T.css(T.cursor, { "-ms-touch-action": "none" }), T.bind(T.win, "MSPointerDown", T.ontouchstart), T.bind(l, "MSPointerUp", T.ontouchend), T.delegate(l, "MSPointerMove", T.ontouchmove), T.bind(T.cursor, "MSGestureHold", function (e) {
						e.preventDefault();
					}), T.bind(T.cursor, "contextmenu", function (e) {
						e.preventDefault();
					})) : P.cantouch && (T.bind(T.win, "touchstart", T.ontouchstart, !1, !0), T.bind(l, "touchend", T.ontouchend, !1, !0), T.bind(l, "touchcancel", T.ontouchend, !1, !0), T.delegate(l, "touchmove", T.ontouchmove, !1, !0)), M.emulatetouch && (T.bind(T.win, "mousedown", T.ontouchstart, !1, !0), T.bind(l, "mouseup", T.ontouchend, !1, !0), T.bind(l, "mousemove", T.ontouchmove, !1, !0)), (M.cursordragontouch || !P.cantouch && !M.emulatetouch) && (T.rail.css({ cursor: "default" }), T.railh && T.railh.css({ cursor: "default" }), T.jqbind(T.rail, "mouseenter", function () {
						if (!T.ispage && !T.win.is(":visible")) return !1;T.canshowonmouseevent && T.showCursor(), T.rail.active = !0;
					}), T.jqbind(T.rail, "mouseleave", function () {
						T.rail.active = !1, T.rail.drag || T.hideCursor();
					}), M.sensitiverail && (T.bind(T.rail, "click", function (e) {
						T.doRailClick(e, !1, !1);
					}), T.bind(T.rail, "dblclick", function (e) {
						T.doRailClick(e, !0, !1);
					}), T.bind(T.cursor, "click", function (e) {
						T.cancelEvent(e);
					}), T.bind(T.cursor, "dblclick", function (e) {
						T.cancelEvent(e);
					})), T.railh && (T.jqbind(T.railh, "mouseenter", function () {
						if (!T.ispage && !T.win.is(":visible")) return !1;T.canshowonmouseevent && T.showCursor(), T.rail.active = !0;
					}), T.jqbind(T.railh, "mouseleave", function () {
						T.rail.active = !1, T.rail.drag || T.hideCursor();
					}), M.sensitiverail && (T.bind(T.railh, "click", function (e) {
						T.doRailClick(e, !1, !0);
					}), T.bind(T.railh, "dblclick", function (e) {
						T.doRailClick(e, !0, !0);
					}), T.bind(T.cursorh, "click", function (e) {
						T.cancelEvent(e);
					}), T.bind(T.cursorh, "dblclick", function (e) {
						T.cancelEvent(e);
					})))), M.cursordragontouch && (this.istouchcapable || P.cantouch) && (T.bind(T.cursor, "touchstart", T.ontouchstartCursor), T.bind(T.cursor, "touchmove", T.ontouchmoveCursor), T.bind(T.cursor, "touchend", T.ontouchendCursor), T.cursorh && T.bind(T.cursorh, "touchstart", function (e) {
						T.ontouchstartCursor(e, !0);
					}), T.cursorh && T.bind(T.cursorh, "touchmove", T.ontouchmoveCursor), T.cursorh && T.bind(T.cursorh, "touchend", T.ontouchendCursor)), M.emulatetouch || P.isandroid || P.isios ? (T.bind(P.hasmousecapture ? T.win : l, "mouseup", T.ontouchend), T.onclick && T.bind(l, "click", T.onclick), M.cursordragontouch ? (T.bind(T.cursor, "mousedown", T.onmousedown), T.bind(T.cursor, "mouseup", T.onmouseup), T.cursorh && T.bind(T.cursorh, "mousedown", function (e) {
						T.onmousedown(e, !0);
					}), T.cursorh && T.bind(T.cursorh, "mouseup", T.onmouseup)) : (T.bind(T.rail, "mousedown", function (e) {
						e.preventDefault();
					}), T.railh && T.bind(T.railh, "mousedown", function (e) {
						e.preventDefault();
					}))) : (T.bind(P.hasmousecapture ? T.win : l, "mouseup", T.onmouseup), T.bind(l, "mousemove", T.onmousemove), T.onclick && T.bind(l, "click", T.onclick), T.bind(T.cursor, "mousedown", T.onmousedown), T.bind(T.cursor, "mouseup", T.onmouseup), T.railh && (T.bind(T.cursorh, "mousedown", function (e) {
						T.onmousedown(e, !0);
					}), T.bind(T.cursorh, "mouseup", T.onmouseup)), !T.ispage && M.enablescrollonselection && (T.bind(T.win[0], "mousedown", T.onselectionstart), T.bind(l, "mouseup", T.onselectionend), T.bind(T.cursor, "mouseup", T.onselectionend), T.cursorh && T.bind(T.cursorh, "mouseup", T.onselectionend), T.bind(l, "mousemove", T.onselectiondrag)), T.zoom && (T.jqbind(T.zoom, "mouseenter", function () {
						T.canshowonmouseevent && T.showCursor(), T.rail.active = !0;
					}), T.jqbind(T.zoom, "mouseleave", function () {
						T.rail.active = !1, T.rail.drag || T.hideCursor();
					}))), M.enablemousewheel && (T.isiframe || T.mousewheel(P.isie && T.ispage ? l : T.win, T.onmousewheel), T.mousewheel(T.rail, T.onmousewheel), T.railh && T.mousewheel(T.railh, T.onmousewheelhr)), T.ispage || P.cantouch || /HTML|^BODY/.test(T.win[0].nodeName) || (T.win.attr("tabindex") || T.win.attr({ tabindex: ++r }), T.bind(T.win, "focus", function (e) {
						o = T.getTarget(e).id || T.getTarget(e) || !1, T.hasfocus = !0, T.canshowonmouseevent && T.noticeCursor();
					}), T.bind(T.win, "blur", function (e) {
						o = !1, T.hasfocus = !1;
					}), T.bind(T.win, "mouseenter", function (e) {
						t = T.getTarget(e).id || T.getTarget(e) || !1, T.hasmousefocus = !0, T.canshowonmouseevent && T.noticeCursor();
					}), T.bind(T.win, "mouseleave", function (e) {
						t = !1, T.hasmousefocus = !1, T.rail.drag || T.hideCursor();
					})), T.onkeypress = function (e) {
						if (T.railslocked && 0 === T.page.maxh) return !0;e = e || a.event;var r = T.getTarget(e);if (r && /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) && (!(r.getAttribute("type") || r.type || !1) || !/submit|button|cancel/i.tp)) return !0;if (n(r).attr("contenteditable")) return !0;if (T.hasfocus || T.hasmousefocus && !o || T.ispage && !o && !t) {
							var i = e.keyCode;if (T.railslocked && 27 != i) return T.cancelEvent(e);var s = e.ctrlKey || !1,
							    l = e.shiftKey || !1,
							    c = !1;switch (i) {case 38:case 63233:
									T.doScrollBy(72), c = !0;break;case 40:case 63235:
									T.doScrollBy(-72), c = !0;break;case 37:case 63232:
									T.railh && (s ? T.doScrollLeft(0) : T.doScrollLeftBy(72), c = !0);break;case 39:case 63234:
									T.railh && (s ? T.doScrollLeft(T.page.maxw) : T.doScrollLeftBy(-72), c = !0);break;case 33:case 63276:
									T.doScrollBy(T.view.h), c = !0;break;case 34:case 63277:
									T.doScrollBy(-T.view.h), c = !0;break;case 36:case 63273:
									T.railh && s ? T.doScrollPos(0, 0) : T.doScrollTo(0), c = !0;break;case 35:case 63275:
									T.railh && s ? T.doScrollPos(T.page.maxw, T.page.maxh) : T.doScrollTo(T.page.maxh), c = !0;break;case 32:
									M.spacebarenabled && (l ? T.doScrollBy(T.view.h) : T.doScrollBy(-T.view.h), c = !0);break;case 27:
									T.zoomactive && (T.doZoom(), c = !0);}if (c) return T.cancelEvent(e);
						}
					}, M.enablekeyboard && T.bind(l, P.isopera && !P.isopera12 ? "keypress" : "keydown", T.onkeypress), T.bind(l, "keydown", function (e) {
						(e.ctrlKey || !1) && (T.wheelprevented = !0);
					}), T.bind(l, "keyup", function (e) {
						e.ctrlKey || !1 || (T.wheelprevented = !1);
					}), T.bind(a, "blur", function (e) {
						T.wheelprevented = !1;
					}), T.bind(a, "resize", T.onscreenresize), T.bind(a, "orientationchange", T.onscreenresize), T.bind(a, "load", T.lazyResize), P.ischrome && !T.ispage && !T.haswrapper) {
						var C = T.win.attr("style"),
						    N = parseFloat(T.win.css("width")) + 1;T.win.css("width", N), T.synched("chromefix", function () {
							T.win.attr("style", C);
						});
					}if (T.onAttributeChange = function (e) {
						T.lazyResize(T.isieold ? 250 : 30);
					}, M.enableobserver && (T.isie11 || !1 === m || (T.observerbody = new m(function (e) {
						if (e.forEach(function (e) {
							if ("attributes" == e.type) return E.hasClass("modal-open") && E.hasClass("modal-dialog") && !n.contains(n(".modal-dialog")[0], T.doc[0]) ? T.hide() : T.show();
						}), T.me.clientWidth != T.page.width || T.me.clientHeight != T.page.height) return T.lazyResize(30);
					}), T.observerbody.observe(l.body, { childList: !0, subtree: !0, characterData: !1, attributes: !0, attributeFilter: ["class"] })), !T.ispage && !T.haswrapper)) {
						var R = T.win[0];!1 !== m ? (T.observer = new m(function (e) {
							e.forEach(T.onAttributeChange);
						}), T.observer.observe(R, { childList: !0, characterData: !1, attributes: !0, subtree: !1 }), T.observerremover = new m(function (e) {
							e.forEach(function (e) {
								if (e.removedNodes.length > 0) for (var o in e.removedNodes) {
									if (T && e.removedNodes[o] === R) return T.remove();
								}
							});
						}), T.observerremover.observe(R.parentNode, { childList: !0, characterData: !1, attributes: !1, subtree: !1 })) : (T.bind(R, P.isie && !P.isie9 ? "propertychange" : "DOMAttrModified", T.onAttributeChange), P.isie9 && R.attachEvent("onpropertychange", T.onAttributeChange), T.bind(R, "DOMNodeRemoved", function (e) {
							e.target === R && T.remove();
						}));
					}!T.ispage && M.boxzoom && T.bind(a, "resize", T.resizeZoom), T.istextarea && (T.bind(T.win, "keydown", T.lazyResize), T.bind(T.win, "mouseup", T.lazyResize)), T.lazyResize(30);
				}if ("IFRAME" == this.doc[0].nodeName) {
					var _ = function _() {
						T.iframexd = !1;var o;try {
							(o = "contentDocument" in this ? this.contentDocument : this.contentWindow._doc).domain;
						} catch (e) {
							T.iframexd = !0, o = !1;
						}if (T.iframexd) return "console" in a && console.log("NiceScroll error: policy restriced iframe"), !0;if (T.forcescreen = !0, T.isiframe && (T.iframe = { doc: n(o), html: T.doc.contents().find("html")[0], body: T.doc.contents().find("body")[0] }, T.getContentSize = function () {
							return { w: Math.max(T.iframe.html.scrollWidth, T.iframe.body.scrollWidth), h: Math.max(T.iframe.html.scrollHeight, T.iframe.body.scrollHeight) };
						}, T.docscroll = n(T.iframe.body)), !P.isios && M.iframeautoresize && !T.isiframe) {
							T.win.scrollTop(0), T.doc.height("");var t = Math.max(o.getElementsByTagName("html")[0].scrollHeight, o.body.scrollHeight);T.doc.height(t);
						}T.lazyResize(30), T.css(n(T.iframe.body), e), P.isios && T.haswrapper && T.css(n(o.body), { "-webkit-transform": "translate3d(0,0,0)" }), "contentWindow" in this ? T.bind(this.contentWindow, "scroll", T.onscroll) : T.bind(o, "scroll", T.onscroll), M.enablemousewheel && T.mousewheel(o, T.onmousewheel), M.enablekeyboard && T.bind(o, P.isopera ? "keypress" : "keydown", T.onkeypress), P.cantouch ? (T.bind(o, "touchstart", T.ontouchstart), T.bind(o, "touchmove", T.ontouchmove)) : M.emulatetouch && (T.bind(o, "mousedown", T.ontouchstart), T.bind(o, "mousemove", function (e) {
							return T.ontouchmove(e, !0);
						}), M.grabcursorenabled && P.cursorgrabvalue && T.css(n(o.body), { cursor: P.cursorgrabvalue })), T.bind(o, "mouseup", T.ontouchend), T.zoom && (M.dblclickzoom && T.bind(o, "dblclick", T.doZoom), T.ongesturezoom && T.bind(o, "gestureend", T.ongesturezoom));
					};this.doc[0].readyState && "complete" === this.doc[0].readyState && setTimeout(function () {
						_.call(T.doc[0], !1);
					}, 500), T.bind(this.doc, "load", _);
				}
			}, this.showCursor = function (e, o) {
				if (T.cursortimeout && (clearTimeout(T.cursortimeout), T.cursortimeout = 0), T.rail) {
					if (T.autohidedom && (T.autohidedom.stop().css({ opacity: M.cursoropacitymax }), T.cursoractive = !0), T.rail.drag && 1 == T.rail.drag.pt || (void 0 !== e && !1 !== e && (T.scroll.y = e / T.scrollratio.y | 0), void 0 !== o && (T.scroll.x = o / T.scrollratio.x | 0)), T.cursor.css({ height: T.cursorheight, top: T.scroll.y }), T.cursorh) {
						var t = T.hasreversehr ? T.scrollvaluemaxw - T.scroll.x : T.scroll.x;T.cursorh.css({ width: T.cursorwidth, left: !T.rail.align && T.rail.visibility ? t + T.rail.width : t }), T.cursoractive = !0;
					}T.zoom && T.zoom.stop().css({ opacity: M.cursoropacitymax });
				}
			}, this.hideCursor = function (e) {
				T.cursortimeout || T.rail && T.autohidedom && (T.hasmousefocus && "leave" === M.autohidemode || (T.cursortimeout = setTimeout(function () {
					T.rail.active && T.showonmouseevent || (T.autohidedom.stop().animate({ opacity: M.cursoropacitymin }), T.zoom && T.zoom.stop().animate({ opacity: M.cursoropacitymin }), T.cursoractive = !1), T.cursortimeout = 0;
				}, e || M.hidecursordelay)));
			}, this.noticeCursor = function (e, o, t) {
				T.showCursor(o, t), T.rail.active || T.hideCursor(e);
			}, this.getContentSize = T.ispage ? function () {
				return { w: Math.max(l.body.scrollWidth, l.documentElement.scrollWidth), h: Math.max(l.body.scrollHeight, l.documentElement.scrollHeight) };
			} : T.haswrapper ? function () {
				return { w: T.doc[0].offsetWidth, h: T.doc[0].offsetHeight };
			} : function () {
				return { w: T.docscroll[0].scrollWidth, h: T.docscroll[0].scrollHeight };
			}, this.onResize = function (e, o) {
				if (!T || !T.win) return !1;var t = T.page.maxh,
				    r = T.page.maxw,
				    i = T.view.h,
				    s = T.view.w;if (T.view = { w: T.ispage ? T.win.width() : T.win[0].clientWidth, h: T.ispage ? T.win.height() : T.win[0].clientHeight }, T.page = o || T.getContentSize(), T.page.maxh = Math.max(0, T.page.h - T.view.h), T.page.maxw = Math.max(0, T.page.w - T.view.w), T.page.maxh == t && T.page.maxw == r && T.view.w == s && T.view.h == i) {
					if (T.ispage) return T;var n = T.win.offset();if (T.lastposition) {
						var l = T.lastposition;if (l.top == n.top && l.left == n.left) return T;
					}T.lastposition = n;
				}return 0 === T.page.maxh ? (T.hideRail(), T.scrollvaluemax = 0, T.scroll.y = 0, T.scrollratio.y = 0, T.cursorheight = 0, T.setScrollTop(0), T.rail && (T.rail.scrollable = !1)) : (T.page.maxh -= M.railpadding.top + M.railpadding.bottom, T.rail.scrollable = !0), 0 === T.page.maxw ? (T.hideRailHr(), T.scrollvaluemaxw = 0, T.scroll.x = 0, T.scrollratio.x = 0, T.cursorwidth = 0, T.setScrollLeft(0), T.railh && (T.railh.scrollable = !1)) : (T.page.maxw -= M.railpadding.left + M.railpadding.right, T.railh && (T.railh.scrollable = M.horizrailenabled)), T.railslocked = T.locked || 0 === T.page.maxh && 0 === T.page.maxw, T.railslocked ? (T.ispage || T.updateScrollBar(T.view), !1) : (T.hidden || (T.rail.visibility || T.showRail(), T.railh && !T.railh.visibility && T.showRailHr()), T.istextarea && T.win.css("resize") && "none" != T.win.css("resize") && (T.view.h -= 20), T.cursorheight = Math.min(T.view.h, Math.round(T.view.h * (T.view.h / T.page.h))), T.cursorheight = M.cursorfixedheight ? M.cursorfixedheight : Math.max(M.cursorminheight, T.cursorheight), T.cursorwidth = Math.min(T.view.w, Math.round(T.view.w * (T.view.w / T.page.w))), T.cursorwidth = M.cursorfixedheight ? M.cursorfixedheight : Math.max(M.cursorminheight, T.cursorwidth), T.scrollvaluemax = T.view.h - T.cursorheight - (M.railpadding.top + M.railpadding.bottom), T.hasborderbox || (T.scrollvaluemax -= T.cursor[0].offsetHeight - T.cursor[0].clientHeight), T.railh && (T.railh.width = T.page.maxh > 0 ? T.view.w - T.rail.width : T.view.w, T.scrollvaluemaxw = T.railh.width - T.cursorwidth - (M.railpadding.left + M.railpadding.right)), T.ispage || T.updateScrollBar(T.view), T.scrollratio = { x: T.page.maxw / T.scrollvaluemaxw, y: T.page.maxh / T.scrollvaluemax }, T.getScrollTop() > T.page.maxh ? T.doScrollTop(T.page.maxh) : (T.scroll.y = T.getScrollTop() / T.scrollratio.y | 0, T.scroll.x = T.getScrollLeft() / T.scrollratio.x | 0, T.cursoractive && T.noticeCursor()), T.scroll.y && 0 === T.getScrollTop() && T.doScrollTo(T.scroll.y * T.scrollratio.y | 0), T);
			}, this.resize = T.onResize;var O = 0;this.onscreenresize = function (e) {
				clearTimeout(O);var o = !T.ispage && !T.haswrapper;o && T.hideRails(), O = setTimeout(function () {
					T && (o && T.showRails(), T.resize()), O = 0;
				}, 120);
			}, this.lazyResize = function (e) {
				return clearTimeout(O), e = isNaN(e) ? 240 : e, O = setTimeout(function () {
					T && T.resize(), O = 0;
				}, e), T;
			}, this.jqbind = function (e, o, t) {
				T.events.push({ e: e, n: o, f: t, q: !0 }), n(e).on(o, t);
			}, this.mousewheel = function (e, o, t) {
				var r = "jquery" in e ? e[0] : e;if ("onwheel" in l.createElement("div")) T._bind(r, "wheel", o, t || !1);else {
					var i = void 0 !== l.onmousewheel ? "mousewheel" : "DOMMouseScroll";S(r, i, o, t || !1), "DOMMouseScroll" == i && S(r, "MozMousePixelScroll", o, t || !1);
				}
			};var Y = !1;if (P.haseventlistener) {
				try {
					var H = Object.defineProperty({}, "passive", { get: function get() {
							Y = !0;
						} });a.addEventListener("test", null, H);
				} catch (e) {}this.stopPropagation = function (e) {
					return !!e && ((e = e.original ? e.original : e).stopPropagation(), !1);
				}, this.cancelEvent = function (e) {
					return e.cancelable && e.preventDefault(), e.stopImmediatePropagation(), e.preventManipulation && e.preventManipulation(), !1;
				};
			} else Event.prototype.preventDefault = function () {
				this.returnValue = !1;
			}, Event.prototype.stopPropagation = function () {
				this.cancelBubble = !0;
			}, a.constructor.prototype.addEventListener = l.constructor.prototype.addEventListener = Element.prototype.addEventListener = function (e, o, t) {
				this.attachEvent("on" + e, o);
			}, a.constructor.prototype.removeEventListener = l.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function (e, o, t) {
				this.detachEvent("on" + e, o);
			}, this.cancelEvent = function (e) {
				return (e = e || a.event) && (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1), !1;
			}, this.stopPropagation = function (e) {
				return (e = e || a.event) && (e.cancelBubble = !0), !1;
			};this.delegate = function (e, o, t, r, i) {
				var s = d[o] || !1;s || (s = { a: [], l: [], f: function f(e) {
						for (var o = s.l, t = !1, r = o.length - 1; r >= 0; r--) {
							if (!1 === (t = o[r].call(e.target, e))) return !1;
						}return t;
					} }, T.bind(e, o, s.f, r, i), d[o] = s), T.ispage ? (s.a = [T.id].concat(s.a), s.l = [t].concat(s.l)) : (s.a.push(T.id), s.l.push(t));
			}, this.undelegate = function (e, o, t, r, i) {
				var s = d[o] || !1;if (s && s.l) for (var n = 0, l = s.l.length; n < l; n++) {
					s.a[n] === T.id && (s.a.splice(n), s.l.splice(n), 0 === s.a.length && (T._unbind(e, o, s.l.f), d[o] = null));
				}
			}, this.bind = function (e, o, t, r, i) {
				var s = "jquery" in e ? e[0] : e;T._bind(s, o, t, r || !1, i || !1);
			}, this._bind = function (e, o, t, r, i) {
				T.events.push({ e: e, n: o, f: t, b: r, q: !1 }), Y && i ? e.addEventListener(o, t, { passive: !1, capture: r }) : e.addEventListener(o, t, r || !1);
			}, this._unbind = function (e, o, t, r) {
				d[o] ? T.undelegate(e, o, t, r) : e.removeEventListener(o, t, r);
			}, this.unbindAll = function () {
				for (var e = 0; e < T.events.length; e++) {
					var o = T.events[e];o.q ? o.e.unbind(o.n, o.f) : T._unbind(o.e, o.n, o.f, o.b);
				}
			}, this.showRails = function () {
				return T.showRail().showRailHr();
			}, this.showRail = function () {
				return 0 === T.page.maxh || !T.ispage && "none" == T.win.css("display") || (T.rail.visibility = !0, T.rail.css("display", "block"), T.rail.parent().removeClass("noscroll")), T;
			}, this.showRailHr = function () {
				return T.railh && (0 === T.page.maxw || !T.ispage && "none" == T.win.css("display") || (T.railh.visibility = !0, T.railh.css("display", "block"))), T;
			}, this.hideRails = function () {
				return T.hideRail().hideRailHr();
			}, this.hideRail = function () {
				return T.rail.visibility = !1, T.rail.css("display", "none"), T.rail.parent().addClass("noscroll"), T;
			}, this.hideRailHr = function () {
				return T.railh && (T.railh.visibility = !1, T.railh.css("display", "none")), T;
			}, this.show = function () {
				return T.hidden = !1, T.railslocked = !1, T.showRails();
			}, this.hide = function () {
				return T.hidden = !0, T.railslocked = !0, T.hideRails();
			}, this.toggle = function () {
				return T.hidden ? T.show() : T.hide();
			}, this.remove = function () {
				T.stop(), T.cursortimeout && clearTimeout(T.cursortimeout);for (var e in T.delaylist) {
					T.delaylist[e] && h(T.delaylist[e].h);
				}T.doZoomOut(), T.unbindAll(), P.isie9 && T.win[0].detachEvent("onpropertychange", T.onAttributeChange), !1 !== T.observer && T.observer.disconnect(), !1 !== T.observerremover && T.observerremover.disconnect(), !1 !== T.observerbody && T.observerbody.disconnect(), T.events = null, T.cursor && T.cursor.remove(), T.cursorh && T.cursorh.remove(), T.rail && T.rail.remove(), T.railh && T.railh.remove(), T.zoom && T.zoom.remove();for (var o = 0; o < T.saved.css.length; o++) {
					var t = T.saved.css[o];t[0].css(t[1], void 0 === t[2] ? "" : t[2]);
				}T.saved = !1, T.me.data("__nicescroll", "");var r = n.nicescroll;r.each(function (e) {
					if (this && this.id === T.id) {
						delete r[e];for (var o = ++e; o < r.length; o++, e++) {
							r[e] = r[o];
						}--r.length && delete r[r.length];
					}
				});for (var i in T) {
					T[i] = null, delete T[i];
				}T = null;
			}, this.scrollstart = function (e) {
				return this.onscrollstart = e, T;
			}, this.scrollend = function (e) {
				return this.onscrollend = e, T;
			}, this.scrollcancel = function (e) {
				return this.onscrollcancel = e, T;
			}, this.zoomin = function (e) {
				return this.onzoomin = e, T;
			}, this.zoomout = function (e) {
				return this.onzoomout = e, T;
			}, this.isScrollable = function (e) {
				var o = e.target ? e.target : e;if ("OPTION" == o.nodeName) return !0;for (; o && 1 == o.nodeType && o !== this.me[0] && !/^BODY|HTML/.test(o.nodeName);) {
					var t = n(o),
					    r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;o = !!o.parentNode && o.parentNode;
				}return !1;
			}, this.getViewport = function (e) {
				for (var o = !(!e || !e.parentNode) && e.parentNode; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
					var t = n(o);if (/fixed|absolute/.test(t.css("position"))) return t;var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight) return t;if (t.getNiceScroll().length > 0) return t;o = !!o.parentNode && o.parentNode;
				}return !1;
			}, this.triggerScrollStart = function (e, o, t, r, i) {
				if (T.onscrollstart) {
					var s = { type: "scrollstart", current: { x: e, y: o }, request: { x: t, y: r }, end: { x: T.newscrollx, y: T.newscrolly }, speed: i };T.onscrollstart.call(T, s);
				}
			}, this.triggerScrollEnd = function () {
				if (T.onscrollend) {
					var e = T.getScrollLeft(),
					    o = T.getScrollTop(),
					    t = { type: "scrollend", current: { x: e, y: o }, end: { x: e, y: o } };T.onscrollend.call(T, t);
				}
			};var B = 0,
			    X = 0,
			    D = 0,
			    A = 1,
			    q = !1;if (this.onmousewheel = function (e) {
				if (T.wheelprevented || T.locked) return !1;if (T.railslocked) return T.debounced("checkunlock", T.resize, 250), !1;if (T.rail.drag) return T.cancelEvent(e);if ("auto" === M.oneaxismousemode && 0 !== e.deltaX && (M.oneaxismousemode = !1), M.oneaxismousemode && 0 === e.deltaX && !T.rail.scrollable) return !T.railh || !T.railh.scrollable || T.onmousewheelhr(e);var o = f(),
				    t = !1;if (M.preservenativescrolling && T.checkarea + 600 < o && (T.nativescrollingarea = T.isScrollable(e), t = !0), T.checkarea = o, T.nativescrollingarea) return !0;var r = k(e, !1, t);return r && (T.checkarea = 0), r;
			}, this.onmousewheelhr = function (e) {
				if (!T.wheelprevented) {
					if (T.railslocked || !T.railh.scrollable) return !0;if (T.rail.drag) return T.cancelEvent(e);var o = f(),
					    t = !1;return M.preservenativescrolling && T.checkarea + 600 < o && (T.nativescrollingarea = T.isScrollable(e), t = !0), T.checkarea = o, !!T.nativescrollingarea || (T.railslocked ? T.cancelEvent(e) : k(e, !0, t));
				}
			}, this.stop = function () {
				return T.cancelScroll(), T.scrollmon && T.scrollmon.stop(), T.cursorfreezed = !1, T.scroll.y = Math.round(T.getScrollTop() * (1 / T.scrollratio.y)), T.noticeCursor(), T;
			}, this.getTransitionSpeed = function (e) {
				return 80 + e / 72 * M.scrollspeed | 0;
			}, M.smoothscroll) {
				if (T.ishwscroll && P.hastransition && M.usetransition && M.smoothscroll) {
					var j = "";this.resetTransition = function () {
						j = "", T.doc.css(P.prefixstyle + "transition-duration", "0ms");
					}, this.prepareTransition = function (e, o) {
						var t = o ? e : T.getTransitionSpeed(e),
						    r = t + "ms";return j !== r && (j = r, T.doc.css(P.prefixstyle + "transition-duration", r)), t;
					}, this.doScrollLeft = function (e, o) {
						var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();T.doScrollPos(e, t, o);
					}, this.doScrollTop = function (e, o) {
						var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();T.doScrollPos(t, e, o);
					}, this.cursorupdate = { running: !1, start: function start() {
							var e = this;if (!e.running) {
								e.running = !0;var o = function o() {
									e.running && u(o), T.showCursor(T.getScrollTop(), T.getScrollLeft()), T.notifyScrollEvent(T.win[0]);
								};u(o);
							}
						}, stop: function stop() {
							this.running = !1;
						} }, this.doScrollPos = function (e, o, t) {
						var r = T.getScrollTop(),
						    i = T.getScrollLeft();if (((T.newscrolly - r) * (o - r) < 0 || (T.newscrollx - i) * (e - i) < 0) && T.cancelScroll(), M.bouncescroll ? (o < 0 ? o = o / 2 | 0 : o > T.page.maxh && (o = T.page.maxh + (o - T.page.maxh) / 2 | 0), e < 0 ? e = e / 2 | 0 : e > T.page.maxw && (e = T.page.maxw + (e - T.page.maxw) / 2 | 0)) : (o < 0 ? o = 0 : o > T.page.maxh && (o = T.page.maxh), e < 0 ? e = 0 : e > T.page.maxw && (e = T.page.maxw)), T.scrollrunning && e == T.newscrollx && o == T.newscrolly) return !1;T.newscrolly = o, T.newscrollx = e;var s = T.getScrollTop(),
						    n = T.getScrollLeft(),
						    l = {};l.x = e - n, l.y = o - s;var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y),
						    c = T.prepareTransition(a);T.scrollrunning || (T.scrollrunning = !0, T.triggerScrollStart(n, s, e, o, c), T.cursorupdate.start()), T.scrollendtrapped = !0, P.transitionend || (T.scrollendtrapped && clearTimeout(T.scrollendtrapped), T.scrollendtrapped = setTimeout(T.onScrollTransitionEnd, c)), T.setScrollTop(T.newscrolly), T.setScrollLeft(T.newscrollx);
					}, this.cancelScroll = function () {
						if (!T.scrollendtrapped) return !0;var e = T.getScrollTop(),
						    o = T.getScrollLeft();return T.scrollrunning = !1, P.transitionend || clearTimeout(P.transitionend), T.scrollendtrapped = !1, T.resetTransition(), T.setScrollTop(e), T.railh && T.setScrollLeft(o), T.timerscroll && T.timerscroll.tm && clearInterval(T.timerscroll.tm), T.timerscroll = !1, T.cursorfreezed = !1, T.cursorupdate.stop(), T.showCursor(e, o), T;
					}, this.onScrollTransitionEnd = function () {
						if (T.scrollendtrapped) {
							var e = T.getScrollTop(),
							    o = T.getScrollLeft();if (e < 0 ? e = 0 : e > T.page.maxh && (e = T.page.maxh), o < 0 ? o = 0 : o > T.page.maxw && (o = T.page.maxw), e != T.newscrolly || o != T.newscrollx) return T.doScrollPos(o, e, M.snapbackspeed);T.scrollrunning && T.triggerScrollEnd(), T.scrollrunning = !1, T.scrollendtrapped = !1, T.resetTransition(), T.timerscroll = !1, T.setScrollTop(e), T.railh && T.setScrollLeft(o), T.cursorupdate.stop(), T.noticeCursor(!1, e, o), T.cursorfreezed = !1;
						}
					};
				} else this.doScrollLeft = function (e, o) {
					var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();T.doScrollPos(e, t, o);
				}, this.doScrollTop = function (e, o) {
					var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();T.doScrollPos(t, e, o);
				}, this.doScrollPos = function (e, o, t) {
					var r = T.getScrollTop(),
					    i = T.getScrollLeft();((T.newscrolly - r) * (o - r) < 0 || (T.newscrollx - i) * (e - i) < 0) && T.cancelScroll();var s = !1;if (T.bouncescroll && T.rail.visibility || (o < 0 ? (o = 0, s = !0) : o > T.page.maxh && (o = T.page.maxh, s = !0)), T.bouncescroll && T.railh.visibility || (e < 0 ? (e = 0, s = !0) : e > T.page.maxw && (e = T.page.maxw, s = !0)), T.scrollrunning && T.newscrolly === o && T.newscrollx === e) return !0;T.newscrolly = o, T.newscrollx = e, T.dst = {}, T.dst.x = e - i, T.dst.y = o - r, T.dst.px = i, T.dst.py = r;var n = 0 | Math.sqrt(T.dst.x * T.dst.x + T.dst.y * T.dst.y),
					    l = T.getTransitionSpeed(n);T.bzscroll = {};var a = s ? 1 : .58;T.bzscroll.x = new R(i, T.newscrollx, l, 0, 0, a, 1), T.bzscroll.y = new R(r, T.newscrolly, l, 0, 0, a, 1);f();var c = function c() {
						if (T.scrollrunning) {
							var e = T.bzscroll.y.getPos();T.setScrollLeft(T.bzscroll.x.getNow()), T.setScrollTop(T.bzscroll.y.getNow()), e <= 1 ? T.timer = u(c) : (T.scrollrunning = !1, T.timer = 0, T.triggerScrollEnd());
						}
					};T.scrollrunning || (T.triggerScrollStart(i, r, e, o, l), T.scrollrunning = !0, T.timer = u(c));
				}, this.cancelScroll = function () {
					return T.timer && h(T.timer), T.timer = 0, T.bzscroll = !1, T.scrollrunning = !1, T;
				};
			} else this.doScrollLeft = function (e, o) {
				var t = T.getScrollTop();T.doScrollPos(e, t, o);
			}, this.doScrollTop = function (e, o) {
				var t = T.getScrollLeft();T.doScrollPos(t, e, o);
			}, this.doScrollPos = function (e, o, t) {
				var r = e > T.page.maxw ? T.page.maxw : e;r < 0 && (r = 0);var i = o > T.page.maxh ? T.page.maxh : o;i < 0 && (i = 0), T.synched("scroll", function () {
					T.setScrollTop(i), T.setScrollLeft(r);
				});
			}, this.cancelScroll = function () {};this.doScrollBy = function (e, o) {
				z(0, e);
			}, this.doScrollLeftBy = function (e, o) {
				z(e, 0);
			}, this.doScrollTo = function (e, o) {
				var t = o ? Math.round(e * T.scrollratio.y) : e;t < 0 ? t = 0 : t > T.page.maxh && (t = T.page.maxh), T.cursorfreezed = !1, T.doScrollTop(e);
			}, this.checkContentSize = function () {
				var e = T.getContentSize();e.h == T.page.h && e.w == T.page.w || T.resize(!1, e);
			}, T.onscroll = function (e) {
				T.rail.drag || T.cursorfreezed || T.synched("scroll", function () {
					T.scroll.y = Math.round(T.getScrollTop() / T.scrollratio.y), T.railh && (T.scroll.x = Math.round(T.getScrollLeft() / T.scrollratio.x)), T.noticeCursor();
				});
			}, T.bind(T.docscroll, "scroll", T.onscroll), this.doZoomIn = function (e) {
				if (!T.zoomactive) {
					T.zoomactive = !0, T.zoomrestore = { style: {} };var o = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"],
					    t = T.win[0].style;for (var r in o) {
						var i = o[r];T.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : "";
					}T.zoomrestore.style.width = T.win.css("width"), T.zoomrestore.style.height = T.win.css("height"), T.zoomrestore.padding = { w: T.win.outerWidth() - T.win.width(), h: T.win.outerHeight() - T.win.height() }, P.isios4 && (T.zoomrestore.scrollTop = c.scrollTop(), c.scrollTop(0)), T.win.css({ position: P.isios4 ? "absolute" : "fixed", top: 0, left: 0, zIndex: s + 100, margin: 0 });var n = T.win.css("backgroundColor");return ("" === n || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) && T.win.css("backgroundColor", "#fff"), T.rail.css({ zIndex: s + 101 }), T.zoom.css({ zIndex: s + 102 }), T.zoom.css("backgroundPosition", "0 -18px"), T.resizeZoom(), T.onzoomin && T.onzoomin.call(T), T.cancelEvent(e);
				}
			}, this.doZoomOut = function (e) {
				if (T.zoomactive) return T.zoomactive = !1, T.win.css("margin", ""), T.win.css(T.zoomrestore.style), P.isios4 && c.scrollTop(T.zoomrestore.scrollTop), T.rail.css({ "z-index": T.zindex }), T.zoom.css({ "z-index": T.zindex }), T.zoomrestore = !1, T.zoom.css("backgroundPosition", "0 0"), T.onResize(), T.onzoomout && T.onzoomout.call(T), T.cancelEvent(e);
			}, this.doZoom = function (e) {
				return T.zoomactive ? T.doZoomOut(e) : T.doZoomIn(e);
			}, this.resizeZoom = function () {
				if (T.zoomactive) {
					var e = T.getScrollTop();T.win.css({ width: c.width() - T.zoomrestore.padding.w + "px", height: c.height() - T.zoomrestore.padding.h + "px" }), T.onResize(), T.setScrollTop(Math.min(T.page.maxh, e));
				}
			}, this.init(), n.nicescroll.push(this);
		},
		    y = function y(e) {
			var o = this;this.nc = e, this.lastx = 0, this.lasty = 0, this.speedx = 0, this.speedy = 0, this.lasttime = 0, this.steptime = 0, this.snapx = !1, this.snapy = !1, this.demulx = 0, this.demuly = 0, this.lastscrollx = -1, this.lastscrolly = -1, this.chkx = 0, this.chky = 0, this.timer = 0, this.reset = function (e, t) {
				o.stop(), o.steptime = 0, o.lasttime = f(), o.speedx = 0, o.speedy = 0, o.lastx = e, o.lasty = t, o.lastscrollx = -1, o.lastscrolly = -1;
			}, this.update = function (e, t) {
				var r = f();o.steptime = r - o.lasttime, o.lasttime = r;var i = t - o.lasty,
				    s = e - o.lastx,
				    n = o.nc.getScrollTop() + i,
				    l = o.nc.getScrollLeft() + s;o.snapx = l < 0 || l > o.nc.page.maxw, o.snapy = n < 0 || n > o.nc.page.maxh, o.speedx = s, o.speedy = i, o.lastx = e, o.lasty = t;
			}, this.stop = function () {
				o.nc.unsynched("domomentum2d"), o.timer && clearTimeout(o.timer), o.timer = 0, o.lastscrollx = -1, o.lastscrolly = -1;
			}, this.doSnapy = function (e, t) {
				var r = !1;t < 0 ? (t = 0, r = !0) : t > o.nc.page.maxh && (t = o.nc.page.maxh, r = !0), e < 0 ? (e = 0, r = !0) : e > o.nc.page.maxw && (e = o.nc.page.maxw, r = !0), r ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed) : o.nc.triggerScrollEnd();
			}, this.doMomentum = function (e) {
				var t = f(),
				    r = e ? t + e : o.lasttime,
				    i = o.nc.getScrollLeft(),
				    s = o.nc.getScrollTop(),
				    n = o.nc.page.maxh,
				    l = o.nc.page.maxw;o.speedx = l > 0 ? Math.min(60, o.speedx) : 0, o.speedy = n > 0 ? Math.min(60, o.speedy) : 0;var a = r && t - r <= 60;(s < 0 || s > n || i < 0 || i > l) && (a = !1);var c = !(!o.speedy || !a) && o.speedy,
				    d = !(!o.speedx || !a) && o.speedx;if (c || d) {
					var u = Math.max(16, o.steptime);if (u > 50) {
						var h = u / 50;o.speedx *= h, o.speedy *= h, u = 50;
					}o.demulxy = 0, o.lastscrollx = o.nc.getScrollLeft(), o.chkx = o.lastscrollx, o.lastscrolly = o.nc.getScrollTop(), o.chky = o.lastscrolly;var p = o.lastscrollx,
					    m = o.lastscrolly,
					    g = function g() {
						var e = f() - t > 600 ? .04 : .02;o.speedx && (p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy)), o.lastscrollx = p, (p < 0 || p > l) && (e = .1)), o.speedy && (m = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy)), o.lastscrolly = m, (m < 0 || m > n) && (e = .1)), o.demulxy = Math.min(1, o.demulxy + e), o.nc.synched("domomentum2d", function () {
							if (o.speedx) {
								o.nc.getScrollLeft();o.chkx = p, o.nc.setScrollLeft(p);
							}if (o.speedy) {
								o.nc.getScrollTop();o.chky = m, o.nc.setScrollTop(m);
							}o.timer || (o.nc.hideCursor(), o.doSnapy(p, m));
						}), o.demulxy < 1 ? o.timer = setTimeout(g, u) : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m));
					};g();
				} else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop());
			};
		},
		    x = e.fn.scrollTop;e.cssHooks.pageYOffset = { get: function get(e, o, t) {
				var r = n.data(e, "__nicescroll") || !1;return r && r.ishwscroll ? r.getScrollTop() : x.call(e);
			}, set: function set(e, o) {
				var t = n.data(e, "__nicescroll") || !1;return t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : x.call(e, o), this;
			} }, e.fn.scrollTop = function (e) {
			if (void 0 === e) {
				var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);return o && o.ishwscroll ? o.getScrollTop() : x.call(this);
			}return this.each(function () {
				var o = n.data(this, "__nicescroll") || !1;o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : x.call(n(this), e);
			});
		};var S = e.fn.scrollLeft;n.cssHooks.pageXOffset = { get: function get(e, o, t) {
				var r = n.data(e, "__nicescroll") || !1;return r && r.ishwscroll ? r.getScrollLeft() : S.call(e);
			}, set: function set(e, o) {
				var t = n.data(e, "__nicescroll") || !1;return t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : S.call(e, o), this;
			} }, e.fn.scrollLeft = function (e) {
			if (void 0 === e) {
				var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);return o && o.ishwscroll ? o.getScrollLeft() : S.call(this);
			}return this.each(function () {
				var o = n.data(this, "__nicescroll") || !1;o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : S.call(n(this), e);
			});
		};var z = function z(e) {
			var o = this;if (this.length = 0, this.name = "nicescrollarray", this.each = function (e) {
				return n.each(o, e), o;
			}, this.push = function (e) {
				o[o.length] = e, o.length++;
			}, this.eq = function (e) {
				return o[e];
			}, e) for (var t = 0; t < e.length; t++) {
				var r = n.data(e[t], "__nicescroll") || !1;r && (this[this.length] = r, this.length++);
			}return this;
		};!function (e, o, t) {
			for (var r = 0, i = o.length; r < i; r++) {
				t(e, o[r]);
			}
		}(z.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], function (e, o) {
			e[o] = function () {
				var e = arguments;return this.each(function () {
					this[o].apply(this, e);
				});
			};
		}), e.fn.getNiceScroll = function (e) {
			return void 0 === e ? new z(this) : this[e] && n.data(this[e], "__nicescroll") || !1;
		}, (e.expr.pseudos || e.expr[":"]).nicescroll = function (e) {
			return void 0 !== n.data(e, "__nicescroll");
		}, n.fn.niceScroll = function (e, o) {
			void 0 !== o || "object" != (typeof e === "undefined" ? "undefined" : _typeof2(e)) || "jquery" in e || (o = e, e = !1);var t = new z();return this.each(function () {
				var r = n(this),
				    i = n.extend({}, o);if (e) {
					var s = n(e);i.doc = s.length > 1 ? n(e, r) : s, i.win = r;
				}!("doc" in i) || "win" in i || (i.win = r);var l = r.data("__nicescroll") || !1;l || (i.doc = i.doc || r, l = new b(i, r), r.data("__nicescroll", l)), t.push(l);
			}), 1 === t.length ? t[0] : t;
		}, a.NiceScroll = { getjQuery: function getjQuery() {
				return e;
			} }, n.nicescroll || (n.nicescroll = new z(), n.nicescroll.options = g);
	});;
	/*!
  * dist/jquery.inputmask.min
  * https://github.com/RobinHerbots/Inputmask
  * Copyright (c) 2010 - 2020 Robin Herbots
  * Licensed under the MIT license
  * Version: 5.0.6-beta.8
  */
	!function webpackUniversalModuleDefinition(root, factory) {
		if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof2(module))) module.exports = factory(require("jquery"));else if ("function" == typeof define && define.amd) define(["jquery"], factory);else {
			var a = "object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) ? factory(require("jquery")) : factory(root.jQuery);for (var i in a) {
				("object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) ? exports : root)[i] = a[i];
			}
		}
	}(window, function (__WEBPACK_EXTERNAL_MODULE__8__) {
		return modules = [function (module) {
			module.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17,"KEY_229":229}');
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0, __webpack_require__(9);var _mask = __webpack_require__(10),
			    _inputmask = _interopRequireDefault(__webpack_require__(12)),
			    _window = _interopRequireDefault(__webpack_require__(13)),
			    _maskLexer = __webpack_require__(17),
			    _validationTests = __webpack_require__(3),
			    _positioning = __webpack_require__(2),
			    _validation = __webpack_require__(4),
			    _inputHandling = __webpack_require__(5),
			    _eventruler = __webpack_require__(11),
			    _definitions = _interopRequireDefault(__webpack_require__(18)),
			    _defaults = _interopRequireDefault(__webpack_require__(19));function _typeof(obj) {
				return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
					return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				} : function _typeof(obj) {
					return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				}, _typeof(obj);
			}function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}var document = _window.default.document,
			    dataKey = "_inputmask_opts";function Inputmask(alias, options, internal) {
				if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);this.dependencyLib = _inputmask.default, this.el = void 0, this.events = {}, this.maskset = void 0, !0 !== internal && ("[object Object]" === Object.prototype.toString.call(alias) ? options = alias : (options = options || {}, alias && (options.alias = alias)), this.opts = _inputmask.default.extend(!0, {}, this.defaults, options), this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, resolveAlias(this.opts.alias, options, this.opts)), this.refreshValue = !1, this.undoValue = void 0, this.$el = void 0, this.skipKeyPressEvent = !1, this.skipInputEvent = !1, this.validationEvent = !1, this.ignorable = !1, this.maxLength, this.mouseEnter = !1, this.originalPlaceholder = void 0, this.isComposing = !1;
			}function resolveAlias(aliasStr, options, opts) {
				var aliasDefinition = Inputmask.prototype.aliases[aliasStr];return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), _inputmask.default.extend(!0, opts, aliasDefinition), _inputmask.default.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), !1);
			}function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
				function importOption(option, optionData) {
					var attrOption = "" === dataAttribute ? option : dataAttribute + "-" + option;optionData = void 0 !== optionData ? optionData : npt.getAttribute(attrOption), null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = _window.default[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), userOptions[option] = optionData);
				}if (!0 === opts.importDataAttributes) {
					var attrOptions = npt.getAttribute(dataAttribute),
					    option,
					    dataoptions,
					    optionData,
					    p;if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = void 0, dataoptions) {
						if ("alias" === p.toLowerCase()) {
							optionData = dataoptions[p];break;
						}
					}for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), opts) {
						if (dataoptions) for (p in optionData = void 0, dataoptions) {
							if (p.toLowerCase() === option.toLowerCase()) {
								optionData = dataoptions[p];break;
							}
						}importOption(option, optionData);
					}
				}return _inputmask.default.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), opts.isRTL = !0), Object.keys(userOptions).length;
			}Inputmask.prototype = { dataAttribute: "data-inputmask", defaults: _defaults.default, definitions: _definitions.default, aliases: {}, masksCache: {}, get isRTL() {
					return this.opts.isRTL || this.opts.numericInput;
				}, mask: function mask(elems) {
					var that = this;return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, elems.forEach(function (el, ndx) {
						var scopedOpts = _inputmask.default.extend(!0, {}, that.opts);if (importAttributeOptions(el, scopedOpts, _inputmask.default.extend(!0, {}, that.userOptions), that.dataAttribute)) {
							var maskset = (0, _maskLexer.generateMaskSet)(scopedOpts, that.noMasksCache);void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, el.inputmask.remove()), el.inputmask = new Inputmask(void 0, void 0, !0), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = _inputmask.default.extend(!0, {}, that.userOptions), el.inputmask.el = el, el.inputmask.$el = (0, _inputmask.default)(el), el.inputmask.maskset = maskset, _inputmask.default.data(el, dataKey, that.userOptions), _mask.mask.call(el.inputmask));
						}
					}), elems && elems[0] && elems[0].inputmask || this;
				}, option: function option(options, noremask) {
					return "string" == typeof options ? this.opts[options] : "object" === _typeof(options) ? (_inputmask.default.extend(this.userOptions, options), this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
				}, unmaskedvalue: function unmaskedvalue(value) {
					if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), void 0 === this.el || void 0 !== value) {
						var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");_inputHandling.checkVal.call(this, void 0, !1, !1, valueBuffer), "function" == typeof this.opts.onBeforeWrite && this.opts.onBeforeWrite.call(this, void 0, _positioning.getBuffer.call(this), 0, this.opts);
					}return _inputHandling.unmaskedvalue.call(this, this.el);
				}, remove: function remove() {
					if (this.el) {
						_inputmask.default.data(this.el, dataKey, null);var cv = this.opts.autoUnmask ? (0, _inputHandling.unmaskedvalue)(this.el) : this._valueGet(this.opts.autoUnmask),
						    valueProperty;cv !== _positioning.getBufferTemplate.call(this).join("") ? this._valueSet(cv, this.opts.autoUnmask) : this._valueSet(""), _eventruler.EventRuler.off(this.el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value"), valueProperty && this.__valueGet && Object.defineProperty(this.el, "value", { get: this.__valueGet, set: this.__valueSet, configurable: !0 })) : document.__lookupGetter__ && this.el.__lookupGetter__("value") && this.__valueGet && (this.el.__defineGetter__("value", this.__valueGet), this.el.__defineSetter__("value", this.__valueSet)), this.el.inputmask = void 0;
					}return this.el;
				}, getemptymask: function getemptymask() {
					return this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), _positioning.getBufferTemplate.call(this).join("");
				}, hasMaskedValue: function hasMaskedValue() {
					return !this.opts.autoUnmask;
				}, isComplete: function isComplete() {
					return this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), _validation.isComplete.call(this, _positioning.getBuffer.call(this));
				}, getmetadata: function getmetadata() {
					if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), Array.isArray(this.maskset.metadata)) {
						var maskTarget = _validationTests.getMaskTemplate.call(this, !0, 0, !1).join("");return this.maskset.metadata.forEach(function (mtdt) {
							return mtdt.mask !== maskTarget || (maskTarget = mtdt, !1);
						}), maskTarget;
					}return this.maskset.metadata;
				}, isValid: function isValid(value) {
					if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), value) {
						var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");_inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);
					} else value = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");for (var buffer = _positioning.getBuffer.call(this), rl = _positioning.determineLastRequiredPosition.call(this), lmib = buffer.length - 1; rl < lmib && !_positioning.isMask.call(this, lmib); lmib--) {}return buffer.splice(rl, lmib + 1 - rl), _validation.isComplete.call(this, buffer) && value === (this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join(""));
				}, format: function format(value, metadata) {
					this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");_inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);var formattedValue = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");return metadata ? { value: formattedValue, metadata: this.getmetadata() } : formattedValue;
				}, setValue: function setValue(value) {
					this.el && (0, _inputmask.default)(this.el).trigger("setvalue", [value]);
				}, analyseMask: _maskLexer.analyseMask }, Inputmask.extendDefaults = function (options) {
				_inputmask.default.extend(!0, Inputmask.prototype.defaults, options);
			}, Inputmask.extendDefinitions = function (definition) {
				_inputmask.default.extend(!0, Inputmask.prototype.definitions, definition);
			}, Inputmask.extendAliases = function (alias) {
				_inputmask.default.extend(!0, Inputmask.prototype.aliases, alias);
			}, Inputmask.format = function (value, options, metadata) {
				return Inputmask(options).format(value, metadata);
			}, Inputmask.unmask = function (value, options) {
				return Inputmask(options).unmaskedvalue(value);
			}, Inputmask.isValid = function (value, options) {
				return Inputmask(options).isValid(value);
			}, Inputmask.remove = function (elems) {
				"string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, elems.forEach(function (el) {
					el.inputmask && el.inputmask.remove();
				});
			}, Inputmask.setValue = function (elems, value) {
				"string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, elems.forEach(function (el) {
					el.inputmask ? el.inputmask.setValue(value) : (0, _inputmask.default)(el).trigger("setvalue", [value]);
				});
			}, Inputmask.dependencyLib = _inputmask.default, _window.default.Inputmask = Inputmask;var _default = Inputmask;exports.default = _default;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.caret = caret, exports.determineLastRequiredPosition = determineLastRequiredPosition, exports.determineNewCaretPosition = determineNewCaretPosition, exports.getBuffer = getBuffer, exports.getBufferTemplate = getBufferTemplate, exports.getLastValidPosition = getLastValidPosition, exports.isMask = isMask, exports.resetMaskSet = resetMaskSet, exports.seekNext = seekNext, exports.seekPrevious = seekPrevious, exports.translatePosition = translatePosition;var _validationTests = __webpack_require__(3),
			    _validation = __webpack_require__(4),
			    _mask = __webpack_require__(10);function caret(input, begin, end, notranslate, isDelete) {
				var inputmask = this,
				    opts = this.opts,
				    range;if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), end = begin + range.text.length), { begin: notranslate ? begin : translatePosition.call(this, begin), end: notranslate ? end : translatePosition.call(this, end) };if (Array.isArray(begin) && (end = this.isRTL ? begin[0] : begin[1], begin = this.isRTL ? begin[1] : begin[0]), void 0 !== begin.begin && (end = this.isRTL ? begin.begin : begin.end, begin = this.isRTL ? begin.end : begin.begin), "number" == typeof begin) {
					begin = notranslate ? begin : translatePosition.call(this, begin), end = notranslate ? end : translatePosition.call(this, end), end = "number" == typeof end ? end : begin;var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = { begin: begin, end: end }, opts.insertModeVisual && !1 === opts.insertMode && begin === end && (isDelete || end++), input === (input.inputmask.shadowRoot || document).activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end);else if (window.getSelection) {
						if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
							var textNode = document.createTextNode("");input.appendChild(textNode);
						}range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), range.collapse(!0);var sel = window.getSelection();sel.removeAllRanges(), sel.addRange(range);
					} else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select());
				}
			}function determineLastRequiredPosition(returnDefinition) {
				var inputmask = this,
				    maskset = this.maskset,
				    $ = this.dependencyLib,
				    buffer = _validationTests.getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0, !0),
				    bl = buffer.length,
				    pos,
				    lvp = getLastValidPosition.call(this),
				    positions = {},
				    lvTest = maskset.validPositions[lvp],
				    ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0,
				    testPos;for (pos = lvp + 1; pos < buffer.length; pos++) {
					testPos = _validationTests.getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
				}var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match.static || !0 === testPos.match.static && testPos.locator[lvTest.alternation] && _validation.checkAlternationMatch.call(this, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== _validationTests.getTests.call(this, pos)[0].def)) && buffer[pos] === _validationTests.getPlaceholder.call(this, pos, testPos.match)); pos--) {
					bl--;
				}return returnDefinition ? { l: bl, def: positions[bl] ? positions[bl].match : void 0 } : bl;
			}function determineNewCaretPosition(selectedCaret, tabbed) {
				var inputmask = this,
				    maskset = this.maskset,
				    opts = this.opts;function doRadixFocus(clickPos) {
					if ("" !== opts.radixPoint && 0 !== opts.digits) {
						var vps = maskset.validPositions;if (void 0 === vps[clickPos] || vps[clickPos].input === _validationTests.getPlaceholder.call(inputmask, clickPos)) {
							if (clickPos < seekNext.call(inputmask, -1)) return !0;var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);if (-1 !== radixPos) {
								for (var vp in vps) {
									if (vps[vp] && radixPos < vp && vps[vp].input !== _validationTests.getPlaceholder.call(inputmask, vp)) return !1;
								}return !0;
							}
						}
					}return !1;
				}if (tabbed && (inputmask.isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), selectedCaret.begin === selectedCaret.end) {
					switch (opts.positionCaretOnClick) {case "none":
							break;case "select":
							selectedCaret = { begin: 0, end: getBuffer.call(inputmask).length };break;case "ignore":
							selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));break;case "radixFocus":
							if (doRadixFocus(selectedCaret.begin)) {
								var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;break;
							}default:
							var clickPosition = selectedCaret.begin,
							    lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, !0),
							    lastPosition = seekNext.call(inputmask, -1 !== lvclickPosition || isMask.call(inputmask, 0) ? lvclickPosition : -1);if (clickPosition <= lastPosition) selectedCaret.end = selectedCaret.begin = isMask.call(inputmask, clickPosition, !1, !0) ? clickPosition : seekNext.call(inputmask, clickPosition);else {
								var lvp = maskset.validPositions[lvclickPosition],
								    tt = _validationTests.getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : void 0, lvp),
								    placeholder = _validationTests.getPlaceholder.call(inputmask, lastPosition, tt.match);if ("" !== placeholder && getBuffer.call(inputmask)[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask.call(inputmask, lastPosition, opts.keepStatic, !0) && tt.match.def === placeholder) {
									var newPos = seekNext.call(inputmask, lastPosition);(newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos);
								}selectedCaret.end = selectedCaret.begin = lastPosition;
							}}return selectedCaret;
				}
			}function getBuffer(noCache) {
				var inputmask = this,
				    maskset = this.maskset;return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = _validationTests.getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0), void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer;
			}function getBufferTemplate() {
				var inputmask = this,
				    maskset = this.maskset;return void 0 === maskset._buffer && (maskset._buffer = _validationTests.getMaskTemplate.call(this, !1, 1), void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer;
			}function getLastValidPosition(closestTo, strict, validPositions) {
				var maskset = this.maskset,
				    before = -1,
				    after = -1,
				    valids = validPositions || maskset.validPositions;for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
					var psNdx = parseInt(posNdx);valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), closestTo <= psNdx && (after = psNdx));
				}return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after;
			}function isMask(pos, strict, fuzzy) {
				var inputmask = this,
				    maskset = this.maskset,
				    test = _validationTests.getTestTemplate.call(this, pos).match;if ("" === test.def && (test = _validationTests.getTest.call(this, pos).match), !0 !== test.static) return test.fn;if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;if (!0 !== strict && -1 < pos) {
					if (fuzzy) {
						var tests = _validationTests.getTests.call(this, pos);return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
					}var testTemplate = _validationTests.determineTestTemplate.call(this, pos, _validationTests.getTests.call(this, pos)),
					    testPlaceHolder = _validationTests.getPlaceholder.call(this, pos, testTemplate.match);return testTemplate.match.def !== testPlaceHolder;
				}return !1;
			}function resetMaskSet(soft) {
				var maskset = this.maskset;maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
			}function seekNext(pos, newBlock, fuzzy) {
				var inputmask = this;void 0 === fuzzy && (fuzzy = !0);for (var position = pos + 1; "" !== _validationTests.getTest.call(this, position).match.def && (!0 === newBlock && (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker || !isMask.call(this, position, void 0, !0)) || !0 !== newBlock && !isMask.call(this, position, void 0, fuzzy));) {
					position++;
				}return position;
			}function seekPrevious(pos, newBlock) {
				var inputmask = this,
				    position = pos - 1;if (pos <= 0) return 0;for (; 0 < position && (!0 === newBlock && (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker || !isMask.call(this, position, void 0, !0)) || !0 !== newBlock && !isMask.call(this, position, void 0, !0));) {
					position--;
				}return position;
			}function translatePosition(pos) {
				var inputmask = this,
				    opts = this.opts,
				    el = this.el;return !this.isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = this._valueGet().length - pos), pos;
			}
		}, function (module, exports, __webpack_require__) {
			"use strict";
			function getLocator(tst, align) {
				var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");if ("" !== locator) for (; locator.length < align;) {
					locator += "0";
				}return locator;
			}function getDecisionTaker(tst) {
				var decisionTaker = tst.locator[tst.alternation];return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), void 0 !== decisionTaker ? decisionTaker.toString() : "";
			}function getPlaceholder(pos, test, returnPL) {
				var inputmask = this,
				    opts = this.opts,
				    maskset = this.maskset;if (test = test || getTest.call(this, pos).match, void 0 !== test.placeholder || !0 === returnPL) return "function" == typeof test.placeholder ? test.placeholder(opts) : test.placeholder;if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);if (-1 < pos && void 0 === maskset.validPositions[pos]) {
					var tests = getTests.call(this, pos),
					    staticAlternations = [],
					    prevTest;if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) {
						if ("" !== tests[i].match.def && !0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match.static || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), !0 === tests[i].match.static && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
					}
				}return test.def;
			}function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
				var inputmask = this,
				    opts = this.opts,
				    maskset = this.maskset,
				    greedy = opts.greedy;clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;var maskTemplate = [],
				    ndxIntlzr,
				    pos = 0,
				    test,
				    testPos,
				    jitRenderStatic;do {
					if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test));else {
						testPos = getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice();var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);jitRenderStatic = jitRenderStatic && test.static && test.def !== opts.groupSeparator && null === test.fn || maskset.validPositions[pos - 1] && test.static && test.def !== opts.groupSeparator && null === test.fn, jitRenderStatic || !1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking ? maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test)) : jitRenderStatic = !1;
					}pos++;
				} while ((void 0 === this.maxLength || pos < this.maxLength) && (!0 !== test.static || "" !== test.def) || pos < minimalPos);return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), opts.greedy = greedy, maskTemplate;
			}function getTestTemplate(pos, ndxIntlzr, tstPs) {
				var inputmask = this,
				    maskset = this.maskset;return maskset.validPositions[pos] || determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
			}function determineTestTemplate(pos, tests) {
				var inputmask = this,
				    opts = this.opts;pos = 0 < pos ? pos - 1 : 0;for (var altTest = getTest.call(this, pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
					var tst = tests[ndx];tstLocator = getLocator(tst, targetLocator.length);var distance = Math.abs(tstLocator - targetLocator);(void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, bestMatch = tst);
				}return bestMatch;
			}function getTest(pos, tests) {
				var inputmask = this,
				    maskset = this.maskset;return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests.call(this, pos))[0];
			}function getTests(pos, ndxIntlzr, tstPs) {
				var inputmask = this,
				    $ = this.dependencyLib,
				    maskset = this.maskset,
				    opts = this.opts,
				    el = this.el,
				    maskTokens = maskset.maskToken,
				    testPos = ndxIntlzr ? tstPs : 0,
				    ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
				    matches = [],
				    insertStop = !1,
				    latestMatch,
				    cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
					function handleMatch(match, loopNdx, quantifierRecurse) {
						function isFirstMatch(latestMatch, tokenGroup) {
							var firstMatch = 0 === tokenGroup.matches.indexOf(latestMatch);return firstMatch || tokenGroup.matches.every(function (match, ndx) {
								return !0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), !firstMatch;
							}), firstMatch;
						}function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
							var bestMatch, indexPos;if ((maskset.tests[pos] || maskset.validPositions[pos]) && (maskset.tests[pos] || [maskset.validPositions[pos]]).every(function (lmnt, ndx) {
								if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation,
								    ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;return (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, indexPos = ndxPos), !0;
							}), bestMatch) {
								var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation],
								    locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1);
							}return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0;
						}function isSubsetOf(source, target) {
							function expand(pattern) {
								for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++) {
									if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end;) {
										expanded.push(String.fromCharCode(start));
									} else start = pattern.charCodeAt(i), expanded.push(pattern.charAt(i));
								}return expanded.join("");
							}return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match.static || !0 === target.match.static) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")));
						}function staticCanMatchDefinition(source, target) {
							return !0 === source.match.static && !0 !== target.match.static && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1);
						}function setMergeLocators(targetMatch, altMatch) {
							var alternationNdx = targetMatch.alternation,
							    shouldMerge = void 0 === altMatch || alternationNdx === altMatch.alternation && -1 === targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]);if (!shouldMerge && alternationNdx > altMatch.alternation) for (var i = altMatch.alternation; i < alternationNdx; i++) {
								if (targetMatch.locator[i] !== altMatch.locator[i]) {
									alternationNdx = i, shouldMerge = !0;break;
								}
							}if (shouldMerge) {
								targetMatch.mloc = targetMatch.mloc || {};var locNdx = targetMatch.locator[alternationNdx];if (void 0 !== locNdx) {
									if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), void 0 !== altMatch) {
										for (var ndx in altMatch.mloc) {
											"string" == typeof ndx && (ndx = ndx.split(",")[0]), void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
										}targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(",");
									}return !0;
								}targetMatch.alternation = void 0;
							}return !1;
						}function isSameLevel(targetMatch, altMatch) {
							if (targetMatch.locator.length !== altMatch.locator.length) return !1;for (var locNdx = targetMatch.alternation + 1; locNdx < targetMatch.locator.length; locNdx++) {
								if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) return !1;
							}return !0;
						}if (testPos > pos + opts._maxTestPos) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;if (testPos === pos && void 0 === match.matches) return matches.push({ match: match, locator: loopNdx.reverse(), cd: cacheDependency, mloc: {} }), !0;if (void 0 !== match.matches) {
							if (match.isGroup && quantifierRecurse !== match) {
								if (match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse), match) return !0;
							} else if (match.isOptional) {
								var optionalToken = match,
								    mtchsNdx = matches.length;if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) {
									if (matches.forEach(function (mtch, ndx) {
										mtchsNdx <= ndx && (mtch.match.optionality = !0);
									}), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;insertStop = !0, testPos = pos;
								}
							} else if (match.isAlternator) {
								var alternateToken = match,
								    malternateMatches = [],
								    maltMatches,
								    currentMatches = matches.slice(),
								    loopNdxCnt = loopNdx.length,
								    altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;if (-1 === altIndex || "string" == typeof altIndex) {
									var currentPos = testPos,
									    ndxInitializerClone = ndxInitializer.slice(),
									    altIndexArr = [],
									    amndx;if ("string" == typeof altIndex) altIndexArr = altIndex.split(",");else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
										altIndexArr.push(amndx.toString());
									}if (void 0 !== maskset.excludes[pos]) {
										for (var altIndexArrClone = altIndexArr.slice(), i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
											var excludeSet = maskset.excludes[pos][i].toString().split(":");loopNdx.length == excludeSet[1] && altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
										}0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone);
									}(!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
										amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), maltMatches = matches.slice(), testPos = currentPos, matches = [];for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
											var altMatch = maltMatches[ndx1],
											    dropMatch = !1;altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, setMergeLocators(altMatch);for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
												var altMatch2 = malternateMatches[ndx2];if ("string" != typeof altIndex || void 0 !== altMatch.alternation && altIndexArr.includes(altMatch.locator[altMatch.alternation].toString())) {
													if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
														dropMatch = !0, setMergeLocators(altMatch2, altMatch);break;
													}if (isSubsetOf(altMatch, altMatch2)) {
														setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));break;
													}if (isSubsetOf(altMatch2, altMatch)) {
														setMergeLocators(altMatch2, altMatch);break;
													}if (staticCanMatchDefinition(altMatch, altMatch2)) {
														isSameLevel(altMatch, altMatch2) || void 0 !== el.inputmask.userOptions.keepStatic ? setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch)) : opts.keepStatic = !0;break;
													}
												}
											}dropMatch || malternateMatches.push(altMatch);
										}
									}matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice();
								} else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);if (match) return !0;
							} else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
								var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup), match) {
									if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
										insertStop = !0, testPos = pos;break;
									}return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), !0;
								}
							} else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) return !0;
						} else testPos++;
					}for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) {
						if (!0 !== maskToken.matches[tndx].isQuantifier) {
							var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);if (match && testPos === pos) return match;if (pos < testPos) break;
						}
					}
				}function mergeLocators(pos, tests) {
					var locator = [],
					    alternation;return Array.isArray(tests) || (tests = [tests]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice(), 0 === locator.length && (locator = tests[0].locator.slice())) : tests.forEach(function (tst) {
						"" !== tst.def && (0 === locator.length ? (alternation = tst.alternation, locator = tst.locator.slice()) : tst.locator[alternation] && -1 === locator[alternation].toString().indexOf(tst.locator[alternation]) && (locator[alternation] += "," + tst.locator[alternation]));
					})), locator;
				}if (-1 < pos && (void 0 === inputmask.maxLength || pos < inputmask.maxLength)) {
					if (void 0 === ndxIntlzr) {
						for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos;) {
							previousPos--;
						}void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos);
					}if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
						var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);if (match && testPos === pos || pos < testPos) break;
					}
				}return 0 !== matches.length && !insertStop || matches.push({ match: { fn: null, static: !0, optionality: !1, casing: null, def: "", placeholder: "" }, locator: [], mloc: {}, cd: cacheDependency }), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), maskset.tests[pos]);
			}Object.defineProperty(exports, "__esModule", { value: !0 }), exports.determineTestTemplate = determineTestTemplate, exports.getDecisionTaker = getDecisionTaker, exports.getMaskTemplate = getMaskTemplate, exports.getPlaceholder = getPlaceholder, exports.getTest = getTest, exports.getTests = getTests, exports.getTestTemplate = getTestTemplate;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.alternate = alternate, exports.checkAlternationMatch = checkAlternationMatch, exports.isComplete = isComplete, exports.isValid = isValid, exports.refreshFromBuffer = refreshFromBuffer, exports.revalidateMask = revalidateMask, exports.handleRemove = handleRemove;var _validationTests = __webpack_require__(3),
			    _keycode = _interopRequireDefault(__webpack_require__(0)),
			    _positioning = __webpack_require__(2),
			    _eventhandlers = __webpack_require__(6);function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
				var inputmask = this,
				    $ = this.dependencyLib,
				    opts = this.opts,
				    maskset = this.maskset,
				    validPsClone = $.extend(!0, {}, maskset.validPositions),
				    tstClone = $.extend(!0, {}, maskset.tests),
				    lastAlt,
				    alternation,
				    isValidRslt = !1,
				    returnRslt = !1,
				    altPos,
				    prevAltPos,
				    i,
				    validPos,
				    decisionPos,
				    lAltPos = void 0 !== rAltPos ? rAltPos : _positioning.getLastValidPosition.call(this),
				    nextPos,
				    input,
				    begin,
				    end;if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = _validationTests.getTest.call(this, lastAlt), alternation = prevAltPos.alternation;else for (; 0 <= lAltPos; lAltPos--) {
					if (altPos = maskset.validPositions[lAltPos], altPos && void 0 !== altPos.alternation) {
						if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos;
					}
				}if (void 0 !== alternation) {
					decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], !0 !== maskPos && maskset.excludes[decisionPos].push((0, _validationTests.getDecisionTaker)(prevAltPos) + ":" + prevAltPos.alternation);var validInputs = [],
					    resultPos = -1;for (i = decisionPos; i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1; i++) {
						-1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), delete maskset.validPositions[i];
					}for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10;) {
						for (maskset.tests = {}, _positioning.resetMaskSet.call(this, !0), isValidRslt = !0, i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || _positioning.getLastValidPosition.call(this, void 0, !0) + 1, input = validInputs[i], isValidRslt = isValid.call(this, nextPos, input, !1, fromIsValid, !0)); i++) {
							i === resultPos && (returnRslt = isValidRslt), 1 == maskPos && isValidRslt && (returnRslt = { caretPos: i });
						}if (isValidRslt) break;if (_positioning.resetMaskSet.call(this), prevAltPos = _validationTests.getTest.call(this, decisionPos), maskset.validPositions = $.extend(!0, {}, validPsClone), maskset.tests = $.extend(!0, {}, tstClone), !maskset.excludes[decisionPos]) {
							returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);break;
						}var decisionTaker = (0, _validationTests.getDecisionTaker)(prevAltPos);if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation)) {
							returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);break;
						}for (maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation), i = decisionPos; i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1; i++) {
							delete maskset.validPositions[i];
						}
					}
				}return returnRslt && !1 === opts.keepStatic || delete maskset.excludes[decisionPos], returnRslt;
			}function casing(elem, test, pos) {
				var opts = this.opts,
				    maskset = this.maskset;switch (opts.casing || test.casing) {case "upper":
						elem = elem.toUpperCase();break;case "lower":
						elem = elem.toLowerCase();break;case "title":
						var posBefore = maskset.validPositions[pos - 1];elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(_keycode.default.SPACE) ? elem.toUpperCase() : elem.toLowerCase();break;default:
						if ("function" == typeof opts.casing) {
							var args = Array.prototype.slice.call(arguments);args.push(maskset.validPositions), elem = opts.casing.apply(this, args);
						}}return elem;
			}function checkAlternationMatch(altArr1, altArr2, na) {
				for (var opts = this.opts, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) {
					-1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
				}for (var alndx = 0; alndx < altArr1.length; alndx++) {
					if (altArrC.includes(altArr1[alndx])) {
						isMatch = !0;break;
					}
				}return isMatch;
			}function handleRemove(input, k, pos, strict, fromIsValid) {
				var inputmask = this,
				    maskset = this.maskset,
				    opts = this.opts;if ((opts.numericInput || this.isRTL) && (k === _keycode.default.BACKSPACE ? k = _keycode.default.DELETE : k === _keycode.default.DELETE && (k = _keycode.default.BACKSPACE), this.isRTL)) {
					var pend = pos.end;pos.end = pos.begin, pos.begin = pend;
				}var lvp = _positioning.getLastValidPosition.call(this, void 0, !0),
				    offset;if (pos.end >= _positioning.getBuffer.call(this).length && lvp >= pos.end && (pos.end = lvp + 1), k === _keycode.default.BACKSPACE ? pos.end - pos.begin < 1 && (pos.begin = _positioning.seekPrevious.call(this, pos.begin)) : k === _keycode.default.DELETE && pos.begin === pos.end && (pos.end = _positioning.isMask.call(this, pos.end, !0, !0) ? pos.end + 1 : _positioning.seekNext.call(this, pos.end) + 1), !1 !== (offset = revalidateMask.call(this, pos))) {
					if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== _validationTests.getTest.call(this, pos.begin).match.def.indexOf("|")) {
						var result = alternate.call(this, !0);if (result) {
							var newPos = void 0 !== result.caret ? result.caret : result.pos ? _positioning.seekNext.call(this, result.pos.begin ? result.pos.begin : result.pos) : _positioning.getLastValidPosition.call(this, -1, !0);(k !== _keycode.default.DELETE || pos.begin > newPos) && pos.begin;
						}
					}!0 !== strict && (maskset.p = k === _keycode.default.DELETE ? pos.begin + offset : pos.begin);
				}
			}function isComplete(buffer) {
				var inputmask = this,
				    opts = this.opts,
				    maskset = this.maskset;if ("function" == typeof opts.isComplete) return opts.isComplete(buffer, opts);if ("*" !== opts.repeat) {
					var complete = !1,
					    lrp = _positioning.determineLastRequiredPosition.call(this, !0),
					    aml = _positioning.seekPrevious.call(this, lrp.l);if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
						complete = !0;for (var i = 0; i <= aml; i++) {
							var test = _validationTests.getTestTemplate.call(this, i).match;if (!0 !== test.static && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test.static && buffer[i] !== _validationTests.getPlaceholder.call(this, i, test)) {
								complete = !1;break;
							}
						}
					}return complete;
				}
			}function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
				var inputmask = this,
				    $ = this.dependencyLib,
				    opts = this.opts,
				    el = inputmask.el,
				    maskset = inputmask.maskset;function isSelection(posObj) {
					return inputmask.isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1;
				}strict = !0 === strict;var maskPos = pos;function processCommandObject(commandObj) {
					if (void 0 !== commandObj) {
						if (void 0 !== commandObj.remove && (Array.isArray(commandObj.remove) || (commandObj.remove = [commandObj.remove]), commandObj.remove.sort(function (a, b) {
							return b.pos - a.pos;
						}).forEach(function (lmnt) {
							revalidateMask.call(inputmask, { begin: lmnt, end: lmnt + 1 });
						}), commandObj.remove = void 0), void 0 !== commandObj.insert && (Array.isArray(commandObj.insert) || (commandObj.insert = [commandObj.insert]), commandObj.insert.sort(function (a, b) {
							return a.pos - b.pos;
						}).forEach(function (lmnt) {
							"" !== lmnt.c && isValid.call(inputmask, lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid);
						}), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
							var refresh = commandObj.refreshFromBuffer;refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), commandObj.refreshFromBuffer = void 0;
						}void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, commandObj = !0);
					}return commandObj;
				}function _isValid(position, c, strict) {
					var rslt = !1;return _validationTests.getTests.call(inputmask, position).every(function (tst, ndx) {
						var test = tst.match;if (_positioning.getBuffer.call(inputmask, !0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && { c: _validationTests.getPlaceholder.call(inputmask, position, test, !0) || test.def, pos: position }, !1 === rslt) return !0;var elem = void 0 !== rslt.c ? rslt.c : c,
						    validatedPos = position;return elem = elem === opts.skipOptionalPartCharacter && !0 === test.static ? _validationTests.getPlaceholder.call(inputmask, position, test, !0) || test.def : elem, rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), !0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c || !1 === revalidateMask.call(inputmask, pos, $.extend({}, tst, { input: casing.call(inputmask, elem, test, validatedPos) }), fromIsValid, validatedPos) && (rslt = !1), !1;
					}), rslt;
				}void 0 !== pos.begin && (maskPos = inputmask.isRTL ? pos.end : pos.begin);var result = !0,
				    positionsClone = $.extend(!0, {}, maskset.validPositions);if (!1 === opts.keepStatic && void 0 !== maskset.excludes[maskPos] && !0 !== fromAlternate && !0 !== fromIsValid) for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) {
					void 0 !== maskset.excludes[i] && (maskset.excludes[i] = void 0, delete maskset.tests[i]);
				}if ("function" == typeof opts.preValidation && !0 !== fromIsValid && !0 !== validateOnly && (result = opts.preValidation.call(inputmask, _positioning.getBuffer.call(inputmask), maskPos, c, isSelection(pos), opts, maskset, pos, strict || fromAlternate), result = processCommandObject(result)), !0 === result) {
					if (void 0 === inputmask.maxLength || maskPos < inputmask.maxLength) {
						if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
							var currentPosValid = maskset.validPositions[maskPos];if (!currentPosValid || !0 !== currentPosValid.match.static || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
								if (opts.insertMode || void 0 === maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] || pos.end > maskPos) {
									var skip = !1;if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] && (result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, !0), !1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !_positioning.isMask.call(inputmask, maskPos, opts.keepStatic && 0 === maskPos)) for (var nPos = maskPos + 1, snPos = _positioning.seekNext.call(inputmask, maskPos, !1, 0 !== maskPos); nPos <= snPos; nPos++) {
										if (result = _isValid(nPos, c, strict), !1 !== result) {
											result = trackbackPositions.call(inputmask, maskPos, void 0 !== result.pos ? result.pos : nPos) || result, maskPos = nPos;break;
										}
									}
								}
							} else result = { caret: _positioning.seekNext.call(inputmask, maskPos) };
						}
					} else result = !1;!1 !== result || !opts.keepStatic || !isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && 0 !== maskPos || strict || !0 === fromAlternate ? isSelection(pos) && maskset.tests[maskPos] && 1 < maskset.tests[maskPos].length && opts.keepStatic && !strict && !0 !== fromAlternate && (result = alternate.call(inputmask, !0)) : result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, void 0, pos), !0 === result && (result = { pos: maskPos });
				}if ("function" == typeof opts.postValidation && !0 !== fromIsValid && !0 !== validateOnly) {
					var postResult = opts.postValidation.call(inputmask, _positioning.getBuffer.call(inputmask, !0), void 0 !== pos.begin ? inputmask.isRTL ? pos.end : pos.begin : pos, c, result, opts, maskset, strict, fromCheckval);void 0 !== postResult && (result = !0 === postResult ? result : postResult);
				}result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (_positioning.resetMaskSet.call(inputmask, !0), maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions.call(inputmask, void 0, maskPos, !0);var endResult = processCommandObject(result);return endResult;
			}function positionCanMatchDefinition(pos, testDefinition, opts) {
				for (var inputmask = this, maskset = this.maskset, valid = !1, tests = _validationTests.getTests.call(this, pos), tndx = 0; tndx < tests.length; tndx++) {
					if (tests[tndx].match && (!(tests[tndx].match.nativeDef !== testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] || opts.shiftPositions && testDefinition.match.static) || tests[tndx].match.nativeDef === testDefinition.match.nativeDef)) {
						valid = !0;break;
					}if (tests[tndx].match && tests[tndx].match.def === testDefinition.match.nativeDef) {
						valid = void 0;break;
					}
				}return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition.call(this, pos + maskset.jitOffset[pos], testDefinition, opts)), valid;
			}function refreshFromBuffer(start, end, buffer) {
				var inputmask = this,
				    maskset = this.maskset,
				    opts = this.opts,
				    $ = this.dependencyLib,
				    el = this.el,
				    i,
				    p,
				    skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
				    bffr = this.isRTL ? buffer.slice().reverse() : buffer;if (opts.skipOptionalPartCharacter = "", !0 === start) _positioning.resetMaskSet.call(this), maskset.tests = {}, start = 0, end = buffer.length, p = _positioning.determineNewCaretPosition.call(this, { begin: 0, end: 0 }, !1).begin;else {
					for (i = start; i < end; i++) {
						delete maskset.validPositions[i];
					}p = start;
				}var keypress = new $.Event("keypress");for (i = start; i < end; i++) {
					keypress.which = bffr[i].toString().charCodeAt(0), this.ignorable = !1;var valResult = _eventhandlers.EventHandlers.keypressEvent.call(el, keypress, !0, !1, !1, p);!1 !== valResult && (p = valResult.forwardPosition);
				}opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
			}function trackbackPositions(originalPos, newPos, fillOnly) {
				var inputmask = this,
				    maskset = this.maskset,
				    $ = this.dependencyLib;if (void 0 === originalPos) for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--) {}for (var ps = originalPos; ps < newPos; ps++) {
					if (void 0 === maskset.validPositions[ps] && !_positioning.isMask.call(this, ps, !0)) {
						var vp = 0 == ps ? _validationTests.getTest.call(this, ps) : maskset.validPositions[ps - 1];if (vp) {
							var tests = _validationTests.getTests.call(this, ps).slice();"" === tests[tests.length - 1].match.def && tests.pop();var bestMatch = _validationTests.determineTestTemplate.call(this, ps, tests),
							    np;if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, { input: _validationTests.getPlaceholder.call(this, ps, bestMatch.match, !0) || bestMatch.match.def }), bestMatch.generatedInput = !0, revalidateMask.call(this, ps, bestMatch, !0), !0 !== fillOnly)) {
								var cvpInput = maskset.validPositions[newPos].input;return maskset.validPositions[newPos] = void 0, isValid.call(this, newPos, cvpInput, !0, !0);
							}
						}
					}
				}
			}function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
				var inputmask = this,
				    maskset = this.maskset,
				    opts = this.opts,
				    $ = this.dependencyLib;function IsEnclosedStatic(pos, valids, selection) {
					var posMatch = valids[pos];if (void 0 === posMatch || !0 !== posMatch.match.static || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1],
					    nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];return prevMatch && nextMatch;
				}var offset = 0,
				    begin = void 0 !== pos.begin ? pos.begin : pos,
				    end = void 0 !== pos.end ? pos.end : pos;if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), validatedPos = void 0 !== validatedPos ? validatedPos : begin, begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
					var positionsClone = $.extend(!0, {}, maskset.validPositions),
					    lvp = _positioning.getLastValidPosition.call(this, void 0, !0),
					    i;for (maskset.p = begin, i = lvp; begin <= i; i--) {
						delete maskset.validPositions[i], void 0 === validTest && delete maskset.tests[i + 1];
					}var valid = !0,
					    j = validatedPos,
					    posMatch = j,
					    t,
					    canMatch;for (validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), posMatch++, j++), i = validTest ? end : end - 1; i <= lvp; i++) {
						if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, { begin: begin, end: end }))) {
							for (; "" !== _validationTests.getTest.call(this, posMatch).match.def;) {
								if (!1 !== (canMatch = positionCanMatchDefinition.call(this, posMatch, t, opts)) || "+" === t.match.def) {
									"+" === t.match.def && _positioning.getBuffer.call(this, !0);var result = isValid.call(this, posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid && canMatch) break;
								} else valid = !1;if (valid) {
									void 0 === validTest && t.match.static && i === pos.begin && offset++;break;
								}if (!valid && posMatch > maskset.maskLength) break;posMatch++;
							}"" == _validationTests.getTest.call(this, posMatch).match.def && (valid = !1), posMatch = j;
						}if (!valid) break;
					}if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), _positioning.resetMaskSet.call(this, !0), !1;
				} else validTest && _validationTests.getTest.call(this, validatedPos).match.cd === validTest.match.cd && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));return _positioning.resetMaskSet.call(this, !0), offset;
			}
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.applyInputValue = applyInputValue, exports.clearOptionalTail = clearOptionalTail, exports.checkVal = checkVal, exports.HandleNativePlaceholder = HandleNativePlaceholder, exports.unmaskedvalue = unmaskedvalue, exports.writeBuffer = writeBuffer;var _keycode = _interopRequireDefault(__webpack_require__(0)),
			    _validationTests = __webpack_require__(3),
			    _positioning = __webpack_require__(2),
			    _validation = __webpack_require__(4),
			    _environment = __webpack_require__(7),
			    _eventhandlers = __webpack_require__(6);function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}function applyInputValue(input, value) {
				var inputmask = input ? input.inputmask : this,
				    opts = inputmask.opts;input.inputmask.refreshValue = !1, "function" == typeof opts.onBeforeMask && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), value = value.toString().split(""), checkVal(input, !0, !1, value), inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") && -1 === _positioning.getLastValidPosition.call(inputmask) && input.inputmask._valueSet("");
			}function clearOptionalTail(buffer) {
				var inputmask = this;buffer.length = 0;for (var template = _validationTests.getMaskTemplate.call(this, !0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift());) {
					buffer.push(lmnt);
				}return buffer;
			}function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
				var inputmask = input ? input.inputmask : this,
				    maskset = inputmask.maskset,
				    opts = inputmask.opts,
				    $ = inputmask.dependencyLib,
				    inputValue = nptvl.slice(),
				    charCodes = "",
				    initialNdx = -1,
				    result = void 0,
				    skipOptionalPartCharacter = opts.skipOptionalPartCharacter;function isTemplateMatch(ndx, charCodes) {
					for (var targetTemplate = _validationTests.getMaskTemplate.call(inputmask, !0, 0).slice(ndx, _positioning.seekNext.call(inputmask, ndx, !1, !1)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1];) {
						charCodeNdx--;
					}var match = 0 === charCodeNdx && !_positioning.isMask.call(inputmask, ndx) && (_validationTests.getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || !0 === _validationTests.getTest.call(inputmask, ndx).match.static && _validationTests.getTest.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === _validationTests.getTest.call(inputmask, ndx).match.nativeDef && (_validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === _validationTests.getTest.call(inputmask, ndx + 1).match.static && _validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));if (!match && 0 < charCodeNdx && !_positioning.isMask.call(inputmask, ndx, !1, !0)) {
						var nextPos = _positioning.seekNext.call(inputmask, ndx);inputmask.caretPos.begin < nextPos && (inputmask.caretPos = { begin: nextPos });
					}return match;
				}opts.skipOptionalPartCharacter = "", _positioning.resetMaskSet.call(inputmask), maskset.tests = {}, initialNdx = opts.radixPoint ? _positioning.determineNewCaretPosition.call(inputmask, { begin: 0, end: 0 }).begin : 0, maskset.p = initialNdx, inputmask.caretPos = { begin: initialNdx };var staticMatches = [],
				    prevCaretPos = inputmask.caretPos;if (inputValue.forEach(function (charCode, ndx) {
					if (void 0 !== charCode) if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === _validationTests.getPlaceholder.call(inputmask, ndx) && _positioning.isMask.call(inputmask, ndx, !0) && !1 === _validation.isValid.call(inputmask, ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++;else {
						var keypress = new $.Event("_checkval");keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;var lvp = _positioning.getLastValidPosition.call(inputmask, void 0, !0);isTemplateMatch(initialNdx, charCodes) ? result = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, !0, !1, strict, lvp + 1) : (result = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, !0, !1, strict, inputmask.caretPos.begin), result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && void 0 === maskset.validPositions[result.pos].alternation && (staticMatches.push(result.pos), inputmask.isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer.call(inputmask, void 0, _positioning.getBuffer.call(inputmask), result.forwardPosition, keypress, !1), inputmask.caretPos = { begin: result.forwardPosition, end: result.forwardPosition }, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos;
					}
				}), 0 < staticMatches.length) {
					var sndx,
					    validPos,
					    nextValid = _positioning.seekNext.call(inputmask, -1, void 0, !1);if (!_validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && staticMatches.length <= nextValid || _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && 0 < staticMatches.length && staticMatches.length !== nextValid && 0 === staticMatches[0]) for (var nextSndx = nextValid; void 0 !== (sndx = staticMatches.shift());) {
						var keypress = new $.Event("_checkval");if (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0), result = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, !0, !1, strict, nextSndx), result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static) staticMatches.push(result.pos);else if (!result) break;nextSndx++;
					}
				}writeOut && writeBuffer.call(inputmask, input, _positioning.getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type && inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("")), opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
			}function HandleNativePlaceholder(npt, value) {
				var inputmask = npt ? npt.inputmask : this;if (_environment.ie) {
					if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
						var buffer = _positioning.getBuffer.call(inputmask).slice(),
						    nptValue = npt.inputmask._valueGet();if (nptValue !== value) {
							var lvp = _positioning.getLastValidPosition.call(inputmask);-1 === lvp && nptValue === _positioning.getBufferTemplate.call(inputmask).join("") ? buffer = [] : -1 !== lvp && clearOptionalTail.call(inputmask, buffer), writeBuffer(npt, buffer);
						}
					}
				} else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"));
			}function unmaskedvalue(input) {
				var inputmask = input ? input.inputmask : this,
				    opts = inputmask.opts,
				    maskset = inputmask.maskset;if (input) {
					if (void 0 === input.inputmask) return input.value;input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0));
				}var umValue = [],
				    vps = maskset.validPositions;for (var pndx in vps) {
					vps[pndx] && vps[pndx].match && (1 != vps[pndx].match.static || Array.isArray(maskset.metadata) && !0 !== vps[pndx].generatedInput) && umValue.push(vps[pndx].input);
				}var unmaskedValue = 0 === umValue.length ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");if ("function" == typeof opts.onUnMask) {
					var bufferValue = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join("");unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
				}return unmaskedValue;
			}function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
				var inputmask = input ? input.inputmask : this,
				    opts = inputmask.opts,
				    $ = inputmask.dependencyLib;if (event && "function" == typeof opts.onBeforeWrite) {
					var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);if (result) {
						if (result.refreshFromBuffer) {
							var refresh = result.refreshFromBuffer;_validation.refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), buffer = _positioning.getBuffer.call(inputmask, !0);
						}void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
					}
				}if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || _positioning.caret.call(inputmask, input, caretPos, void 0, void 0, void 0 !== event && "keydown" === event.type && (event.keyCode === _keycode.default.DELETE || event.keyCode === _keycode.default.BACKSPACE)), !0 === triggerEvents)) {
					var $input = $(input),
					    nptVal = input.inputmask._valueGet();input.inputmask.skipInputEvent = !0, $input.trigger("input"), setTimeout(function () {
						nptVal === _positioning.getBufferTemplate.call(inputmask).join("") ? $input.trigger("cleared") : !0 === _validation.isComplete.call(inputmask, buffer) && $input.trigger("complete");
					}, 0);
				}
			}
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.EventHandlers = void 0;var _positioning = __webpack_require__(2),
			    _keycode = _interopRequireDefault(__webpack_require__(0)),
			    _environment = __webpack_require__(7),
			    _validation = __webpack_require__(4),
			    _inputHandling = __webpack_require__(5),
			    _validationTests = __webpack_require__(3);function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}var EventHandlers = { keydownEvent: function keydownEvent(e) {
					var inputmask = this.inputmask,
					    opts = inputmask.opts,
					    $ = inputmask.dependencyLib,
					    maskset = inputmask.maskset,
					    input = this,
					    $input = $(input),
					    k = e.keyCode,
					    pos = _positioning.caret.call(inputmask, input),
					    kdResult = opts.onKeyDown.call(this, e, _positioning.getBuffer.call(inputmask), pos, opts);if (void 0 !== kdResult) return kdResult;if (k === _keycode.default.BACKSPACE || k === _keycode.default.DELETE || _environment.iphone && k === _keycode.default.BACKSPACE_SAFARI || e.ctrlKey && k === _keycode.default.X && !("oncut" in input)) e.preventDefault(), _validation.handleRemove.call(inputmask, input, k, pos), (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask, !0), maskset.p, e, input.inputmask._valueGet() !== _positioning.getBuffer.call(inputmask).join(""));else if (k === _keycode.default.END || k === _keycode.default.PAGE_DOWN) {
						e.preventDefault();var caretPos = _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask));_positioning.caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
					} else k === _keycode.default.HOME && !e.shiftKey || k === _keycode.default.PAGE_UP ? (e.preventDefault(), _positioning.caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === _keycode.default.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? ((0, _inputHandling.checkVal)(input, !0, !1, inputmask.undoValue.split("")), $input.trigger("click")) : !0 === opts.tabThrough && k === _keycode.default.TAB ? !0 === e.shiftKey ? (pos.end = _positioning.seekPrevious.call(inputmask, pos.end, !0), !0 === _validationTests.getTest.call(inputmask, pos.end - 1).match.static && pos.end--, pos.begin = _positioning.seekPrevious.call(inputmask, pos.end, !0), 0 <= pos.begin && 0 < pos.end && (e.preventDefault(), _positioning.caret.call(inputmask, input, pos.begin, pos.end))) : (pos.begin = _positioning.seekNext.call(inputmask, pos.begin, !0), pos.end = _positioning.seekNext.call(inputmask, pos.begin, !0), pos.end < maskset.maskLength && pos.end--, pos.begin <= maskset.maskLength && (e.preventDefault(), _positioning.caret.call(inputmask, input, pos.begin, pos.end))) : e.shiftKey || opts.insertModeVisual && !1 === opts.insertMode && (k === _keycode.default.RIGHT ? setTimeout(function () {
						var caretPos = _positioning.caret.call(inputmask, input);_positioning.caret.call(inputmask, input, caretPos.begin);
					}, 0) : k === _keycode.default.LEFT && setTimeout(function () {
						var caretPos_begin = _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.begin),
						    caretPos_end = _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.end);inputmask.isRTL ? _positioning.caret.call(inputmask, input, caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1)) : _positioning.caret.call(inputmask, input, caretPos_begin - (0 === caretPos_begin ? 0 : 1));
					}, 0));inputmask.ignorable = opts.ignorables.includes(k);
				}, keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
					var inputmask = this.inputmask || this,
					    opts = inputmask.opts,
					    $ = inputmask.dependencyLib,
					    maskset = inputmask.maskset,
					    input = inputmask.el,
					    $input = $(input),
					    k = e.which || e.charCode || e.keyCode;if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) return k === _keycode.default.ENTER && inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), setTimeout(function () {
						$input.trigger("change");
					}, 0)), inputmask.skipInputEvent = !0, !0;if (k) {
						44 !== k && 46 !== k || 3 !== e.location || "" === opts.radixPoint || (k = opts.radixPoint.charCodeAt(0));var pos = checkval ? { begin: ndx, end: ndx } : _positioning.caret.call(inputmask, input),
						    forwardPosition,
						    c = String.fromCharCode(k);maskset.writeOutBuffer = !0;var valResult = _validation.isValid.call(inputmask, pos, c, strict, void 0, void 0, void 0, checkval);if (!1 !== valResult && (_positioning.resetMaskSet.call(inputmask, !0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : _positioning.seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos), maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? _positioning.seekPrevious.call(inputmask, forwardPosition) : forwardPosition, !1 !== writeOut && (setTimeout(function () {
							opts.onKeyValidation.call(input, k, valResult);
						}, 0), maskset.writeOutBuffer && !1 !== valResult)) {
							var buffer = _positioning.getBuffer.call(inputmask);(0, _inputHandling.writeBuffer)(input, buffer, forwardPosition, e, !0 !== checkval);
						}if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult;
					}
				}, keyupEvent: function keyupEvent(e) {
					var inputmask = this.inputmask;!inputmask.isComposing || e.keyCode !== _keycode.default.KEY_229 && e.keyCode !== _keycode.default.ENTER || inputmask.$el.trigger("input");
				}, pasteEvent: function pasteEvent(e) {
					var inputmask = this.inputmask,
					    opts = inputmask.opts,
					    input = this,
					    inputValue = inputmask._valueGet(!0),
					    caretPos = _positioning.caret.call(inputmask, this),
					    tempValue;inputmask.isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
					    valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);if (valueBeforeCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), valueAfterCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(caretPos.end).join("") && (valueAfterCaret = ""), window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;else {
						if (!e.clipboardData || !e.clipboardData.getData) return !0;inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
					}var pasteValue = inputValue;if ("function" == typeof opts.onBeforePaste) {
						if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();pasteValue = pasteValue || inputValue;
					}return (0, _inputHandling.checkVal)(this, !0, !1, pasteValue.toString().split(""), e), e.preventDefault();
				}, inputFallBackEvent: function inputFallBackEvent(e) {
					var inputmask = this.inputmask,
					    opts = inputmask.opts,
					    $ = inputmask.dependencyLib;function ieMobileHandler(input, inputValue, caretPos) {
						if (_environment.iemobile) {
							var inputChar = inputValue.replace(_positioning.getBuffer.call(inputmask).join(""), "");if (1 === inputChar.length) {
								var iv = inputValue.split("");iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("");
							}
						}return inputValue;
					}function analyseChanges(inputValue, buffer, caretPos) {
						for (var frontPart = inputValue.substr(0, caretPos.begin).split(""), backPart = inputValue.substr(caretPos.begin).split(""), frontBufferPart = buffer.substr(0, caretPos.begin).split(""), backBufferPart = buffer.substr(caretPos.begin).split(""), fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length, bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length, bl, i, action = "", data = [], marker = "~", placeholder; frontPart.length < fpl;) {
							frontPart.push("~");
						}for (; frontBufferPart.length < fpl;) {
							frontBufferPart.push("~");
						}for (; backPart.length < bpl;) {
							backPart.unshift("~");
						}for (; backBufferPart.length < bpl;) {
							backBufferPart.unshift("~");
						}var newBuffer = frontPart.concat(backPart),
						    oldBuffer = frontBufferPart.concat(backBufferPart);for (i = 0, bl = newBuffer.length; i < bl; i++) {
							switch (placeholder = _validationTests.getPlaceholder.call(inputmask, _positioning.translatePosition.call(inputmask, i)), action) {case "insertText":
									oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1 && data.push(newBuffer[i]), i = bl;break;case "insertReplacementText":
									"~" === newBuffer[i] ? caretPos.end++ : i = bl;break;case "deleteContentBackward":
									"~" === newBuffer[i] ? caretPos.end++ : i = bl;break;default:
									newBuffer[i] !== oldBuffer[i] && ("~" !== newBuffer[i + 1] && newBuffer[i + 1] !== placeholder && void 0 !== newBuffer[i + 1] || (oldBuffer[i] !== placeholder || "~" !== oldBuffer[i + 1]) && "~" !== oldBuffer[i] ? "~" === oldBuffer[i + 1] && oldBuffer[i] === newBuffer[i + 1] ? (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--) : newBuffer[i] !== placeholder && "~" !== newBuffer[i] && ("~" === newBuffer[i + 1] || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) ? (action = "insertReplacementText", data.push(newBuffer[i]), caretPos.begin--) : "~" === newBuffer[i] ? (action = "deleteContentBackward", !_positioning.isMask.call(inputmask, _positioning.translatePosition.call(inputmask, i), !0) && oldBuffer[i] !== opts.radixPoint || caretPos.end++) : i = bl : (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--));break;}
						}return { action: action, data: data, caret: caretPos };
					}var input = this,
					    inputValue = input.inputmask._valueGet(!0),
					    buffer = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join(""),
					    caretPos = _positioning.caret.call(inputmask, input, void 0, void 0, !0);if (buffer !== inputValue) {
						inputValue = ieMobileHandler(input, inputValue, caretPos);var changes = analyseChanges(inputValue, buffer, caretPos);switch ((input.inputmask.shadowRoot || document).activeElement !== input && input.focus(), (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask)), _positioning.caret.call(inputmask, input, caretPos.begin, caretPos.end, !0), changes.action) {case "insertText":case "insertReplacementText":
								changes.data.forEach(function (entry, ndx) {
									var keypress = new $.Event("keypress");keypress.which = entry.charCodeAt(0), inputmask.ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
								}), setTimeout(function () {
									inputmask.$el.trigger("keyup");
								}, 0);break;case "deleteContentBackward":
								var keydown = new $.Event("keydown");keydown.keyCode = _keycode.default.BACKSPACE, EventHandlers.keydownEvent.call(input, keydown);break;default:
								(0, _inputHandling.applyInputValue)(input, inputValue);break;}e.preventDefault();
					}
				}, compositionendEvent: function compositionendEvent(e) {
					var inputmask = this.inputmask;inputmask.isComposing = !1, inputmask.$el.trigger("input");
				}, setValueEvent: function setValueEvent(e, argument_1, argument_2) {
					var inputmask = this.inputmask,
					    input = this,
					    value = e && e.detail ? e.detail[0] : argument_1;void 0 === value && (value = this.inputmask._valueGet(!0)), (0, _inputHandling.applyInputValue)(this, value), (e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && _positioning.caret.call(inputmask, this, e.detail ? e.detail[1] : argument_2);
				}, focusEvent: function focusEvent(e) {
					var inputmask = this.inputmask,
					    opts = inputmask.opts,
					    input = this,
					    nptValue = this.inputmask._valueGet();opts.showMaskOnFocus && nptValue !== _positioning.getBuffer.call(inputmask).join("") && (0, _inputHandling.writeBuffer)(this, _positioning.getBuffer.call(inputmask), _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask))), !0 !== opts.positionCaretOnTab || !1 !== inputmask.mouseEnter || _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && -1 !== _positioning.getLastValidPosition.call(inputmask) || EventHandlers.clickEvent.apply(this, [e, !0]), inputmask.undoValue = _positioning.getBuffer.call(inputmask).join("");
				}, invalidEvent: function invalidEvent(e) {
					this.inputmask.validationEvent = !0;
				}, mouseleaveEvent: function mouseleaveEvent() {
					var inputmask = this.inputmask,
					    opts = inputmask.opts,
					    input = this;inputmask.mouseEnter = !1, opts.clearMaskOnLostFocus && (this.inputmask.shadowRoot || document).activeElement !== this && (0, _inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);
				}, clickEvent: function clickEvent(e, tabbed) {
					var inputmask = this.inputmask,
					    input = this;if ((this.inputmask.shadowRoot || document).activeElement === this) {
						var newCaretPosition = _positioning.determineNewCaretPosition.call(inputmask, _positioning.caret.call(inputmask, this), tabbed);void 0 !== newCaretPosition && _positioning.caret.call(inputmask, this, newCaretPosition);
					}
				}, cutEvent: function cutEvent(e) {
					var inputmask = this.inputmask,
					    maskset = inputmask.maskset,
					    input = this,
					    pos = _positioning.caret.call(inputmask, this),
					    clipboardData = window.clipboardData || e.clipboardData,
					    clipData = inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice(pos.end, pos.begin) : _positioning.getBuffer.call(inputmask).slice(pos.begin, pos.end);clipboardData.setData("text", inputmask.isRTL ? clipData.reverse().join("") : clipData.join("")), document.execCommand && document.execCommand("copy"), _validation.handleRemove.call(inputmask, this, _keycode.default.DELETE, pos), (0, _inputHandling.writeBuffer)(this, _positioning.getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join(""));
				}, blurEvent: function blurEvent(e) {
					var inputmask = this.inputmask,
					    opts = inputmask.opts,
					    $ = inputmask.dependencyLib,
					    $input = $(this),
					    input = this;if (this.inputmask) {
						(0, _inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);var nptValue = this.inputmask._valueGet(),
						    buffer = _positioning.getBuffer.call(inputmask).slice();"" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === _positioning.getLastValidPosition.call(inputmask) && nptValue === _positioning.getBufferTemplate.call(inputmask).join("") ? buffer = [] : _inputHandling.clearOptionalTail.call(inputmask, buffer)), !1 === _validation.isComplete.call(inputmask, buffer) && (setTimeout(function () {
							$input.trigger("incomplete");
						}, 0), opts.clearIncomplete && (_positioning.resetMaskSet.call(inputmask), buffer = opts.clearMaskOnLostFocus ? [] : _positioning.getBufferTemplate.call(inputmask).slice())), (0, _inputHandling.writeBuffer)(this, buffer, void 0, e)), inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), $input.trigger("change"));
					}
				}, mouseenterEvent: function mouseenterEvent() {
					var inputmask = this.inputmask,
					    opts = inputmask.opts,
					    input = this;inputmask.mouseEnter = !0, (this.inputmask.shadowRoot || document).activeElement !== this && (null == inputmask.originalPlaceholder && this.placeholder !== inputmask.originalPlaceholder && (inputmask.originalPlaceholder = this.placeholder), opts.showMaskOnHover && (0, _inputHandling.HandleNativePlaceholder)(this, (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join("")));
				}, submitEvent: function submitEvent() {
					var inputmask = this.inputmask,
					    opts = inputmask.opts;inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && inputmask.$el.trigger("change"), opts.clearMaskOnLostFocus && -1 === _positioning.getLastValidPosition.call(inputmask) && inputmask._valueGet && inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") && inputmask._valueSet(""), opts.clearIncomplete && !1 === _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && inputmask._valueSet(""), opts.removeMaskOnSubmit && (inputmask._valueSet(inputmask.unmaskedvalue(), !0), setTimeout(function () {
						(0, _inputHandling.writeBuffer)(inputmask.el, _positioning.getBuffer.call(inputmask));
					}, 0));
				}, resetEvent: function resetEvent() {
					var inputmask = this.inputmask;inputmask.refreshValue = !0, setTimeout(function () {
						(0, _inputHandling.applyInputValue)(inputmask.el, inputmask._valueGet(!0));
					}, 0);
				} };exports.EventHandlers = EventHandlers;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.iphone = exports.iemobile = exports.mobile = exports.ie = exports.ua = void 0;var ua = window.navigator && window.navigator.userAgent || "",
			    ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"),
			    mobile = "ontouchstart" in window,
			    iemobile = /iemobile/i.test(ua),
			    iphone = /iphone/i.test(ua) && !iemobile;exports.iphone = iphone, exports.iemobile = iemobile, exports.mobile = mobile, exports.ie = ie, exports.ua = ua;
		}, function (module, exports) {
			module.exports = __WEBPACK_EXTERNAL_MODULE__8__;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			function _typeof(obj) {
				return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
					return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				} : function _typeof(obj) {
					return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				}, _typeof(obj);
			}"function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function (object) {
				return object.__proto__;
			} : function (object) {
				return object.constructor.prototype;
			});
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.mask = mask, __webpack_require__(9);var _keycode = _interopRequireDefault(__webpack_require__(0)),
			    _positioning = __webpack_require__(2),
			    _inputHandling = __webpack_require__(5),
			    _eventruler = __webpack_require__(11),
			    _environment = __webpack_require__(7),
			    _validation = __webpack_require__(4),
			    _eventhandlers = __webpack_require__(6);function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}function mask() {
				var inputmask = this,
				    opts = this.opts,
				    el = this.el,
				    $ = this.dependencyLib;function isElementTypeSupported(input, opts) {
					function patchValueProperty(npt) {
						var valueGet, valueSet;function patchValhook(type) {
							if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
								var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
									return elem.value;
								},
								    valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
									return elem.value = value, elem;
								};$.valHooks[type] = { get: function get(elem) {
										if (elem.inputmask) {
											if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();var result = valhookGet(elem);return -1 !== _positioning.getLastValidPosition.call(inputmask, void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
										}return valhookGet(elem);
									}, set: function set(elem, value) {
										var result = valhookSet(elem, value);return elem.inputmask && (0, _inputHandling.applyInputValue)(elem, value), result;
									}, inputmaskpatch: !0 };
							}
						}function getter() {
							return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== _positioning.getLastValidPosition.call(inputmask) || !0 !== opts.nullable ? (this.inputmask.shadowRoot || document.activeElement) === this && opts.clearMaskOnLostFocus ? (inputmask.isRTL ? _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice()).reverse() : _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
						}function setter(value) {
							valueSet.call(this, value), this.inputmask && (0, _inputHandling.applyInputValue)(this, value);
						}function installNativeValueSetFallback(npt) {
							_eventruler.EventRuler.on(npt, "mouseenter", function () {
								var input = this,
								    value = this.inputmask._valueGet(!0);value !== (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).reverse() : _positioning.getBuffer.call(inputmask)).join("") && (0, _inputHandling.applyInputValue)(this, value);
							});
						}if (!npt.inputmask.__valueGet) {
							if (!0 !== opts.noValuePatching) {
								if (Object.getOwnPropertyDescriptor) {
									var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, valueSet = valueProperty.set, Object.defineProperty(npt, "value", { get: getter, set: setter, configurable: !0 })) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
										return this.textContent;
									}, valueSet = function valueSet(value) {
										this.textContent = value;
									}, Object.defineProperty(npt, "value", { get: getter, set: setter, configurable: !0 }));
								} else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), npt.__defineSetter__("value", setter));npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
							}npt.inputmask._valueGet = function (overruleRTL) {
								return inputmask.isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
							}, npt.inputmask._valueSet = function (value, overruleRTL) {
								valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && inputmask.isRTL ? value.split("").reverse().join("") : value);
							}, void 0 === valueGet && (valueGet = function valueGet() {
								return this.value;
							}, valueSet = function valueSet(value) {
								this.value = value;
							}, patchValhook(npt.type), installNativeValueSetFallback(npt));
						}
					}"textarea" !== input.tagName.toLowerCase() && opts.ignorables.push(_keycode.default.ENTER);var elementType = input.getAttribute("type"),
					    isSupported = "input" === input.tagName.toLowerCase() && opts.supportsInputType.includes(elementType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
						var el = document.createElement("input");el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
					} else isSupported = "partial";return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, isSupported;
				}_eventruler.EventRuler.off(el);var isSupported = isElementTypeSupported(el, opts);if (!1 !== isSupported) {
					inputmask.originalPlaceholder = el.placeholder, inputmask.maxLength = void 0 !== el ? el.maxLength : void 0, -1 === inputmask.maxLength && (inputmask.maxLength = void 0), "inputMode" in el && null === el.getAttribute("inputmode") && (el.inputMode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(el.autocomplete), _environment.iphone && (opts.insertModeVisual = !1), _eventruler.EventRuler.on(el, "submit", _eventhandlers.EventHandlers.submitEvent), _eventruler.EventRuler.on(el, "reset", _eventhandlers.EventHandlers.resetEvent), _eventruler.EventRuler.on(el, "blur", _eventhandlers.EventHandlers.blurEvent), _eventruler.EventRuler.on(el, "focus", _eventhandlers.EventHandlers.focusEvent), _eventruler.EventRuler.on(el, "invalid", _eventhandlers.EventHandlers.invalidEvent), _eventruler.EventRuler.on(el, "click", _eventhandlers.EventHandlers.clickEvent), _eventruler.EventRuler.on(el, "mouseleave", _eventhandlers.EventHandlers.mouseleaveEvent), _eventruler.EventRuler.on(el, "mouseenter", _eventhandlers.EventHandlers.mouseenterEvent), _eventruler.EventRuler.on(el, "paste", _eventhandlers.EventHandlers.pasteEvent), _eventruler.EventRuler.on(el, "cut", _eventhandlers.EventHandlers.cutEvent), _eventruler.EventRuler.on(el, "complete", opts.oncomplete), _eventruler.EventRuler.on(el, "incomplete", opts.onincomplete), _eventruler.EventRuler.on(el, "cleared", opts.oncleared), !0 !== opts.inputEventOnly && (_eventruler.EventRuler.on(el, "keydown", _eventhandlers.EventHandlers.keydownEvent), _eventruler.EventRuler.on(el, "keypress", _eventhandlers.EventHandlers.keypressEvent), _eventruler.EventRuler.on(el, "keyup", _eventhandlers.EventHandlers.keyupEvent)), (_environment.mobile || opts.inputEventOnly) && el.removeAttribute("maxLength"), _eventruler.EventRuler.on(el, "input", _eventhandlers.EventHandlers.inputFallBackEvent), _eventruler.EventRuler.on(el, "compositionend", _eventhandlers.EventHandlers.compositionendEvent)), _eventruler.EventRuler.on(el, "setvalue", _eventhandlers.EventHandlers.setValueEvent), inputmask.undoValue = _positioning.getBufferTemplate.call(inputmask).join("");var activeElement = (el.inputmask.shadowRoot || document).activeElement;if ("" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || activeElement === el) {
						(0, _inputHandling.applyInputValue)(el, el.inputmask._valueGet(!0), opts);var buffer = _positioning.getBuffer.call(inputmask).slice();!1 === _validation.isComplete.call(inputmask, buffer) && opts.clearIncomplete && _positioning.resetMaskSet.call(inputmask), opts.clearMaskOnLostFocus && activeElement !== el && (-1 === _positioning.getLastValidPosition.call(inputmask) ? buffer = [] : _inputHandling.clearOptionalTail.call(inputmask, buffer)), (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && activeElement === el || "" !== el.inputmask._valueGet(!0)) && (0, _inputHandling.writeBuffer)(el, buffer), activeElement === el && _positioning.caret.call(inputmask, el, _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask)));
					}
				}
			}
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.EventRuler = void 0;var _inputmask = _interopRequireDefault(__webpack_require__(1)),
			    _keycode = _interopRequireDefault(__webpack_require__(0)),
			    _positioning = __webpack_require__(2),
			    _inputHandling = __webpack_require__(5);function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}var EventRuler = { on: function on(input, eventName, eventHandler) {
					var $ = input.inputmask.dependencyLib,
					    ev = function ev(e) {
						e.originalEvent && (e = e.originalEvent || e, arguments[0] = e);var that = this,
						    args,
						    inputmask = that.inputmask,
						    opts = inputmask ? inputmask.opts : void 0;if (void 0 === inputmask && "FORM" !== this.nodeName) {
							var imOpts = $.data(that, "_inputmask_opts");$(that).off(), imOpts && new _inputmask.default(imOpts).mask(that);
						} else {
							if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === _keycode.default.TAB))) {
								switch (e.type) {case "input":
										if (!0 === inputmask.skipInputEvent || e.inputType && "insertCompositionText" === e.inputType) return inputmask.skipInputEvent = !1, e.preventDefault();break;case "keydown":
										inputmask.skipKeyPressEvent = !1, inputmask.skipInputEvent = inputmask.isComposing = e.keyCode === _keycode.default.KEY_229;break;case "keyup":case "compositionend":
										inputmask.isComposing && (inputmask.skipInputEvent = !1);break;case "keypress":
										if (!0 === inputmask.skipKeyPressEvent) return e.preventDefault();inputmask.skipKeyPressEvent = !0;break;case "click":case "focus":
										return inputmask.validationEvent ? (inputmask.validationEvent = !1, input.blur(), (0, _inputHandling.HandleNativePlaceholder)(input, (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join("")), setTimeout(function () {
											input.focus();
										}, 3e3)) : (args = arguments, setTimeout(function () {
											input.inputmask && eventHandler.apply(that, args);
										}, 0)), !1;}var returnVal = eventHandler.apply(that, arguments);return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
							}e.preventDefault();
						}
					};input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), ["submit", "reset"].includes(eventName) ? null !== input.form && $(input.form).on(eventName, ev.bind(input)) : $(input).on(eventName, ev);
				}, off: function off(input, event) {
					if (input.inputmask && input.inputmask.events) {
						var $ = input.inputmask.dependencyLib,
						    events = input.inputmask.events;for (var eventName in event && (events = [], events[event] = input.inputmask.events[event]), events) {
							for (var evArr = events[eventName]; 0 < evArr.length;) {
								var ev = evArr.pop();["submit", "reset"].includes(eventName) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
							}delete input.inputmask.events[eventName];
						}
					}
				} };exports.EventRuler = EventRuler;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;var _jquery = _interopRequireDefault(__webpack_require__(8));function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}if (void 0 === _jquery.default) throw "jQuery not loaded!";var _default = _jquery.default;exports.default = _default;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;var _default = "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window;exports.default = _default;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = _default;var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");function _default(str) {
				return str.replace(escapeRegexRegex, "\\$1");
			}
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0, __webpack_require__(16), __webpack_require__(20), __webpack_require__(22), __webpack_require__(23);var _inputmask2 = _interopRequireDefault(__webpack_require__(1));function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}var _default = _inputmask2.default;exports.default = _default;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			var _inputmask = _interopRequireDefault(__webpack_require__(1));function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}_inputmask.default.extendDefinitions({ A: { validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]", casing: "upper" }, "&": { validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]", casing: "upper" }, "#": { validator: "[0-9A-Fa-f]", casing: "upper" } });var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");function ipValidator(chrs, maskset, pos, strict, opts) {
				return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, -1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, ipValidatorRegex.test(chrs);
			}_inputmask.default.extendAliases({ cssunit: { regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)" }, url: { regex: "(https?|ftp)://.*", autoUnmask: !1, keepStatic: !1, tabThrough: !0 }, ip: { mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]", definitions: { i: { validator: ipValidator }, j: { validator: ipValidator }, k: { validator: ipValidator }, l: { validator: ipValidator } }, onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
						return maskedValue;
					}, inputmode: "numeric" }, email: { mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]", greedy: !1, casing: "lower", onBeforePaste: function onBeforePaste(pastedValue, opts) {
						return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
					}, definitions: { "*": { validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5!#$%&'*+/=?^_`{|}~-]" }, "-": { validator: "[0-9A-Za-z-]" } }, onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
						return maskedValue;
					}, inputmode: "email" }, mac: { mask: "##:##:##:##:##:##" }, vin: { mask: "V{13}9{4}", definitions: { V: { validator: "[A-HJ-NPR-Za-hj-npr-z\\d]", casing: "upper" } }, clearIncomplete: !0, autoUnmask: !0 }, ssn: { mask: "999-99-9999", postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
						return (/^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(buffer.join(""))
						);
					} } });
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.generateMaskSet = generateMaskSet, exports.analyseMask = analyseMask;var _inputmask = _interopRequireDefault(__webpack_require__(12));function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}function generateMaskSet(opts, nocache) {
				var ms;function generateMask(mask, metadata, opts) {
					var regexMask = !1,
					    masksetDefinition,
					    maskdefKey;if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
						var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
					}return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = { mask: mask, maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts), validPositions: {}, _buffer: void 0, buffer: void 0, tests: {}, excludes: {}, metadata: metadata, maskLength: void 0, jitOffset: {} }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, masksetDefinition = _inputmask.default.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = _inputmask.default.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), masksetDefinition;
				}if ("function" == typeof opts.mask && (opts.mask = opts.mask(opts)), Array.isArray(opts.mask)) {
					if (1 < opts.mask.length) {
						null === opts.keepStatic && (opts.keepStatic = !0);var altMask = opts.groupmarker[0];return (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach(function (msk) {
							1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), void 0 !== msk.mask && "function" != typeof msk.mask ? altMask += msk.mask : altMask += msk;
						}), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts);
					}opts.mask = opts.mask.pop();
				}return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && "function" != typeof opts.mask.mask ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), ms;
			}function analyseMask(mask, regexMask, opts) {
				var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
				    regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
				    escaped = !1,
				    currentToken = new MaskToken(),
				    match,
				    m,
				    openenings = [],
				    maskTokens = [],
				    openingToken,
				    currentOpeningToken,
				    alternator,
				    lastMatch,
				    closeRegexGroup = !1;function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
					this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, this.quantifier = { min: 1, max: 1 };
				}function insertTestDefinition(mtoken, element, position) {
					position = void 0 !== position ? position : mtoken.matches.length;var prevMatch = mtoken.matches[position - 1];if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, { fn: new RegExp(element, opts.casing ? "i" : ""), static: !1, optionality: !1, newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element, casing: null, def: element, placeholder: void 0, nativeDef: element }) : (escaped && (element = element[element.length - 1]), element.split("").forEach(function (lmnt, ndx) {
						prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, { fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null, static: !0, optionality: !1, newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch.static, casing: null, def: opts.staticDefinitionSymbol || lmnt, placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0, nativeDef: (escaped ? "'" : "") + lmnt });
					})), escaped = !1;else {
						var maskdef = opts.definitions && opts.definitions[element] || opts.usePrototypeDefinitions && Inputmask.prototype.definitions[element];maskdef && !escaped ? mtoken.matches.splice(position++, 0, { fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
								this.test = maskdef.validator;
							}() : new RegExp("."), static: maskdef.static || !1, optionality: !1, newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element), casing: maskdef.casing, def: maskdef.definitionSymbol || element, placeholder: maskdef.placeholder, nativeDef: element, generated: maskdef.generated }) : (mtoken.matches.splice(position++, 0, { fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null, static: !0, optionality: !1, newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch.static, casing: null, def: opts.staticDefinitionSymbol || element, placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0, nativeDef: (escaped ? "'" : "") + element }), escaped = !1);
					}
				}function verifyGroupMarker(maskToken) {
					maskToken && maskToken.matches && maskToken.matches.forEach(function (token, ndx) {
						var nextToken = maskToken.matches[ndx + 1];(void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), verifyGroupMarker(token);
					});
				}function defaultCase() {
					if (0 < openenings.length) {
						if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), currentOpeningToken.isAlternator) {
							alternator = openenings.pop();for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
								alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
							}0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
						}
					} else insertTestDefinition(currentToken, m);
				}function reverseTokens(maskToken) {
					function reverseStatic(st) {
						return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), st;
					}for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) {
						if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
							var intMatch = parseInt(match);if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
								var qt = maskToken.matches[match];maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
							}void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
						}
					}return maskToken;
				}function groupify(matches) {
					var groupToken = new MaskToken(!0);return groupToken.openGroup = !1, groupToken.matches = matches, groupToken;
				}function closeGroup() {
					if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken) {
						if (0 < openenings.length) {
							if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), currentOpeningToken.isAlternator) {
								alternator = openenings.pop();for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
									alternator.matches[mndx].isGroup = !1, alternator.matches[mndx].alternatorGroup = !1;
								}0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
							}
						} else currentToken.matches.push(openingToken);
					} else defaultCase();
				}function groupQuantifier(matches) {
					var lastMatch = matches.pop();return lastMatch.isQuantifier && (lastMatch = groupify([matches.pop(), lastMatch])), lastMatch;
				}for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
					if (m = match[0], regexMask) switch (m.charAt(0)) {case "?":
							m = "{0,1}";break;case "+":case "*":
							m = "{" + m + "}";break;case "|":
							if (0 === openenings.length) {
								var altRegexGroup = groupify(currentToken.matches);altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], closeRegexGroup = !0;
							}break;}if (escaped) defaultCase();else switch (m.charAt(0)) {case "$":case "^":
							regexMask || defaultCase();break;case "(?=":
							break;case "(?!":
							break;case "(?<=":
							break;case "(?<!":
							break;case opts.escapeChar:
							escaped = !0, regexMask && defaultCase();break;case opts.optionalmarker[1]:case opts.groupmarker[1]:
							closeGroup();break;case opts.optionalmarker[0]:
							openenings.push(new MaskToken(!1, !0));break;case opts.groupmarker[0]:
							openenings.push(new MaskToken(!0));break;case opts.quantifiermarker[0]:
							var quantifier = new MaskToken(!1, !1, !0);m = m.replace(/[{}]/g, "");var mqj = m.split("|"),
							    mq = mqj[0].split(","),
							    mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
							    mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);"*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = { min: mq0, max: mq1, jit: mqj[1] };var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;if (match = matches.pop(), match.isAlternator) {
								matches.push(match), matches = match.matches;var groupToken = new MaskToken(!0),
								    tmpMatch = matches.pop();matches.push(groupToken), matches = groupToken.matches, match = tmpMatch;
							}match.isGroup || (match = groupify([match])), matches.push(match), matches.push(quantifier);break;case opts.alternatormarker:
							if (0 < openenings.length) {
								currentOpeningToken = openenings[openenings.length - 1];var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches);
							} else lastMatch = groupQuantifier(currentToken.matches);if (lastMatch.isAlternator) openenings.push(lastMatch);else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), openenings.push(alternator), lastMatch.openGroup) {
								lastMatch.openGroup = !1;var alternatorGroup = new MaskToken(!0);alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
							}break;default:
							defaultCase();}
				}for (closeRegexGroup && closeGroup(); 0 < openenings.length;) {
					openingToken = openenings.pop(), currentToken.matches.push(openingToken);
				}return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
			}
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;var _default = { 9: { validator: "[0-9\uFF10-\uFF19]", definitionSymbol: "*" }, a: { validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]", definitionSymbol: "*" }, "*": { validator: "[0-9\uFF10-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]" } };exports.default = _default;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;var _default = { _maxTestPos: 500, placeholder: "_", optionalmarker: ["[", "]"], quantifiermarker: ["{", "}"], groupmarker: ["(", ")"], alternatormarker: "|", escapeChar: "\\", mask: null, regex: null, oncomplete: function oncomplete() {}, onincomplete: function onincomplete() {}, oncleared: function oncleared() {}, repeat: 0, greedy: !1, autoUnmask: !1, removeMaskOnSubmit: !1, clearMaskOnLostFocus: !0, insertMode: !0, insertModeVisual: !0, clearIncomplete: !1, alias: null, onKeyDown: function onKeyDown() {}, onBeforeMask: null, onBeforePaste: function onBeforePaste(pastedValue, opts) {
					return "function" == typeof opts.onBeforeMask ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
				}, onBeforeWrite: null, onUnMask: null, showMaskOnFocus: !0, showMaskOnHover: !0, onKeyValidation: function onKeyValidation() {}, skipOptionalPartCharacter: " ", numericInput: !1, rightAlign: !1, undoOnEscape: !0, radixPoint: "", _radixDance: !1, groupSeparator: "", keepStatic: null, positionCaretOnTab: !0, tabThrough: !1, supportsInputType: ["text", "tel", "url", "password", "search"], ignorables: [8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229], isComplete: null, preValidation: null, postValidation: null, staticDefinitionSymbol: void 0, jitMasking: !1, nullable: !0, inputEventOnly: !1, noValuePatching: !1, positionCaretOnClick: "lvp", casing: null, inputmode: "text", importDataAttributes: !0, shiftPositions: !0, usePrototypeDefinitions: !0 };exports.default = _default;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			var _inputmask = _interopRequireDefault(__webpack_require__(1)),
			    _keycode = _interopRequireDefault(__webpack_require__(0)),
			    _escapeRegex = _interopRequireDefault(__webpack_require__(14)),
			    _positioning = __webpack_require__(2),
			    _data = _interopRequireDefault(__webpack_require__(21));function _typeof(obj) {
				return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
					return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				} : function _typeof(obj) {
					return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				}, _typeof(obj);
			}function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}var $ = _inputmask.default.dependencyLib,
			    currentYear = new Date().getFullYear(),
			    formatCode = { d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate], dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
					return pad(Date.prototype.getDate.call(this), 2);
				}], ddd: [""], dddd: [""], m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
					return Date.prototype.getMonth.call(this) + 1;
				}], mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
					return pad(Date.prototype.getMonth.call(this) + 1, 2);
				}], mmm: [""], mmmm: [""], yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
					return pad(Date.prototype.getFullYear.call(this), 2);
				}], yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
					return pad(Date.prototype.getFullYear.call(this), 4);
				}], h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours], hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
					return pad(Date.prototype.getHours.call(this), 2);
				}], hx: [function (x) {
					return "[0-9]{".concat(x, "}");
				}, Date.prototype.setHours, "hours", function (x) {
					return Date.prototype.getHours;
				}], H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours], HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
					return pad(Date.prototype.getHours.call(this), 2);
				}], Hx: [function (x) {
					return "[0-9]{".concat(x, "}");
				}, Date.prototype.setHours, "hours", function (x) {
					return function () {
						return pad(Date.prototype.getHours.call(this), x);
					};
				}], M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes], MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
					return pad(Date.prototype.getMinutes.call(this), 2);
				}], s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds], ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
					return pad(Date.prototype.getSeconds.call(this), 2);
				}], l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
					return pad(Date.prototype.getMilliseconds.call(this), 3);
				}], L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
					return pad(Date.prototype.getMilliseconds.call(this), 2);
				}], t: ["[ap]"], tt: ["[ap]m"], T: ["[AP]"], TT: ["[AP]M"], Z: [""], o: [""], S: [""] },
			    formatAlias = { isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:ss", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'" };function formatcode(match) {
				var dynMatches = new RegExp("\\d+$").exec(match[0]);if (dynMatches && void 0 !== dynMatches[0]) {
					var fcode = formatCode[match[0][0] + "x"].slice("");return fcode[0] = fcode[0](dynMatches[0]), fcode[3] = fcode[3](dynMatches[0]), fcode;
				}if (formatCode[match[0]]) return formatCode[match[0]];
			}function getTokenizer(opts) {
				if (!opts.tokenizer) {
					var tokens = [],
					    dyntokens = [];for (var ndx in formatCode) {
						if (/\.*x$/.test(ndx)) {
							var dynToken = ndx[0] + "\\d+";-1 === dyntokens.indexOf(dynToken) && dyntokens.push(dynToken);
						} else -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
					}opts.tokenizer = "(" + (0 < dyntokens.length ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.", opts.tokenizer = new RegExp(opts.tokenizer, "g");
				}return opts.tokenizer;
			}function prefillYear(dateParts, currentResult, opts) {
				if (dateParts.year !== dateParts.rawyear) {
					var crrntyear = currentYear.toString(),
					    enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""),
					    currentYearPart = crrntyear.slice(0, enteredPart.length),
					    currentYearNextPart = crrntyear.slice(enteredPart.length);if (2 === enteredPart.length && enteredPart === currentYearPart) {
						var entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);dateParts.day == entryCurrentYear.getDate() && (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime()) && (dateParts.date.setFullYear(currentYear), dateParts.year = crrntyear, currentResult.insert = [{ pos: currentResult.pos + 1, c: currentYearNextPart[0] }, { pos: currentResult.pos + 2, c: currentYearNextPart[1] }]);
					}
				}return currentResult;
			}function isValidDate(dateParts, currentResult, opts) {
				if (void 0 === dateParts.rawday || !isFinite(dateParts.rawday) && new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) return currentResult;if ("29" == dateParts.day) {
					var tokenMatch = getTokenMatch(currentResult.pos, opts);if ("yyyy" === tokenMatch.targetMatch[0] && currentResult.pos - tokenMatch.targetMatchIndex == 2) return currentResult.remove = currentResult.pos + 1, currentResult;
				} else if ("02" == dateParts.month && "30" == dateParts.day) return dateParts.day = "03", dateParts.date.setDate(3), dateParts.date.setMonth(1), currentResult.insert = [{ pos: currentResult.pos, c: "0" }, { pos: currentResult.pos + 1, c: currentResult.c }], currentResult.caret = _positioning.seekNext.call(this, currentResult.pos + 1), currentResult;return !1;
			}function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
				if (!result) return result;if (opts.min) {
					if (dateParts.rawyear) {
						var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""),
						    minYear = opts.min.year.substr(0, rawYear.length),
						    maxYear;if (rawYear < minYear) {
							var tokenMatch = getTokenMatch(result.pos, opts);if (rawYear = dateParts.rawyear.substr(0, result.pos - tokenMatch.targetMatchIndex + 1).replace(/[^0-9]/g, "0"), minYear = opts.min.year.substr(0, rawYear.length), minYear <= rawYear) return result.remove = tokenMatch.targetMatchIndex + rawYear.length, result;if (rawYear = "yyyy" === tokenMatch.targetMatch[0] ? dateParts.rawyear.substr(1, 1) : dateParts.rawyear.substr(0, 1), minYear = opts.min.year.substr(2, 1), maxYear = opts.max ? opts.max.year.substr(2, 1) : rawYear, 1 === rawYear.length && minYear <= rawYear && rawYear <= maxYear && !0 !== fromCheckval) return "yyyy" === tokenMatch.targetMatch[0] ? (result.insert = [{ pos: result.pos + 1, c: rawYear, strict: !0 }], result.caret = result.pos + 2, maskset.validPositions[result.pos].input = opts.min.year[1]) : (result.insert = [{ pos: result.pos + 1, c: opts.min.year[1], strict: !0 }, { pos: result.pos + 2, c: rawYear, strict: !0 }], result.caret = result.pos + 3, maskset.validPositions[result.pos].input = opts.min.year[0]), result;result = !1;
						}
					}result && dateParts.year && dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime());
				}return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), result;
			}function parse(format, dateObjValue, opts, raw) {
				var mask = "",
				    match,
				    fcode;for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) {
					if (void 0 === dateObjValue) {
						if (fcode = formatcode(match)) mask += "(" + fcode[0] + ")";else switch (match[0]) {case "[":
								mask += "(";break;case "]":
								mask += ")?";break;default:
								mask += (0, _escapeRegex.default)(match[0]);}
					} else if (fcode = formatcode(match)) {
						if (!0 !== raw && fcode[3]) {
							var getFn = fcode[3];mask += getFn.call(dateObjValue.date);
						} else fcode[2] ? mask += dateObjValue["raw" + fcode[2]] : mask += match[0];
					} else mask += match[0];
				}return mask;
			}function pad(val, len) {
				for (val = String(val), len = len || 2; val.length < len;) {
					val = "0" + val;
				}return val;
			}function analyseMask(maskString, format, opts) {
				var dateObj = { date: new Date(1, 0, 1) },
				    targetProp,
				    mask = maskString,
				    match,
				    dateOperation;function setValue(dateObj, value, opts) {
					if (dateObj[targetProp] = value.replace(/[^0-9]/g, "0"), dateObj["raw" + targetProp] = value, void 0 !== dateOperation) {
						var datavalue = dateObj[targetProp];"day" === targetProp && 0 === parseInt(datavalue) && (datavalue = 1), "month" === targetProp && (datavalue = parseInt(datavalue), 0 < datavalue) && (datavalue -= 1), dateOperation.call(dateObj.date, datavalue);
					}
				}if ("string" == typeof mask) {
					for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) {
						var dynMatches = new RegExp("\\d+$").exec(match[0]),
						    fcode = dynMatches ? match[0][0] + "x" : match[0],
						    value = void 0;if (dynMatches) {
							var lastIndex = getTokenizer(opts).lastIndex,
							    tokanMatch = getTokenMatch(match.index, opts);getTokenizer(opts).lastIndex = lastIndex, value = mask.slice(0, mask.indexOf(tokanMatch.nextMatch[0]));
						} else value = mask.slice(0, fcode.length);Object.prototype.hasOwnProperty.call(formatCode, fcode) && (targetProp = formatCode[fcode][2], dateOperation = formatCode[fcode][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length);
					}return dateObj;
				}if (mask && "object" === _typeof(mask) && Object.prototype.hasOwnProperty.call(mask, "date")) return mask;
			}function importDate(dateObj, opts) {
				return parse(opts.inputFormat, { date: dateObj }, opts);
			}function getTokenMatch(pos, opts) {
				var calcPos = 0,
				    targetMatch,
				    match,
				    matchLength = 0;for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) {
					var dynMatches = new RegExp("\\d+$").exec(match[0]);if (matchLength = dynMatches ? parseInt(dynMatches[0]) : match[0].length, calcPos += matchLength, pos <= calcPos) {
						targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);break;
					}
				}return { targetMatchIndex: calcPos - matchLength, nextMatch: match, targetMatch: targetMatch };
			}_inputmask.default.extendAliases({ datetime: { mask: function mask(opts) {
						return opts.numericInput = !1, formatCode.S = opts.i18n.ordinalSuffix.join("|"), opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), opts.regex = parse(opts.inputFormat, void 0, opts), opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), null;
					}, placeholder: "", inputFormat: "isoDateTime", displayFormat: void 0, outputFormat: void 0, min: null, max: null, skipOptionalPartCharacter: "", i18n: { dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ordinalSuffix: ["st", "nd", "rd", "th"] }, preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
						if (strict) return !0;if (isNaN(c) && buffer[pos] !== c) {
							var tokenMatch = getTokenMatch(pos, opts);if (tokenMatch.nextMatch && tokenMatch.nextMatch[0] === c && 1 < tokenMatch.targetMatch[0].length) {
								var validator = formatCode[tokenMatch.targetMatch[0]][0];if (new RegExp(validator).test("0" + buffer[pos - 1])) return buffer[pos] = buffer[pos - 1], buffer[pos - 1] = "0", { fuzzy: !0, buffer: buffer, refreshFromBuffer: { start: pos - 1, end: pos + 1 }, pos: pos + 1 };
							}
						}return !0;
					}, postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
						var inputmask = this,
						    tokenMatch,
						    validator;if (strict) return !0;if (!1 === currentResult) return tokenMatch = getTokenMatch(pos + 1, opts), tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos && 1 < tokenMatch.targetMatch[0].length && void 0 !== formatCode[tokenMatch.targetMatch[0]] && (validator = formatCode[tokenMatch.targetMatch[0]][0], new RegExp(validator).test("0" + c)) ? { insert: [{ pos: pos, c: "0" }, { pos: pos + 1, c: c }], pos: pos + 1 } : currentResult;if (currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos), tokenMatch = getTokenMatch(pos, opts), tokenMatch.targetMatch && tokenMatch.targetMatch[0] && void 0 !== formatCode[tokenMatch.targetMatch[0]]) {
							validator = formatCode[tokenMatch.targetMatch[0]][0];var part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);!1 === new RegExp(validator).test(part.join("")) && 2 === tokenMatch.targetMatch[0].length && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1] && (maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0");
						}var result = currentResult,
						    dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = prefillYear(dateParts, result, opts), result = isValidDate.call(this, dateParts, result, opts), result = isDateInRange(dateParts, result, opts, maskset, fromCheckval)), pos && result && currentResult.pos !== pos ? { buffer: parse(opts.inputFormat, dateParts, opts).split(""), refreshFromBuffer: { start: pos, end: currentResult.pos } } : result;
					}, onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
						var input = this;e.ctrlKey && e.keyCode === _keycode.default.RIGHT && (this.inputmask._valueSet(importDate(new Date(), opts)), $(this).trigger("setvalue"));
					}, onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
						return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue;
					}, casing: function casing(elem, test, pos, validPositions) {
						return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem;
					}, onBeforeMask: function onBeforeMask(initialValue, opts) {
						return "[object Date]" === Object.prototype.toString.call(initialValue) && (initialValue = importDate(initialValue, opts)), initialValue;
					}, insertMode: !1, shiftPositions: !1, keepStatic: !1, inputmode: "numeric" } });
		}, function (module, exports, __webpack_require__) {
			"use strict";
			function _default(owner, key, value) {
				if (void 0 === value) return owner.__data ? owner.__data[key] : null;owner.__data = owner.__data || {}, owner.__data[key] = value;
			}Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = _default;
		}, function (module, exports, __webpack_require__) {
			"use strict";
			var _inputmask = _interopRequireDefault(__webpack_require__(1)),
			    _keycode = _interopRequireDefault(__webpack_require__(0)),
			    _escapeRegex = _interopRequireDefault(__webpack_require__(14));function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}var $ = _inputmask.default.dependencyLib;function autoEscape(txt, opts) {
				for (var escapedTxt = "", i = 0; i < txt.length; i++) {
					_inputmask.default.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
				}return escapedTxt;
			}function alignDigits(buffer, digits, opts, force) {
				if (0 < buffer.length && 0 < digits && (!opts.digitsOptional || force)) {
					var radixPosition = buffer.indexOf(opts.radixPoint),
					    negationBack = !1;opts.negationSymbol.back === buffer[buffer.length - 1] && (negationBack = !0, buffer.length--), -1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);for (var i = 1; i <= digits; i++) {
						isFinite(buffer[radixPosition + i]) || (buffer[radixPosition + i] = "0");
					}
				}return negationBack && buffer.push(opts.negationSymbol.back), buffer;
			}function findValidator(symbol, maskset) {
				var posNdx = 0;if ("+" === symbol) {
					for (posNdx in maskset.validPositions) {}posNdx = parseInt(posNdx);
				}for (var tstNdx in maskset.tests) {
					if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx) for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) {
						if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
					}
				}return posNdx;
			}function findValid(symbol, maskset) {
				var ret = -1;for (var ndx in maskset.validPositions) {
					var tst = maskset.validPositions[ndx];if (tst && tst.match.def === symbol) {
						ret = parseInt(ndx);break;
					}
				}return ret;
			}function parseMinMaxOptions(opts) {
				void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), opts.parseMinMaxOptions = "done");
			}function genMask(opts) {
				opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");var decimalDef = "0",
				    radixPointDef = opts.radixPoint;!0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1, radixPointDef = "," === opts.radixPoint ? "?" : "!", "" !== opts.radixPoint && void 0 === opts.definitions[radixPointDef] && (opts.definitions[radixPointDef] = {}, opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]", opts.definitions[radixPointDef].placeholder = opts.radixPoint, opts.definitions[radixPointDef].static = !0, opts.definitions[radixPointDef].generated = !0)) : (opts.__financeInput = !1, opts.numericInput = !0);var mask = "[+]",
				    altMask;if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? (void 0 === opts.definitions[opts.groupSeparator] && (opts.definitions[opts.groupSeparator] = {}, opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]", opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator, opts.definitions[opts.groupSeparator].static = !0, opts.definitions[opts.groupSeparator].generated = !0), mask += opts._mask(opts)) : mask += "9{+}", void 0 !== opts.digits && 0 !== opts.digits) {
					var dq = opts.digits.toString().split(",");isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += radixPointDef + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}", opts.keepStatic = !0) : mask += radixPointDef + decimalDef + "{" + opts.digits + "}");
				}return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask]), opts.greedy = !1, parseMinMaxOptions(opts), mask;
			}function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
				return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (void 0 === maskset.validPositions[pos - 1] || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back) && (pos -= 1), pos;
			}function decimalValidator(chrs, maskset, pos, strict, opts) {
				var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
				    result = -1 !== radixPos && new RegExp("[0-9\uFF11-\uFF19]").test(chrs);return opts._radixDance && result && null == maskset.validPositions[radixPos] ? { insert: { pos: radixPos === pos ? radixPos + 1 : radixPos, c: opts.radixPoint }, pos: pos } : result;
			}function checkForLeadingZeroes(buffer, opts) {
				var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? (0, _escapeRegex.default)(opts.negationSymbol.front) + "?" : "") + (0, _escapeRegex.default)(opts.prefix) + ")(.*)(" + (0, _escapeRegex.default)(opts.suffix) + ("" != opts.negationSymbol.back ? (0, _escapeRegex.default)(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
				    number = numberMatches ? numberMatches[2] : "",
				    leadingzeroes = !1;return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), !(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes;
			}_inputmask.default.extendAliases({ numeric: { mask: genMask, _mask: function _mask(opts) {
						return "(" + opts.groupSeparator + "999){+|1}";
					}, digits: "*", digitsOptional: !0, enforceDigitsOnBlur: !1, radixPoint: ".", positionCaretOnClick: "radixFocus", _radixDance: !0, groupSeparator: "", allowMinus: !0, negationSymbol: { front: "-", back: "" }, prefix: "", suffix: "", min: null, max: null, SetMaxOnOverflow: !1, step: 1, inputType: "text", unmaskAsNumber: !1, roundingFN: Math.round, inputmode: "numeric", shortcuts: { k: "000", m: "000000" }, placeholder: "0", greedy: !1, rightAlign: !0, insertMode: !0, autoUnmask: !1, skipOptionalPartCharacter: "", definitions: { 0: { validator: decimalValidator }, 1: { validator: decimalValidator, definitionSymbol: "9" }, "+": { validator: function validator(chrs, maskset, pos, strict, opts) {
								return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
							} }, "-": { validator: function validator(chrs, maskset, pos, strict, opts) {
								return opts.allowMinus && chrs === opts.negationSymbol.back;
							} } }, preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
						if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;var pattern;if (pattern = opts.shortcuts && opts.shortcuts[c]) {
							if (1 < pattern.length) for (var inserts = [], i = 0; i < pattern.length; i++) {
								inserts.push({ pos: pos + i, c: pattern[i], strict: !1 });
							}return { insert: inserts };
						}var radixPos = buffer.indexOf(opts.radixPoint),
						    initPos = pos;if (pos = hanndleRadixDance(pos, c, radixPos, maskset, opts), "-" === c || c === opts.negationSymbol.front) {
							if (!0 !== opts.allowMinus) return !1;var isNegative = !1,
							    front = findValid("+", maskset),
							    back = findValid("-", maskset);return -1 !== front && (isNegative = [front, back]), !1 !== isNegative ? { remove: isNegative, caret: initPos - opts.negationSymbol.front.length } : { insert: [{ pos: findValidator("+", maskset), c: opts.negationSymbol.front, fromIsValid: !0 }, { pos: findValidator("-", maskset), c: opts.negationSymbol.back, fromIsValid: void 0 }], caret: initPos + opts.negationSymbol.back.length };
						}if (c === opts.groupSeparator) return { caret: initPos };if (strict) return !0;if (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos) return { caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos };if (!1 === opts.__financeInput) if (isSelection) {
							if (opts.digitsOptional) return { rewritePosition: caretPos.end };if (!opts.digitsOptional) {
								if (caretPos.begin > radixPos && caretPos.end <= radixPos) return c === opts.radixPoint ? { insert: { pos: radixPos + 1, c: "0", fromIsValid: !0 }, rewritePosition: radixPos } : { rewritePosition: radixPos + 1 };if (caretPos.begin < radixPos) return { rewritePosition: caretPos.begin - 1 };
							}
						} else if (!opts.showMaskOnHover && !opts.showMaskOnFocus && !opts.digitsOptional && 0 < opts.digits && "" === this.inputmask.__valueGet.call(this)) return { rewritePosition: radixPos };return { rewritePosition: pos };
					}, postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
						if (!1 === currentResult) return currentResult;if (strict) return !0;if (null !== opts.min || null !== opts.max) {
							var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, { unmaskAsNumber: !0 }));if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length > opts.min.toString().length || unmasked < 0)) return !1;if (null !== opts.max && unmasked > opts.max) return !!opts.SetMaxOnOverflow && { refreshFromBuffer: !0, buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse() };
						}return currentResult;
					}, onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
						if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;var processValue = maskedValue.replace(opts.prefix, "");return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator), "g"), ""), "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(_escapeRegex.default.call(this, opts.radixPoint), ".")), processValue = processValue.replace(new RegExp("^" + (0, _escapeRegex.default)(opts.negationSymbol.front)), "-"), processValue = processValue.replace(new RegExp((0, _escapeRegex.default)(opts.negationSymbol.back) + "$"), ""), Number(processValue)) : processValue;
					}, isComplete: function isComplete(buffer, opts) {
						var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");return maskedValue = maskedValue.replace(new RegExp("^" + (0, _escapeRegex.default)(opts.negationSymbol.front)), "-"), maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex.default)(opts.negationSymbol.back) + "$"), ""), maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === opts.radixPoint && (maskedValue = maskedValue.replace((0, _escapeRegex.default)(opts.radixPoint), ".")), isFinite(maskedValue);
					}, onBeforeMask: function onBeforeMask(initialValue, opts) {
						var radixPoint = opts.radixPoint || ",";isFinite(opts.digits) && (opts.digits = parseInt(opts.digits)), "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));var isNagtive = "-" === initialValue.charAt(0) || initialValue.charAt(0) === opts.negationSymbol.front,
						    valueParts = initialValue.split(radixPoint),
						    integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
						    decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "",
						    forceDigits = 1 < valueParts.length;initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);var digits = 0;if ("" !== radixPoint && (digits = opts.digitsOptional ? opts.digits < decimalPart.length ? opts.digits : decimalPart.length : opts.digits, "" !== decimalPart || !opts.digitsOptional)) {
							var digitsFactor = Math.pow(10, digits || 1);initialValue = initialValue.replace((0, _escapeRegex.default)(radixPoint), "."), isNaN(parseFloat(initialValue)) || (initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits)), initialValue = initialValue.toString().replace(".", radixPoint);
						}if (0 === opts.digits && -1 !== initialValue.indexOf(radixPoint) && (initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint))), null !== opts.min || null !== opts.max) {
							var numberValue = initialValue.toString().replace(radixPoint, ".");null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint));
						}return isNagtive && "-" !== initialValue.charAt(0) && (initialValue = "-" + initialValue), alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
					}, onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
						function stripBuffer(buffer, stripRadix) {
							if (!1 !== opts.__financeInput || stripRadix) {
								var position = buffer.indexOf(opts.radixPoint);-1 !== position && buffer.splice(position, 1);
							}if ("" !== opts.groupSeparator) for (; -1 !== (position = buffer.indexOf(opts.groupSeparator));) {
								buffer.splice(position, 1);
							}return buffer;
						}var result,
						    leadingzeroes = checkForLeadingZeroes(buffer, opts);if (leadingzeroes) for (var caretNdx = buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) - (leadingzeroes[0] == leadingzeroes.input ? 0 : 1), offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0, i = leadingzeroes[0].length - offset; 0 < i; i--) {
							delete this.maskset.validPositions[caretNdx + i], delete buffer[caretNdx + i];
						}if (e) switch (e.type) {case "blur":case "checkval":
								if (null !== opts.min) {
									var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, { unmaskAsNumber: !0 }));if (null !== opts.min && unmasked < opts.min) return { refreshFromBuffer: !0, buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse() };
								}if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
									var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? (0, _escapeRegex.default)(opts.negationSymbol.front) + "?" : "") + (0, _escapeRegex.default)(opts.prefix) + ")(.*)(" + (0, _escapeRegex.default)(opts.suffix) + ("" != opts.negationSymbol.back ? (0, _escapeRegex.default)(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")),
									    number = nmbrMtchs ? nmbrMtchs[2] : "";0 == number && (result = { refreshFromBuffer: !0, buffer: [0] });
								} else "" !== opts.radixPoint && buffer[0] === opts.radixPoint && (result && result.buffer ? result.buffer.shift() : (buffer.shift(), result = { refreshFromBuffer: !0, buffer: stripBuffer(buffer) }));if (opts.enforceDigitsOnBlur) {
									result = result || {};var bffr = result && result.buffer || buffer.slice().reverse();result.refreshFromBuffer = !0, result.buffer = alignDigits(bffr, opts.digits, opts, !0).reverse();
								}}return result;
					}, onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
						var $input = $(this),
						    bffr;if (e.ctrlKey) switch (e.keyCode) {case _keycode.default.UP:
								return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue"), !1;case _keycode.default.DOWN:
								return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue"), !1;}if (!e.shiftKey && (e.keyCode === _keycode.default.DELETE || e.keyCode === _keycode.default.BACKSPACE || e.keyCode === _keycode.default.BACKSPACE_SAFARI) && caretPos.begin !== buffer.length) {
							if (buffer[e.keyCode === _keycode.default.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), "" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin]), !1;if (!0 === opts._radixDance) {
								var radixPos = buffer.indexOf(opts.radixPoint);if (opts.digitsOptional) {
									if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin]), !1;
								} else if (-1 !== radixPos && (caretPos.begin < radixPos || caretPos.end < radixPos || e.keyCode === _keycode.default.DELETE && caretPos.begin === radixPos)) return caretPos.begin !== caretPos.end || e.keyCode !== _keycode.default.BACKSPACE && e.keyCode !== _keycode.default.BACKSPACE_SAFARI || caretPos.begin++, bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1), bffr = alignDigits(bffr, opts.digits, opts).join(""), $input.trigger("setvalue", [bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin]), !1;
							}
						}
					} }, currency: { prefix: "", groupSeparator: ",", alias: "numeric", digits: 2, digitsOptional: !1 }, decimal: { alias: "numeric" }, integer: { alias: "numeric", digits: 0 }, percentage: { alias: "numeric", min: 0, max: 100, suffix: " %", digits: 0, allowMinus: !1 }, indianns: { alias: "numeric", _mask: function _mask(opts) {
						return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
					}, groupSeparator: ",", radixPoint: ".", placeholder: "0", digits: 2, digitsOptional: !1 } });
		}, function (module, exports, __webpack_require__) {
			"use strict";
			var _window = _interopRequireDefault(__webpack_require__(13)),
			    _inputmask = _interopRequireDefault(__webpack_require__(1));function _typeof(obj) {
				return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
					return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				} : function _typeof(obj) {
					return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				}, _typeof(obj);
			}function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
			}function _inherits(subClass, superClass) {
				if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), superClass && _setPrototypeOf(subClass, superClass);
			}function _createSuper(Derived) {
				var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {
					var Super = _getPrototypeOf(Derived),
					    result;if (hasNativeReflectConstruct) {
						var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);
					} else result = Super.apply(this, arguments);return _possibleConstructorReturn(this, result);
				};
			}function _possibleConstructorReturn(self, call) {
				return !call || "object" !== _typeof(call) && "function" != typeof call ? _assertThisInitialized(self) : call;
			}function _assertThisInitialized(self) {
				if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self;
			}function _wrapNativeSuper(Class) {
				var _cache = "function" == typeof Map ? new Map() : void 0;return _wrapNativeSuper = function _wrapNativeSuper(Class) {
					if (null === Class || !_isNativeFunction(Class)) return Class;if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");if ("undefined" != typeof _cache) {
						if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);
					}function Wrapper() {
						return _construct(Class, arguments, _getPrototypeOf(this).constructor);
					}return Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, Class);
				}, _wrapNativeSuper(Class);
			}function _construct(Parent, args, Class) {
				return _construct = _isNativeReflectConstruct() ? Reflect.construct : function _construct(Parent, args, Class) {
					var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a),
					    instance = new Constructor();return Class && _setPrototypeOf(instance, Class.prototype), instance;
				}, _construct.apply(null, arguments);
			}function _isNativeReflectConstruct() {
				if ("undefined" == typeof Reflect || !Reflect.construct) return !1;if (Reflect.construct.sham) return !1;if ("function" == typeof Proxy) return !0;try {
					return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
				} catch (e) {
					return !1;
				}
			}function _isNativeFunction(fn) {
				return -1 !== Function.toString.call(fn).indexOf("[native code]");
			}function _setPrototypeOf(o, p) {
				return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
					return o.__proto__ = p, o;
				}, _setPrototypeOf(o, p);
			}function _getPrototypeOf(o) {
				return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
					return o.__proto__ || Object.getPrototypeOf(o);
				}, _getPrototypeOf(o);
			}function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}var document = _window.default.document;if (document && document.head && document.head.attachShadow && _window.default.customElements && void 0 === _window.default.customElements.get("input-mask")) {
				var InputmaskElement = function (_HTMLElement) {
					_inherits(InputmaskElement, _HTMLElement);var _super = _createSuper(InputmaskElement);function InputmaskElement() {
						var _this;_classCallCheck(this, InputmaskElement), _this = _super.call(this);var attributeNames = _this.getAttributeNames(),
						    shadow = _this.attachShadow({ mode: "closed" }),
						    input = document.createElement("input");for (var attr in input.type = "text", shadow.appendChild(input), attributeNames) {
							Object.prototype.hasOwnProperty.call(attributeNames, attr) && input.setAttribute(attributeNames[attr], _this.getAttribute(attributeNames[attr]));
						}var im = new _inputmask.default();return im.dataAttribute = "", im.mask(input), input.inputmask.shadowRoot = shadow, _this;
					}return InputmaskElement;
				}(_wrapNativeSuper(HTMLElement));_window.default.customElements.define("input-mask", InputmaskElement);
			}
		}, function (module, exports, __webpack_require__) {
			"use strict";
			var _jquery = _interopRequireDefault(__webpack_require__(8)),
			    _inputmask = _interopRequireDefault(__webpack_require__(1));function _typeof(obj) {
				return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
					return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				} : function _typeof(obj) {
					return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
				}, _typeof(obj);
			}function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}void 0 === _jquery.default.fn.inputmask && (_jquery.default.fn.inputmask = function (fn, options) {
				var nptmask,
				    input = this[0];if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {case "unmaskedvalue":
						return input && input.inputmask ? input.inputmask.unmaskedvalue() : (0, _jquery.default)(input).val();case "remove":
						return this.each(function () {
							this.inputmask && this.inputmask.remove();
						});case "getemptymask":
						return input && input.inputmask ? input.inputmask.getemptymask() : "";case "hasMaskedValue":
						return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();case "isComplete":
						return !input || !input.inputmask || input.inputmask.isComplete();case "getmetadata":
						return input && input.inputmask ? input.inputmask.getmetadata() : void 0;case "setvalue":
						_inputmask.default.setValue(input, options);break;case "option":
						if ("string" != typeof options) return this.each(function () {
							if (void 0 !== this.inputmask) return this.inputmask.option(options);
						});if (input && void 0 !== input.inputmask) return input.inputmask.option(options);break;default:
						return options.alias = fn, nptmask = new _inputmask.default(options), this.each(function () {
							nptmask.mask(this);
						});} else {
					if (Array.isArray(fn)) return options.alias = fn, nptmask = new _inputmask.default(options), this.each(function () {
						nptmask.mask(this);
					});if ("object" == _typeof(fn)) return nptmask = new _inputmask.default(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function () {
						if (void 0 !== this.inputmask) return this.inputmask.option(fn);nptmask.mask(this);
					}) : this.each(function () {
						nptmask.mask(this);
					});if (void 0 === fn) return this.each(function () {
						nptmask = new _inputmask.default(options), nptmask.mask(this);
					});
				}
			});
		}, function (module, exports, __webpack_require__) {
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = void 0;var _bundle = _interopRequireDefault(__webpack_require__(15));function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}__webpack_require__(24);var _default = _bundle.default;exports.default = _default;
		}], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
			__webpack_require__.o(exports, name) || Object.defineProperty(exports, name, { enumerable: !0, get: getter });
		}, __webpack_require__.r = function (exports) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(exports, "__esModule", { value: !0 });
		}, __webpack_require__.t = function (value, mode) {
			if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;if (4 & mode && "object" == (typeof value === "undefined" ? "undefined" : _typeof2(value)) && value && value.__esModule) return value;var ns = Object.create(null);if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", { enumerable: !0, value: value }), 2 & mode && "string" != typeof value) for (var key in value) {
				__webpack_require__.d(ns, key, function (key) {
					return value[key];
				}.bind(null, key));
			}return ns;
		}, __webpack_require__.n = function (module) {
			var getter = module && module.__esModule ? function getDefault() {
				return module.default;
			} : function getModuleExports() {
				return module;
			};return __webpack_require__.d(getter, "a", getter), getter;
		}, __webpack_require__.o = function (object, property) {
			return Object.prototype.hasOwnProperty.call(object, property);
		}, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 25);function __webpack_require__(moduleId) {
			if (installedModules[moduleId]) return installedModules[moduleId].exports;var module = installedModules[moduleId] = { i: moduleId, l: !1, exports: {} };return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports;
		}var modules, installedModules;
	});;
	/* POPUP */
	$('.pl').click(function (event) {
		var pl = $(this).attr('href').replace('#', '');
		var v = $(this).data('vid');
		popupOpen(pl, v);
		return false;
	});
	function popupOpen(pl, v) {
		$('.popup').removeClass('active').hide();
		if (!$('.adaptive-header-menu').hasClass('active')) {
			$('body').data('scroll', $(window).scrollTop());
		}
		if (!isMobile.any()) {
			$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
			$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
		} else {
			setTimeout(function () {
				$('body').addClass('lock');
			}, 300);
		}
		history.pushState('', '', '#' + pl);
		if (v != '' && v != null) {
			$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		}
		$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

		if ($('.popup-' + pl).find('.slick-slider').length > 0) {
			$('.popup-' + pl).find('.slick-slider').slick('setPosition');
		}
	}
	function openPopupById(popup_id) {
		$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
	}
	function popupClose() {
		$('.popup').removeClass('active').fadeOut(300);
		if (!$('.adaptive-header-menu').hasClass('active')) {
			if (!isMobile.any()) {
				setTimeout(function () {
					$('body').css({ paddingRight: 0 });
					$('.pdb').css({ paddingRight: 0 });
				}, 200);
				setTimeout(function () {
					$('body').removeClass('lock');
					$('body,html').scrollTop(parseInt($('body').data('scroll')));
				}, 200);
			} else {
				$('body').removeClass('lock');
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}
		}
		$('.popup-video__value').html('');

		history.pushState('', '', window.location.href.split('#')[0]);
	}
	$('.popup-close,.popup__close').click(function (event) {
		popupClose();
		return false;
	});
	$('.popup').click(function (e) {
		if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
			popupClose();
			return false;
		}
	});
	$(document).on('keydown', function (e) {
		if (e.which == 27) {
			popupClose();
		}
	});

	//FORMS
	function forms() {
		//SELECT
		if ($('select').length > 0) {
			var selectscrolloptions = function selectscrolloptions() {
				var scs = 100;
				var mss = 50;
				if (isMobile.any()) {
					scs = 10;
					mss = 1;
				}
				var opt = {
					cursorcolor: "#36C903",
					cursorwidth: "3px",
					background: "",
					autohidemode: false,
					bouncescroll: false,
					cursorborderradius: "0px",
					scrollspeed: scs,
					mousescrollstep: mss,
					directionlockdeadzone: 0,
					cursorborder: "0px solid #fff"
				};
				return opt;
			};

			var select = function select() {
				$.each($('select'), function (index, val) {
					var ind = index;
					$(this).hide();
					if ($(this).parent('.select-block').length == 0) {
						$(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
					} else {
						$(this).parent('.select-block').find('.select').remove();
					}
					var milti = '';
					var check = '';
					var sblock = $(this).parent('.select-block');
					var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
					if ($(this).attr('multiple') == 'multiple') {
						milti = 'multiple';
						check = 'check';
					}
					$.each($(this).find('option'), function (index, val) {
						if ($(this).attr('value') != '') {
							soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + $(this).attr('class') + " " + check + "'>" + $(this).html() + "</div>";
						} else if ($(this).parent().attr('data-label') == 'on') {
							if (sblock.find('.select__label').length == 0) {
								sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
							}
						}
					});
					soptions = soptions + "</div></div></div>";
					if ($(this).attr('data-type') == 'search') {
						sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" + "<div class='select-title'>" + "<div class='select-title__arrow ion-ios-arrow-down'></div>" + "<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" + "</div>" + soptions + "</div>");
						$('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
							parentSectionClass: 'select-options_' + ind,
							parentLookupClass: 'select-options__value_' + ind,
							childBlockClass: 'select-options__value_' + ind
						});
					} else {
						sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" + "<div class='select-title'>" + "<div class='select-title__arrow ion-ios-arrow-down'></div>" + "<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" + "</div>" + soptions + "</div>");
					}
					if ($(this).find('option[selected="selected"]').val() != '') {
						sblock.find('.select').addClass('focus');
					}
					if ($(this).attr('data-req') == 'on') {
						$(this).addClass('req');
					}
					$(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
				});
			};

			select();

			$('body').on('keyup', 'input.select-title__value', function () {
				$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
				$(this).parents('.select').addClass('active');
				$(this).parents('.select').find('.select-options').slideDown(50, function () {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});
				$(this).parents('.select-block').find('select').val('');
			});
			$('body').on('click', '.select', function () {
				if (!$(this).hasClass('disabled')) {
					$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
					$(this).toggleClass('active');
					$(this).find('.select-options').slideToggle(50, function () {
						$(this).find(".select-options-scroll").getNiceScroll().resize();
					});

					//	var input=$(this).parent().find('select');
					//removeError(input);

					if ($(this).attr('data-type') == 'search') {
						if (!$(this).hasClass('active')) {
							searchselectreset();
						}
						$(this).find('.select-options__value').show();
					}
				}
			});
			$('body').on('click', '.select-options__value', function () {
				if ($(this).parents('.select').hasClass('multiple')) {
					if ($(this).hasClass('active')) {
						if ($(this).parents('.select').find('.select-title__value span').length > 0) {
							$(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
						} else {
							$(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
							$(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
						}
						$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
						$(this).parents('.select').addClass('focus');
					} else {
						$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
						if ($(this).parents('.select').find('.select-title__value span').length == 0) {
							$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
							$(this).parents('.select').removeClass('focus');
						}
						$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
					}
					return false;
				}

				if ($(this).parents('.select').attr('data-type') == 'search') {
					$(this).parents('.select').find('.select-title__value').val($(this).html());
					$(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
				} else {
					$(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
					$(this).parents('.select').find('.select-title__value').html($(this).html());
				}

				$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
				if ($.trim($(this).data('value')) != '') {
					$(this).parents('.select-block').find('select').val($(this).data('value'));
					$(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
				} else {
					$(this).parents('.select-block').find('select').val($(this).html());
					$(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
				}

				if ($(this).parents('.select-block').find('select').val() != '') {
					$(this).parents('.select-block').find('.select').addClass('focus');
				} else {
					$(this).parents('.select-block').find('.select').removeClass('focus');

					$(this).parents('.select-block').find('.select').removeClass('err');
					$(this).parents('.select-block').parent().removeClass('err');
					$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
				}
				if (!$(this).parents('.select').data('tags') != "") {
					if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
						$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
					}
				}
				$(this).parents('.select-block').find('select').change();

				if ($(this).parents('.select-block').find('select').data('update') == 'on') {
					select();
				}
			});
			$(document).on('click touchstart', function (e) {
				if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
					$('.select').removeClass('active');
					$('.select-options').slideUp(50, function () {});
					searchselectreset();
				};
			});
			$(document).on('keydown', function (e) {
				if (e.which == 27) {
					$('.select').removeClass('active');
					$('.select-options').slideUp(50, function () {});
					searchselectreset();
				}
			});
		}
		//FIELDS
		$('input,textarea').focus(function () {
			//берем все элементы .input или .textarea и при фокусе
			if ($(this).val() == $(this).attr('data-value')) {
				// если у этого элемента val (val - достаем значение) == есть атрибут "data-value", то
				$(this).addClass('focus'); // это поле получает доп класс focus
				$(this).parent().addClass('focus'); // родитель также получает доп класс focus (а ближайший родитель это обертка для поля - wrapper)
				if ($(this).attr('data-type') == 'pass') {
					// если у этого поля есть аттрибут data-value=pass, то 
					$(this).attr('type', 'password'); // это поле получает новый атрибут type = password
				};
				$(this).val(''); // хз че делает 
			};
			removeError($(this));
		});

		$('input[data-value], textarea[data-value]').each(function () {
			if (this.value == '' || this.value == $(this).attr('data-value')) {
				this.value = $(this).attr('data-value');
				if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
					$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
				}
			}
			if (this.value != $(this).attr('data-value') && this.value != '') {
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
					$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
				}
			}

			$(this).click(function () {
				if (this.value == $(this).attr('data-value')) {
					if ($(this).attr('data-type') == 'pass') {
						$(this).attr('type', 'password');
					};
					this.value = '';
				};
			});
			$(this).blur(function () {
				if (this.value == '') {
					this.value = $(this).attr('data-value');
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
					if ($(this).attr('data-type') == 'pass') {
						$(this).attr('type', 'text');
					};
				};
			});
		});
		$('.form-input__viewpass').click(function (event) {
			if ($(this).hasClass('active')) {
				$(this).parent().find('input').attr('type', 'password');
			} else {
				$(this).parent().find('input').attr('type', 'text');
			}
			$(this).toggleClass('active');
		});

		//$('textarea').autogrow({vertical: true, horizontal: false});


		//MASKS//
		//'+7(999) 999 9999'
		//'+38(999) 999 9999'
		//'+375(99)999-99-99'
		//'a{3,1000}' только буквы минимум 3
		//'9{3,1000}' только цифры минимум 3
		$.each($('input.phone'), function (index, val) {
			$(this).attr('type', 'tel');
			$(this).focus(function () {
				$(this).inputmask('+7(999) 999 9999', { clearIncomplete: true, clearMaskOnLostFocus: true,
					"onincomplete": function onincomplete() {
						maskclear($(this));
					}
				});
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				$(this).parent().removeClass('err');
				$(this).removeClass('err');
			});
		});
		$('input.phone').focusout(function (event) {
			maskclear($(this));
		});
		$.each($('input.num'), function (index, val) {
			$(this).focus(function () {
				$(this).inputmask('9{1,1000}', { clearIncomplete: true, placeholder: "", clearMaskOnLostFocus: true, "onincomplete": function onincomplete() {
						maskclear($(this));
					} });
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				$(this).parent().removeClass('err');
				$(this).removeClass('err');
			});
		});
		$('input.num').focusout(function (event) {
			maskclear($(this));
		});
		//CHECK
		$.each($('.check'), function (index, val) {
			if ($(this).find('input').prop('checked') == true) {
				$(this).addClass('active');
			}
		});
		$('body').off('click', '.check', function (event) {});
		$('body').on('click', '.check', function (event) {
			if (!$(this).hasClass('disable')) {
				var target = $(event.target);
				if (!target.is("a")) {
					$(this).toggleClass('active');
					if ($(this).hasClass('active')) {
						$(this).find('input').prop('checked', true);
					} else {
						$(this).find('input').prop('checked', false);
					}
				}
			}
		});

		//OPTION
		$.each($('.option.active'), function (index, val) {
			$(this).find('input').prop('checked', true);
		});
		$('.option').click(function (event) {
			if (!$(this).hasClass('disable')) {
				if ($(this).hasClass('active') && $(this).hasClass('order')) {
					$(this).toggleClass('orderactive');
				}
				$(this).parents('.options').find('.option').removeClass('active');
				$(this).toggleClass('active');
				$(this).children('input').prop('checked', true);
			}
		});
		//RATING
		$('.rating.edit .star').hover(function () {
			var block = $(this).parents('.rating');
			block.find('.rating__activeline').css({ width: '0%' });
			var ind = $(this).index() + 1;
			var linew = ind / block.find('.star').length * 100;
			setrating(block, linew);
		}, function () {
			var block = $(this).parents('.rating');
			block.find('.star').removeClass('active');
			var ind = block.find('input').val();
			var linew = ind / block.find('.star').length * 100;
			setrating(block, linew);
		});
		$('.rating.edit .star').click(function (event) {
			var block = $(this).parents('.rating');
			var re = $(this).index() + 1;
			block.find('input').val(re);
			var linew = re / block.find('.star').length * 100;
			setrating(block, linew);
		});
		$.each($('.rating'), function (index, val) {
			var ind = $(this).find('input').val();
			var linew = ind / $(this).parent().find('.star').length * 100;
			setrating($(this), linew);
		});
		function setrating(th, val) {
			th.find('.rating__activeline').css({ width: val + '%' });
		}
		//QUANTITY
		$('.quantity__btn').click(function (event) {
			var n = parseInt($(this).parent().find('.quantity__input').val());
			if ($(this).hasClass('dwn')) {
				n = n - 1;
				if (n < 1) {
					n = 1;
				}
			} else {
				n = n + 1;
			}
			$(this).parent().find('.quantity__input').val(n);
			return false;
		});
		//RANGE
		if ($("#range").length > 0) {
			$("#range").slider({
				range: true,
				min: 0,
				max: 5000,
				values: [0, 5000],
				slide: function slide(event, ui) {
					$('#rangefrom').val(ui.values[0]);
					$('#rangeto').val(ui.values[1]);
					$(this).find('.ui-slider-handle').eq(0).html('<span>' + ui.values[0] + '</span>');
					$(this).find('.ui-slider-handle').eq(1).html('<span>' + ui.values[1] + '</span>');
				},
				change: function change(event, ui) {
					if (ui.values[0] != $("#range").slider("option", "min") || ui.values[1] != $("#range").slider("option", "max")) {
						$('#range').addClass('act');
					} else {
						$('#range').removeClass('act');
					}
				}
			});
			$('#rangefrom').val($("#range").slider("values", 0));
			$('#rangeto').val($("#range").slider("values", 1));

			$("#range").find('.ui-slider-handle').eq(0).html('<span>' + $("#range").slider("option", "min") + '</span>');
			$("#range").find('.ui-slider-handle').eq(1).html('<span>' + $("#range").slider("option", "max") + '</span>');

			$("#rangefrom").bind("change", function () {
				if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
					$(this).val($("#range").slider("option", "max"));
				}
				if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
					$(this).val($("#range").slider("option", "min"));
				}
				$("#range").slider("values", 0, $(this).val());
			});
			$("#rangeto").bind("change", function () {
				if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
					$(this).val($("#range").slider("option", "max"));
				}
				if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
					$(this).val($("#range").slider("option", "min"));
				}
				$("#range").slider("values", 1, $(this).val());
			});
			$("#range").find('.ui-slider-handle').eq(0).addClass('left');
			$("#range").find('.ui-slider-handle').eq(1).addClass('right');
		}
		//ADDFILES
		$('.form-addfile__input').change(function (e) {
			if ($(this).val() != '') {
				var ts = $(this);
				ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
				$.each(e.target.files, function (index, val) {
					if (ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("' + e.target.files[index].name + '")').length == 0) {
						ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>' + e.target.files[index].name + '</li>');
					}
				});
			}
		});
	}
	forms();

	function digi(str) {
		var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		return r;
	}

	//VALIDATE FORMS
	$('form button[type=submit]').click(function () {
		var er = 0;
		var form = $(this).parents('form');
		var ms = form.data('ms');
		$.each(form.find('.req'), function (index, val) {
			er += formValidate($(this));
		});
		if (er == 0) {
			removeFormError(form);
			/*
   	var messagehtml='';
   if(form.hasClass('editprofile')){
   	var messagehtml='';
   }
   formLoad();
   */

			//ОПТРАВКА ФОРМЫ
			/*
   function showResponse(html){
   	if(!form.hasClass('nomessage')){
   		showMessage(messagehtml);
   	}
   	if(!form.hasClass('noclear')){
   		clearForm(form);
   	}
   }
   var options={
   	success:showResponse
   };
   	form.ajaxForm(options);
   
   		setTimeout(function(){
   	if(!form.hasClass('nomessage')){
   		//showMessage(messagehtml);
   		showMessageByClass(ms);
   	}
   	if(!form.hasClass('noclear')){
   		clearForm(form);
   	}
   },0);
   		return false;
   */

			if (ms != null && ms != '') {
				showMessageByClass(ms);
				return false;
			}
		} else {
			return false;
		}
	});
	function formValidate(input) {
		var er = 0;
		var form = input.parents('form');
		if (input.attr('name') == 'email' || input.hasClass('email')) {
			if (input.val() != input.attr('data-value')) {
				var em = input.val().replace(" ", "");
				input.val(em);
			}
			if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val()) || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		} else {
			if (input.val() == '' || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		}
		if (input.attr('type') == 'checkbox') {
			if (input.prop('checked') == true) {
				input.removeClass('err').parent().removeClass('err');
			} else {
				er++;
				input.addClass('err').parent().addClass('err');
			}
		}
		if (input.hasClass('name')) {
			if (!/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val())) {
				er++;
				addError(input);
			}
		}
		if (input.hasClass('pass-2')) {
			if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
				addError(input);
			} else {
				removeError(input);
			}
		}
		return er;
	}
	function formLoad() {
		$('.popup').hide();
		$('.popup-message-body').hide();
		$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
		$('.popup-message').addClass('active').fadeIn(300);
	}
	function showMessageByClass(ms) {
		$('.popup').hide();
		popupOpen('message.' + ms, '');
	}
	function showMessage(html) {
		$('.popup-loading').remove();
		$('.popup-message-body').show().html(html);
	}
	function clearForm(form) {
		$.each(form.find('.input'), function (index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
			if ($(this).hasClass('phone')) {
				maskclear($(this));
			}
		});
	}
	function addError(input) {
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
		if (input.hasClass('email')) {
			var error = '';
			if (input.val() == '' || input.val() == input.attr('data-value')) {
				error = input.data('error');
			} else {
				error = input.data('error');
			}
			if (error != null) {
				input.parent().append('<div class="form__error">' + error + '</div>');
			}
		} else {
			if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
				input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
			}
		}
		if (input.parents('.select-block').length > 0) {
			input.parents('.select-block').parent().addClass('err');
			input.parents('.select-block').find('.select').addClass('err');
		}
	}
	function addErrorByName(form, input__name, error_text) {
		var input = form.find('[name="' + input__name + '"]');
		input.attr('data-error', error_text);
		addError(input);
	}
	function addFormError(form, error_text) {
		form.find('.form__generalerror').show().html(error_text);
	}
	function removeFormError(form) {
		form.find('.form__generalerror').hide().html('');
	}
	function removeError(input) {
		input.removeClass('err');
		input.parent().removeClass('err');
		input.parent().find('.form__error').remove();

		if (input.parents('.select-block').length > 0) {
			input.parents('.select-block').parent().removeClass('err');
			input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
			//input.parents('.select-block').find('.select-options').hide();
		}
	}
	function removeFormErrors(form) {
		form.find('.err').removeClass('err');
		form.find('.form__error').remove();
	}
	function maskclear(n) {
		if (n.val() == "") {
			n.inputmask('remove');
			n.val(n.attr('data-value'));
			n.removeClass('focus');
			n.parent().removeClass('focus');
		}
	}
	function searchselectreset() {
		$.each($('.select[data-type="search"]'), function (index, val) {
			var block = $(this).parent();
			var select = $(this).parent().find('select');
			if ($(this).find('.select-options__value:visible').length == 1) {
				$(this).addClass('focus');
				$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
				$(this).find('.select-title__value').val($('.select-options__value:visible').html());
				$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
			} else if (select.val() == '') {
				$(this).removeClass('focus');
				block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
				block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
			}
		});
	}

	;

	/* END JS */
});