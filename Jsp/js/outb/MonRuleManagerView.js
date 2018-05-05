/**
 * @author:cf0666@gmail.com
 * @class MonRuleManagerView
 * @extends Ext.Panel
 * @description [QcTemplate]管理
 * @company 优创融联科技
 * @createtime:
 */
MonRuleManagerView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		MonRuleManagerView.superclass.constructor.call(this, {
					id : 'MonRuleManagerViewWin',
					title : '佣金规则管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['tmpName', '名称', new Ext.form.TextField({
									name : 'tmpName',
									allowBlank : true
								})],
				['tmpContent', '描述', new Ext.form.TextField({
									name : 'tmpContent',
									allowBlank : true
								})],
				['chkTypeId', '考评方式&QC_PFFS', new MT.DicComboBox({
									hiddenName : 'chkTypeId',
									itemKey : 'QC_MBZT'
								})],
				['allowRemark', '是否允许填写备注&YorN', new MT.DicComboBox({
									hiddenName : 'allowRemark',
									itemKey : 'QC_MBZT'
								})],
				['allowRecheck', '是否允许复议&YorN', new MT.DicComboBox({
									hiddenName : 'allowRecheck',
									itemKey : 'QC_MBZT'
								})], ['baseScore', '基础分', new MT.DicComboBox({
									hiddenName : 'baseScore',
									itemKey : 'QC_MBZT'
								})], ['minScore', '最低分', new MT.DicComboBox({
									hiddenName : 'minScore',
									itemKey : 'QC_MBZT'
								})], ['maxScore', '最高分', new MT.DicComboBox({
									hiddenName : 'maxScore',
									itemKey : 'QC_MBZT'
								})], ['remark', '备注', new Ext.form.TextField({
									name : 'remark',
									allowBlank : true
								})], ['creUseId', '创建人ID', new MT.DicComboBox({
									hiddenName : 'creUseId',
									itemKey : 'QC_MBZT'
								})],
				['creDat', '创建日期', new Ext.form.DateField({
									hiddenName : 'creDat',
									format : 'Y-m-d'
								})], ['updUseId', '修改人ID', new MT.DicComboBox({
									hiddenName : 'updUseId',
									itemKey : 'QC_MBZT'
								})],
				['updDat', '修改日期', new Ext.form.DateField({
									hiddenName : 'updDat',
									format : 'Y-m-d'
								})],
				['staId', '状态：有效、注销&QC_MBZT', new MT.DicComboBox({
									hiddenName : 'staId',
									itemKey : 'QC_MBZT'
								})]]
		var QcTemplateAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '佣金规则高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					//id : 'QcTemplateSearchPanel',
					height : 35,
					items : [{
								border : false,
								width : 50,
								style : 'text-align:right',
								html : '规则名：'
							}, 
							{
								name : 'Q_ruleName_S_LK',
								xtype : 'textfield'
							}, {
								border : false,
								width : 50,
								style : 'text-align:right',
								html : '状态：'
							}, {

								hiddenName : 'Q_staId_SN_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'QC_MBZT'
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
									new QcTemplateAdvancedSearchWin().show();
								}
							}],
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

		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-add',
								// text : __create+'[QcTemplate]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-setting',
								// text : __create+'[QcTemplate]',
								text : '启用',
								xtype : 'button',
								scope : this,
								handler : this.enableSelRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[QcTemplate]',
								text : '注销',
								xtype : 'button',
								scope : this,
								handler : this.zhuxiaoSelRs
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'FreeRuleGrid',
			url : __ctxPath + '/customer/listObFeeRule.do',
			fields : [{
						name : 'feeRuleId',
						type : 'Long'
					}, 'ruleName','effectiveTime','failureTime','calculationWay','createBy','createDate','comments','staId','createByName','obFeeIndexProjectNam'],
			columns : [{
						header : 'feeRuleId',
						dataIndex : 'feeRuleId',
						hidden : true
					}, {
						header : '规则名',
						dataIndex : 'ruleName',
						isExp : false
					}, {
						header : '有效时间',
						isExp : false,
						dataIndex : 'effectiveTime'
					}, {
						header : '失效时间',
						isExp : false,
						dataIndex : 'failureTime'
					},{
						header : '佣金依据指标',
						isExp : false,
						dataIndex : 'obFeeIndexProjectNam'
					},{
						header : '计算方式',
						isExp : false,
						dataIndex : 'calculationWay',
						renderer : function(value) {
							return CONOB_FEE_YJSSFS.get(value);
						}
					}, {
						header : '创建人',
						isExp : false,
						dataIndex : 'createByName'
					}, {
						header : '创建时间',
						isExp : false,
						dataIndex : 'createDate'
					}, {
						header : '备注',
						isExp : false,
						hidden:true,
						dataIndex : 'comments'
					}, {
						header : '状态',
						isExp : false,
						dataIndex : 'staId',
						renderer : function(value) {
							return CONOB_FEE_YJZT.get(value);
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [
									   {
											iconCls : 'btn-edit',
											qtip : __edit,
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-setting',
											qtip : '启用',
											style : 'margin:0 3px 0 3px'
										},{
											iconCls : 'btn-del',
											qtip : __delete,
											style : 'margin:0 3px 0 3px'
										},{
											iconCls : 'add-user',
											qtip : '分配',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		$search({
				searchPanel : this.searchPanel,
				gridPanel : this.gridPanel
			});
	},
	// 创建记录
	createRs : function() {
		shiyongduixiang='';
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('MonRuleManagerWin');
		if (aForm != null) {
			tabs.remove('MonRuleManagerWin');
		}
		aForm = new ObFeeRuleForm({
							feeRuleId : null
						});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/customer/multiDelObFeeRule.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID注销ro删除
	zhuxiaoSelRs : function() {
		var rows = Ext.getCmp("FreeRuleGrid").getSelectionModel().getSelections();
		var huosta=rows[0].data.staId;
		for (var i = 0; i < rows.length; i++) {
		if(huosta==0){
			$gridRs({
				url : __ctxPath + '/customer/multiDelObFeeRule.do',
				grid : this.gridPanel,
				idName : 'feeRuleId',
				msgNull : '请选择要删除的记录！',
				msgTip : '您确认要删除所选记录吗？',
				msgSuccess : '成功删除该记录！',
				msgFailure : '操作出错，请联系管理员！'
		});
			}
		}
		if(huosta==1){
		   $gridRs({
				url : __ctxPath + '/customer/zhuXiaoGuiZeObFeeRule.do',
				grid : this.gridPanel,
				idName : 'feeRuleId',
				msgNull : '请选择要注销的记录！',
				msgTip : '您确认要注销所选记录吗？',
				msgSuccess : '成功注销该记录！',
				msgFailure : '操作出错，请联系管理员！'
		});
	}
	},
	//启用
	enableRs : function(id) {
		//在Ajax内部，this作用域改变了
		$gridRs({
			url : __ctxPath + '/customer/qiYongGuiZeObFeeRule.do',
			grid : this.gridPanel,
			idName : 'feeRuleId',
			msgNull : '请选择要启用的记录！',
			msgTip : '您确认要启用所选记录吗？',
			msgSuccess : '成功启用该记录！',
			msgFailure : '操作出错，请联系管理员！'
				});
//		Ext.Msg.confirm('信息确认', '您确认要启用记录吗？', function(btn) {
//			if (btn == 'yes') {
//				Ext.Ajax.request( {
//					url : __ctxPath + '/customer/multiDelObFeeRule.do',
//					params : {
//						ids : id
//					},
//					method : 'POST',
//					success : function(response, options) {
//						grid.getStore().reload();
//						Ext.ux.Toast.msg('操作信息', '成功启用记录！');
//					},
//					failure : function(response, options) {
//						Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
//					}
//				});
//			}
//		});
	},
	enableSelRs : function() {
		var ids = $getGdSelectedIds(this.gridPanel, 'chkRulId');
		if (ids.length == 0) {
			Ext.ux.Toast.msg("操作信息", "请选择要启用的记录！");
			return;
		}
		this.enableRs.call(this, ids);
	},
	// 编辑Rs
	editRs : function(record) {
		shiyongduixiang='';
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('MonRuleManagerWin');
		if (aForm != null) {
			tabs.remove('MonRuleManagerWin');
		}
		aForm = new ObFeeRuleForm({
					feeRuleId :  record.data.feeRuleId,
					calculationWay: record.data.calculationWay
					
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	allocate : function(id_rule) {
		var depid ='';
		ObGuiZeShiYongDuiXiangSelector.prototype.setup(
		function(rows) {
			for (var i = 0, r; r = rows[i]; i++) {
				 depid += rows[i].get('depid')+","
			}
			Ext.Ajax.request({
			url : __ctxPath + '/customer/obFeeRuleBDZuZhiJiGouObFeeRule.do?feeRuleId='+ id_rule,
			method : 'post',
			params : {
				jigouId:depid,
				id_rule:id_rule
				},
			success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);
					var size = result.size;
					Ext.ux.Toast.msg('操作信息', '使用对象已分配');
				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
		});

			
			
//		Ext.getCmp('obCom.ownerTeamNam').setValue(jigouNam);
//		Ext.getCmp('obCom.ownerTeam').setValue(jigouId);
				}).show();
         
		
//		UserSelector.getView(function(id_user, name){
//			Ext.Ajax.request( {
//				url : __ctxPath + '/qucon/allocateQcChkRul.do',
//				params : {
//					userId : id_user,
//					ruleId : id_rule
//				},
//				method : 'POST',
//				success : function(response) {
//					var result = Ext.util.JSON.decode(response.responseText);
//					var size = result.size;
//					Ext.ux.Toast.msg('操作信息', '本次抽取共取得了' + size + '条记录。');
//				},
//				failure : function(response, options) {
//					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
//				}
//			});
//		}, true, false).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.zhuxiaoSelRs.call(this, record.data.feeRuleId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-setting' :
				this.enableRs.call(this, record.data.feeRuleId);
				break;
			case 'add-user' :
				this.allocate.call(this, record.data.feeRuleId);
				break;
			default :
				break;
		}
	}
});
