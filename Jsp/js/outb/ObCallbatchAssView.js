/**
 * @author:cf0666@gmail.com
 * @class ObCallbatchAssView
 * @extends Ext.Panel
 * @description [ObCallbatchAss]管理
 * @company 优创融联科技
 * @createtime:
 */
ObCallbatchAssView = Ext
		.extend(
				Ext.Panel,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 初始化组件
						this.initUIComponents();
						// 调用父类构造
						ObCallbatchAssView.superclass.constructor.call(this, {
							id : 'ObCallbatchAssViewWin',
							title : '[ObCallbatchAss]管理',
							region : 'center',
							layout : 'border',
							items : [ this.searchPanel, this.gridPanel ]
						});
					},// end of constructor
					// 初始化组件
					initUIComponents : function() {
						var fieldnameComboData = [
								[ 'parentCallbatchAssId', '上级分配历史内码',
										new Ext.form.NumberField( {
											name : 'parentCallbatchAssId',
											allowBlank : true
										}) ],
								[
										'callbatchId',
										'名单批次内码',
										new Ext.form.ComboBox(
												{
													editabel : false,
													lazyInit : false,
													triggerAction : 'all',
													store : new Ext.data.SimpleStore(
															{
																autoLoad : true,
																url : __ctxPath + '/outb/listcallbatchId.do',
																fields : [
																		'callbatchId',
																		'callbatchIdName' ]
															}),
													displayField : 'callbatchIdName',
													valueField : 'callbatchId',
													id : 'callbatchId'
												}) ],
								[
										'calllistId',
										'名单列表内码',
										new Ext.form.ComboBox(
												{
													editabel : false,
													lazyInit : false,
													triggerAction : 'all',
													store : new Ext.data.SimpleStore(
															{
																autoLoad : true,
																url : __ctxPath + '/outb/listcalllistId.do',
																fields : [
																		'calllistId',
																		'calllistIdName' ]
															}),
													displayField : 'calllistIdName',
													valueField : 'calllistId',
													id : 'calllistId'
												}) ],
								[ 'comId', '活动内码', new Ext.form.ComboBox( {
									editabel : false,
									lazyInit : false,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore( {
										autoLoad : true,
										url : __ctxPath + '/outb/listcomId.do',
										fields : [ 'comId', 'comIdName' ]
									}),
									displayField : 'comIdName',
									valueField : 'comId',
									id : 'comId'
								}) ],
								[ 'fromUseId', '分配人内码',
										new Ext.form.NumberField( {
											name : 'fromUseId',
											allowBlank : true
										}) ],
								[
										'assStepId',
										'阶段：0-数据管理员分配、1-组长分配、2-班长分配&CONOB_CALLBATCH_ASS_JD',
										new Ext.form.NumberField( {
											name : 'assStepId',
											allowBlank : true
										}) ],
								[
										'assTypId',
										'分配方式：0=名单分配 1=名单池分配&CONOB_CALLBATCH_ASS_FPFS',
										new Ext.form.NumberField( {
											name : 'assTypId',
											allowBlank : true
										}) ],
								[ 'toUseId', '接收人内码：分配方式为名单分配必填',
										new Ext.form.NumberField( {
											name : 'toUseId',
											allowBlank : true
										}) ],
								[ 'staDat', '开始时间', new Ext.form.DateField( {
									hiddenName : 'staDat',
									format : 'Y-m-d'
								}) ],
								[ 'endDat', '结束时间', new Ext.form.DateField( {
									hiddenName : 'endDat',
									format : 'Y-m-d'
								}) ],
								[ 'assignCount', '接收分配数量，此次被上级分配到的数量',
										new Ext.form.NumberField( {
											name : 'assignCount',
											allowBlank : true
										}) ],
								[ 'retriveCount', '被回收数量',
										new Ext.form.NumberField( {
											name : 'retriveCount',
											allowBlank : true
										}) ],
								[
										'holdCount',
										'剩余数量，可分配给下级的数量。如果接收人身份为坐席，则可分配数量不可用，置为0，否则：未分配给下级时=分配数量，分配给下级后要减去分配给下级的数量，直至为0.',
										new Ext.form.NumberField( {
											name : 'holdCount',
											allowBlank : true
										}) ] ]
						var ObCallbatchAssAdvancedSearchWin = Ext.extend(
								MT.AdvancedSearchWin, {
									title : '[ObCallbatchAss]高级查询',
									fieldData : fieldnameComboData
								});
						// 初始化搜索条件Panel
						this.searchPanel = new Ext.FormPanel(
								{
									layout : 'hbox',
									region : 'north',
									id : 'ObCallbatchAssSearchPanel',
									height : 35,
									items : [
											{

												name : 'Q_parentCallbatchAssId_L_EQ',
												xtype : 'numberfield'
											},
											{

												hiddenName : 'Q_callbatchId_L_EQ',
												xtype : 'combo',
												editabel : false,
												lazyInit : false,
												triggerAction : 'all',
												store : new Ext.data.SimpleStore(
														{
															autoLoad : true,
															url : __ctxPath + '/outb/listcallbatchId.do',
															fields : [
																	'callbatchId',
																	'callbatchIdName' ]
														}),
												displayField : 'callbatchIdName',
												valueField : 'callbatchId',
												id : 'callbatchId'
											},
											{

												hiddenName : 'Q_calllistId_L_EQ',
												xtype : 'combo',
												editabel : false,
												lazyInit : false,
												triggerAction : 'all',
												store : new Ext.data.SimpleStore(
														{
															autoLoad : true,
															url : __ctxPath + '/outb/listcalllistId.do',
															fields : [
																	'calllistId',
																	'calllistIdName' ]
														}),
												displayField : 'calllistIdName',
												valueField : 'calllistId',
												id : 'calllistId'
											},
											{

												hiddenName : 'Q_comId_L_EQ',
												xtype : 'combo',
												editabel : false,
												lazyInit : false,
												triggerAction : 'all',
												store : new Ext.data.SimpleStore(
														{
															autoLoad : true,
															url : __ctxPath + '/outb/listcomId.do',
															fields : [ 'comId',
																	'comIdName' ]
														}),
												displayField : 'comIdName',
												valueField : 'comId',
												id : 'comId'
											},
											{

												name : 'Q_fromUseId_L_EQ',
												xtype : 'numberfield'
											},
											{

												hiddenName : 'Q_assStepId_SN_EQ',
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'CONOB_CALLBATCH_ASS_JD'
											},
											{

												hiddenName : 'Q_assTypId_SN_EQ',
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'CONOB_CALLBATCH_ASS_FPFS'
											},
											{

												name : 'Q_toUseId_L_EQ',
												xtype : 'numberfield'
											},
											{

												name : 'Q_staDat_D_EQ',
												xtype : 'datefield',
												format : 'Y-m-d'
											},
											{

												name : 'Q_endDat_D_EQ',
												xtype : 'datefield',
												format : 'Y-m-d'
											},
											{

												name : 'Q_assignCount_N_EQ',
												xtype : 'numberfield'
											},
											{

												name : 'Q_retriveCount_N_EQ',
												xtype : 'numberfield'
											},
											{

												name : 'Q_holdCount_N_EQ',
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
													new ObCallbatchAssAdvancedSearchWin()
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
								//text : __create+'[ObCallbatchAss]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								//text : __delete+'[ObCallbatchAss]',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							} ]
						});

						this.gridPanel = new HT.GridPanel(
								{
									region : 'center',
									tbar : this.topbar,
									//使用RowActions
									rowActions : true,
									printable : false,
									exportable : false,
									id : 'ObCallbatchAssGrid',
									url : __ctxPath
											+ "/outb/listObCallbatchAss.do",
									fields : [ {
										name : 'callbatchAssId',
										type : 'int'
									}, 'parentCallbatchAssId',
											'obCallbatchAss', 'obCallbatchAss',
											'obCallbatchAss', 'fromUseId',
											'assStepId', 'assTypId', 'toUseId',
											'staDat', 'endDat', 'assignCount',
											'retriveCount', 'holdCount' ],
									columns : [
											{
												header : 'callbatchAssId',
												dataIndex : 'callbatchAssId',
												hidden : true
											},
											{
												header : '上级分配历史内码',
												isExp : false,

												dataIndex : 'parentCallbatchAssId'
											},
											{
												header : '名单批次内码',
												isExp : false,

												dataIndex : 'callbatchId',
												renderer : function(val) {
													return val.callbatchIdName;
												}
											},
											{
												header : '名单列表内码',
												isExp : false,

												dataIndex : 'calllistId',
												renderer : function(val) {
													return val.calllistIdName;
												}
											},
											{
												header : '活动内码',
												isExp : false,

												dataIndex : 'comId',
												renderer : function(val) {
													return val.comIdName;
												}
											},
											{
												header : '分配人内码',
												isExp : false,

												dataIndex : 'fromUseId'
											},
											{
												header : '阶段：0-数据管理员分配、1-组长分配、2-班长分配&CONOB_CALLBATCH_ASS_JD',
												isExp : false,

												dataIndex : 'assStepId',
												renderer : function(value) {
													return CONOB_CALLBATCH_ASS_JD
															.get(value);
												}
											},
											{
												header : '分配方式：0=名单分配 1=名单池分配&CONOB_CALLBATCH_ASS_FPFS',
												isExp : false,

												dataIndex : 'assTypId',
												renderer : function(value) {
													return CONOB_CALLBATCH_ASS_FPFS
															.get(value);
												}
											},
											{
												header : '接收人内码：分配方式为名单分配必填',
												isExp : false,

												dataIndex : 'toUseId'
											},
											{
												header : '开始时间',
												isExp : false,

												dataIndex : 'staDat'
											},
											{
												header : '结束时间',
												isExp : false,

												dataIndex : 'endDat'
											},
											{
												header : '接收分配数量，此次被上级分配到的数量',
												isExp : false,

												dataIndex : 'assignCount'
											},
											{
												header : '被回收数量',
												isExp : false,

												dataIndex : 'retriveCount'
											},
											{
												header : '剩余数量，可分配给下级的数量。如果接收人身份为坐席，则可分配数量不可用，置为0，否则：未分配给下级时=分配数量，分配给下级后要减去分配给下级的数量，直至为0.',
												isExp : false,

												dataIndex : 'holdCount'
											},
											new Ext.ux.grid.RowActions(
													{
														header : __action,
														width : 100,
														actions : [
																{
																	iconCls : 'btn-del',
																	qtip : __delete,
																	style : 'margin:0 3px 0 3px'
																},
																{
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
						$search({
								searchPanel : this.searchPanel,
								gridPanel : this.gridPanel
							});
					},
					//GridPanel行点击处理事件
					rowClick : function(grid, rowindex, e) {
						grid.getSelectionModel().each(function(rec) {
							new ObCallbatchAssForm( {
								callbatchAssId : rec.data.callbatchAssId
							}).show();
						});
					},
					//创建记录
					createRs : function() {
						//new ObCallbatchAssForm().show();
						var tabs = Ext.getCmp('centerTabPanel');
						var aForm = Ext.getCmp('ObCallbatchAssForm');
						if (aForm != null) {
							tabs.remove('ObCallbatchAssForm');
						}
						aForm = new ObCallbatchAssForm();
						tabs.add(aForm);
						tabs.activate(aForm);

					},
					//按ID删除记录
					removeRs : function(id) {
						$postSubmit( {
							url : __ctxPath + '/outb/multiDelObCallbatchAss.do',
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
							url : __ctxPath + '/outb/multiDelObCallbatchAss.do',
							grid : this.gridPanel,
							idName : 'callbatchAssId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
					},
					//编辑Rs
					editRs : function(record) {
						//new ObCallbatchAssForm({
						//	callbatchAssId : record.data.callbatchAssId
						//}).show();
						var tabs = Ext.getCmp('centerTabPanel');
						var aForm = Ext.getCmp('ObCallbatchAssForm');
						if (aForm != null) {
							tabs.remove('ObCallbatchAssForm');
						}
						aForm = new ObCallbatchAssForm( {
							callbatchAssId : record.data.callbatchAssId
						});
						tabs.add(aForm);
						tabs.activate(aForm);
					},
					//行的Action
					onRowAction : function(grid, record, action, row, col) {
						switch (action) {
						case 'btn-del':
							this.removeRs
									.call(this, record.data.callbatchAssId);
							break;
						case 'btn-edit':
							this.editRs.call(this, record);
							break;
						default:
							break;
						}
					}
				});
