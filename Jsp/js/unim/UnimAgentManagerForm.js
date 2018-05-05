var g_agentId_UAMF 	= '';
var g_useId_UAMF 	= '';
var g_agtArray_UAMF = null;
var g_skgArray_UAMF	= null;
var g_mapArray_UAMF	= null;
var g_busArray_UAMF	= null;
var g_astArray_UAMF	= null;
var g_chnArray_UAMF = null;
var g_assArray_UAMF = null;

var g_uaMnAgtJsonTmp_UAMF 	= '';
var g_uaMapAgtJsonTmp_UAMF 	= '';
var g_uaMapBusJsonTMP_UAMF	= '';
var g_uaMapAssJsonTMP_UAMF	= '';
var g_uaSkgsJsonTmp_UAMF 	= '';
var g_uaChaAgtJsonTmp_UAMF	= '';
var g_uaAssAgtJsonTmp_UAMF	= '';

var g_isLoadAgt_UAMF = false;
var g_isLoadSkg_UAMF = false;
var g_isLoadChn_UAMF = false;
var g_isLoadAss_UAMF = false;
var g_isLoadAgtMap_UAMF = false;
var g_isLoadBusMap_UAMF = false;
var g_isLoadAstMap_UAMF = false;

UnimAgentManagerForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UnimAgentManagerForm.superclass.constructor.call(this, {
					id : 'UnimAgentManagerFormWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					height : 420,
					width : 500,
					maximizable : true,
					title : '授权信息',
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
		g_agentId_UAMF = this.agentId;
		g_agtArray_UAMF = new Array();
		g_skgArray_UAMF = new Array();
		g_mapArray_UAMF = new Array();
		g_chnArray_UAMF = new Array();
		g_assArray_UAMF = new Array();
		
		g_busArray_UAMF = new Array();
		g_astArray_UAMF = new Array();
		
		g_isLoadAgt_UAMF = true;
		g_isLoadSkg_UAMF = true;
		g_isLoadChn_UAMF = true;
		g_isLoadAss_UAMF = true;
		g_isLoadAgtMap_UAMF = true;
		g_isLoadBusMap_UAMF = true;
		g_isLoadAstMap_UAMF = true;
		
		var unimAgentUserId = new Ext.form.Hidden({
			fieldLabel : '用户内码',
			name : 'unimAgent.userId',
			id : 'Unim_AgentMF_Txt_UserId',
			xtype : 'hidden'
		});
		this.formPanel = new Ext.FormPanel({
					layout:'form',
					labelAlign:'right',
					border:false,
					labelWidth:70,
					items:[{
						layout:'column',
						border:false,
						items:[{
							columnWidth:.5,
							border:false,
							layout:'form',
							items:[
							{
							columnWidth : .333,
							border : false,
							layout : 'column',
							items : [
									{
										layout : 'form',
										columnWidth : .9,
										border : false,
										items : [{
											fieldLabel : '工号',
											name : 'unimAgent.employeeId',
											id : 'Unim_AgentMF_Txt_empId',
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
											UserSelector.getView({callback : function(uId,uname,employeeid,depName) {
																	Ext.getCmp("Unim_AgentMF_Txt_AgtNam").setValue(uname);
																	Ext.getCmp("Unim_AgentMF_Txt_UserId").setValue(uId);
																	Ext.getCmp("Unim_AgentMF_Txt_empId").setValue(employeeid);
																	Ext.getCmp("Unim_AgentMF_Txt_depName").setValue(depName);
																},
																scope : this
															})
													.show();
										}
									}]
						}
							]
						},{
							columnWidth:.5,
							border:false,
							layout:'form',
							items:[{
								fieldLabel : '姓名',
								name : 'unimAgent.agentName',
								id : 'Unim_AgentMF_Txt_AgtNam',
								xtype : 'textfield',
								maxLength : 15,
								anchor:'100%'
							}]
						}]
					},unimAgentUserId, {
						fieldLabel : '组织机构',
						name : 'unimAgent.depName',
						id : 'Unim_AgentMF_Txt_depName',
						xtype : 'textfield',
						anchor:'100%'
					},{
						layout:'column',
						border:false,
						items:[{
							columnWidth:.5,
							border:false,
							layout:'form',
							items:[{
									fieldLabel : '职务',
									allowBlank : false,
									name : 'unimAgent.jobType_form',
									hiddenName : 'unimAgent.jobType',
									id : 'Unim_AMF_jobType_Combo_Id',
									xtype : 'mtdiccombo',
									editable : false,
									allowBlank : false,
									triggerAction : 'all',
									lazyInit : false,
									forceSelection : false,
									itemKey : 'ZW001',
									anchor : '100%'
									,listeners : {
										'select' : function(combo,rec,index) {
											Ext.getCmp("Unim_AMF_JobType_Hidden").setValue(combo.getValue());
										}
									}
							},{
								xtype : 'hidden',
								name : 'hiddenJobType',
								id : 'Unim_AMF_JobType_Hidden'
							}]
						},{
							columnWidth:.5,
							border:false,
							layout:'form',
							items:[
								{
									fieldLabel : '职级',
									allowBlank : false,
									name : 'unimAgent.jobClass_form',
									hiddenName : 'unimAgent.jobClass',
									id : 'Unim_AMF_jobClass_Combo_Id',
									xtype : 'mtdiccombo',
									editable : false,
									allowBlank : false,
									lazyInit : false,
									triggerAction : 'all',
									forceSelection : false,
									itemKey : 'ZJ001',
									anchor : '100%'
									,listeners : {
										'select' : function(combo,rec,index) {
											Ext.getCmp("Unim_AMF_JobClass_Hidden").setValue(combo.getValue());
										}
									}
							},{
								xtype : 'hidden',
								name : 'hiddenJobClass',
								id : 'Unim_AMF_JobClass_Hidden'
							}
							]
						}]
					}]
				});
				
		this.panel = new Ext.TabPanel({
			activeTab : 0,
			plain : true,
			bodyStyle : 'padding:5px;',
			items : [{
				title:'用户信息',
				items:[this.formPanel]
				
			},{
				title:'员工',
				border:false,
				id : 'Unim_AgtMF_Agt_Form_Id',
				layout:'column',
				columns:3,
				tbar:[
					'->',{
						text:'全选',
						handler:function(){
						var items = Ext.getCmp('Unim_AgtMF_Agt_Form_Id').items.items;
						for (var i=0;i<items.length;i++){
							items[i].setValue(true);
						}
					}
					},{
						text:'全不选',
						handler:function(){
						var items = Ext.getCmp('Unim_AgtMF_Agt_Form_Id').items.items;
						for (var i=0;i<items.length;i++){
							items[i].setValue(false);
						}
					}
					},{
						text:'反选',
						handler:function(){
						var items = Ext.getCmp('Unim_AgtMF_Agt_Form_Id').items.items;
						for (var i=0;i<items.length;i++){
							var checked =  items[i].checked ? false : true
							items[i].setValue(checked);
						}
					}
					}],
				items:[]
			},{
				title:'业务组',
				border:false,
				layout:'column',
				columns:3,
				id:'Unim_AgtMF_Skg_Form_Id',
				items:[]
			},{
				title:'渠道',
				border:false,
				layout:'column',
				columns:3,
				id : 'Unim_AgtMF_Channel_Form_Id',
				items:[]
			},{
				title:'资产',
				border:false,
				layout:'column',
				columns:3,
				id : 'Unim_AgtMF_Assets_Form_Id',
				items:[]
			},{
				title:'人员视图',
				border:false,
				layout:'column',
				columns:3,
				id : 'Unim_AgtMF_AgtMap_Form_Id',
				items:[]
			},{
				title:'业务视图',
				border:false,
				layout:'column',
				columns:3,
				id : 'Unim_AgtMF_BusiMap_Form_Id',
				items:[]
			},{
				title:'资产视图',
				border:false,
				layout:'column',
				columns:3,
				id : 'Unim_AgtMF_AsstMap_Form_Id',
				items:[]
			}]
			,listeners : {
				'tabchange' : function(p) {
					var changePanelID = p.activeTab.getId();
					if(changePanelID == 'Unim_AgtMF_Agt_Form_Id' && g_isLoadAgt_UAMF==true) {
							g_isLoadAgt_UAMF = false;
							var uaMnAgtJsonTmp = g_uaMnAgtJsonTmp_UAMF;
							if(uaMnAgtJsonTmp!=null && uaMnAgtJsonTmp!='undefined' && uaMnAgtJsonTmp!='') {
								var arr = uaMnAgtJsonTmp.split('_');
								var iCount = arr.length;
								if(iCount>0) {
									for(var i=0;i<iCount;i++) {
										if(arr[i]) {
											var id = 'agt'+arr[i];
											if(id) {
												Ext.getCmp(id).setValue(true);
											}
										}
									}
								}
							}
					}
					else if(changePanelID == 'Unim_AgtMF_Skg_Form_Id' && g_isLoadSkg_UAMF == true) {
						g_isLoadSkg_UAMF = false;
						var uaSkgsJsonTmp = g_uaSkgsJsonTmp_UAMF; 
						if(uaSkgsJsonTmp!=null && uaSkgsJsonTmp!='undefined' && uaSkgsJsonTmp!='') {
							var arr = uaSkgsJsonTmp.split('_');
							var iCount = arr.length;
							if(iCount>0) {
								for(var i=0;i<iCount;i++) {
									if(arr[i]!= null && arr[i]!= 'undefined' && arr[i]!='') {
										var id = 'skg'+arr[i];
										Ext.getCmp(id).setValue(true);
									}
								}
							}
						}
					} 
					else if(changePanelID == 'Unim_AgtMF_Channel_Form_Id' && g_isLoadChn_UAMF == true){ 
						g_isLoadChn_UAMF = false;
						var uaChaAgtJsonTmp =  g_uaChaAgtJsonTmp_UAMF;
						if(uaChaAgtJsonTmp!=null && uaChaAgtJsonTmp!='undefined' && uaChaAgtJsonTmp!='') {
							var arr = uaChaAgtJsonTmp.split('_');
							var iCount = arr.length;
							if(iCount>0) {
								for(var i=0;i<iCount;i++) {
									if(arr[i]) {
										var id = 'chn'+arr[i];
										Ext.getCmp(id).setValue(true);
									}
								}
							}
						}
					} 
					else if(changePanelID == 'Unim_AgtMF_Assets_Form_Id' && g_isLoadAss_UAMF == true) {
						g_isLoadAss_UAMF = false;
						var uaAssAgtJsonTmp = g_uaAssAgtJsonTmp_UAMF;
						if(uaAssAgtJsonTmp!=null && uaAssAgtJsonTmp!='undefined' && uaAssAgtJsonTmp!='') {
							var arr = uaAssAgtJsonTmp.split('_');
							var iCount = arr.length;
							if(iCount>0) {
								for(var i=0;i<iCount;i++) {
									if(arr[i]!= null && arr[i]!= 'undefined' && arr[i]!='') {
										var id = 'ass'+arr[i];
										Ext.getCmp(id).setValue(true);
									}
								}
							}
						}
						
					} 
					else if(changePanelID == 'Unim_AgtMF_AgtMap_Form_Id' && g_isLoadAgtMap_UAMF == true) {
						g_isLoadAgtMap_UAMF = false;
						var uaMapAgtJsonTmp = g_uaMapAgtJsonTmp_UAMF;
						if(uaMapAgtJsonTmp!=null && uaMapAgtJsonTmp!='undefined' && uaMapAgtJsonTmp!='') {
							var arr = uaMapAgtJsonTmp.split('_');
							var iCount = arr.length;
							if(iCount>0) {
								for(var i=0;i<iCount;i++) {
									if(arr[i]!= null && arr[i]!= 'undefined' && arr[i]!='') {
										var id = 'map'+arr[i];
										Ext.getCmp(id).setValue(true);
									}
								}
							}
						}
					}
					else if(changePanelID == 'Unim_AgtMF_BusiMap_Form_Id' && g_isLoadBusMap_UAMF == true) {
						g_isLoadBusMap_UAMF = false;
						var uaMapBusJsonTMP = g_uaMapBusJsonTMP_UAMF;
						if(uaMapBusJsonTMP!=null && uaMapBusJsonTMP!='undefined' && uaMapBusJsonTMP!='') {
							var arr = uaMapBusJsonTMP.split('_');
							var iCount = arr.length;
							if(iCount>0) {
								for(var i=0;i<iCount;i++) {
									if(arr[i]!= null && arr[i]!= 'undefined' && arr[i]!='') {
										var id = 'bus'+arr[i];
										Ext.getCmp(id).setValue(true);
									}
								}
							}
						}
					}
					else if(changePanelID == 'Unim_AgtMF_AsstMap_Form_Id' && g_isLoadAstMap_UAMF == true) {
						g_isLoadAstMap_UAMF = false;
						var uaMapAssJsonTMP = g_uaMapAssJsonTMP_UAMF;
						if(uaMapAssJsonTMP!=null && uaMapAssJsonTMP!='undefined' && uaMapAssJsonTMP!='') {
							var arr = uaMapAssJsonTMP.split('_');
							var iCount = arr.length;
							if(iCount>0) {
								for(var i=0;i<iCount;i++) {
									if(arr[i]!= null && arr[i]!= 'undefined' && arr[i]!='') {
										var id = 'ast'+arr[i];
										Ext.getCmp(id).setValue(true);
									}
								}
							}
						}
					}
				}
			}
		});
		
		//====监控坐席
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listAgtUnimAgent.do?Q_ismonitor_L_EQ=0",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				var iCount = result.length;
				if(iCount>0) {
					for(var i=0;i<iCount;i++) {
						var labelName = result[i].agentName==null?' ':result[i].agentName;
						var id = 'agt'+result[i].agentId;
						var val = result[i].agentId;
						Ext.getCmp('Unim_AgtMF_Agt_Form_Id').add({
								boxLabel:labelName,
								xtype:'checkbox',
								columnWidth:.333,
								id : id,
								inputValue:val
						});
						g_agtArray_UAMF.push(id);
					}
			         Ext.getCmp('Unim_AgtMF_Agt_Form_Id').doLayout();
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('提示信息', '座席列表加载失败，请联系管理员!');
			}
		});
		
		//====技能组面板加载
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listUnimSkillgroup.do?Q_status_SN_EQ=1",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText).result;//解析数据
				var iCount = result.length;
				if(iCount>0) {
					for(var i=0;i<iCount;i++) {
						var labelName = result[i].skgName==null?' ':result[i].skgName;
						var id = 'skg'+result[i].skgId;
						
						Ext.getCmp('Unim_AgtMF_Skg_Form_Id').add({
								boxLabel:labelName,
								xtype:'checkbox',
								columnWidth:.333,
								id:id
						});
						g_skgArray_UAMF.push(id);
					}
			         Ext.getCmp('Unim_AgtMF_Skg_Form_Id').doLayout();
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('提示信息', '座席列表加载失败，请联系管理员!');
			}
		});
		
		//====人员视图
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listUnimAgentMap.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText).result;//解析数据
				var iCount = result.length;
				if(iCount>0) {
					for(var i=0;i<iCount;i++) {
						var labelName = result[i].mapName==null?' ':result[i].mapName;
						var id = 'map'+result[i].mapId;
						Ext.getCmp('Unim_AgtMF_AgtMap_Form_Id').add({
								boxLabel:labelName,
								xtype:'checkbox',
								columnWidth:.333,
								id:id
						});
						g_mapArray_UAMF.push(id);
					}
			         Ext.getCmp('Unim_AgtMF_AgtMap_Form_Id').doLayout();
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('提示信息', '座席列表加载失败，请联系管理员!');
			}
		});
		
		//====业务视图
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listUnimChannelMap.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText).result;//解析数据
				var iCount = result.length;
				if(iCount>0) {
					for(var i=0;i<iCount;i++) {
						var labelName = result[i].mapName==null?' ':result[i].mapName;
						var id = 'bus'+result[i].mapId;
						Ext.getCmp('Unim_AgtMF_BusiMap_Form_Id').add({
								boxLabel:labelName,
								xtype:'checkbox',
								columnWidth:.333,
								id:id
						});
						g_busArray_UAMF.push(id);
					}
			         Ext.getCmp('Unim_AgtMF_BusiMap_Form_Id').doLayout();
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('提示信息', '座席列表加载失败，请联系管理员!');
			}
		});
		
		//====资产视图
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listUnimAssetsMap.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText).result;//解析数据
				var iCount = result.length;
				if(iCount>0) {
					for(var i=0;i<iCount;i++) {
						var labelName = result[i].mapName==null?' ':result[i].mapName;
						var id = 'ast'+result[i].mapId;
						Ext.getCmp('Unim_AgtMF_AsstMap_Form_Id').add({
								boxLabel:labelName,
								xtype:'checkbox',
								columnWidth:.333,
								id:id
						});
						g_astArray_UAMF.push(id);
					}
			         Ext.getCmp('Unim_AgtMF_AsstMap_Form_Id').doLayout();
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('提示信息', '座席列表加载失败，请联系管理员!');
			}
		});
		
		//====渠道
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listUnimChannel.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText).result;//解析数据
				var iCount = result.length;
				if(iCount>0) {
					for(var i=0;i<iCount;i++) {
						var labelName = result[i].channelName==null?' ':result[i].channelName;
						var id = 'chn'+result[i].channelId;
						Ext.getCmp('Unim_AgtMF_Channel_Form_Id').add({
								boxLabel:labelName,
								xtype:'checkbox',
								columnWidth:.333,
								id:id
						});
						g_chnArray_UAMF.push(id);
					}
			         Ext.getCmp('Unim_AgtMF_Channel_Form_Id').doLayout();
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('提示信息', '座席列表加载失败，请联系管理员!');
			}
		});
		
		//====资产
		Ext.Ajax.request({
			url : __ctxPath + "/unim/listUnimAssets.do",
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText).result;//解析数据
				var iCount = result.length;
				if(iCount>0) {
					for(var i=0;i<iCount;i++) {
						var labelName = result[i].assetsName==null?' ':result[i].assetsName;
						var id = 'ass'+result[i].assetsId;
						Ext.getCmp('Unim_AgtMF_Assets_Form_Id').add({
								boxLabel:labelName,
								xtype:'checkbox',
								columnWidth:.333,
								id:id
						});
						g_assArray_UAMF.push(id);
					}
			         Ext.getCmp('Unim_AgtMF_Assets_Form_Id').doLayout();
				}
			},
			failure : function() {
				Ext.ux.Toast.msg('提示信息', '座席列表加载失败，请联系管理员!');
			}
		});
		
		// 加载表单对应的数据
		if (this.agentId != null && this.agentId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath	+ '/unim/getMonitorInfoUnimAgent.do?agentId=' + this.agentId,
				root : 'data',
				preName : 'unimAgent',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					g_useId_UAMF = thisObj.userId;
					g_aid_UAF = thisObj.aid;
					Ext.getCmp("Unim_AMF_JobType_Hidden").setValue(thisObj.jobType);
					Ext.getCmp("Unim_AMF_JobClass_Hidden").setValue(thisObj.jobClass);
					
					Ext.getCmp("Unim_AMF_jobType_Combo_Id").setValue(thisObj.jobType);
					Ext.getCmp("Unim_AMF_jobClass_Combo_Id").setValue(thisObj.jobClass);
					
					//====监控坐席
					var uaMnAgtJsonTmp = thisObj.uaMnAgtJson;
					g_uaMnAgtJsonTmp_UAMF = uaMnAgtJsonTmp;
					
					//====坐席地图
					var uaMapAgtJsonTmp = thisObj.uaMapAgtJson;
					g_uaMapAgtJsonTmp_UAMF = uaMapAgtJsonTmp;
					
					//====业务地图
					var uaMapBusJsonTmp = thisObj.uaMapBusJson;
					g_uaMapBusJsonTMP_UAMF = uaMapBusJsonTmp;
					
					//====资产地图
					var uaMapAssJsonTmp = thisObj.uaMapAssJson;
					g_uaMapAssJsonTMP_UAMF = uaMapAssJsonTmp;
					
					//====技能组
					var uaSkgsJsonTmp = thisObj.uaSkgsJson;
					g_uaSkgsJsonTmp_UAMF = uaSkgsJsonTmp;
					
					//====渠道
					var uaChaAgtJsonTmp = thisObj.uaChaAgtJson;
					g_uaChaAgtJsonTmp_UAMF = uaChaAgtJsonTmp; 
					
					//====资产
					var uaAssAgtJsonTmp = thisObj.uaAssAgtJson;
					g_uaAssAgtJsonTmp_UAMF = uaAssAgtJsonTmp;
					
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
		var useId = Ext.getCmp("Unim_AgentMF_Txt_UserId").getValue();
		if (useId != null && useId!= 'undefined' && useId!=g_useId_UAMF) {
			var responsea = Ext.lib.Ajax.getConnectionObject().conn;
			responsea.open("POST",  __ctxPath + '/unim/isRepeatUserUnimAgent.do?useId='+useId, false);
			responsea.send(null);
			var result = Ext.util.JSON.decode(responsea.responseText);//解析数据
			if(result.success==true) {
				Ext.Msg.alert("信息提示","该用户工号重复，请修改！");
				return;
			}
		}
		
		
		//====获取监控的坐席
		var agtIds = '';
		var iCountGrp = g_agtArray_UAMF.length;
		for(var i=0;i<iCountGrp;i++) {
			var id = g_agtArray_UAMF[i];
			var isChecked = Ext.getCmp(id).getValue();
			if(isChecked){
				agtIds += id.substring(3);
				if(i<iCountGrp-1) {
					agtIds += '_';
				}
			}
		}
		
		//====获取技能组
		var skgIds = '';
		var iCountSkg = g_skgArray_UAMF.length;
		for(var i=0;i<iCountSkg;i++) {
			var id = g_skgArray_UAMF[i];
			var isChecked = Ext.getCmp(id).getValue();
			if(isChecked){
				skgIds += id.substring(3);
				if(i<iCountGrp-1) {
					skgIds += '_';
				}
			}
		}
		
		//====获取坐席地图
		var mapIds = '';
		var iCountMap = g_mapArray_UAMF.length;
		for(var i=0;i<iCountMap;i++) {
			var id = g_mapArray_UAMF[i];
			var isChecked = Ext.getCmp(id).getValue();
			if(isChecked){
				mapIds += id.substring(3);
				if(i<iCountGrp-1) {
					mapIds += '_';
				}
			}
		}
		
		//====获取业务视图
		var busIds = '';
		var iCountBus = g_busArray_UAMF.length;
		for(var i=0;i<iCountBus;i++) {
			var id = g_busArray_UAMF[i];
			var isChecked = Ext.getCmp(id).getValue();
			if(isChecked){
				busIds += id.substring(3);
				if(i<iCountGrp-1) {
					busIds += '_';
				}
			}
		}
		
		//====获取资产视图
		var astIds = '';
		var iCountAst = g_astArray_UAMF.length;
		for(var i=0;i<iCountAst;i++) {
			var id = g_astArray_UAMF[i];
			var isChecked = Ext.getCmp(id).getValue();
			if(isChecked){
				astIds += id.substring(3);
				if(i<iCountGrp-1) {
					astIds += '_';
				}
			}
		}
		
		//====获取渠道
		var chnIds = '';
		var iCountChn = g_chnArray_UAMF.length;
		for(var i=0;i<iCountChn;i++) {
			var id = g_chnArray_UAMF[i];
			var isChecked = Ext.getCmp(id).getValue();
			if(isChecked){
				chnIds += id.substring(3);
				if(i<iCountChn-1) {
					chnIds += '_';
				}
			}
		}
		
		//====获取资产
		var assIds = '';
		var iCountAss = g_assArray_UAMF.length;
		for(var i=0;i<iCountAss;i++) {
			var id = g_assArray_UAMF[i];
			var isChecked = Ext.getCmp(id).getValue();
			if(isChecked){
				assIds += id.substring(3);
				if(i<iCountAss-1) {
					assIds += '_';
				}
			}
		}
		
		var moAgtId = '';
		if(g_agentId_UAMF) {
			moAgtId = g_agentId_UAMF;
		}
		
		var jobType = Ext.getCmp("Unim_AMF_JobType_Hidden").getValue();
		var jobClass = Ext.getCmp("Unim_AMF_JobClass_Hidden").getValue();
		var url=__ctxPath + '/unim/saveMonitorUnimAgent.do?agtIds='+agtIds+'&skgIds='+skgIds+'&mapIds='+mapIds+'&chnIds='+chnIds
							+'&assIds='+assIds+'&moAgtId='+moAgtId+'&jobType='+jobType+'&jobClass='+jobClass+'&busIds='+busIds+'&astIds='+astIds;
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : url,
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UnimAgentManagerGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});