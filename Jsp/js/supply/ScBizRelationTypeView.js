/**
 * @author:cf0666@gmail.com
 * @class ScBizRelationTypeView
 * @extends Ext.Panel
 * @description [ScBizRelationType]管理
 * @company 优创融联科技
 * @createtime:
 */
ScBizRelationTypeView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScBizRelationTypeView.superclass.constructor.call(this, {
							id : 'ScBizRelationTypeViewWin',
							title : '[ScBizRelationType]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'bizOrderRelationTypeName',
											'业务单关联类型名称',
																								new Ext.form.TextField({name : 'bizOrderRelationTypeName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'bizOrderRelationTypeDesc',
											'业务单关联类型描述',
																								new Ext.form.TextField({name : 'bizOrderRelationTypeDesc',allowBlank:true})
																						 ]
																			 								 							 											]
				var ScBizRelationTypeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScBizRelationType]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScBizRelationTypeSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_bizOrderRelationTypeName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bizOrderRelationTypeDesc_S_EQ',
																																																xtype : 'textfield'
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
										handler :function(){ new ScBizRelationTypeAdvancedSearchWin().show();}
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
									//text : __create+'[ScBizRelationType]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScBizRelationType]',
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
					id:'ScBizRelationTypeGrid',
					url : __ctxPath + "/supply/listScBizRelationType.do",
					fields : [{
									name : 'bizOrderRelationType',
									type : 'int'
								}
																																																																			,'bizOrderRelationTypeName'
																																																																								,'bizOrderRelationTypeDesc'
																																																],
					columns:[
								{
									header : 'bizOrderRelationType',
									dataIndex : 'bizOrderRelationType',
									hidden : true
								}
																																																								,{
																	header : '业务单关联类型名称',
																isExp : false,
																
																	dataIndex : 'bizOrderRelationTypeName'
																}
																																																,{
																	header : '业务单关联类型描述',
																isExp : false,
																
																	dataIndex : 'bizOrderRelationTypeDesc'
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
//				var searchPanel = Ext.getCmp('ScBizRelationTypeSearchPanel');
//				var gridPanel = Ext.getCmp('ScBizRelationTypeGrid');
//				if (searchPanel.getForm().isValid()) {
					$search({
								searchPanel : this.searchPanel,
								gridPanel : this.gridPanel
							});
//				}
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new ScBizRelationTypeForm({bizOrderRelationType:rec.data.bizOrderRelationType}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScBizRelationTypeForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScBizRelationTypeForm');
				if (aForm != null) {
					tabs.remove('ScBizRelationTypeForm');
				}
				aForm = new ScBizRelationTypeForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/supply/multiDelScBizRelationType.do',
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
					url:__ctxPath + '/supply/multiDelScBizRelationType.do',
					grid:this.gridPanel,
					idName:'bizOrderRelationType',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScBizRelationTypeForm({
				//	bizOrderRelationType : record.data.bizOrderRelationType
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScBizRelationTypeForm');
				if (aForm != null) {
					tabs.remove('ScBizRelationTypeForm');
				}
				aForm = new ScBizRelationTypeForm({bizOrderRelationType : record.data.bizOrderRelationType});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.bizOrderRelationType);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
