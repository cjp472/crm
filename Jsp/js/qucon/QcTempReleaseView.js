/**
 * @author:cf0666@gmail.com
 * @class QcTempReleaseView
 * @extends Ext.Panel
 * @description [QcTempRelease]管理
 * @company 优创融联科技
 * @createtime:
 */
QcTempReleaseView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcTempReleaseView.superclass.constructor.call(this, {
							id : 'QcTempReleaseViewWin',
							title : '[QcTempRelease]管理',
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
											'模板ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
														})
																																			 ]
																				,
																			 								 																																		[
											'chkChannel',
											'考核渠道&CONLYLB',
																																																					new MT.DicComboBox({hiddenName : 'chkChannel',itemKey : 'QC_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'releName',
											'名称',
																								new Ext.form.TextField({name : 'releName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'releContent',
											'描述',
																								new Ext.form.TextField({name : 'releContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'chkTypeId',
											'考评方式&QC_PFFS',
																																																					new MT.DicComboBox({hiddenName : 'chkTypeId',itemKey : 'QC_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'allowRemark',
											'是否允许填写备注&YorN',
																																																					new MT.DicComboBox({hiddenName : 'allowRemark',itemKey : 'QC_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'allowRecheck',
											'是否允许复议&YorN',
																																																					new MT.DicComboBox({hiddenName : 'allowRecheck',itemKey : 'QC_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'baseScore',
											'基础分',
																																																					new MT.DicComboBox({hiddenName : 'baseScore',itemKey : 'QC_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'minScore',
											'最低分',
																																																					new MT.DicComboBox({hiddenName : 'minScore',itemKey : 'QC_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'maxScore',
											'最高分',
																																																					new MT.DicComboBox({hiddenName : 'maxScore',itemKey : 'QC_ZT'})
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
											'发布人ID',
																																																					new MT.DicComboBox({hiddenName : 'relaseUseId',itemKey : 'QC_ZT'})
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
											'状态：有效、注销&QC_ZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'QC_ZT'})
																																																	 ]
																			 								 							 											]
				var QcTempReleaseAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcTempRelease]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcTempReleaseSearchPanel',
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
															url : __ctxPath + '/qucon/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_chkChannel_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONLYLB'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_releName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_releContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_chkTypeId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'QC_PFFS'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_allowRemark_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'YorN'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_allowRecheck_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'YorN'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_baseScore_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_minScore_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_maxScore_S_EQ',
																																																																													xtype:'numberfield'
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
															itemKey : 'QC_ZT'
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
										handler :function(){ new QcTempReleaseAdvancedSearchWin().show();}
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
									//text : __create+'[QcTempRelease]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcTempRelease]',
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
					id:'QcTempReleaseGrid',
					url : __ctxPath + "/qucon/listQcTempRelease.do",
					fields : [{
									name : 'tempReleId',
									type : 'int'
								}
																																																																			,'qcTempRelease'
																																																																								,'chkChannel'
																																																																								,'releName'
																																																																								,'releContent'
																																																																								,'chkTypeId'
																																																																								,'allowRemark'
																																																																								,'allowRecheck'
																																																																								,'baseScore'
																																																																								,'minScore'
																																																																								,'maxScore'
																																																																								,'staDat'
																																																																								,'endDat'
																																																																								,'releaseFilePath'
																																																																								,'remark'
																																																																								,'relaseUseId'
																																																																								,'relaseDat'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'tempReleId',
									dataIndex : 'tempReleId',
									hidden : true
								}
																																																								,{
																	header : '模板ID',
																isExp : false,
																
																    dataIndex : 'tmpId',
								    renderer:function(val){
								    	return val.tmpIdName;
								    }
																}
																																																,{
																	header : '考核渠道&CONLYLB',
																isExp : false,
																
																	dataIndex : 'chkChannel',
									renderer : function(value) {
										return CONLYLB.value;
									}
																}
																																																,{
																	header : '名称',
																isExp : false,
																
																	dataIndex : 'releName'
																}
																																																,{
																	header : '描述',
																isExp : false,
																
																	dataIndex : 'releContent'
																}
																																																,{
																	header : '考评方式&QC_PFFS',
																isExp : false,
																
																	dataIndex : 'chkTypeId',
									renderer : function(value) {
										return QC_PFFS.value;
									}
																}
																																																,{
																	header : '是否允许填写备注&YorN',
																isExp : false,
																
																	dataIndex : 'allowRemark',
									renderer : function(value) {
										return YorN.value;
									}
																}
																																																,{
																	header : '是否允许复议&YorN',
																isExp : false,
																
																	dataIndex : 'allowRecheck',
									renderer : function(value) {
										return YorN.value;
									}
																}
																																																,{
																	header : '基础分',
																isExp : false,
																
																	dataIndex : 'baseScore'
																}
																																																,{
																	header : '最低分',
																isExp : false,
																
																	dataIndex : 'minScore'
																}
																																																,{
																	header : '最高分',
																isExp : false,
																
																	dataIndex : 'maxScore'
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
																	header : '状态：有效、注销&QC_ZT',
																isExp : false,
																
																	dataIndex : 'staId',
									renderer : function(value) {
										return QC_ZT.value;
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
					new QcTempReleaseForm({tempReleId:rec.data.tempReleId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcTempReleaseForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcTempReleaseForm');
				if (aForm != null) {
					tabs.remove('QcTempReleaseForm');
				}
				aForm = new QcTempReleaseForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/qucon/multiDelQcTempRelease.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/qucon/multiDelQcTempRelease.do',
					grid:this.gridPanel,
					idName:'tempReleId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcTempReleaseForm({
				//	tempReleId : record.data.tempReleId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcTempReleaseForm');
				if (aForm != null) {
					tabs.remove('QcTempReleaseForm');
				}
				aForm = new QcTempReleaseForm({tempReleId : record.data.tempReleId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.tempReleId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
