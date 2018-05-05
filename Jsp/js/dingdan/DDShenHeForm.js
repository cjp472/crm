DDShenHeForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		DDShenHeForm.superclass.constructor.call(this, {
			id : 'DDShenHeFormWin',
			layout:'border',
			items : [_cfg.id == '1' ?new DDFuWuDanForm({
				flag : true
			}):new DDLuRuForm({
				flag : true
			}), this.panel],
			width : 550,
			height : 300,
			modal : true,
			maximizable : true,
			title : '订单审核',
			buttonAlign : 'center',
			buttons : [{
				text : __save,
				iconCls : 'btn-save',
				scope : this,
				handler : this.save
			}, {
				text : __reset,
				iconCls : 'btn-reset',
				scope : this,
				handler : this.reset
			}, {
				text : __cancel,
				iconCls : 'btn-cancel',
				scope : this,
				handler : this.cancel
			}]
		});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.grid_chulijilu = new HT.GridPanel({
			region : 'center',
			printable : false,
			border : false,
			height : 110,
			showPaging : false,
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
				header : '处理人',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '联系电话',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '邮件',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '处理人',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '处理时间',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '处理类型',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '处理结果',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '备注',
				isExp : false,

				dataIndex : 'calllistNam'
			}]
		});
		this.panel = new Ext.FormPanel({
			border : false,
			region:'south',
			height:280,
			collapsible:true,
			title:'审核信息',
			bodyStyle : 'overflow-y:auto',
			buttonAlign : 'center',
			labelAlign : 'right',
			items : [{
				xtype : 'fieldset',
				title : '历史处理记录',
				items : [this.grid_chulijilu]
			}, {
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						xtype : 'combo',
						mode : 'local',
						store : [],
						fieldLabel : '审批意见',
						anchor : '100%'
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						xtype : 'combo',
						mode : 'local',
						store : [],
						fieldLabel : '审批原因',
						anchor : '100%'
					}]
				}]
			}, {
				xtype : 'textarea',
				fieldLabel : '说明',
				height : 50,
				anchor : '95%'
			}]
		})
	},

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postSubForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath + '/outb/saveObCallbatch.do',
			msgSuccess : '成功删除该记录！',
			msgFailure : '操作出错，请联系管理员！',
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('ObCallbatchGrid');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save

});