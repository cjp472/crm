/**
 * @author:cf0666@gmail.com
 * @class CusHisView
 * @extends Ext.Panel
 * @description [CusHis]管理
 * @company 优创融联科技
 * @createtime:
 */
RMBCunKuanView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		RMBCunKuanView.superclass.constructor.call(this, {
			id : 'RMBCunKuanViewWin',
			title : '人民币存款利率查询',
			region : 'center',
			layout : 'border',
			items : [ this.mainPanel,this.rightPanel ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel( {
			layout : 'hbox',
			region : 'north',
			height : 35,
			items : [  {
				width:70,
				style:'text-align:right',
				html:'存储类型：'
			},{

				name : 'Q_opeUseId_N_EQ',
				xtype : 'combo',
				mode : 'local',
				editable : false,
				allowBlank : false,
				triggerAction : 'all',
				store:[[]]
			}, {
				width:70,
				style:'text-align:right',
				html:'起始时间：'
			},{
				name : 'Q_rowDat_D_EQ',
				xtype : 'datefield'
			}, {
				width:20,
				style:'text-align:center',
				html:'-'
			},{
				name : 'Q_rowDat_D_EQ',
				xtype : 'datefield'
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
			} ],
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
		this.gridPanel = new HT.GridPanel( {
			region : 'center',
			printable : false,
			foxable:true,
			tbar:['->',{
				text:'邮件',
				iconCls:'btn-suggest-box'
			},{
				text:'传真',
				iconCls:'btn-print'
			},{
				text:'利息试算',
				iconCls:'btn-print',
				handler:function(){
					var win = new Ext.Window({
						width:500,
						autoHeight:true,
						border:false,
						title:'存款利率试算',
						items:[{
							xtype:'panel',
							border:false,
							layout:'form',
							labelWidth:70,
							labelAlign:'right',
							buttonAlign:'right',
							bbar:['->',{
								text:'计算',
								iconCls:'btn-print',
								handler:function(){
									Ext.get('RMBCunKuan').dom.style.display='block';
								}
							
							}],
							items:[{
								fieldLabel : '储蓄方式',
								name : 'Q_opeUseId_N_EQ',
								xtype : 'combo',
								mode : 'local',
								editable : false,
								allowBlank : false,
								triggerAction : 'all',
								store:[[]],
								anchor:'100%'
							},{
								fieldLabel : '定期类型',
								name : 'Q_opeUseId_N_EQ',
								xtype : 'combo',
								mode : 'local',
								editable : false,
								allowBlank : false,
								triggerAction : 'all',
								store:[[]],
								anchor:'100%'
							},{
								fieldLabel : '期限',
								name : 'Q_opeUseId_N_EQ',
								xtype : 'combo',
								mode : 'local',
								editable : false,
								allowBlank : false,
								triggerAction : 'all',
								store:[[]],
								anchor:'100%'
							},{
									fieldLabel : '年利率',
									name : 'qcTarget.tarTopic',
									allowBlank : false,
									xtype : 'textfield',
									maxLength : 512,
									anchor:'100%'
								},{
								fieldLabel : '存入金额',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								anchor:'100%'
							}]
						},{
							layout:'form',
							border:false,
							labelWidth:70,
							labelAlign:'right',
							style:'display:none',
							id:'RMBCunKuan',
							items:[{
								fieldLabel : '所得利息',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								anchor:'100%'
							},{
								fieldLabel : '本息合计',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								anchor:'100%'
							}]
						}]
					})
					
				win.show();
				}
			}],
			emailable:true,
			exportable : false,
			id : 'CusHisGrid',
			url : __ctxPath + "/serve/listRMBCunKuanHasChargeBill.do",
			fields : [ {
				name : 'id',
				type : 'int'
			}, 'EX1', 'EX2', 'EX3', 'EX4', 'EX5' ],
			columns : [ {
				header : 'opeHisId',
				dataIndex : 'id',
				hidden : true
			}, {
				header : '存储类型',
				isExp : true,
				dataIndex : 'EX1'
//				,
//				renderer : function(val) {
//					return val.customeridName;
//				}
			}, {
				header : '存期',
				isExp : true,

				dataIndex : 'EX2'
			}, {
				header : '生效日期',
				isExp : true,

				dataIndex : 'EX3'
			}, {
				header : '利率',
				isExp : true,

				dataIndex : 'EX4'
			}, {
				header : '备注',
				isExp : true,

				dataIndex : 'EX5'
			}]
		//end of columns
	});

		this.gridPanel.addListener('rowdblclick', this.rowClick);
		// 交易历史开始
	this.hisPanelGrid = new HT.GridPanel( {
			printable : false,
			exportable : false,
			id : 'hisPanelGrid',
			url : __ctxPath + "/customer/listCusSpeEve.do",
//			url : __ctxPath + "/customer/listCusBusiInvoke.do",
			fields : [{
						name : 'busiHisId',
						type : 'int'
					}, 'cusBusiInvoke', 'chanTypeId', 'ownerId', 'busiTypeId',
					'staTime', 'endTime', 'busiCode', 'busiResId', 'cusCardNo',
					'remarks'],
			columns : [ {
				header : 'knowId',
				dataIndex : 'opeHisId',
				hidden : true
			}, {
				header : '渠道类别',
				isExp : false,
				dataIndex : 'chanTypeId',
						renderer : function(value) {
							return CUSQDLB.value;
						}
			},{
				header : '交易类型',
				isExp : false,
				dataIndex : 'busiTypeId',
						renderer : function(value) {
							return CUSJYLX.value;
						}
			},{
				header : '开始时间',
				isExp : false,
				dataIndex : 'staTime'
			},{
				header : '结束时间',
				isExp : false,
				dataIndex : 'endTime'
			},{
				header : '交易码',
				isExp : false,
				dataIndex : 'busiCode'
			},{
				header : '交易状态',
				isExp : false,
				dataIndex : 'busiResId',
						renderer : function(value) {
							return CUSJYZT.value;
						}
			},{
				header : '客户卡号',
				isExp : false,
				dataIndex : 'cusCardNo'
			},{
				header : '备注',
				isExp : false,
				dataIndex : 'remarks'
			}]
		//end of columns
	});
		this.hisPanel = new Ext.Panel({
					region : 'south',
					layout : 'fit',
					collapsible : true,
					autoScroll : true,
					id : 'HisPanel',
					title : '交易历史',
					split : true,
					height : 100,
					items : [this.hisPanelGrid]
				});
		//交易历史结束

		
		// 主框架开始
		this.mainPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
					title : '综合账务',
					collapsible : true,
					autoScroll : true,
					id : 'MainPanel',
					split : true,
					items : [this.searchPanel, this.gridPanel,this.hisPanel]
				});
		//主框架结束
		
		// 相关知识列表开始
		this.knowsSearchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'UkSysKnowSearchPanel',
			height : 35,
			items : [{
						name : 'Q_tiTle_S_EQ',
						xtype : 'textfield'
					},{
						xtype : 'button',
						text : __search,
						iconCls : 'search',
						scope : this,
						handler : this.onKnowSearch
					}, {
						xtype : 'button',
						text : '更多',
						scope : this,
						iconCls : 'btn-reset',
						handler : function() {
							var searchPanel = ExtgetCmp('UkSysKnowSearchPanel');
							searchPanel.getForm().reset();
						}
					}]
		});
	this.knowsPanelGrid = new HT.GridPanel( {
			region : 'center',
			printable : false,
			exportable : false,
			id : 'knowsPanelGrid',
			url : __ctxPath + "/know/newListUkSysKnow.do",
			fields : [ {
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukSysKnow', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid'],
			columns : [ {
				header : 'knowId',
				dataIndex : 'opeHisId',
				hidden : true
			}, {
				header : '知识标题',
				isExp : false,
				dataIndex : 'tiTle'
			}]
		//end of columns
	});
		
		this.knowsPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
					collapsible : true,
					autoScroll : true,
					id : 'KnowsPanel',
					title : '业务知识',
					split : true,
					items : [this.knowsSearchPanel,this.knowsPanelGrid]
				});
		

		//相关知识列表结束
		
	this.customerformPanel = new Ext.FormPanel({
					layout : 'form',
					border : false,
					region:'north',
					collapsible : true,
					height:290,
					labelAlign : 'right',
					autoScroll : true,
					labelWidth:70,
					defaults : {
						anchor : '95%,95%'
					},
					defaultType : 'textfield',
					items : [{
//								fieldLabel : '客户号',
//								name : 'qcTarget.tarTopic',
//								allowBlank : false,
//								xtype : 'textfield',
//								maxLength : 512,
//								value : '证券存款'
//							},{
								fieldLabel : '客户',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								value : '姚旭'
							},{
								fieldLabel : '性别',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								value : '男'
							},{
								fieldLabel : '客户号',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								value : 'KHBH00001'
							},{
								fieldLabel : '证件类型',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								value : '身份证'
							},{
								fieldLabel : '证件号码',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								value : '230103197001016901'
							},{
							xtype:'fieldset',
							title : "账号资料",
							collapsed : false,
							collapsible : true,
							autoHeight : true,
							defaults : {
								anchor : '100%,100%'
							},
							items:[{
								layout:'form',
								border:false,
								items:[{
								fieldLabel : '账号',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								value : 'yaoxu'
							},{
								fieldLabel : '卡号',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512,
								value : '6221881000089883690'
							}]
							}]
						}]
	})	
	
	this.rightPanel = new Ext.Panel({
		layout:'border',
		border:false,
		region:'east',
		width:240,
		items:[this.customerformPanel,this.knowsPanel]
	})
	},// end of the initComponents()
	//重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	//按条件搜索
	onSearch : function(obj) {
		$search({
				searchPanel : this.searchPanel,
				gridPanel : this.gridPanel
			});
	},
	
	//按条件搜索
	onKnowSearch : function(obj) {
		$search({
				searchPanel : this.knowsSearchPanel,
				gridPanel : this.knowsPanelGrid
			});
	},
	//GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			new CusHisForm( {
				opeHisId : rec.data.opeHisId
			}).show();
		});
	},
	//创建记录
	createRs : function() {
		//new CusHisForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('CusHisForm');
		if (aForm != null) {
			tabs.remove('CusHisForm');
		}
		aForm = new CusHisForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	//按ID删除记录
	removeRs : function(id) {
		$postDel( {
			url : __ctxPath + '/customer/multiDelCusHis.do',
			ids : id,
			grid : this.gridPanel
		});
	},
	//把选中ID删除
	removeSelRs : function() {
		$delGridRs( {
			url : __ctxPath + '/customer/multiDelCusHis.do',
			grid : this.gridPanel,
			idName : 'opeHisId'
		});
	},
	//编辑Rs
	editRs : function(record) {
		new CusHisForm( {
			opeHisId : record.data.opeHisId
		}).show();
	},
	//行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
		case 'btn-del':
			this.removeRs.call(this, record.data.opeHisId);
			break;
		case 'btn-edit':
			this.editRs.call(this, record);
			break;
		default:
			break;
		}
	}
});