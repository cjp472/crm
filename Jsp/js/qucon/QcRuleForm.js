/**
 * @author:cf0666@gmail.com
 * @class QcRuleForm
 * @extends Ext.Panel
 * @description [QcRuleForm]管理
 * @company 优创融联科技
 * @createtime:
 */
QcRuleForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QcRuleForm.superclass.constructor.call(this, {
					id : 'QcRuleFormWin',
					title : '考核规则详细信息',
					region : 'center',
					layout : 'fit',
					items : [this.panel],
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
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['origAni', '主叫', new Ext.form.TextField({
									name : 'origAni',
									allowBlank : true
								})],
				['origDnis', '被叫', new Ext.form.TextField({
									name : 'origDnis',
									allowBlank : true
								})],
				['enterTime', '开始时间', new Ext.form.DateField({
									hiddenName : 'enterTime',
									format : 'Y-m-d'
								})],
				['endTime', '结束时间', new Ext.form.DateField({
									hiddenName : 'endTime',
									format : 'Y-m-d'
								})],
				['endReason', '呼损原因&CONHSYY', new Ext.form.NumberField({
									name : 'endReason',
									allowBlank : true
								})], ['vdn', 'VDN', new Ext.form.TextField({
									name : 'vdn',
									allowBlank : true
								})], ['split', '技能组', new Ext.form.TextField({
									name : 'split',
									allowBlank : true
								})],
				['ivrNod', 'IVR节点', new Ext.form.TextField({
									name : 'ivrNod',
									allowBlank : true
								})],
				['agentid', '接入工号', new Ext.form.TextField({
									name : 'agentid',
									allowBlank : true
								})],
				['station', '接入分机号', new Ext.form.TextField({
									name : 'station',
									allowBlank : true
								})], ['dur', '时长', new Ext.form.NumberField({
									name : 'dur',
									allowBlank : true
								})],
				['synTime', '同步时间', new Ext.form.TextField({
									name : 'synTime',
									allowBlank : true
								})],
				['assignId', '分配人', new Ext.form.NumberField({
									name : 'assignId',
									allowBlank : true
								})],
				['assignTime', '分配时间', new Ext.form.DateField({
									hiddenName : 'assignTime',
									format : 'Y-m-d'
								})],
				['ownerId', '负责人', new Ext.form.NumberField({
									name : 'ownerId',
									allowBlank : true
								})],
				['acceptTime', '领用时间', new Ext.form.DateField({
									hiddenName : 'acceptTime',
									format : 'Y-m-d'
								})],
				['dealStaId', '处理状态&CONCLZT', new Ext.form.NumberField({
									name : 'dealStaId',
									allowBlank : true
								})],
				['dealResId', '处理结果&CONCLJG', new Ext.form.NumberField({
									name : 'dealResId',
									allowBlank : true
								})],
				['dealRemarks', '处理备注', new Ext.form.TextField({
									name : 'dealRemarks',
									allowBlank : true
								})]];
		var gridPanel_contact_skill = new HT.EditorGridPanel({
			region : 'center',
			tbar : this.getTopBar('gridPanel_contact_skill'),
			id : 'gridPanel_contact_skill',
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '技能',
						dataIndex : 'contactType',
						editor : new Ext.form.ComboBox({
									xtype : 'combo',
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									store : [['1', '技能1'], ['0', '技能2']]
								})
					}, {
						header : '方式',
						dataIndex : 'contactValue',
						editor : new Ext.form.ComboBox({
									xtype : 'combo',
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									store : [['1', '数量'], ['0', '百分比']]
								})
					}, {
						header : '数量',
						dataIndex : 'contactType',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});
		var gridPanel_contact_usergroup = new HT.EditorGridPanel({
			region : 'center',
			tbar : this.getTopBar('gridPanel_contact_usergroup'),
			height : 150,
			id : 'gridPanel_contact_usergroup',
			scrollHeight : true,
			style : 'display:none',
			clicksToEdit : 1,
			url : __ctxPath + "/qucon/getDetailQcChkRul.do?ruleId="
				+ this.ruleId + "&type=1",
			fields : [{
						name : 'detailId',
						type : 'int'
					}, 'typId', 'val','objectId', 'rul', "name", 'detailType'],
			columns : [{
				id : 'Id',
				dataIndex : 'objectId',
				hidden : true
			},{
                id : '类型',
                dataIndex : 'detailType',
                hidden : true
            },{
				header : '用户组',
				dataIndex : 'name',
 				editor : new UsergroupTreeSelector('usergroupSelector',
						__ctxPath + '/xitong/treeLoadUlUsergroup.do', '',
						'objectId@gridPanel_contact_usergroup', false, '100%', false)
			}, {
				header : '方式',
				dataIndex : 'typId',
				editor : new Ext.form.ComboBox({
					allowBlank : false,
					name : 'qcChkRul.typId',
					id : 'qcChkRul.typId',
					displayField : 'itemName',
					valueField : 'itemId',
					mode : 'local',
					triggerAction : 'all',
					hiddenName : 'qcChkRul.typId',
					forceSelection : false,
					store : new Ext.data.SimpleStore({
						url : __ctxPath + '/system/loadItemDictionary.do',
						baseParams : {
							itemName : '考核规则抽取类型'
						},
						fields : ['itemId', 'itemName'],
						autoLoad : true,
						method : "post"
					})
				}),
				renderer : function(value) {
					if (value != null) {
						return QC_SQLX.get(value);
					} else {
						return ' ';
					}
				}
			}, {
				header : '数量',
				dataIndex : 'val',
				editor : new Ext.form.TextField({

				})
			}, {
				header : '规则',
				dataIndex : 'rul',
				editor : new Ext.form.ComboBox({
					allowBlank : false,
					id : 'rule',
					name : 'qcChkRul.rul',
					hiddenName : 'qcChkRul.rul',
					displayField : 'itemName',
					valueField : 'itemId',
					mode : 'local',
					triggerAction : 'all',
					forceSelection : false,
					store : new Ext.data.SimpleStore({
						url : __ctxPath + '/system/loadItemDictionary.do',
						baseParams : {
							itemName : '考核规则抽取规则'
						},
						fields : ['itemId', 'itemName'],
						autoLoad : true,
						method : "post"
					})
				}),
				renderer : function(value) {
					if (value != null) {
						return QC_SQGZ.get(value);
					} else {
						return ' ';
					}
				}
			}]// end of columns
			});
		var gridPanel_contact_user = new HT.EditorGridPanel({
			region : 'center',
			tbar : this.getTopBar('gridPanel_contact_user'),
			height : 150,
			style : 'display:none',
			id : 'gridPanel_contact_user',
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/qucon/getDetailQcChkRul.do?ruleId="
				+ this.ruleId + "&type=2",
			fields : [{
				name : 'detailId',
				type : 'int'
			}, 'typId', 'val','objectId', 'rul', "name", 'detailType'],
			columns : [{
				id : 'ID',
				dataIndex : 'objectId',
				hidden : true
			},{
                id : '类型',
                dataIndex : 'detailType',
                hidden : true
            },{
				header : '用户',
				dataIndex : 'name',
//				id : 'name',
				editor :new Ext.form.TextField({
					listeners: { 
						focus: function() {
							UserSelector.getView(function(id, name){
								Ext.getCmp('gridPanel_contact_user').getSelectionModel()
									.getSelections()[0].set('objectId',id);
								Ext.getCmp('gridPanel_contact_user').getSelectionModel()
								.getSelections()[0].set('name',name);
                                Ext.getCmp('gridPanel_contact_user').getSelectionModel()
                                .getSelections()[0].set('detailType',2);
							}, true,false).show();
						} 
					}
				})
			}, {
				header : '方式',
				dataIndex : 'typId',
				editor : new Ext.form.ComboBox({
					allowBlank : false,
					displayField : 'itemName',
					valueField : 'itemId',
					mode : 'local',
					triggerAction : 'all',
					forceSelection : false,
					store : new Ext.data.SimpleStore({
						url : __ctxPath + '/system/loadItemDictionary.do',
						baseParams : {
							itemName : '考核规则抽取类型'
						},
						fields : ['itemId', 'itemName'],
						autoLoad : true,
						method : "post"
					})
				}),
				renderer : function(value) {
					if (value != null) {
						return QC_SQLX.get(value);
					} else {
						return ' ';
					}
				}
			}, {
				header : '数量',
				dataIndex : 'val',
				editor : new Ext.form.TextField({

				})
			}]// end of columns
			});
		var gridPanel_contact_checkresult = new HT.EditorGridPanel({
			region : 'center',
			id : 'gridPanel_contact_checkresult',
			tbar : this.getTopBar('gridPanel_contact_checkresult'),
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '最小分数',
						dataIndex : 'contactType',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '最大分数',
						dataIndex : 'contactType2',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '方式',
						dataIndex : 'contactValue',
						editor : new Ext.form.ComboBox({
									xtype : 'combo',
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									store : [['1', '数量'], ['0', '百分比']]
								})
					}, {
						header : '数量',
						dataIndex : 'contactType3',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});

		// 初始化搜索条件Panel
		this.panel = new Ext.FormPanel({
			layout : 'form',
			border : false,
			labelAlign : 'right',
			bodyStyle : 'padding:10px',
			defaults : {
				anchor : '98%,98%'
			},
			items : [{
						layout : 'column',
						border : false,
						anchor : '98%',
						items : [{
									border : false,
									columnWidth : .33,
									layout : 'form',
									items : [{
										name : 'qcChkRul.chkRulId',
										xtype : 'hidden',
										id : 'chkRulId',
										value : this.chkRulId == null ? '' : this.chkRulId
									},{
												name : 'qcChkRul.rulName',
												xtype : 'textfield',
												fieldLabel : '规则名',
												anchor : '100%'
											}, {
												name : 'qcChkRul.objTyeId',
												id : 'qcChkRul.objTyeId_hid',
												xtype : 'hidden'
											}, {
												fieldLabel : '考评对象',
												allowBlank : false,
												id : 'qcChkRul.objTyeId_form',
												displayField : 'itemName',
												valueField : 'itemId',
												xtype : 'combo',
												mode : 'local',
												disabled : false,
												triggerAction : 'all',
												width : '100px',
												forceSelection : false,
												store : this.getDicStore('考核规则考核对象','qcChkRul.objTyeId'),
												listeners : this.getDicListeners('qcChkRul.objTyeId_form','qcChkRul.objTyeId')
											}]
								}, {
									border : false,
									columnWidth : .33,
									layout : 'form',
									items : [{
												fieldLabel : '开始时间',
												xtype : 'datefield',
												editable : true,
												name : 'qcChkRul.rulTimeSta',
												format : 'y-m-d',
												anchor : '100%'
											}, {
												name : 'qcChkRul.objSubTyeId',
												id : 'qcChkRul.objSubTyeId_hid',
												xtype : 'hidden'
											}, {
												fieldLabel : '考评对象类型',
												allowBlank : false,
												id : 'qcChkRul.objSubTyeId_form',
												displayField : 'itemName',
												valueField : 'itemId',
												xtype : 'combo',
												mode : 'local',
												disabled : false,
												triggerAction : 'all',
												width : '100px',
												forceSelection : false,
												store : this.getDicStore('联络方式','qcChkRul.objSubTyeId'),
												listeners : this.getDicListeners('qcChkRul.objSubTyeId_form','qcChkRul.objSubTyeId')
											}]
								}, {
									border : false,
									columnWidth : .33,
									layout : 'form',
									items : [{
												fieldLabel : '结束时间',
												xtype : 'datefield',
												name : 'qcChkRul.rulTimeEnd',
												editable : true,
												format : 'y-m-d',
												anchor : '100%'
											}]
								}]
					}, {
						xtype : 'textarea',
						height : 50,
						name : 'qcChkRul.remark',
						fieldLabel : '备注',
						anchor : '97%'
					}, {
						xtype : 'fieldset',
						title : '按用户抽样',
						collapsible : true,
						items : [{
									layout : 'column',
									border : false,
									style : 'padding-bottom:10px',
									items : [{
										columnWidth : .3333,
										border : false,
										items : [{
											xtype : 'radio',
											boxLabel : '技能',
											checked : true,
											name : 'radio',
											listeners : {
												'check' : function(radio, checked) {
													if (checked) {
														Ext.get('gridPanel_contact_skill').dom.style.display = 'block';
														Ext.get('gridPanel_contact_usergroup').dom.style.display = 'none';
														Ext.get('gridPanel_contact_user').dom.style.display = 'none';
													}
												}
											}
										}]
									}, {
										columnWidth : .3333,
										border : false,
										items : [{
											xtype : 'radio',
											boxLabel : '用户组',
											name : 'radio',
											listeners : {
												'check' : function(radio, checked) {
													if (checked) {
														Ext.get('gridPanel_contact_usergroup').dom.style.display = 'block';
														Ext.get('gridPanel_contact_skill').dom.style.display = 'none';
														Ext.get('gridPanel_contact_user').dom.style.display = 'none';
													}
												}
											}
										}]
									}, {
										columnWidth : .3333,
										border : false,
										items : [{
											xtype : 'radio',
											boxLabel : '用户',
											name : 'radio',
											listeners : {
												'check' : function(radio, checked) {
													if (checked) {
														Ext.get('gridPanel_contact_user').dom.style.display = 'block';
														Ext.get('gridPanel_contact_usergroup').dom.style.display = 'none';
														Ext.get('gridPanel_contact_skill').dom.style.display = 'none';
													}
												}
											}
										}]
									}]
								}, gridPanel_contact_skill, gridPanel_contact_usergroup,
								gridPanel_contact_user]
					}, {
						xtype : 'fieldset',
						title : '按考核结果抽样',
						collapsible : true,
						collapsed : 'false',
						items : [gridPanel_contact_checkresult]
					}]
		});// end of searchPanel
	
		if (this.ruleId != null && this.ruleId != 'undefined') {
			this.panel.loadData({
				url : __ctxPath	+ '/qucon/getQcChkRul.do?chkRulId='
					+ this.ruleId,
				root : 'data',
				preName : 'qcChkRul'
			});
		}
	},// end of the initComponents()
	
	getTopBar : function(gridId){
		return new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var grid = Ext.getCmp(gridId);
							var store = grid.getStore();
							var sm = grid.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
							} else {
								store.remove(cell);
							}
						}
					}, '->', {
						iconCls : 'btn-add',
						text : '添加',
						xtype : 'button',
						handler : function() {
							var grid = Ext.getCmp(gridId);
							var store = grid.getStore();
							var recordType = store.recordType;
							store.add(new recordType({})); // 添加一行空store
						}
					}]
		});
	},

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
	// 重置查询表单
	reset : function() {
		this.panel.getForm().reset();
	},
	/**
	 * 取消
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('QcRuleFormWin');
		this.destroy();
		// tabs.doLayout();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		//TODO 获得gridPanel_contact的store
		if (this.panel.getForm().isValid()) {
			var store = Ext.getCmp('gridPanel_contact_usergroup').getStore();
			// 定义数组 row
			var rows = [];

			// store.getCount()为store的长度
			for (var i = 0; i < store.getCount(); i++) {
				// 将每一行store的值放入row数组里
				rows.push(store.getAt(i).data);
			}
			
			var store_usergroup = Ext.getCmp('gridPanel_contact_user').getStore();
			// 定义数组 row
			var rows_usergroup = [];
			// store.getCount()为store的长度
			for (var i = 0; i < store_usergroup.getCount(); i++) {
				// 将每一行store的值放入row数组里
				rows.push(store_usergroup.getAt(i).data);
			}

			// 判断grid提交的值是否为空
			var count = store.getCount() + store_usergroup.getCount();
			if (count != 0) {
				$postForm({
							formPanel : this.panel,
							scope : this,
							url : __ctxPath + '/qucon/saveQcChkRul.do',
							params : {
								// 将数组提交至后台 details
								details_usergroup : Ext.encode(rows)
							},
							callback : function(fp, action) {
								var tabs = Ext.getCmp('centerTabPanel');
								tabs.remove('QcRuleFormWin');
								Ext.getCmp('QcRuleGrid').getStore().reload();
								this.destroy();
							}
						});
			} else {
				Ext.ux.Toast.msg('操作信息', '请至少添加一种抽取规则！');
			}
		}
	},// end of save

	getDicListeners : function(comId, hidName){
		return {
			select : function(cbo,record,index) {
				var fm = Ext.getCmp(comId);
				Ext.getCmp(hidName+'_hid').setValue(cbo.value);
			}
		}
	}
});