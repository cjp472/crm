/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ConBwlistApproveForm
 * @extends Ext.Window
 * @description ConBwlistApprove表单
 * @company 优创融联科技
 */
ConBwlistApproveForm = Ext.extend(Ext.Panel, {
	//构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		//必须先初始化组件
		this.initUIComponents();
		ConBwlistApproveForm.superclass.constructor.call(this, {
					id : 'ConBwlistApproveFormWin',
					layout : 'fit',
					items : [this.formPanel,this.gridPanel],
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '黑名单申请单详细信息',
					buttonAlign : 'center'
//					,
//					buttons : [{
//								text : __save,
//								iconCls : 'btn-save',
//								scope : this,
//								handler : this.save
//							}, {
//								text : __reset,
//								iconCls : 'btn-reset',
//								scope : this,
//								handler : this.reset
//							}, {
//								text : __cancel,
//								iconCls : 'btn-cancel',
//								scope : this,
//								handler : this.cancel
//							}]
					
				});
				
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.Panel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			id : 'ConBwlistApproveStartForm',
			defaults : {
				anchor : '88%,100%'
			},
			defaultType : 'textfield',
				items : [{
						name : 'conBwlistApprove.bwlistApproveId',
						xtype : 'hidden'
//						value : this.bwlistApproveId == null ? '' : this.bwlistApproveId
					}, {
						xtype : 'container',
						layout : 'column',
						defaults : {
							border : false
						},
						items : [{
								columnWidth : 1,
								layout : 'form',
								items : [
									{
										fieldLabel : '黑名单审批标题',
										maxLength : 30,
										allowBlank : false,
										anchor : '100%',
										xtype : 'textfield',
										blankText : '审批标题不能为空!',
										name : 'conBwlistApprove.approveTitle',
										id : 'conBwlistApprove.approveTitle'
									}
								]
							}
						 ]
					}, {
						fieldLabel : '备注',
						name : 'conBwlistApprove.approveComment',
						xtype : 'textarea',
						anchor : '100%',
						allowBlank : false,
						blankText : '备注不能为空!',
						maxLength : 300
					}]
			});
						
		this.gridPanel = new HT.GridPanel({
					region : 'center',
					showPaging : false, // 去掉分页
					autoHeight : true, // 自动增加高度
					id : 'conBwListApprove.all_grid',
					viewConfig : {
						forceFit : true
					},
					region : 'center',
					url : __ctxPath + "/customer/getByBwIdsConBwList.do?bwIds="+this.ids,
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
		if (this.bwlistApproveId != null && this.bwlistApproveId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/customer/getConBwlistApprove.do?bwlistApproveId='
								+ this.bwlistApproveId,
						root : 'data',
						preName : 'conBwlistApprove'
					});
		}

	},//end of the initcomponents

	/**
	 * 重置
	 * @param {} formPanel
	 */
//	reset : function() {
//		this.formPanel.getForm().reset();
//	},
	/**
	 * 取消
	 * @param {} window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
//	save : function() {
//		$postSubForm({
//					formPanel : this.formPanel,
//					scope : this,
//					url : __ctxPath + '/customer/saveConBwlistApprove.do',
//					msgSuccess : '成功删除该记录！',
//					msgFailure : '操作出错，请联系管理员！',
//					callback : function(fp, action) {
//						var gridPanel = Ext.getCmp('ConBwlistApproveGrid');
//						if (gridPanel != null) {
//							gridPanel.getStore().reload();
//						}
//						this.close();
//					}
//				});
//	}//end of save
	validate : function() {
		return true;
	}

});