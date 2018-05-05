/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ConBwListWindow
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
ConBwListWindow = Ext.extend(Ext.Window, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents(_cfg);
				ConBwListWindow.superclass.constructor.call(this, {
							id : 'ConBwListWindowWin',
							layout : 'fit',
							items : this.panel,
							modal : true,
							height : 400,
							width : 680,
							maximizable : true,
							title : '黑名单审核',
							buttonAlign : 'center',
							buttons : [{
										text : '确认',
										iconCls : 'btn-ok',
										id : 'btn-ok-t',
										scope : this,
										handler : this.ok
									}, {
										text : __cancel,
										iconCls : 'btn-cancel',
										id : 'btn-cancel-t',
										scope : this,
										handler : this.cancel
									}]
						});
				var store = Ext.getCmp('conBwListWin.all_grid').getStore();
				var recordType = store.recordType;
				var s = _cfg.grid.getSelectionModel().getSelections();// 获得选中数据
				for (var i = 0, r; r = s[i]; i++) {
					store.add(new recordType({

								bwId : s[i].get('bwId'),
								customer : s[i].get('customer'),
								bwId : s[i].get('bwId'),
								objTypId : s[i].get('objTypId'),
								statusId : s[i].get('statusId')
							})); // 添加一行空store
				}
			},// end of the constructor

			// 初始化组件
			initUIComponents : function() {

				this.oldList = new Ext.FormPanel({
							layout : 'form',
							border : false,
							labelAlign : 'right',
							height : 100,
							bodyStyle : 'padding-top:10px;',
							region : 'south',
							defaults : {
								anchor : '96%'
							},
							labelWidth : 70,
							defaultType : 'textfield',
							items : [{
										xtype : 'combo',
										mode : 'local',
										fieldLabel : '审核意见',
										anchor : '66%',
										store : []
									}, {
										xtype : 'textarea',
										height : 50,
										fieldLabel : '说明',
										anchor : '66%'
									}]
						});
				this.gridPanel = new Ext.grid.GridPanel({
							border : true,
							anchor : '96%',
							id : 'conBwListWin.all_grid',
							viewConfig : {
								forceFit : true
							},
							region : 'center',
							ds : new Ext.data.Store({
								reader : new Ext.data.ArrayReader({}, [{
													name : 'bwId',
													type : 'int'
												}, 'bwTypId', 'objTypId',
												'dirId', 'customer',
												'contactTypeId',
												'preContactNum',
												'mainContactNum',
												'lastContactNum', 'dealTypId',
												'bwTime', 'bwBusi',
												'applyReaId', 'apply',
												'applyTime', 'applyRemark',
												'checkStateId', 'statusId']),
								data : []
									// 加载的数据
								}),
							columns : [{
										header : '客户号',
										dataIndex : 'bwId'
									}, {
										header : '姓名',
										dataIndex : 'customer',
										renderer : function(value) {
											return value
													? value.customerName
													: '';
										}
									}, {
										header : '性别',
										dataIndex : 'bwId'
									}, {
										header : '客户级别',
										isExp : false,
										dataIndex : 'objTypId',
										renderer : function(value) {
											return CONJHLX.get(value);
										}
									}, {
										header : '客户来源',
										isExp : false,
										dataIndex : 'statusId',
										renderer : function(value) {
											return CONZT.get(value);
										}
									}]
						});
				this.panel = new Ext.Panel({
							anchor : '100%',
							layout : 'border',
							border : false,
							bodyStyle : 'background:white;',
							items : [this.oldList, this.gridPanel]
						})
			},// end of the initcomponents

			reset : function() {
				this.formPanel.getForm().reset();
			},
			cancel : function() {
				Ext.getCmp('ConBwListWindowWin').close();
			},
			ok : function() {
				Ext.getCmp('ConBwListWindowWin').close();
			}
		});