/**
 * @author:cf0666@gmail.com
 * @class CsOrderView
 * @extends Ext.Panel
 * @description [CsOrder]管理
 * @company 优创融联科技
 * @createtime:
 */
CsOrderView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CsOrderView.superclass.constructor.call(this, {
							id : 'CsOrderViewWin',
							title : '[CsOrder]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'orderType',
											'类型',
																																																					new Ext.form.NumberField({name : 'orderType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'customerid',
											'客户内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listcustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
														})
																																			 ]
																				,
																			 								 																																		[
											'customerName',
											'客户姓名',
																								new Ext.form.TextField({name : 'customerName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'customerGender',
											'客户性别',
																																																					new Ext.form.NumberField({name : 'customerGender',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'depid',
											'接单部门内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listdepid.do',
															fields : [ 'depid', 'depidName' ]
														}),
														displayField : 'depidName',
														valueField : 'depid',
														id : 'depid'
														})
																																			 ]
																				,
																			 								 																																		[
											'userid',
											'发起人',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listuserid.do',
															fields : [ 'userid', 'useridName' ]
														}),
														displayField : 'useridName',
														valueField : 'userid',
														id : 'userid'
														})
																																			 ]
																				,
																			 								 																																		[
											'regionid',
											'地区',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listregionid.do',
															fields : [ 'regionid', 'regionidName' ]
														}),
														displayField : 'regionidName',
														valueField : 'regionid',
														id : 'regionid'
														})
																																			 ]
																				,
																			 								 																																		[
											'customerNo',
											'客户号码',
																								new Ext.form.TextField({name : 'customerNo',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'contacta',
											'联系方式1',
																								new Ext.form.TextField({name : 'contacta',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'contactb',
											'联系方式2',
																								new Ext.form.TextField({name : 'contactb',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'orderSorce',
											'工单来源',
																																																					new Ext.form.NumberField({name : 'orderSorce',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'order',
											'工单类型',
																																																					new Ext.form.NumberField({name : 'order',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'orderProject',
											'工单项目',
																																																					new Ext.form.NumberField({name : 'orderProject',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'level',
											'投诉等级',
																																																					new Ext.form.NumberField({name : 'level',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'responseTime',
											'要求响应时间',
																								new Ext.form.DateField({hiddenName : 'responseTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'completionTime',
											'要求完成时间',
																								new Ext.form.DateField({hiddenName : 'completionTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'content',
											'内容',
																								new Ext.form.TextField({name : 'content',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'noteAppeal',
											'备注或诉求',
																								new Ext.form.TextField({name : 'noteAppeal',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'detailType',
											'附属单据类型',
																																																					new Ext.form.NumberField({name : 'detailType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'detailId',
											'附属单据内码',
																																																					new Ext.form.NumberField({name : 'detailId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'runid',
											'RUNID',
																																																					new Ext.form.NumberField({name : 'runid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'nodeName',
											'审批节点名称',
																								new Ext.form.TextField({name : 'nodeName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'approvalStatus',
											'审批状态',
																								new Ext.form.TextField({name : 'approvalStatus',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'orderTime',
											'发起时间',
																								new Ext.form.DateField({hiddenName : 'orderTime',format : 'Y-m-d'})
																						 ]
																			 								 							 											]
				var CsOrderAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CsOrder]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CsOrderSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_orderType_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_customerid_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listcustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_customerName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_customerGender_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_depid_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listdepid.do',
															fields : [ 'depid', 'depidName' ]
														}),
														displayField : 'depidName',
														valueField : 'depid',
														id : 'depid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_userid_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listuserid.do',
															fields : [ 'userid', 'useridName' ]
														}),
														displayField : 'useridName',
														valueField : 'userid',
														id : 'userid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_regionid_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listregionid.do',
															fields : [ 'regionid', 'regionidName' ]
														}),
														displayField : 'regionidName',
														valueField : 'regionid',
														id : 'regionid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_customerNo_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_contacta_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_contactb_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_orderSorce_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_order_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_orderProject_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_level_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_responseTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_completionTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_content_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_noteAppeal_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_detailType_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_detailId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_runid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_nodeName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_approvalStatus_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_orderTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
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
										handler :function(){ new CsOrderAdvancedSearchWin().show();}
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
									//text : __create+'[CsOrder]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CsOrder]',
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
					id:'CsOrderGrid',
					url : __ctxPath + "/customer/listCsOrder.do",
					fields : [{
									name : 'orderId',
									type : 'int'
								}
																																																																			,'orderType'
																																																																								,'csOrder'
																																																																								,'customerName'
																																																																								,'customerGender'
																																																																								,'csOrder'
																																																																								,'csOrder'
																																																																								,'csOrder'
																																																																								,'customerNo'
																																																																								,'contacta'
																																																																								,'contactb'
																																																																								,'orderSorce'
																																																																								,'order'
																																																																								,'orderProject'
																																																																								,'level'
																																																																								,'responseTime'
																																																																								,'completionTime'
																																																																								,'content'
																																																																								,'noteAppeal'
																																																																								,'detailType'
																																																																								,'detailId'
																																																																								,'runid'
																																																																								,'nodeName'
																																																																								,'approvalStatus'
																																																																								,'orderTime'
																																																],
					columns:[
								{
									header : 'orderId',
									dataIndex : 'orderId',
									hidden : true
								}
																																																								,{
																	header : '类型',
																isExp : false,
																
																	dataIndex : 'orderType'
																}
																																																,{
																	header : '客户内码',
																isExp : false,
																
																    dataIndex : 'customerid',
								    renderer:function(val){
								    	return val.customeridName;
								    }
																}
																																																,{
																	header : '客户姓名',
																isExp : false,
																
																	dataIndex : 'customerName'
																}
																																																,{
																	header : '客户性别',
																isExp : false,
																
																	dataIndex : 'customerGender'
																}
																																																,{
																	header : '接单部门内码',
																isExp : false,
																
																    dataIndex : 'depid',
								    renderer:function(val){
								    	return val.depidName;
								    }
																}
																																																,{
																	header : '发起人',
																isExp : false,
																
																    dataIndex : 'userid',
								    renderer:function(val){
								    	return val.useridName;
								    }
																}
																																																,{
																	header : '地区',
																isExp : false,
																
																    dataIndex : 'regionid',
								    renderer:function(val){
								    	return val.regionidName;
								    }
																}
																																																,{
																	header : '客户号码',
																isExp : false,
																
																	dataIndex : 'customerNo'
																}
																																																,{
																	header : '联系方式1',
																isExp : false,
																
																	dataIndex : 'contacta'
																}
																																																,{
																	header : '联系方式2',
																isExp : false,
																
																	dataIndex : 'contactb'
																}
																																																,{
																	header : '工单来源',
																isExp : false,
																
																	dataIndex : 'orderSorce'
																}
																																																,{
																	header : '工单类型',
																isExp : false,
																
																	dataIndex : 'order'
																}
																																																,{
																	header : '工单项目',
																isExp : false,
																
																	dataIndex : 'orderProject'
																}
																																																,{
																	header : '投诉等级',
																isExp : false,
																
																	dataIndex : 'level'
																}
																																																,{
																	header : '要求响应时间',
																isExp : false,
																
																	dataIndex : 'responseTime'
																}
																																																,{
																	header : '要求完成时间',
																isExp : false,
																
																	dataIndex : 'completionTime'
																}
																																																,{
																	header : '内容',
																isExp : false,
																
																	dataIndex : 'content'
																}
																																																,{
																	header : '备注或诉求',
																isExp : false,
																
																	dataIndex : 'noteAppeal'
																}
																																																,{
																	header : '附属单据类型',
																isExp : false,
																
																	dataIndex : 'detailType'
																}
																																																,{
																	header : '附属单据内码',
																isExp : false,
																
																	dataIndex : 'detailId'
																}
																																																,{
																	header : 'RUNID',
																isExp : false,
																
																	dataIndex : 'runid'
																}
																																																,{
																	header : '审批节点名称',
																isExp : false,
																
																	dataIndex : 'nodeName'
																}
																																																,{
																	header : '审批状态',
																isExp : false,
																
																	dataIndex : 'approvalStatus'
																}
																																																,{
																	header : '发起时间',
																isExp : false,
																
																	dataIndex : 'orderTime'
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
//				var searchPanel = Ext.getCmp('CsOrderSearchPanel');
//				var gridPanel = Ext.getCmp('CsOrderGrid');
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
					new CsOrderForm({orderId:rec.data.orderId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CsOrderForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CsOrderForm');
				if (aForm != null) {
					tabs.remove('CsOrderForm');
				}
				aForm = new CsOrderForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/customer/multiDelCsOrder.do',
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
					url:__ctxPath + '/customer/multiDelCsOrder.do',
					grid:this.gridPanel,
					idName:'orderId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CsOrderForm({
				//	orderId : record.data.orderId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CsOrderForm');
				if (aForm != null) {
					tabs.remove('CsOrderForm');
				}
				aForm = new CsOrderForm({orderId : record.data.orderId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.orderId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
