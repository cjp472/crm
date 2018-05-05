/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObProjectApplyForm
 * @extends Ext.Window
 * @description ObProject表单
 * @company 优创融联科技
 */
ObProjectApplyForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObProjectApplyForm.superclass.constructor.call(this, {
					id : 'ObProjectApplyFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '项目审核详细信息',
					buttonAlign : 'center',
					tbar:['->',{
						text:'提交',
						iconCls:'btn-ok'
					},{
						text:'流程图',
						iconCls:'btn-flow-chart',
						handler:this.connect
					},{
						text:'返回',
						iconCls:'btn-cancel',
						handler:this.cancel
					}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		
		this.gridPanel = new HT.GridPanel({
					region : 'center',
					region:'center',
					height:300,
					layout:'fit',
					url : __ctxPath + "/outb/listObProject.do",
					fields : [{
								name : 'projId',
								type : 'int'
							}, 'projNam', 'projAliNam', 'projCod', 'projTypId',
							'ownerTeam', 'perIncharge', 'srouceId', 'staDat',
							'endDat', 'busiTypId', 'execTypId', 'projJianjie',
							'projConFile', 'remark', 'creUseId', 'creTime',
							'updUseId', 'updTime', 'projStaId', 'runid',
							'nodeName'],
					columns : [{
								header : 'projId',
								dataIndex : 'projId',
								hidden : true
							}, {
								header : '项目名',
								isExp : false,

								dataIndex : 'projNam'
							}, {
								header : '项目编号',
								isExp : false,

								dataIndex : 'projCod'
							}, {
								header : '业务类型',
								isExp : false,

								dataIndex : 'busiTypId',
								renderer : function(value) {
									return CONOB_PROJECT_YWLX.get(value);
								}
							}, {
								header : '项目类别',
								isExp : false,

								dataIndex : 'projTypId',
								renderer : function(value) {
									return CONOB_PROJECT_XMLB.get(value);
								}
							}, {
								header : '来源',
								isExp : false,

								dataIndex : 'srouceId',
								renderer : function(value) {
									return CONOB_PROJECT_LY.get(value);
								}
							}, {
								header : '开始时间',
								isExp : false,

								dataIndex : 'staDat'
							}, {
								header : '结束时间',
								isExp : false,

								dataIndex : 'endDat'
							}, {
								header : '所属机构',
								isExp : false,

								dataIndex : 'ownerTeam'
							}, {
								header : '负责人',
								isExp : false,

								dataIndex : 'perIncharge'
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'projStaId',
								renderer : function(value) {
									return CONOB_PROJECT_ZT.get(value);
								}
							}]
						// end of columns
				});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			height:100,
			region:'north',
			autoScroll : true,
			labelAlign:'right',
			// id : 'ObProjectApplyForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
						name : 'obProject.projId',
						xtype : 'hidden',
						value : this.projId == null ? '' : this.projId
					}

					, {
						fieldLabel : '执行路径',
						xtype:'radio',
						boxLabel:'to 管理员',
						checked:true,
						name : 'obProject.projNam',
						allowBlank : false,
						maxLength : 128,
						anchor : '95%'
					}
					, {
						fieldLabel : '说明',
						name : 'obProject.projJianjie',
						xtype : 'textarea',
						height:50,
						maxLength : 4000,
						anchor : '95%'
					},{
						xtype : 'fieldset',
						title : "所选项目",
						collapsible : true,
						bodyStyle:'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						},
						items:[this.gridPanel]
					}
			]
		});
		// 加载表单对应的数据
		if (this.projId != null && this.projId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/outb/getObProject.do?projId=' + this.projId,
				root : 'data',
				preName : 'obProject'
			});
		}
		

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
		var tabs = Ext.getCmp('centerTabPanel');// 获得tab
		tabs.remove('ObProjectApplyFormWin');// 移除创建的窗口
	},
	connect:function() {
		var win = new Ext.Window({
					autoScroll : true,
					iconCls : 'btn-flow-chart',
					bodyStyle : 'background-color:white',
					maximizable : true,
					title : '流程示意图',
					width : 600,
					height : 500,
					modal : true,
					html : '<img src="' + __ctxPath + '/jbpmImage?defId='
							+ 10200 + '&rand=' + Math.random() + '"/>'
				});
		win.show();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/outb/saveObProject.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObProjectGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});