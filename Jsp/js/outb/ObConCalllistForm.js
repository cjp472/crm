ObConCalllistForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObConCalllistForm.superclass.constructor.call(this, {
					id : 'ObConCalllistFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '营销项目抽取',
					buttonAlign : 'center',
					buttons : [
//							{
//								text : __save,
//								iconCls : 'btn-save',
//								scope : this,
//								handler : this.save
//							}, {
//								text : __reset,
//								iconCls : 'btn-reset',
//								scope : this,
//								handler : this.reset
//							}, 
								{
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
//		alert(this.staDat);
		this.gridPanel1 = new HT.GridPanel({
					scrollHeight : true,
					region : 'center',
					id : 'taaab1table',
					printable : false,
					lazyLoad : false,
					exportable : false,
					url : __ctxPath
							+ "/outb/listConCalllistByToCallbatchObConCalllist.do?toCallbatchId="
							+ this.toCallbatchId+'&staDat='+this.staDat,
					fields : [{
								name : ' cusId',
								type : 'Long'
							}, 'nameCn', 'cusCode','gender', 'credTypId', 'birthday',
							'credNum', 'customerId', 'fullname', 'ext2',
							'ext3', 'ext4', 'ext5', 'ext6'],
					columns : [
							// {
							// header : '批次名称',
							// isExp : false,
							// dataIndex : 'callbatch.callbatchNam'
							// }, {
							// header : '导入时间',
							// isExp : false,
							// dataIndex : 'callbatch.staDat'
							// },
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
							return GGZJLX.get(value);
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
					}]
				});
//		this.searchPanel1 = new Ext.FormPanel({
//					layout : 'hbox',
//					region : 'north',
//					height : 35,
//					items : [{
//								xtype : 'panel',
//								width : 50,
//								style : 'text-align:right',
//								html : '批次：'
//							}, {
//								id : 'callbatchss.callbatchNam',
//								name : 'callbatchsss.callbatchNam',
//								xtype : 'textfield'
//							}, {
//								xtype : 'button',
//								text : __search,
//								iconCls : 'search',
//								scope : this,
//								handler : this.onSearch
//							}],
//					layoutConfig : {
//						padding : '5',
//						align : 'middle'
//					},
//					defaults : {
//						border : false,
//						margins : {
//							top : 0,
//							right : 4,
//							bottom : 4,
//							left : 4
//						}
//					},
//					border : false,
//					frame : false
//				});// end of searchPanel
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
								name : 'obConCalllist.calllistId',
								xtype : 'hidden'
							}, {
								layout : 'column',
								border : false,
								xtype : 'panel',
								items : [{
											layout : 'form',
											columnWidth : .5,
											xtype : 'panel',
											border : false,
											items : [{
														fieldLabel : '抽取人',
														xtype : 'textfield',
														readOnly : true,
														name : 'obCallbatchExtract.user.fullname',
														id : 'obCallbatchExtract.user.fullname',
														anchor : '100%'
													}, {
														fieldLabel : '来源批次',
														xtype : 'textfield',
														readOnly : true,
														//name : 'obConCalllist.prosjNam',
														id : 'obCallbatchExtract.fromObCallbatch.callbatchNam',
														anchor : '100%'
													}]

										}, {
											layout : 'form',
											columnWidth : .5,
											xtype : 'panel',
											border : false,
											items : [{
														fieldLabel : '抽取时间',
														xtype : 'textfield',
														readOnly : true,
														name : 'obCallbatchExtract.staDat',
														id : 'obCallbatchExtract.staDat',
														anchor : '100%'
													}, {
														fieldLabel : '目标批次',
														xtype : 'textfield',
														readOnly : true,
														//name : 'obConCalllist.psarojNam',
														id : 'obCallbatchExtract.toObCallbatch.callbatchNam',
														anchor : '100%'
													}]

										}]
							}, {
								xtype : 'tabpanel',
								id : 'dasfsa',
								border : false,
								plain : true,
								defaultType : 'panel',
								activeTab : 0,// 激活第一个panel
								defaults : {
									anchor : '100%,100%'
								},
								items : [{
											xtype : 'panel',
											title : "抽取名单",
											border : true,
											id : 'tassb0',
											layout : 'border',
											height : 200,
											items : [this.gridPanel1, {
														xtype : 'hidden',
														id : 'tabss1hidden',
														value : true
													}]
										}]
							}]
				});
		// 加载表单对应的数据
		if (this.extractId != null && this.extractId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/outb/getObCallbatchExtract.do?extractId='
								+ this.extractId,
						root : 'data',
						preName : 'obCallbatchExtract',
						success : function(response, options) {
							var thisObj = Ext.util.JSON.decode(response.responseText).data;
//							alert(thisObj.fromObCallbatch.callbatchNam);
							Ext.getCmp('obCallbatchExtract.user.fullname').setValue(thisObj.user.fullname);
							Ext.getCmp('obCallbatchExtract.fromObCallbatch.callbatchNam').setValue(thisObj.fromObCallbatch.callbatchNam);
							Ext.getCmp('obCallbatchExtract.toObCallbatch.callbatchNam').setValue(thisObj.toObCallbatch.callbatchNam);
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
		tabs.remove('ObConCalllistFormWin');// 移除创建的窗口
	},
	// 按条件搜索
	onSearch : function(obj) {
		var psnle = this.gridPanel1;
		var store = this.gridPanel1.getStore();
		var callbatchNam = Ext.getCmp('callbatch.callbatchNam').getValue();
		if (callbatchNam == null || callbatchNam == ''
				|| callbatchNam == 'undefined')
			callbatchNam = null;
		store.proxy.conn.url = __ctxPath
				+ '/outb/listConCalllistObConCalllist.do?calllistId='
				+ this.calllistId + '&callbatchNam='
				+ encodeURIComponent(callbatchNam);
		// $search({
		// searchPanel : this.searchPanel1,
		// gridPanel : this.gridPanel1,
		// callback:function(){
		//					
		// }
		//					
		// });
		store.removeAll();
		store.load({
					callback : function() {
						psnle.getView().refresh();
					}
				});
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/outb/saveObConCalllist.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObConCalllistGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('ObConCalllistFormWin');
					}
				});
	}// end of save

});