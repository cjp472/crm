/**
 * @author:cf0666@gmail.com
 * @class PapTemplateView
 * @extends Ext.Panel
 * @description [PapTemplate]管理
 * @company 优创融联科技
 * @createtime:
 */
PapTemplateView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				PapTemplateView.superclass.constructor.call(this, {
							id : 'PapTemplateViewWin',
							title : '[PapTemplate]管理',
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
											'展示布局：全部展示、按树展示、按标签展示',
																																																					new MT.DicComboBox({hiddenName : 'displayLayoutId',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'displayStyleId',
											'展示样式：按跳题展示、全部展示、展示当前题目',
																																																					new MT.DicComboBox({hiddenName : 'displayStyleId',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'guideFilePath',
											'前导页文件地址',
																								new Ext.form.TextField({name : 'guideFilePath',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'applyAnsNo',
											'是否允许匿名答卷&YorN',
																																																					new MT.DicComboBox({hiddenName : 'applyAnsNo',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'needPassChk',
											'是否需要密码验证&YorN',
																																																					new MT.DicComboBox({hiddenName : 'needPassChk',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'applyAnsMuti',
											'是否允许多次答卷&YorN',
																																																					new MT.DicComboBox({hiddenName : 'applyAnsMuti',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'applyViewRes',
											'是否允许查看结果&YorN',
																																																					new MT.DicComboBox({hiddenName : 'applyViewRes',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'displayGuide',
											'是否显示前导页&YorN',
																																																					new MT.DicComboBox({hiddenName : 'displayGuide',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'creUseId',
											'创建人ID',
																																																					new MT.DicComboBox({hiddenName : 'creUseId',itemKey : 'PAP_ZT'})
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
																																																					new MT.DicComboBox({hiddenName : 'updUseId',itemKey : 'PAP_ZT'})
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
											'状态：有效、注销&PAP_ZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'PAP_ZT'})
																																																	 ]
																			 								 							 											]
				var PapTemplateAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[PapTemplate]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'PapTemplateSearchPanel',
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
																																																													
																						
																																				name : 'Q_displayLayoutId_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_displayStyleId_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_guideFilePath_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_applyAnsNo_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'YorN'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_needPassChk_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'YorN'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_applyAnsMuti_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'YorN'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_applyViewRes_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'YorN'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_displayGuide_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'YorN'
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
															itemKey : 'PAP_ZT'
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
										handler :function(){ new PapTemplateAdvancedSearchWin().show();}
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
									//text : __create+'[PapTemplate]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[PapTemplate]',
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
					id:'PapTemplateGrid',
					url : __ctxPath + "/pap/listPapTemplate.do",
					fields : [{
									name : 'tmpId',
									type : 'int'
								}
																																																																			,'tmpName'
																																																																								,'tmpContent'
																																																																								,'displayLayoutId'
																																																																								,'displayStyleId'
																																																																								,'remark'
																																																																								,'guideFilePath'
																																																																								,'applyAnsNo'
																																																																								,'needPassChk'
																																																																								,'applyAnsMuti'
																																																																								,'applyViewRes'
																																																																								,'displayGuide'
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
																	header : '展示布局：全部展示、按树展示、按标签展示',
																isExp : false,
																
																	dataIndex : 'displayLayoutId'
																}
																																																,{
																	header : '展示样式：按跳题展示、全部展示、展示当前题目',
																isExp : false,
																
																	dataIndex : 'displayStyleId'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '前导页文件地址',
																isExp : false,
																
																	dataIndex : 'guideFilePath'
																}
																																																,{
																	header : '是否允许匿名答卷&YorN',
																isExp : false,
																
																	dataIndex : 'applyAnsNo',
									renderer : function(value) {
										return YorN.value;
									}
																}
																																																,{
																	header : '是否需要密码验证&YorN',
																isExp : false,
																
																	dataIndex : 'needPassChk',
									renderer : function(value) {
										return YorN.value;
									}
																}
																																																,{
																	header : '是否允许多次答卷&YorN',
																isExp : false,
																
																	dataIndex : 'applyAnsMuti',
									renderer : function(value) {
										return YorN.value;
									}
																}
																																																,{
																	header : '是否允许查看结果&YorN',
																isExp : false,
																
																	dataIndex : 'applyViewRes',
									renderer : function(value) {
										return YorN.value;
									}
																}
																																																,{
																	header : '是否显示前导页&YorN',
																isExp : false,
																
																	dataIndex : 'displayGuide',
									renderer : function(value) {
										return YorN.value;
									}
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
																	header : '状态：有效、注销&PAP_ZT',
																isExp : false,
																
																	dataIndex : 'staId',
									renderer : function(value) {
										return PAP_ZT.value;
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
					new PapTemplateForm({tmpId:rec.data.tmpId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new PapTemplateForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('PapTemplateForm');
				if (aForm != null) {
					tabs.remove('PapTemplateForm');
				}
				aForm = new PapTemplateForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/pap/multiDelPapTemplate.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/pap/multiDelPapTemplate.do',
					grid:this.gridPanel,
					idName:'tmpId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new PapTemplateForm({
				//	tmpId : record.data.tmpId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('PapTemplateForm');
				if (aForm != null) {
					tabs.remove('PapTemplateForm');
				}
				aForm = new PapTemplateForm({tmpId : record.data.tmpId});
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
