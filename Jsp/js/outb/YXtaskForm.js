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
YXtaskForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);

		// 初始化组件
		this.initUIComponents(_cfg);

		// 调用父类构造
		YXtaskForm.superclass.constructor.call(this, {
					id : 'YXtaskFormWin',
					title :  '营销任务执行',
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
				chart.render("piechartForm");
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
					id:'piechartForm',
					items:[]
				}
				,{
					columnWidth:.5,
					border:false,
					id : 'orderSalesIndexForm',
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
				html.render('orderSalesIndexForm');
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
					id : 'searchPanel1IDForm',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '联络结果：'
							}, {
								hiddenName : 'Q_conStaId_SN_EQS',
								id : 'combo_conStaId_ALL_Form',
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
								id : 'combo_busiStagId_ALL_F',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_SALETASK_YXJD'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel1IDForm');
									searchPanel.getForm().reset();
								}
							},{
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : function() {
									var conStaId = Ext.getCmp("combo_conStaId_ALL_Form").getItemIndex();
									Ext.getCmp("OB_YXtaskForm_Hidden_01").setValue(conStaId);
									$search({
										searchPanel : Ext.getCmp("searchPanel1IDForm"),
										gridPanel : Ext.getCmp("YXtaskGridPanel1")
									});
								}
							},{
								name : 'Q_conStaId_SN_EQ',
								id : 'OB_YXtaskForm_Hidden_01',
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
					id : 'searchPanel2ID',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '分配来源：'
							}, {
								hiddenName : 'Q_typId_SN_EQ',
								xtype : 'mtdiccombo',
								id : 'combo_typeId_noExec',
								editable : false,
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
								id : 'date_start_noExec',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_noExec',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel2ID');
									searchPanel.getForm().reset();
									Ext.getCmp("date_start_noExec").setRawValue('');
									Ext.getCmp("date_end_noExec").setRawValue('');
								}
							},{
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
										handler : function() {
											$search({
												searchPanel : Ext.getCmp("searchPanel2ID"),
												gridPanel : Ext.getCmp("YXtaskGridPanel2")
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
					id : 'searchPanel3ID',
					height : 35,
					items : [ {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '预约时间：'
							}, {
								xtype : 'datefield',
								name : 'startTime',
								id : 'date_start_plan',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_plan',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel3ID');
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
												searchPanel : Ext.getCmp("searchPanel3ID"),
												gridPanel : Ext.getCmp("YXtaskGridPanel3")
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
					id : 'searchPanel4ID',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '搁置原因：'
							}, {
								hiddenName : 'Q_busiRelId_SN_EQS',
								id : 'combo_busiRelId_layUp',
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
								id : 'combo_busiStagId_layUp',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_SALETASK_YXJD'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel4ID');
									searchPanel.getForm().reset();
								}
							},{
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
//										handler : this.onSearch
								handler : function() {
									var conStaId = Ext.getCmp("combo_busiRelId_layUp").getItemIndex();
									Ext.getCmp("OB_YXtaskForm_Hidden_layUp").setValue(conStaId);
									$search({
										searchPanel : Ext.getCmp("searchPanel4ID"),
										gridPanel : Ext.getCmp("YXtaskGridPanel4")
									});
								}
							},{
								name : 'Q_busiRelId_SN_EQ',
								id : 'OB_YXtaskForm_Hidden_layUp',
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
					id : 'searchPanel5ID',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '联络结果：'
							}, {
								hiddenName : 'Q_conStaId_SN_EQS',
								id : 'combo_conStaId_flowing',
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
								id : 'combo_busiStagId_flowing',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_SALETASK_YXJD'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel5ID');
									searchPanel.getForm().reset();
								}
							},{
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
//										handler : this.onSearch
										handler : function() {
											var conStaId = Ext.getCmp("combo_conStaId_flowing").getItemIndex();
											Ext.getCmp("OB_YXtaskForm_Hidden_FLOWING").setValue(conStaId);
											$search({
												searchPanel : Ext.getCmp("searchPanel5ID"),
												gridPanel : Ext.getCmp("YXtaskGridPanel5")
											});
										}
							},{
								name : 'Q_conStaId_SN_EQ',
								id : 'OB_YXtaskForm_Hidden_FLOWING',
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
					id : 'searchPanel6ID',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '结案时间：'
							}, {
								xtype : 'datefield',
								name : 'startTime',
								id : 'date_start_succCase',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_succCase',
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
								id : 'combo_servStaId_succCase',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_SALETASK_FWZT'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel6ID');
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
												searchPanel : Ext.getCmp("searchPanel6ID"),
												gridPanel : Ext.getCmp("YXtaskGridPanel6")
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
					id : 'searchPanel7ID',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '结案时间：'
							}, {
								xtype : 'datefield',
								name : 'startTime',
								id : 'date_start_failCase',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_failCase',
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
								id : 'text_taskExecType_failCase',
								lazyInit : false
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel7ID');
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
												searchPanel : Ext.getCmp("searchPanel7ID"),
												gridPanel : Ext.getCmp("YXtaskGridPanel7")
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
					id : 'searchPanel8ID',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '回收时间：'
							}, {
								xtype : 'datefield',
								name : 'startTime',
								id : 'date_start_canceled',
								format : 'Y-m-d'
//								format : 'Y-m-d H:i:s'
							},{
								border:false,
								html:'-'
							}, {
								xtype : 'datefield',
								name : 'endTime',
								id : 'date_end_canceled',
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
								id : 'text_taskExecType_canceled',
								lazyInit : false
							},{
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('searchPanel8ID');
									searchPanel.getForm().reset();
								}
							},{
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
										handler : function() {
											$search({
												searchPanel : Ext.getCmp("searchPanel8ID"),
												gridPanel : Ext.getCmp("YXtaskGridPanel8")
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
			id : 'YXtaskGridPanel1',
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
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var busiStaId = record.get("busiStaId");
												//已成功结案//已失败结案//已取消
												if('4'==busiStaId || '5'==busiStaId || '6'==busiStaId ) {
													return true;
												}
												return false;
											}
										},{
											iconCls : 'menu-communicate',
											qtip : '拨打',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var busiStaId = record.get("busiStaId");
												if('0'==busiStaId || '1'==busiStaId || '2'==busiStaId || '3'==busiStaId ) {
													return true;
												}
												return false;
											}
										}],
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
			tbar : ['->',{
						text : '取任务',
						iconCls : 'menu-arch-undertake',
						id : 'get-task-menuID',
						handler : function() {
							var myMask = new Ext.LoadMask(Ext.getBody(), {
					                msg: '正在查询，请稍后...',
					                removeMask: true //完成后移除
					        });
					        myMask.show();
							Ext.Ajax.request({
								url : __ctxPath + '/outb/getTaskFromPoolObSaletask.do?comId=' + _cfg.comId,
								method : 'post',
								timeout:99999,
								success : function(response) {
									var result = Ext.util.JSON.decode(response.responseText);//解析数据
									if('true'==result.success){
										Ext.getCmp("YXtaskGridPanel2").getStore().reload();
										var cusId = result.cusId;
										var cusNo = result.cusNo;
										var busiStaId = result.busiStaId;
										var taskId = result.taskId;
										var diaCou = result.diaCou;
										var lastDiaDat = result.lastDiaDat;
										var busiTypeId = tmpbusiTypeId;
										YXtaskForm.toTaskActionAbs(cusId,cusNo,busiStaId,taskId,diaCou,lastDiaDat,busiTypeId);
									} else if('error'==result.success) {
										Ext.ux.Toast.msg('操作信息', '任务池中的数据缺少客户号，请联系管理员！');
									} else{
										Ext.ux.Toast.msg('操作信息', '任务池中的任务已取完！');
									}
									myMask.hide();
								},
								failure : function() {
									Ext.ux.Toast.msg('操作信息', '数据读取延时，请联系管理员！');
									myMask.hide();
								}
							});
						}
					}],
			printable : false,
			exportable : false,
			lazyLoad : true,
			showSm : false,
			id : 'YXtaskGridPanel2',
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
											iconCls : 'menu-communicate',
											qtip : '拨打',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var assTypId = record.get('assTypId');
												if(assTypId=='0') {//对于指定名单分配方式
													return true;
												} else {//否则默认为名单池分配方式
													return false;
												}
											}
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
			id : 'YXtaskGridPanel3',
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
											iconCls : 'menu-communicate',
											qtip : '拨打',
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
			id : 'YXtaskGridPanel4',
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
											iconCls : 'menu-communicate',
											qtip : '拨打',
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
			id : 'YXtaskGridPanel5',
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
											iconCls : 'menu-communicate',
											qtip : '拨打',
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
			id : 'YXtaskGridPanel6',
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
			id : 'YXtaskGridPanel7',
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
			id : 'YXtaskGridPanel8',
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
					id : 'YXTabPanelID',
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
											id : 'Hidden1ID',
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
											id : 'Hidden2ID',
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
											id : 'Hidden3ID',
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
											id : 'Hidden4ID',
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
											id : 'Hidden5ID',
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
											id : 'Hidden6ID',
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
											id : 'Hidden7ID',
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
											id : 'Hidden8ID',
											value : true
										}, this.gridPanel8]
							}]
							,listeners : {
								'tabchange' : function(p) {
									var searchPanelID = p.activeTab.get(0).getId();
									var isLoadPanel1 = Ext.getCmp("Hidden1ID").getValue();
									var isLoadPanel2 = Ext.getCmp("Hidden2ID").getValue();
									var isLoadPanel3 = Ext.getCmp("Hidden3ID").getValue();
									var isLoadPanel4 = Ext.getCmp("Hidden4ID").getValue();
									var isLoadPanel5 = Ext.getCmp("Hidden5ID").getValue();
									var isLoadPanel6 = Ext.getCmp("Hidden6ID").getValue();
									var isLoadPanel7 = Ext.getCmp("Hidden7ID").getValue();
									var isLoadPanel8 = Ext.getCmp("Hidden8ID").getValue();
//									if (searchPanelID == 'searchPanel1IDForm' && isLoadPanel1 == 'true') {
//										Ext.getCmp("Hidden1ID").setValue(false);
//										Ext.getCmp("YXtaskGridPanel1").getStore().reload();
//									} else
									if(searchPanelID == 'searchPanel2ID' && isLoadPanel2 == 'true') {
										Ext.getCmp("Hidden2ID").setValue(false);
										Ext.getCmp("YXtaskGridPanel2").getStore().reload();										
									} 
									else if(searchPanelID == 'searchPanel3ID' && isLoadPanel3 == 'true') {
										Ext.getCmp("Hidden3ID").setValue(false);
										Ext.getCmp("YXtaskGridPanel3").getStore().reload();
									} 
									else if(searchPanelID == 'searchPanel4ID' && isLoadPanel4 == 'true') {
										Ext.getCmp("Hidden4ID").setValue(false);
										Ext.getCmp("YXtaskGridPanel4").getStore().reload();
									} 
									else if(searchPanelID == 'searchPanel5ID' && isLoadPanel5 == 'true') {
										Ext.getCmp("Hidden5ID").setValue(false);
										Ext.getCmp("YXtaskGridPanel5").getStore().reload();
									} 
//									else if(searchPanelID == 'searchPanel6ID' && isLoadPanel6 == 'true') {
//										Ext.getCmp("Hidden6ID").setValue(false);
//										Ext.getCmp("YXtaskGridPanel6").getStore().reload();
//									}
//									else if(searchPanelID == 'searchPanel7ID' && isLoadPanel7 == 'true') {
//										Ext.getCmp("Hidden7ID").setValue(false);
//										Ext.getCmp("YXtaskGridPanel7").getStore().reload();										
//									}
//									else if(searchPanelID == 'searchPanel8ID' && isLoadPanel8 == 'true') {
//										Ext.getCmp("Hidden8ID").setValue(false);
//										Ext.getCmp("YXtaskGridPanel8").getStore().reload();
//									}
								}
							}
				});
				
		if(this.comId!=null && this.comId!='undefined') {
			//控制“取任务”按钮的显示与隐藏，只有活动分配方式为名单池分配方式时才显示该按钮
			if(tmpAssignTypeId=='1') {
				Ext.getCmp("get-task-menuID").setVisible(true);
			} else {
				Ext.getCmp("get-task-menuID").setVisible(false);
			}
			
			
		}
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
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new ConHushouForm({
								conId : rec.data.conId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new ConHushouForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConHushouForm');
		if (aForm != null) {
			tabs.remove('ConHushouForm');
		}
		aForm = new ConHushouForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/customer/multiDelConHushou.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/customer/multiDelConHushou.do',
					grid : this.gridPanel,
					idName : 'conId'
				});
	},
	
	// 编辑Rs
	editRs : function(record) {
		// new ConHushouForm({
		// conId : record.data.conId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConHushouForm');
		if (aForm != null) {
			tabs.remove('ConHushouForm');
		}
		aForm = new ConHushouForm({
					conId : record.data.conId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	toTaskAction : function(record) {
			var cusId = record.data.cusId;
			var cusNo = record.data.cusNo;
			var busiStaId = record.data.busiStaId;
			var taskId = record.data.taskId;
			var diaCou = record.data.diaCou;
			var lastDiaDat = record.data.lastDiaDat;
			var busiTypeId = tmpbusiTypeId;
			YXtaskForm.toTaskActionAbs(cusId,cusNo,busiStaId,taskId,diaCou,lastDiaDat,busiTypeId);
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
			busiStaId : record.data.busiStaId,
			taskId : record.data.taskId
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'menu-communicate' : {
				this.toTaskAction.call(this,record);
				break;
			}
			case 'btn-form-design' : {
				this.toTaskDelAction.call(this,record);
				break;
			}
			default :
				break;
		}
	}
});
YXtaskForm.toTaskActionAbs = function(_cusId,_cusNo,_busiStaId,_taskId,_diaCou,_lastDiaDat,_busiTypeId) {
		
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('YXtaskActionFormWin');
		if (aForm != null) {
			tabs.remove('YXtaskActionFormWin');
		}
		aForm = new YXtaskActionForm({
			cusId : _cusId,
			cusNo : _cusNo,
			comId : tmpComId,
			busiStaId : _busiStaId,
			taskId : _taskId,
			maxDiaNum : tmpmaxDiaNum,
			maxDiaSpace : tmpmaxDiaSpace,
			isDiaTime : tmpisDiaTime,
			diaCou : _diaCou,
			lastDiaDat : _lastDiaDat,
			busiTypeId : _busiTypeId
		});
		tabs.add(aForm);
		tabs.activate(aForm);
		//关闭左侧导航
		Ext.getCmp('westPanel').collapse();
	};