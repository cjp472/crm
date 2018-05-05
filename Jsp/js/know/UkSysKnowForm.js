/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UkSysKnowForm
 * @extends Ext.Window
 * @description UkSysKnow表单
 * @company 优创融联科技
 */
UkSysKnowForm = Ext
		.extend(
				Ext.Panel,
				{
					//构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						//必须先初始化组件
						this.initUIComponents();
						UkSysKnowForm.superclass.constructor.call(this, {
							id : 'UkSysKnowFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '详细信息',
							buttonAlign : 'center',
							buttons : [ 
//								{
//								text : __save,
//								iconCls : 'btn-save',
//								scope : this,
//								handler : this.save
//							}, {
//								text : __reset,
//								iconCls : 'btn-reset',
//								scope : this,
//								handler : this.reset
//							}, {
//								text : __cancel,
//								iconCls : 'btn-cancel',
//								scope : this,
//								handler : this.cancel
//							}
							]
						});
					},//end of the constructor
					//初始化组件
					initUIComponents : function() {
						this.formPanel = new Ext.FormPanel(
								{
									layout : 'form',
									bodyStyle : 'padding:10px',
									border : false,
									autoScroll : true,
									//id : 'UkSysKnowForm',
									defaults : {
										anchor : '96%,96%'
									},
									defaultType : 'textfield',
									items : [
											{
												name : 'knowId',
												xtype : 'hidden',
												value : this.knowId == null ? ''
														: this.knowId
											}

											,
											/*{
												fieldLabel : '知识模板编号',
												hiddenName : 'ukSysKnow.knowTmpId',
												xtype : 'combo',
												editabel : false,
												lazyInit : false,
												triggerAction : 'all',  
												store : new Ext.data.SimpleStore(
														{
															autoLoad : true,
															url : __ctxPath + '/financial/comboknowTmpId.do',
															fields : [
																	'knowTmpId',
																	'knowTmpIdName' ],
															listeners : {
																load : function() {
																	var combo = Ext
																			.getCmp('knowTmpId');
																	var store = combo
																			.getStore();
																	var rows = [];//定义数组
																	for ( var i = 0; i < store
																			.getCount(); i++) { //store.getCount()为store的长度
																		if (store
																				.getAt(i).data['knowTmpId'] == combo
																				.getValue()) {
																			combo
																					.setValue(store
																							.getAt(i).data['knowTmpIdName']);
																			break;
																		}
																	}
																}
															}
														}),
												displayField : 'knowTmpIdName',
												valueField : 'knowTmpId',
												id : 'knowTmpId'
											}

											,
											{
												fieldLabel : '知识审批单内码',
												hiddenName : 'ukSysKnow.knowApproveId',
												xtype : 'combo',
												editabel : false,
												lazyInit : false,
												triggerAction : 'all',
												store : new Ext.data.SimpleStore(
														{
															autoLoad : true,
															url : __ctxPath + '/financial/comboknowApproveId.do',
															fields : [
																	'knowApproveId',
																	'knowApproveIdName' ],
															listeners : {
																load : function() {
																	var combo = Ext
																			.getCmp('knowApproveId');
																	var store = combo
																			.getStore();
																	var rows = [];//定义数组
																	for ( var i = 0; i < store
																			.getCount(); i++) { //store.getCount()为store的长度
																		if (store
																				.getAt(i).data['knowApproveId'] == combo
																				.getValue()) {
																			combo
																					.setValue(store
																							.getAt(i).data['knowApproveIdName']);
																			break;
																		}
																	}
																}
															}
														}),
												displayField : 'knowApproveIdName',
												valueField : 'knowApproveId',
												id : 'knowApproveId'
											}

											,*/
											{
												fieldLabel : '标题',
												name : 'ukSysKnow.tiTle',
												maxLength : 30,
												readOnly:true
											}

//											,
//											{
//												fieldLabel : '业务分类&BUSI_TYPE',
//												hiddenName : 'ukSysKnow.busiType',
//												xtype : 'mtdiccombo',
//												editable : true,
//												lazyInit : false,
//												forceSelection : false,
//												itemKey : 'BUSI_TYPE'
//											}
//
											,
											{
												fieldLabel : '生效时间',
												name : 'ukSysKnow.enableTime',
//												xtype : 'datefield',
												format : 'Y-m-d',
												readOnly:true
												//value : new Date()
											}
											,
											{
												fieldLabel : '过期时间',
												name : 'ukSysKnow.pastTime',
												//xtype : 'datefield',
												format : 'Y-m-d',
												//value : new Date(),
												readOnly:true
											}

											,
											{
												fieldLabel : '状态',
												hiddenName : 'ukSysKnow.sysKnowStatus',
												xtype : 'mtdiccombo',
												editable : false,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'KNOW_STATUS',
												readOnly:true
											}

											,
											{
												fieldLabel : '浏览数',
												name : 'ukSysKnow.viewCount',
												xtype : 'numberfield',
												readOnly:true
											}

											,
											{
												fieldLabel : '摘要',
												name : 'ukSysKnow.sysKnowComment',
												maxLength : 200,
												readOnly:true
											}
//
//											,
//											{
//												fieldLabel : '附加字段1',
//												name : 'ukSysKnow.plus1',
//												xtype : 'textarea',
//												maxLength : 4000
//											}
//
//											,
//											{
//												fieldLabel : '附加字段2',
//												name : 'ukSysKnow.plus2',
//												xtype : 'textarea',
//												maxLength : 4000
//											}
//
//											,
//											{
//												fieldLabel : '附加字段3',
//												name : 'ukSysKnow.plus3',
//												xtype : 'textarea',
//												maxLength : 4000
//											}
//
//											,
//											{
//												fieldLabel : '附加字段4',
//												name : 'ukSysKnow.plus4',
//												xtype : 'textarea',
//												maxLength : 4000
//											}
//
//											,
//											{
//												fieldLabel : '附加字段5',
//												name : 'ukSysKnow.plus5',
//												xtype : 'textarea',
//												maxLength : 4000
//											}
//
//											,
//											{
//												fieldLabel : '附加字段6',
//												name : 'ukSysKnow.plus6',
//												xtype : 'textarea',
//												maxLength : 4000
//											}
//
//											,
//											{
//												fieldLabel : '附加字段7',
//												name : 'ukSysKnow.plus7',
//												xtype : 'textarea',
//												maxLength : 4000
//											}
//
//											,
//											{
//												fieldLabel : '附加字段8',
//												name : 'ukSysKnow.plus8',
//												xtype : 'textarea',
//												maxLength : 4000
//											}
//
											,
											{
												fieldLabel : '版本号',
												name : 'ukSysKnow.sysKnowVersion',
												xtype : 'numberfield',
												readOnly:true
											}

											, {
												fieldLabel : '创建人内码',
												name : 'createBy.fullname',
												//xtype : 'numberfield',
												maxLength : 30,
												readOnly:true
											}

									]
								});
						//加载表单对应的数据	
						if (this.knowId != null && this.knowId != 'undefined') {
							this.formPanel.loadData( {
								url : __ctxPath
										+ '/know/getUkSysKnow.do?knowId='
										+ this.knowId,
								root : 'data',
								preName : 'ukSysKnow'
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
						$postForm( {
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/know/saveUkSysKnow.do',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('UkSysKnowGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
					}//end of save

				});