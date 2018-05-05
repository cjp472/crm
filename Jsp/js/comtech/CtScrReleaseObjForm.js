/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CtScrReleaseObjForm
 * @extends Ext.Window
 * @description CtScrReleaseObj表单
 * @company 优创融联科技
 */
CtScrReleaseObjForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CtScrReleaseObjForm.superclass.constructor.call(this, {
							id : 'CtScrReleaseObjFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CtScrReleaseObj]详细信息',
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
							//id : 'CtScrReleaseObjForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ctScrReleaseObj.scrReleaseObjId',
								xtype : 'hidden',
								value : this.scrReleaseObjId == null ? '' : this.scrReleaseObjId
							}
																																																								
														
							,{  
							    																			fieldLabel : '话术',	
									 																			hiddenName : 'ctScrReleaseObj.scrId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/comtech/listscrId.do',
												fields : [ 'scrId', 'scrIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('scrId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['scrId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['scrIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'scrIdName'
											,valueField : 'scrId'
											,id : 'scrId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '用户',	
									 																			name : 'ctScrReleaseObj.usrId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '用户组',	
									 																			name : 'ctScrReleaseObj.usrGrpId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.scrReleaseObjId != null && this.scrReleaseObjId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/comtech/getCtScrReleaseObj.do?scrReleaseObjId='+ this.scrReleaseObjId,
								root : 'data',
								preName : 'ctScrReleaseObj'
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
						url:__ctxPath + '/comtech/saveCtScrReleaseObj.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CtScrReleaseObjGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});