/**
 * @author:cf0666@gmail.com
 * @class ConBwListView
 * @extends Ext.Panel
 * @description [ConBwList]管理
 * @company 优创融联科技
 * @createtime:
 */
ConBwListView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ConBwListView.superclass.constructor.call(this, {
							id : 'ConBwListViewWin',
							title : '黑名单管理',
							region : 'center',
							layout : 'border',
							tbar : [this.changeBar],
							items : [this.searchPanel, this.panel]
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
								'联系方式：地址、手机、固话、Email、QQ、MSN等&CONLXLX',
								new MT.DicComboBox({
											hiddenName : 'contactTypeId',
											itemKey : 'LXFS001'
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
							// id : 'ConBwListSearchPanel',
							height : 35,
							items : [{
										style : 'text-align:right',
										text : '黑名单类型'
									}, {
										hiddenName : 'Q_objTypId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONJHLX',
										width : 80
									}, {
										style : 'text-align:right',
										text : '客户号'
									}, {
										name : 'Q_customer.customerNo_S_LK',
										id : 'customerBwSearch',
										xtype : 'textfield',
										width : 70
//									}, {
//										style : 'text-align:right',
//										text : '状态'
//									}, {
//										hiddenName : 'Q_statusId_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONZT',
//										width : 60
									}, {
										style : 'text-align:right',
										width : 60,
										text : '地址/号码'
									}, {
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
									},{
										name : 'searchPanelHidden',
										id : 'ConBwList.searchPanelHidden',
										xtype : 'hidden',
										value : 'ConBwListGrid2'
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

//				this.topbar = new Ext.Toolbar({
//							items : ['->', {
//										iconCls : 'btn-import',
//										// text : __create+'[ConBwList]',
//										text : '导入',
//										xtype : 'button',
//										scope : this,
//										handler : function() {
//											new ConBwListFormDaoRu();
//										}
//									}, {
//										iconCls : 'btn-update',
//										text : '审核',
//										xtype : 'button',
//										scope : this,
//										handler : this.AuditRs
//									}
//							// ,
//							// {
//							// iconCls : 'btn-del',
//							// // text : __delete+'[ConBwList]',
//							// text : '注销',
//							// xtype : 'button',
//							// scope : this,
//							// handler : this.removeSelRs
//							// }
//							]
//						});
				this.topbar2 = new Ext.Toolbar({
							items : ['->', {
										iconCls : 'btn-del',
										text : '移除',
										xtype : 'button',
										scope : this,
										handler : this.passedRemoveRs
									}]
						});
				this.topbar3 = new Ext.Toolbar({
							items : ['->', {
										iconCls : 'btn-del',
										text : '删除',
										xtype : 'button',
										scope : this,
										handler : this.removeUnpassedRs
									}]
						});
				this.topbar4 = new Ext.Toolbar({
							items : ['->', {
										iconCls : 'btn-import',
										// text : __create+'[ConBwList]',
										text : '导入',
										xtype : 'button',
										scope : this,
										handler : function() {
											ConBwListFormDaoRu();
										}
									}, {
										iconCls : 'reset',
										text : '删除',
										xtype : 'button',
										scope : this,
										handler : function() {
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

//				this.gridPanel = new HT.GridPanel({
//					region : 'center',
//					tbar : this.topbar,
//					// 使用RowActions
//					rowActions : true,
//					printable : false,
//
//					exportable : false,
//					id : 'ConBwListGrid',
//					url : __ctxPath
//							+ "/customer/listConBwList.do?Q_bwTypId_SN_EQ=1&Q_checkStateId_SN_EQ=1",
////					baseParams : {
////						'Q_bwTypId_SN_EQ' : 1,
////						'Q_checkStateId_SN_EQ' : 1
////					},
//					fields : [{
//								name : 'bwId',
//								type : 'int'
//							}, 'bwTypId', 'objTypId', 'dirId', 'customer', 'cusInfo',
//							'contactTypeId', 'preContactNum', 'mainContactNum',
//							'lastContactNum', 'dealTypId', 'bwTime', 'bwBusi',
//							'applyReaId', 'apply', 'applyTime', 'applyRemark',
//							'checkStateId', 'statusId'],
//					columns : [{
//								header : '客户号',
//								dataIndex : 'customer',
//								renderer : function(value){
//									return value ? value.customerNo : '';
//								}
//							}, {
//								header : '客户',
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value ? value.nameCn : '';
//								}
//							}, {
//								header : '性别',
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value!=null ? XB001.get(value.gender):'';
//								}
//							}, {
//								header : '客户级别',
//								isExp : false,
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value!=null ? CONKHJB.get(value.cusGraId):'';
//								}
//							}, {
//								header : '客户来源',
//								isExp : false,
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value!=null ? CONKHLY.get(value.cusFromId):'';
//								}
//							}, {
//								header : '方向',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'dirId',
//								renderer : function(value) {
//									return CONFX002.get(value);
//								}
////							}, {
////								header : '客户',
////								isExp : false,
////								hidden : true,
////								dataIndex : 'cusInfo',
////								renderer : function(value) {
////									return value ? value.nameCn : '';
////								}
//							}, {
//								header : '联系方式',
//								isExp : false,
//								dataIndex : 'contactTypeId',
//								hidden : true,
//								renderer : function(value) {
//									return LXFS001.get(value);
//								}
//							}, {
//								header : '地址/号码',
//								isExp : false,
//								dataIndex : 'mainContactNum'
//							}, {
//								header : '处理方式',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'dealTypId',
//								renderer : function(value) {
//									return CONCLFS.get(value);
//								}
//							}, {
//								header : '类型',
//								isExp : false,
//								dataIndex : 'objTypId',
//								renderer : function(value) {
//									return CONJHLX.get(value);
//								}
//							}, {
//								header : '原因',
//								isExp : false,
//								dataIndex : 'applyReaId',
//								renderer : function(value) {
//									return CONSQYY.get(value);
//								}
//							}, {
//								header : '申请人',
//								isExp : false,
//								dataIndex : 'apply',
//								renderer : function(value) {
//									return value ? value.fullname : '';
//								}
//							}, {
//								header : '申请时间',
//								isExp : false,
//								dataIndex : 'applyTime'
//							}, {
//								header : '审核状态',
//								isExp : false,
////								hidden : true,
//								dataIndex : 'checkStateId',
//								renderer : function(value) {
//									return CONSHZT.get(value);
//								}
//							}, {
//								header : '状态',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'statusId',
//								renderer : function(value) {
//									return CONZT.get(value);
//								}
//							}, new Ext.ux.grid.RowActions({
//										header : __action,
//										width : 40,
//										actions : [{
//													iconCls : 'btn-readdocument',
//													qtip : '查看',
//													style : 'margin:0 3px 0 3px'
//												}],
//										listeners : {
//											scope : this,
//											'action' : this.onRowAction
//										}
//									})]
//						// end of columns
//				});
				this.gridPanel2 = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar2,
					// 使用RowActions
					bodyStyle : 'height:100%',
					rowActions : true,
					printable : false,
//					height : 440,
					exportable : false,
					id : 'ConBwListGrid2',
					url : __ctxPath
							+ "/customer/listConBwList.do?Q_bwTypId_SN_EQ=1&Q_checkStateId_SN_EQ=3&Q_statusId_SN_EQ=1",
//					baseParams : {
//						'Q_bwTypId_SN_EQ' : 1,
//						'Q_checkStateId_SN_EQ' : 2
//					},
					fields : [{
								name : 'bwId',
								type : 'int'
							}, 'bwTypId', 'objTypId', 'dirId', 'customer', 'cusInfo',
							'contactTypeId', 'preContactNum', 'mainContactNum',
							'lastContactNum', 'dealTypId', 'bwTime', 'bwBusi',
							'applyReaId', 'apply', 'applyTime', 'applyRemark',
							'checkStateId', 'statusId', 'approveTime'],
					columns : [{
								header : '客户号',
								dataIndex : 'customer',
								sortable : true,
								renderer : function(value){
									return value ? value.customerNo : '';
								}
							}, {
								header : '客户名称',
								dataIndex : 'cusInfo',
								renderer : function(value) {
									return value ? value.nameCn : '';
								}
							}, {
								header : '客户类型',
								dataIndex : 'customer',
								renderer : function(value) {
									return value ? CON_CUS_LX.get(value.cusType) : '';
								}
							}, {
								header : '客户级别',
								isExp : false,
								dataIndex : 'cusInfo',
								renderer : function(value) {
									return value!=null ? CONKHJB.get(value.cusGraId):'';
								}
							}, {
								header : '申请人',
								isExp : false,
								dataIndex : 'apply',
								renderer : function(value) {
									return value ? value.fullname : '';
								}
							}, {
								header : '申请原因',
								isExp : false,
								dataIndex : 'applyReaId',
								renderer : function(value) {
									return CONSQYY.get(value);
								}
							}, {
								header : '黑名单类型',
								isExp : false,
								dataIndex : 'objTypId',
								renderer : function(value) {
									return CONJHLX.get(value);
								}
							}, {
								header : '生效日期',
								isExp : false,
								dataIndex : 'approveTime'
//							}, {
//								header : '性别',
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value!=null ? XB001.get(value.gender):'';
//								}
//							}, {
//								header : '客户来源',
//								isExp : false,
//								dataIndex : 'statusId',
//								renderer : function(value) {
//									return CONZT.get(value);
//								}
//							},  {
//								header : '方向',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'dirId',
//								renderer : function(value) {
//									return CONFX002.get(value);
//								}
//							}, {
//								header : '联系方式',
//								isExp : false,
//								dataIndex : 'contactTypeId',
//								hidden : true,
//								renderer : function(value) {
//									return LXFS001.get(value);
//								}
//							}, {
//								header : '地址/号码',
//								isExp : false,
//								dataIndex : 'mainContactNum'
//							}, {
//								header : '处理方式',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'dealTypId',
//								renderer : function(value) {
//									return CONCLFS.get(value);
//								}
//							}, {
//								header : '申请时间',
//								isExp : false,
//								dataIndex : 'applyTime'
//							}, {
//								header : '申核人',
//								isExp : false,
//								dataIndex : 'apply',
//								renderer : function(value) {
//									return value ? value.fullname : '';
//								}
//							}, {
//								header : '申核时间',
//								isExp : false,
//								dataIndex : 'applyTime'
//							}, {
//								header : '审核状态',
//								isExp : false,
////								hidden : true,
//								dataIndex : 'checkStateId',
//								renderer : function(value) {
//									return CONSHZT.get(value);
//								}
//							}, {
//								header : '状态',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'statusId',
//								renderer : function(value) {
//									return CONZT.get(value);
//								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 40,
										actions : [{
													iconCls : 'btn-readdocument',
													qtip : '查看',
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});
				this.gridPanel3 = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar3,
					// 使用RowActions
					rowActions : true,
					printable : false,
					hidden : true,
//					height : 440,
					exportable : false,
					lazyLoad : true,
					id : 'ConBwListGrid3',
					url : __ctxPath
							+ "/customer/listConBwList.do?Q_bwTypId_SN_EQ=1&Q_checkStateId_SN_EQ=4",
//					baseParams : {
//						'Q_bwTypId_SN_EQ' : 1,
//						'Q_checkStateId_SN_EQ' : 3
//					},
					fields : [{
								name : 'bwId',
								type : 'int'
							}, 'bwTypId', 'objTypId', 'dirId', 'customer', 'cusInfo',
							'contactTypeId', 'preContactNum', 'mainContactNum',
							'lastContactNum', 'dealTypId', 'bwTime', 'bwBusi',
							'applyReaId', 'apply', 'applyTime', 'applyRemark',
							'checkStateId', 'statusId', 'approveTime', 'approveReason'],
					columns : [{
								header : '客户号',
								dataIndex : 'customer',
								sortable : true,
								renderer : function(value){
									return value ? value.customerNo : '';
								}
							}, {
								header : '客户名称',
								dataIndex : 'cusInfo',
								renderer : function(value) {
									return value ? value.nameCn : '';
								}
							}, {
								header : '客户类型',
								dataIndex : 'customer',
								renderer : function(value) {
									return value ? CON_CUS_LX.get(value.cusType) : '';
								}
							}, {
								header : '客户级别',
								isExp : false,
								dataIndex : 'cusInfo',
								renderer : function(value) {
									return value!=null ? CONKHJB.get(value.cusGraId):'';
								}
							}, {
								header : '申请人',
								isExp : false,
								dataIndex : 'apply',
								renderer : function(value) {
									return value ? value.fullname : '';
								}
							}, {
								header : '申请原因',
								isExp : false,
								dataIndex : 'applyReaId',
								renderer : function(value) {
									return CONSQYY.get(value);
								}
							}, {
								header : '黑名单类型',
								isExp : false,
								dataIndex : 'objTypId',
								renderer : function(value) {
									return CONJHLX.get(value);
								}
							}, {
								header : '审核日期',
								isExp : false,
								dataIndex : 'approveTime'
							}, {
								header : '拒绝原因',
								isExp : false,
								dataIndex : 'approveReason',
								renderer : function(value) {
									return CONSQYY.get(value);
								}
//							}, {
//								header : '性别',
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value!=null ? SEX_CD.get(value.gender):'';
//								}
//							}, {
//								header : '客户来源',
//								isExp : false,
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value!=null ? CONKHLY.get(value.cusFromId):'';
//								}
//							},  {
//								header : '方向',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'dirId',
//								renderer : function(value) {
//									return CONFX002.get(value);
//								}
//							}, {
//								header : '联系方式',
//								isExp : false,
//								dataIndex : 'contactTypeId',
//								hidden : true,
//								renderer : function(value) {
//									return LXFS001.get(value);
//								}
//							}, {
//								header : '地址/号码',
//								isExp : false,
//								dataIndex : 'mainContactNum'
//							}, {
//								header : '处理方式',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'dealTypId',
//								renderer : function(value) {
//									return CONCLFS.get(value);
//								}
//							}, {
//								header : '申请时间',
//								isExp : false,
//								dataIndex : 'applyTime'
//							}, {
//								header : '申核人',
//								isExp : false,
//								dataIndex : 'apply',
//								renderer : function(value) {
//									return value ? value.fullname : '';
//								}
//							}, {
//								header : '申核时间',
//								isExp : false,
//								dataIndex : 'applyTime'
//							}, {
//								header : '审核状态',
//								isExp : false,
////								hidden : true,
//								dataIndex : 'checkStateId',
//								renderer : function(value) {
//									return CONSHZT.get(value);
//								}
//							}, {
//								header : '状态',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'statusId',
//								renderer : function(value) {
//									return CONZT.get(value);
//								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 40,
										actions : [{
													iconCls : 'btn-readdocument',
													qtip : '查看',
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});
				this.gridPanel4 = new HT.GridPanel({
					region : 'center',
					// tbar : this.topbar4,
					// 使用RowActions
					rowActions : true,
//					height : 440,
					printable : false,
					hidden : true,
					exportable : false,
					lazyLoad : true,
					id : 'ConBwListGrid4',
					url : __ctxPath
							+ "/customer/listConBwList.do?Q_bwTypId_SN_EQ=1",
					fields : [{
								name : 'bwId',
								type : 'int'
							}, 'bwTypId', 'objTypId', 'dirId', 'customer', 'cusInfo',
							'contactTypeId', 'preContactNum', 'mainContactNum',
							'lastContactNum', 'dealTypId', 'bwTime', 'bwBusi',
							'applyReaId', 'apply', 'applyTime', 'applyRemark',
							'checkStateId', 'statusId', 'approveUser', 'approveTime'],
					columns : [{
								header : '客户号',
								dataIndex : 'customer',
								sortable : true,
								renderer : function(value){
									return value ? value.customerNo : '';
								}
							}, {
								header : '客户名称',
								dataIndex : 'cusInfo',
								renderer : function(value) {
									return value ? value.nameCn : '';
								}
							}, {
								header : '客户类型',
								dataIndex : 'customer',
								renderer : function(value) {
									return value ? CON_CUS_LX.get(value.cusType) : '';
								}
							}, {
								header : '客户级别',
								isExp : false,
								dataIndex : 'cusInfo',
								renderer : function(value) {
									return value!=null ? CONKHJB.get(value.cusGraId):'';
								}
							}, {
								header : '申请人',
								isExp : false,
								dataIndex : 'apply',
								renderer : function(value) {
									return value ? value.fullname : '';
								}
							}, {
								header : '申请原因',
								isExp : false,
								dataIndex : 'applyReaId',
								renderer : function(value) {
									return CONSQYY.get(value);
								}
							}, {
								header : '黑名单类型',
								isExp : false,
								dataIndex : 'objTypId',
								renderer : function(value) {
									return CONJHLX.get(value);
								}
							}, {
								header : '审核人',
								isExp : false,
								dataIndex : 'approveUser',
								renderer : function(value) {
									return value ? value.fullname : '';
								}
							}, {
								header : '审核日期',
								isExp : false,
								dataIndex : 'approveTime'
							}, {
								header : '状态',
								isExp : false,
								dataIndex : 'statusId',
								renderer : function(value) {
									return CONZT.get(value);
								}
//							}, {
//								header : '性别',
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value!=null ? SEX_CD.get(value.gender):'';
//								}
//							}, {
//								header : '客户来源',
//								isExp : false,
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value!=null ? CONKHLY.get(value.cusFromId):'';
//								}
//							},  {
//								header : '方向',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'dirId',
//								renderer : function(value) {
//									return CONFX002.get(value);
//								}
//							}, {
//								header : '联系方式',
//								isExp : false,
//								dataIndex : 'contactTypeId',
//								hidden : true,
//								renderer : function(value) {
//									return LXFS001.get(value);
//								}
//							}, {
//								header : '地址/号码',
//								isExp : false,
//								dataIndex : 'mainContactNum'
//							}, {
//								header : '处理方式',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'dealTypId',
//								renderer : function(value) {
//									return CONCLFS.get(value);
//								}
//							}, {
//								header : '申请时间',
//								isExp : false,
//								dataIndex : 'applyTime'
//							}, {
//								header : '申核人',
//								isExp : false,
//								dataIndex : 'apply',
//								renderer : function(value) {
//									return value ? value.fullname : '';
//								}
//							}, {
//								header : '申核时间',
//								isExp : false,
//								dataIndex : 'applyTime'
//							}, {
//								header : '审核状态',
//								isExp : false,
////								hidden : true,
//								dataIndex : 'checkStateId',
//								renderer : function(value) {
//									return CONSHZT.get(value);
//								}
//							}, {
//								header : '状态',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'statusId',
//								renderer : function(value) {
//									return CONZT.get(value);
//								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 40,
										actions : [{
													iconCls : 'btn-readdocument',
													qtip : '查看',
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});
				// this.gridPanel.addListener('rowdblclick', this.rowClick);

				this.changeBar = new Ext.ButtonGroup({
							border : false,
							id : 'mychanegBar',
							items : [{
//								iconCls : 'black_needAudit',
//								text : '待审核名单',
//								xtype : 'button',
//								scope : this,
//								enableToggle : true,
//								pressed : true,
//								toggleGroup : 'mychanegBar',
//								handler : function() {
//									Ext.getCmp('ConBwListGrid').show();
//									Ext.getCmp('ConBwListGrid2').hide();
//									Ext.getCmp('ConBwListGrid3').hide();
//									Ext.getCmp('ConBwListGrid4').hide();
//									Ext.getCmp('centerPanel').doLayout();
//									Ext.getCmp('ConBwListViewWin').doLayout();
//									Ext.getCmp('ConBwList.searchPanelHidden').setValue('ConBwListGrid');
//								}
//									// toggleHandler : this.changeBarFunction
//								}, {
								iconCls : 'black_passed',
								text : '通过名单',
								xtype : 'button',
								scope : this,
								pressed : true,
								enableToggle : true,
								toggleGroup : 'mychanegBar',
								handler : function() {
//									Ext.getCmp('ConBwListGrid').hide();
									Ext.getCmp('ConBwListGrid2').show();
									Ext.getCmp('ConBwListGrid3').hide();
									Ext.getCmp('ConBwListGrid4').hide();
									Ext.getCmp('centerPanel').doLayout();
									Ext.getCmp('ConBwListViewWin').doLayout();
									Ext.getCmp('ConBwListGrid2').doLayout();
									Ext.getCmp('ConBwList.searchPanelHidden').setValue('ConBwListGrid2');
								}
									// toggleHandler : this.changeBarFunction
								}, {
								iconCls : 'black_notPassed',
								text : '未通过名单',
								xtype : 'button',
								enableToggle : true,
								toggleGroup : 'mychanegBar',
								scope : this,
								handler : function() {
//									Ext.getCmp('ConBwListGrid').hide();
									Ext.getCmp('ConBwListGrid2').hide();
									Ext.getCmp('ConBwListGrid3').show();
									Ext.getCmp('ConBwListGrid4').hide();
									Ext.getCmp('centerPanel').doLayout();
									Ext.getCmp('ConBwListViewWin').doLayout();
									Ext.getCmp('ConBwList.searchPanelHidden').setValue('ConBwListGrid3');

								}
									// toggleHandler : this.changeBarFunction
								}, {
								iconCls : 'black_all',
								text : '全部名单',
								xtype : 'button',
								scope : this,
								enableToggle : true,
								toggleGroup : 'mychanegBar',
								handler : function() {
//									Ext.getCmp('ConBwListGrid').hide();
									Ext.getCmp('ConBwListGrid2').hide();
									Ext.getCmp('ConBwListGrid3').hide();
									Ext.getCmp('ConBwListGrid4').show();
									Ext.getCmp('centerPanel').doLayout();
									Ext.getCmp('ConBwListViewWin').doLayout();
									Ext.getCmp('ConBwList.searchPanelHidden').setValue('ConBwListGrid4');
								}
									// toggleHandler : this.changeBarFunction
								}]

						});
				this.panel = new Ext.Panel({
							id : 'centerPanel',
//							layout : 'fit',
							//新的布局方式  
							layout : {
								type : 'hbox',
								align : 'stretch',
								pack : 'start'
							},
							defaults : {
								// 子元素平均分配宽度
								flex : 1
							},
							split : true,
							frame : true,
							region : 'center',
							border : false,
							items : [this.gridPanel2, this.gridPanel3, this.gridPanel4]
						})
			},
			// 重置查询表单
			reset : function() {
				var searchFlag =  Ext.getCmp('ConBwList.searchPanelHidden').getValue();
				this.searchPanel.getForm().reset();
				Ext.getCmp('ConBwList.searchPanelHidden').setValue(searchFlag);
			},
			// 按条件搜索
			onSearch : function(obj) {
				// var searchPanel = Ext.getCmp('ConBwListSearchPanel');
				// var gridPanel = Ext.getCmp('ConBwListGrid');
				var customerSearch = Ext.getCmp('customerBwSearch').getValue();
				Ext.getCmp('customerBwSearch').setValue(Ext.util.Format
						.trim(customerSearch));
				// if (searchPanel.getForm().isValid()) {
				var searchFlag =  Ext.getCmp('ConBwList.searchPanelHidden').getValue();
				var gridPanel = Ext.getCmp(searchFlag);
				$search({
							searchPanel : this.searchPanel,
							gridPanel : gridPanel
						});
				// }
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new ConBwListForm({
										bwId : rec.data.bwId
									}).show();
						});
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
				new ConBwListShow({
							bwId : record.data.bwId,
							flag:record.data.checkStateId
						}).show();
				// var tabs = Ext.getCmp('centerTabPanel');
				// var aForm = Ext.getCmp('ConBwListFormWin');
				// if (aForm != null) {
				// tabs.remove('ConBwListFormWin');
				// }
				// aForm = new ConBwListForm(
				// record.data.bwId
				// );
				// tabs.add(aForm);
				// tabs.activate(aForm);
			},
			//审核
			AuditRs : function() {
//				var tabs = Ext.getCmp('centerTabPanel');
//				var edit = tabs.getItem('ConBwlistApproveFormWin');
//		
//				if (edit != null) {
//					tabs.remove('ConBwlistApproveFormWin');
//				}
				var rows = this.gridPanel.getSelectionModel().getSelections();
				var ids = '';
				if (rows != null && rows.length >= 1) {
					for (var i = 0; i < rows.length; i++) {
						if(i>0) ids+=',';
						ids += rows[i].data.bwId;
					}
					
					
								defId = '10221';
								name = '开始';
								var contentPanel = App.getContentPanel();
								var startForm = contentPanel
										.getItem('ProcessRunStart' + defId);

								if (!startForm) {
									startForm = new ProcessRunStart({
												id : 'ProcessRunStart' + defId,
												defId : defId,
												flowName : name,
												ids : ids,
												gridPanel : this.gridPanel
											});
									contentPanel.add(startForm);
								}
								contentPanel.activate(startForm);
					
//					edit = new ConBwlistApproveForm({
////						grid : Ext.getCmp('ConBwListGrid')
//						ids : ids
//					});
//					tabs.add(edit);
//					tabs.activate(edit);
				} else {
					Ext.ux.Toast.msg(__toastMessage, '请至少选择一条要审核的记录!');
				}
				
			},
			//移除审核通过的黑名单
			passedRemoveRs : function() {
				$gridRs({
					url : __ctxPath + '/customer/multiDelConBwList.do',
					grid : this.gridPanel2,
					idName : 'bwId',
					msgNull : '请选择要移除的记录！',
					msgTip : '您确认要移除所选记录吗？',
					msgSuccess : '成功移除该记录！',
					mstFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel2 = Ext.getCmp('ConBwListGrid2');
						if (gridPanel2 != null) {
							gridPanel2.getStore().reload();
						}
					}
				});
			},
			//删除未审核通过的数据
			removeUnpassedRs : function() {
				$gridRs({
					url : __ctxPath + '/customer/removeUnpassedConBwList.do',
					grid : this.gridPanel3,
					idName : 'bwId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					mstFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel3 = Ext.getCmp('ConBwListGrid3');
						if (gridPanel3 != null) {
							gridPanel3.getStore().reload();
						}
						var gridPanel4 = Ext.getCmp('ConBwListGrid4');
						if (gridPanel4 != null) {
							gridPanel4.getStore().reload();
						}
					}
				});
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.bwId);
						break;
					case 'btn-readdocument' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
