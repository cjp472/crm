/**
 * @description 分配放弃的请求
 * @class UserSelector
 * @author 优创融联科技
 * @updater cyy
 * @createtime
 */
ConWeichuliFormJiaRuHMD = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConWeichuliFormJiaRuHMD.superclass.constructor.call(this, {
					id : 'ConWeichuliFormJiaRuHMDWin',
					title : '加入黑名单',
					iconCls : 'menu-appuser',
					width : 800,
					minWidth : 800,
					height : 540,
					minHeight : 470,
					layout : 'form',
					border : false,
					maximizable : true,
					resizable : true,
					modal : true,
					// items : [ this.formPanel, this.gridPanel ],
					items : this.formPanel,
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
				//加载 联系方式 地址号码
           	var store = Ext.getCmp('conBwList.all_grid').getStore();
							var recordType = store.recordType;
							var s = Ext.getCmp('ConWeichuliGrid').getSelectionModel().getSelections();// 获得选中数据
							for (var i = 0, r; r = s[i]; i++) {
								store.add(new recordType({
											contactTypeId : s[i].get('contactTypeId'),
											mainContactNum:s[i].get('mainContactNum')
										})); // 添加一行空store
							}
	},
	// BUTTON区域：
	addNewLine : function() {
		var store = this.gridPanel.getStore();
		var recordType = store.recordType;
		store.add(new recordType({})); // 添加一行空store
	},
	// 把选中ID删除
	removeSelRs : function() {
		var store = this.gridPanel.getStore();
		var sm = this.gridPanel.getSelectionModel();
		var cell = sm.getSelections();
		if (cell.length < 1) {
			Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
		} else {
			store.remove(cell);
		}
	},
	/**
	 * 组件初始化
	 * 
	 * @param isSingle
	 *            是否单选,默认单选
	 */
	initUIComponents : function() {

		this.topbar_contact = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								scope : this,
								handler : this.addNewLine
							}]
				});

		var bwId = this.bwId ? this.bwId : -1; // 主表Id
		this.gridPanel = new HT.EditorGridPanel({
			region : 'center',
			tbar : this.topbar_contact,
			height : 130,
			scrollHeight : true,
			clicksToEdit : 1,
			id : 'ConBwListTimeRul_empl',
			url : __ctxPath
					+ "/customer/listConBwListTimeRul.do?Q_conBwList.bwId_L_EQ="
					+ bwId,
			fields : [{
						name : 'bwListTimeRulId',
						type : 'int'
					},'staDate', 'staTime', 'endTime', 'endDate'],
			columns : [{
						header : '内码',
						id : 'bwListTimeRulId',
						hidden : true,
						dataIndex : 'bwListTimeRulId'
					}, {
						header : '开始日期',
						id : 'staDate',
						dataIndex : 'staDate',
						xtype: 'datecolumn', // 使用xtype代替渲染器 use xtype instead of renderer
                        format: 'Y-m-d' ,// configuration property for Ext.grid.DateColumn
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									editable : false
								})
					}, {
						header : '开始时间',
						id : 'staTime',
						dataIndex : 'staTime',
						xtype: 'datecolumn',
                        format: 'H:i:s' ,
						editor : new Cls.form.DateTimeField({
									format : 'H:i:s',
									editable : false
								})
					}, {
						header : '结束日期',
						id : 'endDate',
						dataIndex : 'endDate',
						xtype: 'datecolumn',
                        format: 'Y-m-d' ,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									editable : false
								})
					}, {
						header : '结束时间',
						id : 'endTime',
						dataIndex : 'endTime',
						xtype: 'datecolumn',
						id:'n_endTime',
                        format: 'H:i:s' ,
						editor : new Cls.form.DateTimeField({
									format : 'H:i:s',
									editable : false
								})
					}]
				// end of columns
		});

		this.formPanel = new Ext.FormPanel({
			// TODO panel总面板
			id : 'HMDPanel',
			region : 'center',
			layout : 'form',
			labelWidth : 70,
			labelAlign : 'right',
			style : 'padding:10px;background-color:#fff;',
			border : false,
			defualts : {
				padding : '5px 0 5px 0'
			},
			plain : true,
			url : __ctxPath + '/customer/saveMostConBwList.do',
			items : [{
						name : 'conBwList.bwId',
						xtype : 'hidden',
						value : this.bwId == null ? '' : this.bwId
					}, {
						name : 'conBwList.bwTypId',
						xtype : 'hidden',
						value : 1
					}, {
						name : 'conBwList.contactTypeId',
						xtype : 'hidden'
					}, {
						border : false,
						layout : 'column',
						items : [{
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [{
										xtype : 'hidden',
										name : 'conBwList.objTypId',
										id : 'conBwList.objTypId_hid',
										value : '2'
									}, {
										fieldLabel : '类型',
										id : 'conBwList.objTypId_form',
										xtype : 'textfield',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										readOnly : true,
										allowBlank : false,
										// itemKey : 'CONJHLX',
										anchor : '98%',
										value : '联系方式'
										// listeners : {
									// 'select' : function(combo, record, index)
									// {
									// if (combo.getValue() == 3) {
									// Ext.get('kehu').dom.style.display =
									// 'none';
									// Ext.get('lianxiren').dom.style.display =
									// 'block';
									// } else {
									// Ext.get('kehu').dom.style.display =
									// 'block';
									// Ext.get('lianxiren').dom.style.display =
									// 'none';
									// }
									// var fm =
									// Ext.getCmp('conBwList.objTypId_form');
									// Ext.getCmp('conBwList.objTypId_hid').setValue(combo.value);
									// }
									// }
								}	, {
										layout : 'column',
										border : false,
										id : 'kehu',
										items : [{
											layout : 'form',
											border : false,
											columnWidth : .93,
											items : [{
												xtype : 'hidden',
												name : 'conBwList.customer.customerId',
												anchor : '100%'
											}
											// {
											// xtype : 'textfield',
											// name :
											// 'conBwList.customer.customerName',
											// fieldLabel : '客户',
											// readOnly:true,
											// anchor : '100%',
											// handler:function(){
											// CustomerSelector.getView(function(customerId,customerName){
											// Ext.getCmp('customerId').setValue(customerId);
											// Ext.getCmp('customerName').setValue(customerName);
											// },true).show();
											// }
											// }

											]
										}
										// , {
										// columnWidth : .007,
										// xtype : 'button',
										// iconCls : 'search'
										// }
										]

									}, {
										border : false,
										id : 'lianxiren',
										style : 'display:none',
										layout : 'form',
										items : [{
											xtype : 'hidden',
											name : 'conBwList.cusLinkman.linkmanId',
											anchor : '100%'
										}, {
											xtype : 'textfield',
											name : 'conBwList.cusLinkman.fullname',
											fieldLabel : '联系人',
											anchor : '100%'
										}]
									}]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [{
										xtype : 'hidden',
										name : 'conBwList.dirId',
										id : 'conBwList.dirId_hid',
										value : '1'
									}, {
										fieldLabel : '方向',
										id : 'conBwList.dirId_form',
										xtype : 'textfield',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										readOnly : true,
										allowBlank : false,
										// itemKey : 'CONWCLQQ_FX',
										anchor : '98%',
										value : '呼入'
										// allowBlank:false
									// listeners :
									// getDicListeners('conBwList.dirId_form','conBwList.dirId')
								}
							// {
							// layout : 'column',
							// border : false,
							// fieldLabel : '地址/号码',
							// items : [{
							// columnWidth : .2,
							// xtype : 'textfield',
							// name : 'conBwList.preContactNum',
							// anchor : '100%',
							// readOnly:true
							// }, {
							// columnWidth : .6,
							// xtype : 'textfield',
							// name : 'conBwList.mainContactNum',
							// anchor : '100%',
							// readOnly:true
							// }, {
							// columnWidth : .2,
							// xtype : 'textfield',
							// name : 'conBwList.lastContactNum',
							// anchor : '100%',
							// readOnly:true
							// }]
							//
							// }
							]
						}]
					}, {
					  xtype:'fieldset',
					  title : "禁呼地址",
						collapsed : false,
						collapsible : true,
						autoHeight : true,
						defaults : {
							anchor : '100%,100%'
						},
						items:[new Ext.grid.GridPanel({
								border : true,
								height : 90,
								anchor : '100%',
								style:'margin-botton:6px;',
								id : 'conBwList.all_grid',
								viewConfig : {
									forceFit : true
								},
								ds : new Ext.data.Store({
									reader : new Ext.data.ArrayReader({}, [{
														name : 'conId',
														type : 'int'
													}, 'contactTypeId',
													'mainContactNum']),
									data : []
										// 加载的数据
									}),
								columns : [{
											header : 'conId',
											dataIndex : 'conId',
											hidden : true
										},{
											header : '联系方式',
											isExp : false,
											renderer : function(value) {
												return LXFS001.get(value);
											},
											width:50,
											dataIndex : 'contactTypeId'
										}, {
											header : '地址/号码',
											isExp : false,
											dataIndex : 'mainContactNum'
										}]
							})]
					},
					 {
								
						fieldLabel : '备注',
						style:'margin-top:3px;',
						name : 'conBwList.applyRemark',
						xtype : 'textarea',
						anchor : '99%',
						allowBlank : false,
						maxLength : 120
					}, {
						xtype : 'hidden',
						name : 'conBwList.applyReaId',
						id : 'conBwList.applyReaId_hid'
					}, {
						xtype : 'mtdiccombo',
						id : 'conBwList.applyReaId_form',
//						anchor : '100%',
						fieldLabel : '原因',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CONSQYY',
						anchor : '30.2%',
						allowBlank : false, 
						listeners : getDicListeners(
								'conBwList.applyReaId_form',
								'conBwList.applyReaId')
					}, {
						xtype : 'fieldset',
						title : "时间限制",
						collapsed : false,
						collapsible : true,
						autoHeight : true,
						defaults : {
							anchor : '100%,100%'
						},
						items : this.gridPanel
					}, {
						border : false,
						layout : 'column',
						items : [{
									columnWidth : .5,
									layout : 'form',
									border : false,
									items : []
								}, {
									columnWidth : .5,
									layout : 'form',
									border : false,
									items : []
								}]
					}, {
						xtype : 'hidden',
						name : 'conBwList.dealTypId',
						id : 'conBwList.dealTypId_hid'
					}, {
						xtype : 'mtdiccombo',
						id : 'conBwList.dealTypId_form',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CONCLFS',
						fieldLabel : "处理方式",
						anchor : '30.2%',
						allowBlank : false,
						listeners : getDicListeners('conBwList.dealTypId_form',
								'conBwList.dealTypId')
					}]
		});
		function getDicListeners(comId, hidName) {
			return {
				select : function(cbo, record, index) {
					var fm = Ext.getCmp(comId);
					Ext.getCmp(hidName + '_hid').setValue(cbo.value);
				}
			}
		};
        

		
		// 加载黑名单对应的数据
//		if (this.conId != null && this.conId != 'undefined') {
//
//			this.formPanel.loadData({
//				url : __ctxPath + '/customer/getForHMDConWeichuli.do?conId='
//						+ this.conId,
//				root : 'data',
//				preName : 'conBwList',
//				success : function(response, options) {
//					var thisObj = Ext.util.JSON.decode(response.responseText).data;
//					
//				},
//				failure : function() {
//					Ext.ux.Toast.msg('操作提示', '对不起，数据加载失败！');
//				}
//			});
//		}
		// 加载联络记录对应的数据
		if (this.conHisId != null && this.conHisId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/customer/getForHMDConHis.do?conHisId='
						+ this.conHisId,
				root : 'data',
				preName : 'conBwList',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					if (thisObj.dealTypId != null && thisObj.dealTypId != ''
							&& thisObj.dealTypId != 'null') {
						Ext.getCmp('conBwList.dealTypId_form')
								.setValue(thisObj.dealTypId);
					}
					if (thisObj.applyReaId != null && thisObj.applyReaId != ''
							&& thisObj.applyReaId != 'null') {
						Ext.getCmp('conBwList.applyReaId_form')
								.setValue(thisObj.applyReaId);
					}
					Ext.getCmp('conBwList.objTypId_form')
							.setValue(thisObj.objTypId);
					Ext.getCmp('conBwList.dirId_form').setValue(thisObj.dirId);
				},
				failure : function() {
					Ext.ux.Toast.msg('操作提示', '对不起，数据加载失败！');
				}
			});
		}
        		
	
	} // init

	,// end of the initcomponents

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
	/*
	save : function() {
		// 将行信息从grid中取出并放入rows变量中
		var store = this.gridPanel.getStore();
		var rows = [];// 定义数组
		for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
			rows.push(store.getAt(i).data);// 放到数组里
		}
			$postForm({
					formPanel : this.formPanel,
					
					scope : this,
					url : __ctxPath + '/customer/saveConBwList.do',
					params : {
						details : Ext.encode(rows)
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ConBwListGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});      
	},// end of save */
	
	/**
	 * 批量保存记录
	 */
	save : function() {
		var editstore = Ext.getCmp('ConBwListTimeRul_empl').getStore();
		var flagtime = true;
		editstore.each(function(record){
		    var staDate = record.get('staDate');  
			var staTime = record.get('staTime');
			var endDate = record.get('endDate');
			var endTime = record.get('endTime');
			if(staDate != null && staDate != ""){
				if(endDate == null || endDate == ""){
					Ext.ux.Toast.msg('操作提示', '开始日期与结束日期必须同时存在！');
					flagtime = false;
					return false;
					
				}
			}else if(endDate != null && endDate != ""){
				Ext.ux.Toast.msg('操作提示', '开始日期与结束日期必须同时存在！');
				flagtime = false;
				return false;
			}
		
			if(staTime != null && staTime != ""){
				if(endTime == null || endTime == ""){
					Ext.ux.Toast.msg('操作提示', '开始时间与结束时间必须同时存在！');
					flagtime = false;
					return false;
				}
			}else if(endTime != null && endTime != ""){
				Ext.ux.Toast.msg('操作提示', '开始时间与结束时间必须同时存在！');
				flagtime = false;
				return false;
			}
		});
		if(flagtime == false){
			return;
		}
		
		// 将行信息从grid中取出并放入rows变量中
		var store = this.gridPanel.getStore();
		var rows = [];// 定义数组
		for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
			if(store.getAt(i).get('staDate')!=null || store.getAt(i).get('staTime')!=null || store.getAt(i).get('endDate')!=null || store.getAt(i).get('endTime')!=null){
				// 放到数组里
				rows.push(store.getAt(i).data);
			}
			
		}
        var rootlist='' ;
		var s = Ext.getCmp('ConWeichuliGrid').getSelectionModel().getSelections();// 获得选中数据
		for (var i = 0, r; r = s[i]; i++) {
			rootlist += s[i].get('contactTypeId')+","+s[i].get('mainContactNum')+";" // 禁呼的联系方式与地址
		}
		var conform = Ext.getCmp('HMDPanel');
		conform.getForm().submit({
								params : {
									details : Ext.encode(rows),
									root: rootlist
								},
								success : function(response, o) {
										Ext.ux.Toast.msg('操作信息', '申请成功，请等待审核！');
										var tabs = Ext.getCmp('centerTabPanel');
										tabs.remove('ConWeichuliFormJiaRuHMDWin');
								},
								failure : function(form, o) {
									if (o.result.success==false) {
										Ext.ux.Toast.msg('提示信息', o.result.msg);
									}
								}
							});
		/*$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveMostConBwList.do',
					params : {
						details : Ext.encode(rows),
						root: rootlist
					},
					callback : function(fp, action) {
						var res = fp[1];
//						var res = Ext.util.JSON.decode(fp.responseText);
						if(res.success==false){
						  Ext.ux.Toast.msg('操作信息', res.msg);
						}else{
							Ext.ux.Toast.msg('操作信息', '申请成功，请等待审核！');
							var tabs = Ext.getCmp('centerTabPanel');
							var aForm = Ext.getCmp('ConWeichuliFormJiaRuHMDWin');
							if (aForm != null) {
								tabs.remove('ConWeichuliFormJiaRuHMDWin');
							}
							tabs.activate(aForm);
						}
						var gridPanel = Ext.getCmp('ConBwListGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					},failure : function(userform, o) {
						Ext.ux.Toast.msg('错误信息', o.result.msg);
					}
				}); */
	}

});
