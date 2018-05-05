Ext.ux.TreeComboX = Ext.extend(Ext.form.ComboBox, {
			constructor : function(cfg) {
				cfg = cfg || {};
				Ext.ux.TreeComboX.superclass.constructor.call(this, Ext.apply({
									maxHeight : 300,
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									rootVisible : false,
									selectMode : 'all'
								}, cfg));
			},
			store : new Ext.data.SimpleStore({
						fields : [],
						autoLoad : true,
						data : [[]]
					}),
			// 重写onViewClick，使展开树结点是不关闭下拉框
			onViewClick : function(doFocus) {
				var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
						.getAt(index);
				if (r) {
					this.onSelect(r, index);
				}
				if (doFocus !== false) {
					this.el.focus();
				}
			},
			tree : null,
			// 隐藏值
			hiddenValue : null,
			getHiddenValue : function() {
				return this.hiddenValue;
			},
			setHiddenValue : function(code, dispText) {
				this.setValue(code);
				Ext.form.ComboBox.superclass.setValue.call(this, dispText);
				this.hiddenValue = code;
			},
			initComponent : function() {
				var _this = this;
				var tplRandomId = 'deptcombo_'
						+ Math.floor(Math.random() * 1000) + this.tplId
				this.tpl = "<div style='height:" + _this.maxHeight + "px' id='"
						+ tplRandomId + "'></div>"
				this.tree = new Ext.tree.TreePanel({
							border : false,
							enableDD : false,
							enableDrag : false,
							rootVisible : _this.rootVisible || false,
							autoScroll : true,
							trackMouseOver : true,
							height : _this.maxHeight,
							lines : true,
							singleExpand : true,
							root : new Ext.tree.AsyncTreeNode({
										id : _this.rootId,
										text : _this.rootText,
										leaf : false,
										border : false,
										draggable : false,
										singleClickExpand : false,
										hide : true
									}),
							loader : new Ext.tree.TreeLoader({
										dataUrl : _this.url
									})
						});
				var formrage = this;
				this.tree.on('click', function(node) {
							if ((_this.selectMode == 'leaf' && node.leaf == true)
									|| _this.selectMode == 'all') {
								var dispText = node.text;
								var code = node.id;
								_this.setHiddenValue(code, dispText);
								_this.collapse();
							}
						});
				this.on('expand', function() {
							this.tree.render(tplRandomId);
						});
				Ext.ux.TreeComboX.superclass.initComponent.call(this);
			}
		})
Ext.reg("treecboType", Ext.ux.TreeComboX);

Ext.ux.TreeComboY = Ext.extend(Ext.form.ComboBox, {
			constructor : function(cfg) {
				cfg = cfg || {};
				Ext.ux.TreeComboY.superclass.constructor.call(this, Ext.apply({
									maxHeight : 300,
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									rootVisible : false,
									selectMode : 'all'
								}, cfg));
			},
			store : new Ext.data.SimpleStore({
						fields : [],
						autoLoad : true,
						data : [[]]
					}),
			node : null,
			getStore : function() {
				return this.store;
			},
			// 重写onViewClick，使展开树结点是不关闭下拉框
			onViewClick : function(doFocus) {
				var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
						.getAt(index);
				if (r) {
					this.onSelect(r, index);
				}
				if (doFocus !== false) {
					this.el.focus();
				}
			},
			tree : null,
			// 隐藏值
			hiddenValue : null,
			getHiddenValue : function() {
				return this.hiddenValue;
			},
			setHiddenValue : function(code, dispText) {
				this.setValue(code);
				Ext.ux.TreeComboY.superclass.setValue.call(this, code);
				this.hiddenValue = code;
			},
			setNode : function(node) {
				this.node = node;
			},
			getNode : function() {
				return this.node;
			},
			initComponent : function() {
				var _this = this;
				var tplRandomId = 'deptcombo_'
						+ Math.floor(Math.random() * 1000) + this.tplId
				this.tpl = "<div style='height:" + _this.maxHeight + "px' id='"
						+ tplRandomId + "'></div>"
				this.tree = new Ext.tree.TreePanel({
							border : false,
							enableDD : false,
							enableDrag : false,
							rootVisible : _this.rootVisible || false,
							autoScroll : true,
							trackMouseOver : true,
							height : _this.maxHeight,
							lines : true,
							singleExpand : true,
							root : new Ext.tree.AsyncTreeNode({
										 id : _this.rootId,
										text : _this.rootText,
										leaf : false,
										border : false,
										draggable : false,
										singleClickExpand : false,
										hide : true
									}),
							loader : new Ext.tree.TreeLoader({
										dataUrl : _this.url
									})
						});
				var formrage = this;
				this.tree.on('click', function(node) {
							if ((_this.selectMode == 'leaf' && node.leaf == true)
									|| _this.selectMode == 'all') {
								var dispText = node.text;
								var code = node.id;
								_this.setHiddenValue(code, dispText);
								_this.collapse();
							}
						});

				this.on('expand', function() {
							this.tree.render(tplRandomId);
						});
				Ext.ux.TreeComboY.superclass.initComponent.call(this);
			}
		})
Ext.reg("treecomboy", Ext.ux.TreeComboY);

// showMapName 为是否获得后台的mapname
Ext.ux.TreeComboZ = Ext.extend(Ext.form.ComboBox, {
	constructor : function(cfg) {
		cfg = cfg || {};
		Ext.applyIf(this, cfg);
		Ext.ux.TreeComboZ.superclass.constructor.call(this, Ext.apply({
							maxHeight : 300,
							editable : false,
							mode : 'local',
							triggerAction : 'all',
							rootVisible : false,
							selectMode : 'all'
						}, cfg));
	},
	store : new Ext.data.SimpleStore({
				fields : [],
				autoLoad : true,
				data : [[]]
			}),
	Showstore : new Ext.data.JsonStore({
				fields : ['id', 'text', 'isTree', 'attributes', 'leaf',
						'expanded', 'd'],
				data : []
			}),
	// 重写onViewClick，使展开树结点是不关闭下拉框
	onViewClick : function(doFocus) {
		var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
				.getAt(index);
		if (r) {
			this.onSelect(r, index);
		}
		if (doFocus !== false) {
			this.el.focus();
		}
	},
	tree : null,
	// 隐藏值
	hiddenValue : null,
	getHiddenValue : function() {
		return this.hiddenValue;
	},
	setHiddenValue : function(code, dispText) {
		this.setValue(code);
		Ext.form.ComboBox.superclass.setValue.call(this, dispText);
		this.hiddenValue = code;
	},
	itemindex : null,
	getItemIndex : function() {
		return this.itemindex;
	},
	setItemIndex : function(value) {
		this.itemindex = value;
	},
	mapName : null,
	getMapName : function() {
		return this.mapName;
	},
	setMapName : function(value) {
		this.mapName = value;
	},
	setHValue : function(id) {
		var store = this.Showstore;
		var _this = this;
		store.each(function(recode) {
					// recode.get('attributes');
					if (recode.get('attributes').toString() == id.toString()) {
						_this.setHiddenValue(recode.get('text'), recode
										.get('text'));

					}
				})
	},
	node : null,
	getNode : function() {
		return this.node;
	},
	setNode : function(value) {
		this.node = value;
	},
	initComponent : function() {
		var _this = this;
		var formrage = this;
		var tplRandomId = 'deptcombo_' + Math.floor(Math.random() * 1000)
				+ this.tplId
		this.tpl = "<div style='height:" + _this.maxHeight + "px' id='"
				+ tplRandomId + "'></div>"
		this.tree = new Ext.tree.TreePanel({
			border : false,
			enableDD : false,
			enableDrag : false,
			rootVisible : _this.rootVisible || false,
			autoScroll : true,
			trackMouseOver : true,
			height : _this.maxHeight,
			lines : true,
			singleExpand : true,
			root : new Ext.tree.AsyncTreeNode({
						id : _this.rootId,
						text : _this.rootText,
						leaf : false,
						border : false,
						draggable : false,
						singleClickExpand : false,
						hide : true
					}),
			loader : new Ext.tree.TreeLoader({
				dataUrl : _this.url,
				listeners : {
					load : function(loaders, node, response) {
						if (formrage.showMapName) {
						formrage.Showstore.loadData(Ext.decode(response.responseText));
						}
						
					}
				}
			})
		});

		this.tree.on('click', function(node) {
					if ((_this.selectMode == 'leaf' && node.leaf == true)
							|| _this.selectMode == 'all') {
						var dispText = node.text;
						var code = node.id;

						var attributes = node.attributes.attributes;
						formrage.setItemIndex(attributes.toString());
						if (formrage.showMapName) {
							var mapNames = node.attributes.mapName;
							formrage.setMapName(mapNames);
						}
						formrage.setNode(node);
						_this.setHiddenValue(code, dispText);
						_this.collapse();
					}
				});
		this.on('afterrender', function() {
					// formrage.store.load()
					this.tree.render(tplRandomId);
				});
		Ext.ux.TreeComboZ.superclass.initComponent.call(this);
	}
})
Ext.reg("treecomboz", Ext.ux.TreeComboZ);
