
DDHuiFangDetailForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents(_cfg);
		DDHuiFangDetailForm.superclass.constructor.call(this, {
					id : 'DDHuiFangDetailFormWin',
					layout : 'fit',
					items : this.formPanelAction,
					modal : true,
					region : 'center',
					title : '订单回访'
				});

	},// end of the constructor
	// 初始化组件
	initUIComponents : function(_cfg) {
		g_cusId_AF = _cfg.cusId; 				// 客户ID
		g_cusNo_AF = _cfg.cusNo;				// 客户业务编号
		g_comId_AF = _cfg.comId;				// 活动ID
		g_busiTypeId_AF = _cfg.busiTypeId;		// 活动类型
		g_busiStaId_AF = _cfg.busiStaId; 		// 营销状态
		g_taskId_AF = _cfg.taskId; 				// 任务ID
		g_maxDiaNum_AF = _cfg.maxDiaNum;		// 最大拨打次数
		g_maxDiaSpace_AF = _cfg.maxDiaSpace;			// 最大拨打间隔
		g_isDiaTime_AF = _cfg.isDiaTime;		// 是否有拨打时间段限制
		
		g_diaCou_AF = _cfg.diaCou;				//任务拨打次数
		g_lastDiaDat_AF = _cfg.lastDiaDat;		//最后拨打时间
		
		g_nextCus_AF = 0;
		g_isTimeBetw_AF = true;

		// 联系方式
		this.gridPanel_contact = new HT.EditorGridPanel({
			region : 'center',
			showPaging : false,
			rowActions : true,
			showSm : false,
			showNum : false,
			tbar : ['->', {
				iconCls : 'btn-save',
				text : '保存',
				xtype : 'button',
				scope : this,
				handler : function() {
					var params = [];
					var grid = this.gridPanel_contact;
					var store = grid.getStore();
					for (var i = 0; i < store.getCount(); i += 1) {
						var record = store.getAt(i);
						if (record.dirty) {
							params.push(record.data);
						}
					}

					if (params.length == 0) {
						Ext.ux.Toast.msg('信息', '没有对数据进行任何更改');
						return;
					}
					Ext.Ajax.request({
								method : 'post',
								url : __ctxPath
										+ '/customer/mulSaveCusContact.do?customerId=' + g_cusId_AF,
								params : {
									data : Ext.encode(params),
									customerId : g_cusId_AF
								},
								success : function(request) {
									Ext.ux.Toast.msg('操作信息', '成功保存');
									var store = Ext.getCmp("UlContactGrid_empl_lxfs_AF").getStore();
									store.reload();
								},
								failure : function(request) {
									Ext.ux.Toast.msg('操作信息', '设置出错，请联系管理员!');
								}
							});
				}
			}, '->', {
				iconCls : 'btn-add',
				text : '添加',
				xtype : 'button',
				scope : this,
				handler : function() {
					var store = this.gridPanel_contact.getStore();
					var recordType = store.recordType;
					store.add(new recordType({})); // 添加一行空store
				}
			}],
			autoHeight : false,
			height : 150,
			id : 'UlContactGrid_empl_lxfs_AF',
			url : __ctxPath + "/customer/listCusCusContact.do",
			baseParams : {
				customerId : g_cusId_AF
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
						editor : new MT.DicComboBox({
							allowBlank : false,
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : true,
							itemKey:'LXFS001'
						}),
						renderer : function(value) {
							if (value != undefined) {
								return LXFS001.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '地址/号码',
						dataIndex : 'mainContactNum',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'mainContactNum_AF_1'
								}),
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
					, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
									iconCls : 'callme',
									qtip : '拨打',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('contactTypeId');
										if (status == '1') {
											return true;
										}
										return false
									}
								}, {
									iconCls : 'callme',
									qtip : '拨打',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('contactTypeId');
										if (status == '10') {
											return true;
										}
										return false
									}
								},
									{
									iconCls : 'menu-folder-go',
									qtip : '短信',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('contactTypeId');
										if (status == '4') {
											return true;
										}
										return false
									}
								}, {
									iconCls : 'btn-mail_send',
									qtip : '发邮件',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('contactTypeId');
										if (status == '3') {
											return true;
										}
										return false
									}
								}, {
									iconCls : 'btn-print',
									qtip : '传真',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('contactTypeId');
										if (status == '2') {
											return true;
										}
										return false
									}
								}, {
									iconCls : 'menu-conference_myjoined',
									qtip : 'MSN',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var status = record.get('contactTypeId');
										if (status == '9') {
											return true;
										}
										return false
									}
								}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
		});

		var topbar_special = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						scope : this,
						handler : this.removeSelRs_contact
					}, '->', {
						iconCls : 'btn-add',
						text : '添加',
						xtype : 'button',
						scope : this,
						handler : function() {
							var customerId = g_cusId_AF;
							var win = new Ext.Window({
								title : '特殊事项',
								width : 350,
								id : 'specialWin_AF',
								layout:'fit',
								height : 200,
								buttonAlign : 'right',
								buttons : [{
									text : '确认',
									iconCls : 'save',
									handler : function() {
										var eveContent = Ext.util.Format
												.trim(Ext
														.getCmp('eveContentCreate_AF')
														.getValue());
										var store = Ext
												.getCmp('UlSpecialGrid_empl_AF')
												.getStore();
										if (eveContent == null
												|| eveContent == '') {
											Ext.ux.Toast.msg('操作信息', '请输入内容！');
											return;
										}
										Ext.Ajax.request({
											method : 'post',
											url : __ctxPath
													+ '/customer/addCusSpeEve.do',
											params : {
												eveContent : eveContent,
												customerId : customerId
											},
											success : function(request) {
												Ext.ux.Toast
														.msg('操作信息', '成功设置');
												store.reload();
											},
											failure : function(request) {
												Ext.ux.Toast.msg('操作信息',
														'设置出错，请联系管理员!');
											}
										});

										Ext.getCmp('specialWin_AF').close();
									}
								}, {
									text : '关闭',
									iconCls : 'close',
									handler : function() {
										Ext.getCmp('specialWin_AF').close();
									}

								}],
								items : [{
											xtype : 'textarea',
											id : 'eveContentCreate_AF',
											width : 290,
											height : 150,
											border : false
										}]
							});
							win.show();
						}
					}]
		});

		// 特殊事项
		this.gridPanel_special = new HT.EditorGridPanel({
			tbar : topbar_special,
			autoHeight : false,
			height : 150,
			clicksToEdit : 1,
			id : 'UlSpecialGrid_empl_AF',
			url : __ctxPath	+ "/customer/listEveCusSpeEve.do",
			baseParams : {
				'Q_customer.customerId_L_EQ' : g_cusId_AF
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
			this.searchPanel_contacthistory = new Ext.FormPanel({
				height : 35,
				region : 'north',
				frame : false,
				layoutConfig : {
					padding : '5',
					align : 'middle'
				},
				id : 'contactHistorySearchForm_AF',
				layout : 'hbox',
				defaults : {
					xtype : 'label',
					border : false,
					margins : {
						top : 2,
						right : 4,
						bottom : 2,
						left : 4
					}
				},
				items : [{
						text : '联络时间：'
					}, {
						xtype : 'datefield',
						format : 'Y-m-d',
						name : 'Q_staTime_D_GE',
						id : 'OB_YXtaskAc_TXT_Sear_Sta_Dat',
						editable : false
					}, {
						text : '-',width:20
					}, {
						xtype : 'datefield',
						format : 'Y-m-d',
						name : 'Q_endTime_D_LE',
						id : 'OB_YXtaskAc_TXT_Sear_End_Dat',
						editable : false
					}, {
						text : '负责人：'
					}, {
						name : 'Q_owner.employeeid_S_LK',
						xtype : 'textfield'
					}, {
						text : '方向：'
					}, {
						hiddenName : 'Q_dirId_SN_EQ',
						xtype : 'mtdiccombo',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CONFX'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('contactHistorySearchForm_AF');
							var gridPanel = Ext.getCmp('UlContactHisGrid_tmp_AF');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel :searchPanel,
									gridPanel : gridPanel
								});
							}
						}
					}, {
						xtype : 'button',
						text : __reset,
						scope : this,
						iconCls : 'btn-reset',
						handler : function() {
							var searchPanel = Ext.getCmp('contactHistorySearchForm_AF');
							document.getElementById('OB_YXtaskAc_TXT_Sear_Sta_Dat').value = '';
							document.getElementById('OB_YXtaskAc_TXT_Sear_End_Dat').value = '';
							searchPanel.getForm().reset();
						}
					}]
		});// end of the searchPanel
		
		// 联络历史
		this.gridPanel_contacthistory = new HT.EditorGridPanel({
			region : 'center',
			autoHeight : false,
			showSm : false,
			id : 'UlContactHisGrid_tmp_AF',
			lazyLoad : true,//延迟加载
			url : __ctxPath
					+ "/customer/listHisConHis.do",
			baseParams : {
				'Q_customer.customerId_L_EQ' : g_cusId_AF
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
						dataIndex : 'busTypId',
						renderer : function(value) {
							return CONTPJYLX.get(value);
						}
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
		
		//服务历史查询
		this.searchPanel_fuwuhistory = new Ext.FormPanel({
				height : 35,
				region : 'north',
				frame : false,
				layoutConfig : {
					padding : '5',
					align : 'middle'
				},
				id : 'fuwuHistorySearchForm_AF',
				layout : 'hbox',
				defaults : {
					xtype : 'label',
					border : false,
					margins : {
						top : 2,
						right : 4,
						bottom : 2,
						left : 4
					}
				},
				items : [{
						text : '任务事项'
					}, {
						hiddenName : 'Q_taskBusiType_L_EQ',
						xtype : 'mtdiccombo',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CONTPCLJG'
					}, {
						text : '执行人'
					}, {
						name : 'Q_fullname_S_LK',
						xtype : 'textfield'
					}, {
						text : '状态'
					}, {
						hiddenName : 'Q_status_SN_EQ',
						xtype : 'mtdiccombo',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CON_REQ_STATUS'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('fuwuHistorySearchForm_AF');
							var gridPanel = Ext.getCmp('YXtaskActionServHisID_AF');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel :searchPanel,
									gridPanel : gridPanel
								});
							}
						}
					}, {
						xtype : 'button',
						text : __reset,
						scope : this,
						iconCls : 'btn-reset',
						handler : function() {
							var searchPanel = Ext.getCmp('fuwuHistorySearchForm_AF');
							searchPanel.getForm().reset();
						}
					}]
		});// end of the searchPanel
		// 服务历史
		this.gridPanel_fuwuhistory = new HT.GridPanel({
			region : 'center',
			id : 'YXtaskActionServHisID_AF',
			lazyLoad : true,//延迟加载
			autoHeight : false,
			showSm : false,
			rowActions : true,
			tbar:['->',{
				iconCls:'btn-add',
				text : '添加任务',
				xtype : 'button',
				handler : function() {
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('addCalendarPlanFormWin');
					if (aForm != null) {
						tabs.remove('addCalendarPlanFormWin');
					}
					aForm = new addCalendarPlanForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				}
			}],
			url : __ctxPath
					+ "/task/listPlanCalendarPlan.do",
			baseParams : {
				'customerId' : g_cusId_AF,
				'serviceId' : g_taskId_AF,
				start : 0,
				limit : 25
			},
			fields : [{
						name : 'planId',
						type : 'int'
					}, 'taskTitle','status', 'startTime', 'endTime','effeciency',
					'urgent', 'content', 'fullname','busiType','completeTime',
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
						return CONFX.get(value);
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
						//对于外呼，用的即是业务类型字段
						return CONTPJYLX.get(value);
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
						return CONTPJYLX.get(value);
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
		// 订购历史
		this.gridPanel_lishigongdan = new HT.GridPanel({
			region : 'center',
			lazyLoad : true,//延迟加载
			autoHeight : false,
			showSm : false,
			url :'',
			baseParams : {
				'customerId' : g_cusId_AF,
				'serviceId' : g_taskId_AF,
				start : 0,
				limit : 25
			},
			fields : [{
						name : 'piId',
						type : 'int'
					}, 
            	'flowPk',
	            'runId',
	            'flowType',
	            'creater',
	            'piId',
	            'taskUser',
	            'taskName',
	            'dueDate','busType','busClasses','createTime','acceptanceTime','taskId','runStatus','needsTime','finishTime','taskUserName','applyName','applyTime','runType'],
			columns : [{
	          header: "userId",
	          dataIndex: 'userId',
	          width: 20,
	          hidden: true,
	          sortable: true
	      },{
	          header:'工单类别',
		      dataIndex:'busType',
		      width:100,
		      renderer : function(value) {
						return FLOW_BUSTYPE.get(value);
					}
	      },{
	          header:'工单类型',
		      dataIndex:'runType',
		      width:100,
		      renderer : function(value) {
			  if(value != null){
				 return value.itemValue
				}
			  }
	      },{
	          header:'申请人',
		      dataIndex:'applyName'
	      },{
	          header:'申请时间',
		      dataIndex:'applyTime',
		      width:120
	      },{
	          header:'受理人',
		      dataIndex:'creater',
		      width:100,
                        renderer : function(value,metadata,record) {
                            if (value == null) {
                                return '';
                            } else {
                                return value.fullname;
                            }
                        }
	      },{
	          header:'受理时间',
		      dataIndex:'createTime',
		      width:120
	      },{
	          header:'要求完成时间',
		      dataIndex:'needsTime',
		      width:120
	      },{
	          header:'完成时间',
		      dataIndex:'finishTime',
		      width:120
	      },{
	          header:'当前节点',
	          hidden:true,
		      dataIndex:'activityName',
		      width:80
	      },{
	          header:'当前处理人',
		      dataIndex:'assignee',
		      hidden:true,
		      width:80
	      },{
	          header:'状态',
		      dataIndex:'runStatus',
		      width:60,
		      renderer : function(value) {
						return PROCESSRUN_STATUS.get(value);
					}
	      },
	      	{
		      	hidden:true,
		      	dataIndex:'executionId'
	      },{
		      	hidden:true,
		      	dataIndex:'taskId'
	      },{
	      		hidden:'true',
	      		dataIndex:'isMultipleTask'
	      },{
	      		hidden:'true',
	      		dataIndex:'flowType'
	      },{
	      		hidden:'true',
	      		dataIndex:'flowPk'
	      },{
	      		hidden:'true',
	      		dataIndex:'runId'
	      },{
		      	hidden : 'true',
		      	dataIndex : 'customer'
	      },{
		      	hidden : 'true',
		      	dataIndex : 'customerTime'
	      }]
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
						xtype : 'tabpanel',
						activeTab : 0,// 激活第一个panel
						plain : true,
						height:300,
						id : 'operationTab_AF',
						region : 'south',
						bodyStyle : 'padding:5px;',
						items : [
							{
									title : '客户档案',
									border : false,
//									height : 450,
									layout : 'fit',
									items : [new CustomerDetailForm()]
								},
								
									{
									title : '联络历史',
									border : false,
									height : 450,
									layout : 'border',
									items : [this.searchPanel_contacthistory, this.gridPanel_contacthistory,{
											id : 'HiddenActionID2hisContact_AF',
											xtype : 'hidden',
											value : true
										}]
								}, {
									title : '服务历史',
									border : false,
									height : 450,
									layout : 'border',
									items : [this.searchPanel_fuwuhistory,this.gridPanel_fuwuhistory,{
											id : 'HiddenActionID2hisService_AF',
											xtype : 'hidden',
											value : true
										}]

								},new DDhistory(),{
									title : '历史工单',
									border : false,
									height : 450,
									layout : 'border',
									items : [this.gridPanel_lishigongdan]

								},{
									title : '订单明细',
									border : false,
									height : 450,
									layout : 'border',
									items : [new DDLuRuForm({
										flag:true
									})]

								}],
                                listeners : {
                                    'tabchange' : function(p) {
	                                    var selePanel = p.activeTab;
                                        if(selePanel.getId() == 'dd-history'){
                                        	if(g_isLoadGoodsHis_AF==false) {
                                        		DDhistory.load(g_cusNo_AF);
                                        		g_isLoadGoodsHis_AF = true;
                                            	return;
                                        	}
                                        }
                                        //get(0),获取当前容器包含的一个组件( items.get(key)方法的别名) 
                                       
    									var isLoadServiceHis = Ext.getCmp("HiddenActionID2hisService_AF").getValue();
										if(isLoadServiceHis == 'true') {
											Ext.getCmp("HiddenActionID2hisService_AF").setValue(false);
											Ext.getCmp("YXtaskActionServHisID_AF").getStore().reload();
										}
										
										var isLoadContactHis = Ext.getCmp("HiddenActionID2hisContact_AF").getValue();
										if(isLoadContactHis == 'true') {
											Ext.getCmp("HiddenActionID2hisContact_AF").setValue(false);
											Ext.getCmp("UlContactHisGrid_tmp_AF").getStore().reload();
										}
										
                                    }
                                }
					}, new Ext.FormPanel({
					region : 'center',
					border : false,
					layout:'form',
					bodyStyle:'overflow-y:auto',
					autoLoad:{
						
						url:__ctxPath+'/wenjuan.jsp'
					}
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
	},// end of the initcomponents
	createRs_contact : function() {
		var store = this.gridPanel_contact.getStore();
		var recordType = store.recordType;
		store.add(new recordType({})); // 添加一行空store
	},

	removeSelRs_contact : function() {
		$delGridRs({
					url : __ctxPath + '/customer/multiDelCusSpeEve.do',
					grid : Ext.getCmp('UlSpecialGrid_empl_AF'),
					idName : 'eveId'
				});
		Ext.getCmp('UlSpecialGrid_empl_AF').getStore().reload();
	},
	// 外呼拨打
	toCallOut : function(record) {
		//判断该客户是否在黑名单中
		if(g_isExistBW_AF) {
			Ext.MessageBox.confirm('提示信息', '该客户存在黑名单中，是否继续？', function(btn){
				if('yes' == btn) {
					//外呼拨打规则校验——>外呼拨打操作任务
					this.diaRexCheck(record);
				} 
			});
		} else {
			//外呼拨打规则校验——>外呼拨打操作任务
			this.diaRexCheck(record);
		}
	},
	
	//外呼拨打规则验证
	diaRexCheck : function(record) {
		var arg_tmpConNum = record.data.mainContactNum;
		var arg_isTimeBetweenBreak = g_isTimeBetw_AF;
		var arg_maxDiaNum = g_maxDiaNum_AF;
		var arg_maxDiaSpace = g_maxDiaSpace_AF;
		var arg_cusId = g_cusId_AF;
		var arg_execType = record.data.contactTypeId;
		var arg_cusName = Ext.getCmp("OB_YxtaskAction_nameCn_01").getValue();
		var arg_saletaskId = g_taskId_AF;
		var arg_busiTypeId = g_busiTypeId_AF;
		var arg_diaCou = g_diaCou_AF;
		var arg_lastDiaDat = g_lastDiaDat_AF;
		
		var reg = new RegExp("^[0-9]*$");
		if(!reg.test(arg_tmpConNum)) {
			Ext.Msg.alert("提示信息","号码不符合格式规范，请确认！");
			return;
		}
		
		if(!arg_isTimeBetweenBreak) {
			Ext.Msg.alert("提示信息","当前时间不在规定的拨打时间范围内！");
			return;
		}
		
//		var statusId = record.data.statusId;
//		if(1==statusId) {
//		} else if(1==statusId) {
//					
//		}else {
//			Ext.Msg.alert("提示信息！","该联系方式无效，不能执行！");
//			return ;
//		}

		if(arg_maxDiaNum!=undefined && null!=arg_maxDiaNum) {
			if(arg_diaCou>arg_maxDiaNum) {
				Ext.Msg.alert("提示信息！","该任务的拨打次数已超过最大拨打次数限制！");
				return;
			}
		}
	
		if(arg_maxDiaSpace!=undefined && null!=arg_maxDiaSpace && arg_lastDiaDat!=undefined && arg_lastDiaDat!=null) {
			var curDate = (new Date()).getTime();
			var spaceDate = Date.parseDate(arg_lastDiaDat, "Y-m-d H:i:s").add(Date.MINUTE, arg_maxDiaSpace).getTime();
			var subDate = spaceDate-curDate;
			if(subDate<Number(0)) {
				Ext.MessageBox.confirm('提示', '您的拨打处于最大拨打间隔内，需要继续吗？', function(btn){
					if('no' == btn) {
						return;
					}else{
						this.diaOptAction(arg_cusId,arg_execType,arg_saletaskId,arg_busiTypeId,arg_tmpConNum,arg_cusName,arg_diaCou,arg_maxDiaNum);
					}
				});
			}
		} else {
			this.diaOptAction(arg_cusId,arg_execType,arg_saletaskId,arg_busiTypeId,arg_tmpConNum,arg_cusName,arg_diaCou,arg_maxDiaNum);
		}
	},
	
	//外呼拨打操作任务
	diaOptAction : function(arg_cusId,arg_execType,arg_saletaskId,arg_busiTypeId,arg_tmpConNum,arg_cusName,arg_diaCou,arg_maxDiaNum) {
		// 生成任务和联络历史
		DDHuiFangDetailForm.createHis(arg_cusId,arg_execType,arg_saletaskId,arg_busiTypeId,arg_tmpConNum,arg_cusName);
		//调接口外拨
		top.dial(arg_tmpConNum);
		// 更新营销任务
		DDHuiFangDetailForm.updateSaletask(arg_diaCou,arg_maxDiaNum,arg_saletaskId);
	},
	// 发短信
	toSendNote : function(record) {
		// alert();
	},
	toSendEmail : function(record) {
		// alert(record.data.mainContactNum);
//		DDHuiFangDetailForm.sendMail(record.data.mainContactNum);
		// alert(record.data.mainContactNum);
	},
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'callme' : {
				this.toCallOut.call(this, record);
				break;
			}
			case 'menu-folder-go' : {
				this.toSendNote.call(this, record);
				break;
			}
			case 'btn-mail_send' : {
				this.toSendEmail.call(this, record);
				break;
			}
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

//加载客户面板基本信息
DDHuiFangDetailForm.load_BaseCusInfo = function(g_cusId_AF) {
	Ext.Ajax.request({
		url : __ctxPath + '/outb/getBaseCusInfoObConCalllist.do?cusId=' + g_cusId_AF,
		method : 'post',
		success : function(response) {
			var thisObj = Ext.util.JSON.decode(response.responseText);
			if (thisObj != null) {
				Ext.getCmp("OB_YxtaskAction_cusNo_01").setValue(thisObj.customerNo);
				Ext.getCmp("OB_YxtaskAction_credTypId_01").setValue(thisObj.credTypId=='null'?'':GGZJLX.get(thisObj.credTypId));
				Ext.getCmp("OB_YxtaskAction_gender_01").setValue(thisObj.gender=='null'?'':XB001.get(thisObj.gender));
				Ext.getCmp("OB_YxtaskAction_birthday_01").setValue(thisObj.birthday=='null'?'':thisObj.birthday);
//				Ext.getCmp("OB_YxtaskAction_isMail_01").setValue(thisObj.isMail=='null'?'':thisObj.isMail);
//				Ext.getCmp("OB_YxtaskAction_happyCall_01").setValue(thisObj.happyCall=='null'?'':thisObj.happyCall);
//				Ext.getCmp("OB_YxtaskAction_isDm_01").setValue(thisObj.isDm=='null'?'':thisObj.isDm);
				Ext.getCmp("OB_YxtaskAction_nameCn_01").setValue(thisObj.nameCn=='null'?'':thisObj.nameCn);
				Ext.getCmp("OB_YxtaskAction_credNum_01").setValue(thisObj.credNum=='null'?'':thisObj.credNum);
				Ext.getCmp("OB_YxtaskAction_cusGraId_01").setValue(thisObj.cusGraId=='null'?'':CONKHJB.get(thisObj.cusGraId));

                //添加客户性别与级别隐藏域，并赋值  by wangzj
				Ext.getCmp('OB_YxtaskAction_gender_Hidden_01').setValue(thisObj.gender=='null'?'':thisObj.gender);
				Ext.getCmp('OB_YxtaskAction_cusGraId_hidden_01').setValue(thisObj.cusGraId=='null'?'':thisObj.cusGraId);
			}
		},
		failure : function() {
		}
	});
}

//判断是否在活动规定的拨打时间段内
DDHuiFangDetailForm.isExistBetweenDiaTime = function(g_comId_AF) {
	if('false'==g_isDiaTime_AF) {
		return;
	}
	g_isTimeBetw_AF = true;
	if(g_comId_AF != null && g_comId_AF != 'undefined' && g_comId_AF != '') {
		Ext.Ajax.request({
			url : __ctxPath + '/outb/listDiaTimeBetweenObComSalerul.do?comId=' + g_comId_AF,
			method : 'post',
			success : function(response){
				var result = Ext.util.JSON.decode(response.responseText);
				var iCount = result.length;
				if(iCount<=0) {
					return;
				}
				for(var i=0;i<iCount;i++) {
					var startDate = Date.parseDate(result[i].start, "g:i A").format('H:i');
					var endDate = Date.parseDate(result[i].end, "g:i A").format('H:i');
					var currDate = new Date().format('H:i');
					
					var isExistBetween = Date.parseDate(currDate,'H:i').between(Date.parseDate(startDate, "H:i"),Date.parseDate(endDate, "H:i"));
					if(isExistBetween==false) {
						g_isTimeBetw_AF = false;
						break;
					}
				}
			},
			failure : function(response, options){
				Ext.ux.Toast.msg('操作信息','营销活动规则读取延时!');
			}
		});
	}
}

//判断是否存在黑名单中
DDHuiFangDetailForm.isExistBW = function(g_cusId_AF,contactNum) {
	Ext.Ajax.request({
			url : __ctxPath + '/customer/isExistBWConBwList.do?customerId=' + g_cusId_AF+"&mainContactNum="+contactNum,
			method : 'post',
			success : function(response){
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success=='true') {
					g_isExistBW_AF = true;
				}
			},
			failure : function(response, options){
				g_isExistBW_AF = false;
				Ext.ux.Toast.msg('操作信息','营销活动规则读取延时!');
			}
		});
}

//更新营销任务：拨打次数、最后拨打时间
DDHuiFangDetailForm.updateSaletask = function(arg_diaCou,arg_maxDiaNum,arg_saletaskId) {
//	alert("更新营销任务函数：updateSaletask()");
//	alert("参数为：arg_diaCou,arg_maxDiaNum,arg_saletaskId"+arg_diaCou+","+arg_maxDiaNum+","+arg_saletaskId);
	
	Ext.Ajax.request({
		url : __ctxPath + '/outb/updateSaleTaskObSaletask.do',
		method : 'post',
		params : {
			diaCou : arg_diaCou,
			maxDiaNum : arg_maxDiaNum,
			taskId : arg_saletaskId
		},
		success : function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			g_diaCou_AF = result.diaCou;//拨打次数
			g_lastDiaDat_AF = result.lastDiaDat;//最后拨打时间——限制拨打间隔
		},
		failure : function(response, options){
		}
	});
}

//生成任务和联络历史
DDHuiFangDetailForm.createHis = function(arg_cusId,arg_execType,arg_saletaskId,arg_busiTypeId,arg_tmpConNum,arg_cusName) {
//	alert("生成联络历史函数：createHis()");
//	alert("参数为：arg_cusId,arg_execType,arg_saletaskId,arg_busiTypeId,arg_tmpConNum,arg_cusName"+arg_cusId+","+arg_execType+","+arg_saletaskId+","+arg_busiTypeId+","+arg_tmpConNum+","+arg_cusName);

	Ext.Ajax.request({
		url : __ctxPath + '/outb/createOutbPlanObSaletask.do',
		method : 'post',
		params : {
			customerId : arg_cusId,
			execType : arg_execType,
			saletaskId : arg_saletaskId,
			busiTypeId : arg_busiTypeId,
			numAddress : arg_tmpConNum,
			cusName : arg_cusName
		},
		success : function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			g_conhisId_AF = result.conHisId;
			Ext.getCmp("UlContactHisGrid_tmp_AF").getStore().reload();
		},
		failure : function(response, options){
			Ext.ux.Toast.msg('操作信息','联络历史生成失败!');
		}
	});
}