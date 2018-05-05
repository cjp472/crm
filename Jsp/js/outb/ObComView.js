/**
 * @author:cf0666@gmail.com
 * @class ObComView
 * @extends Ext.Panel
 * @description [ObCom]管理
 * @company 优创融联科技
 * @createtime:
 */
ObComView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ObComView.superclass.constructor.call(this, {
			id : 'ObComViewWin',
			title : '营销活动管理',
			region : 'center',

			iconCls : 'menu-form',
			layout : 'border',
			items : [ this.searchPanel, this.gridPanel ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// var fieldnameComboData = [
		// ['projId', '项目内码', new Ext.form.ComboBox({
		// editabel : false,
		// lazyInit : false,
		// triggerAction : 'all',
		// store : new Ext.data.SimpleStore({
		// autoLoad : true,
		// url : __ctxPath + '/outb/listprojId.do',
		// fields : ['projId', 'projIdName']
		// }),
		// displayField : 'projIdName',
		// valueField : 'projId',
		// id : 'projId'
		// })],
		// ['obComNam', '活动主题', new Ext.form.TextField({
		// name : 'obComNam',
		// allowBlank : true
		// })],
		// ['comCod', '活动编码', new Ext.form.TextField({
		// name : 'comCod',
		// allowBlank : true
		// })],
		// ['obComDes', '活动描述', new Ext.form.TextField({
		// name : 'obComDes',
		// allowBlank : true
		// })],
		// ['ownerTeam', '所属机构', new MT.DicComboBox({
		// hiddenName : 'ownerTeam',
		// itemKey : 'CONOB_COM_HDZT'
		// })],
		// ['perIncharge', '负责人', new MT.DicComboBox({
		// hiddenName : 'perIncharge',
		// itemKey : 'CONOB_COM_HDZT'
		// })],
		// ['staDat', '开始时间', new Ext.form.DateField({
		// hiddenName : 'staDat',
		// format : 'Y-m-d'
		// })],
		// ['endDat', '结束时间', new Ext.form.DateField({
		// hiddenName : 'endDat',
		// format : 'Y-m-d'
		// })],
		// ['busiTypId', '业务类型：自定义&CONOB_COM_YWLX', new MT.DicComboBox({
		// hiddenName : 'busiTypId',
		// itemKey : 'CONOB_COM_HDZT'
		// })],
		// ['execTypId', '执行渠道方式：同<渠道类型>&CONOB_COM_ZXQDFS',
		// new MT.DicComboBox({
		// hiddenName : 'execTypId',
		// itemKey : 'CONOB_COM_HDZT'
		// })],
		// ['obComStaId', '活动状态&CONOB_COM_HDZT', new MT.DicComboBox({
		// hiddenName : 'obComStaId',
		// itemKey : 'CONOB_COM_HDZT'
		// })]]
		var ObComAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
			title : '[ObCom]高级查询'
		// fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel( {
			layout : 'hbox',
			region : 'north',
			id : 'ObComSearchPanel',
			height : 35,
			items : [ {
				xtype : 'panel',
				width : 60,
				style : 'text-align:right',
				html : '活动主题：'

			}, {

				name : 'Q_obComNam_S_LK',
				xtype : 'textfield'
				
			}, {
				xtype : 'panel',
				width : 70,
				style : 'text-align:right',
				html : '活动状态：'

			}, {

				hiddenName : 'Q_obComStaId_L_EQ',
				xtype : 'mtdiccombo',
				editable : false,
				lazyInit : false,
				forceSelection : false,
				itemKey : 'CONOB_COM_HDZT'
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
					new ObComAdvancedSearchWin().show();
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

		this.topbar = new Ext.Toolbar( {
			items : [ '->', {
				iconCls : 'btn-add',
				// text : __create+'[ObCom]',
				text : __create,
				xtype : 'button',
				scope : this,
				handler : this.createRs
			}, {
				iconCls : 'btn-setting',
				// text : __create+'[ObCom]',
				text : '批量启用',
				xtype : 'button',
				scope : this,
				handler : this.qiyonglRs
			}
			//									, {
				//										iconCls : 'btn-del',
				//										// text : __delete+'[ObCom]',
				//										text : __delete,
				//										xtype : 'button',
				//										scope : this,
				//										handler : this.removeSelRs
				//									}
				]
			});

		this.gridPanel = new HT.GridPanel( {
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'ObComGrid',
			url : __ctxPath + "/outb/listObCom.do",
			fields : [ {
				name : 'comId',
				type : 'int'
			}, 'obCom', 'obComNam', 'comCod', 'obComDes', 'ownerTeam',
					'perIncharge', {
						name : 'staDat',
						dateFormat : 'Y-m-d H:i:s',
						type : 'date'
					}, {
						name : 'endDat',
						dateFormat : 'Y-m-d H:i:s',
						type : 'date'
					}, 'busiTypId', 'execTypId', 'obComStaId', 'ownerTeamNam',
					'perInchargeNam','projectNam',
					'yeWuLeiXing' ],
			columns : [
					{
						header : 'comId',
						dataIndex : 'comId',
						hidden : true
					},
					{
						header : '活动主题',
						isExp : false,

						dataIndex : 'obComNam'
					},
					{
						header : '活动类型',
						isExp : false,
						dataIndex : 'busiTypId',
						renderer : function(value) {
							return CONTPJYLX.get(value);
							}
					},
					{
						header : '执行方式',
						isExp : false,

						dataIndex : 'execTypId',
						renderer : function(value) {
							return LXFS001.get(value);
						}
					},
					// {
					// header : '活动描述',
					// isExp : false,
					//
					// dataIndex : 'obComDes'
					// },
					{
						header : '开始时间',
						isExp : false,
						xtype : 'datecolumn',
						format : 'Y-m-d',
						dataIndex : 'staDat'
					},
					{
						header : '结束时间',
						isExp : false,
						xtype : 'datecolumn',
						format : 'Y-m-d',
						dataIndex : 'endDat'
					},
					{
						header : '营销项目',
						isExp : false,
						dataIndex : 'projectNam'

					},
					{
						header : '负责人',
						isExp : false,
						dataIndex : 'perInchargeNam'
					},
					{
						header : '状态',
						isExp : false,
						dataIndex : 'obComStaId',
						renderer : function(value) {
							return CONOB_COM_HDZT.get(value);
						}
					},
					new Ext.ux.grid.RowActions( {
						header : __action,
						width : 120,
						actions : [
								{
									iconCls : 'btn-edit',
									qtip : __edit,
									style : 'margin:0 3px 0 3px'
								},
								{
									iconCls : 'control_pause',
									qtip : '暂停',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('obComStaId');
										if (status == '2' || status == '4') {//3——暂停
										return true;
									} else {
										return false;
									}
								}
								},
								{},
								{
									iconCls : 'btn-reset',
									qtip : '恢复',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('obComStaId');
										if (status == '3') {//4——执行中
										return true;
									} else {
										return false;
									}
								}
								},
								{
									iconCls : 'btn-settingdoulbe',
									qtip : '启用',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('obComStaId');
										if (status == '1') {//2——执行中
										return true;
									} else {
										return false;
									}
								}
								},
								{},
								{
									iconCls : 'btn-del',
									qtip : '删除/注销',// __delete
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('obComStaId');
										if (status == 4 || status == 3
												|| status == 2 || status == 1) {
											return true;
										} else {
											return false;
										}
									}
								} ],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					}) ]
		// end of columns
				});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		$search( {
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		str = '';
		productids = '';
		ctscr = '';
		paprelease = '';
		usergroupids = '';
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ObComForm');
		var aForm = Ext.getCmp('ObComFormWin');
		var aForm1 = Ext.getCmp('ObComDelFormWin');
		if (aForm1) {
			tabs.remove('ObComDelFormWin');
		}
		if (aForm != null) {
			tabs.remove('ObComFormWin');
		}
		grid.getSelectionModel().each(function(rec) {
			aForm = new ObComDelForm( {
				comId : rec.data.comId,
				execTypId : rec.data.execTypId
			});
			tabs.add(aForm);
			tabs.activate(aForm);
		});
	},
	// 创建记录
	createRs : function() {
		str = '';
		productids = '';
		ctscr = '';
		paprelease = '';
		usergroupids = '';
		// new ObComForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ObComFormWin');
		var aForm1 = Ext.get('ObComDelFormWin');
		if (aForm1!=null) {
			tabs.remove('ObComDelFormWin');
		}
		if (aForm!=null) {
			tabs.remove('ObComFormWin');
		}
		aForm = new ObComForm( {
			comId : null
		});
		tabs.add(aForm);
		tabs.activate(aForm);

	},

	// 批量启用活动
	qiyonglRs : function(id) {
		var rows = Ext.getCmp("ObComGrid").getSelectionModel().getSelections();
					   $gridRs( {
					url : __ctxPath + '/outb/qiYongHuoDongObCom.do',
					grid : this.gridPanel,
					idName : 'comId',
					msgNull : '请选择要启用的记录！',
					msgTip : '包含过期的营销活动是否要进行启用操作？',
					msgSuccess : '成功启用该记录！',
					msgFailure : '操作出错，请联系管理员！'
			 });
//		for (var i = 0; i < rows.length; i++) {
//			var enddate=rows[i].data.endDat;
//			var stadate=rows[i].data.staDat;
//		    if(enddate != ''){
//			if(enddate){
//				var dt = new Date();
//				var date1 = dt.format('Y-m-d');
//				bool1 = dt.between(stadate,enddate);
//			}
//			if (!bool1) {
//
//			}else{
//               $gridRs( {
//					url : __ctxPath + '/outb/qiYongHuoDongObCom.do',
//					grid : this.gridPanel,
//					idName : 'comId',
//					msgNull : '请选择要启用的记录！',
//					msgTip : '包含过期的营销活动是否要进行启用操作？',
//					msgSuccess : '成功启用该记录！',
//					msgFailure : '操作出错，请联系管理员！'
//			 });
//			}
//			}else{
//				Ext.ux.Toast.msg('操作信息', '请填写活动所属的项目！');
//				return;
//			 }
//		}

	},
	//单条启用
		qiyongdoublelRs : function(id) {
		var rows = Ext.getCmp("ObComGrid").getSelectionModel().getSelections();
		for (var i = 0; i < rows.length; i++) {
			var enddate=rows[i].data.endDat;
			var stadate=rows[i].data.staDat;
		    if(enddate != ''){
			if(enddate){
				var dt = new Date();
				var date1 = dt.format('Y-m-d');
				bool1 = dt.between(stadate,enddate);
			}
			if (!bool1) {
				Ext.ux.Toast.msg('操作信息', '该活动已过期！');
				return;
			}else{
             $gridRs( {
					url : __ctxPath + '/outb/qiYongHuoDongObCom.do',
					grid : this.gridPanel,
					idName : 'comId',
					msgNull : '请选择要启用的记录！',
					msgTip : '您确认要启用未过期的营销活动吗？',
					msgSuccess : '成功启用该记录！',
					msgFailure : '操作出错，请联系管理员！'
			 });
			}
			}else{
				Ext.ux.Toast.msg('操作信息', '请填写活动所属的项目！');
				return;
			 }
		}

	},
	// 按ID暂停活动
	zantinglRs : function() {

		$gridRs( {
			url : __ctxPath + '/outb/zanTingHuoDongObCom.do',
			grid : this.gridPanel,
			idName : 'comId',
			msgNull : '请选择要暂停的记录！',
			msgTip : '您确认要暂停所选记录吗？',
			msgSuccess : '成功暂停该记录！',
			msgFailure : '操作出错，请联系管理员！'
		});
	},
	// 按ID恢复活动
	huifulRs : function() {

		$gridRs( {
			url : __ctxPath + '/outb/huiFuHuoDongObCom.do',
			grid : this.gridPanel,
			idName : 'comId',
			msgNull : '请选择要恢复的记录！',
			msgTip : '您确认要恢复所选记录吗？',
			msgSuccess : '成功恢复该记录！',
			msgFailure : '操作出错，请联系管理员！'
		});
	},
	// 按ID删除记录
	removeRs : function(id) {
		var rows = Ext.getCmp("ObComGrid").getSelectionModel().getSelections();
		var huosta = rows[0].data.obComStaId;
		if (huosta == 2 || huosta == 3 || huosta == 4) {
			$gridRs( {
				url : __ctxPath + '/outb/zhuXiaoHuoDongObCom.do',
				grid : this.gridPanel,
				idName : 'comId',
				msgNull : '请选择要注销的记录！',
				msgTip : '您确认要注销所选记录吗？',
				msgSuccess : '成功注销该记录！',
				msgFailure : '操作出错，请联系管理员！'
			});

		} else {

			//Ext.ux.Toast.msg('操作信息', '该话题未启动！');
			if (huosta == 1) {
				$postSubmit( {
					url : __ctxPath + '/outb/multiDelObCom.do',
					ids : id,
					grid : this.gridPanel,
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			}
		}

	},
	// 把选中ID删除
	removeSelRs : function() {
		var rows = Ext.getCmp("ObComGrid").getSelectionModel().getSelections();
		var huosta = rows[0].data.obComStaId;
		if (huosta == 1 || huosta == 5) {
			$gridRs( {
				url : __ctxPath + '/outb/multiDelObCom.do',
				grid : this.gridPanel,
				idName : 'comId',
				msgNull : '请选择要删除的记录！',
				msgTip : '您确认要删除所选记录吗？',
				msgSuccess : '成功删除该记录！',
				msgFailure : '操作出错，请联系管理员！'
			});
		} else {
			Ext.ux.Toast.msg('操作信息', '该话题已启动！');
		}
	},
	// 编辑Rs
	editRs : function(record) {
		str = '';
		productids = '';
		ctscr = '';
		paprelease = '';
		usergroupids = '';
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ObComDelFormWin');
		if (aForm != null) {
			tabs.remove('ObComDelFormWin');
		}
		var aForm = Ext.getCmp('ObComFormWin');
		if (aForm != null) {
			tabs.remove('ObComFormWin');
		}
		aForm = new ObComDelForm( {
			comId : record.data.comId,
			execTypId : record.data.execTypId,
			obComStaId : record.data.obComStaId
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action control_pause btn-reset btn-settingdoulbe
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
		case 'btn-del':
			this.removeRs.call(this, record.data.comId);
			break;
		case 'btn-setting':
			this.qiyonglRs.call(this, record.data.comId);
			break;
		case 'btn-settingdoulbe':
			this.qiyongdoublelRs.call(this, record.data.comId);
			break;
		case 'control_pause':
			this.zantinglRs.call(this, record.data.comId);
			break;
		case 'btn-reset':
			this.huifulRs.call(this, record.data.comId);
			break;
		case 'btn-edit':
			this.editRs.call(this, record);
			break;
		default:
			break;
		}
	}
});
