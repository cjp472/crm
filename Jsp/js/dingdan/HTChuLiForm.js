HTChuLiForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		HTChuLiForm.superclass.constructor.call(this, {
			id : 'HTChuLiFormWin',
			layout : 'fit',
			autoScroll:true,
			items : [{
				style:'overflow-y:auto',
				bodyStyle:'overflow-y:true',
				border:false,
				layout:'border',
				items:[
					this.panel,
					{
						region : 'east',
						border : false,
						width : 300,
						items : [this.grid_xiaoshoudan, this.grid_huodongjilu,
								this.grid_shenhejilu]
					}]
			}],
			width : 550,
			height : 300,
			modal : true,
			maximizable : true,
			title : '合同详细',
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
		this.grid_fukuanjihua = new HT.GridPanel({
			region : 'center',
			printable : false,
			showPaging : false,
			height : 300,
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
				header : '付款时间',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '付款金额',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '付款条件',
				isExp : false,

				dataIndex : 'calllistTypId'
			}]
		});
		this.grid_hetongfujian = new HT.GridPanel({
			region : 'center',
			printable : false,
			showPaging : false,
			height : 300,
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
				header : '附件名',
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
		this.grid_xiaoshoudan = new HT.GridPanel({
			region : 'center',
			printable : false,
			height : 150,
			title : '销售单',
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
				header : '订单号',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '订单金额',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '状态',
				isExp : false,

				dataIndex : 'calllistTypId'
			}]
		});
		this.grid_huodongjilu = new HT.GridPanel({
			region : 'center',
			printable : false,
			title : '活动记录',
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
				header : '活动主题',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '类型',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '状态',
				isExp : false,

				dataIndex : 'calllistTypId'
			}]
		});
		this.grid_shenhejilu = new HT.GridPanel({
			region : 'center',
			printable : false,
			title : '审核记录',
			height : 150,
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
				header : '审核人',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '审核时间',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '审核状态',
				isExp : false,

				dataIndex : 'calllistTypId'
			}]
		});
		this.panel = new Ext.FormPanel({
			border : false,
			region : 'center',
			labelAlign : 'right',
			labelWidth : 70,
			bodyStyle : 'padding:10px;background-color:#fff;overflow-y:auto',
			items : [{
				xtype : 'textfield',
				fieldLabel : '合同名称',
				allowBlank : false,
				anchor : '100%'
			}, {
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					border : false,
					columnWidth : .5,
					items : [{
						xtype : 'combo',
						allowBlank : false,
						fieldLabel : '合同类型',
						store : [],
						mode : 'local',
						anchor : '100%'
					}, {
						layout : 'form',
						border : false,
						columnWidth : .333,
						items : [{
							xtype : 'textfield',
							fieldLabel : '合同编号',
							anchor : '100%'
						}]
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .5,
					items : [{
						xtype : 'combo',
						fieldLabel : '合同类别',
						allowBlank : false,
						store : [],
						mode : 'local',
						anchor : '100%'
					}, {
						layout : 'form',
						border : false,
						columnWidth : .5,
						items : [{
							layout : 'column',
							fieldLabel : '报价单',
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
					}]
				}]
			}, {
				layout : 'column',
				fieldLabel : '签约方',
				border : false,
				items : [{
					xtype : 'textfield',
					anchor : '100%',
					columnWidth : .95
				}, {
					xtype : 'button',
					border : false,
					columnWidth : .05,
					iconCls : 'search'
				}]
			}, {
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					border : false,
					labelWidth : 80,
					columnWidth : .5,
					items : [{
						xtype : 'textfield',
						fieldLabel : '签约负责人',
						allowBlank : false,
						anchor : '100%'
					}]
				}, {
					layout : 'form',
					border : false,
					allowBlank : false,
					columnWidth : .5,
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
				}]
			}, {
				xtype : 'textarea',
				height : 100,
				fieldLabel : '摘要',
				anchor : '98%'
			}, {
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					border : false,
					columnWidth : .5,
					items : [{
						xtype : 'datefield',
						allowBlank : false,
						fieldLabel : '生效日期',
						anchor : '100%'
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .5,
					items : [{
						xtype : 'datefield',
						fieldLabel : '到期日期',
						anchor : '100%'
					}]
				}]
			}, {
				xtype : 'fieldset',
				title : '合同费用',
				collapsible : true,
				items : [{
					layout : 'column',
					border : false,
					items : [{
						layout : 'form',
						border : false,
						columnWidth : .5,
						items : [{
							xtype : 'textfield',
							fieldLabel : '合同金额',
							anchor : '100%'
						},{
							xtype : 'textfield',
							fieldLabel : '保证金',
							anchor : '100%'
						},{
							xtype : 'textfield',
							fieldLabel : '账期',
							anchor : '100%'
						}]
					}, {
						layout : 'form',
						border : false,
						columnWidth : .5,
						items : [{
							xtype : 'textfield',
							fieldLabel : '预付款',
							anchor : '100%'
						},{
							border:false,
							height:25,
						}, {
							xtype : 'combo',
							mode : 'local',
							store : [],
							fieldLabel : '付款方式',
							anchor : '100%'
						}]
					}]
				}, {
					xtype : 'fieldset',
					title : '付款计划',
					collapsible : true,
					collapsed:true,
					items : [this.grid_fukuanjihua]
				}]
			}, {
				xtype : 'fieldset',
				title : '合同附件',
				collapsible : true,
				collapsed:true,
				items : [this.grid_hetongfujian]
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