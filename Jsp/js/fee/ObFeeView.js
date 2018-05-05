/**
 * @author:cf0666@gmail.com
 * @class ObFeeView
 * @extends Ext.Panel
 * @description [ObFee]管理
 * @company 优创融联科技
 * @createtime:
 */
ObFeeView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObFeeView.superclass.constructor.call(this, {
							id : 'ObFeeViewWin',
							title : '[ObFee]管理',
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
															url : __ctxPath + '/fee/listuserid.do',
															fields : [ 'userid', 'useridName' ]
														}),
														displayField : 'useridName',
														valueField : 'userid',
														id : 'userid'
														})
																																			 ]
																				,
																			 								 																																		[
											'feeIndexProjectId',
											'指标项内码',
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
											'amount',
											'金额',
																																																					new Ext.form.NumberField({name : 'amount',allowBlank:true})
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
											'changedAmount',
											'增减款',
																																																					new Ext.form.NumberField({name : 'changedAmount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'comments',
											'备注',
																								new Ext.form.TextField({name : 'comments',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'staId',
											'状态',
																																																					new Ext.form.NumberField({name : 'staId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var ObFeeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObFee]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObFeeSearchPanel',
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
															url : __ctxPath + '/fee/listuserid.do',
															fields : [ 'userid', 'useridName' ]
														}),
														displayField : 'useridName',
														valueField : 'userid',
														id : 'userid'
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
																																																													
																						
																																				name : 'Q_amount_S_EQ',
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
																																																													
																						
																																				name : 'Q_changedAmount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_comments_S_EQ',
																																																xtype : 'textfield'
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
										handler :function(){ new ObFeeAdvancedSearchWin().show();}
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
									//text : __create+'[ObFee]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObFee]',
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
					id:'ObFeeGrid',
					url : __ctxPath + "/fee/listObFee.do",
					fields : [{
									name : 'feeId',
									type : 'int'
								}
																																																																			,'obFee'
																																																																								,'obFee'
																																																																								,'month'
																																																																								,'quarter'
																																																																								,'amount'
																																																																								,'createBy'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																																								,'changedAmount'
																																																																								,'comments'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'feeId',
									dataIndex : 'feeId',
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
																	header : '指标项内码',
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
																	header : '金额',
																isExp : false,
																
																	dataIndex : 'amount'
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
																	header : '增减款',
																isExp : false,
																
																	dataIndex : 'changedAmount'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'comments'
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
//				var searchPanel = Ext.getCmp('ObFeeSearchPanel');
//				var gridPanel = Ext.getCmp('ObFeeGrid');
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
					new ObFeeForm({feeId:rec.data.feeId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObFeeForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObFeeForm');
				if (aForm != null) {
					tabs.remove('ObFeeForm');
				}
				aForm = new ObFeeForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/fee/multiDelObFee.do',
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
					url:__ctxPath + '/fee/multiDelObFee.do',
					grid:this.gridPanel,
					idName:'feeId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObFeeForm({
				//	feeId : record.data.feeId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObFeeForm');
				if (aForm != null) {
					tabs.remove('ObFeeForm');
				}
				aForm = new ObFeeForm({feeId : record.data.feeId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.feeId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
