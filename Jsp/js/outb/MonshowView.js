/**
 * @author:cf0666@gmail.com
 * @class MonshowView
 * @extends Ext.Panel
 * @description [QcTemplate]管理
 * @company 优创融联科技
 * @createtime:
 */
MonshowView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		MonshowView.superclass.constructor.call(this, {
					id : 'MonshowViewWin',
					title : '佣金查询',
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
					layout : 'column',
					region : 'north',
					style:'padding:5px;background-color:#fff',
					defualts:{
						padding:5
					},
					//id : 'QcTemplateSearchPanel',
					height : 35,
					
					items : [
						{
								border : false,
								width : 50,
								style:'margin-top:3px',
								html : '周期：'
							}, 
						{
						    id:'zhouqi',
							xtype:'combo',
							mode:'local',
							store:new Ext.data.SimpleStore({
								fields:['value','name'],
								data:[['1','季度'],['2','月份']]
							}),
							valueField:'value',
							displayField:'name',
							triggerAction:'all',
							hiddenName:'value',
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
							border:false,
							layout:'column',
							id:'yuefen',
							hidden:true,
							style:'margin-left:10px',
							items:[
								{
									
									border : false,
									width : 50,
									style:'margin-top:3px',
									html : '年月：'
								}, 
								{
									id:'nyr',
									name : 'Q_perDat_D_EQ_pams',
									xtype : 'datefield',
									width:160,
									format:'Y-m-d'
								}]
						},
							{
							border:false,
							layout:'column',
							id:'jidu',
							hidden:true,
							style:'margin-left:10px',
							items:[
								{
									
									border : false,
									width : 50,
									style:'margin-top:3px',
									html : '年份：'
									}, 
								{   
								    id:'nf',
									name : 'Q_empPerNd_S_EQ_pams',
									xtype : 'datefield',
									width:160,
									format:'Y'
								},
								{
									border : false,
									width : 50,
									style:'margin-top:3px',
									html : '季度：'
									}, 
								{
									id:'jdno',
									xtype:'combo',
									mode:'local',
									store:new Ext.data.SimpleStore({
										fields:['jiduvalue','name'],
										data:[['1','一季度'],['2','二季度'],['3','三季度'],['4','四季度']]
									}),
									valueField:'jiduvalue',
									displayField:'name',
									triggerAction:'all',
//									name:'Q_empPerQuarter_S_EQ',
									hiddenName:'jiduvalue'
									
								}]
						},
							{
								xtype : 'button',
								text : __search,
								style:'margin-left:10px',
								iconCls : 'search',
								scope : this,
								handler : this.onSearch
							}, {
								xtype : 'button',
								text : __reset,
								style:'margin-left:10px',
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								style:'margin-left:10px',
								iconCls : 'search',
								scope : this,
								handler : function() {
									new QcTemplateAdvancedSearchWin().show();
								}
							}],
					border : false,
					frame : false
				});// end of searchPanel

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			printable : false,
			exportable : false,
			rowActions : true,
			lazyLoad:true,
			//id : 'QcRuleGrid',
			url : __ctxPath + "/customer/listSysEmpPerformance.do",
			fields : [{
						name : 'empPerId',
						type : 'Long'
					},'jinetuotoulv','danshutuotoulv','daxiaolv','wanchenglv','validOrderCash','yongjin','perDat','userNam','employeeNo','depNam','empPerQuarter','empPerNd'],
			columns : [{
						header : 'feeId',
						dataIndex : 'feeId',
						hidden : true
					}, {
						header : '姓名',
						dataIndex : 'userNam',
						isExp : false
					}, {
						header : '工号',
						isExp : false,
						dataIndex : 'employeeNo'
					}, {
						header : '所属机构',
						isExp : false,
						dataIndex : 'depNam'
					}, {
						header : '月份',
						isExp : false,
						dataIndex : 'perDat'
					}, {
						header : '结案客户数',
						isExp : false,
						dataIndex : 'kehujieanshu',
						hidden:true
					}, {
						header : '有效订单金额',
						isExp : false,
						dataIndex : 'validOrderCash'
					}, {
						header : '单数妥投率',
						isExp : false,
						dataIndex : 'danshutuotoulv'
					}, {
						header : '金额妥投率',
						isExp : false,
						dataIndex : 'jinetuotoulv'
					}, 
					{
						header : '搭销率',
						isExp : false,
						dataIndex : 'daxiaolv'
					}, {
						header : '成交率',
						isExp : false,
						dataIndex : 'wanchenglv'
					}, {
						header : '佣金',
						isExp : false,
						dataIndex : 'yongjin'
					}, {
						header : '季度值',
						isExp : false,
						hidden:true,
						dataIndex : 'empPerQuarter'
					}
					, {
						header : '年度',
						isExp : false,
						hidden:true,
						dataIndex : 'empPerNd'
					}
					, new Ext.ux.grid.RowActions({
										header : __action,
										width : 140,
										actions : [{
													iconCls : 'btn-form-design',
													qtip : '查看',
													style : 'margin:0 3px 0 3px',
													handler:this.detail
												}],
									listeners : {
									scope : this,
									'action' : this.onRowAction
								}
//										listeners : {
//											scope : this,
//											'action' : function(){
//												var panel = MonThatView({});
//												var tabs = Ext.getCmp('centerTabPanel');
//												tabs.add(panel);
//												tabs.activate(panel);
//												
//											}
//										}
									})]
				// end of columns
			});

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		Ext.getCmp('nf').setRawValue('');
		Ext.getCmp('jdno').setValue('');
		Ext.getCmp('nyr').setRawValue('');
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		var nf=Ext.getCmp('nf').getValue();
		var jdno=Ext.getCmp('jdno').getValue();
		var nyr=Ext.getCmp('nyr').getValue();
		$search({
				searchPanel : this.searchPanel,
				gridPanel : this.gridPanel
				
			});
	},

	// 创建记录
	createRs : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('MontargetManagerFormWin');
		if (aForm != null) {
			tabs.remove('MontargetManagerFormWin');
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
		//详细信息
	detail:function(depname,jidu,uname,uno,yongjin,empPerNd,empPerQuarter,ny_quarter_nd){
		var panel = MonThatView(
			depname,
			jidu,
			uname,
			uno,
			yongjin,empPerNd,empPerQuarter,
			
			ny_quarter_nd
			 );
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.add(panel);
		tabs.activate(panel);
		
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
		var ny_quarter_nd=record.data.perDat+','+record.data.empPerNd+','+record.data.empPerQuarter;
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.chkRulId);
				break;
			case 'btn-edit' :
				this.createRs.call(this);
				break;
			case 'btn-form-design' :
				this.detail.call(this,record.data.depNam,record.data.perDat,record.data.userNam,record.data.employeeNo,record.data.yongjin,record.data.empPerNd,record.data.empPerQuarter,ny_quarter_nd);
				break;
			default :
				break;
		}
	}
});
