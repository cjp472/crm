/**
 * @author:cf0666@gmail.com
 * @class BeanObjectView
 * @extends Ext.Panel
 * @description [BeanObject]管理
 * @company 优创融联科技
 * @createtime:
 */
BeanObjectView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				BeanObjectView.superclass.constructor.call(this, {
							id : 'BeanObjectViewWin',
							title : '数据实体管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['beanObjectName', '数据实体名称', new Ext.form.TextField({
											name : 'beanObjectName',
											allowBlank : true
										})],
						['beanObjectName2', '数据实体', new Ext.form.TextField({
											name : 'beanObjectName2',
											allowBlank : true
										})],
						['beanObjectTname', '数据实体表名', new Ext.form.TextField({
											name : 'beanObjectTname',
											allowBlank : true
										})],
						['comment', '备注', new Ext.form.TextField({
											name : 'comment',
											allowBlank : true
										})],
						['createBy', '创建人', new Ext.form.NumberField({
											name : 'createBy',
											allowBlank : true
										})],
						['updateBy', '修改人', new Ext.form.NumberField({
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
										})]]
				var BeanObjectAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '数据实体高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'BeanObjectSearchPanel',
							height : 35,
							items : [{
										text : '数据实体名称'
									}, {
										name : 'Q_beanObjectName_S_LK',
										xtype : 'textfield'
									}, {
										text : '数据实体'
									}, {
										name : 'Q_beanObjectName2_S_LK',
										xtype : 'textfield'
									}, {
										text : '数据实体表名'
									}, {
										name : 'Q_beanObjectTname_S_LK',
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
											new BeanObjectAdvancedSearchWin()
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
							items : [{
										iconCls : 'btn-add',
										// text : __create+'[BeanObject]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[BeanObject]',
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
					id : 'BeanObjectGrid',
					url : __ctxPath + "/xitong/listBeanObject.do",
					fields : [{
								name : 'beanObjectId',
								type : 'int'
							}, 'beanObjectName', 'beanObjectName2',
							'beanObjectTname', 'comment', 'createBy',
							'updateBy', 'createDate', 'updateDate'],
					columns : [{
								header : 'beanObjectId',
								dataIndex : 'beanObjectId',
								hidden : true
							}, {
								header : '数据实体名称',
								isExp : false,
								dataIndex : 'beanObjectName'
							}, {
								header : '数据实体',
								isExp : false,
								dataIndex : 'beanObjectName2'
							}, {
								header : '数据实体表名',
								isExp : false,
								dataIndex : 'beanObjectTname'
							}, {
								header : '备注',
								isExp : false,
								dataIndex : 'comment'
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
												}, {
													iconCls : 'btn-form-design',
													qtip : '设计扩展信息',
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
							new BeanObjectForm({
										beanObjectId : rec.data.beanObjectId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new BeanObjectForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('BeanObjectForm');
				if (aForm != null) {
					tabs.remove('BeanObjectForm');
				}
				aForm = new BeanObjectForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/xitong/multiDelBeanObject.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath + '/xitong/multiDelBeanObject.do',
							grid : this.gridPanel,
							idName : 'beanObjectId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new BeanObjectForm({
				// beanObjectId : record.data.beanObjectId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('BeanObjectForm');
				if (aForm != null) {
					tabs.remove('BeanObjectForm');
				}
				aForm = new BeanObjectForm({
							beanObjectId : record.data.beanObjectId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			extendDesign : function(record){
				new BeanColumnsExtForm({
							beanObjectId : record.data.beanObjectId
						}).show();
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.beanObjectId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					case 'btn-form-design' :
						this.extendDesign.call(this, record);
						break;
					default :
						break;
				}
			}
		});
