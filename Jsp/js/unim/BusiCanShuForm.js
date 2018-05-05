BusiCanShuForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BusiCanShuForm.superclass.constructor.call(this, {
			id : 'BusiCanShuFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 240,
			width : 500,
			maximizable : true,
			title : '指标参数配置',
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
			region : 'center',
			bodyStyle : 'padding:10px;background-color:#fff',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			// id : 'BusiCanShuForm',
			defaults : {
				anchor : '96%,96%'
			},
			buttonAlign : 'center',
			items : [{
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					border : false,
					columnWidth : .5,
					items : [{
						xtype : 'textfield',
						fieldLabel : '参数名',
						name : 'unimChaTarPar.paraName',
						anchor : '100%',
						allowBlank : false
					}, {
						xtype : 'combo',
						mode : 'local',
						editable : false,
						store:new Ext.data.ArrayStore({
							fields : ['targetId', 'targetName'],
							data :[]
						}),
						valueField : 'targetId',
						displayField : 'targetName',
						fieldLabel : '所属指标',
						triggerAction : 'all',
						name : 'unimChannelTarget.targetName',
						id : 'Unim_chaTarPar_Combo_TargetId',
						anchor : '100%',
						allowBlank : false
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .5,
					items : [{
						xtype : 'textfield',
						fieldLabel : '参数值',
						name : 'unimChaTarPar.paraValue',
						anchor : '100%',
						allowBlank : false
					},{
						xtype:'textfield',
						fieldLabel:'顺序',
						name : 'unimChaTarPar.orderno',
						anchor:'100%'
					}]
				}]
			}, {
				xtype : 'textarea',
				fieldLabel : '备注',
				name : 'unimChaTarPar.remark',
				anchor : '95%',
				height : 50
			}]
		});
		
		Ext.Ajax.request({
			url : __ctxPath + "/unim/getTarIdAndTarNameUnimChannelTarget.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				var iCount = result.length;
				if (iCount > 0) {
					var chArr = '[';
					for(var i=0;i<iCount;i++) {
						chArr += '[';
						chArr = chArr + result[i].targetId +',';
						chArr = chArr + "'" +result[i].targetName +"'";
						chArr +=']';
						if(i<iCount-1) {
							chArr +=',';
						}
					}
					chArr += ']';
					Ext.getCmp("Unim_chaTarPar_Combo_TargetId").getStore().loadData(eval(chArr));
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('操作提示', '加载超时，请联系管理员！');
			}
		});
		
		// 加载表单对应的数据
		if (this.paraId != null && this.paraId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/unim/getUnimChaTarPar.do?paraId='
						+ this.paraId,
				root : 'data',
				preName : 'unimChaTarPar',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					Ext.getCmp("Unim_chaTarPar_Combo_TargetId").setValue(thisObj.chTargetId);
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
		var targetId = Ext.getCmp("Unim_chaTarPar_Combo_TargetId").getValue();
		var paraId = '';
		if (this.paraId != null && this.paraId != 'undefined') {
			paraId = this.paraId;
		}
		$postSubForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath + '/unim/saveUnimChaTarPar.do?targetId='+targetId+'&paraId='+paraId,
			msgSuccess : '成功保存该记录！',
			msgFailure : '操作出错，请联系管理员！',
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('BusiCanShuViewGrid');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save

});