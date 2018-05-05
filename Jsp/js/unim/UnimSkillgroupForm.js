var g_skgId_USF = '';
UnimSkillgroupForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UnimSkillgroupForm.superclass.constructor.call(this, {
					id : 'UnimSkillgroupFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 220,
					width : 550,
					maximizable : true,
					title : '业务组详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : '重置',
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
		g_skgId_USF = this.skgId;
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			// id : 'UnimSkillgroupForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'unimSkillgroup.skgId',
						xtype : 'hidden',
						value : this.skgId == null ? '' : this.skgId
					}, {
						layout : 'column',
						xtype:'panel',
						border : false,
						items : [{
									columnWidth : .5,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '编码',
												xtype:'textfield',
												anchor : '100%',
												allowBlank : false,
												id : 'Unim_Skg_SkgCode_TXT_Id',
												name : 'unimSkillgroup.skgCode',
												maxLength : 128
											}]

								}, {
									columnWidth : .5,
									layout : 'form',
									border : false,
									items : [{
												fieldLabel : '名称',
												anchor : '100%',
												allowBlank : false,
												xtype:'textfield',
												name : 'unimSkillgroup.skgName',
												maxLength : 128
											}]

								}]
					}, {
						layout : 'column',
						xtype:'panel',
						border : false,
						items : [{
									columnWidth : .5,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '状态',
												allowBlank : false,
												maxLength : 128,
												hiddenName : 'unimSkillgroup.status',
												id : 'Unim_Skg_Status_Combo_Id',
												xtype : 'mtdiccombo',
												editable : false,
												allowBlank : false,
												triggerAction : 'all',
												forceSelection : false,
												itemKey : 'QC_MBZT',
												anchor : '100%'

											}]

								}]
					}, {
						fieldLabel : '备注',
						name : 'unimSkillgroup.remark',
						xtype : 'textarea',
						maxLength : 512
					}

			]
		});
		// 加载表单对应的数据
		if (this.skgId != null && this.skgId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/unim/getUnimSkillgroup.do?skgId='
								+ this.skgId,
						root : 'data',
						preName : 'unimSkillgroup',
						success : function(response, options) {
							var thisObj = Ext.util.JSON.decode(response.responseText).data;
							Ext.getCmp("Unim_Skg_Status_Combo_Id").setValue(QC_MBZT.get(thisObj.status));
						}
					});
		}

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
		if (g_skgId_USF == null || g_skgId_USF == 'undefined') {
			var skgCode = Ext.getCmp("Unim_Skg_SkgCode_TXT_Id").getValue();
			
			var responsea = Ext.lib.Ajax.getConnectionObject().conn;
			responsea.open("POST",  __ctxPath + '/unim/isRepeatSkgCodeUnimSkillgroup.do?skgCode='+skgCode, false);
			responsea.send(null);
			var result = Ext.util.JSON.decode(responsea.responseText);//解析数据
			if(result.success==true) {
				Ext.Msg.alert("信息提示","该编码重复，请修改！");
				Ext.getCmp("Unim_Skg_SkgCode_TXT_Id").focus();
				return;
			}
		}
		
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/unim/saveUnimSkillgroup.do',
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UnimSkillgroupGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});