/**
 * @author:cf0666@gmail.com
 * @class SysParaView
 * @extends Ext.Panel
 * @description [SysPara]管理
 * @company 优创融联科技
 * @createtime:
 */
SysParaView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				SysParaView.superclass.constructor.call(this, {
							id : 'SysParaViewWin',
							title : '系统参数管理',
							region : 'center',
							layout : 'border',
							items : [this.gridPanel] //[this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['sysParaName', '系统参数名称', new Ext.form.TextField({
											name : 'sysParaName',
											allowBlank : true
										})],
						['sysParaKey', '系统参数键', new Ext.form.TextField({
											name : 'sysParaKey',
											allowBlank : true
										})],
						['sysParaValue', '系统参数值', new Ext.form.TextField({
											name : 'sysParaValue',
											allowBlank : true
										})]]
				var SysParaAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin,
						{
							title : '[SysPara]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
//				this.searchPanel = new Ext.FormPanel({
//							layout : 'hbox',
//							region : 'north',
//							id : 'SysParaSearchPanel',
//							height : 35,
//							items : [{
//
//										name : 'Q_sysParaName_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_sysParaKey_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_sysParaValue_S_EQ',
//										xtype : 'textfield'
//									}, {
//										xtype : 'button',
//										text : __search,
//										iconCls : 'search',
//										scope : this,
//										handler : this.onSearch
//									}, {
//										xtype : 'button',
//										text : __reset,
//										scope : this,
//										iconCls : 'btn-reset',
//										handler : this.reset
//									}, {
//										xtype : 'button',
//										text : __advancedSearch,
//										iconCls : 'search',
//										scope : this,
//										handler : function() {
//											new SysParaAdvancedSearchWin()
//													.show();
//										}
//									}],
//							layoutConfig : {
//								padding : '5',
//								align : 'middle'
//							},
//							defaults : {
//								xtype : 'label',
//								border : false,
//								margins : {
//									top : 0,
//									right : 4,
//									bottom : 4,
//									left : 4
//								}
//							},
//							border : false,
//							frame : false
//						});// end of searchPanel

				this.topbar = new Ext.Toolbar({
							items : ['->', {
                                        iconCls : 'btn-del',
                                        //text : __delete+'[SysPara]',
                                        text : __delete,
                                        xtype : 'button',
                                        scope : this,
                                        handler : this.removeSelRs
                                    }, '->', {
										iconCls : 'btn-add',
										//text : __create+'[SysPara]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					//使用RowActions
					rowActions : true,
					printable : false,
					exportable : false,
					id : 'SysParaGrid',
					url : __ctxPath + "/infoSys/listSysPara.do",
					fields : [{
								name : 'sysParaId',
								type : 'int'
							}, 'sysParaName', 'sysParaKey', 'sysParaValue'],
					columns : [{
								header : 'sysParaId',
								dataIndex : 'sysParaId',
								hidden : true
							}, {
								header : '系统参数名称',
								isExp : false,
								dataIndex : 'sysParaName'
							}, {
								header : '系统参数键',
								isExp : false,
								dataIndex : 'sysParaKey'
							}, {
								header : '系统参数值',
								isExp : false,
								dataIndex : 'sysParaValue'
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 100,
										actions : [{
													iconCls : 'btn-del',
													qtip : __delete,
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
						//end of columns
				});

				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			//重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			onSearch : function(obj) {
				//				var searchPanel = Ext.getCmp('SysParaSearchPanel');
				//				var gridPanel = Ext.getCmp('SysParaGrid');
				//				if (searchPanel.getForm().isValid()) {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
				//				}
			},
			//GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new SysParaForm({
										sysParaId : rec.data.sysParaId
									}).show();
						});
			},
			//创建记录
			createRs : function() {
				//new SysParaForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('SysParaForm');
				if (aForm != null) {
					tabs.remove('SysParaForm');
				}
				aForm = new SysParaForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/infoSys/multiDelSysPara.do',
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
							url : __ctxPath + '/infoSys/multiDelSysPara.do',
							grid : this.gridPanel,
							idName : 'sysParaId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			//编辑Rs
			editRs : function(record) {
				//new SysParaForm({
				//	sysParaId : record.data.sysParaId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('SysParaForm');
				if (aForm != null) {
					tabs.remove('SysParaForm');
				}
				aForm = new SysParaForm({
							sysParaId : record.data.sysParaId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.sysParaId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
