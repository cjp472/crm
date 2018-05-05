/**
 * @author:cf0666@gmail.com
 * @class QcChkListView
 * @extends Ext.Panel
 * @description [QcChkList]管理
 * @company 优创融联科技
 * @createtime:
 */
QcChkListView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcChkListView.superclass.constructor.call(this, {
							id : 'QcChkListViewWin',
							title : '[QcChkList]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'chkUseId',
											'质检人',
																																																					new Ext.form.NumberField({name : 'chkUseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'objTyeId',
											'考核对象类型:联络历史、工单等',
																																																					new Ext.form.NumberField({name : 'objTyeId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'objId',
											'对象编号',
																								new Ext.form.TextField({name : 'objId',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'assTime',
											'分配时间',
																								new Ext.form.DateField({hiddenName : 'assTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'chkStaId',
											'考核状态',
																																																					new Ext.form.NumberField({name : 'chkStaId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'chkTimeSta',
											'考核开始时间',
																								new Ext.form.DateField({hiddenName : 'chkTimeSta',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'chkTimeEnd',
											'考核完成时间',
																								new Ext.form.DateField({hiddenName : 'chkTimeEnd',format : 'Y-m-d'})
																						 ]
																			 								 							 											]
				var QcChkListAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcChkList]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcChkListSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_chkUseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_objTyeId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_objId_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_assTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_chkStaId_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_chkTimeSta_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_chkTimeEnd_D_EQ',
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
										handler :function(){ new QcChkListAdvancedSearchWin().show();}
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
									//text : __create+'[QcChkList]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcChkList]',
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
					id:'QcChkListGrid',
					url : __ctxPath + "/qucon/listQcChkList.do",
					fields : [{
									name : 'chkListId',
									type : 'int'
								}
																																																																			,'chkUseId'
																																																																								,'objTyeId'
																																																																								,'objId'
																																																																								,'assTime'
																																																																								,'chkStaId'
																																																																								,'chkTimeSta'
																																																																								,'chkTimeEnd'
																																																],
					columns:[
								{
									header : 'chkListId',
									dataIndex : 'chkListId',
									hidden : true
								}
																																																								,{
																	header : '质检人',
																isExp : false,
																
																	dataIndex : 'chkUseId'
																}
																																																,{
																	header : '考核对象类型:联络历史、工单等',
																isExp : false,
																
																	dataIndex : 'objTyeId'
																}
																																																,{
																	header : '对象编号',
																isExp : false,
																
																	dataIndex : 'objId'
																}
																																																,{
																	header : '分配时间',
																isExp : false,
																
																	dataIndex : 'assTime'
																}
																																																,{
																	header : '考核状态',
																isExp : false,
																
																	dataIndex : 'chkStaId'
																}
																																																,{
																	header : '考核开始时间',
																isExp : false,
																
																	dataIndex : 'chkTimeSta'
																}
																																																,{
																	header : '考核完成时间',
																isExp : false,
																
																	dataIndex : 'chkTimeEnd'
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
					new QcChkListForm({chkListId:rec.data.chkListId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcChkListForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkListForm');
				if (aForm != null) {
					tabs.remove('QcChkListForm');
				}
				aForm = new QcChkListForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/qucon/multiDelQcChkList.do',
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
					url:__ctxPath + '/qucon/multiDelQcChkList.do',
					grid:this.gridPanel,
					idName:'chkListId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcChkListForm({
				//	chkListId : record.data.chkListId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkListForm');
				if (aForm != null) {
					tabs.remove('QcChkListForm');
				}
				aForm = new QcChkListForm({chkListId : record.data.chkListId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.chkListId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
