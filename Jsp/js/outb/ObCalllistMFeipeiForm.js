/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCalllistMFeipeiForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
var assignRuleType=null;
var val = 0;// 分配数量/比例
var assVal=0;//可分配数量
ObCalllistMFeipeiForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObCalllistMFeipeiForm.superclass.constructor.call(this, {
					id : 'ObCalllistMFeipeiFormWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '管理员名单分配',
					buttonAlign : 'center',
					buttons : [{
								text : '分配',
								iconCls : 'btn-save',
                                id:'assign_button',
								scope : this,
								handler : this.assign
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
		var combo_obcom_form = new Ext.form.ComboBox({
				xtype : 'combo',
				editable : false,
				mode : 'local',
				id:'combo_obcom_Id',
				fieldLabel : '营销活动',
				allowBlank : false,
				anchor : '100%',
				valueField:'comId',//设置隐藏的value值字段
				displayField:'comName',//设置显示的value值字段
				triggerAction : 'all',
				store:new Ext.data.SimpleStore({//new一个SimpleStore
					fields:['comId','comName'],	//设定键/值
					data:[]					//默认的data必须提供
				}),
				listeners : {
					'select' : function(combo, record,index) {
						var comIdVal = combo_obcom_form.getValue();
						combo_calllist_form.clearValue();
						combo_callbatch_form.clearValue();
						ObCalllistMFeipeiForm.getStoreCallist(comIdVal);
					}
				}
		});
		var combo_calllist_form = new Ext.form.ComboBox({
				xtype : 'combo',
				mode : 'local',
				editable : false,
				id : 'combo_obcalllist_Id',
				fieldLabel : '呼叫名单',
				allowBlank : false,
				anchor : '100%',
				valueField:'calllistId',//设置隐藏的value值字段
				displayField:'calllistName',//设置显示的value值字段
				triggerAction : 'all',
				store:new Ext.data.SimpleStore({//new一个SimpleStore
					fields:['calllistId','calllistName'],	//设定键/值
					data:[]					//默认的data必须提供
				}),
				listeners : {
					'select' : function(combo, record,index) {
						var calllistIdVal = combo_calllist_form.getValue();
						combo_callbatch_form.clearValue();
						ObCalllistMFeipeiForm.getStoreCallbatch(calllistIdVal);
					}
				}
		});
		var combo_callbatch_form = new Ext.form.ComboBox({
				xtype : 'combo',
				mode : 'local',
				id : 'combo_callbatch_Id',
				fieldLabel : '批次',
				editable : false,
				allowBlank : false,
				anchor : '100%',
				valueField:'callbatchId',//设置隐藏的value值字段
				displayField:'callbatchName',//设置显示的value值字段
				triggerAction : 'all',
				store:new Ext.data.SimpleStore({//new一个SimpleStore
					fields:['callbatchId','callbatchName'],	//设定键/值
					data:[]					//默认的data必须提供
				})
			});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px;overflow-y:auto',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			// id : 'ObCalllistMFeipeiForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
						xtype : 'hidden',
						id : 'obCallbatch.callbatchIds'
					}, {
						layout : 'column',
						border : false,
						anchor : '96%',
						items : [{
									xtype : 'panel',
									layout : 'form',
									columnWidth : .94,
									border : false,
									items : [{
												fieldLabel : '营销项目',
												allowBlank : false,
												readOnly:true,
												xtype : 'textfield',
												name : 'obCallbatch.callbatchNam',
												id : 'obCallbatch.callbatchNam',
												anchor : '100%'
											}]
								}, {
									xtype : 'button',
									columnWidth : .06,
									iconCls : 'btn-search',
									handler : function() {
										ObProjectSelector
												.getView(
														function(projId,
																projNam,
																perIncharge,
																ownerTeam) {
															Ext.getCmp('obCallbatch.callbatchNam').setValue(projNam);
															Ext.getCmp('obCallbatch.callbatchIds').setValue(projId);
															combo_obcom_form.clearValue();
															combo_calllist_form.clearValue();
															combo_callbatch_form.clearValue();
															ObCalllistMFeipeiForm.getStoreCom(projId);//作用域限定：ObCalllistMFeipeiForm
														},null,false, false,"1").show();
									}
								}]
					}, {
						layout : 'form',
						border : false,
						items : [combo_obcom_form]
					}, {
						layout : 'column',
						border : false,
						items : [{
									border : false,
									columnWidth : .45,
									items : [{
												layout : 'form',
												border : false,
												items : [combo_calllist_form]
											}]
								}, {
									border : false,
									columnWidth : .45,
									items : [{
												layout : 'form',
												border : false,
												items : [combo_callbatch_form]
											}]
								}, {
									columnWidth : .1,
									border : false,
									style : 'margin-left:20px',
									items : [{
												text : '确定',
												xtype : 'button',
												width : 60,
												iconCls : 'btn-search',
												handler : function() {
													var callbatchId=Ext.getCmp('combo_callbatch_Id').getValue();
													ObCalllistMFeipeiForm.viewPatch(callbatchId);
													Ext.getCmp('obcalllistMform_kefenpei').getStore().baseParams['comId'] = Ext.getCmp('combo_obcom_Id').getValue();
													Ext.getCmp('obcalllistMform_kefenpei').getStore().load();
												}
											}]
								}]
					}]
		});
		this.gridPanel_history = new HT.EditorGridPanel({
			region : 'center',
			id : 'gridPanel_history_M',
			scrollHeight : true,
			checkOnlySm:true,
			showPaging:false,
			height : 150,
			tbar : ['->', {
						iconCls : 'btn-add',
						text : '增加',
						handler : function() {
							var store = Ext.getCmp('gridPanel_history_M')
									.getStore();
							var recordType = store.recordType;
							store.add(new recordType({})); // 添加一行空store
						}
					}, {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = Ext.getCmp('gridPanel_history_M')
									.getStore();
							var sm = Ext.getCmp('gridPanel_history_M')
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
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '条件',
						dataIndex : 'assignFiled',
						editor : new Ext.form.ComboBox({
									mode : 'local',
									editable : false,
									triggerAction : 'all',
									store : [['姓名', '姓名'],['客户编号', '客户编号'], ['性别', '性别'], ['生日', '生日'], ['证件类型', '证件类型'], ['证件号码', '证件号码']
									                ]
								})
					}, {
						header : '关系',
						dataIndex : 'assignIf',
						editor : new Ext.form.ComboBox({
									mode : 'local',
									editable : false,
									id : 'OB_CalllistMF_Grid_assignIf_01',
									triggerAction : 'all',
									store : [['为空', '为空'], ['长度小于', '长度小于'],
										['包含', '包含'], ['等于', '等于'],
										['不等于', '不等于']]
								})
					}, {
						header : '值',
						dataIndex : 'assignVal',
						editor : new Ext.form.TextField({
                                
						})
						,
						renderer: function(value,cls,record) {
							 if(value){
							     if(record.data.assignFiled == '生日') {
							       return value?value.format('Y-m-d'):'';
							     }else{
							     	if(record.data.assignIf=='长度小于') {
							     		var re=/^[0-9]*[1-9][0-9]*$/;
							     		if(re.test(value)) {
							     			return value;
							     		}else {
											   Ext.ux.Toast.msg('操作信息', '请输入正整数！');	
											   record.data.assignVal='';
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
								format:'Y-m-d'
							});
						}else if(record.data.assignFiled == '会员区域') {
						    grid.getColumnModel().config[4].editor = new MT.DicComboBox(
						        
						    );
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
							Ext.getCmp("OB_CalllistMF_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '证件类型'){
							Ext.getCmp("OB_CalllistMF_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '生日'){
							Ext.getCmp("OB_CalllistMF_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],['小于','小于'],
										['不等于','不等于'],['大于','大于']]);
						}else if(record.data.assignFiled == '客户级别'){
							Ext.getCmp("OB_CalllistMF_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						} else {
							Ext.getCmp("OB_CalllistMF_Grid_assignIf_01").getStore().loadData([
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
			height : 150,
			scrollHeight : true,
			showPaging:false,
			id:'obcalllistMform_kefenpei',
			clicksToEdit : 1,
			checkOnlySm:true,
			lazyLoad:true,
			url : __ctxPath + "/outb/listManagersObCallbatchAss.do?type=0",
			fields : [{
						name : 'userId',
						type : 'int'
					}, 'fullname', 'employeeid','depName'],
			columns : [{
						header : '名称',
						dataIndex : 'fullname'
					}, {
						header : '工号',
						dataIndex : 'employeeid'
					}, {
						header : '机构',
						dataIndex : 'depName'
					}, {
						header : '分配比例/数量<font style="color:red">*</font>',
						dataIndex : 'contactType3',
						id:'assignTotalCount',
						editor : new Ext.form.NumberField({
                            //allowDecimals:false,
                            //allowNegative:false
                            //decimalPrecision:0 
							allowDecimals:false,
							allowNegative: false,
							regex : /^[0-9]*[1-9][0-9]*$/							
						}),
						renderer : function(value, cls, record) {
							var re = /^[0-9]*[1-9][0-9]*$/;
							var holdVal = Ext.getCmp('holdTotalCount').getValue();
							if (re.test(value)) {
								if (assignRuleType == 0) {
									if (holdVal * 1 + val * 1 * holdVal / 100
											- value * 1 * holdVal / 100 < 0) {
										Ext.ux.Toast.msg('操作信息', '可分配数量不足！');
										// Ext.getCmp('assignTotalCountZZ').setValue(assVal*1-Ext.getCmp('ZZHoldCount').getValue()*1);
										record.data.contactType3 = val;
										return val;
									} else {
										Ext.getCmp('holdTotalCount')
												.setValue(holdVal * 1 + val * 1
														* holdVal / 100 - value
														* 1 * holdVal / 100);
										Ext
												.getCmp('assignTotalCount')
												.setValue(assVal
														* 1
														- Ext
																.getCmp('holdTotalCount')
																.getValue() * 1);
										return value;
									}
								}
								if (assignRuleType == 1) {
									if (holdVal * 1 + val * 1 - value * 1 < 0) {
										Ext.ux.Toast.msg('操作信息', '可分配数量不足！');
										// Ext.getCmp('assignTotalCountZZ').setValue(assVal*1-Ext.getCmp('ZZHoldCount').getValue()*1);
										record.data.contactType3 = val;
										return val;
									} else {
										Ext.getCmp('holdTotalCount')
												.setValue(holdVal * 1 + val * 1
														- value * 1);
										Ext
												.getCmp('assignTotalCount')
												.setValue(assVal
														* 1
														- Ext
																.getCmp('holdTotalCount')
																.getValue() * 1);
										return value;
									}
								}

							}
						}						
					}],
			listeners : {
				'cellclick' : function(grid, rowIndex, columnIndex, e) {
					val = 0;
					if (columnIndex == 5) {
						var record = grid.getStore().getAt(rowIndex);
						if (record.data.contactType3) {
							val = record.data.contactType3;
						}
					}
				}
			}					
				// end of columns
			});

		this.panel = new Ext.Panel({
			layout : 'form',
			bodyStyle : 'padding:10px;overflow-y:auto',
			border : false,
			items : [{
						xtype : 'fieldset',
						collapsible : true,
						title : '呼叫名单信息',
						items : [this.formPanel]
					}, {
						xtype : 'fieldset',
						title : '分配设置',
						collapsible : true,
						layout : 'form',
						labelAlign : 'right',
						items : [{
							layout : 'column',
							border : false,
							items : [{
								columnWidth : .25,
								style : 'margin-right:10px',
								border : true,
								items : [{
									xtype : 'radio',
									style : 'margin-left:70px;margin-top:10px',
									anchor : '100%',
									boxLabel : '按比例分配',
									name : 'feipeiradio',
									listeners : {
										'check' : function(radio, check) {
											if (check) {
												assignRuleType=0;
												Ext.get('fenpei').dom.style.display = 'block';
											}
										}
									}
								}, {
									columnWidth : .3,
									xtype : 'radio',
									style : 'margin-left:70px;margin-top:10px',
									anchor : '100%',
									boxLabel : '指定数量分配',
									name : 'feipeiradio',
									checked:'true',
									listeners : {
										'check' : function(radio, check) {
											if (check) {
												assignRuleType=1;
												Ext.get('fenpei').dom.style.display = 'block';
											}
										}
									}
								}, {
									columnWidth : .3,
									xtype : 'radio',
									style : 'margin-left:70px;margin-top:10px',
									anchor : '100%',
									boxLabel : '按负责人',
									name : 'feipeiradio',
									listeners : {
										'check' : function(radio, check) {
											if (check) {
												assignRuleType=2;
												Ext.get('fenpei').dom.style.display = 'none';
											}
										}
									}
								}, {
									layout : 'form',
									labelWidth : 70,
									style : 'margin-top:10px',
									border : false,
									items : [{
												xtype : 'textfield',
												id:'holdTotalCount',
												fieldLabel : '可分配数量',
												readOnly : true,
												anchor : '80%'
											}]
								}, {
									layout : 'form',
									labelWidth : 70,
									border : false,
									style : 'margin-bottom:7px;margin-top:10px',
									items : [{
												xtype : 'numberfield',
												allowBlank : false,
												allowDecimals:false,
												allowNegative: false,
												regex : /^[0-9]*[1-9][0-9]*$/,   
												fieldLabel : '分配数量',
												id:'assignTotalCount',
												name:'assignTotalCount',
												anchor : '80%',
												enableKeyEvents:true,
												listeners:{
//													'keyup':function(text,event){
//														var value = text.getValue();debugger;
//														if(value.toSting().indexOf('.') !=-1){
//															text.setValue (value.substr(0,value.length-1))
//														
//														}
//													}
												}
											}]
								}]
							}, {
								xtype : 'panel',
								columnWidth : .75,
								border : false,
								layout : 'fit',
								items : [this.gridPanel_history]
							}]
						}]
					}, {
						xtype : 'fieldset',
						collapsible : true,
						collapsed : false,
						id : 'fenpei',
						title : '可分配人',
						items : [this.gridPanel]
					}]
		})

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
		tabs.remove('ObCalllistMFeipeiFormWin');// 移除创建的窗口
	},
	/**
	 * 分配
	 */
	assign : function() {
		var callbatchId=Ext.getCmp('combo_callbatch_Id').getValue();
		var countArray=new Array();
		var idArray=new Array();
		var rows = this.gridPanel.getSelectionModel().getSelections();
	    if(assignRuleType==null) {
		    Ext.ux.Toast.msg('操作提示','请先选择分配规则!');
	        return;	
		}
		var assignTotalCount=Ext.getCmp('assignTotalCount').getValue();
 		var re=/^[0-9]*[1-9][0-9]*$/;
 		if(!re.test(assignTotalCount)) {
		    Ext.ux.Toast.msg('操作信息', '分配数量格式不正确！');	
            return;
		    }			
		var holdTotalCount=Ext.getCmp('holdTotalCount').getValue();
		if(!assignTotalCount || assignTotalCount==0){
			Ext.ux.Toast.msg('操作提示','分配数量不能为空或0!');
			return;
		}
		if(0+assignTotalCount>holdTotalCount){
			Ext.ux.Toast.msg('操作提示','分配数量不能大于可分配数量!');
			return;
		}	
		if(assignRuleType!=2) {
			var perCount=0;
	        if (rows != null && rows.length > 0) {
	        	  for (var i = 0; i < rows.length; i++) {
	        	  	  var count=rows[i].data.contactType3;
	        	  	  var userId=rows[i].data.userId;
	        	  	  if(count==undefined) {
	        	  	  	   Ext.ux.Toast.msg('操作提示','请正确填写所选分配人的分配比例或数量!');
	        	  	  	   return;
	        	  	  }
	        	  	  idArray.push(userId);
	        	  	  countArray.push(count);
	        	  	  perCount+=count;
	        	  }
	        	  if(assignRuleType==0) {
	        	  	  if(perCount>100) {
	        	  	  	   Ext.ux.Toast.msg('操作提示','分配比例之和过大!');
	        	  	  	   return;	        	  	  
	        	  	  }
	        	  }
	        	  if(assignRuleType==1) {
	        	  	  if(perCount> (0+assignTotalCount)) {
	        	  	  	   Ext.ux.Toast.msg('操作提示','可分配人的分配数量之和过大!');
	        	  	  	   return;	        	  	  
	        	  	  }
	        	  }
	        	  
	        } else {
	        	Ext.ux.Toast.msg('操作提示','请至少选择一个可分配人!');
	        	return;
	        }
			
		}
		

        assignIFGrid = '';	
		var store = this.gridPanel_history.getStore();
		for(var i=0; i<store.getCount(); i++) {
			var record = store.getAt(i);
			var assignFiled = record.data.assignFiled;
			var assignIf = record.data.assignIf;
			var assignVal = record.data.assignVal;
		    if(record.data.assignFiled == '生日') {
		          assignVal= assignVal.format('Y-m-d');
		    }
			if(assignIf!='' && assignIf!=undefined) {
//				if(assignVal==undefined || assignVal=='') {
//					assignVal = ' ';
//				}
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
		//Ext.getCmp("assign_button").disable(); 
	   var myMask = new Ext.LoadMask(Ext.getBody(), {
	                        msg: '正在分配，请稍后...',
	                        removeMask: true //完成后移除
	                    });
	                myMask.show();		
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/doNewAssignCallbatchObCallbatchAss.do',
			method : 'post',
		    params:{
				ids:idArray,
				counts:countArray,
				assignIFGrid:assignIFGrid,
				assignRuleType:assignRuleType,
				assignTotalCount:assignTotalCount,
				callbatchId:callbatchId
			},
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success) {
				    Ext.getCmp("assign_button").setVisible(false);
				    Ext.ux.Toast.msg('操作信息', '分配成功！');
				    
					myMask.hide();
					var gridPanel = Ext.getCmp('ObCallbatchAssGridM');
					if (gridPanel != null) {
						gridPanel.getStore().reload();
					}
					var tabs = Ext.getCmp('centerTabPanel');
					tabs.remove('ObCalllistMFeipeiFormWin');
				}
			},
			failure : function() {
				    myMask.hide();
				    Ext.ux.Toast.msg('操作信息', '分配失败！');
			}
		});			
//		$postSubForm({
//					scope : this,
//					url : __ctxPath + '/outb/doNewAssignCallbatchObCallbatchAss.do',
//					params:{
//						ids:idArray,
//						counts:countArray
//					},
//					msgSuccess : '分配成功！',
//					//msgFailure : '操作出错，请联系管理员！',
//					callback : function(fp, action) {
//						alert('13');
////						var gridPanel = Ext.getCmp('ObCallbatchGrid');
////						if (gridPanel != null) {
////							gridPanel.getStore().reload();
////						}
////						this.close();
//					}
//				});
	}// end of assign
	
	
});
ObCalllistMFeipeiForm.getStoreCom = function(projId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObComObCallbatchAss.do?projId='+projId+'&flag=1',//??????????????????
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_obcom_Id").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

ObCalllistMFeipeiForm.getStoreCallist = function(comId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObCalllistObCallbatchAss.do?comId='+comId+'&flag=1',
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_obcalllist_Id").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

ObCalllistMFeipeiForm.getStoreCallbatch = function(calllistId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObCallbatchObCallbatchAss.do?calllistId='+calllistId+'&flag=1',
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_callbatch_Id").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

ObCalllistMFeipeiForm.viewPatch= function(callbatchId) {
	    var project=Ext.getCmp('obCallbatch.callbatchNam').getValue();
	    var com=Ext.getCmp('combo_obcom_Id').getValue();
	    var calllist=Ext.getCmp('combo_obcalllist_Id').getValue();
	    var callbatch=Ext.getCmp('combo_callbatch_Id').getValue();
	    if(project==null||project==''||com==null||com==''||calllist==null||calllist==''||callbatch==null||callbatch==''){
	    	Ext.ux.Toast.msg('操作提示','请完成必填项!');
	    	return;
	    } else {
			Ext.Ajax.request({
				url :  __ctxPath + '/outb/listNewAssignCallbatchObCallbatchAss.do?callbatchId='+callbatchId,
				method : 'post',
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);//解析数据
					Ext.getCmp("holdTotalCount").setValue(result.holdTotalCount);//获取组件，加载数据
					assVal=result.holdTotalCount;
				},
				failure : function() {
				}
			});	
	    }
	    
}