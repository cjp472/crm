JHLuRuForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		JHLuRuForm.superclass.constructor.call(this, {
			id : 'JHLuRuFormWin',
			layout : 'fit',
			items : this.panel,
			width : 550,
			height : 300,
			modal : true,
			maximizable : true,
			title : '机会录入',
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
		this.grid_shangpin = new HT.GridPanel({
			region : 'center',
			printable : false,
			showPaging : false,
			height : 150,
			exportable : false,
			tbar : ['->', {
				text : '增加',
				iconCls : 'btn-add',
				handler : function() {

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
				header : '编号',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '名称',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '类别',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '规格',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '颜色',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '价格',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '数量',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '金额',
				isExp : false,

				dataIndex : 'projId'
			}]
		});
		this.grid_yingxiangren = new HT.GridPanel({
			region : 'center',
			printable : false,
			showPaging : false,
			height : 150,
			exportable : false,
			tbar : ['->', {
				text : '增加',
				iconCls : 'btn-add',
				handler : function() {

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
				header : '联系人',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '所在部门',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '职务',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '角色',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '状态',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '备注',
				isExp : false,

				dataIndex : 'projId'
			}]
		});
		this.grid_wendang = new HT.GridPanel({
			region : 'center',
			printable : false,
			showPaging : false,
			height : 150,
			exportable : false,
			tbar : ['->', {
				text : '增加',
				iconCls : 'btn-add',
				handler : function() {

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
				header : '文档名',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '类型',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '描述',
				isExp : false,

				dataIndex : 'calllistTypId'
			}]
		});
		this.panel = new Ext.FormPanel({
			border : false,
			labelAlign : 'right',
			labelWidth : 70,
			bodyStyle : 'overflow-y:auto;padding:10px;background-color:#fff',
			items : [{
				xtype : 'textfield',
				fieldLabel : '机会主题',
				allowBlank : false,
				anchor : '100%'
			}, {
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						xtype : 'combo',
						allowBlank : false,
						fieldLabel : '来源',
						store : [],
						mode : 'local',
						anchor : '100%'
					}, {
						xtype : 'textfield',
						fieldLabel : '联系号码',
						anchor : '100%'
					}, {
						xtype : 'textfield',
						fieldLabel : '可能性',
						anchor : '100%'
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						layout : 'column',
						fieldLabel : '客户名称',
						border : false,
						items : [{
							xtype : 'textfield',
							anchor : '100%',
							columnWidth : .9
						}, {
							xtype : 'button',
							border : false,
							columnWidth : .1,
							iconCls : 'search'
						}]
					}, {
						xtype : 'datefield',
						fieldLabel : '开始日期',
						format : 'y-m-d',
						anchor : '100%'
					}, {
						xtype : 'textfield',
						fieldLabel : '预计金额',
						anchor : '100%'
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						xtype : 'textfield',
						fieldLabel : '联系人',
						anchor : '100%'
					}, {
						xtype : 'datefield',
						fieldLabel : '结束日期',
						format : 'y-m-d',
						anchor : '100%'
					}, {
						xtype : 'combo',
						allowBlank : false,
						fieldLabel : '阶段',
						store : [],
						mode : 'local',
						anchor : '100%'
					}]
				}]
			}, {
				xtype : 'textarea',
				height : 100,
				fieldLabel : '说明',
				anchor : '98%'
			}, {
				xtype : 'fieldset',
				title : '商品/服务',
				collapsible : true,
				collapsed:true,
				items : [this.grid_shangpin]
			}, {
				xtype : 'fieldset',
				title : '影响人',
				collapsed:true,
				collapsible : true,
				items : [this.grid_yingxiangren]
			}, {
				xtype : 'fieldset',
				title : '相关文档',
				collapsible : true,
				collapsed:true,
				items : [this.grid_wendang]
			}, {
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						layout : 'column',
						fieldLabel : '负责部门',
						border : false,
						items : [{
							xtype : 'textfield',
							anchor : '100%',
							columnWidth : .9
						}, {
							xtype : 'button',
							border : false,
							columnWidth : .1,
							iconCls : 'search'
						}]
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						layout : 'column',
						fieldLabel : '负责人',
						border : false,
						items : [{
							xtype : 'textfield',
							anchor : '100%',
							columnWidth : .9
						}, {
							xtype : 'button',
							border : false,
							columnWidth : .1,
							iconCls : 'search'
						}]
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						xtype : 'combo',
						mode : 'local',
						store : [],
						fieldLabel : '状态',
						anchor : '100%'
					}]
				}]
			}]
		})

	},// end of the initcomponents

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