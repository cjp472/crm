/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObProjectForm
 * @extends Ext.Window
 * @description ObProject表单
 * @company 优创融联科技
 */
ObProjectForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();

		ObProjectForm.superclass.constructor.call(this, {
					id : 'ObProjectFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '营销项目增加',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : __reset,
								iconCls : 'btn-reset',
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
		var projTypeStage = [[1,"策划阶段"],[2,"审核阶段"],[3,"执行阶段"],[4,"分析阶段"],[5,"项目结束"]];
//		var projTypId_form = new MT.DicComboBox({
//					fieldLabel : '阶段',
//					name : 'obProject.projTypId_form',
//					hiddenName : 'obProject.projTypId',
//					xtype : 'mtdiccombo',
//					editable : false,
//					lazyInit : false,
//					forceSelection : false,
//					itemKey : 'CONOB_PROJECT_XMLB',
//					anchor : '100%'
//				});
		var projTypId_form = new Ext.form.ComboBox({
					xtype : 'combo',
					id : 'OB_Project_Combo_ProjTypId',
					allowBlank : false,
					mode : 'local',
					triggerAction : 'all',
					fieldLabel : '阶段',
					hiddenName:'OB_Project_Combo_ProjTypId_value',
					name : 'projTypId_form_org',
					anchor : '100%',
					editable : false,
					valueField:'projTypId',
					displayField:'projTypName',
					store:new Ext.data.SimpleStore({//new一个SimpleStore
						fields:['projTypId','projTypName'],	//设定键/值
						data:[]					//默认的data必须提供
					}),
					lazyInit :false
		});
		
		var srouceId_form = new MT.DicComboBox({
					fieldLabel : '来源',
					name : 'obProject.srouceId_form',
					hiddenName : 'obProject.srouceId',
					xtype : 'mtdiccombo',
					triggerAction : 'all',
					editable : false,
					lazyInit : false,
					forceSelection : false,
					itemKey : 'CONOB_PROJECT_LY',
					anchor : '100%'
				});
//		var busiTypId_form = new MT.DicComboBox({
//					fieldLabel : '项目类型',
//					name : 'obProject.busiTypId_form',
//					hiddenName : 'obProject.busiTypId',
//					xtype : 'mtdiccombo',
//					allowBlank : false,
//					editable : false,
//					lazyInit : false,
//					forceSelection : false,
//					itemKey : 'CONOB_PROJECT_YWLX',
//					anchor : '100%'
//				});
		
		var busiTypId_form = {
				fieldLabel : '项目类型',
				name : 'obProject.busiTypId_form',
				hiddenName : 'obProject.busiTypId',
				id : 'OB_Project_Form_Tree_01',
				anchor : '100%',
				xtype : 'treecomboz',
				tplId : 'treessss_tpl',
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
					allowBlank : false,
					editable : false,
					displaySeparator : ';',// 现实的分隔符
					valueSeparator : ',',
					lazyInit : false,
					store : new Ext.data.ArrayStore({
								autoLoad : true,
								baseParams : {
									itemKey : 'LXFS001'
								},
								url : __ctxPath
										+ '/system/loadKeyDictionary.do',
								fields : ['itemId', 'itemName']
							}),
					displayField : 'itemName',
					valueField : 'itemId',
					forceSelection : false,
					// itemKey : 'LXFS001',// 对应到相应的联络方式
					hiddenName : 'obProject.execTypId_form',
					anchor : '100%'

				});
		var ownerTeamNam = new Ext.form.TextField({
					fieldLabel : '所属机构',
					readOnly : true,
					name : 'obProject.ownerTeamNam',
					xtype : 'textfield',
					allowBlank : false,
					anchor : '100%'
				});
		var ownerTeam = new Ext.form.Hidden({
					name : 'obProject.ownerTeam',
					xtype : 'hidden',
					value : this.ownerTeam == null ? '' : this.ownerTeam
				});
		var perInchargeName = new Ext.form.TextField({
					fieldLabel : '负责人',
					readOnly : true,
					// id :
					// 'obProject.perInchargeName',
					name : 'obProject.perInchargeName',
					xtype : 'textfield',
					allowBlank : false,
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
			// id : 'ObProjectForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
						name : 'obProject.projId',
						xtype : 'hidden',
						value : this.projId == null ? '' : this.projId
					}, perIncharge, ownerTeam, {
						fieldLabel : '项目名称',
						xtype : 'textfield',
						name : 'obProject.projNam',
						allowBlank : false,
						maxLength : 128,
						maxLengthText : '超过最大长度  {maxLength} 限制',
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
										maxLengthText : '超过最大长度  {maxLength} 限制',
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
																	.setup(
																			function(
																					jigouNam,
																					jigouId) {
																				ownerTeamNam
																						.setValue(jigouNam);
																				ownerTeam
																						.setValue(jigouId);
																			})
																	.show();
														}
													}]
												}]
									},projTypId_form]

						}, {
							columnWidth : .33,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '项目编号',
										name : 'obProject.projCod',
										maxLength : 36,
										maxLengthText : '超过最大长度  {maxLength} 限制',
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
																			function(
																					userId,
																					fullname,
																					sex,
																					useid) {
																				perIncharge.setValue(useid);
																				perInchargeName.setValue(fullname);
																			},true)
																	.show();
														}
													}]
												}]
									}, {
										fieldLabel : '开始时间',
										name : 'obProject.staDat',
										xtype : 'datefield',
										id : 'OB_P_FormStaDat01',
										allowBlank : false,
										editable : false,
										format : 'Y-m-d',
										value : new Date(),
										anchor : '100%'
										,listeners : {
											'change' : function(p,newValue,oldValue) {
												var endDat = Ext.getCmp("OB_P_FormEndDat01").getValue();
												if(endDat!=null && endDat!=undefined && endDat!='') {
													if(newValue>endDat) {
														Ext.Msg.alert('提示信息', '时间段填写不合理！');
														Ext.getCmp("OB_P_FormStaDat01").setValue(oldValue);
														Ext.getCmp("OB_P_FormEndDat01").setValue(oldValue);
													} else {
														Ext.getCmp("OB_P_FormStaDat01").setValue(newValue);
													}
												}
											}
										}
									}]

						}, {
							columnWidth : .34,
							layout : 'form',
							border : false,
							items : [busiTypId_form, execTypId_form, {
										fieldLabel : '结束时间',
//										editable : false,
										name : 'obProject.endDat',
										xtype : 'datefield',
										id : 'OB_P_FormEndDat01',
										format : 'Y-m-d',
										value : new Date(),
										anchor : '100%'
										,listeners : {
											'change' : function(p,newValue,oldValue) {
												if(newValue!=null && newValue!=undefined && newValue!='') {
													var starDat = Ext.getCmp("OB_P_FormStaDat01").getValue();
													if(starDat>newValue) {
														Ext.Msg.alert('提示信息', '时间段填写不合理！');
														Ext.getCmp("OB_P_FormEndDat01").setValue(oldValue);
														Ext.getCmp("OB_P_FormStaDat01").setValue(oldValue);
													} else {
														Ext.getCmp("OB_P_FormEndDat01").setValue(newValue);
													}
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
						maxLengthText : '超过最大长度  {maxLength} 限制',
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
														callback : function(
																data) {
															var fileIds = ulBbsHuatifileIds;
															var filePanel = ulBbsHuatiPanel;

															for (var i = 0; i < data.length; i++) {
																if (fileIds
																		.getValue() != '') {
																	fileIds
																			.setValue(fileIds
																					.getValue()
																					+ ',');
																}
																fileIds
																		.setValue(fileIds
																				.getValue()
																				+ data[i].fileId);
																Ext.DomHelper
																		.append(
																				filePanel.body,
																				'<span><a href="#" onclick="FileAttachDetail.show('
																						+ data[i].fileId
																						+ ')">'
																						+ data[i].fileName
																						+ '</a> <img class="img-delete" src="'
																						+ __ctxPath
																						+ '/images/system/delete.gif" onclick="ObProjectForm.removeResumeFile(this,'
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
						maxLengthText : '超过最大长度  {maxLength} 限制',
						anchor : '96%'
					}]
		});
		
		//初始化加载“阶段”本地数据
		projTypId_form.setValue("1");
		projTypId_form.getStore().loadData(projTypeStage);
		
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
		tabs.remove('ObProjectFormWin');// 移除创建的窗口
	},
	/**
	 * 保存记录
	 */
	save : function() {
		var itemIndex = Ext.getCmp("OB_Project_Form_Tree_01").getItemIndex();
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/outb/saveObProject.do',
					msgSuccess : '成功添加该记录！',
					msgFailure : '操作出错，请联系管理员！',
					params : {
						itemIndex : itemIndex
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObProjectGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('ObProjectFormWin');
					}
				});
	}// end of save

});
// 删除附件
ObProjectForm.removeResumeFile = function(obj, fileId) {
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