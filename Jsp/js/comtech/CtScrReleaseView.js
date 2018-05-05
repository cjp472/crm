/**
 * @author:cf0666@gmail.com
 * @class CtScrReleaseView
 * @extends Ext.Panel
 * @description [CtScrRelease]管理
 * @company 优创融联科技
 * @createtime:
 */
CtScrReleaseView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CtScrReleaseView.superclass.constructor.call(this, {
							id : 'CtScrReleaseViewWin',
							title : '[CtScrRelease]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'tmpId',
											'话术模板',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
														})
																																			 ]
																				,
																			 								 																																		[
											'scrName',
											'名称',
																								new Ext.form.TextField({name : 'scrName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'scrContent',
											'描述',
																								new Ext.form.TextField({name : 'scrContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'staDat',
											'开始时间',
																								new Ext.form.DateField({hiddenName : 'staDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'endDat',
											'结束时间',
																								new Ext.form.DateField({hiddenName : 'endDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'busiDir',
											'业务方向：呼入、呼出&CT_YWFX',
																																																					new MT.DicComboBox({hiddenName : 'busiDir',itemKey : 'CT_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'userUser',
											'使用用户：用逗号分隔',
																								new Ext.form.TextField({name : 'userUser',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'userUsegroup',
											'使用用户组：用逗号分隔',
																								new Ext.form.TextField({name : 'userUsegroup',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'userSkill',
											'使用人员技能：用逗号分隔',
																								new Ext.form.TextField({name : 'userSkill',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'releaseFilePath',
											'发布文件',
																								new Ext.form.TextField({name : 'releaseFilePath',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'relaseUseId',
											'发布人',
																																																					new MT.DicComboBox({hiddenName : 'relaseUseId',itemKey : 'CT_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'relaseDat',
											'发布日期',
																								new Ext.form.DateField({hiddenName : 'relaseDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'staId',
											'状态：有效、注销&CT_ZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'CT_ZT'})
																																																	 ]
																			 								 							 											]
				var CtScrReleaseAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CtScrRelease]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CtScrReleaseSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_tmpId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_scrName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_scrContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_staDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_endDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_busiDir_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CT_YWFX'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_userUser_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_userUsegroup_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_userSkill_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_releaseFilePath_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_relaseUseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_relaseDat_D_EQ',
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
										handler :function(){ new CtScrReleaseAdvancedSearchWin().show();}
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
									//text : __create+'[CtScrRelease]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CtScrRelease]',
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
					id:'CtScrReleaseGrid',
					url : __ctxPath + "/comtech/listCtScrRelease.do",
					fields : [{
									name : 'scrId',
									type : 'int'
								}
																																																																			,'ctScrRelease'
																																																																								,'scrName'
																																																																								,'scrContent'
																																																																								,'staDat'
																																																																								,'endDat'
																																																																								,'busiDir'
																																																																								,'userUser'
																																																																								,'userUsegroup'
																																																																								,'userSkill'
																																																																								,'releaseFilePath'
																																																																								,'remark'
																																																																								,'relaseUseId'
																																																																								,'relaseDat'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'scrId',
									dataIndex : 'scrId',
									hidden : true
								}
																																																								,{
																	header : '话术模板',
																isExp : false,
																
																    dataIndex : 'tmpId',
								    renderer:function(val){
								    	return val.tmpIdName;
								    }
																}
																																																,{
																	header : '名称',
																isExp : false,
																
																	dataIndex : 'scrName'
																}
																																																,{
																	header : '描述',
																isExp : false,
																
																	dataIndex : 'scrContent'
																}
																																																,{
																	header : '开始时间',
																isExp : false,
																
																	dataIndex : 'staDat'
																}
																																																,{
																	header : '结束时间',
																isExp : false,
																
																	dataIndex : 'endDat'
																}
																																																,{
																	header : '业务方向：呼入、呼出&CT_YWFX',
																isExp : false,
																
																	dataIndex : 'busiDir',
									renderer : function(value) {
										return CT_YWFX.value;
									}
																}
																																																,{
																	header : '使用用户：用逗号分隔',
																isExp : false,
																
																	dataIndex : 'userUser'
																}
																																																,{
																	header : '使用用户组：用逗号分隔',
																isExp : false,
																
																	dataIndex : 'userUsegroup'
																}
																																																,{
																	header : '使用人员技能：用逗号分隔',
																isExp : false,
																
																	dataIndex : 'userSkill'
																}
																																																,{
																	header : '发布文件',
																isExp : false,
																
																	dataIndex : 'releaseFilePath'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '发布人',
																isExp : false,
																
																	dataIndex : 'relaseUseId'
																}
																																																,{
																	header : '发布日期',
																isExp : false,
																
																	dataIndex : 'relaseDat'
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
					new CtScrReleaseForm({scrId:rec.data.scrId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CtScrReleaseForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrReleaseForm');
				if (aForm != null) {
					tabs.remove('CtScrReleaseForm');
				}
				aForm = new CtScrReleaseForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/comtech/multiDelCtScrRelease.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/comtech/multiDelCtScrRelease.do',
					grid:this.gridPanel,
					idName:'scrId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CtScrReleaseForm({
				//	scrId : record.data.scrId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrReleaseForm');
				if (aForm != null) {
					tabs.remove('CtScrReleaseForm');
				}
				aForm = new CtScrReleaseForm({scrId : record.data.scrId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.scrId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
