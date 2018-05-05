xds.PropertyRecord = Ext.data.Record.create([{
			name : "name",
			type : "string"
		}, "value", "group"]);
xds.PropGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	enableColumnMove : false,
	stripeRows : false,
	trackMouseOver : false,
	clicksToEdit : 1,
	enableHdMenu : false,
	baseCls : "x-plain",
	hideHeaders : true,
	cls : "grouped-prop-grid",
	cacheSizes : false,
	initComponent : function() {
		this.lastEditRow = null;
		var $ = new xds.PropGrid.Store(this);
		this.propStore = $;
		var _ = new xds.PropGrid.ColumnModel(this, $);
		this.selModel = new Ext.grid.CellSelectionModel({
					onEditorKey : function(B, C) {
						var H = C.getKey(), F, D = this.grid, E = D.activeEditor;
						if (H == C.TAB) {
							if (C.shiftKey)
								F = D.walkCells(E.row, E.col - 1, -1,
										this.acceptsNav, this);
							else
								F = D.walkCells(E.row, E.col + 1, 1,
										this.acceptsNav, this);
							C.stopEvent()
						} else if (H == C.ENTER) {
							var _ = E.record.id, A = C.ctrlKey, $ = C.shiftKey;
							E.completeEdit();
							C.stopEvent();
							if (A) {
								var G = D.component.getNode();
								if (G.nextSibling) {
									G.nextSibling.select();
									D.startEditById(_)
								}
							} else if ($) {
								G = D.component.getNode();
								if (G.previousSibling) {
									G.previousSibling.select();
									D.startEditById(_)
								}
							}
						} else if (H == C.ESC) {
							C.stopEvent();
							E.cancelEdit()
						}
						if (F)
							D.startEditing(F[0], F[1])
					}
				});
		$.store.sort("name", "ASC");
		this.addEvents("beforepropertychange", "propertychange");
		this.cm = _;
		this.store = $.store;
		this.view = new Ext.grid.GroupingView({
					forceFit : true,
					showGroupName : false,
					scrollOffset : 18,
					getRowClass : function($) {
						return $.data.value === undefined ? "" : "has-value"
					}
				});
		this.tbar = new Ext.Toolbar({
					cls : this.tbCls || "xds-toolbar",
					items : [{
								tooltip : "分组排序",
								pressed : true,
								iconCls : "icon-grouped",
								enableToggle : true,
								toggleGroup : "prop-group",
								toggleHandler : function(_, $) {
									if ($)
										this.setGrouped(true)
								},
								scope : this
							}, " ", {
								tooltip : "按字母排序",
								pressed : false,
								iconCls : "icon-sorted",
								enableToggle : true,
								toggleGroup : "prop-group",
								toggleHandler : function(_, $) {
									if ($)
										this.setGrouped(false)
								},
								scope : this
							}, "-", {
								tooltip : "显示通用配置组",
								pressed : true,
								iconCls : "icon-common",
								enableToggle : true,
								toggleHandler : function(_, $) {
									this.setShowCommon($)
								},
								scope : this
							}, "-", {
								tooltip : "隐藏继承配置",
								pressed : false,
								iconCls : "icon-hide-inherited",
								enableToggle : true,
								toggleHandler : function(_, $) {
									this.setHideInherited($)
								},
								scope : this
							}]
				});
		xds.PropGrid.superclass.initComponent.call(this);
		this.selModel.on("beforecellselect", function(_, $, A) {
					if (A === 0) {
						this.startEditing.defer(200, this, [$, 1]);
						return false
					}
				}, this)
	},
	setGrouped : function($) {
		if (!$) {
			this.view.enableGrouping = false;
			this.propStore.store.clearGrouping()
		} else {
			this.view.enableGrouping = true;
			this.propStore.store.groupBy("group")
		}
	},
	setHideInherited : function($, _) {
		this.propStore.filterGroup = $ ? this.component.xcls : undefined;
		if (_ !== false)
			this.propStore.refresh()
	},
	setShowCommon : function($, _) {
		this.propStore.showCommon = $;
		if (_ !== false)
			this.propStore.refresh()
	},
	setComponent : function($) {
		this.stopEditing();
		this.component = $;
		if (this.propStore.filterGroup)
			this.propStore.filterGroup = $.xcls;
		this.propStore.setComponent($)
	},
	getComponent : function() {
		return this.component
	},
	clear : function() {
		delete this.component;
		this.propStore.clear()
	},
	onRender : function() {
		xds.PropGrid.superclass.onRender.apply(this, arguments);
		this.getGridEl().addClass("x-props-grid");
		this.view.mainBody.on("mousedown", this.onChecked, this)
	},
	onChecked : function($, _) {
		if (_ = $.getTarget("span.bcheck", 2)) {
			$.stopPropagation();
			var B = _.firstChild.className, A = this.propStore.store.getById(B);
			if (A)
				A.set("value", !_.firstChild.checked)
		}
	},
	startEditById : function(_) {
		var $ = this.propStore.store.getById(_);
		if ($) {
			var A = this.propStore.store.indexOf($);
			this.startEditing(A, 1)
		}
	}
});
xds.PropGrid.Store = function(_, $) {
	this.grid = _;
	this.store = new Ext.data.GroupingStore({
				recordType : xds.PropertyRecord,
				groupField : "group"
			});
	this.store.on("update", this.onUpdate, this);
	xds.PropGrid.Store.superclass.constructor.call(this)
};
Ext.extend(xds.PropGrid.Store, Ext.util.Observable, {
			showCommon : true,
			getConfigByType : function($, A) {
				if ($ == "Common")
					return this.grid.component.getConfigObject(A);
				var _ = this.grid.component["get" + $ + "Configs"]();
				return _.map[A]
			},
			getConfig : function($) {
				if ($.configType)
					return this.getConfigByType($.configType, $.data.name);
				return this.grid.component.getConfigObject($.data.name)
			},
			getConfigAt : function($) {
				return this.getConfig(this.store.getAt($))
			},
			setComponent : function(D) {
				this.component = D;
				this.store.removeAll();
				var $ = [], G = D.configs.items, _ = D.getConfig();
				for (var I = 0, E = G.length, A, H; I < E; I++) {
					A = G[I].name;
					H = G[I].group;
					if (!this.filterGroup || this.filterGroup == H)
						$.push(new xds.PropertyRecord({
									name : A,
									value : _[A],
									group : H
								}, A))
				}
				var B = D.getLayoutConfigs();
				if (B) {
					B = B.items;
					for (I = 0, E = B.length; I < E; I++) {
						A = B[I].name;
						$.push(new xds.PropertyRecord({
									name : A,
									value : _[A],
									group : B[I].group
								}, A))
					}
				}
				G = D.getContainerConfigs();
				if (G) {
					G = G.items;
					for (I = 0, E = G.length; I < E; I++) {
						A = G[I].name;
						var C = new xds.PropertyRecord({
									name : A,
									value : G[I].getValue(D),
									group : G[I].group
								}, "Container-" + A);
						C.configType = "Container";
						$.push(C)
					}
				}
				if (this.showCommon) {
					G = D.getCommonConfigs();
					if (G) {
						G = G.items;
						for (I = 0, E = G.length; I < E; I++) {
							A = G[I].name;
							C = new xds.PropertyRecord({
										name : A,
										value : G[I].getValue(D),
										group : "(Common)"
									}, "Common-" + A);
							C.configType = "Common";
							$.push(C)
						}
					}
				}
				var F = D.getEditorConfigs();
				if (F) {
					F = F.items;
					for (I = 0, E = F.length; I < E; I++) {
						A = F[I].name;
						$.push(new xds.PropertyRecord({
									name : A,
									value : F[I].getValue(D),
									group : F[I].group
								}, A))
					}
				}
				this.store.loadRecords({
							records : $
						}, {}, true)
			},
			onUpdate : function($, D, A) {
				if (A == Ext.data.Record.EDIT) {
					var B = D.data.value, C = D.modified.value;
					if (this.grid.fireEvent("beforepropertychange",
							this.component, D.data.name, B, C) !== false) {
						this.getConfig(D).setValue(this.component, B);
						if (D.configType == "Common")
							this.store.getById(D.data.name).set("value", B);
						else {
							var _ = this.store.getById("Common-" + D.data.name);
							if (_)
								_.set("value", B)
						}
						D.commit();
						this.grid.fireEvent("propertychange", this.component,
								D.data.name, B, C)
					} else
						D.reject()
				}
			},
			clear : function() {
				this.component = null;
				this.store.removeAll()
			},
			refresh : function() {
				this.setComponent(this.component)
			}
		});
xds.PropGrid.ColumnModel = Ext.extend(Ext.grid.ColumnModel, {
			nameText : "Name",
			valueText : "Value",
			dateFormat : "Y-m-d",
			constructor : function($, _) {
				this.grid = $;
				xds.PropGrid.ColumnModel.superclass.constructor.call(this, [{
									header : this.nameText,
									width : 50,
									sortable : true,
									dataIndex : "name",
									id : "name",
									menuDisabled : true
								}, {
									header : this.valueText,
									width : 50,
									resizable : false,
									dataIndex : "value",
									id : "value",
									menuDisabled : true
								}, {
									header : "",
									hidden : true,
									width : 10,
									resizable : false,
									locked : true,
									dataIndex : "group",
									menuDisabled : true
								}]);
				this.store = _;
				this.renderCellDelegate = this.renderCell.createDelegate(this);
				this.renderPropDelegate = this.renderProp.createDelegate(this)
			},
			isCellEditable : function(_, $) {
				return _ == 1
			},
			getRenderer : function($) {
				return $ == 1
						? this.renderCellDelegate
						: this.renderPropDelegate
			},
			renderProp : function($) {
				return $
			},
			renderCell : function(B, A, C, _) {
				var $ = this.store.getConfigAt(_), D = $.render(B, A, C, _);
				return $.htmlEncode ? Ext.util.Format.htmlEncode(D) : D
			},
			getCellEditor : function(_, $) {
				return this.store.getConfigAt($).getEditor()
			}
		});
Ext.ux.SelectBox = function($) {
	this.searchResetDelay = 1000;
	$ = $ || {};
	$ = Ext.apply($ || {}, {
				editable : false,
				forceSelection : true,
				rowHeight : false,
				lastSearchTerm : false,
				triggerAction : "all",
				mode : "local"
			});
	Ext.ux.SelectBox.superclass.constructor.apply(this, arguments);
	this.lastSelectedIndex = this.selectedIndex || 0
};
Ext.extend(Ext.ux.SelectBox, Ext.form.ComboBox, {
			lazyInit : false,
			initEvents : function() {
				Ext.ux.SelectBox.superclass.initEvents.apply(this, arguments);
				this.el.on("keydown", this.keySearch, this, true);
				this.cshTask = new Ext.util.DelayedTask(
						this.clearSearchHistory, this)
			},
			keySearch : function($, A, B) {
				var D = $.getKey(), C = String.fromCharCode(D), _ = 0;
				if (!this.store.getCount())
					return;
				switch (D) {
					case Ext.EventObject.HOME :
						$.stopEvent();
						this.selectFirst();
						return;
					case Ext.EventObject.END :
						$.stopEvent();
						this.selectLast();
						return;
					case Ext.EventObject.PAGEDOWN :
						this.selectNextPage();
						$.stopEvent();
						return;
					case Ext.EventObject.PAGEUP :
						this.selectPrevPage();
						$.stopEvent();
						return
				}
				if (($.hasModifier() && !$.shiftKey) || $.isNavKeyPress()
						|| $.isSpecialKey())
					return;
				if (this.lastSearchTerm == C)
					_ = this.lastSelectedIndex;
				this.search(this.displayField, C, _);
				this.cshTask.delay(this.searchResetDelay)
			},
			onRender : function($, _) {
				this.store.on("load", this.calcRowsPerPage, this);
				Ext.ux.SelectBox.superclass.onRender.apply(this, arguments);
				if (this.mode == "local")
					this.calcRowsPerPage()
			},
			onSelect : function(A, _, $) {
				if (this.fireEvent("beforeselect", this, A, _) !== false) {
					this.setValue(A.data[this.valueField || this.displayField]);
					if (!$)
						this.collapse();
					this.lastSelectedIndex = _ + 1;
					this.fireEvent("select", this, A, _)
				}
			},
			render : function($) {
				Ext.ux.SelectBox.superclass.render.apply(this, arguments);
				if (Ext.isSafari)
					this.el.swallowEvent("mousedown", true);
				this.el.unselectable();
				this.innerList.unselectable();
				this.trigger.unselectable();
				this.innerList.on("mouseup", function($, A, _) {
							if (A.id && A.id == this.innerList.id)
								return;
							this.onViewClick()
						}, this);
				this.innerList.on("mouseover", function($, A, _) {
							if (A.id && A.id == this.innerList.id)
								return;
							this.lastSelectedIndex = this.view
									.getSelectedIndexes()[0]
									+ 1;
							this.cshTask.delay(this.searchResetDelay)
						}, this);
				this.trigger.un("click", this.onTriggerClick, this);
				this.trigger.on("mousedown", function($, A, _) {
							$.preventDefault();
							this.onTriggerClick()
						}, this);
				this.on("collapse", function($, A, _) {
							Ext.getDoc().un("mouseup", this.collapseIf, this)
						}, this, true);
				this.on("expand", function($, A, _) {
							Ext.getDoc().on("mouseup", this.collapseIf, this)
						}, this, true)
			},
			clearSearchHistory : function() {
				this.lastSelectedIndex = 0;
				this.lastSearchTerm = false
			},
			selectFirst : function() {
				this.focusAndSelect(this.store.data.first())
			},
			selectLast : function() {
				this.focusAndSelect(this.store.data.last())
			},
			selectPrevPage : function() {
				if (!this.rowHeight)
					return;
				var $ = Math.max(this.selectedIndex - this.rowsPerPage, 0);
				this.focusAndSelect(this.store.getAt($))
			},
			selectNextPage : function() {
				if (!this.rowHeight)
					return;
				var $ = Math.min(this.selectedIndex + this.rowsPerPage,
						this.store.getCount() - 1);
				this.focusAndSelect(this.store.getAt($))
			},
			search : function(A, _, $) {
				A = A || this.displayField;
				this.lastSearchTerm = _;
				var B = this.store.find.apply(this.store, arguments);
				if (B !== -1)
					this.focusAndSelect(B)
			},
			focusAndSelect : function(_) {
				var $ = typeof _ === "number" ? _ : this.store.indexOf(_);
				this.select($, this.isExpanded());
				this.onSelect(this.store.getAt(_), $, this.isExpanded())
			},
			calcRowsPerPage : function() {
				if (this.store.getCount()) {
					this.rowHeight = Ext.fly(this.view.getNode(0)).getHeight();
					this.rowsPerPage = this.maxHeight / this.rowHeight
				} else
					this.rowHeight = false
			}
		});
xds.FlyoutSelect = Ext.extend(Ext.ux.SelectBox, {
			listClass : "x-combo-list-small",
			width : 120,
			displayField : "text",
			initComponent : function() {
				this.store = new Ext.data.SimpleStore({
							fields : ["text"],
							expandData : true,
							data : this.data
						});
				delete this.data;
				xds.FlyoutSelect.superclass.initComponent.call(this)
			},
			initList : function() {
				Ext.form.ComboBox.prototype.initList.call(this);
				this.list.setZIndex(80005)
			}
		});
Ext.reg("flyoutselect", xds.FlyoutSelect);
Ext.ux.TileView = Ext.extend(Ext.DataView, {
	categoryName : "category",
	imagePath : "imagePath",
	imageName : "imageName",
	itemName : "text",
	itemDescription : "description",
	itemIconCls : "iconCls",
	itemSelector : "dd",
	initComponent : function() {
		this.tpl = new Ext.XTemplate(this.getMarkup(), {
					getCategory : this.getCategory,
					openCategory : this.openCategory,
					view : this
				});
		Ext.ux.TileView.superclass.initComponent.call(this)
	},
	getMarkup : function() {
		return [
				'<div class="x-tile-ct">',
				'<tpl for=".">',
				'<tpl if="this.openCategory(values, xindex, xcount)">',
				'<tpl if="xindex != 1">',
				'<div style="clear:left"></div></dl>',
				"</tpl>",
				'<h2><div unselectable="on" class="x-unselectable">{[this.getCategory(values)]}</div></h2>',
				"<dl>", "</tpl>", '<dd><img title="{text:htmlEncode}" src="',
				Ext.BLANK_IMAGE_URL, '" class="{', this.itemIconCls, '}"/>',
				"<div><h4>{", this.itemName, "}</h4><p>{",
				this.itemDescription, "}</p></div>", "</dd>",
				'<tpl if="xindex == xcount">',
				'<div style="clear:left"></div></dl>', "</tpl>", "</tpl>",
				"</div>"].join("")
	},
	openCategory : function(_, A, $) {
		var B = this.getCategory(_);
		if (this.lastCat != B) {
			this.lastCat = B;
			return true
		}
		return false
	},
	getCategory : function($) {
		return $[this.view.categoryName]
	},
	onClick : function($) {
		var _ = $.getTarget("h2", 3, true);
		if (_) {
			_.toggleClass("collapsed");
			_.next("dl").toggleClass("collapsed")
		} else
			return Ext.ux.TileView.superclass.onClick.apply(this, arguments)
	}
});
xds.MoreField = Ext.extend(Ext.BoxComponent, {
			defaultAutoCreate : {
				tag : "div",
				cls : "x-more-field",
				cn : [{
							tag : "span"
						}, {
							tag : "a",
							href : "#"
						}]
			},
			fieldClass : "x-form-text",
			isFormField : true,
			value : undefined,
			getName : function() {
				return this.name || this.id
			},
			onRender : function(_, A) {
				xds.MoreField.superclass.onRender.call(this, _, A);
				if (!this.el) {
					var $ = this.getAutoCreate();
					this.el = _.createChild($, A)
				}
				this.el.addClass([this.fieldClass, this.cls]);
				this.valueEl = this.el.child("span");
				this.btnEl = this.el.child("a");
				this.btnEl.swallowEvent("click", true);
				this.btnEl.on("click", this.onMoreClick, this);
				this.initValue()
			},
			onMoreClick : Ext.emptyFn,
			afterRender : function($, _) {
				xds.MoreField.superclass.afterRender.call(this);
				this.originalValue = this.getRawValue()
			},
			initValue : function() {
				if (this.value !== undefined)
					this.setValue(this.value)
			},
			isDirty : function() {
				return false
			},
			isValid : function() {
				return true
			},
			validate : function() {
				return true
			},
			processValue : function($) {
				return $
			},
			validateValue : function($) {
				return true
			},
			reset : Ext.emptyFn,
			markInvalid : Ext.emptyFn,
			clearInvalid : Ext.emptyFn,
			getRawValue : function() {
				return this.value
			},
			getValue : function() {
				return this.value
			},
			setRawValue : function($) {
				this.value = $;
				if (this.valueEl)
					this.valueEl.dom.innerHTML = $
			},
			setValue : function($) {
				this.setRawValue($)
			}
		});
Ext.reg("morefield", xds.MoreField);
xds.Project = Ext.extend(Ext.util.Observable, {
			constructor : function($) {
				Ext.apply(this, $)
			},
			save : function(_, $) {
				if (!xds.Project.file) {
					this.saveAs(_, $);
					return
				}
				xds.File.saveProject(this.getData(), _, $)
			},
			saveAs : function(_, $) {
				xds.File.saveProjectAs(this.getData(), _, $)
			},
			open : function() {
				xds.inspector.root.beginUpdate();
				var $ = xds.inspector.root;
				while ($.firstChild)
					$.removeChild($.firstChild);
				var A = this.components || [];
				for (var B = 0, _; _ = A[B]; B++)
					xds.inspector.restore(_, $);
				xds.inspector.root.endUpdate();
				if ($.firstChild)
					$.firstChild.select()
			},
			getData : function() {
				var $ = {
					name : this.name,
					file : this.file,
					components : []
				}, A = xds.inspector.root, _ = A.firstChild;
				while (_) {
					$.components.push(_.component.getInternals(true));
					_ = _.nextSibling
				}
				return $
			},
			viewJoson : function() {
				var $ = new xds.CJsonWindow({
							title : "查看Json源代码",
							jdb : this.getJson()
						});
				$.show()
			},
			viewFormJson : function() {
				var $ = new xds.CJsonWindow({
							title : "查看Json源代码",
							jdb : this.getJson()
						});
				alert($.getJsonSource())
			},
			getFormJsonCode : function() {
				var _ = new xds.CJsonWindow({
							title : "查看Json源代码",
							jdb : this.getJson()
						}), $ = _.getJsonSource();
				return $
			},
			getFormItems : function() {
				var _ = xds.inspector.root.firstChild, A = _.childNodes, $ = "";
				for (var B = 0; B < A.length; B++) {
					if (B > 0)
						$ += ",";
					$ += Ext.util.JSON.encode(A[B].component.config)
				}
				return $
			},
			getJson : function() {
				var B = xds.inspector.root, _ = B.firstChild, $ = {
					components : []
				};
				while (_) {
					$.components.push(_.component.getJsonConfig(true));
					_ = _.nextSibling
				}
				function A($) {
					if (typeof($.cn) != "undefined") {
						$.fields = $.cn;
						delete $.cn
					}
				}
				function D(_) {
					if (_.xtype == "grid")
						_.columns = [];
					if (typeof(_.cn) != "undefined") {
						var C = 0, B = _.cn.length, $ = 0;
						while (C < B) {
							if (typeof(_.cn[C].dock) != "undefined") {
								_[_.cn[C].dock] = _.cn[C].cn || [];
								delete _.cn[C];
								$++;
								C++;
								continue
							}
							switch (_.cn[C].xtype) {
								case "gridcolumn" :
								case "booleancolumn" :
								case "stringcolumn" :
								case "datecolumn" :
								case "numbercolumn" :
									delete _.cn[C].xtype;
									_.columns.push(_.cn[C]);
									delete _.cn[C];
									$++;
									break;
								case "jsonstore" :
								case "arraystore" :
								case "xmlstore" :
									A(_.cn[C]);
									_.store = Ext.apply({}, _.cn[C]);
									delete _.cn[C];
									$++;
									break
							}
							C++
						}
						if ($ < B) {
							_.items = _.cn;
							delete _.cn
						} else
							delete _.cn;
						if (typeof(_.items) != "undefined") {
							B = _.items.length;
							for (C = 0; C < B; C++)
								if (typeof(_.items[C]) != "undefined")
									D(_.items[C])
						}
						if (typeof(_.tbar) != "undefined") {
							B = _.tbar.length;
							for (C = 0; C < B; C++)
								if (typeof(_.tbar[C]) != "undefined")
									D(_.tbar[C])
						}
						if (typeof(_.fbar) != "undefined") {
							B = _.fbar.length;
							for (C = 0; C < B; C++)
								if (typeof(_.fbar[C]) != "undefined")
									D(_.fbar[C])
						}
						if (typeof(_.bbar) != "undefined") {
							B = _.bbar.length;
							for (C = 0; C < B; C++)
								if (typeof(_.bbar[C]) != "undefined")
									D(_.bbar[C])
						}
						if (typeof(_.store) != "undefined")
							if (typeof(_.store) != "object")
								delete _.store
					}
				}
				for (var C = 0; C < $.components.length; C++)
					D($.components[C]);
				return ($.components)
			},
			setData : function($) {
				Ext.apply(this, $)
			},
			doClose : function() {
				var _ = xds.inspector.root;
				while (_.firstChild) {
					var $ = _.removeChild(_.firstChild);
					$.destroy()
				}
				delete xds.Project.file;
				xds.canvas.clear()
			},
			close : function(_, $) {
				if (xds.inspector.root.firstChild)
					Ext.Msg.show({
								title : "Confirm",
								msg : "save this project?",
								buttons : Ext.Msg.YESNOCANCEL,
								fn : function($) {
									if ($ == "yes") {
										this.save({
													callback : function() {
														this.doClose()
													},
													scope : this
												});
										_()
									} else if ($ == "no") {
										this.doClose();
										_()
									}
								},
								scope : this
							});
				else {
					this.doClose();
					if (_)
						Ext.callback(_, this)
				}
			}
		});
xds.Config = function($) {
	Ext.apply(this, $);
	if (!xds.Config.editors.string)
		Ext.apply(xds.Config.editors, {
					options : new Ext.grid.GridEditor(new Ext.ux.SelectBox({
								listClass : "x-combo-list-small",
								store : new Ext.data.SimpleStore({
											fields : ["text"],
											expandData : true
										}),
								displayField : "text"
							})),
					date : new Ext.grid.GridEditor(new Ext.form.DateField({
								selectOnFocus : true
							})),
					string : new Ext.grid.GridEditor(new Ext.form.TextField({
								selectOnFocus : true
							})),
					code : new Ext.grid.GridEditor(new Ext.form.TextArea({
										width : 250,
										height : 100
									}), {
								constrain : true
							}),
					object : new Ext.grid.GridEditor(new Ext.form.TextArea({
										width : 250,
										height : 100
									}), {
								constrain : true
							}),
					number : new Ext.grid.GridEditor(new Ext.form.NumberField({
								selectOnFocus : true,
								style : "text-align:left;"
							}))
				})
};
xds.Config.prototype = {
	name : "",
	defautValue : "",
	type : "String",
	htmlEncode : true,
	editor : "string",
	setFn : "setConfig",
	getFn : "getConfigValue",
	getValue : function($) {
		return $[this.getFn](this.name)
	},
	setValue : function(_, A) {
		var B = _[this.getFn](this.name);
		_[this.setFn](this.name, A);
		if (String(B) !== String(A))
			if (typeof this.updateFn == "string") {
				var $ = _.getExtComponent();
				$[this.updateFn](A)
			} else if (typeof this.updateFn == "function")
				this.updateFn(_.getExtComponent(), A, _);
			else
				xds.fireEvent("componentchanged")
	},
	getEditor : function() {
		if (this.editor == "options") {
			var $ = xds.Config.editors.options;
			$.field.store.loadData(this.options);
			return $
		}
		return xds.Config.editors[this.editor]
	},
	render : function(A, _, $) {
		return A
	}
};
xds.Config.String = Ext.extend(xds.Config, {
			type : "String",
			defaultValue : "",
			htmlEncode : true,
			editor : "string"
		});
xds.Config.Number = Ext.extend(xds.Config, {
			type : "Number",
			defaultValue : 0,
			htmlEncode : false,
			editor : "number"
		});
xds.Config.Boolean = Ext.extend(xds.Config, {
			type : "Boolean",
			defaultValue : false,
			editor : "boolean",
			htmlEncode : false,
			render : function(A, _, $) {
				A = A === undefined ? this.defaultValue : A;
				return '<span class="bcheck"><input type="checkbox" class="'
						+ $.id + '"' + (A ? " checked" : "") + "></span>"
			}
		});
xds.Config.Object = Ext.extend(xds.Config.String, {
			type : "Object",
			defaultValue : null,
			editor : "object",
			render : function() {
				return "[object]..."
			},
			setValue : function(c, value) {
				if (typeof value != "object") {
					value = Ext.util.Format.trim(value);
					var o;
					eval("o = " + (value.length > 0 ? value : "null") + ";");
					c.setConfig(this, o)
				} else
					c.setConfig(this, value);
				xds.fireEvent("componentchanged")
			}
		});
xds.Config.Array = Ext.extend(xds.Config.Object, {});
xds.Config.types = {
	string : xds.Config.String,
	number : xds.Config.Number,
	"boolean" : xds.Config.Boolean,
	object : xds.Config.Object
};
xds.Config.editors = {};
xds.editorConfigs = new Ext.util.MixedCollection(false, function($) {
			return $.name
		});
xds.editorConfigs.addAll([new xds.Config.String({
					name : "name",
					ctype : "string",
					group : "(Designer)",
					getValue : function($) {
						return ($.name == $.defaultName) ? $.id : $.name
					},
					setValue : function(_, A) {
						var B = _.id, $ = xds.inspector.getNodeById(_.id);
						if (xds.canvas.selectedId == B)
							xds.canvas.selectedId = A;
						$.setNodeId(A);
						$.setText(A)
					}
				}), new xds.Config.String({
					name : "userXType",
					ctype : "string",
					group : "(Designer)",
					getValue : function($) {
						return $.userXType
					},
					setValue : function($, _) {
						$.userXType = _
					}
				})]);
xds.dockConfigs = new Ext.util.MixedCollection(false, function($) {
			return $.name
		});
xds.dockConfigs.addAll([new xds.Config.String({
			name : "dock",
			ctype : "string",
			group : "(Designer)",
			editor : "options",
			options : ["(none)", "bbar", "tbar", "fbar"],
			getValue : function($) {
				return $.dock
			},
			setValue : function($, _) {
				if (_ == "(none)")
					_ = undefined;
				$.dock = _;
				$.setSuffix(_);
				xds.fireEvent("componentchanged")
			}
		})]);
xds.commonConfigs = ["id", "itemId", "title", "text", "layout", "width",
		"height", "autoScroll", "url", "name", "fieldLabel", "iconCls"];
xds.MainMenu = Ext.extend(Ext.Toolbar, {
			id : "app-menu",
			defaults : {
				minWidth : 42
			},
			initComponent : function() {
				this.items = [{
					text : "File",
					menu : [xds.actions.newAction, "-", xds.actions.openAction,
							"-", xds.actions.saveAction,
							xds.actions.saveAsAction]
				}, {
					text : "Project",
					menu : [xds.actions.newCmpAction,
							xds.actions.deleteCmpAction]
				}, {
					text : "Help",
					menu : [xds.actions.help, "-", xds.actions.aboutXds]
				}];
				xds.MainMenu.superclass.initComponent.call(this)
			}
		});
xds.actions = {
	saveAction : new Ext.Action({
				iconCls : "icon-project-save",
				itemText : "Save Project",
				tooltip : "Save Project",
				handler : function() {
					xds.project.save()
				}
			}),
	saveAsAction : new Ext.Action({
				iconCls : "icon-project-saveas",
				itemText : "Save Project As...",
				tooltip : "Save Project As",
				handler : function() {
					xds.project.saveAs()
				}
			}),
	newAction : new Ext.Action({
				iconCls : "icon-project-new",
				itemText : "New Project",
				tooltip : "New Project",
				handler : function() {
					xds.project.close(function() {
								var $ = new xds.Project();
								$.open()
							})
				}
			}),
	openAction : new Ext.Action({
				iconCls : "icon-project-open",
				itemText : "Open Project...",
				tooltip : "Open Project",
				handler : function() {
					xds.project.close(function() {
								xds.File.openProject(function($) {
											var _ = new xds.Project($);
											_.open()
										})
							})
				}
			}),
	newCmpAction : new Ext.Action({
				iconCls : "icon-cmp-new",
				tooltip : "New Component",
				itemText : "New Component...",
				handler : function() {
					var $ = new xds.CWindow({
								title : "New Component"
							});
					$.show()
				}
			}),
	deleteCmpAction : new Ext.Action({
				iconCls : "icon-cmp-delete",
				tooltip : "Delete Component",
				disabled : true,
				itemText : "Delete Component",
				handler : function() {
					xds.inspector.removeComponent(xds.active.component)
				}
			}),
	help : new Ext.Action({
				iconCls : "icon-about",
				tooltip : "Visit the forum",
				itemText : "Visit the forum",
				handler : function() {
					window.parentSandboxBridge.openURL("http://bbs.extgui.cn")
				}
			}),
	aboutXds : new Ext.Action({
		tooltip : "About Ext Designer",
		itemText : "About",
		handler : function() {
			Ext.Msg
					.alert(
							"About ",
							"Ext Designer is a tool to assist in the rapid development of Ext Applications.")
		}
	}),
	viewJson : new Ext.Action({
				iconCls : "icon-view-json",
				itemText : "查看源代码",
				tooltip : "查看源代码",
				handler : function() {
					xds.project.viewJoson()
				}
			})
};
xds.Component = Ext.extend(Ext.util.Observable, {
			isContainer : false,
			isVisual : true,
			nameSuffix : "",
			filmCls : "",
			flyoutCls : "",
			minWidth : 10,
			minHeight : 10,
			snapToGrid : 10,
			showGrid : true,
			constructor : function($) {
				Ext.apply(this, $);
				this.defaultName = this.nextName();
				this.name = this.name || this.defaultName;
				this.id = this.id || this.nextId();
				this.userConfig = this.userConfig || {
					name : this.name
				};
				if (this.enableFlyout)
					this.flyoutCls = "xds-flyout"
			},
			setOwner : function($) {
				if (this.owner && !$)
					this.setName(this.id);
				this.owner = $;
				delete this.config
			},
			setConfig : function(_, $) {
				this.userConfig[_] = $;
				if (this.config)
					this.config[_] = $;
				if (_ == "id"
						|| _ == "itemId"
						|| (_ == "name" && !this.getConfigValue("id") && !this
								.getConfigValue("itemId")))
					this.setName($);
				if (_ == "layout") {
					delete this.layoutConfig;
					xds.props.refresh.defer(100, xds.props);
					if (xds.Layouts[$] && xds.Layouts[$].onInit)
						xds.Layouts[$].onInit(this.getNode())
				}
			},
			getSnapToGrid : function($) {
				return !this.snapToGrid ? "(none)" : this.snapToGrid
			},
			setSnapToGrid : function($, _) {
				this.snapToGrid = _ == "(none)" ? 0 : parseInt(_, 10)
			},
			setName : function($) {
				this.name = $;
				this.getNode().setText($ + this.nameSuffix)
			},
			getConfig : function() {
				if (!this.config) {
					this.config = Ext.apply({
								xtype : this.xtype
							}, this.defaultConfig);
					this.initConfig(this.config, this.owner);
					Ext.apply(this.config, this.userConfig)
				}
				return this.config
			},
			getJsonConfig : function(C) {
				var B = null;
				if (!B) {
					B = Ext.apply({
								xtype : this.xtype,
								dock : this.dock,
								name : (this.name == this.defaultName)
										? this.id
										: (this.name || this.defaultName),
								id : this.id,
								xcls : this.xcls
							}, this.defaultConfig);
					this.initConfig(B, this.owner);
					Ext.apply(B, this.userConfig)
				}
				if (this.userXType)
					B.userXType = this.userXType;
				if (C) {
					var $ = this.getNode();
					if ($.hasChildNodes()) {
						B.cn = [];
						for (var A = 0, _; _ = $.childNodes[A]; A++)
							B.cn.push(_.component.getJsonConfig(true))
					}
				}
				return B
			},
			getConfigValue : function($) {
				return this.getConfig()[$]
			},
			isSet : function($) {
				return this.userConfig[$] !== undefined
			},
			initConfig : function($, _) {
			},
			nextName : function() {
				return Ext.getCmp("structure").nextId(this.naming)
			},
			nextId : function() {
				return Ext.getCmp("structure").nextId(this.naming)
			},
			getNode : function() {
				if (!this.node) {
					var $ = this.attrs = {
						id : this.id,
						text : (this.name == this.defaultName)
								? (this.id || this.defaultName)
								: this.name,
						iconCls : this.iconCls,
						leaf : true
					};
					if (this.isContainer) {
						$.leaf = false;
						$.children = [];
						$.expanded = true
					}
					this.node = new Ext.tree.TreeNode($);
					this.node.component = this
				}
				return this.node
			},
			getFilm : function() {
				return Ext.get("film-for-" + this.id)
			},
			isValidChild : function(_, $) {
				if (this.isContainer) {
					if (this.validChildTypes)
						return this.validChildTypes.contains(_);
					return xds.Registry.get(_).prototype.isVisual !== false
				}
				return false
			},
			isValidParent : function($) {
				return this.isVisual ? true : !!$
			},
			getConfigs : function() {
				return this.configs
			},
			getConfigObject : function(_) {
				if (this.configs.map[_])
					return this.configs.map[_];
				else {
					var $ = this.getLayoutConfigs();
					if ($ && $.map[_])
						return $.map[_];
					else {
						var B = this.getEditorConfigs();
						if (B && B.map[_])
							return B.map[_];
						else {
							var A = this.getContainerConfigs();
							if (A)
								return A.map[_]
						}
					}
				}
			},
			getContainerConfigs : function() {
				var $ = this.getConfigValue("layout");
				if ($ && $ != "auto")
					return xds.Layouts[$].layoutConfigs;
				return null
			},
			setContainerConfig : function(_, $) {
				this.layoutConfig = this.layoutConfig || {};
				this.layoutConfig[_] = $
			},
			getContainerConfigValue : function($) {
				return this.layoutConfig ? this.layoutConfig[$] : undefined
			},
			getLayoutConfigs : function() {
				if (this.owner) {
					var $ = this.owner.getConfigValue("layout");
					if ($ && $ != "auto")
						return xds.Layouts[$].configs
				}
				return null
			},
			getCommonConfigs : function() {
				if (!this.configs.common)
					this.configs.common = this.configs.filterBy(function($) {
								return xds.commonConfigs.indexOf($.name) !== -1
							});
				return this.configs.common
			},
			getEditorConfigs : function() {
				if (this.owner)
					return false;
				return xds.editorConfigs
			},
			createCanvasConfig : function($) {
				var A = Ext.apply({}, this.getConfig());
				A.xtype = this.dtype;
				A.stateful = false;
				A.viewerNode = $;
				if (this.layoutConfig)
					A.layoutConfig = Ext.apply({}, this.layoutConfig);
				if (this.snapToGrid && this.showGrid && A.layout == "absolute") {
					var B = "xds-grid-" + this.snapToGrid;
					A.bodyCssClass = A.bodyCssClass ? A.bodyCssClass + B : B
				}
				this.activeCmpId = A.id = Ext.id();
				if ($.hasChildNodes()) {
					A.items = [];
					for (var _ = 0, C = $.childNodes.length; _ < C; _++)
						if (!this.assignDocked(A, $.childNodes[_]))
							A.items.push($.childNodes[_].component
									.createCanvasConfig($.childNodes[_]));
					if (A.items.length < 1)
						delete A.items
				}
				return A
			},
			getActions : function() {
				return null
			},
			setSuffix : function($, _) {
				_ = _ || "loaded";
				if (!$)
					delete this.nameSuffix;
				else
					this.nameSuffix = ' <i class="xds-suffix-' + _ + '">&nbsp;'
							+ $ + "&nbsp;</i>";
				this.setName(this.name)
			},
			assignDocked : function(_, $) {
				$ = $.component ? $.component : $;
				if ($.dock) {
					_[$.dock] = $.createCanvasConfig($.getNode());
					return true
				}
				return false
			},
			syncFilm : function() {
				if (this.isVisual !== false) {
					var $ = Ext.getCmp(this.activeCmpId);
					if ($)
						$.syncFilm()
				}
			},
			getExtComponent : function() {
				return Ext.getCmp(this.activeCmpId)
			},
			isResizable : function() {
				return false
			},
			onFilmClick : Ext.emptyFn,
			getLabel : function($) {
				var C, _ = this.getExtComponent();
				if (_) {
					var B = _.el.up(".x-form-item", 3);
					if (B)
						C = B.down(".x-form-item-label");
					var A = _.el.next(".x-form-cb-label");
					if (C && C.getRegion().contains($.getPoint()))
						return {
							el : C,
							name : "fieldLabel"
						};
					else if (A && A.getRegion().contains($.getPoint()))
						return {
							el : A,
							name : "boxLabel"
						}
				}
				return null
			},
			onFilmDblClick : function($) {
				var _ = this.getLabel($);
				if (_)
					xds.canvas.startEdit(this, _.el, this
									.getConfigObject(_.name))
			},
			onSelectChange : function($) {
				this.selected = $
			},
			onFilmMouseDown : function($) {
				if (this.enableFlyout && $.getTarget("b", 1))
					this.delegateFlyout($)
			},
			delegateFlyout : function($) {
				if (this.enableFlyout)
					if (!this.flyout) {
						this.getNode().select();
						this.flyout = this.onFlyout($);
						if (this.flyout && !this.flyout.isVisible())
							this.flyout
									.showBy(this.getFlyoutButton(), "tl-tr?")
					} else
						this.flyout.destroy()
			},
			getFlyoutButton : function() {
				var $ = this.getFilm();
				return $ ? $.child("b") : null
			},
			hasConfig : function(_, $) {
				return this.getConfigValue(_) === $
			},
			getInternals : function(C) {
				var _ = {
					cid : this.cid,
					name : (this.name == this.defaultName)
							? this.id
							: this.name,
					dock : this.dock,
					layoutConfig : xds.copy(this.layoutConfig),
					userConfig : xds.copy(this.userConfig)
				};
				if (this.userXType)
					_.userXType = this.userXType;
				if (C) {
					var $ = this.getNode();
					if ($.hasChildNodes()) {
						_.cn = [];
						for (var B = 0, A; A = $.childNodes[B]; B++)
							_.cn.push(A.component.getInternals(true))
					}
				}
				return _
			},
			getDefaultInternals : function() {
				return {
					cid : this.cid
				}
			},
			getSpec : function() {
				return this.spec || this.getDefaultInternals()
			},
			beforeRemove : function() {
				if (this.flyout)
					this.flyout.destroy()
			},
			isAnchored : function() {
				var $ = this.owner ? this.owner.getConfigValue("layout") : "";
				return $ && this.getConfigValue("anchor")
						&& ($ == "form" || $ == "anchor" || $ == "absolute")
			},
			isFit : function() {
				var $ = this.owner ? this.owner.getConfigValue("layout") : "";
				return $ == "fit" || $ == "card"
			},
			setComponentX : function($, _) {
				$.setPosition(_)
			},
			setComponentY : function(_, $) {
				_.setPosition(undefined, $)
			}
		});
xds.Component.getFilmEl = function() {
	var $ = this.getPositionEl();
	if (this.fieldLabel)
		return this.el.up(".x-form-item") || $;
	return $
};
xds.Component.isValidDrop = function(_, $) {
	return _ != $ && (!_ || _.isValidChild($.cid)) && $.isValidParent(_)
};
xds.Registry = function() {
	var A = new Ext.util.MixedCollection(true, function($) {
				return $.prototype.cid
			}), $ = Ext.extend(Ext.data.JsonStore, {
				constructor : function() {
					$.superclass.constructor.call(this, {
								id : "cid",
								fields : [{
											name : "id",
											mapping : "cid"
										}, "xtype", "xcls", "typeDef", "text",
										"iconCls", "naming", "category",
										"isVisual"]
							})
				}
			}), _ = null;
	return {
		register : function($) {
			A.add($);
			$.prototype.__xdclass = $;
			var _ = $.prototype.configs || [];
			$.prototype.configs = $.configs = new Ext.util.MixedCollection(
					false, function($) {
						return $.name
					});
			for (var C = 0, B = _.length; C < B; C++)
				$.configs.add(new xds.Config.types[_[C].ctype](_[C]))
		},
		unregister : function($) {
			A.remove($)
		},
		get : function($) {
			return A.get($)
		},
		all : A,
		createStore : function(C) {
			if (!_) {
				_ = [];
				for (var E = 0, D = A.items.length; E < D; E++)
					_.push(A.items[E].prototype)
			}
			var B = new $();
			B.loadData(_);
			if (C)
				B.filter("isVisual", true);
			return B
		},
		addUserType : function($) {
			this.userTypes = this.userTypes || [];
			this.userTypes.push($)
		}
	}
}();
xds.Canvas = Ext.extend(Ext.Panel, {
	constructor : function() {
		xds.canvas = this;
		xds.on("componentselect", this.onComponentSelect, this, {
					delay : 10
				});
		xds.Canvas.superclass.constructor.call(this, {
					id : "canvas",
					region : "center",
					baseCls : "x-plain",
					layout : "auto",
					bodyStyle : "padding:5px;position:relative;left:0;top:0;",
					items : new Ext.Panel({
								baseCls : "x-plain"
							}),
					autoScroll : true,
					bregion : new Ext.lib.Region(0, 0, 0, 0),
					rregion : new Ext.lib.Region(0, 0, 0, 0),
					cregion : new Ext.lib.Region(0, 0, 0, 0)
				})
	},
	afterRender : function() {
		xds.Canvas.superclass.afterRender.call(this);
		this.body.on("mousedown", this.onBodyMouseDown, this);
		this.body.on("click", this.onBodyClick, this);
		this.body.on("contextmenu", this.onBodyContextMenu, this);
		this.body.on("mouseover", this.onBodyOver, this, {
					buffer : 50
				});
		this.body.on("mousemove", this.onBodyMove, this);
		this.body.on("dblclick", this.onBodyDblClick, this);
		Ext.getBody().on("mouseover", this.onDocOver, this);
		this.dropZone = new xds.Canvas.DropZone(this);
		this.dragTracker = new xds.Canvas.DragTracker({
					el : this.body
				})
	},
	isFlyoutBtnClick : function($) {
		if (this.selectedId) {
			var _ = xds.inspector.getNodeById(this.selectedId);
			if (_) {
				var A = _.component.getFlyoutButton();
				if (A && A.getRegion().contains($.getPoint()))
					return _.component
			}
		}
		return false
	},
	onBodyMouseDown : function(_, A, $) {
		if ($ = this.isFlyoutBtnClick(_)) {
			$.delegateFlyout(_);
			return
		}
		$ = this.findTarget(_);
		if ($)
			$.component.onFilmMouseDown(_)
	},
	onBodyDblClick : function(_, A) {
		var $ = this.findTarget(_);
		if ($)
			$.component.onFilmDblClick(_)
	},
	onBodyClick : function(_, A) {
		if (this.isFlyoutBtnClick(_))
			return;
		if (_.target == this.body.dom) {
			xds.inspector.getSelectionModel().clearSelections();
			return
		}
		var $ = this.findTarget(_);
		if ($) {
			var B = $.component.selected;
			if ($.component.onFilmClick(_, B) !== false)
				xds.fireEvent("componentclick", {
							component : $.component,
							node : $,
							event : _
						})
		}
	},
	onBodyOver : function($, _) {
		if (_ = $.getTarget(".el-film", 2))
			if (_ != this.overFilm) {
				this.overFilm = Ext.get(_);
				this.overFilm.addClass("el-film-over")
			}
	},
	onBodyMove : function(_, F) {
		if ((F = _.getTarget(".el-film", 2))) {
			if (_.getTarget("b", 1)) {
				var E = Ext.get(F);
				E.setStyle("cursor", "default");
				this.dragTracker.setDragMode("Absolute");
				return
			}
			var G = this.getTargetComponent(F);
			if (G) {
				var E = Ext.get(F), $ = E.lastRegion, A = 7, C = _.getPoint(), D = G.component
						.isResizable("Corner", _), H = this.bregion;
				H.top = $.bottom - A;
				H.left = $.left;
				H.right = $.right - (D ? A : 0);
				H.bottom = $.bottom;
				if (H.contains(C) && G.component.isResizable("Bottom", _)) {
					this.dragTracker.setDragMode("Bottom");
					E.setStyle("cursor", Ext.isAir ? "move" : "s-resize");
					return
				}
				var B = this.rregion;
				B.top = $.top;
				B.left = $.right - A;
				B.right = $.right;
				B.bottom = $.bottom - (D ? A : 0);
				if (B.contains(C) && G.component.isResizable("Right", _)) {
					this.dragTracker.setDragMode("Right");
					E.setStyle("cursor", Ext.isAir ? "move" : "e-resize");
					return
				}
				G = this.cregion;
				G.top = $.bottom - A;
				G.left = $.right - A;
				G.right = $.right;
				G.bottom = $.bottom;
				if (D && G.contains(C)) {
					this.dragTracker.setDragMode("Corner");
					E.setStyle("cursor", Ext.isAir ? "move" : "se-resize");
					return
				}
				E.setStyle("cursor", "default")
			}
			this.dragTracker.setDragMode("Absolute")
		}
	},
	onBodyContextMenu : function(_) {
		_.preventDefault();
		var A = this.findTarget(_, false);
		if (A) {
			var $ = this.getTargetComponent(A);
			if ($) {
				var B = xds.inspector.getContextMenu();
				$.select();
				B.node = $;
				B.showAt(_.getXY())
			}
		}
	},
	onDocOver : function($) {
		if (this.overFilm && !$.within(this.overFilm)) {
			this.overFilm.removeClass("el-film-over");
			delete this.overFilm
		}
	},
	beginUpdate : function() {
		this.updating = true
	},
	endUpdate : function($) {
		this.updating = false;
		if (this.updateCmp && $ !== true)
			this.setComponent(this.updateCmp)
	},
	setComponent : function(_) {
		if (this.updating) {
			this.updateCmp = _;
			return
		}
		if (_ && _.getOwnerTree)
			_ = this.createConfig(_);
		var A = this.items.items[0];
		if (A) {
			if (A.viewerNode)
				A.viewerNode.component.beforeRemove();
			this.remove(A)
		}
		if (_) {
			var $ = this.add(_);
			Ext.lib.Event.suspend();
			this.doLayout();
			$.show();
			Ext.lib.Event.resume();
			this.syncAll.defer(50, this)
		}
	},
	clear : function() {
		this.setComponent(null)
	},
	setComponentFromNode : function($) {
		this.setComponent(this.createConfig($))
	},
	createConfig : function($) {
		return $.component.createCanvasConfig($)
	},
	onComponentSelect : function($) {
		this.setSelected($.node ? $.node.id : null);
		if ($.component && this.editData
				&& $.component != this.editData.component)
			this.stopEdit()
	},
	setSelected : function($) {
		if (this.selectedId != $) {
			var B = Ext.get("film-for-" + this.selectedId);
			if (B) {
				B.removeClass("el-film-selected");
				B.setStyle(B.getStyle("z-index") - 1)
			} else {
				var A = Ext.get("chld-for-" + this.selectedId);
				if (A)
					A.up(".xds-floater").removeClass("chld-selected")
			}
		}
		this.selectedId = $;
		if ($) {
			var _ = Ext.get("film-for-" + this.selectedId);
			if (_) {
				_.addClass("el-film-selected");
				_.setStyle(_.getStyle("z-index") + 1)
			} else {
				A = Ext.get("chld-for-" + this.selectedId);
				if (A)
					A.up(".xds-floater").addClass("chld-selected")
			}
		}
	},
	syncAll : function() {
		if (xds.active && xds.active.topNode)
			xds.active.topNode.cascade(function() {
						this.component.syncFilm()
					});
		this.setSelected(this.selectedId)
	},
	getTargetComponent : function($) {
		var _ = $.id.substr(9);
		return xds.inspector.getNodeById(_)
	},
	findTarget : function(_, $) {
		var A = _.getTarget(".el-film", 2)
				|| _.getTarget(".xds-child-target", 2);
		if (A && $ !== false)
			return this.getTargetComponent(A);
		return A
	},
	getInlineEditor : function() {
		if (!this.inlineEd) {
			this.inlineEd = new Ext.Editor({
						alignment : "l-l?",
						completeOnEnter : true,
						autoSize : "width",
						zIndex : 60000,
						shadow : "drop",
						shadowOffset : 3,
						cls : "x-small-editor",
						field : {
							selectOnFocus : true
						},
						ignoreNoChange : false,
						doAutoSize : function() {
							if (typeof this.requestedWidth == "number")
								this.setSize(this.requestedWidth);
							else
								this.setSize(this.boundEl.getWidth())
						}
					});
			this.inlineEd.on("complete", this.onEditComplete, this)
		}
		return this.inlineEd
	},
	stopEdit : function() {
		if (this.inlineEd && this.inlineEd.editing)
			this.inlineEd.completeEdit()
	},
	startEdit : function($, A, D, C) {
		var _ = this.editData;
		if (_ && _.component == $ && _.el == A && _.config == D)
			return;
		this.stopEdit();
		this.editData = {
			component : $,
			el : A,
			config : D
		};
		var B = this.getInlineEditor();
		B.requestedWidth = C;
		B.startEdit(A, D.getValue($))
	},
	onEditComplete : function(A, $, _) {
		if (String($) != String(_))
			if (xds.active && xds.active.component == this.editData.component)
				xds.props.setValue(this.editData.config.name, $);
			else
				this.editData.config.setValue(this.editData.component, $);
		delete this.editData
	}
});
xds.Canvas.DropZone = Ext.extend(Ext.dd.DropZone, {
	constructor : function($) {
		this.allowContainerDrop = false;
		xds.Canvas.DropZone.superclass.constructor.call(this, $.bwrap, {});
		this.canvas = $;
		this.dragOverData = {};
		this.lastInsertClass = "xds-no-status"
	},
	ddGroup : "TreeDD",
	getTargetFromEvent : function($) {
		return $.getTarget(".xds-child-target", 2)
				|| $.getTarget(".el-film", 2) || this.canvas
	},
	isValidDropPoint : function(_, B, A) {
		var C = _ ? _.component : null, $ = B.node.component || B.node.instance;
		return xds.Component.isValidDrop(C, $)
	},
	onNodeEnter : function($, B, A, _) {
	},
	onNodeOver : function(D, C, $, A) {
		var _ = this.canvas.getTargetComponent(D);
		if (D == this.canvas)
			return this.isValidDropPoint(_, A, $)
					? "xds-dd-new"
					: this.dropNotAllowed;
		var B = A.node;
		if (this.isValidDropPoint(_, A, $))
			return "xds-dd-add";
		else
			return this.dropNotAllowed
	},
	onNodeOut : function($, B, A, _) {
	},
	onNodeDrop : function(D, C, $, A) {
		var _ = D == this.canvas ? null : this.canvas.getTargetComponent(D), B = A.node;
		if (this.isValidDropPoint(_, A, $)) {
			this.canvas.lastDropPoint = $.getPoint();
			xds.fireEvent("componentevent", {
						type : B.component ? "move" : "new",
						parentId : _ ? _.id : null,
						component : B.component ? B.component : B.instance
								.getSpec()
					});
			delete this.canvas.lastDropPoint;
			return true
		} else
			return false
	}
});
xds.Canvas.DragTracker = Ext.extend(Ext.dd.DragTracker, {
	autoStart : true,
	preventDefault : false,
	dragMode : "Absolute",
	setDragMode : function($) {
		if (!this.active && !this.waiting)
			this.dragMode = $
	},
	onMouseUp : function($) {
		this.waiting = false;
		xds.Canvas.DragTracker.superclass.onMouseUp.call(this, $)
	},
	isAbsolute : function($) {
		return ($.component.owner && $.component.owner.getConfigValue("layout") == "absolute")
	},
	onBeforeStart : function($) {
		var _ = $.getTarget(".el-film", 2);
		this.snapValue = false;
		if (_ && !$.getTarget("b", 1)) {
			this.node = xds.canvas.getTargetComponent(_);
			this.cmp = this.node.component;
			if (this.dragMode == "Absolute") {
				if (this.isAbsolute(this.node)) {
					this.pos = this.cmp.getExtComponent().getPosition(true);
					this.snapValue = this.node.component.owner.snapToGrid;
					this.startX = this.pos[0];
					this.startY = this.pos[1];
					this.waiting = true;
					return true
				}
			} else {
				this.startSize = this.cmp.getExtComponent().getSize();
				this.waiting = true;
				if (this.isAbsolute(this.node))
					this.snapValue = this.node.component.owner.snapToGrid;
				return true
			}
		}
		return false
	},
	onStart : function($) {
		this.waiting = false;
		this.node.select();
		this.cmp.getExtComponent().film.addClass("el-film-drag")
	},
	onDrag : function($) {
		this["onDrag" + this.dragMode]($, this.getOffset(), this.cmp
						.getExtComponent())
	},
	onDragAbsolute : function($, _, A) {
		A.setPosition(this.snap(this.startX - _[0]), this.snap(this.startY
						- _[1]));
		A.syncFilm()
	},
	onDragRight : function($, _, A) {
		A.setWidth(Math.max(this.cmp.minWidth, this.snap(this.startSize.width
						- _[0])));
		A.syncFilm()
	},
	onDragBottom : function($, _, A) {
		A.setHeight(Math.max(this.cmp.minHeight, this
						.snap(this.startSize.height - _[1])));
		A.syncFilm()
	},
	onDragCorner : function($, _, A) {
		A.setSize(Math.max(this.cmp.minWidth, this.snap(this.startSize.width
								- _[0])), Math.max(this.cmp.minHeight, this
								.snap(this.startSize.height - _[1])));
		A.syncFilm()
	},
	onEnd : function($) {
		var _ = this.cmp.getExtComponent();
		_.film.removeClass("el-film-drag");
		this["onEnd" + this.dragMode]($, this.getOffset(), _);
		if (_.ownerCt && _.ownerCt.layout) {
			delete _.anchorSpec;
			_.ownerCt.doLayout()
		}
	},
	onEndAbsolute : function(_, A, B) {
		var $ = B.getPosition(true);
		$[0] = this.snap($[0]);
		$[1] = this.snap($[1]);
		xds.canvas.beginUpdate();
		this.cmp.setConfig("x", $[0]);
		this.cmp.setConfig("y", $[1]);
		xds.props.setValue("x", $[0]);
		xds.props.setValue("y", $[1]);
		xds.canvas.endUpdate(true);
		xds.fireEvent("componentchanged")
	},
	onEndRight : function(A, $, _) {
		xds.canvas.beginUpdate();
		var B = _.getWidth();
		this.cmp.setConfig("width", B);
		xds.props.setValue("width", B);
		xds.canvas.endUpdate(true);
		xds.fireEvent("componentchanged")
	},
	onEndBottom : function(A, $, _) {
		xds.canvas.beginUpdate();
		var B = _.getHeight();
		this.cmp.setConfig("height", B);
		xds.props.setValue("height", B);
		xds.canvas.endUpdate(true);
		xds.fireEvent("componentchanged")
	},
	onEndCorner : function(_, $, B) {
		xds.canvas.beginUpdate();
		var A = B.getWidth();
		this.cmp.setConfig("width", A);
		xds.props.setValue("width", A);
		var C = B.getHeight();
		this.cmp.setConfig("height", C);
		xds.props.setValue("height", C);
		xds.canvas.endUpdate(true);
		xds.fireEvent("componentchanged")
	},
	snap : function(B, A) {
		A = A || this.snapValue;
		if (A < 1 || !B)
			return B;
		var _ = B, $ = A, C = B % $;
		if (C > 0)
			if (C > ($ / 2))
				_ = B + ($ - C);
			else
				_ = B - C;
		return _
	}
});
xds.ConfigEditor = Ext.extend(Ext.Panel, {
			constructor : function() {
				this.grid = new xds.PropGrid();
				this.grid.on("rowcontextmenu", this.onRowContext, this);
				xds.ConfigEditor.superclass.constructor.call(this, {
							id : "props",
							region : "south",
							margins : "0 0 0 0",
							title : "组件配置",
							layout : "fit",
							border : false,
							items : this.grid,
							disabled : true,
							split : true,
							height : Math.round(Ext.lib.Dom.getViewportHeight()
									* 0.4),
							tools : [{
										id : "expand-all",
										handler : function() {
											this.grid.view.expandAllGroups()
										},
										qtip : "展开",
										scope : this
									}, {
										id : "collapse-all",
										handler : function() {
											this.grid.view.collapseAllGroups()
										},
										qtip : "收起",
										scope : this
									}]
						})
			},
			findRecord : function($) {
				var _ = null;
				this.grid.store.each(function(A) {
							if (A.data.name == $) {
								_ = A;
								return false
							}
						});
				return _
			},
			findType : function(A) {
				var _ = xds.configs[xds.active.component.xcls].configs;
				for (var $ = 0, B = _.length; $ < B; $++)
					if (_[$].name == A)
						return _[$].type;
				return "String"
			},
			addAndEdit : function(B, $, _) {
				var A = xds.active.component.config;
				if (_ !== undefined || A[B] === undefined) {
					A[B] = _ !== undefined ? this.convertForType($, _) : this
							.getDefaultForType($);
					this.grid.setComponent(A)
				}
				if (_ === undefined) {
					var C = this.findRecord(B);
					if (C)
						this.grid.startEditing.defer(10, this.grid, [
										this.grid.store.indexOf(C), 1])
				} else
					xds.fireEvent("componentchanged")
			},
			getDefaultForType : function($) {
				$ = $.toLowerCase();
				switch ($) {
					case "string" :
						return "";
					case "boolean" :
						return false;
					case "number" :
						return 0;
					default :
						return ""
				}
			},
			convertForType : function(_, $) {
				_ = _.toLowerCase();
				switch (_) {
					case "string" :
						return "" + $;
					case "boolean" :
						return !($ === false || $ === "0" || $ === "false");
					case "number" :
						return $ === "" ? 0 : parseInt($, 10);
					default :
						return $
				}
			},
			onRowContext : function(A, _, $) {
				if (!this.contextMenu)
					this.contextMenu = new Ext.menu.Menu({
								items : [{
									text : "删除",
									iconCls : "icon-delete",
									handler : function() {
										xds.active.component
												.getConfigObject(this.contextProperty)
												.setValue(xds.active.component,
														undefined);
										this.refresh();
										xds.fireEvent("componentchanged")
									},
									scope : this
								}, "-", {
									text : "Refresh values",
									iconCls : "icon-refresh",
									handler : this.refresh,
									scope : this
								}]
							});
				this.contextProperty = this.grid.store.getAt(_).data.name;
				this.contextMenu.items.items[0].setText("Delete "
						+ this.contextProperty);
				this.contextMenu.showAt($.getXY());
				$.stopEvent()
			},
			refresh : function() {
				if (xds.active) {
					var $ = xds.active.component;
					this.grid.setComponent($)
				} else
					this.grid.clear()
			},
			setValue : function(_, $) {
				var A = this.grid.propStore.store.getById(_);
				if (A)
					A.set("value", $)
			}
		});
xds.Inspector = Ext.extend(Ext.tree.TreePanel, {
	constructor : function() {
		xds.inspector = this;
		xds.Inspector.superclass.constructor.call(this, {
			id : "structure",
			region : "center",
			split : true,
			height : 300,
			minHeight : 120,
			autoScroll : true,
			margins : "0 0 0 0",
			title : "组件视图",
			trackMouseOver : false,
			animate : false,
			autoScroll : true,
			useArrows : true,
			enableDD : true,
			border : false,
			rootVisible : false,
			tools : [{
						id : "expand-all",
						qtip : "展开",
						handler : function() {
							this.root.expand(true)
						},
						scope : this
					}, {
						id : "collapse-all",
						qtip : "收起",
						handler : function() {
							this.root.collapse(true)
						},
						scope : this
					}, {
						id : "refresh",
						qtip : "刷新",
						handler : function() {
							xds.fireEvent("componentchanged")
						}
					}],
			keys : [{
				key : Ext.EventObject.DELETE,
				fn : function() {
					if (xds.active)
						Ext.Msg.confirm("删除组件", "确定删除该组件？", function($) {
									if ($ == "yes" && xds.active)
										xds.inspector
												.removeComponent(xds.active.component)
								})
				}
			}]
		})
	},
	initComponent : function() {
		this.loader = new xds.Inspector.DemoLoader();
		this.root = {
			id : "croot",
			async : true,
			expanded : true,
			allowDrag : false,
			text : "croot",
			allowDrop : false
		};
		this.on("nodedragover", this.onDragOver, this);
		this.on("beforeappend", this.onBeforeAppend, this);
		this.on("beforenodedrop", this.onBeforeDrop, this);
		this.on("nodedrop", this.onAfterDrop, this);
		this.on("contextmenu", this.onNodeContext, this);
		xds.on("componentevent", this.onComponentEvent, this);
		xds.on("componentclick", this.onComponentClick, this);
		this.getSelectionModel().on("selectionchange", function(_, $) {
					var A = $;
					while (A && A.parentNode != this.root)
						A = A.parentNode;
					if (this.prevSelection) {
						this.prevSelection.onSelectChange(false);
						delete this.prevSelection
					}
					if ($ && $.component) {
						$.component.onSelectChange(true);
						this.prevSelection = $.component
					}
					xds.fireEvent("componentselect", {
								component : $ ? $.component : null,
								node : $,
								top : A ? A.component : null,
								topNode : A
							})
				}, this);
		xds.Inspector.superclass.initComponent.call(this)
	},
	onBeforeEdit : function(_, $, A) {
		return !this.getNodeById($)
	},
	onEdit : function(A, _, B) {
		var $ = this.editor.editNode
	},
	onComponentClick : function($) {
		if ($.node)
			$.node.select()
	},
	onBeforeAppend : function(B, _, $) {
		var A;
		if (_.component && (A = _.component.getConfigValue("layout")))
			if (xds.Layouts[A] && xds.Layouts[A].onBeforeAdd)
				xds.Layouts[A].onBeforeAdd(_, $)
	},
	removeComponent : function($) {
		var _ = $.attributes ? $ : this.getNodeById($.id);
		if (_) {
			if (_.isSelected())
				if (_.nextSibling)
					_.nextSibling.select();
				else if (_.previousSibling)
					_.previousSibling.select();
				else if (_.parentNode.component)
					_.parentNode.select();
				else
					xds.canvas.clear();
			_.parentNode.removeChild(_);
			if (!this.root.hasChildNodes())
				xds.canvas.clear()
		}
	},
	getContextMenu : function() {
		if (!this.contextMenu) {
			var $ = this.contextMenu = new Ext.menu.Menu({
				zIndex : 80000,
				items : [{
							text : "选择组件",
							iconCls : "icon-cmp-view",
							handler : function() {
								$.node.select()
							}
						}, "-", {
							itemId : "move-up",
							text : "上移",
							handler : function() {
								$.node.parentNode.insertBefore($.node,
										$.node.previousSibling);
								$.node.select();
								xds.fireEvent("componentchanged")
							}
						}, {
							itemId : "move-down",
							text : "下移",
							handler : function() {
								$.node.parentNode.insertBefore($.node,
										$.node.nextSibling.nextSibling);
								$.node.select();
								xds.fireEvent("componentchanged")
							}
						}, "-", {
							text : "删除",
							iconCls : "icon-delete",
							handler : function() {
								xds.inspector.removeComponent($.node.component);
								xds.fireEvent("componentchanged")
							}
						}],
				onContextShow : function() {
					this.items.get("move-up")
							.setDisabled(!$.node.previousSibling);
					this.items.get("move-down")
							.setDisabled(!$.node.nextSibling);
					$.node.ui.addClass("xds-context-node");
					var _ = $.node.component.getActions();
					if (_) {
						$.add(new Ext.menu.Separator({
									id : "actions-sep"
								}));
						for (var B = 0, A = _.length; B < A; B++)
							$.add(_[B])
					}
				},
				onContextClose : function() {
					var _ = $.node.component.getActions();
					if (_) {
						$.remove($.items.get("actions-sep"));
						for (var B = 0, A = _.length; B < A; B++)
							$.remove($.items.get(_[B].initialConfig.itemId))
					}
					$.node.ui.removeClass("xds-context-node")
				}
			});
			$.on("beforeshow", $.onContextShow, $);
			$.on("hide", $.onContextClose, $)
		}
		return this.contextMenu
	},
	onNodeContext : function(_, $) {
		var A = this.getContextMenu();
		A.node = _;
		A.showAt($.getXY());
		$.stopEvent()
	},
	nextId : function($) {
		if (!this.getNodeById($))
			return $;
		var _ = 0;
		while (this.getNodeById($ + (++_)));
		return $ + _
	},
	onDragOver : function($) {
		return xds.Component.isValidDrop(this
						.getDropPosition($.target, $.point).parent.component,
				$.dropNode.component || $.dropNode.instance)
	},
	onBeforeDrop : function($) {
		if (!xds.Component.isValidDrop(
				this.getDropPosition($.target, $.point).parent.component,
				$.dropNode.component || $.dropNode.instance))
			return false;
		if ($.tree == $.source.tree) {
			if (!$.dropNode.component.owner) {
				this.initCopy($.dropNode, $.target, $.point);
				$.dropStatus = true;
				return false
			}
			return true
		} else if ($.dropNode) {
			$.dropStatus = true;
			var A = this.getDropPosition($.target, $.point), _ = $.dropNode.instance
					.getSpec(), B = this.restore(_, A.parent, A.before);
			B.select();
			xds.fireEvent("componentchanged")
		}
		return false
	},
	getDropPosition : function($, A) {
		var _ = {};
		switch (A) {
			case "above" :
				_.parent = $.parentNode;
				_.before = $;
				break;
			case "below" :
				_.parent = $.parentNode;
				_.before = $.nextSibling;
				break;
			default :
				_.parent = $
		}
		return _
	},
	onAfterDrop : function($) {
		$.dropNode.select();
		$.dropNode.component.setOwner($.dropNode.parentNode.component);
		xds.fireEvent("componentchanged")
	},
	onComponentEvent : function(_) {
		var $ = _.parentId ? this.getNodeById(_.parentId) : this.root;
		if (_.type == "new") {
			this.restore(_.spec || _.component, $).select();
			xds.fireEvent("componentchanged")
		} else if (_.type == "move") {
			_.component.setOwner($.component);
			var A = _.component.getNode();
			$.appendChild(A);
			A.select();
			xds.fireEvent("componentchanged")
		}
	},
	initCopy : function(_, $, A) {
		Ext.Msg.show({
			title : "复制",
			msg : "Dropping a root level component here can not be undone. Would you like to copy it instead?",
			buttons : Ext.Msg.YESNOCANCEL,
			fn : function(C) {
				if (C == "yes") {
					var D = _.component.getInternals(true), B = this
							.getDropPosition($, A);
					this.restore(D, B.parent, B.before).select()
				} else if (C == "no") {
					B = this.getDropPosition($, A);
					_.component.setOwner(B.parent.component);
					B.parent.insertBefore(_, B.before);
					_.select();
					xds.fireEvent("componentchanged")
				}
			},
			scope : this
		})
	},
	restore : function(E, C, $) {
		C = C || this.root;
		var B = xds.create(E);
		delete B.cn;
		if (C)
			B.setOwner(C.component);
		var A = B.getNode();
		if (C)
			C.insertBefore(A, $);
		if (E.cn)
			for (var D = 0, _; _ = E.cn[D]; D++)
				this.restore(_, A);
		return A
	}
});
xds.Inspector.DemoLoader = Ext.extend(Ext.tree.TreeLoader, {
			load : function(_, $) {
				$()
			}
		});
xds.Toolbox = Ext.extend(Ext.tree.TreePanel, {
	constructor : function() {
		xds.Toolbox.superclass.constructor.call(this, {
					width : 200,
					region : "west",
					split : true,
					id : "toolbox",
					border : false,
					margins : "0 0 0 0",
					cmargins : "0 1 0 0",
					title : "工具栏",
					layout : "fit",
					collapsible : true,
					rootVisible : false,
					animate : false,
					autoScroll : true,
					useArrows : true,
					minWidth : 150,
					enableDrag : true,
					collapseFirst : false,
					animCollapse : false,
					animFloat : false,
					tools : [{
								id : "expand-all",
								handler : function() {
									this.root.expand(true)
								},
								qtip : "展开",
								scope : this
							}, {
								id : "collapse-all",
								handler : function() {
									this.root.collapse(true)
								},
								qtip : "收起",
								scope : this
							}]
				});
		xds.toolbox = this
	},
	initComponent : function() {
		this.loader = new xds.Toolbox.DemoLoader();
		this.root = {
			id : "troot",
			async : true,
			expanded : true,
			text : "troot"
		};
		xds.Toolbox.superclass.initComponent.call(this);
		this.getSelectionModel().on("beforeselect", function(_, $) {
					if ($ && !$.isLeaf()) {
						$.toggle();
						return false
					}
				});
		this.on("dblclick", this.onDblClick, this)
	},
	onDblClick : function($) {
		if ($.isLeaf() && xds.active
				&& xds.Component.isValidDrop(xds.active.component, $.instance)) {
			xds.inspector.restore($.instance.getSpec(), xds.active.node);
			xds.fireEvent("componentchanged")
		}
	},
	loadUserTypes : function() {
		var B = xds.Registry.userTypes;
		if (B) {
			var A = this.getNodeById("User_Components");
			if (A)
				while (A.firstChild)
					A.removeChild(A.firstChild);
			else
				A = this.root.appendChild({
							cls : "toolbox-ct",
							allowDrag : false,
							text : "User Components",
							id : "User_Components",
							leaf : false
						});
			A.beginUpdate();
			for (var C = 0, D; D = B[C]; C++) {
				var _ = xds.Registry.get(D.cid);
				if (_) {
					var $ = new Ext.tree.TreeNode({
								text : D.name,
								iconCls : _.prototype.iconCls,
								leaf : true,
								user : true
							});
					A.appendChild($);
					$.type = _;
					$.spec = D;
					$.instance = new _();
					$.instance.spec = D
				}
			}
			A.endUpdate();
			A.expand()
		}
	},
	onRender : function($, _) {
		xds.Toolbox.superclass.onRender.call(this, $, _);
		this.innerCt.setStyle("padding-bottom", "20px")
	}
});
xds.Toolbox.Loader = Ext.extend(Ext.tree.TreeLoader, {
			load : Ext.emptyFn
		});
xds.Toolbox.WebLoader = Ext.extend(xds.Toolbox.Loader, {});
xds.Toolbox.DemoLoader = Ext.extend(xds.Toolbox.Loader, {
			load : function(D, G) {
				if (D.id != "troot") {
					G();
					return
				}
				var E = D.getOwnerTree();
				D.beginUpdate();
				var F = xds.Registry.all.items;
				for (var C = 0, A = F.length, _, $, B; C < A; C++) {
					$ = F[C];
					B = "xdc" + $.prototype.category.replace(/\s/g, "_");
					_ = E.getNodeById(B);
					if (!_)
						_ = D.appendChild({
									cls : "toolbox-ct",
									allowDrag : false,
									text : $.prototype.category,
									id : B,
									leaf : false
								});
					var H = new Ext.tree.TreeNode({
								text : $.prototype.text,
								iconCls : $.prototype.iconCls,
								leaf : true
							});
					_.appendChild(H);
					H.type = $;
					H.instance = new $()
				}
				E.loadUserTypes();
				D.endUpdate();
				D.expand.defer(10, D, [true]);
				G();
				xds.fireEvent("componentsloaded")
			}
		});
xds.Layouts = {
	form : {
		id : "form",
		xcls : "Ext.layout.FormLayout",
		text : "Form Layout",
		configs : [{
					name : "anchor",
					group : "Ext.layout.FormLayout",
					ctype : "string"
				}, {
					name : "clearCls",
					group : "Ext.layout.FormLayout",
					ctype : "string"
				}, {
					name : "fieldLabel",
					group : "Ext.layout.FormLayout",
					ctype : "string"
				}, {
					name : "hideLabel",
					group : "Ext.layout.FormLayout",
					ctype : "boolean"
				}, {
					name : "itemCls",
					group : "Ext.layout.FormLayout",
					ctype : "string"
				}, {
					name : "labelSeparator",
					group : "Ext.layout.FormLayout",
					ctype : "string"
				}, {
					name : "labelStyle",
					group : "Ext.layout.FormLayout",
					ctype : "string"
				}],
		layoutConfigs : [{
					name : "labelAlign",
					group : "(Layout)",
					ctype : "string",
					editor : "options",
					options : ["left", "right", "top"]
				}, {
					name : "labelSeparator",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "string"
				}, {
					name : "labelPad",
					group : "Ext.layout.FormLayout",
					ctype : "number"
				}, {
					name : "labelWidth",
					group : "Ext.layout.FormLayout",
					ctype : "number"
				}]
	},
	table : {
		id : "table",
		xcls : "Ext.layout.TableLayout",
		text : "Table Layout",
		configs : [{
					name : "cellId",
					group : "Ext.layout.TableLayout",
					ctype : "string"
				}, {
					name : "cellCls",
					group : "Ext.layout.TableLayout",
					ctype : "string"
				}, {
					name : "colspan",
					group : "Ext.layout.TableLayout",
					ctype : "number"
				}, {
					name : "rowspan",
					group : "Ext.layout.TableLayout",
					ctype : "number"
				}],
		layoutConfigs : [{
					name : "columns",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "number"
				}]
	},
	card : {
		id : "card",
		xcls : "Ext.layout.CardLayout",
		text : "Card Layout",
		configs : [],
		layoutConfigs : [{
					name : "deferredRender",
					group : "(Layout)",
					ctype : "boolean",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					defaultValue : false
				}]
	},
	accordion : {
		id : "accordion",
		xcls : "Ext.layout.AccordionLayout",
		text : "Accordion Layout",
		configs : [],
		layoutConfigs : [{
					name : "fill",
					group : "(Layout)",
					ctype : "boolean",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					defaultValue : true
				}, {
					name : "autoWidth",
					group : "(Layout)",
					ctype : "boolean",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					defaultValue : true
				}, {
					name : "titleCollapse",
					group : "(Layout)",
					ctype : "boolean",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					defaultValue : true
				}, {
					name : "hideCollapseTool",
					group : "(Layout)",
					ctype : "boolean",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					defaultValue : false
				}, {
					name : "collapseFirst",
					group : "(Layout)",
					ctype : "boolean",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					defaultValue : false
				}, {
					name : "animate",
					group : "(Layout)",
					ctype : "boolean",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					defaultValue : false
				}, {
					name : "sequence",
					group : "(Layout)",
					ctype : "boolean",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					defaultValue : false
				}, {
					name : "activeOnTop",
					group : "(Layout)",
					ctype : "boolean",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					defaultValue : false
				}]
	},
	border : {
		id : "border",
		xcls : "Ext.layout.BorderLayout",
		text : "Border Layout",
		configs : [{
					name : "animFloat",
					group : "Ext.layout.BorderLayout",
					ctype : "boolean"
				}, {
					name : "autoHide",
					group : "Ext.layout.BorderLayout",
					ctype : "boolean"
				}, {
					name : "cmargins",
					group : "Ext.layout.BorderLayout",
					ctype : "string"
				}, {
					name : "collapseMode",
					group : "Ext.layout.BorderLayout",
					ctype : "string",
					editor : "options",
					options : ["standard", "mini"]
				}, {
					name : "floatable",
					group : "Ext.layout.BorderLayout",
					ctype : "boolean"
				}, {
					name : "margins",
					group : "Ext.layout.BorderLayout",
					ctype : "string"
				}, {
					name : "minHeight",
					group : "Ext.layout.BorderLayout",
					ctype : "number"
				}, {
					name : "minWidth",
					group : "Ext.layout.BorderLayout",
					ctype : "number"
				}, {
					name : "region",
					group : "Ext.layout.BorderLayout",
					ctype : "string",
					editor : "options",
					options : ["center", "east", "north", "south", "west"]
				}, {
					name : "split",
					group : "Ext.layout.BorderLayout",
					ctype : "boolean"
				}],
		onBeforeAdd : function(_, C) {
			var $ = ["center", "west", "east", "north", "south"], A = _.firstChild;
			while (A) {
				var B = A.component.getConfigValue("region");
				if (B) {
					var D = $.indexOf(B);
					if (D != -1)
						$.splice(D, 1)
				}
				A = A.nextSibling
			}
			C.component.setConfig("region", $[0])
		},
		onInit : function(_) {
			var $ = _.firstChild;
			while ($) {
				this.onBeforeAdd(_, $);
				$ = $.nextSibling
			}
		}
	},
	anchor : {
		id : "anchor",
		xcls : "Ext.layout.AnchorLayout",
		text : "Anchor Layout",
		configs : [{
					name : "anchor",
					group : "Ext.layout.AnchorLayout",
					ctype : "string"
				}]
	},
	absolute : {
		id : "absolute",
		xcls : "Ext.layout.AbsoluteLayout",
		text : "Absolute Layout",
		configs : [{
					name : "anchor",
					group : "Ext.layout.AbsoluteLayout",
					ctype : "string"
				}, {
					name : "x",
					group : "Ext.layout.AbsoluteLayout",
					ctype : "number"
				}, {
					name : "y",
					group : "Ext.layout.AbsoluteLayout",
					ctype : "number"
				}],
		layoutConfigs : [{
					name : "snapToGrid",
					group : "Ext.layout.AbsoluteLayout",
					setFn : "setSnapToGrid",
					getFn : "getSnapToGrid",
					ctype : "string",
					editor : "options",
					options : ["(none)", "5", "10", "15", "20"],
					defaultValue : "10"
				}],
		onBeforeAdd : function(_, B) {
			if (xds.canvas.lastDropPoint) {
				var $ = _.component.getExtComponent();
				if ($) {
					var A = $.getLayoutTarget()
							.translatePoints(xds.canvas.lastDropPoint);
					A.left = xds.canvas.dragTracker.snap(A.left,
							_.component.snapToGrid);
					A.top = xds.canvas.dragTracker.snap(A.top,
							_.component.snapToGrid);
					B.component.userConfig.x = A.left;
					B.component.userConfig.y = A.top
				}
			}
		}
	},
	column : {
		id : "column",
		xcls : "Ext.layout.ColumnLayout",
		text : "Column Layout",
		configs : [{
					name : "columnWidth",
					group : "Ext.layout.ColumnLayout",
					ctype : "number"
				}],
		layoutConfigs : [{
					name : "scrollOffset",
					group : "(Layout)",
					ctype : "number"
				}]
	},
	fit : {
		id : "fit",
		xcls : "Ext.layout.FitLayout",
		text : "Fit Layout",
		configs : []
	},
	hbox : {
		id : "hbox",
		xcls : "Ext.layout.HBoxLayout",
		text : "HBox Layout",
		configs : [{
					name : "flex",
					group : "Ext.layout.HBoxLayout",
					ctype : "number"
				}, {
					name : "margins",
					group : "Ext.layout.HBoxLayout",
					ctype : "string"
				}],
		layoutConfigs : [{
					name : "align",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "string",
					editor : "options",
					options : ["top", "middle", "stretch", "stretchmax"],
					defaultValue : "top"
				}, {
					name : "pack",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "string",
					editor : "options",
					options : ["start", "center", "end"],
					defaultValue : "start"
				}, {
					name : "padding",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "string",
					defaultValue : "0"
				}, {
					name : "scrollOffset",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "number",
					defaultValue : 0
				}]
	},
	vbox : {
		id : "vbox",
		xcls : "Ext.layout.VBoxLayout",
		text : "VBox Layout",
		configs : [{
					name : "flex",
					group : "Ext.layout.VBoxLayout",
					ctype : "number"
				}, {
					name : "margins",
					group : "Ext.layout.VBoxLayout",
					ctype : "string"
				}],
		layoutConfigs : [{
					name : "align",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "string",
					editor : "options",
					options : ["left", "center", "stretch", "stretchmax"],
					defaultValue : "top"
				}, {
					name : "pack",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "string",
					editor : "options",
					options : ["start", "center", "end"],
					defaultValue : "start"
				}, {
					name : "padding",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "string",
					defaultValue : "0"
				}, {
					name : "scrollOffset",
					group : "(Layout)",
					setFn : "setContainerConfig",
					getFn : "getContainerConfigValue",
					ctype : "number",
					defaultValue : 0
				}]
	}
};
xds.layouts = ["auto", "absolute", "accordion", "anchor", "border", "card",
		"column", "fit", "form", "hbox", "table", "vbox"];
(function() {
	for (var $ in xds.Layouts)
		if (xds.Layouts.hasOwnProperty($)) {
			xds.initConfigs("configs", xds.Layouts[$]);
			xds.initConfigs("layoutConfigs", xds.Layouts[$])
		}
})();
xds.StoreCache = new Ext.util.MixedCollection(false, function($) {
			return $.component.id
		});
Ext.intercept(Ext.StoreMgr, "register", function($) {
			if ($.cache === false)
				return false;
			if ($.component)
				xds.StoreCache.replace($)
		});
xds.Flyout = Ext.extend(Ext.Tip, {
			floating : {
				shadow : true,
				shim : true,
				useDisplay : false,
				constrain : false,
				zindex : 80001
			},
			cls : "component-info x-small-editor",
			width : 170,
			layout : "form",
			labelAlign : "top",
			initComponent : function() {
				xds.Flyout.superclass.initComponent.call(this);
				this.component.flyout = this;
				this.component.flyoutCls = "xds-flyout xds-flyout-open";
				this.component.getFlyoutButton().addClass("xds-flyout-open");
				this.mon(xds.canvas.el, "mousedown", this.doAutoClose, this);
				this.mon(xds.east.el, "mousedown", this.doAutoClose, this);
				this.mon(xds.toolbox.el, "mousedown", this.doAutoClose, this);
				this.syncTask = Ext.TaskMgr.start({
							run : function() {
								var $ = this.component.getFlyoutButton();
								if ($)
									this.showBy($, "tl-tr?")
							},
							scope : this,
							interval : 100
						})
			},
			beforeDestroy : function() {
				delete this.component.flyout;
				this.component.flyoutCls = "xds-flyout";
				xds.un("componentselect", this.doAutoClose, this);
				if (this.component.getFlyoutButton())
					this.component.getFlyoutButton()
							.removeClass("xds-flyout-open");
				Ext.TaskMgr.stop(this.syncTask);
				xds.Flyout.superclass.beforeDestroy.call(this)
			},
			doAutoClose : function($) {
				if (!$.within(this.el)
						&& $.target != this.component.getFlyoutButton().dom)
					this.destroy()
			},
			doAutoWidth : Ext.emptyFn
		});
xds.CJsonWindow = Ext.extend(Ext.Window, {
	iconCls : "icon-cmp",
	width : 620,
	height : 400,
	modal : true,
	plain : true,
	layout : "border",
	initComponent : function() {
		this.fbar = ["->", {
					text : "确定",
					handler : this.onAccept,
					scope : this
				}, {
					text : "取消",
					handler : this.close,
					scope : this
				}];
		var B = new Ext.tree.TreeNode({
					leaf : false,
					text : "组件树"
				}), E = {
			NOID : true,
			CLASS : true
		};
		this.cfg = E;
		function $(C) {
			var A = new Ext.tree.TreeNode({
						leaf : false,
						text : C.id,
						js : C
					});
			if (typeof(C.tbar) != "undefined") {
				var D = C.tbar.length, _ = new Ext.tree.TreeNode({
							expand : true,
							leaf : false,
							text : "tbar",
							iconCls : "icon-toolbar",
							js : C.tbar
						});
				for (var F = 0; F < D; F++)
					if (typeof(C.tbar[F]) != "undefined")
						_.appendChild($(C.tbar[F]));
				A.appendChild(_)
			}
			if (typeof(C.bbar) != "undefined") {
				var D = C.bbar.length, E = new Ext.tree.TreeNode({
							leaf : false,
							text : "bbar",
							iconCls : "icon-toolbar",
							js : C.bbar
						});
				for (F = 0; F < D; F++)
					if (typeof(C.bbar[F]) != "undefined")
						E.appendChild($(C.bbar[F]));
				A.appendChild(E)
			}
			if (typeof(C.fbar) != "undefined") {
				var D = C.fbar.length, B = new Ext.tree.TreeNode({
							leaf : false,
							text : "fbar",
							iconCls : "icon-toolbar",
							js : C.fbar
						});
				for (F = 0; F < D; F++)
					if (typeof(C.fbar[F]) != "undefined")
						B.appendChild($(C.fbar[F]));
				A.appendChild(B)
			}
			if (typeof(C.columns) != "undefined") {
				D = C.columns.length;
				for (F = 0; F < D; F++)
					if (typeof(C.columns[F]) != "undefined")
						A.appendChild(new Ext.tree.TreeNode({
									leaf : true,
									text : C.columns[F].header,
									iconCls : "icon-grid",
									js : C.columns[F]
								}))
			}
			if (typeof(C.store) != "undefined")
				A.appendChild(new Ext.tree.TreeNode({
							leaf : true,
							text : "store",
							iconCls : "icon-json",
							js : C.store
						}));
			if (typeof(C.items) != "undefined") {
				D = C.items.length;
				for (F = 0; F < D; F++)
					if (typeof(C.items[F]) != "undefined")
						A.appendChild($(C.items[F]))
			}
			return A
		}
		function F($) {
			return Object.prototype.toString.call($) === "[object Array]"
		}
		function D(C, B) {
			var A = true;
			for (var _ in C)
				switch (_) {
					case "name" :
					case "xcls" :
					case "xtype" :
					case "storeId" :
					case "id" :
					case "dock" :
						break;
					case "type" :
						if (C[_] != "auto")
							A = false;
						break;
					default :
						A = false
				}
			if (A)
				return "'" + C.name + "'";
			var $ = [];
			for (_ in C)
				switch (_) {
					case "xtype" :
					case "xcls" :
					case "storeId" :
					case "id" :
						break;
					case "type" :
						if (C[_] != "auto")
							$.push(_ + ':"' + C[_] + '"');
						break;
					default :
						switch (typeof(C[_])) {
							case "string" :
								$.push(_ + ':"' + C[_] + '"');
								break
						}
						break
				}
			return "{\n" + B + "\t" + $.join(",\n" + B + "\t") + "\n" + B + "}"
		}
		function C(B, _) {
			if (F(B)) {
				var A = B.length, $ = [];
				for (var C = 0; C < A; C++)
					$.push(D(B[C], _));
				return "[" + "\n" + _ + $.join(",\n" + _) + "\n" + _ + "]"
			}
			return "[]"
		}
		function A(G, $, F) {
			var I = "", B = G.name.split(".");
			if (B.length > 2) {
				I = 'Ext.ns("';
				var A = [];
				for (var H = 0; H < B.length - 1; H++)
					A.push(B[H]);
				I += A.join(".") + '");\n'
			}
			if (B.length == 1)
				G.name = "Ext." + G.name;
			I += G.name + "=Ext.extend(" + G.xcls + " ,{\n";
			var C = [];
			for (var D in G)
				switch (D) {
					case "name" :
						break;
					case "xcls" :
						break;
					case "userXType" :
						break;
					case "id" :
						if (E.NOID)
							break;
					case "items" :
					case "tbar" :
					case "fbar" :
					case "bbar" :
						break;
					break;
				default :
					switch (typeof(G[D])) {
						case "string" :
							C.push(D + ':"' + G[D].replace('"', '\\"') + '"');
							break;
						case "number" :
							C.push(D + ":" + G[D]);
							break;
						case "boolean" :
							C.push(D + ":" + (G[D] ? "true" : "false"));
							break;
						case "object" :
							C.push(D + ":" + _(G[D], null, F + "\t", false));
							break
					}
			}
		I += C.join(",\n" + F);
		if (C.length > 0)
			I += ",\n" + F;
		I += "initComponent: function(){\n";
		if (typeof(G.tbar) != "undefined")
			I += F + "\tthis.tbar=" + _(G.tbar, "button", F + "\t\t", false)
					+ "\n";
		if (typeof(G.fbar) != "undefined")
			I += F + "\tthis.fbar=" + _(G.fbar, "button", F + "\t\t", false)
					+ "\n";
		if (typeof(G.bbar) != "undefined")
			I += F + "\tthis.bbar=" + _(G.bbar, "button", F + "\t\t", false)
					+ "\n";
		if (typeof(G.items) != "undefined")
			if (typeof(G.defaultType) == "string")
				I += F + "\tthis.items="
						+ _(G.items, G.defaultType, F + "\t\t", false) + "\n";
			else
				I += F + "\tthis.items=" + _(G.items, null, F + "\t\t", false)
						+ "\n";
		I += "\t" + F + G.name + ".superclass.initComponent.call(this);\n" + F
				+ "}\n})";
		if (typeof(G.userXType) == "string")
			I += '\nExt.reg("' + G.userXType + '",' + G.name + ");";
		return I
	}
		function _(K, $, J, D, B) {
			if (!J)
				J = "";
			var N = "", G = F(K);
			if (!G && B && typeof(K.name) == "string")
				return A(K, $, J, false);
			if (D) {
				if (G)
					N = "[" + "\n" + J;
				else
					N = "var " + K.name + "=new " + K.xcls + "({" + "\n" + J
			} else if (G)
				N = "[" + "\n" + J;
			else
				N = "{" + "\n" + J;
			var H = [];
			if (G) {
				var L = K.length;
				for (var M = 0; M < L; M++)
					switch (typeof(K[M])) {
						case "string" :
							H.push('"' + K[M].replace('"', '\\"') + '"');
							break;
						case "number" :
							H.push(K[M]);
							break;
						case "boolean" :
							H.push(K[M] ? "true" : "false");
							break;
						case "object" :
							H.push(_(K[M], $, J + "\t", false));
							break
					}
			} else
				for (var I in K)
					switch (I) {
						case "xcls" :
							break;
						case "id" :
							if (E.NOID)
								break;
						case "name" :
							H.push(I + ':"' + K.name + '"');
							break;
						case "xtype" :
							if (!D)
								switch (K[I]) {
									case "tbfill" :
										return '"->"';
									case "tbseparator" :
										return '"-"';
									case "tbspacer" :
										return '" "'
								}
							if (typeof($) == "string" && $ == K[I])
								break;
							if (D)
								break;
						default :
							switch (typeof(K[I])) {
								case "string" :
									H.push(I + ':"' + K[I].replace('"', '\\"')
											+ '"');
									break;
								case "number" :
									H.push(I + ":" + K[I]);
									break;
								case "boolean" :
									H.push(I + ":" + (K[I] ? "true" : "false"));
									break;
								case "object" :
									switch (I) {
										case "items" :
											if (typeof(K.defaultType) == "string") {
												H
														.push(I
																+ ":"
																+ _(
																		K[I],
																		K.defaultType,
																		J
																				+ "\t",
																		false));
												break
											}
											switch (K.xtype) {
												case "buttongroup" :
													H.push(I
															+ ":"
															+ _(K[I], "button",
																	J + "\t",
																	false));
													break;
												default :
													H.push(I
															+ ":"
															+ _(K[I], null,
																	J + "\t",
																	false));
													break
											}
											break;
										case "bbar" :
										case "tbar" :
										case "fbar" :
											H.push(I
													+ ":"
													+ _(K[I], "button", J
																	+ "\t",
															false));
											break;
										case "fields" :
											H.push(I + ":" + C(K[I], J + "\t"));
											break;
										default :
											H.push(I
													+ ":"
													+ _(K[I], null, J + "\t",
															false))
									}
									break
							}
							break
					}
			if (D) {
				if (G)
					N += H.join(",\n" + J) + "\n"
							+ J.substring(0, J.length - 1) + "]";
				else
					N += H.join(",\n" + J) + "\n"
							+ J.substring(0, J.length - 1) + "})"
			} else if (G)
				N += H.join(",\n" + J) + "\n" + J.substring(0, J.length - 1)
						+ "]";
			else
				N += H.join(",\n" + J) + "\n" + J.substring(0, J.length - 1)
						+ "}";
			return N
		}
		this.objToString = _;
		for (var G = 0; G < this.jdb.length; G++)
			B.appendChild($(this.jdb[G]));
		this.items = [new Ext.Panel({
					region : "center",
					plain : true,
					border : false,
					layout : "fit",
					margins : "3 3 3 0",
					items : [{
								xtype : "textarea",
								id : "textarea-viewjson-value",
								fieldLabel : "Text",
								name : "textarea",
								value : this.getJsonSource()
							}],
					tbar : [{
						iconCls : "icon-copy",
						itemText : "Copy Code",
						tooltip : "Copy the code to clipboard.",
						handler : function() {
							var _ = window.parentSandboxBridge, $ = Ext
									.getCmp("textarea-viewjson-value");
							_.toClipboard($.getValue())
						}
					}, {
						iconCls : "icon-save",
						handler : function(_, $) {
							var A = Ext.getCmp("textarea-viewjson-value");
							window.parentSandboxBridge.saveJSAs({
										contents : A.getValue()
									})
						}
					}, "-", {
						iconCls : "icon-noid",
						enableToggle : true,
						pressed : true,
						text : "NoID",
						handler : function(_, $) {
							E.NOID = _.pressed
						}
					}, " ", {
						iconCls : "icon-class",
						enableToggle : true,
						pressed : true,
						text : "class",
						handler : function(_, $) {
							E.CLASS = _.pressed
						}
					}]
				}), new Ext.Panel({
			region : "west",
			plain : true,
			width : 180,
			margins : "3 3 3 3",
			items : [new Ext.tree.TreePanel({
				useArrows : true,
				animate : true,
				containerScroll : true,
				border : false,
				root : B,
				listeners : {
					click : function(B, $) {
						var C = Ext.getCmp("textarea-viewjson-value");
						if (!B.parentNode)
							C
									.setValue("/*click the treenode to view json data.*/");
						else {
							var A = B.attributes.js;
							C.setValue(_(A, null, "\t", true, E.CLASS))
						}
					}
				},
				scope : this
			})]
		})];
		xds.CJsonWindow.superclass.initComponent.call(this)
	},
	onAccept : function() {
		this.close()
	},
	getJsonSource : function() {
		if (this.jdb.length > 0)
			return this.objToString(this.jdb[0], null, "\t", true,
					this.cfg.CLASS);
		return ""
	}
});
xds.CWindow = Ext.extend(Ext.Window, {
			iconCls : "icon-cmp",
			width : 500,
			height : 350,
			layout : "border",
			plain : true,
			modal : true,
			initComponent : function() {
				this.items = [this.view = new Ext.ux.TileView({
									style : "background:#fff;overflow:auto",
									region : "center",
									categoryName : "category",
									store : new xds.Registry.createStore(true),
									singleSelect : true,
									trackOver : true,
									overClass : "x-tile-over"
								}), {
							layout : "form",
							region : "south",
							height : 29,
							bodyStyle : "padding:3px;border-top:1px solid #B7CCE4;",
							baseCls : "x-plain",
							labelWidth : 70,
							items : this.idField = new Ext.form.TextField({
										value : "MyComponent",
										selectOnFocus : true,
										fieldLabel : "Class Name",
										anchor : "100%"
									})
						}];
				this.buttons = [{
							text : "OK",
							disabled : true,
							handler : this.onAccept,
							scope : this
						}, {
							text : "Cancel",
							handler : this.close,
							scope : this
						}];
				this.view.on("selectionchange", this.onViewSelect, this);
				xds.CWindow.superclass.initComponent.call(this)
			},
			onViewSelect : function() {
				var $ = this.view.getSelectedRecords()[0];
				if ($) {
					this.buttons[0].enable();
					this.idField.setValue(xds.inspector.nextId($.data.naming))
				} else
					this.buttons[0].disable()
			},
			onAccept : function() {
				var _ = this.view.getSelectedRecords()[0], $ = xds.Registry
						.get(_.id);
				xds.fireEvent("componentevent", {
							type : "new",
							component : (new $()).getSpec()
						});
				this.close()
			}
		});
xds.types.Container = Ext.extend(xds.Component, {
			cid : "container",
			category : "容器",
			defaultName : "&lt;container&gt;",
			text : "Container",
			dtype : "xdcontainer",
			xtype : "container",
			xcls : "Ext.Container",
			iconCls : "icon-container",
			naming : "MyContainer",
			enableFlyout : true,
			isContainer : true,
			defaultConfig : {
				autoEl : "div"
			},
			initConfig : function($, _) {
				if (!_) {
					$.width = 400;
					$.height = 250
				}
			},
			isResizable : function(_, $) {
				return !this.isFit() && !this.isAnchored()
			},
			configs : [{
						name : "activeItem",
						group : "Ext.Container",
						ctype : "string"
					}, {
						name : "autoDestroy",
						group : "Ext.Container",
						ctype : "boolean"
					}, {
						name : "defaultType",
						group : "Ext.Container",
						ctype : "string"
					}, {
						name : "hideBorders",
						group : "Ext.Container",
						ctype : "boolean"
					}, {
						name : "layout",
						group : "Ext.Container",
						ctype : "string",
						editor : "options",
						options : xds.layouts
					}, {
						name : "autoHeight",
						group : "Ext.BoxComponent",
						ctype : "boolean"
					}, {
						name : "autoWidth",
						group : "Ext.BoxComponent",
						ctype : "boolean"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}],
			onFlyout : function() {
				var $ = [{
							xtype : "flyoutselect",
							fieldLabel : "选择布局方式",
							data : xds.layouts,
							bindTo : {
								component : this,
								name : "layout",
								event : "select",
								defaultValue : "auto"
							}
						}];
				if (this.owner && this.owner.hasConfig("layout", "border"))
					$.push({
								xtype : "flyoutselect",
								fieldLabel : "Select a region",
								data : ["north", "east", "center", "south",
										"west"],
								bindTo : {
									component : this,
									name : "region",
									event : "select"
								}
							});
				return new xds.Flyout({
							title : this.getNode().text,
							component : this,
							items : $
						})
			}
		});
xds.Registry.register(xds.types.Container);
xds.Container = Ext.extend(Ext.Container, {});
Ext.reg("xdcontainer", xds.Container);
xds.PanelBase = Ext.extend(xds.Component, {
			category : "容器",
			isContainer : true,
			enableFlyout : true,
			isResizable : function(_, $) {
				return !this.isFit() && !this.isAnchored()
			},
			initConfig : function($, _) {
				if (!_) {
					$.width = 400;
					$.height = 250
				}
			},
			autoScrollable : true,
			layoutable : true,
			getFlyoutItems : function() {
				var $ = [];
				if (this.layoutable)
					$.push({
								xtype : "flyoutselect",
								fieldLabel : "选择布局方式",
								data : xds.layouts,
								bindTo : {
									component : this,
									name : "layout",
									event : "select",
									defaultValue : "auto"
								}
							});
				if (this.autoScrollable)
					$.push({
								xtype : "checkbox",
								boxLabel : "Enable autoScroll",
								hideLabel : true,
								bindTo : {
									component : this,
									name : "autoScroll",
									event : "check"
								}
							});
				if (this.owner && this.owner.hasConfig("layout", "border"))
					$.push({
								xtype : "flyoutselect",
								fieldLabel : "Select a region",
								data : ["north", "east", "center", "south",
										"west"],
								bindTo : {
									component : this,
									name : "region",
									event : "select"
								}
							});
				if (this.hasConfig("layout", "absolute"))
					$.push({
								xtype : "flyoutselect",
								fieldLabel : "Snap to grid",
								data : ["(none)", 5, 10, 15, 20],
								bindTo : {
									component : this,
									name : "snapToGrid",
									event : "select"
								}
							});
				return $
			},
			onFlyout : function() {
				var $ = this.getFlyoutItems();
				return new xds.Flyout({
							title : this.getNode().text,
							component : this,
							items : $
						})
			},
			getPanelHeader : function() {
				var $ = this.getExtComponent();
				if ($.header && $.headerAsText)
					return $.header.child("span");
				return null
			},
			onFilmDblClick : function(_) {
				var $ = this.getPanelHeader();
				if ($ && $.getRegion().contains(_.getPoint()))
					this.startTitleEdit($);
				else
					xds.PanelBase.superclass.onFilmDblClick.call(this, _)
			},
			startTitleEdit : function($) {
				xds.canvas.startEdit(this, $ || this.getPanelHeader(), this
								.getConfigObject("title"), 150)
			}
		});
xds.types.FieldSet = Ext.extend(xds.Component, {
	cid : "fieldset",
	category : "容器",
	defaultName : "&lt;fieldset&gt;",
	text : "FieldSet",
	dtype : "xdfieldset",
	xtype : "fieldset",
	xcls : "Ext.form.FieldSet",
	iconCls : "icon-fieldset",
	naming : "MyFieldSet",
	isContainer : true,
	defaultConfig : {
		title : "My Fields",
		layout : "form"
	},
	initConfig : function($, _) {
		if (!_)
			$.width = 400
	},
	onFilmDblClick : function($) {
		var _ = this.getExtComponent();
		if (_.header && _.header.getRegion().contains($.getPoint()))
			xds.canvas.startEdit(this, _.header, this.getConfigObject("title"));
		else
			xds.types.Fieldset.superclass.onFilmDblClick.call(this, $)
	},
	configs : [{
				name : "checkboxName",
				group : "Ext.form.FieldSet",
				ctype : "string"
			}, {
				name : "checkboxToggle",
				group : "Ext.form.FieldSet",
				ctype : "boolean"
			}, {
				name : "title",
				group : "Ext.form.FieldSet",
				ctype : "string"
			}, {
				name : "animCollapse",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "autoScroll",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "baseCls",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "bodyStyle",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "collapsedCls",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "collapsible",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "html",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "maskDisabled",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "padding",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "autoDestroy",
				group : "Ext.Container",
				ctype : "boolean"
			}, {
				name : "defaultType",
				group : "Ext.Container",
				ctype : "string"
			}, {
				name : "hideBorders",
				group : "Ext.Container",
				ctype : "boolean"
			}, {
				name : "layout",
				group : "Ext.Container",
				ctype : "string",
				editor : "options",
				options : xds.layouts
			}, {
				name : "autoHeight",
				group : "Ext.BoxComponent",
				ctype : "boolean"
			}, {
				name : "autoWidth",
				group : "Ext.BoxComponent",
				ctype : "boolean"
			}, {
				name : "height",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageX",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageY",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "width",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "x",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "y",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "cls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "ctCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "disabled",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "disabledClass",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "hidden",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "hideMode",
				group : "Ext.Component",
				ctype : "string",
				editor : "options",
				options : ["display", "offsets", "visibility"]
			}, {
				name : "id",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "itemId",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "overCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "stateful",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "style",
				group : "Ext.Component",
				ctype : "string"
			}]
});
xds.Registry.register(xds.types.FieldSet);
xds.FieldSet = Ext.extend(Ext.form.FieldSet, {});
Ext.reg("xdfieldset", xds.FieldSet);
xds.types.Form = Ext.extend(xds.PanelBase, {
			cid : "form",
			defaultName : "&lt;form&gt;",
			text : "Form Panel",
			dtype : "xdform",
			xtype : "formpanel",
			xcls : "Ext.form.FormPanel",
			iconCls : "icon-form",
			naming : "MyForm",
			defaultConfig : {
				title : "My Form",
				labelWidth : 100,
				labelAlign : "left",
				layout : "form"
			},
			initConfig : function($, _) {
				if (!_) {
					$.width = 400;
					$.height = 250;
					$.padding = "10px"
				}
			},
			configs : [{
						name : "formId",
						group : "Ext.form.FormPanel",
						ctype : "string"
					}, {
						name : "itemCls",
						group : "Ext.form.FormPanel",
						ctype : "string"
					}, {
						name : "labelAlign",
						group : "Ext.form.FormPanel",
						ctype : "string",
						editor : "options",
						options : ["left", "right", "top"],
						defaultValue : "left"
					}, {
						name : "labelSeparator",
						group : "Ext.form.FormPanel",
						ctype : "string",
						defaultValue : ":"
					}, {
						name : "labelWidth",
						group : "Ext.form.FormPanel",
						ctype : "number"
					}, {
						name : "monitorPoll",
						group : "Ext.form.FormPanel",
						ctype : "number"
					}, {
						name : "monitorValid",
						group : "Ext.form.FormPanel",
						ctype : "boolean"
					}, {
						name : "animCollapse",
						group : "Ext.Panel",
						ctype : "boolean",
						defaultValue : true
					}, {
						name : "autoScroll",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "baseCls",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "bodyBorder",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "bodyStyle",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "border",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "buttonAlign",
						group : "Ext.Panel",
						ctype : "string",
						editor : "options",
						options : ["center", "left", "right"]
					}, {
						name : "collapsedCls",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "collapsible",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "disabled",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "elements",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "footer",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "frame",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "header",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "headerAsText",
						group : "Ext.Panel",
						ctype : "boolean",
						defaultValue : true
					}, {
						name : "hideCollapseTool",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "html",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "iconCls",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "maskDisabled",
						group : "Ext.Panel",
						ctype : "boolean",
						defaultValue : true
					}, {
						name : "minButtonWidth",
						group : "Ext.Panel",
						ctype : "number"
					}, {
						name : "padding",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "shadow",
						group : "Ext.Panel",
						ctype : "string",
						editor : "options",
						options : ["sides", "drop", "frame"]
					}, {
						name : "shadowOffset",
						group : "Ext.Panel",
						ctype : "number"
					}, {
						name : "tabTip",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "title",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "titleCollapse",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "unstyled",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "activeItem",
						group : "Ext.Container",
						ctype : "string"
					}, {
						name : "autoDestroy",
						group : "Ext.Container",
						ctype : "boolean"
					}, {
						name : "defaultType",
						group : "Ext.Container",
						ctype : "string"
					}, {
						name : "hideBorders",
						group : "Ext.Container",
						ctype : "boolean"
					}, {
						name : "layout",
						group : "Ext.Container",
						ctype : "string",
						editor : "options",
						options : xds.layouts
					}, {
						name : "autoHeight",
						group : "Ext.BoxComponent",
						ctype : "boolean"
					}, {
						name : "autoWidth",
						group : "Ext.BoxComponent",
						ctype : "boolean"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.Form);
xds.FormPanel = Ext.extend(Ext.form.FormPanel, {});
Ext.reg("xdform", xds.FormPanel);
xds.types.Panel = Ext.extend(xds.PanelBase, {
			cid : "panel",
			defaultName : "&lt;panel&gt;",
			text : "Panel",
			dtype : "xdpanel",
			xtype : "panel",
			xcls : "Ext.Panel",
			iconCls : "icon-panel",
			naming : "MyPanel",
			defaultConfig : {
				title : "My Panel"
			},
			configs : [{
						name : "animCollapse",
						group : "Ext.Panel",
						ctype : "boolean",
						defaultValue : true
					}, {
						name : "autoScroll",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "baseCls",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "bodyBorder",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "bodyStyle",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "border",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "buttonAlign",
						group : "Ext.Panel",
						ctype : "string",
						editor : "options",
						options : ["center", "left", "right"],
						defaultValue : "right"
					}, {
						name : "collapsedCls",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "collapsible",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "disabled",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "elements",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "footer",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "frame",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "header",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "headerAsText",
						group : "Ext.Panel",
						ctype : "boolean",
						defaultValue : true
					}, {
						name : "hideCollapseTool",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "html",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "iconCls",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "maskDisabled",
						group : "Ext.Panel",
						ctype : "boolean",
						defaultValue : true
					}, {
						name : "minButtonWidth",
						group : "Ext.Panel",
						ctype : "number"
					}, {
						name : "padding",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "shadow",
						group : "Ext.Panel",
						ctype : "string",
						editor : "options",
						options : ["sides", "drop", "frame"]
					}, {
						name : "shadowOffset",
						group : "Ext.Panel",
						ctype : "number"
					}, {
						name : "tabTip",
						group : "Ext.Panel",
						ctype : "string"
					}, {
						name : "title",
						group : "Ext.Panel",
						ctype : "string",
						updateFn : "setTitle"
					}, {
						name : "titleCollapse",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "unstyled",
						group : "Ext.Panel",
						ctype : "boolean"
					}, {
						name : "activeItem",
						group : "Ext.Container",
						ctype : "string"
					}, {
						name : "autoDestroy",
						group : "Ext.Container",
						ctype : "boolean"
					}, {
						name : "defaultType",
						group : "Ext.Container",
						ctype : "string"
					}, {
						name : "hideBorders",
						group : "Ext.Container",
						ctype : "boolean"
					}, {
						name : "layout",
						group : "Ext.Container",
						ctype : "string",
						editor : "options",
						options : xds.layouts
					}, {
						name : "autoHeight",
						group : "Ext.BoxComponent",
						ctype : "boolean"
					}, {
						name : "autoWidth",
						group : "Ext.BoxComponent",
						ctype : "boolean"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number",
						updateFn : "setHeight"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.Panel);
xds.Panel = Ext.extend(Ext.Panel, {});
Ext.reg("xdpanel", xds.Panel);
xds.types.TabPanel = Ext.extend(xds.PanelBase, {
	cid : "tabpanel",
	defaultName : "&lt;tabs&gt;",
	text : "TabPanel",
	dtype : "xdtabpanel",
	xtype : "tabpanel",
	xcls : "Ext.TabPanel",
	iconCls : "icon-tabs",
	naming : "MyTabs",
	layoutable : false,
	autoScrollable : false,
	defaultConfig : {
		activeTab : 0
	},
	configs : [{
				name : "activeTab",
				group : "Ext.TabPanel",
				ctype : "string",
				updateFn : "setActiveTab"
			}, {
				name : "baseCls",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "bodyBorder",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "bodyStyle",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "border",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "buttonAlign",
				group : "Ext.Panel",
				ctype : "string",
				editor : "options",
				options : ["center", "left", "right"],
				defaultValue : "right"
			}, {
				name : "collapsedCls",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "collapsible",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "disabled",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "maskDisabled",
				group : "Ext.Panel",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "minButtonWidth",
				group : "Ext.Panel",
				ctype : "number"
			}, {
				name : "tabTip",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "unstyled",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "activeItem",
				group : "Ext.Container",
				ctype : "string"
			}, {
				name : "autoDestroy",
				group : "Ext.Container",
				ctype : "boolean"
			}, {
				name : "defaultType",
				group : "Ext.Container",
				ctype : "string"
			}, {
				name : "hideBorders",
				group : "Ext.Container",
				ctype : "boolean"
			}, {
				name : "autoHeight",
				group : "Ext.BoxComponent",
				ctype : "boolean"
			}, {
				name : "autoWidth",
				group : "Ext.BoxComponent",
				ctype : "boolean"
			}, {
				name : "height",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageX",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageY",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "width",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "x",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "y",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "cls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "ctCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "disabled",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "disabledClass",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "hidden",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "hideMode",
				group : "Ext.Component",
				ctype : "string",
				editor : "options",
				options : ["display", "offsets", "visibility"]
			}, {
				name : "id",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "itemId",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "overCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "stateful",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "style",
				group : "Ext.Component",
				ctype : "string"
			}],
	getFlyoutItems : function() {
		var D = xds.types.TabPanel.superclass.getFlyoutItems.call(this), A = [], B = this, _ = this
				.getNode().childNodes;
		for (var C = 0, $; $ = _[C]; C++)
			if (!$.dock)
				A.push($.component.getConfigValue("title"));
		D.unshift({
					xtype : "flyoutselect",
					fieldLabel : "Active Item",
					data : A,
					bindTo : {
						component : this,
						name : "activeTab",
						event : "select",
						get : function() {
							var $ = B.getExtComponent(), _ = $.getActiveTab();
							if (_)
								return A[$.items.indexOf(_)];
							else
								return A[0]
						},
						set : function($) {
							var C = A.indexOf($.getValue()), _ = B
									.getConfigObject("activeTab");
							_.setValue(B, C);
							if (xds.active.component == B)
								xds.props.setValue("activeTab", C)
						}
					}
				});
		return D
	},
	getDefaultInternals : function() {
		return {
			cid : this.cid,
			cn : [{
						cid : "panel",
						userConfig : {
							title : "Tab 1"
						}
					}, {
						cid : "panel",
						userConfig : {
							title : "Tab 2"
						}
					}, {
						cid : "panel",
						userConfig : {
							title : "Tab 3"
						}
					}]
		}
	},
	getTabTarget : function(A) {
		if (A.getTarget("b", 1))
			return false;
		var _ = this.getExtComponent();
		if (_) {
			var F = A.getPoint(), $ = _.stripWrap.getRegion();
			if (!$.contains(F))
				return;
			var E = _.stripWrap.dom.getElementsByTagName("li"), B = false;
			for (var D = 0, C = E.length - 1; D < C; D++) {
				var G = E[D];
				if (Ext.fly(G).getRegion().contains(F)) {
					B = D;
					break
				}
			}
			return B
		}
		return false
	},
	getTabComponent : function(A) {
		var _ = 0, $ = this.getNode();
		for (var C = 0, B; B = $.childNodes[C]; C++)
			if (!B.dock)
				if (_ === A)
					return B.component;
				else
					_++;
		return null
	},
	onFilmClick : function($) {
		var _ = this.getTabTarget($);
		if (_ !== false) {
			var B = this.getConfigObject("activeTab");
			B.setValue(this, _);
			if (xds.active && xds.active.component == this)
				xds.props.setValue("activeTab", _);
			var A = this.getTabComponent(_);
			if (A) {
				A.getNode().select();
				return false
			}
		}
	},
	onFilmDblClick : function($) {
		var B = this.getTabTarget($);
		if (B !== false) {
			var A = this.getTabComponent(B), _ = this.getExtComponent()
					.getTabEl(B);
			xds.canvas.startEdit(A, _, A.getConfigObject("title"), 100)
		}
	}
});
xds.Registry.register(xds.types.TabPanel);
xds.TabPanel = Ext.extend(Ext.TabPanel, {});
Ext.reg("xdtabpanel", xds.TabPanel);
xds.types.Button = Ext.extend(xds.Component, {
			cid : "button",
			category : "标准控件",
			defaultName : "&lt;button&gt;",
			text : "Button",
			dtype : "xdbutton",
			xtype : "button",
			xcls : "Ext.Button",
			iconCls : "icon-button",
			naming : "MyButton",
			isContainer : true,
			filmCls : "el-film-nolabel",
			validChildTypes : ["menu"],
			defaultConfig : {
				text : "MyButton"
			},
			initConfig : function($, _) {
			},
			configs : [{
						name : "allowDepress",
						group : "Ext.Button",
						ctype : "boolean"
					}, {
						name : "arrowAlign",
						group : "Ext.Button",
						ctype : "string",
						editor : "options",
						options : ["bottom", "left", "right", "top"]
					}, {
						name : "clickEvent",
						group : "Ext.Button",
						ctype : "string",
						editor : "options",
						options : ["click", "mousedown"]
					}, {
						name : "enableToggle",
						group : "Ext.Button",
						ctype : "boolean"
					}, {
						name : "iconAlign",
						group : "Ext.Button",
						ctype : "string",
						editor : "options",
						options : ["bottom", "left", "right", "top"]
					}, {
						name : "iconCls",
						group : "Ext.Button",
						ctype : "string"
					}, {
						name : "menuAlign",
						group : "Ext.Button",
						ctype : "string"
					}, {
						name : "minWidth",
						group : "Ext.Button",
						ctype : "number"
					}, {
						name : "pressed",
						group : "Ext.Button",
						ctype : "boolean"
					}, {
						name : "repeat",
						group : "Ext.Button",
						ctype : "boolean"
					}, {
						name : "scale",
						group : "Ext.Button",
						ctype : "string",
						editor : "options",
						options : ["small", "medium", "large"]
					}, {
						name : "tabIndex",
						group : "Ext.Button",
						ctype : "number"
					}, {
						name : "text",
						group : "Ext.Button",
						ctype : "string"
					}, {
						name : "toggleGroup",
						group : "Ext.Button",
						ctype : "string"
					}, {
						name : "tooltip",
						group : "Ext.Button",
						ctype : "string"
					}, {
						name : "tooltipType",
						group : "Ext.Button",
						ctype : "string",
						editor : "options",
						options : ["title", "qtip"]
					}, {
						name : "type",
						group : "Ext.Button",
						ctype : "string",
						editor : "options",
						options : ["button", "reset", "submit"]
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}],
			onFilmDblClick : function($) {
				var _ = this.getExtComponent();
				xds.canvas.startEdit(this, _.el.child(_.buttonSelector), this
								.getConfigObject("text"), 80)
			}
		});
xds.Registry.register(xds.types.Button);
xds.Button = Ext.extend(Ext.Button, {});
Ext.reg("xdbutton", xds.Button);
xds.types.Label = Ext.extend(xds.Component, {
	cid : "label",
	category : "标准控件",
	defaultName : "&lt;label&gt;",
	text : "Label",
	dtype : "xdlabel",
	xtype : "label",
	xcls : "Ext.form.Label",
	iconCls : "icon-label",
	naming : "MyLabel",
	filmCls : "el-film-nolabel",
	defaultConfig : {
		text : "Label:"
	},
	isResizable : function(_, $) {
		return _ == "Right"
				&& !this.getConfigValue("anchor")
				&& (!this.owner || this.owner.getConfigValue("layout") != "form")
	},
	onFilmDblClick : function($) {
		var _ = this.getExtComponent();
		xds.canvas.startEdit(this, _.el, this.getConfigObject("text"))
	},
	configs : [{
				name : "forId",
				group : "Ext.form.Labl",
				ctype : "string"
			}, {
				name : "html",
				group : "Ext.form.Labl",
				ctype : "string"
			}, {
				name : "text",
				group : "Ext.form.Labl",
				ctype : "string"
			}, {
				name : "autoHeight",
				group : "Ext.BoxComponent",
				ctype : "boolean"
			}, {
				name : "autoWidth",
				group : "Ext.BoxComponent",
				ctype : "boolean"
			}, {
				name : "height",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageX",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageY",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "width",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "x",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "y",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "cls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "ctCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "disabled",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "disabledClass",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "hidden",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "hideMode",
				group : "Ext.Component",
				ctype : "string",
				editor : "options",
				options : ["display", "offsets", "visibility"]
			}, {
				name : "id",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "itemId",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "overCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "stateful",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "style",
				group : "Ext.Component",
				ctype : "string"
			}]
});
xds.Registry.register(xds.types.Label);
xds.Label = Ext.extend(Ext.form.Label, {});
Ext.reg("xdlabel", xds.Label);
xds.types.Toolbar = Ext.extend(xds.Component, {
			cid : "toolbar",
			category : "工具栏",
			defaultName : "&lt;toolbar&gt;",
			text : "Toolbar",
			dtype : "xdtoolbar",
			xtype : "toolbar",
			xcls : "Ext.Toolbar",
			iconCls : "icon-toolbar",
			naming : "MyToolbar",
			enableFlyout : true,
			isContainer : true,
			dock : "tbar",
			defaultConfig : {},
			initConfig : function($, _) {
				if (!_)
					$.width = 400
			},
			configs : [{
						name : "autoDestroy",
						group : "Ext.Container",
						ctype : "boolean"
					}, {
						name : "defaultType",
						group : "Ext.Container",
						ctype : "string"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}],
			getEditorConfigs : function() {
				if (!this.owner)
					return xds.types.Toolbar.superclass.getEditorConfigs
							.call(this);
				return xds.dockConfigs
			},
			onFlyout : function() {
				return new xds.Flyout({
							title : this.getNode().text,
							component : this,
							items : [{
										xtype : "flyoutselect",
										fieldLabel : "Dock in parent",
										data : ["(none)", "tbar", "bbar",
												"fbar"],
										bindTo : {
											component : this,
											name : "dock",
											event : "select",
											defaultValue : "(none)",
											clear : "(none)"
										}
									}]
						})
			},
			isValidParent : function($) {
				return !$ || $.getExtComponent().isXType("panel")
			}
		});
xds.Registry.register(xds.types.Toolbar);
xds.Toolbar = Ext.extend(Ext.Toolbar, {
			afterRender : function() {
				if (!this.items || this.items.length < 1)
					this.height = 27;
				xds.Toolbar.superclass.afterRender.call(this)
			}
		});
Ext.reg("xdtoolbar", xds.Toolbar);
xds.types.ButtonGroup = Ext.extend(xds.PanelBase, {
			cid : "buttongroup",
			category : "工具栏",
			defaultName : "&lt;buttongroup&gt;",
			text : "ButtonGroup",
			dtype : "xdbuttongroup",
			xtype : "buttongroup",
			xcls : "Ext.ButtonGroup",
			iconCls : "icon-toolbar",
			naming : "MyButtonGroup",
			enableFlyout : true,
			isContainer : true,
			defaultConfig : {
				title : "My ButtonGroup",
				columns : 3
			},
			initConfig : function($, _) {
				if (!_) {
					alert(true);
					$.width = 400
				}
			},
			configs : [{
						name : "title",
						group : "Ext.ButtonGroup",
						ctype : "string"
					}, {
						name : "columns",
						group : "Ext.ButtonGroup",
						ctype : "number"
					}, {
						name : "frame",
						group : "Ext.ButtonGroup",
						ctype : "boolean",
						defaultValue : true
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "icon",
						group : "Ext.BoxComponent",
						ctype : "string"
					}, {
						name : "iconCls",
						group : "Ext.BoxComponent",
						ctype : "string"
					}],
			isValidParent : function($) {
				return !$ || $.getExtComponent().isXType("toolbar")
			}
		});
xds.Registry.register(xds.types.ButtonGroup);
xds.ButtonGroup = Ext.extend(Ext.ButtonGroup, {});
Ext.reg("xdbuttongroup", xds.ButtonGroup);
xds.types.ToolbarSeparator = Ext.extend(xds.Component, {
			cid : "tbseparator",
			category : "工具栏",
			defaultName : "&lt;separator&gt;",
			text : "Separator",
			dtype : "xdtbseparator",
			xtype : "tbseparator",
			xcls : "Ext.Toolbar.Separator",
			iconCls : "icon-cmp",
			naming : "MySeparator",
			filmCls : "el-film-nolabel",
			isContainer : false,
			defaultConfig : {},
			configs : [{
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.ToolbarSeparator);
xds.ToolbarSeparator = Ext.extend(Ext.Toolbar.Separator, {});
Ext.reg("xdtbseparator", xds.ToolbarSeparator);
xds.types.ToolbarSpacer = Ext.extend(xds.Component, {
			cid : "tbspacer",
			category : "工具栏",
			defaultName : "&lt;spacer&gt;",
			text : "Spacer",
			dtype : "xdtbspacer",
			xtype : "tbspacer",
			xcls : "Ext.Toolbar.Spacer",
			iconCls : "icon-cmp",
			naming : "MySpacer",
			filmCls : "el-film-nolabel",
			isContainer : false,
			defaultConfig : {},
			configs : [{
						name : "width",
						group : "Ext.Toolbar.Spacer",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.ToolbarSpacer);
xds.ToolbarSpacer = Ext.extend(Ext.Toolbar.Spacer, {});
Ext.reg("xdtbspacer", xds.ToolbarSpacer);
xds.types.ToolbarText = Ext.extend(xds.Component, {
			cid : "tbtext",
			category : "工具栏",
			defaultName : "&lt;text&gt;",
			text : "Text Item",
			dtype : "xdtbtext",
			xtype : "tbtext",
			xcls : "Ext.Toolbar.TextItem",
			iconCls : "icon-cmp",
			naming : "MyText",
			filmCls : "el-film-nolabel",
			isContainer : false,
			defaultConfig : {
				text : "Text Item"
			},
			configs : [{
						name : "text",
						group : "Ext.Toolbar.TextItem",
						ctype : "string"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}],
			onFilmDblClick : function($) {
				xds.canvas.startEdit(this, this.getExtComponent().el, this
								.getConfigObject("text"), 80)
			}
		});
xds.Registry.register(xds.types.ToolbarText);
xds.ToolbarText = Ext.extend(Ext.Toolbar.TextItem, {});
Ext.reg("xdtbtext", xds.ToolbarText);
xds.types.ToolbarFill = Ext.extend(xds.Component, {
			cid : "tbfill",
			category : "工具栏",
			defaultName : "&lt;fill&gt;",
			text : "Fill",
			dtype : "xdtbfill",
			xtype : "tbfill",
			xcls : "Ext.Toolbar.Fill",
			iconCls : "icon-cmp",
			naming : "MyFill",
			filmCls : "el-film-nolabel",
			isContainer : false,
			defaultConfig : {},
			configs : [{
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.ToolbarFill);
xds.ToolbarFill = Ext.extend(Ext.Toolbar.Fill, {});
Ext.reg("xdtbfill", xds.ToolbarFill);
xds.types.GridPanel = Ext.extend(xds.PanelBase, {
	cid : "grid",
	category : "数据表格",
	defaultName : "&lt;grid&gt;",
	text : "Grid Panel",
	dtype : "xdgrid",
	xtype : "grid",
	xcls : "Ext.grid.GridPanel",
	iconCls : "icon-grid",
	naming : "MyGrid",
	isContainer : true,
	autoScrollable : false,
	layoutable : false,
	enableFlyout : false,
	validChildTypes : ["gridcolumn", "booleancolumn", "numbercolumn",
			"datecolumn", "templatecolumn", "jsonstore", "arraystore",
			"xmlstore", "toolbar", "pagingtoolbar"],
	defaultConfig : {
		title : "My Grid",
		store : "(none)"
	},
	initConfig : function($, _) {
		if (!_) {
			$.width = 400;
			$.height = 250
		}
	},
	isResizable : function(_, $) {
		return !this.isFit() && !this.isAnchored()
	},
	isValidChild : function($) {
		return this.supr().isValidChild.apply(this, arguments)
	},
	configs : [{
				name : "autoExpandColumn",
				group : "Ext.grid.GridPanel",
				ctype : "string"
			}, {
				name : "autoExpandMax",
				group : "Ext.grid.GridPanel",
				ctype : "number"
			}, {
				name : "autoExpandMin",
				group : "Ext.grid.GridPanel",
				ctype : "number"
			}, {
				name : "columnLines",
				group : "Ext.grid.GridPanel",
				ctype : "boolean"
			}, {
				name : "deferRowRender",
				group : "Ext.grid.GridPanel",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "disableSelection",
				group : "Ext.grid.GridPanel",
				ctype : "boolean"
			}, {
				name : "enableColumnHide",
				group : "Ext.grid.GridPanel",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableColumnMove",
				group : "Ext.grid.GridPanel",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableColumnResize",
				group : "Ext.grid.GridPanel",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableHdMenu",
				group : "Ext.grid.GridPanel",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "hideHeaders",
				group : "Ext.grid.GridPanel",
				ctype : "boolean"
			}, {
				name : "loadMask",
				group : "Ext.grid.GridPanel",
				ctype : "boolean"
			}, {
				name : "maxHeight",
				group : "Ext.grid.GridPanel",
				ctype : "number"
			}, {
				name : "minColumnWidth",
				group : "Ext.grid.GridPanel",
				ctype : "number"
			}, {
				name : "stripeRows",
				group : "Ext.grid.GridPanel",
				ctype : "boolean"
			}, {
				name : "trackMouseOver",
				group : "Ext.grid.GridPanel",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "animCollapse",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "baseCls",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "border",
				group : "Ext.Panel",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "buttonAlign",
				group : "Ext.Panel",
				ctype : "string",
				editor : "options",
				options : ["center", "left", "right"]
			}, {
				name : "collapsedCls",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "collapsible",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "disabled",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "elements",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "floating",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "footer",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "frame",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "header",
				group : "Ext.Panel",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "headerAsText",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "hideCollapseTool",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "iconCls",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "maskDisabled",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "minButtonWidth",
				group : "Ext.Panel",
				ctype : "number"
			}, {
				name : "shadow",
				group : "Ext.Panel",
				ctype : "string",
				editor : "options",
				options : ["sides", "drop", "frame"]
			}, {
				name : "shadowOffset",
				group : "Ext.Panel",
				ctype : "number"
			}, {
				name : "tabTip",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "title",
				group : "Ext.Panel",
				ctype : "string"
			}, {
				name : "titleCollapse",
				group : "Ext.Panel",
				ctype : "boolean"
			}, {
				name : "autoHeight",
				group : "Ext.BoxComponent",
				ctype : "boolean"
			}, {
				name : "height",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageX",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageY",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "width",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "x",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "y",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "cls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "ctCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "disabled",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "disabledClass",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "hidden",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "hideMode",
				group : "Ext.Component",
				ctype : "string",
				editor : "options",
				options : ["display", "offsets", "visibility"]
			}, {
				name : "id",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "itemId",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "overCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "stateful",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "style",
				group : "Ext.Component",
				ctype : "string"
			}],
	createCanvasConfig : function(E) {
		var _ = Ext.apply({}, this.getConfig());
		_.xtype = this.dtype;
		_.stateful = false;
		_.viewerNode = E;
		this.activeCmpId = _.id = Ext.id();
		_.cls = "x-panel-animated";
		_.columns = [];
		for (var B = 0, D = E.childNodes.length, C, $; B < D; B++) {
			$ = E.childNodes[B].component;
			if ($.isStore)
				_.store = $.createCanvasConfig(E.childNodes[B]);
			else if (!this.assignDocked(_, $) && $.xtype != "toolbar") {
				var A = $.getConfig();
				A.xtype = $.xtype;
				_.columns.push(A)
			}
		}
		return _
	},
	getTargetColumnIndex : function(I) {
		var C = this.getExtComponent();
		if (C) {
			var D = I.getPoint(), E = C.view.mainHd.getRegion();
			if (!E.contains(D))
				return false;
			var F = D.left, B = E.left, G = C.colModel.config, A = 0, $ = false;
			for (var A = 0, _ = G.length, H; H = G[A]; A++)
				if (!H.hidden) {
					B += H.width;
					if (F <= B) {
						$ = A;
						break
					}
				}
			return $
		}
		return false
	},
	getTargetColumn : function(_) {
		if (typeof _ == "object")
			_ = this.getTargetColumnIndex(_);
		if (_ === false)
			return null;
		var $ = this.getColumnNodes();
		return $[_].component
	},
	onFilmClick : function($) {
		var _ = this.getTargetColumn($);
		if (_) {
			_.getNode().select();
			return false
		}
	},
	onFilmDblClick : function($) {
		var B = this.getTargetColumnIndex($);
		if (B !== false) {
			var A = this.getExtComponent().view.getHeaderCell(B), _ = this
					.getTargetColumn(B);
			xds.canvas.startEdit(_, A, _.getConfigObject("header"))
		} else
			xds.types.GridPanel.superclass.onFilmDblClick.call(this, $)
	},
	getDefaultInternals : function() {
		return {
			cid : this.cid,
			cn : [{
						cid : "gridcolumn",
						userConfig : {
							header : "Column 1",
							dataIndex : "data1"
						}
					}, {
						cid : "gridcolumn",
						userConfig : {
							header : "Column 2",
							dataIndex : "data2"
						}
					}, {
						cid : "gridcolumn",
						userConfig : {
							header : "Column 3",
							dataIndex : "data3"
						}
					}]
		}
	},
	getActions : function() {
		if (!this.actions)
			this.actions = [new Ext.Action({
						itemId : "auto-columns",
						text : "Auto columns",
						iconCls : "icon-auto-columns",
						handler : this.doAutoColumns,
						scope : this
					})];
		return this.actions
	},
	getColumnNodes : function() {
		var $ = this.getNode(), C = $.childNodes, _ = [];
		for (var B = 0, D = C.length, A; A = C[B]; B++)
			if (!A.component.dock && !A.component.isStore)
				_.push(A);
		return _
	},
	getStoreNode : function() {
		var $ = this.getNode().firstChild;
		while ($) {
			if ($.component.isStore)
				return $;
			$ = $.nextSibling
		}
		return null
	},
	doAutoColumns : function() {
		var F = this.getStoreNode(), C = this.getNode();
		if (!F) {
			Ext.Msg.alert("Warning",
					"Unable to read columns - no store has been defined.");
			return
		}
		xds.canvas.beginUpdate();
		var G = this.getColumnNodes();
		for (var A = 0, $; $ = G[A]; A++)
			$.parentNode.removeChild($);
		var B = F.childNodes;
		for (A = 0; $ = B[A]; A++) {
			var E = $.component, _ = E.getConfigValue("type"), D = E
					.getConfigValue("name");
			switch (_) {
				case "int" :
				case "float" :
					xds.inspector.restore({
								cid : "numbercolumn",
								userConfig : {
									header : D,
									dataIndex : D
								}
							}, C);
					break;
				case "date" :
					xds.inspector.restore({
								cid : "datecolumn",
								userConfig : {
									header : D,
									dataIndex : D
								}
							}, C);
					break;
				case "boolean" :
					xds.inspector.restore({
								cid : "booleancolumn",
								userConfig : {
									header : D,
									dataIndex : D
								}
							}, C);
					break;
				default :
					xds.inspector.restore({
								cid : "gridcolumn",
								userConfig : {
									header : D,
									dataIndex : D
								}
							}, C);
					break
			}
		}
		xds.canvas.endUpdate();
		xds.fireEvent("componentchanged")
	}
});
xds.Registry.register(xds.types.GridPanel);
xds.GridPanel = Ext.extend(Ext.grid.GridPanel, {
			afterRender : function() {
				xds.GridPanel.superclass.afterRender.call(this);
				if (false && this.store && this.store.viewerNode)
					this.createFloater(this.store.viewerNode.id,
							this.store.storeId, this.store.iconCls)
			}
		});
Ext.reg("xdgrid", xds.GridPanel);
xds.GridPanel.DefaultStore = new Ext.data.JsonStore({
			storeId : "(none)",
			fields : ["data1", "data2", "data3"],
			data : [{
						data1 : "cell",
						data2 : "cell",
						data3 : "cell"
					}, {
						data1 : "cell",
						data2 : "cell",
						data3 : "cell"
					}, {
						data1 : "cell",
						data2 : "cell",
						data3 : "cell"
					}]
		});
Ext.onReady(function() {
			xds.Config.editors.columns = new Ext.grid.GridEditor(new xds.MoreField(
					{
						value : "(Collection)",
						setRawValue : function($) {
							this.value = $
						},
						onMoreClick : function($) {
							var _ = new xds.ColumnWindow();
							_.component = xds.active.component;
							_.show($.target)
						}
					}))
		});
xds.StoreBase = Ext.extend(xds.Component, {
			category : "数据",
			defaultName : "&lt;store&gt;",
			naming : "MyStore",
			isVisual : false,
			isContainer : true,
			isStore : true,
			validChildTypes : ["datafield"],
			defaultConfig : {},
			initConfig : function($, _) {
				$.storeId = this.id
			},
			setConfig : function(_, $) {
				xds.StoreBase.superclass.setConfig.call(this, _, $);
				this.reconfigure();
				if (_ == "url" && this.actions) {
					this.actions[0][$ ? "enable" : "disable"]();
					this.actions[0].initialConfig.disabled = !$
				}
			},
			reconfigure : function($) {
				var A = xds.StoreCache.get(this.owner.id), _ = this
						.processConfig(A.viewerNode);
				_.cache = false;
				var B = this.createStore(_, false);
				A.reader = B.reader;
				A.proxy = B.proxy;
				if (A.proxy)
					A.proxy.on("loadexception", this.onLoadException, this);
				A.remoteSort = B.remoteSort;
				A.sortDir = B.sortDir;
				A.sortField = B.sortField;
				A.url = B.url;
				if ($ !== false && A.dataCache)
					A.loadData(A.dataCache)
			},
			createCanvasConfig : function($) {
				var A = xds.StoreCache.get(this.owner.id);
				if (!A) {
					var _ = this.processConfig($);
					_.viewerNode = $;
					_.component = this.owner;
					A = this.createStore(_, true)
				}
				return A
			},
			onLoadException : function() {
				xds.status.el.update("");
				Ext.Msg
						.alert("Error",
								"Unable to load data using the supplied configuration.");
				this.setSuffix("load error", "error")
			},
			processConfig : function(_) {
				var $ = Ext.apply({}, this.getConfig());
				$.xtype = this.xtype;
				$.fields = [];
				$.autoLoad = false;
				$.iconCls = this.iconCls;
				if (_.hasChildNodes())
					for (var A = 0, B = _.childNodes.length; A < B; A++)
						$.fields.push(_.childNodes[A].component.getConfig());
				return $
			},
			getActions : function() {
				if (!this.actions) {
					var $ = function(A) {
						var _ = [];
						for (var $ = 0; $ < A; $++)
							xds.inspector.restore({
										cid : "datafield"
									}, this.getNode())
					};
					this.actions = [new Ext.Action({
										itemId : "store-load",
										text : "Load data",
										iconCls : "icon-load",
										handler : function() {
											var $ = xds.StoreCache
													.get(this.owner.id);
											delete $.dataCache;
											$.reload()
										},
										scope : this,
										disabled : !this.getConfigValue("url")
									}), new Ext.Action({
										itemId : "quick-add",
										text : "Quick add",
										hideOnClick : false,
										menu : {
											zIndex : 80001,
											items : [{
												text : "1 field",
												handler : $.createDelegate(
														this, [1])
											}, {
												text : "2 fields",
												handler : $.createDelegate(
														this, [2])
											}, {
												text : "3 fields",
												handler : $.createDelegate(
														this, [3])
											}, {
												text : "4 fields",
												handler : $.createDelegate(
														this, [4])
											}, {
												text : "5 fields",
												handler : $.createDelegate(
														this, [5])
											}]
										}
									})]
				}
				return this.actions
			},
			isValidParent : function($) {
				if ($ && $.getStoreNode)
					return !$.getStoreNode();
				return true
			}
		});
xds.types.JsonStore = Ext.extend(xds.StoreBase, {
	cid : "jsonstore",
	text : "Json Store",
	xtype : "jsonstore",
	dtype : "jsonstore",
	xcls : "Ext.data.JsonStore",
	iconCls : "icon-json",
	createStore : function(A, _) {
		A = A || {};
		A.proxy = A.proxy || new Ext.data.HttpProxy(A);
		var $ = new Ext.data.JsonStore(A);
		if (_) {
			$.on("beforeload", function() {
				if (!$.proxy.conn.url) {
					Ext.Msg
							.alert("Warning",
									'Could not load JsonStore, "url" has not been set.');
					return false
				}
				if ($.dataCache) {
					$.loadData($.dataCache);
					return false
				} else
					xds.status.el.update("Loading store...")
			});
			$.on("load", function($) {
						$.dataCache = $.reader.jsonData;
						xds.status.el.update("");
						this.setSuffix(($.data.length) + " records loaded",
								"loaded")
					}, this);
			$.proxy.on("loadexception", this.onLoadException, this)
		}
		return $
	},
	defaultConfig : {
		autoLoad : true
	},
	configs : [{
				name : "idProperty",
				group : "Ext.data.JsonStore",
				ctype : "string"
			}, {
				name : "root",
				group : "Ext.data.JsonStore",
				ctype : "string"
			}, {
				name : "totalProperty",
				group : "Ext.data.JsonStore",
				ctype : "string"
			}, {
				name : "autoLoad",
				group : "Ext.data.Store",
				ctype : "boolean"
			}, {
				name : "remoteSort",
				group : "Ext.data.Store",
				ctype : "boolean"
			}, {
				name : "sortDir",
				group : "Ext.data.Store",
				ctype : "string",
				editor : "options",
				options : ["ASC", "DESC"]
			}, {
				name : "sortField",
				group : "Ext.data.Store",
				ctype : "string"
			}, {
				name : "storeId",
				group : "Ext.data.Store",
				ctype : "string"
			}, {
				name : "url",
				group : "Ext.data.Store",
				ctype : "string"
			}]
});
xds.Registry.register(xds.types.JsonStore);
xds.types.ArrayStore = Ext.extend(xds.StoreBase, {
	cid : "arraystore",
	text : "Array Store",
	xtype : "arraystore",
	dtype : "arraystore",
	xcls : "Ext.data.Store",
	iconCls : "icon-array",
	createStore : function(A, _) {
		A.reader = new Ext.data.ArrayReader({
					idIndex : A.idIndex,
					root : A.root,
					totalProperty : A.totalProperty
				}, A.fields);
		var $ = new Ext.data.Store(A);
		if (_) {
			$.on("beforeload", function() {
				if (!$.proxy.conn.url) {
					Ext.Msg
							.alert("Warning",
									'Could not load Array Store, "url" has not been set.');
					return false
				}
				if ($.dataCache) {
					$.loadData($.dataCache);
					return false
				} else
					xds.status.el.update("Loading store...")
			});
			$.on("load", function() {
						$.dataCache = $.reader.arrayData;
						xds.status.el.update("");
						this.setSuffix(($.dataCache ? $.dataCache.length : 0)
										+ " records loaded", "loaded")
					}, this);
			if ($.proxy)
				$.proxy.on("loadexception", this.onLoadException, this)
		}
		return $
	},
	configs : [{
				name : "idIndex",
				group : "Ext.data.ArrayStore",
				ctype : "number"
			}, {
				name : "root",
				group : "Ext.data.ArrayStore",
				ctype : "string"
			}, {
				name : "totalProperty",
				group : "Ext.data.ArrayStore",
				ctype : "string"
			}, {
				name : "autoLoad",
				group : "Ext.data.Store",
				ctype : "boolean"
			}, {
				name : "remoteSort",
				group : "Ext.data.Store",
				ctype : "boolean"
			}, {
				name : "sortDir",
				group : "Ext.data.Store",
				ctype : "string",
				editor : "options",
				options : ["ASC", "DESC"]
			}, {
				name : "sortField",
				group : "Ext.data.Store",
				ctype : "string"
			}, {
				name : "storeId",
				group : "Ext.data.Store",
				ctype : "string"
			}, {
				name : "url",
				group : "Ext.data.Store",
				ctype : "string"
			}]
});
xds.Registry.register(xds.types.ArrayStore);
xds.types.XmlStore = Ext.extend(xds.StoreBase, {
	cid : "xmlstore",
	text : "Xml Store",
	xtype : "xmlstore",
	dtype : "xmlstore",
	xcls : "Ext.data.XmlStore",
	iconCls : "icon-xml",
	createStore : function(A, _) {
		A = A || {};
		A.proxy = A.proxy || new Ext.data.HttpProxy(A);
		var $ = new Ext.data.XmlStore(A);
		if (_) {
			$.on("beforeload", function() {
				if (!$.proxy.conn.url) {
					Ext.Msg.alert("Warning",
							'Could not load XmlStore, "url" has not been set.');
					return false
				}
				if (!$.reader.meta.record) {
					Ext.Msg
							.alert("Warning",
									'Could not load XmlStore, "record" has not been set.');
					return false
				}
				if ($.dataCache) {
					$.loadData($.dataCache);
					return false
				} else
					xds.status.el.update("Loading store...")
			});
			$.on("load", function() {
						$.dataCache = $.reader.xmlData;
						xds.status.el.update("");
						this.setSuffix(($.data.length) + " records loaded",
								"loaded")
					}, this);
			$.proxy.on("loadexception", this.onLoadException, this)
		}
		return $
	},
	configs : [{
				name : "idPath",
				group : "Ext.data.XmlStore",
				ctype : "string"
			}, {
				name : "record",
				group : "Ext.data.XmlStore",
				ctype : "string"
			}, {
				name : "totalRecords",
				group : "Ext.data.XmlStore",
				ctype : "string"
			}, {
				name : "autoLoad",
				group : "Ext.data.Store",
				ctype : "boolean"
			}, {
				name : "remoteSort",
				group : "Ext.data.Store",
				ctype : "boolean"
			}, {
				name : "sortDir",
				group : "Ext.data.Store",
				ctype : "string",
				editor : "options",
				options : ["ASC", "DESC"]
			}, {
				name : "sortField",
				group : "Ext.data.Store",
				ctype : "string"
			}, {
				name : "storeId",
				group : "Ext.data.Store",
				ctype : "string"
			}, {
				name : "url",
				group : "Ext.data.Store",
				ctype : "string"
			}]
});
xds.Registry.register(xds.types.XmlStore);
xds.FieldBase = Ext.extend(xds.Component, {
	category : "表单控件",
	naming : "MyField",
	defaultConfig : {
		fieldLabel : "Label"
	},
	isResizable : function(_, $) {
		return _ == "Right"
				&& !this.isAnchored()
				&& !this.isFit()
				&& (!this.owner || this.owner.getConfigValue("layout") != "form")
	},
	initConfig : function(_, A) {
		var $ = this.owner ? this.owner.getConfigValue("layout") : "";
		if (!A)
			_.width = 200;
		else if ($ == "form" || $ == "anchor" || $ == "absolute")
			_.anchor = "100%"
	}
});
xds.types.Checkbox = Ext.extend(xds.FieldBase, {
			cid : "checkbox",
			defaultName : "&lt;checkbox&gt;",
			text : "Checkbox",
			dtype : "xdcheckbox",
			xtype : "checkbox",
			xcls : "Ext.form.Checkbox",
			iconCls : "icon-checkbox",
			naming : "MyCheckbox",
			defaultConfig : {
				fieldLabel : "Label",
				boxLabel : "boxLabel"
			},
			configs : [{
						name : "boxLabel",
						group : "Ext.form.Checkbox",
						ctype : "string"
					}, {
						name : "checked",
						group : "Ext.form.Checkbox",
						ctype : "boolean"
					}, {
						name : "checkedCls",
						group : "Ext.form.Checkbox",
						ctype : "string"
					}, {
						name : "inputValue",
						group : "Ext.form.Checkbox",
						ctype : "string"
					}, {
						name : "mouseDownCls",
						group : "Ext.form.Checkbox",
						ctype : "string"
					}, {
						name : "fieldClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "focusClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "inputType",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidText",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "msgTarget",
						group : "Ext.form.Field",
						ctype : "string",
						editor : "options",
						options : ["qtip", "side", "title", "under"]
					}, {
						name : "name",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "readOnly",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "validateOnBlur",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "validationEvent",
						group : "Ext.form.Field",
						ctype : "string",
						edtor : "options",
						options : ["keyup", "change", "blur"]
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.Checkbox);
xds.Checkbox = Ext.extend(Ext.form.Checkbox, {
			getFilmEl : xds.Component.getFilmEl
		});
Ext.reg("xdcheckbox", xds.Checkbox);
xds.types.DateField = Ext.extend(xds.FieldBase, {
			cid : "datefield",
			defaultName : "&lt;dateField&gt;",
			text : "Date Field",
			dtype : "xddatefield",
			xtype : "datefield",
			xcls : "Ext.form.DateField",
			iconCls : "icon-datefield",
			naming : "MyField",
			defaultConfig : {
				format : "Y-m-d",
				fieldLabel : "Label"
			},
			configs : [{
						name : "altFormats",
						group : "Ext.form.DateField",
						ctype : "string"
					}, {
						name : "format",
						group : "Ext.form.DateField",
						ctype : "string"
					}, {
						name : "maxText",
						group : "Ext.form.DateField",
						ctype : "string"
					}, {
						name : "maxValue",
						group : "Ext.form.DateField",
						ctype : "string"
					}, {
						name : "minText",
						group : "Ext.form.DateField",
						ctype : "string"
					}, {
						name : "minValue",
						group : "Ext.form.DateField",
						ctype : "string"
					}, {
						name : "showToday",
						group : "Ext.form.DateField",
						ctype : "boolean"
					}, {
						name : "allowBlank",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "blankText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "disableKeyFilter",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "emptyClass",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "emptyText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "maxLength",
						group : "Ext.form.TextField",
						ctype : "number"
					}, {
						name : "maxLengthText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "selectOnFocus",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "vtype",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "vtypeText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "fieldClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "focusClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "inputType",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidText",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "msgTarget",
						group : "Ext.form.Field",
						ctype : "string",
						editor : "options",
						options : ["qtip", "side", "title", "under"]
					}, {
						name : "name",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "readOnly",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "validateOnBlur",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "validationEvent",
						group : "Ext.form.Field",
						ctype : "string",
						edtor : "options",
						options : ["keyup", "change", "blur"]
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.DateField);
xds.DateField = Ext.extend(Ext.form.DateField, {
			getFilmEl : xds.Component.getFilmEl
		});
Ext.reg("xddatefield", xds.DateField);
xds.types.HtmlEditor = Ext.extend(xds.FieldBase, {
	cid : "htmleditor",
	defaultName : "&lt;htmlEditor&gt;",
	text : "Html Editor",
	dtype : "xdhtmleditor",
	xtype : "htmleditor",
	xcls : "Ext.form.HtmlEditor",
	iconCls : "icon-html",
	defaultConfig : {
		anchor : "100%",
		fieldLabel : "Label",
		height : 150,
		width : 300
	},
	isResizable : function(_, $) {
		return !this.getConfigValue("anchor")
				&& (!this.owner || this.owner.getConfigValue("layout") != "form")
	},
	configs : [{
				name : "createLinkText",
				group : "Ext.form.HtmlEditor",
				ctype : "string"
			}, {
				name : "defaultLinkValue",
				group : "Ext.form.HtmlEditor",
				ctype : "string"
			}, {
				name : "enableAlignments",
				group : "Ext.form.HtmlEditor",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableColors",
				group : "Ext.form.HtmlEditor",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableFont",
				group : "Ext.form.HtmlEditor",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableFontSize",
				group : "Ext.form.HtmlEditor",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableFormat",
				group : "Ext.form.HtmlEditor",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableLinks",
				group : "Ext.form.HtmlEditor",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableLists",
				group : "Ext.form.HtmlEditor",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "enableSourceEdit",
				group : "Ext.form.HtmlEditor",
				ctype : "boolean",
				defaultValue : true
			}, {
				name : "name",
				group : "Ext.form.Field",
				ctype : "string"
			}, {
				name : "tabIndex",
				group : "Ext.form.Field",
				ctype : "number"
			}, {
				name : "height",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageX",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageY",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "width",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "x",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "y",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "cls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "ctCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "disabled",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "disabledClass",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "hidden",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "hideMode",
				group : "Ext.Component",
				ctype : "string",
				editor : "options",
				options : ["display", "offsets", "visibility"]
			}, {
				name : "id",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "itemId",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "overCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "stateful",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "style",
				group : "Ext.Component",
				ctype : "string"
			}]
});
xds.Registry.register(xds.types.HtmlEditor);
xds.HtmlEditor = Ext.extend(Ext.form.HtmlEditor, {
			getFilmEl : xds.Component.getFilmEl,
			createIFrame : function() {
				this.bogusFrame = this.wrap.createChild({
							cls : "xds-bogus-frame x-form-text"
						})
			},
			onResize : function(_, A) {
				Ext.form.HtmlEditor.superclass.onResize.apply(this, arguments);
				if (this.el && this.bogusFrame) {
					if (typeof _ == "number") {
						var $ = _ - this.wrap.getFrameWidth("lr");
						this.el.setWidth(this.adjustWidth("textarea", $))
					}
					if (typeof A == "number") {
						var B = A - this.wrap.getFrameWidth("tb")
								- this.tb.el.getHeight();
						this.el.setHeight(this.adjustWidth("textarea", B));
						this.bogusFrame.dom.style.height = B + "px"
					}
				}
			}
		});
Ext.reg("xdhtmleditor", xds.HtmlEditor);
xds.types.NumberField = Ext.extend(xds.FieldBase, {
			cid : "numberfield",
			defaultName : "&lt;numberField&gt;",
			text : "Number Field",
			dtype : "xdnumberfield",
			xtype : "numberfield",
			xcls : "Ext.form.NumberField",
			iconCls : "icon-numfield",
			configs : [{
						name : "allowDecimals",
						group : "Ext.form.NumberField",
						ctype : "boolean"
					}, {
						name : "allowNegative",
						group : "Ext.form.NumberField",
						ctype : "boolean"
					}, {
						name : "decimalPrecision",
						group : "Ext.form.NumberField",
						ctype : "number"
					}, {
						name : "decimalSeparator",
						group : "Ext.form.NumberField",
						ctype : "string"
					}, {
						name : "maxText",
						group : "Ext.form.NumberField",
						ctype : "string"
					}, {
						name : "maxValue",
						group : "Ext.form.NumberField",
						ctype : "number"
					}, {
						name : "minText",
						group : "Ext.form.NumberField",
						ctype : "string"
					}, {
						name : "minValue",
						group : "Ext.form.NumberField",
						ctype : "number"
					}, {
						name : "nanText",
						group : "Ext.form.NumberField",
						ctype : "string"
					}, {
						name : "allowBlank",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "blankText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "disableKeyFilter",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "emptyClass",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "emptyText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "grow",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "growMax",
						group : "Ext.form.TextField",
						ctype : "number"
					}, {
						name : "growMin",
						group : "Ext.form.TextField",
						ctype : "number"
					}, {
						name : "maxLength",
						group : "Ext.form.TextField",
						ctype : "number"
					}, {
						name : "maxLengthText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "selectOnFocus",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "vtype",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "vtypeText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "fieldClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "focusClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "inputType",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidText",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "msgTarget",
						group : "Ext.form.Field",
						ctype : "string",
						editor : "options",
						options : ["qtip", "side", "title", "under"]
					}, {
						name : "name",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "readOnly",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "validateOnBlur",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "validationEvent",
						group : "Ext.form.Field",
						ctype : "string",
						edtor : "options",
						options : ["keyup", "change", "blur"]
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.NumberField);
xds.NumberField = Ext.extend(Ext.form.NumberField, {
			getFilmEl : xds.Component.getFilmEl
		});
Ext.reg("xdnumberfield", xds.NumberField);
xds.types.Radio = Ext.extend(xds.FieldBase, {
			cid : "radio",
			defaultName : "&lt;radio&gt;",
			text : "Radio",
			dtype : "xdradio",
			xtype : "radio",
			xcls : "Ext.form.Radio",
			iconCls : "icon-radio",
			naming : "MyRadio",
			defaultConfig : {
				fieldLabel : "Label",
				boxLabel : "boxLabel"
			},
			configs : [{
						name : "boxLabel",
						group : "Ext.form.Checkbox",
						ctype : "string"
					}, {
						name : "checked",
						group : "Ext.form.Checkbox",
						ctype : "boolean"
					}, {
						name : "checkedCls",
						group : "Ext.form.Checkbox",
						ctype : "string"
					}, {
						name : "inputValue",
						group : "Ext.form.Checkbox",
						ctype : "string"
					}, {
						name : "mouseDownCls",
						group : "Ext.form.Checkbox",
						ctype : "string"
					}, {
						name : "fieldClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "focusClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "inputType",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidText",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "msgTarget",
						group : "Ext.form.Field",
						ctype : "string",
						editor : "options",
						options : ["qtip", "side", "title", "under"]
					}, {
						name : "name",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "readOnly",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "validateOnBlur",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "validationEvent",
						group : "Ext.form.Field",
						ctype : "string",
						edtor : "options",
						options : ["keyup", "change", "blur"]
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.Radio);
xds.Radio = Ext.extend(Ext.form.Radio, {
			getFilmEl : xds.Component.getFilmEl
		});
Ext.reg("xdradio", xds.Radio);
xds.types.TextField = Ext.extend(xds.FieldBase, {
			cid : "textfield",
			defaultName : "&lt;textField&gt;",
			text : "Text Field",
			dtype : "xdtextfield",
			xtype : "textfield",
			xcls : "Ext.form.TextField",
			iconCls : "icon-textfield",
			configs : [{
						name : "allowBlank",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "blankText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "disableKeyFilter",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "emptyClass",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "emptyText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "grow",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "growMax",
						group : "Ext.form.TextField",
						ctype : "number"
					}, {
						name : "growMin",
						group : "Ext.form.TextField",
						ctype : "number"
					}, {
						name : "maxLength",
						group : "Ext.form.TextField",
						ctype : "number"
					}, {
						name : "maxLengthText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "selectOnFocus",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "vtype",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "vtypeText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "fieldClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "focusClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "inputType",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidText",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "msgTarget",
						group : "Ext.form.Field",
						ctype : "string",
						editor : "options",
						options : ["qtip", "side", "title", "under"]
					}, {
						name : "name",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "readOnly",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "validateOnBlur",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "validationEvent",
						group : "Ext.form.Field",
						ctype : "string",
						edtor : "options",
						options : ["keyup", "change", "blur"]
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.TextField);
xds.TextField = Ext.extend(Ext.form.TextField, {
			getFilmEl : xds.Component.getFilmEl
		});
Ext.reg("xdtextfield", xds.TextField);
xds.types.TextArea = Ext.extend(xds.FieldBase, {
	cid : "textarea",
	defaultName : "&lt;textArea&gt;",
	text : "Text Area",
	dtype : "xdtextarea",
	xtype : "textarea",
	xcls : "Ext.form.TextArea",
	iconCls : "icon-textarea",
	isResizable : function(_, $) {
		return !this.getConfigValue("anchor")
				&& (!this.owner || this.owner.getConfigValue("layout") != "form")
	},
	configs : [{
				name : "preventScrollbars",
				group : "Ext.form.TextArea",
				ctype : "boolean"
			}, {
				name : "allowBlank",
				group : "Ext.form.TextField",
				ctype : "boolean"
			}, {
				name : "blankText",
				group : "Ext.form.TextField",
				ctype : "string"
			}, {
				name : "disableKeyFilter",
				group : "Ext.form.TextField",
				ctype : "boolean"
			}, {
				name : "emptyClass",
				group : "Ext.form.TextField",
				ctype : "string"
			}, {
				name : "emptyText",
				group : "Ext.form.TextField",
				ctype : "string"
			}, {
				name : "grow",
				group : "Ext.form.TextField",
				ctype : "boolean"
			}, {
				name : "growMax",
				group : "Ext.form.TextField",
				ctype : "number"
			}, {
				name : "growMin",
				group : "Ext.form.TextField",
				ctype : "number"
			}, {
				name : "maxLength",
				group : "Ext.form.TextField",
				ctype : "number"
			}, {
				name : "maxLengthText",
				group : "Ext.form.TextField",
				ctype : "string"
			}, {
				name : "selectOnFocus",
				group : "Ext.form.TextField",
				ctype : "boolean"
			}, {
				name : "vtype",
				group : "Ext.form.TextField",
				ctype : "string"
			}, {
				name : "vtypeText",
				group : "Ext.form.TextField",
				ctype : "string"
			}, {
				name : "fieldClass",
				group : "Ext.form.Field",
				ctype : "string"
			}, {
				name : "focusClass",
				group : "Ext.form.Field",
				ctype : "string"
			}, {
				name : "inputType",
				group : "Ext.form.Field",
				ctype : "string"
			}, {
				name : "invalidClass",
				group : "Ext.form.Field",
				ctype : "string"
			}, {
				name : "invalidText",
				group : "Ext.form.Field",
				ctype : "string"
			}, {
				name : "msgTarget",
				group : "Ext.form.Field",
				ctype : "string",
				editor : "options",
				options : ["qtip", "side", "title", "under"]
			}, {
				name : "name",
				group : "Ext.form.Field",
				ctype : "string"
			}, {
				name : "readOnly",
				group : "Ext.form.Field",
				ctype : "boolean"
			}, {
				name : "tabIndex",
				group : "Ext.form.Field",
				ctype : "number"
			}, {
				name : "validateOnBlur",
				group : "Ext.form.Field",
				ctype : "boolean"
			}, {
				name : "validationEvent",
				group : "Ext.form.Field",
				ctype : "string",
				edtor : "options",
				options : ["keyup", "change", "blur"]
			}, {
				name : "tabIndex",
				group : "Ext.form.Field",
				ctype : "number"
			}, {
				name : "height",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageX",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "pageY",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "width",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "x",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "y",
				group : "Ext.BoxComponent",
				ctype : "number"
			}, {
				name : "cls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "ctCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "disabled",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "disabledClass",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "hidden",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "hideMode",
				group : "Ext.Component",
				ctype : "string",
				editor : "options",
				options : ["display", "offsets", "visibility"]
			}, {
				name : "id",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "itemId",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "overCls",
				group : "Ext.Component",
				ctype : "string"
			}, {
				name : "stateful",
				group : "Ext.Component",
				ctype : "boolean"
			}, {
				name : "style",
				group : "Ext.Component",
				ctype : "string"
			}]
});
xds.Registry.register(xds.types.TextArea);
xds.TextArea = Ext.extend(Ext.form.TextArea, {
			getFilmEl : xds.Component.getFilmEl
		});
Ext.reg("xdtextarea", xds.TextArea);
xds.types.TimeField = Ext.extend(xds.FieldBase, {
			cid : "timefield",
			defaultName : "&lt;timeField&gt;",
			text : "Time Field",
			dtype : "xdtimefield",
			xtype : "timefield",
			xcls : "Ext.form.TimeField",
			iconCls : "icon-timefield",
			configs : [{
						name : "altFormats",
						group : "Ext.form.TimeField",
						ctype : "string"
					}, {
						name : "format",
						group : "Ext.form.TimeField",
						ctype : "string"
					}, {
						name : "increment",
						group : "Ext.form.TimeField",
						ctype : "number"
					}, {
						name : "maxText",
						group : "Ext.form.TimeField",
						ctype : "string"
					}, {
						name : "maxValue",
						group : "Ext.form.TimeField",
						ctype : "string"
					}, {
						name : "minText",
						group : "Ext.form.TimeField",
						ctype : "string"
					}, {
						name : "minValue",
						group : "Ext.form.TimeField",
						ctype : "string"
					}, {
						name : "allowBlank",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "blankText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "disableKeyFilter",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "emptyClass",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "emptyText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "maxLength",
						group : "Ext.form.TextField",
						ctype : "number"
					}, {
						name : "maxLengthText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "selectOnFocus",
						group : "Ext.form.TextField",
						ctype : "boolean"
					}, {
						name : "vtype",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "vtypeText",
						group : "Ext.form.TextField",
						ctype : "string"
					}, {
						name : "fieldClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "focusClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "inputType",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidClass",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "invalidText",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "msgTarget",
						group : "Ext.form.Field",
						ctype : "string",
						editor : "options",
						options : ["qtip", "side", "title", "under"]
					}, {
						name : "name",
						group : "Ext.form.Field",
						ctype : "string"
					}, {
						name : "readOnly",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "validateOnBlur",
						group : "Ext.form.Field",
						ctype : "boolean"
					}, {
						name : "validationEvent",
						group : "Ext.form.Field",
						ctype : "string",
						edtor : "options",
						options : ["keyup", "change", "blur"]
					}, {
						name : "tabIndex",
						group : "Ext.form.Field",
						ctype : "number"
					}, {
						name : "height",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageX",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "pageY",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "width",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "x",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "y",
						group : "Ext.BoxComponent",
						ctype : "number"
					}, {
						name : "cls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "ctCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "disabled",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "disabledClass",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "hideMode",
						group : "Ext.Component",
						ctype : "string",
						editor : "options",
						options : ["display", "offsets", "visibility"]
					}, {
						name : "id",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "itemId",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "overCls",
						group : "Ext.Component",
						ctype : "string"
					}, {
						name : "stateful",
						group : "Ext.Component",
						ctype : "boolean"
					}, {
						name : "style",
						group : "Ext.Component",
						ctype : "string"
					}]
		});
xds.Registry.register(xds.types.TimeField);
xds.TimeField = Ext.extend(Ext.form.TimeField, {
			getFilmEl : xds.Component.getFilmEl
		});
Ext.reg("xdtimefield", xds.TimeField);
xds.ColumnBase = Ext.extend(xds.Component, {
			category : "数据表格",
			defaultName : "&lt;column&gt;",
			naming : "MyColumn",
			isVisual : false,
			setConfig : function(A, $) {
				xds.ColumnBase.superclass.setConfig.call(this, A, $);
				if (A == "dataIndex") {
					var _ = this.getConfigValue("id");
					this.setName(_ ? _ : ($ || this.defaultName))
				}
			},
			defaultConfig : {
				header : "column",
				sortable : true,
				resizable : true,
				dataIndex : "",
				width : 100
			},
			initConfig : function($, _) {
			}
		});
xds.types.GridColumn = Ext.extend(xds.ColumnBase, {
			cid : "gridcolumn",
			text : "Grid Column",
			xtype : "gridcolumn",
			dtype : "xdgridcolumn",
			xcls : "Ext.grid.Column",
			iconCls : "icon-grid-column",
			configs : [{
						name : "align",
						group : "Ext.grid.Column",
						ctype : "string",
						editor : "options",
						options : ["center", "left", "right"]
					}, {
						name : "css",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "dataIndex",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "fixed",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "header",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "id",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "menuDisabled",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "resizable",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "tooltip",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "width",
						group : "Ext.grid.Column",
						ctype : "number"
					}]
		});
xds.Registry.register(xds.types.GridColumn);
xds.types.BooleanColumn = Ext.extend(xds.ColumnBase, {
			cid : "booleancolumn",
			defaultName : "&lt;booleanColumn&gt;",
			text : "Boolean Column",
			xtype : "booleancolumn",
			dtype : "xdbooleancolumn",
			xcls : "Ext.grid.BooleanColumn",
			iconCls : "icon-grid-bool",
			configs : [{
						name : "align",
						group : "Ext.grid.Column",
						ctype : "string",
						editor : "options",
						options : ["center", "left", "right"]
					}, {
						name : "css",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "dataIndex",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "fixed",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "header",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "id",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "menuDisabled",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "resizable",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "tooltip",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "width",
						group : "Ext.grid.Column",
						ctype : "number"
					}]
		});
xds.Registry.register(xds.types.BooleanColumn);
xds.types.NumberColumn = Ext.extend(xds.ColumnBase, {
			cid : "numbercolumn",
			defaultName : "&lt;numberColumn&gt;",
			text : "Number Column",
			xtype : "numbercolumn",
			dtype : "xdnumbercolumn",
			xcls : "Ext.grid.NumberColumn",
			iconCls : "icon-grid-num",
			defaultConfig : {
				header : "column",
				sortable : true,
				resizable : true,
				dataIndex : "",
				width : 100,
				format : "0,000.00"
			},
			configs : [{
						name : "align",
						group : "Ext.grid.Column",
						ctype : "string",
						editor : "options",
						options : ["center", "left", "right"]
					}, {
						name : "css",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "dataIndex",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "fixed",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "format",
						group : "Ext.grid.NumberColumn",
						ctype : "string"
					}, {
						name : "header",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "id",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "menuDisabled",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "resizable",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "tooltip",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "width",
						group : "Ext.grid.Column",
						ctype : "number"
					}]
		});
xds.Registry.register(xds.types.NumberColumn);
xds.types.DateColumn = Ext.extend(xds.ColumnBase, {
			cid : "datecolumn",
			defaultName : "&lt;dateColumn&gt;",
			text : "Date Column",
			xtype : "datecolumn",
			dtype : "xddatecolumn",
			xcls : "Ext.grid.DateColumn",
			iconCls : "icon-grid-date",
			defaultConfig : {
				header : "column",
				sortable : true,
				resizable : true,
				dataIndex : "",
				width : 100,
				format : "m/d/Y"
			},
			configs : [{
						name : "align",
						group : "Ext.grid.Column",
						ctype : "string",
						editor : "options",
						options : ["center", "left", "right"]
					}, {
						name : "css",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "dataIndex",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "fixed",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "format",
						group : "Ext.grid.DateColumn",
						ctype : "string"
					}, {
						name : "header",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "id",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "menuDisabled",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "resizable",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "tooltip",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "width",
						group : "Ext.grid.Column",
						ctype : "number"
					}]
		});
xds.Registry.register(xds.types.DateColumn);
xds.types.TemplateColumn = Ext.extend(xds.ColumnBase, {
			cid : "templatecolumn",
			defaultName : "&lt;templateColumn&gt;",
			text : "Template Column",
			xtype : "templatecolumn",
			dtype : "xdtemplatecolumn",
			xcls : "Ext.grid.TemplateColumn",
			iconCls : "icon-grid-tpl",
			defaultConfig : {
				header : "column",
				sortable : true,
				resizable : true,
				dataIndex : "",
				width : 100,
				tpl : ""
			},
			configs : [{
						name : "align",
						group : "Ext.grid.Column",
						ctype : "string",
						editor : "options",
						options : ["center", "left", "right"]
					}, {
						name : "css",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "dataIndex",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "fixed",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "tpl",
						group : "Ext.grid.TemplateColumn",
						ctype : "string"
					}, {
						name : "header",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "hidden",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "id",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "menuDisabled",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "resizable",
						group : "Ext.grid.Column",
						ctype : "boolean"
					}, {
						name : "tooltip",
						group : "Ext.grid.Column",
						ctype : "string"
					}, {
						name : "width",
						group : "Ext.grid.Column",
						ctype : "number"
					}]
		});
xds.Registry.register(xds.types.TemplateColumn);
xds.types.DataField = Ext.extend(xds.Component, {
			cid : "datafield",
			category : "数据",
			name : "DataField",
			text : "Data Field",
			xtype : "datafield",
			dtype : "xddatafield",
			xcls : "Ext.data.DataField",
			iconCls : "icon-data-field",
			naming : "MyField",
			isVisual : false,
			defaultConfig : {
				name : "field",
				type : "auto"
			},
			initConfig : function($, _) {
				$.storeId = this.id
			},
			setConfig : function(_, $) {
				this.supr().setConfig.call(this, _, $);
				this.owner.reconfigure()
			},
			configs : [{
						name : "dateFormat",
						group : "Ext.data.DataField",
						ctype : "string"
					}, {
						name : "mapping",
						group : "Ext.data.DataField",
						ctype : "string"
					}, {
						name : "name",
						group : "Ext.data.DataField",
						ctype : "string"
					}, {
						name : "sortDir",
						group : "Ext.data.DataField",
						ctype : "string",
						editor : "options",
						options : ["ASC", "DESC"]
					}, {
						name : "sortType",
						group : "Ext.data.DataField",
						ctype : "string"
					}, {
						name : "type",
						group : "Ext.data.DataField",
						ctype : "string",
						editor : "options",
						options : ["auto", "boolean", "date", "float", "int",
								"string"]
					}]
		});
xds.Registry.register(xds.types.DataField);
xds.File = function() {
	return {
		saveProject : function(B, C, A) {
			var _ = window.parentSandboxBridge;
			_.save({
						fullPath : xds.Project.file,
						contents : Ext.util.JSON.encode(B)
					});
			if (C) {
				var $ = C.scope || this;
				if (C.callback)
					Ext.callback(C.callback, $)
			}
		},
		saveProjectAs : function(A, B, _) {
			var $ = window.parentSandboxBridge;
			$.saveAs({
						contents : Ext.util.JSON.encode(A)
					}, function(_) {
						xds.Project.file = _;
						xds.File.setTitle(_.nativePath);
						if (B) {
							var $ = B.scope || this;
							if (B.callback)
								Ext.callback(B.callback, $, _.nativePath)
						}
					})
		},
		openProject : function(A, _) {
			var $ = window.parentSandboxBridge;
			$.browse({
						filterText : "Ext Designer Project File",
						filter : "*.epj",
						scope : this
					}, function(B) {
						xds.File.setTitle(B.nativePath);
						var _ = $.getContents(B.nativePath), C = Ext.decode(_);
						xds.Project.file = B;
						A(C)
					})
		},
		getComponents : function(_, $) {
		},
		saveUserComponent : function($, A, _) {
		},
		removeUserComponent : function($, A, _) {
		},
		setTitle : function($) {
			var _ = window.parentSandboxBridge.setTitle($)
		}
	}
}()