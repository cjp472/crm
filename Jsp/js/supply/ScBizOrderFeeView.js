/**
 * @author:cf0666@gmail.com
 * @class ScBizOrderFeeView
 * @extends Ext.Panel
 * @description [ScBizOrderFee]管理
 * @company 优创融联科技
 * @createtime:
 */
ScBizOrderFeeView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScBizOrderFeeView.superclass.constructor.call(this, {
							id : 'ScBizOrderFeeViewWin',
							title : '[ScBizOrderFee]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'goodsId',
											'商品内码',
																																																					new Ext.form.NumberField({name : 'goodsId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bizOrderId',
											'业务单内码',
																																																					new Ext.form.NumberField({name : 'bizOrderId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bizOrderFeeType',
											'业务单费用类型',
																								new Ext.form.TextField({name : 'bizOrderFeeType',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'feeFlag',
											'费用标志0-现金、1-银行转帐、2-代金券、3-供货商抵用金&CON_T_FEE_FLAG',
																																																					new Ext.form.NumberField({name : 'feeFlag',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'sumFlag',
											'参与计算标志-1--减、0--不参与计算、1--增&CON_T_SUM_FLAG',
																																																					new Ext.form.NumberField({name : 'sumFlag',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'optUserId',
											'操作员标识',
																																																					new Ext.form.NumberField({name : 'optUserId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bankTransferReceiptNumber',
											'凭证流水号',
																								new Ext.form.TextField({name : 'bankTransferReceiptNumber',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'businessPersonalFlag',
											'公私标识：0--对私、1--对公&CON_T_BP_FLAG',
																																																					new Ext.form.NumberField({name : 'businessPersonalFlag',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'extBankName',
											'它方银行名称',
																								new Ext.form.TextField({name : 'extBankName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'extBankAcct',
											'它方银行账号',
																								new Ext.form.TextField({name : 'extBankAcct',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'receiptSet',
											'凭证附件集如果有多个附件，则用逗号分割',
																								new Ext.form.TextField({name : 'receiptSet',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'changedAmount',
											'发生金额-为减、+为增',
																																																					new Ext.form.NumberField({name : 'changedAmount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'changedTime',
											'发生时间',
																								new Ext.form.DateField({hiddenName : 'changedTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'status',
											'状态0-未完成、1-已完成、2-已取消&CON_T_FEE_STATUS',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'payModelType',
											'付款模式：0--小金额现付、1--打款、2--铺货代销&CON_T_PAY_MODEL',
																																																					new Ext.form.NumberField({name : 'payModelType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'createUserId',
											'创建人',
																																																					new Ext.form.NumberField({name : 'createUserId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'createTime',
											'创建时间',
																								new Ext.form.DateField({hiddenName : 'createTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'updateUserId',
											'修改人',
																																																					new Ext.form.NumberField({name : 'updateUserId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updateTime',
											'修改时间',
																								new Ext.form.DateField({hiddenName : 'updateTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'desc',
											'备注',
																								new Ext.form.TextField({name : 'desc',allowBlank:true})
																						 ]
																			 								 							 											]
				var ScBizOrderFeeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScBizOrderFee]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScBizOrderFeeSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_goodsId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bizOrderId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bizOrderFeeType_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_feeFlag_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_FEE_FLAG'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_sumFlag_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_SUM_FLAG'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_optUserId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bankTransferReceiptNumber_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_businessPersonalFlag_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_BP_FLAG'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extBankName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extBankAcct_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_receiptSet_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_changedAmount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_changedTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_status_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_FEE_STATUS'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_payModelType_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_PAY_MODEL'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createUserId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updateUserId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updateTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_desc_S_EQ',
																																																xtype : 'textfield'
																																	}
																			 								 							 																, {
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
										handler : this.onSearch
									}, {
										xtype : 'button',
										text : __reset,
										scope : this,
										iconCls : 'btn-reset',
										handler : this.reset
									},{
										xtype : 'button',
										text : __advancedSearch,
										iconCls : 'search',
										scope : this,
										handler :function(){ new ScBizOrderFeeAdvancedSearchWin().show();}
									}
								],
								layoutConfig : {
									padding : '5',
									align : 'middle'
								},
								defaults : {
									xtype : 'label',
									border : false,
									margins : {
										top : 0,
										right : 4,
										bottom : 4,
										left : 4
									}
								},
								border : false,
								frame : false
				});// end of searchPanel
				
				

				this.topbar = new Ext.Toolbar({
						items : [{
									iconCls : 'btn-add',
									//text : __create+'[ScBizOrderFee]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScBizOrderFee]',
									text : __delete,
									xtype : 'button',
									scope:this,
									handler : this.removeSelRs
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					tbar:this.topbar,
					//使用RowActions
					rowActions:true,
					printable : false,
					exportable : false,
					id:'ScBizOrderFeeGrid',
					url : __ctxPath + "/supply/listScBizOrderFee.do",
					fields : [{
									name : 'bizOrderFeeInst',
									type : 'int'
								}
																																																																			,'goodsId'
																																																																								,'bizOrderId'
																																																																								,'bizOrderFeeType'
																																																																								,'feeFlag'
																																																																								,'sumFlag'
																																																																								,'optUserId'
																																																																								,'bankTransferReceiptNumber'
																																																																								,'businessPersonalFlag'
																																																																								,'extBankName'
																																																																								,'extBankAcct'
																																																																								,'receiptSet'
																																																																								,'changedAmount'
																																																																								,'changedTime'
																																																																								,'status'
																																																																								,'payModelType'
																																																																								,'createUserId'
																																																																								,'createTime'
																																																																								,'updateUserId'
																																																																								,'updateTime'
																																																																								,'desc'
																																																],
					columns:[
								{
									header : 'bizOrderFeeInst',
									dataIndex : 'bizOrderFeeInst',
									hidden : true
								}
																																																								,{
																	header : '商品内码',
																isExp : false,
																
																	dataIndex : 'goodsId'
																}
																																																,{
																	header : '业务单内码',
																isExp : false,
																
																	dataIndex : 'bizOrderId'
																}
																																																,{
																	header : '业务单费用类型',
																isExp : false,
																
																	dataIndex : 'bizOrderFeeType'
																}
																																																,{
																	header : '费用标志0-现金、1-银行转帐、2-代金券、3-供货商抵用金&CON_T_FEE_FLAG',
																isExp : false,
																
																	dataIndex : 'feeFlag',
									renderer : function(value) {
										return CON_T_FEE_FLAG.get(value);
									}
																}
																																																,{
																	header : '参与计算标志-1--减、0--不参与计算、1--增&CON_T_SUM_FLAG',
																isExp : false,
																
																	dataIndex : 'sumFlag',
									renderer : function(value) {
										return CON_T_SUM_FLAG.get(value);
									}
																}
																																																,{
																	header : '操作员标识',
																isExp : false,
																
																	dataIndex : 'optUserId'
																}
																																																,{
																	header : '凭证流水号',
																isExp : false,
																
																	dataIndex : 'bankTransferReceiptNumber'
																}
																																																,{
																	header : '公私标识：0--对私、1--对公&CON_T_BP_FLAG',
																isExp : false,
																
																	dataIndex : 'businessPersonalFlag',
									renderer : function(value) {
										return CON_T_BP_FLAG.get(value);
									}
																}
																																																,{
																	header : '它方银行名称',
																isExp : false,
																
																	dataIndex : 'extBankName'
																}
																																																,{
																	header : '它方银行账号',
																isExp : false,
																
																	dataIndex : 'extBankAcct'
																}
																																																,{
																	header : '凭证附件集如果有多个附件，则用逗号分割',
																isExp : false,
																
																	dataIndex : 'receiptSet'
																}
																																																,{
																	header : '发生金额-为减、+为增',
																isExp : false,
																
																	dataIndex : 'changedAmount'
																}
																																																,{
																	header : '发生时间',
																isExp : false,
																
																	dataIndex : 'changedTime'
																}
																																																,{
																	header : '状态0-未完成、1-已完成、2-已取消&CON_T_FEE_STATUS',
																isExp : false,
																
																	dataIndex : 'status',
									renderer : function(value) {
										return CON_T_FEE_STATUS.get(value);
									}
																}
																																																,{
																	header : '付款模式：0--小金额现付、1--打款、2--铺货代销&CON_T_PAY_MODEL',
																isExp : false,
																
																	dataIndex : 'payModelType',
									renderer : function(value) {
										return CON_T_PAY_MODEL.get(value);
									}
																}
																																																,{
																	header : '创建人',
																isExp : false,
																
																	dataIndex : 'createUserId'
																}
																																																,{
																	header : '创建时间',
																isExp : false,
																
																	dataIndex : 'createTime'
																}
																																																,{
																	header : '修改人',
																isExp : false,
																
																	dataIndex : 'updateUserId'
																}
																																																,{
																	header : '修改时间',
																isExp : false,
																
																	dataIndex : 'updateTime'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'desc'
																}
																																								, new Ext.ux.grid.RowActions({
									header:__action,
									width:100,
									actions:[{
											 iconCls:'btn-del',qtip:__delete,style:'margin:0 3px 0 3px'
										},{
											 iconCls:'btn-edit',qtip:__edit,style:'margin:0 3px 0 3px'
										}
									],
									listeners:{
										scope:this,
										'action':this.onRowAction
									}
								})
					]//end of columns
				});
				
				this.gridPanel.addListener('rowdblclick',this.rowClick);
					
			},// end of the initComponents()
			//重置查询表单
			reset : function(){
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			onSearch : function(obj) {
//				var searchPanel = Ext.getCmp('ScBizOrderFeeSearchPanel');
//				var gridPanel = Ext.getCmp('ScBizOrderFeeGrid');
//				if (searchPanel.getForm().isValid()) {
					$search({
								searchPanel : this.searchPanel,
								gridPanel : this.gridPanel
							});
//				}
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new ScBizOrderFeeForm({bizOrderFeeInst:rec.data.bizOrderFeeInst}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScBizOrderFeeForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScBizOrderFeeForm');
				if (aForm != null) {
					tabs.remove('ScBizOrderFeeForm');
				}
				aForm = new ScBizOrderFeeForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/supply/multiDelScBizOrderFee.do',
					ids:id,
					grid:this.gridPanel,
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$gridRs({
					url:__ctxPath + '/supply/multiDelScBizOrderFee.do',
					grid:this.gridPanel,
					idName:'bizOrderFeeInst',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScBizOrderFeeForm({
				//	bizOrderFeeInst : record.data.bizOrderFeeInst
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScBizOrderFeeForm');
				if (aForm != null) {
					tabs.remove('ScBizOrderFeeForm');
				}
				aForm = new ScBizOrderFeeForm({bizOrderFeeInst : record.data.bizOrderFeeInst});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.bizOrderFeeInst);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
