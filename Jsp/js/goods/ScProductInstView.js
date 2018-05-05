/**
 * @author:cf0666@gmail.com
 * @class ScProductInstView
 * @extends Ext.Panel
 * @description [ScProductInst]管理
 * @company 优创融联科技
 * @createtime:
 */
ScProductInstView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScProductInstView.superclass.constructor.call(this, {
							id : 'ScProductInstViewWin',
							title : '[ScProductInst]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'productEsnId',
											'条码',
																								new Ext.form.TextField({name : 'productEsnId',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'productName',
											'产品名称',
																								new Ext.form.TextField({name : 'productName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'isLocked',
											'是否锁定&CON_T_IS_LOCK',
																																																					new Ext.form.NumberField({name : 'isLocked',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'productModelFlag',
											'产品型号标志',
																																																					new Ext.form.NumberField({name : 'productModelFlag',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'supplierId',
											'供货商内码',
																																																					new Ext.form.NumberField({name : 'supplierId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'productStatus',
											'商品资源状态&CON_T_PRO_STATUS',
																																																					new Ext.form.NumberField({name : 'productStatus',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'warehouseId',
											'当前仓库内码',
																																																					new Ext.form.NumberField({name : 'warehouseId',allowBlank:true})
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
																				,
																			 								 																																		[
											'ext1',
											'扩展1',
																								new Ext.form.TextField({name : 'ext1',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext2',
											'扩展2',
																								new Ext.form.TextField({name : 'ext2',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext3',
											'扩展3',
																								new Ext.form.TextField({name : 'ext3',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext4',
											'扩展4',
																								new Ext.form.TextField({name : 'ext4',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext5',
											'扩展5',
																								new Ext.form.TextField({name : 'ext5',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext6',
											'扩展6',
																								new Ext.form.TextField({name : 'ext6',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext7',
											'扩展7',
																								new Ext.form.TextField({name : 'ext7',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext8',
											'扩展8',
																								new Ext.form.TextField({name : 'ext8',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext9',
											'扩展9',
																								new Ext.form.TextField({name : 'ext9',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext10',
											'扩展10',
																								new Ext.form.TextField({name : 'ext10',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext11',
											'扩展11',
																																																					new Ext.form.NumberField({name : 'ext11',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext12',
											'扩展12',
																																																					new Ext.form.NumberField({name : 'ext12',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext13',
											'扩展13',
																																																					new Ext.form.NumberField({name : 'ext13',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext14',
											'扩展14',
																																																					new Ext.form.NumberField({name : 'ext14',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext15',
											'扩展15',
																																																					new Ext.form.NumberField({name : 'ext15',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext16',
											'扩展16',
																								new Ext.form.DateField({hiddenName : 'ext16',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ext17',
											'扩展17',
																								new Ext.form.DateField({hiddenName : 'ext17',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ext18',
											'扩展18',
																								new Ext.form.DateField({hiddenName : 'ext18',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ext19',
											'扩展19',
																								new Ext.form.DateField({hiddenName : 'ext19',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ext20',
											'扩展20',
																								new Ext.form.DateField({hiddenName : 'ext20',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'goodsId',
											'商品内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/goods/listgoodsId.do',
															fields : [ 'goodsId', 'goodsIdName' ]
														}),
														displayField : 'goodsIdName',
														valueField : 'goodsId',
														id : 'goodsId'
														})
																																			 ]
																			 								 							 											]
				var ScProductInstAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScProductInst]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScProductInstSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_productEsnId_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_productName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																							hiddenName : 'Q_isLocked_SN_EQ'
																																			,allowBlank:true
												 												,xtype:'combo'
												,editable : false
												,mode : 'local'
												,triggerAction : 'all'
												,store : [['1',__yes],['0',__no]]
																					}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_productModelFlag_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_supplierId_L_EQ',
																																																																													xtype:'numberfield'
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
																																																													
																						
																																				name : 'Q_warehouseId_L_EQ',
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
																																																													
																						
																																				name : 'Q_updateTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_desc_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext1_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext2_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext3_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext4_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext5_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext6_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext7_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext8_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext9_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext10_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext11_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext12_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext13_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext14_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext15_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext16_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext17_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext18_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext19_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext20_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_goodsId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/goods/listgoodsId.do',
															fields : [ 'goodsId', 'goodsIdName' ]
														}),
														displayField : 'goodsIdName',
														valueField : 'goodsId',
														id : 'goodsId'
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
										handler :function(){ new ScProductInstAdvancedSearchWin().show();}
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
									//text : __create+'[ScProductInst]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScProductInst]',
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
					id:'ScProductInstGrid',
					url : __ctxPath + "/goods/listScProductInst.do",
					fields : [{
									name : 'productInstId',
									type : 'int'
								}
																																																																			,'productEsnId'
																																																																								,'productName'
																																																																								,'isLocked'
																																																																								,'productModelFlag'
																																																																								,'supplierId'
																																																																								,'productStatus'
																																																																								,'warehouseId'
																																																																								,'createUserId'
																																																																								,'createTime'
																																																																								,'updateUserId'
																																																																								,'updateTime'
																																																																								,'desc'
																																																																								,'ext1'
																																																																								,'ext2'
																																																																								,'ext3'
																																																																								,'ext4'
																																																																								,'ext5'
																																																																								,'ext6'
																																																																								,'ext7'
																																																																								,'ext8'
																																																																								,'ext9'
																																																																								,'ext10'
																																																																								,'ext11'
																																																																								,'ext12'
																																																																								,'ext13'
																																																																								,'ext14'
																																																																								,'ext15'
																																																																								,'ext16'
																																																																								,'ext17'
																																																																								,'ext18'
																																																																								,'ext19'
																																																																								,'ext20'
																																																																								,'scProductInst'
																																																],
					columns:[
								{
									header : 'productInstId',
									dataIndex : 'productInstId',
									hidden : true
								}
																																																								,{
																	header : '条码',
																isExp : false,
																
																	dataIndex : 'productEsnId'
																}
																																																,{
																	header : '产品名称',
																isExp : false,
																
																	dataIndex : 'productName'
																}
																																																,{
																	header : '是否锁定&CON_T_IS_LOCK',
																isExp : false,
																
																	dataIndex : 'isLocked',
									renderer : function(value) {
										return value == '0'?__no:__yes;
									}
																}
																																																,{
																	header : '产品型号标志',
																isExp : false,
																
																	dataIndex : 'productModelFlag'
																}
																																																,{
																	header : '供货商内码',
																isExp : false,
																
																	dataIndex : 'supplierId'
																}
																																																,{
																	header : '商品资源状态&CON_T_PRO_STATUS',
																isExp : false,
																
																	dataIndex : 'productStatus',
									renderer : function(value) {
										return CON_T_PRO_STATUS.get(value);
									}
																}
																																																,{
																	header : '当前仓库内码',
																isExp : false,
																
																	dataIndex : 'warehouseId'
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
																																																,{
																	header : '扩展1',
																isExp : false,
																
																	dataIndex : 'ext1'
																}
																																																,{
																	header : '扩展2',
																isExp : false,
																
																	dataIndex : 'ext2'
																}
																																																,{
																	header : '扩展3',
																isExp : false,
																
																	dataIndex : 'ext3'
																}
																																																,{
																	header : '扩展4',
																isExp : false,
																
																	dataIndex : 'ext4'
																}
																																																,{
																	header : '扩展5',
																isExp : false,
																
																	dataIndex : 'ext5'
																}
																																																,{
																	header : '扩展6',
																isExp : false,
																
																	dataIndex : 'ext6'
																}
																																																,{
																	header : '扩展7',
																isExp : false,
																
																	dataIndex : 'ext7'
																}
																																																,{
																	header : '扩展8',
																isExp : false,
																
																	dataIndex : 'ext8'
																}
																																																,{
																	header : '扩展9',
																isExp : false,
																
																	dataIndex : 'ext9'
																}
																																																,{
																	header : '扩展10',
																isExp : false,
																
																	dataIndex : 'ext10'
																}
																																																,{
																	header : '扩展11',
																isExp : false,
																
																	dataIndex : 'ext11'
																}
																																																,{
																	header : '扩展12',
																isExp : false,
																
																	dataIndex : 'ext12'
																}
																																																,{
																	header : '扩展13',
																isExp : false,
																
																	dataIndex : 'ext13'
																}
																																																,{
																	header : '扩展14',
																isExp : false,
																
																	dataIndex : 'ext14'
																}
																																																,{
																	header : '扩展15',
																isExp : false,
																
																	dataIndex : 'ext15'
																}
																																																,{
																	header : '扩展16',
																isExp : false,
																
																	dataIndex : 'ext16'
																}
																																																,{
																	header : '扩展17',
																isExp : false,
																
																	dataIndex : 'ext17'
																}
																																																,{
																	header : '扩展18',
																isExp : false,
																
																	dataIndex : 'ext18'
																}
																																																,{
																	header : '扩展19',
																isExp : false,
																
																	dataIndex : 'ext19'
																}
																																																,{
																	header : '扩展20',
																isExp : false,
																
																	dataIndex : 'ext20'
																}
																																																,{
																	header : '商品内码',
																isExp : false,
																
																    dataIndex : 'goodsId',
								    renderer:function(val){
								    	return val.goodsIdName;
								    }
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
//				var searchPanel = Ext.getCmp('ScProductInstSearchPanel');
//				var gridPanel = Ext.getCmp('ScProductInstGrid');
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
					new ScProductInstForm({productInstId:rec.data.productInstId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScProductInstForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScProductInstForm');
				if (aForm != null) {
					tabs.remove('ScProductInstForm');
				}
				aForm = new ScProductInstForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/goods/multiDelScProductInst.do',
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
					url:__ctxPath + '/goods/multiDelScProductInst.do',
					grid:this.gridPanel,
					idName:'productInstId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScProductInstForm({
				//	productInstId : record.data.productInstId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScProductInstForm');
				if (aForm != null) {
					tabs.remove('ScProductInstForm');
				}
				aForm = new ScProductInstForm({productInstId : record.data.productInstId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.productInstId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});