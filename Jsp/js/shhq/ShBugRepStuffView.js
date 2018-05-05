/**
 * @author:cf0666@gmail.com
 * @class ShBugRepStuffView
 * @extends Ext.Panel
 * @description [ShBugRepStuff]管理
 * @company 优创融联科技
 * @createtime:
 */
ShBugRepStuffView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ShBugRepStuffView.superclass.constructor.call(this, {
							id : 'ShBugRepStuffViewWin',
							title : '[ShBugRepStuff]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'repId',
											'维修单内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/shhq/listrepId.do',
															fields : [ 'repId', 'repIdName' ]
														}),
														displayField : 'repIdName',
														valueField : 'repId',
														id : 'repId'
														})
																																			 ]
																				,
																			 								 																																		[
											'name',
											'材料名称',
																								new Ext.form.TextField({name : 'name',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'stuffSpec',
											'规格',
																								new Ext.form.TextField({name : 'stuffSpec',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'num',
											'数量',
																																																					new Ext.form.NumberField({name : 'num',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'price',
											'单价',
																																																					new Ext.form.NumberField({name : 'price',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'totalCash',
											'小计',
																																																					new Ext.form.NumberField({name : 'totalCash',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																			 								 							 											]
				var ShBugRepStuffAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ShBugRepStuff]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ShBugRepStuffSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_repId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/shhq/listrepId.do',
															fields : [ 'repId', 'repIdName' ]
														}),
														displayField : 'repIdName',
														valueField : 'repId',
														id : 'repId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_name_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_stuffSpec_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																		 										 										{
																																																													
																						
																																				name : 'Q_num_N_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_price_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_totalCash_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
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
										handler :function(){ new ShBugRepStuffAdvancedSearchWin().show();}
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
									//text : __create+'[ShBugRepStuff]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ShBugRepStuff]',
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
					id:'ShBugRepStuffGrid',
					url : __ctxPath + "/shhq/listShBugRepStuff.do",
					fields : [{
									name : 'stuffId',
									type : 'int'
								}
																																																																			,'shBugRepStuff'
																																																																								,'name'
																																																																								,'stuffSpec'
																																																																								,'num'
																																																																								,'price'
																																																																								,'totalCash'
																																																																								,'remark'
																																																],
					columns:[
								{
									header : 'stuffId',
									dataIndex : 'stuffId',
									hidden : true
								}
																																																								,{
																	header : '维修单内码',
																isExp : false,
																
																    dataIndex : 'repId',
								    renderer:function(val){
								    	return val.repIdName;
								    }
																}
																																																,{
																	header : '材料名称',
																isExp : false,
																
																	dataIndex : 'name'
																}
																																																,{
																	header : '规格',
																isExp : false,
																
																	dataIndex : 'stuffSpec'
																}
																																																,{
																	header : '数量',
																isExp : false,
																
																	dataIndex : 'num'
																}
																																																,{
																	header : '单价',
																isExp : false,
																
																	dataIndex : 'price'
																}
																																																,{
																	header : '小计',
																isExp : false,
																
																	dataIndex : 'totalCash'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
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
//				var searchPanel = Ext.getCmp('ShBugRepStuffSearchPanel');
//				var gridPanel = Ext.getCmp('ShBugRepStuffGrid');
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
					new ShBugRepStuffForm({stuffId:rec.data.stuffId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ShBugRepStuffForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBugRepStuffForm');
				if (aForm != null) {
					tabs.remove('ShBugRepStuffForm');
				}
				aForm = new ShBugRepStuffForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/shhq/multiDelShBugRepStuff.do',
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
					url:__ctxPath + '/shhq/multiDelShBugRepStuff.do',
					grid:this.gridPanel,
					idName:'stuffId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ShBugRepStuffForm({
				//	stuffId : record.data.stuffId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBugRepStuffForm');
				if (aForm != null) {
					tabs.remove('ShBugRepStuffForm');
				}
				aForm = new ShBugRepStuffForm({stuffId : record.data.stuffId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.stuffId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
