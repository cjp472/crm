/**
 * @author:cf0666@gmail.com
 * @class ShBuilderTimeView
 * @extends Ext.Panel
 * @description [ShBuilderTime]管理
 * @company 优创融联科技
 * @createtime:
 */
ShBuilderTimeView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ShBuilderTimeView.superclass.constructor.call(this, {
							id : 'ShBuilderTimeViewWin',
							title : '[ShBuilderTime]管理',
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
											'开始日期',
											'开始日期(年月日)',
																								new Ext.form.DateField({hiddenName : '开始日期',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'结束日期',
											'结束日期(年月日)',
																								new Ext.form.DateField({hiddenName : '结束日期',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'开始时间',
											'开始时间(时分)',
																								new Ext.form.DateField({hiddenName : '开始时间',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'结束时间',
											'结束时间(时分)',
																								new Ext.form.DateField({hiddenName : '结束时间',format : 'Y-m-d'})
																						 ]
																			 								 							 											]
				var ShBuilderTimeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ShBuilderTime]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ShBuilderTimeSearchPanel',
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
																																																													
																						
																																				name : 'Q_开始日期_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_结束日期_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_开始时间_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_结束时间_D_EQ',
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
										handler :function(){ new ShBuilderTimeAdvancedSearchWin().show();}
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
									//text : __create+'[ShBuilderTime]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ShBuilderTime]',
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
					id:'ShBuilderTimeGrid',
					url : __ctxPath + "/shhq/listShBuilderTime.do",
					fields : [{
									name : 'timeId',
									type : 'int'
								}
																																																				,'shBuilderTime'
																																																																																							,'开始日期'
																																																																								,'结束日期'
																																																																								,'开始时间'
																																																																								,'结束时间'
																																																],
					columns:[
								{
									header : 'timeId',
									dataIndex : 'timeId',
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
																	header : '开始日期(年月日)',
																isExp : false,
																
																	dataIndex : '开始日期'
																}
																																																,{
																	header : '结束日期(年月日)',
																isExp : false,
																
																	dataIndex : '结束日期'
																}
																																																,{
																	header : '开始时间(时分)',
																isExp : false,
																
																	dataIndex : '开始时间'
																}
																																																,{
																	header : '结束时间(时分)',
																isExp : false,
																
																	dataIndex : '结束时间'
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
//				var searchPanel = Ext.getCmp('ShBuilderTimeSearchPanel');
//				var gridPanel = Ext.getCmp('ShBuilderTimeGrid');
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
					new ShBuilderTimeForm({timeId:rec.data.timeId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ShBuilderTimeForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderTimeForm');
				if (aForm != null) {
					tabs.remove('ShBuilderTimeForm');
				}
				aForm = new ShBuilderTimeForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/shhq/multiDelShBuilderTime.do',
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
					url:__ctxPath + '/shhq/multiDelShBuilderTime.do',
					grid:this.gridPanel,
					idName:'timeId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ShBuilderTimeForm({
				//	timeId : record.data.timeId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderTimeForm');
				if (aForm != null) {
					tabs.remove('ShBuilderTimeForm');
				}
				aForm = new ShBuilderTimeForm({timeId : record.data.timeId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.timeId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
