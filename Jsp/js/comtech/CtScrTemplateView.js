/**
 * @author:cf0666@gmail.com
 * @class CtScrTemplateView
 * @extends Ext.Panel
 * @description [CtScrTemplate]管理
 * @company 优创融联科技
 * @createtime:
 */
CtScrTemplateView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CtScrTemplateView.superclass.constructor.call(this, {
							id : 'CtScrTemplateViewWin',
							title : '[CtScrTemplate]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'tmpName',
											'名称',
																								new Ext.form.TextField({name : 'tmpName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'tmpContent',
											'描述',
																								new Ext.form.TextField({name : 'tmpContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'displayLayoutId',
											'展示布局：全部展示、按树展示、按标签展示&CT_HSZSBJ',
																																																					new MT.DicComboBox({hiddenName : 'displayLayoutId',itemKey : 'CT_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'displayStyleId',
											'展示样式：按跳题展示、全部展示、展示当前题目&CT_ZSYS',
																																																					new MT.DicComboBox({hiddenName : 'displayStyleId',itemKey : 'CT_ZT'})
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
											'创建人',
																																																					new MT.DicComboBox({hiddenName : 'creUseId',itemKey : 'CT_ZT'})
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
											'修改人',
																																																					new MT.DicComboBox({hiddenName : 'updUseId',itemKey : 'CT_ZT'})
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
											'状态：有效、注销&CT_ZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'CT_ZT'})
																																																	 ]
																			 								 							 											]
				var CtScrTemplateAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CtScrTemplate]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CtScrTemplateSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_tmpName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_tmpContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_displayLayoutId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CT_HSZSBJ'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_displayStyleId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CT_ZSYS'
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
															itemKey : 'CT_ZT'
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
										handler :function(){ new CtScrTemplateAdvancedSearchWin().show();}
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
									//text : __create+'[CtScrTemplate]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CtScrTemplate]',
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
					id:'CtScrTemplateGrid',
					url : __ctxPath + "/comtech/listCtScrTemplate.do",
					fields : [{
									name : 'tmpId',
									type : 'int'
								}
																																																																			,'tmpName'
																																																																								,'tmpContent'
																																																																								,'displayLayoutId'
																																																																								,'displayStyleId'
																																																																								,'remark'
																																																																								,'creUseId'
																																																																								,'creDat'
																																																																								,'updUseId'
																																																																								,'updDat'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'tmpId',
									dataIndex : 'tmpId',
									hidden : true
								}
																																																								,{
																	header : '名称',
																isExp : false,
																
																	dataIndex : 'tmpName'
																}
																																																,{
																	header : '描述',
																isExp : false,
																
																	dataIndex : 'tmpContent'
																}
																																																,{
																	header : '展示布局：全部展示、按树展示、按标签展示&CT_HSZSBJ',
																isExp : false,
																
																	dataIndex : 'displayLayoutId',
									renderer : function(value) {
										return CT_HSZSBJ.value;
									}
																}
																																																,{
																	header : '展示样式：按跳题展示、全部展示、展示当前题目&CT_ZSYS',
																isExp : false,
																
																	dataIndex : 'displayStyleId',
									renderer : function(value) {
										return CT_ZSYS.value;
									}
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '创建人',
																isExp : false,
																
																	dataIndex : 'creUseId'
																}
																																																,{
																	header : '创建日期',
																isExp : false,
																
																	dataIndex : 'creDat'
																}
																																																,{
																	header : '修改人',
																isExp : false,
																
																	dataIndex : 'updUseId'
																}
																																																,{
																	header : '修改日期',
																isExp : false,
																
																	dataIndex : 'updDat'
																}
																																																,{
																	header : '状态：有效、注销&CT_ZT',
																isExp : false,
																
																	dataIndex : 'staId',
									renderer : function(value) {
										return CT_ZT.value;
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
					new CtScrTemplateForm({tmpId:rec.data.tmpId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CtScrTemplateForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrTemplateForm');
				if (aForm != null) {
					tabs.remove('CtScrTemplateForm');
				}
				aForm = new CtScrTemplateForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/comtech/multiDelCtScrTemplate.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/comtech/multiDelCtScrTemplate.do',
					grid:this.gridPanel,
					idName:'tmpId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CtScrTemplateForm({
				//	tmpId : record.data.tmpId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrTemplateForm');
				if (aForm != null) {
					tabs.remove('CtScrTemplateForm');
				}
				aForm = new CtScrTemplateForm({tmpId : record.data.tmpId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.tmpId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
