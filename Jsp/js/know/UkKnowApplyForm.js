/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UkKnowApplyForm
 * @extends Ext.Window
 * @description 知识申请表单
 * @company 优创融联科技
 */
UkKnowApplyForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UkKnowApplyForm.superclass.constructor.call(this, {
					id : 'UkKnowApplyFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : __ukKnowApplyDetailHeading,
					buttonAlign : 'center',
					tbar : this.initToolbar()
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:5px',
			border : false,
			autoScroll : true,
			// id : 'UkKnowApplyForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'ukKnowApply.applyId',
						xtype : 'hidden',
						value : this.applyId == null ? '' : this.applyId
					}, {
						xtype : 'fieldset',
						title : __ukKnowApplyBasicInfo,
						// defaultType : 'textfield',
						layout : 'form',
						defaults : {
							anchor : '100%,100%'
						},
						items : [{
							layout : "column",
							xtype : 'container',
							defaults : {
								border : false
							},
							items : [{
								columnWidth : .5,
								layout : "form",
								items : [{
											fieldLabel : __ukKnowApplyApplyUserid, // 申请人
											name : 'ukKnowApply.applyUserid',
											allowBlank : false,
											width : 400,
											maxLength : 50,
											xtype : 'textfield',
											readOnly : true,
											value : curUserInfo.fullname
										}]
							}, {
								columnWidth : .5,
								layout : "form",
								border : false,
								items : [{
											fieldLabel : __ukKnowApplyApplyTime, // 申请时间
											name : 'ukKnowApply.applyTime',
											width : 400,
											maxLength : 50,
											allowBlank : false,
											xtype : 'datefield',
											format : 'Y-m-d',
											value : new Date(),
											readOnly : true
										}]
							}]
						}, {
							layout : "column",
							xtype : 'container',
							defaults : {
								border : false
							},
							items : [{
								columnWidth : .5,
								layout : "form",
								items : [{
											fieldLabel : __ukKnowApplyRequireTime, // '要求完成时间',
											name : 'ukKnowApply.requireTime',
											allowBlank : false,
											width : 400,
											maxLength : 50,
											xtype : 'datefield',
											format : 'Y-m-d',
											value : new Date()
										}]
							}, {
								columnWidth : .5,
								layout : "form",
								border : false,
								items : [{
											fieldLabel : __ukKnowApplyApplyType, // 事项
											name : 'ukKnowApply.applyType',
											width : 400,
											maxLength : 50,
											allowBlank : false,
											xtype : 'numberfield'
										}]
							}]
						}, {
							layout : "column",
							xtype : 'container',
							defaults : {
								border : false
							},
							items : [{
								columnWidth : 1,
								layout : "form",
								items : [{
											fieldLabel : __ukKnowApplyApplyDescribe, // '说明',
											name : 'ukKnowApply.applyDescribe',
											xtype : 'textarea',
											width : 905,
											allowBlank : false,
											maxLength : 300
										}]
							}]
						}]
					}, {
						xtype : 'fieldset',
						title : __ukKnowApplyCollContent, // '采集内容',
						// defaultType : 'textfield',
						layout : 'form',
						defaults : {
							anchor : '100%,100%'
						},
						items : [{
							layout : "column",
							xtype : 'container',
							defaults : {
								border : false
							},
							items : [{
								columnWidth : .3,
								layout : "form",
								items : [ {
											fieldLabel : __ukKnowApplyBusiType,
											id : 'ukKnowApply.busiType',
											hiddenName : 'ukKnowApply.busiType',
											displayField : 'itemName',
											valueField : 'itemId',
											xtype : 'combo',
											mode : 'local',
											editable : false,
											allowBlank : false,
											triggerAction : 'all',
											store : new Ext.data.SimpleStore({
												url : __ctxPath
														+ '/system/loadItemByTypeDictionary.do',
												baseParams : {
													proTypeId : 10342
												},
												fields : ['itemId', 'itemName'],
												autoLoad : true,
												method : "post",
												listeners : {
													load : function() {
														var combo = Ext
																.getCmp('ukKnowApply.busiType');
														var store = combo
																.getStore();
														var rows = [];// 定义数组
														for (var i = 0; i < store
																.getCount(); i++) { // store.getCount()为store的长度
															if (store.getAt(i).data['itemId'] == combo
																	.getValue()) {
																combo
																		.setValue(store
																				.getAt(i).data['itemName']);
																break;
															}
														}

													}
												}
											})
										}]
							}, {
								columnWidth : .7,
								layout : "form",
								items : [{
											fieldLabel : __ukKnowApplyApplyTitle, // '标题',
											name : 'ukKnowApply.applyTitle',
											maxLength : 30,
											allowBlank : false,
											xtype : 'textfield',
											width : 600
										}]
							}]
						}, {
							layout : "column",
							xtype : 'container',
							defaults : {
								border : false
							},
							items : [{
								columnWidth : 1,
								layout : "form",
								items : [{
											fieldLabel : __ukKnowApplyApplyContent,// '内容',
											name : 'ukKnowApply.applyContent',
											xtype : 'textarea',
											width : 903,
											allowBlank : false,
											maxLength : 300
										}]
							}]
						}, {
							layout : "column",
							xtype : 'container',
							defaults : {
								border : false
							},
							items : [{
								columnWidth : 1,
								layout : "form",
								items : [{
											fieldLabel : __ukKnowApplyApplyComment, // '备注',
											name : 'ukKnowApply.applyComment',
											xtype : 'textarea',
											width : 903,
											maxLength : 300
										}]
							}]
						}]
					}

					, {
						fieldLabel : 'RUNID',
						name : 'ukKnowApply.runid',
						xtype : 'hidden'
					}

			]
		});
		// 加载表单对应的数据
		if (this.applyId != null && this.applyId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/know/getUkKnowApply.do?applyId='
								+ this.applyId,
						root : 'data',
						preName : 'ukKnowApply'
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
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('UkKnowApplyFormWin');
		this.destroy();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/know/saveUkKnowApply.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UkKnowApplyGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('UkKnowApplyFormWin');
					}
				});
	}// end of save

});

/**
 * 顶部保存 取消按钮()
 * 
 * @return {}
 */

UkKnowApplyForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : ['->', {
							text : __cancel,
							iconCls : 'btn-cancel',
							scope : this,
							handler : this.cancel
						}, '->', {
							text : __save,
							iconCls : 'btn-save',
							scope : this,
							handler : this.save
						}
				// , {
				// text : __reset,
				// iconCls : 'btn-reset',
				// scope : this,
				// handler : this.reset
				// }
				]
			});
	return toolbar;
}