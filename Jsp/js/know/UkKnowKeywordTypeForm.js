/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UkKnowKeywordTypeForm
 * @extends Ext.Window
 * @description UkKnowKeyword表单
 * @company 优创融联科技
 */
UkKnowKeywordTypeForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UkKnowKeywordTypeForm.superclass.constructor.call(this, {
			id : 'UkKnowKeywordTypeFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 200,
			width : 500,
			maximizable : true,
			title : __ukKnowKeywordTypeadd,
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
			id : 'UkKnowKeywordTypeForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						id : 'keywordTypeId',
						name : 'ukKnowKeywordType.keywordTypeId',
						xtype : 'hidden'
					}, {
						xtype : 'hidden',
						name : 'ukKnowKeywordType.parentId',
						id : 'parentId',
						value : this.nodeId
					}, {
						fieldLabel : __ukKnowKeywordTypename,
						name : 'ukKnowKeywordType.name',
						maxLength : 10
//注销多余的comment
//					}, {
//						fieldLabel : __ukKnowKeywordTypecomMent,
//						name : 'ukKnowKeywordType.comMent',
//						xtype : 'textarea',
//						maxLength : 300
					},{
						fieldLabel : __ukKnowKeywordTypecomMent,
						name : 'ukKnowKeywordType.comMent',
						xtype : 'textarea',
						maxLength : 30
					}]
				}
		);
		// 加载表单对应的数据
		if (this.typeId != null && this.typeId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/know/detailTypeUkKnowKeyword.do?typeId=' + this.typeId,
				root : 'data',
				preName : 'ukKnowKeywordType'
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
			url : __ctxPath + '/know/saveTypeUkKnowKeyword.do',
			callback : function(fp, action) {
				this.close();
				Ext.getCmp('UkKnowKeywordTypeTreePanel').root.reload();
                Ext.getCmp('UkKnowKeywordTypeTreePanel').expandAll();
			}
		});
	}// end of save

});