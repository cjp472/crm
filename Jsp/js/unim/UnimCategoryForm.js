UnimCategoryForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UnimCategoryForm.superclass.constructor.call(this, {
					id : 'UnimCategoryFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 220,
					width : 550,
					maximizable : true,
					title : '座席分类增加',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
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
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		var colorS = new Ext.ColorPalette({});
		colorS.on('select', function(p, v) {
					selectMenu.hide();
					Ext.get('colorSel').dom.style.color = '#' + v;
					Ext.getCmp('colorSel').setValue('#' + v);
				});

		var selectMenu = new Ext.menu.Menu({
					shadow : 'frame',
					id : 'selectColor',
					buttonAlign : 'right',
					items : colorS
				});

		var comboField = new Ext.form.TriggerField({
					editable : false,
					id : 'colorSel',
					name : 'unimCategory.extend1',
					fieldLabel : '显示颜色',
					allowBlank : false,
					anchor : '50%',
					width : 150,
					onTriggerClick : function() {
						if (this.menu == null) {
							this.menu = Ext.getCmp('selectColor');
						}
						this.menu.show(this.el, "tl-bl?");
					}
				});
		this.formPanel = new Ext.FormPanel({
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll : true,
					labelAlign : 'right',
					labelWidth : 70,
					// id : 'UnimCategoryForm',
					defaults : {
						anchor : '96%,96%'
					},
					items : [{
								name : 'unimCategory.catId',
								xtype : 'hidden',
								value : this.catId == null ? '' : this.catId
							}, 
							{	
									xtype : 'hidden',
									name : 'unimCategory.extend3',
									id : 'ulEmployee.zhiwei_hid'
								}, {	
									xtype : 'hidden',
									name : 'unimCategory.extend4',
									id : 'ulEmployee.zhiji_hid'
								},
							{
								layout : 'column',
								xtype : 'panel',
								border : false,
								items : [{
											columnWidth : .5,
											border : false,
											layout : 'form',
											items : [{
													fieldLabel : '职位',
													id : 'ulEmployee.zhiwei_form',
													displayField : 'itemName',
//													name:'unimCategory.extend3',
													valueField : 'itemName',
													editable:false,
													xtype : 'combo',
													mode : 'local',
													triggerAction : 'all',
													anchor : '100%',
													forceSelection : false,
													store : this.getDicStore('职位','ulEmployee.zhiwei'),
													listeners : this.getDicListeners(
															'ulEmployee.zhiwei_form','ulEmployee.zhiwei')
															}]

										}, {
											columnWidth : .5,
											layout : 'form',
											border : false,
											items : [ {
														fieldLabel : '职级',
														id : 'ulEmployee.zhiji_form',
														displayField : 'itemName',
														valueField : 'itemName',
//														name:'unimCategory.extend4',
														xtype : 'combo',
														editable:false,
														mode : 'local',
														triggerAction : 'all',
														anchor : '100%',
														forceSelection : false,
														store : this.getDicStore(
																'职级',
																'ulEmployee.zhiji'),
														listeners : this.getDicListeners(
																'ulEmployee.type_form',
																'ulEmployee.zhiji')
															}]

										}]
							} ,comboField, {
								fieldLabel : '备注',
								name : 'unimCategory.remark',
								xtype : 'textarea',
								maxLength : 512
							}

					]
				});
		// 加载表单对应的数据
		if (this.catId != null && this.catId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/unim/getUnimCategory.do?catId='
								+ this.catId,
						root : 'data',
						preName : 'unimCategory',
						success : function(fp, action) {
							var thisObj = Ext.util.JSON.decode(fp.responseText).data;
							Ext.get('colorSel').dom.style.color = thisObj.extend1;
							Ext.getCmp('colorSel').setValue(thisObj.extend1);
							Ext.getCmp('ulEmployee.zhiwei_form').setValue(thisObj.extend3);
							Ext.getCmp('ulEmployee.zhiji_form').setValue(thisObj.extend4);
							// Ext.getCmp('unimCategory.statusType11').setValue(thisObj.statustype)
						}
					});
		}
		

	},// end of the initcomponents
	getDicStore : function(name, id) {
	return new Ext.data.SimpleStore(
			{
				url : __ctxPath + '/system/loadItemDictionary.do',
				baseParams : {
					itemName : name
				},
				fields : [ 'itemId', 'itemName' ],
				autoLoad : true,
				method : "post",
				listeners : {
					load : function() {
						var combo = Ext
								.getCmp(id + '_form');
						var store = combo.getStore();
						var hid_value = Ext
								.getCmp(id + '_hid');
						var rows = [];// 定义数组
						for ( var i = 0; i < store
								.getCount(); i++) { // store.getCount()为store的长度
							if (store.getAt(i).data['itemId'] == hid_value
									.getValue()) {
								combo
										.setValue(store
												.getAt(i).data['itemName']);
								break;
							}
						}
					}
				}
			})
    }
	,
		getDicListeners : function(comId, hidName) {
				return {
					select : function(cbo, record, index) {
						var fm = Ext.getCmp(comId);
						Ext.getCmp(hidName + '_hid')
								.setValue(cbo.value);
					}
				}
			},
	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.close();
	},
	
	/**
	 * 保存记录
	 */
	save : function() {
		$postSubForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath + '/unim/saveUnimCategory.do?unimCategory.typeId=1',
			msgSuccess : '成功保存该记录！',
			msgFailure : '操作出错，请联系管理员！',
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('UnimCategoryGridFL');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save
	

});