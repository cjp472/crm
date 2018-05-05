/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UkKnowTemplateForm
 * @extends Ext.Window
 * @description UkKnowTemplate表单
 * @company 优创融联科技
 */
UkKnowTemplateForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UkKnowTemplateForm.superclass.constructor.call(this, {
					id : 'UkKnowTemplateFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 270,
					width : 550,
					maximizable : true,
					title : '智能表单新增',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								id : 'btnSave',
								scope : this,
								handler : this.save
							}, {
								text : '重置',
								iconCls : 'btn-reset',
								scope : this,
								handler : this.cancel
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancels
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		checkOrgName = function() {
			var orgName = Ext.get('ukKnowTemplate.tmpName').dom.value;
			var orgId = Ext.get('ukKnowTemplate.knowTmpId').dom.value;
			if (orgName.length <= 0) {
				Ext.getCmp('btnSave').disable();
				return '名称不能为空!';
			} else {
				Ext.Ajax.request({
							url : __ctxPath + '/know/listUkKnowTemplate.do',
							params : {
								'Q_tmpName_S_EQ' : orgName,
								'Q_knowTmpId_L_NEQ' : orgId
							},
							success : function(form, action) {
								var info = Ext.decode(form.responseText);
								if (info.totalCounts > 0) {
									Ext.getCmp('ukKnowTemplate.tmpName')
											.markInvalid('该模版名称已被创建,请重新创建!');
									// Ext.getCmp("btnSave").hide();
									Ext.getCmp('btnSave').disable();
								} else {
									Ext.getCmp('ukKnowTemplate.tmpName')
											.clearInvalid(true);
									// Ext.getCmp("btnSave").show();
									Ext.getCmp('btnSave').enable();
								}
							}
						});
			}
		};
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			labelWidth : 70,
			id : 'UkKnowTemplateForm',
			defaults : {
				anchor : '100%,100%'
			},
			items : [{
						name : 'ukKnowTemplate.knowTmpId',
						id : 'ukKnowTemplate.knowTmpId',
						xtype : 'hidden',
						value : this.knowTmpId == null ? '' : this.knowTmpId
					}, {
						name : 'ukKnowTemplate.knowTmpType.tmpTypeId',
						id : 'selector.knowTempldateTypeId',
						xtype : 'hidden'
					}, {
						anchor : '100%',
						layout : 'column',
						border : false,
						xtype : 'panel',
						items : [{
									xtype : 'panel',
									layout : 'form',
									columnWidth : .5,
									border : false,
									anchor : '100%',
									items : [{
												fieldLabel : '模板名称',
												name : 'ukKnowTemplate.tmpName',
												id : 'ukKnowTemplate.tmpName',
												maxLength : 30,
												// style :
												// 'border:none;background:none;',
												xtype : 'textfield',
												allowBlank : false,
												blankText : '模板名称不能为空!',
												anchor : '100%',
												validator : checkOrgName
											}]
								}, {
									xtype : 'panel',
									layout : 'form',
									anchor : '100%',
									columnWidth : .5,
									border : false,
									items : [{
												xtype:'combo',
												fieldLabel:'类型',
												id : 'ukKnowTemplateForm.knowTmpType.dicId',
//												hiddenName : 'ukKnowTemplate.knowTmpType.dicId',
												editable : false,
												lazyInit : false,
												allowBlank : false,
												forceSelection : false,
												triggerAction : 'all',
												store :  new Ext.data.SimpleStore({
													autoLoad : true,
													url : __ctxPath + '/system/comboDictionary.do',
													baseParams : {
														'Q_mapName_S_EQ' : 'TEMP_TYPE'
													},
													fields : [ 'dicId', 'itemValue' ],
													listeners : {
														load : function(combo, record,index) {
															var combo = Ext.getCmp('ukKnowTemplateForm.knowTmpType.dicId');
															var combo1 = Ext.getCmp('id.ukKnowTemplate.knowTmpType.dicId');
															var store = combo.getStore();
															for ( var i = 0; i < store.getCount(); i++) { //store.getCount()为store的长度
																if (store.getAt(i).data['dicId'] == combo1.getValue()) {
																	combo.setValue(store.getAt(i).data['itemValue']);
																	break;
																}
															}
														var dicId = Ext.getCmp('id.ukKnowTemplate.knowTmpType.dicId').getValue();
														Ext.Ajax.request({
															url : __ctxPath + '/system/comboDictionary.do',
															params : {
																'Q_relDic_L_EQ' : dicId,
																'Q_mapName_S_EQ' : 'TEMP_CATEGORY'
															},
															method : 'post',
															success : function(response) {
																var result = Ext.util.JSON.decode(response.responseText);
																Ext.getCmp('ukKnowTemplateForm.knowTmpClass.dicId').getStore().loadData(result);
//																Ext.getCmp('ukKnowTemplateForm.knowTmpClass.dicId').clearValue();
																var combo = Ext.getCmp('ukKnowTemplateForm.knowTmpClass.dicId');
																var combo1 = Ext.getCmp('id.ukKnowTemplate.knowTmpClass.dicId');
																var arr = Ext.toArray(Ext.decode(response.responseText));
																for ( var i = 0; i < arr.length; i++) { //store.getCount()为store的长度
																	if (arr[i][0] == combo1.getValue()) {
																		combo.setValue(arr[i][1]);
																		break;
																	}
																}
															}
														});
														
														Ext.Ajax.request({
															url : __ctxPath + '/system/comboDictionary.do',
															params : {
																'Q_relDic_L_EQ' : dicId,
																'Q_mapName_S_EQ' : 'TEMP_SCOPE'
															},
															method : 'post',
															success : function(response) {
																var result = Ext.util.JSON.decode(response.responseText);
																Ext.getCmp('ukKnowTemplateForm.knowTmpRange.dicId').getStore().loadData(result);
//																Ext.getCmp('ukKnowTemplateForm.knowTmpRange.dicId').clearValue();
																
																var combo = Ext.getCmp('ukKnowTemplateForm.knowTmpRange.dicId');
																var combo1 = Ext.getCmp('id.ukKnowTemplate.knowTmpRange.dicId');
																var arr = Ext.toArray(Ext.decode(response.responseText));
																for ( var i = 0; i < arr.length; i++) { //store.getCount()为store的长度
																	if (arr[i][0] == combo1.getValue()) {
																		combo.setValue(arr[i][1]);
																		break;
																	}
																}
															}
														});
														}
													}
												}),
												anchor:'100%',
												mode:'local',
												displayField : 'itemValue',
												valueField : 'dicId',
												listeners : {
													scope : this,
													'select' : function(combo, record,index) {
														var dicId = record.get('dicId')
														Ext.getCmp('id.ukKnowTemplate.knowTmpType.dicId').setValue(dicId);
														
														Ext.Ajax.request({
															url : __ctxPath + '/system/comboDictionary.do',
															params : {
																'Q_relDic_L_EQ' : dicId,
																'Q_mapName_S_EQ' : 'TEMP_CATEGORY'
															},
															method : 'post',
															success : function(response) {
																var result = Ext.util.JSON.decode(response.responseText);
																Ext.getCmp('ukKnowTemplateForm.knowTmpClass.dicId').getStore().loadData(result);
																Ext.getCmp('ukKnowTemplateForm.knowTmpClass.dicId').clearValue();
															}
														});
														Ext.Ajax.request({
															url : __ctxPath + '/system/comboDictionary.do',
															params : {
																'Q_relDic_L_EQ' : dicId,
																'Q_mapName_S_EQ' : 'TEMP_SCOPE'
															},
															method : 'post',
															success : function(response) {
																var result = Ext.util.JSON.decode(response.responseText);
																Ext.getCmp('ukKnowTemplateForm.knowTmpRange.dicId').getStore().loadData(result);
																Ext.getCmp('ukKnowTemplateForm.knowTmpRange.dicId').clearValue();
															}
														});
													}
												}
											}]
								}]

					}, {
						anchor : '100%',
						layout : 'column',
						border : false,
						xtype : 'panel',
						items : [{
									xtype : 'panel',
									layout : 'form',
									columnWidth : .5,
									border : false,
									anchor : '100%',
									items : [{
												xtype : 'combo',
												fieldLabel:'类别',
												id : 'ukKnowTemplateForm.knowTmpClass.dicId',
//												hiddenName : 'ukKnowTemplate.knowTmpClass.dicId',
												editable : false,allowBlank : false,
												lazyInit : false,
												forceSelection : false,
												triggerAction : 'all',
												store : [['','']],
												anchor:'100%',
												mode:'local',
												listeners : {
													select : function(cbo,record,index) {
														var fm = Ext.getCmp('id.ukKnowTemplate.knowTmpClass.dicId');
														fm.setValue(cbo.value);
													}
												}
											}]
								}, {
									xtype : 'panel',
									layout : 'form',
									anchor : '100%',
									columnWidth : .5,
									border : false,
									items : [{
												xtype : 'combo',
												fieldLabel:'范围',
												id : 'ukKnowTemplateForm.knowTmpRange.dicId',
//												hiddenName : 'ukKnowTemplate.knowTmpRange.dicId',
												editable : false,
												lazyInit : false,allowBlank : false,
												forceSelection : false,
												triggerAction : 'all',
												store : [['','']],
												anchor:'100%',
												mode:'local',
												listeners : {
													select : function(cbo,record,index) {
														var fm = Ext.getCmp('id.ukKnowTemplate.knowTmpRange.dicId');
														fm.setValue(cbo.value);
													}
												}
											}]
								}]

					}, {
						anchor : '100%',
//						layout : 'column',
						border : false,
//						xtype : 'panel',
						labelAlign : 'right',
						labelWidth : 70,
						items : [{
									xtype : 'panel',
									layout : 'form',
//									columnWidth : .9,
									border : false,
									anchor : '100%',
									labelAlign : 'right',
									labelWidth : 70,
									items : [{
										xtype : 'textarea',
										name : 'keyWord',
//										allowBlank : false,
										anchor : '100%',
										fieldLabel : '服务名称',
										height : 22
											// allowBlank : false,
										}]
								}]

					}, {
						fieldLabel : '描述',
						name : 'ukKnowTemplate.tmpDescribe',
						maxLength : 200,
						xtype : 'textarea',
						blankText : '模板描述不能为空!',
						anchor : '100%'
					}, {
						anchor : '100%',
						layout : 'column',
						border : false,
						xtype : 'panel',
						items : [{
									xtype : 'panel',
									layout : 'form',
									columnWidth : .5,
									border : false,
									items : [{
												fieldLabel : '启用时间',
												name : 'ukKnowTemplate.beginTime',
												id : 'ukKnowTemplate.beginTime',
												// allowBlank : false,
												editable : false,
												anchor : '100%',
												blankText : '启用时间不能为空!',
												xtype : 'datefield',
												format : 'Y-m-d'
											}]
								}, {
									xtype : 'panel',
									layout : 'form',
									columnWidth : .5,
									border : false,
									items : [{
												fieldLabel : '关闭时间',
												name : 'ukKnowTemplate.closeTime',
												id : 'ukKnowTemplate.closeTime',
												// allowBlank : false,
												editable : false,
												anchor : '100%',
												blankText : '关闭时间不能为空!',
												xtype : 'datefield',
												format : 'Y-m-d'
											}]
								},{
									xtype:'hidden',
									fieldLabel:'类型隐藏域',
									name : 'ukKnowTemplate.knowTmpType.dicId',
									id : 'id.ukKnowTemplate.knowTmpType.dicId'
								},{
									xtype:'hidden',
									fieldLabel:'类别隐藏域',
									name : 'ukKnowTemplate.knowTmpClass.dicId',
									id : 'id.ukKnowTemplate.knowTmpClass.dicId'
								},{
									xtype:'hidden',
									fieldLabel:'范围隐藏域',
									name : 'ukKnowTemplate.knowTmpRange.dicId',
									id : 'id.ukKnowTemplate.knowTmpRange.dicId'
								}]

					}
			// ,{
			// fieldLabel : '更新时间',
			// name : 'ukKnowTemplate.updateTime',
			// id : 'ukKnowTemplate.updateTime',
			// allowBlank : false,
			// editable : false,
			// anchor : '100%',
			// blankText : '更新时间不能为空!',
			// xtype : 'datefield',
			// format : 'Y-m-d'
			// }
			]
		});
		// 加载表单对应的数据
		if (this.knowTmpId != null && this.knowTmpId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/know/getUkKnowTemplate.do?knowTmpId='
						+ this.knowTmpId,
				root : 'data',
				preName : 'ukKnowTemplate',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					var parentId = thisObj.knowTmpType.tmpTypeId;
					if (parentId != null) {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/xitong/getSysTemType.do',
									// async : false,
									scope : this,
									params : {
										'tmpTypeId' : parentId
									},
									method : 'post',
									success : function(response) {
										var result = Ext.util.JSON
												.decode(response.responseText);
										var folderName = result.data.tmpTypeName;
										Ext.getCmp('knowTemplateTypeSelector')
												.setValue(folderName);
									}
								});
					}
				}
			});
		}
	},// end of the initcomponents

	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.getForm().reset();
	},
	cancels : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
//		var filename = Ext.getCmp('fileName').getValue();
//		var type = filename.substring(filename.lastIndexOf(".") + 1).trim();
//		if (type != 'vm') {
//			Ext.Msg.alert("请选择VM格式文件!");
//			return;
//		}
//		Ext.getCmp('uploadForm').getForm().submit({
//			scope : this,
//			url : __ctxPath + '/upload-file',
//			method : 'post',
//			params : {},
//			waitMsg : '正在提交数据...',
//			success : function(fp, action) {
//				filename = action.result.filename;
//				$postForm({
//					formPanel : this.formPanel,
//					scope : this,
//					url : __ctxPath + '/know/saveUkKnowTemplate.do',
//					callback : function(fp, action) {
//						var gridPanel = Ext.getCmp('UkKnowTemplateGrid');
//						var eform = Ext.getCmp('UkKnowTemplateFormWin');
//						if (gridPanel != null) {
//							gridPanel.getStore().reload();
//						}
//						this.close();
//						Ext.getCmp('UkKnowTemplateGrid').getStore().reload();// 重新加载list数据
//					}
//				});
//				}
//		})
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/know/saveUkKnowTemplate.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UkKnowTemplateGrid');
						var eform = Ext.getCmp('UkKnowTemplateFormWin');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
						Ext.getCmp('UkKnowTemplateGrid').getStore().reload();// 重新加载list数据
					}
				});
	}// end of save

});
