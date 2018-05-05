UkKnowApplyNewForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();

		UkKnowApplyNewForm.superclass.constructor.call(this, {
					id : 'UkKnowApplyNewFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '知识采集申请',
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
		
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			// id : 'UkKnowApplyNewForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
						fieldLabel : '标题',
						xtype : 'textfield',
						name : 'obProject.projNam',
						allowBlank : false,
						maxLength : 128,
						maxLengthText : '',
						anchor : '95%'
					}, {
						layout : 'column',
						border : false,
						items : [{
							columnWidth : .33,
							border : false,
							layout : 'form',
							items : [{
										fieldLabel : '采集类型',
										xtype : 'mtdiccombo',
										triggerAction : 'all',
										editable : false,
										allowBlank:false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'KNOW_CJLX',
										anchor : '100%'
									}]

						},{
							columnWidth : .33,
							border : false,
							layout : 'form',
							items : [ {
										xtype:'datefield',
										format:'y-m-d',
										fieldLabel:'要求完成时间',
										anchor:'100%'
									}]

						},{
							columnWidth : .33,
							border : false,
							layout : 'form',
							items : [{
										fieldLabel : '知识类型',
										xtype : 'mtdiccombo',
										triggerAction : 'all',
										editable : false,
										allowBlank:false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'KNOW_CATE',
										anchor : '100%'
									}]

						}]
					}

					, {
						fieldLabel : '申请说明',
						xtype : 'textarea',
						allowBalnk:false,
						allowBlank:false,
						maxLength : 4000,
						maxLengthText : '',
						anchor : '95%'
					},{
						xtype:'panel',
						layout:'column',
						border:false,
						items:[{
							columnWidth:.93,
							border:false,
							layout:'form',
							items:[{
								xtype:'textarea',
								fieldLabel:'推荐资料',
								height:50,
								anchor:'100%'
							}]
						},{
							columnWidth:.05,
							border:false,
							style:'margin-left:10px',
							items:[{
								xtype:'button',
								text:'选择'
							},{
								xtype:'button',
								text:'清空'
							}]
						}]
					}
					, {
						fieldLabel : '备注',
						name : 'obProject.remark',
						xtype : 'textarea',
						maxLength : 1024,
						maxLengthText : '超过最大长度  {maxLength} 限制',
						anchor : '95%'
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
		var tabs = Ext.getCmp('centerTabPanel');// 获得tab
		tabs.remove('UkKnowApplyNewFormWin');// 移除创建的窗口
	},
	/**
	 * 保存记录
	 */
	save : function() {
		var itemIndex = Ext.getCmp("OB_Project_Form_Tree_01").getItemIndex();
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/outb/saveObProject.do',
					msgSuccess : '成功添加该记录！',
					msgFailure : '操作出错，请联系管理员！',
					params : {
						itemIndex : itemIndex
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObProjectGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('UkKnowApplyNewFormWin');
					}
				});
	}// end of save

});