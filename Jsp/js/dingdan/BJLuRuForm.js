BJLuRuForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BJLuRuForm.superclass.constructor.call(this, {
			id : 'BJLuRuFormWin',
			layout : 'fit',
			items : this.panel,
			width : 550,
			height : 300,
			modal : true,
			maximizable : true,
			title : '报价录入',
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
		this.panel = new Ext.FormPanel({
			border : false,
			labelAlign : 'right',
			labelWidth : 70,
			bodyStyle : 'overflow-y:auto;padding:10px;background-color:#fff',
			items : [{
				xtype : 'textfield',
				fieldLabel : '主题',
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
						xtype : 'datefield',
						allowBlank : false,
						fieldLabel : '开始日期',
						format : 'y-m-d',
						anchor : '100%'
					}, {
						xtype : 'textfield',
						fieldLabel : '联系人',
						anchor : '100%'
					}, {
						xtype : 'textfield',
						fieldLabel : '邮件',
						anchor : '100%'
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						xtype : 'datefield',
						allowBlank : false,
						fieldLabel : '结束日期',
						format : 'y-m-d',
						anchor : '100%'
					}, {
						xtype : 'textfield',
						fieldLabel : '联系电话',
						anchor : '100%'
					}, {
						xtype : 'combo',
						fieldLabel : '阶段',
						store : [],
						mode : 'local',
						anchor : '100%'
					}]
				}, {
					layout : 'form',
					border : false,
					labelWidth:80,
					columnWidth : .333,
					items : [{
						layout : 'column',
						fieldLabel : '客户',
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
						xtype : 'textfield',
						fieldLabel : '传真',
						anchor : '100%'
					}, {
						xtype : 'datefield',
						fieldLabel : '预计发货时间',
						format : 'y-m-d',
						anchor : '100%'
					}]
				}]
			}, {
				layout : 'column',
				border : false,
				fieldLabel : '发货地区',
				items : [{
					border : false,
					anchor : '100%',
					items : [{
						xtype : 'combo',
						hideLabel:true,
						store : [],
						mode : 'local',
						anchor : '100%'
					}]
				}, {
					border : false,
					hideLabel:true,
					anchor : '100%',
					items : [{
						xtype : 'combo',
						allowBlank : false,
						store : [],
						mode : 'local',
						anchor : '100%'
					}]
				}, {
					border : false,
					hideLabel:true,
					anchor : '100%',
					items : [{
						xtype : 'combo',
						allowBlank : false,
						store : [],
						mode : 'local',
						anchor : '100%'
					}]
				}]
			}, {
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					columnWidth : .666,
					border : false,
					items : [{
						xtype : 'textfield',
						fieldLabel : '详细地址',
						anchor : '100%'
					}]
				}, {
					layout : 'form',
					columnWidth : .333,
					border : false,
					items : [{
						xtype : 'textfield',
						fieldLabel : '邮编',
						anchor : '100%'
					}]
				}]
			}, {
				xtype : 'fieldset',
				title : '商品/服务',
				collapsible : true,
				collapsed : true,
				items : [this.grid_shangpin]
			}, {
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					border : false,
					columnWidth : .333,
					items : [{
						xtype : 'textfield',
						fieldLabel : '金额',
						anchor : '100%'
					}, {
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
						xtype : 'textfield',
						fieldLabel : '预计费用',
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
						fieldLabel : '状态',
						anchor : '100%'
					}]
				}]
			}, {
				xtype : 'textarea',
				height : 100,
				fieldLabel : '备注',
				anchor : '98%'
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