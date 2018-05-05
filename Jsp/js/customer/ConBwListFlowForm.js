/**
 * @author guost
 * @createtime 
 * @class ConBwListFlowForm
 * @extends Ext.Panel
 * @description ConBwlistApprove表单
 * @company 优创融联科技
 */
ConBwListFlowForm = Ext.extend(Ext.Panel,{
	//构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		//必须先初始化组件
		this.initUIComponents();  
		ConBwListFlowForm.superclass.constructor.call(this, {
			id : 'ConBwListFlowForm',
			layout : 'form',
			items : [this.formPanel,this.gridPanel,this.panel],
			modal : true,
			height : 400,
			anchor : '98%',
			maximizable : true,
			title : '黑名单审批详细信息',
			buttonAlign : 'center',
			tbar : this.initToolbar()
		});
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
		// 增加审核记录
		this.panel = new Ext.Panel();
//		if (this.piId != null) {
			this.panel = new Ext.Panel({
				title : __allApprovalInfo,
				autoScroll : true,
				autoLoad : {
					url : __ctxPath + '/flow/processRunDetail.do?piId='
							+ this.piId + "&runId=" + this.runId,
					nocache : true
				}
			});
//		}
	
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			//id : 'ConBwListFlowForm',
			defaults : {
				anchor : '100%,100%'
			},
			defaultType : 'textfield',
			items : [
						{
							name : 'conBwlistApprove.bwlistApproveId',
							xtype : 'hidden',
							value : this.id == null ? '' : this.id
						},
						{
								xtype : 'container',
								layout : 'column',
								defaults : {
									border : false
								},
								items : [
								{
									columnWidth : 1,
									layout : 'form',
									items : [
										{
											fieldLabel : '黑名单审批标题',
											maxLength : 30,
											allowBlank : false,
											disabled : true,
											anchor : '100%',
											xtype : 'textfield',
											blankText : '审批标题不能为空!',
											name : 'conBwlistApprove.approveTitle',
											readOnly : true,
											name : 'conBwlistApprove.approveTitle'
										}]
									}
								]
						}, 
						{
							layout : 'form',
							fieldLabel : '备注',
							name : 'conBwlistApprove.approveComment',
							xtype : 'textarea',
							anchor : '100%',
							disabled : true,
							readOnly : true,
							maxLength : 300
						},{
							id : '_sysKnowIds',
							name : '_sysKnowIds',
							xtype : 'hidden'
						}//,ukKnowApplyNoItemView
					]
		});
		
				this.gridPanel = new HT.GridPanel({
					showPaging : false, // 去掉分页
					autoHeight : true, // 自动增加高度
					id : 'conBwListApprove.all_grid1',
//					viewConfig : {
//						forceFit : true
//					},
					region : 'center',
					url : __ctxPath + "/customer/listConBwList.do?Q_conBwlistApprove.bwlistApproveId_L_EQ="+this.id,
//					thisParams.ids,
					fields : [{
								name : 'bwId',
								type : 'int'
							},'customer', 'bwId', 'objTypId', 'statusId'],
					columns : [{
								header : '客户号',
								dataIndex : 'bwId'
							}, {
								header : '姓名',
								dataIndex : 'customer',
								renderer : function(value) {
									return value
											? value.customerName
											: '';
								}
							}, {
								header : '性别',
								dataIndex : 'bwId'
							}, {
								header : '客户级别',
								isExp : false,
								dataIndex : 'objTypId',
								renderer : function(value) {
									return CONJHLX.get(value);
								}
							}, {
								header : '客户来源',
								isExp : false,
								dataIndex : 'statusId',
								renderer : function(value) {
									return CONZT.get(value);
								}
							}]
				});
		//加载表单对应的数据	
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/customer/getConBwlistApprove.do?bwlistApproveId='
								+ this.id,
						root : 'data',
						preName : 'conBwlistApprove'
					});
		}

	},//end of the initcomponents

	/**
	 * 取消
	 * @param {} window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('ConBwListFlowForm');
		this.destroy();
	},
	/**
	 * 显示流程图
	 */
   connect : function(){
		var win = new Ext.Window({
 		title:'流程示意图',
 		width:600,
 		autoScroll:true,
 		iconCls : 'btn-flow-chart',
 		bodyStyle : 'background-color:white',
 		maximizable : true,
 		height:500,
 		split:true,
 		collapsible: true,
 		region:'center',
 		margin:'5 5 5 5',
 		html:'<img src="'+__ctxPath+ '/jbpmImage?piId='+this.piId+'&defId='+10160+'&runId='+this.runId+'&rand='+ Math.random()+'"/>'
				});
		win.show();
	
   }

});
/**
 * 顶部保存 取消按钮()
 * 
 * @return {}
 */

ConBwListFlowForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : [
			        '->', {
							text : "流程状态图",
							iconCls : 'btn-flow-chart',
							scope : this,
							handler : this.connect
						},
					'-', {
						text : __cancel,
						iconCls : 'btn-cancel',
						scope : this,
						handler : this.cancel
					}
				]
			});
	return toolbar;
}
