BJChaKanForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BJChaKanForm.superclass.constructor.call(this, {
			id : 'BJChaKanFormWin',
			layout : 'border',
			items : [this.panel,this.tabpanel],
			modal : true,
			maximizable : true,
			title : '报价详情',
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
		this.grid_dingdan = new HT.GridPanel({
			region : 'center',
			printable : false,
			exportable : false,
			tbar : ['->', {
				text : '增加',
				iconCls : 'btn-add',
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
				header : '单据类型',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '单据类别',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '总金额',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '支付状态',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '创建日期',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '负责人',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '配送公司',
				isExp : false,
				dataIndex : 'calllistTypId'
			}, {
				header : '配送地址',
				isExp : false,
				dataIndex : 'calllistTypId'
			}, {
				header : '配送状态',
				isExp : false,
				dataIndex : 'calllistTypId'
			}, {
				header : '订单状态',
				isExp : false,
				dataIndex : 'calllistTypId'
			}]
		});
		this.grid_jihui = new HT.GridPanel({
			region : 'center',
			printable : false,
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
				header : '主题',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '客户名称',
				isExp : false,

				dataIndex : 'projId'
			}, {
				header : '来源',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '阶段',
				isExp : false,

				dataIndex : 'calllistTypId'
			}, {
				header : '可能性',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '开始时间',
				isExp : false,

				dataIndex : 'calllistResouce'
			}, {
				header : '结束时间',
				isExp : false,

				dataIndex : 'calllistNam'
			}, {
				header : '负责部门',
				isExp : false,

				dataIndex : 'ownerTeamName'
			}, {
				header : '负责人',
				isExp : false,

				dataIndex : 'staDat'
			}, {
				header : '状态',
				isExp : false,
				dataIndex : 'endDat'
			}]
				});
		this.grid_hetong = new HT.GridPanel({
			region : 'center',
			printable : false,
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
			}]
				});
		this.tabpanel = new Ext.TabPanel({
					activeTab : 0,
					plain : true,
					border:false,
					region:'center',
					region : 'center',
					items : [{
								title : '客户档案',
								border:false,
								layout:'fit',
								items : [new CustomerDetailForm({cusNo:111})]
							},{
								title : '商品服务',
								border:false,
								layout:'fit',
								items : [this.grid_shangpin]
							},{
								title : '机会',
								border:false,
								layout:'fit',
								items : [this.grid_jihui]
							},{
								title : '合同',
								border:false,
								layout:'fit',
								items : [this.grid_hetong]
							},{
								title : '订单',
								border:false,
								layout:'fit',
								items : [this.grid_dingdan]
							}]
		});
		this.panel = new Ext.FormPanel({
			border : false,
			labelAlign : 'right',
			region:'north',
			height:280,
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
				height : 50,
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