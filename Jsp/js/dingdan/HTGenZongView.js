HTGenZongView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents(_cfg);
		// 调用父类构造
		HTGenZongView.superclass.constructor.call(this, {
			id : 'HTGenZongViewWin',
			title : '合同跟踪',
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
				width : 70,
				style : 'text-align:right;margin-top:-3px',
				html : '合同编号:'

			}, {

				name : 'Q_calllistNam_S_LK',
				xtype : 'textfield'
			}, {
				xtype : 'panel',
				width : 70,
				style : 'text-align:right;margin-top:-3px',
				html : '合同名称:'

			}, {

				name : 'Q_calllistNam_S_LK',
				xtype : 'textfield'
			}, {
				xtype : 'panel',
				width : 70,
				style : 'text-align:right;margin-top:-3px',
				html : '签约方:'

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
			tbar : ['->',{
				text : '录入',
				iconCls : 'btn-add',
				handler : function() {
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('HTLuRuFormWin');
					if (aForm != null) {
						tabs.remove('HTLuRuFormWin');
					}
					aForm = new HTLuRuForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}
			},{
				text : '延期',
				iconCls : 'btn-signIn',
				handler : function() {
					new HTYanQiForm().show();
				}
			},{
				text : '归档',
				iconCls : 'menu-flowNew',
				handler : function() {
					new HTGuiDangForm().show();
				}
			},{
				text : '关闭',
				iconCls : 'reset',
				handler : function() {
					new HTGuanBiForm().show();
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
				header : '合同编号',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '合同类型',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '合同名称',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '签约方',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '签约时间',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '生效时间',
				isExp : false,

				dataIndex : 'calllistResouce'
			}, {
				header : '到期时间',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '负责人',
				isExp : false,

				dataIndex : 'ownerTeamName'
			}, {
				header : '执行情况',
				isExp : false,

				dataIndex : 'staDat'
			}, {
				header : '状态',
				isExp : false,
				dataIndex : 'endDat'
			}, new Ext.ux.grid.RowActions({
				header : __action,
				width : 120,
				actions : [{
					iconCls : 'btn-form-design',
					qtip : '明细',
					style : 'margin:0 3px 0 3px'
				}, {
					iconCls : 'btn-signIn',
					qtip : '延续',
					style : 'margin:0 3px 0 3px'
				}, {
					iconCls : 'reset',
					qtip : '关闭',
					style : 'margin:0 3px 0 3px'
				}],
				listeners : {
					scope : this,
					'action' : this.onRowAction
				}
			})]
				});
		
		var recordType = this.gridPanel.getStore().recordType;
		this.gridPanel.getStore().add(new recordType({
			calllistNam:'GYS001',
			projId :'冠名合同',
			calllistTypId : '中国电信冠名合同',
			calllistTypId : '中国电信',
			calllistNam : '2012-10-30',
			calllistResouce : '2012-10-30',
			calllistNam : '2013-10-31',
			ownerTeamName :'姚旭',
			staDat:'执行中',
			endDat : '正常'
			
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
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('HTChuLiFormWin');
				if (aForm != null) {
					tabs.remove('HTChuLiFormWin');
				}
				aForm = new HTChuLiForm();
				tabs.add(aForm);
				tabs.activate(aForm);
				break;
			case 'btn-signIn' :
				new HTYanQiForm().show();
				break;
			case 'reset' :
				new HTGuanBiForm().show();
				break;
			default :
				break;
		}
	}
});
