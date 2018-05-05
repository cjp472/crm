/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UlBbsJieshouForm
 * @extends Ext.Window
 * @description UlBbsJieshou表单
 * @company 优创融联科技
 */
UlBbsJieshouForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UlBbsJieshouForm.superclass.constructor.call(this, {
							id : 'UlBbsJieshouFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UlBbsJieshou]详细信息',
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
							//id : 'UlBbsJieshouForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ulBbsJieshou.bbsJieshouId',
								xtype : 'hidden',
								value : this.bbsJieshouId == null ? '' : this.bbsJieshouId
							}
																																																	,{
																fieldLabel : 'bbsHuatiId',
								 								name : 'ulBbsJieshou.bbsHuatiId'
								 																,xtype:'numberfield'
								 							}
																																										,{
																fieldLabel : 'receiver',
								 								name : 'ulBbsJieshou.receiver'
								 																 								,maxLength: 200
								 							}
																																										,{
																fieldLabel : 'receivetime',
								 								name : 'ulBbsJieshou.receivetime'
								 																,xtype:'datefield',
								format:'Y-m-d',
								value:new Date()
								 							}
																																										,{
																fieldLabel : 'readtime',
								 								name : 'ulBbsJieshou.readtime'
								 																,xtype:'datefield',
								format:'Y-m-d',
								value:new Date()
								 							}
																																										,{
																fieldLabel : 'readstatus',
								 								name : 'ulBbsJieshou.readstatus'
								 																,xtype:'numberfield'
								 							}
																																			]
						});
				//加载表单对应的数据	
				if (this.bbsJieshouId != null && this.bbsJieshouId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/xitong/getUlBbsJieshou.do?bbsJieshouId='+ this.bbsJieshouId,
								root : 'data',
								preName : 'ulBbsJieshou'
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
						url:__ctxPath + '/xitong/saveUlBbsJieshou.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UlBbsJieshouGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});