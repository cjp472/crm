/**
 * @author:cf0666@gmail.com
 * @class CusBusiInvokeView
 * @extends Ext.Panel
 * @description [CusBusiInvoke]管理
 * @company 优创融联科技
 * @createtime:
 */
CusBusiInvokeView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CusBusiInvokeView.superclass.constructor.call(this, {
							id : 'CusBusiInvokeViewWin',
							title : '[CusBusiInvoke]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'customerid',
											'客户ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/financial/combocustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
														})
																																			 ]
																				,
																			 								 																																		[
											'chanTypeId',
											'渠道类别&CUSQDLB',
																																																					new Ext.form.NumberField({name : 'chanTypeId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ownerId',
											'业务处理人（坐席）',
																																																					new Ext.form.NumberField({name : 'ownerId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'busiTypeId',
											'交易类型&CUSJYLX',
																																																					new Ext.form.NumberField({name : 'busiTypeId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'staTime',
											'开始时间',
																								new Ext.form.DateField({hiddenName : 'staTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'endTime',
											'结束时间',
																								new Ext.form.DateField({hiddenName : 'endTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'busiCode',
											'交易码',
																								new Ext.form.TextField({name : 'busiCode',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'busiResId',
											'交易状态&CUSJYZT',
																																																					new Ext.form.NumberField({name : 'busiResId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'cusCardNo',
											'客户卡号',
																								new Ext.form.TextField({name : 'cusCardNo',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'remarks',
											'备注',
																								new Ext.form.TextField({name : 'remarks',allowBlank:true})
																						 ]
																			 								 							 											]
				var CusBusiInvokeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CusBusiInvoke]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CusBusiInvokeSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_customerid_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/financial/combocustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_chanTypeId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CUSQDLB'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ownerId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_busiTypeId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CUSJYLX'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_staTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_endTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_busiCode_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_busiResId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CUSJYZT'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_cusCardNo_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remarks_S_EQ',
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
										handler :function(){ new CusBusiInvokeAdvancedSearchWin().show();}
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
									//text : __create+'[CusBusiInvoke]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CusBusiInvoke]',
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
					id:'CusBusiInvokeGrid',
					url : __ctxPath + "/customer/listCusBusiInvoke.do",
					fields : [{
									name : 'busiHisId',
									type : 'int'
								}
																																																																			,'cusBusiInvoke'
																																																																								,'chanTypeId'
																																																																								,'ownerId'
																																																																								,'busiTypeId'
																																																																								,'staTime'
																																																																								,'endTime'
																																																																								,'busiCode'
																																																																								,'busiResId'
																																																																								,'cusCardNo'
																																																																								,'remarks'
																																																],
					columns:[
								{
									header : 'busiHisId',
									dataIndex : 'busiHisId',
									hidden : true
								}
																																																								,{
																	header : '客户ID',
																isExp : false,
																
																    dataIndex : 'customerid',
								    renderer:function(val){
								    	return val.customeridName;
								    }
																}
																																																,{
																	header : '渠道类别&CUSQDLB',
																isExp : false,
																
																	dataIndex : 'chanTypeId',
									renderer : function(value) {
										return CUSQDLB.value;
									}
																}
																																																,{
																	header : '业务处理人（坐席）',
																isExp : false,
																
																	dataIndex : 'ownerId'
																}
																																																,{
																	header : '交易类型&CUSJYLX',
																isExp : false,
																
																	dataIndex : 'busiTypeId',
									renderer : function(value) {
										return CUSJYLX.value;
									}
																}
																																																,{
																	header : '开始时间',
																isExp : false,
																
																	dataIndex : 'staTime'
																}
																																																,{
																	header : '结束时间',
																isExp : false,
																
																	dataIndex : 'endTime'
																}
																																																,{
																	header : '交易码',
																isExp : false,
																
																	dataIndex : 'busiCode'
																}
																																																,{
																	header : '交易状态&CUSJYZT',
																isExp : false,
																
																	dataIndex : 'busiResId',
									renderer : function(value) {
										return CUSJYZT.value;
									}
																}
																																																,{
																	header : '客户卡号',
																isExp : false,
																
																	dataIndex : 'cusCardNo'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remarks'
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
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new CusBusiInvokeForm({busiHisId:rec.data.busiHisId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CusBusiInvokeForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusBusiInvokeForm');
				if (aForm != null) {
					tabs.remove('CusBusiInvokeForm');
				}
				aForm = new CusBusiInvokeForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/customer/multiDelCusBusiInvoke.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/customer/multiDelCusBusiInvoke.do',
					grid:this.gridPanel,
					idName:'busiHisId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CusBusiInvokeForm({
				//	busiHisId : record.data.busiHisId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusBusiInvokeForm');
				if (aForm != null) {
					tabs.remove('CusBusiInvokeForm');
				}
				aForm = new CusBusiInvokeForm({busiHisId : record.data.busiHisId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.busiHisId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
