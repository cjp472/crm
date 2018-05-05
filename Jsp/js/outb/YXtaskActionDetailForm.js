var cusId = '';
var cusNo = '';
var comId = '';
var conhisId = '';
var busiStaId = '';
var gtaskId = '';
var nextCus = 0;
var isStartCon = false;
var saletaskBoId = '';
var isTimeBetweenBreak = true;
var maxDiaNum = '';
var isDiaTime = '';
var gdiaCou = '';
var glastDiaDat = '';
var gbusiTypeId = '';
/**
 * @author cf0666@gmail.com
 * @createtime
 * @class YXtaskActionDetailForm
 * @extends Ext.Window
 * @description CusPersonal表单
 * @company 优创融联科技
 */

YXtaskActionDetailForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents(_cfg);
		YXtaskActionDetailForm.superclass.constructor.call(this, {
					id : 'YXtaskActionDetailFormWin',
					layout : 'fit',
					items : this.formPanelAction,
					modal : true,
					region : 'center',
					title : '营销明细预览'
				});

	},// end of the constructor
	// 初始化组件
	initUIComponents : function(_cfg) {
        var load_create = false;
        var isLoadGoodsHis = false;
		cusId = _cfg.cusId; 			// 客户ID
		cusNo = _cfg.cusNo;				// 客户业务编号
		comId = _cfg.comId;				// 活动ID
		gbusiTypeId = _cfg.busiTypeId;	// 活动类型
		busiStaId = _cfg.busiStaId; 	// 营销状态
		gtaskId = _cfg.taskId; 			// 任务ID
		maxDiaNum = _cfg.maxDiaNum;		// 最大拨打次数
		maxDiaSpace = _cfg.maxDiaSpace;	// 最大拨打间隔
		isDiaTime = _cfg.isDiaTime;		// 是否有拨打时间段限制
		
		gdiaCou = _cfg.diaCou;			//任务拨打次数
		glastDiaDat = _cfg.lastDiaDat;	//最后拨打时间
		
		nextCus = 0;
		isTimeBetweenBreak = true;

		// 联系方式
		this.gridPanel_contact = new HT.EditorGridPanel({
			region : 'center',
			showPaging : false,
			showSm : false,
			showNum : false,
			autoHeight : false,
			height : 150,
			url : __ctxPath + "/customer/listCusCusContact.do",
			baseParams : {
				customerId : cusId
			},
			fields : [{
						name : 'contactId',
						type : 'int'
					},'statusId','contactTypeId','mainContactNum'],
			columns : [{
						header : '内码',
						dataIndex : 'contactId',
						hidden : true
					}, {
						header : 'statusId',
						dataIndex : 'statusId',
						hidden : true
					},{
						header : '联络方式',
						dataIndex : 'contactTypeId',
						renderer : function(value) {
							if (value != null) {
								return LXFS001.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '地址/号码',
						dataIndex : 'mainContactNum',
						renderer : function(value) {
							if(value!=undefined){
								if(value.length==11) {
									return value.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
								}else if(value.length==8){
									return value.replace(/(\d{2})(\d{3})(\d{3})/,"$1***$3");
								}
							}
							return value;
						}
					}
					]
				// end of columns
		});

		// 特殊事项
		this.gridPanel_special = new HT.EditorGridPanel({
			autoHeight : false,
			height : 150,
			showSm : false,
			showNum : false,
			url : __ctxPath	+ "/customer/listEveCusSpeEve.do",
			baseParams : {
				'Q_customer.customerId_L_EQ' : cusId
			},
			fields : [{
						name : 'eveId',
						type : 'int'
					}, 'eveContent'
					],
			columns : [{
						header : 'eveId',
						dataIndex : 'eveId',
						hidden : true
					}, {
						header : '内容',
						dataIndex : 'eveContent'
					}
					]
				// end of columns
			});
		
		// 联络历史
		this.gridPanel_contacthistory = new HT.EditorGridPanel({
			region : 'center',
			autoHeight : false,
			url : __ctxPath
					+ "/customer/listHisConHis.do",
			baseParams : {
				'Q_customer.customerId_L_EQ' : cusId
			},
			fields : [{
						name : 'conHisId',
						type : 'int'
					},  'contactTypeId', 'dirId','statusId',
					'staTime', 'ownerId', 'busTypId',
					'conResId', 'dealStaId'],
			columns : [{
						header : '内码',
						dataIndex : 'conHisId',
						hidden : true
					}, {
						header : '联络方式',
						dataIndex : 'contactTypeId',
						renderer : function(value) {
							if (value != null) {
								return LXFS001.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '方向',
						dataIndex : 'dirId',
						renderer : function(value) {
							return CONFX.get(value);
						}
					}, {
						header : '联络时间',
						dataIndex : 'staTime'
					}, {
						header : '负责人',
						dataIndex : 'ownerId'
					}, {
						header : '联络事项',
						dataIndex : 'busTypId'
					}, {
						header : '呼叫结果',
						dataIndex : 'conResId',
						renderer : function(value) {
							return CONLLJG.get(value);
						}
					}, {
						header : '营销状态',
						dataIndex : 'statusId',
						renderer : function(value) {
							if('null'!=value && ''!=value) {
								return CONOB_SALETASK_YXZT.get(value); 
							}
							return '';
						}
					}]
				// end of columns
			});
		// 服务历史
		this.gridPanel_fuwuhistory = new HT.GridPanel({
			region : 'center',
			id : 'YXtaskActionServHisID_ADF',
			autoHeight : false,
			rowActions : true,
			lazyLoad : true,//延迟加载
			url : __ctxPath
					+ "/task/listPlanCalendarPlan.do",
			baseParams : {
				'customerId' : cusId,
				'serviceId' : gtaskId,
				start : 0,
				limit : 25
			},
			fields : [{
						name : 'planId',
						type : 'int'
					}, 'status', 'startTime', 'endTime',
					'urgent', 'content', 'fullname',
					'assignerName', 'taskType','taskCategory'],
			columns : [{
				header : '标题',
				width : 140,
				dataIndex : 'taskTitle'
			},{
				header : '任务类型',
				width : 90,
				dataIndex : 'taskType',
				renderer : function(value) {
					if (value != '' || value=='0') {
						return TASK_TYPE.get(value);
					} else {
						return ' ';
					}
				}
			},{
				header : '任务类别',
				width : 90,
				dataIndex : 'taskCategory',
				renderer:function(value){
					if (value != '' || value=='0') {
						return TASK_CATEGORY.get(value);
					} else {
						return ' ';
					}
					
				}
			}, {
				header : '任务事项',
				width : 90,
				dataIndex : 'busiType',
				renderer:function(value){
					if (value != '' || value=='0') {
						return TASK_MATTER.get(value);
					} else {
						return ' ';
					}
					
				}
			}, {
				header : '要求完成时间',
				dataIndex : 'completeTime'
			}, {
				header : '完成率',
				dataIndex : 'effeciency',
				renderer:function(value){
					if(value==null || value==""){
						return '0%'
					}else{
						return value+'%';
					}
				}
			}, {
				header : '执行人',
				dataIndex : 'fullname'
			},{
				header : '状态',
				dataIndex : 'status',
				renderer:function(value){
					if (value != '') {
						return CON_REQ_STATUS.get(value);
					} else {
						return ' ';
					}
				}
			}, new Ext.ux.grid.RowActions({
					header : __action,
					width : 100,
					actions : [{
								iconCls : 'btn-form-design',
								qtip : '查看',
								style : 'margin:0 3px 0 3px'
							}],
					listeners : {
						scope : this,
						'action' : this.onRowAction
					}
				})]
				// end of columns
			});

		this.formPanelAction = new Ext.Panel({
			border : false,
			layout : 'border',
			autoScroll : true,
			items : [{
				layout : 'border',
				region : 'center',
				border : false,
				items : [{
					region : 'center',
					border : false,
					items : [{
						xtype : 'tabpanel',
						activeTab : 0,// 激活第一个panel
						plain : true,
						id : 'operationTab_ADF',
						region : 'center',
						bodyStyle : 'padding:5px;',
						items : [
									{
									title : '联络历史',
									border : false,
									height : 450,
									layout : 'fit',
									items : [this.gridPanel_contacthistory]
								}, {
									title : '服务历史',
									border : false,
									height : 450,
									layout : 'fit',
									items : [this.gridPanel_fuwuhistory,{
											id : 'HiddenActionID2hisService_ADF',
											xtype : 'hidden',
											value : true
										}]

								},new DDhistory(cusNo)],
                                listeners : {
                                    'tabchange' : function(p) {
	                                    var selePanel = p.activeTab;
                                        if(selePanel.getId() == 'dd-history'){
                                        	if(isLoadGoodsHis==false) {
                                        		DDhistory.load(cusNo);
                                        		isLoadGoodsHis = true;
                                            	return;
                                        	}
                                        }
                                        //get(0),获取当前容器包含的一个组件( items.get(key)方法的别名) 
                                       
    									var isLoadServiceHis = Ext.getCmp("HiddenActionID2hisService_ADF").getValue();
										if(isLoadServiceHis == 'true') {
											Ext.getCmp("HiddenActionID2hisService_ADF").setValue(false);
											Ext.getCmp("YXtaskActionServHisID_ADF").getStore().reload();
										}
                                    }
                                }
					}]
				}, new Ext.FormPanel({
					region : 'north',
					border : false,
					layout:'form',
					id : 'YXtaskActionDetailFormPanelId',
					height : 160,
					items : [{
						layout : "column",
						xtype : 'container',
						style : 'padding:10px',
						defaults : {
							border : false,
							anchor : '100%,100%'
						},
						items : [{
							columnWidth : .5,// 第1列
							layout : "form",
							labelAlign : 'right',
							labelWidth : 70,
							anchor : '100%',
							items : [{
										fieldLabel : '客户代码',
										xtype : 'textfield',
										name : 'cusPersonal.customerNo',
										id : 'OB_YxtaskDetailAction_cusNo_01',
										allowBlank : false,
										readOnly : true,
										editable : false,
										maxLength : 128,
										anchor : '100%'
									}, {
										fieldLabel : '证件类型',
										xtype : 'mtdiccombolocal',
										name : 'cusPersonal.credTypId',
										id : 'OB_YxtaskDetailAction_credTypId_01',
										editable : true,
										readOnly : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'GGZJLX',
										anchor : '100%'
									},{
										xtype : 'hidden',
										id : 'OB_YxtaskAction_gender_Hidden_ADF'
									},  {
										fieldLabel : '性别',
										xtype : 'mtdiccombolocal',
										name : 'cusPersonal.gender',
										id : 'OB_YxtaskAction_gender_01_ADF',
										editable : true,
										readOnly : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'XB001',
										anchor : '100%'
									}, {
												xtype : 'datefield',
												readOnly : true,
												name : 'cusPersonal.birthday',
												id : 'OB_YxtaskAction_birthday_01_ADF',
												fieldLabel : '出生日期',
												format : 'm-d-y',
												anchor : '100%'
											}]
						}, {
							columnWidth : .5,// 第2列
							layout : "form",
							labelAlign : 'right',
							labelWidth : 70,
							items : [{
										fieldLabel : '客户姓名',
										xtype : 'textfield',
										name : 'cusPersonal.nameCn',
										id : 'OB_YxtaskAction_nameCn_01_ADF',
										editable : false,
										readOnly : true,
										maxLength : 128,
										anchor : '100%'
									}, {
										fieldLabel : '证件号码',
										xtype : 'textfield',
										name : 'cusPersonal.credNum',
										id : 'OB_YxtaskAction_credNum_01_ADF',
										editable : false,
										readOnly : true,
										maxLength : 128,
										anchor : '100%'
									}, {
										xtype : 'hidden',
										id : 'OB_ADF_cusGraId_hidden_01'
									}, {
										fieldLabel : '客户等级',
										xtype : 'mtdiccombolocal',
										name : 'cusPersonal.cusGraId',
										id : 'OB_YxtaskAction_cusGraId_01_ADF',
										editable : true,
										readOnly : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONKHJB',
										anchor : '100%'
									}, {
										layout : 'column',
										border : false,
										style : 'margin-left:70px',
										items : [{
													columnWidth : .3,
													xtype : 'checkbox',
													readOnly : true,
													id : 'OB_YxtaskAction_isMail_01_ADF',
													name : 'cusPersonal.isMail',
													boxLabel : '接收邮件',
													inputValue:1
												}, {
													columnWidth : .3,
													xtype : 'checkbox',
													readOnly : true,
													id : 'OB_YxtaskAction_happyCall_01_ADF',
													name : 'cusPersonal.happyCall',
													boxLabel : 'happy_call',
													inputValue:1
												}, {
													columnWidth : .3,
													xtype : 'checkbox',
													readOnly : true,
													id : 'OB_YxtaskAction_isDm_01_ADF',
													name : 'cusPersonal.isDm',
													boxLabel : '接收DM',
													inputValue:1
												}]
									}]
						}]
					}]
				})]
			}, {
				region : 'west',
				border : false,
				autoScroll : true,
				width : 350,
				layout:'border',
				split : true,
				items : [{
					border:false,
					layout : {
							type : 'vbox',
							align : 'stretch'
						},
					region:'center',
					items:[{
							title : '联系方式',
							collapsible : true,
							flex:1,
							collapsed : false,
							border : false,
							layout:'fit',
							items : [this.gridPanel_contact]
						}, {
							title : '特殊事项',
							collapsible : true,
							flex:1,
							layout:'fit',
							border : false,
							collapsed : false,
							items : [this.gridPanel_special]
						}]
				}
				]
			}]
		});

		// 加载数据
		if (this.cusId != null && this.cusId != 'undefined') {
			// 加载客户基本信息
			YXtaskActionDetailForm.load_BaseCusInfo(cusId);
		}
	},// end of the initcomponents

	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-form-design' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	},
	editRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('addCalendarPlanFormWin');
		if (aForm != null) {
			tabs.remove('addCalendarPlanFormWin');
		}
		aForm = new addCalendarPlanForm({
			planId : record.data.planId,
			flag:'show'
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	}
});
YXtaskActionDetailForm.load_BaseCusInfo = function(cusId) {
	Ext.Ajax.request({
		url : __ctxPath + '/outb/getBaseCusInfoObConCalllist.do?cusId=' + cusId,
		method : 'post',
		success : function(response) {
			var thisObj = Ext.util.JSON.decode(response.responseText);
			if (thisObj != null) {
				Ext.getCmp("OB_YxtaskDetailAction_cusNo_01").setValue(thisObj.customerNo);
				Ext.getCmp("OB_YxtaskDetailAction_credTypId_01").setValue(thisObj.credTypId=='null'?'':thisObj.credTypId);
				Ext.getCmp("OB_YxtaskAction_gender_01_ADF").setValue(thisObj.gender=='null'?'':thisObj.gender);
				Ext.getCmp("OB_YxtaskAction_birthday_01_ADF").setValue(thisObj.birthday=='null'?'':thisObj.birthday);
				Ext.getCmp("OB_YxtaskAction_isMail_01_ADF").setValue(thisObj.isMail=='null'?'':thisObj.isMail);
				Ext.getCmp("OB_YxtaskAction_happyCall_01_ADF").setValue(thisObj.happyCall=='null'?'':thisObj.happyCall);
				Ext.getCmp("OB_YxtaskAction_isDm_01_ADF").setValue(thisObj.isDm=='null'?'':thisObj.isDm);
				Ext.getCmp("OB_YxtaskAction_nameCn_01_ADF").setValue(thisObj.nameCn=='null'?'':thisObj.nameCn);
				Ext.getCmp("OB_YxtaskAction_credNum_01_ADF").setValue(thisObj.credNum=='null'?'':thisObj.credNum);
				Ext.getCmp("OB_YxtaskAction_cusGraId_01_ADF").setValue(thisObj.cusGraId=='null'?'':thisObj.cusGraId);

                //添加客户性别与级别隐藏域，并赋值  by wangzj
				Ext.getCmp('OB_YxtaskAction_gender_Hidden_ADF').setValue(thisObj.gender=='null'?'':thisObj.gender);
				Ext.getCmp('OB_ADF_cusGraId_hidden_01').setValue(thisObj.cusGraId=='null'?'':thisObj.cusGraId);
			}
		},
		failure : function() {
		}
	});
}