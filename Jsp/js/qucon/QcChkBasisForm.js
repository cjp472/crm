/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcChkBasisForm
 * @extends Ext.Window
 * @description QcChkBasis表单
 * @company 优创融联科技
 */
QcChkBasisForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcChkBasisForm.superclass.constructor.call(this, {
							id : 'QcChkBasisFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcChkBasis]详细信息',
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
							//id : 'QcChkBasisForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcChkBasis.chkBasId',
								xtype : 'hidden',
								value : this.chkBasId == null ? '' : this.chkBasId
							}
																																																								
														
							,{  
							    																			fieldLabel : '考核结果',	
									 																			hiddenName : 'qcChkBasis.chkId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listchkId.do',
												fields : [ 'chkId', 'chkIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('chkId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['chkId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['chkIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'chkIdName'
											,valueField : 'chkId'
											,id : 'chkId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '考核依据&QC_KHYJ',	
									 																			hiddenName : 'qcChkBasis.chkBasisType'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'QC_KHYJ'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '依据对象',	
									 																			name : 'qcChkBasis.chkBasisObj'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '依据备注',	
									 																			name : 'qcChkBasis.chkBasisRemark'
																		 																			 										,maxLength: 128
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.chkBasId != null && this.chkBasId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcChkBasis.do?chkBasId='+ this.chkBasId,
								root : 'data',
								preName : 'qcChkBasis'
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
						url:__ctxPath + '/qucon/saveQcChkBasis.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcChkBasisGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});