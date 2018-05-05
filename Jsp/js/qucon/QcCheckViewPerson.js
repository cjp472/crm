/**
 * @author:cf0666@gmail.com
 * @class QcCheckViewPerson
 * @extends Ext.Panel
 * @description [QcCheck]管理
 * @company 优创融联科技
 * @createtime:
 */
QcCheckViewPerson = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QcCheckViewPerson.superclass.constructor.call(this, {
					id : 'QcCheckViewPersonWin',
					title : '质检查询',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel] //加左树
/*					items : [this.treePanel, {
						layout : 'border',
						region : 'center',
						items : [this.searchPanel, this.gridPanel]
					}]*/
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['tempReleId', '发布模板', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										// url : __ctxPath
										// + '/qucon/listtempReleId.do',
										fields : ['tempReleId',
												'tempReleIdName']
									}),
							displayField : 'tempReleIdName',
							valueField : 'tempReleId',
							id : 'tempReleId'
						})], ['chkUseId', '考核人', new MT.DicComboBox({
									hiddenName : 'chkUseId',
									itemKey : 'QC_KGZT'
								})], ['toUseId', '被考核人', new MT.DicComboBox({
									hiddenName : 'toUseId',
									itemKey : 'QC_KGZT'
								})],
				['chkTimeSta', '考核时间', new Ext.form.DateField({
									hiddenName : 'chkTimeSta',
									format : 'Y-m-d'
								})],
				['chkTimeEnd', '考核结束时间', new Ext.form.DateField({
									hiddenName : 'chkTimeEnd',
									format : 'Y-m-d'
								})],
				['chkResult', '考核结果(分数)', new MT.DicComboBox({
									hiddenName : 'chkResult',
									itemKey : 'QC_KGZT'
								})],
				['chkSummary', '综合评价', new Ext.form.TextField({
									name : 'chkSummary',
									allowBlank : true
								})],
				['confirmResult', '确认结果:被考核人确认&YorN', new MT.DicComboBox({
									hiddenName : 'confirmResult',
									itemKey : 'QC_KGZT'
								})],
				['confirmRemark', '确认备注', new Ext.form.TextField({
									name : 'confirmRemark',
									allowBlank : true
								})],
				['staId', '考核状态&QC_KGZT', new MT.DicComboBox({
									hiddenName : 'staId',
									itemKey : 'QC_KGZT'
								})]]
		var QcCheckAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '质检高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'QcCheckSearchPanel',
			height : 35,
			items : [{
						border : false,
						width : 70,
						style : 'text-align:right',
						html : '考核人：'

					}, {
						xtype : 'textfield',
						id : 'chkName',
						listeners : {
							focus : function() {
								UserSelector.getView(function(id, name) {
											Ext.getCmp('chkName')
													.setValue(name);
											Ext.getCmp('chkId').setValue(id);
										}, true, false).show();
							}
						}
					}, {
						border : false,
						width : 70,
						style : 'text-align:right',
						html : '被考核人：'
					}, {
						xtype : 'textfield',
						id : 'toName',
						listeners : {
							focus : function() {
								UserSelector.getView(function(id, name) {
											Ext.getCmp('toName').setValue(name);
											Ext.getCmp('toId').setValue(id);
										}, true, false).show();
							}
						}
					}, {
						border : false,
						width : 70,
						style : 'text-align:right',
						html : '考核时间：'
					}, {
						name : 'Q_chkTimeSta_D_EQ',
						xtype : 'datefield',
						format : 'Y-m-d'
					}, {
						border : false,
						width : 20,
						style : 'text-align:center',
						html : '-'

					}, {

						name : 'Q_chkTimeEnd_D_EQ',
						xtype : 'datefield',
						format : 'Y-m-d'
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
							new QcCheckAdvancedSearchWin().show();
						}
					}, {
						name : 'Q_chkUseId_L_EQ',
						xtype : 'hidden',
						id : 'chkId'
					}, {
						name : 'Q_toUseId_L_EQ',
						xtype : 'hidden',
						id : 'toId'
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
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'QcCheckGrid',
//			 tbar : ['->',{
//			 iconCls : 'btn-readdocument',
//			 text : '查看',
//			 handler : function() {
//			 var tabs = Ext.getCmp('centerTabPanel');
//			 var aForm = Ext.getCmp('QCAuditForm');
//			 if (aForm != null) {
//			 tabs.remove('QCAuditForm');
//			 }
//			 aForm = new QCAuditForm();
//			 tabs.add(aForm);
//			 tabs.activate(aForm);
//			 }
//			 }, {
//			 iconCls : 'btn-operation',
//			 text : '辅导',
//			 handler : function() {
//			 var tabs = Ext.getCmp('centerTabPanel');
//			 var aForm = Ext.getCmp('QcHelpFuDaoForm');
//			 if (aForm != null) {
//			 tabs.remove('QcHelpFuDaoForm');
//			 }
//			 aForm = new QcHelpFuDaoForm();
//			 tabs.add(aForm);
//			 tabs.activate(aForm);
//			 }
//			 }, {
//			 iconCls : 'btn-search',
//			 text : '查看辅导',
//			 handler : function() {
//			 var tabs = Ext.getCmp('centerTabPanel');
//			 var aForm = Ext.getCmp('QcHelpForm');
//			 if (aForm != null) {
//			 tabs.remove('QcHelpForm');
//			 }
//			 aForm = new QcHelpForm();
//			 tabs.add(aForm);
//			 tabs.activate(aForm);
//			 }
//			 }],
			url : __ctxPath + "/qucon/listQcCheck.do",
			fields : [{
						name : 'chkId',
						type : 'int'
					}, 'qcCheck', 'chkUseId', 'toUseId', 'chkTimeSta',
					'chkTimeEnd', 'chkResult', 'chkSummary', 'confirmResult',
					'confirmRemark', 'staId', 'chkUserName', 'toUserName'],
			columns : [{
						header : 'chkId',
						dataIndex : 'chkId',
						hidden : true
					}, {
						header : '考核人',
						isExp : false,
						dataIndex : 'chkUserName'
					}, {
						header : '被考核人',
						isExp : false,
						dataIndex : 'toUserName'
					}, {
						header : '考核时间',
						isExp : false,
						dataIndex : 'chkTimeSta'
					}, {
						header : '考核完成时间',
						isExp : false,
						dataIndex : 'chkTimeEnd'
					}, {
						header : '考核分数',
						isExp : false,
						dataIndex : 'chkResult'
					}, /*{
						header : '考核状态',
						isExp : false,

						dataIndex : 'staId',
						renderer : function(value) {
							return QC_KGZT.value;
						}
					}, */
					{
						header : '考核状态',
						isExp : false,
						dataIndex : 'staId',
						renderer : function(value) {
							return QC_KGZT.get(value);
						}
					}, 
					new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-ok',     //by KYQ 
											qtip : '确认',
											style : 'margin:0 3px 0 3px',
											fn:function(record){
												var status = record.get('staId');
												if(status=='1'||status=='4'){
													return true;
												}else{
													return false;
												}
											}
										},{
											iconCls : 'btn-mail_reply',     //by KYQ 
											qtip : '对己考评确认',
											style : 'margin:0 3px 0 3px',
											fn:function(record){
												var status = record.get('staId');
												if(status=='2'){
													return true;
												}else{
													return false;
												}
											}
										},/*{
											iconCls : 'btn-back',     //by KYQ 
											qtip : '驳回',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
													var status = record.get('staId');
													if (status == '2') {
														return true;
													} else {
														return false;
													}
												}
										},*/{
											iconCls : 'btn-readdocument',
											qtip : '查看',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-operation',
											qtip : '辅导',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-search',
											qtip : '查看辅导',
											style : 'margin:0 3px 0 3px'
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
					new QcCheckForm({
								chkId : rec.data.chkId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new QcCheckForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcCheckForm');
		if (aForm != null) {
			tabs.remove('QcCheckForm');
		}
		aForm = new QcCheckForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/qucon/multiDelQcCheck.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/qucon/multiDelQcCheck.do',
					grid : this.gridPanel,
					idName : 'chkId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new QcCheckForm({
		// chkId : record.data.chkId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcCheckForm');
		if (aForm != null) {
			tabs.remove('QcCheckForm');
		}
		aForm = new QcCheckForm({
					chkId : record.data.chkId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
		//by KYQ
			case 'btn-ok' :
				this.approvedOk.call(this, record.data.chkId);
				break;
			case 'btn-mail_reply' :
				this.approvedHadOk.call(this, record.data.chkId);
				break;
			/*case 'btn-back':
				this.approvedReject.call(this,record.data.chkId);
				break;*/
			/*case 'btn-readdocument' : 
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QCAuditForm');
				if (aForm != null) {
					tabs.remove('QCAuditForm');
				}
				aForm = new QCAuditForm();
				tabs.add(aForm);
				tabs.activate(aForm);
				break;*/
				/*
// GridPanel行点击处理事件
		rowClick : function(grid, rowindex, e) {
			grid.getSelectionModel().each(function(rec) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcCheckForm');
				if (aForm != null) {
					tabs.remove('QcCheckForm');
				}
				aForm = new QcCheckForm({
					chkId : rec.data.chkId
				});
				tabs.add(aForm);
				tabs.activate(aForm);
			})
		},
		
		//record.data.chkId
*/
			case 'btn-readdocument' : //查看
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcCheckForm');
				if (aForm != null) {
					tabs.remove('QcCheckForm');
				}
				aForm = new QcCheckForm({
					chkId : record.data.chkId
				});
				tabs.add(aForm);
				tabs.activate(aForm);
				break;
			case 'btn-operation' :  //辅导
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcHelpFuDaoForm');
				if (aForm != null) {
					tabs.remove('QcHelpFuDaoForm');
				}
				aForm = new QcHelpFuDaoForm();
				tabs.add(aForm);//查看辅导
				tabs.activate(aForm);
				break;
			case 'btn-search' :  
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcHelpForm');
				if (aForm != null) {
					tabs.remove('QcHelpForm');
				}
				aForm = new QcHelpForm();
				tabs.add(aForm);
				tabs.activate(aForm);
				break;
			
			default :
				break;
		}
	},
	//考评中
		approvedOk : function(staId) {	
	//    alert(staId);
		var actionText = '你确定要考评吗';
		var actionUrl = '/qucon/approvedOkQcCheck.do';
		Ext.Msg.confirm(__toastMessage, actionText, function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath + actionUrl + '?chkId=' + staId,
					success : function(result, request) {
						var res = Ext.util.JSON.decode(result.responseText);
						if (res.success == false) {
							Ext.ux.Toast.msg('操作信息', res.message);
						} else {
							Ext.ux.Toast.msg('操作信息', __operationsuccess);
						}
						Ext.getCmp('QcCheckGrid').getStore().reload();
					},
					failure : function(result, request) {
					}
					});
			}
			})
		},
	//驳回 Reject
	/*approvedReject:function(staId) {	
		Ext.Msg.alert('！','进入function方法！');
		var actionText = '你确定要驳回吗';
		var actionUrl = '/qucon/approvedRejectQcCheck.do';
		Ext.Msg.confirm(__toastMessage, actionText, function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath + actionUrl + '?chkId=' + staId,
					success : function(result, request) {
						var res = Ext.util.JSON.decode(result.responseText);
						if (res.success == false) {
							Ext.ux.Toast.msg('操作信息', res.message);
						} else {
							Ext.ux.Toast.msg('操作信息', __operationsuccess);
						}
						Ext.getCmp('QcCheckGrid').getStore().reload();
					},
					failure : function(result, request) {
					}
				});
			}
			})
		},*/
		//确认己考评
		approvedHadOk:function(staId) {
//			alert(staId);
			var actionText = "对己考评确认吗";
			var actionUrl = '/qucon/approvedHadOkQcCheck.do';
			Ext.Msg.confirm(__toastMessage, actionText, function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : __ctxPath + actionUrl + '?chkId=' + staId,
						success : function(result, request) {
							var res = Ext.util.JSON.decode(result.responseText);
							if (res.success == false) {
								Ext.ux.Toast.msg('操作信息', res.message);
							} else {
								Ext.ux.Toast.msg('操作信息', __operationsuccess);
							}
							Ext.getCmp('QcCheckGrid').getStore().reload();
						},
						failure : function(result, request) {
						}
					});
				}
			})
		}
});
