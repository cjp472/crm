/**
 * @author:cf0666@gmail.com
 * @class ShBugRepaireView
 * @extends Ext.Panel
 * @description [ShBugRepaire]管理
 * @company 优创融联科技
 * @createtime:
 */
ShBugRepaireView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ShBugRepaireView.superclass.constructor.call(this, {
							id : 'ShBugRepaireViewWin',
							title : '[ShBugRepaire]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'applyId',
											'申请内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/shhq/listapplyId.do',
															fields : [ 'applyId', 'applyIdName' ]
														}),
														displayField : 'applyIdName',
														valueField : 'applyId',
														id : 'applyId'
														})
																																			 ]
																				,
																			 								 																																		[
											'applyContent',
											'维修情况',
																								new Ext.form.TextField({name : 'applyContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'status',
											'状态',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'applyPersons',
											'维修参与人',
																								new Ext.form.TextField({name : 'applyPersons',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'staDat',
											'开始时间',
																								new Ext.form.DateField({hiddenName : 'staDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'finishDat',
											'完成时间',
																								new Ext.form.DateField({hiddenName : 'finishDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'applyResult',
											'维修结果',
																																																					new Ext.form.NumberField({name : 'applyResult',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'unApplyReason',
											'未维修原因',
																								new Ext.form.TextField({name : 'unApplyReason',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'creUserid',
											'创建人',
																																																					new Ext.form.NumberField({name : 'creUserid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'perIncharge',
											'负责人',
																																																					new Ext.form.NumberField({name : 'perIncharge',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'creDat',
											'创建时间',
																								new Ext.form.DateField({hiddenName : 'creDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'updDat',
											'修改时间',
																								new Ext.form.DateField({hiddenName : 'updDat',format : 'Y-m-d'})
																						 ]
																			 								 							 											]
				var ShBugRepaireAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ShBugRepaire]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ShBugRepaireSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_applyId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/shhq/listapplyId.do',
															fields : [ 'applyId', 'applyIdName' ]
														}),
														displayField : 'applyIdName',
														valueField : 'applyId',
														id : 'applyId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_status_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyPersons_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_staDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_finishDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyResult_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_unApplyReason_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creUserid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_perIncharge_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updDat_D_EQ',
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
										handler :function(){ new ShBugRepaireAdvancedSearchWin().show();}
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
									//text : __create+'[ShBugRepaire]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ShBugRepaire]',
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
					id:'ShBugRepaireGrid',
					url : __ctxPath + "/shhq/listShBugRepaire.do",
					fields : [{
									name : 'repId',
									type : 'int'
								}
																																																																			,'shBugRepaire'
																																																																								,'applyContent'
																																																																								,'status'
																																																																								,'applyPersons'
																																																																								,'staDat'
																																																																								,'finishDat'
																																																																								,'applyResult'
																																																																								,'unApplyReason'
																																																																								,'creUserid'
																																																																								,'perIncharge'
																																																																								,'creDat'
																																																																								,'updDat'
																																																],
					columns:[
								{
									header : 'repId',
									dataIndex : 'repId',
									hidden : true
								}
																																																								,{
																	header : '申请内码',
																isExp : false,
																
																    dataIndex : 'applyId',
								    renderer:function(val){
								    	return val.applyIdName;
								    }
																}
																																																,{
																	header : '维修情况',
																isExp : false,
																
																	dataIndex : 'applyContent'
																}
																																																,{
																	header : '状态',
																isExp : false,
																
																	dataIndex : 'status'
																}
																																																,{
																	header : '维修参与人',
																isExp : false,
																
																	dataIndex : 'applyPersons'
																}
																																																,{
																	header : '开始时间',
																isExp : false,
																
																	dataIndex : 'staDat'
																}
																																																,{
																	header : '完成时间',
																isExp : false,
																
																	dataIndex : 'finishDat'
																}
																																																,{
																	header : '维修结果',
																isExp : false,
																
																	dataIndex : 'applyResult'
																}
																																																,{
																	header : '未维修原因',
																isExp : false,
																
																	dataIndex : 'unApplyReason'
																}
																																																,{
																	header : '创建人',
																isExp : false,
																
																	dataIndex : 'creUserid'
																}
																																																,{
																	header : '负责人',
																isExp : false,
																
																	dataIndex : 'perIncharge'
																}
																																																,{
																	header : '创建时间',
																isExp : false,
																
																	dataIndex : 'creDat'
																}
																																																,{
																	header : '修改时间',
																isExp : false,
																
																	dataIndex : 'updDat'
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
//				var searchPanel = Ext.getCmp('ShBugRepaireSearchPanel');
//				var gridPanel = Ext.getCmp('ShBugRepaireGrid');
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
					new ShBugRepaireForm({repId:rec.data.repId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ShBugRepaireForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBugRepaireForm');
				if (aForm != null) {
					tabs.remove('ShBugRepaireForm');
				}
				aForm = new ShBugRepaireForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/shhq/multiDelShBugRepaire.do',
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
					url:__ctxPath + '/shhq/multiDelShBugRepaire.do',
					grid:this.gridPanel,
					idName:'repId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ShBugRepaireForm({
				//	repId : record.data.repId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBugRepaireForm');
				if (aForm != null) {
					tabs.remove('ShBugRepaireForm');
				}
				aForm = new ShBugRepaireForm({repId : record.data.repId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.repId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
