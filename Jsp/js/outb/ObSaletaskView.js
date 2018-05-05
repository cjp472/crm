/**
 * @author:cf0666@gmail.com
 * @class ObSaletaskView
 * @extends Ext.Panel
 * @description [ObSaletask]管理
 * @company 优创融联科技
 * @createtime:
 */
ObSaletaskView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObSaletaskView.superclass.constructor.call(this, {
							id : 'ObSaletaskViewWin',
							title : '[ObSaletask]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'tasId',
											'任务内码',
																																																					new Ext.form.NumberField({name : 'tasId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'typId',
											'名单获取方式：0=指定名单 1=取名单池&CONOB_SALETASK_MDHQFS',
																																																					new Ext.form.NumberField({name : 'typId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'cusGrpId',
											'用户组内码：名单池营销必填',
																																																					new Ext.form.NumberField({name : 'cusGrpId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'useId',
											'执行坐席内码：名单营销必填',
																																																					new Ext.form.NumberField({name : 'useId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'cusId',
											'客户内码',
																																																					new Ext.form.NumberField({name : 'cusId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'callbatchAssId',
											'分配历史内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcallbatchAssId.do',
															fields : [ 'callbatchAssId', 'callbatchAssIdName' ]
														}),
														displayField : 'callbatchAssIdName',
														valueField : 'callbatchAssId',
														id : 'callbatchAssId'
														})
																																			 ]
																				,
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
											'callbatchNam',
											'批次名称',
																								new Ext.form.TextField({name : 'callbatchNam',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'calllistId',
											'名单列表内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcalllistId.do',
															fields : [ 'calllistId', 'calllistIdName' ]
														}),
														displayField : 'calllistIdName',
														valueField : 'calllistId',
														id : 'calllistId'
														})
																																			 ]
																				,
																			 								 																																		[
											'calllistNam',
											'名单列表名称',
																								new Ext.form.TextField({name : 'calllistNam',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'comId',
											'外拨活动内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcomId.do',
															fields : [ 'comId', 'comIdName' ]
														}),
														displayField : 'comIdName',
														valueField : 'comId',
														id : 'comId'
														})
																																			 ]
																				,
																			 								 																																		[
											'comNam',
											'活动主题',
																								new Ext.form.TextField({name : 'comNam',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'asgDat',
											'分配时间',
																								new Ext.form.DateField({hiddenName : 'asgDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'booTim',
											'预约时间',
																								new Ext.form.DateField({hiddenName : 'booTim',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'booRemark',
											'预约备注',
																								new Ext.form.TextField({name : 'booRemark',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'diaCou',
											'已外拨次数',
																																																					new Ext.form.NumberField({name : 'diaCou',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'conStaId',
											'拨打结果：拨打结果定义表&CONOB_SALETASK_BDJG',
																																																					new Ext.form.NumberField({name : 'conStaId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'firstDiaDat',
											'首次拨打时间',
																								new Ext.form.DateField({hiddenName : 'firstDiaDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'lastDiaDat',
											'最后拨打时间',
																								new Ext.form.DateField({hiddenName : 'lastDiaDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'des',
											'结果描述',
																								new Ext.form.TextField({name : 'des',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'busiStaId',
											'营销状态：业务自定义回写&CONOB_SALETASK_YXZT',
																																																					new Ext.form.NumberField({name : 'busiStaId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'busiRelId',
											'营销结果：对应生成结果的内码&CONOB_SALETASK_YXJG',
																																																					new Ext.form.NumberField({name : 'busiRelId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'servTypId',
											'服务类型：0-可自定义，1-挽留、2-扣款失败通知等&CONOB_SALETASK_FWLX',
																																																					new Ext.form.NumberField({name : 'servTypId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'servStaId',
											'服务状态：0-处理中、1-已关闭&CONOB_SALETASK_FWZT',
																																																					new Ext.form.NumberField({name : 'servStaId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'taskStaId',
											'任务状态：回收、撤销',
																																																					new Ext.form.NumberField({name : 'taskStaId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var ObSaletaskAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObSaletask]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObSaletaskSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_tasId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_typId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_SALETASK_MDHQFS'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_cusGrpId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_useId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_cusId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_callbatchAssId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcallbatchAssId.do',
															fields : [ 'callbatchAssId', 'callbatchAssIdName' ]
														}),
														displayField : 'callbatchAssIdName',
														valueField : 'callbatchAssId',
														id : 'callbatchAssId'
																																														}
																				,
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
																																																													
																						
																																				name : 'Q_callbatchNam_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_calllistId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcalllistId.do',
															fields : [ 'calllistId', 'calllistIdName' ]
														}),
														displayField : 'calllistIdName',
														valueField : 'calllistId',
														id : 'calllistId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_calllistNam_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_comId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcomId.do',
															fields : [ 'comId', 'comIdName' ]
														}),
														displayField : 'comIdName',
														valueField : 'comId',
														id : 'comId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_comNam_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_asgDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_booTim_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_booRemark_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_diaCou_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_conStaId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_SALETASK_BDJG'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_firstDiaDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_lastDiaDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_des_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_busiStaId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_SALETASK_YXZT'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_busiRelId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_SALETASK_YXJG'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_servTypId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_SALETASK_FWLX'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_servStaId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_SALETASK_FWZT'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_taskStaId_SN_EQ',
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
										handler :function(){ new ObSaletaskAdvancedSearchWin().show();}
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
									//text : __create+'[ObSaletask]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObSaletask]',
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
					id:'ObSaletaskGrid',
					url : __ctxPath + "/outb/listObSaletask.do",
					fields : [{
									name : 'saletaskId',
									type : 'int'
								}
																																																																			,'tasId'
																																																																								,'typId'
																																																																								,'cusGrpId'
																																																																								,'useId'
																																																																								,'cusId'
																																																																								,'obSaletask'
																																																																								,'obSaletask'
																																																																								,'callbatchNam'
																																																																								,'obSaletask'
																																																																								,'calllistNam'
																																																																								,'obSaletask'
																																																																								,'comNam'
																																																																								,'asgDat'
																																																																								,'booTim'
																																																																								,'booRemark'
																																																																								,'diaCou'
																																																																								,'conStaId'
																																																																								,'firstDiaDat'
																																																																								,'lastDiaDat'
																																																																								,'des'
																																																																								,'busiStaId'
																																																																								,'busiRelId'
																																																																								,'servTypId'
																																																																								,'servStaId'
																																																																								,'taskStaId'
																																																],
					columns:[
								{
									header : 'saletaskId',
									dataIndex : 'saletaskId',
									hidden : true
								}
																																																								,{
																	header : '任务内码',
																isExp : false,
																
																	dataIndex : 'tasId'
																}
																																																,{
																	header : '名单获取方式：0=指定名单 1=取名单池&CONOB_SALETASK_MDHQFS',
																isExp : false,
																
																	dataIndex : 'typId',
									renderer : function(value) {
										return CONOB_SALETASK_MDHQFS.get(value);
									}
																}
																																																,{
																	header : '用户组内码：名单池营销必填',
																isExp : false,
																
																	dataIndex : 'cusGrpId'
																}
																																																,{
																	header : '执行坐席内码：名单营销必填',
																isExp : false,
																
																	dataIndex : 'useId'
																}
																																																,{
																	header : '客户内码',
																isExp : false,
																
																	dataIndex : 'cusId'
																}
																																																,{
																	header : '分配历史内码',
																isExp : false,
																
																    dataIndex : 'callbatchAssId',
								    renderer:function(val){
								    	return val.callbatchAssIdName;
								    }
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
																	header : '批次名称',
																isExp : false,
																
																	dataIndex : 'callbatchNam'
																}
																																																,{
																	header : '名单列表内码',
																isExp : false,
																
																    dataIndex : 'calllistId',
								    renderer:function(val){
								    	return val.calllistIdName;
								    }
																}
																																																,{
																	header : '名单列表名称',
																isExp : false,
																
																	dataIndex : 'calllistNam'
																}
																																																,{
																	header : '外拨活动内码',
																isExp : false,
																
																    dataIndex : 'comId',
								    renderer:function(val){
								    	return val.comIdName;
								    }
																}
																																																,{
																	header : '活动主题',
																isExp : false,
																
																	dataIndex : 'comNam'
																}
																																																,{
																	header : '分配时间',
																isExp : false,
																
																	dataIndex : 'asgDat'
																}
																																																,{
																	header : '预约时间',
																isExp : false,
																
																	dataIndex : 'booTim'
																}
																																																,{
																	header : '预约备注',
																isExp : false,
																
																	dataIndex : 'booRemark'
																}
																																																,{
																	header : '已外拨次数',
																isExp : false,
																
																	dataIndex : 'diaCou'
																}
																																																,{
																	header : '拨打结果：拨打结果定义表&CONOB_SALETASK_BDJG',
																isExp : false,
																
																	dataIndex : 'conStaId',
									renderer : function(value) {
										return CONOB_SALETASK_BDJG.get(value);
									}
																}
																																																,{
																	header : '首次拨打时间',
																isExp : false,
																
																	dataIndex : 'firstDiaDat'
																}
																																																,{
																	header : '最后拨打时间',
																isExp : false,
																
																	dataIndex : 'lastDiaDat'
																}
																																																,{
																	header : '结果描述',
																isExp : false,
																
																	dataIndex : 'des'
																}
																																																,{
																	header : '营销状态：业务自定义回写&CONOB_SALETASK_YXZT',
																isExp : false,
																
																	dataIndex : 'busiStaId',
									renderer : function(value) {
										return CONOB_SALETASK_YXZT.get(value);
									}
																}
																																																,{
																	header : '营销结果：对应生成结果的内码&CONOB_SALETASK_YXJG',
																isExp : false,
																
																	dataIndex : 'busiRelId',
									renderer : function(value) {
										return CONOB_SALETASK_YXJG.get(value);
									}
																}
																																																,{
																	header : '服务类型：0-可自定义，1-挽留、2-扣款失败通知等&CONOB_SALETASK_FWLX',
																isExp : false,
																
																	dataIndex : 'servTypId',
									renderer : function(value) {
										return CONOB_SALETASK_FWLX.get(value);
									}
																}
																																																,{
																	header : '服务状态：0-处理中、1-已关闭&CONOB_SALETASK_FWZT',
																isExp : false,
																
																	dataIndex : 'servStaId',
									renderer : function(value) {
										return CONOB_SALETASK_FWZT.get(value);
									}
																}
																																																,{
																	header : '任务状态：回收、撤销',
																isExp : false,
																
																	dataIndex : 'taskStaId'
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
					new ObSaletaskForm({saletaskId:rec.data.saletaskId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObSaletaskForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObSaletaskForm');
				if (aForm != null) {
					tabs.remove('ObSaletaskForm');
				}
				aForm = new ObSaletaskForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/outb/multiDelObSaletask.do',
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
					url:__ctxPath + '/outb/multiDelObSaletask.do',
					grid:this.gridPanel,
					idName:'saletaskId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObSaletaskForm({
				//	saletaskId : record.data.saletaskId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObSaletaskForm');
				if (aForm != null) {
					tabs.remove('ObSaletaskForm');
				}
				aForm = new ObSaletaskForm({saletaskId : record.data.saletaskId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.saletaskId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
