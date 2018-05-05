/**
 * @author:cf0666@gmail.com
 * @class ServiceWsdlMethodView
 * @extends Ext.Panel
 * @description [ServiceWsdlMethod]管理
 * @company 优创融联科技
 * @createtime:
 */
ServiceWsdlMethodView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ServiceWsdlMethodView.superclass.constructor.call(this, {
							id : 'ServiceWsdlMethodViewWin',
							title : '[ServiceWsdlMethod]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'serviceWsdlId',
											'接口内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/xitong/listserviceWsdlId.do',
															fields : [ 'serviceWsdlId', 'serviceWsdlIdName' ]
														}),
														displayField : 'serviceWsdlIdName',
														valueField : 'serviceWsdlId',
														id : 'serviceWsdlId'
														})
																																			 ]
																				,
																			 								 																																		[
											'serviceWsdlMethod',
											'接口方法名称',
																								new Ext.form.TextField({name : 'serviceWsdlMethod',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'serviceWsdlMethodName',
											'接口方法',
																								new Ext.form.TextField({name : 'serviceWsdlMethodName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'serviceWsdlMethodColumns',
											'接口参数',
																								new Ext.form.TextField({name : 'serviceWsdlMethodColumns',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'serviceWsdlMethodReturn',
											'接口数据返回格式',
																								new Ext.form.TextField({name : 'serviceWsdlMethodReturn',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'comment',
											'备注',
																								new Ext.form.TextField({name : 'comment',allowBlank:true})
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
				var ServiceWsdlMethodAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ServiceWsdlMethod]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ServiceWsdlMethodSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_serviceWsdlId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/xitong/listserviceWsdlId.do',
															fields : [ 'serviceWsdlId', 'serviceWsdlIdName' ]
														}),
														displayField : 'serviceWsdlIdName',
														valueField : 'serviceWsdlId',
														id : 'serviceWsdlId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_serviceWsdlMethod_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_serviceWsdlMethodName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_serviceWsdlMethodColumns_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_serviceWsdlMethodReturn_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_comment_S_EQ',
																																																xtype : 'textfield'
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
										handler :function(){ new ServiceWsdlMethodAdvancedSearchWin().show();}
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
									//text : __create+'[ServiceWsdlMethod]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ServiceWsdlMethod]',
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
					id:'ServiceWsdlMethodGrid',
					url : __ctxPath + "/xitong/listServiceWsdlMethod.do",
					fields : [{
									name : 'serviceWsdlMethodId',
									type : 'int'
								}
																																																																			,'serviceWsdlMethod'
																																																																								,'serviceWsdlMethod'
																																																																								,'serviceWsdlMethodName'
																																																																								,'serviceWsdlMethodColumns'
																																																																								,'serviceWsdlMethodReturn'
																																																																								,'comment'
																																																																								,'createBy'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																],
					columns:[
								{
									header : 'serviceWsdlMethodId',
									dataIndex : 'serviceWsdlMethodId',
									hidden : true
								}
																																																								,{
																	header : '接口内码',
																isExp : false,
																
																    dataIndex : 'serviceWsdlId',
								    renderer:function(val){
								    	return val.serviceWsdlIdName;
								    }
																}
																																																,{
																	header : '接口方法名称',
																isExp : false,
																
																	dataIndex : 'serviceWsdlMethod'
																}
																																																,{
																	header : '接口方法',
																isExp : false,
																
																	dataIndex : 'serviceWsdlMethodName'
																}
																																																,{
																	header : '接口参数',
																isExp : false,
																
																	dataIndex : 'serviceWsdlMethodColumns'
																}
																																																,{
																	header : '接口数据返回格式',
																isExp : false,
																
																	dataIndex : 'serviceWsdlMethodReturn'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'comment'
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
				$search({
						searchPanel : this.searchPanel,
						gridPanel : this.gridPanel
					});
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new ServiceWsdlMethodForm({serviceWsdlMethodId:rec.data.serviceWsdlMethodId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ServiceWsdlMethodForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ServiceWsdlMethodForm');
				if (aForm != null) {
					tabs.remove('ServiceWsdlMethodForm');
				}
				aForm = new ServiceWsdlMethodForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/xitong/multiDelServiceWsdlMethod.do',
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
					url:__ctxPath + '/xitong/multiDelServiceWsdlMethod.do',
					grid:this.gridPanel,
					idName:'serviceWsdlMethodId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ServiceWsdlMethodForm({
				//	serviceWsdlMethodId : record.data.serviceWsdlMethodId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ServiceWsdlMethodForm');
				if (aForm != null) {
					tabs.remove('ServiceWsdlMethodForm');
				}
				aForm = new ServiceWsdlMethodForm({serviceWsdlMethodId : record.data.serviceWsdlMethodId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.serviceWsdlMethodId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
