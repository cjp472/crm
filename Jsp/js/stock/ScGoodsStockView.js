/**
 * @author:cf0666@gmail.com
 * @class ScGoodsStockView
 * @extends Ext.Panel
 * @description [ScGoodsStock]管理
 * @company 优创融联科技
 * @createtime:
 */
ScGoodsStockView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScGoodsStockView.superclass.constructor.call(this, {
							id : 'ScGoodsStockViewWin',
							title : '[ScGoodsStock]管理',
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
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/stock/listgoodsId.do',
															fields : [ 'goodsId', 'goodsIdName' ]
														}),
														displayField : 'goodsIdName',
														valueField : 'goodsId',
														id : 'goodsId'
														})
																																			 ]
																				,
																			 								 																																		[
											'warehouseId',
											'仓库内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/stock/listwarehouseId.do',
															fields : [ 'warehouseId', 'warehouseIdName' ]
														}),
														displayField : 'warehouseIdName',
														valueField : 'warehouseId',
														id : 'warehouseId'
														})
																																			 ]
																				,
																			 								 																																		[
											'goodsCount',
											'商品库存数量',
																																																					new Ext.form.NumberField({name : 'goodsCount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'lockCount',
											'锁定数量',
																																																					new Ext.form.NumberField({name : 'lockCount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'averagePrice',
											'均价',
																																																					new Ext.form.NumberField({name : 'averagePrice',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'stockTotal',
											'库存合计',
																																																					new Ext.form.NumberField({name : 'stockTotal',allowBlank:true})
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
				var ScGoodsStockAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScGoodsStock]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScGoodsStockSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_goodsId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/stock/listgoodsId.do',
															fields : [ 'goodsId', 'goodsIdName' ]
														}),
														displayField : 'goodsIdName',
														valueField : 'goodsId',
														id : 'goodsId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_warehouseId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/stock/listwarehouseId.do',
															fields : [ 'warehouseId', 'warehouseIdName' ]
														}),
														displayField : 'warehouseIdName',
														valueField : 'warehouseId',
														id : 'warehouseId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_goodsCount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_lockCount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_averagePrice_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_stockTotal_S_EQ',
																																																																													xtype:'numberfield'
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
										handler :function(){ new ScGoodsStockAdvancedSearchWin().show();}
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
									//text : __create+'[ScGoodsStock]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScGoodsStock]',
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
					id:'ScGoodsStockGrid',
					url : __ctxPath + "/stock/listScGoodsStock.do",
					fields : [{
									name : 'goodsStockId',
									type : 'int'
								}
																																																																			,'scGoodsStock'
																																																																								,'scGoodsStock'
																																																																								,'goodsCount'
																																																																								,'lockCount'
																																																																								,'averagePrice'
																																																																								,'stockTotal'
																																																																								,'createUserId'
																																																																								,'createTime'
																																																																								,'updateUserId'
																																																																								,'updateTime2'
																																																																								,'desc'
																																																],
					columns:[
								{
									header : 'goodsStockId',
									dataIndex : 'goodsStockId',
									hidden : true
								}
																																																								,{
																	header : '商品内码',
																isExp : false,
																
																    dataIndex : 'goodsId',
								    renderer:function(val){
								    	return val.goodsIdName;
								    }
																}
																																																,{
																	header : '仓库内码',
																isExp : false,
																
																    dataIndex : 'warehouseId',
								    renderer:function(val){
								    	return val.warehouseIdName;
								    }
																}
																																																,{
																	header : '商品库存数量',
																isExp : false,
																
																	dataIndex : 'goodsCount'
																}
																																																,{
																	header : '锁定数量',
																isExp : false,
																
																	dataIndex : 'lockCount'
																}
																																																,{
																	header : '均价',
																isExp : false,
																
																	dataIndex : 'averagePrice'
																}
																																																,{
																	header : '库存合计',
																isExp : false,
																
																	dataIndex : 'stockTotal'
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
//				var searchPanel = Ext.getCmp('ScGoodsStockSearchPanel');
//				var gridPanel = Ext.getCmp('ScGoodsStockGrid');
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
					new ScGoodsStockForm({goodsStockId:rec.data.goodsStockId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScGoodsStockForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScGoodsStockForm');
				if (aForm != null) {
					tabs.remove('ScGoodsStockForm');
				}
				aForm = new ScGoodsStockForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/stock/multiDelScGoodsStock.do',
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
					url:__ctxPath + '/stock/multiDelScGoodsStock.do',
					grid:this.gridPanel,
					idName:'goodsStockId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScGoodsStockForm({
				//	goodsStockId : record.data.goodsStockId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScGoodsStockForm');
				if (aForm != null) {
					tabs.remove('ScGoodsStockForm');
				}
				aForm = new ScGoodsStockForm({goodsStockId : record.data.goodsStockId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.goodsStockId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
