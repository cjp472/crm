/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UkKnowTemplateShowForm
 * @extends Ext.Window
 * @description UkKnowTemplate表单
 * @company 优创融联科技
 */
var knowTypeId_ = this.knowTypeId ? this.knowTypeId : -1; // 全局变量用于接收分类
UkKnowTemplateShowForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UkKnowTemplateShowForm.superclass.constructor.call(this, {
					id : 'UkKnowTemplateShowFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 270,
					width : 550,
					maximizable : true,
					title : '表单模板详情查看',
					buttonAlign : 'center',
					buttons : [{
								text : '返回',
								iconCls : 'btn-back',
								scope : this,
								handler : this.cancels
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		// 加载其对应的HTML或EXT表单
		this.formPanel = new Ext.form.FormPanel({
					// layout:'table',
					region : 'center',
					border : false,
					autoScroll : true,
					anchor : '96%,96%',
					unstyled : true,
					defaults : {
						anchor : '96%,96%'
					},
					autoLoad : {
						url : __ctxPath
								+ "/know/getVmUkSysKnow.do?knowTmpId="+this.knowTmpId,
						nocache : true,
						scope : this,
						callback : this.convertHtml
					}
				});
	},// end of the initcomponents
	// 转化Html
	convertHtml : function() {
				var formExt = document.getElementById('formExt');
				if (formExt != null) {
					// 加上标识，表示是使用EXT模板进行
					this.useTemplate = true;
					var valExt = formExt.value;
					if(valExt!=null){
						valExt = valExt.replace('Ext.form.FormPanel', 'Ext.Panel');
						this.formExtPanel = eval('new (' + valExt + ')('+ this.vmParams + ');');
						this.formPanel.add(this.formExtPanel);
						this.formPanel.doLayout();
					}else{
						Ext.ux.Toast.msg('操作信息', '对不起,您预览的数据没有模版信息,请联系技术人员增加!');
					}
					return;
				}
				this.formPanel.doLayout();
			},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.getForm().reset();
	},
	cancels : function() {
		
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('UkKnowTemplateShowFormWin');
		this.destroy();
//		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/know/saveUkKnowTemplate.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UkKnowTemplateGrid');
						var eform = Ext.getCmp('UkKnowTemplateShowFormWin');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});
