/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UlUgroupUserForm
 * @extends Ext.Window
 * @description UlUgroupUser表单
 * @company 优创融联科技
 */
UlUgroupUserForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UlUgroupUserForm.superclass.constructor.call(this, {
							id : 'UlUgroupUserFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UlUgroupUser]详细信息',
							buttonAlign : 'center',
							buttons : [
										{
											text : '保存',
											iconCls : 'btn-save',
											scope : this,
											handler : this.save
										}, {
											text : '重置',
											iconCls : 'btn-reset',
											scope : this,
											handler : this.reset
										}, {
											text : '取消',
											iconCls : 'btn-cancel',
											scope : this,
											handler : this.cancel
										}
							         ]
				});
			},//end of the constructor
			//初始化组件
			initUIComponents : function() {
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							bodyStyle : 'padding:10px',
							border : false,
							autoScroll:true,
							//id : 'UlUgroupUserForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ulUgroupUser.ugUId',
								xtype : 'hidden',
								value : this.ugUId == null ? '' : this.ugUId
							}
																																			,{
																fieldLabel : 'pkUsergroupId',
								 								name : 'ulUgroupUser.pkUsergroupId'
																,allowBlank:false
								 																,xtype:'numberfield'
								 							}
																																										,{
																fieldLabel : 'userid',
								 								name : 'ulUgroupUser.userid'
								 																,xtype:'numberfield'
								 							}
																																																	]
						});
				//加载表单对应的数据	
				if (this.ugUId != null && this.ugUId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/xitong/getUlUgroupUser.do?ugUId='+ this.ugUId,
								root : 'data',
								preName : 'ulUgroupUser'
							});
				}
				
			},//end of the initcomponents

			/**
			 * 重置
			 * @param {} formPanel
			 */
			reset : function() {
				this.formPanel.getForm().reset();
			},
			/**
			 * 取消
			 * @param {} window
			 */
			cancel : function() {
				this.close();
			},
			/**
			 * 保存记录
			 */
			save : function() {
				$postForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/xitong/saveUlUgroupUser.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UlUgroupUserGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});