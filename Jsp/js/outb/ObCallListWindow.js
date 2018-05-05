/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCalllistWindow
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
ObCallListWindow = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObCallListWindow.superclass.constructor.call(this, {
					id : 'ObCalllistWindowWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					height : 400,
					width : 680,
					maximizable : true,
					title : '名单清洗',
					buttonAlign : 'center',
					buttons : [{
								text : '下一步',
								iconCls : 'btn-save',
								id : 'btn-save-t',
								scope : this,
								handler : this.save
							}, {
								text : '确认',
								iconCls : 'btn-ok',
								id : 'btn-ok-t',
								hidden : true,
								scope : this,
								handler : this.ok
							}, {
								text : '返回',
								iconCls : 'btn-back',
								id : 'btn-back-t',
								hidden : true,
								scope : this,
								handler : this.back
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								id : 'btn-cancel-t',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		var for_change;// 用于更换 信息的this
		var last_change = "gridPanel_1";// 上次添加的组件

		this.oldList = new Ext.FormPanel({
					layout : 'form',
					border : false,
					labelAlign : 'right',
					defaults : {
						anchor : '96%'
					},
					labelWidth : 80,
					defaultType : 'textfield',
					items : [{
								fieldLabel : '营销项目 ',
								anchor : '96%',
								xtype : 'textfield'
							}, {
								layout : 'column',
								border : false,
								anchor : '96%',
								xtype : 'panel',
								items : [{
											layout : 'form',
											columnWidth : .5,
											xtype : 'panel',
											border : false,
											items : [{
														fieldLabel : '营销活动 ',
														anchor : '100%',
														xtype : 'textfield'
													}]

										}, {
											layout : 'form',
											columnWidth : .5,
											xtype : 'panel',
											border : false,
											items : [{
														fieldLabel : '呼叫名单 ',
														anchor : '100%',
														xtype : 'textfield'
													}]

										}]
							}]
				})

		this.selectV = new Ext.form.RadioGroup({
					fieldLabel : '清洗方式',
					anchor : '99%',
					layout : 'form',
					labelAlign : 'right',
					items : [{
								boxLabel : '无效数据',
								name : 'rb-auto',
								inputValue : 1,
								checked : true
							}, {
								boxLabel : '名单修复',
								inputValue : 2,
								name : 'rb-auto'
							}, {
								boxLabel : '黑白名单',
								inputValue : 3,
								name : 'rb-auto'
							}, {
								boxLabel : '名单去重',
								inputValue : 4,
								name : 'rb-auto'
							}, {
								boxLabel : '业务去重',
								inputValue : 5,
								name : 'rb-auto'
							}],
					listeners : {
						change : function(com, checked) {
							// alert(checked.getGroupValue());
							var formBase = for_change.panel;
							var inform = "gridPanel_" + checked.getGroupValue();
							if (checked.getGroupValue() == 2) {
								for_change.gridPanel_2.show();
								for_change.gridPanel_1.hide();
								for_change.list.hide();
								for_change.gridPanel_4.hide();
								for_change.gridPanel_5.hide();
							} else if (checked.getGroupValue() == 3) {
								for_change.gridPanel_2.hide();
								for_change.gridPanel_1.hide();
								for_change.list.show();
								for_change.gridPanel_4.hide();
								for_change.gridPanel_5.hide();
							} else if (checked.getGroupValue() == 4) {
								for_change.gridPanel_2.hide();
								for_change.gridPanel_1.hide();
								for_change.list.hide();
								for_change.gridPanel_4.show();
								for_change.gridPanel_5.hide();
							} else if (checked.getGroupValue() == 5) {
								for_change.gridPanel_2.hide();
								for_change.gridPanel_1.hide();
								for_change.list.hide();
								for_change.gridPanel_4.hide();
								for_change.gridPanel_5.show();
							} else if (checked.getGroupValue() == 1) {
								for_change.gridPanel_2.hide();
								for_change.gridPanel_1.show();
								for_change.list.hide();
								for_change.gridPanel_4.hide();
								for_change.gridPanel_5.hide();
							} else {
							};
							// formBase.remove(for_change.eval(last_change));
							// formBase.add(for_change.eval(inform));
							// alert(for_change.last_change);
							formBase.doLayout();
							last_change = "gridPanel_"
									+ checked.getGroupValue();
						}
					}
				});
		this.checkGroupType = new Ext.form.RadioGroup({
					fieldLabel : '处理方式',
					anchor : '96%',
					hidden : true,
					height : 30,
					id : 'checkType',
					items : [{
								boxLabel : '在有效期内禁止',
								name : 'rb-type',
								inputValue : 1,
								value : 1,
								checked : true
							}, {
								boxLabel : '放入清洗名单',
								inputValue : 2,
								value : 2,
								name : 'rb-type'
							}],
					listeners : {
						change : function(com, checked) {
							checked.getGroupValue;
						}
					}
				});
		this.checkGroup = {
			xtype : 'fieldset',
			// title : '',
			autoHeight : true,
			anchor : '96%',
			layout : 'form',

			collapsed : false,
			collapsible : false
			// items : [this.selectV]
		};
		// this.checkGroupType = {
		// xtype : 'fieldset',
		// // title : '',
		//			
		// hidden:true,
		// autoHeight : true,
		// anchor : '96%',
		// layout : 'form',
		// collapsed : false,
		// collapsible : false,
		// items : [this.selectT]
		// };
		this.label = new Ext.Panel({

		});

		this.gridPanel_1 = new HT.EditorGridPanel({
			clicksToEdit : 1,
			scrollHeight : true,
			region : 'center',
			printable : false,
			border : false,
			title : '清洗规则',
			height : 310,
			// style : 'margin-left:10px;',
			anchor : '100%',
			lazyLoad : true,
			exportable : false,
			url : __ctxPath + "/outb/listCusTmpObCallbatch.do?callbatchID=" + 5,
			// tbar : ['->', {
			// iconCls : 'btn-del',
			// text : '删除',
			// xtype : 'button',
			// handler : function() {
			// var store = gridPanels.getStore();
			// var sm = gridPanels.getSelectionModel();
			// var cell = sm.getSelections();
			// if (cell.length < 1) {
			// Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
			// } else {
			// store.remove(cell);
			// }
			// }
			// }, '->', {
			// iconCls : 'btn-add',
			// text : '添加',
			// xtype : 'button',
			// handler : function(gridPanel) {
			// var store = gridPanels.getStore();
			// var recordType = store.recordType;
			// store.add(new recordType({})); // 添加一行空store
			//
			// }
			// }],
			fields : [{
						name : ' tmpCusId',
						type : 'Long'
					}, 'nameCn', 'gender', 'credTypId', 'birthday', 'credNum',
					'credDurDat', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5',
					'ext6'],
			columns : [{
				header : '字段',
				isExp : false,
				dataIndex : 'credNum'
					// ,editor : {
					// xtype : 'combo',
					// mode : 'local',
					// triggerAction : 'all',
					// emptyText : '请选择',
					// lazyInit : false,
					// store : new Ext.data.ArrayStore({
					// fields : ['myId', 'displayText'],
					// data : [['客户名称', '客户名称'], ['移动电话', '移动电话'],
					// ['电子邮件', '电子邮件'], ['客户编号', '客户编号'],
					// ['客户性别', '客户性别'], ['客户姓名', '客户姓名'],
					// ['身份证', '身份证'], ['生日', '生日'],
					// ['邮编', '邮编']]
					// }),
					// valueField : 'myId',
					// displayField : 'displayText'
					// }
				}, {
				header : '清洗条件',
				isExp : false,
				dataIndex : 'credDurDat',
				editor : {
					xtype : 'combo',
					mode : 'local',
					triggerAction : 'all',
					emptyText : '请选择',
					lazyInit : false,
					store : new Ext.data.ArrayStore({
								fields : ['myId', 'displayText'],
								data : [['为空', '为空'], ['长度小于', '长度小于'],
										['包含', '包含'], ['等于', '等于'],
										['不等于', '不等于']]
							}),
					valueField : 'myId',
					displayField : 'displayText'
				}
			}, {
				header : '条件值',
				isExp : false,
				dataIndex : 'ext6',
				editor : new Ext.form.TextField({})
			}
			// ,
			// {
			// header : '是否可空',
			// isExp : false,
			// dataIndex : 'credDurDat'
			// },
			// {
			// header : '数据格式',
			// isExp : false,
			// dataIndex : 'nameCn'
			// }
			]
		});
		var store = this.gridPanel_1.getStore();
		var recordType = store.recordType;
		store.add(new recordType({
					'credNum' : '客户名称'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '移动电话'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '电子邮件'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '客户编号'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '邮编'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '生日'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '身份证'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '客户姓名'
				})); // 添加一行空store

		this.gridPanel_2 = new HT.EditorGridPanel({
			clicksToEdit : 1,
			scrollHeight : true,
			region : 'center',
			printable : false,
			border : false,
			title : '修复规则',
			height : 310,
			hidden : true,
			anchor : '100%',
			lazyLoad : true,
			exportable : false,
			url : __ctxPath + "/outb/listCusTmpObCallbatch.do?callbatchID=" + 5,
			fields : [{
						name : ' tmpCusId',
						type : 'Long'
					}, 'nameCn', 'gender', 'credTypId', 'birthday', 'credNum',
					'credDurDat', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5',
					'ext6'],
			columns : [{
						header : '字段',
						isExp : false,
						dataIndex : 'credNum'
					}, {
						header : '修复方式',
						isExp : false,
						dataIndex : 'credDurDat',
						editor : {
							xtype : 'combo',
							mode : 'local',
							triggerAction : 'all',
							lazyInit : false,
							store : new Ext.data.ArrayStore({
										fields : ['myId', 'displayText'],
										data : [['号码格式化', '号码格式化'],
												['号码升位', '号码升位']]
									}),
							valueField : 'myId',
							displayField : 'displayText'
						}
					}]
		});
		var store = this.gridPanel_2.getStore();
		var recordType = store.recordType;
		store.add(new recordType({
					'credNum' : '客户名称'
				}));
		store.add(new recordType({
					'credNum' : '移动电话'
				}));
		store.add(new recordType({
					'credNum' : '电子邮件'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '客户编号'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '邮编'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '生日'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '身份证'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '客户姓名'
				})); // 添加一行空store

		var sm = new Ext.grid.CheckboxSelectionModel();
		var sm_4 = new Ext.grid.CheckboxSelectionModel();
		var sm_5 = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
					columns : [sm, {
								header : '匹配字段',
								dataIndex : 'credNum'
							}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					}
				});
		var cm_4 = new Ext.grid.ColumnModel({
					columns : [sm_4, {
								header : '重复字段',
								dataIndex : 'credNum'
							}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					}
				});
		var cm_5 = new Ext.grid.ColumnModel({
					columns : [sm_5, {
								header : '重复字段',
								dataIndex : 'credNum'
							}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					}
				});
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : __ctxPath
						+ '/know/dianpcinglistUkKnowFankui.do?Q_ukSysKnow.knowId_L_EQ='
						+ 1
			}),
			reader : new Ext.data.JsonReader({
						root : 'result',
						totalProperty : 'totalCounts',
						id : 'id',
						fields : [{
									name : ' tmpCusId',
									type : 'Long'
								}, 'nameCn', 'gender', 'credTypId', 'birthday',
								'credNum', 'credDurDat', 'ext1', 'ext2',
								'ext3', 'ext4', 'ext5', 'ext6']
					}),
			remoteSort : false
		});

		this.gridPanel_3 = new Ext.grid.GridPanel({
			region : 'center',
			autoScroll : true,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			autoHeight : true,
			columnLines : true,// 是否显示分隔线
			cm : cm,
			sm : sm,
			store : store,
			viewConfig : {
				forceFit : true
			},
			region : 'center',
			border : false
				// title : '匹配字段',
			});
		var store = this.gridPanel_3.getStore();
		var recordType = store.recordType;
		store.add(new recordType({
					'credNum' : '客户名称'
				}));
		store.add(new recordType({
					'credNum' : '移动电话'
				}));
		store.add(new recordType({
					'credNum' : '电子邮件'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '客户编号'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '邮编'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '生日'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '身份证'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '客户姓名'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '客户'
				})); // 添加一行空store
		store.add(new recordType({
					'credNum' : '客户资源'
				})); // 添加一行空store

		this.gridPanel4 = new Ext.grid.GridPanel({
			region : 'center',
			autoScroll : true,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			autoHeight : true,
			columnLines : true,// 是否显示分隔线
			cm : cm_4,
			sm : sm_4,
			store : store,
			viewConfig : {
				forceFit : true
			},
			region : 'center',
			border : false
				// title : '匹配字段',
			});
		this.gridPanel5 = new Ext.grid.GridPanel({
			region : 'center',
			autoScroll : true,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			autoHeight : true,
			columnLines : true,// 是否显示分隔线
			cm : cm_5,
			sm : sm_5,
			store : store,
			viewConfig : {
				forceFit : true
			},
			region : 'center',
			border : false
				// title : '匹配字段',
			});
		this.mingdan = new Ext.form.CheckboxGroup({
					// fieldLabel : '清洗方式',
					layout : 'form',
					region : 'west',
					border : false,
					style : 'margin-top:100px;margin-left:50px;',
					width : 150,
					autoHeight : true,
					// itemCls : 'x-check-group-alt',
					columns : 1,
					defaultType : 'checkbox',
					items : [{
								boxLabel : '黑名单',
								name : 'rb-black',
								inputValue : 1,
								border : false,
								checked : true
							}, {
								boxLabel : '白名单',
								inputValue : 2,
								border : false,
								name : 'rb-white'
							}],
					listeners : {
						change : function(com, checked) {

						}
					}
				});
		this.fanwei = new Ext.form.RadioGroup({
					fieldLabel : '去重范围',
					// region : 'center',
					border : false,
					anchor : '97%',
					// style : 'margin-top:10px;margin-left:20px;',
					height : 120,
					columns : 1,
					items : [{
								boxLabel : '所有执行中的项目',
								name : 'rb-fanwei',
								inputValue : 1,
								checked : true
							}, {
								boxLabel : '营销项目',
								inputValue : 2,
								name : 'rb-fanwei'
							}, {
								boxLabel : '营销活动',
								inputValue : 3,
								name : 'rb-fanwei'
							}, {
								boxLabel : '呼叫名单',
								inputValue : 4,
								name : 'rb-fanwei'
							}, {
								boxLabel : '批次',
								inputValue : 5,
								name : 'rb-fanwei'
							}],
					listeners : {
						change : function(com, checked) {

						}
					}
				});
		// this.listset = {
		// xtype : 'fieldset',
		// autoHeight : true,
		// collapsed : false,
		// style : 'margin-top:20px;',
		// // baseCls:".x-fieldsetNone",
		// collapsible : false,
		// region : 'center',
		// items : []
		// };

		this.list = new Ext.Panel({
					anchor : '100%',
					layout : 'border',
					hidden : true,
					height : 310,
					border : true,
					bodyStyle : 'background:white;',
					// defaultType : 'panel',
					items : [this.mingdan, this.gridPanel_3]
				})
		this.gridPanel_4 = new Ext.Panel({
					anchor : '100%',
					layout : 'border',
					hidden : true,
					height : 310,
					border : true,
					bodyStyle : 'background:white;',
					// defaultType : 'panel',
					items : [this.gridPanel4]
				})
		this.fanwei_change = new Ext.FormPanel({
					region : 'west',
					layout : 'form',
					border : false,
					width:250,
					labelAlign : 'right',
					defaults : {
						anchor : '96%'
					},
					labelWidth : 80,
					defaultType : 'textfield',
					items : [this.fanwei]
				})
		// this.mainMenu = new Ext.Panel({
		// region : 'west',
		// layout : 'border',
		// width : 250,
		// border : false,
		// bodyStyle : 'background:white;',
		// items : [this.fanwei_change, this.fanwei]
		// })
		this.gridPanel_5 = new Ext.Panel({
					anchor : '100%',
					layout : 'border',
					hidden : true,
					height : 310,
					border : true,
					bodyStyle : 'background:white;',
					// defaultType : 'panel',
					items : [this.gridPanel5, this.fanwei_change]
				})
		this.gridPanel1 = new HT.GridPanel({
			scrollHeight : true,
			region : 'center',
			printable : false,
			lazyLoad : true,
			anchor : '95%',
			exportable : false,
			url : __ctxPath + "/outb/listCusTmpObCallbatch.do?callbatchID=" + 5,

			fields : [{
						name : ' tmpCusId',
						type : 'Long'
					}, 'nameCn', 'gender', 'credTypId', 'birthday', 'credNum',
					'credDurDat', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5',
					'ext6'],
			columns : [{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					}, {
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return CONOB_CALLBATCH_IMP_TMP_ZJLX.get(value);
						}
					}, {
						header : '生日',
						isExp : false,
						dataIndex : 'birthday'
					}, {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					},
					// {
					// header : '证件有效期',
					// isExp : false,
					// dataIndex : 'credDurDat',
					// renderer : function(value) {
					// return value.substring(0, 10);
					// }
					// },
					{

						header : '家庭电话',
						isExp : false,
						dataIndex : 'ext1'
					}, {
						header : '办公电话',
						isExp : false,
						dataIndex : 'ext2'
					}, {
						header : '移动电话',
						isExp : false,
						dataIndex : 'ext3'
					},
					// {
					// header : '其他电话',
					// isExp : false,
					// dataIndex : 'ext4'
					// },
					{
						header : '传真',
						isExp : false,
						dataIndex : 'ext5'
					}, {
						header : 'Email',
						isExp : false,
						dataIndex : 'ext6'
					}]
		});
		this.searchPanel1 = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					anchor : '95%',
					height : 35,
					items : [{
								xtype : 'panel',
								width : 50,
								style : 'text-align:right',
								html : '姓名：'
							}, {

								name : 'Q_callbatchNam_S_LK',
								xtype : 'textfield'
							}, {
								xtype : 'panel',
								width : 50,
								style : 'text-align:right',
								html : '性别：'
							}, {

								hiddenName : 'Q_callbatchTypId_SN_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_CALLBATCH_PCLX'
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
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
		this.panel = new Ext.Panel({
					layout : 'form',
					id : 'ObcallListClearnstep1',
					labelAlign : 'right',
					labelWidth : 80,
					bodyStyle:'padding-top:4px;',
					border : false,
					items : [this.oldList, this.selectV, this.gridPanel_1,
							this.gridPanel_2, this.list, this.gridPanel_4,
							this.gridPanel_5]
				});
		this.panel1 = new Ext.Panel({
					layout : 'border',
					border : false,
					id : 'ObcallListClearnstep2',
					height : 336,
					items : [this.gridPanel1, this.searchPanel1]
				});
		this.panel1.hide();
		for_change = this;
	},// end of the initcomponents

	reset : function() {
		this.formPanel.getForm().reset();
	},
	cancel : function() {
		Ext.getCmp('ObCalllistWindowWin').close();
	},
	save : function() {
		var panels = Ext.getCmp('ObCalllistWindowWin');
		// panels.remove(this.panel);
		this.panel.hide();
		this.panel1.show();
		panels.add(this.panel1);
		panels.doLayout();
		Ext.getCmp('btn-ok-t').show();
		Ext.getCmp('btn-save-t').hide();
		Ext.getCmp('btn-back-t').show();
		Ext.getCmp('btn-cancel-t').hide();
	},// end of save
	back : function() {
		var panels = Ext.getCmp('ObCalllistWindowWin');
		this.panel.show();
		this.panel1.hide();
		panels.doLayout();
		Ext.getCmp('btn-save-t').show();
		Ext.getCmp('btn-back-t').hide();
		Ext.getCmp('btn-ok-t').hide();
		Ext.getCmp('btn-cancel-t').show();
	},
	ok : function() {
		Ext.Msg.confirm('清洗',
				'清洗信息成功</br> 清洗完成的数据:20</br>清洗失败的数据:0</br> 是否继续数据清洗?',
				function(btn) {
					if (btn == 'yes') {
						var panels = Ext.getCmp('ObCalllistWindowWin');
						Ext.getCmp('ObcallListClearnstep1').show();
						Ext.getCmp('ObcallListClearnstep2').hide();
						panels.doLayout();
						Ext.getCmp('btn-save-t').show();
						Ext.getCmp('btn-back-t').hide();
						Ext.getCmp('btn-ok-t').hide();
						Ext.getCmp('btn-cancel-t').show();
						/*
						 * 这里将所选信息 提交到后台
						 */
					} else {
						Ext.getCmp('ObCalllistWindowWin').close();
					}
				});
	}
});