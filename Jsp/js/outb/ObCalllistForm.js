/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCalllistForm
 * @extends Ext.Window
 * @description ObCalllist表单
 * @company 优创融联科技
 */
var calllistId = '';
ObCalllistForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObCalllistForm.superclass.constructor.call(this, {
					id : 'ObCalllistFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '呼叫名单详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
								iconCls : 'btn-save',
								id : 'btn-save_ID',
								scope : this,
								handler : this.save
							}, {
								text : __reset,
								id : 'btn-reset_ID',
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
		calllistId = this.calllistId;
		this.gridPanel = new HT.GridPanel({
					region : 'center',
					printable : false,
					id : 'tab0table',
					lazyLoad : false,
					exportable : false,
					url : __ctxPath
							+ "/outb/listCalBthObCalllist.do?calllistID="
							+ this.calllistId,
					height : 200,
					scrollHeight : true,
					clicksToEdit : 1,
					fields : [{
								name : ' callbatchId',
								type : 'Long'
							}, 'callbatchNam', 'callbatchTypId',
							'obCalllist.calllistResouce', 'callbatchRegion', 'totalCount',
							'avlidCount', 'callbatchStaId'],
					columns : [{
								header : 'callbatchId',
								dataIndex : 'callbatchId',
								hidden : true
							}, {
								header : '批次名称',
								isExp : false,
								dataIndex : 'callbatchNam'
							}, {
								header : '类型',
								isExp : false,
								dataIndex : 'callbatchTypId',
								renderer : function(value) {
									return CONOB_CALLBATCH_PCLX.get(value);
								}
							}, {
								header : '来源',
								isExp : false,
								dataIndex : 'obCalllist.calllistResouce',
								renderer : function(value) {
									return CONOB_MDLY.get(value);
								}
							}, {
								header : '所属地区',
								isExp : false,
								dataIndex : 'callbatchRegion'
							}, {
								header : '总数',
								isExp : false,
								dataIndex : 'totalCount'
							}, {
								header : '有效数量',
								isExp : false,
								dataIndex : 'avlidCount'
							}, {
								header : '状态',
								isExp : false,
								dataIndex : 'callbatchStaId',
								renderer : function(value) {
									return CONOB_CALLBATCH_ZT.get(value);
								}
							}]
				});
				
		this.gridPanel1 = new HT.GridPanel({
					scrollHeight : true,
					region : 'center',
					id : 'tab1table',
					border:false,
					printable : false,
					height:200,
					lazyLoad : false,
					exportable : false,
					url : __ctxPath
							+ "/outb/listConCalllistObConCalllist.do?calllistId="
							+ this.calllistId,
					tbar : ['->', {
								text : '名单清洗',
								iconCls : 'btn-borrow',
								id : 'OB_CalllistForm_btn-borrow',
								handler : function() {
									new ObCallListClearnWindow({
										isClearnView : 'false',
										inChanel : 'ObCalllist',
										calllistId : calllistId
									}).show();// 调用清洗window
//									new ObCallListWindow().show();// 调用清洗window
								}
							}
					// {
					// text : '去重',
					// iconCls : 'menu-book-type'
					// }
					],
					fields : [{
								name : ' cusId',
								type : 'Long'
							},'nameCn','cusCode','age', 'gender', 'credTypId', 'birthday',
							'credNum',  'fullname'
							//'customerId','ext2', 'ext3','ext4', 'ext5', 'ext6'
							],
					columns : [
//						{
//								header : '批次名称',
//								isExp : false,
//								dataIndex : 'callbatch.callbatchNam'
//							}, {
//								header : '导入时间',
//								isExp : false,
//								dataIndex : 'callbatch.staDat'
//							},
							{
								header : '姓名',
								isExp : false,
								dataIndex : 'nameCn'
							}, {
						        header : '客户代码',
						        isExp : false,
						        dataIndex : 'cusCode'
					        }, {
								header : '性别',
								isExp : false,
								dataIndex : 'gender',
								renderer : function(value) {
									return XB001.get(value);
								}
							}, {
						        header : '年龄',
						        isExp : false,
						        dataIndex : 'age'
					        }, {
								header : '证件类型',
								isExp : false,
								dataIndex : 'credTypId',
								renderer : function(value) {
									return CONOB_CALLBATCH_IMP_TMP_ZJLX
											.get(value);
								}
							}, {
								header : '生日',
								isExp : false,
								dataIndex : 'birthday'
							}, {
								header : '证件号码',
								isExp : false,
								dataIndex : 'credNum'
							}, {
								header : '归属人',
								isExp : false,
								dataIndex : 'fullname'
							}
							// {
							// header : '证件有效期',
							// isExp : false,
							// dataIndex : 'credDurDat',
							// renderer : function(value) {
							// return value.substring(0, 10);
							// }
							// },
//							{
//
//								header : '家庭电话',
//								isExp : false,
//								dataIndex : 'ext1'
//							}, {
//								header : '办公电话',
//								isExp : false,
//								dataIndex : 'ext2'
//							}, {
//								header : '移动电话',
//								isExp : false,
//								dataIndex : 'ext3'
//							}
							// {
							// header : '其他电话',
							// isExp : false,
							// dataIndex : 'ext4'
							// },
//							{
//								header : '传真',
//								isExp : false,
//								dataIndex : 'ext5'
//							}, {
//								header : 'Email',
//								isExp : false,
//								dataIndex : 'ext6'
//							}
							]
				});
		this.searchPanel1 = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					height : 35,
					items : [{
								xtype : 'panel',
								width : 50,
								style : 'text-align:right',
								html : '批次：'
							}, {
								id:'callbatch.callbatchNam',
								name : 'callbatch.callbatchNam',
								xtype : 'textfield'
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : this.onSearch
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

		var ownerTeamName = new Ext.form.TextField({
					fieldLabel : '所属机构',
					readOnly : true,
					name : 'obCalllist.ownerTeamName',
					xtype : 'textfield',
					allowBlank : false,
					anchor : '100%'
				});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			labelAlign : 'right',
			border : false,
			autoScroll : true,
			// id : 'ObCalllistForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'obCalllist.calllistId',
						xtype : 'hidden',
						value : this.calllistId == null ? '' : this.calllistId
					}, {
						fieldLabel : '开始时间',
						id : 'obCalllist.staDat_hid',
						xtype : 'hidden',
						format : 'Y-m-d',
						anchor : '100%'
					},
					{
						fieldLabel : '结束时间',
						id : 'obCalllist.endDat_hid',
						xtype : 'hidden',
						format : 'Y-m-d',
						anchor : '100%'
					},{
						id : 'obCalllist.ownerTeam',
						name : 'obCalllist.ownerTeam',
						xtype : 'hidden',
						value : this.ownerTeam == null ? '' : this.ownerTeam
					}, {
						fieldLabel : '名称',
						name : 'obCalllist.calllistNam',
						allowBlank : false,
						maxLength : 128,
						anchor : '95%'
					}, {
						layout : 'column',
						border : false,
						xtype : 'panel',
						items : [{
							layout : 'form',
							columnWidth : .33,
							xtype : 'panel',
							border : false,
							items : [{
										fieldLabel : '名单编号',
										xtype : 'textfield',
										anchor : '100%',
										name : 'obCalllist.calllistCode'
										//readOnly:true
									}, {
										layout : 'column',
										border : false,
										anchor : '100%',
										items : [{
													xtype : 'panel',
													layout : 'form',
													columnWidth : .9,
													border : false,
													items : [ownerTeamName]
												}, {
													xtype : 'panel',
													columnWidth : .1,
													border : false,
													layout : 'form',
													items : [{
														xtype : 'button',
														anchor : '100%',
														iconCls : 'btn-search',
														handler : function() {
															ObZuZhiJiGouSelector.prototype
																	.setup(
																			function(
																					jigouNam,
																					jigouId) {
																				ownerTeamName
																						.setValue(jigouNam);
																				Ext
																						.getCmp('obCalllist.ownerTeam')
																						.setValue(jigouId);
																			})
																	.show();
														}
													}]
												}]
									}, {
										fieldLabel : '开始时间',
										id : 'obCalllist.staDat',
										name : 'obCalllist.staDat',
										xtype : 'datefield',
										allowBlank : false,
										editable : false,
										format : 'Y-m-d',
										value : '',
										anchor : '100%'
									}]

						}, {
							layout : 'form',
							columnWidth : .33,
							xtype : 'panel',
							border : false,
							items : [{
										fieldLabel : '名单来源',
										id : 'obCalllist.calllistResouce_form',
										hiddenName : 'obCalllist.calllistResouce',
										xtype : 'mtdiccombo',
										allowBlank : false,
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONOB_MDLY',
										anchor : '100%'
									}, {
										xtype : 'hidden',
										id : 'obCalllist.obProject.projId',
										name : 'obCalllist.projId'
									}, {
										layout : 'column',
										border : false,
										anchor : '100%',
										items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : .9,
											border : false,
											items : [{
														fieldLabel : '所属项目',
														xtype : 'textfield',
														readOnly : true,
														allowBlank : false,
														name : 'obCalllist.projNam',
														id : 'obCalllist.projNam',
														anchor : '100%'
													}]
										}, {
											xtype : 'button',
											columnWidth : .1,
											iconCls : 'btn-search',
											handler : function() {
												ObProjectSelector.getView(
														function(projId,
																projNam,
																perIncharge,
																ownerTeam) {
															Ext
																	.getCmp('obCalllist.projNam')
																	.setValue(projNam);
															Ext
																	.getCmp('obCalllist.obProject.projId')
																	.setValue(projId);
															Ext
																	.getCmp('obCom.comId_form')
																	.clearValue();
															ObCalllistForm
																	.getStoreCom(projId);
														}).show();
											}
										}]
									}, {
										fieldLabel : '结束时间',
										id : 'obCalllist.endDat',
										name : 'obCalllist.endDat',
										xtype : 'datefield',
										allowBlank : true,
										editable : false,
										format : 'Y-m-d',
										value : '',
										anchor : '100%'
									}]

						}, {
							layout : 'form',
							columnWidth : .33,
							xtype : 'panel',
							border : false,
							items : [{
										fieldLabel : '名单类型',
										id : 'obCalllist.calllistTypId_form',
										hiddenName : 'obCalllist.calllistTypId',
										xtype : 'mtdiccombo',
										allowBlank : false,
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONOB_CALLLIST_MDLX',
										anchor : '100%'
									}, {
										fieldLabel : '所属活动',
										xtype : 'combo',
										mode : 'local',
										id : 'obCom.comId_form',
										//name:'calllistComId',
										hiddenName:'calllistComId',
										readOnly:(this.calllistId&&this.calllistSta==0)?true:false,
										allowBlank : false,
										editable : false,
										// editable : false,
										// lazyInit : false,
										// triggerAction : 'all',
										store : new Ext.data.SimpleStore({// new一个SimpleStore
											fields : ['comId', 'comName'], // 设定键/值
											data : []
												// 默认的data必须提供
										}),
										displayField : 'comName',
										valueField : 'comId',
										anchor : '100%',
										listeners : {
											'select' : function() {
												var combo = Ext.getCmp('obCom.comId_form');
												var paramObj = {
													itemName : combo.getValue()
												};
												Ext.Ajax.request({
													url : __ctxPath
															+ '/outb/getObCom.do?comId='
															+ combo.getValue(),
													params : {
												// comId : combo.getValue()
													},
													method : 'post',
													success : function(response) {
														var result = Ext.util.JSON.decode(response.responseText);
														Ext.getCmp('obCalllist.staDat').setValue(result.data.staDat);
														Ext.getCmp('obCalllist.endDat').setValue(result.data.endDat);
                                                        Ext.getCmp('obCalllist.endDat_hid').setValue(result.data.endDat);
														Ext.getCmp('obCalllist.staDat_hid').setValue(result.data.staDat);																
													}
												});
											}
										}
									}, {
										layout : 'form',
										border : false,
										id : 'calllist_zt',
										items : [{
											fieldLabel : '状态',
											xtype : 'mtdiccombo',
											editable : false,
											name : 'obCalllist.calllistStaIdShow',
											hiddenName : 'obCalllist.calllistStaId',
											id : 'obCalllist.calllistStaId_form',
											itemKey : 'CONOB_CALLLIST_ZT',
											anchor : '100%'
										}]
									}]
						}]
					}, {
						fieldLabel : '说明',
						name : 'obCalllist.remark',
						xtype : 'textarea',
						maxLength : 1024,
						height : 70,
						anchor : '95%'
					}, {
						xtype : 'tabpanel',
						id : 'callBatch_ID',
						border : false,
						plain : true,
						defaultType : 'panel',
						activeTab : 0,// 激活第一个panel
						defaults : {
							anchor : '100%,100%'
						},
						items : [{
									xtype : 'panel',
									title : "导入批次",
									border : false,
									layout:'border',
									height:200,
									id : 'tab0',
									items : [{
												xtype : 'hidden',
												id : 'tab0hidden',
												value : true
											}, this.gridPanel]
								}, {
									title : '名单记录',
									border : true,
									id : 'tab1',
									layout : 'border',
									height : 200,
									items : [this.gridPanel1, {
												xtype : 'hidden',
												id : 'tab1hidden',
												value : true
											}, this.searchPanel1]
								}],
						listeners : {
							'tabchange' : function(p) {

								var id = p.activeTab.getId();
								if (Ext.get(id + 'hidden').getValue() == 'true') {
									Ext.getCmp(id + 'table').getStore().load();
									Ext.getCmp(id + 'hidden').setValue(false);
								}

							}
						}
					}]
		});
		// 加载表单对应的数据
		if (this.calllistId != null && this.calllistId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/outb/getObCalllist.do?calllistId='
						+ this.calllistId,
				root : 'data',
				preName : 'obCalllist',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					if(thisObj.obProject!=null)
					Ext.getCmp('obCalllist.obProject.projId')
							.setValue(thisObj.obProject.projId); // 项目内码
					if(thisObj.calllistResouce!=null)		
					Ext.getCmp('obCalllist.calllistResouce_form')
							.setValue(thisObj.calllistResouce); // 名单来源
					if(thisObj.calllistTypId!=null)		
					Ext.getCmp('obCalllist.calllistTypId_form')
							.setValue(thisObj.calllistTypId); // 名单类型
					Ext.getCmp('obCalllist.calllistStaId_form')
							.setValue(thisObj.calllistStaId); // 状态、
					
					//控制清洗按钮显示
					var status = thisObj.calllistStaId;
					if(status!='0') {
						Ext.getCmp("OB_CalllistForm_btn-borrow").setVisible(false);
					}
							
					var calllistStat=thisObj.calllistStaId;
					if(calllistStat==1) {
					    Ext.getCmp("btn-save_ID").setVisible(false);
						Ext.getCmp("btn-reset_ID").setVisible(false);	
					}	
                    if(thisObj.obProject!=null)	
					Ext.getCmp('obCalllist.projNam')
							.setValue(thisObj.obProject.projNam);
					// Ext.getCmp('obCalllist.ownerTeamName').setValue(thisObj.ownerTeamName);
					// // 所属机构名称
					// Ext.getCmp('obCalllist.ownerTeam').setValue(thisObj.ownerTeam);
					// // 所属机构ID
					if(thisObj.comId!=null)			
					Ext.getCmp('obCom.comId_form').setValue(thisObj.comId);// 活动id
					if(thisObj.comNam!=null)	
					Ext.getCmp('obCom.comId_form').setRawValue(thisObj.comNam);// 活动名称
					Ext.Ajax.request({
						url : __ctxPath
								+ '/outb/getObCom.do?comId='
								+ thisObj.comId,
						params : {
					// comId : combo.getValue()
						},
						method : 'post',
						success : function(response) {
							var result = Ext.util.JSON.decode(response.responseText);
//							Ext.getCmp('obCalllist.staDat').setValue(result.data.staDat);
//							Ext.getCmp('obCalllist.endDat').setValue(result.data.endDat);
                            Ext.getCmp('obCalllist.endDat_hid').setValue(result.data.endDat);
							Ext.getCmp('obCalllist.staDat_hid').setValue(result.data.staDat);																
						}
					});					
					
				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
			});
		} else {
			Ext.getCmp('callBatch_ID').setVisible(false);
			Ext.getCmp('calllist_zt').setVisible(false);
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
		 tabs.remove('ObCalllistFormWin');// 移除创建的窗口
	},
	// 按条件搜索
	onSearch : function(obj) {
		var psnle = this.gridPanel1;
	    	var store=this.gridPanel1.getStore();
	    	var callbatchNam=Ext.getCmp('callbatch.callbatchNam').getValue();
	    	if(callbatchNam==null||callbatchNam==''||callbatchNam=='undefined') callbatchNam=null;
	    	store.proxy.conn.url = __ctxPath + '/outb/listConCalllistObConCalllist.do?calllistId='+this.calllistId+'&callbatchNam='+encodeURIComponent(callbatchNam);
//		$search({
//					searchPanel : this.searchPanel1,
//					gridPanel : this.gridPanel1,
//					callback:function(){
//					
//					}
//					
//				});
	    	store.removeAll() ;
	    	store.load({
	    	callback : function() {
	    	    psnle.getView().refresh();
	    	}});
	},	
	/**
	 * 保存记录
	 */
	save : function() {
		
	    if(Ext.getCmp('obCalllist.calllistResouce_form').getValue()==3) {
	        if(Ext.getCmp('obCalllist.calllistCode')==null||Ext.getCmp('obCalllist.calllistCode')==""||Ext.getCmp('obCalllist.calllistCode')=='undefined') {
	             Ext.ux.Toast.msg('操作信息', '请填写名单编号！');
	             return;
	        }
	    	
	    }
		
		//验证名单的截至日期要在活动截止日期的范围内
		//获得活动截止日期
		var enddate = Ext.getCmp('obCalllist.endDat_hid').getValue();
		var stadate = Ext.getCmp('obCalllist.staDat_hid').getValue();
		//名单截至日期
		var inputenddate = Ext.getCmp('obCalllist.endDat')
				.getValue();
		var inputstadate = Ext.getCmp('obCalllist.staDat')
				.getValue();	
        if (enddate != null && stadate != null && inputenddate != null && inputstadate != null) {
        	   var dt = new Date(inputenddate);
			   var date1 = dt.format('Y-m-d');
			   var dt1 = new Date(inputstadate);
			   var date2 = dt1.format('Y-m-d');
        	   if(inputenddate<inputstadate) {
        	   	   Ext.ux.Toast.msg('操作信息', '开始时间不能大于结束时间！');
        	   } else  if(date2<stadate||date1>enddate) {
               	   Ext.ux.Toast.msg('操作信息', '名单截至日期要在活动的截止日期内！');
        	   } else {
					$postSubForm({
								formPanel : this.formPanel,
								scope : this,
								url : __ctxPath + '/outb/saveObCalllist.do',
								msgSuccess : '成功保存该记录！',
								msgFailure : '操作出错，请联系管理员！',
								callback : function(fp, action) {
									var gridPanel = Ext.getCmp('ObCalllistGrid');
									if (gridPanel != null) {
										gridPanel.getStore().reload();
									}
									var tabs = Ext.getCmp('centerTabPanel');// 获得tab
									tabs.remove('ObCalllistFormWin');// 移除创建的窗口
									// this.close();
								}
							});
        	   	
        	   }
        }	
				
				
	}// end of save

});

ObCalllistForm.getStoreCom = function(projId) {// 注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
	Ext.Ajax.request({
				url : __ctxPath + '/outb/getObComObCallbatchAss.do?projId='
						+ projId+'&flag=3',
				method : 'post',
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);// 解析数据
					Ext.getCmp("obCom.comId_form").getStore().loadData(result);// 获取组件，加载数据
				},
				failure : function() {
				}
			});
}