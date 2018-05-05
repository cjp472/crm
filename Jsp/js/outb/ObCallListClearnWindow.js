////测试数据
//var	gprojId = '46';
//var	gcomId = '241';
//var	gcalllistId = '123';
//var	gcallbatchId = '561';
var	gprojId = '';
var	gcomId = '';
var	gcalllistId = '';
var	gcallbatchId = '';
var	gclearnTyp = '';
var	gwashIFGrid = '';
var	gclearSoundTyp = '';
var gQ_nameCn_S_LK = '';
var gQ_gender_SN_EQ = '';
var gclearnRual = '';
var gIsClearnView = '';
var gInChanel = '';
ObCallListClearnWindow = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents(_cfg);
		ObCallListClearnWindow.superclass.constructor.call(this, {
					id : 'ObCallListClearnWindowWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					height : 430,
					width : 680,
					maximizable : true,
					title : '名单清洗',
					buttonAlign : 'center',
					buttons : [{
								text : '下一步',
								iconCls : 'btn-save',
								id : 'btn-save-t',
								scope : this,
								handler : this.save
							}, {
								xtype:'panel',
								border:false,
								hidden:true,
								bodyStyle:'background-color:#ced9e7',
								id:'showMessage',
								html:'清洗正在进行，请稍后...'
							},{
								text : '确认',
								iconCls : 'btn-ok',
								id : 'OB_Calllist_Clear_btn-ok-t',
								hidden : true,
								scope : this,
								handler : this.ok
							}, {
								text : '返回',
								iconCls : 'btn-back',
								id : 'OB_Calllist_Clear_btn-back-t',
								hidden : true,
								scope : this,
								handler : this.back
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								id : 'OB_Calllist_Clear_btn-cancel-t',
								scope : this,
								handler : this.cancel
							}],
					listeners : {
						'close' : function() {
//							this.myMask.hide();
						}
					}
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function(_cfg) {
		//判断是否是重左侧二级功能菜单进入
		gIsClearnView = _cfg.isClearnView;
		gInChanel = _cfg.inChanel;
		gcallbatchId = _cfg.callbatchId;
		
		var for_change;// 用于更换 信息的this
		var last_change = "gridPanel_1";// 上次添加的组件
	
		this.oldList = new Ext.FormPanel({
			layout : 'form',
			border : false,
			labelAlign : 'right',
			defaults : {
				anchor : '96%'
			},
			labelWidth : 80,
			// defaultType : 'textfield',
			items : [{
						xtype : 'hidden',
						id : 'ObCallListClearn.proId'
					}, {
						anchor : '96%',
						layout : 'column',
						border : false,
						xtype : 'panel',
						items : [{
										xtype : 'panel',
										layout : 'form',
										columnWidth : .92,
										border : false,
										items : [{
													fieldLabel : '营销项目',
													xtype : 'textfield',
													id : 'ObCallListClearn.proNam',
													anchor : '100%'
												}]
									}, {
										xtype : 'button',
										columnWidth : .08,
										iconCls : 'btn-search',
										id : 'OB_Calllist_Clearn_Proj_Btn',
										handler : function() {
											ObProjectSelector.getView(
													function(projId, projNam,perIncharge,ownerTeam) {
														Ext.getCmp('ObCallListClearn.proNam').setValue(projNam);
														Ext.getCmp('ObCallListClearn.proId').setValue(projId);
														//清空活动、名单、批次的数据
														Ext.getCmp("obCallListClearnWindowCom").getStore().removeAll();
														Ext.getCmp("obCallListClearnWindowCom").setValue("");
														Ext.getCmp("obCallListClearnWindowCalllist").getStore().removeAll();
														Ext.getCmp("obCallListClearnWindowCalllist").setValue("");
														Ext.getCmp("obCallListClearnWindowCallbatch").getStore().removeAll();
														Ext.getCmp("obCallListClearnWindowCallbatch").setValue("");
														
														Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().baseParams['projId'] = projId;
														ObCallListClearnWindow.getStoreCom(projId);
													},null,false, false,"2").show();//查找所有项目
										}
									}]
					}, {
						layout : 'column',
						border : false,
						anchor : '96%',
						xtype : 'panel',
						items : [{
									layout : 'form',
									columnWidth : .5,
									xtype : 'panel',
									border : false,
									items : [{
												xtype : 'combo',
												mode : 'local',
												fieldLabel : '营销活动',
												id : 'obCallListClearnWindowCom',
												hiddenName:'projIdHidden',
												triggerAction : 'all',
												anchor : '100%',
												store : new Ext.data.SimpleStore({// new一个SimpleStore
													fields : ['comId', 'comName'], // 设定键/值
													data : []
												}),
												displayField : 'comName',
												valueField : 'comId',
												listeners : {
													'select' : function() {
														var combo = Ext.getCmp("obCallListClearnWindowCom");
														Ext.getCmp("obCallListClearnWindowCalllist").getStore().removeAll();
														Ext.getCmp("obCallListClearnWindowCalllist").setValue("");
														Ext.getCmp("obCallListClearnWindowCallbatch").getStore().removeAll();
														Ext.getCmp("obCallListClearnWindowCallbatch").setValue("");
														
														Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().baseParams['comId'] = combo.getValue();
														Ext.Ajax.request({
															url : __ctxPath	+ '/outb/getObCalllistObCallbatchAss.do?comId=' + combo.getValue() + "&flag=2",
															method : 'post',
															success : function(response) {
																var result = Ext.util.JSON.decode(response.responseText);
																Ext.getCmp("obCallListClearnWindowCalllist").getStore().loadData(result);// 获取组件，加载数据
															}
														});
													}
												}
											}]

								}, {
									layout : 'form',
									columnWidth : .5,
									xtype : 'panel',
									border : false,
									items : [{
												xtype : 'combo',
												fieldLabel : '呼叫名单',
												id : 'obCallListClearnWindowCalllist',
												mode : 'local',
												hiddenName:'calllistIdHidden',
												triggerAction : 'all',
												anchor : '100%',
												store : new Ext.data.SimpleStore({// new一个SimpleStore
													fields : ['calllistId', 'calllistNam'], // 设定键/值
													data : []
												}),
												displayField : 'calllistNam',
												valueField : 'calllistId',
												listeners : {
													'select' : function() {
														var combo = Ext.getCmp("obCallListClearnWindowCalllist");
														Ext.getCmp("obCallListClearnWindowCallbatch").getStore().removeAll();
														Ext.getCmp("obCallListClearnWindowCallbatch").setValue("");
														Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().baseParams['calllistId'] = combo.getValue()
														Ext.Ajax.request({
															url : __ctxPath	+ '/outb/getObCallbatchObCallbatchAss.do?calllistId=' + combo.getValue()+"&flag=0",//查询未启用的批次
															method : 'post',
															success : function(response) {
																var result = Ext.util.JSON.decode(response.responseText);
																Ext.getCmp("obCallListClearnWindowCallbatch").getStore().loadData(result);// 获取组件，加载数据
															}
														});
													}
												}
											}]

								}]
					}, {
						xtype : 'combo',
						mode : 'local',
						fieldLabel : '批次',
						id : 'obCallListClearnWindowCallbatch',
						mode : 'local',
						hiddenName:'callbatchIdHidden',
						triggerAction : 'all',
						anchor : '48%',
						store : new Ext.data.SimpleStore({// new一个SimpleStore
							fields : ['callbatchId', 'callbatchNam'], // 设定键/值
							data : []
						}),
						displayField : 'callbatchNam',
						valueField : 'callbatchId',
						listeners : {
							'select' : function() {
								var combo = Ext.getCmp("obCallListClearnWindowCallbatch");
								Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().baseParams['callbatchId'] =combo.getValue();
								gcallbatchId = combo.getValue();
							}
						}
					}]
		})
		var selectywqc = new Ext.form.Radio({
		
								boxLabel : '业务去重',
								inputValue : 4,
								name : 'rb-auto'
							
		});
		this.selectV = new Ext.form.RadioGroup({
					fieldLabel : '清洗方式',
					anchor : '99%',
					layout : 'form',
					items : [{
								boxLabel : '无效数据',
								name : 'rb-auto',
								inputValue : 0,
								checked : true
							}, {
								boxLabel : '名单修复',
								inputValue : 1,
								name : 'rb-auto'
							}, {
								boxLabel : '黑白名单',
								inputValue : 2,
								name : 'rb-auto'
							}, {
								boxLabel : '名单去重',
								inputValue : 3,
								name : 'rb-auto'
							}, selectywqc],
					listeners : {
						change : function(com, checked) {
							// alert(checked.getGroupValue());
							var formBase = for_change.panel;
							var inform = "gridPanel_" + checked.getGroupValue();
							if (checked.getGroupValue() == 1) {
								for_change.gridPanel_2.show();
								for_change.gridPanel_1.hide();
								for_change.list.hide();
								for_change.gridPanel_4.hide();
								for_change.gridPanel_5.hide();
							} else if (checked.getGroupValue() == 2) {
								for_change.gridPanel_2.hide();
								for_change.gridPanel_1.hide();
								for_change.list.show();
								for_change.gridPanel_4.hide();
								for_change.gridPanel_5.hide();
							} else if (checked.getGroupValue() == 3) {
								for_change.gridPanel_2.hide();
								for_change.gridPanel_1.hide();
								for_change.list.hide();
								for_change.gridPanel_4.show();
								for_change.gridPanel_5.hide();
							} else if (checked.getGroupValue() == 4) {
								for_change.gridPanel_2.hide();
								for_change.gridPanel_1.hide();
								for_change.list.hide();
								for_change.gridPanel_4.hide();
								for_change.gridPanel_5.show();
							} else if (checked.getGroupValue() == 0) {
								for_change.gridPanel_2.hide();
								for_change.gridPanel_1.show();
								for_change.list.hide();
								for_change.gridPanel_4.hide();
								for_change.gridPanel_5.hide();
							} else {
							};
							// formBase.remove(for_change.eval(last_change));
							// formBase.add(for_change.eval(inform));
							// alert(for_change.last_change);
							formBase.doLayout();
							last_change = "gridPanel_"
									+ checked.getGroupValue();
						}
					}
				});
		this.checkGroupType = new Ext.form.RadioGroup({
					fieldLabel : '处理方式',
					anchor : '96%',
					hidden : true,
					height : 30,
					id : 'checkType',
					items : [{
								boxLabel : '在有效期内禁止',
								name : 'rb-type',
								inputValue : 1,
								value : 1,
								checked : true
							}, {
								boxLabel : '放入清洗名单',
								inputValue : 2,
								value : 2,
								name : 'rb-type'
							}],
					listeners : {
						change : function(com, checked) {
							checked.getGroupValue;
						}
					}
				});
		this.checkGroup = {
			xtype : 'fieldset',
			// title : '',
			autoHeight : true,
			anchor : '96%',
			layout : 'form',

			collapsed : false,
			collapsible : false
			// items : [this.selectV]
		};
		// this.checkGroupType = {
		// xtype : 'fieldset',
		// // title : '',
		//			
		// hidden:true,
		// autoHeight : true,
		// anchor : '96%',
		// layout : 'form',
		// collapsed : false,
		// collapsible : false,
		// items : [this.selectT]
		// };
		this.label = new Ext.Panel({

		});
		
		//无效数据
		this.gridPanel_1 = new HT.EditorGridPanel({
			clicksToEdit : 1,
			scrollHeight : true,
			region : 'center',
			printable : false,
			border : false,
			title : '清洗规则',
			height : 280,
			anchor : '100%',
			lazyLoad : true,
			exportable : false,
			fields : [{
						name : ' tmpCusId',
						type : 'Long'
					}, 'nameCn', 'gender', 'credTypId', 'birthday', 'credNum',
					'credDurDat', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5',
					'ext6'],
			columns : [{
				header : '字段',
				isExp : false,
				dataIndex : 'washField'
				}, {
				header : '清洗条件',
				isExp : false,
				dataIndex : 'washIF',
				editor : {
					xtype : 'combo',
					id : 'OB_CalllistClearn_Grid_washIf_01',
					mode : 'local',
					triggerAction : 'all',
					emptyText : '请选择',
					lazyInit : false,
					store : new Ext.data.ArrayStore({
								fields : ['myId', 'displayText'],
								data : [[ '为空','为空'], ['长度小于','长度小于'],
										['包含','包含'], ['等于','等于'],
										['不等于','不等于']]
							}),
					valueField : 'myId',
					displayField : 'displayText'
				}
			}, {
				header : '条件值',
				isExp : false,
				dataIndex : 'washVal',
				editor : new Ext.form.TextField({}),
                renderer: function(value,cls,record) {
						     if(record.data.washField == '生日') {
						       	return value?value.format('Y-m-d'):'';
						     } else {
						     	return value;
						     }
						}				
			}
			// ,
			// {
			// header : '是否可空',
			// isExp : false,
			// dataIndex : 'credDurDat'
			// },
			// {
			// header : '数据格式',
			// isExp : false,
			// dataIndex : 'nameCn'
			// }
			],
			listeners:{
				'cellclick' : function(grid , rowIndex ,  columnIndex , e ){
					if(columnIndex == 4){
						var record = grid.getStore().getAt(rowIndex);
						if(record.data.washField == '性别'){
							grid.getColumnModel().config[4].editor = new MT.DicComboBox({
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'XB001'
							});
						}else if(record.data.washField == '证件类型'){
							grid.getColumnModel().config[4].editor = new MT.DicComboBox({
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'GGZJLX'
							});
						}else if(record.data.washField == '生日'){
							grid.getColumnModel().config[4].editor = new Ext.form.DateField({
								format:'y-m-d'
							});
						}else{
							grid.getColumnModel().config[4].editor = new Ext.form.TextField({})
						}
					}
					if(columnIndex == 3){
						var record = grid.getStore().getAt(rowIndex);
						if(record.data.washField == '性别'){
							Ext.getCmp("OB_CalllistClearn_Grid_washIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.washField == '证件类型'){
							Ext.getCmp("OB_CalllistClearn_Grid_washIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.washField == '生日'){
							Ext.getCmp("OB_CalllistClearn_Grid_washIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],['小于','小于'],
										['不等于','不等于'],['大于','大于']]);
						} else {
							Ext.getCmp("OB_CalllistClearn_Grid_washIf_01").getStore().loadData([
										[ '为空','为空'], ['长度小于','长度小于'],
										['包含','包含'], ['等于','等于'],
										['不等于','不等于']]);
						}
					}
				}
			}
		});
		var store = this.gridPanel_1.getStore();
		var recordType = store.recordType;
		store.add(new recordType({'flag':'0','washField' : '客户名称'}));
		store.add(new recordType({'flag':'1','washField' : '客户编号'}));
		store.add(new recordType({'flag':'2','washField' : '性别'}));//改下拉框
		store.add(new recordType({'flag':'3','washField' : '生日'}));//改日期控件
		store.add(new recordType({'flag':'4','washField' : '证件类型'}));//改下拉框
		store.add(new recordType({'flag':'5','washField' : '证件号码'}));
		store.add(new recordType({'flag':'6','washField' : '通讯地址'}));
		store.add(new recordType({'flag':'7','washField' : '电子邮件'}));
		store.add(new recordType({'flag':'8','washField' : '传真'}));
		store.add(new recordType({'flag':'9','washField' : '移动号码'}));
		store.add(new recordType({'flag':'10','washField' : '办公电话'}));
		
//		var recordType = store.recordType;
//		store.add(new recordType({'flag':'0','washField' : '客户编号'}));
//		store.add(new recordType({'flag':'1','washField' : '邮政编号'}));
//		store.add(new recordType({'flag':'2','washField' : '移动号码'}));
//		store.add(new recordType({'flag':'3','washField' : '电子邮件'}));
//		store.add(new recordType({'flag':'4','washField' : '通讯地址'}));
//		store.add(new recordType({'flag':'5','washField' : '传真'}));
//		store.add(new recordType({'flag':'6','washField' : '生日'}));
//		store.add(new recordType({'flag':'7','washField' : '性别'}));
//		store.add(new recordType({'flag':'8','washField' : '证件类型'}));
//		store.add(new recordType({'flag':'9','washField' : '证件号码'}));
//		store.add(new recordType({'flag':'10','washField' : '证件有效期'}));
//		store.add(new recordType({'flag':'11','washField' : '创建人内码'}));
//		store.add(new recordType({'flag':'12','washField' : '创建日期'}));
//		store.add(new recordType({'flag':'13','washField' : '备注'}));
//		store.add(new recordType({'flag':'14','washField' : '修改人'}));
//		store.add(new recordType({'flag':'15','washField' : '修改日期'}));
//		store.add(new recordType({'flag':'16','washField' : '客户类型'}));
//		store.add(new recordType({'flag':'17','washField' : '客户名称'}));
//		store.add(new recordType({'flag':'18','washField' : '简称'}));
//		store.add(new recordType({'flag':'19','washField' : '状态'}));
//		store.add(new recordType({'flag':'20','washField' : '年龄'}));
		
		//名单修复
		this.gridPanel_2 = new HT.EditorGridPanel({
			clicksToEdit : 1,
			scrollHeight : true,
			region : 'center',
			printable : false,
			border : false,
			title : '修复规则',
			height : 310,
			hidden : true,
			anchor : '100%',
			lazyLoad : true,
			exportable : false,
//			url : __ctxPath + "/outb/listCusTmpObCallbatch.do?callbatchID=" + 5,
			fields : [{
						name : ' tmpCusId',
						type : 'Long'
					}, 'nameCn', 'gender', 'credTypId', 'birthday', 'credNum',
					'credDurDat', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5',
					'ext6'],
			columns : [{
						header : '字段',
						isExp : false,
						dataIndex : 'washField'
					}, {
						header : '修复方式',
						isExp : false,
						dataIndex : 'washIF',
						editor : {
							xtype : 'combo',
							mode : 'local',
							triggerAction : 'all',
							lazyInit : false,
							store : new Ext.data.ArrayStore({
										fields : ['myId', 'displayText'],
										data : [['号码格式化', '号码格式化']
//												,['号码升位', '号码升位']
												]
									}),
							valueField : 'myId',
							displayField : 'displayText'
						}
					}]
		});
		var store = this.gridPanel_2.getStore();
		var recordType = store.recordType;
		store.add(new recordType({'flag':'9','washField' : '移动号码'}));
		store.add(new recordType({'flag':'10','washField' : '办公号码'}));
		store.add(new recordType({'flag':'7','washField' : '电子邮件'}));
		store.add(new recordType({'flag':'6','washField' : '通讯地址'}));
		store.add(new recordType({'flag':'8','washField' : '传真'}));
		
//		store.add(new recordType({'flag':'0','washField' : '客户编号'}));
//		store.add(new recordType({'flag':'1','washField' : '邮政编号'}));
//		store.add(new recordType({'flag':'6','washField' : '生日'}));
//		store.add(new recordType({'flag':'7','washField' : '性别'}));
//		store.add(new recordType({'flag':'8','washField' : '证件类型'}));
//		store.add(new recordType({'flag':'9','washField' : '证件号码'}));
//		store.add(new recordType({'flag':'10','washField' : '证件有效期'}));
//		store.add(new recordType({'flag':'11','washField' : '创建人内码'}));
//		store.add(new recordType({'flag':'12','washField' : '创建日期'}));
//		store.add(new recordType({'flag':'13','washField' : '备注'}));
//		store.add(new recordType({'flag':'14','washField' : '修改人'}));
//		store.add(new recordType({'flag':'15','washField' : '修改日期'}));
//		store.add(new recordType({'flag':'16','washField' : '客户类型'}));
//		store.add(new recordType({'flag':'17','washField' : '客户名称'}));
//		store.add(new recordType({'flag':'18','washField' : '简称'}));
//		store.add(new recordType({'flag':'19','washField' : '状态'}));
//		store.add(new recordType({'flag':'20','washField' : '年龄'}));
		
		var sm = new Ext.grid.CheckboxSelectionModel();
		var sm_4 = new Ext.grid.CheckboxSelectionModel();
		var sm_5 = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
					columns : [sm, {
								header : '匹配字段',
								dataIndex : 'washField'
							}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					}
				});
		var cm_4 = new Ext.grid.ColumnModel({
					columns : [sm_4, {
								header : '重复字段',
								dataIndex : 'washField'
							}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					}
				});
		var cm_5 = new Ext.grid.ColumnModel({
					columns : [sm_5, {
								header : '重复字段',
								dataIndex : 'washField'
							}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					}
				});
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : __ctxPath
						+ '/know/dianpcinglistUkKnowFankui.do?Q_ukSysKnow.knowId_L_EQ='
						+ 1
			}),
			reader : new Ext.data.JsonReader({
						root : 'result',
						totalProperty : 'totalCounts',
						id : 'id',
						fields : [{
									name : ' tmpCusId',
									type : 'Long'
								}, 'nameCn', 'gender', 'credTypId', 'birthday',
								'credNum', 'credDurDat', 'ext1', 'ext2',
								'ext3', 'ext4', 'ext5', 'ext6']
					}),
			remoteSort : false
		});
		
		//黑白名单
		this.gridPanel_3 = new Ext.grid.GridPanel({
			region : 'center',
			autoScroll : true,
			//height:150,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			columnLines : true,// 是否显示分隔线
			cm : cm,
			sm : sm,
			store : store,
			viewConfig : {
				forceFit : true
			},
			region : 'center',
			border : false
				// title : '匹配字段',
			});
		
		var store = this.gridPanel_3.getStore();
		var recordType = store.recordType;
		store.add(new recordType({'flag':'0','washField' : '客户名称'}));
		store.add(new recordType({'flag':'1','washField' : '客户编号'}));
		store.add(new recordType({'flag':'2','washField' : '性别'}));//改下拉框
		store.add(new recordType({'flag':'3','washField' : '生日'}));//改日期控件
		store.add(new recordType({'flag':'4','washField' : '证件类型'}));//改下拉框
		store.add(new recordType({'flag':'5','washField' : '证件号码'}));
		store.add(new recordType({'flag':'6','washField' : '通讯地址'}));
		store.add(new recordType({'flag':'7','washField' : '电子邮件'}));
		store.add(new recordType({'flag':'8','washField' : '传真'}));
		store.add(new recordType({'flag':'9','washField' : '移动号码'}));
		store.add(new recordType({'flag':'10','washField' : '办公电话'}));
		
		//名单去重
		this.gridPanel4 = new Ext.grid.GridPanel({
			region : 'center',
			autoScroll : true,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			layout:'fit',
			columnLines : true,// 是否显示分隔线
			cm : cm_4,
			sm : sm_4,
			store : store,
			viewConfig : {
				forceFit : true
			},
			region : 'center',
			border : false
				// title : '匹配字段',
			});
		
		//业务去重
		this.gridPanel5 = new Ext.grid.GridPanel({
			region : 'center',
			autoScroll : true,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			layout:'fit',
			columnLines : true,// 是否显示分隔线
			cm : cm_5,
			sm : sm_5,
			store : store,
			viewConfig : {
				forceFit : true
			},
			region : 'center',
			border : false
				// title : '匹配字段',
			});
		this.mingdan = new Ext.form.CheckboxGroup({
					// fieldLabel : '清洗方式',
					layout : 'form',
					region : 'west',
					border : false,
					style : 'margin-top:100px;margin-left:50px;',
					width : 150,
					autoHeight : true,
					// itemCls : 'x-check-group-alt',
					columns : 1,
					defaultType : 'checkbox',
					items : [{
								boxLabel : '黑名单',
								name : 'rb-black',
								inputValue : 1,
								border : false,
								checked : true
							}, {
								boxLabel : '白名单',
								inputValue : 2,
								border : false,
								name : 'rb-white'
							}],
					listeners : {
						change : function(com, checked) {

						}
					}
				});
		this.fanwei = new Ext.form.RadioGroup({
					fieldLabel : '去重范围',
					// region : 'center',
					border : false,
					anchor : '96%',
					// style : 'margin-top:10px;margin-left:20px;',
					height : 120,
					columns : 1,
					items : [{
								boxLabel : '所有执行中的项目',
								name : 'rb-fanwei',
								inputValue : 1,
								checked : true
							}, {
								boxLabel : '营销项目',
								inputValue : 2,
								name : 'rb-fanwei'
							}, {
								boxLabel : '营销活动',
								inputValue : 3,
								name : 'rb-fanwei'
							}, {
								boxLabel : '呼叫名单',
								inputValue : 4,
								name : 'rb-fanwei'
							}, {
								boxLabel : '批次',
								inputValue : 5,
								name : 'rb-fanwei'
							}],
					listeners : {
						change : function(com, checked) {

						}
					}
				});
		// this.listset = {
		// xtype : 'fieldset',
		// autoHeight : true,
		// collapsed : false,
		// style : 'margin-top:20px;',
		// // baseCls:".x-fieldsetNone",
		// collapsible : false,
		// region : 'center',
		// items : []
		// };

		this.list = new Ext.Panel({
					layout : 'border',
					hidden : true,
					height : 260,
					border : true,
					bodyStyle : 'background:white;',
					// defaultType : 'panel',
					items : [this.mingdan, this.gridPanel_3]
				})
		this.gridPanel_4 = new Ext.Panel({
					anchor : '100%',
					layout : 'border',
					hidden : true,
					height : 260,
					border : true,
					bodyStyle : 'background:white;',
					// defaultType : 'panel',
					items : [this.gridPanel4]
				})
		this.fanwei_change = new Ext.FormPanel({
					region : 'west',
					layout : 'form',
					border : false,
					labelAlign : 'right',
					width : 250,
					defaults : {
						anchor : '96%'
					},
					labelWidth : 80,
					defaultType : 'textfield',
					items : [this.fanwei]
				})
		// this.mainMenu = new Ext.Panel({
		// region : 'west',
		// layout : 'border',
		// width : 250,
		// border : false,
		// bodyStyle : 'background:white;',
		// items : [this.fanwei_change, this.fanwei]
		// })
		this.gridPanel_5 = new Ext.Panel({
					anchor : '100%',
					layout : 'border',
					hidden : true,
					height : 260,
					border : true,
					bodyStyle : 'background:white;',
					// defaultType : 'panel',
					items : [this.gridPanel5, this.fanwei_change]
				})
		this.gridPanel1 = new HT.GridPanel({
			scrollHeight : true,
			id : 'ObCallListClearnWindowFilterGrid',
			region : 'center',
			printable : false,
			lazyLoad : true,
			showSm : false,
			anchor : '95%',
			exportable : false,
			url :  __ctxPath + '/outb/queryWashCusObWashHis.do',
			fields : [{
						name : ' tmpCusId',
						type : 'Long'
					}, 'nameCn', 'gender', 'credTypId', 'birthday', 'credNum',
					'credDurDat', 'teleHome', 'teleOffice', 'teleMobile', 'fax', 'email',
					'inchargePersonName'],
			columns : [{
						header : '姓名',
						isExp : false,
						dataIndex : 'nameCn'
					}, {
						header : '性别',
						isExp : false,
						dataIndex : 'gender',
						renderer : function(value) {
							return XB001.get(value);
						}
					}, {
						header : '证件类型',
						isExp : false,
						dataIndex : 'credTypId',
						renderer : function(value) {
							return CONOB_CALLBATCH_IMP_TMP_ZJLX.get(value);
						}
					}, {
						header : '生日',
						isExp : false,
						dataIndex : 'birthday'
					}, {
						header : '证件号码',
						isExp : false,
						dataIndex : 'credNum'
					},
					{
						header : '负责人',
						isExp : false,
						dataIndex : 'inchargePersonName'
					}
					// {
					// header : '证件有效期',
					// isExp : false,
					// dataIndex : 'credDurDat',
					// renderer : function(value) {
					// return value.substring(0, 10);
					// }
					// },
//					{
//						header : '家庭电话',
//						isExp : false,
//						dataIndex : 'teleHome'
//					}, {
//						header : '办公电话',
//						isExp : false,
//						dataIndex : 'teleOffice'
//					}, {
//						header : '移动电话',
//						isExp : false,
//						dataIndex : 'teleMobile'
//					},
					// {
					// header : '其他电话',
					// isExp : false,
					// dataIndex : 'ext4'
					// },
//					{
//						header : '传真',
//						isExp : false,
//						dataIndex : 'fax'
//					}, {
//						header : 'Email',
//						isExp : false,
//						dataIndex : 'email'
//					}
					]
		});
		this.searchPanel1 = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					anchor : '95%',
					height : 35,
					items : [{
								xtype : 'panel',
								width : 50,
								style : 'text-align:right',
								html : '姓名：'
							}, {
								name : 'Q_nameCn_S_LK',
								xtype : 'textfield',
								id : 'Q_nameCn_S_LK_ID'
							}, {
								xtype : 'panel',
								width : 50,
								style : 'text-align:right',
								html : '性别：'
							}, {
								hiddenName : 'Q_gender_SN_EQ',
								xtype : 'mtdiccombo',
								id : 'Q_gender_SN_EQ_ID',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'XB001'
							}, {
								xtype : 'button',
								text : __search,
								id:'OB_CalllistClear_Btn_Search',
								iconCls : 'search',
								scope : this,
								disabled:true,
								handler : function() {
									gQ_nameCn_S_LK = Ext.getCmp("Q_nameCn_S_LK_ID").getValue();
									gQ_gender_SN_EQ = Ext.getCmp("Q_gender_SN_EQ_ID").getValue();
									Ext.getCmp("OB_Calllist_ClearnWin_batchId").setValue(gcallbatchId);
									Ext.getCmp("OB_Calllist_ClearnWin_washIFGrid").setValue(gwashIFGrid);
									
									$search({
										searchPanel : this.searchPanel1,
										gridPanel : Ext.getCmp("ObCallListClearnWindowFilterGrid")
									});
								}
							}, {
										name : 'callbatchId',
										id : 'OB_Calllist_ClearnWin_batchId',
										xtype : 'hidden'
							},{
										name : 'washIFGrid',
										id : 'OB_Calllist_ClearnWin_washIFGrid',
										xtype : 'hidden'
							},{
										name : 'clearSoundTyp',
										id : 'OB_Calllist_ClearnWin_clearSoundTyp',
										xtype : 'hidden'
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						border : false,
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					border : false,
					frame : false
				});// end of searchPanel
		this.panel = new Ext.Panel({
					layout : 'form',
					id : 'ObcallListClearnstep1',
					labelAlign : 'right',
					bodyStyle : 'padding-top:4px;',
					labelWidth : 80,
					border : false,
					items : [this.oldList, this.selectV, this.gridPanel_1,
							this.gridPanel_2, this.list, this.gridPanel_4,
							this.gridPanel_5]
				});
		this.panel1 = new Ext.Panel({
					layout : 'border',
					border : false,
					id : 'ObcallListClearnstep2',
					height : 366,
					items : [this.gridPanel1, this.searchPanel1]
				});
		this.panel1.hide();
		for_change = this;
		
		if(gInChanel!=null && gInChanel!=undefined && gInChanel!='') {
			//呼叫名单进入
			if(gInChanel == 'ObCalllist') {
				selectywqc.hide();
				var calllistId = _cfg.calllistId;
				//营销项目
				Ext.getCmp('OB_Calllist_Clearn_Proj_Btn').setDisabled(true);
				Ext.Ajax.request({
					url : __ctxPath + '/outb/getBaseInfoObWashHis.do',
					params : {
						calllistId : calllistId
					},
					method : 'post',
					success : function(response) {
						var result = Ext.util.JSON.decode(response.responseText);
						Ext.getCmp("ObCallListClearn.proNam").setValue(result.projName);
						Ext.getCmp('obCallListClearnWindowCom').setValue(result.comName);
						Ext.getCmp('obCallListClearnWindowCalllist').setValue(result.calllistName);
//						{"projId":"681","":"测试活动","":"测试名单","":"测试1","comId":"1501","calllistId":"621"}
					}
				});
				
				Ext.Ajax.request({
					url : __ctxPath	+ '/outb/getObCallbatchObCallbatchAss.do?calllistId=' + calllistId +"&flag=0",//查询未启用的批次
					method : 'post',
					success : function(response) {
						var result = Ext.util.JSON.decode(response.responseText);
						Ext.getCmp("obCallListClearnWindowCallbatch").getStore().loadData(result);// 获取组件，加载数据
					}
				});
			}
			
			//导入批次进入
			if(gInChanel == 'ObCallbatch') {
				selectywqc.hide();
				var tmpcallbatchId = _cfg.callbatchId;
				var tmpcallbatchName = _cfg.callbatchNam;
				
				var store = Ext.getCmp("obCallListClearnWindowCallbatch").getStore();
				store.add(new recordType({'callbatchId' : tmpcallbatchId,'callbatchNam' : tmpcallbatchName }));
				Ext.getCmp("obCallListClearnWindowCallbatch").setValue(tmpcallbatchId);
				
				//营销项目
				Ext.getCmp('OB_Calllist_Clearn_Proj_Btn').setDisabled(true);
				Ext.Ajax.request({
					url : __ctxPath + '/outb/getBaseInfoObWashHis.do',
					params : {
						callbatchId : tmpcallbatchId
					},
					method : 'post',
					success : function(response) {
						var result = Ext.util.JSON.decode(response.responseText);
						Ext.getCmp("ObCallListClearn.proNam").setValue(result.projName);
						Ext.getCmp('obCallListClearnWindowCom').setValue(result.comName);
						Ext.getCmp('obCallListClearnWindowCalllist').setValue(result.calllistName);
					}
				});
			}
			
		}
	},// end of the initcomponents

	reset : function() {
		this.formPanel.getForm().reset();
	},
	cancel : function() {
		Ext.getCmp('ObCallListClearnWindowWin').close();
	},
	save : function() {
		var projId = '';
		var comId = '';
		var calllistId = '';
		if(gIsClearnView!='false') {
			//加载数据
			projId = Ext.getCmp('ObCallListClearn.proId').getValue();
			if(null==projId || ''==projId || 'undefinded'==projId) {
				Ext.Msg.alert("提示信息","请您选择项目!");
				return;
			}
			comId = Ext.getCmp("obCallListClearnWindowCom").getValue();
			if(null==comId || ''==comId || 'undefinded'==comId) {
				Ext.Msg.alert("提示信息","请您选择活动!");
				return;
			}
			calllistId = Ext.getCmp("obCallListClearnWindowCalllist").getValue();
			if(null==calllistId || ''==calllistId || 'undefinded'==calllistId) {
				Ext.Msg.alert("提示信息","请您选择名单!");
				return;
			}
		}

		var callbatchId = Ext.getCmp("obCallListClearnWindowCallbatch").getValue();
		if(null==callbatchId || ''==callbatchId || 'undefinded'==callbatchId) {
			Ext.Msg.alert("提示信息","请您选择批次!");
			return;
		}
		//判断批次是否启用
//		var isEnable = true;	//默认为已启用
//		var responsea = Ext.lib.Ajax.getConnectionObject().conn;
//		responsea.open("POST",  __ctxPath + '/outb/isEnableObCallbatch.do?callbatchId='+callbatchId, false);
//		responsea.send(null);
//		var result = Ext.util.JSON.decode(responsea.responseText);
//		if('NO_ENABLE'==result.flag) {
//			isEnable = false;
//		}
//		if(isEnable) {
//			Ext.Msg.alert("提示信息","请您选择批次已经启用，不能再进行清洗!");
//			return;
//		}
		
		//清洗方式
		clearnTyp = null;
		this.selectV.eachItem(function(item){  
		    if(item.checked===true){  
		        clearnTyp =item.inputValue;
		    }  
		}); 
		
		//条件列表数据
		washIFGrid = '';	
		clearnRual = '';//清洗 规则——存储在数据库中
		//清洗方式：无效数据——0
		if(clearnTyp == '0') {
			var store = this.gridPanel_1.getStore();
			for(var i=0; i<store.getCount(); i++) {
				var record = store.getAt(i);
				var washIF = record.data.washIF;
				var washField = record.data.washField;
				var washFlag = record.data.flag;
				var washVal = record.data.washVal;
				
				if(washIF!='' && washIF!=undefined) {
					if('为空'==washIF) {
						clearnRual = clearnRual + washField + ',';
						clearnRual = clearnRual + washIF + ',';
						clearnRual = clearnRual + washVal + ';';
					} else if(washVal!='' && washVal!=undefined) {
						clearnRual = clearnRual + washField + ',';
						clearnRual = clearnRual + washIF + ',';
						clearnRual = clearnRual + washVal + ';';
					}
				}
				
				
				if(washIF!='' && washIF!=undefined) {
					if('为空'==washIF) {
						washIF = 'NULL';
						washVal = ' ';
						washIFGrid = washIFGrid + washFlag + ',';
						washIFGrid = washIFGrid + washIF + ',';
						washIFGrid = washIFGrid + washVal + ';';
					} else if(washVal!='' && washVal!=undefined){
						if('长度小于'==washIF) {
							washIF = 'Len<';
						} else if('包含'==washIF) {
							washIF = 'CONTAIN';
						} else if('等于'==washIF) {
							washIF = '=';
						} else if('不等于'==washIF) {
							washIF = '<>';
						} else if('大于'==washIF){
							washIF = '>';
						} else if('小于'==washIF){
							washIF = '<';
						}
						washIFGrid = washIFGrid + washFlag + ',';
						washIFGrid = washIFGrid + washIF + ',';
						washIFGrid = washIFGrid + washVal + ';';
					}
				}
			}
		}
		//清洗方式：名单修复——1
		else if (clearnTyp == '1') {
			var store = this.gridPanel_2.getStore();
			for(var i=0; i<store.getCount(); i++) {
				var record = store.getAt(i);
				var washIF = record.data.washIF;
				if(washIF!='' && washIF!=undefined) {
					var washIF = record.data.washIF;
					var washField = record.data.washField;
					clearnRual = clearnRual + washField + ',';
					clearnRual = clearnRual + washIF + ',';
					clearnRual = clearnRual + ' ' + ';';
					
					if(washIF=='号码格式化') {
						washIFGrid = washIFGrid + record.data.flag + ',';
						washIFGrid = washIFGrid + washIF + ',';
						washIFGrid = washIFGrid + ' ' + ';';
					}
				}
			}
		}
		
		//清洗方式：黑白名单——2
		else if (clearnTyp == '2') {
			var select = this.gridPanel_3.getSelectionModel();
			if(select.getCounts==0) {
				return;
			}
			clearnRual = '去重字段为：';
			select.each(function(rec){
				clearnRual = clearnRual + rec.data.washField + ' , ';

				washIFGrid = washIFGrid + rec.data.flag + ',';
				washIFGrid = washIFGrid +'true'+ ',';
				washIFGrid = washIFGrid + ' ' + ';';
			});
		}
		//清洗方式：名单去重——3
		else if (clearnTyp == '3') {
			var select = this.gridPanel4.getSelectionModel();
			if(select.getCounts==0) {
				return;
			}
			clearnRual = '去重字段为：';
			select.each(function(rec){
				clearnRual = clearnRual + rec.data.washField + ' , ';

				washIFGrid = washIFGrid + rec.data.flag + ',';
				washIFGrid = washIFGrid +'true'+ ',';
				washIFGrid = washIFGrid + ' ' + ';';
			});
		}
		//清洗方式：业务去重——4
		else if (clearnTyp == '4') {
			var select = this.gridPanel5.getSelectionModel();
			if(select.getCounts==0) {
				return;
			}
			clearnRual = '去重字段为：';
			select.each(function(rec){
				clearnRual = clearnRual + rec.data.washField + ' , ';
				
				washIFGrid = washIFGrid + rec.data.flag + ',';
				washIFGrid = washIFGrid +'true'+ ',';
				washIFGrid = washIFGrid + ' ' + ';';
			});
			
			//去重范围
			var clearSoundTyp = null;
			this.fanwei.eachItem(function(item){  
			    if(item.checked===true){
			        var clearSound =item.inputValue;
			        if(clearSound=='1') {//所有执行中的项目
			        	clearSoundTyp = "ALL";
			        } else if(clearSound=='2') {//营销项目
			        	clearSoundTyp = "PROJECT";
			        } else if(clearSound=='3') {//营销活动
			        	clearSoundTyp = "COM";
			        } else if(clearSound=='4') {//呼叫名单
			        	clearSoundTyp = "CALLLIST";
			        } else if(clearSound=='5') {//批次
			        	clearSoundTyp = "CALLBATCH";
			        }
			    }  
			}); 
			Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().baseParams['clearSoundTyp'] =clearSoundTyp;
		}
		Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().baseParams['clearnTyp'] =clearnTyp;
		Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().baseParams['washIFGrid'] =washIFGrid;
		
		gprojId = projId;
		gcomId = comId;
		gcalllistId = calllistId;
		gcallbatchId = callbatchId;
		gclearnTyp = clearnTyp;
		gwashIFGrid = washIFGrid;
		gclearSoundTyp = clearSoundTyp;
		gQ_nameCn_S_LK = Ext.getCmp("Q_nameCn_S_LK_ID").getValue();
		gQ_gender_SN_EQ = Ext.getCmp("Q_gender_SN_EQ_ID").getValue();
		gclearnRual = clearnRual;
		/**
		 * 发送请求，查询数据
		 */
		var myMask = new Ext.LoadMask(Ext.getBody(), {
				id : 'OB_Calllist_Clear_LoadMask',
                msg: '正在查询，请稍后...',
                removeMask: true //完成后移除
            });
        myMask.show();
        Ext.getCmp("OB_Calllist_Clear_btn-ok-t").setDisabled(true);
        Ext.getCmp("OB_Calllist_Clear_btn-back-t").setDisabled(true);
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/queryWashCusObWashHis.do',
			method : 'post',
			timeout:99999,
			params: { 
				projId : projId,
				comId : comId,
				calllistId : calllistId,
				callbatchId : gcallbatchId,
				clearnTyp : clearnTyp,
				washIFGrid : washIFGrid,
				clearSoundTyp : clearSoundTyp
			},
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().removeAll();
				Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().loadData(result);
				Ext.getCmp('OB_CalllistClear_Btn_Search').setDisabled(false);
				Ext.getCmp("OB_Calllist_Clear_btn-ok-t").setDisabled(false);
				Ext.getCmp("OB_Calllist_Clear_btn-back-t").setDisabled(false);
				myMask.hide();
			},
			failure : function() {
				Ext.ux.Toast.msg('操作提示', '查询超时，请联系管理员！');
				Ext.getCmp("OB_Calllist_Clear_btn-ok-t").setDisabled(false);
				Ext.getCmp("OB_Calllist_Clear_btn-back-t").setDisabled(false);
				myMask.hide();
			}
		});
		
		
//		$postSubmit({
//			params : { 
//				projId : projId,
//				comId : comId,
//				calllistId : calllistId,
//				callbatchId : gcallbatchId,
//				clearnTyp : clearnTyp,
//				washIFGrid : washIFGrid,
//				clearSoundTyp : clearSoundTyp
//			},
//			noReload : true,
//			url :  __ctxPath + '/outb/queryWashCusObWashHis.do',
//			msgFailure : '查询超时，请联系管理员！',
//			callback : function(fp, action) {
//				alert(fp.responseText);
//			}
//		});
		
		
		
		
		
		//面板操作
		var panels = Ext.getCmp('ObCallListClearnWindowWin');
		// panels.remove(this.panel);
		this.panel.hide();
		this.panel1.show();
		panels.add(this.panel1);
		panels.doLayout();
		Ext.getCmp('OB_Calllist_Clear_btn-ok-t').show();
		Ext.getCmp('btn-save-t').hide();
		Ext.getCmp('OB_Calllist_Clear_btn-back-t').show();
		Ext.getCmp('OB_Calllist_Clear_btn-cancel-t').hide();
	},// end of save
	back : function() {
		var panels = Ext.getCmp('ObCallListClearnWindowWin');
		this.panel.show();
		this.panel1.hide();
		panels.doLayout();
		Ext.getCmp('btn-save-t').show();
		Ext.getCmp('OB_Calllist_Clear_btn-back-t').hide();
		Ext.getCmp('OB_Calllist_Clear_btn-ok-t').hide();
		Ext.getCmp('OB_Calllist_Clear_btn-cancel-t').show();
	},
	ok : function() {
		var count = Ext.getCmp("ObCallListClearnWindowFilterGrid").getStore().getTotalCount();
		if(count>0) {
			Ext.getCmp("OB_Calllist_Clear_btn-ok-t").hide();
			Ext.getCmp("showMessage").show();
			Ext.Ajax.request({
				url : __ctxPath + '/outb/confirmWashImpTmpObWashHis.do',
				method : 'post',
				params : {
					projId : gprojId,
					comId : gcomId,
					calllistId : gcalllistId,
					callbatchId : gcallbatchId,
					clearnTyp : gclearnTyp,
					washIFGrid : gwashIFGrid,
					clearSoundTyp : gclearSoundTyp,
					Q_nameCn_S_LK :gQ_nameCn_S_LK,
					Q_gender_SN_EQ : gQ_gender_SN_EQ,
					clearnRual : gclearnRual
				},
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);// 解析数据
					
					Ext.Msg.alert('清洗','清洗信息成功</br> 清洗完成的数据:"'+result.totalCounts+'"</br>清洗失败的数据:0');
					Ext.getCmp('ObCallListClearnWindowWin').close();
					//从清洗历史列表进入，才回刷界面
					if(gIsClearnView=='true') {
						Ext.getCmp('ObCallListClearnViewGrid').getStore().reload();
					}
									
//					Ext.Msg.confirm('清洗',
//							'清洗信息成功</br> 清洗完成的数据:"'+result.totalCounts+'"</br>清洗失败的数据:0</br> 是否继续数据清洗?',
//							function(btn) {
//								if (btn == 'yes') {
//									var panels = Ext.getCmp('ObCallListClearnWindowWin');
//									Ext.getCmp('ObcallListClearnstep1').show();
//									Ext.getCmp('ObcallListClearnstep2').hide();
//									panels.doLayout();
//									Ext.getCmp('btn-save-t').show();
//									Ext.getCmp('OB_Calllist_Clear_btn-back-t').hide();
//									Ext.getCmp('OB_Calllist_Clear_btn-ok-t').hide();
//									Ext.getCmp('OB_Calllist_Clear_btn-cancel-t').show();
//									
//									//清空部分清洗条件
//									Ext.getCmp("Q_nameCn_S_LK_ID").setValue('');
//									Ext.getCmp("Q_gender_SN_EQ_ID").setValue('');
//									gQ_nameCn_S_LK = '';
//									gQ_gender_SN_EQ = '';
//									
//									Ext.getCmp("showMessage").hide();
//								} else {
//									Ext.getCmp('ObCallListClearnWindowWin').close();
//									//从清洗历史列表进入，才回刷界面
//									if(gIsClearnView=='true') {
//										Ext.getCmp('ObCallListClearnViewGrid').getStore().reload();
//									}
//								}
//					});
				},
				failure : function() {
				}
			});
		} else {
			Ext.Msg.alert("提示信息","没有需要清洗的数据！");
		}
	}
});
ObCallListClearnWindow.getStoreCom = function(projId) {// 注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
	Ext.Ajax.request({
				url : __ctxPath + '/outb/getObComByWashObCallbatchAss.do?projId=' + projId+"&flag=",
				method : 'post',
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);// 解析数据
					Ext.getCmp("obCallListClearnWindowCom").getStore().loadData(result);// 获取组件，加载数据
				},
				failure : function() {
				}
	});
}