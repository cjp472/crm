/**
 * @author guost
 * @createtime 
 * @class UkKnowApproveFlowForm
 * @extends Ext.Panel
 * @description UkKnowApprove表单
 * @company 优创融联科技
 */
UkKnowApproveFlowForm = Ext.extend(Ext.Panel,{
	//构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		//必须先初始化组件
		this.initUIComponents();
		UkKnowApproveFlowForm.superclass.constructor.call(this, {
			id : 'UkKnowApproveFlowFormWin',
//			layout : 'fit',
			items : [this.formPanel,this.panel],
			modal : true,
			height : 400,
			style:'overflow-y:auto;overflow-x:hidden',
			anchor : '100%',
			maximizable : true,
			title : __ukKnowApproveDetailHeading,
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
//				autoScroll : true,
				autoLoad : {
					url : __ctxPath + '/flow/processRunDetail.do?piId='
							+ this.piId + "&runId=" + this.runId,
					nocache : true
				}
			});
//		}
		var approveStatusId = 10;
//		alert(this.knowApproveId + '=====ukknowapproveflowform==knowApproveId==');
		var ukKnowApplyNoItemView = new UkKnowApplyNoItemView(approveStatusId,this.id,'UkKnowApplyNoItemGrid4');
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
//			autoScroll : true,
			//id : 'UkKnowApproveFlowForm',
			defaults : {
				anchor : '100%,100%'
			},
			defaultType : 'textfield',
			items : [
						{
							name : 'ukKnowApprove.knowApproveId',
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
											fieldLabel : __ukKnowApproveApproveTitle,
											maxLength : 30,
											allowBlank : false,
											disabled : true,
											anchor : '100%',
											xtype : 'hidden',
											blankText : '审批标题不能为空!',
											name : 'ukKnowApprove.approveTitle',
											readOnly : true,
											name : 'ukKnowApprove.approveTitle'
										}]
									}
//									,{
//										columnWidth : .5,
//										layout : 'column',
//										defaults : {
//											border : false,
//										},
//										items :[
//											{
//												columnWidth : .85,
//												layout : 'form',
//												items : [{
//													fieldLabel : __ukKnowApproveApplyId,
//													anchor : '100%',
//													name : 'ukKnowApprove.userid',
//													xtype : 'numberfield'
//												}]
//											},
//											{
//												columnWidth : .15,
//												layout : 'form',
//												items :[{
//													xtype:'button',		
//													border:false,
//													style : 'padding-left:10px;',
//													iconCls:'btn-user-sel',
//													text:'选择',
//													handler:function(){
//														UlEmployeeSelector.getView(function(){
//															Ext.getCmp("appUser.empName").setValue(fullname);   // 给显示域  用户名赋值
//															//联系方式
//															Ext.Ajax.request( {
//																url : __ctxPath + '/xitong/contactsUlEmployee.do?employeeid='+useid,
//																method : 'get',
//																async : true,
//																success : function(response, opts) {
//																	//var ret = Ext.util.JSON.decode(response.responseText).data;
//																},
//																failure : function(response, opts) {
//						
//																}
//															});}).show();
//													}
//												}]
//											}]
//										}
								]
						}, 
						{
						fieldLabel : '申请说明',
						name : 'ukKnowApprove.approveComment',
						xtype : 'textarea',
						anchor : '100%',
						allowBlank : false,
						blankText : '申请说明不能为空!',
						maxLength : 300
					},{
							id : '_sysKnowIds',
							name : '_sysKnowIds',
							xtype : 'hidden'
						},ukKnowApplyNoItemView
					]
		});
		//加载表单对应的数据	
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData( {
				url : __ctxPath + '/know/getUkKnowApprove.do?knowApproveId='
						+ this.id,
				root : 'data',
				preName : 'ukKnowApprove'
			});
		}

	},//end of the initcomponents

	/**
	 * 取消
	 * @param {} window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('UkKnowApproveFlowFormWin');
		this.destroy();
	},
	/**
	 * 显示流程图
	 */
	showFlowImage : function() {
		var window=new Ext.Window({
			autoScroll:true,
				iconCls:'btn-flow-chart',
				bodyStyle:'background-color:white',
				maximizable : true,
				title:'流程示意图',
				width:600,
				height:500,
				modal:true,
				layout:'fit',
				html:'<img src="'+__ctxPath+ '/jbpmImage?taskId='+this.taskId+ '&rand=' + Math.random()+ '"/>'
		});
		window.show();
	},
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

UkKnowApproveFlowForm.prototype.initToolbar = function() {
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
