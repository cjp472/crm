/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QcTargetForm
 * @extends Ext.Window
 * @description QcTarget表单
 * @company 优创融联科技
 */
QcTargetPreviewForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QcTargetForm.superclass.constructor.call(this, {
					id : 'QcTargetPreviewFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '考核指标详细信息',
					buttonAlign : 'center'
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					labelAlign : 'right',
					autoScroll : true,
					// id : 'QcTargetForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
								name : 'qcTarget.tarId',
								xtype : 'hidden',
								value : this.tarId == null ? '' : this.tarId
							}

							, {
								fieldLabel : '标题',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textarea',
								maxLength : 512,
							    readOnly:true
							}

							, {
								fieldLabel : '描述',
								name : 'qcTarget.tarContent',
								xtype : 'textarea',
								maxLength : 2048,
								readOnly:true
							}

							, {
								fieldLabel : '备注',
								name : 'qcTarget.remark',
								xtype : 'textarea',
								maxLength : 2048,
								readOnly:true
							}/*, {
								layout : 'column',
								xtype:'panel',
								border : false,
								items : [{
											columnWidth : .33,
											layout : 'form',
											border:false,
											items : [{
														fieldLabel : '创建人',
														name : 'qcTarget.username1',
														allowBlank : false,
														maxLength : 20,
														xtype : 'textfield',
														anchor:'100%'
													}, {
														fieldLabel : '修改人',
														name : 'qcTarget.username2',
														maxLength : 20,
														xtype:'textfield',
														anchor:'100%'
													}]
										}, {
											columnWidth : .33,
											layout : 'form',
											border:false,
											items : [{
														fieldLabel : '创建日期',
														name : 'qcTarget.creDat',
														allowBlank : false,
														xtype:'textfield',
														anchor:'100%'
													}, {
														fieldLabel : '修改日期',
														name : 'qcTarget.updDat',
														maxLength : 20,
														xtype:'datefield',
														anchor:'100%'
													}]
										}, {
											columnWidth : .33,
											layout : 'form',
											border:false,
											items : [{
														border : false,
														xtype : 'panel',
														height : 26,
														html : ''

													},
													{
								fieldLabel : '状态',
								id : 'staId',
								hiddenName : 'qcTarget.staId',
								displayField : 'itemName',
								valueField : 'itemId',
								xtype : 'combo',
								mode : 'local',
								anchor:'100%',
								editable : false,
								allowBlank : false,
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
									url : __ctxPath
											+ '/system/loadItemDictionary.do',
									baseParams : {
										itemName : '分类状态'
									},
									fields : ['itemId', 'itemName'],
									autoLoad : true,
									method : "post",
									anchor:'100%',
									listeners : {
										load : function() {
											var combo = Ext.getCmp('staId');
											var store = combo.getStore();
											var rows = [];// 定义数组
											for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
												if (store.getAt(i).data['itemId'] == combo.getValue()) {
													combo.setValue(store.getAt(i).data['itemName']);
													break;
												}
											}

										}
									}
								})
							}]
										}]
							}*/
					]
				});
		// 加载表单对应的数据
		if (this.tarId != null && this.tarId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/qucon/getQcTarget.do?tarId='
								+ this.tarId,
						root : 'data',
						preName : 'qcTarget'
					});
		}

	}// end of the initcomponents
});