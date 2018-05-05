/**
 * @author:cf0666@gmail.com
 * @class QCReviewView
 * @extends Ext.Panel
 * @description [ConHis]管理
 * @company 优创融联科技
 * @createtime:
 */
QCReviewView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QCReviewView.superclass.constructor.call(this, {
					id : 'QCReviewViewWin',
					title : '质检考核',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['customerid', '客户ID', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/customer/listCustomer.do',
										fields : ['customerid',
												'customeridName']
									}),
							displayField : 'customeridName',
							valueField : 'customerid',
							id : 'customerid'
						})],
				['contactorId', '联系人ID', new Ext.form.ComboBox({
					editabel : false,
					lazyInit : false,
					triggerAction : 'all',
					store : new Ext.data.SimpleStore({
								autoLoad : true,
								url : __ctxPath + '/customer/listCusLinkman.do',
								fields : ['contactorId', 'contactorIdName']
							}),
					displayField : 'contactorIdName',
					valueField : 'contactorId',
					id : 'contactorId'
				})], ['srcTypeId', '来源类别&CONLYLB', new MT.DicComboBox({
									hiddenName : 'srcTypeId',
									itemKey : 'CONZT'
								})], 
			  ['dirId', '方向&CONFX', new MT.DicComboBox({
									hiddenName : 'dirId',
									itemKey : 'CONZT'
								})],
				['contactTypeId', '联系类型&LXFS001', new MT.DicComboBox({
									hiddenName : 'contactTypeId',
									itemKey : 'CONZT'
								})],
				['preContactNum', '区号/地区号', new Ext.form.TextField({
									name : 'preContactNum',
									allowBlank : true
								})],
				['mainContactNum', '号码/详细地址', new Ext.form.TextField({
									name : 'mainContactNum',
									allowBlank : true
								})],
				['lastContactNum', '分机号/邮编', new Ext.form.TextField({
									name : 'lastContactNum',
									allowBlank : true
								})],
				['staTime', '开始时间', new Ext.form.DateField({
									hiddenName : 'staTime',
									format : 'Y-m-d'
								})],
				['endTime', '结束时间', new Ext.form.DateField({
									hiddenName : 'endTime',
									format : 'Y-m-d'
								})],
				['busTypId', '联络事项&CONLLSX', new MT.DicComboBox({
									hiddenName : 'busTypId',
									itemKey : 'CONZT'
								})],
				['conResId', '联络结果&CONLLJG', new MT.DicComboBox({
									hiddenName : 'conResId',
									itemKey : 'CONZT'
								})],
				['conResRemarks', '联络结果备注', new Ext.form.TextField({
									name : 'conResRemarks',
									allowBlank : true
								})],
				['content', '联络内容', new Ext.form.TextField({
									name : 'content',
									allowBlank : true
								})],
				['dealStaId', '处理状态&CONCLZT', new MT.DicComboBox({
									hiddenName : 'dealStaId',
									itemKey : 'CONZT'
								})], ['remarks', '备注', new Ext.form.TextField({
									name : 'remarks',
									allowBlank : true
								})], ['ownerId', '负责人', new MT.DicComboBox({
									hiddenName : 'ownerId',
									itemKey : 'CONZT'
								})],
				['statusId', '状态&CONZT', new MT.DicComboBox({
									hiddenName : 'statusId',
									itemKey : 'CONZT'
								})]]
		var ConHisAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ConHis]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'ConHisSearchPanel',
					frame : true,
					height : 35,
					items : [
					    //{
							//	text : '处理状态'
							//}, {
							//	hiddenName : 'Q_dealStaId_SN_EQ',
							//	xtype : 'mtdiccombo',
							//	editable : true,
							//	lazyInit : false,
							//	forceSelection : false,
							//	itemKey : 'CONCLZT'
							//}, 
							{
								text : '联系类型'
							}, {
								hiddenName : 'Q_contactTypeId_SN_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'LXFS001'
								// }, {text:'客户'},{
							// hiddenName : 'Q_customerid_L_EQ',
							// xtype : 'combo',
							// editabel : false,
							// lazyInit : false,
							// triggerAction : 'all',
							// store : new Ext.data.SimpleStore({
							// autoLoad : true,
							// url : __ctxPath
							// + '/customer/listCustomer.do',
							// fields : ['customerid', 'customeridName']
							// }),
							// displayField : 'customeridName',
							// valueField : 'customerid',
							// id : 'customerid'
						}	, {
								text : '联系人'
							}, {
								name : 'Q_cusLinkman.fullname_S_LK',
								xtype : 'textfield'
							}
							//, {
							//	text : '来源类别'
							//}, {
							//	hiddenName : 'Q_srcTypeId_SN_EQ',
							//	xtype : 'mtdiccombo',
							//	editable : true,
							//	lazyInit : false,
							//	forceSelection : false,
							//	itemKey : 'CONLYLB'
							// }, 
							//	{text:'方向'},{
							// name : 'Q_dirId_SN_EQ',
							// xtype : 'numberfield'
							// }, {text:''},{
							// name : 'Q_preContactNum_S_EQ',
							// xtype : 'textfield'
							// }, {text:''},{
							// name : 'Q_mainContactNum_S_EQ',
							// xtype : 'textfield'
							// }, {text:''},{
							// name : 'Q_lastContactNum_S_EQ',
							// xtype : 'textfield'
							// }, {text:''},{
							// name : 'Q_staTime_D_EQ',
							// xtype : 'datefield',
							// format : 'Y-m-d'
							// }, {text:''},{
							// name : 'Q_endTime_D_EQ',
							// xtype : 'datefield',
							// format : 'Y-m-d'
							// }, {text:''},{
							// hiddenName : 'Q_busTypId_SN_EQ',
							// xtype : 'mtdiccombo',
							// editable : true,
							// lazyInit : false,
							// forceSelection : false,
							// itemKey : 'CONLLSX'
							// }, {text:''},{
							// hiddenName : 'Q_conResId_SN_EQ',
							// xtype : 'mtdiccombo',
							// editable : true,
							// lazyInit : false,
							// forceSelection : false,
							// itemKey : 'CONLLJG'
							// }, {text:''},{
							// name : 'Q_conResRemarks_S_EQ',
							// xtype : 'textfield'
							// }, {text:''},{
							// name : 'Q_content_S_EQ',
							// xtype : 'textfield'
							// }, {text:''},{
							// name : 'Q_remarks_S_EQ',
							// xtype : 'textfield'
							// }, {text:''},{
							// name : 'Q_ownerId_N_EQ',
							// xtype : 'numberfield'
							// }, {text:''},{
							// hiddenName : 'Q_statusId_SN_EQ',
							// xtype : 'mtdiccombo',
							// editable : true,
							// lazyInit : false,
							// forceSelection : false,
							// itemKey : 'CONZT'
						  //}	
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
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ConHisAdvancedSearchWin().show();
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
			rowActions : true,
			printable : false,
			exportable : true,
			id : 'ConHisGrid',
			url : __ctxPath + "/qucon/listUserLoginQcChkList.do",
			fields : [{
						name : 'conHisId',
						type : 'int'
					}, 'customer', 'cusLinkman', 'srcTypeId', 'dirId',
					'contactTypeId', 'preContactNum', 'mainContactNum',
					'lastContactNum', 'staTime', 'endTime', 'busTypId',
					'conResId', 'conResRemarks', 'content', 'dealStaId',
					'remarks', 'ownerId', 'statusId', 'contactNum','owner'],
			columns : [{
						header : 'conHisId',
						dataIndex : 'conHisId',
						hidden : true
					}, {
						header : '联系类型',
						isExp : false,
						dataIndex : 'contactTypeId',
						renderer : function(value) {
							return LXFS001.get(value);
						}
					}, {
						header : '方向',
						isExp : false,

						dataIndex : 'dirId',
						renderer : function(value) {
							return CONFX.get(value);
						}
					}, {
						header : '来源类别',
						isExp : false,
						dataIndex : 'srcTypeId',
						renderer : function(value) {
							return CONLYLB.get(value);
						}
						// },{
					// header : '区号/地区号',
					// isExp : false,
					// dataIndex : 'preContactNum'
				}	, {
						header : '号码/详细地址',
						isExp : false,
						dataIndex : 'contactNum'
,
						renderer : function(value) {
							return value.replace("null-","").replace("-null","");
						}

						// }, {
					// header : '分机号/邮编',
					// isExp : false,
					// dataIndex : 'lastContactNum'
				}	, {
						header : '联络事项',
						isExp : false,

						dataIndex : 'busTypId',
						renderer : function(value) {
							return CONLLSX.get(value);
						}
					}, {
						header : '开始时间',
						isExp : false,

						dataIndex : 'staTime'
					}, {
						header : '结束时间',
						isExp : false,

						dataIndex : 'endTime'
					}, {
						header : '负责人',
						isExp : false,

						dataIndex : 'owner',
						renderer : function(val) {
							return val?val.username:'';
						}
					}	, {
						header : '联系人',
						isExp : false,

						dataIndex : 'cusLinkman',
						renderer : function(val) {
							return val?val.fullname:'';
						}
						// },{
					// header : '联络结果备注',
					// isExp : false,
					// dataIndex : 'conResRemarks'
					// }, {
					// header : '联络内容',
					// isExp : false,
					// dataIndex : 'content'
				}	, {
						header : '处理状态',
						isExp : false,
						dataIndex : 'dealStaId',
						renderer : function(value) {
							return CONCLZT.get(value)
						}
						// }, {
					// header : '备注',
					// isExp : false,
					// dataIndex : 'remarks'
					// }, {
					// header : '状态',
					// isExp : false,
					// dataIndex : 'statusId',
					// renderer : function(value) {
					// return CONZT.value;
					// }
				}, {
						header : '考核状态',
						isExp : false,
						dataIndex : 'dealStaId',
						renderer : function(value) {
							return QC_KGZT.get(value)
						}
				}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-edit',
											qtip : __edit,
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
					new ConHisForm({
								conHisId : rec.data.conHisId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new ConHisForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConHisForm');
		if (aForm != null) {
			tabs.remove('ConHisForm');
		}
		aForm = new ConHisForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/customer/multiDelConHis.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/customer/multiDelConHis.do',
					grid : this.gridPanel,
					idName : 'conHisId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new ConHisForm({
		// conHisId : record.data.conHisId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QCReviewForm');
		if (aForm != null) {
			tabs.remove('QCReviewForm');
		}
		aForm = new QCReviewForm({
					conHisId : record.data.conHisId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.conHisId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;			
	
			default :
				break;
		}
	}
});
