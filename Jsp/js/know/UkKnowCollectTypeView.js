/**
 * @author:cf0666@gmail.com
 * @class UkKnowCollectTypeView
 * @extends Ext.Panel
 * @description [UkKnowCollectType]管理
 * @company 优创融联科技
 * @createtime:
 */
UkKnowCollectTypeView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UkKnowCollectTypeView.superclass.constructor.call(this, {
							id : 'UkKnowCollectTypeViewWin',
							title : '[UkKnowCollectType]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'userid',
											'用户内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/know/listuserid.do',
															fields : [ 'userid', 'useridName' ]
														}),
														displayField : 'useridName',
														valueField : 'userid',
														id : 'userid'
														})
																																			 ]
																				,
																			 								 																																		[
											'knowTmpId',
											'知识模板编号',
																																																					new Ext.form.NumberField({name : 'knowTmpId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'name',
											'名称',
																								new Ext.form.TextField({name : 'name',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'comMent',
											'备注',
																								new Ext.form.TextField({name : 'comMent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'parentId',
											'父知识对象',
																																																					new Ext.form.NumberField({name : 'parentId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updateTime',
											'更新时间',
																								new Ext.form.DateField({hiddenName : 'updateTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'knowTypeStatus',
											'状态',
																																																					new Ext.form.NumberField({name : 'knowTypeStatus',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'knowSort',
											'顺序',
																																																					new Ext.form.NumberField({name : 'knowSort',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'createBy',
											'创建人姓名',
																								new Ext.form.TextField({name : 'createBy',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'updateBy',
											'修改人',
																								new Ext.form.TextField({name : 'updateBy',allowBlank:true})
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
											'path',
											'路径',
																								new Ext.form.TextField({name : 'path',allowBlank:true})
																						 ]
																			 								 							 											]
				var UkKnowCollectTypeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UkKnowCollectType]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UkKnowCollectTypeSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_userid_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/know/listuserid.do',
															fields : [ 'userid', 'useridName' ]
														}),
														displayField : 'useridName',
														valueField : 'userid',
														id : 'userid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_knowTmpId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_name_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_comMent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_parentId_L_EQ',
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
																																																													
																						
																																				name : 'Q_knowTypeStatus_N_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																		 										 										{
																																																													
																						
																																				name : 'Q_knowSort_N_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createBy_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updateBy_S_EQ',
																																																xtype : 'textfield'
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
																																																													
																						
																																				name : 'Q_path_S_EQ',
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
										handler :function(){ new UkKnowCollectTypeAdvancedSearchWin().show();}
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
									//text : __create+'[UkKnowCollectType]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[UkKnowCollectType]',
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
					id:'UkKnowCollectTypeGrid',
					url : __ctxPath + "/know/listUkKnowCollectType.do",
					fields : [{
									name : 'knowCollectTypeId',
									type : 'int'
								}
																																																																			,'ukKnowCollectType'
																																																																								,'knowTmpId'
																																																																								,'name'
																																																																								,'comMent'
																																																																								,'parentId'
																																																																								,'updateTime'
																																																																								,'knowTypeStatus'
																																																																								,'knowSort'
																																																																								,'createBy'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																																								,'path'
																																																],
					columns:[
								{
									header : 'knowCollectTypeId',
									dataIndex : 'knowCollectTypeId',
									hidden : true
								}
																																																								,{
																	header : '用户内码',
																isExp : false,
																
																    dataIndex : 'userid',
								    renderer:function(val){
								    	return val.useridName;
								    }
																}
																																																,{
																	header : '知识模板编号',
																isExp : false,
																
																	dataIndex : 'knowTmpId'
																}
																																																,{
																	header : '名称',
																isExp : false,
																
																	dataIndex : 'name'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'comMent'
																}
																																																,{
																	header : '父知识对象',
																isExp : false,
																
																	dataIndex : 'parentId'
																}
																																																,{
																	header : '更新时间',
																isExp : false,
																
																	dataIndex : 'updateTime'
																}
																																																,{
																	header : '状态',
																isExp : false,
																
																	dataIndex : 'knowTypeStatus'
																}
																																																,{
																	header : '顺序',
																isExp : false,
																
																	dataIndex : 'knowSort'
																}
																																																,{
																	header : '创建人姓名',
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
																	header : '路径',
																isExp : false,
																
																	dataIndex : 'path'
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
//				var searchPanel = Ext.getCmp('UkKnowCollectTypeSearchPanel');
//				var gridPanel = Ext.getCmp('UkKnowCollectTypeGrid');
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
					new UkKnowCollectTypeForm({knowCollectTypeId:rec.data.knowCollectTypeId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UkKnowCollectTypeForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkKnowCollectTypeForm');
				if (aForm != null) {
					tabs.remove('UkKnowCollectTypeForm');
				}
				aForm = new UkKnowCollectTypeForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/know/multiDelUkKnowCollectType.do',
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
					url:__ctxPath + '/know/multiDelUkKnowCollectType.do',
					grid:this.gridPanel,
					idName:'knowCollectTypeId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new UkKnowCollectTypeForm({
				//	knowCollectTypeId : record.data.knowCollectTypeId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkKnowCollectTypeForm');
				if (aForm != null) {
					tabs.remove('UkKnowCollectTypeForm');
				}
				aForm = new UkKnowCollectTypeForm({knowCollectTypeId : record.data.knowCollectTypeId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.knowCollectTypeId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
