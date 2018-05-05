/**
 * @description 分配放弃的请求
 * @class UserSelector
 * @author 优创融联科技
 * @updater cyy
 * @createtime
 */
ConWwListFormJiaRuHMD = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConWwListFormJiaRuHMD.superclass.constructor.call(this, {
					id : 'ConWwListFormJiaRuHMDWin',
					title : _cfg.title,
					iconCls : 'menu-appuser',
					width : 800,
					minWidth : 800,
					height : 470,
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
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			id : 'ConWwListTimeRul',
			url : __ctxPath
					+ "/customer/listConBwListTimeRul.do?Q_conBwList.bwId_L_EQ="
					+ bwId,
			fields : [{
						name : 'bwListTimeRulId',
						type : 'int'
					},'staDate', 'endDate',{
						name : 'staTime',
						type : 'date',
						dateFormat:'H:i:s'
					}, {
						name : 'endTime',
						type : 'date',
						dateFormat:'H:i:s'
					}],
			columns : [{
						header : '内码',
						id : 'ConWwListForm.bwListTimeRulId',
						hidden : true,
						dataIndex : 'bwListTimeRulId'
					}, {
						header : '开始日期',
						id : 'ConWwListForm.staDate',
						dataIndex : 'staDate',
						xtype: 'datecolumn', // 使用xtype代替渲染器 use xtype instead of renderer
                        format: 'Y-m-d' ,// configuration property for Ext.grid.DateColumn
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									editable : false
								})
					}, {
						header : '开始时间',
						id : 'ConWwListForm.staTime',
						dataIndex : 'staTime',
                        editor : new Ext.grid.GridEditor(new Cls.form.DateTimeField({
									format : 'H:i:s',
									editable : false
								})),
						renderer:function(value){
							if(value instanceof Date){
								return new Date(value).format('H:i:s');
							}else{
								return value;
							}
						}
					}, {
						header : '结束日期',
						id : 'ConWwListForm.endDate',
						dataIndex : 'endDate',
						xtype: 'datecolumn',
                        format: 'Y-m-d' ,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									editable : false
								})
					}, {
						header : '结束时间',
						id : 'ConWwListForm.endTime',
						dataIndex : 'endTime',
						 editor : new Ext.grid.GridEditor(new Cls.form.DateTimeField({
									format : 'H:i:s',
									editable : false
								})),
						renderer:function(value){
							if(value instanceof Date){
								return new Date(value).format('H:i:s');
							}else{
								return value;
							}
						}
					}]
				// end of columns
		});

		this.formPanel = new Ext.FormPanel({
			// TODO panel总面板
			id : 'ConWwListForm.BMDPanel',
			region : 'center',
			layout : 'form',
			labelWidth : 70,
			labelAlign : 'right',
			style : 'padding:10px;background-color:#fff',
			border : false,
			defualts : {
				padding : '5px 0 5px 0'
			},
			plain : true,
			items : [{
						name : 'conBwList.bwId',
						xtype : 'hidden',
						value : this.bwId == null ? '' : this.bwId
					}, {
						name : 'conBwList.bwTypId',
						xtype : 'hidden',
						value : 2
					}, {
						name : 'conBwList.contactTypeId',
						xtype : 'hidden',
						value : 1
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
								id : 'conWwListFormJiaRu.objTypId_hid'
							},{
								fieldLabel : '类型',
								id : 'conWwListFormJiaRu.objTypId_form',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								allowBlank : false,
								itemKey : 'CONJHLX',
								anchor : '100%',
								listeners : {
									'select' : function(combo, record, index) {
										if (combo.getValue() == 3) {
											Ext.get('kehu').dom.style.display = 'none';
											Ext.get('lianxiren').dom.style.display = 'block';
										} else {
											Ext.get('kehu').dom.style.display = 'block';
											Ext.get('lianxiren').dom.style.display = 'none';
										}
										var fm = Ext.getCmp('conWwListFormJiaRu.objTypId_form');
										Ext.getCmp('conWwListFormJiaRu.objTypId_hid').setValue(combo.value);
									}
								}
							}, {
								layout : 'column',
								border : false,
								id : 'kehu',
								items : [{
											layout : 'form',
											border : false,
											columnWidth : .8,
											items : [{
														xtype : 'hidden',
														name : 'ConBwListShow.customer.customerId',
														id : 'conBwList.cusPersonal.customerId',
														anchor : '100%'
													}, {
														xtype : 'textfield',
														name : 'conBwList.nameCn',
														id : 'conBwList.cusPersonal.customerName',
														fieldLabel : '客户',
														readOnly : true,
														anchor : '100%'
													}]
										}, {
											columnWidth : .2,
											xtype : 'button',
											iconCls : 'btn-select',
											text : '请选择',
											handler : function() {
												CusPersonalSelector.getView(function(customerId,customerName){
													Ext.getCmp('conBwList.cusPersonal.customerId').setValue(customerId);
													Ext.getCmp('conBwList.cusPersonal.customerName').setValue(customerName);
												},true).show();
											}
										}]

							}, {
								border : false,
								id : 'lianxiren',
								style : 'display:none',
								layout : 'form',
								items : [{
											xtype : 'hidden',
											name : 'conBwList.cusLinkman.linkmanId',
											anchor : '100%'
										},{
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
										id : 'conWwListFormJiaRu.dirId_hid'
									},{
										fieldLabel : '方向',
										id : 'conWwListFormJiaRu.dirId_form',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										allowBlank : false,
										itemKey : 'CONFX002',
										anchor : '100%',
										listeners : getDicListeners('conWwListFormJiaRu.dirId_form','conWwListFormJiaRu.dirId')
									}, {
										layout : 'column',
										border : false,
										fieldLabel : '地址/号码',
										xtype : 'textfield',
										allowBlank : false,
										name : 'conBwList.mainContactNum',
										anchor : '100%'
									}]
						}]
					}, {
						fieldLabel : '备注',
						name : 'conBwList.applyRemark',
						xtype : 'textarea',
						anchor : '100%',
						allowBlank : false,
						maxLength : 120
					},{
						xtype : 'hidden',
						name : 'conBwList.applyReaId',
						id : 'conWwListForm.applyReaId_hid'
					}, {
						xtype : 'mtdiccombo',
						id : 'conWwListForm.applyReaId_form',
						anchor : '100%',
						fieldLabel : '原因',
						editable : false,
						lazyInit : true,
						forceSelection : false,
						allowBlank : false,
						itemKey : 'CONBMDSQYY',
						anchor : '30.2%',
						listeners : getDicListeners('conWwListForm.applyReaId_form','conWwListForm.applyReaId')
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
					},{
						xtype : 'hidden',
						name : 'conBwList.dealTypId',
						id : 'conWwListForm.dealTypId_hid'
					}, {
						xtype : 'mtdiccombo',
						id:'conWwListForm.dealTypId_form',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CONWWCL',
						fieldLabel : "处理方式",
						allowBlank : false,
						anchor : '30.2%',
						listeners : getDicListeners('conWwListForm.dealTypId_form','conWwListForm.dealTypId')
					}]
		});
		function getDicListeners(comId, hidName){
			return {
				select : function(cbo,record,index) {
					var fm = Ext.getCmp(comId);
					Ext.getCmp(hidName+'_hid').setValue(cbo.value);
				}
			}
		};

		// 加载表单对应的数据
		if (this.bwId != null && this.bwId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/customer/getConBwList.do?bwId=' + this.bwId,
				root : 'data',
				preName : 'conBwList',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					if(thisObj.dealTypId != null){
						Ext.getCmp('conWwListForm.dealTypId_form').setValue(thisObj.dealTypId);
					}
					Ext.getCmp('conWwListForm.applyReaId_form').setValue(thisObj.applyReaId);
					Ext.getCmp('conWwListFormJiaRu.objTypId_form').setValue(thisObj.objTypId);
					Ext.getCmp('conWwListFormJiaRu.dirId_form').setValue(thisObj.dirId);
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
	save : function() {
		var editstore = Ext.getCmp('ConWwListTimeRul').getStore();
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
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveConBwList.do',
					params : {
						details : Ext.encode(rows)
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ConWwListGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});
