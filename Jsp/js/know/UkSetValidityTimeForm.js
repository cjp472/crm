Ext.apply(Ext.form.VTypes, {
    BeginEndCheck :  function(value, field) {
    	var beginId = field.bedate.begin;
    	var endId = field.bedate.end;
    	var bdate = Ext.getCmp(beginId).getValue();
    	var edate = Ext.getCmp(endId).getValue();
    	if(bdate != '' && edate != ''){
    		return bdate <= edate;
    	} 
    	return true;
    },
    BeginEndCheckText: '开始日期大于等于结束日期！'
});
UkSetValidityTimeForm = Ext.extend(Ext.Window, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UkSetValidityTimeForm.superclass.constructor.call(this, {
							id : 'UkSetValidityTimeFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
						    width : 300,
						    height:140,
							maximizable : true,
							title : '设置有效期',
							buttonAlign : 'center',
							buttons : [
								{
									text : __save,
									iconCls : 'btn-save',
									scope : this,
									handler : this.save
								}, {
									text : __cancel,
									iconCls : 'btn-cancel',
									scope : this,
									handler : this.cancel
								}
					         ]
				});
			},//end of the constructor
			//初始化组件
			initUIComponents : function() {
				
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							bodyStyle : 'padding:10px',
							border : false,
							autoScroll:true,
							id : 'setPastTimeForm',
							labelAlign:'right',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'setTimeKnowIds',
								xtype : 'hidden',
								value : this.setTimeKnowIds == null
										? ''
										: this.setTimeKnowIds
							}, {
								xtype : 'datefield',
								anchor : '100%',
								id : 'ukSysKnow.enableTime',
								name : 'ukSysKnow.enableTime',
								format : 'Y-m-d',
								labelAlign : 'right',
								allowBlank : false,
								blankText : '开始日期不能为空!',
								fieldLabel : '开始日期',
								bedate : {begin : 'ukSysKnow.enableTime' , end : 'ukSysKnow.pastTime'},
								vtype : 'BeginEndCheck'
							}, {
								xtype : 'datefield',
								anchor : '100%',
								id : 'ukSysKnow.pastTime',
								name : 'ukSysKnow.pastTime',
								format : 'Y-m-d',
								labelAlign : 'right',
								allowBlank : false,
								blankText : '过期日期不能为空!',
								fieldLabel : '过期日期',
								bedate : {
									begin : 'ukSysKnow.enableTime',end : 'ukSysKnow.pastTime'
								},
								vtype : 'BeginEndCheck'
							}]
						});
			},//end of the initcomponents

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
			save : function() {
				$postForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/know/setPastKnowUkSysKnow.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UkPastSysKnowGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});