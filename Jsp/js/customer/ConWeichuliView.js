/**
 * @author:cf0666@gmail.com
 * @class ConWeichuliView
 * @extends Ext.Panel
 * @description [ConWeichuli]管理
 * @company 优创融联科技
 * @createtime:
 */
ConWeichuliView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ConWeichuliView.superclass.constructor.call(this, {
							id : 'ConWeichuliViewWin',
							title : '未处理请求',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['srcTypeId', '来源类别', new Ext.form.NumberField({
											name : 'srcTypeId',
											allowBlank : true
										})],
						['dirId', '方向', new Ext.form.NumberField({
											name : 'dirId',
											allowBlank : true
										})],
						['contactTypeId', '联系方式', new Ext.form.NumberField({
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
						['dealStaId', '处理状态', new Ext.form.NumberField({
											name : 'dealStaId',
											allowBlank : true
										})],
						['dealResId', '处理结果', new Ext.form.NumberField({
											name : 'dealResId',
											allowBlank : true
										})],
						['dealRemarks', '处理备注', new Ext.form.TextField({
											name : 'dealRemarks',
											allowBlank : true
										})]]
				var ConWeichuliAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '未处理请求高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ConWeichuliSearchPanel',
							height : 35,
							items : [{
										text : '来源类别',
										style : 'text-align:right'
									}, {
										hiddenName : 'Q_srcTypeId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONWCLQQ_LYLB',
										width : 90
									}, {
										text : '方向',
										style : 'text-align:right'
									}, {
										hiddenName : 'Q_dirId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONWCLQQ_FX',
										width : 60
									}, {

										// hiddenName : 'Q_contactTypeId_SN_EQ',
										// xtype : 'mtdiccombo',
										// editable : true,
										// lazyInit : false,
										// forceSelection : false,
										// itemKey : 'CONWCLQQ_LXFS'
										// }, {
										//
										// name : 'Q_preContactNum_S_EQ',
										// xtype : 'textfield'
										// }, {
										//
										// name : 'Q_mainContactNum_S_EQ',
										// xtype : 'textfield'
										// }, {
										//
										// name : 'Q_lastContactNum_S_EQ',
										// xtype : 'textfield'
										// }, {
										//
										// name : 'Q_content_S_EQ',
										// xtype : 'textfield'
										// }, {
										//
										// name : 'Q_creTime_D_EQ',
										// xtype : 'datefield',
										// format : 'Y-m-d'
										// }, {
										//
										// name : 'Q_synTime_D_EQ',
										// xtype : 'datefield',
										// format : 'Y-m-d'
										// }, {
										//
										// name : 'Q_assignId_N_EQ',
										// xtype : 'numberfield'
										// }, {
										//
										// name : 'Q_assignTime_D_EQ',
										// xtype : 'datefield',
										// format : 'Y-m-d'
										// }, {
										//
										// name : 'Q_ownerId_N_EQ',
										// xtype : 'numberfield'
										// }, {
										//
										// name : 'Q_acceptTime_D_EQ',
										// xtype : 'datefield',
										// format : 'Y-m-d'
										// }, {
										//
										// hiddenName : 'Q_dealStaId_SN_EQ',
										// xtype : 'mtdiccombo',
										// editable : true,
										// lazyInit : false,
										// forceSelection : false,
										// itemKey : 'CONWCLQQ_CLZT'
										// }, {
										//
										// hiddenName : 'Q_dealResId_SN_EQ',
										// xtype : 'mtdiccombo',
										// editable : true,
										// lazyInit : false,
										// forceSelection : false,
										// itemKey : 'CONWCLQQ_CLJG'
										// }, {
										//
										// name : 'Q_dealRemarks_S_EQ',
										// xtype : 'textfield'
										// }, {
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
				 var add_bt = new Ext.Button({
							iconCls : 'btn-add',
							text : '领用',
							xtype : 'button',
							scope : this,
							disabled : true,
							handler : this.createRs

						});
				var dusbin_bt = new Ext.Button({
							iconCls : 'btn-mail_move',
							text : '放入垃圾箱',
							xtype : 'button',
							scope : this,
							disabled : true,
							handler : this.moveToRubbish
						});
				var  blackChart_bt = new Ext.Button({
							iconCls : 'btn-form-design ',
							text : '加入黑名单',
							xtype : 'button',
							scope : this,
							disabled : true,
							handler : this.inJoinRs
						});
				this.topbar = new Ext.Toolbar({
							items : ['->', add_bt,dusbin_bt,blackChart_bt]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					printable : false,
					exportable : false,
					id : 'ConWeichuliGrid',
					url : __ctxPath
							+ "/customer/listConWeichuli.do?Q_dealStaId_SN_EQ=1",
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
								// }, {
							// header : '区号/地区号',
							// isExp : false,
							//
							// dataIndex : 'preContactNum'
						}	, {
								header : '号码/详细地址',
								isExp : false,

								dataIndex : 'mainContactNum'
								// }, {
							// header : '分机号/邮编',
							// isExp : false,
							//
							// dataIndex : 'lastContactNum'
						}	, {
								header : '联络内容',
								isExp : false,

								dataIndex : 'content'
							}, {
								header : '接收时间',
								isExp : false,

								dataIndex : 'creTime'
								// }, {
							// header : '同步时间',
							// isExp : false,
							//
							// dataIndex : 'synTime'
							// }, {
							// header : '分配人',
							// isExp : false,
							//
							// dataIndex : 'assignId'
							// }, {
							// header : '分配时间',
							// isExp : false,
							//
							// dataIndex : 'assignTime'
							// }, {
							// header : '负责人',
							// isExp : false,
							//
							// dataIndex : 'ownerId'
							// }, {
							// header : '领用时间',
							// isExp : false,
							//
							// dataIndex : 'acceptTime'
							// }, {
							// header : '处理状态&CONWCLQQ_CLZT',
							// isExp : false,
							//
							// dataIndex : 'dealStaId',
							// renderer : function(value) {
							// return CONWCLQQ_CLZT.get(value);
							// }
							// }, {
							// header : '处理结果&CONWCLQQ_CLJG',
							// isExp : false,
							//
							// dataIndex : 'dealResId',
							// renderer : function(value) {
							// return CONWCLQQ_CLJG.get(value);
							// }
							// }, {
							// header : '处理备注',
							// isExp : false,
							//
							// dataIndex : 'dealRemarks'
						}]
						// end of columns
				});
				this.gridPanel .getSelectionModel().on(
						'selectionchange', function(sm) {
							blackChart_bt.setDisabled(sm.getCount() < 1);
							dusbin_bt.setDisabled(sm.getCount() < 1);
							add_bt.setDisabled(sm.getCount() < 1);

						});
				// this.gridPanel.addListener('rowdblclick', this.rowClick);

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
				var rows = this.gridPanel.getSelectionModel().getSelections();
				var ids = '';
				if (rows.length == 1) {
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('CusWeichuliFormLingYongWin');
					if (aForm != null) {
						tabs.remove(aForm);
					}
					aForm = new ConWeichuliFormLingYong({
								conId : rows[0].data.conId
							});
					tabs.add(aForm);
					tabs.activate(aForm);
				} else {
					Ext.ux.Toast.msg(__toastMessage, '此操作只能选择一条记录!');
				}

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
			// 转移至垃圾箱
			moveToRubbish : function() {
				var rows = this.gridPanel.getSelectionModel().getSelections();
				var ids = '';
				var mygridpanel = 'ConWeichuliGrid';
				var lajixiangGrid = 'ConLajixiangGrid';
				if (rows != null && rows.length >= 1) {
					for (var i = 0; i < rows.length; i++) {
						if (i > 0)
							ids += ',';
						ids += rows[i].data.conId;
					}
					new ConMoveToRubbishForm({
						conId : ids,
						mygridpanel : mygridpanel,// 本身gridPanel
						lajixiangGrid : lajixiangGrid
							// 转移到目标的gridPanel
						}).show();
				} else {
					Ext.ux.Toast.msg(__toastMessage, '请选择要放入垃圾箱的记录!');
				}
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
			},
			// 加入黑名单
			inJoinRs : function() {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConWeichuliFormJiaRuHMDWin');
				if (aForm != null) {
					tabs.remove('ConWeichuliFormJiaRuHMDWin');
				}
				var ids = $getGdSelectedIds(this.gridPanel, 'conId');
				aForm = new ConWeichuliFormJiaRuHMD({
							conId : ids
						});
				tabs.add(aForm);
				tabs.activate(aForm);

			}

		});
