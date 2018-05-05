/**
 * @author:cf0666@gmail.com
 * @class AchievementsRuleView
 * @extends Ext.Panel
 * @description [QcCheck]管理
 * @company 优创融联科技
 * @createtime:
 */
AchievementsRuleView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				AchievementsRuleView.superclass.constructor.call(this, {
							id : 'AchievementsRuleViewWin',
							title : '绩效规则管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['tempReleId', '发布模板', new Ext.form.ComboBox({
									editabel : false,
									lazyInit : false,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({
												autoLoad : true,
												url : __ctxPath
														+ '/qucon/listtempReleId.do',
												fields : ['tempReleId',
														'tempReleIdName']
											}),
									displayField : 'tempReleIdName',
									valueField : 'tempReleId',
									id : 'tempReleId'
								})],
						['chkUseId', '考核人', new MT.DicComboBox({
											hiddenName : 'chkUseId',
											itemKey : 'QC_KGZT'
										})],
						['toUseId', '被考核人', new MT.DicComboBox({
											hiddenName : 'toUseId',
											itemKey : 'QC_KGZT'
										})],
						['chkTimeSta', '考核时间', new Ext.form.DateField({
											hiddenName : 'chkTimeSta',
											format : 'Y-m-d'
										})],
						['chkTimeEnd', '考核结束时间', new Ext.form.DateField({
											hiddenName : 'chkTimeEnd',
											format : 'Y-m-d'
										})],
						['chkResult', '考核结果(分数)', new MT.DicComboBox({
											hiddenName : 'chkResult',
											itemKey : 'QC_KGZT'
										})],
						['chkSummary', '综合评价', new Ext.form.TextField({
											name : 'chkSummary',
											allowBlank : true
										})],
						['confirmResult', '确认结果:被考核人确认&YorN',
								new MT.DicComboBox({
											hiddenName : 'confirmResult',
											itemKey : 'QC_KGZT'
										})],
						['confirmRemark', '确认备注', new Ext.form.TextField({
											name : 'confirmRemark',
											allowBlank : true
										})],
						['staId', '考核状态&QC_KGZT', new MT.DicComboBox({
											hiddenName : 'staId',
											itemKey : 'QC_KGZT'
										})]]
				var QcCheckAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin,
						{
							title : '质检辅导高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcCheckSearchPanel',
							height : 35,
							items : [{
								border:false,
								width:70,
								style:'text-align:right',
								html:'名称：'
							
							},{

								name : 'Q_chkTimeSta_D_EQ',
								xtype : 'textfield'
							},{
								border:false,
								width:70,
								style:'text-align:right',
								html:'周期：'
							
							}, {

								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '周'], ['0', '月']]
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
									new QcCheckAdvancedSearchWin().show();
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

				
				this.gridPanel = new HT.GridPanel({
					region : 'center',
					// 使用RowActions
					rowActions : true,
					tbar:['->',{
						text:'增加',
						iconCls:'btn-add',
						handler:function(){
							var tabs = Ext.getCmp('centerTabPanel');
							var aForm = Ext.getCmp('AchievementsRuleForm');
							if (aForm != null) {
								tabs.remove('AchievementsRuleForm');
							}
							aForm = new AchievementsRuleForm();
							tabs.add(aForm);
							tabs.activate(aForm);
						}
					},{
						text:'发布',
						iconCls:'btn-operation',
						handler:function(){
							
						}
					},{
						text:'注销',
						iconCls:'btn-cancel',
						handler:function(){
							
						}
					}],
					printable : false,
					exportable : false,
					id : 'QcCheckGrid',
					/*tbar:[{
						text:'辅导',
						handler:function(){
							var tabs = Ext.getCmp('centerTabPanel');
							var aForm = Ext.getCmp('QcHelpFuDaoForm');
							if (aForm != null) {
								tabs.remove('QcHelpFuDaoForm');
							}
							aForm = new QcHelpFuDaoForm();
							tabs.add(aForm);
							tabs.activate(aForm);
						}
					}],*/
					url : __ctxPath + "/qucon/listQcCheck.do",
					fields : [{
								name : 'chkId',
								type : 'int'
							}, 'qcCheck', 'chkUseId', 'toUseId', 'chkTimeSta',
							'chkTimeEnd', 'chkResult', 'chkSummary',
							'confirmResult', 'confirmRemark', 'staId'],
					columns : [{
								header : 'chkId',
								dataIndex : 'chkId',
								hidden : true
							},  {
								header : '名称',
								isExp : false,

								dataIndex : 'chkUseId'
							}, {
								header : '周期',
								isExp : false,

								dataIndex : 'toUseId'
							}, {
								header : '开始时间',
								isExp : false,

								dataIndex : 'chkTimeSta'
							}, {
								header : '失效时间',
								isExp : false,

								dataIndex : 'chkTimeEnd'
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'chkResult'
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 100,
										actions : [ {
													iconCls : 'btn-edit',
													qtip : '编辑',
													style : 'margin:0 3px 0 3px'
												},{
													iconCls : 'btn-cancel',
													qtip : '删除',
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
				$search({
						searchPanel : this.searchPanel,
						gridPanel : this.gridPanel
					});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new QcCheckForm({
										chkId : rec.data.chkId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new QcCheckForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcCheckForm');
				if (aForm != null) {
					tabs.remove('QcCheckForm');
				}
				aForm = new QcCheckForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/qucon/multiDelQcCheck.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/qucon/multiDelQcCheck.do',
							grid : this.gridPanel,
							idName : 'chkId'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new QcCheckForm({
				// chkId : record.data.chkId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcCheckForm');
				if (aForm != null) {
					tabs.remove('QcCheckForm');
				}
				aForm = new QcCheckForm({
							chkId : record.data.chkId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.chkId);
						break;
					case 'btn-edit' :{
							var tabs = Ext.getCmp('centerTabPanel');
							var aForm = Ext.getCmp('AchievementsRuleForm');
							if (aForm != null) {
								tabs.remove('AchievementsRuleForm');
							}
							aForm = new AchievementsRuleForm();
							tabs.add(aForm);
							tabs.activate(aForm);
							break;
						}
					default :
						break;
				}
			}
		});
