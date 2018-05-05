
HaveOverServiceView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		HaveOverServiceView.superclass.constructor.call(this, {
			id : 'HaveOverServiceViewWin',
			title : '已结案请求管理',
			region : 'center',
			layout : 'border',
			items : [ this.searchPanel, this.gridPanel ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				 [ 'type', '类型', new Ext.form.NumberField( {
					name : 'type',
					allowBlank : true
				}) ], [ 'busType', '业务类型', new Ext.form.NumberField( {
					name : 'busType',
					allowBlank : true
				}) ], [ 'content', '内容', new Ext.form.TextField( {
					name : 'content',
					allowBlank : true
				}) ], [ 'accept', '受理人', new Ext.form.NumberField( {
					name : 'accept',
					allowBlank : true
				}) ], [ 'acceptDate', '受理时间', new Ext.form.DateField( {
					hiddenName : 'acceptDate',
					format : 'Y-m-d'
				}) ], [ 'urgent', '紧急程度', new Ext.form.NumberField( {
					name : 'urgent',
					allowBlank : true
				}) ], [ 'starttime', '开始时间', new Ext.form.DateField( {
					hiddenName : 'starttime',
					format : 'Y-m-d'
				}) ], [ 'endtime', '结束时间', new Ext.form.DateField( {
					hiddenName : 'endtime',
					format : 'Y-m-d'
				}) ], [ 'source', '来源', new Ext.form.NumberField( {
					name : 'source',
					allowBlank : true
				}) ], [ 'status', '状态', new Ext.form.NumberField( {
					name : 'status',
					allowBlank : true
				}) ], [ 'substatus', '子状态', new Ext.form.NumberField( {
					name : 'substatus',
					allowBlank : true
				}) ], [ 'creUseId', '创建人ID', new Ext.form.NumberField( {
					name : 'creUseId',
					allowBlank : true
				}) ], [ 'creDat', '创建日期', new Ext.form.DateField( {
					hiddenName : 'creDat',
					format : 'Y-m-d'
				}) ], [ 'updUseId', '修改人ID', new Ext.form.NumberField( {
					name : 'updUseId',
					allowBlank : true
				}) ], [ 'updDat', '修改日期', new Ext.form.DateField( {
					hiddenName : 'updDat',
					format : 'Y-m-d'
				}) ], [ 'note', '备注', new Ext.form.TextField( {
					name : 'note',
					allowBlank : true
				}) ] ]
		var ConServiceRequestAdvancedSearchWin = Ext.extend(
				MT.AdvancedSearchWin, {
					title : '已结案请求高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel( {
			layout : 'hbox',
			region : 'north',
			id : 'HaveOverConServiceRequestSearchPanel',
			height : 35,
			items :  [{
				border:false,
				style:'text-align:right',
				html:'请求号码/地址：'
			}, {
				name : 'Q_callNo_L_EQ',
				xtype : 'textfield',
				editable : false,
				lazyInit : false,
				width:100
			}
			,  {
				border:false,
				style:'text-align:right',
				html:'受理人：'
			}, {
				name : 'Q_accept_S_LK',
				xtype : 'textfield',
				editable : false,
				lazyInit : false,
				width:80
			}, {
				border:false,
				style:'text-align:right',
				html:'请求时间：'
			}, {
				name : 'Q_acceptDate_D_GE',
				xtype : 'datefield',
				width:100,
				format : 'Y-m-d'
			},{
				xtype:'tbtext',
				text:'-'
			}, {
				name : 'Q_acceptDate_D_LE',
				xtype : 'datefield',
				width:100,
				format : 'Y-m-d'
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
					new ConServiceRequestAdvancedSearchWin().show();
				}
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
			//使用RowActions
			rowActions : true,
			lazyLoad :false,
			printable : false,
			exportable : false,
			id : 'HaveOverConServiceRequestGrid',
			url : __ctxPath + "/customer/listConServiceRequest.do?Q_status_L_EQ=2",
			fields : [ {
				name : 'serviceRequestId',
				type : 'int'
			}, 'customerName', 'type', 'source', 'callNo',
					 'busType', 'callNo','customer', 'accept', 'acceptDate',
					'starttime', 'endtime', 'status','substatus','linkType'],
			columns : [ {
				header : 'serviceRequestId',
				dataIndex : 'serviceRequestId',
				hidden : true
			}, {
				header : '请求类型',
				isExp : false,
				dataIndex : 'type',
				renderer : function(value) {
					if (value != null && value != '' && value != 'null' || value == '0'){
						return CONTPJYLX.get(value);
					}else {
						return ' ';
					}
				}
			}, {
				header : '来源',
				isExp : false,
				dataIndex : 'source',
				renderer : function(value) {
					if (value != null && value != '' && value != 'null' || value == '0'){
						return CONLYLB.get(value);
					}else {
						return ' ';
					}
				}
			}, {
				header : '请求方式',
				isExp : false,
				dataIndex : 'linkType',
				renderer : function(val) {
					if (val != null || val == '0'){
						return LXFS001.get(val);
					}else {
						return ' ';
					}
					
				}
			}, {
				header : '请求号码/地址',
				isExp : false,
				dataIndex : 'callNo'
			},  {
				header : '请求事项',
				isExp : false,
				dataIndex : 'busType',
				renderer : function(value) {
					if (value != null && value != '' && value != 'null' || value == '0') {
						return CONTPCLJG.get(value);
					} else {
						return ' ';
					}
				}
			}, {
				header : '客户',
				isExp : false,
				dataIndex : 'customer',
				renderer : function(value) {
					if (value != null && value != '' && value != 'null' || value == '0'){
						return value.customerName;
					}else {
						return ' ';
					}
				}
			}, {
				header : '受理人',
				isExp : false,
				dataIndex : 'accept'
			}, {
				header : '请求时间',
				isExp : false,
				dataIndex : 'acceptDate'
			}, {
				header : '完成时间',
				isExp : false,
				dataIndex : 'endtime'
			}, {
				header : '状态',
				isExp : false,
				dataIndex : 'status',
				renderer:function(value){
					if (value != null && value != '' && value != 'null' || value == '0') {
						return CON_REQ_STATUS.get(value);
					} else {
						return ' ';
					}
				}
			}, {
				header : '子状态',
				isExp : false,
				dataIndex : 'substatus',
				renderer:function(value){
					if (value != null && value != '' && value != 'null' || value == '0') {
						return CON_REQ_SUBSTATUS.get(value);
					} else {
						return ' ';
					}
				}
			
			}, new Ext.ux.grid.RowActions( {
				header : __action,
				width : 60,
				actions : [ {
					iconCls : 'btn-readdocument',
					qtip : '查看',
					style : 'margin:0 3px 0 3px'
				}],
				listeners : {
					scope : this,
					'action' : this.onRowAction
				}
			}) ]
		//end of columns
				});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	//重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	//按条件搜索
	onSearch : function(obj) {
		var searchPanel = Ext.getCmp('HaveOverConServiceRequestSearchPanel');
		var gridPanel = Ext.getCmp('HaveOverConServiceRequestGrid');
		if (searchPanel.getForm().isValid()) {
			$search( {
				searchPanel : this.searchPanel,
				gridPanel : this.gridPanel
			});
		}
	},
	//GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			new ConServiceRequestForm( {
				serviceRequestId : rec.data.serviceRequestId
			}).show();
		});
	},
	//创建记录
	createRs : function() {
		//new ConServiceRequestForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConServiceRequestForm');
		if (aForm != null) {
			tabs.remove('ConServiceRequestForm');
		}
		aForm = new ConServiceRequestForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	//按ID删除记录
	removeRs : function(id) {
		$postSubmit( {
			url : __ctxPath + '/customer/multiDelConServiceRequest.do',
			ids : id,
			grid : this.gridPanel,
			msgTip : '您确认要删除所选记录吗？',
			msgSuccess : '成功删除该记录！',
			msgFailure : '操作出错，请联系管理员！'
		});
	},
	//把选中ID删除
	removeSelRs : function() {
		$gridRs( {
			url : __ctxPath + '/customer/multiDelConServiceRequest.do',
			grid : this.gridPanel,
			idName : 'serviceRequestId',
			msgNull : '请选择要删除的记录！',
			msgTip : '您确认要删除所选记录吗？',
			msgSuccess : '成功删除该记录！',
			msgFailure : '操作出错，请联系管理员！'
		});
	},
	//编辑Rs
	editRs : function(record,flag) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConServiceRequestFormWin');
		if (aForm != null) {
			tabs.remove('ConServiceRequestFormWin');
		}
		aForm = new ConServiceRequestForm( {
			serviceRequestId : record.data.serviceRequestId,
			flag:flag
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	//行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
		case 'btn-task':
			this.editRs.call(this, record,'deal');
			break;
		case 'btn-readdocument':
			this.editRs.call(this, record,'show');
			break;
		default:
			break;
		}
	}
});
