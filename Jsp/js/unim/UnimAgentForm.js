var g_agentId_UAF = '';
var g_aid_UAF = '';
UnimAgentForm = Ext
		.extend(
				Ext.Panel,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents(_cfg);
						UnimAgentForm.superclass.constructor.call(this, {
							id : 'UnimAgentFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 420,
							width : 500,
							maximizable : true,
							title : '员工详细信息',
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
					initUIComponents : function(_cfg) {
						g_agentId_UAF = this.agentId == null?'': (this.agentId == undefined? '': this.agentId);
						this.gridPanel = new HT.EditorGridPanel(
								{
									region : 'center',
									printable : false,
									id : 'unimAgentFormGrid',
									showPaging : false,
									//			showNum:false,
									tbar : [
											'->',
											{
												text : '添加',
												iconCls : 'btn-add',
												handler : function() {
													//					var recordType = Ext.getCmp('unimAgentFormGrid').getStore().recordType;
													//					Ext.getCmp('unimAgentFormGrid').getStore().add(new recordType())
													var store = Ext
															.getCmp(
																	'unimAgentFormGrid')
															.getStore();
													var recordType = store.recordType;
													store
															.add(new recordType(
																	{})); // 添加一行空store
												}
											},
											{
												text : '删除',
												iconCls : 'btn-delete',
												handler : function() {
													var store = Ext
															.getCmp(
																	"unimAgentFormGrid")
															.getStore();
													var sm = Ext
															.getCmp(
																	"unimAgentFormGrid")
															.getSelectionModel();
													var cell = sm
															.getSelections();
													if (cell.length < 1) {
														Ext.ux.Toast.msg(
																'提示信息',
																'请至少选择一条记录!');
													} else {
														store.remove(cell);
													}
												}
											}],
									height : 150,
									exportable : false,
									url : __ctxPath	+ "/unim/listByAgentForUnimSkillgroup.do?agentId="	+ g_agentId_UAF,
									fields : [{
										name : 'skgId',
										type : 'int'
									}, 'skgCode', 'skgName'],
									columns : [
											{
												header : 'skgId',
												dataIndex : 'skgId',
												hidden : true
											},
											{
												header : '技能组',
												dataIndex : 'skgName',
												editor : new Ext.form.ComboBox(
														{
															mode : 'local',
															id : 'Unim_AgtForm_SkillG_Store_Id',
															store : new Ext.data.ArrayStore(
																	{
																		fields : [
																				'skgId',
																				'skgName',
																				'skgIdAndSkgName'],
																		data : []
																	}),
															valueField : 'skgIdAndSkgName',
															displayField : 'skgName',
															triggerAction : 'all',
															listeners : {
																'select' : function(combo,record,index) {
																	var thisObj = false;
																	var store = Ext.getCmp('unimAgentFormGrid').getStore();
																	store.each(function(rec) {
																		var dataTmp = combo.getValue();
																		var dataArr = dataTmp.split('_');
																		if(dataArr[0]==rec.get('skgId')) {
																			Ext.ux.Toast.msg('提示信息', '该技能组已添加!');
																			store.remove(rec);
																			return;
																		}
																	})
																}
															}
														}),
												renderer : function(val, cls, record) {
													if (val) {
														var valArr = val.split("_");
														if(valArr.length>1) {
															record.data.skgId = valArr[0];
															return valArr[1];
														}
													}
													return val;
												}
											}]
								// end of columns
								});
						var unimAgentUserId = new Ext.form.Hidden({
							fieldLabel : '用户内码',
							name : 'unimAgent.userId',
							id : 'Unim_AgentF_Txt_UserId',
							xtype : 'hidden'
						});

						this.formPanel = new Ext.FormPanel(
								{
									layout : 'form',
									bodyStyle : 'padding:10px',
									border : false,
									autoScroll : true,
									labelAlign : 'right',
									labelWidth : 70,
									// id : 'UnimAgentForm',
									defaults : {
										anchor : '96%,96%'
									},
									items : [
											{
												name : 'unimAgent.agentId',
												xtype : 'hidden',
												value : this.agentId == null
														? ''
														: this.agentId
											},
											{
												layout : 'column',
												border : false,
												hidden:g_agentId_UAF==''?false:true,
												items : [{
													layout : 'form',
													border : false,
													columnWidth : .333,
													items : [{
														fieldLabel : '批量添加',
														xtype : 'checkbox',
														id : 'Unim_AgtF_checkbox_Id'
													}]
												}, {
													layout : 'form',
													columnWidth : .333,
													border : false,
													items : [{
														fieldLabel : '数量',
														xtype : 'textfield',
														id : 'Unim_AgtF_TXT_Num_Id',
														anchor:'100%'
													}]
												}]
											},
											{
												layout : 'column',
												border : false,
												items : [
														{
															columnWidth : .333,
															border : false,
															layout : 'form',
															items : [{
																fieldLabel : '座席编号',
																name : 'unimAgent.aid',
																xtype : 'textfield',
																allowBlank : false,
																id : 'Unim_AgentF_Txt_aid',
																maxLength : 15,
																anchor : '100%'
															}]
														},
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
																			id : 'Unim_AgentF_Txt_empId',
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
																									Ext.getCmp("Unim_AgentF_Txt_AgtNam").setValue(uname);
																									Ext.getCmp("Unim_AgentF_Txt_UserId").setValue(uId);
																									Ext.getCmp("Unim_AgentF_Txt_empId").setValue(employeeid);
																									Ext.getCmp("Unim_AgentF_Txt_depName").setValue(depName);
																								},
																								scope : this
																							})
																					.show();
																		}
																	}]
														},
														{
															layout : 'form',
															border : false,
															columnWidth:.333,
															items : [
																	{
																		fieldLabel : '姓名',
																		name : 'unimAgent.agentName',
																		id : 'Unim_AgentF_Txt_AgtNam',
																		xtype : 'textfield',
																		anchor : '100%'
																	}]
														}]
											}, unimAgentUserId, {
												fieldLabel : '组织机构',
												name : 'unimAgent.depName',
												id : 'Unim_AgentF_Txt_depName',
												readOnly : true,
												xtype : 'textfield',
												anchor : '95%'
											}, {
												layout : 'column',
												border : false,
												items : [{
													columnWidth : .333,
													layout : 'form',
													border : false,
													items : [{
														fieldLabel : '职务',
														allowBlank : false,
														maxLength : 128,
														hiddenName : 'unimAgent.jobType',
														id : 'Unim_AgtForm_jobType_Combo_Id',
														xtype : 'mtdiccombo',
														editable : false,
														allowBlank : false,
														lazyInit : false,
														triggerAction : 'all',
														forceSelection : false,
														itemKey : 'ZW001',
														anchor : '100%'
														,listeners : {
															'select' : function(combo,rec,index) {
																Ext.getCmp("Unim_UAF_JobType_Hidden").setValue(combo.getValue());
															}
														}
													},{
														xtype : 'hidden',
														name : 'jobType',
														id : 'Unim_UAF_JobType_Hidden'
													}]
												}, {
													columnWidth : .333,
													border : false,
													layout : 'form',
													items : [{
														fieldLabel : '职级',
														allowBlank : false,
														maxLength : 128,
														name : 'unimAgent.jobClass_form',
														hiddenName : 'unimAgent.jobClass',
														id : 'Unim_AgtForm_jobClass_Combo_Id',
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
																Ext.getCmp("Unim_UAF_JobClass_Hidden").setValue(combo.getValue());
															}
														}
													},{
														xtype : 'hidden',
														name : 'jobClass',
														id : 'Unim_UAF_JobClass_Hidden'
													}]
												}]
											}, {
												xtype : 'fieldset',
												title : '技能组设置',
												items : [this.gridPanel]
											}]
								});

						//加载技能组Store数据
						Ext.Ajax.request({
									url : __ctxPath + "/unim/listGroupOnlyUnimSkillgroup.do",
									method : 'post',
									success : function(response) {
										var result = Ext.util.JSON.decode(response.responseText);//解析数据
										var iCount = result.length;
										if (iCount > 0) {
											var skillArr = '[';
											for ( var i = 0; i < iCount; i++) {
												skillArr += '[' + "'" + result[i].skgId + "'" + ',' + "'" + result[i].skgName + "'" + ',' + "'"
															+ result[i].skgId + "_" + result[i].skgName + "'" + ']';
												if (i < iCount - 1) {
													skillArr += ',';
												}
											}
											skillArr += ']';
											//	[['44','产品开发组','44_产品开发组'],['1','产品销售组','1_产品销售组'],,['21','投诉建议组','21_投诉建议组']]
											Ext.getCmp("Unim_AgtForm_SkillG_Store_Id").getStore().loadData(eval(skillArr));
										}
									},
									failure : function() {
										Ext.ux.Toast.msg('操作提示', '加载超时，请联系管理员！');
									}
								});

						// 加载表单对应的数据
						if (this.agentId != null && this.agentId != 'undefined') {
							this.formPanel.loadData({
								url : __ctxPath	+ '/unim/getUnimAgent.do?agentId=' + this.agentId,
								root : 'data',
								preName : 'unimAgent',
								success : function(response, options) {
									var thisObj = Ext.util.JSON.decode(response.responseText).data;
									g_aid_UAF = thisObj.aid;
									Ext.getCmp("Unim_AgtForm_jobType_Combo_Id").setValue(thisObj.jobType);
									Ext.getCmp("Unim_AgtForm_jobClass_Combo_Id").setValue(thisObj.jobClass);
									
									Ext.getCmp("Unim_UAF_JobType_Hidden").setValue(thisObj.jobType);
									Ext.getCmp("Unim_UAF_JobClass_Hidden").setValue(thisObj.jobClass);
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
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('UnimAgentFormWin');
					},
					/**
					 * 保存记录
					 */
					save : function() {
						//====批量添加验证
						var isChecked = Ext.getCmp("Unim_AgtF_checkbox_Id").getValue();
						var Num = '';
						if(isChecked) {
							Num = Ext.getCmp("Unim_AgtF_TXT_Num_Id").getValue();
							var type="^[0-9]*[1-9][0-9]*$"; 
						    var reg = new RegExp(type); 
						    if(Num.match(reg)==null) { 
						         Ext.Msg.alert("信息提示","批量添加，数量请输入大于零的正整数！");
						        return;
					        }
						}
						//====员工编号重复验证
						var aid = Ext.getCmp("Unim_AgentF_Txt_aid").getValue();						
						if (this.agentId == null || this.agentId == 'undefined') {
							if(UnimAgentForm.isRepeat(aid)) {
								Ext.Msg.alert("信息提示","该员工编号重复，请修改！");
								return;
							}
						} else if(g_aid_UAF!=aid){
								if(UnimAgentForm.isRepeat(aid)) {
								Ext.Msg.alert("信息提示","该员工编号重复，请修改！");
								return;
							}
						}
						
						//====获取技能组内码列表
						var skgIds = '';
						var store = Ext.getCmp('unimAgentFormGrid').getStore();
						var iCount = store.getCount();
						for ( var i = 0; i < iCount; i++) {
							var record = store.getAt(i);
							skgIds += record.data.skgId;
							if(i<iCount-1) {
								skgIds += ",";
							}
						}
						
						var jobType = Ext.getCmp("Unim_UAF_JobType_Hidden").getValue();
						var jobClass = Ext.getCmp("Unim_UAF_JobClass_Hidden").getValue();
						$postSubForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/unim/saveUnimAgent.do?unimAgent.ismonitor=0&skgIds='+skgIds+'&Num='+Num+'&jobType='+jobType+'&jobClass='+jobClass,
							msgSuccess : '成功保存该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('UnimAgentGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								var tabs = Ext.getCmp('centerTabPanel');
								tabs.remove('UnimAgentFormWin');
							}
						});
			}// end of save
			
				});
				
UnimAgentForm.isRepeat = function(aid) {
		var responsea = Ext.lib.Ajax.getConnectionObject().conn;
		responsea.open("POST",  __ctxPath + '/unim/isRepeatAidUnimAgent.do?aid='+aid, false);
		responsea.send(null);
		var result = Ext.util.JSON.decode(responsea.responseText);//解析数据
		if(result.success==true) {
			return true;
		} else {
			return false;
		}
}