BeanColumnsExtForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BeanColumnsExtForm.superclass.constructor.call(this, {
					id : 'BeanColumnsExtFormWin',
					layout : 'fit',
					items : [this.gridPanel],
					modal : true,
					height : 450,
					width : 550,
					maximizable : true,
					title : '扩展字段详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
								iconCls : 'btn-save',
								id : 'btnSave',
								scope : this,
								handler : this.save
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
		var extBeanObjectId = this.beanObjectId!=null&this.beanObjectId!='' ? this.beanObjectId : -1;
		this.topbar = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-add',
						text : '添加数据实体字段',
						id : 'Bean_add',
						xtype : 'button',
						scope : this,
						handler : function() {
							var store = this.gridPanel.getStore();
							var recordType = store.recordType;
							store.add(new recordType({})); // 添加一行空store
						}
					}, {
						iconCls : 'btn-del',
						text : '删除数据实体字段',
						id : 'Bean_del',
						xtype : 'button',
						scope : this,
						handler : function() {
							
							$postSubmit({
										url : __ctxPath+ '/customer/multiDelConBwList.do',
										ids : id,
										grid : this.gridPanel,
										msgTip : '您确认要删除所选记录吗？',
										msgSuccess : '成功删除该记录！',
										mstFailure : '操作出错，请联系管理员！'
									});
						}
					}]
		});
			
		this.gridPanel = new HT.EditorGridPanel({
//			tbar : this.topbar,
			showPaging : false, // 去掉分页
			//autoHeight : true, // 自动增加高度
			layout:'form',
			clicksToEdit : 1,
			id : 'BeanColumnsExtGrid',
			defaults : {
				anchor : '96%,96%'
			},
			url : __ctxPath + "/xitong/listExtBeanObjectColumns.do?Q_beanObject.beanObjectId_L_EQ="+extBeanObjectId,
			fields : [{
						name : 'extSetId',
						type : 'int'
					}, 'beanObjectColumnsTame', 'beanObjectColumnsId', 'extName', 'extType', 'extParam', 'isStart'],
			columns : [{
						header : '内码',
						dataIndex : 'extSetId',
						hidden : true
					}, {
						header : 'Columns外码',
						isExp : false,
						dataIndex : 'beanObjectColumnsId',
						hidden : true
					}, {
						header : '实体字段名',
						isExp : false,
						dataIndex : 'beanObjectColumnsTame'
					}, {
						header : '扩展字段名',
						isExp : false,
						dataIndex : 'extName',
						editor : new Ext.form.TextField({
							allowBlank : false,
							id : 'BeanExtSet.extName'
						})
					}, {
						header : '扩展类型',
						isExp : false,
						dataIndex : 'extType',
						editor : new Ext.form.ComboBox({
								name : 'extType',
								allowBlank : false,
								id : 'BeanExtSet.extType',
								displayField : 'itemName',
								valueField : 'itemId',
								mode : 'local',
								triggerAction : 'all',
								forceSelection : false,
								hiddenName : 'extType',
								store : new Ext.data.SimpleStore({
									url : __ctxPath + '/system/loadItemDictionary.do',
									baseParams : {
										itemName : '字段类型'
									},
									fields : ['itemId', 'itemName'],
									autoLoad : true,
									method : "post",
									listeners : {
										load : function() {
											var combo = Ext.getCmp('BeanExtSet.extType');
											var store = combo.getStore();
											var rows = [];// 定义数组
											for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
												if (store.getAt(i).data['itemId'] == combo.getValue()) {
													combo.setValue(store.getAt(i).data['itemName']);
													break;
												}
											}
										}
									}
								})
							}),
							renderer : function(value) {
								if (value != null) {
									return Column_Type.get(value);
								} else {
									return ' ';
								}
							}
					}, {
						header : '扩展参数',
						isExp : false,
						dataIndex : 'extParam',
						editor :  new Ext.form.TextField({
							id : 'BeanExtSet.extParam'
						})
					}, {
						header : '是否启用',
						isExp : false,
						dataIndex : 'isStart',
						editor : new Ext.form.ComboBox({
							name : 'isStart',
							allowBlank : false,
							id : 'BeanExtSet.isStart',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'isStart',
							store : new Ext.data.SimpleStore({
								url : __ctxPath + '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '是否'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext.getCmp('BeanExtSet.isStart');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo.getValue()) {
												combo.setValue(store.getAt(i).data['itemName']);
												break;
											}
										}
									}
								}
							})
						}),
						renderer : function(value) {
							if (value=='1' || value=='0') {
								return YorN.get(value);
							} else {
								return '';
							}
						}
					}]
				// end of columns
			});
			
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			region:'north',
			height:120,
			autoScroll : true,
			id : 'BeanColumnsExtFormPanel',
			defaults : {
				anchor : '98%,98%'
			},
			defaultType : 'textfield',
			items : [this.gridPanel]
		});
			
		this.gridPanel.getSelectionModel().on('selectionchange', function(sm) {
					Ext.getCmp('Bean_del').setDisabled(sm.getCount() < 1);

				});

	},// end of the initcomponents

	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		Ext.getCmp('BeanColumnsExtFormWin').close();
	},

	/**
	 * 保存记录
	 */
	save : function() {
		var store = Ext.getCmp('BeanColumnsExtGrid').getStore();
		var rows = [];//定义数组
		var flag = true;
		for ( var i = 0; i < store.getCount(); i++) { //store.getCount()为store的长度
			rows.push(store.getAt(i).data);//放到数组里
			if (store.getAt(i).data.isStart != '0' && store.getAt(i).data.isStart != '1') {
				flag = false;
			}
		}
		if(flag){
			Ext.Ajax.request({
				url : __ctxPath + '/xitong/saveBeanExtSet.do',
				method : 'post',
				params : {
					details : Ext.encode(rows)
				},
				success : function(form, action) {
					var gridPanel = Ext.getCmp('BeanObjectColumn_Ext');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						Ext.ux.Toast.msg("操作信息", "成功保存该记录!");
						Ext.getCmp('BeanColumnsExtFormWin').close();
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "保存失败!请联系管理员");
				}
			});
		}else{
			Ext.ux.Toast.msg('操作信息', '是否启用是必填项!');
		}
		
	}// end of save

});
