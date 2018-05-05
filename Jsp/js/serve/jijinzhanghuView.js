/**
 * @author:cf0666@gmail.com
 * @class CusHisView
 * @extends Ext.Panel
 * @description [CusHis]管理
 * @company 优创融联科技
 * @createtime:
 */
jijinzhanghuView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		jijinzhanghuView.superclass.constructor.call(this, {
			id : 'jijinzhanghuViewWin',
			title : '基金账户查询',
			region : 'center',
			layout : 'border',
			items : [ this.mainPanel,this.rightPanel ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel( {
			region : 'north',
			height : 60,
			layout:'form',
			labelAlign:'right',
			items : [{
				layout:'column',
				border:false,
				items:[{
					layout:'form',
					border:false,
					columnWidth:.33,
					items:[{
						fieldLabel:'证件类型',
						name : 'Q_opeUseId_N_EQ',
						xtype : 'combo',
						mode : 'local',
						editable : false,
						allowBlank : false,
						triggerAction : 'all',
						store:[[]],
						anchor:'100%'
					}]
				},{
					layout:'form',
					border:false,
					columnWidth:.33,
					items:[{
						fieldLabel:'证件号码',
						name : 'Q_opeUseId_N_EQ',
						xtype : 'textfield',
						anchor:'100%'
					}]
				},{
					layout:'form',
					border:false,
					columnWidth:.33,
					items:[{
						fieldLabel:'基金账号',
						name : 'Q_opeUsseId_N_EQ',
						xtype : 'textfield',
						anchor:'100%'
					}]
				}]
			},{
				layout:'column',
				border:false,
				items:[{
					layout:'form',
					border:false,
					columnWidth:.33,
					items:[{
						fieldLabel:'客户账号',
						name : 'Q_opeUseId_N_EQ',
						xtype : 'textfield',
						anchor:'100%'}]
				},{
					layout:'column',
					border:false,
					columnWidth:.66,
					style:'float:right',
					items:[ {
						xtype : 'button',
						text : __search,
						style:'margin-right:20px;margin-left:50px',
						iconCls : 'search',
						scope : this,
						handler : this.onSearch
					}, {
						xtype : 'button',
						text : __reset,
						scope : this,
						iconCls : 'btn-reset',
						handler : this.reset
					}]
				}]
			} ],
			border : false,
			frame : false
		});// end of searchPanel
		this.gridPanel = new HT.GridPanel( {
			region : 'center',
			printable : false,
			foxable:true,
			tbar:['->',{
				text:'挂失',
				iconCls:'btn-suggest-box'
			},{
				text:'解挂',
				iconCls:'btn-print'
			},{
				text:'补办',
				iconCls:'btn-print'
			}],
			emailable:true,
			exportable : false,
			id : 'CusHisGrid',
			url : __ctxPath + "/customer/listCusHis.do",
			fields : [ {
				name : 'opeHisId',
				type : 'int'
			}, 'cusHis', 'opeUseId', 'rowDat', 'opeTypId', 'opeResDesc' ],
			columns : [ {
				header : 'opeHisId',
				dataIndex : 'opeHisId',
				hidden : true
			}, {
				header : '基金账号',
				isExp : true,
				dataIndex : 'customerid',
				renderer : function(val) {
					return val.customeridName;
				}
			}, {
				header : '基金名称',
				isExp : true,

				dataIndex : 'opeUseId'
			}, {
				header : '开户日期',
				isExp : true,

				dataIndex : 'rowDat'
			}, {
				header : '关联账号',
				isExp : true,

				dataIndex : 'rowDat'
			}, {
				header : '开户渠道',
				isExp : true,

				dataIndex : 'opeTypId'
			}, {
				header : '分红方式',
				isExp : true,

				dataIndex : 'opeResDesc'
			}, {
				header : '账单邮寄方式',
				isExp : true,

				dataIndex : 'opeResDesc'
			}, {
				header : '状态',
				isExp : true,

				dataIndex : 'opeResDesc'
			}]
		//end of columns
	});

		this.gridPanel.addListener('rowdblclick', this.rowClick);
		// 交易历史开始

		this.hisPanel = new Ext.Panel({
					region : 'south',
					layout : 'fit',
					collapsible : true,
					autoScroll : true,
					id : 'HisPanel',
					title : '交易明细',
					split : true,
					height : 100
				});
		//交易历史结束

		
		// 主框架开始
		this.mainPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
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
								fieldLabel : '客户号',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							},{
								fieldLabel : '客户名称',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							},{
								fieldLabel : '机构代码',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							},{
								fieldLabel : '经济性质',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							},{
								fieldLabel : '行业类别',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							},{
								fieldLabel : '级别',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
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
								maxLength : 512
							},{
								fieldLabel : '卡号',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
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
