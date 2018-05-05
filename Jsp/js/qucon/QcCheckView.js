/**
 * @author:cf0666@gmail.com
 * @class QcCheckView
 * @extends Ext.Panel
 * @description [QcCheck]管理
 * @company 优创融联科技
 * @createtime:
 */
QcCheckView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QcCheckView.superclass.constructor.call(this, {
			id : 'QcCheckViewWin',
			title : '质检查询',
			region : 'center',
			layout : 'border',
			items : [this.searchPanel, this.gridPanel]
			});
		},// end of constructor
		// 初始化组件
		initUIComponents : function() {
			var fieldnameComboData = [
				['tempReleId', '发布模板', 
				 new Ext.form.ComboBox({
					 editabel : false,
					 lazyInit : false,
					 triggerAction : 'all',
					 store : new Ext.data.SimpleStore({
						 autoLoad : true,
//						 url : __ctxPath + '/qucon/listtempReleId.do',
						 fields : ['tempReleId', 'tempReleIdName']
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
							title : '质检高级查询',
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
					html:'考核人：'
				
				}, {
					xtype : 'textfield',
					id : 'chkName',
					listeners: { 
						focus: function() {
							UserSelector.getView(function(id, name){
								Ext.getCmp('chkName').setValue(name);
								Ext.getCmp('chkId').setValue(id);
							}, true,false).show();
						} 
					}
				}, {
					border:false,
					width:70,
					style:'text-align:right',
					html:'被考核人：'
				}, {
					xtype : 'textfield',
					id : 'toName',
					listeners: { 
						focus: function() {
							UserSelector.getView(function(id, name){
								Ext.getCmp('toName').setValue(name);
								Ext.getCmp('toId').setValue(id);
							}, true,false).show();
						} 
					}
				}, {
					border:false,
					width:70,
					style:'text-align:right',
					html:'考核时间：'
				
				}, {
					name : 'Q_chkTimeSta_D_GE',
					xtype : 'datefield',
					format : 'Y-m-d'
				}, {
					border:false,
					width:20,
					style:'text-align:center',
					html:'-'
				
				}, {
					name : 'Q_chkTimeSta_D_LE',
					xtype : 'datefield',
					format : 'Y-m-d'
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
				},{
					name : 'Q_chkUseId_L_EQ',
					xtype : 'hidden',
					id : 'chkId'
				}, {
					name : 'Q_toUseId_L_EQ',
					xtype : 'hidden',
					id : 'toId'
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
//				rowActions : true,
				printable : false,
				exportable : false,
				id : 'QcCheckGrid',
				url : __ctxPath + "/qucon/listQcCheck.do",
				fields : [{
							name : 'chkId',
							type : 'int'
						}, 'qcCheck', 'chkUseId', 'toUseId', 'chkTimeSta',
						'chkTimeEnd', 'chkResult', 'chkSummary',
						'confirmResult', 'confirmRemark', 'staId', 'chkUserName', 'toUserName'],
				columns : [{
							header : 'chkId',
							dataIndex : 'chkId',
							hidden : true
						},  {
							header : '考核人',
							isExp : false,
							dataIndex : 'chkUserName'
						}, {
							header : '被考核人',
							isExp : false,
							dataIndex : 'toUserName'
						}, {
							header : '考核时间',
							isExp : false,
							dataIndex : 'chkTimeSta'
//							renderer : function(value){
//								return new Date(value).toLocaleString();
//							}
						}, {
							header : '考核完成时间',
							isExp : false,
							dataIndex : 'chkTimeEnd'
//							renderer : function(value){
//								return new Date(value).toLocaleString();
//							}
						}, {
							header : '考核分数',
							isExp : false,
							dataIndex : 'chkResult'
						}, {
							header : '是否需确认',
							isExp : false,
							dataIndex : 'confirmResult',
							renderer : function(value) {
								return YorN.get(value);
							}
						}, {
							header : '考核状态',
							isExp : false,
							dataIndex : 'staId',
							renderer : function(value) {
								return QC_KGZT.get(value);
							}
						}]// end of columns
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
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcCheckForm');
				if (aForm != null) {
					tabs.remove('QcCheckForm');
				}
				aForm = new QcCheckForm({
					chkId : rec.data.chkId
				});
				tabs.add(aForm);
				tabs.activate(aForm);
			})
		}
});
