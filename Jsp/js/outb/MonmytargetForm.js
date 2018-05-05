/**
 * @author cf0666@gmail.com
 * @createtime
 * @class MontargetManagerForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
MontargetManagerForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		MontargetManagerForm.superclass.constructor.call(this, {
					id : 'MontargetManagerFormWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '佣金指标信息',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
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

		this.gridPanel = new HT.EditorGridPanel({
			height : 150,
			scrollHeight : true,
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
						header : '机构',
						dataIndex : 'contactValue'
					}, {
						header : '分配比例/数量',
						dataIndex : 'contactType3',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});

		this.panel = new Ext.Panel({
			layout : 'form',
			border : false,
			labelAlign : 'right',
			style : 'padding:10px',
			items : [{
				xtype : 'fieldset',
				collapsible : true,
				title : '基本信息',
				items : [{
							xtype : 'textfield',
							anchor : '100%',
							fieldLabel : '指标名'
						}, {
							layout : 'column',
							border : false,
							items : [{
										layout : 'form',
										border : false,
										columnWidth : .5,
										items : [{
													xtype : 'textfield',
													anchor : '100%',
													fieldLabel : '月份'
												}, {
													xtype : 'textfield',
													anchor : '100%',
													fieldLabel : '指标数'
												}]
									}, {
										layout : 'form',
										border : false,
										columnWidth : .5,
										items : [{
											layout : 'column',
											border : false,
											items : [{
												columnWidth : .9,
												border : false,
												layout : 'form',
												items : [{
															xtype : 'textfield',
															anchor : '100%',
															fieldLabel : '用户组'
														}]
											}, {
												columnWidth : .1,
												xtype : 'button',
												iconCls : 'search'

											}]
										}, {
											xtype : 'textfield',
											anchor : '100%',
											fieldLabel : '指标值'
										}]
									}]
						}, {
							xtype : 'textarea',
							anchor : '100%',
							fieldLabel : '备注'
						}]
			}, {
				xtype : 'fieldset',
				title : '分配方式',
				collapsible : true,
				layout : 'form',
				labelAlign : 'right',
				items : [{
					layout : 'column',
					border : false,
					items : [{
						columnWidth : .5,
						border : false,
						items : [{
									layout : 'column',
									columnWidth : .5,
									border : false,
									items : [{
												layout : 'form',
												columnWidth : .4,
												border : false,
												items : [{
															xtype : 'radio',
															anchor : '100%',
															fieldLabel : '分配规则',
															boxLabel : '按比例分配'
														}]
											}, {
												columnWidth : .3,
												xtype : 'radio',
												anchor : '100%',
												boxLabel : '指定分配'
											}]

								}]
					}, {
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : [{
									xtype : 'textfield',
									fieldLabel : '分配数量',
									anchor : '100%'
								}]
					}]
				}]
			}, {
				xtype : 'fieldset',
				collapsible : true,
				collapsed : true,
				title : '可分配人',
				items : [this.gridPanel]
			}]
		})

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