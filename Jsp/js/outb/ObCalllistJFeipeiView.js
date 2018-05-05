/**
 * @author:cf0666@gmail.com
 * @class ObCalllistJFeipeiView
 * @extends Ext.Panel
 * @description [ObConCalllist]管理
 * @company 优创融联科技
 * @createtime:
 */
ObCalllistJFeipeiView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ObCalllistJFeipeiView.superclass.constructor.call(this, {
					id : 'ObCalllistJFeipeiView Win',
					title : '经理分配管理',
					region : 'center',
					iconCls:'menu-arch-dispatch',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['callbatchId', '名单批次内码', new Ext.form.ComboBox({
									editabel : false,
									lazyInit : false,
									triggerAction : 'all',
									// store : new Ext.data.SimpleStore(
									// {
									// autoLoad : true,
									// url : __ctxPath +
									// '/outb/listcallbatchId.do',
									// fields : [
									// 'callbatchId',
									// 'callbatchIdName' ]
									// }),
									displayField : 'callbatchIdName',
									valueField : 'callbatchId',
									id : 'callbatchId'
								})],
				['busiCode', '业务编码', new Ext.form.TextField({
									name : 'busiCode',
									allowBlank : true
								})],
				[
						'inCustBase',
						'是否已绑定客户：生成了客户基础表后回写该字段。0-否，1-是&CONOB_CON_CALLLIST_SFBDKH',
						new Ext.form.TextField({
									name : 'inCustBase',
									allowBlank : true
								})],
				['nameCn', '客户名称', new Ext.form.TextField({
									name : 'nameCn',
									allowBlank : true
								})],
				['nameAli', '简称', new Ext.form.TextField({
									name : 'nameAli',
									allowBlank : true
								})],
				['cusTypId', '客户类型：个人客户、联系人&Cus', new Ext.form.NumberField({
									name : 'cusTypId',
									allowBlank : true
								})],
				['gender', '性别：0-女，1-男&CONOB_CON_CALLLIST_XB',
						new Ext.form.TextField({
									name : 'gender',
									allowBlank : true
								})],
				['credTypId', '证件类型：0-身份证，1-户口薄&CONOB_CON_CALLLIST_ZJLX',
						new Ext.form.NumberField({
									name : 'credTypId',
									allowBlank : true
								})],
				['credNum', '证件号码', new Ext.form.TextField({
									name : 'credNum',
									allowBlank : true
								})],
				['credDurDat', '证件有效期', new Ext.form.DateField({
									hiddenName : 'credDurDat',
									format : 'Y-m-d'
								})],
				['birthday', '生日', new Ext.form.TextField({
									name : 'birthday',
									allowBlank : true
								})],
				['remark', '备注', new Ext.form.TextField({
									name : 'remark',
									allowBlank : true
								})],
				['creUseId', '创建人内码', new Ext.form.NumberField({
									name : 'creUseId',
									allowBlank : true
								})],
				['creDat', '创建日期', new Ext.form.DateField({
									hiddenName : 'creDat',
									format : 'Y-m-d'
								})],
				['updUseId', '修改人', new Ext.form.NumberField({
									name : 'updUseId',
									allowBlank : true
								})],
				['updDat', '修改日期', new Ext.form.DateField({
									hiddenName : 'updDat',
									format : 'Y-m-d'
								})],
				['ext1', '扩展1', new Ext.form.TextField({
									name : 'ext1',
									allowBlank : true
								})],
				['ext2', '扩展2', new Ext.form.TextField({
									name : 'ext2',
									allowBlank : true
								})],
				['ext3', '扩展3', new Ext.form.TextField({
									name : 'ext3',
									allowBlank : true
								})],
				['ext4', '扩展4', new Ext.form.TextField({
									name : 'ext4',
									allowBlank : true
								})],
				['ext5', '扩展5', new Ext.form.TextField({
									name : 'ext5',
									allowBlank : true
								})],
				['ext6', '扩展6', new Ext.form.TextField({
									name : 'ext6',
									allowBlank : true
								})],
				['ext7', '扩展7', new Ext.form.TextField({
									name : 'ext7',
									allowBlank : true
								})],
				['ext8', '扩展8', new Ext.form.TextField({
									name : 'ext8',
									allowBlank : true
								})],
				['ext9', '扩展9', new Ext.form.TextField({
									name : 'ext9',
									allowBlank : true
								})],
				['ext10', '扩展10', new Ext.form.TextField({
									name : 'ext10',
									allowBlank : true
								})],
				['staId', '状态：0-无效、有效-1&CONOB_CON_CALLLIST_ZT',
						new Ext.form.NumberField({
									name : 'staId',
									allowBlank : true
								})],
				['customerid', '客户内码', new Ext.form.ComboBox({
									editabel : false,
									lazyInit : false,
									triggerAction : 'all',
									// store : new Ext.data.SimpleStore(
									// {
									// autoLoad : true,
									// url : __ctxPath +
									// '/outb/listcustomerid.do',
									// fields : [
									// 'customerid',
									// 'customeridName' ]
									// }),
									displayField : 'customeridName',
									valueField : 'customerid',
									id : 'customerid'
								})]]
		var ObConCalllistAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '经理分配高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'ObConCalllistSearchPanel',
					height : 35,
					items : [{
								xtype : 'panel',
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '批次名称：'

							}, {

								name : 'Q_obCallbatch.callbatchNam_S_LK',
								xtype : 'textfield'
							},
//							{
//								xtype : 'panel',
//								border : false,
//								width : 70,
//								style : 'text-align:right',
//								html : '分配人：'
//
//							}, {
//
//								name : 'Q_fromAppUser.employeeid_S_LK',
//								xtype : 'textfield'
//							}, 
								{
								xtype : 'panel',
								border : false,
								width : 90,
								style : 'text-align:right',
								html : '接收人(工号)：'

							}, {

								name : 'Q_toAppUser.employeeid_S_LK',
								xtype : 'textfield'
							}, {
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
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ObConCalllistAdvancedSearchWin().show();
								}
							}],
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

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			//tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			//lazyLoad:true,
//			groupByColumn : 'staDat',
//			countColumn : ['assignCount', 'retriveCount','assignedCount','canReceiveCount'],
//			inputColumn : 'callbatchAssId',
//			returnColum : 'callbatchAssIds',			
			id : 'ObCallbatchAssGridJL',
			url : __ctxPath + "/outb/assign2ListObCallbatchAss.do?retriveIndex=0",
			fields : [{
						name : 'callbatchAssId',
						type : 'int'
					}, 'callbatchAssId','obCom','obCalllist','obCallbatch','assStepId','staDat','fromAppUser', 'toAppUser','assignCount','holdCount', 'retriveCount', 'holdCount', 'canReceiveCount','assignedCount'
					//'parentCallbatchAssId', 'callbatchAssIds','obCallbatchAss', 'assTypId',  'endDat','obCallbatchCuss', 'obSaletasks','callbatchAssId','obCallbatch.callbatchId','appUser'
					],
			columns : [{
						header : 'callbatchAssId',
						dataIndex : 'callbatchAssId',
						hidden : true
					}, {
						header : '活动主题',
						isExp : false,

						dataIndex : 'obCom',
						renderer : function(val) {
							return val.obComNam;
						}
					}, {
						header : '呼叫名单',
						isExp : false,
						dataIndex : 'obCalllist',
						renderer : function(val) {
							return val.calllistNam;
						}
						//										
				}	, {
						header : '批次',
						isExp : false,

						dataIndex : 'obCallbatch',
						renderer : function(value) {
							return value.callbatchNam;
						}
						
					}, {
						header : '分配阶段',
						isExp : false,
						dataIndex : 'assStepId',
						renderer : function(value) {
							return CONOB_CALLBATCH_ASS_JD.get(value);
						}
					}, {
						header : '分配时间',
						isExp : false,
                        format : 'Y-m-d',
						dataIndex : 'staDat'
						// renderer : function(value) {
					// return Cus.get(value);
					// }
				}, {
						header : '分配人',
						isExp : false,

						dataIndex : 'fromAppUser',
						renderer : function(value) {
							if(value.ulEmployee!=null&&value.ulEmployee!=undefined) {
							    return value.fullname+'('+value.ulEmployee.userNo+')';
							} else {
								return value.fullname;
							}
							//
						}
				}	, {
						header : '接收人',
						isExp : false,
                        //hidden:true,
						dataIndex : 'toAppUser',
						renderer : function(value) {
							return value.fullname+'('+value.ulEmployee.userNo+')';
						}
					}, {
						header : '分配数量',
						isExp : false,

						dataIndex : 'assignCount'
					}, {
						header : '可分配数量',
						isExp : false,
						dataIndex : 'holdCount'
					}, {
						header : '已回收数量',
						isExp : false,

						dataIndex : 'retriveCount'
					}, {
						header : '已分配数量',
						isExp : false,

						dataIndex : 'assignedCount'
					}, {
						header : '可回收数量',
						isExp : false,

						dataIndex : 'canReceiveCount'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-readdocument',
											qtip : '查看',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-mail_move',
											qtip : '分配',
											style : 'margin:0 3px 0 3px'
											,fn : function(record) {
												var assStepId = record.data.assStepId;
												if (assStepId == 0) {
													return true;
												} else {
													return false;
												}
											}											
										}, {
											iconCls : 'btn-confApply-no',
											qtip : '回收',
											style : 'margin:0 3px 0 3px'
											,fn : function(record) {
												var assStepId = record.data.assStepId;
												if (assStepId == 1) {
													return true;
												} else {
													return false;
												}
											}
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		$search({
				searchPanel : this.searchPanel,
				gridPanel : this.gridPanel
			});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCalllistMFormWin');
				if (aForm != null) {
					tabs.remove('ObCalllistMFormWin');
				}
				aForm = new ObCalllistMForm({
					callbatchAssIds : rec.data.callbatchAssId+'',
					assignCounts : rec.data.assignCount,
					holdCounts : rec.data.canReceiveCount,
					retriveCounts : rec.data.retriveCount,
					index:1,        //为1时--子级
					type:1,
					retriveIndex:1,  //经理级别回收
					parentFlag:1					
				});
				tabs.add(aForm);
				tabs.activate(aForm);
		});
	},
	// 创建记录
	createRs : function() {
		// new ObConCalllistForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ObConCalllistForm');
		if (aForm != null) {
			tabs.remove('ObConCalllistForm');
		}
		aForm = new ObConCalllistForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/outb/multiDelObConCalllist.do',
					ids : id,
					grid : this.gridPanel,
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$gridRs({
					url : __ctxPath + '/outb/multiDelObConCalllist.do',
					grid : this.gridPanel,
					idName : 'cusId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new ObConCalllistForm({
		// cusId : record.data.cusId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ObConCalllistForm');
		if (aForm != null) {
			tabs.remove('ObConCalllistForm');
		}
		aForm = new ObConCalllistForm({
					cusId : record.data.cusId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-mail_move' :
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCalllistJFeipeiFormWin');
				if (aForm != null) {
					tabs.remove('ObCalllistJFeipeiFormWin');
				}
				aForm = new ObCalllistJFeipeiForm({
				    callbatchAssId:record.data.callbatchAssId,
				    holdCount:record.data.holdCount,
				    callbatchId:record.data.obCallbatch.callbatchId,
				    comId:record.data.obCom.comId
				    
				});
				tabs.add(aForm);
				tabs.activate(aForm);
				break;
			case 'btn-confApply-no' :
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCalllistMHuishouFormWin');
				if (aForm != null) {
					tabs.remove('ObCalllistMHuishouFormWin');
				}
				aForm = new ObCalllistMHuishouForm();
				tabs.add(aForm);
				tabs.activate(aForm);
				break;
			case 'btn-readdocument' :
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCalllistMFormWin');
				if (aForm != null) {
					tabs.remove('ObCalllistMFormWin');
				}
				aForm = new ObCalllistMForm({
					callbatchAssIds : record.data.callbatchAssId+'',
					assignCounts : record.data.assignCount,
					holdCounts : record.data.canReceiveCount,
					retriveCounts : record.data.retriveCount,
					index:1,        //为1时--子级
					type:1,
					retriveIndex:1,  //经理级别回收
					parentFlag:1
				});
				tabs.add(aForm);
				tabs.activate(aForm);
				break;
			default :
				break;
		}
	}
});
