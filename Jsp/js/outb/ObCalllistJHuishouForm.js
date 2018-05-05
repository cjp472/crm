/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCalllistJHuishouForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
ObCalllistJHuishouForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObCalllistJHuishouForm.superclass.constructor.call(this, {
					id : 'ObCalllistJHuishouFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '经理回收',
					buttonAlign : 'center',
					buttons : [{
								text : '回收',
								iconCls : 'btn-save',
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
		this.gridPanel_history = new HT.EditorGridPanel({
			region : 'center',
			id : 'gridPanel_history',
			scrollHeight : true,
			height : 150,
			tbar : ['->', {
						iconCls : 'btn-add',
						text : '增加',
						handler : function() {
							var store = Ext.getCmp('gridPanel_history')
									.getStore();
							var recordType = store.recordType;
							store.add(new recordType({})); // 添加一行空store
						}
					}, {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = Ext.getCmp('gridPanel_history')
									.getStore();
							var sm = Ext.getCmp('gridPanel_history')
									.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
							} else {
								store.remove(cell);
							}
						}
					}],
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '条件',
						dataIndex : 'contactType2',
						editor : new Ext.form.ComboBox({
									mode : 'local',
									store : [[0, '姓名'], [1, '性别'], [2, '年龄']]
								})
					}, {
						header : '关系',
						dataIndex : 'contactValue',
						editor : new Ext.form.ComboBox({
									mode : 'local',
									store : [[0, '>='], [1, '<='], [2, '='],
											[3, 'like'], [4, 'in'],
											[5, 'between']]
								})
					}, {
						header : '表达式',
						dataIndex : 'contactType3',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});
		this.gridPanel = new HT.EditorGridPanel({
			region : 'center',
			scrollHeight : true,
			height:250,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '名称',
						dataIndex : 'contactType'
					}, {
						header : '工号',
						dataIndex : 'contactType2'
					}, {
						header : '可回收名单数',
						dataIndex : 'contactValue1'
					}, {
						header : '回收数量',
						dataIndex : 'contactType3',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			defaults : {
				anchor : '96%,96%'
			},
			items : [ {
						xtype : 'fieldset',
						title : '基本信息',
						collapsed : false,
						collapsible : true,
						items : [{
						layout : 'column',
						border : false,
						items : [{
									layout : 'form',
									border : false,
									columnWidth : .5,
									items : [{
												xtype : 'textfield',
												anchor : '100%',
												fieldLabel : '项目'
											}, {
												xtype : 'textfield',
												anchor : '100%',
												fieldLabel : '名单'
											}]
								}, {
									layout : 'form',
									border : false,
									columnWidth : .5,
									items : [{
												xtype : 'textfield',
												anchor : '100%',
												fieldLabel : '活动'
											},{
												xtype : 'textfield',
												anchor : '100%',
												fieldLabel : '批次'
											}]
								}]
					}]
					}, {
						xtype : 'fieldset',
						title : '回收方式',
						collapsible : true,
						items : [{
									layout : 'column',
									border : false,
									items : [{
												columnWidth : .5,
												border : false,
												items : [{
													layout:'column',
													border:false,
													items:[{
														layout:'form',
														border:false,
														columnWidth : .6,
														items:[{
															xtype : 'radio',
															anchor : '100%',
															name : 'radio',
															fieldLabel:'回收规则',
															boxLabel : '按比例抽取'
														}]
													}, {
															columnWidth : .4,
															xtype : 'radio',
															anchor : '100%',
															name : 'radio',
															boxLabel : '指定抽取'
														}]
												},{
													layout:'form',
													border:false,
													items:[{
															xtype : 'textfield',
															fieldLabel : '可回收数量',
															anchor : '100%'
														}]
												}]

											}, {
												columnWidth : .5,
												layout : 'form',
												border : false,
												items : [{
													height:25,
													border:false
												},{
															xtype : 'textfield',
															fieldLabel : '回收数量',
															anchor : '100%'
														}]
											}]
								}]
					}, {
						xtype : 'fieldset',
						title : '回收条件',
						collapsed : true,
						collapsible : true,
						items : [this.gridPanel_history]
					}, {
								xtype : 'fieldset',
								title : '可回收人',
								collapsible : true,
								collapsed : true,
								items : [this.gridPanel]
							}]
		});

	},// end of the initcomponents

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
					url : __ctxPath + '/outb/saveObCallbatch.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObCallbatchGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});