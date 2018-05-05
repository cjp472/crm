TestUkSysKnowForm = Ext.extend(Ext.Panel, {
	//构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		//必须先初始化组件
		this.initUIComponents();
		TestUkSysKnowForm.superclass.constructor.call(this, {
			id : 'TestUkSysKnowFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 400,
			width : 500,
			maximizable : true,
			title : '导航模板的管理',
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
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign:'right',
			//id : 'TestUkSysKnowForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
				xtype:'textfield',
				fieldLabel:'导航词',
				anchor:'100%',
				blankText:'用逗号分隔多个词'
			},{
				fieldLabel : '内容',
				xtype : 'htmleditor',
				name : 'knowledge.content',
				anchor : '100%',
				id:'content',
				height : 400,
				allowBlank : false
			}]
		});
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
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {eval('debugger');
		var val = Ext.get('content').getValue();
		$postForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath + '/know/saveUkSysKnow.do',
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('UkSysKnowGrid');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}//end of save

});