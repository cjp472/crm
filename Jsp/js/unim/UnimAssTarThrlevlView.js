/**
 * @author:cf0666@gmail.com
 * @class UnimAssTarThrlevlView
 * @extends Ext.Panel
 * @description [UnimAssTarThrlevl]管理
 * @company 优创融联科技
 * @createtime:
 */
UnimAssTarThrlevlView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimAssTarThrlevlView.superclass.constructor.call(this, {
							id : 'UnimAssTarThrlevlViewWin',
							title : '[UnimAssTarThrlevl]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'assetsId',
											'资产ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listassetsId.do',
															fields : [ 'assetsId', 'assetsIdName' ]
														}),
														displayField : 'assetsIdName',
														valueField : 'assetsId',
														id : 'assetsId'
														})
																																			 ]
																				,
																			 								 																																		[
											'targetId',
											'指标ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listtargetId.do',
															fields : [ 'targetId', 'targetIdName' ]
														}),
														displayField : 'targetIdName',
														valueField : 'targetId',
														id : 'targetId'
														})
																																			 ]
																				,
																			 								 																																		[
											'monitorId',
											'班长ID',
																																																					new Ext.form.NumberField({name : 'monitorId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'thrlevl1',
											'阀值1',
																																																					new Ext.form.NumberField({name : 'thrlevl1',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'thrlevl2',
											'阀值2',
																																																					new Ext.form.NumberField({name : 'thrlevl2',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'thrlevl3',
											'阀值3',
																																																					new Ext.form.NumberField({name : 'thrlevl3',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'thrlevl4',
											'阀值4',
																																																					new Ext.form.NumberField({name : 'thrlevl4',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'extend1',
											'扩展字段1（颜色1）',
																								new Ext.form.TextField({name : 'extend1',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'extend2',
											'扩展字段2（颜色2）',
																								new Ext.form.TextField({name : 'extend2',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'extend3',
											'扩展字段3（颜色3）',
																								new Ext.form.TextField({name : 'extend3',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'extend4',
											'扩展字段4（颜色4）',
																								new Ext.form.TextField({name : 'extend4',allowBlank:true})
																						 ]
																			 								 							 											]
				var UnimAssTarThrlevlAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UnimAssTarThrlevl]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimAssTarThrlevlSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_assetsId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listassetsId.do',
															fields : [ 'assetsId', 'assetsIdName' ]
														}),
														displayField : 'assetsIdName',
														valueField : 'assetsId',
														id : 'assetsId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_targetId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listtargetId.do',
															fields : [ 'targetId', 'targetIdName' ]
														}),
														displayField : 'targetIdName',
														valueField : 'targetId',
														id : 'targetId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_monitorId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_thrlevl1_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_thrlevl2_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_thrlevl3_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_thrlevl4_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extend1_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extend2_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extend3_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extend4_S_EQ',
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
										handler :function(){ new UnimAssTarThrlevlAdvancedSearchWin().show();}
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
									//text : __create+'[UnimAssTarThrlevl]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[UnimAssTarThrlevl]',
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
					id:'UnimAssTarThrlevlGrid',
					url : __ctxPath + "/unim/listUnimAssTarThrlevl.do",
					fields : [{
									name : 'thrlevlId',
									type : 'int'
								}
																																																																			,'unimAssTarThrlevl'
																																																																								,'unimAssTarThrlevl'
																																																																								,'monitorId'
																																																																								,'thrlevl1'
																																																																								,'thrlevl2'
																																																																								,'thrlevl3'
																																																																								,'thrlevl4'
																																																																								,'extend1'
																																																																								,'extend2'
																																																																								,'extend3'
																																																																								,'extend4'
																																																],
					columns:[
								{
									header : 'thrlevlId',
									dataIndex : 'thrlevlId',
									hidden : true
								}
																																																								,{
																	header : '资产ID',
																isExp : false,
																
																    dataIndex : 'assetsId',
								    renderer:function(val){
								    	return val.assetsIdName;
								    }
																}
																																																,{
																	header : '指标ID',
																isExp : false,
																
																    dataIndex : 'targetId',
								    renderer:function(val){
								    	return val.targetIdName;
								    }
																}
																																																,{
																	header : '班长ID',
																isExp : false,
																
																	dataIndex : 'monitorId'
																}
																																																,{
																	header : '阀值1',
																isExp : false,
																
																	dataIndex : 'thrlevl1'
																}
																																																,{
																	header : '阀值2',
																isExp : false,
																
																	dataIndex : 'thrlevl2'
																}
																																																,{
																	header : '阀值3',
																isExp : false,
																
																	dataIndex : 'thrlevl3'
																}
																																																,{
																	header : '阀值4',
																isExp : false,
																
																	dataIndex : 'thrlevl4'
																}
																																																,{
																	header : '扩展字段1（颜色1）',
																isExp : false,
																
																	dataIndex : 'extend1'
																}
																																																,{
																	header : '扩展字段2（颜色2）',
																isExp : false,
																
																	dataIndex : 'extend2'
																}
																																																,{
																	header : '扩展字段3（颜色3）',
																isExp : false,
																
																	dataIndex : 'extend3'
																}
																																																,{
																	header : '扩展字段4（颜色4）',
																isExp : false,
																
																	dataIndex : 'extend4'
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
//				var searchPanel = Ext.getCmp('UnimAssTarThrlevlSearchPanel');
//				var gridPanel = Ext.getCmp('UnimAssTarThrlevlGrid');
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
					new UnimAssTarThrlevlForm({thrlevlId:rec.data.thrlevlId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UnimAssTarThrlevlForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimAssTarThrlevlForm');
				if (aForm != null) {
					tabs.remove('UnimAssTarThrlevlForm');
				}
				aForm = new UnimAssTarThrlevlForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/unim/multiDelUnimAssTarThrlevl.do',
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
					url:__ctxPath + '/unim/multiDelUnimAssTarThrlevl.do',
					grid:this.gridPanel,
					idName:'thrlevlId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new UnimAssTarThrlevlForm({
				//	thrlevlId : record.data.thrlevlId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimAssTarThrlevlForm');
				if (aForm != null) {
					tabs.remove('UnimAssTarThrlevlForm');
				}
				aForm = new UnimAssTarThrlevlForm({thrlevlId : record.data.thrlevlId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.thrlevlId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
