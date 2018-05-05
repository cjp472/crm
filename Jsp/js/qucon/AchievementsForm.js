/**
 * @author cf0666@gmail.com
 * @createtime
 * @class AchievementsForm.js
 * @extends Ext.Window
 * @description QcCheck表单
 * @company 优创融联科技
 */
AchievementsForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		AchievementsForm.superclass.constructor.call(this, {
					id : 'AchievementsFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '个人绩效详细信息',
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
		this.gridPanel = new HT.GridPanel({
					region:'center',
					layout:'fit',
					style:'padding-bottom:10px',
					height:250,
					url : __ctxPath + "/qucon/listQcCheck.do",
					fields : [{
								name : 'chkId',
								type : 'int'
							}, 'qcCheck', 'chkUseId', 'toUseId', 'chkTimeSta',
							'chkTimeEnd', 'chkResult', 'chkSummary',
							'confirmResult', 'confirmRemark', 'staId'],
					columns : [{
								header : '指标',
								isExp : false,

								dataIndex : 'confirmRemark'
							},  {
								header : '分数',
								isExp : false,

								dataIndex : 'chkUseId'
							}]
						// end of columns
				});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			labelWidth:70,
			height:40,
			autoScroll : true,
			region:'north',
			labelAlign:'right',
			// id : 'AchievementsForm.js',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
				layout:'column',
				border:false,
				anchor:'95%',
				items:[{
					columnWidth:.33,
					border:false,
					layout:'form',
					items:[{
						xtype : 'textfield',
						fieldLabel:'被考核人',
						anchor:'100%'
					}]
				},{
					columnWidth:.33,
					border:false,
					layout:'form',
					items:[{
						xtype : 'datefield',
						fieldLabel:'开始时间',
						anchor:'100%'
					}]
				},{
					columnWidth:.34,
					border:false,
					layout:'form',
					items:[{
						xtype : 'datefield',
						fieldLabel:'结束时间',
						anchor:'100%'
					}]
				}]
			},{
				xtype : 'fieldset',
				title : "绩效详情",
				collapsible : true,
				autoHeight : true,
				layout:'form',
				defaults : {
					anchor : '100%,100%'
				},
				items:[this.gridPanel]
			},{
				fieldLabel:'综合评价',
				xtype:'textarea',
				height:50,
				anchor:'95%'
			
			} ]
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