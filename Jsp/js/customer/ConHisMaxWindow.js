
/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ConHisForm
 * @extends Ext.Window
 * @description ConHis最大化处理信息
 * @company 优创融联科技
 */
ConHisMaxWindow = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		//Ext.applyIf(this, _cfg);
		ConHisMaxWindow.superclass.constructor.call(this, {
					id : 'ConHisMaxWindow',
					layout : 'fit',
					html:_cfg.bob,
					modal : true,
					autoScroll:true,
					width:800,
					height:500,
					maximizable : true,
					title : '详情',
	                closeAction:'close',
	                plain:true,  
	                layout:'form',
					buttonAlign : 'center',
					buttons : [{
								text : '返回',
								iconCls : 'btn-back',
								scope : this,
								handler : function(){
									//Ext.getCmp('ConHisMaxWindow').html = "";
									ConHisMaxWindow22.close();
								   // Ext.getCmp('ConHisMaxWindow').close();
//								    Ext.getCmp('ConHisMaxWindow').destory();
								}
							}]
//					panel : new Ext.FormPanel({
//						items : [{
//							xtype : 'displayfield',
//							fieldLabel : '播放',
//							html : '<img src="/d:/160.png" />'/d:/160.png
//						}
//						]
//					})
					
				})
				
				;
	}// end of the constructor

});