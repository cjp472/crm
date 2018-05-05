/**
 * @author:cf0666@gmail.com
 * @class MonmytargetwManagerView
 * @extends Ext.Panel
 * @description [QcTemplate]管理
 * @company 优创融联科技
 * @createtime:
 */
MonmytargetView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		MonmytargetView.superclass.constructor.call(this, {
					id : 'MonmytargetViewWin',
					title : '我的目标',
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
					id : 'QcTemplateSearchPanel',
					height : 35,
					items : [{
								border : false,
								width : 50,
								style : 'text-align:right',
								html : '指标名：'
							}, {
								name : 'zhiBiaoName',
								style:'margin-top:3px',
								xtype : 'textfield'
							}, 
							{
								border : false,
								width : 50,
								html : '年月：'
							}, 
							{
								id:'nyrs',
								name : 'Q_perDat_D_EQ_RW',
								style:'margin-top:3px',
								xtype : 'datefield',
								width:160,
								format:'Y-m-d'
							},	
							{
							    id:'myrenwuzhouqi',
								xtype:'combo',
								hidden:true,
								mode:'local',
								store:new Ext.data.SimpleStore({
									fields:['value','name'],
									data:[['1','季度'],['2','月份']]
								}),
								valueField:'value',
								displayField:'name',
								triggerAction:'all',
								hiddenName:'value',
								value:'2',
								listeners:{
								'select':function(combo,record,index){
									if(index == 0){
										Ext.getCmp('jidu').show();
										Ext.getCmp('yuefen').hide();
										Ext.getCmp('nf').setRawValue('');
										Ext.getCmp('jdno').setValue('');
									}else{
										Ext.getCmp('yuefen').show();
										Ext.getCmp('jidu').hide();
										Ext.getCmp('nyr').setRawValue('');
									}
								}
							}
						},
							{
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

		
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			printable : false,
			exportable : false,
			lazyLoad:true,
			id : 'QcRuleGrid',
			url : __ctxPath + "/customer/listWoDeZhiBiaoSysEmpPerformance.do",
//			url : __ctxPath + "/customer/listdetailSysEmpPerformance.do?ny_quarter_nd="+ny_quarter_nd,
			fields : [{
						name : 'empPerId',
						type : 'Long'
					},'wanchengliang','month','zhibiaoxiang','zhibiaoNam','jinetuotoulv','danshutuotoulv','daxiaolv','wanchenglv','validOrderCash','yongjin','perDat','userNam','employeeNo','depNam','empPerQuarter','empPerNd'],
			columns : [
//				{
//				
//						header : 'chkRulId',
//						dataIndex : 'chkRulId',
//						hidden : true
//					}, 
					{
						header : '月份',
						dataIndex : 'month',
						isExp : false
					}, {
						header : '指标名',
						isExp : false,
						dataIndex : 'zhibiaoNam'
					}, {
						header : '指标',
						isExp : false,
						dataIndex : 'zhibiaoxiang'
					}, {
						header : '完成量',
						isExp : false,
						dataIndex : 'wanchengliang'
					},{
						header : '完成率',
						isExp : false,
						dataIndex : 'wanchenglv'
					}]
				// end of columns
			});

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		Ext.getCmp('nyrs').setRawValue('');
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
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('MontargetmyManagerFormWin');
		if (aForm != null) {
			tabs.remove('MontargetmyManagerFormWin');
		}
		aForm = new MontargetManagerForm();
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/qucon/multiDelQcChkRul.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/qucon/multiDelQcChkRul.do',
					grid : this.gridPanel,
					idName : 'chkRulId'
				});
	},
	enableRs : function(id) {
		//在Ajax内部，this作用域改变了
		var grid = Ext.getCmp('QcRuleGrid');
		Ext.Msg.confirm('信息确认', '您确认要启用记录吗？', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request( {
					url : __ctxPath + '/qucon/multiEnableQcChkRul.do',
					params : {
						ids : id
					},
					method : 'POST',
					success : function(response, options) {
						grid.getStore().reload();
						Ext.ux.Toast.msg('操作信息', '成功启用记录！');
					},
					failure : function(response, options) {
						Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
					}
				});
			}
		});
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
	editRs : function(id) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcRuleForm');
		if (aForm != null) {
			tabs.remove('QcRuleForm');
		}
		aForm = new QcRuleForm({
					ruleId : id
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	allocate : function(id_rule) {
		UserSelector.getView(function(id_user, name){
			Ext.Ajax.request( {
				url : __ctxPath + '/qucon/allocateQcChkRul.do',
				params : {
					userId : id_user,
					ruleId : id_rule
				},
				method : 'POST',
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);
					var size = result.size;
					Ext.ux.Toast.msg('操作信息', '本次抽取共取得了' + size + '条记录。');
				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
			});
		}, true, false).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.chkRulId);
				break;
			case 'btn-edit' :
				this.createRs.call(this);
				break;
			default :
				break;
		}
	}
});
