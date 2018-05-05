/**
 * @author:cf0666@gmail.com
 * @class ObFeeRuleForm
 * @extends Ext.Panel
 * @description [ObFeeRuleForm]管理
 * @company 优创融联科技
 * @createtime:
 */
var shiyongduixiang = '';
ObFeeRuleForm = Ext
		.extend(
				Ext.Panel,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 初始化组件
						this.initUIComponents(_cfg);
						// 调用父类构造
						ObFeeRuleForm.superclass.constructor.call(this, {
							id : 'MonRuleManagerWin',
							title : '佣金规则详细信息',
							region : 'center',
							layout : 'fit',
							items : [ this.panel ],
							buttonAlign : 'center',
							buttons : [ {
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
							} ]
						});
					},// end of constructor  ong/userGroupBDNamlistUlUsergroup.do?comId=un
					// 初始化组件 
					initUIComponents : function(_cfg) {
						var obCom_fee_CalculationWay = new MT.DicComboBox( {
							fieldLabel : '计算方式',
							id : 'yjjisuanfangshi',
							hiddenName : 'obFeeRule.calculationWay',
							mode : 'local',
							anchor : '100%',
							editable : false,
							lazyInit : false,
							forceSelection : false,
							itemKey : 'CONOB_FEE_YJSSFS',
							value : CONOB_FEE_YJSSFS.get(this.calculationWay)
						});
						var obCom_execTypId = new MT.DicComboBox(
								{
									fieldLabel : '佣金依据指标',
									id : 'yjyijuzhibiao',
									hiddenName : 'obCom.obFeeIndexProject.feeIndexProjectName',
									mode : 'local',
									anchor : '100%',
									editable : false,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONOB_COM_ZXQDFS',
									value : CONOB_COM_ZXQDFS
											.get(this.execTypId)
								});
						var groupsSelectPanel = this
								.initGroupSelectPanel(this.feeRuleId);
						var fieldnameComboData = [
								[ 'origAni', '主叫', new Ext.form.TextField( {
									name : 'origAni',
									allowBlank : true
								}) ],
								[ 'origDnis', '被叫', new Ext.form.TextField( {
									name : 'origDnis',
									allowBlank : true
								}) ],
								[ 'enterTime', '开始时间', new Ext.form.DateField( {
									hiddenName : 'enterTime',
									format : 'Y-m-d'
								}) ],
								[ 'endTime', '结束时间', new Ext.form.DateField( {
									hiddenName : 'endTime',
									format : 'Y-m-d'
								}) ],
								[ 'endReason', '呼损原因&CONHSYY',
										new Ext.form.NumberField( {
											name : 'endReason',
											allowBlank : true
										}) ],
								[ 'vdn', 'VDN', new Ext.form.TextField( {
									name : 'vdn',
									allowBlank : true
								}) ],
								[ 'split', '技能组', new Ext.form.TextField( {
									name : 'split',
									allowBlank : true
								}) ],
								[ 'ivrNod', 'IVR节点', new Ext.form.TextField( {
									name : 'ivrNod',
									allowBlank : true
								}) ],
								[ 'agentid', '接入工号', new Ext.form.TextField( {
									name : 'agentid',
									allowBlank : true
								}) ],
								[ 'station', '接入分机号', new Ext.form.TextField( {
									name : 'station',
									allowBlank : true
								}) ],
								[ 'dur', '时长', new Ext.form.NumberField( {
									name : 'dur',
									allowBlank : true
								}) ],
								[ 'synTime', '同步时间', new Ext.form.TextField( {
									name : 'synTime',
									allowBlank : true
								}) ],
								[ 'assignId', '分配人', new Ext.form.NumberField( {
									name : 'assignId',
									allowBlank : true
								}) ],
								[ 'assignTime', '分配时间',
										new Ext.form.DateField( {
											hiddenName : 'assignTime',
											format : 'Y-m-d'
										}) ],
								[ 'ownerId', '负责人', new Ext.form.NumberField( {
									name : 'ownerId',
									allowBlank : true
								}) ],
								[ 'acceptTime', '领用时间',
										new Ext.form.DateField( {
											hiddenName : 'acceptTime',
											format : 'Y-m-d'
										}) ],
								[ 'dealStaId', '处理状态&CONCLZT',
										new Ext.form.NumberField( {
											name : 'dealStaId',
											allowBlank : true
										}) ],
								[ 'dealResId', '处理结果&CONCLJG',
										new Ext.form.NumberField( {
											name : 'dealResId',
											allowBlank : true
										}) ],
								[ 'dealRemarks', '处理备注',
										new Ext.form.TextField( {
											name : 'dealRemarks',
											allowBlank : true
										}) ] ];
								var topbar_contact5 = new Ext.Toolbar(
								{
									items : [
											'->',
											{
												iconCls : 'btn-del',
												text : '删除',
												xtype : 'button',
												handler : function() {
														var store = gridPanel_rule
															.getStore();
													var sm = gridPanel_rule
															.getSelectionModel();
													var cell = sm
															.getSelections();
													if (cell.length < 1) {
														Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
													} else {
				//										store.remove(cell);
														if(_cfg.feeRuleId!=null){
														$gridRs( {
														url : __ctxPath
																+ '/customer/multiDelBDRuleValueObFeeRule.do?feeRuleId='
																+ _cfg.feeRuleId,
														grid : gridPanel_rule,
														idName : 'feeRuleValueId',
														callback : function(
																response) {
															var store1 = gridPanel_rule.getStore();
															gridPanel_rule.getStore().reload();
														},
														msgNull : '请选择要删除的记录！',
														msgTip : '您确认要删除所选记录吗？',
														msgSuccess : '成功删除该记录！',
														msgFailure : '操作出错，请联系管理员！'
													});
														}else{
																store.remove(cell);
														}
													}
												}
											}, '->', {
												iconCls : 'btn-add',
												text : '添加',
												xtype : 'button',
												handler : function() {
													var store = gridPanel_rule.getStore();
													var recordType = store.recordType;
													store.add(new recordType( {})); // 添加一行空store
											}
							} ]
								});
						var gridPanel_rule = new HT.EditorGridPanel(
							
								{
									region : 'center',
									tbar : topbar_contact5,
									id : 'gridPanel_yongjinguize',
									height : 150,
									showPaging:false,
									scrollHeight : true,
									clicksToEdit : 1,
									url : __ctxPath
											+ "/customer/ruleBDNamlistObFeeRuleValue.do?feeRuleId="
											+ this.feeRuleId,
									fields : [ {
										name : 'feeRuleValueId',
										type : 'Long'
									}, 'minimum', 'maximum', 'coefficient',
											'increase' ],
									columns : [
																					{
												header : 'feeRuleValueId',
												dataIndex : 'feeRuleValueId',
												allowBlank : false,
												hidden:true,
												editor : new Ext.form.TextField(
														{
														})
											},
											{
												header : '最小值',
												dataIndex : 'minimum',
												allowBlank : false,
												editor : new Ext.form.NumberField(
														{regex : /^[0-9]*[1-9][0-9]*$/})
											},
											{
												header : '最大值',
												dataIndex : 'maximum',
												allowBlank : false,
												editor : new Ext.form.NumberField(
														{regex : /^[0-9]*[1-9][0-9]*$/})
											},
											{
												header : '系数(<1)',
												dataIndex : 'coefficient',
												allowBlank : false,
												editor : new Ext.form.NumberField(
														{regex : /^[0]\d*\.\d*|0\.\d*[1-9]\d*$/})
											},
											{
												header : '增加额度',
												dataIndex : 'increase',
												allowBlank : false,
												editor : new Ext.form.NumberField(
														{regex : /^[0-9]*[1-9][0-9]*$/})
											} ]
								// end of columns
								});

						var topbar_contact4 = new Ext.Toolbar(
								{
									items : [
											'->',
											{
												iconCls : 'btn-del',
												text : '删除',
												xtype : 'button',
												handler : function() {
													var store = gridPanel_contact_duixiang
															.getStore();
													var sm = gridPanel_contact_duixiang
															.getSelectionModel();
													var cell = sm
															.getSelections();
													if (cell.length < 1) {
														Ext.ux.Toast.msg(
																'提示信息',
																'请至少选择一条记录!');
													} else {
														$gridRs( {
															url : __ctxPath
																	+ '/customer/multiDelBDZuiZeObFeeRule.do?feeRuleId='
																	+ _cfg.feeRuleId,
															grid : gridPanel_contact_duixiang,
															idName : 'depid',
															callback : function(
																	response) {
																var store1 = gridPanel_contact_duixiang
																		.getStore();
																gridPanel_contact_duixiang
																		.getStore()
																		.reload();
															},
															msgNull : '请选择要删除的记录！',
															msgTip : '您确认要删除所选记录吗？',
															msgSuccess : '成功删除该记录！',
															msgFailure : '操作出错，请联系管理员！'
														});

													}
												}
											},
											'->',
											{
												iconCls : 'btn-add',
												text : '添加',
												xtype : 'button',
												handler : function() {
													ObGuiZeShiYongDuiXiangSelector.prototype
															.setup(
																	function(
																			rows) {
																		var store1 = gridPanel_contact_duixiang
																				.getStore();
																		var recordType = store1.recordType;
																		for ( var i = 0, r; r = rows[i]; i++) {
																			if (shiyongduixiang
																					.indexOf(rows[i]
																							.get('depid')) == -1) {
																				shiyongduixiang += rows[i]
																						.get('depid')
																						+ ",";
																				store1
																						.add(new recordType(
																								{
																									depname : rows[i]
																											.get('depname'),
																									type : rows[i]
																											.get('type'),
																									jingyingyewu : rows[i]
																											.get('jingyingyewu'),
																									yewushuoming : rows[i]
																											.get('yewushuoming'),
																									status : rows[i]
																											.get('status'),
																									parentName : rows[i]
																											.get('parentName'),
																									//														parentid : rows[i]
																									//																.get('parentid'),
																									depid : rows[i]
																											.get('depid')

																								})); // 添加一行空store
																			}

																		}
																	}).show();
												}
											} ]
								});
						var gridPanel_contact_duixiang = new HT.GridPanel(
								{
									region : 'center',
									tbar : topbar_contact4,
									showPaging:false,
									id : 'guizeshiyongduixiang',
									height : 150,
									scrollHeight : true,
									clicksToEdit : 1,
									url : __ctxPath
											+ '/xitong/zuZhiJiGouBDNamlistUlDepartment.do?feeRuleId='
											+ this.feeRuleId,
									fields : [ 'depid', 'depname', 'type',
											'jingyingyewu', 'yewushuoming',
											'parentid', 'status', 'parentName' ],
									columns : [ {
										header : "depid",
										dataIndex : 'depid',
										hidden : true
									}, {
										header : "机构名称",
										sortable : true,
										dataIndex : 'depname',
										width : 200
									}, {
										header : "机构类型",
										sortable : true,
										dataIndex : 'type',
										width : 60,
										renderer : function(value) {
											return ZZJGLX0001.get(value);
										}
									}, {
										header : "经营业务",
										sortable : true,
										dataIndex : 'jingyingyewu',
										width : 60,
										renderer : function(value) {
											return JYYW0001.get(value);
										}
									}, {
										header : "业务说明",
										sortable : true,
										dataIndex : 'yewushuoming',
										width : 60
									}, {
										header : "上级机构",
										sortable : true,
										dataIndex : 'parentName',
										width : 60,
										hidden : true
									}, {
										header : "状态",
										sortable : true,
										dataIndex : 'status',
										width : 60,
										renderer : function(value) {
											return ZZJGZT0001.get(value);
										}
									} ]
								// end of columns
								});

						// 初始化搜索条件Panel
						this.panel = new Ext.FormPanel(
								{
									layout : 'form',
									border : false,
									labelAlign : 'right',
									autoScroll : true,
									bodyStyle : 'padding:10px',
									defaults : {
										anchor : '98%,98%'
									},
									items : [
											{
												layout : 'column',
												border : false,
												anchor : '98%',
												items : [
														{
															border : false,
															columnWidth : .33,
															layout : 'form',
															items : [
																	{
																		id : 'obFeeRule.obFeeIndexProject.feeIndexProjectId',
																		xtype : 'hidden'
																	},
																	{
																		id : 'obFeeRule.obFeeIndexProject.feeIndexProjectName',
																		xtype : 'hidden'
																	},
																	{
																		name : 'obFeeRule.feeRuleId',
																		xtype : 'hidden',
																		id : 'feeRuleId',
																		value : this.feeRuleId == null ? ''
																				: this.feeRuleId
																	},
																	{
																		name : 'obFeeRule.ruleName',
																		xtype : 'textfield',
																		fieldLabel : '规则名',
																		anchor : '100%'
																	} ]
														},
														{
															border : false,
															columnWidth : .33,
															layout : 'form',
															items : [ {
																fieldLabel : '有效时间',
																xtype : 'datefield',
																editable : true,
																name : 'obFeeRule.effectiveTime',
																format : 'Y-m-d',
																anchor : '100%'
															} ]
														},
														{
															border : false,
															columnWidth : .33,
															layout : 'form',
															items : [ {
																fieldLabel : '失效时间',
																xtype : 'datefield',
																name : 'obFeeRule.failureTime',
																editable : true,
																format : 'Y-m-d',
																anchor : '100%'
															} ]
														} ]
											},
											{
												layout : 'column',
												border : false,
												anchor : '98%',
												items : [

														{
															border : false,
															columnWidth : .33,
															layout : 'form',
															items : [ {
																fieldLabel : '佣金依据指标',
																xtype : 'combo',
																editable:false,
																mode : 'local',
																id : 'obFeeRule_zhibiao_form',
																//name:'calllistComId',
																hiddenName : 'feeIndexProjectId',
																allowBlank : false,
																// editable : false,
																// lazyInit : false,
																triggerAction : 'all',
																store : new Ext.data.SimpleStore(
																		{
																			fields : [
																					'feeIndexProjectId',
																					'feeIndexProjectName' ], // 设定键/值
																			data : []

																		// 默认的data必须提供
																		}),
																displayField : 'feeIndexProjectName',
																valueField : 'feeIndexProjectId',
																anchor : '100%',
																listeners : {
																	'render' : function() {
																		ObFeeRuleForm
																				.getStoreCom(null);

																	},
																	'select' : function(
																			combo,
																			record,
																			index) {
																		var value = record.data.feeIndexProjectId;
																		Ext
																				.getCmp(
																						'obFeeRule.obFeeIndexProject.feeIndexProjectId')
																				.setValue(
																						value);
																		var feeIndexProjectId = Ext
																				.getCmp(
																						'obFeeRule.obFeeIndexProject.feeIndexProjectId')
																				.getValue();
																	}
																}
															}

															]
														},
														{
															border : false,
															columnWidth : .33,
															layout : 'form',
															items : [ obCom_fee_CalculationWay ]
														}
//														,
//														{
//															border : false,
//															columnWidth : .33,
//															style : 'margin-left:70px',
//															xtype : 'checkbox',
//															boxLabel : '按阶梯计算'
//														}
														]
											},
											{	
												xtype : 'hidden',
												name : 'obFeeRule.zhiwei',
												id : 'ulEmployee.zhiwei_hid'
											}, {	
												xtype : 'hidden',
												name : 'obFeeRule.zhiji',
												id : 'ulEmployee.zhiji_hid'
											},
											{
												layout : 'column',
												xtype : 'container',
												anchor : '98%',
												defaults : {
													border : false
												},
												items : [
														{
															layout : 'form',
															columnWidth : .33,
															items : [ {
																fieldLabel : '职位',
																id : 'ulEmployee.zhiwei_form',
																displayField : 'itemName',
																valueField : 'itemName',
																editable:false,
																xtype : 'combo',
																mode : 'local',
																triggerAction : 'all',
																anchor : '100%',
																forceSelection : false,
																store : getDicStore(
																		'职位',
																		'ulEmployee.zhiwei_form'),
																listeners : getDicListeners(
																		'ulEmployee.zhiwei_form','ulEmployee.zhiwei')
															} ]
														},
														{
															layout : 'form',
															columnWidth : .33,
															items : [ {
																fieldLabel : '职级',
																id : 'ulEmployee.zhiji_form',
																displayField : 'itemName',
																valueField : 'itemName',
																xtype : 'combo',
																editable:false,
																mode : 'local',
																triggerAction : 'all',
																anchor : '100%',
																forceSelection : false,
																store : getDicStore(
																		'职级',
																		'ulEmployee.zhiji_form'),
																listeners : getDicListeners(
																		'ulEmployee.type_form',
																		'ulEmployee.zhiji')
															} ]
														} ]
											},
											{
												xtype : 'textarea',
												height : 50,
												name : 'obFeeRule.comments',
												fieldLabel : '备注',
												anchor : '97%'
											},
											{
												xtype : 'fieldset',
												title : '规则设置',
												collapsible : true,
												items : [ gridPanel_rule ]
											},
											{
												xtype : 'fieldset',
												title : '使用对象',
												collapsible : true,
												items : [ gridPanel_contact_duixiang ]
											} ]
								});// end of searchPanel

						if (this.feeRuleId != null
								&& this.feeRuleId != 'undefined') {
							this.panel
									.loadData( {
										url : __ctxPath
												+ '/customer/getObFeeRule.do?feeRuleId='
												+ this.feeRuleId,
										root : 'data',
										preName : 'obFeeRule',
										success : function(response, options) {
											var feeIndexProjectName = Ext
													.getCmp(
															'obFeeRule.obFeeIndexProject.feeIndexProjectName')
													.getValue();
											var feeIndexProjectId = Ext
													.getCmp(
															'obFeeRule.obFeeIndexProject.feeIndexProjectId')
													.getValue();
											var combo = Ext
													.getCmp('obFeeRule_zhibiao_form');
											var thisObj = Ext.util.JSON
													.decode(response.responseText).data;
											Ext
													.getCmp(
															'obFeeRule_zhibiao_form')
													.setRawValue(
															feeIndexProjectId);// 指标id
											Ext
													.getCmp(
															'obFeeRule_zhibiao_form')
													.setValue(
															feeIndexProjectName);// 指标名称
											Ext.getCmp('ulEmployee.zhiwei_form')
													.setValue(thisObj.zhiwei);
											Ext.getCmp('ulEmployee.zhiji_form')

											.setValue(thisObj.zhiji);

										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息',
													'操作出错，请联系管理员！');
										}
									});
						}
					},// end of the initComponents()

					getTopBar : function(gridId) {
						return new Ext.Toolbar( {
							items : [ '->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function() {
									var grid = Ext.getCmp(gridId);
									var store = grid.getStore();
									var sm = grid.getSelectionModel();
									var cell = sm.getSelections();
									if (cell.length < 1) {
										Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
									} else {
//										store.remove(cell);
										$gridRs( {
										url : __ctxPath
												+ '/customer/multiDelBDRuleValueObFeeRule.do?feeRuleId='
												+ _cfg.feeRuleId,
										grid : gridPanel_rule,
										idName : 'feeRuleValueId',
										callback : function(
												response) {
											var store1 = gridPanel_rule.getStore();
											gridPanel_rule.getStore().reload();
										},
										msgNull : '请选择要删除的记录！',
										msgTip : '您确认要删除所选记录吗？',
										msgSuccess : '成功删除该记录！',
										msgFailure : '操作出错，请联系管理员！'
									});
									}
								}
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								handler : function() {
									var grid = Ext.getCmp(gridId);
									var store = grid.getStore();
									var recordType = store.recordType;
									store.add(new recordType( {})); // 添加一行空store
							}
							} ]
						});
					},

					getDicStore : function(name, id) {
						return new Ext.data.SimpleStore(
								{
									url : __ctxPath + '/system/loadItemDictionary.do',
									baseParams : {
										itemName : name
									},
									fields : [ 'itemId', 'itemName' ],
									autoLoad : true,
									method : "post",
									listeners : {
										load : function() {
											var combo = Ext
													.getCmp(id + '_form');
											var store = combo.getStore();
											var hid_value = Ext
													.getCmp(id + '_hid');
											var rows = [];// 定义数组
											for ( var i = 0; i < store
													.getCount(); i++) { // store.getCount()为store的长度
												if (store.getAt(i).data['itemId'] == hid_value
														.getValue()) {
													combo
															.setValue(store
																	.getAt(i).data['itemName']);
													break;
												}
											}
										}
									}
								})
					},
					// 重置查询表单
					reset : function() {
						this.panel.getForm().reset();
					},
					/**
					 * 取消
					 */
					cancel : function() {
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('MonRuleManagerWin');
						this.destroy();
						// tabs.doLayout();
					},
					/**
					 * 保存记录
					 */
					save : function() {
						var combo = Ext.getCmp('obFeeRule_zhibiao_form');
						var zhiwei=Ext.getCmp('ulEmployee.zhiwei_form').getValue();
						var zhiji=Ext.getCmp('ulEmployee.zhiji_form').getValue();
						var ss=Ext.getCmp('ulEmployee.zhiji_hid').getValue();
						var feeIndexProjectId = Ext
								.getCmp(
										'obFeeRule.obFeeIndexProject.feeIndexProjectId')
								.getValue();
						var usergroupid = '';
						var minimum = '';
						var maximum = '';
						var coefficient = '';
						var increase = '';
						var duixiangid = '';
						var feeRuleValueId='';
						var store = Ext.getCmp('gridPanel_yongjinguize')
								.getStore();
						var storegourp = Ext.getCmp("yixuanzezhixingzu")
								.getStore();
						var storeduixiang = Ext.getCmp("guizeshiyongduixiang")
								.getStore();
						for ( var i = 0; i < storeduixiang.getCount(); i++) {
							duixiangid += storeduixiang.getAt(i).data.depid
									+ ",";
						}
						for ( var j = 0; j < storegourp.getCount(); j++) {
							usergroupid += storegourp.getAt(j).data.pkUsergroupId
									+ ",";
						}
						store.each(function(rec) {
							if(rec.get('minimum')==null || rec.get('minimum')==''){
							  minimum += '0' + ','
							}else{
							  minimum += rec.get('minimum') + ','
							}
							if(rec.get('maximum')==null || rec.get('maximum')==''){
							  maximum += '0' + ','
							}else{
							  maximum += rec.get('maximum') + ','
							}
//							maximum += rec.get('maximum') + ','
							if(rec.get('coefficient')==null || rec.get('coefficient')==''){
							  coefficient += '0' + ','
							}else{
							  coefficient += rec.get('coefficient') + ','
							}
//							coefficient += rec.get('coefficient') + ','
							if(rec.get('increase')==null || rec.get('increase')==''){
							  increase += '0' + ','
							}else{
							  increase += rec.get('increase') + ','
							}
							feeRuleValueId+=rec.get('feeRuleValueId')+',';
//							increase += rec.get('increase') + ','
						})
						$postForm( {
							formPanel : this.panel,
							scope : this,
							url : __ctxPath + '/customer/saveObFeeRule.do',
							params : {
								// 将数组提交至后台 details
								minimum : minimum,
								maximum : maximum,
								coefficient : coefficient,
								increase : increase,
								feeRuleValueId:feeRuleValueId,
								usergroupid : usergroupid,
								zhibiaoxiang : feeIndexProjectId,
								duixiangid : duixiangid,
								zhiwei:zhiwei,
								zhiji:zhiji
							},
							callback : function(fp, action) {
								//								var tabs = Ext.getCmp('centerTabPanel');
							//								tabs.remove('MonRuleManagerWin');
							Ext.getCmp('FreeRuleGrid').getStore().reload();
							this.destroy();
						}
						});
					},// end of save
					getDicListeners : function(comId, hidName) {
						return {
							select : function(cbo, record, index) {
								var fm = Ext.getCmp(comId);
								Ext.getCmp(hidName + '_hid')
										.setValue(cbo.value);
							}
						}
					}
				});
// 用户组选择 usergroupids
ObFeeRuleForm.prototype.initGroupSelectPanel = function(userId) {
	/* 用户组树 */
	var selectNode = null;
	var Group_url = __ctxPath + '/system/treeLoadAppUser.do';
	var GroupTree = new Ext.tree.TreePanel( {
		height : 220,
		flex : 7,
		useArrows : false,
		autoScroll : true,
		animate : false,
		enableDD : false,
		containerScroll : true,
		border : true,
		dataUrl : Group_url,
		rootVisible : false,
		root : {
			nodeType : 'async',
			text : 'Ext JS',
			draggable : false

		},
		listeners : {
			'click' : function(node) {
				selectNode = node;
			},
			'beforeload' : function(node) {
				// node.setText('<font
			// qtip="双击添加">'+node.text+'</font>');
			// node.eachChild( function(args){
			//							
			// }, this);
			node.attributes.qtip = '双击添加';
			node.attributes.description = '双击添加';
		}

		}
	});

	var dellTrue = function(ids) {

		Ext.Ajax.request( {
			url : __ctxPath + '/system/multiDelGroupsAppUser.do',
			params : {
				ids : ids,
				userId : userId

			},
			method : 'POST',
			success : function(response, options) {
				Ext.ux.Toast.msg('操作信息', '成功删除该明细！');

			},
			failure : function(response, options) {
				Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
			}
		});

	};
	/* 选择按钮 */
	var add = function() {
		if (selectNode == null) {
			Ext.ux.Toast.msg("信息", "请选择要添加的用户组！");
			return;
		}

		var isRe = false;
		for (i = 0; i < groupStore.getCount(); i++) {
			var r = groupStore.getAt(i);
			if (r.data.pkUsergroupId == selectNode.id) {
				isRe = true;
			}
		}
		if (isRe == true) {

			Ext.ux.Toast.msg("信息", "用户组重复，请选择其它用户组！");
			return;

		}

		var ulUsergroup = {};
		Ext.apply(ulUsergroup, {
			pkUsergroupId : selectNode.id,
			usergroupName : selectNode.text

		});

		var recrod = new groupStore.recordType();

		recrod.data = {};

		Ext.apply(recrod.data, {
			pkUsergroupId : selectNode.id,
			usergroupName : selectNode.text
		});

		groupStore.insert(0, recrod);

		groupStore.commitChanges();

	};
	var del = function() {

		var selectRecords = GroupGrid.getSelectionModel().getSelections();
		if (selectRecords.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}

		if (selectRecords[0].data.pkUsergroupId != null// ugUid
				&& selectRecords[0].data.pkUsergroupId != '') {
		}

		groupStore.remove(selectRecords[0]);
		groupStore.commitChanges();

	};
	var selectPanel = new Ext.Panel( {
		frame : false,
		border : false,
		hideBorders : true,
		height : 220,
		flex : 0.4,
		layout : {
			type : 'vbox',
			pack : 'center',
			align : 'stretch'
		},
		defaults : {
			anchor : '100%,100%'
		},
		defaults : {
			margins : '0 3 0 0'
		},
		items : [ {
			xtype : 'button',
			iconCls : 'btn-right',
			scope : this,
			handler : add
		}, {
			xtype : 'button',
			iconCls : 'btn-left',
			scope : this,
			handler : del
		} ]
	});
	/* 职位grid */
	var dellAll = function() {
		var ids = Array();
		for (i = 0; i < groupStore.getCount(); i++) {
			var r = groupStore.getAt(i);
			if (r.data.pkUsergroupId != null && r.data.pkUsergroupId != '') {
				ids.push(r.data.pkUsergroupId);
			}
			;

		}
		if (ids.length > 0) {

		}
		groupStore.removeAll();
		groupStore.commitChanges();

	};
	var gridTopbar = new Ext.Toolbar( {
		items : [ {
			text : '清除所选',
			scope : this,
			handler : dellAll
		} ]
	});

	var groupRecord = Ext.data.Record.create( [ {
		name : 'pkUsergroupId',
		type : 'int'
	}, 'parentId', 'usergroupName', 'ulUsergroup' ]);

	var gridMemoryProxy = new Ext.data.HttpProxy( {
		url : __ctxPath
				+ '/xitong/userGroupYJBDNamlistUlUsergroup.do?feeRuleId='
				+ this.feeRuleId
	});

	var gridJsonReader = new Ext.data.JsonReader( {
		root : 'result',
		totalProperty : 'totalCounts',
		idProperty : "pkUsergroupId"
	}, groupRecord);

	var groupStore = new Ext.data.Store( {
		id : 'AppUserForm.GroupStore',
		proxy : gridMemoryProxy,
		reader : gridJsonReader
	});

	groupStore.on('beforeload', function(store) {
		store.baseParams = {
			start : 0,
			limit : 10000,
			'Q_appUser.userId_L_EQ' : userId
		};
	});
	groupStore.setDefaultSort('pkUsergroupId');

	if (userId != '' && userId != null && userId != 'undefined') {
		groupStore.load();
	}

	var sm = new Ext.grid.CheckboxSelectionModel( {
		singleSelect : true

	});
	// /

	var GroupGrid = new Ext.grid.EditorGridPanel( {
		frame : false,
		border : true,
		flex : 6,
		id : 'yixuanzezhixingzu',
		height : 220,
		tbar : gridTopbar,
		store : groupStore,
		clicksToEdit : 1,
		sm : sm,
		viewConfig : {
			forceFit : true,
			autoFill : true
		},
		columns : [ {
			header : '对象ID',
			dataIndex : 'pkUsergroupId',
			sortable : true,
			hidden : false
		}, {
			header : '对象名称',
			sortable : true,
			dataIndex : 'usergroupName',
			renderer : function(usergroupName) {
				if (usergroupName)
					return '<font qtip="双击删除">' + usergroupName + '</font>';
			}
		} ]
	});

	GroupGrid.on('dblclick', function(e) {

		var selectRecords = GroupGrid.getSelectionModel().getSelections();
		if (selectRecords.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}

		if (selectRecords[0].data.pkUsergroupId != null
				&& selectRecords[0].data.pkUsergroupId != '') {
		}

		groupStore.remove(selectRecords[0]);
		groupStore.commitChanges();

	}, this);
	GroupTree.on('dblclick', function(selectNode) {

		if (selectNode == null) {
			Ext.ux.Toast.msg("信息", "请选择要添加的用户组！");
			return;
		}

		var isRe = false;
		for (i = 0; i < groupStore.getCount(); i++) {
			var r = groupStore.getAt(i);
			if (r.data.pkUsergroupId == selectNode.id) {
				isRe = true;
			}
		}
		if (isRe == true) {

			Ext.ux.Toast.msg("信息", "用户组重复，请选择其它部门！");
			return;

		}

		var recrod = new groupStore.recordType();

		recrod.data = {};

		Ext.apply(recrod.data, {
			pkUsergroupId : selectNode.id,
			usergroupName : selectNode.text
		});

		groupStore.insert(0, recrod);
		groupStore.commitChanges();
		selectNode = null;
	}, this);

	/* 总容器 */

	var panel = new Ext.Panel( {
		xtype : 'panel',
		height : 220,
		border : false,
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		height : 220,
		items : [ GroupTree, selectPanel, GroupGrid ]
	});

	return panel;
};
ObFeeRuleForm.getStoreCom = function(projId) {// 注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
	Ext.Ajax.request( {
		url : __ctxPath + '/customer/getZhiBiaoLeiXingObFeeIndexProject.do',
		//				url : __ctxPath + '/outb/getObComObCallbatchAss.do?projId='
		//						+ projId,
		method : 'post',
		success : function(response) {
			var result = Ext.util.JSON.decode(response.responseText);// 解析数据
		Ext.getCmp("obFeeRule_zhibiao_form").getStore().loadData(result);// 获取组件，加载数据
	},
	failure : function() {
	}
	});
}
function getDicListeners(comId, hidName) {
	return {
		select : function(cbo, record, index) {
			var fm = Ext.getCmp(comId);
			Ext.getCmp(hidName + '_hid').setValue(cbo.value);
		}
	}
};
function getDicStore(name, id) {
	return new Ext.data.SimpleStore( {
		url : __ctxPath + '/system/loadItemDictionary.do',
		baseParams : {
			itemName : name
		},
		fields : [ 'itemId', 'itemName' ],
		autoLoad : true,
		method : "post",
		listeners : {
			load : function() {
				var combo = Ext.getCmp(id);
				var store = combo.getStore();
				var rows = [];// 定义数组
		for ( var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
			if (store.getAt(i).data['itemId'] == combo.getValue()) {
				combo.setValue(store.getAt(i).data['itemName']);
				break;
			}
		}
	}
}
	})
};
