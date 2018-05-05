/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QcCheckForm
 * @extends Ext.Window
 * @description QcCheck表单
 * @company 优创融联科技
 */
QcCheckForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		//alert(this.showPanel.id);
		QcCheckForm.superclass.constructor.call(this, {
					id : 'QcCheckFormWin',
					layout : 'border',
					//region : 'center',
					items : [this.formPanel, this.showPanel],
					modal : true,
					//height : 400,
					width : 500,
					autoScroll:true,
					maximizable : true,
					title : '质检考核详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.Panel({
			region: 'center',
			//autoHeight : true,
			height:400,
			autoScroll:true,
			//style:'height:100%;',
			autoLoad:{
				url:  __ctxPath+'/qucon/showCheckQcCheck.do?id='+this.chkId,
//				url:  __ctxPath+'/qucon/showTemplateQcTemplate.do?id=26',
                callback: disInput,
                scope: this,
                discardUrl: true,
                nocache: false,
                text: "Loading...",
                timeout: 30,
                scripts: true 
			}
		});

		this.showPanel = new Ext.Panel( {
			region: 'south',
			height:100,
			items:[{
				layout : "column",
				xtype : 'container',
				items : [{
					columnWidth : .3,// 第一列
					layout : "form",
					border : false,
					items : [{
					fieldLabel : '考核人',
					xtype : 'textfield',
					name : 'qcCheck.chkUserName'}]
				}, {
					columnWidth : .3,// 第一列
					layout : "form",
					border : false,
					items : [{
					fieldLabel : '被考核人',
					name : 'qcCheck.toUserName',
					xtype : 'textfield'}]
				}]
			},{
				layout : "column",
				xtype : 'container',
				items : [{
					columnWidth : .3,// 第一列
					layout : "form",
					border : false,
					items : [{
					fieldLabel : '考核时间',
					xtype : 'textfield',
					name : 'qcCheck.chkTimeSta',
					format : 'Y-m-d'}]
				}, {
					columnWidth : .3,// 第一列
					layout : "form",
					border : false,
					items : [{
					fieldLabel : '考核结束时间',
					name : 'qcCheck.chkTimeEnd',
					xtype : 'textfield',
					format : 'Y-m-d'}]
				}]
			}]
		});
		// 加载表单对应的数据
		if (this.chkId != null && this.chkId != 'undefined') {
			this.showPanel.loadData({
						url : __ctxPath + '/qucon/getQcCheck.do?chkId='
								+ this.chkId,
						root : 'data',
						preName : 'qcCheck'
					});
		}
	},// end of the initcomponents
	
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');// 获得tab
		tabs.remove('QcCheckFormWin');// 移除创建的窗口
	},
});
function disInput(){
	var dis = document.getElementById("disable").value;
	if(dis == 'true'){
		var inputList = document.getElementsByTagName("input");
		for(var t = 0; t < inputList.length; t++){
			inputList[t].disabled = true;
		}
		var areaList = document.getElementsByTagName("textarea");
		for(t = 0; t < areaList.length; t++){
			areaList[t].disabled = true;
		}
	}
}