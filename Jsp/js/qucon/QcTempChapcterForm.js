/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QcTempChapcterForm
 * @extends Ext.Window
 * @description QcTempChapcter表单
 * @company 优创融联科技
 */
QcTempChapcterForm = Ext.extend(Ext.Window,{
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QcTempChapcterForm.superclass.constructor.call(this, {
			id : 'QcTempChapcterFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 400,
			width : 500,
			maximizable : true,
			title : '章节详细信息',
			buttonAlign : 'center',
			buttons : [ {
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
			} ]
		});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			id : 'QcTempChapcterForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'tmpId',
						xtype : 'hidden',
						value : this.tempId == null ? ''
								: this.tempId
					},{
						name : 'qcTempChapcter.tempCatId',
						xtype : 'hidden',
						value : this.id == null ? ''
								: this.id
					},{
//						fieldLabel : '模板ID',
//						hiddenName : 'qcTempChapcter.tmpId',
//						xtype : 'combo',
//						editabel : false,
//						lazyInit : false,
//						triggerAction : 'all',
//						store : new Ext.data.SimpleStore(
//								{
//									autoLoad : true,
//									url : __ctxPath
//											+ '/qucon/listtmpId.do',
//									fields : [ 'tmpId',
//											'tmpIdName' ],
//									listeners : {
//										load : function() {
//											var combo = Ext
//													.getCmp('tmpId');
//											var store = combo
//													.getStore();
//											var rows = [];// 定义数组
//											for ( var i = 0; i < store
//													.getCount(); i++) { // store.getCount()为store的长度
//												if (store
//														.getAt(i).data['tmpId'] == combo
//														.getValue()) {
//													combo
//															.setValue(store
//																	.getAt(i).data['tmpIdName']);
//													break;
//												}
//											}
//										}
//									}
//								}),
//						displayField : 'tmpIdName',
//						valueField : 'tmpId',
//						id : 'tmpId'
//					},{
						fieldLabel : '名称',
						name : 'qcTempChapcter.catName',
						allowBlank : false,
						maxLength : 256
					},{
						fieldLabel : '备注',
						name : 'qcTempChapcter.remark',
						xtype : 'textarea',
						maxLength : 2048
					},{
//						fieldLabel : '分值,加分、减分时适用',
//						name : 'qcTempChapcter.score',
//						allowBlank : false
//					},{
						fieldLabel : '序号',
						name : 'qcTempChapcter.disorder',
						allowBlank : false,
						xtype : 'numberfield'
//					},{
//						fieldLabel : '状态：有效、注销&QC_ZT',
//						hiddenName : 'qcTempChapcter.staId',
//						allowBlank : false,
//						xtype : 'mtdiccombo',
//						editable : true,
//						lazyInit : false,
//						forceSelection : false,
//						itemKey : 'QC_ZT'
					},{
						name : 'qcTempChapcter.type',
						id : 'qcTempChapcter.type_hid',
						xtype : 'hidden'
					},{
						fieldLabel : '类型',
						allowBlank : false,
						id : 'qcTempChapcter.type_form',
						displayField : 'itemName',
						valueField : 'itemId',
						xtype : 'combo',
						mode : 'local',
						triggerAction : 'all',
						width : '100px',
						forceSelection : false,
						store : this.getDicStore('章节类型','qcTempChapcter.type'),
						listeners : this.getDicListeners('qcTempChapcter.type_form','qcTempChapcter.type')
					}]
				});
		// 加载表单对应的数据
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/qucon/getQcTempChapcter.do?tempCatId=' + this.id,
				root : 'data',
				preName : 'qcTempChapcter'
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
			url : __ctxPath + '/qucon/saveQcTempChapcter.do',
			callback : function(fp, action) {
				var tree = Ext.getCmp('ChapcterTreePanel');
				if (tree != null) {
					tree.root.reload();
				}
				this.close();
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