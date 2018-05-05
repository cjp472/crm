/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObProjectDelForm
 * @extends Ext.Window
 * @description ObProject表单
 * @company 优创融联科技
 */
ObProjectDelForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();

		ObProjectDelForm.superclass.constructor.call(this, {
					id : 'ObProjectDelFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '营销项目明细',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
								iconCls : 'btn-save',
								id : 'btn-save_ID',
								scope : this,
								handler : this.save
							}, {
								text : __reset,
								iconCls : 'btn-reset',
								id : 'btn-reset_ID',
								scope : this,
								handler : this.reset
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
//		var projTypeJD = [[1,"策划阶段"],[2,"审核阶段"],[3,"执行阶段"],[4,"分析阶段"],[5,"项目结束"]];
		var projTypId_form = new Ext.form.ComboBox({
					xtype : 'combo',
					mode : 'local',
					id:'projTypId_form_ID',
					triggerAction : 'all',
					fieldLabel : '阶段',
					name : 'projTypId_form',
					hiddenName:'OB_Project_Combo_ProjTypId_value',
					anchor : '100%',
					editable : false,
					allowBlank : false,
					valueField:'projTypId',
					displayField:'projTypName',
					store:new Ext.data.SimpleStore({//new一个SimpleStore
						fields:['projTypId','projTypName'],	//设定键/值
						data:[]					//默认的data必须提供
					}),
					lazyInit :false,
					listeners : {
						'select' : function(combo, record,index) {
							var projTypeId = Ext.getCmp("projTypId_form_ID").getValue();
							status_form.clearValue();
							status_form.store.loadData(ObProjectDelForm.getStatusData(Number(projTypeId)));
						}
					}
		});
				//隐藏表单ID
		var projId_hidden = new Ext.form.Hidden({
			name : 'projId_hidden',
			id : 'projId_hidden',
			xtype : 'hidden',
			value : this.projId == null ? '' : this.projId
		});
		
		var status_form = new Ext.form.ComboBox({
					xtype : 'combo',
					mode : 'local',
					id : 'projStaId_form',
					fieldLabel : '状态',
					editable : false,
					allowBlank : false,
					triggerAction : 'all',
					anchor : '100%',
					hiddenName :'projStaIdVal',
					
					valueField:'projStaId',//设置隐藏的value值字段
					displayField:'projStaName',//设置显示的value值字段
					store:new Ext.data.SimpleStore({//new一个SimpleStore
						fields:['projStaId','projStaName'],	//设定键/值
						data:[]					//默认的data必须提供
					})
//					,listeners : {
//						'select' : function(combo,record,index) {
//
//						}
//					}
		});
		
		var srouceId_form = new MT.DicComboBox({
					fieldLabel : '来源',
					name : 'obProject.srouceId_form',
					hiddenName : 'obProject.srouceId',
					xtype : 'mtdiccombo',
					editable : false,
					lazyInit : false,
					triggerAction : 'all',
					forceSelection : false,
					itemKey : 'CONOB_PROJECT_LY',
					anchor : '100%'
				});
				
		var busiTypId_form = {
				fieldLabel : '项目类型',
				name : 'obProject.busiTypId_form',
				hiddenName : 'obProject.busiTypId',
				id : 'OB_ProjectDel_Tree_01',
				anchor : '100%',
				xtype : 'treecomboz',
				tplId : 'tree_tpl',
				rootVisible : false,
				lazyInit : false,
				allowBlank : false,
				editable : false,
		    	forceSelection : false,
		    	url : __ctxPath+ '/system/treeByMapNameDictionary.do?mapName=CONTPJYLX&relDic=10841'
		};
		
		var execTypId_form = new Ext.form.MultiComboBox({
					fieldLabel : '执行方式',
					name : 'obProject.execTypId_form',
					xtype : 'multicombo',
					triggerAction : 'all',
					editable : false,
					allowBlank : false,
					displaySeparator : ';',// 现实的分隔符
					valueSeparator : ',',
					lazyInit : false,
					store : new Ext.data.ArrayStore({
								autoLoad : true,
								baseParams : {
									itemKey : 'LXFS001'
								},
								url : __ctxPath + '/system/loadKeyDictionary.do',
								fields : ['itemId', 'itemName']
							}),
					displayField : 'itemName',
					valueField : 'itemId',
					forceSelection : false,
					// itemKey : 'LXFS001',// 对应到相应的联络方式
					hiddenName : 'obProject.execTypId_form',
					anchor : '100%'
				});
		//隐藏表单ID
		var execTypId_hidden = new Ext.form.Hidden({
			name : 'execTypId_hidden',
			xtype : 'hidden',
			value : this.ownerTeam == null ? '' : this.projExecTypeStr
		});
		var ownerTeamNam = new Ext.form.TextField({
					fieldLabel : '所属机构',
					readOnly : true,
					allowBlank : false,
					name : 'obProject.ownerTeamNam',
					xtype : 'textfield',
					anchor : '100%'
				});
		var ownerTeam = new Ext.form.Hidden({
					name : 'obProject.ownerTeam',
					xtype : 'hidden',
					value : this.ownerTeam == null ? '' : this.ownerTeam
				});
		var perInchargeName = new Ext.form.TextField({
					fieldLabel : '负责人',
					allowBlank : false,
					readOnly : true,
					// id :
					// 'obProject.perInchargeName',
					name : 'obProject.perInchargeName',
					xtype : 'textfield',
					anchor : '100%'
				});
		var perIncharge = new Ext.form.Hidden({
					// id : 'obProject.perIncharge',
					name : 'obProject.perIncharge',
					xtype : 'hidden'
				});
		var ulBbsHuatiPanel = new Ext.Panel({

					fieldLabel : '附件',
					xtype : 'panel',
					name : 'ulBbsHuatiPanel',
					frame : false,
					border : true,
					bodyStyle : 'padding:4px 4px 4px 4px',
					height : 80,
					autoScroll : true,
					html : ''
				});
		var ulBbsHuatifileIds = new Ext.form.Hidden({
					id : 'ulBbsHuatifileIds',
					xtype : 'hidden',
					name : 'fileIds'
				});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			 id : 'ObProjectDelFormID',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
						name : 'obProject.projId',
						xtype : 'hidden',
						value : this.projId == null ? '' : this.projId
					},
					perIncharge, ownerTeam,projId_hidden,
					{
						fieldLabel : '项目名称',
						xtype : 'textfield',
						name : 'obProject.projNam',
						allowBlank : false,
						maxLength : 128,
						anchor : '96%'
					}, {
						layout : 'column',
						border : false,
						items : [{
							columnWidth : .33,
							border : false,
							layout : 'form',
							items : [{
										fieldLabel : '项目简介',
										name : 'obProject.projAliNam',
										maxLength : 128,
										xtype : 'textfield',
										anchor : '100%'
									}, {
										layout : 'column',
										border : false,
										anchor : '100%',
										items : [{
													xtype : 'panel',
													layout : 'form',
													columnWidth : .9,
													border : false,
													items : [ownerTeamNam]
												}, {
													xtype : 'panel',
													columnWidth : .1,
													border : false,
													layout : 'form',
													items : [{
														xtype : 'button',
														anchor : '100%',
														iconCls : 'btn-search',
														handler : function() {
															ObZuZhiJiGouSelector.prototype
																	.setup(function(jigouNam,jigouId) {
																				ownerTeamNam.setValue(jigouNam);
																				ownerTeam.setValue(jigouId);
																			})
																	.show();
														}
													}]
												}]
									}, projTypId_form,status_form
//									, {
//										fieldLabel : '实际完成时间',
//										name : 'obProject.endDat',
//										xtype : 'datefield',
//										id : 'OB_P_DelForm_FactEnd_Dat',
//										editable : false,
//										format : 'Y-m-d',
//										value : new Date(),
//										anchor : '100%'
//									}
									]

						}, {
							columnWidth : .33,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '项目编号',
										name : 'obProject.projCod',
										maxLength : 36,
										xtype : 'textfield',
										anchor : '100%'
									}, {
										layout : 'column',
										border : false,
										anchor : '100%',
										items : [{
													xtype : 'panel',
													layout : 'form',
													columnWidth : .9,
													border : false,
													items : [perInchargeName]
												}, {
													xtype : 'panel',
													columnWidth : .1,
													border : false,
													style : 'float:right;',
													buttonAlign : 'right',
													layout : 'form',
													items : [{
														xtype : 'button',
														buttonAlign : 'right',
														anchor : '100%',
														iconCls : 'btn-search',
														handler : function() {
															UlPersonChargeSelector.getView(
																			function(userId,fullname,sex,useid) {
																				perIncharge.setValue(useid);
																				perInchargeName.setValue(fullname);
																			})
															.show();
														}
													}]
												}]
									}, {
										fieldLabel : '开始时间',
										name : 'obProject.staDat',
										xtype : 'datefield',
										id : 'OB_P_DelFormStaDat01',
										editable : false,
										allowBlank : false,
										format : 'Y-m-d',
										value : new Date(),
										anchor : '100%'
										,listeners : {
											'change' : function(p,newValue,oldValue) {
												var endDat = Ext.getCmp("OB_P_DelFormEndDat01").getValue();
												if(endDat!=null && endDat!=undefined && endDat!='') {
													if(newValue>endDat) {
														Ext.Msg.alert('提示信息', '时间段填写不合理！');
														Ext.getCmp("OB_P_DelFormStaDat01").setValue(oldValue);
														Ext.getCmp("OB_P_DelFormEndDat01").setValue(oldValue);
													} else {
														Ext.getCmp("OB_P_DelFormStaDat01").setValue(newValue);
													}
												}
											}
										}
									}]

						}, {
							columnWidth : .34,
							layout : 'form',
							border : false,
							items : [busiTypId_form, execTypId_form,execTypId_hidden, {
										fieldLabel : '结束时间',
//										allowBlank : false,
										name : 'obProject.endDat',
										xtype : 'datefield',
										id : 'OB_P_DelFormEndDat01',
										format : 'Y-m-d',
										value : new Date(),
										anchor : '100%'
										,listeners : {
											'change' : function(p,newValue,oldValue) {												
												if(newValue!=null && newValue!=undefined && newValue!='') {
													var starDat = Ext.getCmp("OB_P_DelFormStaDat01").getValue();
													if(starDat>newValue) {
														Ext.Msg.alert('提示信息', '时间段填写不合理！');
														Ext.getCmp("OB_P_DelFormEndDat01").setValue(oldValue);
														Ext.getCmp("OB_P_DelFormStaDat01").setValue(oldValue);
													} else {
														Ext.getCmp("OB_P_DelFormEndDat01").setValue(newValue);
													}
													
													//判断结束时间是否早于已执行活动的最晚时间
													var id = Ext.getCmp("projId_hidden").getValue();
													Ext.Ajax.request({
														url :  __ctxPath + '/outb/getMaxEndDatComObProject.do?projId='+id,
														method : 'post',
														success : function(response) {
															var result = Ext.util.JSON.decode(response.responseText);//解析数据
															var maxEndDatCom = Date.parseDate(result.maxEndDatCom,"Y-m-d H:i:s");
															if(newValue<maxEndDatCom) {
																Ext.Msg.alert('提示信息', '结束时间不能早于该项目下活动的最晚结束时间！');
															}
														},
														failure : function() {
														}
													});
												}
											}
										}
									}

							]

						}]
					}

					, {
						fieldLabel : '简介',
						name : 'obProject.projJianjie',
						xtype : 'textarea',
						maxLength : 4000,
						anchor : '96%'
					}

					, {
						xtype : 'container',
						layout : 'column',
						border : false,
						anchor : '100%',
						defaults : {
							border : false,
							anchor : '100%'
						},
						items : [{
									columnWidth : .82,
									layout : 'form',
									border : false,
									items : [ulBbsHuatiPanel]
								}, {
									columnWidth : .18,
									border : false,
									items : [{
										xtype : 'button',
										text : '添加附件',
										border : false,
										iconCls : 'menu-attachment',
										handler : function() {
											var dialog = App.createUploadDialog({
														file_cat : 'outb/ObProject',
														callback : function(data) {
															var fileIds = ulBbsHuatifileIds;
															var filePanel = ulBbsHuatiPanel;

															for (var i = 0; i < data.length; i++) {
																if (fileIds.getValue() != '') {
																	fileIds.setValue(fileIds.getValue() + ',');
																}
																fileIds.setValue(fileIds.getValue() + data[i].fileId);
																Ext.DomHelper.append(
																				filePanel.body,
																				'<span><a href="#" onclick="FileAttachDetail.show('
																						+ data[i].fileId
																						+ ')">'
																						+ data[i].fileName
																						+ '</a> <img class="img-delete" src="'
																						+ __ctxPath
																						+ '/images/system/delete.gif" onclick="ObProjectDelForm.removeResumeFile(this,'
																						+ data[i].fileId
																						+ ')"/>&nbsp;|&nbsp;</span>');
															}
														}
													});
											dialog.show(this);
										}
									}, {
										xtype : 'button',
										border : false,
										text : '清除附件',
										iconCls : 'reset',
										handler : function() {
											var fileIds = ulBbsHuatifileIds;
											var filePanel = ulBbsHuatiPanel;

											filePanel.body.update('');
											fileIds.setValue('');
										}
									}, ulBbsHuatifileIds]
								}]
					}

					, {
						fieldLabel : '备注',
						name : 'obProject.remark',
						xtype : 'textarea',
						maxLength : 1024,
						anchor : '96%'
					}]
		});
		// 加载表单对应的数据
		if (this.projId != null && this.projId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/outb/getObProject.do?projId=' + this.projId,
				root : 'data',
				preName : 'obProject',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					Ext.getCmp("projId_hidden").setValue(thisObj.projId);				//项目内码（隐藏表单域）

					var closeStage = "[['5','项目结束']]";
					var analyseStage = "[['4','分析阶段'],['5','项目结束']]";
					var execStage = "[['3','执行阶段'],['4','分析阶段'],['5','项目结束']]";
					var auditStage = "[['2','审核阶段'],['3','执行阶段'],['4','分析阶段'],['5','项目结束']]";
					var planStage = "[['1','策划阶段'],['2','审核阶段'],['3','执行阶段'],['4','分析阶段'],['5','项目结束']]";
					switch(thisObj.projTypId) {
						case 5 :	//结束阶段
							ObProjectDelForm.setStageData(closeStage,"5");
							break;
						case 4 :	//分析阶段
							ObProjectDelForm.setStageData(analyseStage,"4");
							break;
						case 3 :	//执行阶段
							ObProjectDelForm.setStageData(execStage,"3");
							break;
						case 2 :	//审核 阶段
							ObProjectDelForm.setStageData(auditStage,"2");
							break;
						default:	//默认为策划阶段
							ObProjectDelForm.setStageData(planStage,"1");
					}
					Ext.getCmp("projStaId_form").clearValue();
					
					var projTypeId = thisObj.projTypId;													//项目阶段
					var projStatus = thisObj.projStaId;													//项目状态
					
					Ext.getCmp("projStaId_form").store.loadData(ObProjectDelForm.getStatusData(projTypeId,projStatus));
					Ext.getCmp("projStaId_form").setValue(projStatus);									//状态
					
//					if(projTypeId == 5) {
//						Ext.getCmp("OB_P_DelForm_FactEnd_Dat").setVisible(true);
//					} else {
//						Ext.getCmp("OB_P_DelForm_FactEnd_Dat").setVisible(false);
//					}
					
					if((projStatus == 4 || projStatus == 5)) {
						Ext.getCmp("btn-save_ID").setVisible(false);
						Ext.getCmp("btn-reset_ID").setVisible(false);
					}
					
					srouceId_form.setValue(thisObj.srouceId); 					// 来源
//					busiTypId_form.setValue(thisObj.busiTypId); 				// 项目类型
                    Ext.getCmp("OB_ProjectDel_Tree_01").setItemIndex(thisObj.busiTypId);//设置项目类型值
					var busiTypName = CONTPJYLX.get(thisObj.busiTypId);		//设置项目类型显示值
					Ext.getCmp("OB_ProjectDel_Tree_01").setValue(busiTypName);
					
					var value_to = "";
					if (thisObj.projExecTypeStr.indexOf(",") == -1) {
						value_to += LXFS001.get(thisObj.projExecTypeStr);
					} else {
						var str_to = thisObj.projExecTypeStr.split(",");
						for (var i = 0; i < str_to.length - 1; i++) {
							if(value_to.length != 0) {
								value_to += ",";
							}
							value_to += LXFS001.get(str_to[i]);
						}
					}
					
					execTypId_form.setValue(value_to)						 	// 执行方式
					execTypId_hidden.setValue(thisObj.projExecTypeStr);

					ownerTeamNam.setValue(thisObj.ownerTeamName); 				// 所属机构名称
					ownerTeam.setValue(thisObj.ownerTeam); 						// 所属机构ID
					perInchargeName.setValue(thisObj.perInchargeName);			// 负责人名称
					perIncharge.setValue(thisObj.perIncharge); 					// 负责人ID
					
					// alert(Ext.get('obProject.ownerTeamNam').getValue());

					// 开始加载附件
					var fileIds = ulBbsHuatifileIds;
					var filePanel = ulBbsHuatiPanel;
					
					var af = thisObj.fileAttachs;
					
					if (null != af && 'undefined' != af) {
						for (var i = 0; i < af.length; i++) {
							if (fileIds.getValue() != '') {
								fileIds.setValue(fileIds.getValue() + ',');
							}
							fileIds.setValue(fileIds.getValue() + af[i].fileId);
							Ext.DomHelper
									.append(
											filePanel.body,
											'<span><a href="#" onclick="FileAttachDetail.show('
													+ af[i].fileId
													+ ')">'
													+ af[i].fileName
													+ '</a><img class="img-delete" src="'
													+ __ctxPath
													+ '/images/system/delete.gif" onclick="ObProjectDelForm.removeResumeFile(this,'
													+ af[i].fileId
													+ ')"/>&nbsp;|&nbsp;</span>');
						}
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
		//业务类型
        Ext.getCmp("obProject.obComBizTypeTree.nodeName").setNameValue('');
        Ext.getCmp('obProject.obComBizTypeTree.nodeId').setValue('');
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *  window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');// 获得tab
		tabs.remove('ObProjectDelFormWin');// 移除创建的窗口
	},
	
	/**
	 * 保存记录
	 */
	save : function() {
		var projStatus = Ext.getCmp("projStaId_form").getValue();
		if(projStatus == 3 || projStatus == 4 || projStatus == 5) {	//对于切换到4——关闭，5——取消的状态发送请求进行查询
			var id = Ext.getCmp("projId_hidden").getValue();
			Ext.Ajax.request({
				url :  __ctxPath + '/outb/isProjComsEnableObProject.do?projId='+id,
				method : 'post',
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);//解析数据
					if(false == result.success) {
						Ext.MessageBox.confirm('提示', '该项目下还有活动处于执行中，您确认提交吗？', function(btn){
								if('yes' == btn) {
									ObProjectDelForm.savePost();
								}
						});
					} else {
						//项目下的活动不存在“启用”状态
						ObProjectDelForm.savePost();
					}
				},
				failure : function() {
				}
			});
			return ;
		}
		ObProjectDelForm.savePost();
	}// end of save
});

ObProjectDelForm.setStageData = function(stage,value) {
	Ext.getCmp("projTypId_form_ID").clearValue();
	var result = Ext.util.JSON.decode(stage);
	Ext.getCmp("projTypId_form_ID").getStore().loadData(result);
	Ext.getCmp("projTypId_form_ID").setValue(value);
}

ObProjectDelForm.savePost = function() {
		var busiTypId=Ext.getCmp("OB_ProjectDel_Tree_01").getItemIndex();
		$postForm({
				formPanel : Ext.getCmp("ObProjectDelFormID"),
				url : __ctxPath + '/outb/saveObProject.do',
				msgSuccess : '成功添加该记录！',
				msgFailure : '操作出错，请联系管理员！',
				params : {
					busiTypId : busiTypId
				},
				callback : function(sc,fp, action) {
					var gridPanel = Ext.getCmp('ObProjectGrid');
					if (gridPanel != null) {
						gridPanel.getStore().reload();
					}
					var tabs = Ext.getCmp('centerTabPanel');
					tabs.remove('ObProjectDelFormWin');
//					Ext.getCmp('ObProjectDelFormWin').destroy();
				}
		});
	}
	
ObProjectDelForm.getStatusData = function(projTypeId,projStatus) {
	var statusArray = new Array();
	statusArray[1] = [[0,"未启动"]];
	statusArray[2] = [[1,"审核中"]];
	statusArray[3] = [[2,"执行中"],[3,"停止"]];
	statusArray[4] = [[2,"执行中"],[3,"停止"]];
	statusArray[5] = [[4,"关闭"],[5,"取消"]];
	
//	statusArray[6] = [[3,"停止"],[4,"关闭"],[5,"取消"]];
//	statusArray[7] = [[4,"关闭"],[5,"取消"]];
//	statusArray[8] = [[3,"停止"]];

	switch(projTypeId) {
		case 5 :	//项目结束
			return statusArray[5];
		case 4 :	//分析阶段
			return statusArray[4];
		case 3 :	//执行阶段
			return statusArray[3];
		case 2 :	//审核阶段
			return statusArray[2];
		default :	//策划阶段
			return statusArray[1];		
	}
}

// 删除附件
ObProjectDelForm.removeResumeFile = function(obj, fileId) {
	var fileIds = Ext.getCmp("ulBbsHuatifileIds");
	var value = fileIds.getValue();
	if (value.indexOf(',') < 0) {// 仅有一个附件
		fileIds.setValue('');
	} else {
		value = value.replace(',' + fileId, '').replace(fileId + ',', '');
		fileIds.setValue(value);
	}
	var el = Ext.get(obj.parentNode);
	el.remove();
};