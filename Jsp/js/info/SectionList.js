/**
 * @author:
 * @class SectionList
 * @extends Ext.Panel
 * @description 栏目管理
 * @company 北京优创融联科技有限公司
 * @createtime:
 */
SectionList = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				SectionList.superclass.constructor.call(this, {
							id : 'SectionList',
							title : '栏目管理',
							iconCls : 'menu-section-list',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel = new HT.SearchPanel({
							layout : 'form',
							region : 'north',
							colNums : 3,
							items : [{
										fieldLabel : '栏目名称',
										name : 'Q_sectionName_S_LK',
										flex : 1,
										xtype : 'textfield'
									},{
										fieldLabel : '创建时间',
										name : 'Q_createtime_D_EQ',
										flex : 1,
										xtype : 'datefield',
										format : 'Y-m-d'
									}, {
										fieldLabel : '栏目类型',
										name : 'Q_sectionType_SN_EQ',
										flex : 1,
										xtype : 'numberfield'
									}, {
										fieldLabel : '创建人',
										name : 'Q_username_S_LK',
										flex : 1,
										xtype : 'textfield'
									},{
										fieldLabel : '栏目状态',
										name : 'Q_status_SN_EQ',
										flex : 1,
										xtype : 'numberfield'
									}],
							buttons : [{
										text : '查询',
										scope : this,
										iconCls : 'btn-search',
										handler : this.search
									}, {
										text : '重置',
										scope : this,
										iconCls : 'btn-reset',
										handler : this.reset
									}]
						});// end of searchPanel

				this.topbar = new Ext.Toolbar({
							items : [{
										iconCls : 'btn-add',
										text : '添加栏目',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										text : '删除栏目',
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
					id : 'SectionGrid',
					url : __ctxPath + "/info/listSection.do",
					fields : [{
								name : 'sectionId',
								type : 'int'
							}, 'sectionName', 'sectionDesc', 'createtime',
							'sectionType', 'username', 'userId', 'colNumber',
							'rowNumber', 'status'],
					columns : [{
								header : 'sectionId',
								dataIndex : 'sectionId',
								hidden : true
							}, {
								header : '栏目名称',
								dataIndex : 'sectionName'
							}, {
								header : '栏目描述',
								dataIndex : 'sectionDesc'
							}, {
								header : '创建时间',
								dataIndex : 'createtime'
							}, {
								header : '栏目类型',
								dataIndex : 'sectionType',
								renderer : function(value){
									if(value !=null){
										if(value ==1){
											return '<font color="green">一般栏目</font>';
										}else if(value == 2){
											return '<font color="green">桌面新闻</font>';
										}else if(value == 3){
											return '<font color="green">滚动公告</font>';
										}
									}else{
										return '';
									}
								}
							}, {
								header : '创建人',
								dataIndex : 'username'
							}, {
								header : '所在列',
								dataIndex : 'colNumber'
							}, {
								header : '所在行',
								dataIndex : 'rowNumber'
							}, {
								header : '状态',
								dataIndex : 'status',
								renderer : function(value){
									if(value !=null && value ==1){
										return '<font color="green">激活</font>';
									}else{
										return '<font color="red">可用</font>';
									}
								}
							}, new Ext.ux.grid.RowActions({
										header : '管理',
										width : 100,
										actions : [{
													iconCls : 'btn-del',
													qtip : '删除',
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-edit',
													qtip : '编辑',
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
			search : function() {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new SectionForm({
										sectionId : rec.data.sectionId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				new SectionForm().show();
			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/info/multiDelSection.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/info/multiDelSection.do',
							grid : this.gridPanel,
							idName : 'sectionId'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				new SectionForm({
							sectionId : record.data.sectionId
						}).show();
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.sectionId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
