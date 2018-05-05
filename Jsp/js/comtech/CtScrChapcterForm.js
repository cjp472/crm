/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CtScrChapcterForm
 * @extends Ext.Window
 * @description CtScrChapcter表单
 * @company 优创融联科技
 */
CtScrChapcterForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CtScrChapcterForm.superclass.constructor.call(this, {
							id : 'CtScrChapcterFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CtScrChapcter]详细信息',
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
							//id : 'CtScrChapcterForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ctScrChapcter.queCatId',
								xtype : 'hidden',
								value : this.queCatId == null ? '' : this.queCatId
							}
																																																								
														
							,{  
							    																			fieldLabel : '话术',	
									 																			hiddenName : 'ctScrChapcter.scrId'
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
							    																			fieldLabel : '名称',	
									 																			name : 'ctScrChapcter.queCatName'
																												,allowBlank:false
									 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'ctScrChapcter.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '序号',	
									 																			name : 'ctScrChapcter.disorder'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&CT_ZT',	
									 																			hiddenName : 'ctScrChapcter.staId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_ZT'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.queCatId != null && this.queCatId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/comtech/getCtScrChapcter.do?queCatId='+ this.queCatId,
								root : 'data',
								preName : 'ctScrChapcter'
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
						url:__ctxPath + '/comtech/saveCtScrChapcter.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CtScrChapcterGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});