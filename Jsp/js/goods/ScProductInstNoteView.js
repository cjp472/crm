/**
 * @author:cf0666@gmail.com
 * @class ScProductInstNoteView
 * @extends Ext.Panel
 * @description [ScProductInstNote]管理
 * @company 优创融联科技
 * @createtime:
 */
ScProductInstNoteView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScProductInstNoteView.superclass.constructor.call(this, {
							id : 'ScProductInstNoteViewWin',
							title : '[ScProductInstNote]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'productInstId',
											'产品实例内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/goods/listproductInstId.do',
															fields : [ 'productInstId', 'productInstIdName' ]
														}),
														displayField : 'productInstIdName',
														valueField : 'productInstId',
														id : 'productInstId'
														})
																																			 ]
																				,
																			 								 																																		[
											'instStockType',
											'出入库类型：&CON_T_STOCK_TYPE',
																																																					new Ext.form.NumberField({name : 'instStockType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bizOrderId',
											'业务单内码',
																																																					new Ext.form.NumberField({name : 'bizOrderId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'entryTime',
											'发生时间',
																								new Ext.form.DateField({hiddenName : 'entryTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'productStatus',
											'商品资源状态0-临时状态、1-正式未销售、2-零售销售、3-批发销售&CON_T_PRO_STATUS',
																																																					new Ext.form.NumberField({name : 'productStatus',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'sellArea',
											'销售地区',
																								new Ext.form.TextField({name : 'sellArea',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'warehouseId',
											'当前仓库内码',
																																																					new Ext.form.NumberField({name : 'warehouseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'count',
											'数量',
																																																					new Ext.form.NumberField({name : 'count',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'price',
											'单价',
																																																					new Ext.form.NumberField({name : 'price',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updateTime',
											'状态变更时间',
																								new Ext.form.DateField({hiddenName : 'updateTime',format : 'Y-m-d'})
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
											'updateTime2',
											'修改时间',
																								new Ext.form.DateField({hiddenName : 'updateTime2',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'desc',
											'备注',
																								new Ext.form.TextField({name : 'desc',allowBlank:true})
																						 ]
																			 								 							 											]
				var ScProductInstNoteAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScProductInstNote]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScProductInstNoteSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_productInstId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/goods/listproductInstId.do',
															fields : [ 'productInstId', 'productInstIdName' ]
														}),
														displayField : 'productInstIdName',
														valueField : 'productInstId',
														id : 'productInstId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_instStockType_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_STOCK_TYPE'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bizOrderId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_entryTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_productStatus_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_PRO_STATUS'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_sellArea_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_warehouseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_count_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_price_S_EQ',
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
																																																													
																						
																																				name : 'Q_updateTime2_D_EQ',
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
										handler :function(){ new ScProductInstNoteAdvancedSearchWin().show();}
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
									//text : __create+'[ScProductInstNote]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScProductInstNote]',
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
					id:'ScProductInstNoteGrid',
					url : __ctxPath + "/goods/listScProductInstNote.do",
					fields : [{
									name : 'instStockId',
									type : 'int'
								}
																																																																			,'scProductInstNote'
																																																																								,'instStockType'
																																																																								,'bizOrderId'
																																																																								,'entryTime'
																																																																								,'productStatus'
																																																																								,'sellArea'
																																																																								,'warehouseId'
																																																																								,'count'
																																																																								,'price'
																																																																								,'updateTime'
																																																																								,'createUserId'
																																																																								,'createTime'
																																																																								,'updateUserId'
																																																																								,'updateTime2'
																																																																								,'desc'
																																																],
					columns:[
								{
									header : 'instStockId',
									dataIndex : 'instStockId',
									hidden : true
								}
																																																								,{
																	header : '产品实例内码',
																isExp : false,
																
																    dataIndex : 'productInstId',
								    renderer:function(val){
								    	return val.productInstIdName;
								    }
																}
																																																,{
																	header : '出入库类型：&CON_T_STOCK_TYPE',
																isExp : false,
																
																	dataIndex : 'instStockType',
									renderer : function(value) {
										return CON_T_STOCK_TYPE.get(value);
									}
																}
																																																,{
																	header : '业务单内码',
																isExp : false,
																
																	dataIndex : 'bizOrderId'
																}
																																																,{
																	header : '发生时间',
																isExp : false,
																
																	dataIndex : 'entryTime'
																}
																																																,{
																	header : '商品资源状态0-临时状态、1-正式未销售、2-零售销售、3-批发销售&CON_T_PRO_STATUS',
																isExp : false,
																
																	dataIndex : 'productStatus',
									renderer : function(value) {
										return CON_T_PRO_STATUS.get(value);
									}
																}
																																																,{
																	header : '销售地区',
																isExp : false,
																
																	dataIndex : 'sellArea'
																}
																																																,{
																	header : '当前仓库内码',
																isExp : false,
																
																	dataIndex : 'warehouseId'
																}
																																																,{
																	header : '数量',
																isExp : false,
																
																	dataIndex : 'count'
																}
																																																,{
																	header : '单价',
																isExp : false,
																
																	dataIndex : 'price'
																}
																																																,{
																	header : '状态变更时间',
																isExp : false,
																
																	dataIndex : 'updateTime'
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
																
																	dataIndex : 'updateTime2'
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
//				var searchPanel = Ext.getCmp('ScProductInstNoteSearchPanel');
//				var gridPanel = Ext.getCmp('ScProductInstNoteGrid');
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
					new ScProductInstNoteForm({instStockId:rec.data.instStockId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScProductInstNoteForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScProductInstNoteForm');
				if (aForm != null) {
					tabs.remove('ScProductInstNoteForm');
				}
				aForm = new ScProductInstNoteForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/goods/multiDelScProductInstNote.do',
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
					url:__ctxPath + '/goods/multiDelScProductInstNote.do',
					grid:this.gridPanel,
					idName:'instStockId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScProductInstNoteForm({
				//	instStockId : record.data.instStockId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScProductInstNoteForm');
				if (aForm != null) {
					tabs.remove('ScProductInstNoteForm');
				}
				aForm = new ScProductInstNoteForm({instStockId : record.data.instStockId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.instStockId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
