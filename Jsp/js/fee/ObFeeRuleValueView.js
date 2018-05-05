/**
 * @author:cf0666@gmail.com
 * @class ObFeeRuleValueView
 * @extends Ext.Panel
 * @description [ObFeeRuleValue]管理
 * @company 优创融联科技
 * @createtime:
 */
ObFeeRuleValueView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObFeeRuleValueView.superclass.constructor.call(this, {
							id : 'ObFeeRuleValueViewWin',
							title : '[ObFeeRuleValue]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'feeRuleId',
											'佣金规则内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/fee/listfeeRuleId.do',
															fields : [ 'feeRuleId', 'feeRuleIdName' ]
														}),
														displayField : 'feeRuleIdName',
														valueField : 'feeRuleId',
														id : 'feeRuleId'
														})
																																			 ]
																				,
																			 								 																																		[
											'minimum',
											'最小值',
																																																					new Ext.form.NumberField({name : 'minimum',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'maximum',
											'最大值',
																																																					new Ext.form.NumberField({name : 'maximum',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'coefficient',
											'系数',
																																																					new Ext.form.NumberField({name : 'coefficient',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'increase',
											'增加额度',
																																																					new Ext.form.NumberField({name : 'increase',allowBlank:true})
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
				var ObFeeRuleValueAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObFeeRuleValue]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObFeeRuleValueSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_feeRuleId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/fee/listfeeRuleId.do',
															fields : [ 'feeRuleId', 'feeRuleIdName' ]
														}),
														displayField : 'feeRuleIdName',
														valueField : 'feeRuleId',
														id : 'feeRuleId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_minimum_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_maximum_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_coefficient_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_increase_S_EQ',
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
										handler :function(){ new ObFeeRuleValueAdvancedSearchWin().show();}
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
									//text : __create+'[ObFeeRuleValue]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObFeeRuleValue]',
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
					id:'ObFeeRuleValueGrid',
					url : __ctxPath + "/fee/listObFeeRuleValue.do",
					fields : [{
									name : 'feeRuleValueId',
									type : 'int'
								}
																																																																			,'obFeeRuleValue'
																																																																								,'minimum'
																																																																								,'maximum'
																																																																								,'coefficient'
																																																																								,'increase'
																																																																								,'createBy'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																],
					columns:[
								{
									header : 'feeRuleValueId',
									dataIndex : 'feeRuleValueId',
									hidden : true
								}
																																																								,{
																	header : '佣金规则内码',
																isExp : false,
																
																    dataIndex : 'feeRuleId',
								    renderer:function(val){
								    	return val.feeRuleIdName;
								    }
																}
																																																,{
																	header : '最小值',
																isExp : false,
																
																	dataIndex : 'minimum'
																}
																																																,{
																	header : '最大值',
																isExp : false,
																
																	dataIndex : 'maximum'
																}
																																																,{
																	header : '系数',
																isExp : false,
																
																	dataIndex : 'coefficient'
																}
																																																,{
																	header : '增加额度',
																isExp : false,
																
																	dataIndex : 'increase'
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
//				var searchPanel = Ext.getCmp('ObFeeRuleValueSearchPanel');
//				var gridPanel = Ext.getCmp('ObFeeRuleValueGrid');
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
					new ObFeeRuleValueForm({feeRuleValueId:rec.data.feeRuleValueId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObFeeRuleValueForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObFeeRuleValueForm');
				if (aForm != null) {
					tabs.remove('ObFeeRuleValueForm');
				}
				aForm = new ObFeeRuleValueForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/fee/multiDelObFeeRuleValue.do',
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
					url:__ctxPath + '/fee/multiDelObFeeRuleValue.do',
					grid:this.gridPanel,
					idName:'feeRuleValueId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObFeeRuleValueForm({
				//	feeRuleValueId : record.data.feeRuleValueId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObFeeRuleValueForm');
				if (aForm != null) {
					tabs.remove('ObFeeRuleValueForm');
				}
				aForm = new ObFeeRuleValueForm({feeRuleValueId : record.data.feeRuleValueId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.feeRuleValueId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
