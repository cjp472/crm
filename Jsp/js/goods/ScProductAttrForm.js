/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ScProductAttrForm
 * @extends Ext.Window
 * @description ScProductAttr表单
 * @company 优创融联科技
 */
ScProductAttrForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ScProductAttrForm.superclass.constructor.call(this, {
					id : 'ScProductAttrFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '属性详细信息',
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
		var gridPanel_contact5 = new HT.EditorGridPanel({
					height : 150,
					scrollHeight : true,
					rowActions:true,
					tbar : ['->',{
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								handler : function() {
									var store = gridPanel_contact5.getStore();
									var recordType = store.recordType;
									store.add(new recordType({})); // 添加一行空store
								}
							},{
								text:'删除',
								iconCls:'btn-delete',
								handler:function(){
								}
							}],
					clicksToEdit : 1,
					shim : true,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					stripeRows : true,
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					},
					url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
					fields : [{
								name : 'contactEmplId',
								type : 'int'
							}, 'contactType', 'contactValue'],
					columns : [{
								header : '传递值',
								dataIndex : 'contactType',
								editor : new Ext.form.TextField({}),
								renderer : function(value) {
									return CONOB_COM_TYPENAME.get(value);
								}
							}, {
								header : '显示值',
								id : 'contactValue',
								editor : new Ext.form.TextField({}),
								dataIndex : 'contactValue'
							}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-settinr',
											qtip : '约束',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : function(){}
								}
							})]
				});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelWidth:70,
			labelAlign:'right',
			// id : 'ScProductAttrForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					columnWidth : .5,
					border : false,
					items : [{
						fieldLabel : '分类',
						hiddenName : 'scProductAttr.productClassifyId',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						anchor:'100%',
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/goods/listproductClassifyId.do',
							fields : ['productClassifyId',
									'productClassifyIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('productClassifyId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['productClassifyId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['productClassifyIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'productClassifyIdName',
						valueField : 'productClassifyId',
						anchor:'100%',
						id : 'productClassifyId'
					}

					, {
						fieldLabel : '字段名',
						xtype : 'combo',
						name : 'scProductAttr.fieldName',
						anchor:'100%',
						mode:'local',
						store:[['0','EXT1'],['1','EXT2'],['19','EXT20']],
						maxLength : 60
					}

					, {
						fieldLabel : '表单类型',
						hiddenName : 'scProductAttr.formType',
						xtype : 'mtdiccombo',
						anchor:'100%',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CON_T_FORM_TYPE'
					}]
				}, {
					layout : 'form',
					columnWidth : .5,
					border : false,
					items : [{
								fieldLabel : '属性名',
								name : 'scProductAttr.productAttrVal',
								xtype : 'textfield',
								anchor:'100%',
								maxLength : 500
							}

							, {
								fieldLabel : '字段类型',
								hiddenName : 'scProductAttr.fieldType',
								xtype : 'mtdiccombo',
								anchor:'100%',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CON_T_FLELD_TYPE'
							}

					]
				}]
			}, {
				fieldLabel : '备注',
				name : 'scProductAttr.desc',
				xtype : 'textarea',
				anchor:'96%',
				maxLength : 500
			}, {
				xtype : 'fieldset',
				collapsible : true,
				title:'属性值',
				items : [gridPanel_contact5]
			}

			]
		});
		// 加载表单对应的数据
		if (this.productAttrCode != null && this.productAttrCode != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/goods/getScProductAttr.do?productAttrCode='
								+ this.productAttrCode,
						root : 'data',
						preName : 'scProductAttr'
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
					url : __ctxPath + '/goods/saveScProductAttr.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ScProductAttrGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});