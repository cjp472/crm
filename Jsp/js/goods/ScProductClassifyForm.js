/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ScProductClassifyForm
 * @extends Ext.Window
 * @description ScProductClassify表单
 * @company 优创融联科技
 */
ScProductClassifyForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ScProductClassifyForm.superclass.constructor.call(this, {
					id : 'ScProductClassifyFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 300,
					width : 500,
					maximizable : true,
					title : '产品分类详细信息',
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
			labelAlign:'right',
			labelWidth:80,
			id : 'ScProductClassifyForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
				layout : 'column',
				border : false,
				labelAlign:'right',
				items : [{
					layout : 'form',
					columnWidth : .5,
					border : false,
					items : [
							{
								xtype : 'hidden',
								name : 'scProductClassify.masterProductClassifyId',
								id : 'masterProductClassifyId',
								value : this.parentId == null ? "" :  this.parentId
//								value : this.parentId
							}, {
								xtype : 'hidden',
								name : 'scProductClassify.productClassifyId',
								id : 'productClassifyId',
								value : this.productClassifyId == null ? "": this.productClassifyId
							}, {
								xtype:'hidden',
								fieldLabel : 'path',
								name : 'scProductClassify.path'
							},  {
								xtype:'hidden',
								fieldLabel : '状态',
								name : 'scProductClassify.status'
							},  {
								fieldLabel : '分类名称',
								name : 'scProductClassify.productClassifyName',
								maxLength : 60,
								xtype:'textfield',
								anchor:'100%'
							}, {
								fieldLabel : '产品型号标识',
								name : 'scProductClassify.productModelFlag',
								maxLength : 6,
								xtype:'textfield',
								anchor:'100%'
							}]
				}, {
					layout : 'form',
					columnWidth : .5,
					border : false,
					items : [{
								fieldLabel : '分类拼音',
								name : 'scProductClassify.productClassifyPinyin',
								allowBlank : false,
								xtype:'textfield',
								maxLength : 60,
								anchor:'100%'
							}, {
								fieldLabel : '分类代码',
								name : 'scProductClassify.productClassifyDispCode',
								maxLength : 60,
								xtype:'textfield',
								anchor:'100%'
							}]
					}]
							}, {
								fieldLabel : '描述',
								name : 'scProductClassify.productClassifyRemarks',
								xtype : 'textarea',
								anchor:'100%',
								maxLength : 600
			}]
		});
		// 加载表单对应的数据
	if (this.productClassifyId != null
				&& this.productClassifyId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/supply/getScProductClassify.do?productClassifyId='
								+ this.productClassifyId,
						root : 'data',
						preName : 'scProductClassify'
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
					url : __ctxPath + '/supply/addScProductClassify.do',
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('SCProView');
						if (gridPanel != null) {
							Ext.getCmp('scProductClassifyTreePanel').root.reload();
							Ext.getCmp('SCProView').getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});