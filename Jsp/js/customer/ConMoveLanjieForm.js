/**
 * @author:wangzj
 * @class ConMoveLanjieForm
 * @extends Ext.Window
 * @description 转移
 * @company 优创融联科技
 * @createtime: 2012年6月15日 10:06:08
 */
ConMoveLanjieForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConMoveLanjieForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					width:500,
					height:280,
					maximizable : true,
					title:'转移联络记录',
					id:'ConMoveLanjieFormWin',
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			labelWidth:50,
			style:'padding:10px;background-color:#fff',
			bodyStyle : 'padding:10px 10px 10px 10px',
			border : false,
			id : 'ConMoveLanjieForm',
			labelAlign : 'right',
			defaults : {
				anchor : '98%,98%'
			},
			defaultType : 'textfield',
			items:[{
				xtype : 'container',
				layout : 'column', 
				flex : 1,
				items : [{
						name : 'conIds',
						xtype : 'hidden',
						value : this.conId == null ? '' : this.conId
					}, {
						columnWidth : .5, 
						xtype : 'container',
						layout : 'form',
						items : [{
							xtype:'radio',
							boxLabel:'移入未处理',
							checked:true,
							name:'lanjieMove',
							inputValue:'weichuli',
							listeners:{
								'check':function(checkbox,checked){
									if(checked){
										Ext.get('lanjiyirulajixiang').dom.style.display = 'none';
									}
								}
							}
						}]},{
							columnWidth : .5, 
							xtype : 'container',
							layout : 'form',
							items : [{
								xtype:'radio',
								boxLabel:'移入垃圾箱',
								name:'lanjieMove',
								inputValue:'lajixiang',
								listeners:{
									'check':function(checkbox,checked){
										if(checked){
											Ext.get('lanjiyirulajixiang').dom.style.display = 'block';
										}
									}
								}
							}]
						}]},{
							xtype : 'container',
							layout:'form',
							border:false,
							style:'margin-top:10px;display:none',
							id:'lanjiyirulajixiang',
							flex : 1,
							items : [{
								fieldLabel:'原因',
								hiddenName : 'dealResId',
//								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CON_MOVE_REASON',
								anchor:'100%'
							},{
								xtype:'textarea',
								fieldLabel:'备注',
								name : 'dealRemarks',
								anchor:'100%',
								height:100
							},{
								name : 'mygridpanel',
								id : 'mygridpanel',
								maxLength : 200,
								xtype : 'hidden',
								value : this.mygridpanel == null ? '' : this.mygridpanel
							}]
						}]});

		// 初始化功能按钮
		this.buttons = [{
					text : '保存',
					iconCls : 'btn-save',
					scope : this,
					handler : this.save

				}, {
					text : '返回',
					iconCls : 'btn-cancel',
					scope : this,
					handler : this.cancel
				}];
	},// end of the initcomponents

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
		var mygridpanel = Ext.getCmp('mygridpanel').getValue();
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveFromLanjieConWeichuli.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp(mygridpanel);
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});
