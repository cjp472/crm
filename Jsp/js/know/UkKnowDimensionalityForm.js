
UkKnowDimensionalityForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UkKnowDimensionalityForm.superclass.constructor.call(this, {
					id : 'UkKnowDimensionalityFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 440,
					width : 620,
					maximizable : true,
					title : '详细信息',
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
		var _url = __ctxPath + '/know/treeLoadUkKnowDimensionality.do';// 不把根目录显示出来
		var folderSelectorDimen = new UkKnowDimenTreeSelector(
				'folderSelectorDimen', _url, '上级维度',
				'ukKnowDimensionality.parentId', false, '100%', false);

		this.formPanel = new Ext.FormPanel({
			labelAlign : 'right',
			labelWidth : 70,
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			id : 'UkKnowDimensionalityForm',
			defaults : {
				anchor : '100%,100%'
			},
			defaultType : 'textfield',
			items : [{
				name : 'ukKnowDimensionality.dimensionalityId',
				hidden : true,
				value : this.dimensionalityId == 'undefined'
						? ''
						: this.dimensionalityId
			}, {
				anchor : '96%',
				layout : 'column',
				border : false,
				xtype : 'panel',
				items : [{
							xtype : 'panel',
							layout : 'form',
							columnWidth : .5,
							border : false,
							labelWidth : 70,
							anchor : '100%',
							items : [{
								fieldLabel : '分类名称 ',
								name : 'ukKnowDimensionality.classifyName',
								xtype : 'textfield',
								labelWidth : 70,
								maxLength : 10,
								allowBlank : false
									// blankText : '名称必须输入！'
								}]
						}, {
							columnWidth : .50,
							xtype : 'container',
							layout : 'form',
							items : [folderSelectorDimen, {
										fieldLabel : '上级',
										name : 'ukKnowDimensionality.parentId',
										xtype : 'hidden',
										id : 'ukKnowDimensionality.parentId'
									}]
						}]

			}, {
				fieldLabel : '描述',
				name : 'ukKnowDimensionality.describe',
				xtype : 'textarea',
				anchor:'96%',
				maxLength : 150
			},
//			{
//				xtype:'fieldset',
//				collapsible:true,
//				collapsed:false,
//				title:'知识维度',
//				items:[{
//					layout:'column',
//					border:false,
//					items:[{
//						columnWidth:.4,
//						border:false,
//						layout:'form',
//						items:[{
//							fieldLabel:'知识维度',
//							xtype:'textfield',
//							name : 'ukKnowDimensionality.detailId',
//							anchor:'100%',
//							readOnly : true,
//							id : 'ukKnowDimensionality.weidu'
//						}]
//					},{
//						columnWidth:.1,
//						border:false,
//						xtype:'button',
//						text : '请选择',
//						iconCls:'btn-search',
//						handler : function() {
//							var dimenId = Ext.getCmp('ukKnowDimensionality.zhishiweidu').getValue();
//							UkKnowDimensionalitySelector.getView(function(data){
//								var idValue = '[';
//								var dimeName = '';
//								for (var i = 0; i < data.length; i++) {
//									if (i > 0) {
//										idValue += ',';
//										dimeName += ',';
//									}
//									idValue += '['+data[i].dimensionalityId+','+data[i].mark+']';
//									dimeName += data[i].dimeName;
//								}
//								idValue += ']';
//								Ext.getCmp('ukKnowDimensionality.weidu').setValue(dimeName);
//								Ext.getCmp('ukKnowDimensionality.zhishiweidu').setValue(idValue);
//							},false,false,dimenId).show();
//						}
//					},{
//						xtype : 'textfield',
//						id : 'ukKnowDimensionality.zhishiweidu'
//					}]
//				}]
//			},
			{
				anchor : '96%',
				layout : 'column',
				border : false,
				xtype : 'panel',
				items : [{
					xtype : 'panel',
					layout : 'form',
					columnWidth : .5,
					border : false,
					anchor : '100%',
					items : [{
								xtype : 'mtdiccombo',
								fieldLabel : '业务类型',
								id : 'ukKnowDimensionality.bussType_lx',
								hiddenName : 'ukKnowDimensionality.bussinessType',
								allowBlank : false,
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'KNOW_YWFL',
								anchor : '100%',
								renderer : function(value) {
									return KNOW_YWFL.get(value);
								}
							}]
				}, {
					xtype : 'panel',
					layout : 'form',
					anchor : '100%',
					columnWidth : .5,
					border : false,
					items : [{
								xtype : 'mtdiccombo',
								anchor : '100%',
								fieldLabel : '访问管理',
								id : 'ukKnowDimensionality.visitManage_gl',
								hiddenName : 'ukKnowDimensionality.visitManage',
								allowBlank : false,
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'KNOW_FWGL',
								anchor : '100%',
								listeners : {
									select : function(cbo, record, index) {
										var p = Ext.getCmp('UkDimeTypeForm_panel');
										if (cbo.value == 1) {
											p.hide();
										} else {
											p.show();
										}
									},
									load : function(cbo, record, index) {
										var p = Ext.getCmp('UkDimeTypeForm_panel');
										if (cbo.value == 1) {
											p.hide();
										} else {
											p.show();
										}
									}
								},
								renderer : function(value) {
									return KNOW_FWGL.get(value);
								}
							}]
				}]

			}, {
				xtype : 'panel',
				border : false,
				anchor:'97%',
				id : 'UkDimeTypeForm_panel',
				hidden : true,
				height : 230,
				items : [{
					xtype : 'fieldset',
					title : '访问授权',
					labelWidth : 1,
					layout:'fit',
					anchor : '100%',
					height : 200,
					items : [{
						xtype : 'itemselector',
						name : 'ukKnowDimensionality.visitRole',
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
							height : 150,
							width : 230,
							autoWidth : true,
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										baseParams : {
											dimensionalityId : this.dimensionalityId
										},
										url : __ctxPath
												+ '/know/chooseRolesUkKnowDimensionality.do',
										fields : ['roleId', 'roleName']
									}),
							displayField : 'roleName',
							valueField : 'roleId'
						}, {
							height : 150,
							width : 230,
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										baseParams : {
											dimensionalityId : this.dimensionalityId
										},
										url : __ctxPath
												+ '/know/selectedRolesUkKnowDimensionality.do',
										fields : ['roleId', 'roleName']
									}),
							displayField : 'roleName',
							valueField : 'roleId'
						}]

					}],
					listeners : {
						afterlayout : function(cp) {
//							Ext.getCmp('UkDimeTypeForm_panel').hide();
						}
					}
				}]
			}]
		});
		// 加载表单对应的数据
		if (this.dimensionalityId != null
				&& this.dimensionalityId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath
						+ '/know/getUkKnowDimensionality.do?dimensionalityId='
						+ this.dimensionalityId,
				root : 'data',
				preName : 'ukKnowDimensionality',
				success : function(form, action) {
					var result = Ext.decode(form.responseText);
					var dimenParentId = result.data.parentId;
					Ext.getCmp('ukKnowDimensionality.bussType_lx').setValue(result.data.bussinessType);
					Ext.getCmp('ukKnowDimensionality.visitManage_gl').setValue(result.data.visitManage);
					if(result.data.visitManage==1){
						Ext.getCmp('UkDimeTypeForm_panel').hide();
					}else if(result.data.visitManage==2){
						Ext.getCmp('UkDimeTypeForm_panel').show();
					}
					if (dimenParentId != null && dimenParentId != 0) {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/know/getUkKnowDimensionality.do',
									async : true,
									scope : this,
									params : {
										'dimensionalityId' : dimenParentId
									},
									method : 'post',
									success : function(response) {
										var result = Ext.util.JSON.decode(response.responseText);
										var folderName = result.data.classifyName;
										Ext.getCmp('folderSelectorDimen').setValue(folderName);
									}
								});
					} else if(dimenParentId==0){
						Ext.getCmp('folderSelectorDimen').setValue(__company);
					}
				}
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
					url : __ctxPath + '/know/saveUkKnowDimensionality.do',
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UkKnowDimensionalityGrid');
						var treePanel = Ext.getCmp('UkKnowDimensionalityTreePanel_3')
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						if(treePanel != null){
							treePanel.root.reload();
						}
						this.close();
					}
				});
	}// end of save

});