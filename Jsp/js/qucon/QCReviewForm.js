/*
 * 对音频的处理
 */

function dealSound() {

}

/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QCReviewForm
 * @extends Ext.Window
 * @description ConHis表单
 * @company 优创融联科技
 */
QCReviewForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QCReviewForm.superclass.constructor.call(this, {
					id : 'QCReviewFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					// frame:true,
					// height : 400,
					autoHeigh : true,
					width : 500,
					maximizable : true,
					title : '质检考核详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : '考核',
								iconCls : 'btn-showDetail',
								scope : this,
								handler : function(){
							
									QcTemplateSelector.getView(function(data){

										var tabs = Ext.getCmp('centerTabPanel');
										var aForm = Ext.getCmp('QCAuditForm');
										if (aForm != null) {
											tabs.remove('QCAuditForm');
										}
										aForm = new QCAuditForm({
											tempId : data.qcTemplate.tmpId,
											tempReleId : data.tempReleId,
											toUseid : Ext.getCmp('ownerId').getValue()
										});
										tabs.add(aForm);
										tabs.activate(aForm);
									}, true).show();
								}
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
		this.gridPanel = new HT.GridPanel({
			autoHeight : false,
			height : 125,
			clicksToEdit : 1,
			id : 'UlSpecialGrid_empl',
			url : __ctxPath
					+ "/customer/listCusContact.do?Q_customer.customerId_L_EQ=",
			fields : [{
						name : 'contactId',
						type : 'int'
					}, 'cusContact', 'contactTypeId', 'contactSubTypeId',
					'preContactNum', 'mainContactNum', 'lastContactNum',
					'isDefault', 'isChecked', 'contactRemarks', 'createTime',
					'lastUpdateTime', 'statusId'],
			columns : [{
						header : '业务类型',
						dataIndex : 'cusContact.contactId',
						hidden : true
					}, {
						header : '处理人',
						dataIndex : 'mainContactNum'
					}, {
						header : '要求完成时间',
						dataIndex : 'mainContactNum'
					}, {
						header : '完成时间',
						dataIndex : 'mainContactNum'
					}, {
						header : '业务编号',
						dataIndex : 'mainContactNum'
					}]
				// end of columns
			}); 
		this.formPanel = new Ext.FormPanel({
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			id : 'QCReviewForm',
			labelAlign : 'right',
			defaults : {
				anchor : '98%,98%'
			},
			// defaultType : 'textfield',
			items : [{
				layout : 'column',
				border : false,
				items : [{
					columnWidth : .333,
					layout : 'form',
					border : false,
					// xtype:'fieldset',
					// collapsible: false,
					// autoHeight:true,
					items : [{
								name : 'conHis.conHisId',
								xtype : 'hidden',
								id : 'conHisId',
								value : this.conHisId == null
										? ''
										: this.conHisId
							}, {
								name : 'conHis.statusId',
								xtype : 'hidden',
								id : 'statusId'
							}, {
								name : 'conHis.ownerId',
								xtype : 'hidden',
								id : 'ownerId'
							}, {
								name : 'conHis.customer.customerId',
								xtype : 'hidden',
								id : 'cusId'
							}, {
								name : 'conHis.statusId',
								xtype : 'hidden',
								id : 'statusId'
							}, {
								xtype : 'hidden',
								name : 'conHis.contactTypeId',
								id : 'conHis.contactTypeId_hid'
							}, {
								xtype : 'textfield',
								fieldLabel : '联络方式',
								id : 'conHis.contactTypeId_form',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								readOnly : true,
								forceSelection : false,
								itemKey : 'LXFS001',// 对应到相应的联络方式
								anchor : '100%',
								store : getDicStore('联络方式',
										'conHis.contactTypeId_form'),
								listeners : getDicListeners(
										'conHis.contactTypeId_form',
										'conHis.contactTypeId')
							}, {
								xtype : 'textfield',
								fieldLabel : '联系人',
								editable : false,
								readOnly : true,
								id : 'conHis.cusLinkman_form',
								name : 'conHis.cusLinkman',
								anchor : '100%'
							}]
				}, {
					columnWidth : .33,
					layout : 'form',
					border : false,
					items : [{
								xtype : 'hidden',
								name : 'conHis.dirId',
								id : 'conHis.dirId_hid'
							}, {
								fieldLabel : '方向',
								id : 'conHis.dirId_form',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								readOnly : true,
								forceSelection : false,
								itemKey : 'CONFX',
								anchor : '100%',
								store : getDicStore('方向', 'conHis.dirId_form'),
								listeners : getDicListeners(
										'conHis.dirId_form', 'conHis.dirId')
							}, {
								fieldLabel : '开始时间',
								name : 'conHis.staTime',
								anchor : '100%',
								readOnly : true,
								xtype : 'datetimefield',
								editable : false,
								format : 'Y-m-d H:i:s',
								allowBlank : false,
								value : new Date()
							}]
				}, {
					columnWidth : .33,
					border : false,
					layout : 'form',
					items : [{
								xtype : 'hidden',
								name : 'conHis.srcTypeId',
								id : 'conHis.srcTypeId_hid'
							}, {
								fieldLabel : '来源',
								id : 'conHis.srcTypeId_form',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								readOnly : true,
								forceSelection : false,
								itemKey : 'CONLYLB',
								anchor : '100%',
								store : getDicStore('来源',
										'conHis.srcTypeId_form'),
								listeners : getDicListeners(
										'conHis.srcTypeId_form',
										'conHis.srcTypeId')
							}, {
								xtype : 'datetimefield',
								format : 'Y-m-d H:i:s',
								allowBlank : false,
								editable : false,
								readOnly : true,
								fieldLabel : '截止时间',
								name : 'conHis.endTime',
								anchor : '100%',
								value : new Date()
							}]
				}]
			}, {
				xtype : 'textfield',
				fieldLabel : "地址",
				editable : false,
				readOnly : true,
				name : 'conHis.mainContactNum',
				anchor : '99%'
			}, {
				xtype : 'hidden',
				name : 'conHis.busTypId',
				id : 'conHis.busTypId_hid'
			}, {
				xtype : 'mtdiccombo',
				id : 'conHis.busTypId_form',
				editable : true,
				lazyInit : false,
				readOnly : true,
				forceSelection : false,
				itemKey : 'CONLLSX',
				fieldLabel : "联络事项",
				anchor : '33%',
				store : getDicStore('来源', 'conHis.busTypId_form'),
				listeners : getDicListeners('conHis.busTypId_form',
						'conHis.busTypId')
			}, {
				fieldLabel : '联络内容',
				name : 'conHis.content',
				xtype : 'displayfield',
				autoScroll : true,
				readOnly : true,
				anchor : '99%',
				layout : 'form',
				value : '<img src="images/a.jpg" />',
				// value : '<a href="#" >录音.mp3</a><input
				// type="button" value="播放"
				// onclick=soundManager.play("systemSound") />'
				// +
				// '<input type="button" value="暂停"
				// onclick=soundManager.pause("systemSound") />'
				// +
				// '<input type="button" value="继续"
				// onclick=soundManager.togglePause("systemSound")
				// />',
				height : 50
			}, {
				xtype : 'textarea',
				fieldLabel : "备注",
				name : 'conHis.remarks',
				anchor : '99%',
				autoScroll : true,
				readOnly : true,
				height : 50
			}, {
				xtype : 'hidden',
				name : 'conHis.conResId',
				id : 'conHis.conResId_hid'
			}, {
				xtype : 'fieldset',
				title : '联络结果',
				collapsible : true,
				items : [{
					layout : 'column',
					border : false,
					items : [{
						columnWidth : .33,
						layout : 'form',
						border : false,
						items : [{
							fieldLabel : "联络结果",
							id : 'conHis.conResId_form',
							xtype : 'mtdiccombo',
							readOnly : true,
							editable : true,
							lazyInit : false,
							forceSelection : false,
							itemKey : 'CONLLJG',// 对应相对的联络结果
							anchor : '100%',
							store : getDicStore('联络结果', 'conHis.conResId_form'),
							listeners : getDicListeners('conHis.conResId_form',
									'conHis.conResId')
						}]

					}, {
						columnWidth : .33,
						layout : 'form',
						border : false,
						items : [{
							fieldLabel : "处理状态",
							id : 'conHis.dealStaId_form',
							xtype : 'mtdiccombo',
							readOnly : true,
							editable : true,
							lazyInit : false,
							forceSelection : false,
							itemKey : 'CONCLZT',// 对应相对的处理状态
							anchor : '100%',
							store : getDicStore('处理状态', 'conHis.dealStaId_form'),
							listeners : getDicListeners(
									'conHis.dealStaId_form', 'conHis.dealStaId')
						}]

					}]
				}, {
					xtype : 'hidden',
					name : 'conHis.dealStaId',
					id : 'conHis.dealStaId_hid'
				}, {
					xtype : 'textarea',
					fieldLabel : "处理说明",
					name : 'conHis.conResRemarks',
					readOnly : true,
					anchor : '100%',
					height : 50
				}, {
					xtype : 'textfield',
					fieldLabel : "负责人",
					id : 'conHis.owner_form',
					name : 'conHis.owner',
					anchor : '33%',
					readOnly : true,
					allowBlank : true
				}]
			},{
				xtype:'fieldset',
				title:'服务历史',
				collapsible:true,
				items:[this.gridPanel]
				
			}]
		});
		// 加载表单对应的数据
		if (this.conHisId != null && this.conHisId != 'undefined') {
			// alert("sdf");
			this.formPanel.loadData({
				url : __ctxPath + '/customer/getConHis.do?conHisId='
						+ this.conHisId,
				root : 'data',
				preName : 'conHis',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					Ext.getCmp('conHis.contactTypeId_form')
							.setValue(thisObj.contactTypeId);
					Ext.getCmp('conHis.dirId_form').setValue(thisObj.dirId);
					Ext.getCmp('conHis.srcTypeId_form')
							.setValue(thisObj.srcTypeId);
					Ext.getCmp('conHis.busTypId_form')
							.setValue(thisObj.busTypId);
					Ext.getCmp('conHis.conResId_form')
							.setValue(thisObj.conResId);
					Ext.getCmp('conHis.dealStaId_form')
							.setValue(thisObj.dealStaId);

					Ext.getCmp('conHis.cusLinkman_form')
							.setValue(thisObj.cusLinkman.fullname);
					Ext.getCmp('conHis.owner_form')
							.setValue(thisObj.owner.fullname);

				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
			});
		} else {
			Ext.getCmp('statusId').setValue(1);
			Ext.getCmp('ownerId').setValue(1);
			Ext.getCmp('cusId').setValue(1);
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
		tabs.remove('QCReviewFormWin');// 移除创建的窗口
		// QCReviewForm.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveConHis.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ConHisGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						// this.close();
					}
				});
	}// end of save

});

function getDicStore(name, id) {
	return new Ext.data.SimpleStore({
				url : __ctxPath + '/system/loadItemDictionary.do',
				baseParams : {
					itemName : name
				},
				fields : ['itemId', 'itemName'],
				autoLoad : true,
				method : "post",
				listeners : {
					load : function() {
						var combo = Ext.getCmp(id);
						var store = combo.getStore();
						var rows = [];// 定义数组
						for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
							if (store.getAt(i).data['itemId'] == combo
									.getValue()) {
								combo.setValue(store.getAt(i).data['itemName']);
								break;
							}
						}
					}
				}
			})
};

function getDicListeners(comId, hidName) {
	return {
		select : function(cbo, record, index) {
			var fm = Ext.getCmp(comId);
			Ext.getCmp(hidName + '_hid').setValue(cbo.value);
		}
	}
};