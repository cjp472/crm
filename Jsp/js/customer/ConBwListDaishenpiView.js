/**
 * @author:cf0666@gmail.com
 * @class ConBwListDaishenpiView
 * @extends Ext.Panel
 * @description [ConBwlistApprove]管理
 * @company 优创融联科技
 * @createtime:
 */
ConBwListDaishenpiView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ConBwListDaishenpiView.superclass.constructor.call(this, {
							id : 'ConBwListDaishenpiViewWin',
							title : '待审批黑名单管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['approveTitle', '黑名单审批单头', new Ext.form.TextField({
											name : 'approveTitle',
											allowBlank : true
										})],
						['approveComment', '备注', new Ext.form.TextField({
											name : 'approveComment',
											allowBlank : true
										})],
						['bwlistStatus', '状态&CONZT',
								new Ext.form.NumberField({
											name : 'bwlistStatus',
											allowBlank : true
										})],
						['runid', 'RUNID', new Ext.form.NumberField({
											name : 'runid',
											allowBlank : true
										})],
						['createBy', '创建人', new Ext.form.TextField({
											name : 'createBy',
											allowBlank : true
										})],
						['updateBy', '修改人', new Ext.form.TextField({
											name : 'updateBy',
											allowBlank : true
										})],
						['createDate', '创建时间', new Ext.form.DateField({
											hiddenName : 'createDate',
											format : 'Y-m-d'
										})],
						['updateDate', '修改时间', new Ext.form.DateField({
											hiddenName : 'updateDate',
											format : 'Y-m-d'
										})],
						['userid', '申请人', new Ext.form.NumberField({
											name : 'userid',
											allowBlank : true
										})],
						['isDelete', '删除标记', new Ext.form.NumberField({
											name : 'isDelete',
											allowBlank : true
										})],
						['nodeName', '审批节点名称', new Ext.form.TextField({
											name : 'nodeName',
											allowBlank : true
										})],
						['approvalStatus', '审批状态', new Ext.form.TextField({
											name : 'approvalStatus',
											allowBlank : true
										})]]
				var ConBwlistApproveAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[ConBwlistApprove]高级查询',
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
										width : 60,
										text : '申请人'
									}, {
										name : 'Q_apply.fullname_S_LK',
										id : 'conBwListDaisp_fullname',
										xtype : 'textfield',
										width : 80
									}, {
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
										id : 'customerBwSearch_Daisp',
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
//									}, {
//										style : 'text-align:right',
//										width : 60,
//										text : '地址/号码'
//									}, {
//										name : 'Q_mainContactNum_S_LK',
//										xtype : 'textfield'
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
							items : ['->', {
										iconCls : 'btn-import',
										// text : __create+'[ConBwList]',
										text : '导入',
										xtype : 'button',
										scope : this,
										handler : function() {
											new ConBwListFormDaoRu();
										}
									}, '->', {
										iconCls : 'btn-excel',
										text : '下载导入模板',
										xtype : 'button',
										scope : this,
										handler : function() {
											 window.location.href('attachFiles/201207/conBwlistTemp.xls');
										}
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					printable : false,

					exportable : false,
					id : 'ConBwListDaispGrid',
					url : __ctxPath
							+ "/customer/listConBwList.do?Q_bwTypId_SN_EQ=1&Q_checkStateId_SN_EQ=1",
//					baseParams : {
//						'Q_bwTypId_SN_EQ' : 1,
//						'Q_checkStateId_SN_EQ' : 1
//					},
					fields : [{
								name : 'bwId',
								type : 'int'
							}, 'bwTypId', 'objTypId', 'dirId', 'customer', 'cusInfo',
							'contactTypeId', 'preContactNum', 'mainContactNum',
							'lastContactNum', 'dealTypId', 'bwTime', 'bwBusi',
							'applyReaId', 'apply', 'applyTime', 'applyRemark',
							'checkStateId', 'statusId'],
					columns : [{
								header : '申请人',
								isExp : false,
								dataIndex : 'apply',
								renderer : function(value) {
									return value ? value.fullname : '';
								}
//							}, {
//								header : '性别',
//								dataIndex : 'cusInfo',
//								renderer : function(value) {
//									return value!=null ? XB001.get(value.gender):'';
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
							}, {
								header : '申请时间',
								isExp : false,
								dataIndex : 'applyTime'
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
								header : '客户号',
								dataIndex : 'customer',
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
								header : '审核状态',
								isExp : false,
								hidden : true,
								dataIndex : 'checkStateId',
								renderer : function(value) {
									return CONSHZT.get(value);
								}
							}, {
								header : '状态',
								isExp : false,
								hidden : true,
								dataIndex : 'statusId',
								renderer : function(value) {
									return CONZT.get(value);
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 80,
										actions : [{
//													iconCls : 'btn-readdocument',
//													qtip : '查看',
//													style : 'margin:0 3px 0 3px'
//												},{
													iconCls : 'btn-newFlow',
													qtip : '审核',
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});

//				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			//重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			onSearch : function(obj) {
				//				var searchPanel = Ext.getCmp('ConBwlistApproveSearchPanel');
				//				var gridPanel = Ext.getCmp('ConBwlistApproveGrid');
				//				if (searchPanel.getForm().isValid()) {
				var customerSearch = Ext.getCmp('customerBwSearch_Daisp').getValue();
				Ext.getCmp('customerBwSearch_Daisp').setValue(Ext.util.Format
						.trim(customerSearch));
				var Daisp_fullname = Ext.getCmp('conBwListDaisp_fullname').getValue();
				Ext.getCmp('conBwListDaisp_fullname').setValue(Ext.util.Format
						.trim(Daisp_fullname));
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
				//				}
			},
			//GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new ConBwlistApproveForm({
										bwlistApproveId : rec.data.bwlistApproveId
									}).show();
						});
			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath
									+ '/customer/multiDelConBwlistApprove.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			//把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath
									+ '/customer/multiDelConBwlistApprove.do',
							grid : this.gridPanel,
							idName : 'bwlistApproveId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			//编辑Rs
			editRs : function(record) {
				new ConBwListShow({
						bwId : record.data.bwId,
						flag:record.data.checkStateId
					}).show();
			},
			 // 审核跟踪
			audtoRs : function(record) {
				var tabs = Ext.getCmp('centerTabPanel');
				var edit = tabs.getItem('ConBwListAudtingWin');
		
				if (edit != null) {
					tabs.remove('ConBwListAudtingWin');
				}
				edit = new ConBwListAudting({
						bwId : record.data.bwId
					});
				tabs.add(edit);
				tabs.activate(edit);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-readdocument' :
						this.editRs.call(this, record);
						break;
					case 'btn-newFlow' : 
						this.audtoRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
