/**
 * @author:cf0666@gmail.com
 * @class UnimAssetsView
 * @extends Ext.Panel
 * @description [UnimAssets]管理
 * @company 优创融联科技
 * @createtime:
 */
UnimAssetsView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimAssetsView.superclass.constructor.call(this, {
							id : 'UnimAssetsViewWin',
							title : '[UnimAssets]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'assetsName',
											'资产名称',
																								new Ext.form.TextField({name : 'assetsName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'assetsCode',
											'资产编号',
																								new Ext.form.TextField({name : 'assetsCode',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'catId',
											'资产类型ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listcatId.do',
															fields : [ 'catId', 'catIdName' ]
														}),
														displayField : 'catIdName',
														valueField : 'catId',
														id : 'catId'
														})
																																			 ]
																				,
																			 								 																																		[
											'typeId',
											'资产类别ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listtypeId.do',
															fields : [ 'typeId', 'typeIdName' ]
														}),
														displayField : 'typeIdName',
														valueField : 'typeId',
														id : 'typeId'
														})
																																			 ]
																				,
																			 								 																																		[
											'depId',
											'部门ID',
																																																					new Ext.form.NumberField({name : 'depId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'perincharId',
											'负责人ID',
																																																					new Ext.form.NumberField({name : 'perincharId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'desc',
											'描述',
																								new Ext.form.TextField({name : 'desc',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'status',
											'状态：未启用、启用、注销',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var UnimAssetsAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UnimAssets]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimAssetsSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_assetsName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_assetsCode_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_catId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listcatId.do',
															fields : [ 'catId', 'catIdName' ]
														}),
														displayField : 'catIdName',
														valueField : 'catId',
														id : 'catId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_typeId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listtypeId.do',
															fields : [ 'typeId', 'typeIdName' ]
														}),
														displayField : 'typeIdName',
														valueField : 'typeId',
														id : 'typeId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_depId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_perincharId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_desc_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_status_SN_EQ',
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
										handler :function(){ new UnimAssetsAdvancedSearchWin().show();}
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
									//text : __create+'[UnimAssets]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[UnimAssets]',
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
					id:'UnimAssetsGrid',
					url : __ctxPath + "/unim/listUnimAssets.do",
					fields : [{
									name : 'assetsId',
									type : 'int'
								}
																																																																			,'assetsName'
																																																																								,'assetsCode'
																																																																								,'unimAssets'
																																																																								,'unimAssets'
																																																																								,'depId'
																																																																								,'perincharId'
																																																																								,'desc'
																																																																								,'remark'
																																																																								,'status'
																																																],
					columns:[
								{
									header : 'assetsId',
									dataIndex : 'assetsId',
									hidden : true
								}
																																																								,{
																	header : '资产名称',
																isExp : false,
																
																	dataIndex : 'assetsName'
																}
																																																,{
																	header : '资产编号',
																isExp : false,
																
																	dataIndex : 'assetsCode'
																}
																																																,{
																	header : '资产类型ID',
																isExp : false,
																
																    dataIndex : 'catId',
								    renderer:function(val){
								    	return val.catIdName;
								    }
																}
																																																,{
																	header : '资产类别ID',
																isExp : false,
																
																    dataIndex : 'typeId',
								    renderer:function(val){
								    	return val.typeIdName;
								    }
																}
																																																,{
																	header : '部门ID',
																isExp : false,
																
																	dataIndex : 'depId'
																}
																																																,{
																	header : '负责人ID',
																isExp : false,
																
																	dataIndex : 'perincharId'
																}
																																																,{
																	header : '描述',
																isExp : false,
																
																	dataIndex : 'desc'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '状态：未启用、启用、注销',
																isExp : false,
																
																	dataIndex : 'status'
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
//				var searchPanel = Ext.getCmp('UnimAssetsSearchPanel');
//				var gridPanel = Ext.getCmp('UnimAssetsGrid');
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
					new UnimAssetsForm({assetsId:rec.data.assetsId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UnimAssetsForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimAssetsForm');
				if (aForm != null) {
					tabs.remove('UnimAssetsForm');
				}
				aForm = new UnimAssetsForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/unim/multiDelUnimAssets.do',
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
					url:__ctxPath + '/unim/multiDelUnimAssets.do',
					grid:this.gridPanel,
					idName:'assetsId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new UnimAssetsForm({
				//	assetsId : record.data.assetsId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimAssetsForm');
				if (aForm != null) {
					tabs.remove('UnimAssetsForm');
				}
				aForm = new UnimAssetsForm({assetsId : record.data.assetsId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.assetsId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
