/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UkKnowDingyueForm
 * @extends Ext.Window
 * @description UkKnowDingyue表单
 * @company 优创融联科技
 */
UkKnowDingyueManageForm = Ext.extend(Ext.Panel, {
	//构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		//必须先初始化组件
		this.initUIComponents();
		UkKnowDingyueManageForm.superclass.constructor.call(this, {
					id : 'UkKnowDingyueManageFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : __ukKnowDingyueDetailHeading,
					buttonAlign : 'center',
					tbar : this.initToolbar()
				});
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			id : 'UkKnowDingyueManageForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'ukKnowDingyue.dingyueId',
						xtype : 'hidden',
						value : this.dingyueId == null ? '' : this.dingyueId
					}, {
						fieldLabel : __ukKnowDingyueKnowTypeId,
						hiddenName : 'ukKnowDingyue.knowTypeId',
						id : 'ukKnowDingyue.knowTypeId',
						name : 'ukKnowDingyue.knowTypeId',
						xtype : 'combo',
						readOnly : this.dingyueId==null?false:true,
						editabel : false,
						allowBlank : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/know/comboUkKnowType.do',
							fields : ['knowTypeId', 'knowTypeIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('ukKnowDingyue.knowTypeId');
									var store = combo.getStore();
									var rows = [];//定义数组
									for (var i = 0; i < store.getCount(); i++) { //store.getCount()为store的长度
										if (store.getAt(i).data['knowTypeId'] == combo.getValue()) {
											combo.setValue(store.getAt(i).data['knowTypeIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'knowTypeIdName',
						valueField : 'knowTypeId',
						listeners : {
							select : function(cbo,record, index) {
								var fm = Ext.getCmp('UkKnowDingyueManageForm');
								fm.getCmpByName('ukKnowDingyue.knowTypeId').setValue(cbo.value);

							}
						}
					}, {
						fieldLabel : __ukKnowDingyueBusiType,
						hiddenName : 'ukKnowDingyue.busiType',
						id : 'ukKnowDingyue.busiType',
						xtype : 'mtdiccombo',
						editable : false,
						lazyInit : false,
						allowBlank : false,
						forceSelection : false,
						itemKey : 'BUSI_TYPE'
					}, {
						fieldLabel : __ukKnowDingyueDesCribe,
						name : 'ukKnowDingyue.desCribe',
						id : 'ukKnowDingyue.desCribe',
						xtype : 'textarea',
						maxLength : 300
					}, {
						fieldLabel : __ukKnowDingyueUserid,
						name : 'ukKnowDingyue.userName',
						readOnly : true,
						xtype :  this.dingyueId==null?'hidden':'textfield'
					}
			]
		});
		//加载表单对应的数据	
		if (this.dingyueId != null && this.dingyueId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/know/getUkKnowDingyue.do?dingyueId='
								+ this.dingyueId,
						root : 'data',
						preName : 'ukKnowDingyue',
						success : function(response, options) {
							var thisObj = Ext.util.JSON.decode(response.responseText).data;
							Ext.getCmp('ukKnowDingyue.busiType').setValue(thisObj.busiType);
						},
						failure : function(){
							Ext.ux.Toast.msg(__toastMessage, __operationFailed);
						}
					});
		}

	},//end of the initcomponents

	/**
	 * 重置
	 * @param {} formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * @param {} window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('UkKnowDingyueManageFormWin');
		this.destroy();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/know/saveUkKnowDingyue.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UkKnowDingyueManageGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('UkKnowDingyueManageFormWin');
						this.destroy();
					}
				});
	}//end of save

});

UkKnowDingyueManageForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : [ '->', {
							iconCls : 'btn-cancel',
							text : __cancel,
							xtype : 'button',
							scope : this,
							handler : this.cancel
//						},'->', {
//							iconCls : 'btn-reset',
//							text : __reset,
//							xtype : 'button',
//							scope : this,
//							handler : this.reset
						},'->', {
							iconCls : 'btn-save',
							text : __save,
							xtype : 'button',
							scope : this,
							handler : this.save
						}]
			});
	return toolbar;
}
