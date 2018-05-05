/**
 * @author:cf0666@gmail.com
 * @class ObFeeRuleView
 * @extends Ext.Panel
 * @description [ObFeeRule]管理
 * @company 优创融联科技
 * @createtime:
 */
ObFeeRuleView = Ext
		.extend(
				Ext.Panel,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 初始化组件
						this.initUIComponents();
						// 调用父类构造
						ObFeeRuleView.superclass.constructor.call(this, {
							id : 'ObFeeRuleViewWin',
							title : '[ObFeeRule]管理',
							region : 'center',
							layout : 'border',
							items : [ this.searchPanel, this.gridPanel ]
						});
					},// end of constructor
					// 初始化组件
					initUIComponents : function() {
						var fieldnameComboData = [
								[
										'feeIndexProjectId',
										'内码',
										new Ext.form.ComboBox(
												{
													editabel : false,
													lazyInit : false,
													triggerAction : 'all',
													store : new Ext.data.SimpleStore(
															{
																autoLoad : true,
																url : __ctxPath + '/fee/listfeeIndexProjectId.do',
																fields : [
																		'feeIndexProjectId',
																		'feeIndexProjectIdName' ]
															}),
													displayField : 'feeIndexProjectIdName',
													valueField : 'feeIndexProjectId',
													id : 'feeIndexProjectId'
												}) ],
								[ 'ruleName', '规则名', new Ext.form.TextField( {
									name : 'ruleName',
									allowBlank : true
								}) ],
								[ 'effectiveTime', '有效时间',
										new Ext.form.DateField( {
											hiddenName : 'effectiveTime',
											format : 'Y-m-d'
										}) ],
								[ 'failureTime', '失效时间',
										new Ext.form.DateField( {
											hiddenName : 'failureTime',
											format : 'Y-m-d'
										}) ],
								[ 'calculationWay', '计算方式',
										new Ext.form.NumberField( {
											name : 'calculationWay',
											allowBlank : true
										}) ],
								[ 'calculationMethod', '计算方法',
										new Ext.form.NumberField( {
											name : 'calculationMethod',
											allowBlank : true
										}) ],
								[ 'createBy', '创建人', new Ext.form.NumberField( {
									name : 'createBy',
									allowBlank : true
								}) ],
								[ 'updateBy', '修改人', new Ext.form.NumberField( {
									name : 'updateBy',
									allowBlank : true
								}) ],
								[ 'createDate', '创建时间',
										new Ext.form.DateField( {
											hiddenName : 'createDate',
											format : 'Y-m-d'
										}) ],
								[ 'updateDate', '修改时间',
										new Ext.form.DateField( {
											hiddenName : 'updateDate',
											format : 'Y-m-d'
										}) ],
								[ 'comments', '备注', new Ext.form.TextField( {
									name : 'comments',
									allowBlank : true
								}) ],
								[ 'staId', '状态', new Ext.form.NumberField( {
									name : 'staId',
									allowBlank : true
								}) ] ]
						var ObFeeRuleAdvancedSearchWin = Ext.extend(
								MT.AdvancedSearchWin, {
									title : '[ObFeeRule]高级查询',
									fieldData : fieldnameComboData
								});
						// 初始化搜索条件Panel
						this.searchPanel = new Ext.FormPanel(
								{
									layout : 'hbox',
									region : 'north',
									id : 'ObFeeRuleSearchPanel',
									height : 35,
									items : [
											{

												hiddenName : 'Q_feeIndexProjectId_L_EQ',
												xtype : 'combo',
												editabel : false,
												lazyInit : false,
												triggerAction : 'all',
												store : new Ext.data.SimpleStore(
														{
															autoLoad : true,
															url : __ctxPath + '/fee/listfeeIndexProjectId.do',
															fields : [
																	'feeIndexProjectId',
																	'feeIndexProjectIdName' ]
														}),
												displayField : 'feeIndexProjectIdName',
												valueField : 'feeIndexProjectId',
												id : 'feeIndexProjectId'
											},
											{

												name : 'Q_ruleName_S_EQ',
												xtype : 'textfield'
											},
											{

												name : 'Q_effectiveTime_D_EQ',
												xtype : 'datefield',
												format : 'Y-m-d'
											},
											{

												name : 'Q_failureTime_D_EQ',
												xtype : 'datefield',
												format : 'Y-m-d'
											},
											{

												name : 'Q_calculationWay_SN_EQ',
												xtype : 'numberfield'
											},
											{

												name : 'Q_calculationMethod_SN_EQ',
												xtype : 'numberfield'
											},
											{

												name : 'Q_createBy_L_EQ',
												xtype : 'numberfield'
											},
											{

												name : 'Q_updateBy_L_EQ',
												xtype : 'numberfield'
											},
											{

												name : 'Q_createDate_D_EQ',
												xtype : 'datefield',
												format : 'Y-m-d'
											},
											{

												name : 'Q_updateDate_D_EQ',
												xtype : 'datefield',
												format : 'Y-m-d'
											},
											{

												name : 'Q_comments_S_EQ',
												xtype : 'textfield'
											},
											{

												name : 'Q_staId_SN_EQ',
												xtype : 'numberfield'
											},
											{
												xtype : 'button',
												text : __search,
												iconCls : 'search',
												scope : this,
												handler : this.onSearch
											},
											{
												xtype : 'button',
												text : __reset,
												scope : this,
												iconCls : 'btn-reset',
												handler : this.reset
											},
											{
												xtype : 'button',
												text : __advancedSearch,
												iconCls : 'search',
												scope : this,
												handler : function() {
													new ObFeeRuleAdvancedSearchWin()
															.show();
												}
											} ],
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

						this.topbar = new Ext.Toolbar( {
							items : [ {
								iconCls : 'btn-add',
								//text : __create+'[ObFeeRule]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								//text : __delete+'[ObFeeRule]',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							} ]
						});

						this.gridPanel = new HT.GridPanel( {
							region : 'center',
							tbar : this.topbar,
							//使用RowActions
							rowActions : true,
							printable : false,
							exportable : false,
							id : 'ObFeeRuleGrid',
							url : __ctxPath + "/fee/listObFeeRule.do",
							fields : [ {
								name : 'feeRuleId',
								type : 'int'
							}, 'obFeeRule', 'ruleName', 'effectiveTime',
									'failureTime', 'calculationWay',
									'calculationMethod', 'createBy',
									'updateBy', 'createDate', 'updateDate',
									'comments', 'staId','createByName' ],
							columns : [ {
								header : 'feeRuleId',
								dataIndex : 'feeRuleId',
								hidden : true
							},
							{
								header : 'createBy',
								dataIndex : 'createBy',
								hidden : false
							}
							, {
								header : '内码',
								isExp : false,

								dataIndex : 'feeIndexProjectId',
								renderer : function(val) {
									return val.feeIndexProjectIdName;
								}
							}, 
							{
								header : '规则名',
								isExp : false,

								dataIndex : 'ruleName'
							}, {
								header : '有效时间',
								isExp : false,

								dataIndex : 'effectiveTime'
							}, {
								header : '失效时间',
								isExp : false,

								dataIndex : 'failureTime'
							}, {
								header : '计算方式',
								isExp : false,

								dataIndex : 'calculationWay'
							}, {
								header : '计算方法',
								isExp : false,

								dataIndex : 'calculationMethod'
							}, {
								header : '创建人',
								isExp : false,

								dataIndex : 'createByName'
							}, {
								header : '修改人',
								isExp : false,

								dataIndex : 'updateBy'
							}, {
								header : '创建时间',
								isExp : false,

								dataIndex : 'createDate'
							}, {
								header : '修改时间',
								isExp : false,

								dataIndex : 'updateDate'
							}, {
								header : '备注',
								isExp : false,

								dataIndex : 'comments'
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'staId'
							}, new Ext.ux.grid.RowActions( {
								header : __action,
								width : 100,
								actions : [ {
									iconCls : 'btn-del',
									qtip : __delete,
									style : 'margin:0 3px 0 3px'
								}, {
									iconCls : 'btn-edit',
									qtip : __edit,
									style : 'margin:0 3px 0 3px'
								} ],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							}) ]
						//end of columns
								});

						this.gridPanel
								.addListener('rowdblclick', this.rowClick);

					},// end of the initComponents()
					//重置查询表单
					reset : function() {
						this.searchPanel.getForm().reset();
					},
					//按条件搜索
					onSearch : function(obj) {
						//				var searchPanel = Ext.getCmp('ObFeeRuleSearchPanel');
						//				var gridPanel = Ext.getCmp('ObFeeRuleGrid');
						//				if (searchPanel.getForm().isValid()) {
						$search( {
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
						//				}
					},
					//GridPanel行点击处理事件
					rowClick : function(grid, rowindex, e) {
						grid.getSelectionModel().each(function(rec) {
							new ObFeeRuleForm( {
								feeRuleId : rec.data.feeRuleId
							}).show();
						});
					},
					//创建记录
					createRs : function() {
						//new ObFeeRuleForm().show();
						var tabs = Ext.getCmp('centerTabPanel');
						var aForm = Ext.getCmp('ObFeeRuleForm');
						if (aForm != null) {
							tabs.remove('ObFeeRuleForm');
						}
						aForm = new ObFeeRuleForm();
						tabs.add(aForm);
						tabs.activate(aForm);

					},
					//按ID删除记录
					removeRs : function(id) {
						$postSubmit( {
							url : __ctxPath + '/fee/multiDelObFeeRule.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
					},
					//把选中ID删除
					removeSelRs : function() {
						$gridRs( {
							url : __ctxPath + '/fee/multiDelObFeeRule.do',
							grid : this.gridPanel,
							idName : 'feeRuleId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
					},
					//编辑Rs
					editRs : function(record) {
						//new ObFeeRuleForm({
						//	feeRuleId : record.data.feeRuleId
						//}).show();
						var tabs = Ext.getCmp('centerTabPanel');
						var aForm = Ext.getCmp('ObFeeRuleForm');
						if (aForm != null) {
							tabs.remove('ObFeeRuleForm');
						}
						aForm = new ObFeeRuleForm( {
							feeRuleId : record.data.feeRuleId
						});
						tabs.add(aForm);
						tabs.activate(aForm);
					},
					//行的Action
					onRowAction : function(grid, record, action, row, col) {
						switch (action) {
						case 'btn-del':
							this.removeRs.call(this, record.data.feeRuleId);
							break;
						case 'btn-edit':
							this.editRs.call(this, record);
							break;
						default:
							break;
						}
					}
				});
