
BusiZhiBiaoForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BusiZhiBiaoForm.superclass.constructor.call(this, {
					id : 'BusiZhiBiaoFormWin',
					layout : 'fit',
					items :this.formPanel,
					modal : true,
					height : 240,
					width : 500,
					maximizable : true,
					title : '监控视图导航配置',
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
			region:'center',
			bodyStyle : 'padding:10px;background-color:#fff',
			border : false,
			autoScroll : true,
			labelAlign:'right',
			// id : 'BusiZhiBiaoForm',
			defaults : {
				anchor : '96%,96%'
			},
			buttonAlign:'center',
			items : [{
				layout:'column',
				border:false,
				items:[{
					layout:'form',
					border:false,
					columnWidth:.5,
					items:[{
						xtype:'textfield',
						fieldLabel:'指标名',
						name : 'unimChannelTarget.targetName',
						anchor:'100%',
						allowBlank:false
					},{
						xtype:'combo',
						mode:'local',
						store:new Ext.data.ArrayStore({
							fields : ['channelId', 'channelName'],
							data :[]
						}),
						valueField : 'channelId',
						displayField : 'channelName',
						triggerAction : 'all',
						name : 'unimChannel.channelId',
						id : 'Unim_ChTarget_Combo_chId',
						fieldLabel:'所属渠道',
						anchor:'100%'
					}]
				},{
					layout:'form',
					border:false,
					columnWidth:.5,
					items:[{
						xtype:'textfield',
//						xtype:'combo',
//						mode:'local',
//						store:[],
						name : 'unimChannelTarget.targetCode',
						fieldLabel:'编号',
						allowBlank:false,
						anchor:'100%'
					},{
						xtype:'combo',
						fieldLabel:'数据来源',
						anchor:'100%',
						mode:'local',
						triggerAction : 'all',
						allowBlank:false,
						editable : false,
						name : 'unimChannelTarget.srcTypeId',
						id : 'Unim_ChTarget_Combo_srcTypeId',
						store : new Ext.data.ArrayStore({
								fields : ['srcTypeId', 'srcTypeName'],
								data : [[ '1','自动推送'], ['2','参数配置']]
							}),
						valueField : 'srcTypeId',
						displayField : 'srcTypeName'
					}]
				}]
			},
//				{
//				layout:'column',
//				border:false,
//				items:[{
//					layout:'form',
//					border:false,
//					columnWidth:.9,
//					items:[{
//						xtype:'textfield',
//						fieldLabel:'指标数据',
//						name : 'unimChannelTarget.param',
//						anchor:'100%'
//					}]
//				},{
//					columnWidth:.1,
//					xtype:'button',
//					iconCls:'search'
//				}]
//			},
				{ 
			xtype:'textarea',
			fieldLabel:'备注',
			name : 'unimChannelTarget.remark',
			anchor:'95%',
			height:50
			}]
		});
		
		
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listForIdAndNameUnimChannel.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				var iCount = result.length;
				if (iCount > 0) {
					var chArr = '[';
					for(var i=0;i<iCount;i++) {
						chArr += '[';
						chArr = chArr + result[i].channelId +',';
						chArr = chArr + "'" +result[i].channelName +"'";
						chArr +=']';
						if(i<iCount-1) {
							chArr +=',';
						}
					}
					chArr += ']';
					Ext.getCmp("Unim_ChTarget_Combo_chId").getStore().loadData(eval(chArr));
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('操作提示', '加载超时，请联系管理员！');
			}
		});
		
		// 加载表单对应的数据
		if (this.targetId != null && this.targetId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/unim/getUnimChannelTarget.do?targetId=' + this.targetId,
						root : 'data',
						preName : 'unimChannelTarget',
						success : function(response, options) {
							var thisObj = Ext.util.JSON.decode(response.responseText).data;
							var chId = thisObj.channelIdStr;
							Ext.getCmp("Unim_ChTarget_Combo_chId").setValue(chId);
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
		var srcTypeId = Ext.getCmp("Unim_ChTarget_Combo_srcTypeId").getValue();
		var targetIdTmp = '';
		if (this.targetId != null && this.targetId != 'undefined') {
			targetIdTmp = this.targetId
		}
		var channelId = Ext.getCmp("Unim_ChTarget_Combo_chId").getValue();
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/unim/saveUnimChannelTarget.do?srcTypeIdVal='+srcTypeId+'&targetId='+targetIdTmp+'&channelId='+channelId,
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('BusiZhiBiaoGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});