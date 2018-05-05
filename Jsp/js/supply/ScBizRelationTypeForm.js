/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScBizRelationTypeForm
 * @extends Ext.Window
 * @description ScBizRelationType表单
 * @company 优创融联科技
 */
ScBizRelationTypeForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScBizRelationTypeForm.superclass.constructor.call(this, {
							id : 'ScBizRelationTypeFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScBizRelationType]详细信息',
							buttonAlign : 'center',
							buttons : [
										{
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
							//id : 'ScBizRelationTypeForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scBizRelationType.bizOrderRelationType',
								xtype : 'hidden',
								value : this.bizOrderRelationType == null ? '' : this.bizOrderRelationType
							}
																																																								
														
							,{  
							    																			fieldLabel : '业务单关联类型名称',	
									 																			name : 'scBizRelationType.bizOrderRelationTypeName'
																												,allowBlank:false
									 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单关联类型描述',	
									 																			name : 'scBizRelationType.bizOrderRelationTypeDesc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.bizOrderRelationType != null && this.bizOrderRelationType != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/supply/getScBizRelationType.do?bizOrderRelationType='+ this.bizOrderRelationType,
								root : 'data',
								preName : 'scBizRelationType'
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
				$postSubForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/supply/saveScBizRelationType.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScBizRelationTypeGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});