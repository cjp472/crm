/**
 * @author:cf0666@gmail.com
 * @class ObFeeIndexView
 * @extends Ext.Panel
 * @description [ObFeeIndex]管理
 * @company 优创融联科技
 * @createtime:
 */
ObFeeIndexView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObFeeIndexView.superclass.constructor.call(this, {
							id : 'ObFeeIndexViewWin',
							title : '[ObFeeIndex]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'feeIndexName',
											'名称',
																								new Ext.form.TextField({name : 'feeIndexName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'annual',
											'年度',
																								new Ext.form.TextField({name : 'annual',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'cycle',
											'周期',
																																																					new Ext.form.NumberField({name : 'cycle',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'comments',
											'备注',
																								new Ext.form.TextField({name : 'comments',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'createBy',
											'创建人',
																																																					new Ext.form.NumberField({name : 'createBy',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updateBy',
											'修改人',
																																																					new Ext.form.NumberField({name : 'updateBy',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'createDate',
											'创建时间',
																								new Ext.form.DateField({hiddenName : 'createDate',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'updateDate',
											'修改时间',
																								new Ext.form.DateField({hiddenName : 'updateDate',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'staId',
											'状态',
																																																					new Ext.form.NumberField({name : 'staId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var ObFeeIndexAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObFeeIndex]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObFeeIndexSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_feeIndexName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_annual_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_cycle_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_comments_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createBy_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updateBy_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createDate_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updateDate_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_staId_SN_EQ',
																																																																													xtype:'numberfield'
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
										handler :function(){ new ObFeeIndexAdvancedSearchWin().show();}
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
									//text : __create+'[ObFeeIndex]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObFeeIndex]',
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
					id:'ObFeeIndexGrid',
					url : __ctxPath + "/fee/listObFeeIndex.do",
					fields : [{
									name : 'feeIndexId',
									type : 'int'
								}
																																																																			,'feeIndexName'
																																																																								,'annual'
																																																																								,'cycle'
																																																																								,'comments'
																																																																								,'createBy'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'feeIndexId',
									dataIndex : 'feeIndexId',
									hidden : true
								}
																																																								,{
																	header : '名称',
																isExp : false,
																
																	dataIndex : 'feeIndexName'
																}
																																																,{
																	header : '年度',
																isExp : false,
																
																	dataIndex : 'annual'
																}
																																																,{
																	header : '周期',
																isExp : false,
																
																	dataIndex : 'cycle'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'comments'
																}
																																																,{
																	header : '创建人',
																isExp : false,
																
																	dataIndex : 'createBy'
																}
																																																,{
																	header : '修改人',
																isExp : false,
																
																	dataIndex : 'updateBy'
																}
																																																,{
																	header : '创建时间',
																isExp : false,
																
																	dataIndex : 'createDate'
																}
																																																,{
																	header : '修改时间',
																isExp : false,
																
																	dataIndex : 'updateDate'
																}
																																																,{
																	header : '状态',
																isExp : false,
																
																	dataIndex : 'staId'
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
//				var searchPanel = Ext.getCmp('ObFeeIndexSearchPanel');
//				var gridPanel = Ext.getCmp('ObFeeIndexGrid');
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
					new ObFeeIndexForm({feeIndexId:rec.data.feeIndexId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObFeeIndexForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObFeeIndexForm');
				if (aForm != null) {
					tabs.remove('ObFeeIndexForm');
				}
				aForm = new ObFeeIndexForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/fee/multiDelObFeeIndex.do',
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
					url:__ctxPath + '/fee/multiDelObFeeIndex.do',
					grid:this.gridPanel,
					idName:'feeIndexId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObFeeIndexForm({
				//	feeIndexId : record.data.feeIndexId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObFeeIndexForm');
				if (aForm != null) {
					tabs.remove('ObFeeIndexForm');
				}
				aForm = new ObFeeIndexForm({feeIndexId : record.data.feeIndexId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.feeIndexId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
