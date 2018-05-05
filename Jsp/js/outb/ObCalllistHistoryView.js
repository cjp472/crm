/**
 * @author:cf0666@gmail.com
 * @class ObCalllistHistoryView
 * @extends Ext.Panel
 * @description [ObConCalllist]管理
 * @company 优创融联科技
 * @createtime:
 */
ObCalllistHistoryView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ObCalllistHistoryView.superclass.constructor.call(this, {
					id : 'ObCalllistHistoryViewWin',
					title : '分配历史查询',
					region : 'center',
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
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/outb/listcallbatchId.do',
										fields : ['callbatchId',
												'callbatchIdName']
									}),
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
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/outb/listcustomerid.do',
										fields : ['customerid',
												'customeridName']
									}),
							displayField : 'customeridName',
							valueField : 'customerid',
							id : 'customerid'
						})]]
		var ObConCalllistAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '管理员分配高级查询',
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
								html : '批次编号：'

							}, {

								name : 'Q_credNum_S_EQ',
								xtype : 'textfield'
							}, {
								xtype : 'panel',
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '分配人：'

							}, {

								name : 'Q_credNum_S_EQ',
								xtype : 'textfield'
							}, {
								xtype : 'panel',
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '接收人：'

							}, {

								name : 'Q_birthday_S_EQ',
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
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			//rowActions : true,
			printable : false,
			exportable : false,
			id : 'ObConCalllistGrid',
			url : __ctxPath + "/outb/listObConCalllist.do",
			fields : [{
						name : 'cusId',
						type : 'int'
					}, 'obConCalllist', 'busiCode', 'inCustBase', 'nameCn',
					'nameAli', 'cusTypId', 'gender', 'credTypId', 'credNum',
					'credDurDat', 'birthday', 'remark', 'creUseId', 'creDat',
					'updUseId', 'updDat', 'ext1', 'ext2', 'ext3', 'ext4',
					'ext5', 'ext6', 'ext7', 'ext8', 'ext9', 'ext10', 'staId',
					'obConCalllist'],
			columns : [{
						header : 'cusId',
						dataIndex : 'cusId',
						hidden : true
					}, {
						header : '活动主题',
						isExp : false,

						dataIndex : 'callbatchId',
						renderer : function(val) {
							return val.callbatchIdName;
						}
					}, {
						header : '名单',
						isExp : false,

						dataIndex : 'busiCode'
					}, {
						header : '批次',
						isExp : false,

						dataIndex : 'inCustBase',
						renderer : function(value) {
							return CONOB_CON_CALLLIST_SFBDKH.get(value);
						}
					}, {
						header : '分配阶段',
						isExp : false,

						dataIndex : 'nameCn'
					}, {
						header : '分配ID',
						isExp : false,

						dataIndex : 'nameAli'
					}, {
						header : '分配开始时间',
						isExp : false,

						dataIndex : 'cusTypId',
						renderer : function(value) {
							return Cus.get(value);
						}
					}, {
						header : '分配结束时间',
						isExp : false,

						dataIndex : 'gender',
						renderer : function(value) {
							return CONOB_CON_CALLLIST_XB.get(value);
						}
					}, {
						header : '分配人',
						isExp : false,

						dataIndex : 'credTypId',
						renderer : function(value) {
							return CONOB_CON_CALLLIST_ZJLX.get(value);
						}
					}, {
						header : '接收人',
						isExp : false,

						dataIndex : 'credNum'
					}, {
						header : '分配数量',
						isExp : false,

						dataIndex : 'credDurDat'
					}, {
						header : '已回收数量',
						isExp : false,

						dataIndex : 'birthday'
					}, {
						header : '已分配数量',
						isExp : false,

						dataIndex : 'remark'
					}, {
						header : '可回收数量',
						isExp : false,

						dataIndex : 'creUseId'
					}]
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
					new ObConCalllistForm({
								cusId : rec.data.cusId
							}).show();
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
				this.removeRs.call(this, record.data.cusId);
				break;
			case 'btn-confApply-no' :
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCalllistMHuishouFormWin');
				if (aForm != null) {
					tabs.remove('ObCalllistMHuishouFormWin');
				}
				aForm = new ObCalllistMHuishouForm({});
				tabs.add(aForm);
				tabs.activate(aForm);
				break;
			default :
				break;
		}
	}
});
