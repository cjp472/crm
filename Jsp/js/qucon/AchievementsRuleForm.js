/**
 * @author cf0666@gmail.com
 * @createtime
 * @class AchievementsRuleForm.js
 * @extends Ext.Window
 * @description QcCheck表单
 * @company 优创融联科技
 */
AchievementsRuleForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		AchievementsRuleForm.superclass.constructor.call(this, {
					id : 'AchievementsRuleFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '绩效规则详细信息',
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
		var topbar_contact2 = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function() {
									var store = gridPanel_contact2.getStore();
									var sm = gridPanel_contact2
											.getSelectionModel();
									var cell = sm.getSelections();
									if (cell.length < 1) {
										Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
									} else {
										store.remove(cell);
									}
								}
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								handler : function() {
									var store = gridPanel_contact2.getStore();
									var recordType = store.recordType;
									store.add(new recordType({})); // 添加一行空store
								}
							}]
				});
		var gridPanel_contact2 = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contact2,
			height : 250,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '类型',
						dataIndex : 'contactType1',
						editor : new Ext.form.ComboBox({
							mode : 'local',
							triggerAction : 'all',
							store : []
						})
					}, {
						header : '规则',
						dataIndex : 'contactValue',
						editor : new Ext.form.TextArea({

						})
					}, {
						header : '权重',
						dataIndex : 'contactValue',
						editor : new Ext.form.TextArea({

						})
					}, {
						header : '备注',
						dataIndex : 'contactType2',
						editor : new Ext.form.TextArea({
									inputType : 'file'
								})
					}]
				// end of columns
			});
		
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			labelWidth:70,
			autoScroll : true,
			labelAlign:'right',
			// id : 'AchievementsRuleForm.js',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
				fieldLabel:'名称',
				anchor:'95%',
				xtype:'textfield'
			},{
				layout:'column',
				border:false,
				anchor:'95%',
				items:[{
					columnWidth:.5,
					border:false,
					layout:'form',
					items:[{
						xtype : 'combo',
						editable : false,
						mode : 'local',
						fieldLabel:'周期',
						triggerAction : 'all',
						anchor:'100%',
						store : [['1', '周'], ['0', '月']]
					},{
						xtype : 'combo',
						editable : false,
						mode : 'local',
						fieldLabel:'职位',
						anchor:'100%',
						triggerAction : 'all',
						store : []
					},{
						fieldLabel:'开始时间',
						xtype : 'datefield',
						anchor:'100%',
						editable : false,
						format:'y-m-d'
					}]
				},{
					columnWidth:.5,
					border:false,
					layout:'form',
					items:[{
						xtype : 'combo',
						editable : false,
						anchor:'100%',
						mode : 'local',
						fieldLabel:'统计时间',
						triggerAction : 'all',
						store : [['1', '周一'], ['0', '周日'], ['2', '每月第一天'], ['3', '每月最后一天']]
					},{
						xtype : 'combo',
						editable : false,
						mode : 'local',
						fieldLabel:'级别',
						anchor:'100%',
						triggerAction : 'all',
						store : []
					},{
						fieldLabel:'失效时间',
						xtype : 'datefield',
						editable : false,
						anchor:'100%',
						format:'y-m-d'
					}]
				}]
			},{
				xtype : 'fieldset',
				title : "规则设置",
				collapsible : true,
				autoHeight : true,
				layout:'form',
				defaults : {
					anchor : '100%,100%'
				},
				items : [gridPanel_contact2]
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
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/qucon/saveQcCheck.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('QcCheckGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});