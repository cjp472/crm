/**
 * @author:cf0666@gmail.com
 * @class ScBizOrderSalesView
 * @extends Ext.Panel
 * @description [ScBizOrderSales]管理
 * @company 优创融联科技
 * @createtime:
 */
ScBizOrderSalesView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ScBizOrderSalesView.superclass.constructor.call(this, {
					id : 'ScBizOrderSalesViewWin',
					title : '销售业务单管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['bizOrderType', '业务单类型：&CON_T_BO_TYPE',
						new Ext.form.NumberField({
									name : 'bizOrderType',
									allowBlank : true
								})],
				['bizOrderDispName', '业务单显示名称', new Ext.form.TextField({
									name : 'bizOrderDispName',
									allowBlank : true
								})],
				['alertTime', '预警时间', new Ext.form.DateField({
									hiddenName : 'alertTime',
									format : 'Y-m-d'
								})],
				['masterBizOrderId', '主业务单内码', new Ext.form.NumberField({
									name : 'masterBizOrderId',
									allowBlank : true
								})],
				['totalOutAmount', '应支出总费用', new Ext.form.NumberField({
									name : 'totalOutAmount',
									allowBlank : true
								})],
				['totalInAmount', '应收入总费用', new Ext.form.NumberField({
									name : 'totalInAmount',
									allowBlank : true
								})],
				['totalCount', '应发生总数量', new Ext.form.NumberField({
									name : 'totalCount',
									allowBlank : true
								})],
				['createUserId', '创建用户内码', new Ext.form.NumberField({
									name : 'createUserId',
									allowBlank : true
								})],
				['factTotalOutAmount', '已支出总费用', new Ext.form.NumberField({
									name : 'factTotalOutAmount',
									allowBlank : true
								})],
				['factTotalInAmount', '已收入总费用', new Ext.form.NumberField({
									name : 'factTotalInAmount',
									allowBlank : true
								})],
				['factTotalCount', '已发生数量', new Ext.form.NumberField({
									name : 'factTotalCount',
									allowBlank : true
								})],
				['planOutAmount', '计划支出总费用', new Ext.form.NumberField({
									name : 'planOutAmount',
									allowBlank : true
								})],
				['planInAmount', '计划收入总费用', new Ext.form.NumberField({
									name : 'planInAmount',
									allowBlank : true
								})],
				['createTime', '生成时间', new Ext.form.DateField({
									hiddenName : 'createTime',
									format : 'Y-m-d'
								})],
				['approvedUserId', '审批用户内码', new Ext.form.NumberField({
									name : 'approvedUserId',
									allowBlank : true
								})],
				['updateTime', '更新时间', new Ext.form.DateField({
									hiddenName : 'updateTime',
									format : 'Y-m-d'
								})],
				['createDeptId', '创建用户部门内码', new Ext.form.NumberField({
									name : 'createDeptId',
									allowBlank : true
								})],
				['salesUserId', '销售用户内码', new Ext.form.NumberField({
									name : 'salesUserId',
									allowBlank : true
								})],
				['salesDeptId', '销售用户部门内码', new Ext.form.NumberField({
									name : 'salesDeptId',
									allowBlank : true
								})],
				['custContPerson', '客户联系人', new Ext.form.TextField({
									name : 'custContPerson',
									allowBlank : true
								})],
				['custContPhone', '客户联系电话', new Ext.form.TextField({
									name : 'custContPhone',
									allowBlank : true
								})],
				['finishTime', '结束时间', new Ext.form.DateField({
									hiddenName : 'finishTime',
									format : 'Y-m-d'
								})],
				['custId', '客户内码', new Ext.form.NumberField({
									name : 'custId',
									allowBlank : true
								})],
				['discountForeSubtotal', '折前小计', new Ext.form.NumberField({
									name : 'discountForeSubtotal',
									allowBlank : true
								})],
				['discount', '折扣', new Ext.form.TextField({
									name : 'discount',
									allowBlank : true
								})],
				['changedAmount', '增减款', new Ext.form.NumberField({
									name : 'changedAmount',
									allowBlank : true
								})],
				['discountAfterSubtotal', '折后小计', new Ext.form.NumberField({
									name : 'discountAfterSubtotal',
									allowBlank : true
								})],
				['bizOrderDesc', '业务单描述', new Ext.form.TextField({
									name : 'bizOrderDesc',
									allowBlank : true
								})],
				[
						'bizOrderStatus',
						'业务单状态0--已生成、1--审核中、2--执行中、3--完成、4--回退中、5--注销、6--关闭&CON_T_BO_STATUS',
						new Ext.form.NumberField({
									name : 'bizOrderStatus',
									allowBlank : true
								})],
				[
						'bizOrderSubStatus',
						'业务单子状态0--未付款、1--已付款、2--部分付款、3--正在入库、4--已收货等&CON_T_BO_SUB_STATUS',
						new Ext.form.NumberField({
									name : 'bizOrderSubStatus',
									allowBlank : true
								})],
				['salesModelType', '销售模式：0--正常、1--特价、2--赠送&CON_T_SALES_MODEL',
						new Ext.form.NumberField({
									name : 'salesModelType',
									allowBlank : true
								})], ['desc', '备注', new Ext.form.TextField({
									name : 'desc',
									allowBlank : true
								})], ['ext1', '扩展1', new Ext.form.TextField({
									name : 'ext1',
									allowBlank : true
								})], ['ext2', '扩展2', new Ext.form.TextField({
									name : 'ext2',
									allowBlank : true
								})], ['ext3', '扩展3', new Ext.form.TextField({
									name : 'ext3',
									allowBlank : true
								})], ['ext4', '扩展4', new Ext.form.TextField({
									name : 'ext4',
									allowBlank : true
								})], ['ext5', '扩展5', new Ext.form.TextField({
									name : 'ext5',
									allowBlank : true
								})], ['ext6', '扩展6', new Ext.form.TextField({
									name : 'ext6',
									allowBlank : true
								})], ['ext7', '扩展7', new Ext.form.TextField({
									name : 'ext7',
									allowBlank : true
								})], ['ext8', '扩展8', new Ext.form.TextField({
									name : 'ext8',
									allowBlank : true
								})], ['ext9', '扩展9', new Ext.form.TextField({
									name : 'ext9',
									allowBlank : true
								})], ['ext10', '扩展10', new Ext.form.TextField({
									name : 'ext10',
									allowBlank : true
								})],
				['ext11', '扩展11', new Ext.form.NumberField({
									name : 'ext11',
									allowBlank : true
								})],
				['ext12', '扩展12', new Ext.form.NumberField({
									name : 'ext12',
									allowBlank : true
								})],
				['ext13', '扩展13', new Ext.form.NumberField({
									name : 'ext13',
									allowBlank : true
								})],
				['ext14', '扩展14', new Ext.form.NumberField({
									name : 'ext14',
									allowBlank : true
								})],
				['ext15', '扩展15', new Ext.form.NumberField({
									name : 'ext15',
									allowBlank : true
								})], ['ext16', '扩展16', new Ext.form.DateField({
									hiddenName : 'ext16',
									format : 'Y-m-d'
								})], ['ext17', '扩展17', new Ext.form.DateField({
									hiddenName : 'ext17',
									format : 'Y-m-d'
								})], ['ext18', '扩展18', new Ext.form.DateField({
									hiddenName : 'ext18',
									format : 'Y-m-d'
								})], ['ext19', '扩展19', new Ext.form.DateField({
									hiddenName : 'ext19',
									format : 'Y-m-d'
								})], ['ext20', '扩展20', new Ext.form.DateField({
									hiddenName : 'ext20',
									format : 'Y-m-d'
								})]]
		var ScBizOrderSalesAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin,
				{
					title : '[ScBizOrderSales]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'ScBizOrderSalesSearchPanel',
					height : 35,
					items : [{
								text : '业务单类型'
							}, {
								hiddenName : 'Q_bizOrderType_SN_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CON_T_BO_TYPE'
							},{
								text : '业务单名称'
							}, {
								name : 'Q_bizOrderDispName_S_EQ',
								xtype : 'textfield'
							},{
								text : '状态'
							}, {
								hiddenName : 'Q_approvalStatus_S_EQ',
                                xtype : 'combo',
                                mode : 'local',
                                editable : false,
                                triggerAction : 'all',
                                store : new Ext.data.ArrayStore({
                                                fields : ['myId', 'displayText'],
                                                data : [['审批完毕', '审批完毕'], ['审批中', '审批中']]
                                            }),
                                valueField : 'myId',
                                displayField : 'displayText'
                             }, {

//								name : 'Q_alertTime_D_EQ',
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//
//								name : 'Q_masterBizOrderId_L_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_totalOutAmount_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_totalInAmount_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_totalCount_L_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_createUserId_L_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_factTotalOutAmount_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_factTotalInAmount_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_factTotalCount_L_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_planOutAmount_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_planInAmount_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_createTime_D_EQ',
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//
//								name : 'Q_approvedUserId_L_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_updateTime_D_EQ',
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//
//								name : 'Q_createDeptId_L_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_salesUserId_L_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_salesDeptId_L_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_custContPerson_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_custContPhone_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_finishTime_D_EQ',
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//
//								name : 'Q_custId_L_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_discountForeSubtotal_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_discount_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_changedAmount_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_discountAfterSubtotal_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_bizOrderDesc_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								hiddenName : 'Q_bizOrderStatus_SN_EQ',
//								xtype : 'mtdiccombo',
//								editable : true,
//								lazyInit : false,
//								forceSelection : false,
//								itemKey : 'CON_T_BO_STATUS'
//							}, {
//
//								hiddenName : 'Q_bizOrderSubStatus_SN_EQ',
//								xtype : 'mtdiccombo',
//								editable : true,
//								lazyInit : false,
//								forceSelection : false,
//								itemKey : 'CON_T_BO_SUB_STATUS'
//							}, {
//
//								hiddenName : 'Q_salesModelType_SN_EQ',
//								xtype : 'mtdiccombo',
//								editable : true,
//								lazyInit : false,
//								forceSelection : false,
//								itemKey : 'CON_T_SALES_MODEL'
//							}, {
//
//								name : 'Q_desc_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext1_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext2_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext3_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext4_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext5_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext6_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext7_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext8_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext9_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext10_S_EQ',
//								xtype : 'textfield'
//							}, {
//
//								name : 'Q_ext11_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_ext12_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_ext13_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_ext14_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_ext15_S_EQ',
//								xtype : 'numberfield'
//							}, {
//
//								name : 'Q_ext16_D_EQ',
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//
//								name : 'Q_ext17_D_EQ',
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//
//								name : 'Q_ext18_D_EQ',
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//
//								name : 'Q_ext19_D_EQ',
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//
//								name : 'Q_ext20_D_EQ',
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
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
									new ScBizOrderSalesAdvancedSearchWin()
											.show();
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
					items : [{
								iconCls : 'btn-add',
								//text : __create+'[ScBizOrderSales]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								//text : __delete+'[ScBizOrderSales]',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
//			tbar : this.topbar,
			//使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'ScBizOrderSalesGrid',
			url : __ctxPath + "/supply/listFlowScBizOrderSales.do",
			fields : [{
						name : 'bizOrderId',
						type : 'int'
					}, 'bizOrderType', 
					'totalInAmount','createTime',
					'bizOrderStatus',
                    'bizOrderSubStatus',
					 'custId','cusName',
					 'desc', 'ext1',
					'ext2', 'ext3', 
					 'ext11', 'ext12', 'approvalStatus', 'tasks',
                    'runid', 'nodeName', 'piId','applyUser'],
			columns : [{
						header : 'bizOrderId',
						dataIndex : 'bizOrderId',
						hidden : true
					}, {
						header : '业务单类型',
						isExp : false,
						dataIndex : 'bizOrderType',
						renderer : function(value) {
							return CON_T_BO_TYPE.get(value);
						}
					}, {
//						header : '业务单显示名称',
//						isExp : false,
//						dataIndex : 'bizOrderDispName'
//					}, {
//						header : '预警时间',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'alertTime'
//					}, {
//						header : '主业务单内码',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'masterBizOrderId'
//					}, {
//						header : '应支出总费用',
//						isExp : false,
//						dataIndex : 'totalOutAmount'
//					}, {
						header : '应收入总费用',
						isExp : false,
						dataIndex : 'totalInAmount'
//					}, {
//						header : '应发生总数量',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'totalCount'
//					}, {
//						header : '创建用户内码',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'createUserId'
//					}, {
//						header : '已支出总费用',
//						isExp : false,
//						dataIndex : 'factTotalOutAmount'
//					}, {
//						header : '已收入总费用',
//						isExp : false,
//						dataIndex : 'factTotalInAmount'
//					}, {
//						header : '已发生数量',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'factTotalCount'
//					}, {
//						header : '计划支出总费用',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'planOutAmount'
//					}, {
//						header : '计划收入总费用',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'planInAmount'
					}, {
						header : '生成时间',
						isExp : false,
//						hidden : true,
						dataIndex : 'createTime'
//					}, {
//						header : '审批用户内码',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'approvedUserId'
//					}, {
//						header : '更新时间',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'updateTime'
//					}, {
//						header : '创建用户部门内码',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'createDeptId'
//					}, {
//						header : '销售用户内码',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'salesUserId'
//					}, {
//						header : '销售用户部门内码',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'salesDeptId'
//					}, {
//						header : '客户联系人',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'custContPerson'
//					}, {
//						header : '客户联系电话',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'custContPhone'
//					}, {
//						header : '结束时间',
//						isExp : false,
//						dataIndex : 'finishTime'
					}, {
						header : '客户内码',
						isExp : false,
//						hidden : true,
						dataIndex : 'cusName'
//                        renderer : function(value){
//                            Ext.Ajax.request({
//                                url : __ctxPath + '/customer/getCusPersonal.do',
//                                params : {
//                                    customerId : value
//                                },
//			                    method : 'post',
//			                    success : function(response) {
//			                        var result = Ext.util.JSON.decode(response.responseText);
//			                        return result.data.customerName;
//			                    }
//			                 }); 
//			            }
//					}, {
//						header : '折前小计',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'discountForeSubtotal'
//					}, {
//						header : '折扣',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'discount'
//					}, {
//						header : '增减款',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'changedAmount'
//					}, {
//						header : '折后小计',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'discountAfterSubtotal'
//					}, {
//						header : '业务单描述',
//						isExp : false,
//						hidden : true,
//						dataIndex : 'bizOrderDesc'
					}, {
						header : '业务单状态',
						isExp : false,
						dataIndex : 'bizOrderStatus',
						renderer : function(value) {
							return CON_T_BO_STATUS.get(value);
						}
					}, {
						header : '业务单子状态',
						isExp : false,
						dataIndex : 'bizOrderSubStatus',
						renderer : function(value) {
							return CON_T_BO_SUB_STATUS.get(value);
						}
//					}, {
//						header : '销售模式',
//						isExp : false,
//						dataIndex : 'salesModelType',
//						renderer : function(value) {
//							return CON_T_SALES_MODEL.get(value);
//						}
					}, {
						header : '备注',
						isExp : false,
						dataIndex : 'desc'
                    }, {
                        header : "审批状态",// __allApprovalStatus
                        dataIndex : 'approvalStatus'

                    }, {
                        header : '当前任务',// __allApprovalInfo 流程审批信息
                        dataIndex : 'tasks',
                        width : 200,
                        renderer : function(tasks, metadata, record, rowIndex,
                                colIndex) {
                            var reVal = '';
                            if (tasks != undefined && tasks.length > 0) {
                                for (var i = 0; i < tasks.length; i++) {
                                    reVal += tasks[i].taskName;
                                    if (tasks[i].userId) {
                                        reVal += '(';
//                                      if (curUserInfo.userId == tasks[i].userId) {
//                                          if (tasks[i].taskName == node) {
//                                              reVal += '<a href="#"  onclick="App.MyDesktopClickTopTab(\'ProcessNextForm\',{taskId:'
//                                                      + tasks[i].taskId
//                                                      + ',activityName:\''
//                                                      + tasks[i].taskName
//                                                      + '\',gridPanel:\''
//                                                      + 'UkKnowApplyFlowGrid'
//                                                      + '\'})">';
//                                          }
//
//                                      }
                                        reVal += tasks[i].fullname
                                         if(i>1)
                                        reVal += ',';
//                                        if (curUserInfo.userId == tasks[i].userId) {
//                                            reVal += "</a>";
//                                        }
                                        reVal += ')&nbsp;&nbsp;';
                                    }else{
		                            	 reVal += '(<font color="red">';
		                            	 reVal += '无';	
		                            	 reVal += '</font>)&nbsp;&nbsp;';
		                            }
                                }
                            }
                            return reVal;
                        }
//					}, {
//						header : '扩展1',
//						isExp : false,
//						dataIndex : 'ext1'
//					}, {
//						header : '扩展2',
//						isExp : false,
//						dataIndex : 'ext2'
//					}, {
//						header : '扩展3',
//						isExp : false,
//						dataIndex : 'ext3'
//					}, {
//						header : '扩展4',
//						isExp : false,
//						dataIndex : 'ext4'
//					}, {
//						header : '扩展5',
//						isExp : false,
//						dataIndex : 'ext5'
//					}, {
//						header : '扩展6',
//						isExp : false,
//						dataIndex : 'ext6'
//					}, {
//						header : '扩展7',
//						isExp : false,
//						dataIndex : 'ext7'
//					}, {
//						header : '扩展8',
//						isExp : false,
//						dataIndex : 'ext8'
//					}, {
//						header : '扩展9',
//						isExp : false,
//						dataIndex : 'ext9'
//					}, {
//						header : '扩展10',
//						isExp : false,
//						dataIndex : 'ext10'
//					}, {
//						header : '扩展11',
//						isExp : false,
//						dataIndex : 'ext11'
//					}, {
//						header : '扩展12',
//						isExp : false,
//						dataIndex : 'ext12'
//					}, {
//						header : '扩展13',
//						isExp : false,
//						dataIndex : 'ext13'
//					}, {
//						header : '扩展14',
//						isExp : false,
//						dataIndex : 'ext14'
//					}, {
//						header : '扩展15',
//						isExp : false,
//						dataIndex : 'ext15'
//					}, {
//						header : '扩展16',
//						isExp : false,
//						dataIndex : 'ext16'
//					}, {
//						header : '扩展17',
//						isExp : false,
//						dataIndex : 'ext17'
//					}, {
//						header : '扩展18',
//						isExp : false,
//						dataIndex : 'ext18'
//					}, {
//						header : '扩展19',
//						isExp : false,
//						dataIndex : 'ext19'
//					}, {
//						header : '扩展20',
//						isExp : false,
//						dataIndex : 'ext20'
					}, new Ext.ux.grid.RowActions({
                        header : __action,
                        width : 100,
                        actions : [{
                            iconCls : 'btn-ok',
                            qtip : '审批',
                            style : 'margin:0 3px 0 3px',
                            fn : function(record) {
                                var tasks = record.get('tasks');
                                if (tasks.length > 0) {
                                    for (var i = 0; i < tasks.length; i++) {
                                        if (curUserInfo.userId == tasks[i].userId) {
                                            return true;
                                        }
                                    }
                                } else {
                                	var status = record.get('approvalStatus');
                                	if(status == '待审批'){
                                		return true;
                                	}
                                }
                            }
                        },{
		                	iconCls : 'btn-lockTask',
								qtip : '锁定',
								style : 'margin:0 3px 0 3px',
								fn : function(record) {
									var tasks = record.get('tasks');
									if (tasks.length > 0) {
										for (var i = 0; i < tasks.length; i++) {
											if (tasks[i].userId == '') {
												return true;
											}
										}
									}
	
								}
            	    }, {
                            iconCls : 'btn-operation',
                            qtip : '跟踪',
                            style : 'margin:0 3px 0 3px'
                        }],
                        listeners : {
                            scope : this,
                            'action' : this.onRowAction
                        }
                    })]
				//end of columns
		});

//		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	//重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	//按条件搜索
	onSearch : function(obj) {
		//				var searchPanel = Ext.getCmp('ScBizOrderSalesSearchPanel');
		//				var gridPanel = Ext.getCmp('ScBizOrderSalesGrid');
		//				if (searchPanel.getForm().isValid()) {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
		//				}
	},
	//GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new ScBizOrderSalesForm({
								bizOrderId : rec.data.bizOrderId
							}).show();
				});
	},
	//创建记录
	createRs : function() {
		//new ScBizOrderSalesForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScBizOrderSalesForm');
		if (aForm != null) {
			tabs.remove('ScBizOrderSalesForm');
		}
		aForm = new ScBizOrderSalesForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	//按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/supply/multiDelScBizOrderSales.do',
					ids : id,
					grid : this.gridPanel,
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	//把选中ID删除
	removeSelRs : function() {
		$gridRs({
					url : __ctxPath + '/supply/multiDelScBizOrderSales.do',
					grid : this.gridPanel,
					idName : 'bizOrderId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	//编辑Rs
	editRs : function(record) {
		//new ScBizOrderSalesForm({
		//	bizOrderId : record.data.bizOrderId
		//}).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScBizOrderSalesForm');
		if (aForm != null) {
			tabs.remove('ScBizOrderSalesForm');
		}
		aForm = new ScBizOrderSalesForm({
					bizOrderId : record.data.bizOrderId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	//审批
    nextFlow : function(record){
        var tasks = record.get('tasks');
        var status = record.get('approvalStatus');
        var pk = record.get('bizOrderId');
        var contentPanel = App.getContentPanel();
        var nextForm = contentPanel.getItem('ProcessNextForm');
        if (tasks.length > 0) {//其实，只有length>0,才可能到这个函数中
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].userId) {
                    if (curUserInfo.userId == tasks[i].userId) {
                        if (!nextForm) {
                            nextForm = new ProcessNextForm({
                                        taskId : tasks[i].taskId,
                                        activityName : tasks[i].taskName,
                                        gridPanel : this.gridPanel
                                    });
                            contentPanel.add(nextForm);
                        }
                    }
                }
            }
           	contentPanel.activate(nextForm);
        } else {
        	if(status == '待审批'){
        		defId = '10240';
				name = '启动流程';
				var contentPanel = App.getContentPanel();
				var startForm = contentPanel.getItem('ProcessRunStart' + defId);
		
				if (!startForm) {
					startForm = new ProcessRunStart({
								id : 'ProcessRunStart' + defId,
								defId : defId,
								flowName : name,
								vmParams:'{PKid:'+pk+'}'
							});
					contentPanel.add(startForm);
				}
        	}
        	contentPanel.activate(startForm);
        }
    },
	// 审核跟踪
	trackRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('ScBizOrderSalesFlowFormWin');

		if (edit != null) {
			tabs.remove('ScBizOrderSalesFlowFormWin');
		}
		edit = new ScBizOrderSalesFlowForm({
					id : record.data.bizOrderId,
					runId : record.data.runid,
					piId : record.data.piId
				});
		tabs.add(edit);
		tabs.activate(edit);
	},
		//锁定单据执行人
	lockTask : function(record) {	
	var tasks = record.get('tasks');
	var taskId = tasks[0].taskId;
	Ext.Ajax.request({
		url:__ctxPath+'/flow/lockTask.do',
		params:{
			taskId:taskId
		},
		method:'post',
		success:function(result,response){
			var grid=Ext.getCmp("UkKnowApproveGrid");
			var resultObj=Ext.util.JSON.decode(result.responseText)
			if(resultObj.hasAssigned==true){
				Ext.ux.Toast.msg("操作提示","该任务已经被其他用户锁定执行！");
			}else{
				Ext.ux.Toast.msg("操作提示","该任务已经成功锁定，请执行下一步操作！");
			}
			grid.getStore().reload();
		}
	});},
	//行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.bizOrderId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-ok' :
				this.nextFlow.call(this, record);
				break;
			case 'btn-operation' :
				this.trackRs.call(this, record);
				break;
			case 'btn-lockTask' :
                this.lockTask.call(this, record);
                break;	
			default :
				break;
		}
	}
});
