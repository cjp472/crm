/**
 * @author:cf0666@gmail.com
 * @class PapReleaseView
 * @extends Ext.Panel
 * @description [PapRelease]管理
 * @company 优创融联科技
 * @createtime:
 */
PapReleaseView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				PapReleaseView.superclass.constructor.call(this, {
							id : 'PapReleaseViewWin',
							title : '[PapRelease]管理',
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
											'问卷模板ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/pap/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
														})
																																			 ]
																				,
																			 								 																																		[
											'relChannel',
											'发布渠道：网站、呼叫中心&PAP_FBQD',
																																																					new MT.DicComboBox({hiddenName : 'relChannel',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'papName',
											'名称',
																								new Ext.form.TextField({name : 'papName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'papContent',
											'描述',
																								new Ext.form.TextField({name : 'papContent',allowBlank:true})
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
											'业务方向：呼入、呼出&PAP_YWFX',
																																																					new MT.DicComboBox({hiddenName : 'busiDir',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'releaseFilePath',
											'发布文件',
																								new Ext.form.TextField({name : 'releaseFilePath',allowBlank:true})
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
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'relaseUseId',
											'发布人ID',
																																																					new MT.DicComboBox({hiddenName : 'relaseUseId',itemKey : 'PAP_ZT'})
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
											'状态：有效、注销&PAP_ZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'PAP_ZT'})
																																																	 ]
																			 								 							 											]
				var PapReleaseAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[PapRelease]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'PapReleaseSearchPanel',
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
															url : __ctxPath + '/pap/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_relChannel_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'PAP_FBQD'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_papName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_papContent_S_EQ',
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
															itemKey : 'PAP_YWFX'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_releaseFilePath_S_EQ',
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
										handler :function(){ new PapReleaseAdvancedSearchWin().show();}
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
									//text : __create+'[PapRelease]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[PapRelease]',
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
					id:'PapReleaseGrid',
					url : __ctxPath + "/pap/listPapRelease.do",
					fields : [{
									name : 'papId',
									type : 'int'
								}
																																																																			,'papRelease'
																																																																								,'relChannel'
																																																																								,'papName'
																																																																								,'papContent'
																																																																								,'staDat'
																																																																								,'endDat'
																																																																								,'busiDir'
																																																																								,'releaseFilePath'
																																																																								,'applyAnsNo'
																																																																								,'needPassChk'
																																																																								,'applyAnsMuti'
																																																																								,'applyViewRes'
																																																																								,'displayGuide'
																																																																								,'remark'
																																																																								,'relaseUseId'
																																																																								,'relaseDat'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'papId',
									dataIndex : 'papId',
									hidden : true
								}
																																																								,{
																	header : '问卷模板ID',
																isExp : false,
																
																    dataIndex : 'tmpId',
								    renderer:function(val){
								    	return val.tmpIdName;
								    }
																}
																																																,{
																	header : '发布渠道：网站、呼叫中心&PAP_FBQD',
																isExp : false,
																
																	dataIndex : 'relChannel',
									renderer : function(value) {
										return PAP_FBQD.value;
									}
																}
																																																,{
																	header : '名称',
																isExp : false,
																
																	dataIndex : 'papName'
																}
																																																,{
																	header : '描述',
																isExp : false,
																
																	dataIndex : 'papContent'
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
																	header : '业务方向：呼入、呼出&PAP_YWFX',
																isExp : false,
																
																	dataIndex : 'busiDir',
									renderer : function(value) {
										return PAP_YWFX.value;
									}
																}
																																																,{
																	header : '发布文件',
																isExp : false,
																
																	dataIndex : 'releaseFilePath'
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
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '发布人ID',
																isExp : false,
																
																	dataIndex : 'relaseUseId'
																}
																																																,{
																	header : '发布日期',
																isExp : false,
																
																	dataIndex : 'relaseDat'
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
					new PapReleaseForm({papId:rec.data.papId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new PapReleaseForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('PapReleaseForm');
				if (aForm != null) {
					tabs.remove('PapReleaseForm');
				}
				aForm = new PapReleaseForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/pap/multiDelPapRelease.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/pap/multiDelPapRelease.do',
					grid:this.gridPanel,
					idName:'papId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new PapReleaseForm({
				//	papId : record.data.papId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('PapReleaseForm');
				if (aForm != null) {
					tabs.remove('PapReleaseForm');
				}
				aForm = new PapReleaseForm({papId : record.data.papId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.papId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
