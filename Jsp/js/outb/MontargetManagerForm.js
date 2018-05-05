var getFeeIndexLevelIds='';
MontargetManagerForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents(_cfg);
		MontargetManagerForm.superclass.constructor.call(this, {
					id : 'MontargetManagerFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					anchor : '96%',
					height : 400,
					maximizable : true,
					title : '目标详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
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
		
		this.gridPanel = new HT.GridPanel({
			height : 150,
			anchor : '99%',
			showPaging:false,
			id:'usersgridPanelwin',
			scrollHeight : true,
			tbar : ['->', {
						text : '添加',
						iconCls : 'btn-add',
						handler : function(){
							var usergridPanel = UlFuZeRenSelector.getView(function(rows){
								var store = Ext.getCmp('usersgridPanelwin').getStore();
								var recordType = store.recordType;
									for (var i = 0, r; r = rows[i]; i++) {
										store.add(new recordType({
													fullname : rows[i]
															.get('fullname'),
													deptName : rows[i]
															.get('deptName'),
													useId : rows[i],
													userNo : rows[i]
															.get('userNo'),
													useid : rows[i]
															.get('useid')
												})); // 添加一行空store
								}
							},false,false,false,false).show();
						}
					}, {
						text : '删除',
						iconCls : 'btn-delete',
						handler : function(){
							var smGrid = Ext.getCmp('usersgridPanelwin');
							var store = smGrid.getStore();
							var sm = smGrid.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息','请至少选择一条记录!');
							} else {
//								
								if(_cfg.feeIndexId!=null){
									$gridRs( {
									url : __ctxPath + '/customer/multiDelBDZePersonObFeeIndex.do?feeIndexId=' + _cfg.feeIndexId,
									grid : smGrid,
									idName : 'useid',
									callback : function(
											response) {
										store.remove(cell);
//										var store1 = smGrid.getStore();
//										smGrid.getStore().reload();
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
					}],
			clicksToEdit : 1,
			store : new Ext.data.SimpleStore({
				url : __ctxPath+ '/xitong/zuZhiJiGouBDNamlistUlDepartment.do?feeRuleId='+ this.feeIndexId,
				fields : [{
						name : 'useId',
						type : 'int'
					}, 'fullname','deptName','userNo','useid'],
				data:[]
			}),
			columns : [{
						header : '工号',
						dataIndex : 'userNo'
					},{
						header : '姓名',
						dataIndex : 'fullname'
					},  {
						header : '所属机构',
						dataIndex : 'deptName'
					},
					 {
						header : 'useid',
						dataIndex : 'useid',
						hidden:true
					}]
				// end of columns
			});
		
		var responsea = Ext.lib.Ajax.getConnectionObject().conn;
		responsea.open("POST", __ctxPath + '/customer/getColumnObFeeIndex.do', false);
		responsea.send(null);
		var result = Ext.util.JSON.decode(responsea.responseText);
		var data = result.columns;
		var arrData = data.split(',');
		this.datelength = arrData.length;
		column = [];
		var fields = ['month'];
		column.push({
			header:'月份',
			dataIndex:'month'
		})
		for (var i=0; i<arrData.length; i++){
			
			column.push({
				header:arrData[i],
				dataIndex:'data' + i,
				editor:new Ext.form.TextField({
					value:''
				})
			});
			fields.push('data'+i);
		}
		
		this.monthGridPanel = new HT.EditorGridPanel({
			region : 'center',
			printable : false,
			height:200,
			id:'monthGridPanelwin',
			layout:'fit',
			exportable : false,
			showPaging:false,
			fields : fields,
			columns : column
			});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			border : false,
			labelAlign : 'right',
//			autoHeight : true,
			id : 'MontargetManagerForm',
			labelWidth : 50,
			anchor : '96%',
			style : 'padding-top:10px;overflow-y:auto',
			bodyStyle:'overflow-y:auto',
			items : [{
						name : 'obFeeIndex.feeIndexId',
						xtype : 'hidden',
						id : 'feeIndexId',
						value : this.feeIndexId == null ? '' : this.feeIndexId
					},{
						xtype : 'textfield',
						name : 'obFeeIndex.feeIndexName',
						anchor : '96%',
						allowBlank : false,
						fieldLabel : '指标名'
					}, {
						layout : 'column',
						anchor : '96%',
						border : false,
						items : [{
									layout : 'form',
									border : false,
									columnWidth : .33,
									labelWidth : 50,
									items : [{
										xtype : 'datefield',
										name : 'obFeeIndex.annual',
										format : 'Y',
										allowBlank : false,
										anchor : '100%',
										fieldLabel : '年度'
									}]
								}, {
									layout : 'form',
									border : false,
									labelWidth : 50,
									columnWidth : .33,
									items : [{
										xtype : 'combo',
										anchor : '100%',
										id : 'obFeeIndexcycle',
										hiddenName : 'obFeeIndex.cycle',
										readOnly:this.feeIndexId?true:false,
										fieldLabel : '周期',
										editable:false,
										triggerAction : 'all',
										editable:false,
										mode : 'local',
										allowBlank : false,
										lazyInit : false,
										valueField : 'myId',
										displayField : 'displayText',
										store : new Ext.data.SimpleStore({
											autoLoad : true,
											fields : ['myId','displayText'],
//											data : [[1, '月份'],[2, '第一季度'],[3, '第二季度'],[4, '第三季度'],[5, '第四季度']],
											data : [[1, '月份'],[2, '季度']],
											listeners : {
												load : function() {
													var store = new Ext.data.SimpleStore(
														{'myId':1,'displayText':'月份'},
														{'myId':2,'displayText':'季度'}
//														{'myId':2,'displayText':'第一季度'},
//														{'myId':3,'displayText':'第二季度'},
//														{'myId':4,'displayText':'第三季度'},
//														{'myId':5,'displayText':'第四季度'}
													);
													var rows = [];// 定义数组
													for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
														if (store.getAt(i).data['myId'] == cbo.getValue()) {
															cbo.setValue(store.getAt(i).data['displayText']);
															break;
														}
													}
													
												}
											}
										}),
										listeners:{
											'select':function(combo,record,index){
												if(index == 0){
													var store = Ext.getCmp('monthGridPanelwin').getStore();
													store.removeAll();
													var recordType = store.recordType;
													for (var i=1; i<13; i++){
														store.add(new recordType({
															month: i+'月'
														}))
													}
												}if(index==1) {
													var store = Ext.getCmp('monthGridPanelwin').getStore();
													store.removeAll();
													var recordType = store.recordType;
													for (var i=1; i<5; i++){
														store.add(new recordType({
															month: i+'季度'
														}))
					
													}
												}
												if(index==2) {
													var store = Ext.getCmp('monthGridPanelwin').getStore();
													store.removeAll();
													var recordType = store.recordType;
//													for (var i=1; i<2; i++){
														store.add(new recordType({
															month: '二季度'
														}))
					
//													}
												}
												if(index==3) {
													var store = Ext.getCmp('monthGridPanelwin').getStore();
													store.removeAll();
													var recordType = store.recordType;
//													for (var i=1; i<2; i++){
														store.add(new recordType({
															month: '三季度'
														}))
					
//													}
												}
												if(index==4) {
													var store = Ext.getCmp('monthGridPanelwin').getStore();
													store.removeAll();
													var recordType = store.recordType;
//													for (var i=1; i<2; i++){
														store.add(new recordType({
															month: '四季度'
														}))
					
//													}
												}
//												alert("d");
//												Ext.getCmp('obFeeIndexcycle').reaOnly();
											}
//									     'focus':function(){
//												alert("d");
//												Ext.getCmp('obFeeIndexcycle').hide();
//									     }
										}
									}]
								}, {
									layout : 'column',
									border : false,
									columnWidth : .33,
									labelWidth : 60,
									hidden:true,
									items : [{
												xtype : 'panel',
												layout : 'form',
												columnWidth : .93,
												border : false,
												hidden:true,
												items : [
													{
														name : 'obFeeIndex.depId',
														id : 'obFeeIndex.depId',
														xtype : 'hidden'
													},{
														fieldLabel : '使用部门',
														name : 'obFeeIndex.ownerTeamNam',
														id :'obFeeIndex.ownerTeamNam',
														xtype : 'textfield',
														anchor : '100%',
														hidden:true
													}]
											}, {
												xtype : 'button',
												columnWidth : .07,
												iconCls : 'btn-search',
												anchor : '100%',
												hidden:true,
												handler:function(){
													DepSelector.getView(function(depId,depName){
														Ext.getCmp("obFeeIndex.ownerTeamNam").setValue(depName);
														Ext.getCmp("obFeeIndex.depId").setValue(depId);
													},true).show();
												}
											}]
								}]
					}, {
						xtype : 'textarea',
						name : 'obFeeIndex.comments',
						height:50,
						fieldLabel : '备注',
						anchor : '96%'
						
					}, {
						xtype : 'fieldset',
						collapsible : true,
						collapsed : false,
						anchor : '97%',
						title : '责任人',
						items : [this.gridPanel]
					},
//					, {
//						layout : 'fit',
//						style : 'margin:10px',
//						anchor : '97%',
//						title : '指标',
//						html : '<table class="bordertable" align="center" width="100%">'
//								+ '<tr class="head"><td>月份</td><td>结案客户数</td><td>有效订单数</td><td>销售额</td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">1月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">2月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">3月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">4月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">5月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">6月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">7月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">8月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">9月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">10月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">11月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '<tr><td class="head" style="font-weight:bold">12月</td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td><td><input type="text" style="width:90%"/></td></tr>'
//								+ '</table>'
//					}
					{
						layout:'fit',
						border:false,
						anchor:'96%',
						style:'padding-left:10px',
						items:[this.monthGridPanel]
					}
					]
		});
		// 加载表单对应的数据
		if (this.feeIndexId != null && this.feeIndexId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/customer/getObFeeIndex.do?feeIndexId=' + this.feeIndexId,
				root : 'data',
				preName : 'obFeeIndex',
				success : function(response, options) {
					var depName = Ext.util.JSON.decode(response.responseText).depName;
					
					Ext.getCmp('obFeeIndex.ownerTeamNam').setValue(depName);
					
					var users = Ext.util.JSON.decode(response.responseText).users;
					var storeUsers = Ext.getCmp('usersgridPanelwin').getStore();
					
					var recordType = storeUsers.recordType;
					for (var i=0; i<users.length; i++){
						storeUsers.add(new recordType({
							userNo : users[i].userNo,
							fullname : users[i].fullname,
							deptName : users[i].depName,
							useid : users[i].useid
						}))
					}
					
					var obFeeIndexLevels = Ext.util.JSON.decode(response.responseText).obFeeIndexLevels;
					var storeMonth = Ext.getCmp('monthGridPanelwin').getStore();
					var recordTypes = storeMonth.recordType;
					getFeeIndexLevelIds='';
					//测试后台返回的信息
					for (var k=0; k<obFeeIndexLevels.length; k++){
						getFeeIndexLevelIds+=obFeeIndexLevels[k].getFeeIndexLevelId+ ",";
					}
					var model = Ext.getCmp('monthGridPanelwin').getColumnModel();
					var len = Ext.getCmp('monthGridPanelwin').getColumnModel().getColumnCount();
					
					var dataLength;
					var dataLe = Ext.getCmp('obFeeIndexcycle').getValue();
					var responsea = Ext.lib.Ajax.getConnectionObject().conn;
					responsea.open("POST", __ctxPath + '/customer/getColumnObFeeIndex.do', false);
					responsea.send(null);
					var result = Ext.util.JSON.decode(responsea.responseText);
					var data = result.columns;
					var arrData = data.split(',');
					if (obFeeIndexLevels != null && obFeeIndexLevels != '')
					{
						dataLe = dataLe == 1 ?12:4;
							for(var i=1;i<=dataLe;i++){
								var defaultData = {};//添加列的
								defaultData['month'] = i +(dataLe == 12 ?'月':'季度');
								var j = i-1;
								for(var m=3;m<column.length;m++){
									defaultData['data'+(m-3)] =obFeeIndexLevels[j].feeIndexValue;
									j++;
								}
								storeMonth.add(new recordTypes(defaultData,i));
							}
					}
					
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
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('MontargetManagerFormWin');
	},
	/**
	 * 保存记录
	 */
	save : function() {
		var dataStore = Ext.getCmp('monthGridPanelwin').getStore();
		var zhouqi = Ext.getCmp('obFeeIndexcycle').getValue();
		var months = [];
		for (var j=0; j<dataStore.getCount(); j++){
			var record = dataStore.getAt(j);
			var yue=j+1;
			if(1<=yue && yue<10){
				yue="0"+yue;
			}
			months.push((record.data.data0?record.data.data0:0)+"-3-"+yue);
		}
		//测试拼成的allmonth值
		var store = Ext.getCmp('usersgridPanelwin').getStore();
		// 定义数组 row
		var rows = [];
		// store.getCount()为store的长度
		for (var i = 0; i < store.getCount(); i++) {
			// 将每一行store的值放入row数组里
			rows.push(store.getAt(i).data.useid);
		}
		if(store.getCount()==0){
			Ext.ux.Toast.msg("信息", "请选择要添加的责任人！");
		}else{
		$postForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath + '/customer/saveObFeeIndex.do',
			params : {
				// 将数组提交至后台 details
				details : Ext.encode(rows),
				allmonth : Ext.encode(months),
				getFeeIndexLevelIds:getFeeIndexLevelIds
			},
			msgSuccess : '成功保存该记录！',
			msgFailure : '操作出错，请联系管理员！',
			callback : function(fp, action) {
				
				var gridPanel = Ext.getCmp('obFeeIndexGrid');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				var tabs = Ext.getCmp('centerTabPanel');
				tabs.remove('MontargetManagerFormWin');
			}
		});
		}
	}// end of save

});
