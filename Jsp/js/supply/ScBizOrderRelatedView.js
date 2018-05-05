/**
 * @author:cf0666@gmail.com
 * @class ScBizOrderRelatedView
 * @extends Ext.Panel
 * @description [ScBizOrderRelated]管理
 * @company 优创融联科技
 * @createtime:
 */
ScBizOrderRelatedView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScBizOrderRelatedView.superclass.constructor.call(this, {
							id : 'ScBizOrderRelatedViewWin',
							title : '[ScBizOrderRelated]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'masterBizOrderId',
											'主业务单标识',
																																																					new Ext.form.NumberField({name : 'masterBizOrderId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'masterBizOrderType',
											'主业务单类型&CON_T_BIZ_ORDER_TYPE',
																																																					new Ext.form.NumberField({name : 'masterBizOrderType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'slaveBizOrderId',
											'从业务单标识',
																																																					new Ext.form.NumberField({name : 'slaveBizOrderId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'slaveBizOrderType',
											'从业务单类型&CON_T_BIZ_ORDER_TYPE',
																																																					new Ext.form.NumberField({name : 'slaveBizOrderType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bizOrderRelationType',
											'业务单关联类型',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/supply/listbizOrderRelationType.do',
															fields : [ 'bizOrderRelationType', 'bizOrderRelationTypeName' ]
														}),
														displayField : 'bizOrderRelationTypeName',
														valueField : 'bizOrderRelationType',
														id : 'bizOrderRelationType'
														})
																																			 ]
																			 								 							 											]
				var ScBizOrderRelatedAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScBizOrderRelated]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScBizOrderRelatedSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_masterBizOrderId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_masterBizOrderType_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_BIZ_ORDER_TYPE'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_slaveBizOrderId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_slaveBizOrderType_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_BIZ_ORDER_TYPE'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_bizOrderRelationType_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/supply/listbizOrderRelationType.do',
															fields : [ 'bizOrderRelationType', 'bizOrderRelationTypeName' ]
														}),
														displayField : 'bizOrderRelationTypeName',
														valueField : 'bizOrderRelationType',
														id : 'bizOrderRelationType'
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
										handler :function(){ new ScBizOrderRelatedAdvancedSearchWin().show();}
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
									//text : __create+'[ScBizOrderRelated]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScBizOrderRelated]',
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
					id:'ScBizOrderRelatedGrid',
					url : __ctxPath + "/supply/listScBizOrderRelated.do",
					fields : [{
									name : 'bizOrderRelatedId',
									type : 'int'
								}
																																																																			,'masterBizOrderId'
																																																																								,'masterBizOrderType'
																																																																								,'slaveBizOrderId'
																																																																								,'slaveBizOrderType'
																																																																								,'scBizOrderRelated'
																																																],
					columns:[
								{
									header : 'bizOrderRelatedId',
									dataIndex : 'bizOrderRelatedId',
									hidden : true
								}
																																																								,{
																	header : '主业务单标识',
																isExp : false,
																
																	dataIndex : 'masterBizOrderId'
																}
																																																,{
																	header : '主业务单类型&CON_T_BIZ_ORDER_TYPE',
																isExp : false,
																
																	dataIndex : 'masterBizOrderType',
									renderer : function(value) {
										return CON_T_BIZ_ORDER_TYPE.get(value);
									}
																}
																																																,{
																	header : '从业务单标识',
																isExp : false,
																
																	dataIndex : 'slaveBizOrderId'
																}
																																																,{
																	header : '从业务单类型&CON_T_BIZ_ORDER_TYPE',
																isExp : false,
																
																	dataIndex : 'slaveBizOrderType',
									renderer : function(value) {
										return CON_T_BIZ_ORDER_TYPE.get(value);
									}
																}
																																																,{
																	header : '业务单关联类型',
																isExp : false,
																
																    dataIndex : 'bizOrderRelationType',
								    renderer:function(val){
								    	return val.bizOrderRelationTypeName;
								    }
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
//				var searchPanel = Ext.getCmp('ScBizOrderRelatedSearchPanel');
//				var gridPanel = Ext.getCmp('ScBizOrderRelatedGrid');
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
					new ScBizOrderRelatedForm({bizOrderRelatedId:rec.data.bizOrderRelatedId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScBizOrderRelatedForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScBizOrderRelatedForm');
				if (aForm != null) {
					tabs.remove('ScBizOrderRelatedForm');
				}
				aForm = new ScBizOrderRelatedForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/supply/multiDelScBizOrderRelated.do',
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
					url:__ctxPath + '/supply/multiDelScBizOrderRelated.do',
					grid:this.gridPanel,
					idName:'bizOrderRelatedId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScBizOrderRelatedForm({
				//	bizOrderRelatedId : record.data.bizOrderRelatedId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScBizOrderRelatedForm');
				if (aForm != null) {
					tabs.remove('ScBizOrderRelatedForm');
				}
				aForm = new ScBizOrderRelatedForm({bizOrderRelatedId : record.data.bizOrderRelatedId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.bizOrderRelatedId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
