/**
 * @author:cf0666@gmail.com
 * @class CusSpeEveView
 * @extends Ext.Panel
 * @description [CusSpeEve]管理
 * @company 优创融联科技
 * @createtime:
 */
CusSpeEveView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CusSpeEveView.superclass.constructor.call(this, {
							id : 'CusSpeEveViewWin',
							title : '[CusSpeEve]管理',
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
											'客户ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/financial/combocustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
														})
																																			 ]
																				,
																			 								 																																		[
											'eveContent',
											'事项内容',
																								new Ext.form.TextField({name : 'eveContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'creUseId',
											'创建人ID',
																																																					new MT.DicComboBox({hiddenName : 'creUseId',itemKey : 'CONZT'})
																																																	 ]
																				,
																			 								 																																		[
											'creDat',
											'创建日期',
																								new Ext.form.DateField({hiddenName : 'creDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'updUseId',
											'修改人ID',
																																																					new MT.DicComboBox({hiddenName : 'updUseId',itemKey : 'CONZT'})
																																																	 ]
																				,
																			 								 																																		[
											'updDat',
											'修改日期',
																								new Ext.form.DateField({hiddenName : 'updDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'staId',
											'状态&CONZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'CONZT'})
																																																	 ]
																			 								 							 											]
				var CusSpeEveAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CusSpeEve]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CusSpeEveSearchPanel',
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
															url : __ctxPath + '/financial/combocustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_eveContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creUseId_L_EQ',
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
																																																													
																						
																																				name : 'Q_updUseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_staId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONZT'
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
										handler :function(){ new CusSpeEveAdvancedSearchWin().show();}
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
									//text : __create+'[CusSpeEve]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CusSpeEve]',
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
					id:'CusSpeEveGrid',
					url : __ctxPath + "/customer/listCusSpeEve.do",
					fields : [{
									name : 'eveId',
									type : 'int'
								}
																																																																			,'cusSpeEve'
																																																																								,'eveContent'
																																																																								,'remark'
																																																																								,'creUseId'
																																																																								,'creDat'
																																																																								,'updUseId'
																																																																								,'updDat'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'eveId',
									dataIndex : 'eveId',
									hidden : true
								}
																																																								,{
																	header : '客户ID',
																isExp : false,
																
																    dataIndex : 'customerid',
								    renderer:function(val){
								    	return val.customeridName;
								    }
																}
																																																,{
																	header : '事项内容',
																isExp : false,
																
																	dataIndex : 'eveContent'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '创建人ID',
																isExp : false,
																
																	dataIndex : 'creUseId'
																}
																																																,{
																	header : '创建日期',
																isExp : false,
																
																	dataIndex : 'creDat'
																}
																																																,{
																	header : '修改人ID',
																isExp : false,
																
																	dataIndex : 'updUseId'
																}
																																																,{
																	header : '修改日期',
																isExp : false,
																
																	dataIndex : 'updDat'
																}
																																																,{
																	header : '状态&CONZT',
																isExp : false,
																
																	dataIndex : 'staId',
									renderer : function(value) {
										return CONZT.value;
									}
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
					new CusSpeEveForm({eveId:rec.data.eveId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CusSpeEveForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusSpeEveForm');
				if (aForm != null) {
					tabs.remove('CusSpeEveForm');
				}
				aForm = new CusSpeEveForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/customer/multiDelCusSpeEve.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/customer/multiDelCusSpeEve.do',
					grid:this.gridPanel,
					idName:'eveId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CusSpeEveForm({
				//	eveId : record.data.eveId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusSpeEveForm');
				if (aForm != null) {
					tabs.remove('CusSpeEveForm');
				}
				aForm = new CusSpeEveForm({eveId : record.data.eveId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.eveId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
