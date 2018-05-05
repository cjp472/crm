/**
 * @author:cf0666@gmail.com
 * @class ScComboProductView
 * @extends Ext.Panel
 * @description [ScComboProduct]管理
 * @company 优创融联科技
 * @createtime:
 */
ScComboProductView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScComboProductView.superclass.constructor.call(this, {
							id : 'ScComboProductViewWin',
							title : '商品打包管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['comboGoodsName', '组合商品名称', new Ext.form.TextField({
											name : 'comboGoodsName',
											allowBlank : true
										})],
						['productComDesc', '组合商品描述', new Ext.form.TextField({
											name : 'productComDesc',
											allowBlank : true
										})],
						['ext1', '扩展1', new Ext.form.TextField({
											name : 'ext1',
											allowBlank : true
										})],
						['ext2', '扩展2', new Ext.form.TextField({
											name : 'ext2',
											allowBlank : true
										})],
						['ext3', '扩展3', new Ext.form.TextField({
											name : 'ext3',
											allowBlank : true
										})],
						['ext4', '扩展4', new Ext.form.TextField({
											name : 'ext4',
											allowBlank : true
										})],
						['ext5', '扩展5', new Ext.form.TextField({
											name : 'ext5',
											allowBlank : true
										})],
						['ext6', '扩展6', new Ext.form.TextField({
											name : 'ext6',
											allowBlank : true
										})],
						['ext7', '扩展7', new Ext.form.TextField({
											name : 'ext7',
											allowBlank : true
										})],
						['ext8', '扩展8', new Ext.form.TextField({
											name : 'ext8',
											allowBlank : true
										})],
						['ext9', '扩展9', new Ext.form.TextField({
											name : 'ext9',
											allowBlank : true
										})],
						['ext10', '扩展10', new Ext.form.TextField({
											name : 'ext10',
											allowBlank : true
										})],
						['ext11', '扩展11', new Ext.form.NumberField({
											name : 'ext11',
											allowBlank : true
										})],
						['ext12', '扩展12', new Ext.form.NumberField({
											name : 'ext12',
											allowBlank : true
										})],
						['ext13', '扩展13', new Ext.form.NumberField({
											name : 'ext13',
											allowBlank : true
										})],
						['ext14', '扩展14', new Ext.form.NumberField({
											name : 'ext14',
											allowBlank : true
										})],
						['ext15', '扩展15', new Ext.form.NumberField({
											name : 'ext15',
											allowBlank : true
										})],
						['ext16', '扩展16', new Ext.form.DateField({
											hiddenName : 'ext16',
											format : 'Y-m-d'
										})],
						['ext17', '扩展17', new Ext.form.DateField({
											hiddenName : 'ext17',
											format : 'Y-m-d'
										})],
						['ext18', '扩展18', new Ext.form.DateField({
											hiddenName : 'ext18',
											format : 'Y-m-d'
										})],
						['ext19', '扩展19', new Ext.form.DateField({
											hiddenName : 'ext19',
											format : 'Y-m-d'
										})],
						['ext20', '扩展20', new Ext.form.DateField({
											hiddenName : 'ext20',
											format : 'Y-m-d'
										})]]
				var ScComboProductAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '商品打包高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScComboProductSearchPanel',
							height : 35,
							items : [{
										border : false,
										width : 100,
										style : 'text-align:right',
										html : '组合商品名称：'
									}, {

										name : 'Q_comboGoodsName_S_EQ',
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
											new ScComboProductAdvancedSearchWin()
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
										iconCls : 'btn-add',
										// text : __create+'[ScComboProduct]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[ScComboProduct]',
										text : __delete,
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
					id : 'ScComboProductGrid',
					url : __ctxPath + "/supply/listScComboProduct.do",
					fields : [{
								name : 'comboGoodsId',
								type : 'int'
							}, 'comboGoodsName', 'productComDesc', 'ext1',
							'ext2', 'ext3', 'ext4', 'ext5', 'ext6', 'ext7',
							'ext8', 'ext9', 'ext10', 'ext11', 'ext12', 'ext13',
							'ext14', 'ext15', 'ext16', 'ext17', 'ext18',
							'ext19', 'ext20'],
					columns : [{
								header : 'comboGoodsId',
								dataIndex : 'comboGoodsId',
								hidden : true
							}, {
								header : '组合商品名称',
								isExp : false,
								dataIndex : 'comboGoodsName'
							}, {
								header : '组合商品描述',
								isExp : false,
								dataIndex : 'productComDesc'
							}, {
								header : '扩展1',
								isExp : false,
								hidden : true,
								dataIndex : 'ext1'
							}, {
								header : '扩展2',
								isExp : false,
								hidden : true,
								dataIndex : 'ext2'
							}, {
								header : '扩展3',
								isExp : false,
								hidden : true,
								dataIndex : 'ext3'
							}, {
								header : '扩展4',
								isExp : false,
								hidden : true,
								dataIndex : 'ext4'
							}, {
								header : '扩展5',
								isExp : false,
								hidden : true,
								dataIndex : 'ext5'
							}, {
								header : '扩展6',
								isExp : false,
								hidden : true,
								dataIndex : 'ext6'
							}, {
								header : '扩展7',
								isExp : false,
								hidden : true,
								dataIndex : 'ext7'
							}, {
								header : '扩展8',
								isExp : false,
								hidden : true,
								dataIndex : 'ext8'
							}, {
								header : '扩展9',
								isExp : false,
								hidden : true,
								dataIndex : 'ext9'
							}, {
								header : '扩展10',
								isExp : false,
								hidden : true,
								dataIndex : 'ext10'
							}, {
								header : '扩展11',
								isExp : false,
								hidden : true,
								dataIndex : 'ext11'
							}, {
								header : '扩展12',
								isExp : false,
								hidden : true,
								dataIndex : 'ext12'
							}, {
								header : '扩展13',
								isExp : false,
								hidden : true,
								dataIndex : 'ext13'
							}, {
								header : '扩展14',
								isExp : false,
								hidden : true,
								dataIndex : 'ext14'
							}, {
								header : '扩展15',
								isExp : false,
								hidden : true,
								dataIndex : 'ext15'
							}, {
								header : '扩展16',
								isExp : false,
								hidden : true,
								dataIndex : 'ext16'
							}, {
								header : '扩展17',
								isExp : false,
								hidden : true,
								dataIndex : 'ext17'
							}, {
								header : '扩展18',
								isExp : false,
								hidden : true,
								dataIndex : 'ext18'
							}, {
								header : '扩展19',
								isExp : false,
								hidden : true,
								dataIndex : 'ext19'
							}, {
								header : '扩展20',
								isExp : false,
								hidden : true,
								dataIndex : 'ext20'
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
				// var searchPanel = Ext.getCmp('ScComboProductSearchPanel');
				// var gridPanel = Ext.getCmp('ScComboProductGrid');
				// if (searchPanel.getForm().isValid()) {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
				// }
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new ScComboProductForm({
										comboGoodsId : rec.data.comboGoodsId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new ScComboProductForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScComboProductForm');
				if (aForm != null) {
					tabs.remove('ScComboProductForm');
				}
				aForm = new ScComboProductForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
			/*	$postSubmit({
							url : __ctxPath
									+ '/goods/multiDelScComboProduct.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});*/
			},
			// 把选中ID删除
			removeSelRs : function() {
				Ext.Ajax.request( {
						    url : __ctxPath + '/supply/getDingDanScBizOrderSales.do?bizOrderId='+65+"&deliveryId="+22,
							method : 'post',
							success : function(response, opts) {
								
							},
							failure : function(response, opts) {
							}
					});
//				$gridRs({
//							url : __ctxPath
//									+ '/goods/multiDelScComboProduct.do',
//							grid : this.gridPanel,
//							idName : 'comboGoodsId',
//							msgNull : '请选择要删除的记录！',
//							msgTip : '您确认要删除所选记录吗？',
//							msgSuccess : '成功删除该记录！',
//							msgFailure : '操作出错，请联系管理员！'
//						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new ScComboProductForm({
				// comboGoodsId : record.data.comboGoodsId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScComboProductForm');
				if (aForm != null) {
					tabs.remove('ScComboProductForm');
				}
				aForm = new ScComboProductForm({
							comboGoodsId : record.data.comboGoodsId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.comboGoodsId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
