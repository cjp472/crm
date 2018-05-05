/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObFeeIndexProjectForm
 * @extends Ext.Window
 * @description ObFeeIndexProject表单
 * @company 优创融联科技
 */
ObFeeIndexProjectForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObFeeIndexProjectForm.superclass.constructor.call(this, {
							id : 'ObFeeIndexProjectFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObFeeIndexProject]详细信息',
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
							//id : 'ObFeeIndexProjectForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obFeeIndexProject.feeIndexProjectId',
								xtype : 'hidden',
								value : this.feeIndexProjectId == null ? '' : this.feeIndexProjectId
							}
																																																								
														
							,{  
							    																			fieldLabel : '名称',	
									 																			name : 'obFeeIndexProject.feeIndexProjectName'
																		 																			 										,maxLength: 120
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '计算公式',	
									 																			name : 'obFeeIndexProject.formula'
																		 																			 										,maxLength: 120
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.feeIndexProjectId != null && this.feeIndexProjectId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/fee/getObFeeIndexProject.do?feeIndexProjectId='+ this.feeIndexProjectId,
								root : 'data',
								preName : 'obFeeIndexProject'
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
						url:__ctxPath + '/fee/saveObFeeIndexProject.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObFeeIndexProjectGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});