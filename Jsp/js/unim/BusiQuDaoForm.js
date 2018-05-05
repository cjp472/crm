var g_channelName_BQF = '';
var g_channelCode_BQF = '';
BusiQudaoForm = Ext.extend(Ext.Window, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				BusiQudaoForm.superclass.constructor.call(this, {
							id : 'BusiQudaoFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 200,
							width : 450,
							maximizable : true,
							title : '渠道配置',
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
				g_channelName_BQF = this.channelName;
				g_channelCode_BQF = this.channelCode;
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							bodyStyle : 'padding:10px',
							border : false,
							autoScroll : true,
							labelAlign : 'right',
							labelWidth : 70,
							// id : 'BusiQudaoForm',
							defaults : {
								anchor : '96%,96%'
							},
//							defaultType : 'textfield',
							items : [{
										name : 'unimChannel.channelId',
										xtype : 'hidden',
										value : this.channelId == null ? '' : this.channelId
									},{
										layout:'column',
										border:false,
										items:[{
											layout:'form',
											border:false,
											columnWidth:.5,
											items:[{
												xtype:'textfield',
												name : 'unimChannel.channelName',
												id : 'Unim_ChannelF_TXT_chName',
												fieldLabel:'名称',
												allowBlank:false,
												anchor:'100%'
											},{
												xtype:'textfield',
												name : 'unimChannel.orderno',
												fieldLabel:'顺序',
												anchor:'100%'
											}]
										},{
											layout:'form',
											border:false,
											columnWidth:.5,
											items:[{
												xtype:'textfield',
												name : 'unimChannel.channelCode',
												id : 'Unim_ChannelF_TXT_chCode',
												fieldLabel:'编号',
												allowBlank:false,
												anchor:'100%'
											}]
										}]
									}
									, {
										fieldLabel : '备注',
										anchor : '96%',
										xtype:'textarea',
										height:50,
										name : 'unimChannel.remark',
										maxLength : 20
									}

							]
						});
				// 加载表单对应的数据
				if (this.channelId != null && this.channelId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath	+ '/unim/getUnimChannel.do?channelId=' + this.channelId,
								root : 'data',
								preName : 'unimChannel'
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
				g_channelName_BQF = '';
				g_channelCode_BQF = '';
			},
			/**
			 * 保存记录
			 */
			save : function() {
				//====名称、编号    重复验证
				var chName = Ext.getCmp("Unim_ChannelF_TXT_chName").getValue();		
				var chCode = Ext.getCmp("Unim_ChannelF_TXT_chCode").getValue();
				if (this.channelId == null || this.channelId == 'undefined') {
					if (BusiQudaoForm.isRepeat(chName,chCode)) {
						return;
					}
				} else if(g_channelName_BQF!=chName){
					if(BusiQudaoForm.isRepeat(chName,'')) {
						return;
					}
				} else if(g_channelCode_BQF!=chCode) {
					if(BusiQudaoForm.isRepeat('',chCode)) {
						return;
					} 
				} else if(g_channelName_BQF!=chName && g_channelCode_BQF!=chCode) {
					if(BusiQudaoForm.isRepeat(chName,chCode)) {
						return;
					}
				}
				
				$postSubForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/unim/saveUnimChannel.do',
							msgSuccess : '成功保存该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('UnimChannelGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
			}// end of save

		});

BusiQudaoForm.isRepeat = function(chName,chCode) {
		var url = __ctxPath + '/unim/isRepeatUnimChannel.do?channelName='+encodeURIComponent(chName)+'&channelCode='+encodeURIComponent(chCode)
		url = encodeURI(url)
		var responsea = Ext.lib.Ajax.getConnectionObject().conn;
		responsea.open("POST", url , false);
		responsea.send(null);
		var result = Ext.util.JSON.decode(responsea.responseText);//解析数据
		if(result.channelNameRepeat=='chNameTrue' && result.channelCodeRepeat=='chCodeTrue') {
			Ext.Msg.alert("信息提示","该名称和编号都重复，请修改！");
			return true;
		} else if(result.channelNameRepeat=='chNameTrue') {
			Ext.Msg.alert("信息提示","该名称重复，请修改！");
			return true;
		} else if(result.channelCodeRepeat=='chCodeTrue'){
			Ext.Msg.alert("信息提示","该编号重复，请修改！");
			return true;
		}
		return false;
}