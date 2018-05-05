/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCallbatchForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
 var callbatchId=null;
 var gcallbatchId = null;
 var gcallbatchNam = null;
 var gcallbatchStaId = null;
ObCallbatchForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents(_cfg);
		ObCallbatchForm.superclass.constructor.call(this, {
					id : 'ObCallbatchFormWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '导入批次详细信息'
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function(_cfg) {
		gcallbatchId = _cfg.callbatchId;
		gcallbatchStaId = _cfg.callbatchStaId;
		
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			region : 'north',
			height : 200,
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			id : 'ObCallbatchForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'obCallbatch.callbatchId',
						xtype : 'hidden',
						value : this.callbatchId == null
								? ''
								: this.callbatchId
					}, {
						fieldLabel : '批次名称',
						name : 'obCallbatch.callbatchNam',
//						allowBlank : false,
						readOnly : true,
						anchor : '96%',
						xtype : 'textfield',
						maxLength : 512
					}, {
						layout : 'column',
						border : false,
						xtype : 'panel',
						items : [{
							xtype : 'panel',
							layout : 'form',
							columnWidth : .33,
							border : false,
							items : [{
								id : 'obCallbatch.calllistId',
								xtype : 'hidden',
								value : this.calllistId == null
										? ''
										: this.calllistId
							}, {
								fieldLabel : '营销项目',
								name : 'obCallbatch.obCalllist.obProject.projNam',
								anchor : '100%',
								readOnly : true,
								xtype : 'textfield',
								maxLength : 128
							}, {
								fieldLabel : '所属地区',
								name : 'obCallbatch.callbatchRegion',
								anchor : '100%',
								readOnly : true,
								xtype : 'textfield',
								maxLength : 128
							}, {
								fieldLabel : '开始号码段',
								id : 'obCallbatch.numberSta_Id',
								name : 'obCallbatch.numberSta',
								anchor : '100%',
								readOnly : true,
								xtype : 'textfield',
								maxLength : 128
							}, {
								fieldLabel : '开始执行时间',
								name : 'obCallbatch.staDat',
								xtype : 'textfield',
								readOnly : true,
								anchor : '100%',
								renderer : function(value) {
									return value.substring(0,10);
								}
							}, {
								fieldLabel : '总数',
								name : 'obCallbatch.totalCount',
								anchor : '100%',
								readOnly : true,
								xtype : 'numberfield'
							}, {
								fieldLabel : '用户',
								name : 'obCallbatch.useId.fullname',
								anchor : '100%',
								readOnly : true,
								xtype : 'textfield'
							}]

						}, {
							layout : 'form',
							xtype : 'panel',
							border : false,
							columnWidth : .33,
							items : [{
										fieldLabel : '营销活动',
										name : 'obCallbatch.comNam',
										anchor : '100%',
										readOnly : true,
										xtype : 'textfield',
										maxLength : 128
									},{
										xtype : 'hidden',
										name : 'obCallbatch.callbatchTypId',
										id : 'obCallbatch.callbatchTypId_hid'
									}, {
										fieldLabel : '批次类型',
										id : 'obCallbatch.callbatchTypId_form',
										xtype : 'mtdiccombo',
//										allowBlank : false,
										readOnly : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONOB_CALLBATCH_PCLX',
										anchor : '100%',
										listeners : {
											'select' : function(combo, record, index) {
												var fm = Ext.getCmp('ObCallbatchForm');
												fm.getCmpByName('obCallbatch.callbatchTypId').setValue(combo.value);
											}
										}
									}, {
										fieldLabel : '结束号码段',
										name : 'obCallbatch.numberEnd',
										id : 'obCallbatch.numberEnd_Id',
										anchor : '100%',
										readOnly : true,
										xtype : 'textfield',
										maxLength : 128
									}, {
										fieldLabel : '执行完成时间',
										name : 'obCallbatch.endDat',
										xtype : 'textfield',
										readOnly : true,
										anchor : '100%',
										renderer : function(value) {
											return value.substring(0,10);
										}
									}, {
										fieldLabel : '有效数量',
										name : 'obCallbatch.avlidCount',
//										allowBlank : false,
										readOnly : true,
										anchor : '100%',
										xtype : 'numberfield'
									},{
										xtype : 'hidden',
										name : 'obCallbatch.callbatchStaId',
										id : 'obCallbatch.callbatchStaId_hid'
									}, {
										fieldLabel : '状态',
										id : 'obCallbatch.callbatchStaId_form',
										xtype : 'mtdiccombo',
//										allowBlank : false,
										readOnly : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONOB_CALLBATCH_ZT',
										anchor : '100%',
										listeners : {
											'select' : function(combo, record, index) {
												var fm = Ext.getCmp('ObCallbatchForm');
												fm.getCmpByName('obCallbatch.callbatchStaId').setValue(combo.value);
											}
										}
									}]

						}, {
							layout : 'form',
							xtype : 'panel',
							border : false,
							columnWidth : .34,
							items : [{
										fieldLabel : '呼叫名单',
										name : 'obCallbatch.obCalllist.calllistNam',
										anchor : '100%',
										readOnly : true,
										xtype : 'textfield',
										maxLength : 128
									},{
										xtype : 'hidden',
										name : 'obCallbatch.callbatchSrcId',
										id : 'obCallbatch.callbatchSrcId_hid'
									}, {
										fieldLabel : '批次来源',
										id : 'obCallbatch.callbatchSrcId_form',
										xtype : 'mtdiccombo',
//										allowBlank : false,
										readOnly : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONOB_CALLBATCH_PCLY',
										anchor : '100%',
										listeners : {
											'select' : function(combo, record, index) {
												var fm = Ext.getCmp('ObCallbatchForm');
												fm.getCmpByName('obCallbatch.callbatchSrcId').setValue(combo.value);
											}
										}
									}, {
										border:false,
										height:25
										
									},{
										fieldLabel : '导入时长(秒)',
										name : 'obCallbatch.impDur',
										anchor : '100%',
										readOnly : true,
										xtype : 'numberfield'
									}, {
										fieldLabel : '可分配数量',
										name : 'obCallbatch.holdCount',
//										allowBlank : false,
										readOnly : true,
										anchor : '100%',
										xtype : 'numberfield'
									}]

						}]
					}]
		});
		this.gridPanel1 = new HT.GridPanel({
					scrollHeight : true,
					region : 'center',
					printable : false,
					lazyLoad : true,
					exportable : false,
					url : __ctxPath
							+ "/outb/listConCalllistObCallbatch.do?callbatchId="
							+ _cfg.callbatchId,
					tbar : ['->', {
								text : '名单清洗',
								iconCls : 'btn-borrow',
								id : 'OB_CallbatchForm_btn_brrow',
								hidden : true,
								handler:function(){
									new ObCallListClearnWindow({
										isClearnView : 'false',
										inChanel : 'ObCallbatch',
										callbatchId : gcallbatchId,
										callbatchNam : gcallbatchNam
									}).show();// 调用清洗window
//									new ObCallbatchWindow().show();//调用清洗window 
								}
							}
//								{
//								text : '去重',
//								iconCls : 'menu-book-type'
//							}
							],
					fields : [{
								name : ' cusId',
								type : 'Long'
							}, 'nameCn','cusCode', 'gender','age', 'credTypId', 'birthday',
							'credNum', 'credDurDat', 'fullname'],
					columns : [{
								header : '姓名',
								isExp : false,
								dataIndex : 'nameCn'
							}, {
						        header : '客户代码',
						        isExp : false,
						        dataIndex : 'cusCode'
					        },{
								header : '性别',
								isExp : false,
								dataIndex : 'gender',
								renderer : function(value) {
									return XB001.get(value);
								}
							},{
						      header : '年龄',
						      isExp : false,
						      dataIndex : 'age'
					        }, {
								header : '证件类型',
								isExp : false,
								dataIndex : 'credTypId',
								renderer : function(value) {
									return GGZJLX
											.get(value);
								}
							}, {
								header : '生日',
								isExp : false,
								dataIndex : 'birthday'
							}, {
								header : '证件号码',
								isExp : false,
								dataIndex : 'credNum'
							},{
								header : '归属人',
								isExp : false,
								dataIndex : 'fullname'
							} 
							]
				});

		this.gridPanel2 = new HT.GridPanel({
					scrollHeight : true,
					region : 'center',
					id : 'ObCallbatchFormGrid2',
					tbar : ['->', {
								text : '恢复',
								iconCls : 'btn-mail_move',
								id : 'OB_CallbatchForm_Btn_Recover',
								handler : function() {
									$gridRs({
										url : __ctxPath + '/outb/recoverObCallbatchImpWash.do?callbatchId='+callbatchId,
										grid : Ext.getCmp("ObCallbatchFormGrid2"),
										idName : 'washCusId',
										msgNull : '请选择要恢复的记录！',
										msgTip : '您确认要恢复所选记录吗？',
										msgSuccess : '成功恢复所选记录！',
										msgFailure : '操作出错，请联系管理员！'
									});
								}
							}],
					lazyLoad : true,
					url : __ctxPath
							+ "/outb/listCusWashObCallbatch.do?callbatchID="
							+ _cfg.callbatchId,
					fields : ['washCusId', 'nameCn', 'gender', 'credTypId', 'birthday',
							'credNum', 'credDurDat', 'ext1', 'ext2', 'ext3',
							'ext4', 'ext5', 'ext6'],
					columns : [
							{
								header : 'washCusId',
								dataIndex : 'washCusId',
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
									return GGZJLX
											.get(value);
								}
							}, {
								header : '生日',
								isExp : false,
								dataIndex : 'birthday'
							}, {
								header : '证件号码',
								isExp : false,
								dataIndex : 'credNum'
							},{
								header : '归属人',
								isExp : false,
								dataIndex : 'fullname'
							} ]
				});
		this.gridPanel3 = new HT.GridPanel({
					scrollHeight : true,
					id:'assHis',
					lazyLoad : true,
					rowActions : true,
					url : __ctxPath
							+ "/outb/listAssHisObCallbatchAss.do?callbatchID="
							+ _cfg.callbatchId+"&assOrRetr="+0,
					fields : [{
								name : 'callbatchAssId',
								type : 'Long'
							}, 'fromUseName', 'assStepId', 'assignCount','callbatchAssId',
							'staDat'],
					columns : [{
								header : '分配人',
								isExp : false,
								dataIndex : 'fromUseName'
							}, {
								header : '分配时间',
								isExp : false,
								dataIndex : 'staDat'
							}, {
								header : '分配阶段',
								isExp : false,
								dataIndex : 'assStepId',
								renderer : function(value) {
									return CONOB_CALLBATCH_ASS_JD.get(value);
								}
							}, {
								header : '分配数量',
								isExp : false,
								dataIndex : 'assignCount'
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 50,
										actions : [{
													iconCls : 'btn-form-design',
													qtip : '查看',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var holdCount = record.data.canReceiveCount;
														if (holdCount == 0) {
															return false;
														} else {
															return true;
														}
													}
												}],
										listeners : {
											scope : this,
											'action' : function(grid, record, action, row, col) {
												ObCallbatchForm.showList(record);
											}
										}
									})]
				});
		this.gridPanel4 = new HT.GridPanel({
					scrollHeight : true,
					id:'retriveHis',
					rowActions : true,
					lazyLoad : true,
					url : __ctxPath
							+ "/outb/listAssHisObCallbatchAss.do?callbatchID="
							+ _cfg.callbatchId+"&assOrRetr="+1,
					fields : [{
								name : ' callbatchAssId',
								type : 'Long'
							}, 'toUserName', 'retriveDat', 'retriveCount','canReceiveCount','callbatchAssId',
							'holdCount'],
					columns : [{
								header : '回收人',
								isExp : false,
								dataIndex : 'toUserName'
							}, {
								header : '回收时间',
								isExp : false,
								dataIndex : 'retriveDat'
							}, {
								header : '回收数量',
								isExp : false,
								dataIndex : 'retriveCount'
							}, {
								header : '剩余数量',
								isExp : false,
								dataIndex : 'canReceiveCount'
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 50,
										actions : [{
													iconCls : 'btn-form-design',
													qtip : '查看',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var holdCount = record.data.canReceiveCount;
														if (holdCount == 0) {
															return false;
														} else {
															return true;
														}
													}
												}],
										listeners : {
											scope : this,
											'action' : function(grid, record, action, row, col) {
												ObCallbatchForm.showList(record);
											}
										}
									})]
				});

		this.searchPanel1 = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					height : 35,
					items : [{
								xtype : 'panel',
								width : 50,
								style : 'text-align:right',
								html : '姓名：'
							}, {

								name : 'Q_nameCn_S_LK',
								xtype : 'textfield'
							}, {
								xtype : 'panel',
								width : 50,
								style : 'text-align:right',
								html : '性别：'
							}, {
								hiddenName : 'Q_gender_S_EQ',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'XB001'
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : function(){
									$search({
										searchPanel : this.searchPanel1,
										gridPanel : this.gridPanel1
									});
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
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
		this.searchPanel2 = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					height : 35,
					items : [{
								xtype : 'panel',
								width : 50,
								style : 'text-align:right',
								html : '姓名：'
							}, {

								name : 'Q_nameCn_S_LK',
								xtype : 'textfield'
							}, {
								xtype : 'panel',
								width : 50,
								style : 'text-align:right',
								html : '性别：'
							}, {

								hiddenName : 'Q_gender_S_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'XB001'
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : function(){
									$search({
										searchPanel : this.searchPanel2,
										gridPanel : this.gridPanel2
									});
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
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

		this.tabpanel = new Ext.TabPanel({
					activeTab : 0,// 激活第一个panel
					region : 'center',
					// autoWidth : true,
					// width :'auto',
					border : false,
					plain : true,
					defaultType : 'panel',
					items : [{
								title : '批次名单',
								border : false,
								layout : 'border',
								items : [this.gridPanel1, {
											xtype : 'hidden',
											value : true
										}, this.searchPanel1]
							}, {
								title : '清洗名单',
								border : false,
								layout : 'border',
								items : [this.gridPanel2, {
											xtype : 'hidden',
											value : true
										}, this.searchPanel2]
							}, {
								title : '分配历史',
								layout : 'fit',
								border : false,
								items : [this.gridPanel3,

								{
											xtype : 'hidden',
											value : true
										}]
							}, {
								title : '回收历史',
								layout : 'fit',
								border : false,
								items : [this.gridPanel4, {
											xtype : 'hidden',
											value : true
										}]
							}],
					listeners : {
						'tabchange' : function(p) {
							if (p.activeTab.get(1).getValue() == 'true') {
								p.activeTab.get(0).getStore().load();
								p.activeTab.get(1).setValue(false);
							}

						}
					}
				});
		this.panel = new Ext.Panel({
					layout : 'border',
					border : false,
					items : [this.tabpanel, this.formPanel]
				})
		// 加载表单对应的数据
		if (this.callbatchId != null && this.callbatchId != 'undefined') {
			//对于已经启用的批次，不能再进行恢复操作
			if(gcallbatchStaId!='0') {
				Ext.getCmp("OB_CallbatchForm_Btn_Recover").setVisible(false);
			}
			
			//控制清洗按钮显示
			var status = _cfg.callbatchStaId;
			if(status=='0') {
				Ext.getCmp("OB_CallbatchForm_btn_brrow").show();
			}

			callbatchId=this.callbatchId;
			this.formPanel.loadData({
						url : __ctxPath
								+ '/outb/getObCallbatch.do?callbatchId='
								+ this.callbatchId,
						root : 'data',
						preName : 'obCallbatch',
						success : function(response, options) {
							var thisObj = Ext.util.JSON.decode(response.responseText).data;

							gcallbatchId = thisObj.callbatchId;
							gcallbatchNam = thisObj.callbatchNam;
							Ext.getCmp('obCallbatch.callbatchStaId_form').setValue(thisObj.callbatchStaId);
							Ext.getCmp('obCallbatch.callbatchTypId_form').setValue(thisObj.callbatchTypId);
							Ext.getCmp('obCallbatch.callbatchSrcId_form').setValue(thisObj.callbatchSrcId);
							if(thisObj.callbatchTypId != '0') {			//0——表示号码段
								Ext.getCmp("obCallbatch.numberEnd_Id").destroy();//如果不是号码段，则将“开始号码段”和“结束号码段”控件销毁
								Ext.getCmp("obCallbatch.numberSta_Id").destroy();
							} else {
								Ext.getCmp("obCallbatch.numberEnd_Id").setVisible(true);
								Ext.getCmp("obCallbatch.numberSta_Id").setVisible(true);
							}
						},
						failure : function(response, options) {
							Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
						}
					});
		}

	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');// 获得tab
		tabs.remove('ObCallbatchFormWin');// 移除创建的窗口
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/outb/saveObCallbatch.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObCallbatchGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});
ObCallbatchForm.showList = function(record) {
	var searchPanel = new Ext.FormPanel({
				layout : 'hbox',
				region : 'north',
				id : 'ConHushouSearchPanel_pici',
				height : 35,
				items : [{
							border : false,
							width : 70,
							style : 'text-align:right',
							html : '姓名：'
						}, {
							id:'nameCnSearch_pici',
							xtype : 'textfield'
						}, {
							border : false,
							width : 70,
							style : 'text-align:right',
							html : '联络结果：'
						}, {
							//hiddenName : 'Q_dealResId_SN_EQ',
							id:'dealResSearch_pici',
							xtype : 'mtdiccombo',
							editable : true,
							lazyInit : false,
							forceSelection : false,
							itemKey : 'CONCLZT'
						}, {
							xtype : 'button',
							text : __search,
							iconCls : 'search',
							scope : this,
							handler : function() {
								var psnle = Ext.getCmp('fenpeidetailCalllist_pici');
								var store=Ext.getCmp('fenpeidetailCalllist_pici').getStore();
								var nameCn=Ext.getCmp('nameCnSearch_pici').getValue();
								var dealResId=Ext.getCmp('dealResSearch_pici').getValue();
								if(nameCn==null||nameCn==''||nameCn=='undefined') callbatchNam=null;
                                store.proxy.conn.url = __ctxPath + '/outb/listCusByAdminObCallbatchAss.do?nameCn='+encodeURIComponent(nameCn)+'&dealResId='+dealResId+'&callbatchAssIds='+record.data.callbatchAssId+"&index=0";								
						    	store.removeAll() ;
						    	store.load({
						    	callback : function() {
						    	    psnle.getView().refresh();
						    	}});
							}
						}, {
							xtype : 'button',
							text : __reset,
							scope : this,
							iconCls : 'btn-reset',
							handler : function() {
                                Ext.getCmp('ConHushouSearchPanel_pici') .getForm().reset();
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
	var gridPanel = new HT.GridPanel({
		        id:'fenpeidetailCalllist_pici',
				region : 'center',
				printable : false,
				exportable : false,
				tbar : ['->', {
							iconCls : 'btn-confApply-no',
							text : '回收',
							style : 'margin:0 3px 0 3px',
							handler : function() {
							    var rows = Ext.getCmp('fenpeidetailCalllist_pici').getSelectionModel().getSelections();
								if (rows != null && rows.length > 0) {
								    var idArray = '';
								     for (var i = 0; i < rows.length; i++) {
									     var cusId=rows[i].data.customerId;
								  	  	 if(idArray=='') {
								  	     	 idArray=cusId;
								  	     } else {
							    	  		 idArray+=','+cusId;
								  	 	 }			    
								     }	
								} else {
								    	Ext.Msg.alert('请至少选择一个客户!');
							        	return;	
								}	
								Ext.Ajax.request({
									url :  __ctxPath + '/outb/doRetriveCusObCallbatchAss.do',
									method : 'post',
								    params:{
										ids:idArray,
										retriveIndex:0,
										//callbatchAssIds:callbatchAssIds,
										callbatchId:callbatchId
									},
									success : function(response) {
										var result = Ext.util.JSON.decode(response.responseText);
										if(result.success) {
											Ext.getCmp('fenpeidetailCalllist_pici').getStore().reload();
										    Ext.getCmp('retriveHis').getStore().reload();
										    Ext.getCmp('assHis').getStore().reload();											
										    Ext.getCmp('ObCallbatchAssGridM').getStore().reload();
										    Ext.getCmp('ObCallbatchAssGridJL').getStore().reload();
										    Ext.getCmp('ObCallbatchAssGridZZ').getStore().reload();
										    Ext.Msg.alert("回收成功");
										    
										}
									},
									failure : function() {
										Ext.Msg.alert("回收失败!");
									}
								});									
							}
						}],
				url : __ctxPath + "/outb/listCusByAdminObCallbatchAss.do?callbatchAssIds="
					+ record.data.callbatchAssId+"&index=0",
				fields : [{
							name : ' cusId',
							type : 'Long'
						}, 'cusCode', 'customerId', 'nameCn', 'gender','obCallbatch.callbatchNam','conStaId','busiStaId'],
				columns : [{
							header : 'cusId',
							dataIndex : 'cusId',
							hidden : true
						}, {
							header : '客户代码',
							isExp : false,
							dataIndex : 'cusCode'
						}, {
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
						}, 
//							{
//							header : '办公室电话',
//							isExp : false,
//							dataIndex : 'enterTime'
//
//						}, {
//							header : '手机',
//							isExp : false,
//							dataIndex : 'assignTime'
//						}, 
							{
							header : '任务来源',
							isExp : false,
							dataIndex : 'obCallbatch.callbatchNam'
						}, {
							header : '呼叫结果',
							isExp : false,
							dataIndex : 'conStaId',
							renderer : function(value) {
								return CONOB_SALETASK_BDJG.value;
							}
						}, {
							header : '联络状态',
							isExp : false,
							dataIndex : 'busiStaId',
							renderer : function(value) {
								return CONOB_SALETASK_YXZT.value;
							}
						}]
			});
	var win = new Ext.Window({
				title : '名单明细',
				height : 400,
				width : 1000,
				layout : 'border',
				items : [gridPanel, searchPanel]
			})
	win.show();
}
