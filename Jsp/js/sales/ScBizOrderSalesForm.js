/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScBizOrderSalesForm
 * @extends Ext.Window
 * @description ScBizOrderSales表单
 * @company 优创融联科技
 */
ScBizOrderSalesForm = Ext.extend(Ext.Panel, {
	//构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		//必须先初始化组件
		this.initUIComponents();
		ScBizOrderSalesForm.superclass.constructor.call(this, {
					id : 'ScBizOrderSalesFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '销售业务单审批详细信息',
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

		this.bizOrderId = '$!bizOrderId';
		this.bizOrderId = this.bizOrderId
				? this.bizOrderId
				: this.PKid; // 主表Id

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			//id : 'ScBizOrderSalesForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'scBizOrderSales.bizOrderId',
						xtype : 'hidden',
						value : this.bizOrderId == null ? '' : this.bizOrderId
					}, {
						fieldLabel : '业务单类型：&CON_T_BO_TYPE',
						hiddenName : 'scBizOrderSales.bizOrderType',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CON_T_BO_TYPE'
					}, {
						fieldLabel : '业务单显示名称',
						name : 'scBizOrderSales.bizOrderDispName',
						xtype : 'textarea',
						maxLength : 500
					}, {
						fieldLabel : '预警时间',
						name : 'scBizOrderSales.alertTime',
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date()
					}, {
						fieldLabel : '主业务单内码',
						name : 'scBizOrderSales.masterBizOrderId',
						xtype : 'numberfield'
					}, {
						fieldLabel : '应支出总费用',
						name : 'scBizOrderSales.totalOutAmount',
						allowBlank : false
					}, {
						fieldLabel : '应收入总费用',
						name : 'scBizOrderSales.totalInAmount',
						allowBlank : false
					}, {
						fieldLabel : '应发生总数量',
						name : 'scBizOrderSales.totalCount',
						xtype : 'numberfield'
					}, {
						fieldLabel : '创建用户内码',
						name : 'scBizOrderSales.createUserId',
						allowBlank : false,
						xtype : 'numberfield'
					}, {
						fieldLabel : '已支出总费用',
						name : 'scBizOrderSales.factTotalOutAmount',
						allowBlank : false
					}, {
						fieldLabel : '已收入总费用',
						name : 'scBizOrderSales.factTotalInAmount',
						allowBlank : false
					}, {
						fieldLabel : '已发生数量',
						name : 'scBizOrderSales.factTotalCount',
						allowBlank : false,
						xtype : 'numberfield'
					}, {
						fieldLabel : '计划支出总费用',
						name : 'scBizOrderSales.planOutAmount'
					}, {
						fieldLabel : '计划收入总费用',
						name : 'scBizOrderSales.planInAmount'
					}, {
						fieldLabel : '生成时间',
						name : 'scBizOrderSales.createTime',
						allowBlank : false,
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date()
					}, {
						fieldLabel : '审批用户内码',
						name : 'scBizOrderSales.approvedUserId',
						xtype : 'numberfield'
					}, {
						fieldLabel : '更新时间',
						name : 'scBizOrderSales.updateTime',
						allowBlank : false,
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date()
					}, {
						fieldLabel : '创建用户部门内码',
						name : 'scBizOrderSales.createDeptId',
						xtype : 'numberfield'
					}, {
						fieldLabel : '销售用户内码',
						name : 'scBizOrderSales.salesUserId',
						xtype : 'numberfield'
					}, {
						fieldLabel : '销售用户部门内码',
						name : 'scBizOrderSales.salesDeptId',
						xtype : 'numberfield'
					}, {
						fieldLabel : '客户联系人',
						name : 'scBizOrderSales.custContPerson',
						maxLength : 60
					}, {
						fieldLabel : '客户联系电话',
						name : 'scBizOrderSales.custContPhone',
						maxLength : 20
					}, {
						fieldLabel : '结束时间',
						name : 'scBizOrderSales.finishTime',
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date()
					}, {
						fieldLabel : '客户内码',
						name : 'scBizOrderSales.custId',
						xtype : 'numberfield'
					}, {
						fieldLabel : '折前小计',
						name : 'scBizOrderSales.discountForeSubtotal'
					}, {
						fieldLabel : '折扣',
						name : 'scBizOrderSales.discount',
						maxLength : 8
					}, {
						fieldLabel : '增减款',
						name : 'scBizOrderSales.changedAmount'
					}, {
						fieldLabel : '折后小计',
						name : 'scBizOrderSales.discountAfterSubtotal'
					}, {
						fieldLabel : '业务单描述',
						name : 'scBizOrderSales.bizOrderDesc',
						xtype : 'textarea',
						maxLength : 500
					}, {
						fieldLabel : '业务单状态0--已生成、1--审核中、2--执行中、3--完成、4--回退中、5--注销、6--关闭&CON_T_BO_STATUS',
						hiddenName : 'scBizOrderSales.bizOrderStatus',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CON_T_BO_STATUS'
					}, {
						fieldLabel : '业务单子状态0--未付款、1--已付款、2--部分付款、3--正在入库、4--已收货等&CON_T_BO_SUB_STATUS',
						hiddenName : 'scBizOrderSales.bizOrderSubStatus',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CON_T_BO_SUB_STATUS'
					}, {
						fieldLabel : '销售模式：0--正常、1--特价、2--赠送&CON_T_SALES_MODEL',
						hiddenName : 'scBizOrderSales.salesModelType',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CON_T_SALES_MODEL'
					}, {
						fieldLabel : '备注',
						name : 'scBizOrderSales.desc',
						xtype : 'textarea',
						maxLength : 500
//					}, {
//						fieldLabel : '扩展1',
//						name : 'scBizOrderSales.ext1',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展2',
//						name : 'scBizOrderSales.ext2',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展3',
//						name : 'scBizOrderSales.ext3',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展4',
//						name : 'scBizOrderSales.ext4',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展5',
//						name : 'scBizOrderSales.ext5',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展6',
//						name : 'scBizOrderSales.ext6',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展7',
//						name : 'scBizOrderSales.ext7',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展8',
//						name : 'scBizOrderSales.ext8',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展9',
//						name : 'scBizOrderSales.ext9',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展10',
//						name : 'scBizOrderSales.ext10',
//						maxLength : 60
//					}, {
//						fieldLabel : '扩展11',
//						name : 'scBizOrderSales.ext11'
//					}, {
//						fieldLabel : '扩展12',
//						name : 'scBizOrderSales.ext12'
//					}, {
//						fieldLabel : '扩展13',
//						name : 'scBizOrderSales.ext13'
//					}, {
//						fieldLabel : '扩展14',
//						name : 'scBizOrderSales.ext14'
//					}, {
//						fieldLabel : '扩展15',
//						name : 'scBizOrderSales.ext15'
//					}, {
//						fieldLabel : '扩展16',
//						name : 'scBizOrderSales.ext16',
//						xtype : 'datefield',
//						format : 'Y-m-d',
//						value : new Date()
//					}, {
//						fieldLabel : '扩展17',
//						name : 'scBizOrderSales.ext17',
//						xtype : 'datefield',
//						format : 'Y-m-d',
//						value : new Date()
//					}, {
//						fieldLabel : '扩展18',
//						name : 'scBizOrderSales.ext18',
//						xtype : 'datefield',
//						format : 'Y-m-d',
//						value : new Date()
//					}, {
//						fieldLabel : '扩展19',
//						name : 'scBizOrderSales.ext19',
//						xtype : 'datefield',
//						format : 'Y-m-d',
//						value : new Date()
//					}, {
//						fieldLabel : '扩展20',
//						name : 'scBizOrderSales.ext20',
//						xtype : 'datefield',
//						format : 'Y-m-d',
//						value : new Date()
					}
			]
		});
		//加载表单对应的数据	
		if (this.bizOrderId != null && this.bizOrderId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/supply/getScBizOrderSales.do?bizOrderId='
								+ this.bizOrderId,
						root : 'data',
						preName : 'scBizOrderSales'
					});
		}

	},//end of the initcomponents

	/**
	 * 重置
	 * @param {} formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
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
//					url : __ctxPath + '/sales/saveScBizOrderSales.do',
//					msgSuccess : '成功删除该记录！',
//					msgFailure : '操作出错，请联系管理员！',
//					callback : function(fp, action) {
//						var gridPanel = Ext.getCmp('ScBizOrderSalesGrid');
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