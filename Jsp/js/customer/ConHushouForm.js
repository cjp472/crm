/**
 * @description 分配放弃的请求
 * @class UserSelector
 * @author 优创融联科技
 * @updater cyy
 * @createtime 
 */
var fenpeiSelector = {


	getView : function() {
		
		
		var panel = this.initPanel();
		// window
		var window = new Ext.Window({
					id : 'fenpeiSelectorWin',
					title : '分配放弃的请求',
					iconCls : 'menu-appuser',
					width : 800,
					minWidth : 800,
					height : 520,
					minHeight : 480,
					layout : 'border',
					border : false,
					maximizable : true,
					resizable : true,
					modal : true,
					items : [panel],
					buttonAlign : 'center',
					buttons : [{
								text : '确认',
								iconCls : 'btn-ok',
								scope : this,
								handler : function(){
									Ext.getCmp('fenpeiSelectorWin').close();
								}
							}, {
								text : '关闭',
								iconCls : 'btn-cancel',
								scope : this,
								handler : function(){
									Ext.getCmp('fenpeiSelectorWin').close();
								}
							}]
				});

		return window;
	},

	/**
	 * 组件初始化
	 * 
	 * @param isSingle
	 *            是否单选,默认单选
	 */
	initPanel : function() {
		
		var panel = new Ext.TabPanel({
					// TODO panel总面板
					id : 'fenpeiPanel',
					activeTab : 0,//激活第一个panel
					anchor : '100%,100%',
					region:'center',
					plain:true,
					items:[{
							title : '用户组',
							layout : 'fit',
							defaults : {
								anchor : '100%,100%'
							},
							id:'fenpeiusergroup',
							//style:'display:none',
							items:[AppUserForm.prototype.initGroupSelectPanel()]
						},{
							id:'fenpeiuser',
							title : '用户',
							layout : 'fit',
							defaults : {
								anchor : '100%,100%'
							},
							//style:'display:none',
							items:[ugUserSelector.getView(function(){},false,false,false,'',true)]
						}]
				}); 
		return panel;
	} // init

};
