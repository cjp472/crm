/**
 * @author guost
 * @createtime
 * @class UkKnowApproveForm
 * @extends Ext.Panel
 * @description UkKnowApprove表单
 * @company 优创融联科技
 */
UkKnowApproveForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UkKnowApproveForm.superclass.constructor.call(this, {
					id : 'UkKnowApproveForm',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 450,
					anchor : '100%',
					maximizable : true,
					title : '知识审核申请',
					buttonAlign : 'center',
					tbar : this.initToolbar()
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		var approveStatusId = 1;
		var ukKnowApplyItemView = new UkKnowApplyItemView(approveStatusId,
				this.knowApproveId);
		// var standSalaryItemView = new StandSalaryItemView(standardId);
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:6px',
			border : false,
			autoScroll : true,
			// id : 'UkKnowApproveForm',
			defaults : {
				anchor : '100%,100%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'ukKnowApprove.knowApproveId',
						xtype : 'hidden',
						value : this.knowApproveId == null
								? ''
								: this.knowApproveId
					}, {
						xtype : 'container',
						layout : 'column',
						hidden:true,
						defaults : {
							border : false
						},
						items : [{
							columnWidth : 1,
							layout : 'form',
							items : [{
										fieldLabel : __ukKnowApproveApproveTitle,
										maxLength : 30,
										//allowBlank : false,
										anchor : '100%',
										xtype : 'textfield',
										blankText : '审批标题不能为空!',
										name : 'ukKnowApprove.approveTitle',
										id : 'ukKnowApprove.approveTitle'
									}]
						}
						// ,{
						// columnWidth : .5,
						// layout : 'column',
						// defaults : {
						// border : false,
						// },
						// items :[
						// {
						// columnWidth : .85,
						// layout : 'form',
						// items : [{
						// fieldLabel : __ukKnowApproveApplyId,
						// anchor : '100%',
						// name : 'ukKnowApprove.userid',
						// xtype : 'numberfield'
						// }]
						// },
						// {
						// columnWidth : .15,
						// layout : 'form',
						// items :[{
						// xtype:'button',
						// border:false,
						// style : 'padding-left:10px;',
						// iconCls:'btn-user-sel',
						// text:'选择',
						// handler:function(){
						// UlEmployeeSelector.getView(function(){
						// Ext.getCmp("appUser.empName").setValue(fullname); //
						// 给显示域 用户名赋值
						// //联系方式
						// Ext.Ajax.request( {
						// url : __ctxPath +
						// '/xitong/contactsUlEmployee.do?employeeid='+useid,
						// method : 'get',
						// async : true,
						// success : function(response, opts) {
						// //var ret =
						// Ext.util.JSON.decode(response.responseText).data;
						// },
						// failure : function(response, opts) {
						//				
						// }
						// });}).show();
						// }
						// }]
						// }]
						// }
						]
					}, {
						layout : 'form',
						fieldLabel : '申请说明',
						name : 'ukKnowApprove.approveComment',
						xtype : 'textarea',
						anchor : '100%',
						maxLength : 300
					}, {
						id : '_sysKnowIds',
						name : '_sysKnowIds',
						xtype : 'hidden'
					}, ukKnowApplyItemView]
		});
		// 加载表单对应的数据
		if (this.knowApproveId != null && this.knowApproveId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/know/getUkKnowApprove.do?knowApproveId='
								+ this.knowApproveId,
						root : 'data',
						preName : 'ukKnowApprove'
					});
		}

	},// end of the initcomponents

	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('UkKnowApproveForm');
		this.destroy();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/know/saveUkKnowApprove.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UkKnowApproveGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('UkKnowApproveForm');
					}
				});
	}// end of save

});
/**
 * 顶部保存 取消按钮()
 * 
 * @return {}
 */

UkKnowApproveForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : ['->', {
							text : __cancel,
							iconCls : 'btn-cancel',
							scope : this,
							handler : this.cancel
						}, '->', {
							text : __save,
							iconCls : 'btn-save',
							scope : this,
							handler : this.save
						}]
			});
	return toolbar;
}
