(function() {
    "use strict";
    ! function() {
        function t(t) {
            this.el = t;
            for (var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < n.length; i++) e.call(this, n[i])
        }

        function n(t, n, i) {
            Object.defineProperty ? Object.defineProperty(t, n, {
                get: i
            }) : t.__defineGetter__(n, i)
        }
        if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) {
            var i = Array.prototype,
                e = i.push,
                s = i.splice,
                o = i.join;
            t.prototype = {
                add: function(t) {
                    this.contains(t) || (e.call(this, t), this.el.className = this.toString())
                },
                contains: function(t) {
                    return -1 != this.el.className.indexOf(t)
                },
                item: function(t) {
                    return this[t] || null
                },
                remove: function(t) {
                    if (this.contains(t)) {
                        for (var n = 0; n < this.length && this[n] != t; n++);
                        s.call(this, n, 1), this.el.className = this.toString()
                    }
                },
                toString: function() {
                    return o.call(this, " ")
                },
                toggle: function(t) {
                    return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t)
                }
            }, window.DOMTokenList = t, n(Element.prototype, "classList", function() {
                return new t(this)
            })
        }
    }();
    window.canUse = function(p) {
        if (!window._canUse) window._canUse = document.createElement("div");
        var e = window._canUse.style,
            up = p.charAt(0).toUpperCase() + p.slice(1);
        return p in e || "Moz" + up in e || "Webkit" + up in e || "O" + up in e || "ms" + up in e
    };
    (function() {
        if ("addEventListener" in window) return;
        window.addEventListener = function(type, f) {
            window.attachEvent("on" + type, f)
        }
    })();
    var $body = document.querySelector('body');
    $body.classList.add('is-loading');
    window.addEventListener('load', function() {
        window.setTimeout(function() {
            $body.classList.remove('is-loading');
        }, 100);
    });
    (function() {
        var settings = {
            images: {
                'images/fences.jpg': 'center'/*,
                'images/fences.jpg': 'center',
                'images/fences.jpg': 'center'*/
            },
            delay: 600000
        };
        var pos = 0,
            lastPos = 0,
            $wrapper, $bgs = [],
            $bg, k, v;
        $wrapper = document.createElement('div');
        $wrapper.id = 'bg';
        $body.appendChild($wrapper);
        for (k in settings.images) {
            $bg = document.createElement('div');
            $bg.style.backgroundImage = 'url("' + k + '")';
            $bg.style.backgroundPosition = settings.images[k];
            $wrapper.appendChild($bg);
            $bgs.push($bg);
        }
        $bgs[pos].classList.add('visible');
        $bgs[pos].classList.add('top');
        if ($bgs.length == 1 || !canUse('transition')) return;
        window.setInterval(function() {
            lastPos = pos;
            pos++;
            if (pos >= $bgs.length) pos = 0;
            $bgs[lastPos].classList.remove('top');
            $bgs[pos].classList.add('visible');
            $bgs[pos].classList.add('top');
            window.setTimeout(function() {
                $bgs[lastPos].classList.remove('visible');
            }, settings.delay / 2);
        }, settings.delay);
    })();
    (function() {
        var $form = document.querySelectorAll('#signup-form')[0],
            $submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
						$code = document.querySelectorAll('#code')[0],
            $message;
        if (!('addEventListener' in $form)) return;
        $message = document.createElement('span');
        $message.classList.add('message');
        $form.appendChild($message);
        $message._show = function(type, text) {
            $message.innerHTML = text;
            $message.classList.add(type);
            $message.classList.add('visible');
            window.setTimeout(function() {
                $message._hide();
            }, 3000);
        };
        $message._hide = function() {
            $message.classList.remove('visible');
        };
        $form.addEventListener('submit', function(event) {
            event.stopPropagation();
            event.preventDefault();
						
						$message._show("normal", "Checking code...");
            $submit.disabled = true;
						
						var code = $code.value;
						$.ajax({ url: "/sessions/" + code })
							.done(function (session) {
								if (session && session.active) {
									$message._show("success", "Connecting...");
									$form.reset();
									window.setTimeout(function() {
											window.location.href = "/view/" + session.code;
									}, 1500);
								}
								else {
									$message._show("warn", "Invalid code, try again");
									$code.select();
									$submit.disabled = false;
								}
							})
							.fail(function () {
								$message._show("warn", "Invalid code, try again");
								$code.select();
								$submit.disabled = false;
								return;
							});
        });
    })();
})();

(function() {
	if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && window.self !== window.top) {
		var body = document.body, f = function() {
			body.style.width = window.top.innerWidth + 'px';
			body.style.height = window.top.innerHeight + 'px';
		};
		window.addEventListener('load', f);
		window.addEventListener('orientationchange', f);
		window.addEventListener('resize', f);
	}
})();