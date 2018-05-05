/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCalllistMHuishouForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
 var assignRuleTypeHS=null;
ObCalllistMHuishouForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObCalllistMHuishouForm.superclass.constructor.call(this, {
					id : 'ObCalllistMHuishouFormWin',
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
								id:'retrive_button',
								iconCls : 'btn-save',
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
		this.gridPanel_history = new HT.EditorGridPanel({
			region : 'center',
			id : 'gridPanelMHuishou_history',
			scrollHeight : true,
			checkOnlySm:true,
			showPaging:false,
			height : 150,
			tbar : ['->', {
						iconCls : 'btn-add',
						text : '增加',
						handler : function() {
							var store = Ext.getCmp('gridPanelMHuishou_history')
									.getStore();
							var recordType = store.recordType;
							store.add(new recordType({})); // 添加一行空store
						}
					}, {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = Ext.getCmp('gridPanelMHuishou_history')
									.getStore();
							var sm = Ext.getCmp('gridPanelMHuishou_history')
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
									        , ['退换货比率', '退换货比率'], ['拨打次数', '拨打次数']]
								})
					}, {
						header : '关系',
						dataIndex : 'assignIf',
						editor : new Ext.form.ComboBox({
							        id : 'OB_CalllistMhuishou_Grid_assignIf_01',
							        editable : false,
									mode : 'local',
									triggerAction : 'all',
									store :  [['为空', '为空'], ['长度小于', '长度小于'],
										['包含', '包含'], ['等于', '等于'],
										['不等于', '不等于']]
								})
					}, {
						header : '值',
						dataIndex : 'assignValue',
						id:'assignNameMHuishou',					
						editor : new Ext.form.TextField({

						}),
						renderer:function(value,cls,record){
							if(value){
								if(record.data.assignFiled == '会员区域'){
									record.data.assignValue = value.split(';')[0].replace('-','@');
									return value.split(';')[1].replace('-','');
								} else if((record.data.assignFiled == '购物频次'||record.data.assignFiled == '积分'||record.data.assignFiled == '拨打次数')) {
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
											   record.data.assignValue='';
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
						if(Ext.getCmp('gridPanelMHuishou_history').getColumnModel().getColumnById('assignNameMHuishou').getEditor()) {
						   Ext.getCmp('gridPanelMHuishou_history').getColumnModel().getColumnById('assignNameMHuishou').getEditor().destroy();
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
							Ext.getCmp("OB_CalllistMhuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '证件类型'){
							Ext.getCmp("OB_CalllistMhuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '生日'||record.data.assignFiled == '年收入'||record.data.assignFiled == '积分'||record.data.assignFiled == '礼金'
						    ||record.data.assignFiled == '购物频次'||record.data.assignFiled == '上次购物金额'||record.data.assignFiled == '拒收比率'||record.data.assignFiled == '退换货比率'
						    ||record.data.assignFiled == '拨打次数'
						){
							Ext.getCmp("OB_CalllistMhuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],['小于','小于'],
										['不等于','不等于'],['大于','大于']]);
						}else if(record.data.assignFiled == '客户级别'){
							Ext.getCmp("OB_CalllistMhuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						}else if(record.data.assignFiled == '会员区域'){
							Ext.getCmp("OB_CalllistMhuishou_Grid_assignIf_01").getStore().loadData([
										[ '为空','为空'],['等于','等于'],
										['不等于','不等于']]);
						} else {
							Ext.getCmp("OB_CalllistMhuishou_Grid_assignIf_01").getStore().loadData([
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
			checkOnlySm:true,
			url : __ctxPath+ '/outb/listAssignsByAdminObCallbatchAss.do?callbatchAssIds='+ this.callbatchAssIds+"&index="+this.index+"&retriveIndex="+this.retriveIndex,
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
						header : '回收数量<font style="color:red">*</font>',
						dataIndex : 'contactType3',
						editor : new Ext.form.NumberField({
							allowDecimals:false,
							allowNegative: false,
							regex : /^[0-9]*[1-9][0-9]*$/	
						})
					}]
				// end of columns
			});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px;overflow-y:auto',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
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
															xtype : 'textfield',
															id:'projectformHS',
															name:'callbatchAss.projNam',
															anchor : '100%',
															fieldLabel : '营销项目'
														}, {
															xtype : 'textfield',
															id:'calllistformHS',
															name : 'callbatchAss.calllistNam',
															anchor : '100%',
															fieldLabel : '呼叫名单'
														}, {
															xtype : 'textfield',
															id:'holdCountsformHS',
															fieldLabel : '可回收数量',
															anchor : '100%'
														}]
											}, {
												layout : 'form',
												border : false,
												columnWidth : .5,
												items : [{
															xtype : 'textfield',
															id:'comformHS',
															name : 'callbatchAss.comNam',
															anchor : '100%',
															fieldLabel : '营销活动'
														}, {
															xtype : 'textfield',
															id:'callbatchformHS',
															name:'callbatchAss.callbatchNam',
															anchor : '100%',
															fieldLabel : '批次'
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
									style:'margin-left:20px',
									hideLabel:true,
									boxLabel : '全部回收',
									listeners : {
										'check' : function(radio, check) {
											if (check) {
											    assignRuleTypeHS=0;
												Ext.get('huishoutj').dom.style.display = 'none';
												Ext.getCmp('huishouren_huishou')
														.setVisible(false);
											}
										}
									}
								}, {
									xtype : 'radio',
									anchor : '100%',
									name : 'radio',
									hideLabel:true,
									style:'margin-left:20px',
									hideLabel:true,
									//checked : true,
									boxLabel : '按条件回收',
									listeners : {
										'check' : function(radio, check) {
											if (check) {
											    assignRuleTypeHS=1;
												Ext.get('huishoutj').dom.style.display = 'block';
												Ext.getCmp('huishouren_huishou')
														.setVisible(true);
											}
										}
									}
								}]
							}, {
								columnWidth : .75,
								xtype : 'panel',
								id:'huishoutj',
								anchor : '100%',
								items : [this.gridPanel_history]
							}]
						}]
					}, {
						xtype : 'fieldset',
						title : '可回收人',
						id : 'huishouren_huishou',
						collapsible : true,
						collapsed : true,
						items : [this.gridPanel]
					}]
		});
		// 加载表单对应的数据
		if (this.callbatchAssIds != null && this.callbatchAssIds.trim()!= '' && this.callbatchAssIds != 'undefined') {
			Ext.getCmp('projectformHS').setValue(this.projNam);
			Ext.getCmp('comformHS').setValue(this.comNam);
			Ext.getCmp('calllistformHS').setValue(this.calllistNam);
			Ext.getCmp('callbatchformHS').setValue(this.callbatchNam);
	        Ext.getCmp('holdCountsformHS').setValue(this.holdCounts);
//		    var holdCountsformHS = Ext.getCmp('holdCountsformHS').getValue();
//		    if(holdCountsformHS==0) {
//		    	alert('dddddddddddd');
//		   	    Ext.getCmp("retrive_button").setVisible(false);
//		    }
//			this.formPanel.loadData({
//						url : __ctxPath
//								+ '/outb/getObCallbatchAss.do?callbatchAssIds='
//								+ this.callbatchAssIds,
//						root : 'data',
//						preName : 'callbatchAss',
//						success : function(response, options) {
//						},
//						failure : function(response, options) {
//							Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
//						}						
//					});
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
		tabs.remove('ObCalllistMHuishouFormWin');// 移除创建的窗口
	},
	/**
	 * 保存记录
	 */
	retrive : function() {
		//var callbatchId=Ext.getCmp('combo_callbatch_Id').getValue();
		if(assignRuleTypeHS==null) {
		    Ext.ux.Toast.msg('操作提示','请先选择回收规则!');
	        return;	
		} else {
			var countArray=new Array();
			var idArray='';
			var rows = this.gridPanel.getSelectionModel().getSelections();
			if(assignRuleTypeHS!=0) {
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
				idArray=this.callbatchAssIds;
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
				url :  __ctxPath + '/outb/doRetriveAssignedCallbatchObCallbatchAss.do',
				method : 'post',
			    params:{
					ids:idArray,
					counts:countArray,
					assignRuleType:assignRuleTypeHS,
					assignIFGrid:assignIFGrid,
					retriveIndex:this.retriveIndex,
					parentFlag:this.parentFlag
				},
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);
					if(result.success) {
					    Ext.getCmp("retrive_button").setVisible(false);
					    Ext.ux.Toast.msg('操作信息', '回收成功！');
					    myMask.hide();
					    
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
						tabs.remove('ObCalllistMHuishouFormWin');						    
					    
					    
					    
					    //Ext.getCmp('ObCallbatchAssGridM').getStore().reload();
					    //Ext.getCmp('ObCallbatchAssGridJL').getStore().reload();
					    //Ext.getCmp('ObCallbatchAssGridZZ').getStore().reload();
					    //Ext.getCmp('tab0MFormtable').getStore().reload();
					    //Ext.getCmp('tab1MFormtable').getStore().reload();
					    
					}
				},
				failure : function() {
					 myMask.hide();
					 Ext.ux.Toast.msg('操作信息', '回收失败！');
				}
			});			
			
		}	
	}// end of retrive

});