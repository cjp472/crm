/**
 * @author:cf0666@gmail.com
 * @class ConWeichuliView
 * @extends Ext.Panel
 * @description [ConWeichuli]管理
 * @company 优创融联科技
 * @createtime:
 */
ConLaJiXiangView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ConLaJiXiangView.superclass.constructor.call(this, {
							id : 'ConLaJiXiangViewWin',
							title : '垃圾箱',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['srcTypeId', '来源类别',
								new Ext.form.NumberField({
											name : 'srcTypeId',
											allowBlank : true
										})],
						['dirId', '方向', new Ext.form.NumberField({
											name : 'dirId',
											allowBlank : true
										})],
						['contactTypeId', '联系方式',
								new Ext.form.NumberField({
											name : 'contactTypeId',
											allowBlank : true
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
						['content', '联络内容', new Ext.form.TextField({
											name : 'content',
											allowBlank : true
										})],
						['creTime', '创建时间', new Ext.form.DateField({
											hiddenName : 'creTime',
											format : 'Y-m-d'
										})],
						['synTime', '同步时间', new Ext.form.DateField({
											hiddenName : 'synTime',
											format : 'Y-m-d'
										})],
						['assignId', '分配人', new Ext.form.NumberField({
											name : 'assignId',
											allowBlank : true
										})],
						['assignTime', '分配时间', new Ext.form.DateField({
											hiddenName : 'assignTime',
											format : 'Y-m-d'
										})],
						['ownerId', '负责人', new Ext.form.NumberField({
											name : 'ownerId',
											allowBlank : true
										})],
						['acceptTime', '领用时间', new Ext.form.DateField({
											hiddenName : 'acceptTime',
											format : 'Y-m-d'
										})],
						['dealStaId', '处理状态',
								new Ext.form.NumberField({
											name : 'dealStaId',
											allowBlank : true
										})],
						['dealResId', '处理结果',
								new Ext.form.NumberField({
											name : 'dealResId',
											allowBlank : true
										})],
						['dealRemarks', '处理备注', new Ext.form.TextField({
											name : 'dealRemarks',
											allowBlank : true
										})]]
				var ConWeichuliAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[ConWeichuli]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ConLajixiangSearchPanel',
							height : 35,
							items : [{
										text:'来源类别',
										style:'text-align:right'
									},{
										hiddenName : 'Q_srcTypeId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONWCLQQ_LYLB',
										width:90
									},{
										text:'方向',
										style:'text-align:right'
									}, {
										hiddenName : 'Q_dirId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONWCLQQ_FX',
										width:60
									}, {

//										hiddenName : 'Q_contactTypeId_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONWCLQQ_LXFS'
//									}, {
//
//										name : 'Q_preContactNum_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_mainContactNum_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_lastContactNum_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_content_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_creTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//
//										name : 'Q_synTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//
//										name : 'Q_assignId_N_EQ',
//										xtype : 'numberfield'
//									}, {
//
//										name : 'Q_assignTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//
//										name : 'Q_ownerId_N_EQ',
//										xtype : 'numberfield'
//									}, {
//
//										name : 'Q_acceptTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//
//										hiddenName : 'Q_dealStaId_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONWCLQQ_CLZT'
//									}, {
//
//										hiddenName : 'Q_dealResId_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONWCLQQ_CLJG'
//									}, {
//
//										name : 'Q_dealRemarks_S_EQ',
//										xtype : 'textfield'
//									}, {
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
											new ConWeichuliAdvancedSearchWin()
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
										iconCls : 'btn-mail_move',
										// text : __create+'[ConWeichuli]',
										text : '恢复',
										xtype : 'button',
										scope : this,
										handler : this.recoverSelRs
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[ConWeichuli]',
										text : __delete,
										xtype : 'button',
										scope : this,
										handler : this.removeSelRs
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					printable : false,
					exportable : false,
					id : 'ConLajixiangGrid',
					url : __ctxPath + "/customer/listConWeichuli.do?Q_dealStaId_SN_EQ=2",
					fields : [{
								name : 'conId',
								type : 'int'
							}, 'srcTypeId', 'dirId', 'contactTypeId',
							'preContactNum', 'mainContactNum',
							'lastContactNum', 'content', 'creTime', 'synTime',
							'assignId', 'assignTime', 'ownerId', 'acceptTime',
							'dealStaId', 'dealResId', 'dealRemarks'],
					columns : [{
								header : 'conId',
								dataIndex : 'conId',
								hidden : true
							}, {
								header : '来源类别',
								isExp : false,
								dataIndex : 'srcTypeId',
								renderer : function(value) {
									return CONWCLQQ_LYLB.get(value);
								}
							}, {
								header : '方向',
								isExp : false,
								dataIndex : 'dirId',
								renderer : function(value) {
									return CONWCLQQ_FX.get(value);
								}
							}, {
								header : '联系方式',
								isExp : false,
								dataIndex : 'contactTypeId',
								renderer : function(value) {
									return LXFS001.get(value);
								}
//							}, {
//								header : '区号/地区号',
//								isExp : false,
//
//								dataIndex : 'preContactNum'
							}, {
								header : '号码/详细地址',
								isExp : false,
								dataIndex : 'mainContactNum'
//							}, {
//								header : '分机号/邮编',
//								isExp : false,
//
//								dataIndex : 'lastContactNum'
							}, {
								header : '联络内容',
								isExp : false,
								dataIndex : 'content'
							}, {
								header : '原因',
								isExp : false,
								dataIndex : 'dealResId',
								renderer : function(value) {
									return CONLJXREASON.get(value);
								}
							}, {
								header : '接收时间',
								isExp : false,
								dataIndex : 'creTime'
//							}, {
//								header : '同步时间',
//								isExp : false,
//
//								dataIndex : 'synTime'
//							}, {
//								header : '分配人',
//								isExp : false,
//
//								dataIndex : 'assignId'
//							}, {
//								header : '分配时间',
//								isExp : false,
//
//								dataIndex : 'assignTime'
//							}, {
//								header : '负责人',
//								isExp : false,
//
//								dataIndex : 'ownerId'
//							}, {
//								header : '领用时间',
//								isExp : false,
//
//								dataIndex : 'acceptTime'
//							}, {
//								header : '处理状态&CONCLZT',
//								isExp : false,
//
//								dataIndex : 'dealStaId',
//								renderer : function(value) {
//									return CONWCLQQ_CLZT.get(value);
//								}
//							}, {
//								header : '处理结果&CONLLJG',
//								isExp : false,
//
//								dataIndex : 'dealResId',
//								renderer : function(value) {
//									return CONWCLQQ_CLJG.get(value);
//								}
//							}, {
//								header : '处理备注',
//								isExp : false,
//
//								dataIndex : 'dealRemarks'
							}]
						// end of columns
				});

//				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			onSearch : function(obj) {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new ConWeichuliForm({
										conId : rec.data.conId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new ConWeichuliForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConWeichuliForm');
				if (aForm != null) {
					tabs.remove('ConWeichuliForm');
				}
				aForm = new ConWeichuliForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath
									+ '/customer/multiDelConWeichuli.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath
									+ '/customer/multiDelConWeichuli.do',
							grid : this.gridPanel,
							idName : 'conId'
						});
			},
			//恢复
			recoverSelRs : function() {
				$gridRs({
					url : __ctxPath + '/customer/recoverConWeichuli.do',
					grid : this.gridPanel,
					idName : 'conId',
					msgNull : '请选择要恢复的记录！',
					msgTip : '您确认要恢复所选记录吗？',
					msgSuccess : '成功恢复该记录！',
					mstFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ConLajixiangGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var gridPan = Ext.getCmp('ConWeichuliGrid');
						if (gridPan != null) {
							gridPan.getStore().reload();
						}
					}
				});
			},
			// 编辑Rs
			editRs : function(record) {
				// new ConWeichuliForm({
				// conId : record.data.conId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConWeichuliForm');
				if (aForm != null) {
					tabs.remove('ConWeichuliForm');
				}
				aForm = new ConWeichuliForm({
							conId : record.data.conId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.conId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
