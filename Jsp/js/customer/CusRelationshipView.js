/**
 * @author:cf0666@gmail.com
 * @class CusRelationshipView
 * @extends Ext.Panel
 * @description [CusRelationship]管理
 * @company 优创融联科技
 * @createtime:
 */
CusRelationshipView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CusRelationshipView.superclass.constructor.call(this, {
							id : 'CusRelationshipViewWin',
							title : '[CusRelationship]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'customerid',
											'推荐客户',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listcustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
														})
																																			 ]
																				,
																			 								 																																		[
											'cusCustomerid',
											'被推荐客户',
																																																					new Ext.form.NumberField({name : 'cusCustomerid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'creDat',
											'创建时间',
																								new Ext.form.DateField({hiddenName : 'creDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'relationshipType',
											'类型',
																																																					new Ext.form.NumberField({name : 'relationshipType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'creUseId',
											'创建人ID',
																																																					new Ext.form.NumberField({name : 'creUseId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var CusRelationshipAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CusRelationship]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CusRelationshipSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_customerid_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listcustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_cusCustomerid_L_EQ',
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
																																																													
																						
																																				name : 'Q_relationshipType_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creUseId_L_EQ',
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
										handler :function(){ new CusRelationshipAdvancedSearchWin().show();}
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
									//text : __create+'[CusRelationship]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CusRelationship]',
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
					id:'CusRelationshipGrid',
					url : __ctxPath + "/customer/listCusRelationship.do",
					fields : [{
									name : 'relationshipId',
									type : 'int'
								}
																																																																			,'cusRelationship'
																																																																								,'cusCustomerid'
																																																																								,'creDat'
																																																																								,'relationshipType'
																																																																								,'creUseId'
																																																],
					columns:[
								{
									header : 'relationshipId',
									dataIndex : 'relationshipId',
									hidden : true
								}
																																																								,{
																	header : '推荐客户',
																isExp : false,
																
																    dataIndex : 'customerid',
								    renderer:function(val){
								    	return val.customeridName;
								    }
																}
																																																,{
																	header : '被推荐客户',
																isExp : false,
																
																	dataIndex : 'cusCustomerid'
																}
																																																,{
																	header : '创建时间',
																isExp : false,
																
																	dataIndex : 'creDat'
																}
																																																,{
																	header : '类型',
																isExp : false,
																
																	dataIndex : 'relationshipType'
																}
																																																,{
																	header : '创建人ID',
																isExp : false,
																
																	dataIndex : 'creUseId'
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
//				var searchPanel = Ext.getCmp('CusRelationshipSearchPanel');
//				var gridPanel = Ext.getCmp('CusRelationshipGrid');
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
					new CusRelationshipForm({relationshipId:rec.data.relationshipId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CusRelationshipForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusRelationshipForm');
				if (aForm != null) {
					tabs.remove('CusRelationshipForm');
				}
				aForm = new CusRelationshipForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/customer/multiDelCusRelationship.do',
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
					url:__ctxPath + '/customer/multiDelCusRelationship.do',
					grid:this.gridPanel,
					idName:'relationshipId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CusRelationshipForm({
				//	relationshipId : record.data.relationshipId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusRelationshipForm');
				if (aForm != null) {
					tabs.remove('CusRelationshipForm');
				}
				aForm = new CusRelationshipForm({relationshipId : record.data.relationshipId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.relationshipId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
