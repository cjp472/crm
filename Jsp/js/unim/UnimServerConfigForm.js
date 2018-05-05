/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UnimServerConfigForm
 * @extends Ext.Window
 * @description UnimServerConfig表单
 * @company 优创融联科技
 */
UnimServerConfigForm = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				UnimServerConfigForm.superclass.constructor.call(this, {
							id : 'UnimServerConfigFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimServerConfig]详细信息',
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
							// id : 'UnimServerConfigForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimServerConfig.serverId',
								xtype : 'hidden',
								value : this.serverId == null
										? ''
										: this.serverId
							}

							, {
								fieldLabel : '编号',
								name : 'unimServerConfig.serverCode',
								maxLength : 128
							}

							, {
								fieldLabel : '名称',
								name : 'unimServerConfig.serverName',
								maxLength : 128
							}

							, {
								fieldLabel : '类型',
								name : 'unimServerConfig.serverType',
								maxLength : 64
							}

							, {
								fieldLabel : 'IP地址',
								name : 'unimServerConfig.ipAddress',
								maxLength : 128
							}

							, {
								fieldLabel : '端口',
								name : 'unimServerConfig.ipPort',
								xtype : 'numberfield'
							}

							, {
								fieldLabel : '描述',
								name : 'unimServerConfig.remark',
								maxLength : 256
							}

							]
						});
				// 加载表单对应的数据
				if (this.serverId != null && this.serverId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath
										+ '/unim/getUnimServerConfig.do?serverId='
										+ this.serverId,
								root : 'data',
								preName : 'unimServerConfig'
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
							url : __ctxPath + '/unim/saveUnimServerConfig.do',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext
										.getCmp('UnimServerConfigGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
			}// end of save

		});