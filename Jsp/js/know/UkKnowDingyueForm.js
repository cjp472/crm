/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UkKnowDingyueForm
 * @extends Ext.Window
 * @description UkKnowDingyue表单
 * @company 优创融联科技
 */

UkKnowDingyueForm = Ext.extend(Ext.Window, {
	//构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		//必须先初始化组件
		this.initUIComponents();
		UkKnowDingyueForm.superclass.constructor.call(this, {
					id : 'UkKnowDingyueFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 800,
					maximizable : true,
					title : '知识订阅'//__ukKnowDingyueDetailHeading
//					,
//					buttonAlign : 'center',
//					buttons : this.initToolbar()

//					tbar : this.initToolbar()
				});
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
		var knowtypeSelectPanel = UkKnowTypeSelector.getView();
		var ukTypeGrid = knowtypeSelectPanel.findByType('editorgrid')[0];
		
		var _keywordId = this.knowKeyword;

		var keywordSelectPanel = KnowKeywordPanleSelector.getView(function(){},false,false,_keywordId);
		var keywordGrid = keywordSelectPanel.findByType('editorgrid')[1];
		
		var bottomToolbar = this.initToolbar(ukTypeGrid,keywordGrid);

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign:'right',
			labelWidth:60,
			id : 'UkKnowDingyueForm',
			bbar : bottomToolbar,
			defaults : {
				anchor : '98%,100%',
				xtype : 'panel'
			},
			defaultType : 'textfield',
			url : __ctxPath + '/know/saveUkKnowDingyue.do',
			items : [{
						name : 'ukKnowDingyue.dingyueId',
						xtype : 'hidden'
					},{
						xtype : 'fieldset',
						id : 'busiTypeFieldset',
						title : "<div style='width:70px;float:none;' >业务分类</div>",
						border : true,
						//collapsed : true,
						collapsible : true,
						autoHeight : true,
						
						defaults : {
							anchor : '100%,100%'
						},
						items : {
							xtype : 'panel',
							height : 220,
							border : false,
							items : [{
								xtype : 'itemselector',
								id : 'busiTypeSelect',
								name : 'busiTypeSelect',
								fromLegend : '',
								flex : 1,
								imagePath : __ctxPath + '/ext3/ux/images/',
								defaults : {
									anchor : '100%,100%'
								},
									layout : {
						type : 'hbox',
						align : 'stretch'
					},
								multiselects : [{
									id : 'choosebusiType',
									title : "可选业务分类",
									height : 220,
									width :200,
									autoWidth : true,
									store : new Ext.data.SimpleStore({
												autoLoad : true,
												baseParams : {
													userId : this.dingyueUserid
												},
												url : __ctxPath
														+ '/know/chooseBusiTypeUkKnowDingyue.do',
												fields : ['busiTypeId', 'busiTypeName']
											}),
									displayField : 'busiTypeName',
									valueField : 'busiTypeId'
								}, {
									id : 'selectedBusiType',
									name : 'selectedBusiType',
									title : "已选业务分类",
									height : 220,
									width : Ext.getCmp('centerTabPanel').getInnerWidth()/2,
									store : new Ext.data.SimpleStore({
										autoLoad : true,
										baseParams : {
											userId : this.dingyueUserid
										},
										url : __ctxPath + '/know/selectedBusiTypeUkKnowDingyue.do',
										fields : ['busiTypeId', 'busiTypeName']
									}),
									tbar : [{
										text : '清除所选',
										handler : function() {
											Ext.getCmp('UkKnowDingyueForm').getForm()
													.findField('busiTypeSelect').reset();
										}
									}],
									displayField : 'busiTypeName',
									valueField : 'busiTypeId'
								}]
							}]
						}
					}, {
						xtype : 'fieldset',
						id : 'groupsFieldsetknow',
						columnWidth : 0.5,
						title : "<div style='width:70px;float:none;' >知识分类</div>",
						border : true,
						collapsed : true,
						collapsible : true,
						autoHeight : true,
						defaults : {
							anchor : '100%,100%'
						},
						items : knowtypeSelectPanel
					}, {
						name : 'ukKnowDingyue.knowTypeDingyue',
						id :'ukKnowDingyue.knowTypeDingyue',
						xtype : 'hidden'
					}, {
						xtype : 'fieldset',
						id : 'keywordSelectFieldset',
						columnWidth : 0.5,
						title : "<div style='width:60px;float:none;' >关键字</div>",
						border : true,
						collapsed : true,
						collapsible : true,
						autoHeight : true,
						defaults : {
							anchor : '100%,100%'
						},
						items : {
							id : 'keywordSelectknow',
							xtype : 'panel',
							height : 300,
							border : false,
							items : keywordSelectPanel
						}
//					},{
//						fieldLabel : __ukKnowDingyueBusiType,
//						hiddenName : 'ukKnowDingyue.busiType',
//						id : 'ukKnowDingyue.busiType',
//						xtype : 'mtdiccombo',
//						editable : true,
//						lazyInit : false,
//						allowBlank : false,
//						forceSelection : false,
//						itemKey : 'BUSI_TYPE'
					}, {
						fieldLabel : __ukKnowDingyueDesCribe,
						labelAlign:'right',
						name : 'ukKnowDingyue.desCribe',
						id : 'ukKnowDingyue.desCribe',
						xtype : 'textarea',
						maxLength : 300
//					}, {
//						fieldLabel : __ukKnowDingyueUserid,
//						name : 'ukKnowDingyue.userName',
//						readOnly : true,
//						xtype :  this.dingyueUserid==null?'hidden':'textfield'
					}
			]
		});
		//加载表单对应的数据	
		if (this.dingyueUserid != null && this.dingyueUserid != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/know/getDingyueByUserUkKnowDingyue.do?dingyueUserid='
								+ this.dingyueUserid,
						root : 'data',
						preName : 'ukKnowDingyue',
						success : function(response, options) {
//							var thisObj = Ext.util.JSON.decode(response.responseText).data;
//							Ext.getCmp('ukKnowDingyue.busiType').setValue(thisObj.busiType);
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
//		var tabs = Ext.getCmp('centerTabPanel');
//		tabs.remove('UkKnowDingyueFormWin');
//		this.destroy();
		this.close();
	}

});

UkKnowDingyueForm.prototype.initToolbar = function(ukTypeGrid,keywordGrid) {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				buttonAlign : "center",
				items : [{
							iconCls : 'btn-save',
							text : __save,
							xtype : 'button',
							scope : this,
							handler : function() {
								var dingyueform = Ext.getCmp('UkKnowDingyueForm');
								if (dingyueform.getForm().isValid()) {
									//添加知识分类
									var typeStore = ukTypeGrid.getStore();
									var keywordStore = keywordGrid.getStore();
									var typeParams = [];
									var keywordParams = [];
									var typecnt = typeStore.getCount();
									var keywordcnt = keywordStore.getCount();
									var insertType = true;
									for (i = 0; i < typecnt; i++) {
										var rec = typeStore.getAt(i);
										typeParams.push(rec.data.knowTypeId);
									}
									for (i = 0; i < keywordcnt; i++) {
										var rec = keywordStore.getAt(i);
										keywordParams.push(rec.data.keywordId);
									}
									///end
									dingyueform.getForm().submit({
												waitMsg : '正在提交用户信息',
												params : {
													typeParams : Ext.encode(typeParams),
													keywordParams :  Ext.encode(keywordParams),
													start : 0,
													limit : 25
												},
												success : function(dingyueform, o) {
													
													Ext.getCmp("UkKnowDingyueFormWin").close();
													Ext.getCmp("UkKnowDingyueManageGrid").getStore().reload();
													Ext.ux.Toast.msg('操作信息', '保存成功!');
												},
												failure : function(dingyueform, o) {
													Ext.ux.Toast.msg('错误信息', '操作出错，请联系管理员!');
												}
											});
								}
							}
						}, {
							iconCls : 'btn-cancel',
							text : __cancel,
							xtype : 'button',
							scope : this,
							handler : this.cancel
						}]
			});
	return toolbar;
}
