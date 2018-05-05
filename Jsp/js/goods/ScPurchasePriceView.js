/**
 * @author:cf0666@gmail.com
 * @class ScPurchasePriceView
 * @extends Ext.Panel
 * @description [ScPurchasePrice]管理
 * @company 优创融联科技
 * @createtime:
 */
ScPurchasePriceView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScPurchasePriceView.superclass.constructor.call(this, {
							id : 'ScPurchasePriceViewWin',
							title : '[ScPurchasePrice]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'purGuidPrice',
											'采购指导价',
																																																					new Ext.form.NumberField({name : 'purGuidPrice',allowBlank:true})
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
											'status',
											'状态：0--未审批、1--已启用、2--已关闭&CON_T_PRICE_ZT',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'desc',
											'备注',
																								new Ext.form.TextField({name : 'desc',allowBlank:true})
																						 ]
																			 								 							 											]
				var ScPurchasePriceAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScPurchasePrice]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScPurchasePriceSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_purGuidPrice_S_EQ',
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
																																																													
																						
																																				hiddenName : 'Q_status_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_PRICE_ZT'
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
										handler :function(){ new ScPurchasePriceAdvancedSearchWin().show();}
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
									//text : __create+'[ScPurchasePrice]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScPurchasePrice]',
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
					id:'ScPurchasePriceGrid',
					url : __ctxPath + "/goods/listScPurchasePrice.do",
					fields : [{
									name : 'purPriceId',
									type : 'int'
								}
																																																																			,'purGuidPrice'
																																																																								,'createUserId'
																																																																								,'createTime'
																																																																								,'updateUserId'
																																																																								,'updateTime'
																																																																								,'status'
																																																																								,'desc'
																																																],
					columns:[
								{
									header : 'purPriceId',
									dataIndex : 'purPriceId',
									hidden : true
								}
																																																								,{
																	header : '采购指导价',
																isExp : false,
																
																	dataIndex : 'purGuidPrice'
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
																	header : '状态：0--未审批、1--已启用、2--已关闭&CON_T_PRICE_ZT',
																isExp : false,
																
																	dataIndex : 'status',
									renderer : function(value) {
										return CON_T_PRICE_ZT.get(value);
									}
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
//				var searchPanel = Ext.getCmp('ScPurchasePriceSearchPanel');
//				var gridPanel = Ext.getCmp('ScPurchasePriceGrid');
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
					new ScPurchasePriceForm({purPriceId:rec.data.purPriceId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScPurchasePriceForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScPurchasePriceForm');
				if (aForm != null) {
					tabs.remove('ScPurchasePriceForm');
				}
				aForm = new ScPurchasePriceForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/goods/multiDelScPurchasePrice.do',
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
					url:__ctxPath + '/goods/multiDelScPurchasePrice.do',
					grid:this.gridPanel,
					idName:'purPriceId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScPurchasePriceForm({
				//	purPriceId : record.data.purPriceId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScPurchasePriceForm');
				if (aForm != null) {
					tabs.remove('ScPurchasePriceForm');
				}
				aForm = new ScPurchasePriceForm({purPriceId : record.data.purPriceId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.purPriceId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
