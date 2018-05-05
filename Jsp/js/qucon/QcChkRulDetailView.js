/**
 * @author:cf0666@gmail.com
 * @class QcChkRulDetailView
 * @extends Ext.Panel
 * @description [QcChkRulDetail]管理
 * @company 优创融联科技
 * @createtime:
 */
QcChkRulDetailView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcChkRulDetailView.superclass.constructor.call(this, {
							id : 'QcChkRulDetailViewWin',
							title : '[QcChkRulDetail]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'chkRulId',
											'考核规则内码',
																																																					new Ext.form.NumberField({name : 'chkRulId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'typId',
											'方式:按百分比、指定个数',
																																																					new Ext.form.NumberField({name : 'typId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'val',
											'值',
																								new Ext.form.TextField({name : 'val',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'valSta',
											'条件开始值',
																								new Ext.form.TextField({name : 'valSta',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'valEnd',
											'条件结束值',
																								new Ext.form.TextField({name : 'valEnd',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'rulStaId',
											'规则状态',
																																																					new Ext.form.NumberField({name : 'rulStaId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var QcChkRulDetailAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcChkRulDetail]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcChkRulDetailSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_chkRulId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_typId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_val_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_valSta_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_valEnd_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_rulStaId_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																			 								 							 																, {
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
									},{
										xtype : 'button',
										text : __advancedSearch,
										iconCls : 'search',
										scope : this,
										handler :function(){ new QcChkRulDetailAdvancedSearchWin().show();}
									}
								],
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
									//text : __create+'[QcChkRulDetail]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcChkRulDetail]',
									text : __delete,
									xtype : 'button',
									scope:this,
									handler : this.removeSelRs
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					tbar:this.topbar,
					//使用RowActions
					rowActions:true,
					printable : false,
					exportable : false,
					id:'QcChkRulDetailGrid',
					url : __ctxPath + "/qucon/listQcChkRulDetail.do",
					fields : [{
									name : 'detailId',
									type : 'int'
								}
																																																																			,'chkRulId'
																																																																								,'typId'
																																																																								,'val'
																																																																								,'valSta'
																																																																								,'valEnd'
																																																																								,'rulStaId'
																																																],
					columns:[
								{
									header : 'detailId',
									dataIndex : 'detailId',
									hidden : true
								}
																																																								,{
																	header : '考核规则内码',
																isExp : false,
																
																	dataIndex : 'chkRulId'
																}
																																																,{
																	header : '方式:按百分比、指定个数',
																isExp : false,
																
																	dataIndex : 'typId'
																}
																																																,{
																	header : '值',
																isExp : false,
																
																	dataIndex : 'val'
																}
																																																,{
																	header : '条件开始值',
																isExp : false,
																
																	dataIndex : 'valSta'
																}
																																																,{
																	header : '条件结束值',
																isExp : false,
																
																	dataIndex : 'valEnd'
																}
																																																,{
																	header : '规则状态',
																isExp : false,
																
																	dataIndex : 'rulStaId'
																}
																																								, new Ext.ux.grid.RowActions({
									header:__action,
									width:100,
									actions:[{
											 iconCls:'btn-del',qtip:__delete,style:'margin:0 3px 0 3px'
										},{
											 iconCls:'btn-edit',qtip:__edit,style:'margin:0 3px 0 3px'
										}
									],
									listeners:{
										scope:this,
										'action':this.onRowAction
									}
								})
					]//end of columns
				});
				
				this.gridPanel.addListener('rowdblclick',this.rowClick);
					
			},// end of the initComponents()
			//重置查询表单
			reset : function(){
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
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new QcChkRulDetailForm({detailId:rec.data.detailId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcChkRulDetailForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkRulDetailForm');
				if (aForm != null) {
					tabs.remove('QcChkRulDetailForm');
				}
				aForm = new QcChkRulDetailForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/qucon/multiDelQcChkRulDetail.do',
					ids:id,
					grid:this.gridPanel,
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$gridRs({
					url:__ctxPath + '/qucon/multiDelQcChkRulDetail.do',
					grid:this.gridPanel,
					idName:'detailId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcChkRulDetailForm({
				//	detailId : record.data.detailId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkRulDetailForm');
				if (aForm != null) {
					tabs.remove('QcChkRulDetailForm');
				}
				aForm = new QcChkRulDetailForm({detailId : record.data.detailId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.detailId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
