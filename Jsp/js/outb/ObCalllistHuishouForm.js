/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCalllistHuishouForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
 var batchId=null;
 var retriveRuleType=null;
 var assIds="";
ObCalllistHuishouForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObCalllistHuishouForm.superclass.constructor.call(this, {
					id : 'ObCalllistHuishouFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '名单回收',
					buttonAlign : 'center',
					buttons : [{
								text : '回收',
								iconCls : 'btn-save',
								id:'retrive_button_huishou',
								scope : this,
								handler : this.retrive
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
				id:'combo_obcom_Id_huishou',
				fieldLabel : '营销活动',
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
						ObCalllistHuishouForm.getStoreCallist(comIdVal);
				    	var store = Ext.getCmp('gridPanelHuishou').getStore(); 
				    	store.baseParams = {
				    		comId:comIdVal
				    	};
				    	store.reload();
				    	var url=__ctxPath + '/outb/listAssIdsByCallbatchObCallbatchAss.do?comId='+comIdVal;
				    	ObCalllistHuishouForm.listAssIdsByCallbatchId(url);				    	
					}
				}
		});	
		
		var combo_calllist_form = new Ext.form.ComboBox({
				xtype : 'combo',
				editable : false,
				mode : 'local',
				id : 'combo_obcalllist_Id_huishou',
				fieldLabel : '呼叫名单',
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
						ObCalllistHuishouForm.getStoreCallbatch(calllistIdVal);
				    	var store = Ext.getCmp('gridPanelHuishou').getStore(); 
				    	store.baseParams = {
				    		calllistId:calllistIdVal
				    	};
				    	store.reload();	
				    	var url=__ctxPath + '/outb/listAssIdsByCallbatchObCallbatchAss.do?calllistId='+calllistIdVal;
				    	ObCalllistHuishouForm.listAssIdsByCallbatchId(url);					    	
					}
				}
		});		
		
		var combo_callbatch_form = new Ext.form.ComboBox({
				xtype : 'combo',
				editable : false,
				mode : 'local',
				id : 'combo_callbatch_Id_huishou',
				fieldLabel : '批次',
				anchor : '100%',
				valueField:'callbatchId',//设置隐藏的value值字段
				displayField:'callbatchName',//设置显示的value值字段
				triggerAction : 'all',
				store:new Ext.data.SimpleStore({//new一个SimpleStore
					fields:['callbatchId','callbatchName'],	//设定键/值
					data:[]					//默认的data必须提供
				}),
				listeners:{
				    'select':function(combo,record,index) {
				    	var store = Ext.getCmp('gridPanelHuishou').getStore();
				    	store.baseParams = {
				    		callbatchId:record.data.callbatchId
				    	};
				    	store.reload();
				    	batchId=record.data.callbatchId;
				    	var url=__ctxPath + '/outb/listAssIdsByCallbatchObCallbatchAss.do?callbatchId='+batchId;
				    	ObCalllistHuishouForm.listAssIdsByCallbatchId(url);
				    }
				}
			});		
			
		this.gridPanel_history = new HT.EditorGridPanel({
			region : 'center',
			id : 'gridPanelHuishou_history',
			scrollHeight : true,
			checkOnlySm:true,
			clicksToEdit : 1,
			showPaging:false,
			height : 150,
			tbar : ['->', {
						iconCls : 'btn-add',
						text : '增加',
						handler : function() {
							var store = Ext.getCmp('gridPanelHuishou_history')
									.getStore();
							var recordType = store.recordType;
							store.add(new recordType({})); // 添加一行空store
						}
					}, {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = Ext.getCmp('gridPanelHuishou_history')
									.getStore();
							var sm = Ext.getCmp('gridPanelHuishou_history')
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
									        ['会员区域', '会员区域'], ['年收入', '年收入'],['积分', '积分'], ['礼金', '礼金']
									        , ['购物频次', '购物频次'], ['上次购物金额', '上次购物金额'], ['拒收比率', '拒收比率']
									        , ['退换货比率', '退换货比率'], ['拨打次数', '拨打次数']]
								})
					}, {
						header : '关系',
						dataIndex : 'assignIf',
						editor : new Ext.form.ComboBox({
							        id : 'OB_CalllistHuishou_Grid_assignIf_01',
									mode : 'local',
									editable : false,
									triggerAction : 'all',
									store :[['为空', '为空'], ['长度小于', '长度小于'],
										['包含', '包含'], ['等于', '等于'],
										['不等于', '不等于']]
								})
					}, {
						header : '值',
						dataIndex : 'assignValue',
						id:'assignNameHuishou',	
						editor : new Ext.form.TextField({

						}),
						renderer:function(value,cls,record){
							if(value){
								if(record.data.assignFiled == '会员区域'){
									record.data.assignValue = value.split(';')[0].replace('-','@');
									return value.split(';')[1].replace('-','');
								}else if((record.data.assignFiled == '购物频次'||record.data.assignFiled == '积分'||record.data.assignFiled == '拨打次数')) {
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
						if(Ext.getCmp('gridPanelHuishou_history').getColumnModel().getColumnById('assignNameHuishou').getEditor()) {
						   Ext.getCmp('gridPanelHuishou_history').getColumnModel().getColumnById('assignNameHuishou').getEditor().destroy();
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
							Ext.getCmp("OB_CalllistHuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '证件类型'){
							Ext.getCmp("OB_CalllistHuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '生日'||record.data.assignFiled == '年收入'||record.data.assignFiled == '积分'||record.data.assignFiled == '礼金'
						    ||record.data.assignFiled == '购物频次'||record.data.assignFiled == '上次购物金额'||record.data.assignFiled == '拒收比率'||record.data.assignFiled == '退换货比率'
						    ||record.data.assignFiled == '拨打次数'){
							Ext.getCmp("OB_CalllistHuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],['小于','小于'],
										['不等于','不等于'],['大于','大于']]);
						}else if(record.data.assignFiled == '客户级别'){
							Ext.getCmp("OB_CalllistHuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '会员区域'){
							Ext.getCmp("OB_CalllistHuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						} else {
							Ext.getCmp("OB_CalllistHuishou_Grid_assignIf_01").getStore().loadData([
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
			id:'gridPanelHuishou',
			region : 'center',
			scrollHeight : true,
			lazyLoad : true,
			height : 250,
			clicksToEdit : 1,
			checkOnlySm:true,
			url : __ctxPath + "/outb/listAssByCallbatchIdObCallbatchAss.do",
			//url : __ctxPath + "/outb/listAssByCallbatchIdObCallbatchAss.do?callbatchId="+423,
			fields : [{
						name : 'callbatchAssId',
						type : 'long'
					}, 'toUserName', 'toUserNo','holdCount','canReceiveCount'],
			columns : [{
						header : '名称',
						dataIndex : 'toUserName'
					}, {
						header : '工号',
						dataIndex : 'toUserNo'
					}, {
						header : '可回收名单数',
						dataIndex : 'canReceiveCount'
					}, {
						header : '回收数量',
						dataIndex : 'contactType3',
						editor : new Ext.form.TextField({
							allowDecimals:false,
							allowNegative: false,
							regex : /^[0-9]*[1-9][0-9]*$/	
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
						xtype : 'hidden',
						id : 'obCalllistHuishouh.callbatchIds'
					},{
				xtype : 'fieldset',
				title : '回收来源',
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
									layout : 'column',
									border : false,
									items : [{
										xtype : 'panel',
										layout : 'form',
										columnWidth : .93,
										border : false,
										items : [{
													fieldLabel : '营销项目',
													xtype : 'textfield',
													readOnly:true,
													name:'obCalllistHuishouh.callbatchNam',
													id : 'obCalllistHuishouh.callbatchNam',
													anchor : '100%'
												}]
									}, {
										xtype : 'button',
										columnWidth : .07,
										iconCls : 'btn-search',
										handler : function() {
											ObProjectSelector.getView(
													function(projId, projNam,
															perIncharge,
															ownerTeam) {
														Ext.getCmp('obCalllistHuishouh.callbatchNam').setValue(projNam);
														Ext.getCmp('obCalllistHuishouh.callbatchIds').setValue(projId);
														combo_obcom_form.clearValue();
														combo_calllist_form.clearValue();
														combo_callbatch_form.clearValue();
														ObCalllistHuishouForm.getStoreCom(projId);//作用域限定：ObCalllistMFeipeiForm														
												    	
												    	var store = Ext.getCmp('gridPanelHuishou').getStore(); 
												    	store.baseParams = {
												    		projId:projId
												    	};
												    	store.reload();
												    	var url=__ctxPath + '/outb/listAssIdsByCallbatchObCallbatchAss.do?projId='+projId;
												    	ObCalllistHuishouForm.listAssIdsByCallbatchId(url);
													},null,false, false,"2").show();
										}
									}]
								}, {
									layout : 'form',
									border : false,
									items : [combo_calllist_form]
								}]
					}, {
						layout : 'form',
						border : false,
						columnWidth : .5,
						items : [{
									layout : 'form',
									border : false,
									items : [combo_obcom_form]
								}, {
									layout : 'form',
									border : false,
									items : [combo_callbatch_form]
								}]
					}]
				}]
			}, {
				xtype : 'fieldset',
				title : '回收规则',
				collapsible : true,
				items : [{
					layout : 'column',
					border : false,
					items : [{
						layout : 'form',
						border : false,
						columnWidth : .25,
						items : [{
							xtype : 'radio',
							anchor : '100%',
							name : 'radio',
							style : 'margin-left:20px',
							hideLabel : true,
							boxLabel : '全部回收',
							listeners : {
								'check' : function(radio, check) {
									if (check) {
										retriveRuleType=0;
										Ext.get('huishoutjHS').dom.style.display = 'none';
										Ext.getCmp('huishourenHS').setVisible(false);
									}
								}
							}
						}, {
							xtype : 'radio',
							anchor : '100%',
							name : 'radio',
							hideLabel : true,
							style : 'margin-left:20px',
							hideLabel : true,
							//checked : true,
							boxLabel : '按条件回收',
							listeners : {
								'check' : function(radio, check) {
									if (check) {
										retriveRuleType=1;
										Ext.get('huishoutjHS').dom.style.display = 'block';
										Ext.getCmp('huishourenHS')
												.setVisible(true);
									}
								}
							}
						}]
					}, {
						columnWidth : .75,
						xtype : 'panel',
						id : 'huishoutjHS',
						anchor : '100%',
						items : [this.gridPanel_history]
					}]
				}]
			}, {
				xtype : 'fieldset',
				title : '可回收人',
				id : 'huishourenHS',
				collapsible : true,
				collapsed : true,
				items : [this.gridPanel]
			}]
		});

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
		tabs.remove('ObCalllistHuishouFormWin');// 移除创建的窗口
	},
	/**
	 * 保存记录
	 */
	retrive : function() {
		//var callbatchId=Ext.getCmp('combo_callbatch_Id').getValue();
		var countArray=new Array();
		var idArray='';
		var rows = this.gridPanel.getSelectionModel().getSelections();
		var proVal=Ext.getCmp('obCalllistHuishouh.callbatchNam').getValue();
		if(proVal==''||proVal==null||proVal=='undefined') {
		    Ext.ux.Toast.msg('操作提示','请选择营销项目!');
			return;
		}
		if(retriveRuleType==null) {
		    Ext.ux.Toast.msg('操作提示','请先选择回收规则!');
	        return;	
		} 
		if(retriveRuleType!=0) {
	        if (rows != null && rows.length > 0) {
	        	  for (var i = 0; i < rows.length; i++) {
	        	  	  var count=rows[i].data.contactType3;
	        	  	  var callbatchAssId=rows[i].data.callbatchAssId;
	        	  	  if(count==undefined) {
	        	  	  	   Ext.ux.Toast.msg('操作提示','请正确填写所选回收人的数量!');
	        	  	  	   return;
	        	  	  }
	        	  	  //idArray.push(callbatchAssId);
	        	  	  if(idArray=='') {
	        	  	      idArray=callbatchAssId;
	        	  	  } else {
		        	  	  idArray+=','+callbatchAssId;
	        	  	  }	
	        	  	  countArray.push(count);
	        	  }
	        } else {
	        	Ext.ux.Toast.msg('操作提示','请至少选择一个可回收人!');
	        	return;
	        }
		} else {
		    idArray=assIds;
		}
//		var assignTotalCount=Ext.getCmp('assignTotalCount').getValue();
//		if(!assignTotalCount || assignTotalCount==0){
//			Ext.Msg.alert('分配数量不能为空或0!');
//			return;
//		}
//		if(0+assignTotalCount>holdTotalCount){
//			Ext.Msg.alert('分配数量不能大于可分配数量!');
//			return;
//		}	
        assignIFGrid = '';	
		var store = this.gridPanel_history.getStore();
		for(var i=0; i<store.getCount(); i++) {
			var record = store.getAt(i);
			var assignFiled = record.data.assignFiled;
			var assignIf = record.data.assignIf;
			var assignVal = record.data.assignValue;
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
		
	   var myMask = new Ext.LoadMask(Ext.getBody(), {
	                        msg: '正在回收，请稍后...',
	                        removeMask: true //完成后移除
	                    });
	                myMask.show();			
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/doRetriveAssignedByCallbatchObCallbatchAss.do',
			method : 'post',
		    params:{
				ids:idArray,
				counts:countArray,
				assignRuleType:retriveRuleType,
				assignIFGrid:assignIFGrid
//				retriveIndex:this.retriveIndex,
//				parentFlag:this.parentFlag
			},
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success) {
				    Ext.getCmp("retrive_button_huishou").setVisible(false);
//				    Ext.Msg.alert("回收成功");
//				    Ext.getCmp('ObConCalllistGridHS').getStore().reload();
//				    Ext.getCmp('ObCallbatchAssGridM').getStore().reload();
//				    Ext.getCmp('ObCallbatchAssGridJL').getStore().reload();
//				    Ext.getCmp('ObCallbatchAssGridZZ').getStore().reload();
//				    Ext.getCmp('tab0MFormtable').getStore().reload();
//				    Ext.getCmp('tab1MFormtable').getStore().reload();
				    Ext.ux.Toast.msg('操作信息', '回收成功！');
				    myMask.hide();
				    
					var gridPanel = Ext.getCmp('ObConCalllistGridHS');
					if (gridPanel != null) {
						gridPanel.getStore().reload();
					}
					var gridPanel1 = Ext.getCmp('ObCallbatchAssGridM');
					if (gridPanel1 != null) {
						gridPanel1.getStore().reload();
					}
					var gridPanel2 = Ext.getCmp('ObCallbatchAssGridJL');
					if (gridPanel2 != null) {
						gridPanel2.getStore().reload();
					}
					var gridPanel3 = Ext.getCmp('ObCallbatchAssGridZZ');
					if (gridPanel3 != null) {
						gridPanel3.getStore().reload();
					}
					var gridPanel4 = Ext.getCmp('tab0MFormtable');
					if (gridPanel4 != null) {
						gridPanel4.getStore().reload();
					}
					var gridPanel5= Ext.getCmp('tab1MFormtable');
					if (gridPanel5 != null) {
						gridPanel5.getStore().reload();
					}					
					var tabs = Ext.getCmp('centerTabPanel');
					tabs.remove('ObCalllistHuishouFormWin');				    
				}
			},
			failure : function() {
				myMask.hide();
				Ext.ux.Toast.msg('操作信息', '回收失败！');
			}
		});			
	}// end of retrive

});
ObCalllistHuishouForm.getStoreCom = function(projId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObComObCallbatchAss.do?projId='+projId+'&flag=2',
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_obcom_Id_huishou").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

ObCalllistHuishouForm.getStoreCallist = function(comId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObCalllistObCallbatchAss.do?comId='+comId+'&flag=2',
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_obcalllist_Id_huishou").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

ObCalllistHuishouForm.getStoreCallbatch = function(calllistId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObCallbatchObCallbatchAss.do?calllistId='+calllistId+'&flag=2',
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_callbatch_Id_huishou").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

ObCalllistHuishouForm.listAssIdsByCallbatchId = function(url) { 
		Ext.Ajax.request({
			url :  url,
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				assIds=result.data;
			},
			failure : function() {
			}
		});
}