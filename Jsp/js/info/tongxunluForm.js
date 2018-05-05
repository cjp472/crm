
/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UkKnowKeywordForm
 * @extends Ext.Window
 * @description UkKnowKeyword表单
 * @company 优创融联科技
 */
tongxunluForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		tongxunluForm.superclass.constructor.call(this, {
			id : 'tongxunluFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 400,
			width : 500,
			maximizable : true,
			title : "通讯录",
			buttonAlign : 'center',
			buttons : [ {
				text : __save,
				iconCls : 'btn-save',
				scope : this,
				id : 'btnSave',
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
//		var checkName = function(val){
//			 var id = Ext.get('ukKnowKeyword.keywordId').dom.value;
//			 var name = Ext.get('ukKnowKeyword.keyWord').dom.value;
//			 Ext.Ajax.request({
//			    url : __ctxPath + '/know/listUkKnowKeyword.do',
//			    params : {
//			     'Q_keyWord_S_EQ' : name,
//				 'Q_keywordId_L_NEQ' : id
//			    },
//			       success : function(form, action) {
//			       	if(val.length <= 0){
//			       		Ext.getCmp('ukKnowKeyword.keyWord').markInvalid('名称不能为空!');
//			       		Ext.getCmp('btnSave').disable();
//			       	} else {
//					    var info = Ext.decode(form.responseText);
//						if(info.totalCounts>0){
//					    	Ext.getCmp('ukKnowKeyword.keyWord').markInvalid('名称不能重复!');
//					    	Ext.getCmp('btnSave').disable();
//						}else{
//					     	Ext.getCmp('ukKnowKeyword.keyWord').clearInvalid(true);
//					     	Ext.getCmp('btnSave').enable();
//						}
//			       	}
//				   }
//			   });
//		};
//		
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			id : 'UkKnowKeywordForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						fieldLabel : "工号",
						name : 'ukKnowKeyword.keyWord',
						id : 'ukKnowKeyword.keyWord',
						maxLength : 20
						//validator : checkName
					}, {
						fieldLabel : "姓名",
						name : 'ukKnowKeyword.comMent'
					}, {
						fieldLabel : "性别",
						name : 'ukKnowKeyword.comMent'
					}, {
						fieldLabel : "部门",
						name : 'ukKnowKeyword.comMent'
					}, {
						fieldLabel : "职务",
						name : 'ukKnowKeyword.comMent'
					}, {
						fieldLabel : "邮箱",
						name : 'ukKnowKeyword.comMent'
					}, {
						fieldLabel : "电话",
						name : 'ukKnowKeyword.comMent'
					}, {
						fieldLabel : "IM",
						name : 'ukKnowKeyword.comMent'
					}]
				});
		// 加载表单对应的数据
		if (this.keywordId != null && this.keywordId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath	+ '/know/getUkKnowKeyword.do?keywordId='
						+ this.keywordId,
				root : 'data',
				preName : 'ukKnowKeyword'
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
		alert("保存")
//		$postForm({
//			formPanel : this.formPanel,
//			scope : this,
//			url : __ctxPath + '/know/saveUkKnowKeyword.do',
//			callback : function(fp, action) {
//				for(var tmp in  fp  )
//					alert(tmp);
//				var gridPanel = Ext.getCmp('KeywordView');
//				if (gridPanel != null) {
//					gridPanel.getStore().reload();
//				}
//				this.close();
//			}
//		});
	}// end of save
	
});