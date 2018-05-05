var g_assetsCode_AGLF;
AssetGuanLiForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		AssetGuanLiForm.superclass.constructor.call(this, {
			id : 'AssetGuanLiFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 400,
			width : 600,
			maximizable : true,
			title : '资产详细信息',
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
			labelWidth:70,
			labelAlign : 'right',
			// id : 'AssetGuanLiForm',
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
					labelWidth:70,
					columnWidth : .5,
					items : [{
						xtype : 'textfield',
						fieldLabel : '名称',
						name : 'unimAssets.assetsName',
						anchor : '100%',
						allowBlank : false
					}, 
					{
						xtype : 'textfield',
						fieldLabel : '负责部门',
						name : 'unimAssets.depName',
						id : 'Unim_AssetsF_TXT_depName',
						anchor : '100%',
						allowBlank : false
					}, {
								xtype : 'hidden',
								name : 'unimAssets.depId',
								id : 'Unim_AssetsF_TXT_depId',
								anchor : '100%'
							}
					, {
						xtype:'combo',
						mode:'local',
						store:new Ext.data.ArrayStore({
							fields : ['catId', 'catName'],
							data :[]
						}),
						valueField : 'catId',
						allowBlank : false,
						displayField : 'catName',
						triggerAction : 'all',
						hiddenName : 'unimAssCategory.catId',
						id : 'Unim_AssetsF_Combo_catId',
						fieldLabel:'类型',
						anchor:'100%'
					},{
						fieldLabel : '状态',
						hiddenName : 'unimAssets.status',
						xtype : 'mtdiccombo',
						id : 'Unim_AssetsF_Combo_status',
						triggerAction : 'all',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'ZZJGZT0001',
						anchor : '100%'
					}]
				}, {
					layout : 'form',
					border : false,
					labelWidth:70,
					columnWidth : .5,
					items : [{
						xtype : 'textfield',
						name : 'unimAssets.assetsCode',
						id : 'Unim_AssetsF_TXT_assetsCode',
						fieldLabel : '编号',
						allowBlank : false,
						anchor : '100%'
					}
					,{
						columnWidth : .333,
						border : false,
						layout : 'column',
						items : [
								{
									layout : 'form',
									columnWidth : .9,
									border : false,
									items : [{
										fieldLabel : '负责人',
										name : 'unimAssets.perincharName',
										id : 'Unim_AssetsF_TXT_perName',
										xtype : 'textfield',
										readOnly : true,
										maxLength : 15,
										anchor : '100%'
									}]
								},
								{
									columnWidth : .1,
									border : false,
									hideLabel : true,
									xtype : 'button',
									iconCls : 'search',
									handler : function() {
										UserSelector.getView({callback : function(uId,uname,employeeid,depName,depId) {
																Ext.getCmp("Unim_AssetsF_TXT_depName").setValue(depName);
																Ext.getCmp("Unim_AssetsF_TXT_depId").setValue(depId);
																Ext.getCmp("Unim_AssetsF_TXT_perId").setValue(uId);
																Ext.getCmp("Unim_AssetsF_TXT_perName").setValue(uname);
															},
															scope : this
														})
												.show();
									}
								}]
					},
					{
						xtype:'combo',
						mode:'local',
						store:new Ext.data.ArrayStore({
							fields : ['typeId', 'typeName'],
							data :[]
						}),
						valueField : 'typeId',
						displayField : 'typeName',
						triggerAction : 'all',
						allowBlank : false,
						hiddenName : 'unimAssType.typeId',
						id : 'Unim_AssetsF_Combo_typeId',
						fieldLabel:'类别',
						anchor:'100%'
					},								
					 {
						xtype : 'hidden',
						name : 'unimAssets.perincharId',
						id : 'Unim_AssetsF_TXT_perId',
						anchor : '100%'
					}]
				}
				]
			},{
				xtype : 'textarea',
				fieldLabel : '描述',
				name : 'unimAssets.assDesc',
				anchor : '95%',
				height : 50
			},{
				xtype : 'textarea',
				fieldLabel : '备注',
				name : 'unimAssets.remark',
				anchor : '95%',
				height : 50
			}]
		});
		
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listOnlyUnimAssType.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				var iCount = result.length;
				if (iCount > 0) {
					var chArr = '[';
					for(var i=0;i<iCount;i++) {
						chArr += '[';
						chArr = chArr + result[i].typeId +',';
						chArr = chArr + "'" +result[i].typeName +"'";
						chArr +=']';
						if(i<iCount-1) {
							chArr +=',';
						}
					}
					chArr += ']';
					Ext.getCmp("Unim_AssetsF_Combo_typeId").getStore().loadData(eval(chArr));
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('操作提示', '加载超时，请联系管理员！');
			}
		});
		
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listOnlyUnimAssCategory.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				var iCount = result.length;
				if (iCount > 0) {
					var chArr = '[';
					for(var i=0;i<iCount;i++) {
						chArr += '[';
						chArr = chArr + result[i].catId +',';
						chArr = chArr + "'" +result[i].catName +"'";
						chArr +=']';
						if(i<iCount-1) {
							chArr +=',';
						}
					}
					chArr += ']';
					Ext.getCmp("Unim_AssetsF_Combo_catId").getStore().loadData(eval(chArr));
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('操作提示', '加载超时，请联系管理员！');
			}
		});
		
		// 加载表单对应的数据
		if (this.assetsId != null && this.assetsId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/unim/getUnimAssets.do?assetsId=' + this.assetsId,
				root : 'data',
				preName : 'unimAssets',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					g_assetsCode_AGLF = thisObj.assetsCode;
					Ext.getCmp("Unim_AssetsF_Combo_status").setValue(thisObj.status);
					Ext.getCmp("Unim_AssetsF_TXT_depId").setValue(thisObj.depId);
					Ext.getCmp("Unim_AssetsF_TXT_depName").setValue(thisObj.depName);
					Ext.getCmp("Unim_AssetsF_TXT_perId").setValue(thisObj.perincharId);
					Ext.getCmp("Unim_AssetsF_TXT_perName").setValue(thisObj.perName);
					
					var catName = thisObj.catName;
					if(catName) {
						var catArr = catName.split('_');
						Ext.getCmp("Unim_AssetsF_Combo_catId").setValue(catArr[0]);
					}
					
					var typName = thisObj.typName;
					if(typName) {
						var typArr = typName.split('_');
						Ext.getCmp("Unim_AssetsF_Combo_typeId").setValue(typArr[0]);
					}
					
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
		var assetsCode = Ext.getCmp("Unim_AssetsF_TXT_assetsCode").getValue();
		 var reg =/([a-zA-z_])([\w]*)$/g;
	    if(!reg.test(assetsCode)) { 
	         Ext.Msg.alert("信息提示","编号必须由字母、数字或下划线组成！");
	        return;
        }
        
        return;
        
		if (assetsCode != null &&assetsCode != 'undefined' && assetsCode!=g_assetsCode_AGLF) {
			var responsea = Ext.lib.Ajax.getConnectionObject().conn;
			responsea.open("POST",  __ctxPath + '/unim/isRepeatUnimAssets.do?assetsCode='+assetsCode, false);
			responsea.send(null);
			var result = Ext.util.JSON.decode(responsea.responseText);//解析数据
			if(result.success==true) {
				Ext.Msg.alert("信息提示","该编号重复，请修改！");
				Ext.getCmp("Unim_AssetsF_TXT_assetsCode").focus();
				return;
			}
		} else {
			Ext.Msg.alert("提示信息","编号不能为空！");
		}
		
		
		var assetsId = '';
		if (this.assetsId != null && this.assetsId != 'undefined') {
			assetsId = this.assetsId;
		}
		var depId = Ext.getCmp("Unim_AssetsF_TXT_depId").getValue();
		var perId = Ext.getCmp("Unim_AssetsF_TXT_perId").getValue();
		var catId = Ext.getCmp("Unim_AssetsF_Combo_catId").getValue();
		var typId = Ext.getCmp("Unim_AssetsF_Combo_typeId").getValue();
		var URL_LINK = __ctxPath + '/unim/saveUnimAssets.do?assetsId='+assetsId+'&depId='+depId+'&perId='+perId+'&catId='+catId+'&typId='+typId;
		$postSubForm({
			formPanel : this.formPanel,
			scope : this,
			url : URL_LINK,
			msgSuccess : '成功保存该记录！',
			msgFailure : '操作出错，请联系管理员！',
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('AssetGuanLiViewGrid');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save

});