var tmpComId = '';
var tmpAssignTypeId = '';
var tmpmaxDiaNum = '';
var tmpmaxDiaSpace = '';
var tmpisDiaTime = '';
var tmpbusiTypeId = '';
/**
 * @author:cf0666@gmail.com
 * @class ConHushouView
 * @extends Ext.Panel
 * @description [ConHushou]管理
 * @company 优创融联科技
 * @createtime:
 */
YXtaskDetailForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);

		// 初始化组件
		this.initUIComponents(_cfg);

		// 调用父类构造
		YXtaskDetailForm.superclass.constructor.call(this, {
					id : 'YXtaskDetailFormWin',
					title :  '营销任务明细',
					region : 'center',
					layout : 'border',
					items : [this.formPanel, this.tabpanel]
				});
	},// end of constructor

	// 初始化组件
	initUIComponents : function(_cfg) {
		tmpComId = this.comId;
		tmpAssignTypeId = this.assignTypeId;
		tmpmaxDiaNum = _cfg.maxDiaNum;
		tmpmaxDiaSpace = _cfg.maxDiaSpace;
		tmpisDiaTime = _cfg.isDiaTime;
		tmpbusiTypeId = _cfg.busiTypeId;
		Ext.Ajax.request({
			url : __ctxPath + '/outb/listCountsObSaletask.do?comId=' + _cfg.comId,
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				var layUp = result.LAY_UP;
				var plan = result.PLAN; 
				var flowing = result.FLOWING; 
				var canceled = result.CANCELED; 
				var failCase = result.FAIL_CASE;
				var succCase = result.SUCC_CASE; 
				var noExec = result.NO_EXEC;
				
				var chart = new FusionCharts(__ctxPath +"/fusioncharts/charts/Pie3D.swf","ChartId","100%",100,"0","0");
				chart.setDataXML("<graph showCanvasBase='0' xAxisName='Month' yAxisName='Units'  showNames='1' decimalPrecision='0' formatNumberScale='0' showBorder='0'>"+ 
					"<set label='未执行' value='"+noExec+"' /> "+
					"<set label='预约' value='"+plan+"' /> "+
					"<set label='已取消' value='"+canceled+"' /> "+
 					"<set label='已失败结案' value='"+failCase+"' />" +
 					"<set label='已成功结案' value='"+succCase+"' />" +
 					"<set label='待追踪' value='"+flowing+"' />" +
 					"<set label='搁置' value='"+layUp+"' />" +
    				"</graph>");
				chart.render("piechartDetailForm");
			},
			failure : function() {
				Ext.ux.Toast.msg('操作信息', '统计数据读取延时，请联系管理员！');
			}
		});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			region : 'north',
			collapsible:true,
			title:'营销进度',
			collapsed:false,
			height : 150,
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
				layout : 'column',
				border : false,
				items : [
				{
					columnWidth : .5,
					border : false,
					style : 'text-align:center',
					id:'piechartDetailForm',
					items:[]
				}
				,{
					columnWidth:.5,
					border:false,
					id : 'orderSalesIndexDetailForm',
					layout:'fit',
					items : []
				}]
			}]
		});
		
		Ext.Ajax.request({
			url : __ctxPath + "/outb/getStatisticsDataObSaletask.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				var perFinishRate = result.perFinishRate==''?'':(result.perFinishRate+'%');
				var groupFinishRate = result.groupFinishRate==''?'':(result.groupFinishRate+'%');
				var avgFinishRate = result.avgFinishRate==''?'':(result.avgFinishRate+'%');
				var html = new Ext.Panel({
					html : '<table class="bordertable" align="center" width="100%">' +
							'<tr class="head"><td></td><td>指标</td><td>销售额</td><td>完成率</td></tr>' +
							'<tr><td class="head" style="font-weight:bold">个人</td><td>'+result.selfFeeIndex+'</td><td>'+result.perSales+'</td><td>'+perFinishRate+'</td></tr>' +
							'<tr><td class="head" style="font-weight:bold">小组</td><td>'+result.goupFeeIndex+'</td><td>'+result.groupSales+'</td><td>'+groupFinishRate+'</td></tr>' +
							'<tr><td class="head" style="font-weight:bold">平均</td><td>'+result.avgFeeIndex+'</td><td>'+result.avgSales+'</td><td>'+avgFinishRate+'</td></tr>' +
							'</table>'
				});
				html.render('orderSalesIndexDetailForm');
			},
			failure : function() {
				Ext.ux.Toast.msg('操作信息', '统计数据读取延时，请联系管理员！');
			}
		});
		
		if (_cfg.comId != null && _cfg.comId != 'undefinded') {

		};

		// 初始化搜索条件Panel
		this.searchPanel1 = new Ext.FormPanel({			//全部任务ALL
					layout : 'hbox',
					region : 'north',
					id : 'searchPanel1IDDetailForm',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '联络结果：'
							}, {
								hiddenName : 'Q_conStaId_SN_EQS',
								id : 'combo_conStaId_ALL_Detail_Form',
								anchor : '95%',
								xtype : 'treecomboz',
								lazyInit : false,
								tplId : 'tree_tpl',
								rootVisible : false,
								editable : false,
						    	forceSelection : false,
						    	url : __ctxPath+ '/system/treeByMapNameDictionary.do?mapName=CONTPHXZT&relDic=10841'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '营销阶段：'
							}, {
								hiddenName : 'Q_busiStagId_SN_EQ',
								xtype : 'mtdiccombo',
								id : 'combo_busiStagId_ALL_DF',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_SALETASK_YXJD'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel1IDDetailForm');
									searchPanel.getForm().reset();
								}
							},{
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : function() {
									var conStaId = Ext.getCmp("combo_conStaId_ALL_Detail_Form").getItemIndex();
									Ext.getCmp("OB_YXtaskDetailForm_Hidden_01").setValue(conStaId);
									$search({
										searchPanel : Ext.getCmp("searchPanel1IDDetailForm"),
										gridPanel : Ext.getCmp("YXtaskGridPanel1_DF")
									});
								}
							},{
								name : 'Q_conStaId_SN_EQ',
								id : 'OB_YXtaskDetailForm_Hidden_01',
								xtype : 'hidden'
							}
							],
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
		this.searchPanel2 = new Ext.FormPanel({		//未执行任务NO_EXEC
					layout : 'hbox',
					region : 'north',
					id : 'searchPanel2ID_DF',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '分配来源：'
							}, {
								hiddenName : 'Q_typId_SN_EQ',
								xtype : 'mtdiccombo',
								id : 'combo_typeId_noExec_DF',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_SALETASK_MDHQFS'
							},{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '分配时间：'
							}, {
								xtype : 'datefield',
								name : 'startTime',
								id : 'date_start_noExec_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_noExec_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel2ID_DF');
									searchPanel.getForm().reset();
									Ext.getCmp("date_start_noExec_DF").setRawValue('');
									Ext.getCmp("date_end_noExec_DF").setRawValue('');
								}
							},{
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
										handler : function() {
											$search({
												searchPanel : Ext.getCmp("searchPanel2ID_DF"),
												gridPanel : Ext.getCmp("YXtaskGridPanel2_DF")
											});
										}
							}
							],
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
		this.searchPanel3 = new Ext.FormPanel({				//预约任务PLAN
					layout : 'hbox',
					region : 'north',
					id : 'searchPanel3ID_DF',
					height : 35,
					items : [ {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '预约时间：'
							}, {
								xtype : 'datefield',
								name : 'startTime',
								id : 'date_start_plan_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_plan_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel3ID_DF');
									searchPanel.getForm().reset();
								}
							},{
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
//										handler : this.onSearch
										handler : function() {
											$search({
												searchPanel : Ext.getCmp("searchPanel3ID_DF"),
												gridPanel : Ext.getCmp("YXtaskGridPanel3_DF")
											});
										}
							}
							],
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
		
		this.searchPanel4 = new Ext.FormPanel({			//搁置任务LAY_UP
					layout : 'hbox',
					region : 'north',
					id : 'searchPanel4ID_DF',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '搁置原因：'
							}, {
								hiddenName : 'Q_busiRelId_SN_EQS',
								id : 'combo_busiRelId_layUp_DF',
								anchor : '95%',
								xtype : 'treecomboz',
								lazyInit : false,
								tplId : 'tree_tpl',
								rootVisible : false,
								editable : false,
						    	forceSelection : false,
						    	url : __ctxPath+ '/system/treeByMapNameDictionary.do?mapName=CONTPHXZT&relDic=10841'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '营销阶段：'
							}, {
								hiddenName : 'Q_busiStagId_SN_EQ',
								xtype : 'mtdiccombo',
								id : 'combo_busiStagId_layUp_DF',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_SALETASK_YXJD'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel4ID_DF');
									searchPanel.getForm().reset();
								}
							},{
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
//										handler : this.onSearch
								handler : function() {
									var conStaId = Ext.getCmp("combo_busiRelId_layUp_DF").getItemIndex();
									Ext.getCmp("OB_YXtaskDetailForm_Hidden_layUp").setValue(conStaId);
									$search({
										searchPanel : Ext.getCmp("searchPanel4ID_DF"),
										gridPanel : Ext.getCmp("YXtaskGridPanel4_DF")
									});
								}
							},{
								name : 'Q_busiRelId_SN_EQ',
								id : 'OB_YXtaskDetailForm_Hidden_layUp',
								xtype : 'hidden'
							}
							],
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
		this.searchPanel5 = new Ext.FormPanel({		//带追踪任务FLOWING
					layout : 'hbox',
					region : 'north',
					id : 'searchPanel5ID_DF',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '联络结果：'
							}, {
								hiddenName : 'Q_conStaId_SN_EQS',
								id : 'combo_conStaId_flowing_DF',
								anchor : '95%',
								xtype : 'treecomboz',
								lazyInit : false,
								tplId : 'tree_tpl',
								rootVisible : false,
								editable : false,
						    	forceSelection : false,
						    	url : __ctxPath+ '/system/treeByMapNameDictionary.do?mapName=CONTPHXZT&relDic=10841'
							},  {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '营销阶段：'
							}, {
								hiddenName : 'Q_busiStagId_SN_EQ',
								xtype : 'mtdiccombo',
								id : 'combo_busiStagId_flowing_DF',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_SALETASK_YXJD'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel5ID_DF');
									searchPanel.getForm().reset();
								}
							},{
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
//										handler : this.onSearch
										handler : function() {
											var conStaId = Ext.getCmp("combo_conStaId_flowing_DF").getItemIndex();
											Ext.getCmp("OB_YXtaskDetailForm_Hidden_FLOWING").setValue(conStaId);
											$search({
												searchPanel : Ext.getCmp("searchPanel5ID_DF"),
												gridPanel : Ext.getCmp("YXtaskGridPanel5_DF")
											});
										}
							},{
								name : 'Q_conStaId_SN_EQ',
								id : 'OB_YXtaskDetailForm_Hidden_FLOWING',
								xtype : 'hidden'
							}
							],
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
		this.searchPanel6 = new Ext.FormPanel({			//成功结案任务SUCC_CASE
					layout : 'hbox',
					region : 'north',
					id : 'searchPanel6ID_DF',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '结案时间：'
							}, {
								xtype : 'datefield',
								name : 'startTime',
								id : 'date_start_succCase_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_succCase_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '销售状态：'
							}, {
								hiddenName : 'Q_servStaId_SN_EQ',
								xtype : 'mtdiccombo',
								id : 'combo_servStaId_succCase_DF',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_SALETASK_FWZT'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel6ID_DF');
									searchPanel.getForm().reset();
								}
							},{
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
//										handler : this.onSearch
										handler : function() {
											$search({
												searchPanel : Ext.getCmp("searchPanel6ID_DF"),
												gridPanel : Ext.getCmp("YXtaskGridPanel6_DF")
											});
										}
									}
							],
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
		this.searchPanel7 = new Ext.FormPanel({				//失败结案任务FAIL_CASE
					layout : 'hbox',
					region : 'north',
					id : 'searchPanel7ID_DF',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '结案时间：'
							}, {
								xtype : 'datefield',
								name : 'startTime',
								id : 'date_start_failCase_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_failCase_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '失败原因：'
							}, {
								hiddenName : 'Q_taskExecType_S_EQ',
								xtype : 'textfield',
								name : 'QtaskExecType',
								id : 'TXT_taskExecType_failCase_DF',
								lazyInit : false
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel7ID_DF');
									searchPanel.getForm().reset();
								}
							},{
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
//										handler : this.onSearch
										handler : function() {
											$search({
												searchPanel : Ext.getCmp("searchPanel7ID_DF"),
												gridPanel : Ext.getCmp("YXtaskGridPanel7_DF")
											});
										}
									}
							],
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
		this.searchPanel8 = new Ext.FormPanel({		//回收任务CANCELED
					layout : 'hbox',
					region : 'north',
					id : 'searchPanel8ID_DF',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '回收时间：'
							}, {
								xtype : 'datefield',
								name : 'startTime',
								id : 'date_start_canceled_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_canceled_DF',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '回收来源：'
							},  {
								hiddenName : 'Q_taskExecType_S_EQ',
								xtype : 'textfield',
								name : 'QtaskExecType',
								id : 'TXT_taskExecType_canceled_DF',
								lazyInit : false
							},{
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel8ID_DF');
									searchPanel.getForm().reset();
								}
							},{
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
										handler : function() {
											$search({
												searchPanel : Ext.getCmp("searchPanel8ID_DF"),
												gridPanel : Ext.getCmp("YXtaskGridPanel8_DF")
											});
										}
									}
							],
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
		this.gridPanel1 = new HT.GridPanel({	//全部任务
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			lazyLoad : true,
			showSm : false,
			id : 'YXtaskGridPanel1_DF',
			url : __ctxPath + "/outb/listTaskObSaletask.do?type=ALL&comId=" + _cfg.comId,
			fields : ['saletaskId','cusId', 'nameCn', 'gender','credTypId', 
					  'credNum', 'cusGraId','assTypId','asgDat','taskId','cusNo',
					  'diaCou', 'lastDiaDat','booTim','conStaId','busiStaId','servStaId','busiStagId'],
			columns : [
					{
						header : 'taskId',
						dataIndex : 'taskId',
						hidden : true
					},
					{
						header : 'cusNo',
						dataIndex : 'cusNo',
						hidden : true
					},
					{
						header : 'cusId',
						dataIndex : 'cusId',
						hidden : true
					},
					{
						header : 'busiStaId',
						dataIndex : 'busiStaId',
						hidden : true
					},
					{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					},{
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return GGZJLX.get(value);
						}
					}, {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					}, {
						header : '客户等级',
						isExp : false,
						dataIndex : 'cusGraId',
						renderer : function(value) {
							return CONKHJB.get(value);							
						}
					}, {
						header : '任务来源',
						isExp : false,
						dataIndex : 'assTypId',
						renderer : function(value) {
							return CONOB_CALLBATCH_ASS_FPFS.get(value);
						}
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'asgDat'
					}, {
						header : '拨打次数',
						isExp : false,
						dataIndex : 'diaCou'
					}, {
						header : '最后拨打时间',
						isExp : false,
						dataIndex : 'lastDiaDat'
					}, {
						header : '最后预约时间',
						isExp : false,
						dataIndex : 'booTim'
					}, {
						header : '营销阶段',
						isExp : false,
						dataIndex : 'busiStagId',
						renderer : function(value) {
							return CONOB_SALETASK_YXJD.get(value);
						}
					},{
						header : '联络结果',
						isExp : false,
						dataIndex : 'conStaId',
						renderer : function(value) {
							return CONTPHXZT.get(value);
						}
					}, {
						header : '联络状态',
						isExp : false,
						dataIndex : 'servStaId',
						renderer : function(value) {
							return CONOB_SALETASK_FWZT.get(value);
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-form-design',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										}
										],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});

		this.gridPanel2 = new HT.GridPanel({	//未执行任务
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			lazyLoad : true,
			showSm : false,
			id : 'YXtaskGridPanel2_DF',
			url : __ctxPath + "/outb/listTaskObSaletask.do?type=NO_EXEC&comId=" + _cfg.comId+"&assTypId="+tmpAssignTypeId,
			fields : [{
						name :'cusId',
						type : 'int'
				}, 'nameCn', 'gender','credTypId',  'credNum', 'cusGraId','lastDiaDat','assTypId'
					  ,'typId','asgDat','busiStaId','taskId','cusNo','diaCou'
					  ],
			columns : [
					{
						header : 'taskId',
						dataIndex : 'taskId',
						hidden : true
					},
					{
						header : 'cusNo',
						dataIndex : 'cusNo',
						hidden : true
					},
					{
						header : 'diaCou',
						dataIndex : 'diaCou',
						hidden : true
					},
					{
						header : 'lastDiaDat',
						dataIndex : 'lastDiaDat',
						hidden : true
					},
					{
						header : 'busiStaId',
						dataIndex : 'busiStaId',
						hidden : true
					},
					{
						header : 'cusId',
						dataIndex : 'cusId',
						hidden : true
					},
					{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					}
					,{
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return GGZJLX.get(value);
						}
					},  {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					}, {
						header : '客户等级',
						isExp : false,
						dataIndex : 'cusGraId',
						renderer : function(value) {
							return CONKHJB.get(value);							
						}
					},
					 {
						header : '任务来源',
						isExp : false,
						dataIndex : 'assTypId',
						renderer : function(value,cls,record) {
							var assTypId = record.get('assTypId');
							if('1'==assTypId) {
								value = '1';
							}
							return CONOB_SALETASK_MDHQFS.get(value);
						}
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'asgDat'
					}, 
					new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-form-design',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
			
			this.gridPanel3 = new HT.GridPanel({	//预约任务
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			lazyLoad : true,
			showSm : false,
			id : 'YXtaskGridPanel3_DF',
			url : __ctxPath + "/outb/listTaskObSaletask.do?type=PLAN&comId=" + _cfg.comId,
			fields : ['cusId', 'nameCn', 'gender','credTypId', 
					  'credNum', 'cusGraId','assTypId','asgDat','taskId','cusNo',
					  'diaCou', 'lastDiaDat','booTim','conStaId','busiStaId','servStaId','busiStagId','remainTime'],
			columns : [
					{
						header : 'taskId',
						dataIndex : 'taskId',
						hidden : true
					},
					{
						header : 'cusNo',
						dataIndex : 'cusNo',
						hidden : true
					},
					{
						header : 'busiStaId',
						dataIndex : 'busiStaId',
						hidden : true
					},
					{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					}, {
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return GGZJLX.get(value);
						}

					}, {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					}, {
						header : '客户等级',
						isExp : false,
						dataIndex : 'cusGraId',
						renderer : function(value) {
							return CONKHJB.get(value);							
						}
					}, {
						header : '任务来源',
						isExp : false,
						dataIndex : 'assTypId',
						renderer : function(value) {
							return CONOB_CALLBATCH_ASS_FPFS.get(value);
						}
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'asgDat'
					}, {
						header : '拨打次数',
						isExp : false,
						dataIndex : 'diaCou'
					}, {
						header : '最后拨打时间',
						isExp : false,
						dataIndex : 'lastDiaDat'
					},  {
						header : '营销阶段',
						isExp : false,
						dataIndex : 'busiStagId',
						renderer : function(value) {
							return CONOB_SALETASK_YXJD.get(value);
						}
					},{
						header : '预约时间',
						isExp : false,
						dataIndex : 'booTim'
					},  {
						header : '剩余时间',
						isExp : false,
						dataIndex : 'remainTime'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-form-design',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
			
		this.gridPanel4 = new HT.GridPanel({			//搁置任务
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			lazyLoad : true,
			showSm : false,
			id : 'YXtaskGridPanel4_DF',
			url : __ctxPath + "/outb/listTaskObSaletask.do?type=LAY_UP&comId=" + _cfg.comId,
			fields : ['cusId', 'nameCn', 'gender','credTypId', 'taskId','conStaId',
					  'credNum', 'cusGraId','assTypId','asgDat','busiStaId','cusNo',
					  'diaCou', 'lastDiaDat','busiRelId','servTypId','busiStagId'],
			columns : [
					{
						header : 'taskId',
						dataIndex : 'taskId',
						hidden : true
					},
					{
						header : 'cusNo',
						dataIndex : 'cusNo',
						hidden : true
					},
					{
						header : 'busiStaId',
						dataIndex : 'busiStaId',
						hidden : true
					},
					{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					}, {
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return GGZJLX.get(value);
						}

					}, {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					}, {
						header : '客户等级',
						isExp : false,
						dataIndex : 'cusGraId',
						renderer : function(value) {
							return CONKHJB.get(value);							
						}
					}, {
						header : '任务来源',
						isExp : false,
						dataIndex : 'assTypId',
						renderer : function(value) {
							return CONOB_CALLBATCH_ASS_FPFS.get(value);
						}
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'asgDat'
					}, {
						header : '拨打次数',
						isExp : false,
						dataIndex : 'diaCou'
					}, {
						header : '最后拨打时间',
						isExp : false,
						dataIndex : 'lastDiaDat'
					},{
						header : '营销阶段',
						isExp : false,
						dataIndex : 'busiStagId',
						renderer : function(value) {
							return CONOB_SALETASK_YXJD.get(value);
						}
					},{
						header : '搁置原因',
						isExp : false,
						dataIndex : 'conStaId',
						renderer : function(value) {
							return CONTPHXZT.get(value);
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-form-design',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
			
		this.gridPanel5 = new HT.GridPanel({		//待跟踪任务
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			lazyLoad : true,
			showSm : false,
			id : 'YXtaskGridPanel5_DF',
			url : __ctxPath + "/outb/listTaskObSaletask.do?type=FLOWING&comId=" + _cfg.comId,
			fields : ['cusId', 'nameCn', 'gender','credTypId', 'taskId',
					  'credNum', 'cusGraId','assTypId','asgDat','busiStaId','cusNo',
					  'diaCou', 'lastDiaDat','conStaId','busiStaId','servStaId','busiStagId'],
			columns : [
					{
						header : 'taskId',
						dataIndex : 'taskId',
						hidden : true
					},
					{
						header : 'cusNo',
						dataIndex : 'cusNo',
						hidden : true
					},
					{
						header : 'busiStaId',
						dataIndex : 'busiStaId',
						hidden : true
					},
					{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					}, {
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return GGZJLX.get(value);
						}
					}, {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					}, {
						header : '客户等级',
						isExp : false,
						dataIndex : 'cusGraId',
						renderer : function(value) {
							return CONKHJB.get(value);							
						}
					}, {
						header : '任务来源',
						isExp : false,
						dataIndex : 'assTypId',
						renderer : function(value) {
							return CONOB_CALLBATCH_ASS_FPFS.get(value);
						}
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'asgDat'
					}, {
						header : '拨打次数',
						isExp : false,
						dataIndex : 'diaCou'
					}, {
						header : '最后拨打时间',
						isExp : false,
						dataIndex : 'lastDiaDat'
					},  {
						header : '营销阶段',
						isExp : false,
						dataIndex : 'busiStagId',
						renderer : function(value) {
							return CONOB_SALETASK_YXJD.get(value);
						}
					},{
						header : '呼叫结果',
						isExp : false,
						dataIndex : 'conStaId',
						renderer : function(value) {
							return CONTPHXZT.get(value);
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-form-design',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
			
		this.gridPanel6 = new HT.GridPanel({		//成功结案任务
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			lazyLoad : true,
			showSm : false,
			id : 'YXtaskGridPanel6_DF',
			url : __ctxPath + "/outb/listTaskObSaletask.do?type=SUCC_CASE&comId=" + _cfg.comId,
			fields : ['cusId', 'nameCn', 'gender','credTypId', 
					  'credNum', 'cusGraId','assTypId','asgDat','cusNo',
					  'diaCou', 'lastDiaDat','conStaId','busiStaId','servStaId','lastOpeDate','busiStagId'],
			columns : [
					{
						header : 'cusNo',
						dataIndex : 'cusNo',
						hidden : true
					},{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					}, {
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return GGZJLX.get(value);
						}

					}, {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					}, {
						header : '客户等级',
						isExp : false,
						dataIndex : 'cusGraId',
						renderer : function(value) {
							return CONKHJB.get(value);							
						}
					}, {
						header : '任务来源',
						isExp : false,
						dataIndex : 'assTypId',
						renderer : function(value) {
							return CONOB_CALLBATCH_ASS_FPFS.get(value);
						}
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'asgDat'
					}, {
						header : '拨打次数',
						isExp : false,
						dataIndex : 'diaCou'
					}, {
						header : '最后拨打时间',
						isExp : false,
						dataIndex : 'lastDiaDat'
					}, {
						header : '营销阶段',
						isExp : false,
						dataIndex : 'busiStagId',
						renderer : function(value) {
							return CONOB_SALETASK_YXJD.get(value);
						}
					},{
						header : '销售状态',
						isExp : false,
						dataIndex : 'conStaId',
						dataIndex : 'servStaId',
						renderer : function(value) {
							return CONOB_SALETASK_FWZT.get(value);
						}
					}, {
						header : '结案时间',
						isExp : false,
						dataIndex : 'lastOpeDate'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-form-design',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
			
		this.gridPanel7 = new HT.GridPanel({		//失败结案任务
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			lazyLoad : true,
			showSm : false,
			id : 'YXtaskGridPanel7_DF',
			url : __ctxPath + "/outb/listTaskObSaletask.do?type=FAIL_CASE&comId=" + _cfg.comId,
			fields : ['cusId', 'nameCn', 'gender','credTypId', 
					  'credNum', 'cusGraId','assTypId','asgDat','cusNo',
					  'diaCou', 'lastDiaDat','conStaId','busiStaId','servStaId','lastOpeDate','taskExecType','busiStagId'],
			columns : [{
						header : 'cusNo',
						dataIndex : 'cusNo',
						hidden : true
					},{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					}, {
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return GGZJLX.get(value);
						}

					}, {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					}, {
						header : '客户等级',
						isExp : false,
						dataIndex : 'cusGraId',
						renderer : function(value) {
							return CONKHJB.get(value);							
						}
					}, {
						header : '任务来源',
						isExp : false,
						dataIndex : 'assTypId',
						renderer : function(value) {
							return CONOB_CALLBATCH_ASS_FPFS.get(value);
						}
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'asgDat'
					}, {
						header : '拨打次数',
						isExp : false,
						dataIndex : 'diaCou'
					}, {
						header : '最后拨打时间',
						isExp : false,
						dataIndex : 'lastDiaDat'
					},  {
						header : '营销阶段',
						isExp : false,
						dataIndex : 'busiStagId',
						renderer : function(value) {
							return CONOB_SALETASK_YXJD.get(value);
						}
					}, {
						header : '失败原因',
						isExp : false,
						dataIndex : 'taskExecType'
					}, {
						header : '结案时间',
						isExp : false,
						dataIndex : 'lastOpeDate'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-form-design',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
			
		this.gridPanel8 = new HT.GridPanel({		//回收任务
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			lazyLoad : true,
			showSm : false,
			id : 'YXtaskGridPanel8_DF',
						url : __ctxPath + "/outb/listTaskObSaletask.do?type=CANCELED&comId=" + _cfg.comId,
			fields : ['cusId', 'nameCn', 'gender','credTypId', 
					  'credNum', 'cusGraId','assTypId','asgDat','taskExecType',
					  'diaCou', 'lastDiaDat','conStaId','busiStaId','servStaId','busiStagId','busiStagId','lastOpeDate'],
			columns : [{
						header : 'cusNo',
						dataIndex : 'cusNo',
						hidden : true
					},{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					}, {
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return GGZJLX.get(value);
						}

					}, {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					}, {
						header : '客户等级',
						isExp : false,
						dataIndex : 'cusGraId',
						renderer : function(value) {
							return CONKHJB.get(value);							
						}
					}, {
						header : '任务来源',
						isExp : false,
						dataIndex : 'assTypId',
						renderer : function(value) {
							return CONOB_CALLBATCH_ASS_FPFS.get(value);
						}
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'asgDat'
					}, {
						header : '拨打次数',
						isExp : false,
						dataIndex : 'diaCou'
					}, {
						header : '最后拨打时间',
						isExp : false,
						dataIndex : 'lastDiaDat'
					}, {
						header : '营销阶段',
						isExp : false,
						dataIndex : 'busiStagId',
						renderer : function(value) {
							return CONOB_SALETASK_YXJD.get(value);
						}
					},{
						header : '回收时间',
						isExp : false,
						dataIndex : 'lastOpeDate'
					}, {
						header : '回收来源',
						isExp : false,
						dataIndex : 'taskExecType'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-form-design',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
		this.tabpanel = new Ext.TabPanel({
					activeTab : 1,// 激活第二个panel
					plain : true,
					id : 'YXTabPanelID_DF',
					region : 'center',
					defaultType : 'panel',
					bodyStyle : 'padding:5px;',
					items : [{
								title : '全部任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.searchPanel1,{
											id : 'Hidden1ID_DF',
											xtype : 'hidden',
											value : true
										}, this.gridPanel1]
							}, {
								title : '未执行任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.searchPanel2,{
											id : 'Hidden2ID_DF',
											xtype : 'hidden',
											value : true
										}, this.gridPanel2]
							}, {
								title : '预约任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.searchPanel3,{
											xtype : 'hidden',
											id : 'Hidden3ID_DF',
											value : true
										}, this.gridPanel3]
							}, {
								title : '搁置任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.searchPanel4,{
											xtype : 'hidden',
											id : 'Hidden4ID_DF',
											value : true
										}, this.gridPanel4]
							}, {
								title : '待跟踪任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.searchPanel5,{
											xtype : 'hidden',
											id : 'Hidden5ID_DF',
											value : true
										}, this.gridPanel5]
							}, {
								title : '成功的任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.searchPanel6,{
											xtype : 'hidden',
											id : 'Hidden6ID_DF',
											value : true
										}, this.gridPanel6]
							}, {
								title :'失败的任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.searchPanel7,{
											xtype : 'hidden',
											id : 'Hidden7ID_DF',
											value : true
										}, this.gridPanel7]
							}, {
								title : '回收任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.searchPanel8,{
											xtype : 'hidden',
											id : 'Hidden8ID_DF',
											value : true
										}, this.gridPanel8]
							}]
							,listeners : {
								'tabchange' : function(p) {
									var searchPanelID = p.activeTab.get(0).getId();
									var isLoadPanel1 = Ext.getCmp("Hidden1ID_DF").getValue();
									var isLoadPanel2 = Ext.getCmp("Hidden2ID_DF").getValue();
									var isLoadPanel3 = Ext.getCmp("Hidden3ID_DF").getValue();
									var isLoadPanel4 = Ext.getCmp("Hidden4ID_DF").getValue();
									var isLoadPanel5 = Ext.getCmp("Hidden5ID_DF").getValue();
									var isLoadPanel6 = Ext.getCmp("Hidden6ID_DF").getValue();
									var isLoadPanel7 = Ext.getCmp("Hidden7ID_DF").getValue();
									var isLoadPanel8 = Ext.getCmp("Hidden8ID_DF").getValue();
//									if (searchPanelID == 'searchPanel1IDDetailForm' && isLoadPanel1 == 'true') {
//										Ext.getCmp("Hidden1ID_DF").setValue(false);
//										Ext.getCmp("YXtaskGridPanel1_DF").getStore().reload();
//									} else
									if(searchPanelID == 'searchPanel2ID_DF' && isLoadPanel2 == 'true') {
										Ext.getCmp("Hidden2ID_DF").setValue(false);
										Ext.getCmp("YXtaskGridPanel2_DF").getStore().reload();										
									} 
									else if(searchPanelID == 'searchPanel3ID_DF' && isLoadPanel3 == 'true') {
										Ext.getCmp("Hidden3ID_DF").setValue(false);
										Ext.getCmp("YXtaskGridPanel3_DF").getStore().reload();
									} 
									else if(searchPanelID == 'searchPanel4ID_DF' && isLoadPanel4 == 'true') {
										Ext.getCmp("Hidden4ID_DF").setValue(false);
										Ext.getCmp("YXtaskGridPanel4_DF").getStore().reload();
									} 
									else if(searchPanelID == 'searchPanel5ID_DF' && isLoadPanel5 == 'true') {
										Ext.getCmp("Hidden5ID_DF").setValue(false);
										Ext.getCmp("YXtaskGridPanel5_DF").getStore().reload();
									} 
//									else if(searchPanelID == 'searchPanel6ID_DF' && isLoadPanel6 == 'true') {
//										Ext.getCmp("Hidden6ID_DF").setValue(false);
//										Ext.getCmp("YXtaskGridPanel6_DF").getStore().reload();
//									}
//									else if(searchPanelID == 'searchPanel7ID_DF' && isLoadPanel7 == 'true') {
//										Ext.getCmp("Hidden7ID_DF").setValue(false);
//										Ext.getCmp("YXtaskGridPanel7_DF").getStore().reload();										
//									}
//									else if(searchPanelID == 'searchPanel8ID_DF' && isLoadPanel8 == 'true') {
//										Ext.getCmp("Hidden8ID_DF").setValue(false);
//										Ext.getCmp("YXtaskGridPanel8_DF").getStore().reload();
//									}
								}
							}
				});
				
	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	
	toTaskDelAction : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('YXtaskActionDetailFormWin');
		if (aForm != null) {
			tabs.remove('YXtaskActionDetailFormWin');
		}
		aForm = new YXtaskActionDetailForm({
			cusId : record.data.cusId,
			cusNo : record.data.cusNo,
			comId : tmpComId,
			isDiaTime : tmpisDiaTime,
			busiStaId : record.data.busiStaId,
			taskId : record.data.taskId
		});
		tabs.add(aForm);
		tabs.activate(aForm);
		//关闭左侧导航
		Ext.getCmp('westPanel').collapse();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-form-design' : {
				this.toTaskDelAction.call(this,record);
				break;
			}
			default :
				break;
		}
	}
});