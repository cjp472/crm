/**
 * @author:cf0666@gmail.com
 * @class ShBuilderControlView
 * @extends Ext.Panel
 * @description [ShBuilderControl]管理
 * @company 优创融联科技
 * @createtime:
 */
ShBuilderControlView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ShBuilderControlView.superclass.constructor.call(this, {
							id : 'ShBuilderControlViewWin',
							title : '[ShBuilderControl]管理',
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
											'title',
											'标题',
																								new Ext.form.TextField({name : 'title',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'code',
											'编号',
																								new Ext.form.TextField({name : 'code',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'contlContent',
											'监管内容',
																								new Ext.form.TextField({name : 'contlContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'applyAddress',
											'施工地点',
																								new Ext.form.TextField({name : 'applyAddress',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'hourseName',
											'机房名称',
																								new Ext.form.TextField({name : 'hourseName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'resource',
											'动用资源',
																								new Ext.form.TextField({name : 'resource',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'applyUserid',
											'施工方',
																																																					new Ext.form.NumberField({name : 'applyUserid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'applyDepid',
											'施工单位',
																																																					new Ext.form.NumberField({name : 'applyDepid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'perIncharge',
											'负责人',
																																																					new Ext.form.NumberField({name : 'perIncharge',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'applyDat',
											'施工时间',
																								new Ext.form.DateField({hiddenName : 'applyDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'status',
											'状态',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'signPerson',
											'签字人',
																																																					new Ext.form.NumberField({name : 'signPerson',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'creUserid',
											'创建人',
																																																					new Ext.form.NumberField({name : 'creUserid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'creDat',
											'创建时间',
																								new Ext.form.DateField({hiddenName : 'creDat',format : 'Y-m-d'})
																						 ]
																			 								 							 											]
				var ShBuilderControlAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ShBuilderControl]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ShBuilderControlSearchPanel',
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
																																																													
																						
																																				name : 'Q_title_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_code_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_contlContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyAddress_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_hourseName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_resource_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyUserid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyDepid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_perIncharge_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_status_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_signPerson_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creUserid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creDat_D_EQ',
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
										handler :function(){ new ShBuilderControlAdvancedSearchWin().show();}
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
									//text : __create+'[ShBuilderControl]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ShBuilderControl]',
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
					id:'ShBuilderControlGrid',
					url : __ctxPath + "/shhq/listShBuilderControl.do",
					fields : [{
									name : 'contlId',
									type : 'int'
								}
																																																																			,'shBuilderControl'
																																																																								,'title'
																																																																								,'code'
																																																																								,'contlContent'
																																																																								,'applyAddress'
																																																																								,'hourseName'
																																																																								,'resource'
																																																																								,'applyUserid'
																																																																								,'applyDepid'
																																																																								,'perIncharge'
																																																																								,'applyDat'
																																																																								,'status'
																																																																								,'signPerson'
																																																																								,'creUserid'
																																																																								,'creDat'
																																																],
					columns:[
								{
									header : 'contlId',
									dataIndex : 'contlId',
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
																	header : '标题',
																isExp : false,
																
																	dataIndex : 'title'
																}
																																																,{
																	header : '编号',
																isExp : false,
																
																	dataIndex : 'code'
																}
																																																,{
																	header : '监管内容',
																isExp : false,
																
																	dataIndex : 'contlContent'
																}
																																																,{
																	header : '施工地点',
																isExp : false,
																
																	dataIndex : 'applyAddress'
																}
																																																,{
																	header : '机房名称',
																isExp : false,
																
																	dataIndex : 'hourseName'
																}
																																																,{
																	header : '动用资源',
																isExp : false,
																
																	dataIndex : 'resource'
																}
																																																,{
																	header : '施工方',
																isExp : false,
																
																	dataIndex : 'applyUserid'
																}
																																																,{
																	header : '施工单位',
																isExp : false,
																
																	dataIndex : 'applyDepid'
																}
																																																,{
																	header : '负责人',
																isExp : false,
																
																	dataIndex : 'perIncharge'
																}
																																																,{
																	header : '施工时间',
																isExp : false,
																
																	dataIndex : 'applyDat'
																}
																																																,{
																	header : '状态',
																isExp : false,
																
																	dataIndex : 'status'
																}
																																																,{
																	header : '签字人',
																isExp : false,
																
																	dataIndex : 'signPerson'
																}
																																																,{
																	header : '创建人',
																isExp : false,
																
																	dataIndex : 'creUserid'
																}
																																																,{
																	header : '创建时间',
																isExp : false,
																
																	dataIndex : 'creDat'
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
//				var searchPanel = Ext.getCmp('ShBuilderControlSearchPanel');
//				var gridPanel = Ext.getCmp('ShBuilderControlGrid');
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
					new ShBuilderControlForm({contlId:rec.data.contlId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ShBuilderControlForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderControlForm');
				if (aForm != null) {
					tabs.remove('ShBuilderControlForm');
				}
				aForm = new ShBuilderControlForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/shhq/multiDelShBuilderControl.do',
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
					url:__ctxPath + '/shhq/multiDelShBuilderControl.do',
					grid:this.gridPanel,
					idName:'contlId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ShBuilderControlForm({
				//	contlId : record.data.contlId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderControlForm');
				if (aForm != null) {
					tabs.remove('ShBuilderControlForm');
				}
				aForm = new ShBuilderControlForm({contlId : record.data.contlId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.contlId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
