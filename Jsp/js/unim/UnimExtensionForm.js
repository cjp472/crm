var g_extCode_UEF = '';
UnimExtensionForm = Ext.extend(Ext.Window, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				UnimExtensionForm.superclass.constructor.call(this, {
							id : 'UnimExtensionFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 160,
							width : 450,
							maximizable : true,
							title : '电脑配置',
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
//							autoScroll : true,
							labelAlign : 'right',
							labelWidth : 70,
							// id : 'UnimExtensionForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
										name : 'unimExtension.extId',
										xtype : 'hidden',
										value : this.extId == null
												? ''
												: this.extId
									}

									, {
										fieldLabel : '分机号',
										allowBlank : false,
										anchor : '70%',
										name : 'unimExtension.extCode',
										id : 'Unim_ExtF_Txt_extCode',
										maxLength : 20
									}

									, {
										fieldLabel : '屏监IP',
										allowBlank : false,
										name : 'unimExtension.ipaddress',
										id : 'Unim_ExtF_Txt_ipaddress',
										maxLength : 20
									}

									, {
										fieldLabel : '屏监端口',
										allowBlank : false,
										anchor : '70%',
										name : 'unimExtension.ipport',
										maxLength : 20
									}

							]
						});
				// 加载表单对应的数据
				if (this.extId != null && this.extId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath
										+ '/unim/getUnimExtension.do?extId='
										+ this.extId,
								root : 'data',
								preName : 'unimExtension',
								success : function(response, options) {
									var thisObj = Ext.util.JSON.decode(response.responseText).data;
									g_extCode_UEF = thisObj.extCode;
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
				var extIpVal = Ext.getCmp("Unim_ExtF_Txt_ipaddress").getValue();
				var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
			    if(!reg.test(extIpVal)) { 
			         Ext.Msg.alert("信息提示","请输入合法的IP地址！");
			        return;
		        }
		        
				var extCode = Ext.getCmp("Unim_ExtF_Txt_extCode").getValue();
				if (this.extId == null || this.extId == 'undefined') {
					if(UnimExtensionForm.isRepeat(extCode)){
						Ext.Msg.alert("信息提示","该分机号重复，请修改！");
						return;
					}
				} else if(g_extCode_UEF!=extCode){
					if(UnimExtensionForm.isRepeat(extCode)){
						Ext.Msg.alert("信息提示","该分机号重复，请修改！");
						return;
					}
				}
				
				$postSubForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/unim/saveUnimExtension.do',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('UnimExtensionGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
			}// end of save

		});
		
UnimExtensionForm.isRepeat = function(extCode) {
	var responsea = Ext.lib.Ajax.getConnectionObject().conn;
	responsea.open("POST",  __ctxPath + '/unim/isRepeatUnimExtension.do?extCode='+extCode, false);
	responsea.send(null);
	var result = Ext.util.JSON.decode(responsea.responseText);//解析数据
	if(result.success==true) {
		Ext.getCmp("Unim_ExtF_Txt_extCode").focus();
		return true;
	} else {
		return false;
	}
}