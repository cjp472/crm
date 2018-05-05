
AssetFaZhiForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		AssetFaZhiForm.superclass.constructor.call(this, {
			id : 'AssetFaZhiFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 200,
			width : 550,
			maximizable : true,
			title : '指标阀值设置',
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
		var colorS = new Ext.ColorPalette({});
		colorS.on('select', function(p, v) {
					selectMenu.hide();
					Ext.get('colorSel').dom.style.color = '#' + v;
					Ext.getCmp('colorSel').setValue('#' + v);
				});

		var selectMenu = new Ext.menu.Menu({
					shadow : 'frame',
					id : 'selectColor',
					buttonAlign : 'right',
					items : colorS
				});

		var comboField = new Ext.form.TriggerField({
					editable : false,
					id : 'colorSel',
					name : 'unimAssetsTarget.extend1',
					fieldLabel : '颜色',
					anchor : '100%',
					width : 150,
					onTriggerClick : function() {
						if (this.menu == null) {
							this.menu = Ext.getCmp('selectColor');
						}
						this.menu.show(this.el, "tl-bl?");
					}
				});
		
		var colorS1 = new Ext.ColorPalette({});
		colorS1.on('select', function(p, v) {
					selectMenu1.hide();
					Ext.get('colorSel1').dom.style.color = '#' + v;
					Ext.getCmp('colorSel1').setValue('#' + v);
				});

		var selectMenu1 = new Ext.menu.Menu({
					shadow : 'frame',
					id : 'selectColor1',
					buttonAlign : 'right',
					items : colorS1
				});

		var comboField1 = new Ext.form.TriggerField({
					editable : false,
					id : 'colorSel1',
					name : 'unimAssetsTarget.extend1',
					fieldLabel : '颜色',
					anchor : '100%',
					width : 150,
					onTriggerClick : function() {
						if (this.menu == null) {
							this.menu = Ext.getCmp('selectColor1');
						}
						this.menu.show(this.el, "tl-bl?");
					}
				});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			labelWidth : 70,
			// id : 'UnimCategoryForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
				name : 'unimAssetsTarget.targetId',
				xtype : 'hidden',
//				xtype:'textfield',
				id:'unimAssetsTarget.targetId'
//				value : this.targetId == null ? '' : this.targetId
			},
			{
//				name : 'unimChaTarThrlevl.thrlevlId',
				xtype : 'hidden',
//				xtype:'textfield',
				id:'unimAssTarThrlevl_thrlevlId',
				value : this.thrlevlId == null ? '' : this.thrlevlId
			},
			{
						layout : 'column',
						xtype:'panel',
						border : false,
						items : [{
							layout:'form',
							border:false,
							columnWidth:.5,
							items:[{
									xtype:'textfield',
									fieldLabel:'阀值(提醒)',
									id:'unimAssetsTarget_id',
									name:'unimAssTarThrlevl.extend1',
									anchor:'100%'
								}]
						},{
							layout:'form',
							border:false,
							columnWidth:.5,
							items:[comboField]
						}]
					},{
						layout : 'column',
						xtype:'panel',
						border : false,
						items : [{
							layout:'form',
							border:false,
							columnWidth:.5,
							items:[{
									xtype:'textfield',
									fieldLabel:'阀值(警告)',
									id:'unimAssetsTargetg_id',
									name:'unimAssTarThrlevl.extend2',
									anchor:'100%'
								}]
						},{
							layout:'form',
							border:false,
							columnWidth:.5,
							items:[comboField1]
						}]
					}
			]
		});
		// 加载表单对应的数据
		if (this.targetId != null && this.targetId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/unim/getUnimAssetsTarget.do?targetId='
						+ this.targetId,
				root : 'data',
				preName : 'unimAssetsTarget',
						success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					var values=Ext.getCmp("unimAssetsTarget_id").getValue();
		            var colors=Ext.getCmp("colorSel").getValue();
		            var fazhiid=thisObj.thrlevlId;
					var unimThrlevl=thisObj.thrlevladv;
					var thrlevlwar=thisObj.thrlevlwar;
					Ext.getCmp("unimAssTarThrlevl_thrlevlId").setValue(fazhiid);
					if(unimThrlevl!=null && unimThrlevl!= 'undefineds'){
					    var zhuyi=unimThrlevl.split(",");
						Ext.getCmp("unimAssetsTarget_id").setValue(zhuyi[0]);
						Ext.getCmp("colorSel").setValue(zhuyi[1]);
						//Ext.getCmp("unimThrlevl_S").setValue(zhuyi[2]);
					}
					if(thrlevlwar!=null && thrlevlwar!= 'undefined'){
						var jinggao=thrlevlwar.split(",");
						Ext.getCmp("unimAssetsTargetg_id").setValue(jinggao[0]);
						Ext.getCmp("colorSel1").setValue(jinggao[1]);
						//Ext.getCmp("thrlevlwar_S").setValue(jinggao[2]);
					}

				},
				failure : function(response, options) {
				}
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
		var values=Ext.getCmp("unimAssetsTarget_id").getValue();
        var colors=Ext.getCmp("colorSel").getValue();
        var targetId=Ext.getCmp("unimAssetsTarget.targetId").getValue();  
        var jgvalue=Ext.getCmp("unimAssetsTargetg_id").getValue();
		var jgcolors=Ext.getCmp("colorSel1").getValue();
		var fazhiid= Ext.getCmp("unimAssTarThrlevl_thrlevlId").getValue();
		$postSubForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath + '/unim/saveUnimAssTarThrlevl.do',
			params : {
			values:values,
			colors:colors,
			targetId:targetId,
			jgvalue:jgvalue,
			jgcolors:jgcolors,
			fazhiid:fazhiid
			},
			msgSuccess : '成功修改该记录！',
			msgFailure : '操作出错，请联系管理员！',
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('UnimAssetsTarget');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save

});