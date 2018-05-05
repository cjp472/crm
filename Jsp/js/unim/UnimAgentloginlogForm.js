/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UnimAgentloginlogForm
 * @extends Ext.Window
 * @description UnimAgentloginlog表单
 * @company 优创融联科技
 */
UnimAgentloginlogForm = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				UnimAgentloginlogForm.superclass.constructor.call(this, {
							id : 'UnimAgentloginlogFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimAgentloginlog]详细信息',
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
							// id : 'UnimAgentloginlogForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
										name : 'unimAgentloginlog.aid',
										xtype : 'hidden',
										value : this.aid == null
												? ''
												: this.aid
									}

									, {
										fieldLabel : '登录的分机号',
										name : 'unimAgentloginlog.station',
										allowBlank : false,
										maxLength : 15
									}

									, {
										fieldLabel : 'CTI地址  可以是IP地址等CTI的连接信息',
										name : 'unimAgentloginlog.locId',
										maxLength : 255
									}

									, {
										fieldLabel : '租户  备注：对应多租户平台',
										name : 'unimAgentloginlog.alTenant',
										xtype : 'numberfield'
									}

									, {
										fieldLabel : '登录日期  YYYY-MM-DD',
										name : 'unimAgentloginlog.loginDate',
										maxLength : 20
									}

									, {
										fieldLabel : '登录时间  YYYY-MM-DD 24H:MM:SS',
										name : 'unimAgentloginlog.loginTime',
										allowBlank : false,
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date()
									}

									, {
										fieldLabel : '登出日期  YYYY-MM-DD',
										name : 'unimAgentloginlog.logoutDate',
										maxLength : 20
									}

									, {
										fieldLabel : '登出时间  YYYY-MM-DD 24H:MM:SS',
										name : 'unimAgentloginlog.logoutTime',
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date()
									}

									, {
										fieldLabel : '登出原因  0、默认；99、强制签出',
										name : 'unimAgentloginlog.logoutReason',
										xtype : 'numberfield'
									}

							]
						});
				// 加载表单对应的数据
				if (this.aid != null && this.aid != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath
										+ '/unim/getUnimAgentloginlog.do?aid='
										+ this.aid,
								root : 'data',
								preName : 'unimAgentloginlog'
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
				$postSubForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/unim/saveUnimAgentloginlog.do',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext
										.getCmp('UnimAgentloginlogGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
			}// end of save

		});