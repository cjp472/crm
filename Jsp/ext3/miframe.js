/*
 * ux.ManagedIFrame for ExtJS Library 3.1+ Copyright(c) 2008-2009 Active Group,
 * Inc. licensing@theactivegroup.com http://licensing.theactivegroup.com
 */
Ext.namespace("Ext.ux.plugin");
Ext.onReady(function() {
	var a = Ext.util.CSS;
	if (a) {
		a.getRule(".x-hide-nosize")
				|| a
						.createStyleSheet(".x-hide-nosize{height:0px!important;width:0px!important;border:none!important;zoom:1;}.x-hide-nosize * {height:0px!important;width:0px!important;border:none!important;zoom:1;}");
		a.refreshCache()
	}
});
(function() {
	var g = Ext.Element, b = Ext.lib.Anim, a = g.prototype;
	var f = "visibility", d = "display", c = "hidden", i = "none";
	var e = {};
	e.El = {
		setDisplayed : function(k) {
			var j = this;
			j.visibilityCls
					? (j[k !== false ? "removeClass" : "addClass"](j.visibilityCls))
					: a.setDisplayed.call(j, k);
			return j
		},
		isDisplayed : function() {
			return !(this.hasClass(this.visibilityCls) || this.isStyle(d, i))
		},
		fixDisplay : function() {
			var j = this;
			a.fixDisplay.call(j);
			j.visibilityCls && j.removeClass(j.visibilityCls)
		},
		isVisible : function(k) {
			var l = this.visible
					|| (!this.isStyle(f, c) && (this.visibilityCls ? !this
							.hasClass(this.visibilityCls) : !this.isStyle(d, i)));
			if (k !== true || !l) {
				return l
			}
			var m = this.dom.parentNode, j = /^body/i;
			while (m && !j.test(m.tagName)) {
				if (!Ext.fly(m, "_isVisible").isVisible()) {
					return false
				}
				m = m.parentNode
			}
			return true
		},
		isStyle : a.isStyle || function(j, k) {
			return this.getStyle(j) == k
		}
	};
	Ext.override(g.Flyweight, e.El);
	Ext.ux.plugin.VisibilityMode = function(k) {
		Ext.apply(this, k || {});
		var j = Ext.util.CSS;
		if (j && !Ext.isIE && this.fixMaximizedWindow !== false
				&& !Ext.ux.plugin.VisibilityMode.MaxWinFixed) {
			j.updateRule(".x-window-maximized-ct", "overflow", "");
			Ext.ux.plugin.VisibilityMode.MaxWinFixed = true
		}
	};
	Ext.extend(Ext.ux.plugin.VisibilityMode, Object, {
		bubble : true,
		fixMaximizedWindow : true,
		elements : null,
		visibilityCls : "x-hide-nosize",
		hideMode : "nosize",
		ptype : "uxvismode",
		init : function(n) {
			var k = this.hideMode || n.hideMode, m = this, j = Ext.Container.prototype.bubble, l = function() {
				var q = [this.collapseEl, this.actionMode].concat(m.elements
						|| []);
				Ext.each(q, function(r) {
							m.extend(this[r] || r)
						}, this);
				var p = {
					visFixed : true,
					animCollapse : false,
					animFloat : false,
					hideMode : k,
					defaults : this.defaults || {}
				};
				p.defaults.hideMode = k;
				Ext.apply(this, p);
				Ext.apply(this.initialConfig || {}, p)
			};
			n.on("render", function() {
						if (m.bubble !== false && this.ownerCt) {
							j.call(this.ownerCt, function() {
										this.visFixed
												|| this.on("afterlayout", l,
														this, {
															single : true
														})
									})
						}
						l.call(this)
					}, n, {
						single : true
					})
		},
		extend : function(j, k) {
			j && Ext.each([].concat(j), function(l) {
						if (l && l.dom) {
							if ("visibilityCls" in l) {
								return
							}
							Ext.apply(l, e.El);
							l.visibilityCls = k || this.visibilityCls
						}
					}, this);
			return this
		}
	});
	Ext.preg && Ext.preg("uxvismode", Ext.ux.plugin.VisibilityMode);
	Ext.provide && Ext.provide("uxvismode")
})();
(function() {
	var J = Ext.Element, p, v = Ext.lib.Dom, an = Ext.lib.Anim, n = Ext.EventManager, al = Ext.lib.Event, ap = document, u = function() {
	}, ar = Object.prototype, aC = ar.toString, r = "[object HTMLDocument]";
	if (!Ext.elCache || parseInt(Ext.version.replace(/\./g, ""), 10) < 311) {
		alert("Ext Release " + Ext.version + " is not supported")
	}
	Ext._documents = {};
	Ext._documents[Ext.id(document, "_doc")] = Ext.elCache;
	var T = v.resolveDocumentCache = function(E, aH) {
		var aG = e(E), aI = Ext.isDocument(aG) ? Ext.id(aG) : aH, A = Ext._documents[aI]
				|| null;
		return A || (aI ? Ext._documents[aI] = {} : null)
	}, aF = v.clearDocumentCache = function(A) {
		delete Ext._documents[A]
	};
	J.addMethods || (J.addMethods = function(A) {
		Ext.apply(J.prototype, A || {})
	});
	Ext.removeNode = function(aJ) {
		var aI = aJ ? aJ.dom || aJ : null, aG, aH, A = T(aI), E;
		if (aI && (aH = A[aI.id]) && (aG = aH.el)) {
			if (aG.dom) {
				Ext.enableNestedListenerRemoval
						? n.purgeElement(aG.dom, true)
						: n.removeAll(aG.dom)
			}
			delete A[aI.id];
			delete aG.dom;
			delete aG._context;
			aG = null
		}
		if (aI && !aI.navigator && !Ext.isDocument(aI) && aI.tagName != "BODY") {
			(E = aI.parentElement || aI.parentNode) && E.removeChild(aI)
		}
		aI = E = null
	};
	var f = function(aK, aI) {
		var aJ = typeof aK === "function" ? aK : function aH() {
		};
		var aG = aJ._ovl;
		if (!aG) {
			aG = {
				base : aJ
			};
			aG[aJ.length || 0] = aJ;
			aJ = function aH() {
				var aN = arguments.callee._ovl;
				var aM = aN[arguments.length] || aN.base;
				return aM && aM != arguments.callee
						? aM.apply(this, arguments)
						: undefined
			}
		}
		var aL = [].concat(aI);
		for (var E = 0, A = aL.length; E < A; ++E) {
			aG[aL[E].length] = aL[E]
		}
		aJ._ovl = aG;
		var aH = null;
		return aJ
	};
	Ext.applyIf(Ext, {
		overload : f(f, [function(A) {
							return f(null, A)
						}, function(aG, E, A) {
							return aG[E] = f(aG[E], A)
						}]),
		isArray : function(A) {
			return !!A && aC.apply(A) == "[object Array]"
		},
		isObject : function(A) {
			return !!A && typeof A == "object"
		},
		isDocument : function(E, A) {
			var aI = E ? E.dom || E : null;
			var aH = aI && ((aC.apply(aI) == r) || (aI && aI.nodeType == 9));
			if (aH && A) {
				try {
					aH = !!aI.location
				} catch (aG) {
					return false
				}
			}
			return aH
		},
		isWindow : function(A) {
			var E = A ? A.dom || A : null;
			return E
					? !!E.navigator || aC.apply(E) == "[object Window]"
					: false
		},
		isIterable : function(A) {
			if (Ext.isArray(A) || A.callee) {
				return true
			}
			if (/NodeList|HTMLCollection/.test(aC.call(A))) {
				return true
			}
			return ((typeof A.nextNode != "undefined" || A.item) && Ext
					.isNumber(A.length))
		},
		isElement : function(A) {
			return A && Ext.type(A) == "element"
		},
		isEvent : function(A) {
			return aC.apply(A) == "[object Event]"
					|| (Ext.isObject(A) && !Ext.type(o.constructor) && (window.event
							&& A.clientX && A.clientX == window.event.clientX))
		},
		isFunction : function(A) {
			return !!A && typeof A == "function"
		},
		isEventSupported : function(aH, aI) {
			var aG = {
				select : "input",
				change : "input",
				submit : "form",
				reset : "form",
				load : "img",
				error : "img",
				abort : "img"
			}, A = {}, aJ = /^on/i, E = function(aM, aL) {
				var aK = Ext.getDom(aL);
				return (aK ? (Ext.isElement(aK) || Ext.isDocument(aK)
						? aK.nodeName.toLowerCase()
						: aL.self ? "#window" : aL || "#object") : aL || "div")
						+ ":" + aM
			};
			return function(aO, aQ) {
				aO = (aO || "").replace(aJ, "");
				var aP, aN = false;
				var aL = "on" + aO;
				var aK = (aQ ? aQ : aG[aO]) || "div";
				var aM = E(aO, aK);
				if (aM in A) {
					return A[aM]
				}
				aP = Ext.isString(aK) ? ap.createElement(aK) : aQ;
				aN = (!!aP && (aL in aP));
				aN
						|| (aN = window.Event
								&& !!(String(aO).toUpperCase() in window.Event));
				if (!aN && aP) {
					aP.setAttribute && aP.setAttribute(aL, "return;");
					aN = Ext.isFunction(aP[aL])
				}
				A[aM] = aN;
				aP = null;
				return aN
			}
		}()
	});
	var aq = function(A) {
		return J;
		return J[(A.tagName || "-").toUpperCase()] || J
	};
	var H;
	function ak(A, E) {
		if (!H) {
			H = new Ext.Element.Flyweight()
		}
		H.dom = Ext.getDom(A, null, E);
		return H
	}
	Ext.apply(Ext, {
				get : J.get = function(aH, aM) {
					if (!aH) {
						return null
					}
					var aL = Ext.isDocument(aH);
					Ext.isDocument(aM) || (aM = ap);
					var aK, aJ, E, A = T(aM);
					if (typeof aH == "string") {
						aJ = Ext.getDom(aH, null, aM);
						if (!aJ) {
							return null
						}
						if (A[aH] && A[aH].el) {
							aK = A[aH].el;
							aK.dom = aJ
						} else {
							aK = J.addToCache(new (aq(aJ))(aJ, null, aM))
						}
						return aK
					} else {
						if (aL) {
							if (!Ext.isDocument(aH, true)) {
								return false
							}
							A = T(aH);
							if (A[Ext.id(aH)] && A[aH.id].el) {
								return A[aH.id].el
							}
							var aI = function() {
							};
							aI.prototype = J.prototype;
							var aG = new aI();
							aG.dom = aH;
							aG.id = Ext.id(aH, "_doc");
							aG._isDoc = true;
							J.addToCache(aG, null, A);
							return aG
						} else {
							if (aH instanceof J) {
								if (aH.dom) {
									aH.id = Ext.id(aH.dom)
								} else {
									aH.dom = aH.id
											? Ext.getDom(aH.id, true)
											: null
								}
								if (aH.dom) {
									A = T(aH);
									(A[aH.id] || (A[aH.id] = {
										data : {},
										events : {}
									})).el = aH
								}
								return aH
							} else {
								if (aH.tagName || Ext.isWindow(aH)) {
									A = T(aH);
									E = Ext.id(aH);
									if (A[E] && (aK = A[E].el)) {
										aK.dom = aH
									} else {
										aK = J.addToCache(new (aq(aH))(aH,
														null, aM), null, A)
									}
									return aK
								} else {
									if (aH.isComposite) {
										return aH
									} else {
										if (Ext.isArray(aH)) {
											return Ext.get(aM, aM).select(aH)
										}
									}
								}
							}
						}
					}
					return null
				},
				getDom : function(E, A, aI) {
					var aH = aI || ap;
					if (!E || !aH) {
						return null
					}
					if (E.dom) {
						return E.dom
					} else {
						if (Ext.isString(E)) {
							var aG = aH.getElementById(E);
							if (aG && Ext.isIE && A) {
								if (E == aG.getAttribute("id")) {
									return aG
								} else {
									return null
								}
							}
							return aG
						} else {
							return E
						}
					}
				},
				getBody : function(E) {
					var A = v.getDocument(E) || ap;
					return Ext.get(A.body || A.documentElement)
				},
				getDoc : Ext.overload([Ext.getDoc, function(A) {
							return Ext.get(A, A)
						}])
			});
	J.data = function(E, A, aG) {
		E = J.get(E);
		if (!E) {
			return null
		}
		var aH = T(E)[E.id].data;
		if (arguments.length == 2) {
			return aH[A]
		} else {
			return (aH[A] = aG)
		}
	};
	J.addToCache = function(E, aI, A) {
		aI = aI || Ext.id(E);
		var aH = A || T(E);
		aH[aI] = {
			el : E.dom ? E : Ext.get(E),
			data : {},
			events : {}
		};
		var aG = aH[aI].el.dom;
		(aG.getElementById || aG.navigator) && (aH[aI].skipGC = true);
		return aH[aI].el
	};
	J.removeFromCache = function(E, A) {
		if (E && E.id) {
			var aG = A || T(E);
			delete aG[E.id]
		}
	};
	J.ASCLASS = 3;
	J.visibilityCls = "x-hide-nosize";
	var au = {}, L = /(-[a-z])/gi, G = function(A, E) {
		return E.charAt(1).toUpperCase()
	}, j = /alpha\(opacity=(.*)\)/i, m = /^\s+|\s+$/g, aA = /marginRight/, C = Ext.isIE
			? "styleFloat"
			: "cssFloat", av = ap.defaultView, ac = "visibilityMode", z = J.DISPLAY, i = J.VISIBILITY, ai = J.ASCLASS, M = "originalDisplay", ad = "padding", Q = "margin", ay = "border", c = "-left", k = "-right", q = "-top", aw = "-bottom", P = "-width", aB = Math, Y = "opacity", X = "visibility", K = "display", ah = "offsets", ax = "asclass", ae = "hidden", Z = "none", W = "isVisible", B = "isClipped", d = "overflow", S = "overflow-x", R = "overflow-y", D = "originalClip", O = "x-masked", F = "x-masked-relative", aj = {
		l : ay + c + P,
		r : ay + k + P,
		t : ay + q + P,
		b : ay + aw + P
	}, ao = {
		l : ad + c,
		r : ad + k,
		t : ad + q,
		b : ad + aw
	}, s = {
		l : Q + c,
		r : Q + k,
		t : Q + q,
		b : Q + aw
	}, I = J.data, aD = Ext.getDom, t = Ext.get, ag = Ext.DomHelper, aa = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/, aE = Ext.util.CSS, am = function(
			E) {
		var A = I(E, M);
		if (A === undefined) {
			I(E, M, A = "")
		}
		return A
	}, l = function(E) {
		var A = I(E, ac);
		if (A === undefined) {
			I(E, ac, A = J.prototype.visibilityMode)
		}
		return A
	};
	function at(A) {
		return au[A] || (au[A] = A == "float" ? C : A.replace(L, G))
	}
	J.addMethods({
		getDocument : function() {
			return this._context || (this._context = e(this))
		},
		remove : function(E, A) {
			var aG = this.dom;
			this.isMasked() && this.unmask();
			if (aG) {
				Ext.removeNode(aG);
				delete this._context;
				delete this.dom
			}
		},
		appendChild : function(A, E) {
			return t(A, E || this.getDocument()).appendTo(this)
		},
		appendTo : function(A, E) {
			aD(A, false, E || this.getDocument()).appendChild(this.dom);
			return this
		},
		insertBefore : function(A, E) {
			(A = aD(A, false, E || this.getDocument())).parentNode
					.insertBefore(this.dom, A);
			return this
		},
		insertAfter : function(A, E) {
			(A = aD(A, false, E || this.getDocument())).parentNode
					.insertBefore(this.dom, A.nextSibling);
			return this
		},
		insertFirst : function(E, A) {
			E = E || {};
			if (E.nodeType || E.dom || typeof E == "string") {
				E = aD(E);
				this.dom.insertBefore(E, this.dom.firstChild);
				return !A ? t(E) : E
			} else {
				return this.createChild(E, this.dom.firstChild, A)
			}
		},
		replace : function(A, E) {
			A = t(A, E || this.getDocument());
			this.insertBefore(A);
			A.remove();
			return this
		},
		replaceWith : function(A, aG) {
			var E = this;
			if (A.nodeType || A.dom || typeof A == "string") {
				A = aD(A, false, aG || E.getDocument());
				E.dom.parentNode.insertBefore(A, E.dom)
			} else {
				A = ag.insertBefore(E.dom, A)
			}
			var aH = T(E);
			Ext.removeNode(E.dom);
			E.id = Ext.id(E.dom = A);
			J.addToCache(E.isFlyweight ? new (aq(E.dom))(E.dom, null, aH) : E);
			return E
		},
		insertHtml : function(E, aG, A) {
			var aH = ag.insertHtml(E, this.dom, aG);
			return A ? Ext.get(aH, e(aH)) : aH
		},
		setVisibilityMode : function(A) {
			I(this.dom, ac, A);
			return this
		},
		isVisible : function() {
			return this.visible
					|| Ext.value(I(this.dom, W), !this.isStyle(X, ae)
									&& !this.isStyle(K, Z))
		},
		setVisible : function(aI, A) {
			var aK = this, aJ = aK.dom, E, aM, aL, aH;
			if (typeof A == "string") {
				E = A == K;
				aM = A == X;
				aL = A == ah;
				aH = A == ax;
				A = false
			} else {
				var aG = l(aJ);
				E = aG == z;
				aM = aG == i;
				aH = aG == ai
			}
			if (!A || !aK.anim) {
				if (aH) {
					aK[aI ? "removeClass" : "addClass"](aK.visibilityCls
							|| J.visibilityCls)
				} else {
					if (E) {
						return aK.setDisplayed(aI)
					} else {
						if (aL) {
							if (!aI) {
								aK.hideModeStyles = {
									position : aK.getStyle("position"),
									top : aK.getStyle("top"),
									left : aK.getStyle("left")
								};
								aK.applyStyles({
											position : "absolute",
											top : "-10000px",
											left : "-10000px"
										})
							} else {
								aK.applyStyles(aK.hideModeStyles || {
									position : "",
									top : "",
									left : ""
								});
								delete aK.hideModeStyles
							}
						} else {
							aK.fixDisplay();
							aJ.style.visibility = aI ? "visible" : ae
						}
					}
				}
			} else {
				if (aI) {
					aK.setOpacity(0.01);
					aK.setVisible(true)
				}
				aK.anim({
							opacity : {
								to : (aI ? 1 : 0)
							}
						}, aK.preanim(arguments, 1), null, 0.35, "easeIn",
						function() {
							if (!aI) {
								aH ? aK.addClass(aK.visibilityCls
										|| J.visibilityCls) : aJ.style[E
										? K
										: X] = (E) ? Z : ae;
								aK.setOpacity(1)
							}
						})
			}
			I(aJ, W, aI);
			return aK
		},
		setDisplayed : function(E) {
			var aG = this.dom, A = l(aG);
			if (typeof E == "boolean") {
				if (A == J.ASCLASS) {
					return this.setVisible(E, ax)
				}
				I(this.dom, W, E);
				E = E ? am(aG) : Z
			}
			this.setStyle(K, E);
			return this
		},
		fixDisplay : function() {
			var A = this;
			if (A.isStyle(K, Z)) {
				A.setStyle(X, ae);
				A.setStyle(K, am(A.dom));
				if (A.isStyle(K, Z)) {
					A.setStyle(K, "block")
				}
			}
			I(A.dom, W) || A.removeClass(A.visibilityCls || J.visibilityCls)
		},
		enableDisplayMode : function(A) {
			this.setVisibilityMode(J.DISPLAY);
			if (!Ext.isEmpty(A)) {
				I(this.dom, M, A)
			}
			return this
		},
		scrollIntoView : function(aG, aJ) {
			var aO = this.getDocument(), aP = Ext.getDom(aG, null, aO)
					|| Ext.getBody(aO).dom, aI = this.dom, aH = this
					.getOffsetsTo(aP), aL = aH[0] + aP.scrollLeft, aS = aH[1]
					+ aP.scrollTop, aQ = aS + aI.offsetHeight, E = aL
					+ aI.offsetWidth, A = aP.clientHeight, aM = parseInt(
					aP.scrollTop, 10), aR = parseInt(aP.scrollLeft, 10), aK = aM
					+ A, aN = aR + aP.clientWidth;
			if (aI.offsetHeight > A || aS < aM) {
				aP.scrollTop = aS
			} else {
				if (aQ > aK) {
					aP.scrollTop = aQ - A
				}
			}
			aP.scrollTop = aP.scrollTop;
			if (aJ !== false) {
				if (aI.offsetWidth > aP.clientWidth || aL < aR) {
					aP.scrollLeft = aL
				} else {
					if (E > aN) {
						aP.scrollLeft = E - aP.clientWidth
					}
				}
				aP.scrollLeft = aP.scrollLeft
			}
			return this
		},
		contains : function(A) {
			try {
				return !A ? false : v.isAncestor(this.dom, A.dom ? A.dom : A)
			} catch (E) {
				return false
			}
		},
		getScroll : function() {
			var aK = this.dom, aJ = this.getDocument(), A = aJ.body, aG = aJ.documentElement, E, aI, aH;
			if (Ext.isDocument(aK) || aK == A) {
				if (Ext.isIE && v.docIsStrict(aJ)) {
					E = aG.scrollLeft;
					aI = aG.scrollTop
				} else {
					E = window.pageXOffset;
					aI = window.pageYOffset
				}
				aH = {
					left : E || (A ? A.scrollLeft : 0),
					top : aI || (A ? A.scrollTop : 0)
				}
			} else {
				aH = {
					left : aK.scrollLeft,
					top : aK.scrollTop
				}
			}
			return aH
		},
		getStyle : function() {
			var A = av && av.getComputedStyle ? function E(aM) {
				var aJ = !this._isDoc ? this.dom : null, aG, aI, aH, aK, aL = Ext.isWebKit, aK;
				if (!aJ || !aJ.style) {
					return null
				}
				aM = at(aM);
				aH = (aG = aJ.style[aM]) ? aG : (aI = av.getComputedStyle(aJ,
						"")) ? aI[aM] : null;
				if (aL) {
					if ((aA.test(aM)) && aH != "0px") {
						aK = this.getStyle("display");
						aJ.style.display = "inline-block";
						aH = av.getComputedStyle(aJ, "");
						aJ.style.display = aK
					}
					if (aH == "rgba(0, 0, 0, 0)") {
						aH = "transparent"
					}
				}
				return aH
			}
					: function E(aK) {
						var aI = !this._isDoc ? this.dom : null, aG, aH;
						if (!aI || !aI.style) {
							return null
						}
						if (aK == Y) {
							if (aI.style.filter.match) {
								if (aG = aI.style.filter.match(j)) {
									var aJ = parseFloat(aG[1]);
									if (!isNaN(aJ)) {
										return aJ ? aJ / 100 : 0
									}
								}
							}
							return 1
						}
						aK = at(aK);
						return aI.style[aK]
								|| ((aH = aI.currentStyle) ? aH[aK] : null)
					};
			var E = null;
			return A
		}(),
		setStyle : function(aH, aG) {
			if (this._isDoc || Ext.isDocument(this.dom)) {
				return this
			}
			var A, E;
			if (typeof aH != "object") {
				A = {};
				A[aH] = aG;
				aH = A
			}
			for (E in aH) {
				aG = aH[E];
				E == Y ? this.setOpacity(aG) : this.dom.style[at(E)] = aG
			}
			return this
		},
		center : function(A) {
			return this.alignTo(A || this.getDocument(), "c-c")
		},
		mask : function(E, aJ) {
			var aL = this, aH = aL.dom, aK = Ext.DomHelper, aI = "ext-el-mask-msg", A, aM;
			if (aL.getStyle("position") == "static") {
				aL.addClass(F)
			}
			if ((A = I(aH, "maskMsg"))) {
				A.remove()
			}
			if ((A = I(aH, "mask"))) {
				A.remove()
			}
			aM = aK.append(aH, {
						cls : "ext-el-mask"
					}, true);
			I(aH, "mask", aM);
			aL.addClass(O);
			aM.setDisplayed(true);
			if (typeof E == "string") {
				var aG = aK.append(aH, {
							cls : aI,
							cn : {
								tag : "div"
							}
						}, true);
				I(aH, "maskMsg", aG);
				aG.dom.className = aJ ? aI + " " + aJ : aI;
				aG.dom.firstChild.innerHTML = E;
				aG.setDisplayed(true);
				aG.center(aL)
			}
			if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict)
					&& aL.getStyle("height") == "auto") {
				aM.setSize(undefined, aL.getHeight())
			}
			return aM
		},
		unmask : function() {
			var aG = this, aH = aG.dom, A = I(aH, "mask"), E = I(aH, "maskMsg");
			if (A) {
				if (E) {
					E.remove();
					I(aH, "maskMsg", undefined)
				}
				A.remove();
				I(aH, "mask", undefined)
			}
			aG.removeClass([O, F])
		},
		isMasked : function() {
			var A = I(this.dom, "mask");
			return A && A.isVisible()
		},
		getCenterXY : function() {
			return this.getAlignToXY(this.getDocument(), "c-c")
		},
		getAnchorXY : function(aI, aN, aS) {
			aI = (aI || "tl").toLowerCase();
			aS = aS || {};
			var aM = this, aP = this.getDocument(), E = aM.dom == aP.body
					|| aM.dom == aP, aQ = aS.width || E ? v.getViewWidth(false,
					aP) : aM.getWidth(), aK = aS.height || E ? v.getViewHeight(
					false, aP) : aM.getHeight(), aR, A = Math.round, aG = aM
					.getXY(), aO = aM.getScroll(), aL = E ? aO.left : !aN
					? aG[0]
					: 0, aJ = E ? aO.top : !aN ? aG[1] : 0, aH = {
				c : [A(aQ * 0.5), A(aK * 0.5)],
				t : [A(aQ * 0.5), 0],
				l : [0, A(aK * 0.5)],
				r : [aQ, A(aK * 0.5)],
				b : [A(aQ * 0.5), aK],
				tl : [0, 0],
				bl : [0, aK],
				br : [aQ, aK],
				tr : [aQ, 0]
			};
			aR = aH[aI];
			return [aR[0] + aL, aR[1] + aJ]
		},
		anchorTo : function(E, aJ, aG, A, aL, aM) {
			var aK = this, aI = aK.dom;
			function aH() {
				ak(aI).alignTo(E, aJ, aG, A);
				Ext.callback(aM, ak(aI))
			}
			Ext.EventManager.onWindowResize(aH, aK);
			if (!Ext.isEmpty(aL)) {
				Ext.EventManager.on(window, "scroll", aH, aK, {
							buffer : !isNaN(aL) ? aL : 50
						})
			}
			aH.call(aK);
			return aK
		},
		getScroll : function() {
			var aK = this.dom, aJ = this.getDocument(), A = aJ.body, aG = aJ.documentElement, E, aI, aH;
			if (aK == aJ || aK == A) {
				if (Ext.isIE && v.docIsStrict(aJ)) {
					E = aG.scrollLeft;
					aI = aG.scrollTop
				} else {
					E = window.pageXOffset;
					aI = window.pageYOffset
				}
				aH = {
					left : E || (A ? A.scrollLeft : 0),
					top : aI || (A ? A.scrollTop : 0)
				}
			} else {
				aH = {
					left : aK.scrollLeft,
					top : aK.scrollTop
				}
			}
			return aH
		},
		getAlignToXY : function(aH, aT, aU) {
			var a8;
			aH = Ext.get(aH, a8 = this.getDocument());
			if (!aH || !aH.dom) {
				throw "Element.getAlignToXY with an element that doesn't exist"
			}
			aU = aU || [0, 0];
			aT = (aT == "?" ? "tl-bl?" : (!/-/.test(aT) && aT != "" ? "tl-"
					+ aT : aT || "tl-bl")).toLowerCase();
			var a5 = this, a0 = a5.dom, a7, a6, aM, aL, aO, aY, aR, aP = v
					.getViewWidth(false, a8)
					- 10, aZ = v.getViewHeight(false, a8) - 10, E, aI, aJ, aK, aQ, aS, a4 = a8.documentElement, aN = a8.body, aX = (a4.scrollLeft
					|| aN.scrollLeft || 0)
					+ 5, aW = (a4.scrollTop || aN.scrollTop || 0) + 5, a3 = false, aG = "", A = "", aV = aT
					.match(/^([a-z]+)-([a-z]+)(\?)?$/);
			if (!aV) {
				throw "Element.getAlignToXY with an invalid alignment " + aT
			}
			aG = aV[1];
			A = aV[2];
			a3 = !!aV[3];
			a7 = a5.getAnchorXY(aG, true);
			a6 = aH.getAnchorXY(A, false);
			aM = a6[0] - a7[0] + aU[0];
			aL = a6[1] - a7[1] + aU[1];
			if (a3) {
				aO = a5.getWidth();
				aY = a5.getHeight();
				aR = aH.getRegion();
				E = aG.charAt(0);
				aI = aG.charAt(aG.length - 1);
				aJ = A.charAt(0);
				aK = A.charAt(A.length - 1);
				aQ = ((E == "t" && aJ == "b") || (E == "b" && aJ == "t"));
				aS = ((aI == "r" && aK == "l") || (aI == "l" && aK == "r"));
				if (aM + aO > aP + aX) {
					aM = aS ? aR.left - aO : aP + aX - aO
				}
				if (aM < aX) {
					aM = aS ? aR.right : aX
				}
				if (aL + aY > aZ + aW) {
					aL = aQ ? aR.top - aY : aZ + aW - aY
				}
				if (aL < aW) {
					aL = aQ ? aR.bottom : aW
				}
			}
			return [aM, aL]
		},
		adjustForConstraints : function(aG, A, E) {
			return this.getConstrainToXY(A || this.getDocument(), false, E, aG)
					|| aG
		},
		getConstrainToXY : function(E, A, aG, aI) {
			var aH = {
				top : 0,
				left : 0,
				bottom : 0,
				right : 0
			};
			return function(aK, aS, aL, aJ) {
				var aU = this.getDocument();
				aK = Ext.get(aK, aU);
				aL = aL ? Ext.applyIf(aL, aH) : aH;
				var aT, aM, aR = 0, aP = 0;
				if (aK.dom == aU.body || aK.dom == aU) {
					aT = v.getViewWidth(false, aU);
					aM = v.getViewHeight(false, aU)
				} else {
					aT = aK.dom.clientWidth;
					aM = aK.dom.clientHeight;
					if (!aS) {
						var aN = aK.getXY();
						aR = aN[0];
						aP = aN[1]
					}
				}
				var aX = aK.getScroll();
				aR += aL.left + aX.left;
				aP += aL.top + aX.top;
				aT -= aL.right;
				aM -= aL.bottom;
				var aW = aR + aT, aO = aP + aM, aV = aJ
						|| (!aS ? this.getXY() : [this.getLeft(true),
								this.getTop(true)]);
				x = aV[0], y = aV[1], offset = this.getConstrainOffset(), w = this.dom.offsetWidth
						+ offset, h = this.dom.offsetHeight + offset;
				var aQ = false;
				if ((x + w) > aW) {
					x = aW - w;
					aQ = true
				}
				if ((y + h) > aO) {
					y = aO - h;
					aQ = true
				}
				if (x < aR) {
					x = aR;
					aQ = true
				}
				if (y < aP) {
					y = aP;
					aQ = true
				}
				return aQ ? [x, y] : false
			}
		}(),
		getConstrainOffset : function() {
			return 0
		},
		getCenterXY : function() {
			return this.getAlignToXY(Ext.getBody(this.getDocument()), "c-c")
		},
		center : function(A) {
			return this.alignTo(A || Ext.getBody(this.getDocument()), "c-c")
		},
		findParent : function(aL, aK, E) {
			var aI = this.dom, aH = this.getDocument(), A = aH.body, aJ = 0, aG;
			if (Ext.isGecko && aC.call(aI) == "[object XULElement]") {
				return null
			}
			aK = aK || 50;
			if (isNaN(aK)) {
				aG = Ext.getDom(aK, null, aH);
				aK = Number.MAX_VALUE
			}
			while (aI && aI.nodeType == 1 && aJ < aK && aI != A && aI != aG) {
				if (Ext.DomQuery.is(aI, aL)) {
					return E ? Ext.get(aI, aH) : aI
				}
				aJ++;
				aI = aI.parentNode
			}
			return null
		},
		clip : function() {
			var A = this, E = A.dom;
			if (!I(E, B)) {
				I(E, B, true);
				I(E, D, {
							o : A.getStyle(d),
							x : A.getStyle(S),
							y : A.getStyle(R)
						});
				A.setStyle(d, ae);
				A.setStyle(S, ae);
				A.setStyle(R, ae)
			}
			return A
		},
		unclip : function() {
			var A = this, aG = A.dom;
			if (I(aG, B)) {
				I(aG, B, false);
				var E = I(aG, D);
				if (E.o) {
					A.setStyle(d, E.o)
				}
				if (E.x) {
					A.setStyle(S, E.x)
				}
				if (E.y) {
					A.setStyle(R, E.y)
				}
			}
			return A
		},
		getViewSize : function() {
			var aG = this.getDocument(), aH = this.dom, A = (aH == aG || aH == aG.body);
			if (A) {
				var E = Ext.lib.Dom;
				return {
					width : E.getViewWidth(),
					height : E.getViewHeight()
				}
			} else {
				return {
					width : aH.clientWidth,
					height : aH.clientHeight
				}
			}
		},
		getStyleSize : function() {
			var aI = this, A, aH, aK = this.getDocument(), aL = this.dom, E = (aL == aK || aL == aK.body), aG = aL.style;
			if (E) {
				var aJ = Ext.lib.Dom;
				return {
					width : aJ.getViewWidth(),
					height : aJ.getViewHeight()
				}
			}
			if (aG.width && aG.width != "auto") {
				A = parseFloat(aG.width);
				if (aI.isBorderBox()) {
					A -= aI.getFrameWidth("lr")
				}
			}
			if (aG.height && aG.height != "auto") {
				aH = parseFloat(aG.height);
				if (aI.isBorderBox()) {
					aH -= aI.getFrameWidth("tb")
				}
			}
			return {
				width : A || aI.getWidth(true),
				height : aH || aI.getHeight(true)
			}
		}
	});
	Ext.isDefined(J.collectorThreadId) && clearInterval(J.collectorThreadId);
	function af() {
		if (!Ext.enableGarbageCollector) {
			clearInterval(J.collectorThreadId)
		} else {
			var A, aH, aJ, aI, aG = Ext.elCache;
			for (A in aG) {
				aI = aG[A];
				if (aI.skipGC) {
					continue
				}
				aH = aI.el;
				aJ = aH.dom;
				if (!aJ || !aJ.parentNode
						|| (!aJ.offsetParent && !ap.getElementById(A))) {
					if (Ext.enableListenerCollection) {
						Ext.EventManager.removeAll(aJ)
					}
					delete aG[A]
				}
			}
			if (Ext.isIE) {
				var E = {};
				for (A in aG) {
					E[A] = aG[A]
				}
				Ext.elCache = Ext._documents[Ext.id(document)] = E;
				E = null
			}
		}
	}
	if (Ext.enableGarbageCollector) {
		J.collectorThreadId = setInterval(af, 30000)
	}
	Ext.apply(v, {
		getDocument : function(aG, aH) {
			var aI = null;
			try {
				aI = Ext.getDom(aG, null, null)
			} catch (E) {
			}
			var A = Ext.isDocument(aI);
			if (A) {
				if (aH) {
					return Ext.isDocument(aI, aH) ? aI : null
				}
				return aI
			}
			return aI ? aI.ownerDocument || aI.document : null
		},
		docIsStrict : function(A) {
			return (Ext.isDocument(A) ? A : this.getDocument(A)).compatMode == "CSS1Compat"
		},
		getViewWidth : Ext.overload([v.getViewWidth || function(A) {
				}, function() {
					return this.getViewWidth(false)
				}, function(A, E) {
					return A ? this.getDocumentWidth(E) : this
							.getViewportWidth(E)
				}]),
		getViewHeight : Ext.overload([v.getViewHeight || function(A) {
				}, function() {
					return this.getViewHeight(false)
				}, function(A, E) {
					return A ? this.getDocumentHeight(E) : this
							.getViewportHeight(E)
				}]),
		getDocumentHeight : Ext.overload([v.getDocumentHeight || u,
				function(A) {
					if (A = this.getDocument(A)) {
						return Math.max(!this.docIsStrict(A)
										? A.body.scrollHeight
										: A.documentElement.scrollHeight, this
										.getViewportHeight(A))
					}
					return undefined
				}]),
		getDocumentWidth : Ext.overload([v.getDocumentWidth || u, function(A) {
			if (A = this.getDocument(A)) {
				return Math.max(!this.docIsStrict(A)
								? A.body.scrollWidth
								: A.documentElement.scrollWidth, this
								.getViewportWidth(A))
			}
			return undefined
		}]),
		getViewportHeight : Ext.overload([v.getViewportHeight || u,
				function(A) {
					if (A = this.getDocument(A)) {
						if (Ext.isIE) {
							return this.docIsStrict(A)
									? A.documentElement.clientHeight
									: A.body.clientHeight
						} else {
							return A.defaultView.innerHeight
						}
					}
					return undefined
				}]),
		getViewportWidth : Ext.overload([v.getViewportWidth || u, function(A) {
			if (A = this.getDocument(A)) {
				return !this.docIsStrict(A) && !Ext.isOpera
						? A.body.clientWidth
						: Ext.isIE
								? A.documentElement.clientWidth
								: A.defaultView.innerWidth
			}
			return undefined
		}]),
		getXY : Ext.overload([v.getXY || u, function(A, aH) {
			A = Ext.getDom(A, null, aH);
			var aG = this.getDocument(A), E = aG
					? (aG.body || aG.documentElement)
					: null;
			if (!A || !E || A == E) {
				return [0, 0]
			}
			return this.getXY(A)
		}])
	});
	var e = v.getDocument, N = J._flyweights;
	Ext.fly = J.fly = function(aG, A, aH) {
		var E = null;
		A = A || "_global";
		if (aG = Ext.getDom(aG, null, aH)) {
			(E = N[A] = (N[A] || new J.Flyweight())).dom = aG;
			Ext.isDocument(aG) && (E._isDoc = true)
		}
		return E
	};
	var az = function() {
	};
	az.prototype = J.prototype;
	J.Flyweight = function(A) {
		this.dom = A
	};
	J.Flyweight.prototype = new az();
	J.Flyweight.prototype.isFlyweight = true;
	function b(aH, aJ, aM, aI, aG, aO) {
		aH = Ext.getDom(aH);
		if (!aH) {
			return
		}
		var E = Ext.id(aH), A = T(aH);
		A[E] || J.addToCache(aH, E, A);
		var aN = A[E].events || {}, aK;
		aK = al.on(aH, aJ, aG);
		aN[aJ] = aN[aJ] || [];
		aN[aJ].push([aM, aG, aO, aK, aI]);
		if (aH.addEventListener && aJ == "mousewheel") {
			var aL = ["DOMMouseScroll", aG, false];
			aH.addEventListener.apply(aH, aL);
			Ext.EventManager.addListener(window, "beforeunload", function() {
						aH.removeEventListener.apply(aH, aL)
					})
		}
		if (aJ == "mousedown" && ap == aH) {
			Ext.EventManager.stoppedMouseDownEvent.addListener(aG)
		}
	}
	function g(A, E) {
		return function() {
			var aG = Ext.toArray(arguments);
			if (E.target == Ext.EventObject.setEvent(aG[0]).target) {
				A.apply(this, aG)
			}
		}
	}
	function ab(E, aG, A) {
		return function(aH) {
			A.delay(aG.buffer, E, null, [new Ext.EventObjectImpl(aH)])
		}
	}
	function V(aI, aH, A, aG, E) {
		return function(aJ) {
			Ext.EventManager.removeListener(aH, A, aG, E);
			aI(aJ)
		}
	}
	function a(E, aG, A) {
		return function(aI) {
			var aH = new Ext.util.DelayedTask(E);
			(A.tasks || (A.tasks = [])).push(aH);
			aH.delay(aG.delay || 10, E, null, [new Ext.EventObjectImpl(aI)])
		}
	}
	function U(aJ, aI, A, aL, aM) {
		var E = !Ext.isObject(A) ? {} : A, aG = Ext.getDom(aJ), aH;
		aL = aL || E.fn;
		aM = aM || E.scope;
		if (!aG) {
			throw 'Error listening for "' + aI + '". Element "' + aJ
					+ "\" doesn't exist."
		}
		function aK(aO) {
			if (!window.Ext) {
				return
			}
			aO = Ext.EventObject.setEvent(aO);
			var aN;
			if (E.delegate) {
				if (!(aN = aO.getTarget(E.delegate, aG))) {
					return
				}
			} else {
				aN = aO.target
			}
			if (E.stopEvent) {
				aO.stopEvent()
			}
			if (E.preventDefault) {
				aO.preventDefault()
			}
			if (E.stopPropagation) {
				aO.stopPropagation()
			}
			if (E.normalized) {
				aO = aO.browserEvent
			}
			aL.call(aM || aG, aO, aN, E)
		}
		if (E.target) {
			aK = g(aK, E)
		}
		if (E.delay) {
			aK = a(aK, E, aL)
		}
		if (E.single) {
			aK = V(aK, aG, aI, aL, aM)
		}
		if (E.buffer) {
			aH = new Ext.util.DelayedTask(aK);
			aK = ab(aK, E, aH)
		}
		b(aG, aI, aL, aH, aK, aM);
		return aK
	}
	Ext.apply(n, {
		addListener : n.on = function(aG, A, aI, aH, E) {
			if (typeof A == "object") {
				var aL = A, aJ, aK;
				for (aJ in aL) {
					aK = aL[aJ];
					if (!aa.test(aJ)) {
						if (Ext.isFunction(aK)) {
							U(aG, aJ, aL, aK, aL.scope)
						} else {
							U(aG, aJ, aK)
						}
					}
				}
			} else {
				U(aG, A, E, aI, aH)
			}
		},
		removeListener : n.un = function(aJ, aK, aO, aQ) {
			var E = Ext.getDom(aJ);
			E && Ext.get(E);
			var aP = E ? T(E) : {}, aM = E && ((aP[E.id] || {
				events : {}
			}).events)[aK] || [], A, aI, aG, aH, aL, aN;
			for (aI = 0, aL = aM.length; aI < aL; aI++) {
				if (Ext.isArray(aN = aM[aI]) && aN[0] == aO
						&& (!aQ || aN[2] == aQ)) {
					aN[4] && aN[4].cancel();
					aH = aO.tasks && aO.tasks.length;
					if (aH) {
						while (aH--) {
							aO.tasks[aH].cancel()
						}
						delete aO.tasks
					}
					A = aN[1];
					al.un(E, aK, al.extAdapter ? aN[3] : A);
					if (A && aK == "mousewheel" && E.addEventListener) {
						E.removeEventListener("DOMMouseScroll", A, false)
					}
					if (A && aK == "mousedown" && ap == E) {
						Ext.EventManager.stoppedMouseDownEvent
								.removeListener(A)
					}
					aM.splice(aI, 1);
					if (aM.length === 0) {
						delete aP[E.id].events[aK]
					}
					for (aH in aP[E.id].events) {
						return false
					}
					aP[E.id].events = {};
					return false
				}
			}
		},
		removeAll : function(aG) {
			if (!(aG = Ext.getDom(aG))) {
				return
			}
			var E = aG.id, aO = T(aG) || {}, aP = aO[E] || {}, aN = aP.events
					|| {}, aK, aJ, aL, aH, aM, aI, A;
			for (aH in aN) {
				if (aN.hasOwnProperty(aH)) {
					aK = aN[aH];
					for (aJ = 0, aL = aK.length; aJ < aL; aJ++) {
						aM = aK[aJ];
						aM[4] && aM[4].cancel();
						if (aM[0].tasks && (aI = aM[0].tasks.length)) {
							while (aI--) {
								aM[0].tasks[aI].cancel()
							}
							delete aM.tasks
						}
						A = aM[1];
						al.un(aG, aH, al.extAdapter ? aM[3] : A);
						if (A && aG.addEventListener && aH == "mousewheel") {
							aG.removeEventListener("DOMMouseScroll", A, false)
						}
						if (A && ap == aG && aH == "mousedown") {
							Ext.EventManager.stoppedMouseDownEvent
									.removeListener(A)
						}
					}
				}
			}
			aO[E] && (aO[E].events = {})
		},
		getListeners : function(aG, E) {
			aG = Ext.getDom(aG);
			if (!aG) {
				return
			}
			var aI = (Ext.get(aG) || {}).id, A = T(aG), aH = (A[aI] || {}).events
					|| {};
			return aH[E] || null
		},
		purgeElement : function(aG, A, aI) {
			aG = Ext.getDom(aG);
			var E = Ext.id(aG), aL = T(aG), aM = (aL[E] || {}).events || {}, aH, aK, aJ;
			if (aI) {
				if (aM.hasOwnProperty(aI)) {
					aK = aM[aI];
					for (aH = 0, aJ = aK.length; aH < aJ; aH++) {
						n.removeListener(aG, aI, aK[aH][0])
					}
				}
			} else {
				n.removeAll(aG)
			}
			if (A && aG && aG.childNodes) {
				for (aH = 0, aJ = aG.childNodes.length; aH < aJ; aH++) {
					n.purgeElement(aG.childNodes[aH], A, aI)
				}
			}
		}
	});
	al.getListeners = function(E, A) {
		return Ext.EventManager.getListeners(E, A)
	};
	Ext.provide && Ext.provide("multidom")
})();
(function() {
	var El = Ext.Element, ElFrame, ELD = Ext.lib.Dom, EMPTYFN = function() {
	}, OP = Object.prototype, addListener = function() {
		var handler;
		if (window.addEventListener) {
			handler = function F(el, eventName, fn, capture) {
				el.addEventListener(eventName, fn, !!capture)
			}
		} else {
			if (window.attachEvent) {
				handler = function F(el, eventName, fn, capture) {
					el.attachEvent("on" + eventName, fn)
				}
			} else {
				handler = function F() {
				}
			}
		}
		var F = null;
		return handler
	}(), removeListener = function() {
		var handler;
		if (window.removeEventListener) {
			handler = function F(el, eventName, fn, capture) {
				el.removeEventListener(eventName, fn, (capture))
			}
		} else {
			if (window.detachEvent) {
				handler = function F(el, eventName, fn) {
					el.detachEvent("on" + eventName, fn)
				}
			} else {
				handler = function F() {
				}
			}
		}
		var F = null;
		return handler
	}();
	if (typeof ELD.getDocument != "function") {
		alert("MIF 2.1 requires multidom support")
	}
	if (!Ext.elCache || parseInt(Ext.version.replace(/\./g, ""), 10) < 311) {
		alert("Ext Release " + Ext.version + " is not supported")
	}
	Ext.ns("Ext.ux.ManagedIFrame", "Ext.ux.plugin");
	var MIM, MIF = Ext.ux.ManagedIFrame, MIFC;
	var frameEvents = ["documentloaded", "domready", "focus", "blur", "resize",
			"scroll", "unload", "scroll", "exception", "message", "reset"];
	var reSynthEvents = new RegExp("^(" + frameEvents.join("|") + ")", "i");
	Ext.ux.ManagedIFrame.Element = Ext.extend(Ext.Element, {
		constructor : function(element, forceNew, doc) {
			var d = doc || document, elCache = ELD.resolveDocumentCache(d), dom = Ext
					.getDom(element, false, d);
			if (!dom || !(/^(iframe|frame)/i).test(dom.tagName)) {
				return null
			}
			var id = Ext.id(dom);
			this.dom = dom;
			this.id = id;
			(elCache[id] || (elCache[id] = {
				el : this,
				events : {},
				data : {}
			})).el = this;
			this.dom.name || (this.dom.name = this.id);
			if (Ext.isIE) {
				document.frames
						&& (document.frames[this.dom.name] || (document.frames[this.dom.name] = this.dom))
			}
			this.dom.ownerCt = this;
			MIM.register(this);
			if (!this._observable) {
				(this._observable = new Ext.util.Observable())
						.addEvents("documentloaded", "domready", "exception",
								"resize", "message", "blur", "focus", "unload",
								"scroll", "reset");
				this._observable.addEvents("_docready", "_docload")
			}
			var H = Ext.isIE ? "onreadystatechange" : "onload";
			this.dom[H] = this.loadHandler.createDelegate(this);
			this.dom.onerror = this.loadHandler.createDelegate(this)
		},
		destructor : function() {
			this.dom[Ext.isIE ? "onreadystatechange" : "onload"] = this.dom.onerror = EMPTYFN;
			MIM.deRegister(this);
			this.removeAllListeners();
			Ext.destroy(this.frameShim, this.DDM);
			this.hideMask(true);
			delete this.loadMask;
			this.reset();
			this.manager = null;
			this.dom.ownerCt = null
		},
		cleanse : function(forceReclean, deep) {
			if (this.isCleansed && forceReclean !== true) {
				return this
			}
			var d = this.dom, n = d.firstChild, nx;
			while (d && n) {
				nx = n.nextSibling;
				deep && Ext.fly(n).cleanse(forceReclean, deep);
				Ext.removeNode(n);
				n = nx
			}
			this.isCleansed = true;
			return this
		},
		src : null,
		CSS : null,
		manager : null,
		disableMessaging : true,
		domReadyRetries : 7500,
		focusOnLoad : Ext.isIE,
		eventsFollowFrameLinks : true,
		remove : function() {
			this.destructor.apply(this, arguments);
			ElFrame.superclass.remove.apply(this, arguments)
		},
		getDocument : function() {
			return this.dom ? this.dom.ownerDocument : document
		},
		submitAsTarget : function(submitCfg) {
			var opt = submitCfg || {}, D = this.getDocument(), form = Ext
					.getDom(opt.form ? opt.form.form || opt.form : null, false,
							D)
					|| Ext.DomHelper.append(D.body, {
								tag : "form",
								cls : "x-hidden x-mif-form",
								encoding : "multipart/form-data"
							}), formFly = Ext.fly(form, "_dynaForm"), formState = {
				target : form.target || "",
				method : form.method || "",
				encoding : form.encoding || "",
				enctype : form.enctype || "",
				action : form.action || ""
			}, encoding = opt.encoding || form.encoding, method = opt.method
					|| form.method || "POST";
			formFly.set({
						target : this.dom.name,
						method : method,
						encoding : encoding,
						action : opt.url || opt.action || form.action
					});
			if (method == "POST" || !!opt.enctype) {
				formFly.set({
							enctype : opt.enctype || form.enctype || encoding
						})
			}
			var hiddens, hd, ps;
			if (opt.params
					&& (ps = Ext.isFunction(opt.params)
							? opt.params()
							: opt.params)) {
				hiddens = [];
				Ext.iterate(ps = typeof ps == "string" ? Ext.urlDecode(ps,
								false) : ps, function(n, v) {
							Ext.fly(hd = D.createElement("input")).set({
										type : "hidden",
										name : n,
										value : v
									});
							form.appendChild(hd);
							hiddens.push(hd)
						})
			}
			opt.callback
					&& this._observable.addListener("_docready", opt.callback,
							opt.scope, {
								single : true
							});
			this._frameAction = true;
			this._targetURI = location.href;
			this.showMask();
	(function() {
				form.submit();
				hiddens && Ext.each(hiddens, Ext.removeNode, Ext);
				if (formFly.hasClass("x-mif-form")) {
					formFly.remove()
				} else {
					formFly.set(formState)
				}
				delete El._flyweights._dynaForm;
				formFly = null;
				this.hideMask(true)
			}).defer(100, this);
			return this
		},
		resetUrl : (function() {
			return Ext.isIE && Ext.isSecure
					? Ext.SSL_SECURE_URL
					: "about:blank"
		})(),
		setSrc : function(url, discardUrl, callback, scope) {
			var src = url || this.src || this.resetUrl;
			var O = this._observable;
			this._unHook();
			Ext.isFunction(callback)
					&& O.addListener("_docload", callback, scope || this, {
								single : true
							});
			this.showMask();
			(discardUrl !== true) && (this.src = src);
			var s = this._targetURI = (Ext.isFunction(src) ? src() || "" : src);
			try {
				this._frameAction = true;
				this.dom.src = s;
				this.checkDOM()
			} catch (ex) {
				O.fireEvent.call(O, "exception", this, ex)
			}
			return this
		},
		setLocation : function(url, discardUrl, callback, scope) {
			var src = url || this.src || this.resetUrl;
			var O = this._observable;
			this._unHook();
			Ext.isFunction(callback)
					&& O.addListener("_docload", callback, scope || this, {
								single : true
							});
			this.showMask();
			var s = this._targetURI = (Ext.isFunction(src) ? src() || "" : src);
			if (discardUrl !== true) {
				this.src = src
			}
			try {
				this._frameAction = true;
				this.getWindow().location.replace(s);
				this.checkDOM()
			} catch (ex) {
				O.fireEvent.call(O, "exception", this, ex)
			}
			return this
		},
		reset : function(src, callback, scope) {
			this._unHook();
			var loadMaskOff = false, s = src, win = this.getWindow(), O = this._observable;
			if (this.loadMask) {
				loadMaskOff = this.loadMask.disabled;
				this.loadMask.disabled = false
			}
			this.hideMask(true);
			if (win) {
				this.isReset = true;
				var cb = callback;
				O.addListener("_docload", function(frame) {
							if (this.loadMask) {
								this.loadMask.disabled = loadMaskOff
							}
							Ext.isFunction(cb)
									&& (cb = cb.apply(scope || this, arguments));
							O.fireEvent("reset", this)
						}, this, {
							single : true
						});
				Ext.isFunction(s) && (s = src());
				s = this._targetURI = Ext.isEmpty(s, true) ? this.resetUrl : s;
				win.location ? (win.location.href = s) : O.fireEvent(
						"_docload", this)
			}
			return this
		},
		scriptRE : /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/gi,
		update : function(content, loadScripts, callback, scope) {
			loadScripts = loadScripts || this.getUpdater().loadScripts || false;
			content = Ext.DomHelper.markup(content || "");
			content = loadScripts === true ? content : content.replace(
					this.scriptRE, "");
			var doc;
			if ((doc = this.getFrameDocument()) && !!content.length) {
				this._unHook();
				this.src = null;
				this.showMask();
				Ext.isFunction(callback)
						&& this._observable.addListener("_docload", callback,
								scope || this, {
									single : true
								});
				this._targetURI = location.href;
				doc.open();
				this._frameAction = true;
				doc.write(content);
				doc.close();
				this.checkDOM()
			} else {
				this.hideMask(true);
				Ext.isFunction(callback) && callback.call(scope, this)
			}
			return this
		},
		execCommand : function(command, userInterface, value, validate) {
			var doc, assert;
			if ((doc = this.getFrameDocument()) && !!command) {
				try {
					Ext.isIE && this.getWindow().focus();
					assert = validate
							&& Ext.isFunction(doc.queryCommandEnabled) ? doc
							.queryCommandEnabled(command) : true;
					return assert
							&& doc.execCommand(command, !!userInterface, value)
				} catch (eex) {
					return false
				}
			}
			return false
		},
		setDesignMode : function(active) {
			var doc;
			(doc = this.getFrameDocument())
					&& (doc.designMode = (/on|true/i).test(String(active))
							? "on"
							: "off")
		},
		getUpdater : function() {
			return this.updateManager
					|| (this.updateManager = new MIF.Updater(this))
		},
		getHistory : function() {
			var h = null;
			try {
				h = this.getWindow().history
			} catch (eh) {
			}
			return h
		},
		get : function(el) {
			var doc = this.getFrameDocument();
			return doc ? Ext.get(el, doc) : doc = null
		},
		fly : function(el, named) {
			var doc = this.getFrameDocument();
			return doc ? Ext.fly(el, named, doc) : null
		},
		getDom : function(el) {
			var d;
			if (!el || !(d = this.getFrameDocument())) {
				return (d = null)
			}
			return Ext.getDom(el, d)
		},
		select : function(selector, unique) {
			var d;
			return (d = this.getFrameDocument()) ? Ext.Element.select(selector,
					unique, d) : d = null
		},
		query : function(selector) {
			var d;
			return (d = this.getFrameDocument()) ? Ext.DomQuery.select(
					selector, d) : null
		},
		removeNode : Ext.removeNode,
		_renderHook : function() {
			this._windowContext = null;
			this.CSS = this.CSS ? this.CSS.destroy() : null;
			this._hooked = false;
			try {
				if (this
						.writeScript('(function(){(window.hostMIF = parent.document.getElementById("'
								+ this.id
								+ '").ownerCt)._windowContext='
								+ (Ext.isIE
										? "window"
										: '{eval:function(s){return new Function("return ("+s+")")();}}')
								+ ";})()")) {
					var w, p = this._frameProxy, D = this.getFrameDocument();
					if (w = this.getWindow()) {
						p
								|| (p = this._frameProxy = this._eventProxy
										.createDelegate(this));
						addListener(w, "focus", p);
						addListener(w, "blur", p);
						addListener(w, "resize", p);
						addListener(w, "unload", p);
						D && addListener(Ext.isIE ? w : D, "scroll", p)
					}
					D && (this.CSS = new Ext.ux.ManagedIFrame.CSS(D))
				}
			} catch (ex) {
			}
			return this.domWritable()
		},
		_unHook : function() {
			if (this._hooked) {
				this._windowContext && (this._windowContext.hostMIF = null);
				this._windowContext = null;
				var w, p = this._frameProxy;
				if (p && this.domWritable() && (w = this.getWindow())) {
					removeListener(w, "focus", p);
					removeListener(w, "blur", p);
					removeListener(w, "resize", p);
					removeListener(w, "unload", p);
					removeListener(Ext.isIE ? w : this.getFrameDocument(),
							"scroll", p)
				}
			}
			ELD.clearDocumentCache && ELD.clearDocumentCache(this.id);
			this.CSS = this.CSS ? this.CSS.destroy() : null;
			this.domFired = this._frameAction = this.domReady = this._hooked = false
		},
		_windowContext : null,
		getFrameDocument : function() {
			var win = this.getWindow(), doc = null;
			try {
				doc = (Ext.isIE && win ? win.document : null)
						|| this.dom.contentDocument
						|| window.frames[this.dom.name].document || null
			} catch (gdEx) {
				ELD.clearDocumentCache && ELD.clearDocumentCache(this.id);
				return false
			}
			doc = (doc && Ext.isFunction(ELD.getDocument)) ? ELD.getDocument(
					doc, true) : doc;
			return doc
		},
		getDoc : function() {
			var D = this.getFrameDocument();
			return Ext.get(D, D)
		},
		getBody : function() {
			var d;
			return (d = this.getFrameDocument()) ? this.get(d.body
					|| d.documentElement) : null
		},
		getDocumentURI : function() {
			var URI, d;
			try {
				URI = this.src && (d = this.getFrameDocument())
						? d.location.href
						: null
			} catch (ex) {
			}
			return URI || (Ext.isFunction(this.src) ? this.src() : this.src)
		},
		getWindowURI : function() {
			var URI, w;
			try {
				URI = (w = this.getWindow()) ? w.location.href : null
			} catch (ex) {
			}
			return URI || (Ext.isFunction(this.src) ? this.src() : this.src)
		},
		getWindow : function() {
			var dom = this.dom, win = null;
			try {
				win = dom.contentWindow || window.frames[dom.name] || null
			} catch (gwEx) {
			}
			return win
		},
		scrollChildIntoView : function(child, container, hscroll) {
			this.fly(child, "_scrollChildIntoView").scrollIntoView(
					this.getDom(container) || this.getBody().dom, hscroll);
			return this
		},
		print : function() {
			try {
				var win;
				if (win = this.getWindow()) {
					Ext.isIE && win.focus();
					win.print()
				}
			} catch (ex) {
				throw new MIF.Error("printexception", ex.description
								|| ex.message || ex)
			}
			return this
		},
		domWritable : function() {
			return !!Ext.isDocument(this.getFrameDocument(), true)
					&& !!this._windowContext
		},
		execScript : function(block, useDOM) {
			try {
				if (this.domWritable()) {
					if (useDOM) {
						this.writeScript(block)
					} else {
						return this._windowContext.eval(block)
					}
				} else {
					throw new MIF.Error("execscript-secure-context")
				}
			} catch (ex) {
				this._observable.fireEvent.call(this._observable, "exception",
						this, ex);
				return false
			}
			return true
		},
		writeScript : function(block, attributes) {
			attributes = Ext.apply({}, attributes || {}, {
						type : "text/javascript",
						text : block
					});
			try {
				var head, script, doc = this.getFrameDocument();
				if (doc && typeof doc.getElementsByTagName != "undefined") {
					if (!(head = doc.getElementsByTagName("head")[0])) {
						head = doc.createElement("head");
						doc.getElementsByTagName("html")[0].appendChild(head)
					}
					if (head && (script = doc.createElement("script"))) {
						for (var attrib in attributes) {
							if (attributes.hasOwnProperty(attrib)
									&& attrib in script) {
								script[attrib] = attributes[attrib]
							}
						}
						return !!head.appendChild(script)
					}
				}
			} catch (ex) {
				this._observable.fireEvent.call(this._observable, "exception",
						this, ex)
			} finally {
				script = head = null
			}
			return false
		},
		loadFunction : function(fn, useDOM, invokeIt) {
			var name = fn.name || fn;
			var fnSrc = fn.fn || window[fn];
			name && fnSrc && this.execScript(name + "=" + fnSrc, useDOM);
			invokeIt && this.execScript(name + "()")
		},
		loadHandler : function(e, target) {
			var rstatus = (this.dom || {}).readyState || (e || {}).type;
			if (this.eventsFollowFrameLinks || this._frameAction
					|| this.isReset) {
				switch (rstatus) {
					case "domready" :
					case "DOMFrameContentLoaded" :
					case "domfail" :
						this._onDocReady(rstatus);
						break;
					case "load" :
					case "complete" :
						this._onDocLoaded(rstatus);
						break;
					case "error" :
						this._observable.fireEvent.apply(this._observable, [
										"exception", this].concat(arguments));
						break;
					default :
				}
				this.frameState = rstatus
			}
		},
		_onDocReady : function(eventName) {
			var w, obv = this._observable, D;
			if (!this.isReset && this.focusOnLoad && (w = this.getWindow())) {
				w.focus()
			}
			obv.fireEvent("_docready", this);
			(D = this.getDoc()) && (D.isReady = true);
			if (!this.domFired && (this._hooked = this._renderHook())) {
				this.domFired = true;
				this.isReset || obv.fireEvent.call(obv, "domready", this)
			}
			this.domReady = true;
			this.hideMask()
		},
		_onDocLoaded : function(eventName) {
			var obv = this._observable, w;
			this.domReady || this._onDocReady("domready");
			obv.fireEvent("_docload", this);
			this.isReset || obv.fireEvent("documentloaded", this);
			this.hideMask(true);
			this._frameAction = this.isReset = false
		},
		checkDOM : function(win) {
			if (Ext.isGecko) {
				return
			}
			var n = 0, frame = this, domReady = false, b, l, d, max = this.domReadyRetries
					|| 2500, polling = false, startLocation = (this
					.getFrameDocument() || {
				location : {}
			}).location.href;
	(function() {
				d = frame.getFrameDocument() || {
					location : {}
				};
				polling = (d.location.href !== startLocation || d.location.href === frame._targetURI);
				if (frame.domReady) {
					return
				}
				domReady = polling
						&& ((b = frame.getBody()) && !!(b.dom.innerHTML || "").length)
						|| false;
				if (d.location.href && !domReady && (++n < max)) {
					setTimeout(arguments.callee, 2);
					return
				}
				frame.loadHandler({
							type : domReady ? "domready" : "domfail"
						})
			})()
		},
		filterEventOptionsRe : /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,
		addListener : function(eventName, fn, scope, options) {
			if (typeof eventName == "object") {
				var o = eventName;
				for (var e in o) {
					if (this.filterEventOptionsRe.test(e)) {
						continue
					}
					if (typeof o[e] == "function") {
						this.addListener(e, o[e], o.scope, o)
					} else {
						this.addListener(e, o[e].fn, o[e].scope, o[e])
					}
				}
				return
			}
			if (reSynthEvents.test(eventName)) {
				var O = this._observable;
				if (O) {
					O.events[eventName] || (O.addEvents(eventName));
					O.addListener
							.call(O, eventName, fn, scope || this, options)
				}
			} else {
				ElFrame.superclass.addListener.call(this, eventName, fn, scope
								|| this, options)
			}
			return this
		},
		removeListener : function(eventName, fn, scope) {
			var O = this._observable;
			if (reSynthEvents.test(eventName)) {
				O
						&& O.removeListener.call(O, eventName, fn, scope
										|| this, options)
			} else {
				ElFrame.superclass.removeListener.call(this, eventName, fn,
						scope || this)
			}
			return this
		},
		removeAllListeners : function() {
			Ext.EventManager.removeAll(this.dom);
			var O = this._observable;
			O && O.purgeListeners.call(this._observable);
			return this
		},
		showMask : function(msg, msgCls, maskCls) {
			var lmask = this.loadMask;
			if (lmask && !lmask.disabled) {
				this.mask(msg || lmask.msg, msgCls || lmask.msgCls, maskCls
								|| lmask.maskCls, lmask.maskEl)
			}
		},
		hideMask : function(forced) {
			var tlm = this.loadMask || {};
			if (forced || (tlm.hideOnReady && this.domReady)) {
				this.unmask()
			}
		},
		mask : function(msg, msgCls, maskCls, maskEl) {
			this._mask && this.unmask();
			var p = Ext.get(maskEl) || this.parent(".ux-mif-mask-target")
					|| this.parent();
			if (p.getStyle("position") == "static"
					&& !p.select("iframe,frame,object,embed").elements.length) {
				p.addClass("x-masked-relative")
			}
			p.addClass("x-masked");
			this._mask = Ext.DomHelper.append(p, {
						cls : maskCls || "ux-mif-el-mask"
					}, true);
			this._mask.setDisplayed(true);
			this._mask._agent = p;
			if (typeof msg == "string") {
				this._maskMsg = Ext.DomHelper.append(p, {
							cls : msgCls || "ux-mif-el-mask-msg",
							style : {
								visibility : "hidden"
							},
							cn : {
								tag : "div",
								html : msg
							}
						}, true);
				this._maskMsg.setVisibilityMode(Ext.Element.VISIBILITY)
						.center(p).setVisible(true)
			}
			if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict)
					&& this.getStyle("height") == "auto") {
				this._mask.setSize(undefined, this._mask.getHeight())
			}
			return this._mask
		},
		unmask : function() {
			var a;
			if (this._mask) {
				(a = this._mask._agent)
						&& a.removeClass(["x-masked-relative", "x-masked"]);
				if (this._maskMsg) {
					this._maskMsg.remove();
					delete this._maskMsg
				}
				this._mask.remove();
				delete this._mask
			}
		},
		createFrameShim : function(imgUrl, shimCls) {
			this.shimCls = shimCls || this.shimCls || "ux-mif-shim";
			this.frameShim
					|| (this.frameShim = this.next("." + this.shimCls)
							|| Ext.DomHelper.append(this.dom.parentNode, {
										tag : "img",
										src : imgUrl || Ext.BLANK_IMAGE_URL,
										cls : this.shimCls,
										galleryimg : "no"
									}, true));
			this.frameShim && (this.frameShim.autoBoxAdjust = false);
			return this.frameShim
		},
		toggleShim : function(show) {
			var shim = this.frameShim || this.createFrameShim();
			var cls = this.shimCls + "-on";
			!show && shim.removeClass(cls);
			show && !shim.hasClass(cls) && shim.addClass(cls)
		},
		load : function(loadCfg) {
			var um;
			if (um = this.getUpdater()) {
				if (loadCfg && loadCfg.renderer) {
					um.setRenderer(loadCfg.renderer);
					delete loadCfg.renderer
				}
				um.update.apply(um, arguments)
			}
			return this
		},
		_eventProxy : function(e) {
			if (!e) {
				return
			}
			e = Ext.EventObject.setEvent(e);
			var be = e.browserEvent || e, er, args = [e.type, this];
			if (!be.eventPhase || (be.eventPhase == (be.AT_TARGET || 2))) {
				if (e.type == "resize") {
					var doc = this.getFrameDocument();
					doc && (args.push({
								height : ELD.getDocumentHeight(doc),
								width : ELD.getDocumentWidth(doc)
							}, {
								height : ELD.getViewportHeight(doc),
								width : ELD.getViewportWidth(doc)
							}, {
								height : ELD.getViewHeight(false, doc),
								width : ELD.getViewWidth(false, doc)
							}))
				}
				er = this._observable ? this._observable.fireEvent.apply(
						this._observable, args.concat(Array.prototype.slice
								.call(arguments, 0))) : null;
				(e.type == "unload") && this._unHook()
			}
			return er
		},
		sendMessage : function(message, tag, origin) {
		},
		postMessage : function(message, origin) {
		}
	});
	ElFrame = Ext.Element.IFRAME = Ext.Element.FRAME = Ext.ux.ManagedIFrame.Element;
	var fp = ElFrame.prototype;
	Ext.override(ElFrame, {
				on : fp.addListener,
				un : fp.removeListener,
				getUpdateManager : fp.getUpdater
			});
	Ext.ux.ManagedIFrame.ComponentAdapter = function() {
	};
	Ext.ux.ManagedIFrame.ComponentAdapter.prototype = {
		version : 2.12,
		defaultSrc : null,
		unsupportedText : "Inline frames are NOT enabled/supported by your browser.",
		hideMode : !Ext.isIE && !!Ext.ux.plugin.VisibilityMode
				? "nosize"
				: "display",
		animCollapse : Ext.isIE,
		animFloat : Ext.isIE,
		disableMessaging : true,
		eventsFollowFrameLinks : true,
		frameConfig : null,
		focusOnLoad : Ext.isIE,
		frameEl : null,
		useShim : false,
		autoScroll : true,
		autoLoad : null,
		getId : function() {
			return this.id
					|| (this.id = "mif-comp-" + (++Ext.Component.AUTO_ID))
		},
		stateEvents : ["documentloaded"],
		stateful : false,
		setAutoScroll : function(auto) {
			var scroll = Ext.value(auto, this.autoScroll === true);
			this.rendered
					&& this.getFrame()
					&& this.frameEl.setOverflow((this.autoScroll = scroll)
							? "auto"
							: "hidden");
			return this
		},
		getContentTarget : function() {
			return this.getFrame()
		},
		getFrame : function() {
			if (this.rendered) {
				if (this.frameEl) {
					return this.frameEl
				}
				var f = this.items && this.items.first
						? this.items.first()
						: null;
				f && (this.frameEl = f.frameEl);
				return this.frameEl
			}
			return null
		},
		getFrameWindow : function() {
			return this.getFrame() ? this.frameEl.getWindow() : null
		},
		getFrameDocument : function() {
			return this.getFrame() ? this.frameEl.getFrameDocument() : null
		},
		getFrameDoc : function() {
			return this.getFrame() ? this.frameEl.getDoc() : null
		},
		getFrameBody : function() {
			return this.getFrame() ? this.frameEl.getBody() : null
		},
		resetFrame : function() {
			this.getFrame()
					&& this.frameEl.reset.apply(this.frameEl, arguments);
			return this
		},
		submitAsTarget : function(submitCfg) {
			this.getFrame()
					&& this.frameEl.submitAsTarget.apply(this.frameEl,
							arguments);
			return this
		},
		load : function(loadCfg) {
			if (loadCfg && this.getFrame()) {
				var args = arguments;
				this.resetFrame(null, function() {
							loadCfg.submitAsTarget ? this.submitAsTarget.apply(
									this, args) : this.frameEl.load.apply(
									this.frameEl, args)
						}, this)
			}
			this.autoLoad = loadCfg;
			return this
		},
		doAutoLoad : function() {
			this.autoLoad
					&& this.load(typeof this.autoLoad == "object"
							? this.autoLoad
							: {
								url : this.autoLoad
							})
		},
		getUpdater : function() {
			return this.getFrame() ? this.frameEl.getUpdater() : null
		},
		setSrc : function(url, discardUrl, callback, scope) {
			this.getFrame()
					&& this.frameEl.setSrc.apply(this.frameEl, arguments);
			return this
		},
		setLocation : function(url, discardUrl, callback, scope) {
			this.getFrame()
					&& this.frameEl.setLocation.apply(this.frameEl, arguments);
			return this
		},
		getState : function() {
			var URI = this.getFrame()
					? this.frameEl.getDocumentURI() || null
					: null;
			var state = this.supr().getState.call(this);
			state = Ext.apply(state || {}, {
						defaultSrc : Ext.isFunction(URI) ? URI() : URI,
						autoLoad : this.autoLoad
					});
			return state
		},
		setMIFEvents : function() {
			this.addEvents("documentloaded", "domready", "exception",
					"message", "blur", "focus", "scroll", "resize", "unload",
					"reset")
		},
		sendMessage : function(message, tag, origin) {
		},
		onAdd : function(C) {
			C.relayTarget && this.suspendEvents(true)
		},
		initRef : function() {
			if (this.ref) {
				var t = this, levels = this.ref.split("/"), l = levels.length, i;
				for (i = 0; i < l; i++) {
					if (t.ownerCt) {
						t = t.ownerCt
					}
				}
				this.refName = levels[--i];
				t[this.refName] || (t[this.refName] = this);
				this.refOwner = t
			}
		}
	};
	Ext.ux.ManagedIFrame.Component = Ext.extend(Ext.BoxComponent, {
		ctype : "Ext.ux.ManagedIFrame.Component",
		initComponent : function() {
			var C = {
				monitorResize : this.monitorResize
						|| (this.monitorResize = !!this.fitToParent),
				plugins : (this.plugins || [])
						.concat(this.hideMode === "nosize"
								&& Ext.ux.plugin.VisibilityMode
								? [new Ext.ux.plugin.VisibilityMode({
											hideMode : "nosize",
											elements : ["bwrap"]
										})]
								: [])
			};
			MIF.Component.superclass.initComponent.call(Ext.apply(this, Ext
							.apply(this.initialConfig, C)));
			this.setMIFEvents()
		},
		onRender : function(ct, position) {
			var frCfg = this.frameCfg || this.frameConfig
					|| (this.relayTarget ? {
						name : this.relayTarget.id
					} : {}) || {};
			var frDOM = frCfg.autoCreate || frCfg;
			frDOM = Ext.apply({
						tag : "iframe",
						id : Ext.id()
					}, frDOM);
			var el = Ext.getDom(this.el);
			(el && el.tagName == "iframe") || (this.autoEl = Ext.apply({
						name : frDOM.id,
						frameborder : 0
					}, frDOM));
			MIF.Component.superclass.onRender.apply(this, arguments);
			if (this.unsupportedText) {
				ct.child("noframes") || ct.createChild({
							tag : "noframes",
							html : this.unsupportedText || null
						})
			}
			var frame = this.el;
			var F;
			if (F = this.frameEl = (this.el
					? new MIF.Element(this.el.dom, true)
					: null)) {
				Ext.apply(F, {
							ownerCt : this.relayTarget || this,
							disableMessaging : Ext.value(this.disableMessaging,
									true),
							focusOnLoad : Ext.value(this.focusOnLoad, Ext.isIE),
							eventsFollowFrameLinks : Ext.value(
									this.eventsFollowFrameLinks, true)
						});
				F.ownerCt.frameEl = F;
				F.addClass("ux-mif");
				if (this.loadMask) {
					var mEl = this.loadMask.maskEl;
					F.loadMask = Ext.apply({
								disabled : false,
								hideOnReady : false,
								msgCls : "ext-el-mask-msg x-mask-loading",
								maskCls : "ext-el-mask"
							}, {
								maskEl : F.ownerCt[String(mEl)]
										|| F.parent("." + String(mEl))
										|| F.parent(".ux-mif-mask-target")
										|| mEl
							}, Ext.isString(this.loadMask) ? {
								msg : this.loadMask
							} : this.loadMask);
					Ext.get(F.loadMask.maskEl)
							&& Ext.get(F.loadMask.maskEl)
									.addClass("ux-mif-mask-target")
				}
				F._observable
						&& (this.relayTarget || this).relayEvents(
								F._observable, frameEvents
										.concat(this._msgTagHandlers || []));
				delete this.contentEl
			}
		},
		afterRender : function(container) {
			MIF.Component.superclass.afterRender.apply(this, arguments);
			if (this.fitToParent && !this.ownerCt) {
				var pos = this.getPosition(), size = (Ext.get(this.fitToParent) || this
						.getEl().parent()).getViewSize();
				this.setSize(size.width - pos[0], size.height - pos[1])
			}
			this.getEl().setOverflow("hidden");
			this.setAutoScroll();
			var F;
			if (F = this.frameEl) {
				var ownerCt = this.ownerCt;
				while (ownerCt) {
					ownerCt.on("afterlayout", function(container, layout) {
						Ext.each(["north", "south", "east", "west"], function(
								region) {
							var reg;
							if ((reg = layout[region]) && reg.split
									&& reg.split.dd && !reg._splitTrapped) {
								reg.split.dd.endDrag = reg.split.dd.endDrag
										.createSequence(MIM.hideShims, MIM);
								reg.split
										.on("beforeresize", MIM.showShims, MIM);
								reg._splitTrapped = MIM._splitTrapped = true
							}
						}, this)
					}, this, {
						single : true
					});
					ownerCt = ownerCt.ownerCt
				}
				if (!!this.ownerCt || this.useShim) {
					this.frameShim = F.createFrameShim()
				}
				this.getUpdater().showLoadIndicator = this.showLoadIndicator || false;
				var resumeEvents = this.relayTarget && this.ownerCt
						? this.ownerCt.resumeEvents
								.createDelegate(this.ownerCt)
						: null;
				if (this.autoload) {
					this.doAutoLoad()
				} else {
					if (this.frameMarkup || this.html) {
						F.update(this.frameMarkup || this.html, true,
								resumeEvents);
						delete this.html;
						delete this.frameMarkup;
						return
					} else {
						if (this.defaultSrc) {
							F.setSrc(this.defaultSrc, false)
						} else {
							F.reset(null, resumeEvents);
							return
						}
					}
				}
				resumeEvents && resumeEvents()
			}
		},
		beforeDestroy : function() {
			var F;
			if (F = this.getFrame()) {
				F.remove();
				this.frameEl = this.frameShim = null
			}
			this.relayTarget && (this.relayTarget.frameEl = null);
			MIF.Component.superclass.beforeDestroy.call(this)
		}
	});
	Ext.override(MIF.Component, MIF.ComponentAdapter.prototype);
	Ext.reg("mif", MIF.Component);
	function embed_MIF(config) {
		config || (config = {});
		config.layout = "fit";
		config.items = {
			xtype : "mif",
			ref : "mifChild",
			useShim : true,
			autoScroll : Ext.value(config.autoScroll, this.autoScroll),
			defaultSrc : Ext.value(config.defaultSrc, this.defaultSrc),
			frameMarkup : Ext.value(config.html, this.html),
			loadMask : Ext.value(config.loadMask, this.loadMask),
			disableMessaging : Ext.value(config.disableMessaging,
					this.disableMessaging),
			eventsFollowFrameLinks : Ext.value(config.eventsFollowFrameLinks,
					this.eventsFollowFrameLinks),
			focusOnLoad : Ext.value(config.focusOnLoad, this.focusOnLoad),
			frameConfig : Ext.value(config.frameConfig || config.frameCfg,
					this.frameConfig),
			relayTarget : this
		};
		delete config.html;
		this.setMIFEvents();
		return config
	}
	Ext.ux.ManagedIFrame.Panel = Ext.extend(Ext.Panel, {
				ctype : "Ext.ux.ManagedIFrame.Panel",
				bodyCssClass : "ux-mif-mask-target",
				constructor : function(config) {
					MIF.Panel.superclass.constructor.call(this, embed_MIF.call(
									this, config))
				}
			});
	Ext.override(MIF.Panel, MIF.ComponentAdapter.prototype);
	Ext.reg("iframepanel", MIF.Panel);
	Ext.ux.ManagedIFrame.Portlet = Ext.extend(Ext.ux.ManagedIFrame.Panel, {
				ctype : "Ext.ux.ManagedIFrame.Portlet",
				anchor : "100%",
				frame : true,
				collapseEl : "bwrap",
				collapsible : true,
				draggable : true,
				cls : "x-portlet"
			});
	Ext.reg("iframeportlet", MIF.Portlet);
	Ext.ux.ManagedIFrame.Window = Ext.extend(Ext.Window, {
				ctype : "Ext.ux.ManagedIFrame.Window",
				bodyCssClass : "ux-mif-mask-target",
				constructor : function(config) {
					MIF.Window.superclass.constructor.call(this, embed_MIF
									.call(this, config))
				}
			});
	Ext.override(MIF.Window, MIF.ComponentAdapter.prototype);
	Ext.reg("iframewindow", MIF.Window);
	Ext.ux.ManagedIFrame.Updater = Ext.extend(Ext.Updater, {
				showLoading : function() {
					this.showLoadIndicator && this.el
							&& this.el.mask(this.indicatorText)
				},
				hideLoading : function() {
					this.showLoadIndicator && this.el && this.el.unmask()
				},
				updateComplete : function(response) {
					MIF.Updater.superclass.updateComplete
							.apply(this, arguments);
					this.hideLoading()
				},
				processFailure : function(response) {
					MIF.Updater.superclass.processFailure
							.apply(this, arguments);
					this.hideLoading()
				}
			});
	var styleCamelRe = /(-[a-z])/gi;
	var styleCamelFn = function(m, a) {
		return a.charAt(1).toUpperCase()
	};
	Ext.ux.ManagedIFrame.CSS = function(hostDocument) {
		var doc;
		if (hostDocument) {
			doc = hostDocument;
			return {
				rules : null,
				destroy : function() {
					return doc = null
				},
				createStyleSheet : function(cssText, id) {
					var ss;
					if (!doc) {
						return
					}
					var head = doc.getElementsByTagName("head")[0];
					var rules = doc.createElement("style");
					rules.setAttribute("type", "text/css");
					Ext.isString(id) && rules.setAttribute("id", id);
					if (Ext.isIE) {
						head.appendChild(rules);
						ss = rules.styleSheet;
						ss.cssText = cssText
					} else {
						try {
							rules.appendChild(doc.createTextNode(cssText))
						} catch (e) {
							rules.cssText = cssText
						}
						head.appendChild(rules);
						ss = rules.styleSheet
								? rules.styleSheet
								: (rules.sheet || doc.styleSheets[doc.styleSheets.length
										- 1])
					}
					this.cacheStyleSheet(ss);
					return ss
				},
				removeStyleSheet : function(id) {
					if (!doc || !id) {
						return
					}
					var existing = doc.getElementById(id);
					if (existing) {
						existing.parentNode.removeChild(existing)
					}
				},
				swapStyleSheet : function(id, url) {
					if (!doc) {
						return
					}
					this.removeStyleSheet(id);
					var ss = doc.createElement("link");
					ss.setAttribute("rel", "stylesheet");
					ss.setAttribute("type", "text/css");
					Ext.isString(id) && ss.setAttribute("id", id);
					ss.setAttribute("href", url);
					doc.getElementsByTagName("head")[0].appendChild(ss)
				},
				refreshCache : function() {
					return this.getRules(true)
				},
				cacheStyleSheet : function(ss, media) {
					this.rules || (this.rules = {});
					try {
						Ext.each(ss.cssRules || ss.rules || [], function(rule) {
									this.hashRule(rule, ss, media)
								}, this);
						Ext.each(ss.imports || [], function(sheet) {
									sheet
											&& this
													.cacheStyleSheet(
															sheet,
															this
																	.resolveMedia([
																			sheet,
																			sheet.parentStyleSheet]))
								}, this)
					} catch (e) {
					}
				},
				hashRule : function(rule, sheet, mediaOverride) {
					var mediaSelector = mediaOverride
							|| this.resolveMedia(rule);
					if (rule.cssRules || rule.rules) {
						this.cacheStyleSheet(rule, this.resolveMedia([rule,
										rule.parentRule]))
					}
					if (rule.styleSheet) {
						this.cacheStyleSheet(rule.styleSheet, this
										.resolveMedia([rule, rule.ownerRule,
												rule.parentStyleSheet]))
					}
					rule.selectorText
							&& Ext.each((mediaSelector || "").split(","),
									function(media) {
										this.rules[((media
												? media.trim() + ":"
												: "") + rule.selectorText)
												.toLowerCase()] = rule
									}, this)
				},
				resolveMedia : function(rule) {
					var media;
					Ext.each([].concat(rule), function(r) {
								if (r && r.media && r.media.length) {
									media = r.media;
									return false
								}
							});
					return media
							? (Ext.isIE ? String(media) : media.mediaText)
							: ""
				},
				getRules : function(refreshCache) {
					if (!this.rules || refreshCache) {
						this.rules = {};
						if (doc) {
							var ds = doc.styleSheets;
							for (var i = 0, len = ds.length; i < len; i++) {
								try {
									this.cacheStyleSheet(ds[i])
								} catch (e) {
								}
							}
						}
					}
					return this.rules
				},
				getRule : function(selector, refreshCache, mediaSelector) {
					var rs = this.getRules(refreshCache);
					if (Ext.type(mediaSelector) == "string") {
						mediaSelector = mediaSelector.trim() + ":"
					} else {
						mediaSelector = ""
					}
					if (!Ext.isArray(selector)) {
						return rs[(mediaSelector + selector).toLowerCase()]
					}
					var select;
					for (var i = 0; i < selector.length; i++) {
						select = (mediaSelector + selector[i]).toLowerCase();
						if (rs[select]) {
							return rs[select]
						}
					}
					return null
				},
				updateRule : function(selector, property, value, mediaSelector) {
					Ext.each((mediaSelector || "").split(","), function(
							mediaSelect) {
						if (!Ext.isArray(selector)) {
							var rule = this.getRule(selector, false,
									mediaSelect);
							if (rule) {
								rule.style[property.replace(camelRe, camelFn)] = value;
								return true
							}
						} else {
							for (var i = 0; i < selector.length; i++) {
								if (this.updateRule(selector[i], property,
										value, mediaSelect)) {
									return true
								}
							}
						}
						return false
					}, this)
				}
			}
		}
	};
	Ext.ux.ManagedIFrame.Manager = function() {
		var frames = {};
		var implementation = {
			_DOMFrameReadyHandler : function(e) {
				try {
					var $frame;
					if ($frame = e.target.ownerCt) {
						$frame.loadHandler.call($frame, e)
					}
				} catch (rhEx) {
				}
			},
			shimCls : "ux-mif-shim",
			register : function(frame) {
				frame.manager = this;
				frames[frame.id] = frames[frame.name] = {
					ref : frame
				};
				return frame
			},
			deRegister : function(frame) {
				delete frames[frame.id];
				delete frames[frame.name]
			},
			hideShims : function() {
				var mm = MIF.Manager;
				mm.shimsApplied
						&& Ext.select("." + mm.shimCls, true)
								.removeClass(mm.shimCls + "-on");
				mm.shimsApplied = false
			},
			showShims : function() {
				var mm = MIF.Manager;
				!mm.shimsApplied
						&& Ext.select("." + mm.shimCls, true)
								.addClass(mm.shimCls + "-on");
				mm.shimsApplied = true
			},
			getFrameById : function(id) {
				return typeof id == "string" ? (frames[id] ? frames[id].ref
						|| null : null) : null
			},
			getFrameByName : function(name) {
				return this.getFrameById(name)
			},
			getFrameHash : function(frame) {
				return frames[frame.id] || frames[frame.id] || null
			},
			destroy : function() {
				if (document.addEventListener && !Ext.isOpera) {
					window.removeEventListener("DOMFrameContentLoaded",
							this._DOMFrameReadyHandler, false)
				}
			}
		};
		document.addEventListener
				&& !Ext.isOpera
				&& window.addEventListener("DOMFrameContentLoaded",
						implementation._DOMFrameReadyHandler, false);
		Ext.EventManager.on(window, "beforeunload", implementation.destroy,
				implementation);
		return implementation
	}();
	MIM = MIF.Manager;
	MIM.showDragMask = MIM.showShims;
	MIM.hideDragMask = MIM.hideShims;
	var winDD = Ext.Window.DD;
	Ext.override(winDD, {
				startDrag : winDD.prototype.startDrag
						.createInterceptor(MIM.showShims),
				endDrag : winDD.prototype.endDrag
						.createInterceptor(MIM.hideShims)
			});
	Ext.ux.ManagedIFramePanel = MIF.Panel;
	Ext.ux.ManagedIFramePortlet = MIF.Portlet;
	Ext.ux.ManagedIframe = function(el, opt) {
		var args = Array.prototype.slice.call(arguments, 0), el = Ext
				.get(args[0]), config = args[0];
		if (el && el.dom && el.dom.tagName == "IFRAME") {
			config = args[1] || {}
		} else {
			config = args[0] || args[1] || {};
			el = config.autoCreate ? Ext.get(Ext.DomHelper.append(
					config.autoCreate.parent || Ext.getBody(), Ext.apply({
								tag : "iframe",
								frameborder : 0,
								cls : "x-mif",
								src : (Ext.isIE && Ext.isSecure)
										? Ext.SSL_SECURE_URL
										: "about:blank"
							}, config.autoCreate))) : null;
			if (el && config.unsupportedText) {
				Ext.DomHelper.append(el.dom.parentNode, {
							tag : "noframes",
							html : config.unsupportedText
						})
			}
		}
		var mif = new MIF.Element(el, true);
		if (mif) {
			Ext.apply(mif, {
						disableMessaging : Ext.value(config.disableMessaging,
								true),
						focusOnLoad : Ext.value(config.focusOnLoad, Ext.isIE),
						eventsFollowFrameLinks : Ext.value(
								config.eventsFollowFrameLinks, true),
						loadMask : !!config.loadMask ? Ext.apply({
									msg : "Loading..",
									msgCls : "x-mask-loading",
									maskEl : null,
									hideOnReady : false,
									disabled : false
								}, config.loadMask) : false,
						_windowContext : null
					});
			config.listeners && mif.on(config.listeners);
			if (!!config.html) {
				mif.update(config.html)
			} else {
				!!config.src && mif.setSrc(config.src)
			}
		}
		return mif
	};
	Ext.ux.ManagedIFrame.Error = Ext.extend(Ext.Error, {
				constructor : function(message, arg) {
					this.arg = arg;
					Ext.Error.call(this, message)
				},
				name : "Ext.ux.ManagedIFrame"
			});
	Ext.apply(Ext.ux.ManagedIFrame.Error.prototype, {
		lang : {
			"documentcontext-remove" : "An attempt was made to remove an Element from the wrong document context.",
			"execscript-secure-context" : "An attempt was made at script execution within a document context with limited access permissions.",
			printexception : "An Error was encountered attempting the print the frame contents (document access is likely restricted)."
		}
	});
	Ext.onReady(function() {
		var CSS = new Ext.ux.ManagedIFrame.CSS(document), rules = [];
		CSS.getRule(".ux-mif-fill")
				|| (rules.push(".ux-mif-fill{height:100%;width:100%;}"));
		CSS.getRule(".ux-mif-mask-target")
				|| (rules
						.push(".ux-mif-mask-target{position:relative;zoom:1;}"));
		CSS.getRule(".ux-mif-el-mask")
				|| (rules
						.push(
								".ux-mif-el-mask {z-index: 100;position: absolute;top:0;left:0;-moz-opacity: 0.5;opacity: .50;*filter: alpha(opacity=50);width: 100%;height: 100%;zoom: 1;} ",
								".ux-mif-el-mask-msg {z-index: 1;position: absolute;top: 0;left: 0;border:1px solid;background:repeat-x 0 -16px;padding:2px;} ",
								".ux-mif-el-mask-msg div {padding:5px 10px 5px 10px;border:1px solid;cursor:wait;} "));
		if (!CSS.getRule(".ux-mif-shim")) {
			rules
					.push(".ux-mif-shim {z-index:8500;position:absolute;top:0px;left:0px;background:transparent!important;overflow:hidden;display:none;}");
			rules
					.push(".ux-mif-shim-on{width:100%;height:100%;display:block;zoom:1;}");
			rules
					.push(".ext-ie6 .ux-mif-shim{margin-left:5px;margin-top:3px;}")
		}
		if (!CSS.getRule(".x-hide-nosize")) {
			rules
					.push(".x-hide-nosize{height:0px!important;width:0px!important;visibility:hidden!important;border:none!important;zoom:1;}.x-hide-nosize * {height:0px!important;width:0px!important;visibility:hidden!important;border:none!important;zoom:1;}")
		}
		!!rules.length && CSS.createStyleSheet(rules.join(" "), "mifCSS")
	});
	Ext.provide && Ext.provide("mif")
})();