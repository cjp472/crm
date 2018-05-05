/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QcTemplateForm
 * @extends Ext.Window
 * @description QcTemplate表单
 * @company 优创融联科技
 */
QcTemplateForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QcTemplateForm.superclass.constructor.call(this, {
					id : 'QcTemplateFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '考核模板详细信息',
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
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign:'right',
			defaults : {
				anchor : '98%,98%'
			},
			items : [{
				name : 'qcTemplate.tmpId',
				xtype : 'hidden',
				value : this.tmpId == null ? '' : this.tmpId
			}, {
				layout : 'column',
				border : false,
				items : [{
					columnWidth : .66,
					border : false,
					layout : 'form',
					items : [{
						fieldLabel : '名称',
						xtype:'textfield',
						name : 'qcTemplate.tmpName',
						allowBlank : false,
						maxLength : 256,
						anchor:'100%'
					}]
				}, {
					name : 'qcTemplate.chkTypeId',
					id : 'qcTemplate.chkTypeId_hid',
					xtype : 'hidden'
				},{
					columnWidth : .34,
					border : false,
					layout : 'form',
					items : [{
						fieldLabel : '考评方式',
						allowBlank : false,
						id : 'qcTemplate.chkTypeId_form',
						displayField : 'itemName',
						valueField : 'itemId',
						xtype : 'combo',
						mode : 'local',
						disabled : true,//编辑时，不能修改
						triggerAction : 'all',
						width : '100px',
						forceSelection : false,
						store : this.getDicStore('考评方式','qcTemplate.chkTypeId'),
						listeners : this.getDicListeners('qcTemplate.chkTypeId_form','qcTemplate.chkTypeId')
					}]
				}]
			}, {
				fieldLabel : '描述',
				name : 'qcTemplate.tmpContent',
				xtype : 'textarea',
				maxLength : 2048,
				anchor:'98%'
			}, {
				name : 'qcTemplate.allowRemark',
				id : 'qcTemplate.allowRemark_hid',
				xtype : 'hidden'
			},{
				name : 'qcTemplate.allowRecheck',
				id : 'qcTemplate.allowRecheck_hid',
				xtype : 'hidden'
			},{
				name : 'qcTemplate.allowTarRemark',
				id : 'qcTemplate.allowTarRemark_hid',
				xtype : 'hidden'
			}, {
				layout : 'column',
				border : false,
				items : [{
					columnWidth : .33,
					border : false,
					layout : 'form',
					items : [{
						fieldLabel : '是否备注',
						allowBlank : false,
						id : 'qcTemplate.allowRemark_form',
						displayField : 'itemName',
						valueField : 'itemId',
						xtype : 'combo',
						mode : 'local',
						triggerAction : 'all',
						width : '100px',
						forceSelection : false,
						store : this.getDicStore('是否','qcTemplate.allowRemark'),
						listeners : this.getDicListeners('qcTemplate.allowRemark_form','qcTemplate.allowRemark')}]
					}, {
					columnWidth : .33,
					border : false,
					layout : 'form',
					items : [{
						fieldLabel : '是否复议',
						allowBlank : false,
						id : 'qcTemplate.allowRecheck_form',
						displayField : 'itemName',
						valueField : 'itemId',
						xtype : 'combo',
						mode : 'local',
						triggerAction : 'all',
						width : '100px',
						forceSelection : false,
						store : this.getDicStore('是否','qcTemplate.allowRecheck'),
						listeners : this.getDicListeners('qcTemplate.allowRecheck_form','qcTemplate.allowRecheck')}]
				},{
					columnWidth : .33,
					border : false,
					layout : 'form',
					items : [{
						fieldLabel : '是否说明',
						allowBlank : false,
						id : 'qcTemplate.allowTarRemark_form',
						displayField : 'itemName',
						valueField : 'itemId',
						xtype : 'combo',
						mode : 'local',
						triggerAction : 'all',
						width : '100px',
						forceSelection : false,
						store : this.getDicStore('是否','qcTemplate.allowTarRemark'),
						listeners : this.getDicListeners('qcTemplate.allowTarRemark_form','qcTemplate.allowTarRemark')}]
				}]
			}, {
				layout : 'column',
				border : false,
				items : [{
						columnWidth : .33,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '基础分',
												name : 'qcTemplate.baseScore',
												id : 'baseScore',
												xtype:'textfield',
												allowBlank : false,
												anchor:'100%'
											}]

								}, {
									columnWidth : .33,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '最低分',
												name : 'qcTemplate.minScore',
												xtype:'textfield',
												id : 'minScore',
												allowBlank : false,
												anchor:'100%'
											}]

								}, {
									columnWidth : .34,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '最高分',
												name : 'qcTemplate.maxScore',
												xtype:'textfield',
												id : 'maxScore',
												allowBlank : false,
												anchor:'100%'
											}]

								}]

					}, {
						fieldLabel : '备注',
						name : 'qcTemplate.remark',
						xtype : 'textarea',
						maxLength : 2048,
						anchor:'98%'
					}]
				});
		// 加载表单对应的数据
		if (this.tmpId != null && this.tmpId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/qucon/getQcTemplate.do?tmpId=' + this.tmpId,
				root : 'data',
				preName : 'qcTemplate'
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
		tabs.remove('QcTemplateFormWin');
		this.destroy();
	},
	/**
	 * 验证输入的数字
	 */
	validateScore : function(){
		var base = Number(Ext.getCmp('baseScore').getValue());
		var min = Number(Ext.getCmp('minScore').getValue()); 
		var max = Number(Ext.getCmp('maxScore').getValue());
		if(isNaN(base) || isNaN(min) || isNaN(max) ){
			Ext.ux.Toast.msg('操作信息', '分值项必须为数字!');
			return false;
		}
		if(min > max){
			Ext.ux.Toast.msg('操作信息', '最高分必须大于最低分!');
			return false;
		}
		if(base < min || base > max){
			Ext.ux.Toast.msg('操作信息', '基础分必须在最低分和最高分之间!');
			return false;
		}
		return true;
	},
	/**
	 * 保存记录
	 */
	save : function() {
		if(this.validateScore() == false){
			return;
		}
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/qucon/saveQcTemplate.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('QcTemplateGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('QcTemplateFormWin');
						this.destroy();
					}
				});
	},// end of save
	getDicStore : function(name, id) {
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
					var combo = Ext.getCmp(id+'_form');
					var store = combo.getStore();
					var hid_value = Ext.getCmp(id+'_hid');
					var rows = [];// 定义数组
					for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
						if (store.getAt(i).data['itemId'] == hid_value.getValue()) {
							combo.setValue(store.getAt(i).data['itemName']);
							break;
						}
					}
				}
			}
		})
	},

	getDicListeners : function(comId, hidName){
		return {
			select : function(cbo,record,index) {
				var fm = Ext.getCmp(comId);
				Ext.getCmp(hidName+'_hid').setValue(cbo.value);
			}
		}
	},
});