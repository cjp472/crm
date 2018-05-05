/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCalllistCchouquForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
var chouquRule=null;
var targetType=null;
var fromCallbatchId=null;
var callbatchIdYiYou=null;
ObCalllistCchouquForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObCalllistCchouquForm.superclass.constructor.call(this, {
					id : 'ObCalllistCchouquFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '批次名单抽取',
					buttonAlign : 'center',
					buttons : [{
								text : '抽取',
								iconCls : 'btn-save',
								scope : this,
								id:'button_CQ',
								handler : this.chouqu
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}],
					listeners : {

		}
				});

	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		var combo_obcom_form_yiyou = new Ext.form.ComboBox({
				xtype : 'combo',
				mode : 'local',
				id:'combo_obcom_Id_chouquproj_yiyou_CQ',
				fieldLabel : '营销活动',
				anchor : '100%',
				valueField:'comId',//设置隐藏的value值字段
				displayField:'comName',//设置显示的value值字段
				store:new Ext.data.SimpleStore({//new一个SimpleStore
					fields:['comId','comName'],	//设定键/值
					data:[]					//默认的data必须提供
				}),
				listeners : {
					'select' : function(combo, record,index) {
						var comIdVal = combo_obcom_form_yiyou.getValue();
						combo_calllist_form_yiyou.clearValue();
						combo_callbatch_form_yiyou.clearValue();
						ObCalllistCchouquForm.getStoreCallist_yiyou(comIdVal);
					}
				}
		});	
				
		
		var combo_calllist_form_yiyou = new Ext.form.ComboBox({
				xtype : 'combo',
				mode : 'local',
				id : 'combo_obcalllist_Id_chouquproj_yiyou_CQ',
				fieldLabel : '呼叫名单',
				anchor : '100%',
				valueField:'calllistId',//设置隐藏的value值字段
				displayField:'calllistName',//设置显示的value值字段
				store:new Ext.data.SimpleStore({//new一个SimpleStore
					fields:['calllistId','calllistName'],	//设定键/值
					data:[]					//默认的data必须提供
				}),
				listeners : {
					'select' : function(combo, record,index) {
						var calllistIdVal = combo_calllist_form_yiyou.getValue();
						combo_callbatch_form_yiyou.clearValue();
						ObCalllistCchouquForm.getStoreCallbatch_yiyou(calllistIdVal);
					}
				}
		});		
		
		var combo_callbatch_form_yiyou = new Ext.form.ComboBox({
				xtype : 'combo',
				mode : 'local',
				id : 'combo_callbatch_Id_chouquproj_yiyou_CQ',
				fieldLabel : '批次',
				anchor : '100%',
				valueField:'callbatchId',//设置隐藏的value值字段
				displayField:'callbatchName',//设置显示的value值字段
				store:new Ext.data.SimpleStore({//new一个SimpleStore
					fields:['callbatchId','callbatchName'],	//设定键/值
					data:[]					//默认的data必须提供
				}),
				listeners:{
				    'select':function(combo,record,index) {
				    	callbatchIdYiYou=record.data.callbatchId;
				    	//ObCalllistChouquForm.listAssIdsByCallbatchId(callbatchId);
				    }
				}
			});			
		this.gridPanel_history = new HT.EditorGridPanel({
			region : 'center',
			id : 'gridPanelCQ_history',
			scrollHeight : true,
			checkOnlySm:true,
			showPaging:false,
			height : 150,
			tbar : ['->', {
						iconCls : 'btn-add',
						text : '增加',
						handler : function() {
							var store = Ext.getCmp('gridPanelCQ_history')
									.getStore();
							var recordType = store.recordType;
							store.add(new recordType({})); // 添加一行空store
						}
					}, {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = Ext.getCmp('gridPanelCQ_history')
									.getStore();
							var sm = Ext.getCmp('gridPanelCQ_history')
									.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
							} else {
								store.remove(cell);
							}
						}
					}],
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'assignFiled', 'assignIf','assignName','assignValue'],
			columns : [{
						header : '条件',
						dataIndex : 'assignFiled',
						editor : new Ext.form.ComboBox({
									mode : 'local',
									editable : false,
									triggerAction : 'all',
									store : [['姓名', '姓名'],['客户编号', '客户编号'], ['性别', '性别'], ['客户级别', '客户级别'], 
									        ['会员区域', '会员区域'], ['年收入', '年收入'], ['积分', '积分'], ['礼金', '礼金']
									        , ['购物频次', '购物频次'], ['上次购物金额', '上次购物金额'], ['拒收比率', '拒收比率']
									        , ['退换货比率', '退换货比率']]
								})
					}, {
						header : '关系',
						dataIndex : 'assignIf',
						editor : new Ext.form.ComboBox({
							        id : 'OB_CalllistCQ_Grid_assignIf_01',
									mode : 'local',
									editable : false,
									triggerAction : 'all',
									store : [['为空', '为空'], ['长度小于', '长度小于'],
										['包含', '包含'], ['等于', '等于'],
										['不等于', '不等于']]
								})
					}, {
						header : '值',
						dataIndex : 'assignValue',
						id:'assignNameCQ',
						editor : new Ext.form.TextField({

						}),
						renderer:function(value,cls,record){
							if(value){
								if(record.data.assignFiled == '会员区域'){
									record.data.assignValue = value.split(';')[0].replace('-','@');
									return value.split(';')[1].replace('-','');
								}else if((record.data.assignFiled == '购物频次'||record.data.assignFiled == '积分')) {
							     	if(record.data.assignIf != '为空') {
							     		var re=/^[0-9]*[1-9][0-9]*$/;
							     		if(re.test(value)) {
							     			return value;
							     		}else {
											   Ext.ux.Toast.msg('操作信息', '请输入正整数！');	
											   record.data.assignValue='';
												return '';
							     		}
							     	} else {
										return value;
							     	}								
								} else if(record.data.assignFiled == '年收入'||record.data.assignFiled == '上次购物金额'||record.data.assignFiled == '礼金'||record.data.assignFiled == '拒收比率'||record.data.assignFiled == '退换货比率') {
							     	if(record.data.assignIf != '为空') {
							     		var re=/^\d+(\.\d+)?$/;
							     		if(re.test(value)) {
							     			return value;
							     		}else {
											   Ext.ux.Toast.msg('操作信息', '请输入有效数字！');	
											   record.data.assignValue='';
												return '';
							     		}
							     	} else {
										return value;
							     	}									
								}else{
							     	if(record.data.assignIf=='长度小于') {
							     		var re=/^[0-9]*[1-9][0-9]*$/;
							     		if(re.test(value)) {
							     			return value;
							     		}else {
											   Ext.ux.Toast.msg('操作信息', '请输入正整数！');	
												return '';
							     		}
							     	} else {
										return value;
							     	}
								}
							}
						}
					}],
			listeners:{
				'cellclick' : function(grid , rowIndex ,  columnIndex , e ){
					if(columnIndex == 4){
						var record = grid.getStore().getAt(rowIndex);
						if(Ext.getCmp('gridPanelCQ_history').getColumnModel().getColumnById('assignNameCQ').getEditor()) {
						
						Ext.getCmp('gridPanelCQ_history').getColumnModel().getColumnById('assignNameCQ').getEditor().destroy();
						}
						if(record.data.assignFiled == '性别'){
							grid.getColumnModel().config[4].editor = new MT.DicComboBox({
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'XB001'
							});
						}else if(record.data.assignFiled == '证件类型'){
							grid.getColumnModel().config[4].editor = new MT.DicComboBox({
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'GGZJLX'
							});
						}else if(record.data.assignFiled == '生日'){
							grid.getColumnModel().config[4].editor = new Ext.form.DateField({
								format:'y-m-d'
							});
						}else if(record.data.assignFiled == '会员区域') {
						    grid.getColumnModel().config[4].setEditor({
						    	xtype:'addresseditor'
						    })						        
						}else if(record.data.assignFiled == '客户级别') {
							grid.getColumnModel().config[4].editor = new MT.DicComboBox({
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONKHJB'
							});
						}else{
							grid.getColumnModel().config[4].editor = new Ext.form.TextField({})
						}
					}
					if(columnIndex == 3){
						var record = grid.getStore().getAt(rowIndex);
						if(record.data.assignFiled == '性别'){
							Ext.getCmp("OB_CalllistCQ_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '证件类型'){
							Ext.getCmp("OB_CalllistCQ_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '生日'||record.data.assignFiled == '年收入'||record.data.assignFiled == '积分'||record.data.assignFiled == '礼金'
						    ||record.data.assignFiled == '购物频次'||record.data.assignFiled == '上次购物金额'||record.data.assignFiled == '拒收比率'||record.data.assignFiled == '退换货比率'){
							Ext.getCmp("OB_CalllistCQ_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],['小于','小于'],
										['不等于','不等于'],['大于','大于']]);
						}else if(record.data.assignFiled == '客户级别'){
							Ext.getCmp("OB_CalllistCQ_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						} else if(record.data.assignFiled == '会员区域'){
							Ext.getCmp("OB_CalllistCQ_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else {
							Ext.getCmp("OB_CalllistCQ_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'], ['长度小于','长度小于'],
										['包含','包含'], ['等于','等于'],
										['不等于','不等于']]);
						}
					}
				}
			}
				// end of columns
			});
		this.gridPanel = new HT.EditorGridPanel({
			region : 'center',
			scrollHeight : true,
			height : 250,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '名称',
						dataIndex : 'contactType'
					}, {
						header : '工号',
						dataIndex : 'contactType2'
					}, {
						header : '可抽取名单数',
						dataIndex : 'contactValue'
					}, {
						header : '抽取数量',
						dataIndex : 'contactType3',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
						xtype : 'fieldset',
						title : '抽取来源',
						collapsed : false,
						collapsible : true,
						items : [{
									layout : 'column',
									border : false,
									items : [{
												layout : 'form',
												border : false,
												columnWidth : .5,
												items : [{
															xtype : 'textfield',
															name:'obCallbatch.obCalllist.obProject.projNam',
															anchor : '100%',
															fieldLabel : '项目'
														}, {
															xtype : 'textfield',
															name:'obCallbatch.comNam',
															anchor : '100%',
															fieldLabel : '名单'
														}]
											}, {
												layout : 'form',
												border : false,
												columnWidth : .5,
												items : [{
															xtype : 'textfield',
															anchor : '100%',
															name:'obCallbatch.comNam',
															fieldLabel : '活动'
														}, {
															xtype : 'textfield',
															name:'obCallbatch.callbatchNam',
															anchor : '100%',
															fieldLabel : '批次'
														}]
											}]
								}]
					}, {
						xtype : 'fieldset',
						title : '抽取规则',
						collapsible : true,
						items : [{
							layout : 'column',
							border : false,
							items : [{
								columnWidth : .25,
								border : false,
								style : 'margin-left:20px',
								items : [{
									xtype : 'radio',
									anchor : '100%',
									name : 'radio',
									fieldLabel : '回收规则',
									boxLabel : '全部',
									listeners : {
										'check' : function(radio, check) {
											if (check) {
												chouquRule=0;
												Ext.get('huishoutj_CQ').dom.style.display = 'none';
											}
										}
									}
								}, {
									xtype : 'radio',
									anchor : '100%',
									name : 'radio',
									//checked : true,
									boxLabel : '按条件',
									listeners : {
										'check' : function(radio, check) {
											if (check) {
												chouquRule=1;
												Ext.get('huishoutj_CQ').dom.style.display = 'block';
											}
										}
									}
								}]

							}, {
								xtype : 'panel',
								columnWidth : .75,
								border : false,
								id : 'huishoutj_CQ',
								items : [this.gridPanel_history]
							}]
						}]
					}, {
						xtype : 'fieldset',
						title : '目标批次',
						collapsible : true,
						collapsed : true,
						items : [{
							layout : 'column',
							border : false,
							items : [{
								layout : 'form',
								columnWidth : .6,
								border : false,
								items : [{
									xtype : 'radio',
									anchor : '100%',
									name : 'piciradio',
									//checked : true,
									boxLabel : '新建批次',
									listeners : {
										'check' : function(radio, check) {
											if (check) {
												// Ext.get('xinjianpici').dom.style.display
												// = 'block';
												// Ext.get('yiyoupici').dom.style.display
												// = 'none';
												targetType=0;
												Ext.getCmp('xinjianpici_CQ')
														.setVisible(true);
												Ext.getCmp('yiyoupici_CQ')
														.setVisible(false);
											}

										}
									}
								}]
							}, {
								columnWidth : .3,
								xtype : 'radio',
								anchor : '100%',
								name : 'piciradio',
								boxLabel : '已有批次',
								listeners : {
									'check' : function(radio, check) {
										if (check) {
											targetType=1;
											// Ext.get('xinjianpici').dom.style.display
											// = 'none';
											// Ext.get('yiyoupici').dom.style.display
											// = 'block';
											Ext.getCmp('xinjianpici_CQ')
													.setVisible(false);
											Ext.getCmp('yiyoupici_CQ')
													.setVisible(true);
											Ext.getCmp('yiyoupici_CQ').doLayout();
										}

									}
								}
							}]
						}, {
							id : 'yiyoupici_CQ',
							border : false,
							style : 'padding-top:10px',
							layout : 'form',
							items : [{
								layout : 'column',
								border : false,
								items : [{
									border : false,
									columnWidth : .5,
									items : [{
										layout : 'column',
										border : false,
										items : [{
											layout : 'form',
											columnWidth : .9,
											border : false,
											items : [{
												fieldLabel : '营销项目',
												id:'obCalllistchouquyiyou.callbatchNam_CQ',
												//name : 'obCallbatch.callbatchNam',
												allowBlank : false,
												anchor : '100%',
												xtype : 'textfield',
												maxLength : 512
											}]
										}, {
											xtype : 'button',
											columnWidth : .1,
											iconCls : 'search',
											handler : function() {
												ObProjectSelector.getView(
														function(calllistId, calllistNam,
																ownerTeam) {
															Ext.getCmp('obCalllistchouquyiyou.callbatchNam_CQ').setValue(calllistNam);
															combo_obcom_form_yiyou.clearValue();
															combo_calllist_form_yiyou.clearValue();
															combo_callbatch_form_yiyou.clearValue();
															//Ext.getCmp('obCalllistHuishouh.callbatchIds').setValue(projId);	
															ObCalllistCchouquForm.getStoreCom_yiyou(calllistId);
														},null,false, false,"2").show();
											}												
										}]
									}, {
										layout : 'form',
										border : false,
										items : [combo_calllist_form_yiyou]
									}]
								}, {
									border : false,
									columnWidth : .5,
									items : [{
												layout : 'form',
												border : false,
												items : [combo_obcom_form_yiyou]
											}, {
												layout : 'form',
												border : false,
												items : [combo_callbatch_form_yiyou]
											}]
								}]
							}]
						}, {
							id : 'xinjianpici_CQ',
							border : false,
							layout : 'form',
							style : 'padding-top:10px',
							items : [{
								layout : 'column',
								border : false,
								items : [{
									columnWidth : .5,
									border : false,
									items : [{
										layout : 'column',
										border : false,
										items : [{
											layout : 'form',
											columnWidth : .9,
											border : false,
											items : [{
												name : 'calllistId',
												xtype : 'hidden',
                                                id:'calllistIdCQ'
											},{
												fieldLabel : '呼叫名单',
												id:'obcalllistCQcalllistName',
												allowBlank : false,
												anchor : '100%',
												xtype : 'textfield',
												maxLength : 512
											}]
										}, {
											xtype : 'button',
											columnWidth : .1,
											iconCls : 'search',
											handler : function() {
												ObCallNameSelector.getView(
														function(rows
																) {
															if(rows.length>0) {
																Ext.getCmp('obcalllistCQcalllistName').setValue(rows[0].get('calllistNam'));
																Ext.getCmp('calllistIdCQ').setValue(rows[0].get('calllistId'));
															}
//															combo_obcom_form.clearValue();
//															combo_calllist_form.clearValue();
//															combo_callbatch_form.clearValue();
															//ObCalllistChouquForm.getStoreCom(projId);//作用域限定：ObCalllistMFeipeiForm														
														},null).show();
											}											
										}]
									}]
								}, {
									columnWidth : .5,
									border : false,
									items : [{
												layout : 'form',
												border : false,
												items : [{
															fieldLabel : '批次名称',
															id:'callbatchNamCQ',															
															xtype : 'textfield',
															anchor : '100%'
														}]
											}]
								}]
							}, {
								name : 'obCallbatch.districtCQsheng', // 国家隐藏域
								id : 'obCallbatch.districtCQsheng',
								xtype : 'hidden'
							}, {
								name : 'obCallbatch.districtCQshi', // 省隐藏域
								id : 'obCallbatch.districtCQshi',
								xtype : 'hidden'
							}, {
								name : 'obCallbatch.districtCQqu', // 市隐藏域
								id : 'obCallbatch.districtCQqu',
								xtype : 'hidden'
							}
//							, {
//								name : 'obCallbatch.districtDiqu', // 地区隐藏域
//								id : 'obCallbatch.districtDiqu',
//								xtype : 'hidden'
//							}
							, {
								layout : 'column',
								xtype : 'container',
								defaults : {
									border : false
								},
								items : [{
									columnWidth : .4,
									layout : "form",
									items : [{
										fieldLabel : '所属地区', // 国家
										// name : 'ulEmployee.gongzuodiGuojia',
										id : 'obCallbatch.districtCQsheng_combo',
										// hiddenName :
										// 'ulEmployee.gongzuodiGuojia',
										xtype : 'combo',
										lazyInit : false,
										allowBlank : true,
										anchor : '100%',
										mode : 'local',
										editable : false,
										triggerAction : 'all',
										store :  AppUtil.address2.getStore_region(0, 'obCallbatch.districtCQ',
							            	this.district),
										displayField : 'regionName',
										valueField : 'regionName',
										listeners : AppUtil.address2.getListeners_region(0,
								      'obCallbatch.districtCQ')
									}]
								}, {
									columnWidth : .2,
									layout : "form",
									items : [{
												// name :
												// 'ulEmployee.gongzuodiSheng',
												// // 省
												id : 'obCallbatch.districtCQshi_combo',
												// hiddenName :
												// 'ulEmployee.gongzuodiSheng',
												xtype : 'combo',
												lazyInit : false,
												hideLabel : true,
												allowBlank : true,
												mode : 'local',
												anchor : '100%',
												editable : false,
												triggerAction : 'all',
												store :  AppUtil.address2.getStore_region(1, 'obCallbatch.districtCQ',
								                     this.district),
												displayField : 'regionName',
												valueField : 'regionName',
												listeners : AppUtil.address2.getListeners_region(1,
								                    'obCallbatch.districtCQ')
											}]
								}, {
									columnWidth : .2,
									layout : "form",
									items : [{
												// name :
												// 'ulEmployee.gongzuodiShi', //
												// 市
												id : 'obCallbatch.districtCQqu_combo',
												// hiddenName :
												// 'ulEmployee.gongzuodiShi',
												xtype : 'combo',
												lazyInit : false,
												mode : 'local',
												hideLabel : true,
												anchor : '100%',
												editable : false,
												allowBlank : true,
												triggerAction : 'all',
												store : AppUtil.address2.getStore_region(2, 'obCallbatch.districtCQ',
								                   this.district),
												displayField : 'regionName',
												valueField : 'regionName'
//												listeners : getListeners_region(2,
//								                     'obCallbatch.district')

											}]
								}
//								, {
//									columnWidth : .2,
//									layout : "form",
//									items : [{
//												// name :
//												// 'ulEmployee.gongzuodiDiqu',
//												id : 'obCallbatch.districtDiqu_combo_CQ',
//												// hiddenName :
//												// 'ulEmployee.gongzuodiDiqu',
//												xtype : 'combo',
//												mode : 'local',
//												anchor : '100%',
//												allowBlank : true,
//												hideLabel : true,
//												editable : false,
//												triggerAction : 'all',
//												store :getStore_region(3, 'obCallbatch.district',
//								                    this.district),
//												displayField : 'regionName',
//												valueField : 'regionName',
//												listeners : getListeners_region(3,
//								'obCallbatch.district')
//											}]
//								}
								]
							}, {
								fieldLabel : '备注',
								id:'remarkCQ',
								xtype : 'textarea',
								anchor : '100%'
							}]
						}]
					}]
		});

		Ext.getCmp('yiyoupici_CQ').setVisible(false);
		fromCallbatchId=this.callbatchId;
		// 加载表单对应的数据
		if (this.callbatchId != null&& this.callbatchId != 'undefined') {
//		    if(Ext.getCmp('JLHoldCount').getValue()==0) {
//		   	    Ext.getCmp("assignJL_button").setVisible(false);
//		    }
			this.formPanel.loadData({
						url : __ctxPath
								+ '/outb/getObCallbatch.do?callbatchId='
								+ this.callbatchId,
						root : 'data',
						preName : 'obCallbatch',
						success : function(response, options) {
//						    if(Ext.getCmp('JLHoldCount').getValue()==0) {
//						   	    Ext.getCmp("assignJL_button").setVisible(false);
//						    }
						},
						failure : function(response, options) {
							Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
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
		var tabs = Ext.getCmp('centerTabPanel');// 获得tab
		tabs.remove('ObCalllistCchouquFormWin');// 移除创建的窗口
	},
	/**
	 * 保存记录
	 */
    chouqu : function() {
        if(chouquRule==null) {
		    Ext.ux.Toast.msg('操作提示','请先选择回收规则!');
	        return;	
		} 
        if(targetType==null) {
		    Ext.ux.Toast.msg('操作提示','请先选择目标批次!');
	        return;	
		}   		
		if(targetType==0) {
		     var calllistId=Ext.getCmp('obcalllistCQcalllistName').getValue();
		     if(calllistId==''||calllistId==null||calllistId=='undefined') {
		         Ext.ux.Toast.msg('操作提示','请选择新建批次呼叫名单!');
		     }
		     var callbatchNamChouqu=Ext.getCmp('callbatchNamCQ').getValue();
		     if(callbatchNamChouqu==''||callbatchNamChouqu==null||callbatchNamChouqu=='undefined') {
		         Ext.ux.Toast.msg('操作提示','请填写新建批次名称!');
		     }		     
		}    	
		if(targetType==1) {
		     var callbatchNam=Ext.getCmp('combo_callbatch_Id_chouquproj_yiyou_CQ').getValue();
		     if(callbatchNam==''||callbatchNam==null||callbatchNam=='undefined') {
		         Ext.ux.Toast.msg('操作提示','请选择已有批次!');
		     }
		}		
    	
		var guojia = Ext.getCmp('obCallbatch.districtCQsheng_combo')
				.getValue();
		if (guojia == '请选择')
			guojia = '';
		var sheng = Ext.getCmp('obCallbatch.districtCQshi_combo')
				.getValue();
		if (sheng == '请选择')
			sheng = '';
		var shi = Ext.getCmp('obCallbatch.districtCQqu_combo')
				.getValue();
		if (shi == '请选择')
			shi = '';
//		var diqu = Ext.getCmp('obCallbatch.districtDiqu_combo_CQ')
//				.getValue();
//		if (diqu == '请选择')
//			diqu = '';
		var district = guojia + sheng + shi;    	
		
        assignIFGrid = '';	
		var store = this.gridPanel_history.getStore();
		for(var i=0; i<store.getCount(); i++) {
			var record = store.getAt(i);
			var assignFiled = record.data.assignFiled;
			var assignIf = record.data.assignIf;
			var assignVal = record.data.assignValue;
			if(assignIf!='' && assignIf!=undefined) {
			if(assignVal!='为空') {
			    if(assignVal==undefined || assignVal=='') {
					Ext.ux.Toast.msg('提示信息', '请填写条件值!');
					return;
			    }
			} else {
				if(assignVal==undefined || assignVal=='')  {
				    assignVal = ' ';
				}
			}
				assignIFGrid = assignIFGrid + assignFiled + ',';
				assignIFGrid = assignIFGrid + assignIf + ',';
				assignIFGrid = assignIFGrid + assignVal + ';';
			}
		}	
	   var myMask = new Ext.LoadMask(Ext.getBody(), {
	                        msg: '正在抽取，请稍后...',
	                        removeMask: true //完成后移除
	                    });
	                myMask.show();			
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/doChouquObCalllist.do',
			method : 'post',
		    params:{
			    targetTypeFlag:targetType,
			    fromCallbatchId:fromCallbatchId,
			    calllistId:Ext.getCmp('calllistIdCQ').getValue(),
			    callbatchNam:Ext.getCmp('callbatchNamCQ').getValue(),
			    district:district,
			    remark:Ext.getCmp('remarkCQ').getValue(),
			    callbatchIdYiYou:callbatchIdYiYou,
			    assignIFGrid:assignIFGrid
			    
			},
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success) {
				    Ext.getCmp("button_CQ").setVisible(false);
                    // Ext.getCmp('ObCallbatchGrid').getStore().reload();
                    
				    Ext.ux.Toast.msg('提示信息', '抽取成功!');
				    myMask.hide();
					var gridPanel = Ext.getCmp('ObCallbatchGrid');
					if (gridPanel != null) {
						gridPanel.getStore().reload();
					}
					var tabs = Ext.getCmp('centerTabPanel');
					tabs.remove('ObCalllistCchouquFormWin');	                    
				}
			},
			failure : function() {
				myMask.hide();
				Ext.ux.Toast.msg('提示信息', '抽取失败!');
			}
		});		
    	
//		$postSubForm({
//					formPanel : Ext.getCmp('formChouqu'),
//					params : {
//                          targetTypeFlag:targetType,
//                          fromCallbatchId:fromCallbatchId
//				    },
//					scope : this,
//					url : __ctxPath + '/outb/doChouquObCalllist.do',
//					msgSuccess : '成功抽取！',
//					msgFailure : '操作出错，请联系管理员！',
//					callback : function(fp, action) {
//						alert('ff');
////						var gridPanel = Ext.getCmp('ObCallbatchGrid');
////						if (gridPanel != null) {
////							gridPanel.getStore().reload();
////						}
////						this.close();
//					}
//				});
	}// end of save

});
ObCalllistCchouquForm.getStoreCom_yiyou = function(projId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObComObCallbatchAss.do?projId='+projId+'&flag=2',
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_obcom_Id_chouquproj_yiyou_CQ").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

ObCalllistCchouquForm.getStoreCallist_yiyou = function(comId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObCalllistObCallbatchAss.do?comId='+comId+'&flag=2',
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_obcalllist_Id_chouquproj_yiyou_CQ").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

ObCalllistCchouquForm.getStoreCallbatch_yiyou = function(calllistId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObCallbatchObCallbatchAss.do?calllistId='+calllistId+'&flag=2',
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_callbatch_Id_chouquproj_yiyou_CQ").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

/*
 ObCalllistCchouquForm.regionList = ['Guojia', 'Sheng', 'Shi', 'Diqu'];

function getStore_region(flag, idText, parentList) {
	if (parentList == null || parentList == undefined)
		if (flag != 0) {
			return new Ext.data.SimpleStore({
						fields : ['regionId', 'regionName']
					});
		} else {
			parentList = [0];
		}
	return new Ext.data.SimpleStore({
				autoLoad : true,
				url : __ctxPath + '/system/listDetailRegion.do?regionId='
						+ parentList[flag],
				fields : ['regionId', 'regionName'],
				listeners : {
					load : function() { // 加载数据
						Ext.getCmp(idText
								+ObCalllistCchouquForm.regionList[flag]
								+ '_combo_CQ').setValue(Ext.getCmp(idText
								+ObCalllistCchouquForm.regionList[flag])
								.getValue());
					}
				}
			})
}

function getListeners_region(flag, idText) {
	return {
		select : function(combo, record, index) {
			if (flag <ObCalllistCchouquForm.regionList.length - 1) {
				var next = Ext.getCmp(idText
						+ObCalllistCchouquForm.regionList[flag + 1] + '_combo_CQ')
				next.clearValue();
				var nextStore = next.getStore();
				Ext.Ajax.request({
							url : __ctxPath + '/system/listDetailRegion.do',
							params : {
								regionId : record.data['regionId']
							},
							method : 'post',
							success : function(response) {
								var result = Ext.util.JSON
										.decode(response.responseText)
								nextStore.loadData(result);
								next.setValue('请选择');
							}
						});
			}
			// 给隐藏域赋值
			Ext.getCmp(idText +ObCalllistCchouquForm.regionList[flag])
					.setValue(record.get('regionId'));
		}
	}
}
*/