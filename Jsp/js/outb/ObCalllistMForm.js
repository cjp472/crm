/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCalllistMForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
var callbatchId=null;
ObCalllistMForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents(_cfg);
		ObCalllistMForm.superclass.constructor.call(this, {
					id : 'ObCalllistMFormWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '名单分配详细信息'
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function(_cfg) {

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			region : 'north',
			height : 125,
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			// id : 'ObCalllistMForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						layout : 'column',
						border : false,
						xtype : 'panel',
						items : [{
									xtype : 'panel',
									layout : 'form',
									columnWidth : .33,
									border : false,
									items : [{
												fieldLabel : '营销项目',
												id:'callbatchAss.projNam',
												name : 'callbatchAss.projNam',
												readOnly:true,
												anchor : '100%',
												xtype : 'textfield',
												maxLength : 128
											}, {
												fieldLabel : '批次',
												readOnly:true,
												id:'callbatchAss.callbatchNam',
												name : 'callbatchAss.callbatchNam',
												anchor : '100%',
												xtype : 'textfield',
												maxLength : 128
											}, {
												fieldLabel : '执行时间',
												readOnly:true,
												name : 'callbatchAss.staDat',
												xtype : 'textfield',
												anchor : '100%'
											}, {
												fieldLabel : '分配数量',
												readOnly:true,
												id:'assignCountsform',
												anchor : '100%',
												xtype : 'textfield'
											}]

								}, {
									layout : 'form',
									xtype : 'panel',
									border : false,
									columnWidth : .33,
									items : [{
												fieldLabel : '营销活动',
												readOnly:true,
												id : 'callbatchAss.comNam',
												name : 'callbatchAss.comNam',
												anchor : '100%',
												xtype : 'textfield',
												maxLength : 128
											}, {
												fieldLabel : '分配人',
												readOnly:true,
												name : 'callbatchAss.fromUseName',
												anchor : '100%',
												xtype : 'textfield',
												maxLength : 128
											}, {
												fieldLabel : '完成时间',
												readOnly:true,
												name : 'callbatchAss.endDat',
												xtype : 'textfield',
												anchor : '100%'
											}, {
												fieldLabel : '可回收数量',
												readOnly:true,
												id:'holdCountsform',
												anchor : '100%',
												xtype : 'textfield'
											}]

								}, {
									layout : 'form',
									xtype : 'panel',
									border : false,
									columnWidth : .34,
									items : [{
												fieldLabel : '呼叫名单',
												readOnly:true,
												id : 'callbatchAss.calllistNam',
												name : 'callbatchAss.calllistNam',
												anchor : '100%',
												xtype : 'textfield',
												maxLength : 128
											}, {
												fieldLabel : '分配阶段',
												readOnly:true,
												id:'assStepIdform',
												name : 'callbatchAss.assStepId',
												xtype : 'textfield',
												anchor : '100%',
												isExp : false
																						
											}, {
												border : false,
												height : 25
											}, {
												fieldLabel : '已回收数量',
												readOnly:true,
												id:'retriveCountsform',
												anchor : '100%',
												xtype : 'textfield'
											}]

								}]
					}]
		});
		this.gridPanel1 = new HT.GridPanel({
			scrollHeight : true,
			id : 'tab0MFormtable',
			region : 'center',
			lazyLoad : false,
			rowActions:true,
			exportable : false,
			printable : false,
			url : __ctxPath + "/outb/listAssignsByAdminObCallbatchAss.do?callbatchAssIds="
					+ this.callbatchAssIds+"&index="+this.index+"&retriveIndex="+this.retriveIndex,
			fields : [{
						name : 'callbatchAssId',
						type : 'Long'
					}, 'staDat', 'toUserName', 'assignCount', 'retriveCount', 'holdCount','callbatchAssId','obCallbatch','canReceiveCount'
					],
			columns : [ {
						header : '分配时间',
						isExp : false,
						dataIndex : 'staDat'
					},{
						header : '接收人',
						isExp : false,
						dataIndex : 'toUserName'
					}, {
						header : '分配数量',
						isExp : false,
						dataIndex : 'assignCount'
					}, {
						header : '已回收数量',
						isExp : false,
						dataIndex :'retriveCount'
					}, {
						header : '可回收数量',
						isExp : false,
						dataIndex:'canReceiveCount'
					}, new Ext.ux.grid.RowActions({
						header : __action,
						width : 100,
						actions : [{
									iconCls : 'btn-readdocument',
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
								},{
									iconCls : 'btn-confApply-no',
									qtip : '回收',
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
								var parentFlag=this.parentFlag;
								var retriveIndex=this.retriveIndex;
								switch (action) {
									case 'btn-readdocument' :
										ObCalllistMForm.showList(record,retriveIndex,this.callbatchAssIds);
										break;
									case 'btn-confApply-no' :
										Ext.Ajax.request({
													url : __ctxPath + '/outb/listNewAssignCallbatchObCallbatchAss.do?callbatchId='+record.data.obCallbatch.callbatchId,
													params : {
													},
													method : 'post',
													success : function(response) {
														var tabs = Ext.getCmp('centerTabPanel');
														var aForm = Ext.getCmp('ObCalllistMHuishouFormWin');
														if (aForm != null) {
															tabs.remove('ObCalllistMHuishouFormWin');
														}
														aForm = new ObCalllistMHuishouForm({
														    callbatchAssIds : record.data.callbatchAssId + '',
														    assignCounts    : record.data.assignCount,
														    holdCounts      : record.data.canReceiveCount,
														    retriveCounts   : record.data.retriveCount,
															projNam         : Ext.getCmp('callbatchAss.projNam').getValue(),
															comNam          : Ext.getCmp('callbatchAss.comNam').getValue(),
															calllistNam     : Ext.getCmp('callbatchAss.calllistNam').getValue(),
															callbatchNam    : Ext.getCmp('callbatchAss.callbatchNam').getValue(),															    
														    index:0,
														    retriveIndex:    retriveIndex,
														    parentFlag:parentFlag //为1时 非管理员分配HuishouForm
														});  
														tabs.add(aForm);
														tabs.activate(aForm);
													}
												});									
//										var tabs = Ext.getCmp('centerTabPanel');
//										var aForm = Ext
//												.getCmp('ObCalllistMHuishouFormWin');
//										if (aForm != null) {
//											tabs
//													.remove('ObCalllistMHuishouFormWin');
//										}
//										aForm = new ObCalllistMHuishouForm({});
//										tabs.add(aForm);
//										tabs.activate(aForm);
										break;
									default :
										break;
								}
							}
						}
					})]
		});

		this.gridPanel2 = new HT.GridPanel({
					scrollHeight : true,
					id : 'tab1MFormtable',
					lazyLoad : true,
					exportable : false,
					printable : false,
					tbar : ['->', {
								iconCls : 'btn-confApply-no',
								text : '回收',
								style : 'margin:0 3px 0 3px',
								scope : this,
								handler : this.retriveSimple2
							}],
					url : __ctxPath
							+ "/outb/listCusByAdminObCallbatchAss.do?callbatchAssIds="
							+ this.callbatchAssIds+"&index="+this.type,
					fields : [{
								name : ' cusId',
								type : 'Long'
							}, 'nameCn', 'cusCode','age','gender', 'credTypId', 'birthday','credNum', 'customerId'
							//, 'ext2', 'ext3','ext4', 'ext5', 'ext6'
							],
					columns : [{
								header : '姓名',
								isExp : false,
								dataIndex : 'nameCn'
							}, {
						        header : '客户代码',
						        isExp : false,
						        dataIndex : 'cusCode'
					        }, {
								header : '性别',
								isExp : false,
								dataIndex : 'gender',
								renderer : function(value) {
									return XB001.get(value);
								}
							}, {
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
							}]
//							, {
//								header : '证件有效期',
//								isExp : false,
//								dataIndex : 'credDurDat'
//							}, {
//								header : '家庭电话',
//								isExp : false,
//								dataIndex : 'ext1'
//							}, {
//								header : '办公电话',
//								isExp : false,
//								dataIndex : 'ext2'
//							}, {
//								header : '移动电话',
//								isExp : false,
//								dataIndex : 'ext3'
//							}, {
//								header : '其他电话',
//								isExp : false,
//								dataIndex : 'ext4'
//							}, {
//								header : '传真',
//								isExp : false,
//								dataIndex : 'ext5'
//							}, {
//								header : 'Email',
//								isExp : false,
//								dataIndex : 'ext6'
//							}]
				});

		this.tabpanel = new Ext.TabPanel({
					activeTab : 0,// 激活第一个panel
					region : 'center',
					// autoWidth : true,
					// width :'auto',
					border : false,
					plain : true,
					defaultType : 'panel',
					items : [{
								title : '分配明细',
								border : false,
								layout : 'fit',
								id : 'tab0MForm',
								items : [this.gridPanel1, {
											xtype : 'hidden',
											id : 'tab0MFormhidden',
											value : true
										}]
							}, {
								title : '名单明细',
								border : false,
								id : 'tab1MForm',
								layout : 'fit',
								items : [this.gridPanel2, {
											xtype : 'hidden',
											id : 'tab1MFormhidden',
											value : true
										}]
							}],
						listeners : {
							'tabchange' : function(p) {
								var id = p.activeTab.getId();
								if (Ext.get(id + 'hidden').getValue() == 'true') {
									Ext.getCmp(id + 'table').getStore().load();
									Ext.getCmp(id + 'hidden').setValue(false);
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
		if (this.callbatchAssIds != null && this.callbatchAssIds.trim()!= '' && this.callbatchAssIds != 'undefined') {
	        Ext.getCmp('assignCountsform').setValue(this.assignCounts);
	        Ext.getCmp('holdCountsform').setValue(this.holdCounts);
	        Ext.getCmp('retriveCountsform').setValue(this.retriveCounts);
	    
	        
			this.formPanel.loadData({
						url : __ctxPath
								+ '/outb/getObCallbatchAss.do?callbatchAssIds='
								+ this.callbatchAssIds,
						root : 'data',
						preName : 'callbatchAss',
						success : function(response, options) {
					        var thisObj = Ext.util.JSON.decode(response.responseText).data;
					        var step=CONOB_CALLBATCH_ASS_JD.get(thisObj.assStepId);
					        Ext.getCmp('assStepIdform').setValue(step);
					        callbatchId=thisObj.obCallbatch.callbatchId;
//					        Ext.getCmp('callbatchAss.projNam').setValue(thisObj.obCom.obProject.projNam);
//					        Ext.getCmp('callbatchAss.callbatchNam').setValue(thisObj.obCallbatch.callbatchNam);
//					        Ext.getCmp('callbatchAss.comNam').setValue(thisObj.obCom.obComNam);
//					        Ext.getCmp('callbatchAss.calllistNam').setValue(thisObj.obCalllist.calllistNam);
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
		tabs.remove('ObCalllistMFormWin');// 移除创建的窗口
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
	},// end of save
	retriveSimple2 : function() {
		var callbatchAssIds=this.callbatchAssIds;
	    var rows = this.gridPanel2.getSelectionModel().getSelections();
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
		    	Ext.ux.Toast.msg('操作提示','请至少选择一个客户!');
	        	return;	
		}	
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/doRetriveCusObCallbatchAss.do',
			method : 'post',
		    params:{
				ids:idArray,
				callbatchAssIds:callbatchAssIds,
				retriveIndex:this.retriveIndex,
				callbatchId:callbatchId
			},
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success) {
				    Ext.ux.Toast.msg('操作信息', '回收成功！');
					Ext.getCmp('tab1MFormtable').getStore().reload();
				    Ext.getCmp('tab0MFormtable').getStore().reload();
					var gridPanel1 = Ext.getCmp('ObCallbatchAssGridM');
					if (gridPanel1 != null) {
						gridPanel1.getStore().reload();
					}
					var gridPanel2 = Ext.getCmp('ObCallbatchAssGridJL');
					if (gridPanel2 != null) {
						gridPanel2.getStore().reload();
					}
					var gridPanel3 = Ext.getCmp('ObCallbatchAssGridZZ');
					if (gridPanel3 != null) {
						gridPanel3.getStore().reload();
					}
				    
				    //Ext.getCmp('ObCallbatchAssGridM').getStore().reload();
				    //Ext.getCmp('ObCallbatchAssGridJL').getStore().reload();
				    //Ext.getCmp('ObCallbatchAssGridZZ').getStore().reload();
					
//					var tabs = Ext.getCmp('centerTabPanel');
//					tabs.remove('ObCalllistMHuishouFormWin');					    
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('操作信息', '回收失败！');
			}
		});		    
	},
	retriveSimple : function() {
	    var rows = this.gridPanel.getSelectionModel().getSelections();
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
		    	Ext.ux.Toast.msg('操作提示','请至少选择一个客户!');
	        	return;	
		}	
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/doRetriveCusObCallbatchAss.do',
			method : 'post',
		    params:{
				ids:idArray
			},
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success) {
					Ext.getCmp('tab1MFormtable').getStore().reload();
				    Ext.ux.Toast.msg('操作信息', '回收成功！');
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('操作信息', '回收失败！');
			}
		});		    
	}	
	
	
});
ObCalllistMForm.showList = function(record,retriveIndex,callbatchAssIds) {
	
	var searchPanel = new Ext.FormPanel({
				layout : 'hbox',
				region : 'north',
				id : 'ConHushouSearchPanel',
				height : 35,
				items : [{
							border : false,
							width : 70,
							style : 'text-align:right',
							html : '姓名：'
						}, {
							id:'nameCnSearch',
							xtype : 'textfield'
						}, 
//							{
//							border : false,
//							width : 70,
//							style : 'text-align:right',
//							html : '联络结果：'
//						}, 
//							{
//							//hiddenName : 'Q_dealResId_SN_EQ',
//							id:'dealResSearch',
//							xtype : 'mtdiccombo',
//							editable : true,
//							lazyInit : false,
//							forceSelection : false,
//							itemKey : 'CONCLZT'
//						}, 
							{
							xtype : 'button',
							text : __search,
							iconCls : 'search',
							scope : this,
							handler : function() {
								var psnle = Ext.getCmp('fenpeidetailCalllist');
								var store=Ext.getCmp('fenpeidetailCalllist').getStore();
								var nameCn=Ext.getCmp('nameCnSearch').getValue();
								//var dealResId=Ext.getCmp('dealResSearch').getValue();
								if(nameCn==null||nameCn==''||nameCn=='undefined') callbatchNam=null;
                                //store.proxy.conn.url = __ctxPath + '/outb/listCusByAdminObCallbatchAss.do?nameCn='+encodeURIComponent(nameCn)+'&dealResId='+dealResId+'&callbatchAssIds='+record.data.callbatchAssId+"&index=0";								
						    	store.proxy.conn.url = __ctxPath + '/outb/listCusByAdminObCallbatchAss.do?nameCn='+encodeURIComponent(nameCn)+'&callbatchAssIds='+record.data.callbatchAssId+"&index=0";
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
                                Ext.getCmp('ConHushouSearchPanel') .getForm().reset();
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
		        id:'fenpeidetailCalllist',
				region : 'center',
				printable : false,
				exportable : false,
				tbar : ['->', {
							iconCls : 'btn-confApply-no',
							text : '回收',
							style : 'margin:0 3px 0 3px',
							handler : function() {
								
							    var rows = Ext.getCmp('fenpeidetailCalllist').getSelectionModel().getSelections();
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
								    	Ext.ux.Toast.msg('操作提示','请至少选择一个客户!');
							        	return;	
								}	
								Ext.Ajax.request({
									url :  __ctxPath + '/outb/doRetriveCusObCallbatchAss.do',
									method : 'post',
								    params:{
										ids:idArray,
										retriveIndex:retriveIndex,
										callbatchAssIds:callbatchAssIds,
										callbatchId:callbatchId
									},
									success : function(response) {
										var result = Ext.util.JSON.decode(response.responseText);
										if(result.success) {
										    Ext.ux.Toast.msg('操作信息', '回收成功！');
										    Ext.getCmp('tab0MFormtable').getStore().reload();
										    Ext.getCmp('tab1MFormtable').getStore().reload();											
											Ext.getCmp('fenpeidetailCalllist').getStore().reload();
//										    Ext.getCmp('ObCallbatchAssGridM').getStore().reload();
//										    Ext.getCmp('ObCallbatchAssGridJL').getStore().reload();
//										    Ext.getCmp('ObCallbatchAssGridZZ').getStore().reload();
											var gridPanel1 = Ext.getCmp('ObCallbatchAssGridM');
											if (gridPanel1 != null) {
												gridPanel1.getStore().reload();
											}
											var gridPanel2 = Ext.getCmp('ObCallbatchAssGridJL');
											if (gridPanel2 != null) {
												gridPanel2.getStore().reload();
											}
											var gridPanel3 = Ext.getCmp('ObCallbatchAssGridZZ');
											if (gridPanel3 != null) {
												gridPanel3.getStore().reload();
											}										    
										    
										}
									},
									failure : function() {
										Ext.ux.Toast.msg('操作信息', '回收失败！');
									}
								});									
							}
						}],
				url : __ctxPath + "/outb/listCusByAdminObCallbatchAss.do?callbatchAssIds="
					+ record.data.callbatchAssId+"&index=0",
				fields : [{
							name : ' cusId',
							type : 'Long'
						}, 'cusCode', 'customerId', 'age','nameCn', 'gender','credTypId', 'birthday','credNum','obCallbatch.callbatchNam'
						//,'conStaId','busiStaId'
						],
				columns : [{
							header : 'cusId',
							dataIndex : 'cusId',
							hidden : true
						}, {
							header : '姓名',
							isExp : false,
							dataIndex : 'nameCn'
						}, {
							header : '客户代码',
							isExp : false,
							dataIndex : 'cusCode'
						},{
						    header : '年龄',
						    isExp : false,
						    dataIndex : 'age'
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
						    header : '生日',
						    isExp : false,
						    dataIndex : 'birthday'
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
						}
//						, {
//							header : '呼叫结果',
//							isExp : false,
//							dataIndex : 'conStaId',
//							renderer : function(value) {
//								return CONOB_SALETASK_BDJG.value;
//							}
//						}, {
//							header : '联络状态',
//							isExp : false,
//							dataIndex : 'busiStaId',
//							renderer : function(value) {
//								return CONOB_SALETASK_YXZT.value;
//							}
//						}
						]
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