/**
 * @author:cf0666@gmail.com
 * @class ObCallbatchExtractView
 * @extends Ext.Panel
 * @description [ObCallbatchExtract]管理
 * @company 优创融联科技
 * @createtime:
 */
ObCallbatchExtractView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObCallbatchExtractView.superclass.constructor.call(this, {
							id : 'ObCallbatchExtractViewWin',
							title : '[ObCallbatchExtract]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'userId',
											'抽取人',
																																																					new Ext.form.NumberField({name : 'userId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'fromCallbatchId',
											'来源批次',
																																																					new Ext.form.NumberField({name : 'fromCallbatchId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'toCallbatchId',
											'目标批次',
																																																					new Ext.form.NumberField({name : 'toCallbatchId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'staDat',
											'抽取时间',
																								new Ext.form.DateField({hiddenName : 'staDat',format : 'Y-m-d'})
																						 ]
																			 								 							 											]
				var ObCallbatchExtractAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObCallbatchExtract]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObCallbatchExtractSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_userId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_fromCallbatchId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_toCallbatchId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_staDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
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
										handler :function(){ new ObCallbatchExtractAdvancedSearchWin().show();}
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
									//text : __create+'[ObCallbatchExtract]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObCallbatchExtract]',
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
					id:'ObCallbatchExtractGrid',
					url : __ctxPath + "/outb/listObCallbatchExtract.do",
					fields : [{
									name : 'extractId',
									type : 'int'
								}
																																																																			,'userId'
																																																																								,'fromCallbatchId'
																																																																								,'toCallbatchId'
																																																																								,'staDat'
																																																],
					columns:[
								{
									header : 'extractId',
									dataIndex : 'extractId',
									hidden : true
								}
																																																								,{
																	header : '抽取人',
																isExp : false,
																
																	dataIndex : 'userId'
																}
																																																,{
																	header : '来源批次',
																isExp : false,
																
																	dataIndex : 'fromCallbatchId'
																}
																																																,{
																	header : '目标批次',
																isExp : false,
																
																	dataIndex : 'toCallbatchId'
																}
																																																,{
																	header : '抽取时间',
																isExp : false,
																
																	dataIndex : 'staDat'
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
//				var searchPanel = Ext.getCmp('ObCallbatchExtractSearchPanel');
//				var gridPanel = Ext.getCmp('ObCallbatchExtractGrid');
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
					new ObCallbatchExtractForm({extractId:rec.data.extractId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObCallbatchExtractForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchExtractForm');
				if (aForm != null) {
					tabs.remove('ObCallbatchExtractForm');
				}
				aForm = new ObCallbatchExtractForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/outb/multiDelObCallbatchExtract.do',
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
					url:__ctxPath + '/outb/multiDelObCallbatchExtract.do',
					grid:this.gridPanel,
					idName:'extractId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObCallbatchExtractForm({
				//	extractId : record.data.extractId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchExtractForm');
				if (aForm != null) {
					tabs.remove('ObCallbatchExtractForm');
				}
				aForm = new ObCallbatchExtractForm({extractId : record.data.extractId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.extractId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});