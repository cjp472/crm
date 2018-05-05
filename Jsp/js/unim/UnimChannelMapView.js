/**
 * @author:cf0666@gmail.com
 * @class UnimChannelMapView
 * @extends Ext.Panel
 * @description [UnimChannelMap]管理
 * @company 优创融联科技
 * @createtime:
 */
UnimChannelMapView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimChannelMapView.superclass.constructor.call(this, {
							id : 'UnimChannelMapViewWin',
							title : '[UnimChannelMap]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'mapName',
											'视图名称',
																								new Ext.form.TextField({name : 'mapName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'navigationId',
											'导航节点ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listnavigationId.do',
															fields : [ 'navigationId', 'navigationIdName' ]
														}),
														displayField : 'navigationIdName',
														valueField : 'navigationId',
														id : 'navigationId'
														})
																																			 ]
																				,
																			 								 																																		[
											'address',
											'地址',
																								new Ext.form.TextField({name : 'address',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'bkfileUrl',
											'URL',
																								new Ext.form.TextField({name : 'bkfileUrl',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'height',
											'宽度',
																								new Ext.form.TextField({name : 'height',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'width',
											'高度',
																								new Ext.form.TextField({name : 'width',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'designxml',
											'描述符文件',
																								new Ext.form.TextField({name : 'designxml',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'reamrk',
											'描述',
																								new Ext.form.TextField({name : 'reamrk',allowBlank:true})
																						 ]
																			 								 							 											]
				var UnimChannelMapAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UnimChannelMap]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimChannelMapSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_mapName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_navigationId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listnavigationId.do',
															fields : [ 'navigationId', 'navigationIdName' ]
														}),
														displayField : 'navigationIdName',
														valueField : 'navigationId',
														id : 'navigationId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_address_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bkfileUrl_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_height_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_width_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_designxml_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_reamrk_S_EQ',
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
										handler :function(){ new UnimChannelMapAdvancedSearchWin().show();}
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
									//text : __create+'[UnimChannelMap]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[UnimChannelMap]',
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
					id:'UnimChannelMapGrid',
					url : __ctxPath + "/unim/listUnimChannelMap.do",
					fields : [{
									name : 'mapId',
									type : 'int'
								}
																																																																			,'mapName'
																																																																								,'unimChannelMap'
																																																																								,'address'
																																																																								,'bkfileUrl'
																																																																								,'height'
																																																																								,'width'
																																																																								,'designxml'
																																																																								,'reamrk'
																																																],
					columns:[
								{
									header : 'mapId',
									dataIndex : 'mapId',
									hidden : true
								}
																																																								,{
																	header : '视图名称',
																isExp : false,
																
																	dataIndex : 'mapName'
																}
																																																,{
																	header : '导航节点ID',
																isExp : false,
																
																    dataIndex : 'navigationId',
								    renderer:function(val){
								    	return val.navigationIdName;
								    }
																}
																																																,{
																	header : '地址',
																isExp : false,
																
																	dataIndex : 'address'
																}
																																																,{
																	header : 'URL',
																isExp : false,
																
																	dataIndex : 'bkfileUrl'
																}
																																																,{
																	header : '宽度',
																isExp : false,
																
																	dataIndex : 'height'
																}
																																																,{
																	header : '高度',
																isExp : false,
																
																	dataIndex : 'width'
																}
																																																,{
																	header : '描述符文件',
																isExp : false,
																
																	dataIndex : 'designxml'
																}
																																																,{
																	header : '描述',
																isExp : false,
																
																	dataIndex : 'reamrk'
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
//				var searchPanel = Ext.getCmp('UnimChannelMapSearchPanel');
//				var gridPanel = Ext.getCmp('UnimChannelMapGrid');
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
					new UnimChannelMapForm({mapId:rec.data.mapId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UnimChannelMapForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimChannelMapForm');
				if (aForm != null) {
					tabs.remove('UnimChannelMapForm');
				}
				aForm = new UnimChannelMapForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/unim/multiDelUnimChannelMap.do',
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
					url:__ctxPath + '/unim/multiDelUnimChannelMap.do',
					grid:this.gridPanel,
					idName:'mapId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new UnimChannelMapForm({
				//	mapId : record.data.mapId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimChannelMapForm');
				if (aForm != null) {
					tabs.remove('UnimChannelMapForm');
				}
				aForm = new UnimChannelMapForm({mapId : record.data.mapId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.mapId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
