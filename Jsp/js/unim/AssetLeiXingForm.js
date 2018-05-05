AssetLeiXingForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		AssetLeiXingForm.superclass.constructor.call(this, {
			id : 'AssetLeiXingFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 220,
			width : 550,
			maximizable : true,
			title : '资产类型详细信息',
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
			labelAlign : 'right',
			labelWidth : 70,
			// id : 'UnimCategoryForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
				name : 'unimAssCategory.catId',
				xtype : 'hidden',
				value : this.catId == null ? '' : this.catId
			},{
						layout : 'column',
						xtype:'panel',
						border : false,
						items : [{
									columnWidth : .5,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '名称',
												xtype:'textfield',
												anchor : '100%',
												allowBlank : false,
												name : 'unimAssCategory.catName',
												maxLength : 128
											}]

								}, {
									columnWidth : .5,
									layout : 'form',
									border : false,
									items : [{
												fieldLabel : '编号',
												anchor : '100%',
												allowBlank : false,
												xtype:'textfield',
												name : 'unimAssCategory.catCode',
												maxLength : 128
											}]

								}]
					},{
						layout : 'column',
						xtype:'panel',
						border : false,
						items : [{
									columnWidth : .5,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '顺序',
												xtype:'textfield',
												allowBlank : false,
												anchor : '100%',
												name : 'unimAssCategory.orderno',
												maxLength : 128
											}]

								}]
					}

			, {
				fieldLabel : '备注',
				name : 'unimAssCategory.remark',
				xtype : 'textarea',
				maxLength : 512
			}

			]
		});
		// 加载表单对应的数据
		if (this.catId != null && this.catId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/unim/getUnimAssCategory.do?catId='
						+ this.catId,
				root : 'data',
				preName : 'unimAssCategory'
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
			url : __ctxPath + '/unim/saveUnimAssCategory.do',
			msgSuccess : '成功删除该记录！',
			msgFailure : '操作出错，请联系管理员！',
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('UnimAssCategoryGrid');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save

});