/**
 * @author:cf0666@gmail.com
 * @class ConWwListView
 * @extends Ext.Panel
 * @description [ConBwList]管理
 * @company 优创融联科技
 * @createtime:
 */
ConWwListView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ConWwListView.superclass.constructor.call(this, {
							id : 'ConWwListViewWin',
							title : '白名单管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['bwTypId', '禁呼类别：黑名单、白名单&CONJHLB',
								new MT.DicComboBox({
											hiddenName : 'bwTypId',
											itemKey : 'CONZT'
										})],
						['objTypId', '禁呼类型：客户、联络方式&CONJHLX',
								new MT.DicComboBox({
											hiddenName : 'objTypId',
											itemKey : 'CONZT'
										})],
						['dirId', '方向：呼入、呼出&CONFX', new MT.DicComboBox({
											hiddenName : 'dirId',
											itemKey : 'CONFX002'
										})],
						['cusId', '客户', new MT.DicComboBox({
											hiddenName : 'cusId',
											itemKey : 'CONZT'
										})],
						['contactTypeId',
								'联系方式：地址、手机、固话、Email、QQ、MSN等&LXFS001',
								new MT.DicComboBox({
											hiddenName : 'contactTypeId',
											itemKey : 'CONZT'
										})],
						['preContactNum', '区号/地区号', new Ext.form.TextField({
											name : 'preContactNum',
											allowBlank : true
										})],
						['mainContactNum', '号码/详细地址', new Ext.form.TextField({
											name : 'mainContactNum',
											allowBlank : true
										})],
						['lastContactNum', '分机号/邮编', new Ext.form.TextField({
											name : 'lastContactNum',
											allowBlank : true
										})],
						['dealTypId', '处理方式：挂机、示忙、提醒、转IVR、优先接入&CONCLFS',
								new MT.DicComboBox({
											hiddenName : 'dealTypId',
											itemKey : 'CONZT'
										})],
						['bwTime', '时间限制：不限、指定&CONSJXZ', new MT.DicComboBox({
											hiddenName : 'bwTime',
											itemKey : 'CONZT'
										})],
						['bwBusi', '业务限制：不限、指定&CONYWXZ', new MT.DicComboBox({
											hiddenName : 'bwBusi',
											itemKey : 'CONZT'
										})],
						['applyReaId', '申请原因&CONSQYY', new MT.DicComboBox({
											hiddenName : 'applyReaId',
											itemKey : 'CONZT'
										})],
						['applyId', '申请人', new MT.DicComboBox({
											hiddenName : 'applyId',
											itemKey : 'CONZT'
										})],
						['applyTime', '申请时间', new Ext.form.DateField({
											hiddenName : 'applyTime',
											format : 'Y-m-d'
										})],
						['applyRemark', '申请备注', new Ext.form.TextField({
											name : 'applyRemark',
											allowBlank : true
										})],
						['checkStateId', '审核状态：待审核、审核通过、审核不通过&CONSHZT',
								new MT.DicComboBox({
											hiddenName : 'checkStateId',
											itemKey : 'CONZT'
										})],
						['statusId', '状态&CONZT', new MT.DicComboBox({
											hiddenName : 'statusId',
											itemKey : 'CONZT'
										})]]
				var ConBwListAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[ConBwList]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ConWwListSearchPanel',
							height : 35,
							items : [{
								style:'text-align:right',
								text:'类型'
							},{
								hiddenName : 'Q_objTypId_SN_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONJHLX',
								width:80
							},{
								style:'text-align:right',
								text:'客户'
							}, {
								name : 'Q_cusPersonal.nameCn_S_LK',
								id : 'customerSearch',
								xtype : 'textfield',
								width:70
							},{
								style:'text-align:right',
								text:'状态'
							}, {
								hiddenName : 'Q_statusId_SN_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONZT',
								width:60
							}, {
								style:'text-align:right',
								width:60,
								text:'地址/号码'
							},{
								name : 'Q_mainContactNum_S_LK',
								xtype : 'textfield'
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : this.onSearch
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ConBwListAdvancedSearchWin()
											.show();
								}
							}],
							layoutConfig : {
								padding : '5',
								align : 'middle'
							},
							defaults : {
								xtype : 'label',
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

				this.topbar = new Ext.Toolbar({
							items : ['->',{
							
								text:__add,
								iconCls:'btn-add',
								scope : this,
								handler:this.createRs
							},{
								iconCls : 'btn-import',
								// text : __create+'[ConBwList]',
								text : '导入',
								xtype : 'button',
								scope : this,
								handler : function(){
										ConWwListFormDaoRu();
								}
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[ConBwList]',
								text : '注销',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					printable : false,
					exportable : false,
					id : 'ConWwListGrid',
					url : __ctxPath + "/customer/listConBwList.do?Q_bwTypId_SN_EQ=2",
					fields : [{
								name : 'bwId',
								type : 'int'
							}, 'bwTypId', 'objTypId', 'dirId', 'customer','cusPersonal',
							'contactTypeId', 'preContactNum', 'mainContactNum',
							'lastContactNum', 'dealTypId', 'bwTime', 'bwBusi',
							'applyReaId', 'apply', 'applyTime',
							'applyRemark', 'checkStateId', 'statusId'],
					columns : [{
								header : 'bwId',
								dataIndex : 'bwId',
								hidden : true
							},  {
								header : '类型',
								isExp : false,

								dataIndex : 'objTypId',
								renderer : function(value) {
									return CONJHLX.get(value);
								}
							}, {
								header : '方向',
								isExp : false,

								dataIndex : 'dirId',
								renderer : function(value) {
									return CONFX002.get(value);
								}
							}, {
								header : '客户',
								isExp : false,
								dataIndex : 'cusPersonal',
								renderer : function(value) {
									return value?value.nameCn:'';
								}
							}, {
								header : '联系方式',
								isExp : false,

								dataIndex : 'contactTypeId',
								renderer : function(value) {
									return LXFS001.get(value);
								}
							}, {
								header : '地址/号码',
								isExp : false,
								dataIndex : 'mainContactNum'
							}, {
								header : '处理方式',
								isExp : false,

								dataIndex : 'dealTypId',
								renderer : function(value) {
									return CONWWCL.get(value);
								}
							},  {
								header : '申请原因',
								isExp : false,

								dataIndex : 'applyReaId',
								renderer : function(value) {
									return CONBMDSQYY.get(value);
								}
							}, {
								header : '申请人',
								isExp : false,

								dataIndex : 'apply',
								renderer : function(value) {
									return value?value.fullname:'';
								}
							}, {
								header : '申请时间',
								isExp : false,
								dataIndex : 'applyTime'
							}, {
								header : '审核状态',
								isExp : false,

								dataIndex : 'checkStateId',
								renderer : function(value) {
									return CONSHZT.get(value);
								}
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'statusId',
								renderer : function(value) {
									return CONZT.get(value);
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 100,
										actions : [{
													iconCls : 'btn-del',
													qtip : '注销',
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-edit',
													qtip : __edit,
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});

				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			onSearch : function(obj) {
				var customerSearch = Ext.getCmp('customerSearch').getValue();
				Ext.getCmp('customerSearch').setValue(Ext.util.Format.trim(customerSearch));
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new ConWwListFormJiaRuHMD({
										bwId : rec.data.bwId,
					 					title:'白名单详细信息'
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				 new ConWwListFormJiaRuHMD({title:'添加白名单'}).show();
			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/customer/multiDelConBwList.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要注销所选记录吗？',
							msgSuccess : '成功注销该记录！',
							mstFailure : '操作出错，请联系管理员！'
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath + '/customer/multiDelConBwList.do',
							grid : this.gridPanel,
							idName : 'bwId',
							msgNull : '请选择要注销的记录！',
							msgTip : '您确认要注销所选记录吗？',
							msgSuccess : '成功注销该记录！',
							mstFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				 new ConWwListFormJiaRuHMD({
					 bwId : record.data.bwId,
					 title:'白名单详细信息'
				 }).show();
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.bwId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
