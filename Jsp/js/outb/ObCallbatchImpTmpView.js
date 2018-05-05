/**
 * @author:cf0666@gmail.com
 * @class ObCallbatchImpTmpView
 * @extends Ext.Panel
 * @description [ObCallbatchImpTmp]管理
 * @company 优创融联科技
 * @createtime:
 */
ObCallbatchImpTmpView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObCallbatchImpTmpView.superclass.constructor.call(this, {
							id : 'ObCallbatchImpTmpViewWin',
							title : '[ObCallbatchImpTmp]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'callbatchId',
											'名单批次内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcallbatchId.do',
															fields : [ 'callbatchId', 'callbatchIdName' ]
														}),
														displayField : 'callbatchIdName',
														valueField : 'callbatchId',
														id : 'callbatchId'
														})
																																			 ]
																				,
																			 								 																																		[
											'cusId',
											'联络名单客户内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcusId.do',
															fields : [ 'cusId', 'cusIdName' ]
														}),
														displayField : 'cusIdName',
														valueField : 'cusId',
														id : 'cusId'
														})
																																			 ]
																				,
																			 								 																																		[
											'inCustBase',
											'是否已绑定客户：生成了客户基础表后回写该字段。0-否，1-是&CONOB_CALLBATCH_IMP_TMP_SFBDKH',
																								new Ext.form.TextField({name : 'inCustBase',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'nameCn',
											'客户名称',
																								new Ext.form.TextField({name : 'nameCn',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'nameAli',
											'简称',
																								new Ext.form.TextField({name : 'nameAli',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'cusTypId',
											'客户类型：个人客户、联系人',
																																																					new MT.DicComboBox({hiddenName : 'cusTypId',itemKey : 'CONOB_CALLBATCH_IMP_TMP_WXYY'})
																																																	 ]
																				,
																			 								 																																		[
											'gender',
											'性别：0-女，1-男&CONOB_CALLBATCH_IMP_TMP_SEX',
																								new Ext.form.TextField({name : 'gender',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'birthday',
											'生日',
																								new Ext.form.TextField({name : 'birthday',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'credTypId',
											'证件类型：0-身份证，1-户口薄&CONOB_CALLBATCH_IMP_TMP_ZJLX',
																																																					new MT.DicComboBox({hiddenName : 'credTypId',itemKey : 'CONOB_CALLBATCH_IMP_TMP_WXYY'})
																																																	 ]
																				,
																			 								 																																		[
											'credNum',
											'证件号码',
																								new Ext.form.TextField({name : 'credNum',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'credDurDat',
											'证件有效期',
																								new Ext.form.DateField({hiddenName : 'credDurDat',format : 'Y-m-d'})
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
											'创建人内码',
																																																					new MT.DicComboBox({hiddenName : 'creUseId',itemKey : 'CONOB_CALLBATCH_IMP_TMP_WXYY'})
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
																																																					new MT.DicComboBox({hiddenName : 'updUseId',itemKey : 'CONOB_CALLBATCH_IMP_TMP_WXYY'})
																																																	 ]
																				,
																			 								 																																		[
											'updDat',
											'修改日期',
																								new Ext.form.DateField({hiddenName : 'updDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ext1',
											'扩展1',
																								new Ext.form.TextField({name : 'ext1',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext2',
											'扩展2',
																								new Ext.form.TextField({name : 'ext2',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext3',
											'扩展3',
																								new Ext.form.TextField({name : 'ext3',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext4',
											'扩展4',
																								new Ext.form.TextField({name : 'ext4',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext5',
											'扩展5',
																								new Ext.form.TextField({name : 'ext5',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext6',
											'扩展6',
																								new Ext.form.TextField({name : 'ext6',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext7',
											'扩展7',
																								new Ext.form.TextField({name : 'ext7',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext8',
											'扩展8',
																								new Ext.form.TextField({name : 'ext8',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext9',
											'扩展9',
																								new Ext.form.TextField({name : 'ext9',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext10',
											'扩展10',
																								new Ext.form.TextField({name : 'ext10',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'staId',
											'状态：0-无效、有效-1&CONOB_CALLBATCH_IMP_TMP_ZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'CONOB_CALLBATCH_IMP_TMP_WXYY'})
																																																	 ]
																				,
																			 								 																																		[
											'inavailableId',
											'无效原因：0-黑名单、1-数据不完整、2-字段格式不正确、3-合并&CONOB_CALLBATCH_IMP_TMP_WXYY',
																																																					new MT.DicComboBox({hiddenName : 'inavailableId',itemKey : 'CONOB_CALLBATCH_IMP_TMP_WXYY'})
																																																	 ]
																			 								 							 											]
				var ObCallbatchImpTmpAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObCallbatchImpTmp]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObCallbatchImpTmpSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_callbatchId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcallbatchId.do',
															fields : [ 'callbatchId', 'callbatchIdName' ]
														}),
														displayField : 'callbatchIdName',
														valueField : 'callbatchId',
														id : 'callbatchId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_cusId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcusId.do',
															fields : [ 'cusId', 'cusIdName' ]
														}),
														displayField : 'cusIdName',
														valueField : 'cusId',
														id : 'cusId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_inCustBase_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_nameCn_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_nameAli_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_cusTypId_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_gender_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_birthday_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_credTypId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_CALLBATCH_IMP_TMP_ZJLX'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_credNum_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_credDurDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																		 										 										{
																																																													
																						
																																				name : 'Q_creUseId_N_EQ',
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
																																																													
																						
																																				name : 'Q_updUseId_N_EQ',
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
																																																													
																						
																																				name : 'Q_ext1_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext2_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext3_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext4_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext5_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext6_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext7_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext8_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext9_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext10_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_staId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_CALLBATCH_IMP_TMP_ZT'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_inavailableId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_CALLBATCH_IMP_TMP_WXYY'
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
										handler :function(){ new ObCallbatchImpTmpAdvancedSearchWin().show();}
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
									//text : __create+'[ObCallbatchImpTmp]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObCallbatchImpTmp]',
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
					id:'ObCallbatchImpTmpGrid',
					url : __ctxPath + "/outb/listObCallbatchImpTmp.do",
					fields : [{
									name : 'tmpCusId',
									type : 'int'
								}
																																																																			,'obCallbatchImpTmp'
																																																																								,'obCallbatchImpTmp'
																																																																								,'inCustBase'
																																																																								,'nameCn'
																																																																								,'nameAli'
																																																																								,'cusTypId'
																																																																								,'gender'
																																																																								,'birthday'
																																																																								,'credTypId'
																																																																								,'credNum'
																																																																								,'credDurDat'
																																																																								,'remark'
																																																																								,'creUseId'
																																																																								,'creDat'
																																																																								,'updUseId'
																																																																								,'updDat'
																																																																								,'ext1'
																																																																								,'ext2'
																																																																								,'ext3'
																																																																								,'ext4'
																																																																								,'ext5'
																																																																								,'ext6'
																																																																								,'ext7'
																																																																								,'ext8'
																																																																								,'ext9'
																																																																								,'ext10'
																																																																								,'staId'
																																																																								,'inavailableId'
																																																],
					columns:[
								{
									header : 'tmpCusId',
									dataIndex : 'tmpCusId',
									hidden : true
								}
																																																								,{
																	header : '名单批次内码',
																isExp : false,
																
																    dataIndex : 'callbatchId',
								    renderer:function(val){
								    	return val.callbatchIdName;
								    }
																}
																																																,{
																	header : '联络名单客户内码',
																isExp : false,
																
																    dataIndex : 'cusId',
								    renderer:function(val){
								    	return val.cusIdName;
								    }
																}
																																																,{
																	header : '是否已绑定客户：生成了客户基础表后回写该字段。0-否，1-是&CONOB_CALLBATCH_IMP_TMP_SFBDKH',
																isExp : false,
																
																	dataIndex : 'inCustBase',
									renderer : function(value) {
										return CONOB_CALLBATCH_IMP_TMP_SFBDKH.get(value);
									}
																}
																																																,{
																	header : '客户名称',
																isExp : false,
																
																	dataIndex : 'nameCn'
																}
																																																,{
																	header : '简称',
																isExp : false,
																
																	dataIndex : 'nameAli'
																}
																																																,{
																	header : '客户类型：个人客户、联系人',
																isExp : false,
																
																	dataIndex : 'cusTypId'
																}
																																																,{
																	header : '性别：0-女，1-男&CONOB_CALLBATCH_IMP_TMP_SEX',
																isExp : false,
																
																	dataIndex : 'gender',
									renderer : function(value) {
										return CONOB_CALLBATCH_IMP_TMP_SEX.get(value);
									}
																}
																																																,{
																	header : '生日',
																isExp : false,
																
																	dataIndex : 'birthday'
																}
																																																,{
																	header : '证件类型：0-身份证，1-户口薄&CONOB_CALLBATCH_IMP_TMP_ZJLX',
																isExp : false,
																
																	dataIndex : 'credTypId',
									renderer : function(value) {
										return CONOB_CALLBATCH_IMP_TMP_ZJLX.get(value);
									}
																}
																																																,{
																	header : '证件号码',
																isExp : false,
																
																	dataIndex : 'credNum'
																}
																																																,{
																	header : '证件有效期',
																isExp : false,
																
																	dataIndex : 'credDurDat'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '创建人内码',
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
																	header : '扩展1',
																isExp : false,
																
																	dataIndex : 'ext1'
																}
																																																,{
																	header : '扩展2',
																isExp : false,
																
																	dataIndex : 'ext2'
																}
																																																,{
																	header : '扩展3',
																isExp : false,
																
																	dataIndex : 'ext3'
																}
																																																,{
																	header : '扩展4',
																isExp : false,
																
																	dataIndex : 'ext4'
																}
																																																,{
																	header : '扩展5',
																isExp : false,
																
																	dataIndex : 'ext5'
																}
																																																,{
																	header : '扩展6',
																isExp : false,
																
																	dataIndex : 'ext6'
																}
																																																,{
																	header : '扩展7',
																isExp : false,
																
																	dataIndex : 'ext7'
																}
																																																,{
																	header : '扩展8',
																isExp : false,
																
																	dataIndex : 'ext8'
																}
																																																,{
																	header : '扩展9',
																isExp : false,
																
																	dataIndex : 'ext9'
																}
																																																,{
																	header : '扩展10',
																isExp : false,
																
																	dataIndex : 'ext10'
																}
																																																,{
																	header : '状态：0-无效、有效-1&CONOB_CALLBATCH_IMP_TMP_ZT',
																isExp : false,
																
																	dataIndex : 'staId',
									renderer : function(value) {
										return CONOB_CALLBATCH_IMP_TMP_ZT.get(value);
									}
																}
																																																,{
																	header : '无效原因：0-黑名单、1-数据不完整、2-字段格式不正确、3-合并&CONOB_CALLBATCH_IMP_TMP_WXYY',
																isExp : false,
																
																	dataIndex : 'inavailableId',
									renderer : function(value) {
										return CONOB_CALLBATCH_IMP_TMP_WXYY.get(value);
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
					new ObCallbatchImpTmpForm({tmpCusId:rec.data.tmpCusId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObCallbatchImpTmpForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchImpTmpForm');
				if (aForm != null) {
					tabs.remove('ObCallbatchImpTmpForm');
				}
				aForm = new ObCallbatchImpTmpForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/outb/multiDelObCallbatchImpTmp.do',
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
					url:__ctxPath + '/outb/multiDelObCallbatchImpTmp.do',
					grid:this.gridPanel,
					idName:'tmpCusId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObCallbatchImpTmpForm({
				//	tmpCusId : record.data.tmpCusId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchImpTmpForm');
				if (aForm != null) {
					tabs.remove('ObCallbatchImpTmpForm');
				}
				aForm = new ObCallbatchImpTmpForm({tmpCusId : record.data.tmpCusId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.tmpCusId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
