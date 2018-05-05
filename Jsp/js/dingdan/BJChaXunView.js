BJChaXunView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents(_cfg);
		// 调用父类构造
		BJChaXunView.superclass.constructor.call(this, {
			id : 'BJChaXunViewWin',
			title : '报价查询',
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
				html : '主题:'

			}, {

				name : 'Q_calllistNam_S_LK',
				xtype : 'textfield'
			}, {
				xtype : 'panel',
				style : 'margin-top:-3px',
				html : '阶段:'

			}, {

				name : 'Q_calllistNam_S_LK',
				xtype : 'combo',
				mode:'local',
				store : []
			}, {
				xtype : 'panel',
				style : 'margin-top:-3px',
				html : '报价日期:'

			}, {
				xtype:'datefield',
				format:'y-m-d',
				width:100
			},{
				border:false,
				width:15,
				style:'text-align:center',
				html:'~'
			}, {
				xtype:'datefield',
				format:'y-m-d',
				width:100
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
			url : '',
			fields : [{
				name : 'calllistId',
				type : 'int'
			}, 'obCalllist', 'calllistNam', 'calllistResouce', 'ownerTeam',
					'calllistTypId', 'cusTypId', 'staDat', 'endDat', 'remark',
					'creUseId', 'creTime', 'updUseId', 'updTime',
					'calllistStaId', 'ownerTeamName'],
			columns : [{
				header : '客户名称',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '编号',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '报价日期',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '金额',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '主题',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '联系人',
				isExp : false,

				dataIndex : 'calllistResouce'
			}, {
				header : '负责人',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '阶段',
				isExp : false,

				dataIndex : 'ownerTeamName'
			}, {
				header : '状态',
				isExp : false,

				dataIndex : 'staDat'
			}, new Ext.ux.grid.RowActions({
				header : __action,
				width : 120,
				actions : [{
					iconCls : 'btn-form-design',
					qtip : '明细',
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
			calllistNam:'客户M',
			projId :'UUSP_01',
			calllistTypId : '2012-10-30',
			calllistTypId : '100万',
			calllistNam : '材料购买',
			calllistResouce : '2013-12-31',
			calllistNam : '姚旭',
			ownerTeamName :'姚旭',
			staDat:'报价',
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
				var aForm = Ext.getCmp('BJChaKanFormWin');
				if (aForm != null) {
					tabs.remove('BJChaKanFormWin');
				}
				aForm = new BJChaKanForm();
				tabs.add(aForm);
				tabs.activate(aForm);
				break;
			case 'reset' :
				new JHGuanBiForm().show();
				break;
			case 'menu-subuser' :
				new JHZhuanYiForm().show();
				break;
			default :
				break;
		}
	}
});
