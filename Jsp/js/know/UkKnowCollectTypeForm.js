/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UkKnowCollectTypeForm
 * @extends Ext.Window
 * @description UkKnowCollectType表单
 * @company 优创融联科技
 */
UkKnowCollectTypeForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents(_cfg);
		UkKnowCollectTypeForm.superclass.constructor.call(this, {
					id : 'UkKnowCollectTypeFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 200,
					width : 400,
					maximizable : true,
					title : '我的收藏分类',
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
	initUIComponents : function(_cfg) {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			// id : 'UkKnowCollectTypeForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
				name : 'ukKnowCollectType.knowCollectTypeId',
				xtype : 'hidden',
				value : this.knowCollectTypeId == null
						? ''
						: this.knowCollectTypeId
			}

//			, {
//				fieldLabel : '用户内码',
//				hiddenName : 'ukKnowCollectType.userid',
//				xtype : 'combo',
//				editabel : false,
//				lazyInit : false,
//				triggerAction : 'all',
//				store : new Ext.data.SimpleStore({
//					autoLoad : true,
//					url : __ctxPath + '/know/listuserid.do',
//					fields : ['userid', 'useridName'],
//					listeners : {
//						load : function() {
//							var combo = Ext.getCmp('userid');
//							var store = combo.getStore();
//							var rows = [];// 定义数组
//							for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
//								if (store.getAt(i).data['userid'] == combo
//										.getValue()) {
//									combo
//											.setValue(store.getAt(i).data['useridName']);
//									break;
//								}
//							}
//						}
//					}
//				}),
//				displayField : 'useridName',
//				valueField : 'userid',
//				id : 'userid'
//			}

			, {
				fieldLabel : '知识模板编号',
				name : 'ukKnowCollectType.knowTmpId',
				xtype : 'hidden'
			}

			, {
				fieldLabel : '名称',
				name : 'ukKnowCollectType.name',
				allowBlank : false,
				maxLength : 30
			}

			, {
				fieldLabel : '备注',
				name : 'ukKnowCollectType.comMent',
				maxLength : 100
			}

			, {
				fieldLabel : '父知识对象',
				name : 'ukKnowCollectType.parentId',
				value : _cfg.parentId,
				xtype : 'hidden'
			}

//			, {
//				fieldLabel : '更新时间',
//				name : 'ukKnowCollectType.updateTime',
//				xtype : 'datefield',
//				format : 'Y-m-d',
//				value : new Date()
//			}
//
//			, {
//				fieldLabel : '状态',
//				name : 'ukKnowCollectType.knowTypeStatus',
//				xtype : 'numberfield'
//			}
//
//			, {
//				fieldLabel : '顺序',
//				name : 'ukKnowCollectType.knowSort',
//				xtype : 'numberfield'
//			}
//
//			, {
//				fieldLabel : '路径',
//				name : 'ukKnowCollectType.path',
//				maxLength : 100
//			}

			]
		});
		// 加载表单对应的数据
		if (this.knowCollectTypeId != null
				&& this.knowCollectTypeId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/know/getUkKnowCollectType.do?knowCollectTypeId='
								+ this.knowCollectTypeId,
						root : 'data',
						preName : 'ukKnowCollectType'
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
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/know/saveUkKnowCollectType.do',
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UkKnowCollectTypeGrid');
						Ext.getCmp('UkKnowShoucangTypeTree').root.reload();
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});