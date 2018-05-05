/**
 * @author:cf0666@gmail.com
 * @class ScWarehouseView
 * @extends Ext.Panel
 * @description [ScWarehouse]管理
 * @company 优创融联科技
 * @createtime:
 */
ScWarehouseView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScWarehouseView.superclass.constructor.call(this, {
							id : 'ScWarehouseViewWin',
							title : '[ScWarehouse]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'warehouseName',
											'仓库名称',
																								new Ext.form.TextField({name : 'warehouseName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'warehousePinyin',
											'用于输入快速过虑',
																								new Ext.form.TextField({name : 'warehousePinyin',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'warehouseMgr',
											'仓库负责人',
																																																					new Ext.form.NumberField({name : 'warehouseMgr',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'whCellphone',
											'手机号码',
																								new Ext.form.TextField({name : 'whCellphone',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'whPhone',
											'固定电话',
																								new Ext.form.TextField({name : 'whPhone',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'whFax',
											'传真',
																								new Ext.form.TextField({name : 'whFax',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'whAddr',
											'仓库地址',
																								new Ext.form.TextField({name : 'whAddr',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'whPostcode',
											'邮政编码',
																								new Ext.form.TextField({name : 'whPostcode',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ownerDeptId',
											'所属部门标识',
																																																					new Ext.form.NumberField({name : 'ownerDeptId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'coverArea',
											'覆盖区域',
																								new Ext.form.TextField({name : 'coverArea',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'warehouseDesc',
											'描述',
																								new Ext.form.TextField({name : 'warehouseDesc',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'warehouseStatus',
											'仓库状态&CON_T_WH_STATUS',
																																																					new Ext.form.NumberField({name : 'warehouseStatus',allowBlank:true})
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
				var ScWarehouseAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScWarehouse]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScWarehouseSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_warehouseName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_warehousePinyin_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_warehouseMgr_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_whCellphone_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_whPhone_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_whFax_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_whAddr_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_whPostcode_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ownerDeptId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_coverArea_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_warehouseDesc_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_warehouseStatus_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_WH_STATUS'
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
										handler :function(){ new ScWarehouseAdvancedSearchWin().show();}
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
									//text : __create+'[ScWarehouse]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScWarehouse]',
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
					id:'ScWarehouseGrid',
					url : __ctxPath + "/stock/listScWarehouse.do",
					fields : [{
									name : 'warehouseId',
									type : 'int'
								}
																																																																			,'warehouseName'
																																																																								,'warehousePinyin'
																																																																								,'warehouseMgr'
																																																																								,'whCellphone'
																																																																								,'whPhone'
																																																																								,'whFax'
																																																																								,'whAddr'
																																																																								,'whPostcode'
																																																																								,'ownerDeptId'
																																																																								,'coverArea'
																																																																								,'warehouseDesc'
																																																																								,'warehouseStatus'
																																																																								,'createUserId'
																																																																								,'createTime'
																																																																								,'updateUserId'
																																																																								,'updateTime2'
																																																																								,'desc'
																																																],
					columns:[
								{
									header : 'warehouseId',
									dataIndex : 'warehouseId',
									hidden : true
								}
																																																								,{
																	header : '仓库名称',
																isExp : false,
																
																	dataIndex : 'warehouseName'
																}
																																																,{
																	header : '用于输入快速过虑',
																isExp : false,
																
																	dataIndex : 'warehousePinyin'
																}
																																																,{
																	header : '仓库负责人',
																isExp : false,
																
																	dataIndex : 'warehouseMgr'
																}
																																																,{
																	header : '手机号码',
																isExp : false,
																
																	dataIndex : 'whCellphone'
																}
																																																,{
																	header : '固定电话',
																isExp : false,
																
																	dataIndex : 'whPhone'
																}
																																																,{
																	header : '传真',
																isExp : false,
																
																	dataIndex : 'whFax'
																}
																																																,{
																	header : '仓库地址',
																isExp : false,
																
																	dataIndex : 'whAddr'
																}
																																																,{
																	header : '邮政编码',
																isExp : false,
																
																	dataIndex : 'whPostcode'
																}
																																																,{
																	header : '所属部门标识',
																isExp : false,
																
																	dataIndex : 'ownerDeptId'
																}
																																																,{
																	header : '覆盖区域',
																isExp : false,
																
																	dataIndex : 'coverArea'
																}
																																																,{
																	header : '描述',
																isExp : false,
																
																	dataIndex : 'warehouseDesc'
																}
																																																,{
																	header : '仓库状态&CON_T_WH_STATUS',
																isExp : false,
																
																	dataIndex : 'warehouseStatus',
									renderer : function(value) {
										return CON_T_WH_STATUS.get(value);
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
//				var searchPanel = Ext.getCmp('ScWarehouseSearchPanel');
//				var gridPanel = Ext.getCmp('ScWarehouseGrid');
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
					new ScWarehouseForm({warehouseId:rec.data.warehouseId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScWarehouseForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScWarehouseForm');
				if (aForm != null) {
					tabs.remove('ScWarehouseForm');
				}
				aForm = new ScWarehouseForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/stock/multiDelScWarehouse.do',
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
					url:__ctxPath + '/stock/multiDelScWarehouse.do',
					grid:this.gridPanel,
					idName:'warehouseId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScWarehouseForm({
				//	warehouseId : record.data.warehouseId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScWarehouseForm');
				if (aForm != null) {
					tabs.remove('ScWarehouseForm');
				}
				aForm = new ScWarehouseForm({warehouseId : record.data.warehouseId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.warehouseId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
