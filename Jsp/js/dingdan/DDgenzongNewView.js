DDgenzongNewView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents(_cfg);
		// 调用父类构造
		DDgenzongNewView.superclass.constructor.call(this, {
			id : 'DDgenzongNewViewWin',
			title : '订单跟踪管理',
			region : 'center',
			layout : 'border',
			iconCls : 'menu-mobile',
			items : [this.searchPanel, this.gridPanel]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function(_cfg) {
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			height : 35,
			items : [{
				xtype : 'panel',
				style : 'margin-top:-3px',
				html : '订单编号:'

			}, {

				name : 'Q_calllistNam_S_LK',
				xtype : 'textfield'
			}, {
				xtype : 'panel',
				style : 'margin-top:-3px',
				html : '客户:'

			}, {

				name : 'Q_calllistNam_S_LK',
				xtype : 'textfield'
			}, {
				xtype : 'panel',
				style : 'margin-top:-3px',
				html : '接单人:'

			}, {

				name : 'Q_calllistNam_S_LK',
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
			printable : false,
			rowActions : true,
			exportable : false,
			showSm : false,
			tbar : ['->', {
				text : '新增',
				iconCls : 'btn-add',
				handler : function() {
						new DDXuanZeForm().show();
				}
			}, {
				text : '删除',
				iconCls : 'btn-delete',
				handler : function() {

				}
			}],
			url : '',
			fields : [{
				name : 'calllistId',
				type : 'int'
			}, 'obCalllist', 'calllistNam', 'calllistResouce', 'ownerTeam',
					'calllistTypId', 'cusTypId', 'staDat', 'endDat', 'remark',
					'creUseId', 'creTime', 'updUseId', 'updTime',
					'calllistStaId', 'ownerTeamName'],
			columns : [{
				header : '订单编号',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '订单类型',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '客户名称',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '订购人',
				isExp : false,

				dataIndex : 'updTime'
			}, {
				header : '订购日期',
				isExp : false,

				dataIndex : 'creTime'
			}, {
				header : '接单人',
				isExp : false,

				dataIndex : 'calllistResouce'
			}, {
				header : '订购金额',
				isExp : false,

				dataIndex : 'creUseId'
			}, {
				header : '付款方式',
				isExp : false,

				dataIndex : 'ownerTeamName'
			}, new Ext.ux.grid.RowActions({
				header : __action,
				width : 120,
				actions : [{
					iconCls : 'btn-form-design',
					qtip : '查看',
					style : 'margin:0 3px 0 3px'
				}, {
					iconCls : 'reset',
					qtip : '取消',
					style : 'margin:0 3px 0 3px',
					fn : function(record) {
						if (record.data.calllistId == '1') {//2——执行中
						return true;
					} else {
						return false;
					}
				}
				}, {
					iconCls : 'btn-edit',
					qtip : '更改',
					style : 'margin:0 3px 0 3px',
					fn : function(record) {
						if (record.data.calllistId == '1') {//2——执行中
						return true;
					} else {
						return false;
					}
				}
				}, {
					iconCls : 'rem-all',
					qtip : '退货',
					style : 'margin:0 3px 0 3px',
					fn : function(record) {
						if (record.data.calllistId == '2') {//2——执行中
							return true;
						} else {
							return false;
						}
				}
				}, {
					iconCls : 'btn-archive-cancel-trace',
					qtip : '换货',
					style : 'margin:0 3px 0 3px',
					fn : function(record) {
						if (record.data.calllistId == '2') {//2——执行中
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
		});

		var recordType = this.gridPanel.getStore().recordType;
		this.gridPanel.getStore().add(new recordType({
			calllistId : '1',
			calllistNam : 'GYS001',
			projId : '服务单',
			calllistTypId : '中国电信冠名合同',
			updTime : '姚旭',
			creTime : '2012-10-30',
			calllistResouce : '姚旭',
			creUseId : '3000',
			ownerTeamName : '款到发货'

		}));
		this.gridPanel.getStore().add(new recordType({
			calllistId : '2',
			calllistNam : 'GYS001',
			projId : '销售单',
			calllistTypId : '中国电信冠名合同',
			updTime : '姚旭',
			creTime : '2012-10-30',
			calllistResouce : '姚旭',
			creUseId : '3000',
			ownerTeamName : '货到付款'

		}))

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
			var aForm = Ext.getCmp('ObCalllistForm');
			if (aForm != null) {
				tabs.remove('ObCalllistForm');
			}
			aForm = new ObCalllistForm({
				calllistId : rec.data.calllistId
			});
			tabs.add(aForm);
			tabs.activate(aForm);
		});
	},
	// 创建记录
	createRs : function() {
		// new ObCalllistForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ObCalllistFormWin');
		if (aForm != null) {
			tabs.remove('ObCalllistFormWin');
		}
		aForm = new ObCalllistForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
			url : __ctxPath + '/outb/multiDelObCalllist.do',
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
			url : __ctxPath + '/outb/multiDelObCalllist.do',
			grid : this.gridPanel,
			idName : 'calllistId',
			msgNull : '请选择要删除的记录！',
			msgTip : '您确认要删除所选记录吗？',
			msgSuccess : '成功删除该记录！',
			msgFailure : '操作出错，请联系管理员！'
		});
	},
	// 编辑Rs
	editRs : function(record) {
		// new ObCalllistForm({
		// calllistId : record.data.calllistId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ObCalllistFormWin');
		if (aForm != null) {
			tabs.remove('ObCalllistFormWin');
		}
		aForm = new ObCalllistForm({
			calllistId : record.data.calllistId
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-form-design' :
				if(record.data.calllistId == '1'){
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('DDFuWuDanFormWin');
					if (aForm != null) {
						tabs.remove('DDFuWuDanFormWin');
					}
					aForm = new DDFuWuDanForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}else{
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('DDLuRuFormWin');
					if (aForm != null) {
						tabs.remove('DDLuRuFormWin');
					}
					aForm = new DDLuRuForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}
				break;
			case 'reset' :
				new DDGuanBiForm().show();
				break;
			case 'btn-edit' :
				if(record.data.calllistId == '1'){
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('DDFuWuDanFormWin');
					if (aForm != null) {
						tabs.remove('DDFuWuDanFormWin');
					}
					aForm = new DDFuWuDanForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}else{
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('DDLuRuFormWin');
					if (aForm != null) {
						tabs.remove('DDLuRuFormWin');
					}
					aForm = new DDLuRuForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}
				break;
			case 'rem-all' :
				if(record.data.calllistId == '1'){
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('DDFuWuDanFormWin');
					if (aForm != null) {
						tabs.remove('DDFuWuDanFormWin');
					}
					aForm = new DDFuWuDanForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}else{
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('DDLuRuFormWin');
					if (aForm != null) {
						tabs.remove('DDLuRuFormWin');
					}
					aForm = new DDLuRuForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}
				break;
			case 'btn-archive-cancel-trace' :
				if(record.data.calllistId == '1'){
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('DDFuWuDanFormWin');
					if (aForm != null) {
						tabs.remove('DDFuWuDanFormWin');
					}
					aForm = new DDFuWuDanForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}else{
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('DDLuRuFormWin');
					if (aForm != null) {
						tabs.remove('DDLuRuFormWin');
					}
					aForm = new DDLuRuForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}
				break;
			default :
				break;
		}
	}
});
