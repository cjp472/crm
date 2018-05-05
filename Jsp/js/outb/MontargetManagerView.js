
MontargetwManagerView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		MontargetwManagerView.superclass.constructor.call(this, {
					id : 'MontargetwManagerViewWin',
					title : '目标管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				[
				 	'staId', 
				 	'状态：有效、注销&QC_MBZT', 
				 	new MT.DicComboBox({
						hiddenName : 'staId',
						itemKey : 'QC_MBZT'
					})]
				]
		var QcTemplateAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
			title : '佣金规则高级查询',
			fieldData : fieldnameComboData
		});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
		//	id : 'QcTemplateSearchPanel',
			height : 35,
			items : [{
					border : false,
					width : 50,
					style : 'text-align:right',
					html : '年份：'
				}, 
				{
					id:'mubiao',
					name : 'Q_annual_S_EQ',
					xtype : 'datefield',
					format:'Y'
				},{
					border : false,
					width : 90,
					style : 'text-align:right',
					html : '负责人(工号)：'
				}, 
				{
					name : 'gonghao_id',
					xtype : 'textfield',
					format:'Y'
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
				}, {
					xtype : 'button',
					text : __advancedSearch,
					iconCls : 'search',
					scope : this,
					handler : function() {
						new QcTemplateAdvancedSearchWin().show();
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

		this.topbar = new Ext.Toolbar({
			items : ['->', {
					iconCls : 'btn-add',
					text : __create,
					xtype : 'button',
					scope : this,
					handler : this.createRs
				}, {
					iconCls : 'btn-setting',
					text : '启用',
					xtype : 'button',
					scope : this,
					handler : function(){
						var grid = Ext.getCmp("obFeeIndexGrid");
						var selectRecords = grid.getSelectionModel().getSelections();
						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要启用的记录！");
							return;
						}else {
							var ids = Array();
							for (var i = 0; i < selectRecords.length; i++) {
								ids.push(selectRecords[i].data.feeIndexId);
							}
							Ext.Ajax.request({
								url : __ctxPath + '/customer/multiStartObFeeIndex.do',
								params : {
									ids : ids
								},
								async:true,
								scope:this,
								method : 'post',
								success : function(response) {
									Ext.ux.Toast.msg("信息", "启用成功！");
									var gridPanel = Ext.getCmp('obFeeIndexGrid');
									if (gridPanel != null) {
										gridPanel.getStore().reload();
									}
		                        }
							});
						}
					}
				}, {
					iconCls : 'btn-del',
					text : '注销',
					xtype : 'button',
					scope : this,
					handler : function(){
						var grid = Ext.getCmp("obFeeIndexGrid");
						var selectRecords = grid.getSelectionModel().getSelections();
						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要注销的记录！");
							return;
						}else {
							var ids = Array();
							for (var i = 0; i < selectRecords.length; i++) {
								ids.push(selectRecords[i].data.feeIndexId);
							}
							Ext.Ajax.request({
								url : __ctxPath + '/customer/multiDelObFeeIndex.do',
								params : {
									ids : ids
								},
								async:true,
								scope:this,
								method : 'post',
								success : function(response) {
									Ext.ux.Toast.msg("信息", "注销成功！");
									var gridPanel = Ext.getCmp('obFeeIndexGrid');
									if (gridPanel != null) {
										gridPanel.getStore().reload();
									}
		                        }
							});
						}
					}
			}]
		});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			lazyLoad:true,
			id : 'obFeeIndexGrid',
			url : __ctxPath + "/customer/listObFeeIndex.do",
			fields : [{
						name : 'feeIndexId',
						type : 'int'
					}, 'feeIndexName', 'annual', 'cycle', 'comments',
					'createBy', 'depId','createDate','updateDate','staId','depNam','useNam'],
			columns : [{
						header : 'feeIndexId',
						dataIndex : 'feeIndexId',
						hidden : true
					}, {
						header : '年度',
						dataIndex : 'annual',
						isExp : false
					},{
						header : '设置周期',
						isExp : false,
						dataIndex : 'cycle',
						renderer : function(value) {
							return CONOB_FEE_YJZBZQ.get(value);
						}
					},  {
						header : '指标名',
						isExp : false,
						dataIndex : 'feeIndexName'
					},   {
						header : '创建人',
						isExp : false,
						dataIndex : 'useNam'
					},   {
						header : '创建日期',
						isExp : false,
						dataIndex : 'createDate'
					}, {
						header : '使用部门',
						isExp : false,
						dataIndex : 'depNam'
					}, {
						header : '状态',
						isExp : false,
						dataIndex : 'staId',
						renderer : function(value) {
							return CONOB_FEE_YJRWZT.get(value);
						}
					}, new Ext.ux.grid.RowActions({
						header : __action,
						width : 80,
						actions : [ {
									iconCls : 'btn-edit',
									qtip : __edit,
									style : 'margin:0 3px 0 3px'
								},{
									iconCls : 'btn-setting',
									qtip : '启用',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('staId');
										if ( status == 1) {
											return true;
										} else {
											return false;
										}
									}
								},{
									iconCls : 'btn-del',
									qtip : '注销',
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
		Ext.getCmp('mubiao').setRawValue('');
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

		var record = grid.getSelectionModel().each(function(record) {
			var tabs = Ext.getCmp('centerTabPanel');
	
			var aForm = Ext.getCmp('MontargetManagerFormWin');
			if (aForm != null||aForm != undefined) {
				tabs.remove(aForm);
			}
	
			aForm = new MontargetManagerForm({
				feeIndexId : record.data.feeIndexId
			});
	
			tabs.add(aForm);
			tabs.activate(aForm);
			
		});

	},
	// 创建记录
	createRs : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('MontargetManagerFormWin');
		if (aForm != null) {
			tabs.remove('MontargetManagerFormWin');
		}
		aForm = new MontargetManagerForm({
			feeIndexId : null
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 按ID注销记录
	removeRs : function(id) {
		
		$postLogOut({
					url : __ctxPath + '/customer/multiDelObFeeIndex.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 按ID启用记录
	startRs : function(id) {
		
		$postStart({
					url : __ctxPath + '/customer/multiStartObFeeIndex.do',
					ids : id,
					grid : this.gridPanel
				});
	},

	// 编辑Rs
	editRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('MontargetManagerFormWin');
		if (aForm != null) {
			tabs.remove('MontargetManagerFormWin');
		}
		aForm = new MontargetManagerForm({
			feeIndexId : record.data.feeIndexId
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.feeIndexId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-setting' :
				this.startRs.call(this, record.data.feeIndexId);
				break;
			default :
				break;
		}
	}
});
