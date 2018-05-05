/*
 * 对音频的处理
 */

function dealSound() {

}

/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ConHuSunHuiFangDelForm
 * @extends Ext.Window
 * @description ConHis表单
 * @company 优创融联科技
 */
ConHuSunHuiFangDelForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConHuSunHuiFangDelForm.superclass.constructor.call(this, {
					id : 'ConHuSunHuiFangDelFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					// frame:true,
					// height : 400,
					autoHeigh : true,
					width : 500,
					maximizable : true,
					title : '呼损回访详细信息',
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
		var GridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			//rowActions : true,
			printable : false,
			exportable : false,
			id : 'PreConHushouGrid',
			url : __ctxPath + "/customer/listConHushou.do",
			fields : [{
						name : 'conId',
						type : 'int'
					}, 'origAni', 'origDnis', 'enterTime'],
			columns : [{
						header : 'conId',
						dataIndex : 'conId',
						hidden : true
					}, {
						header : '预约时间',
						isExp : false,
						dataIndex : 'origAni'
					}, {
						header : '预约号码',
						isExp : false,
						dataIndex : 'origDnis'
					}, {
						header : '备注',
						isExp : false,
						dataIndex : 'enterTime'

					}]
				// end of columns
			});
		this.formPanel = new Ext.FormPanel({
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll : true,
					labelAlign:'right',
					id : 'ConHuSunHuiFangDelForm',
					defaults : {
						anchor : '100%,100%'
					},
					// defaultType : 'textfield',
					items : [{
								layout : 'column',
								border : false,
								items : [{
											columnWidth : .33,
											layout : 'form',
											border : false,
											// xtype:'fieldset',
											// collapsible: false,
											// autoHeight:true,
											items : [{
														xtype : 'textfield',
														fieldLabel : '主叫',
														name : 'conHis.commPeson',
														anchor : '100%'
													},{
														xtype : 'textfield',
														fieldLabel : '重复次数',
														name : 'conHis.commPeson',
														anchor : '100%'
													}]
										}, {
											columnWidth : .33,
											layout : 'form',
											border : false,
											items : [{
														xtype : 'textfield',
														fieldLabel : '被叫',
														name : 'conHis.commPeson',
														anchor : '100%'
													},{
														xtype : 'textfield',
														fieldLabel : '客户',
														name : 'conHis.commPeson',
														anchor : '100%'
													}]
										}, {
											columnWidth : .33,
											layout : 'form',
											border : false,
											items : [{
														xtype : 'textfield',
														fieldLabel : '最后呼叫时间',
														name : 'conHis.commPeson',
														anchor : '100%'
													}]
										}]
							}, {
								fieldLabel : '呼叫明细',
								name : 'conHis.content',
								xtype : 'textarea',
								autoScroll : true,
								anchor:'99%',
								height : 100
							},{
								layout : 'column',
								border : false,
								items : [{
											columnWidth : .33,
											layout : 'form',
											border : false,
											// xtype:'fieldset',
											// collapsible: false,
											// autoHeight:true,
											items : [{
														xtype : 'textfield',
														fieldLabel : '分配时间',
														name : 'conHis.commPeson',
														anchor : '100%'
													}]
										}, {
											columnWidth : .33,
											layout : 'form',
											border : false,
											items : [{
														xtype : 'textfield',
														fieldLabel : '分配人',
														name : 'conHis.commPeson',
														anchor : '100%'
													}]
										}, {
											columnWidth : .33,
											layout : 'form',
											border : false,
											items : [{
														xtype : 'textfield',
														fieldLabel : '负责人',
														name : 'conHis.commPeson',
														anchor : '100%'
													}]
										}]
							},{
								xtype:'fieldset',
								title : "预约信息",
								collapsed : false,
								collapsible : true,
								layout:'form',
								autoHeight : true,
								defaults : {
									anchor : '100%,100%'
								},
								items:[GridPanel]
							},{
								xtype:'fieldset',
								title : "处理结果",
								collapsed : false,
								collapsible : true,
								layout:'form',
								autoHeight : true,
								defaults : {
									anchor : '100%,100%'
								},
								items:[ {
									layout:'column',
									border:false,
									items:[{
										layout:'form',
										columnWidth:.33,
										border:false,
										items:[{
											fieldLabel : "处理结果",
											xtype : 'mtdiccombo',
											editable : true,
											lazyInit : false,
											forceSelection : false,
											itemKey : 'CONLLJG',// 对应相对的联络结果
											anchor : '100%'
										}]
										
									},{
										layout:'form',
										columnWidth:.33,
										border:false,
										items:[{
												xtype : 'textfield',
												fieldLabel : "处理人",
												anchor : '100%',
												allowBlank : false,
												blankText : '请填写处理人	'
										}]
										
									}]
									
								}, {
									xtype : 'textarea',
									fieldLabel : "处理说明",
									// labelStyle: 'border:thick;background:blue;',
									anchor : '100%',
									height : 50
								}]
							}]
				});
		// 加载表单对应的数据
		if (this.conHisId != null && this.conHisId != 'undefined') {
			alert("sdf");
			this.formPanel.loadData({
						url : __ctxPath + '/customer/getConHis.do?conHisId='
								+ this.conHisId,
						root : 'data',
						preName : 'conHis'
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
		tabs.remove('ConHuSunHuiFangDelFormWin');// 移除创建的窗口
		// ConHuSunHuiFangDelForm.close();
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
/*
 * 原来的代码
 *  { name : 'conHis.conHisId', xtype : 'hidden', value : this.conHisId == null ? '' :
 * this.conHisId },{ name : 'cusLinkman.customerId', id : 'customerId', xtype :
 * 'hidden', value : this.customerName == null?'':this.customerName }, { xtype :
 * 'compositefield', fieldLabel : '所属客户*', items : [ { //fieldLabel : '所属客户<a
 * style="color:red;">*</a>',//这里要做得选择器添加时选择 xtype:'textfield', width:220,
 * readOnly:true, name : 'customerName', id : 'customerName' },{ xtype:'button',
 * name : 'custoemrSelect', id:'customerSelectButton', text:'选择客户',
 * iconCls:'btn-mail_recipient', handler:function(){
 * CustomerSelector.getView(function(customerId,customerName){
 * Ext.getCmp('customerId').setValue(customerId);
 * Ext.getCmp('customerName').setValue(customerName); },true).show(); } }] }, {
 * fieldLabel : '联系人ID', hiddenName : 'conHis.contactorId', xtype : 'combo',
 * editabel : false, lazyInit : false, triggerAction : 'all', store : new
 * Ext.data.SimpleStore({ autoLoad : true, url : __ctxPath +
 * '/financial/list.do', fields : ['contactorId', 'contactorIdName'], listeners : {
 * load : function() { var combo = Ext.getCmp('contactorId'); var store =
 * combo.getStore(); var rows = [];// 定义数组 for (var i = 0; i < store.getCount();
 * i++) { // store.getCount()为store的长度 if (store.getAt(i).data['contactorId'] ==
 * combo .getValue()) { combo .setValue(store.getAt(i).data['contactorIdName']);
 * break; } } } } }), displayField : 'contactorIdName', valueField :
 * 'contactorId', id : 'contactorId' }, { fieldLabel : '来源类别&CONLYLB',
 * hiddenName : 'conHis.srcTypeId', xtype : 'mtdiccombo', editable : true,
 * lazyInit : false, forceSelection : false, itemKey : 'CONLYLB' }, { fieldLabel :
 * '方向', name : 'conHis.dirId', allowBlank : false, xtype : 'numberfield' }, {
 * fieldLabel : '联系类型&CONLXLX', hiddenName : 'conHis.contactTypeId', allowBlank :
 * false, xtype : 'mtdiccombo', editable : true, lazyInit : false,
 * forceSelection : false, itemKey : 'CONLXLX' }
 *  , { fieldLabel : '区号/地区号', name : 'conHis.preContactNum', maxLength : 256 }
 *  , { fieldLabel : '号码/详细地址', name : 'conHis.mainContactNum', allowBlank :
 * false, maxLength : 256 }
 *  , { fieldLabel : '分机号/邮编', name : 'conHis.lastContactNum', maxLength : 256 }
 *  , { fieldLabel : '开始时间', name : 'conHis.staTime', xtype : 'datefield',
 * format : 'Y-m-d', value : new Date() }
 *  , { fieldLabel : '结束时间', name : 'conHis.endTime', xtype : 'datefield',
 * format : 'Y-m-d', value : new Date() }
 *  , { fieldLabel : '联络事项&CONLLSX', hiddenName : 'conHis.busTypId', xtype :
 * 'mtdiccombo', editable : true, lazyInit : false, forceSelection : false,
 * itemKey : 'CONLLSX' }
 *  , { fieldLabel : '联络结果&CONLLJG', hiddenName : 'conHis.conResId', xtype :
 * 'mtdiccombo', editable : true, lazyInit : false, forceSelection : false,
 * itemKey : 'CONLLJG' }
 *  , { fieldLabel : '联络结果备注', name : 'conHis.conResRemarks', xtype :
 * 'textarea', maxLength : 2000 }
 *  , { fieldLabel : '联络内容', name : 'conHis.content', xtype : 'textarea',
 * maxLength : 2000 }
 *  , { fieldLabel : '处理状态&CONCLZT', hiddenName : 'conHis.dealStaId', xtype :
 * 'mtdiccombo', editable : true, lazyInit : false, forceSelection : false,
 * itemKey : 'CONCLZT' }
 *  , { fieldLabel : '备注', name : 'conHis.remarks', xtype : 'textarea',
 * maxLength : 2000 }
 *  , { fieldLabel : '负责人', name : 'conHis.ownerId', xtype : 'numberfield' }
 *  , { fieldLabel : '状态&CONZT', hiddenName : 'conHis.statusId', allowBlank :
 * false, xtype : 'mtdiccombo', editable : true, lazyInit : false,
 * forceSelection : false, itemKey : 'CONZT' }
 * 
 * 
 * 
 */