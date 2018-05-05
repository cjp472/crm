UnimJianKongFaZhiForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UnimJianKongFaZhiForm.superclass.constructor.call(this, {
			id : 'UnimJianKongFaZhiFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 200,
			width : 550,
			maximizable : true,
			title : '人员阀值设置',
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
				name : 'unimCategory.catId',
				xtype : 'hidden',
				id:'catId',
				value : this.catId == null ? '' : this.catId
			},{
						layout : 'column',
						xtype:'panel',
						fieldLabel:'阀值(提醒)',
						border : false,
						items : [{
									xtype:'textfield',
									id:'unimThrlevl_H',
									name:'unimThrlevl.unimThrlevl',
//									value : this.thrlevladv == null ? '' : this.thrlevladv,
									width:100
								},{
									border:false,
									style:'margin:0 20px 0 10px', 
									html:'时'
								},{
									xtype:'textfield',
									id:'unimThrlevl_M',
									width:100
								},{
									border:false,
									style:'margin:0 20px 0 10px',
									html:'分'
								},{
									xtype:'textfield',
									id:'unimThrlevl_S',
									width:100
								},{
									border:false,
									style:'margin:0 20px 0 10px',
									html:'秒'
								}]
					},{
						layout : 'column',
						xtype:'panel',
						style:'margin-top:10px',
						fieldLabel:'阀值(警告)',
						border : false,
						items : [{
									xtype:'textfield',
									id:'thrlevlwar_H',
									name:'unimThrlevl.thrlevlwar',
									width:100
								},{
									border:false,
									style:'margin:0 20px 0 10px',
									html:'时'
								},{
									xtype:'textfield',
									id:'thrlevlwar_M',
//									name:'unimThrlevl.thrlevlwar',
									width:100
								},{
									border:false,
									style:'margin:0 20px 0 10px',
									html:'分'
								},{
									xtype:'textfield',
									id:'thrlevlwar_S',
//									name:'unimThrlevl.thrlevlwar',
									width:100
								},{
									border:false,
									style:'margin:0 20px 0 10px',
									html:'秒'
								}]
					}
			]
		});
		// 加载表单对应的数据
		if (this.catId != null && this.catId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/unim/getUnimCategory.do?catId='
						+ this.catId,
				root : 'data',
				preName : 'unimThrlevl',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					var miao=Ext.getCmp("unimThrlevl_S").getValue();
		            var oneshi=Ext.getCmp("thrlevlwar_H").getValue();
					var unimThrlevl=thisObj.thrlevladv;
					var thrlevlwar=thisObj.thrlevlwar;
					if(unimThrlevl!=null && unimThrlevl!= 'undefineds'){
					    var zhuyi=unimThrlevl.split(",");
						Ext.getCmp("unimThrlevl_H").setValue(zhuyi[0]);
						Ext.getCmp("unimThrlevl_M").setValue(zhuyi[1]);
						Ext.getCmp("unimThrlevl_S").setValue(zhuyi[2]);
					}
					if(thrlevlwar!=null && thrlevlwar!= 'undefined'){
						var jinggao=thrlevlwar.split(",");
						Ext.getCmp("thrlevlwar_H").setValue(jinggao[0]);
						Ext.getCmp("thrlevlwar_M").setValue(jinggao[1]);
						Ext.getCmp("thrlevlwar_S").setValue(jinggao[2]);
					}
//					var fen=Ext.getCmp("unimThrlevl_M").getValue();
//					var miao=Ext.getCmp("unimThrlevl_S").getValue();
//					
//					var oneshi=Ext.getCmp("thrlevlwar_H").getValue();
//					var onefen=Ext.getCmp("thrlevlwar_M").getValue();
//					var onemiao=Ext.getCmp("thrlevlwar_S").getValue();
//					var status=thisObj.status;
//					Ext.getCmp('unimMapNavigation.parentid').setValue(thisObj.parentid);
//					Ext.getCmp('treekey').setValue(thisObj.parentNam);
//					Ext.getCmp("unimMapNavigation_status_Id").setValue(QC_ZBZT.get(status));
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
		var shi=Ext.getCmp("unimThrlevl_H").getValue();
		var fen=Ext.getCmp("unimThrlevl_M").getValue();
		var miao=Ext.getCmp("unimThrlevl_S").getValue();
		
		var oneshi=Ext.getCmp("thrlevlwar_H").getValue();
		var onefen=Ext.getCmp("thrlevlwar_M").getValue();
		var onemiao=Ext.getCmp("thrlevlwar_S").getValue();
		
		var catId=Ext.getCmp("catId").getValue();
//		alert(shi+"=="+fen+"=="+miao+"=="+oneshi+"=="+onefen+"=="+onemiao);
		$postSubForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath + '/unim/saveUnimThrlevl.do',
			params : {
			catid:catId,
			shi:shi,
			fen:fen,
			miao:miao,
			oneshi:oneshi,
			onefen:onefen,
			onemiao:onemiao
			},
			msgSuccess : '成功修改该记录！',
			msgFailure : '操作出错，请联系管理员！',
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('UnimCategoryGrid');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save

});