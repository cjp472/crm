/**
 * @author : chenfeng
 * @createtime
 * @class BmBillNumForm
 * @extends Ext.Window
 * @description BmBillNum表单
 * @company 北京灵信互动信息技术有限公司
 */
BmBillNumForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BmBillNumForm.superclass.constructor.call(this, {
					id : 'BmBillNumFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 500,
					width : 500,
					maximizable : true,
					title : '单据号详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : '清空',
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		
		checkOrgName = function(){
						 var prefix = Ext.get('prefix').dom.value;
						 var billNumId = Ext.get('billNumId').dom.value;
						 Ext.Ajax.request({
						    url : __ctxPath + '/financial/listBmBillNum.do',
						    params : {
						     'Q_prefix_S_FK' : prefix,
						     'Q_billNumId_L_NEQ' : billNumId
						    },
						       success : function(form, action) {
							    var info = Ext.decode(form.responseText);
								if(info.totalCounts>0)
							    	Ext.getCmp('prefix').markInvalid('已经存在的前缀');
							    else if(!/\W/.test(prefix))
							     	Ext.getCmp('prefix').clearInvalid(true);
							    else
							     	Ext.getCmp('prefix').markInvalid('请输入英文字母或是数字,其它字符是不允许的.');
							   }
						   });
						}
              checkZeroLogo = function(){
						 var zeroLogo = Ext.get('zeroLogo').dom.value;
						 var isYear = Ext.get('isYear').dom.value;
						 var isMonth = Ext.get('isMonth').dom.value;
						 var isDay = Ext.get('isDay').dom.value;
						 if(zeroLogo=='年'&&isYear=='否'&&isMonth=='否'&&isDay=='否'){
					    	 Ext.getCmp('zeroLogo').markInvalid('流水号按年归零会出现重号');Ext.ux.Toast.msg('操作信息', '流水号按年归零会出现重号！');
						 }else if(zeroLogo=='月'&&isMonth=='否'&&isDay=='否'){
					     	 Ext.getCmp('zeroLogo').markInvalid('流水号按月归零会出现重号');Ext.ux.Toast.msg('操作信息', '流水号按月归零会出现重号！');
						 }else if(zeroLogo=='日'&&isDay=='否'){
					     	 Ext.getCmp('zeroLogo').markInvalid('流水号按日归零会出现重号');Ext.ux.Toast.msg('操作信息', '流水号按日归零会出现重号！');
						 }else
					     	 Ext.getCmp('zeroLogo').clearInvalid(true);
						}
		
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			// id : 'BmBillNumForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'bmBillNum.billNumId',
						id : 'billNumId',
						xtype : 'hidden',
						value : this.billNumId == null ? '' : this.billNumId
					}, {
						fieldLabel : '单据类型',
						id : 'bmBillNum.billType',
						hiddenName : 'bmBillNum.billType',
						name : 'bmBillNum.billType',
						displayField : 'itemName',
						valueField : 'itemId',
						allowBlank : false,
						xtype : 'combo',
						mode : 'local',
						allowBlank : false,
						triggerAction : 'all',
						forceSelection : true,
						store : new Ext.data.SimpleStore({
							url : __ctxPath + '/system/loadItemDictionary.do',
							baseParams : {
								itemName : '单据类型及业务处理'
							},
							fields : ['itemId', 'itemName'],
							autoLoad : true,
							method : "post",
							listeners : {
								load : function() {
									var combo = Ext.getCmp('bmBillNum.billType');
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
					}, {

						fieldLabel : '生成单据号时检查唯一性',
						hiddenName : 'bmBillNum.isCheckUniqueness',
						allowBlank : false,
						xtype : 'combo',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						store : [['1', '是'], ['0', '否']],
						value : 1
					}, {

						fieldLabel : '删除单据时保留占用',
						hiddenName : 'bmBillNum.isDeleteRetain',
						allowBlank : false,
						xtype : 'combo',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						store : [['1', '是'], ['0', '否']],
						value : 0
					}, {

						fieldLabel : '自动进行断号补号',
						hiddenName : 'bmBillNum.isAutoFill',
						allowBlank : false,
						xtype : 'combo',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						store : [['1', '是'], ['0', '否']],
						value : 1
					}, {
						fieldLabel : '前缀',
						name : 'bmBillNum.prefix',
						validator : checkOrgName,
						id : 'prefix',
						invalidText: '已经存在的前缀',
						maxLength : 20
					}, {xtype : 'compositefield',
					    id : 'factor1Median',
					    hidden : false,
						fieldLabel : '对象一影响因素',
						items : [ {
							hiddenName : 'bmBillNum.factor1Median',
							allowBlank : false,
							xtype : 'combo',
							editable : false,
							mode : 'local',
							triggerAction : 'all',
							store : [['1', '是'], ['0', '否']],
							value : 0
						}, {
							hiddenName : 'bmBillNum.factor1Id',
							xtype : 'combo',
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
								autoLoad : true,
								url : __ctxPath + '/financial/comboBmFactor.do',
								fields : ['factor1Id', 'factor1IdName'],
								listeners : {
									load : function() {
										var combo = Ext.getCmp('factor1Id');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['factor1Id'] == combo.getValue()) {
												combo.setValue(store.getAt(i).data['factor1IdName']);
												break;
											}
										}
									}
								}
							}),
							displayField : 'factor1IdName',
							valueField : 'factor1Id',
							id : 'factor1Id'
						}]
					}, {xtype : 'compositefield',
					    id : 'factor2Median',
					    hidden : false,
						fieldLabel : '对象二影响因素',
						items : [{
							hiddenName : 'bmBillNum.factor2Median',
							allowBlank : false,
							xtype : 'combo',
							editable : false,
							mode : 'local',
							triggerAction : 'all',
							store : [['1', '是'], ['0', '否']],
							value : 0
						}, {
							hiddenName : 'bmBillNum.factor2Id',
							xtype : 'combo',
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
								autoLoad : true,
								url : __ctxPath + '/financial/comboBmFactor.do',
								fields : ['factor2Id', 'factor2IdName'],
								listeners : {
									load : function() {
										var combo = Ext.getCmp('factor2Id');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['factor2Id'] == combo.getValue()) {
												combo
														.setValue(store.getAt(i).data['factor2IdName']);
												break;
											}
										}
									}
								}
							}),
							displayField : 'factor2IdName',
							valueField : 'factor2Id',
							id : 'factor2Id'
						}]
					}, {xtype : 'compositefield',
					    id : 'year',
					    hidden : false,
						fieldLabel : '年选项及位数',
						items : [{
							hiddenName : 'bmBillNum.isYear',
							allowBlank : false,
							xtype : 'combo',
							editable : false,
							mode : 'local',
							id : 'isYear',
							validator : checkZeroLogo,
							triggerAction : 'all',
							store : [['1', '是'], ['0', '否']]
						}, {
							name : 'bmBillNum.yearMedian',
							allowBlank : false,
							xtype : 'numberfield',
							value : 2
						}]
					}, {xtype : 'compositefield',
					    id : 'month',
					    hidden : false,
						fieldLabel : '月选项及位数',
						items : [{
							hiddenName : 'bmBillNum.isMonth',
							allowBlank : false,
							xtype : 'combo',
							id : 'isMonth',
							validator : checkZeroLogo,
							editable : false,
							mode : 'local',
							triggerAction : 'all',
							store : [['1', '是'], ['0', '否']]
						}, {
							name : 'bmBillNum.monthMedian',
							allowBlank : false,
							xtype : 'numberfield',
							value : 2
						}]
					}, {xtype : 'compositefield',
					    id : 'day',
					    hidden : false,
						fieldLabel : '日选项及位数',
						items : [{
							hiddenName : 'bmBillNum.isDay',
							allowBlank : false,
							xtype : 'combo',
							id : 'isDay',
							validator : checkZeroLogo,
							editable : false,
							mode : 'local',
							triggerAction : 'all',
							store : [['1', '是'], ['0', '否']]
						}, {
							name : 'bmBillNum.dayMedian',
							allowBlank : false,
							xtype : 'numberfield',
							value : 2
						}]
					}, {
						fieldLabel : '流水号归零标示',
						hiddenName : 'bmBillNum.zeroLogo',
						allowBlank : false,
						xtype : 'combo',
						id : 'zeroLogo',
						editable : false,
						validator : checkZeroLogo,
						invalidText: '请注意重号',
						mode : 'local',
						triggerAction : 'all',
						store :  [['1', '年'], ['2', '月'], ['3', '日'], ['0', '不归零']],
						value : 1
					}, {
						fieldLabel : '流水号位数',
						name : 'bmBillNum.numberMedian',
						allowBlank : false,
						xtype : 'numberfield',
						value : 5
					}, {
						fieldLabel : '描述',
						name : 'bmBillNum.comments',
						maxLength : 255
					}

			]
		});
		// 加载表单对应的数据
		if (this.billNumId != null && this.billNumId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/financial/getBmBillNum.do?billNumId=' + this.billNumId,
						root : 'data',
						preName : 'bmBillNum'
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
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/financial/saveBmBillNum.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('BmBillNumGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});