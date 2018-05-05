
ConServiceRequestView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ConServiceRequestView.superclass.constructor.call(this, {
			id : 'ConServiceRequestViewWin',
			title : '所有请求',
			region : 'center',
			layout : 'border',
			items : [ this.searchPanel, this.gridPanel ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
			[ 'customerid', '客户ID',  new Ext.form.NumberField( {
				name : 'customerid',
				allowBlank : true
			}) ], [ 'linkmanid', '联系人ID', new Ext.form.NumberField( {
				name : 'linkmanid',
				allowBlank : true
			}) ], [ 'type', '类型', new Ext.form.NumberField( {
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
			}) ] 
		]
		var ConServiceRequestAdvancedSearchWin = Ext.extend(
			MT.AdvancedSearchWin, {
				title : '[ConServiceRequest]高级查询',
				fieldData : fieldnameComboData
		});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel( {
			layout : 'hbox',
			region : 'north',
			id : 'ConServiceRequestSearchPanel',
			height : 35,
			items : [{
				border:false,
				style:'text-align:right',
				html:'请求号码/地址：'
			}, {
				name : 'Q_callNo_L_EQ',
				xtype : 'textfield',
				width:100
			}
			,  {
				border:false,
				style:'text-align:right',
				html:'受理人：'
			}, {
				name : 'Q_accept_S_LK',
				xtype : 'textfield',
				width:80
			}, {
				border:false,
				style:'text-align:right',
				html:'请求时间：'
			}, {
				xtype : 'datefield',
				format : 'Y-m-d',
				name : 'Q_acceptDate_D_GE',
				id : 'ConServiceRequest.acceptDate_from',
				editable : false
			}, {
				text : '-'
			}, {
				xtype : 'datefield',
				format : 'Y-m-d',
				name : 'Q_acceptDate_D_LE',
				id : 'ConServiceRequest.acceptDate_to',
				editable : false
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
			printable : false,
			exportable : false,
			lazyLoad :false,
			showSm : false,
			tbar:['->',{
				text:'新增',
				iconCls:'btn-add',
				handler:function(){
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('ConServiceRequestAddFormWin');
					if (aForm != null) {
						tabs.remove('ConServiceRequestAddFormWin');
					}
					aForm = new ConServiceRequestAddForm();
					tabs.add(aForm);
					tabs.activate(aForm);		
				}
			}],
			id : 'ConServiceRequestGrid',
			url : __ctxPath + "/customer/listConServiceRequest.do",
			fields : [ {
				name : 'serviceRequestId',
				type : 'int'
			}, 'customerName', 'type', 'source', 'callNo',
					 'busType', 'customer', 'accept', 'acceptDate',
					'starttime', 'endtime', 'status'],
			columns : [ {
				header : '内码',
				dataIndex : 'serviceRequestId',
				hidden : true
			}, {
				header : '请求类型',
				isExp : false,
				dataIndex : 'type',
				renderer : function(value) {
					if (value != '' || value == '0'){
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
					if (value != '' || value == '0'){
						return CONLYLB.get(value);
					}else {
						return ' ';
					}
				}
			}, {
				header : '请求号码/地址',
				isExp : false,
				dataIndex : 'callNo'
			}, {
				header : '请求事项',
				isExp : false,
				dataIndex : 'busType',
				renderer : function(value) {
					if (value != '') {
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
					if (value != null && value != '' && value != 'null'){
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
				header : '要求完成时间',
				isExp : false,
				dataIndex : 'starttime'
			}, {
				header : '完成时间',
				isExp : false,
				dataIndex : 'endtime'
			}, {
				header : '状态',
				isExp : false,
				dataIndex : 'status',
				renderer:function(value){
					if (value != '') {
						return CON_REQ_STATUS.get(value);
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
//				},{
//					iconCls : 'btn-task',
//					qtip : '处理',
//					style : 'margin:0 3px 0 3px'
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
		document.getElementById('ConServiceRequest.acceptDate_from').value = '';
		document.getElementById('ConServiceRequest.acceptDate_to').value = '';
		this.searchPanel.getForm().reset();
	},
	//按条件搜索
	onSearch : function(obj) {
		var searchPanel = Ext.getCmp('ConServiceRequestSearchPanel');
		var gridPanel = Ext.getCmp('ConServiceRequestGrid');
		//	if (searchPanel.getForm().isValid()) {
		
		$search( {
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
		//				}
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
