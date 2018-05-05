/**
 * 用于扩展一些常用的ExtJs，以简化大量重复性的代码
 * 
 * @author 陈峰 cf0666@gmail.com
 */
Ext.ns('MT');
/**
 * 扩展ComboBox，实现模糊查询
 * 
 * @class MT.ComboBox
 * @extends Ext.form.ComboBox
 */
MT.ComboBox = Ext.extend(Ext.form.ComboBox, {
			doQuery : function(c, b) {
				c = Ext.isEmpty(c) ? "" : c;
				var a = {
					query : c,
					forceAll : b,
					combo : this,
					cancel : false
				};
				if (this.fireEvent("beforequery", a) === false || a.cancel) {
					return false
				}
				c = a.query;
				b = a.forceAll;
				if (b === true || (c.length >= this.minChars)) {
					if (this.lastQuery !== c) {
						this.lastQuery = c;
						if (this.mode == "local") {
							this.selectedIndex = -1;
							if (b) {
								this.store.clearFilter()
							} else {
								this.store.filter(this.displayField, c, true,
										false);
							}
							this.onLoad()
						} else {
							this.store.baseParams[this.queryParam] = c;
							this.store.load({
										params : this.getParams(c)
									});
							this.expand()
						}
					} else {
						this.selectedIndex = -1;
						this.onLoad()
					}
				}
			}
		});
Ext.reg('mtcombo', MT.ComboBox);
/**
 * 扩展ComboBox，数据字典COMBOBOX
 * 
 * @class MT.DicComboBox
 * @extends Ext.form.ComboBox { fieldLabel : '售后单据状态', name :
 *          'Q_ssStatusId_L_EQ', flex : 1, xtype : 'mtdiccombo', itemKey :
 *          '11111', editable : false, hiddenName : 'Q_ssStatusId_L_EQ' mValue :
 *          qwe },
 * 
 */
MT.DicComboBox = Ext.extend(Ext.form.ComboBox, {
	/**
	 * 数据字典Key
	 * 
	 * @type
	 */
	itemKey : null,

	constructor : function(_cfg) {
		Ext.apply(this, _cfg);
		var isDisplayItemName = this.isDisplayItemName;

		// var itemKey = eval(this.itemKey);
		// //alert(itemKey);
		// var searchData = new Ext.data.Record.create([ // 创建数据
		// {
		// name : 'itemId',
		// type : 'int'
		// }, {
		// name : 'itemName',
		// type : 'string'
		// }]);
		// var mystore = new Ext.data.ArrayStore({
		// fields : ['itemId', 'itemName']
		// });
		// for (var i = 0; i < itemKey.size(); i++) {
		// mystore.insert(i, new searchData({
		// itemId : itemKey.getKey(i),
		// itemName : itemKey.get(itemKey.getKey(i))
		// }));
		// };
		// for (var i = 0; i < itemKey.size(); i++) {
		// // alert(itemKey.getKey(i))
		// itemsValue += ' [' + itemKey.getKey(i) + ','
		// + itemKey.get(itemKey.getKey(i)) + '],';
		// }
		// this.data = [[1, '2']];
		// this.store = mystore;
		var combox = this;
		var itemKey = this.itemKey;
		MT.DicComboBox.superclass.constructor.call(this, {
			triggerAction : 'all',
			loadingText : '加载中...',
			// mode : 'local',//全部标记为本地数据
			// store : combox.store,
			store : new Ext.data.ArrayStore({
				autoLoad : true,

				baseParams : {
					itemKey : combox.itemKey
				},
				url : __ctxPath + '/system/loadKeyDictionary.do',
				fields : ['itemId', 'itemName'],
				// remoteSort : 'itemId',
				sortInfo : {
					field : 'itemId',
					direction : 'ASC'
				},

				listeners : {
					load : function() {
						for (var i = 0; i < combox.getStore().getCount(); i++) {
							if (combox.getStore().getAt(i).data['itemId'] == combox
									.getValue()) {
								combox
										.setValue(combox.getStore().getAt(i).data['itemName']);
								break;
							}
						}
					}
				}
			}),
			displayField : 'itemName',
			valueField : isDisplayItemName ? 'itemName' : 'itemId'
		});
	}
});
Ext.reg('mtdiccombo', MT.DicComboBox);
/*
 * 数据字典 本地dicmap 取数据
 * 
 */
MT.DicComboBoxLocal = Ext.extend(Ext.form.ComboBox, {
			itemKey : null,
			setValue : function(dispText) {
				MT.DicComboBoxLocal.superclass.setValue.call(this, dispText);
			},
            getValue : function() {
                
                MT.DicComboBoxLocal.superclass.getValue.call(this);
            },
			constructor : function(_cfg) {
				Ext.apply(this, _cfg);
				var isDisplayItemName = this.isDisplayItemName;
                var searchData = new Ext.data.Record.create([ // 创建数据
                {
                            name : 'itemId',
                            type : 'int'
                        }, {
                            name : 'itemName',
                            type : 'string'
                        }]);
                var mystore = new Ext.data.ArrayStore({
                            fields : ['itemId', 'itemName']
                        });
                if(this.itemKey!=undefined&&this.itemKey!=null&&this.itemKey!=""){       
                var itemKey = eval(this.itemKey);
                for (var i = 0; i < itemKey.size(); i++) {
                    mystore.insert(i, new searchData({
                                        itemId : itemKey.getKey(i),
                                        itemName : itemKey.get(itemKey
                                                .getKey(i))
                                    }));
                };
                }
				this.store = mystore;
				var combox = this;
				MT.DicComboBoxLocal.superclass.constructor.call(this, {
							triggerAction : 'all',
							loadingText : '加载中...',
							mode : 'local',// 全部标记为本地数据
							store : combox.store,
							displayField : 'itemName',
							valueField : isDisplayItemName
									? 'itemName'
									: 'itemId'
						});
			}
		});
Ext.reg('mtdiccombolocal', MT.DicComboBoxLocal);

// 多先下拉 数据字典
Ext.form.MultiComboBox = Ext.extend(Ext.form.TriggerField, {
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "24",
		autocomplete : "off"
	},
	listClass : '',
	selectedClass : 'x-combo-selected',
	triggerClass : 'x-form-arrow-trigger',
	shadow : 'sides',
	listAlign : 'tl-bl?',
	maxHeight : 300,
	triggerAction : 'query',
	minChars : 4,
	typeAhead : false,
	queryDelay : 500,
	pageSize : 0,
	selectOnFocus : false,
	queryParam : 'query',
	loadingText : 'Loading...',
	resizable : false,
	handleHeight : 8,
	editable : true,
	allQuery : '',
	mode : 'remote',
	minListWidth : 70,
	forceSelection : false,
	typeAheadDelay : 250,
	displaySeparator : ';',
	valueSeparator : ',',
	lazyInit : true,
	itemKey : null,

	constructor : function(_cfg) {
		Ext.apply(this, _cfg);
		var combox = this;
		Ext.form.MultiComboBox.superclass.constructor.call(this, {
					triggerAction : 'all'

				});
	},
	initComponent : function() {
		Ext.form.ComboBox.superclass.initComponent.call(this);
		this.addEvents('expand', 'collapse', 'beforeselect', 'select',
				'beforequery');
		if (this.transform) {
			this.allowDomMove = false;
			var s = Ext.getDom(this.transform);
			if (!this.hiddenName) {
				this.hiddenName = s.name;
			}
			if (!this.store) {
				this.mode = 'local';
				var d = [], opts = s.options;
				for (var i = 0, len = opts.length; i < len; i++) {
					var o = opts[i];
					var value = (Ext.isIE
							? o.getAttributeNode('value').specified
							: o.hasAttribute('value')) ? o.value : o.text;
					if (o.selected) {
						this.value = value;
					}
					d.push([value, o.text]);
				}
				this.store = new Ext.data.SimpleStore({
							'id' : 0,
							fields : ['value', 'text'],
							data : d
						});
				this.valueField = 'value';
				this.displayField = 'text';
			}
			s.name = Ext.id(); // wipe out the name in case somewhere else they
			// have a reference
			if (!this.lazyRender) {
				this.target = true;
				this.el = Ext.DomHelper.insertBefore(s, this.autoCreate
								|| this.defaultAutoCreate);
				Ext.removeNode(s); // remove it
				this.render(this.el.parentNode);
			} else {
				Ext.removeNode(s); // remove it
			}

		}
		this.selectedIndex = -1;
		if (this.mode == 'local') {
			if (this.initialConfig.queryDelay === undefined) {
				this.queryDelay = 10;
			}
			if (this.initialConfig.minChars === undefined) {
				this.minChars = 0;
			}
		}
	},

	// private
	onRender : function(ct, position) {
		Ext.form.ComboBox.superclass.onRender.call(this, ct, position);
		var disValue = "";
		if (this.hiddenName) {
			this.hiddenField = this.el.insertSibling({
						tag : 'input',
						type : 'hidden',
						name : this.hiddenName,
						id : (this.hiddenId || this.hiddenName)
					}, 'before', true);
			var hvalue = this.hiddenValue !== undefined
					? this.hiddenValue
					: this.value !== undefined ? this.value : '';
			var hvalueArray = hvalue.split(this.valueSeparator);

			for (var i = 0; i < this.store.data.length; i++) {
				var r = this.store.getAt(i);
				var newValue = r.data[this.displayField];
				var v = r.data[this.valueField];
				for (var j = 0; j < hvalueArray.length; j++) {
					if (hvalueArray[j] == v) {
						disValue += newValue + this.displaySeparator;
					}
				}

			}
			this.hiddenField.value = this.hiddenValue !== undefined
					? this.hiddenValue
					: this.value !== undefined ? this.value : '';
			this.el.dom.removeAttribute('name');
		}
		if (Ext.isGecko) {
			this.el.dom.setAttribute('autocomplete', 'off');
		}

		if (!this.lazyInit) {
			this.initList();
		} else {
			this.on('focus', this.initList, this, {
						single : true
					});
		}

		if (!this.editable) {
			this.editable = true;
			this.setEditable(false);
		}
		this.setValue(disValue);
	},

	initList : function() {
		if (!this.list) {
			var cls = 'x-combo-list';

			this.list = new Ext.Layer({
						shadow : this.shadow,
						cls : [cls, this.listClass].join(' '),
						constrain : false
					});

			var lw = this.listWidth
					|| Math.max(this.wrap.getWidth(), this.minListWidth);
			this.list.setWidth(lw);
			this.list.swallowEvent('mousewheel');
			this.assetHeight = 0;

			if (this.title) {
				this.header = this.list.createChild({
							cls : cls + '-hd',
							html : this.title
						});
				this.assetHeight += this.header.getHeight();
			}

			this.innerList = this.list.createChild({
						cls : cls + '-inner'
					});
			this.innerList.on('mouseover', this.onViewOver, this);
			this.innerList.on('mousemove', this.onViewMove, this);
			this.innerList.setWidth(lw - this.list.getFrameWidth('lr'))

			if (this.pageSize) {
				this.footer = this.list.createChild({
							cls : cls + '-ft'
						});
				this.pageTb = new Ext.PagingToolbar({
							store : this.store,
							pageSize : this.pageSize,
							renderTo : this.footer
						});
				this.assetHeight += this.footer.getHeight();
			}

			if (!this.tpl) {
				this.tpl = '<tpl for="."><div class="' + cls
						+ '-item"><span class="unchecked" id="checkBox_{'
						+ this.displayField
						+ '}"+ width="20">&nbsp;&nbsp;&nbsp;&nbsp;</span>{'
						+ this.displayField + '}</div></tpl>';
			}
			this.view = new Ext.DataView({
						applyTo : this.innerList,
						tpl : this.tpl,
						singleSelect : true,
						selectedClass : this.selectedClass,
						itemSelector : this.itemSelector || '.' + cls + '-item'
					});

			this.view.on('click', this.onViewClick, this);

			this.bindStore(this.store, true);

			if (this.resizable) {
				this.resizer = new Ext.Resizable(this.list, {
							pinned : true,
							handles : 'se'
						});
				this.resizer.on('resize', function(r, w, h) {
							this.maxHeight = h - this.handleHeight
									- this.list.getFrameWidth('tb')
									- this.assetHeight;
							this.listWidth = w;
							this.innerList.setWidth(w
									- this.list.getFrameWidth('lr'));
							this.restrictHeight();
						}, this);
				this[this.pageSize ? 'footer' : 'innerList'].setStyle(
						'margin-bottom', this.handleHeight + 'px');
			}
		}
	},

	bindStore : function(store, initial) {
		if (this.store && !initial) {
			this.store.un('beforeload', this.onBeforeLoad, this);
			this.store.un('load', this.onLoad, this);
			this.store.un('loadexception', this.collapse, this);
			if (!store) {
				this.store = null;
				if (this.view) {
					this.view.setStore(null);
				}
			}
		}
		if (store) {
			this.store = Ext.StoreMgr.lookup(store);

			this.store.on('beforeload', this.onBeforeLoad, this);
			this.store.on('load', this.onLoad, this);
			this.store.on('loadexception', this.collapse, this);

			if (this.view) {
				this.view.setStore(store);
			}
		}
	},

	// private
	initEvents : function() {
		Ext.form.ComboBox.superclass.initEvents.call(this);

		this.keyNav = new Ext.KeyNav(this.el, {
					"up" : function(e) {
						this.inKeyMode = true;
						this.selectPrev();
					},

					"down" : function(e) {
						if (!this.isExpanded()) {
							this.onTriggerClick();
						} else {
							this.inKeyMode = true;
							this.selectNext();
						}
					},

					"enter" : function(e) {
						this.onViewClick();
						// return true;
					},

					"esc" : function(e) {
						this.collapse();
					},

					"tab" : function(e) {
						this.onViewClick(false);
						return true;
					},

					scope : this,

					doRelay : function(foo, bar, hname) {
						if (hname == 'down' || this.scope.isExpanded()) {
							return Ext.KeyNav.prototype.doRelay.apply(this,
									arguments);
						}
						return true;
					},

					forceKeyDown : true
				});
		this.queryDelay = Math.max(this.queryDelay || 10, this.mode == 'local'
						? 10
						: 250);
		this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
		if (this.typeAhead) {
			this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
		}
		if (this.editable !== false) {
			this.el.on("keyup", this.onKeyUp, this);
		}
		if (this.forceSelection) {
			this.on('blur', this.doForce, this);
		}
	},

	onDestroy : function() {
		if (this.view) {
			this.view.el.removeAllListeners();
			this.view.el.remove();
			this.view.purgeListeners();
		}
		if (this.list) {
			this.list.destroy();
		}
		this.bindStore(null);
		Ext.form.ComboBox.superclass.onDestroy.call(this);
	},

	// private
	fireKey : function(e) {
		if (e.isNavKeyPress() && !this.list.isVisible()) {
			this.fireEvent("specialkey", this, e);
		}
	},

	// private
	onResize : function(w, h) {
		Ext.form.ComboBox.superclass.onResize.apply(this, arguments);
		if (this.list && this.listWidth === undefined) {
			var lw = Math.max(w, this.minListWidth);
			this.list.setWidth(lw);
			this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
		}
	},

	// private
	onDisable : function() {
		Ext.form.ComboBox.superclass.onDisable.apply(this, arguments);
		if (this.hiddenField) {
			this.hiddenField.disabled = this.disabled;
		}
	},
	setEditable : function(value) {
		if (value == this.editable) {
			return;
		}
		this.editable = value;
		if (!value) {
			this.el.dom.setAttribute('readOnly', true);
			this.el.on('mousedown', this.onTriggerClick, this);
			this.el.addClass('x-combo-noedit');
		} else {
			this.el.dom.setAttribute('readOnly', false);
			this.el.un('mousedown', this.onTriggerClick, this);
			this.el.removeClass('x-combo-noedit');
		}
	},

	// private
	onBeforeLoad : function() {
		if (!this.hasFocus) {
			return;
		}
		this.innerList.update(this.loadingText
				? '<div class="loading-indicator">' + this.loadingText
						+ '</div>'
				: '');
		this.restrictHeight();
		this.selectedIndex = -1;
	},

	// private
	onLoad : function() {
		if (!this.hasFocus) {
			return;
		}
		if (this.store.getCount() > 0) {
			this.expand();
			this.restrictHeight();
			if (this.lastQuery == this.allQuery) {
				if (this.editable) {
					this.el.dom.select();
				}
				if (!this.selectByValue(this.value, true)) {
					this.select(0, true);
				}
			} else {
				this.selectNext();
				if (this.typeAhead && this.lastKey != Ext.EventObject.BACKSPACE
						&& this.lastKey != Ext.EventObject.DELETE) {
					this.taTask.delay(this.typeAheadDelay);
				}
			}
		} else {
			this.onEmptyResults();
		}
	},

	// private
	onTypeAhead : function() {
		if (this.store.getCount() > 0) {
			var r = this.store.getAt(0);
			var newValue = r.data[this.displayField];
			var len = newValue.length;
			var selStart = this.getRawValue().length;
			if (selStart != len) {
				this.setRawValue(newValue);
				this.selectText(selStart, newValue.length);
			}
		}
	},
	// private
	onSelect : function(record, index) {
		if (this.fireEvent('beforeselect', this, record, index) !== false) {
			var r = this.store.getAt(index);
			var newValue = r.data[this.displayField];
			var check = document.getElementById("checkBox_" + newValue);
			if (check.className == "checked") {
				check.className = "unchecked"
			} else {
				check.className = "checked"
			}
			var value = "";
			var hiddenValue = "";
			for (var i = 0; i < this.store.data.length; i++) {
				var r = this.store.getAt(i);
				newValue = r.data[this.displayField];
				check = document.getElementById("checkBox_" + newValue);
				if (check.className == "checked") {
					value += r.data[this.displayField] + this.displaySeparator;
					hiddenValue += r.data[this.valueField]
							+ this.valueSeparator;
				}
			}
			if (value.length > 1) {
				value = value.substring(0, value.length
								- this.displaySeparator.length);
			}
			if (hiddenValue.length > 1) {
				hiddenValue = hiddenValue.substring(0, value.length
								- this.valueSeparator.length);
			}
			this.setValue(value);
			this.hiddenField.value = hiddenValue;
			this.fireEvent('select', this, record, index);
		}
	},
	getValue : function() {
		if (this.valueField) {
			return typeof this.value != 'undefined' ? this.value : '';
		} else {
			return Ext.form.ComboBox.superclass.getValue.call(this);
		}
	},

	/**
	 * Clears any text/value currently set in the field
	 */
	clearValue : function() {
		if (this.hiddenField) {
			this.hiddenField.value = '';
		}
		this.setRawValue('');
		this.lastSelectionText = '';
		this.applyEmptyText();
	},
	setValue : function(v) {
		var text = v;
		if (this.valueField) {
			var r = this.findRecord(this.valueField, v);
			if (r) {
				text = r.data[this.displayField];
			} else if (this.valueNotFoundText !== undefined) {
				text = this.valueNotFoundText;
			}
		}
		this.lastSelectionText = text;
		Ext.form.ComboBox.superclass.setValue.call(this, text);
		this.value = v;
	},

	// private
	findRecord : function(prop, value) {
		var record;
		if (this.store.getCount() > 0) {
			this.store.each(function(r) {
						if (r.data[prop] == value) {
							record = r;
							return false;
						}
					});
		}
		return record;
	},

	// private
	onViewMove : function(e, t) {
		this.inKeyMode = false;
	},

	// private
	onViewOver : function(e, t) {
		if (this.inKeyMode) { // prevent key nav and mouse over conflicts
			return;
		}
		var item = this.view.findItemFromChild(t);
		if (item) {
			var index = this.view.indexOf(item);
			this.select(index, false);
		}
	},

	// private
	onViewClick : function(doFocus) {
		var index = this.view.getSelectedIndexes()[0];
		var r = this.store.getAt(index);
		if (r) {
			this.onSelect(r, index);
		}
		if (doFocus !== false) {
			this.el.focus();
		}
	},

	// private
	restrictHeight : function() {
		this.innerList.dom.style.height = '';
		var inner = this.innerList.dom;
		var fw = this.list.getFrameWidth('tb');
		var h = Math.max(inner.clientHeight, inner.offsetHeight,
				inner.scrollHeight);
		this.innerList.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
		this.list.beginUpdate();
		this.list.setHeight(this.innerList.getHeight() + fw
				+ (this.resizable ? this.handleHeight : 0) + this.assetHeight);
		this.list.alignTo(this.el, this.listAlign);
		this.list.endUpdate();
	},

	// private
	onEmptyResults : function() {
		this.collapse();
	},

	/**
	 * Returns true if the dropdown list is expanded, else false.
	 */
	isExpanded : function() {
		return this.list && this.list.isVisible();
	},
	selectByValue : function(v, scrollIntoView) {
		if (v !== undefined && v !== null) {
			var r = this.findRecord(this.valueField || this.displayField, v);
			if (r) {
				this.select(this.store.indexOf(r), scrollIntoView);
				return true;
			}
		}
		return false;
	},
	select : function(index, scrollIntoView) {

		this.selectedIndex = index;
		this.view.select(index);
		if (scrollIntoView !== false) {
			var el = this.view.getNode(index);
			if (el) {
				this.innerList.scrollChildIntoView(el, false);
			}
		}
	},

	// private
	selectNext : function() {
		var ct = this.store.getCount();
		if (ct > 0) {
			if (this.selectedIndex == -1) {
				this.select(0);
			} else if (this.selectedIndex < ct - 1) {
				this.select(this.selectedIndex + 1);
			}
		}
	},

	// private
	selectPrev : function() {
		var ct = this.store.getCount();
		if (ct > 0) {
			if (this.selectedIndex == -1) {
				this.select(0);
			} else if (this.selectedIndex != 0) {
				this.select(this.selectedIndex - 1);
			}
		}
	},

	// private
	onKeyUp : function(e) {
		if (this.editable !== false && !e.isSpecialKey()) {
			this.lastKey = e.getKey();
			this.dqTask.delay(this.queryDelay);
		}
	},

	// private
	validateBlur : function() {
		return !this.list || !this.list.isVisible();
	},

	// private
	initQuery : function() {
		this.doQuery(this.getRawValue());
	},

	// private
	doForce : function() {
		if (this.el.dom.value.length > 0) {
			this.el.dom.value = this.lastSelectionText === undefined
					? ''
					: this.lastSelectionText;
			this.applyEmptyText();
		}
	},
	doQuery : function(q, forceAll) {
		if (q === undefined || q === null) {
			q = '';
		}
		var qe = {
			query : q,
			forceAll : forceAll,
			combo : this,
			cancel : false
		};
		if (this.fireEvent('beforequery', qe) === false || qe.cancel) {
			return false;
		}
		q = qe.query;
		forceAll = qe.forceAll;
		if (forceAll === true || (q.length >= this.minChars)) {
			if (this.lastQuery !== q) {
				this.lastQuery = q;
				if (this.mode == 'local') {
					this.selectedIndex = -1;
					if (forceAll) {
						this.store.clearFilter();
					} else {
						this.store.filter(this.displayField, q);
					}
					this.onLoad();
				} else {
					this.store.baseParams[this.queryParam] = q;
					this.store.load({
								params : this.getParams(q)
							});
					this.expand();
				}
			} else {
				this.selectedIndex = -1;
				this.onLoad();
			}
		}
	},

	// private
	getParams : function(q) {
		var p = {};
		// p[this.queryParam] = q;
		if (this.pageSize) {
			p.start = 0;
			p.limit = this.pageSize;
		}
		return p;
	},
	/**
	 * Hides the dropdown list if it is currently expanded. Fires the 'collapse'
	 * event on completion.
	 */
	collapse : function() {
		if (!this.isExpanded()) {
			return;
		}
		this.list.hide();
		Ext.getDoc().un('mousewheel', this.collapseIf, this);
		Ext.getDoc().un('mousedown', this.collapseIf, this);
		this.fireEvent('collapse', this);
	},
	// private
	collapseIf : function(e) {
		if (!e.within(this.wrap) && !e.within(this.list)) {
			this.collapse();
		}
	},

	/**
	 * Expands the dropdown list if it is currently hidden. Fires the 'expand'
	 * event on completion.
	 */
	expand : function() {
		if (this.isExpanded() || !this.hasFocus) {
			return;
		}
		this.list.alignTo(this.wrap, this.listAlign);
		var hvalueArray = this.hiddenField.value.split(this.valueSeparator);
		for (var i = 0; i < this.store.data.length; i++) {
			var r = this.store.getAt(i);
			var newValue = r.data[this.displayField];
			var v = r.data[this.valueField];
			for (var j = 0; j < hvalueArray.length; j++) {
				if (hvalueArray[j] == v) {
					document.getElementById("checkBox_" + newValue).className = "checked";
				}
			}

		}
		this.list.show();
		Ext.getDoc().on('mousewheel', this.collapseIf, this);
		Ext.getDoc().on('mousedown', this.collapseIf, this);
		this.fireEvent('expand', this);
	},

	// private
	// Implements the default empty TriggerField.onTriggerClick function
	onTriggerClick : function() {
		if (this.disabled) {
			return;
		}
		if (this.isExpanded()) {
			this.collapse();
			this.el.focus();
		} else {
			this.onFocus({});
			if (this.triggerAction == 'all') {
				this.doQuery(this.allQuery, true);
			} else {
				this.doQuery(this.getRawValue());
			}
			this.el.focus();
		}
	}
});
Ext.reg('multicombo', Ext.form.MultiComboBox);
function $postStart(conf) {
	Ext.Msg.confirm('信息确认', '您确认要启用所选记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : conf.url,
								params : {
									ids : conf.ids
								},
								method : 'POST',
								success : function(response, options) {
									Ext.ux.Toast.msg('操作信息', '成功启用该记录！');
									if (conf.callback) {
										conf.callback.call(this);
										return;
									}

									if (conf.noReload) { // true为不需要自动加载数据
										var rows = conf.grid
												.getSelectionModel()
												.getSelections();// 获取所选行数
										for (var i = 0; i < rows.length; i++) {
											conf.grid.getStore()
													.remove(rows[i]); // 执行删除
										}
									} else {// 自动加载数据
										if (conf.grid) {
											conf.grid.getStore().reload();
										}
									}
								},
								failure : function(response, options) {
									Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
								}
							});
				}
			});
}
function $postLogOut(conf) {
	Ext.Msg.confirm('信息确认', '您确认要注销所选记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : conf.url,
								params : {
									ids : conf.ids
								},
								method : 'POST',
								success : function(response, options) {
									Ext.ux.Toast.msg('操作信息', '成功注销该记录！');
									if (conf.callback) {
										conf.callback.call(this);
										return;
									}

									if (conf.noReload) { // true为不需要自动加载数据
										var rows = conf.grid
												.getSelectionModel()
												.getSelections();// 获取所选行数
										for (var i = 0; i < rows.length; i++) {
											conf.grid.getStore()
													.remove(rows[i]); // 执行删除
										}
									} else {// 自动加载数据
										if (conf.grid) {
											conf.grid.getStore().reload();
										}
									}
								},
								failure : function(response, options) {
									Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
								}
							});
				}
			});
}
/**
 * 
 * @param {}
 *            conf
 */
function $startGridRs(conf) {
	var ids = $getGdSelectedIds(conf.grid, conf.idName);
	if (ids.length == 0) {
		Ext.ux.Toast.msg("操作信息", "请选择要启动的记录！");
		return;
	}
	var params = {
		url : conf.url,
		ids : ids,
		grid : conf.grid,
		noReload : conf.noReload
	};
	$postStart(params);
}
/**
 * 
 * @param {}
 *            conf
 */
function $gridRs(conf) {
	var ids = $getGdSelectedIds(conf.grid, conf.idName);
	if (ids.length == 0) {
		Ext.ux.Toast.msg("操作信息", conf.msgNull);
		return;
	}
	var params = {
		url : conf.url,
		ids : ids,
		grid : conf.grid,
		msgTip : conf.msgTip,
		msgSuccess : conf.msgSuccess,
		mstFailure : conf.mstFailure,
		callback : conf.callback,
		noReload : conf.noReload
	};
	$postSubmit(params);
}
function $postSubmit(conf) {
	Ext.Msg.confirm('信息确认', conf.msgTip, function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : conf.url,
								params : {
									ids : conf.ids
								},
								method : 'POST',
								success : function(response, options) {
									Ext.ux.Toast.msg('操作信息', conf.msgSuccess);
									if (conf.callback) {
										conf.callback.call(this, response);
										return;
									}

									if (conf.noReload) { // true为不需要自动加载数据
										var rows = conf.grid
												.getSelectionModel()
												.getSelections();// 获取所选行数
										for (var i = 0; i < rows.length; i++) {
											conf.grid.getStore()
													.remove(rows[i]); // 执行删除
										}
									} else {// 自动加载数据
										if (conf.grid) {
											conf.grid.getStore().reload();
										}
									}
								},
								failure : function(response, options) {
									Ext.ux.Toast.msg('操作信息', conf.msgFailure);
								}
							});
				}
			});
}
/**
 * 提交表单
 * 
 * @param {}
 *            conf
 */
function $postSubForm(conf) {
	if (conf.formPanel.getForm().isValid()) {
		var scope = conf.scope ? conf.scope : this;
		conf.formPanel.getForm().submit({
					scope : scope,
					url : conf.url,
					method : 'post',
					params : conf.params,
					waitMsg : '正在提交数据...',
					success : function(fp, action) {
						Ext.ux.Toast.msg('操作信息', conf.msgSuccess);
						if (conf.callback) {
							conf.callback.call(scope, fp, action);
						}
					},
					failure : function(fp, action) {
						Ext.MessageBox.show({
									title : '操作信息',
									msg : conf.msgFailure,
									buttons : Ext.MessageBox.OK,
									icon : 'ext-mb-error'
								});
						if (conf.callback) {
							conf.callback.call(scope);
						}
					}
				});
	}
}
MT.AdvancedSearchWin = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.operatorSignComboData = [['', '无'], ['&', '并且'], ['||', '或者']];
		this.leftBracketsComboData = [['', '无'], ['(', '(']];
		this.rightBracketsComboData = [['', '无'], [')', ')']];
		this.relationSignComboData = [['>', '大于'], ['>=', '大于等于'], ['=', '等于'],
				['<>', '不等于'], ['<', '小于'], ['<=', '小于等于'], ['in', '包含'],
				['is null', '为空'], ['is not null', '不为空']];
		this.fieldnameComboData = this.fieldData;
		this.initUIComponents();

		MT.AdvancedSearchWin.superclass.constructor.call(this, {
					maximizable : true,
					items : [this.formPanel, this.returnPanel],
					modal : true,
					plain : true,
					layout : 'border',
					width : 800,
					height : 550,
					buttonAlign : 'center',
					buttons : [{
								text : __search,
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : __reset,
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}],
					border : false
				}

		);
	},
	// 初始化组件
	initUIComponents : function() {
		var columns = [{
					header : '关系运算符',
					dataIndex : 'operatorsign',
					sortable : false,
					editor : new Ext.form.ComboBox({
								store : new Ext.data.SimpleStore({
											fields : ['value', 'text'],
											data : this.operatorSignComboData
										}),
								mode : 'local',
								triggerAction : 'all',
								valueFiled : 'value',
								displayField : 'text',
								editable : false
							}),
					renderer : function(value, cellmeta, record) {
						var items = this.editor.getStore().data.items
						for (var i = 0; i < items.length; i++) {
							if (items[i].data.text == value) {
								record.data.operatorsignValue = items[i].data.value;
							}
						}
						return value;
					}
				}, {
					header : '括号',
					dataIndex : 'leftbrackets',
					sortable : false,
					editor : new Ext.form.ComboBox({
								store : new Ext.data.SimpleStore({
											fields : ['value', 'text'],
											data : this.leftBracketsComboData
										}),
								mode : 'local',
								valueFiled : 'value',
								displayField : 'text',
								triggerAction : 'all',
								editable : false
							})
				}, {
					header : '查询条件列',
					dataIndex : 'fieldname',
					sortable : false,
					editor : new Ext.form.ComboBox({
								store : new Ext.data.SimpleStore({
											fields : ['field', 'name', 'type',
													'code'],
											data : this.fieldnameComboData
										}),
								valueField : 'field',
								displayField : 'name',
								mode : 'local',
								triggerAction : 'all'
							}),
					renderer : function(value, cellmeta, record) {
						var items = this.editor.getStore().data.items
						for (var i = 0; i < items.length; i++) {
							if (items[i].data.field == value) {
								record.data.type = items[i].data.type;
								record.data.code = items[i].data.code;
								record.data.fieldname = items[i].data.name;
								record.data.field = items[i].data.field;
								value = items[i].data.name
								return value;
							}
						}
						return value;
					}
				}, {
					header : '逻辑运算符',
					dataIndex : 'relationsign',
					sortable : false,
					editor : new Ext.form.ComboBox({
								store : new Ext.data.SimpleStore({
											fields : ['value', 'text'],
											data : this.relationSignComboData
										}),
								mode : 'local',
								valueFiled : 'value',
								displayField : 'text',
								triggerAction : 'all'
							}),
					renderer : function(value, cellmeta, record) {
						var items = this.editor.getStore().data.items
						for (var i = 0; i < items.length; i++) {
							if (items[i].data.text == value) {
								record.data.relationsign = items[i].data.value;
							}
						}
						return value;
					}
				}, {
					header : '查询条件值',
					dataIndex : 'expressvalue',
					sortable : false,
					renderer : function(value, cellmeta, record) {
						var svalue = '';
						var showValue = '';
						switch (record.data.type) {
							case 'date' :
								svalue = value.format('y-m-d');
								showValue = value.format('y-m-d');
								break;
							case 'combo' :
								var items = this.editor.getStore().data.items
								for (var i = 0; i < items.length; i++) {
									if (items[i].data.itemId == value) {
										svalue = items[i].data.itemId;
										showValue = items[i].data.itemName;
									}
								}
								break;
							default :
								svalue = value;
								showValue = value;
								break
						}
						record.data.value = svalue;
						return showValue;
					}
				}, {
					header : '括号',
					dataIndex : 'rightbrackets',
					sortable : false,
					editor : new Ext.form.ComboBox({
								store : new Ext.data.SimpleStore({
											fields : ['value', 'text'],
											data : this.rightBracketsComboData
										}),
								mode : 'local',
								triggerAction : 'all',
								valueFiled : 'value',
								displayField : 'text',
								editable : false
							})
				}, new Ext.ux.grid.RowActions({
							header : '操作',
							width : 110,
							actions : [{
										iconCls : 'btn-superior',
										qtip : '移至顶部'
									}, {
										iconCls : 'btn-subordinate',
										qtip : '移至底部'
									}, {
										iconCls : 'btn-up',
										qtip : '向上移动一行'
									}, {
										iconCls : 'btn-last',
										qtip : '向下移动一行'
									}, {
										iconCls : 'btn-cancel',
										qtip : '删除当前行'
									}],
							listeners : {
								scope : this,
								'action' : this.onRowAction
							}
						})]
		this.formPanel = new HT.EditorGridPanel({
					region : 'center',
					layout : 'fit',
					id : 'searchAdvanceGrid',
					rowActions : true,
					autoScroll : true,
					showPaging : false,// 是否分页显示
					clicksToEdit : 1,
					showSm : false,
					enableHdMenu : false,
					stripeRows : true, // 隔行变色，区分表格行
					collapsible : false, // 是否在右上角显示收缩按钮
					animCollapse : true, // 表示收缩（闭合）面板时，显示动画效果
					trackMouseOver : true, // 鼠标在行上移动时显示高亮
					enableColumnMove : false, // 禁止用户拖动表头
					columns : columns,
					viewConfig : {
						forceFit : true
					},
					tbar : ['->', {
						text : '添加',
						iconCls : 'btn-add',
						handler : function() {
							var store = Ext.getCmp('searchAdvanceGrid')
									.getStore();
							var recordType = store.recordType;
							store.add(new recordType({
										operatorsign : '',
										operatorsignValue : '',
										leftbrackets : '',
										fieldname : '',
										relationsign : '',
										expressvalue : '',
										rightbrackets : '',
										type : '',
										code : '',
										value : '',
										field : ''
									}));
						}
					}],
					fields : [{}, 'operatorsign', 'operatorsignValue',
							'leftbrackets', 'fieldname', 'relationsign',
							'expressvalue', 'rightbrackets', 'type', 'code',
							'value', 'field'],
					url : '',
					defaults : {
						sortable : true,
						menuDisabled : false
					},
					listeners : {
						'cellclick' : function(grid, rowIndex, columnIndex, e) {
							if (columnIndex != 5)
								return;
							var type = grid.getStore().getAt(rowIndex)
									.get('type');
							switch (type) {
								case 'text' :
									columns[5].editor = new Ext.form.TextField(
											{});
									break;
								case 'number' :
									columns[5].editor = new Ext.form.NumberField(
											{});
									break;
								case 'date' :
									columns[5].editor = new Ext.form.DateField(
											{
												format : 'y-m-d'
											});
									break;
								case 'combo' :
									columns[5].editor = new MT.DicComboBox({
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : grid.getStore()
														.getAt(rowIndex)
														.get('code')
											});
									break;
							}
						}
					}

				});

		// 默认添加一条记录
		var store = Ext.getCmp('searchAdvanceGrid').getStore();
		var recordType = store.recordType;
		store.add(new recordType({
					operatorsign : '',
					operatorsignValue : '',
					leftbrackets : '',
					fieldname : '',
					relationsign : '',
					expressvalue : '',
					rightbrackets : '',
					type : '',
					code : '',
					value : '',
					field : ''
				}));

		this.returnPanel = new Ext.FormPanel({
					layout : 'form',
					region : 'south',
					height : 100,
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll : true,
					defaults : {
						anchor : '96%,96%',
						border : false
					},
					items : [{
								xtype : 'hidden',
								name : 'returnHQL',
								value : this.roomId
							}, {
								name : 'returnHQLName',
								xtype : 'textarea',
								id : 'returnHQLName',
								fieldLabel : '查询条件',
								allowBlank : false,
								blankText : '查询条件不能为空！',
								maxLength : 128,
								maxLengthText : '查询条件不能超过128个字符长度！'
							}]
				});
	},
	save : function() {
		var store = this.formPanel.getStore();
		var sqlStr = [];
		for (var i = 0; i < store.getCount(); i++) {
			var record = store.getAt(i);
			sqlStr.push(record.data.operatorsignValue
					+ record.data.leftbrackets + record.data.field
					+ record.data.relationsign + record.data.value
					+ record.data.rightbrackets);
		}
		Ext.getCmp('returnHQLName').setValue(sqlStr.join(''));

		// $postForm({
		// formPanel:this.returnPanel,
		// scope:this,
		// url:__ctxPath + '/${packageModot}/save${class}.do',
		// callback:function(fp,action){
		// var gridPanel = Ext.getCmp('${class}Grid');
		// if (gridPanel != null) {
		// gridPanel.getStore().reload();
		// }
		// this.close();
		// }
		// }
		// );
	},// end of save
	reset : function() {
		this.returnPanel.getForm().reset();
	},

	cancel : function() {
		this.close();
	},
	/**
	 * 执行 上移，下移 删除等操作的事件方法
	 * 
	 * @param {}
	 *            grid
	 * @param {}
	 *            record
	 * @param {}
	 *            action
	 * @param {}
	 *            row
	 * @param {}
	 *            col
	 */
	onRowAction : function(grid, record, action, row, col) {
		var store = grid.getStore();
		switch (action) {
			case 'btn-superior' :
				if (row > 0) {
					store.removeAt(row);
					store.insert(0, record);
					grid.getSelectionModel().selectRow(0);
					grid.getView().refresh();
				}
				break;
			case 'btn-up' :
				if (row > 0) {
					store.removeAt(row);
					store.insert(row - 1, record);
					grid.getSelectionModel().selectRow(row - 1);
					grid.getView().refresh();
				}
				break;
			case 'btn-last' :
				if (row < store.getCount() - 1) {
					store.removeAt(row);
					store.insert(row + 1, record);
					grid.getSelectionModel().selectRow(row + 1);
					grid.getView().refresh();
				}
				break;
			case 'btn-subordinate' :
				var count = store.getCount();
				if (row < count - 1) {
					store.removeAt(row);
					store.insert(count - 1, record);
					grid.getSelectionModel().selectRow(count - 1);
					grid.getView().refresh();
				}
				break;
			case 'btn-cancel' :
				store.remove(record);
				grid.getView().refresh();
				break;
		}
	}

});
Ext.reg("advanceSearchWin", MT.AdvancedSearchWin);

/**
 * @author Administrator { xtype:'datefield', showRedSatSun:true,
 *         //是否显示红色的星期六、星期天 showLunarCalendar:true // 是否显示农历 }
 */

/** 农历日期类 */
var lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950,
		0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250,
		0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0,
		0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
		0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0,
		0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0,
		0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0,
		0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50,
		0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
		0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540,
		0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50,
		0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3,
		0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954,
		0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
		0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176,
		0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6,
		0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7,
		0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0,
		0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);

var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗",
		"猪");
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var now = new Date();

// ==== 传入 offset 传回干支, 0=甲子
function cyclical(num) {
	return (Gan[num % 10] + Zhi[num % 12])
}

// ==== 传回农历 y年的总天数
function lYearDays(y) {
	var i, sum = 348
	for (i = 0x8000; i > 0x8; i >>= 1)
		sum += (lunarInfo[y - 1900] & i) ? 1 : 0
	return (sum + leapDays(y))
}

// ==== 传回农历 y年闰月的天数
function leapDays(y) {
	if (leapMonth(y))
		return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)
	else
		return (0)
}

// ==== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
function leapMonth(y) {
	return (lunarInfo[y - 1900] & 0xf)
}

// ====================================== 传回农历 y年m月的总天数
function monthDays(y, m) {
	return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29)
}

// ==== 算出农历, 传入日期物件, 传回农历日期物件
// 该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
function Lunar(objDate) {
	var i, leap = 0, temp = 0;
	var baseDate = new Date(1900, 0, 31);
	var offset = (objDate - baseDate) / 86400000;

	this.dayCyl = offset + 40;
	this.monCyl = 14;

	for (i = 1900; i < 2050 && offset > 0; i++) {
		temp = lYearDays(i);
		offset -= temp;
		this.monCyl += 12;
	}
	if (offset < 0) {
		offset += temp;
		i--;
		this.monCyl -= 12;
	}

	this.year = i;
	this.yearCyl = i - 1864;

	leap = leapMonth(i) // 闰哪个月
	this.isLeap = false

	for (i = 1; i < 13 && offset > 0; i++) {
		// 闰月
		if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
			--i;
			this.isLeap = true;
			temp = leapDays(this.year);
		} else {
			temp = monthDays(this.year, i);
		}

		// 解除闰月
		if (this.isLeap == true && i == (leap + 1)) {
			this.isLeap = false
		}
		offset -= temp
		if (this.isLeap == false) {
			this.monCyl++
		}
	}

	if (offset == 0 && leap > 0 && i == leap + 1) {
		if (this.isLeap) {
			this.isLeap = false;
		} else {
			this.isLeap = true;
			--i;
			--this.monCyl;
		}
	}

	if (offset < 0) {
		offset += temp;
		--i;
		--this.monCyl;
	}

	this.month = i;
	this.day = offset + 1;
}

function YYMMDD() {
	var cl = '<font color="#0000df" STYLE="font-size:9pt;">';
	if (now.getDay() == 0)
		cl = '<font color="#c00000" STYLE="font-size:9pt;">';
	if (now.getDay() == 6)
		cl = '<font color="#00c000" STYLE="font-size:9pt;">';
	return (cl + SY + '年' + (SM + 1) + '月' + SD + '日</font>');
}

function weekday() {
	var day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	var cl = '<font color="#ff0000" STYLE="font-size:9pt;">';
	if (now.getDay() == 0)
		cl = '<font color="#c00000" STYLE="font-size:9pt;">';
	if (now.getDay() == 6)
		cl = '<font color="#00c000" STYLE="font-size:9pt;">';
	return (cl + day[now.getDay()] + '</font>');
}

// ==== 中文日期
function cDay(m, d) {
	var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
	var nStr2 = new Array('初', '十', '廿', '卅', '　');
	var s;
	if (m > 10) {
		s = '十' + nStr1[m - 10];
	} else {
		s = nStr1[m]
	}
	s += '月'
	switch (d) {
		case 10 :
			s += '初十';
			break;
		case 20 :
			s += '二十';
			break;
		case 30 :
			s += '三十';
			break;
		default :
			s += nStr2[Math.floor(d / 10)];
			s += nStr1[d % 10];
	}
	return (s);
}

// ==== 简化的中文日期
function cDay2(lDObj) {
	var m = lDObj.month;
	var d = lDObj.day;
	var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
	var nStr2 = new Array('初', '十', '廿', '卅', '　');
	var s = '';
	if (lDObj.isLeap) {
		s += '闰';
	}
	if (m > 10) {
		s += '十' + nStr1[m - 10];
	} else {
		s += nStr1[m]
	}
	s += '月';
	switch (d) {
		case 10 :
			s = '初十';
			break;
		case 20 :
			s = '二十';
			break;
		case 30 :
			s = '三十';
			break;
		default :
			if (d != 1) {
				s = nStr2[Math.floor(d / 10)];
				s += nStr1[d % 10];
			}
	}
	return (s);
}

function solarDay1(SY, SM, SD) {
	var sDObj = new Date(SY, SM, SD);
	var lDObj = new Lunar(sDObj);
	var cl = '<font color="violet" STYLE="font-size:9pt;">';
	var tt = '【' + Animals[(SY - 4) % 12] + '】' + cyclical(lDObj.monCyl) + '月 '
			+ cyclical(lDObj.dayCyl++) + '日';
	return (cl + tt + '</font>');
}
function solarDay2(year, month, day) {
	var sDObj = new Date(year, month, day);
	var lDObj = new Lunar(sDObj);
	var tt = cyclical(year - 1900 + 36) + '年 ' + cDay(lDObj.month, lDObj.day);
	return tt;
}
function solarDay3(year, month, day) {
	var sDObj = new Date(year, month, day);
	var lDObj = new Lunar(sDObj);
	var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867,
			150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563,
			331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532,
			504758)
	var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
			"立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露",
			"霜降", "立冬", "小雪", "大雪", "冬至")
	var lFtv = new Array("0101 春节", "0115 元宵节", "0505 端午节", "0707 七夕情人节",
			"0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1224 小年",
			"0100*除夕")
	var sFtv = new Array("0101 元旦", "0214 情人节", "0308 妇女节", "0312 植树节",
			"0315 消费者权益日", "0401 愚人节", "0501 劳动节", "0504 青年节", "0512 护士节",
			"0601 儿童节", "0701 建党节 香港回归纪念", "0801 建军节", "0808 父亲节", "0908 茂生日",
			"0909 毛泽东逝世纪念", "0910 教师节", "0928 孔子诞辰", "1001 国庆节", "1006 老人节",
			"1024 联合国日", "1112 孙中山诞辰", "1220 澳门回归纪念", "1225 圣诞节", "1226 毛泽东诞辰")

	var lDPOS = new Array(3)
	var festival = '', solarTerms = '', solarFestival = '', lunarFestival = '', tmp1, tmp2;
	// 农历节日
	for (var i = 0; i < lFtv.length; i++) {
		if (lFtv[i] != null && lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
			tmp1 = Number(RegExp.$1) - lDObj.month
			tmp2 = Number(RegExp.$2) - lDObj.day
			if (tmp1 == 0 && tmp2 == 0)
				lunarFestival = RegExp.$4
		}
	}
	// 国历节日
	for (var i = 0; i < sFtv.length; i++) {
		if (sFtv[i] != null && sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
			tmp1 = Number(RegExp.$1) - (month + 1)
			tmp2 = Number(RegExp.$2) - day
			if (tmp1 == 0 && tmp2 == 0)
				solarFestival = RegExp.$4
		}
	}
	// //节气
	// tmp1 = new Date((31556925974.7 * (year - 1900) + sTermInfo[month * 2 + 1]
	// * 60000) + Date.UTC(1900, 0, 6, 2, 5))
	// tmp2 = tmp1.getUTCDate()
	// if (tmp2 == day) solarTerms = solarTerm[month * 2 + 1]
	// tmp1 = new Date((31556925974.7 * (year - 1900) + sTermInfo[month * 2] *
	// 60000) + Date.UTC(1900, 0, 6, 2, 5))
	// tmp2 = tmp1.getUTCDate()
	// if (tmp2 == day) solarTerms = solarTerm[month * 2]

	// if (solarTerms == '' && solarFestival == '' && lunarFestival == '')
	// festival = '';
	// else
	// festival = solarTerms + ' ' + solarFestival + ' ' + lunarFestival;
	festival = lunarFestival;
	return festival;
}

function ConverDate(date) {
	// 换算为农历
	var lDObj = new Lunar(date);
	// 转换农历显示文字
	var mDay = cDay2(lDObj);

	var da = new Date(date);
	var s = solarDay3(da.getFullYear(), da.getMonth(), da.getDate());
	if (s != '')
		return s;
	return mDay;
	// return mDay;
}

Ext.apply(Ext.DatePicker.prototype, {
	showRedSatSun : false, // 是否显示红色的星期六、星期天
	showLunarCalendar : false, // 是否显示农历
	// private
	onRender : function(container, position) {
		// 如果显示农历则扩大宽度，
		var middleWidth1 = ''; // 默认为130px
		var middleWidth2 = ''; // 为兼容Google浏览器，默认为175px
		if (this.showLunarCalendar) {
			middleWidth1 = 'style="width:250px"';
			if (Ext.isWebKit)
				middleWidth2 = 'style="width:295px"';
		}
		var m = [
				'<table cellspacing="0">',
				'<tr><td class="x-date-left"><a href="#" title="',
				this.prevText,
				'">&#160;</a></td><td class="x-date-middle" align="center" '
						+ middleWidth1
						+ '></td><td class="x-date-right"><a href="#" title="',
				this.nextText,
				'">&#160;</a></td></tr>',
				'<tr><td colspan="3"><table class="x-date-inner" cellspacing="0" '
						+ middleWidth2 + '><thead><tr>'], dn = this.dayNames, i;
		for (i = 0; i < 7; i++) {
			var d = this.startDay + i;
			if (d > 6) {
				d = d - 7;
			}
			m.push('<th><span>', dn[d].substr(0, 1), '</span></th>');
		}
		m[m.length] = '</tr></thead><tbody><tr>';
		for (i = 0; i < 42; i++) {
			if (i % 7 === 0 && i !== 0) {
				m[m.length] = '</tr><tr>';
			}
			// 将星期六和星期天的颜色换成红色了
			if (this.showRedSatSun && (i % 7 == 0 || (i + 1) % 7 == 0))
				m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span style="color:red;"></span></em></a></td>';
			else
				m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
		}
		m
				.push(
						'</tr></tbody></table></td></tr>',
						this.showToday
								? '<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>'
								: '', '</table><div class="x-date-mp"></div>');

		var el = document.createElement('div');
		el.className = 'x-date-picker';
		el.innerHTML = m.join('');

		container.dom.insertBefore(el, position);

		this.el = Ext.get(el);
		this.eventEl = Ext.get(el.firstChild);

		this.prevRepeater = new Ext.util.ClickRepeater(this.el
						.child('td.x-date-left a'), {
					handler : this.showPrevMonth,
					scope : this,
					preventDefault : true,
					stopDefault : true
				});

		this.nextRepeater = new Ext.util.ClickRepeater(this.el
						.child('td.x-date-right a'), {
					handler : this.showNextMonth,
					scope : this,
					preventDefault : true,
					stopDefault : true
				});

		this.monthPicker = this.el.down('div.x-date-mp');
		this.monthPicker.enableDisplayMode('block');

		this.keyNav = new Ext.KeyNav(this.eventEl, {
					'left' : function(e) {
						if (e.ctrlKey) {
							this.showPrevMonth();
						} else {
							this.update(this.activeDate.add('d', -1));
						}
					},

					'right' : function(e) {
						if (e.ctrlKey) {
							this.showNextMonth();
						} else {
							this.update(this.activeDate.add('d', 1));
						}
					},

					'up' : function(e) {
						if (e.ctrlKey) {
							this.showNextYear();
						} else {
							this.update(this.activeDate.add('d', -7));
						}
					},

					'down' : function(e) {
						if (e.ctrlKey) {
							this.showPrevYear();
						} else {
							this.update(this.activeDate.add('d', 7));
						}
					},

					'pageUp' : function(e) {
						this.showNextMonth();
					},

					'pageDown' : function(e) {
						this.showPrevMonth();
					},

					'enter' : function(e) {
						e.stopPropagation();
						return true;
					},

					scope : this
				});

		this.el.unselectable();

		this.cells = this.el.select('table.x-date-inner tbody td');
		this.textNodes = this.el.query('table.x-date-inner tbody span');

		this.mbtn = new Ext.Button({
					text : '&#160;',
					tooltip : this.monthYearText,
					renderTo : this.el.child('td.x-date-middle', true)
				});
		this.mbtn.el.child('em').addClass('x-btn-arrow');

		if (this.showToday) {
			this.todayKeyListener = this.eventEl.addKeyListener(
					Ext.EventObject.SPACE, this.selectToday, this);
			var today = (new Date()).dateFormat(this.format);
			this.todayBtn = new Ext.Button({
						renderTo : this.el.child('td.x-date-bottom', true),
						text : String.format(this.todayText, today),
						tooltip : String.format(this.todayTip, today),
						handler : this.selectToday,
						scope : this
					});
		}
		this.mon(this.eventEl, 'mousewheel', this.handleMouseWheel, this);
		this.mon(this.eventEl, 'click', this.handleDateClick, this, {
					delegate : 'a.x-date-date'
				});
		this.mon(this.mbtn, 'click', this.showMonthPicker, this);
		this.onEnable(true);

	},
	update : function(date, forceRefresh) {
		if (this.rendered) {
			var vd = this.activeDate, vis = this.isVisible();
			this.activeDate = date;
			if (!forceRefresh && vd && this.el) {
				var t = date.getTime();
				if (vd.getMonth() == date.getMonth()
						&& vd.getFullYear() == date.getFullYear()) {
					this.cells.removeClass('x-date-selected');
					this.cells.each(function(c) {
								if (c.dom.firstChild.dateValue == t) {
									c.addClass('x-date-selected');
									if (vis && !this.cancelFocus) {
										Ext.fly(c.dom.firstChild).focus(50);
									}
									return false;
								}
							}, this);
					return;
				}
			}
			var days = date.getDaysInMonth(), firstOfMonth = date
					.getFirstDateOfMonth(), startingPos = firstOfMonth.getDay()
					- this.startDay;

			if (startingPos < 0) {
				startingPos += 7;
			}
			days += startingPos;

			var pm = date.add('mo', -1), prevStart = pm.getDaysInMonth()
					- startingPos, cells = this.cells.elements, textEls = this.textNodes, day = 86400000, d = (new Date(
					pm.getFullYear(), pm.getMonth(), prevStart)).clearTime(), today = new Date()
					.clearTime().getTime(), sel = date.clearTime(true)
					.getTime(), min = this.minDate ? this.minDate
					.clearTime(true) : Number.NEGATIVE_INFINITY, max = this.maxDate
					? this.maxDate.clearTime(true)
					: Number.POSITIVE_INFINITY, ddMatch = this.disabledDatesRE, ddText = this.disabledDatesText, ddays = this.disabledDays
					? this.disabledDays.join('')
					: false, ddaysText = this.disabledDaysText, format = this.format;

			if (this.showToday) {
				var td = new Date().clearTime(), disable = (td < min
						|| td > max
						|| (ddMatch && format && ddMatch.test(td
								.dateFormat(format))) || (ddays && ddays
						.indexOf(td.getDay()) != -1));

				if (!this.disabled) {
					this.todayBtn.setDisabled(disable);
					this.todayKeyListener[disable ? 'disable' : 'enable']();
				}
			}
			var setCellClass = function(cal, cell) {
				cell.title = '';
				var t = d.getTime();
				cell.firstChild.dateValue = t;
				if (t == today) {
					cell.className += ' x-date-today';
					cell.title = cal.todayText;
				}
				if (t == sel) {
					cell.className += ' x-date-selected';
					if (vis) {
						Ext.fly(cell.firstChild).focus(50);
					}
				}
				if (t < min) {
					cell.className = ' x-date-disabled';
					cell.title = cal.minText;
					return;
				}
				if (t > max) {
					cell.className = ' x-date-disabled';
					cell.title = cal.maxText;
					return;
				}
				if (ddays) {
					if (ddays.indexOf(d.getDay()) != -1) {
						cell.title = ddaysText;
						cell.className = ' x-date-disabled';
					}
				}
				if (ddMatch && format) {
					var fvalue = d.dateFormat(format);
					if (ddMatch.test(fvalue)) {
						cell.title = ddText.replace('%0', fvalue);
						cell.className = ' x-date-disabled';
					}
				}
			};

			var i = 0;
			for (; i < startingPos; i++) {
				// 修改
				if (this.showLunarCalendar)
					textEls[i].innerHTML = ((++prevStart) + '<br/>' + ConverDate(d));
				else
					textEls[i].innerHTML = (++prevStart);
				d.setDate(d.getDate() + 1);
				cells[i].className = 'x-date-prevday';
				setCellClass(this, cells[i]);
			}
			for (; i < days; i++) {
				var intDay = i - startingPos + 1;
				// 修改
				if (this.showLunarCalendar)
					textEls[i].innerHTML = ((intDay) + '<br/>' + ConverDate(d));
				else
					textEls[i].innerHTML = (intDay);
				d.setDate(d.getDate() + 1);
				cells[i].className = 'x-date-active';
				setCellClass(this, cells[i]);
			}
			var extraDays = 0;
			for (; i < 42; i++) {
				// 修改
				if (this.showLunarCalendar)
					textEls[i].innerHTML = ((++extraDays) + '<br/>' + ConverDate(d));
				else
					textEls[i].innerHTML = (++extraDays);
				d.setDate(d.getDate() + 1);
				cells[i].className = 'x-date-nextday';
				setCellClass(this, cells[i]);
			}

			this.mbtn.setText(this.monthNames[date.getMonth()] + ' '
					+ date.getFullYear());

			if (!this.internalRender) {
				var main = this.el.dom.firstChild, w = main.offsetWidth;
				this.el.setWidth(w + this.el.getBorderWidth('lr'));
				Ext.fly(main).setWidth(w);
				this.internalRender = true;
				if (Ext.isOpera && !this.secondPass) {
					main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth + main.rows[0].cells[2].offsetWidth))
							+ 'px';
					this.secondPass = true;
					this.update.defer(10, this, [date]);
				}
			}
		}
	}
});

Ext.apply(Ext.form.DateField.prototype, {
			showRedSatSun : false, // 是否显示红色的星期六、星期天
			showLunarCalendar : false, // 是否显示农历
			onTriggerClick : function() {
				if (this.disabled) {
					return;
				}
				if (this.menu == null) {
					this.menu = new Ext.menu.DateMenu({
								hideOnClick : false,
								focusOnSelect : false
							});
				}
				this.onFocus();
				Ext.apply(this.menu.picker, {
							minDate : this.minValue,
							maxDate : this.maxValue,
							disabledDatesRE : this.disabledDatesRE,
							disabledDatesText : this.disabledDatesText,
							disabledDays : this.disabledDays,
							disabledDaysText : this.disabledDaysText,
							showRedSatSun : this.showRedSatSun,
							showLunarCalendar : this.showLunarCalendar,
							format : this.format,
							showToday : this.showToday,
							minText : String.format(this.minText, this
											.formatDate(this.minValue)),
							maxText : String.format(this.maxText, this
											.formatDate(this.maxValue))
						});
				this.menu.picker.setValue(this.getValue() || new Date());
				this.menu.show(this.el, "tl-bl?");
				this.menuEvents('on');
			},
			setValue : function(date) {
				var d = this.parseDate(date);
				if (d) {
					if (this.showRedSatSun) {
						if (d.getDay() == 0 || d.getDay() == 6)
							this.getEl().dom.style.color = 'red';
						else
							this.getEl().dom.style.color = '#000000';
					}
					return Ext.form.DateField.superclass.setValue.call(this,
							this.formatDate(d));
				}
			},
			onSelect : function(m, d) {
				this.setValue(d);
				// 修改
				if (this.showRedSatSun) {
					if (d.getDay() == 0 || d.getDay() == 6)
						this.getEl().dom.style.color = 'red';
					else
						this.getEl().dom.style.color = '#000000';
				}
				this.fireEvent('select', this, d);
				this.menu.hide();
			},
			beforeBlur : function() {
				var v = this.parseDate(this.getRawValue());
				if (v) {
					this.setValue(v);
					// 修改
					if (this.showRedSatSun) {
						if (v.getDay() == 0 || v.getDay() == 6)
							this.getEl().dom.style.color = 'red';
						else
							this.getEl().dom.style.color = '#000000';
					}
				}
			}
		});
//年月选择控件
	/*
	 * {
                    xtype: 'datefield',
                    plugins: 'monthPickerPlugin',
                    name: 'rq',
                    format: 'Y'
                }
	 * */
Ext.ux.MonthPickerPlugin = function () {
            var picker;
            var oldDateDefaults;

            this.init = function (pk) {
                picker = pk;
                picker.onTriggerClick = picker.onTriggerClick.createSequence(onClick);
                picker.getValue = picker.getValue.createInterceptor(setDefaultMonthDay).createSequence(restoreDefaultMonthDay);
                picker.beforeBlur = picker.beforeBlur.createInterceptor(setDefaultMonthDay).createSequence(restoreDefaultMonthDay);
            };

            function setDefaultMonthDay() {
                oldDateDefaults = Date.defaults.d;
                Date.defaults.d = 1;
                return true;
            }

            function restoreDefaultMonthDay(ret) {
                Date.defaults.d = oldDateDefaults;
                return ret;
            }

            function onClick(e, el, opt) {
                var p = picker.menu.picker;
                p.activeDate = p.activeDate.getFirstDateOfMonth();
                if (p.value) {
                    p.value = p.value.getFirstDateOfMonth();
                }

                p.showMonthPicker();

                if (!p.disabled) {
                    p.monthPicker.stopFx();
                    p.monthPicker.show();

                    p.mun(p.monthPicker, 'click', p.onMonthClick, p);
                    p.mun(p.monthPicker, 'dblclick', p.onMonthDblClick, p);
                    p.onMonthClick = p.onMonthClick.createSequence(pickerClick);
                    p.onMonthDblClick = p.onMonthDblClick.createSequence(pickerDblclick);
                    p.mon(p.monthPicker, 'click', p.onMonthClick, p);
                    p.mon(p.monthPicker, 'dblclick', p.onMonthDblClick, p);
                }
            }

            function pickerClick(e, t) {
                var el = new Ext.Element(t);
                if (el.is('button.x-date-mp-cancel')) {
                    picker.menu.hide();
                } else if (el.is('button.x-date-mp-ok')) {
                    var p = picker.menu.picker;
                    p.setValue(p.activeDate);
                    p.fireEvent('select', p, p.value);
                }
            }

            function pickerDblclick(e, t) {
                var el = new Ext.Element(t);
                if (el.parent()
            && (el.parent().is('td.x-date-mp-month')
            || el.parent().is('td.x-date-mp-year'))) {

                    var p = picker.menu.picker;
                    p.setValue(p.activeDate);
                    p.fireEvent('select', p, p.value);
                }
            }
        };

        Ext.preg('monthPickerPlugin', Ext.ux.MonthPickerPlugin);
 //年份下拉框
        /*
         * 
         * {
                    xtype: 'yearpick',
                    name: 'rq',
                    format: 'Y'
                }
         * */
Ext.namespace('Ext.ux');

/**
 * @class       Ext.ux.MyYear
 * @extends     Ext.form.TriggerField
 * @param       {Object} config configuration object
 * @CopyWrite   2011. LiuJianLong 
 */
 
Ext.ux.MonthPicker =  Ext.extend(Ext.Component,{
    //ctCls           : 'x-menu-date-item',
    curYear         : (new Date()).getFullYear(),
    selYear         : (new Date()).getFullYear(),
    selMonth        : (new Date()).getMonth(),
    
    constructor: function(config){
        Ext.ux.MonthPicker.superclass.constructor.apply(this, arguments);
        this.addEvents('select');
        },
    onMonthClick:function(e, t){
        e.stopEvent();
        var el = new Ext.Element(t), td;
        if(el.is('a.x-date-mp-prev')){
            this.curYear -= 5;
            this.freshYear();
            }
        else if(el.is('a.x-date-mp-next')){
            this.curYear += 5;
            this.freshYear();
            }
        else if(td = el.up('td.x-date-mp-year', 2)){
            this.selYear = td.dom.num;
            this.freshYear();
			var buf=[this.selYear];
            this.fireEvent('select', this, buf.join(''))
            }
        else if(td = el.up('td.x-date-mp-month', 2)){
            this.selMonth = td.dom.num;
            this.freshMonth();
            var buf=[this.selYear,this.selMonth>9 ? '' : '0',this.selMonth];
            this.fireEvent('select', this, buf.join(''))
            }
        },
    onRender : function(container, position){
        var m = [ '<div style="width: 160px; height:160px;"></div>' ]
        m[m.length] = '<div class="x-date-mp"></div>';
        var el = document.createElement("div");
        el.className = "x-date-picker";
        el.innerHTML = m.join("");
        container.dom.insertBefore(el, position);

        this.el = Ext.get(el);
        this.monthPicker = this.el.down('div.x-date-mp');
        this.monthPicker.enableDisplayMode('block');
        this.el.unselectable();

        this.createMonthPicker();
        var size = this.el.getSize();
        this.monthPicker.setSize(size);
        this.monthPicker.child('table').setSize(size);
        this.monthPicker.show();
        },
    createMonthPicker : function(){
        var buf = ['<table border="0" cellspacing="0">'];
        for(var i = 0; i < 6; i++){
            buf.push(
                '<tr>',
                i == 0 ?
                '<td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-prev"></a></td><td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-next"></a></td></tr>' :
                 '<td class="x-date-mp-year"><a href="#"></a></td><td class="x-date-mp-year"><a href="#"></a></td></tr>'
                );
            }
        buf.push('</table>');
        this.monthPicker.update(buf.join(''));
        this.monthPicker.on('click', this.onMonthClick, this);
        this.MonthTDs = this.monthPicker.select('td.x-date-mp-month');
        this.YearTDs = this.monthPicker.select('td.x-date-mp-year');
        this.freshYear();
        this.freshMonth();
        },
    freshYear:function(){
        this.YearTDs.removeClass('x-date-mp-sel');
        this.YearTDs.each(function(m, a, i){
            var y = this.curYear - 2 + i;
            m.dom.num = y;
            m.dom.firstChild.innerHTML = y + ' 年' ;
            if (y == this.selYear) m.addClass('x-date-mp-sel');
            i += 1;
            },this);
        },
    freshMonth:function(){
        this.MonthTDs.removeClass('x-date-mp-sel');
        this.MonthTDs.each(function(m, a, i){
            i += 1;
            m.dom.num = i;
            m.dom.firstChild.innerHTML = i + '月';
            if(i == this.selMonth) m.addClass('x-date-mp-sel');
            },this);
        }        
    }); 
    
Ext.ux.MonthMenu = Ext.extend(Ext.menu.Menu,{
    constructor: function(config){
        Ext.apply(this,{
            plain           : true,
            showSeparator   : false,
            items           : this.picker = new Ext.ux.MonthPicker({})
            });
        Ext.ux.MonthMenu.superclass.constructor.apply(this, arguments);
        this.relayEvents(this.picker, ["select"]);
        }
    });

Ext.ux.MyYear = Ext.extend(Ext.form.TriggerField,{
    constructor: function(config){
        Ext.ux.MyYear.superclass.constructor.apply(this, arguments);
        this.addEvents('select');
        if(this.handler) this.on("select", this.handler,  this.scope || this);
        },
    onTriggerClick: function(){
        this.onFocus();
        this.menu.show(this.el, "tl-bl?");
        this.menuEvents('on');
        },
    menuEvents: function(method){
        this.menu[method]('select', this.onSelect, this);
        this.menu[method]('hide', this.onMenuHide, this);
        this.menu[method]('show', this.onFocus, this);
        },
    onMenuHide: function(){
        this.focus(false, 60);
        this.menuEvents('un');
        },
    onSelect:function(menu, date){
        this.setValue(date);
        this.fireEvent('select', this, date);
        this.menu.hide();
        },
		

		
		
		
		
    menu :new Ext.ux.MonthMenu({})
    });

  Ext.reg('yearpick', Ext.ux.MyYear);