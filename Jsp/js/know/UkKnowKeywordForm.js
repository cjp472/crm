/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UkKnowKeywordForm
 * @extends Ext.Window
 * @description UkKnowKeyword表单
 * @company 优创融联科技
 */
UkKnowKeywordForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UkKnowKeywordForm.superclass.constructor.call(this, {
			id : 'UkKnowKeywordFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height :220,
			width : 500,
			maximizable : true,
			title : __ukKnowKeywordadd,
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
		var checkName = function(val){
			 var id = Ext.get('ukKnowKeyword.keywordId').dom.value;
			 var name = Ext.get('ukKnowKeyword.keyWord').dom.value;
			 Ext.Ajax.request({
			    url : __ctxPath + '/know/listUkKnowKeyword.do?check=true',
			    params : {
			     'Q_keyWord_S_EQ' : name,
				 'Q_keywordId_L_NEQ' : id
			    },
			       success : function(form, action) {
			       	if(val.length <= 0){
			       		Ext.getCmp('ukKnowKeyword.keyWord').markInvalid('名称不能为空!');
			       		Ext.getCmp('btnSave').disable();
			       	} else {
					    var info = Ext.decode(form.responseText);
						if(info.totalCounts>0){
					    	Ext.getCmp('ukKnowKeyword.keyWord').markInvalid('名称不能重复!');
					    	Ext.getCmp('btnSave').disable();
						}else{
					     	Ext.getCmp('ukKnowKeyword.keyWord').clearInvalid(true);
					     	Ext.getCmp('btnSave').enable();
						}
			       	}
				   }
			   });
		};
		
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelWidth : 60,
			labelAlign:'right',
			id : 'UkKnowKeywordForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'ukKnowKeyword.keywordId',
						xtype : 'hidden',
						id : 'ukKnowKeyword.keywordId',
						value : this.keywordId == null ? ''
								: this.keywordId
//					}, {
//						fieldLabel : '知识分类内码',
//						hiddenName : 'ukKnowKeyword.knowTypeId',
//						xtype : 'combo',
//						editabel : false,
//						lazyInit : false,
//						triggerAction : 'all'//,
////						store : new Ext.data.SimpleStore({
////							autoLoad : true,
////							url : __ctxPath + '/financial/comboknowTypeId.do',
////							fields : ['knowTypeId',	'knowTypeIdName' ],
////							listeners : {
////								load : function() {
////									var combo = Ext.getCmp('knowTypeId');
////									var store = combo.getStore();
////									var rows = [];// 定义数组
////									for ( var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
////										if (store.getAt(i).data['knowTypeId'] == combo.getValue()) {
////											combo.setValue(store.getAt(i).data['knowTypeIdName']);
////											break;
////										}
////									}
////								}
////							}
//						}),
//						displayField : 'knowTypeIdName',
//						valueField : 'knowTypeId',
//						id : 'knowTypeId'
					},{
						name : 'ukKnowKeyword.type.keywordTypeId',
						xtype : 'hidden',
						value : this.typeId
					}, {
						fieldLabel : __ukKnowKeywordkeyWord,
						name : 'ukKnowKeyword.keyWord',
						id : 'ukKnowKeyword.keyWord',
						maxLength : 10,
						validator : checkName
					}, {
						fieldLabel : __ukKnowKeywordcomMent,
						name : 'ukKnowKeyword.comMent',
						xtype : 'textarea',
						maxLength : 150
//					}, {
//						fieldLabel : '状态',
//						hiddenName : 'ukKnowKeyword.knowStatus',
//						xtype : 'mtdiccombo',
//						editable : true,
//						lazyInit : false,
//						forceSelection : false,
//						itemKey : 'KNOW_STATUS'
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
		$postForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath + '/know/saveUkKnowKeyword.do',
			callback : function(fp, action) {
			//	for(var tmp in  fp  )
					//alert(tmp);
				var gridPanel = Ext.getCmp('KeywordView');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				Ext.getCmp('UkKnowKeywordFormWin').close();
			}
		});
	}// end of save
	
});