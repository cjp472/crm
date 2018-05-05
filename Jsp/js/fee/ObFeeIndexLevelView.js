/**
 * @author:cf0666@gmail.com
 * @class ObFeeIndexLevelView
 * @extends Ext.Panel
 * @description [ObFeeIndexLevel]管理
 * @company 优创融联科技
 * @createtime:
 */
ObFeeIndexLevelView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObFeeIndexLevelView.superclass.constructor.call(this, {
							id : 'ObFeeIndexLevelViewWin',
							title : '[ObFeeIndexLevel]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'feeIndexId',
											'佣金指标内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/fee/listfeeIndexId.do',
															fields : [ 'feeIndexId', 'feeIndexIdName' ]
														}),
														displayField : 'feeIndexIdName',
														valueField : 'feeIndexId',
														id : 'feeIndexId'
														})
																																			 ]
																				,
																			 								 																																		[
											'feeIndexProjectId',
											'佣金指标项内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/fee/listfeeIndexProjectId.do',
															fields : [ 'feeIndexProjectId', 'feeIndexProjectIdName' ]
														}),
														displayField : 'feeIndexProjectIdName',
														valueField : 'feeIndexProjectId',
														id : 'feeIndexProjectId'
														})
																																			 ]
																				,
																			 								 																																		[
											'month',
											'月份',
																																																					new Ext.form.NumberField({name : 'month',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'quarter',
											'季度',
																																																					new Ext.form.NumberField({name : 'quarter',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'feeIndexValue',
											'值',
																																																					new Ext.form.NumberField({name : 'feeIndexValue',allowBlank:true})
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
																			 								 							 											]
				var ObFeeIndexLevelAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObFeeIndexLevel]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObFeeIndexLevelSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_feeIndexId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/fee/listfeeIndexId.do',
															fields : [ 'feeIndexId', 'feeIndexIdName' ]
														}),
														displayField : 'feeIndexIdName',
														valueField : 'feeIndexId',
														id : 'feeIndexId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_feeIndexProjectId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/fee/listfeeIndexProjectId.do',
															fields : [ 'feeIndexProjectId', 'feeIndexProjectIdName' ]
														}),
														displayField : 'feeIndexProjectIdName',
														valueField : 'feeIndexProjectId',
														id : 'feeIndexProjectId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_month_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_quarter_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_feeIndexValue_S_EQ',
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
										handler :function(){ new ObFeeIndexLevelAdvancedSearchWin().show();}
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
									//text : __create+'[ObFeeIndexLevel]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObFeeIndexLevel]',
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
					id:'ObFeeIndexLevelGrid',
					url : __ctxPath + "/fee/listObFeeIndexLevel.do",
					fields : [{
									name : 'feeIndexLevelId',
									type : 'int'
								}
																																																																			,'obFeeIndexLevel'
																																																																								,'obFeeIndexLevel'
																																																																								,'month'
																																																																								,'quarter'
																																																																								,'feeIndexValue'
																																																																								,'createBy'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																],
					columns:[
								{
									header : 'feeIndexLevelId',
									dataIndex : 'feeIndexLevelId',
									hidden : true
								}
																																																								,{
																	header : '佣金指标内码',
																isExp : false,
																
																    dataIndex : 'feeIndexId',
								    renderer:function(val){
								    	return val.feeIndexIdName;
								    }
																}
																																																,{
																	header : '佣金指标项内码',
																isExp : false,
																
																    dataIndex : 'feeIndexProjectId',
								    renderer:function(val){
								    	return val.feeIndexProjectIdName;
								    }
																}
																																																,{
																	header : '月份',
																isExp : false,
																
																	dataIndex : 'month'
																}
																																																,{
																	header : '季度',
																isExp : false,
																
																	dataIndex : 'quarter'
																}
																																																,{
																	header : '值',
																isExp : false,
																
																	dataIndex : 'feeIndexValue'
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
//				var searchPanel = Ext.getCmp('ObFeeIndexLevelSearchPanel');
//				var gridPanel = Ext.getCmp('ObFeeIndexLevelGrid');
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
					new ObFeeIndexLevelForm({feeIndexLevelId:rec.data.feeIndexLevelId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObFeeIndexLevelForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObFeeIndexLevelForm');
				if (aForm != null) {
					tabs.remove('ObFeeIndexLevelForm');
				}
				aForm = new ObFeeIndexLevelForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/fee/multiDelObFeeIndexLevel.do',
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
					url:__ctxPath + '/fee/multiDelObFeeIndexLevel.do',
					grid:this.gridPanel,
					idName:'feeIndexLevelId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObFeeIndexLevelForm({
				//	feeIndexLevelId : record.data.feeIndexLevelId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObFeeIndexLevelForm');
				if (aForm != null) {
					tabs.remove('ObFeeIndexLevelForm');
				}
				aForm = new ObFeeIndexLevelForm({feeIndexLevelId : record.data.feeIndexLevelId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.feeIndexLevelId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
