﻿/**
 * QM.lib.makePy (String ChineseString):Array the Pinyin Array of ChineseString
 * 将中文字符串转成对应拼音首字母数组； QM.lib.checkPy (String regExp/start,String
 * ChineseString,[Object cache]):Boolean
 * 检测一个则表达式或者英文字符串(regExp/start)是否与中文字符串(ChineseString)转成的
 * 拼音首字母数组其中之一匹配，如果有一项匹配返回true，都不匹配返回false；cache对象是
 * 负责保存汉字字符对应拼音首字母数组的一个关联数组(汉字字符为key，拼音首字母数组为value)
 * cache对象由其它对象进行托管，checkPy函数会根据ChineseString优先搜索cache中存放的映射
 * 而不是调用makePy重新生成以减少运算开销，如果在cache中找不到所需的汉字缓存，则为cache 添加这个汉字的缓存。
 * 
 * 
 * 1.0.1修改： 修复了多音字筛选不到的bug
 * 
 * 1.0.2修改： 为store添加了一个拼音的缓存
 * 
 * 1.1修改： 1.添加了QM.lib.makePy方法 2.添加了QM.lib.checkPy方法
 * 
 * @author chemzqm@gmail.com
 * @version 1.1
 * @createTime 2010-04-23 21:53:31
 */

Ext.ns("QM.lib");
// 单例类，内部变量不可直接被访问，同时避免实例化多个实例，减少内存占用
(function() {
	// @private
	CHNPY = "XY";
	MULTIDIFF = {
		"19969" : "DZ",
		"19975" : "WM",
		"19988" : "QJ",
		"20048" : "YL",
		"20056" : "SC",
		"20060" : "NM",
		"20094" : "QG",
		"20127" : "QJ",
		"20167" : "QC",
		"20193" : "YG",
		"20250" : "KH",
		"20256" : "ZC",
		"20282" : "SC",
		"20285" : "QJG",
		"20291" : "TD",
		"20314" : "YD",
		"20340" : "NE",
		"20375" : "TD",
		"20389" : "YJ",
		"20391" : "CZ",
		"20415" : "PB",
		"20446" : "YS",
		"20447" : "SQ",
		"20504" : "TC",
		"20608" : "KG",
		"20854" : "QJ",
		"20857" : "ZC",
		"20911" : "PF",
		"20504" : "TC",
		"20608" : "KG",
		"20854" : "QJ",
		"20857" : "ZC",
		"20911" : "PF",
		"20985" : "AW",
		"21032" : "PB",
		"21048" : "XQ",
		"21049" : "SC",
		"21089" : "YS",
		"21119" : "JC",
		"21242" : "SB",
		"21273" : "SC",
		"21305" : "YP",
		"21306" : "QO",
		"21330" : "ZC",
		"21333" : "SDC",
		"21345" : "QK",
		"21378" : "CA",
		"21397" : "SC",
		"21414" : "XS",
		"21442" : "SC",
		"21477" : "JG",
		"21480" : "TD",
		"21484" : "ZS",
		"21494" : "YX",
		"21505" : "YX",
		"21512" : "HG",
		"21523" : "XH",
		"21537" : "PB",
		"21542" : "PF",
		"21549" : "KH",
		"21571" : "E",
		"21574" : "DA",
		"21588" : "TD",
		"21589" : "O",
		"21618" : "ZC",
		"21621" : "KHA",
		"21632" : "ZJ",
		"21654" : "KG",
		"21679" : "LKG",
		"21683" : "KH",
		"21710" : "A",
		"21719" : "YH",
		"21734" : "WOE",
		"21769" : "A",
		"21780" : "WN",
		"21804" : "XH",
		"21834" : "A",
		"21899" : "ZD",
		"21903" : "RN",
		"21908" : "WO",
		"21939" : "ZC",
		"21956" : "SA",
		"21964" : "YA",
		"21970" : "TD",
		"22003" : "A",
		"22031" : "JG",
		"22040" : "XS",
		"22060" : "ZC",
		"22066" : "ZC",
		"22079" : "MH",
		"22129" : "XJ",
		"22179" : "XA",
		"22237" : "NJ",
		"22244" : "TD",
		"22280" : "JQ",
		"22300" : "YH",
		"22313" : "XW",
		"22331" : "YQ",
		"22343" : "YJ",
		"22351" : "PH",
		"22395" : "DC",
		"22412" : "TD",
		"22484" : "PB",
		"22500" : "PB",
		"22534" : "ZD",
		"22549" : "DH",
		"22561" : "PB",
		"22612" : "TD",
		"22771" : "KQ",
		"22831" : "HB",
		"22841" : "JG",
		"22855" : "QJ",
		"22865" : "XQ",
		"23013" : "ML",
		"23081" : "WM",
		"23487" : "SX",
		"23558" : "QJ",
		"23561" : "YW",
		"23586" : "YW",
		"23614" : "YW",
		"23615" : "SN",
		"23631" : "PB",
		"23646" : "ZS",
		"23663" : "ZT",
		"23673" : "YG",
		"23762" : "TD",
		"23769" : "ZS",
		"23780" : "QJ",
		"23884" : "QK",
		"24055" : "XH",
		"24113" : "DC",
		"24162" : "ZC",
		"24191" : "GA",
		"24273" : "QJ",
		"24324" : "NL",
		"24377" : "TD",
		"24378" : "QJ",
		"24439" : "PF",
		"24554" : "ZS",
		"24683" : "TD",
		"24694" : "WE",
		"24733" : "LK",
		"24925" : "TN",
		"25094" : "ZG",
		"25100" : "XQ",
		"25103" : "XH",
		"25153" : "PB",
		"25170" : "PB",
		"25179" : "KG",
		"25203" : "PB",
		"25240" : "ZS",
		"25282" : "FB",
		"25303" : "NA",
		"25324" : "KG",
		"25341" : "ZY",
		"25373" : "WZ",
		"25375" : "XJ",
		"25384" : "A",
		"25457" : "A",
		"25528" : "SD",
		"25530" : "SC",
		"25552" : "TD",
		"25774" : "ZC",
		"25874" : "ZC",
		"26044" : "YW",
		"26080" : "WM",
		"26292" : "PB",
		"26333" : "PB",
		"26355" : "ZY",
		"26366" : "CZ",
		"26397" : "ZC",
		"26399" : "QJ",
		"26415" : "ZS",
		"26451" : "SB",
		"26526" : "ZC",
		"26552" : "JG",
		"26561" : "TD",
		"26588" : "JG",
		"26597" : "CZ",
		"26629" : "ZS",
		"26638" : "YL",
		"26646" : "XQ",
		"26653" : "KG",
		"26657" : "XJ",
		"26727" : "HG",
		"26894" : "ZC",
		"26937" : "ZS",
		"26946" : "ZC",
		"26999" : "KJ",
		"27099" : "KJ",
		"27449" : "YQ",
		"27481" : "XS",
		"27542" : "ZS",
		"27663" : "ZS",
		"27748" : "TS",
		"27784" : "SC",
		"27788" : "ZD",
		"27795" : "TD",
		"27812" : "O",
		"27850" : "PB",
		"27852" : "MB",
		"27895" : "SL",
		"27898" : "PL",
		"27973" : "QJ",
		"27981" : "KH",
		"27986" : "HX",
		"27994" : "XJ",
		"28044" : "YC",
		"28065" : "WG",
		"28177" : "SM",
		"28267" : "QJ",
		"28291" : "KH",
		"28337" : "ZQ",
		"28463" : "TL",
		"28548" : "DC",
		"28601" : "TD",
		"28689" : "PB",
		"28805" : "JG",
		"28820" : "QG",
		"28846" : "PB",
		"28952" : "TD",
		"28975" : "ZC",
		"29100" : "A",
		"29325" : "QJ",
		"29575" : "SL",
		"29602" : "FB",
		"30010" : "TD",
		"30044" : "CX",
		"30058" : "PF",
		"30091" : "YSP",
		"30111" : "YN",
		"30229" : "XJ",
		"30427" : "SC",
		"30465" : "SX",
		"30631" : "YQ",
		"30655" : "QJ",
		"30684" : "QJG",
		"30707" : "SD",
		"30729" : "XH",
		"30796" : "LG",
		"30917" : "PB",
		"31074" : "NM",
		"31085" : "JZ",
		"31109" : "SC",
		"31181" : "ZC",
		"31192" : "MLB",
		"31293" : "JQ",
		"31400" : "YX",
		"31584" : "YJ",
		"31896" : "ZN",
		"31909" : "ZY",
		"31995" : "XJ",
		"32321" : "PF",
		"32327" : "ZY",
		"32418" : "HG",
		"32420" : "XQ",
		"32421" : "HG",
		"32438" : "LG",
		"32473" : "GJ",
		"32488" : "TD",
		"32521" : "QJ",
		"32527" : "PB",
		"32562" : "ZSQ",
		"32564" : "JZ",
		"32735" : "ZD",
		"32793" : "PB",
		"33071" : "PF",
		"33098" : "XL",
		"33100" : "YA",
		"33152" : "PB",
		"33261" : "CX",
		"33324" : "BP",
		"33333" : "TD",
		"33406" : "YA",
		"33426" : "WM",
		"33432" : "PB",
		"33445" : "JG",
		"33486" : "ZN",
		"33493" : "TS",
		"33507" : "QJ",
		"33540" : "QJ",
		"33544" : "ZC",
		"33564" : "XQ",
		"33617" : "YT",
		"33632" : "QJ",
		"33636" : "XH",
		"33637" : "YX",
		"33694" : "WG",
		"33705" : "PF",
		"33728" : "YW",
		"33882" : "SR",
		"34067" : "WM",
		"34074" : "YW",
		"34121" : "QJ",
		"34255" : "ZC",
		"34259" : "XL",
		"34425" : "JH",
		"34430" : "XH",
		"34485" : "KH",
		"34503" : "YS",
		"34532" : "HG",
		"34552" : "XS",
		"34558" : "YE",
		"34593" : "ZL",
		"34660" : "YQ",
		"34892" : "XH",
		"34928" : "SC",
		"34999" : "QJ",
		"35048" : "PB",
		"35059" : "SC",
		"35098" : "ZC",
		"35203" : "TQ",
		"35265" : "JX",
		"35299" : "JX",
		"35782" : "SZ",
		"35828" : "YS",
		"35830" : "E",
		"35843" : "TD",
		"35895" : "YG",
		"35977" : "MH",
		"36158" : "JG",
		"36228" : "QJ",
		"36426" : "XQ",
		"36466" : "DC",
		"36710" : "JC",
		"36711" : "ZYG",
		"36767" : "PB",
		"36866" : "SK",
		"36951" : "YW",
		"37034" : "YX",
		"37063" : "XH",
		"37218" : "ZC",
		"37325" : "ZC",
		"38063" : "PB",
		"38079" : "TD",
		"38085" : "QY",
		"38107" : "DC",
		"38116" : "TD",
		"38123" : "YD",
		"38224" : "HG",
		"38241" : "XTC",
		"38271" : "ZC",
		"38415" : "YE",
		"38426" : "KH",
		"38461" : "YD",
		"38463" : "AE",
		"38466" : "PB",
		"38477" : "XJ",
		"38518" : "YT",
		"38551" : "WK",
		"38585" : "ZC",
		"38704" : "XS",
		"38739" : "LJ",
		"38761" : "GJ",
		"38808" : "SQ",
		"39048" : "JG",
		"39049" : "XJ",
		"39052" : "HG",
		"39076" : "CZ",
		"39271" : "XT",
		"39534" : "TD",
		"39552" : "TD",
		"39584" : "PB",
		"39647" : "SB",
		"39730" : "LG",
		"39748" : "TPB",
		"40109" : "ZQ",
		"40479" : "ND",
		"40516" : "HG",
		"40536" : "HG",
		"40583" : "QJ",
		"40765" : "YQ",
		"40784" : "QJ",
		"40840" : "YK",
		"40863" : "QJG"
	};
	function checkCh(ch) {
		var uni = ch.charCodeAt(0);
		if (uni > 40869 || uni < 19968)
			return ch;
		return (MULTIDIFF[uni] ? MULTIDIFF[uni] : (CHNPY.charAt(uni - 19968)));
	}
	function mkRslt(arr) {
		var arrRslt = [""];
		for (var i = 0, len = arr.length; i < len; i++) {
			var str = arr[i];
			var strlen = str.length;
			if (strlen == 1) {
				for (var k = 0; k < arrRslt.length; k++) {
					arrRslt[k] += str;
				}
			} else {
				var tmpArr = arrRslt.slice(0);
				arrRslt = [];
				for (k = 0; k < strlen; k++) {
					var tmp = tmpArr.slice(0);
					for (var j = 0; j < tmp.length; j++) {
						tmp[j] += str.charAt(k);
					}
					arrRslt = arrRslt.concat(tmp);
				}
			}
		}
		return arrRslt;
	}
	var reg_CN = /^[\u4e00-\u9fa5]+$/;
	Ext.apply(QM.lib, {
				// make Pingyin Array from a Chinese String
				isChinese : function(value) {
					return reg_CN.test(value);
				},
				makePy : function(str) {
					if (typeof(str) != "string") {
						return str;
					}
					var arrResult = new Array();
					for (var i = 0, len = str.length; i < len; i++) {
						var ch = str.charAt(i);
						arrResult.push(checkCh(ch));
					}
					var resarr = mkRslt(arrResult);
					return resarr;
				},
				// check whether reg String(OR Pinyin start String) matchs the
				// Chinese String(value)
				checkPy : function(reg, value, cache) {
					var pys;
					if (Ext.isEmpty(value) || Ext.isEmpty(reg)) {
						return false;
					}
					if (cache && cache[value]) {
						pys = cache[value];
					} else if (cache) {
						pys = cache[value] = this.makePy(value);
					} else {
						pys = this.makePy(value);
					}
					if (typeof reg == "string") {
						reg = new RegExp('^' + Ext.escapeRe(reg), 'i');
					}
					for (var i = 0; i < pys.length; i++) {
						if (reg.test(pys[i])) {
							return true;
						}
					}
					return false;
				}
			});
})();

/**
 * QM.plugin.PinyinFilter 为store添加按拼音进行过滤的功能;
 * 注意：该插件可配置给Store对象或者Store的引用对象（因为某些组件内建的Store对象可能是在
 * 组件初始化之后通过数组来生成的，此时无法在配置组件时修改内建Store的行为）；
 * ComboBox组件会自动调用createFilterFn方法进行过滤，为ComboBox配置 plugins:[new
 * QM.plugin.PinyinFilter]即可实现过滤功能
 */
Ext.ns("QM.plugin");
QM.plugin.PinyinFilter = Ext.extend(Object, {
			createFilterFn : function(property, value, anyMatch, caseSensitive) {
				if (Ext.isEmpty(value, false)) {
					return false;
				}
				if (QM.lib.isChinese(value)) {// 中文过滤函数
					var reg = new RegExp(value);
					return function(r) {
						var os = r.data[property];
						return reg.test(os);
					};
				}
				return function(r) {
					var os = r.data[property];
					return QM.lib.checkPy(value, os, this.pyCache);
				};
			},
			init : function(s) {
				if (!(s instanceof Ext.data.Store)) {
					s = s.store;
				}
				s.createFilterFn = this.createFilterFn;// 覆盖原方法
				s.pyCache = {};// 拼音缓存，汉字字符串与其拼音数组的映射
				s.destroy = s.destroy.createInterceptor(function() {
							this.pyCache = null;// store销毁前释放缓存拼音
						}, s)
			}
		});

/**
 * 提供根据字母/中文拼音首字母进行过滤的功能，仅支持前端匹配; 该组件仅支持一次性加载、节点数量不多的树
 * 
 * filter(String value,[String attr],[Node startNode]):void Filter the data by a
 * specific attribute. clear():void show all hidden nodes
 * 
 * config: {ignoreFolder} if false the filter will also filter the folder
 * node,default to true; {clearAction} the action to do for all the nodes while
 * clearing the hidden nodes,acceptable values are
 * 'collapse'、'expand'、undefined,default to undefined 依赖:QM.lib
 * 
 * 1.1 改动： 1.支持中文模糊匹配，输入汉字可以是字符串任意位置
 * 
 * @author chemzqm@gmail.com
 * @version 1.1
 * @since 2010-4-25
 */
Ext.ns('QM.ux')
QM.ux.TreeFilter = function(tree, config) {
	this.tree = tree;
	Ext.apply(this, config || {});
	this.pyCache = {};
	this.matches = [];// the nodes array which mathches the RegExp；
	this.lastQuery = '';
	this.cleared = true;// if cleared is true indecates there's no hidden nodes;
}

QM.ux.TreeFilter.prototype = {
	ignoreFolder : true,
	clearAction : undefined,
	// @public
	filter : function(value, attr, startNode) {
		if (value == this.lastQuery) {
			return;
		}
		value = value.trim();
		this.lastQuery = value;
		if (value.length == 0) {
			this.clear(startNode);
			return;
		} else
			startNode = startNode || this.tree.root;
		var fn = this.getFilterFn(value, attr);
		if (this.isForward(value)) {
			this.filterMatches(fn);
		} else {
			this.filterAll(fn, startNode);
		}
		this.showPaths();
		this.cleared = false;
	},
	// make a filter function,which take node as it's argument when the node
	// passed return true,otherwise false
	getFilterFn : function(value, attr) {
		attr = attr || 'text';
		if (QM.lib.isChinese(value)) {
			var reg = new RegExp(value);
			return function(n) {
				return reg.test(n.attributes[attr]);
			}
		} else {
			return function(n) {
				return QM.lib.checkPy(value, n.attributes[attr], this.pyCache);
			}
		}
	},
	// check whether to do folter on the last mathched nodes
	isForward : function(q) {
		var len = this.lastQuery.length;
		if (len == 0 || this.cleared) {
			return false;
		}
		if ((q.length > len) && (q.substring(0, len) == this.lastQuery)) {
			return true;
		}
		return false;
	},
	// private get the matchs and hide other nodes
	filterAll : function(fn, startNode) {
		var arr = [];
		startNode = startNode || this.tree.root;
		startNode.cascade(function(n) {
					if (!n.leaf) {
						n.expand(false, false);
						if (this.ignoreFolder) {
							n.ui.hide();
							return;
						}
					}
					if (fn.call(this, n)) {
						arr.push(n);
					} else {
						n.ui.hide();
					}
				}, this);
		this.matches = arr;
	},
	// private search match nodes from last matches while hide unmatched nodes
	filterMatches : function(fn) {
		var arr = [];
		Ext.each(this.matches, function(n) {
					if (fn.call(this, n)) {
						arr.push(n);
					} else {
						n.bubble(function(n) {
									n.ui.hide();
								});
					}
				}, this);
		this.matches = arr;
	},
	// show the parentNodes of the matches
	showPaths : function() {
		Ext.each(this.matches, function(n) {
					n.bubble(function(n) {
								n.ui.show();
							});
				})
	},
	hasMatch : function() {
		return !Ext.isEmpty(this.matches);
	},
	// @public
	clear : function(startNode) {
		if (this.cleared === true) {
			return;
		}
		startNode = startNode || this.tree.root;
		startNode.cascade(function(n) {
					n.ui.show();
					if (this.clearAction) {
						n[this.clearAction](true, true);
					}
				});
		this.cleared = true;
	},
	isCleared : function() {
		return this.cleared;
	},
	destroy : function() {
		Ext.destroyMembers(this, 'pyCache', 'matches');
	}
}

/**
 * 多功能树过滤插件，为TreePanel的tbar添加一个具备拼音和汉字双重过滤功能的textfield
 * 
 * 依赖：QM.ux.TreeFilter、QM.lib
 * 
 * 注意：tbar是无法动态创建的，请确保构造树的时候配置了tbar属性
 * 
 */
QM.plugin.MutilTreeFilter = Ext.extend(Object, {
			index : 0,// 输入域插入tbar的位置索引
			clearAction : 'expand',// 树节点全部显示时状态，默认全部展开
			width : 60,// 输入域宽度
			enableButtons : true,// 是否添加收缩和展开按钮
			ignoreFolder : true,// 过滤时忽略父节点

			constructor : function(config) {
				Ext.apply(this, config);
			},
			init : function(tree) {
				tree.on('afterrender', this.onRender, this);
				this.filter = new QM.ux.TreeFilter(tree, {
							clearAction : this.clearAction,
							ignoreFolder : this.ignoreFolder
						});
			},
			onRender : function(tree) {
				var tbar = tree.getTopToolbar();
				var field = new Ext.form.TextField({
							width : this.width,
							emptyText : '快速检索',
							enableKeyEvents : true,
							listeners : {
								keyup : {// 添加键盘点击监听
									fn : function(t, e) {
										this.filter.filter(t.getValue());
									},
									buffer : 350,
									scope : this
								}
							}
						});
				tbar.insert(this.index, field);
				tbar.doLayout();
			}
		});
Ext.preg('multifilter', QM.plugin.MutilTreeFilter);
