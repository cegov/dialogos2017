! function(a) {
    var b = {
        sectionContainer: "section",
        easing: "ease",
        animationTime: 1e3,
        pagination: !0,
        updateURL: !1
    };
    a.fn.swipeEvents = function() {
        return this.each(function() {
            function e(a) {
                var e = a.originalEvent.touches;
                e && e.length && (b = e[0].pageX, c = e[0].pageY, d.bind("touchmove", f)), a.preventDefault()
            }

            function f(a) {
                var e = a.originalEvent.touches;
                if (e && e.length) {
                    var g = b - e[0].pageX,
                        h = c - e[0].pageY;
                    g >= 50 && d.trigger("swipeLeft"), g <= -50 && d.trigger("swipeRight"), h >= 50 && d.trigger("swipeUp"), h <= -50 && d.trigger("swipeDown"), (Math.abs(g) >= 50 || Math.abs(h) >= 50) && d.unbind("touchmove", f)
                }
                a.preventDefault()
            }
            var b, c, d = a(this);
            d.bind("touchstart", e)
        })
    }, a.fn.onepage_scroll = function(c) {
        function g(a, b) {
            deltaOfInterest = b;
            var c = (new Date).getTime();
            return c - lastAnimation < quietPeriod + d.animationTime ? void a.preventDefault() : (deltaOfInterest < 0 ? e.moveDown() : e.moveUp(), void(lastAnimation = c))
        }
        var d = a.extend({}, b, c),
            e = a(this),
            f = a(d.sectionContainer);
        if (total = f.length, status = "off", topPos = 0, lastAnimation = 0, quietPeriod = 500, paginationList = "", a.fn.transformPage = function(b, c) {
                a(this).css({
                    "-webkit-transform": "translate3d(0, " + c + "%, 0)",
                    "-webkit-transition": "all " + b.animationTime + "ms " + b.easing,
                    "-moz-transform": "translate3d(0, " + c + "%, 0)",
                    "-moz-transition": "all " + b.animationTime + "ms " + b.easing,
                    "-ms-transform": "translate3d(0, " + c + "%, 0)",
                    "-ms-transition": "all " + b.animationTime + "ms " + b.easing,
                    transform: "translate3d(0, " + c + "%, 0)",
                    transition: "all " + b.animationTime + "ms " + b.easing
                })
            }, a.fn.moveDown = function() {
                var b = a(this);
                if (index = a(d.sectionContainer + ".active").data("index"), index < total) {
                    if (current = a(d.sectionContainer + "[data-index='" + index + "']"), next = a(d.sectionContainer + "[data-index='" + (index + 1) + "']"), next && (current.removeClass("active"), next.addClass("active"), 1 == d.pagination && (a("a.onepage-pagination-link[data-index='" + index + "']").removeClass("active"), a("a.onepage-pagination-link[data-index='" + (index + 1) + "']").addClass("active")), a("body")[0].className = a("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, ""), a("body").addClass("viewing-page-" + next.data("index")), history.replaceState && 1 == d.updateURL)) {
                        var c = window.location.href.substr(0, window.location.href.indexOf("#")) + "#" + (index + 1);
                        history.pushState({}, document.title, c)
                    }
                    pos = 100 * index * -1, b.transformPage(d, pos)
                }
            }, a.fn.moveUp = function() {
                var b = a(this);
                if (index = a(d.sectionContainer + ".active").data("index"), index <= total && index > 1) {
                    if (current = a(d.sectionContainer + "[data-index='" + index + "']"), next = a(d.sectionContainer + "[data-index='" + (index - 1) + "']"), next && (current.removeClass("active"), next.addClass("active"), 1 == d.pagination && (a("a.onepage-pagination-link[data-index='" + index + "']").removeClass("active"), a("a.onepage-pagination-link[data-index='" + (index - 1) + "']").addClass("active")), a("body")[0].className = a("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, ""), a("body").addClass("viewing-page-" + next.data("index")), history.replaceState && 1 == d.updateURL)) {
                        var c = window.location.href.substr(0, window.location.href.indexOf("#")) + "#" + (index - 1);
                        history.pushState({}, document.title, c)
                    }
                    pos = 100 * (next.data("index") - 1) * -1, b.transformPage(d, pos)
                }
            }, e.addClass("onepage-wrapper").css("position", "relative"), a.each(f, function(b) {
                a(this).css({
                    position: "absolute",
                    top: topPos + "%"
                }).addClass("section").attr("data-index", b + 1), topPos += 100, 1 == d.pagination && (paginationList += "<li><a class='onepage-pagination-link' data-index='" + (b + 1) + "' href='#" + (b + 1) + "'></a></li>")
            }), e.swipeEvents().bind("swipeDown", function() {
                e.moveUp()
            }).bind("swipeUp", function() {
                e.moveDown()
            }), 1 == d.pagination && (a("<ul class='onepage-pagination'>" + paginationList + "</ul>").prependTo("body"), posTop = e.find(".onepage-pagination").height() / 2 * -1, e.find(".onepage-pagination").css("margin-top", posTop)), "" != window.location.hash && "#1" != window.location.hash) {
            if (init_index = window.location.hash.replace("#", ""), a(d.sectionContainer + "[data-index='" + init_index + "']").addClass("active"), a("body").addClass("viewing-page-" + init_index), 1 == d.pagination && a("a.onepage-pagination-link[data-index='" + init_index + "']").addClass("active"), next = a(d.sectionContainer + "[data-index='" + init_index + "']"), next && (next.addClass("active"), 1 == d.pagination && a("a.onepage-pagination-link[data-index='" + init_index + "']").addClass("active"), a("body")[0].className = a("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, ""), a("body").addClass("viewing-page-" + next.data("index")), history.replaceState && 1 == d.updateURL)) {
                var h = window.location.href.substr(0, window.location.href.indexOf("#")) + "#" + init_index;
                history.pushState({}, document.title, h)
            }
            pos = 100 * (init_index - 1) * -1, e.transformPage(d, pos)
        } else a(d.sectionContainer + "[data-index='1']").addClass("active"), a("body").addClass("viewing-page-1"), 1 == d.pagination && a("a.onepage-pagination-link[data-index='1']").addClass("active");
        return 1 == d.pagination && a("a.onepage-pagination-link").click(function() {
            var b = a(this).data("index");
            if (a(this).hasClass("active") || (current = a(d.sectionContainer + ".active"), next = a(d.sectionContainer + "[data-index='" + b + "']"), next && (current.removeClass("active"), next.addClass("active"), a("a.onepage-pagination-link.active").removeClass("active"), a("a.onepage-pagination-link[data-index='" + b + "']").addClass("active"), a("body")[0].className = a("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, ""), a("body").addClass("viewing-page-" + next.data("index"))), pos = 100 * (b - 1) * -1, e.transformPage(d, pos)), 0 == d.updateURL) return !1
        }), a(document).bind("mousewheel DOMMouseScroll", function(a) {
            a.preventDefault();
            var b = a.originalEvent.wheelDelta || -a.originalEvent.detail;
            g(a, b)
        }), a(document).keydown(function(a) {
            switch (a.which) {
                case 38:
                    e.moveUp();
                    break;
                case 40:
                    e.moveDown();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }), !1
    }
}(window.jQuery);