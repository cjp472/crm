/**
 * @author:cf0666@gmail.com
 * @class SysTemTypeView
 * @extends Ext.Panel
 * @description [SysTemType]管理
 * @company 优创融联科技
 * @createtime:
 */
SysTemTypeView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				SysTemTypeView.superclass.constructor.call(this, {
							id : 'SysTemTypeViewWin',
							title : '[SysTemType]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'tmpTypeName',
											'名称',
																								new Ext.form.TextField({name : 'tmpTypeName',allowBlank:true})
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
											'父模板分类对象',
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
											'ukTmpTypeStatus',
											'状态&UK_TMP_TYPE_STATUS',
																																																					new Ext.form.NumberField({name : 'ukTmpTypeStatus',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'kukTmpTypeSort',
											'顺序',
																																																					new Ext.form.NumberField({name : 'kukTmpTypeSort',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'createBy',
											'创建人姓名',
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
											'path',
											'路径',
																								new Ext.form.TextField({name : 'path',allowBlank:true})
																						 ]
																			 								 							 											]
				var SysTemTypeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[SysTemType]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'SysTemTypeSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_tmpTypeName_S_EQ',
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
																																																													
																						
																																				hiddenName : 'Q_ukTmpTypeStatus_N_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'UK_TMP_TYPE_STATUS'
																																																												}
																				,
																			 								 																																		 										 										{
																																																													
																						
																																				name : 'Q_kukTmpTypeSort_N_EQ',
																																																																													xtype:'numberfield'
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
										handler :function(){ new SysTemTypeAdvancedSearchWin().show();}
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
									//text : __create+'[SysTemType]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[SysTemType]',
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
					id:'SysTemTypeGrid',
					url : __ctxPath + "/xitong/listSysTemType.do",
					fields : [{
									name : 'tmpTypeId',
									type : 'int'
								}
																																																																			,'tmpTypeName'
																																																																								,'comMent'
																																																																								,'parentId'
																																																																								,'updateTime'
																																																																								,'ukTmpTypeStatus'
																																																																								,'kukTmpTypeSort'
																																																																								,'createBy'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																																								,'path'
																																																],
					columns:[
								{
									header : 'tmpTypeId',
									dataIndex : 'tmpTypeId',
									hidden : true
								}
																																																								,{
																	header : '名称',
																isExp : false,
																
																	dataIndex : 'tmpTypeName'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'comMent'
																}
																																																,{
																	header : '父模板分类对象',
																isExp : false,
																
																	dataIndex : 'parentId'
																}
																																																,{
																	header : '更新时间',
																isExp : false,
																
																	dataIndex : 'updateTime'
																}
																																																,{
																	header : '状态&UK_TMP_TYPE_STATUS',
																isExp : false,
																
																	dataIndex : 'ukTmpTypeStatus',
									renderer : function(value) {
										return UK_TMP_TYPE_STATUS.get(value);
									}
																}
																																																,{
																	header : '顺序',
																isExp : false,
																
																	dataIndex : 'kukTmpTypeSort'
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
				$search({
						searchPanel : this.searchPanel,
						gridPanel : this.gridPanel
					});
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new SysTemTypeForm({tmpTypeId:rec.data.tmpTypeId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new SysTemTypeForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('SysTemTypeForm');
				if (aForm != null) {
					tabs.remove('SysTemTypeForm');
				}
				aForm = new SysTemTypeForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/xitong/multiDelSysTemType.do',
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
					url:__ctxPath + '/xitong/multiDelSysTemType.do',
					grid:this.gridPanel,
					idName:'tmpTypeId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new SysTemTypeForm({
				//	tmpTypeId : record.data.tmpTypeId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('SysTemTypeForm');
				if (aForm != null) {
					tabs.remove('SysTemTypeForm');
				}
				aForm = new SysTemTypeForm({tmpTypeId : record.data.tmpTypeId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.tmpTypeId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
