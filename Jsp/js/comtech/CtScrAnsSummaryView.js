/**
 * @author:cf0666@gmail.com
 * @class CtScrAnsSummaryView
 * @extends Ext.Panel
 * @description [CtScrAnsSummary]管理
 * @company 优创融联科技
 * @createtime:
 */
CtScrAnsSummaryView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CtScrAnsSummaryView.superclass.constructor.call(this, {
							id : 'CtScrAnsSummaryViewWin',
							title : '[CtScrAnsSummary]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'scrId',
											'话术',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listscrId.do',
															fields : [ 'scrId', 'scrIdName' ]
														}),
														displayField : 'scrIdName',
														valueField : 'scrId',
														id : 'scrId'
														})
																																			 ]
																				,
																			 								 																																		[
											'ansUseId',
											'答卷人',
																																																					new Ext.form.NumberField({name : 'ansUseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ansTimeSta',
											'答卷时间',
																								new Ext.form.DateField({hiddenName : 'ansTimeSta',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ansTimeEnd',
											'答卷结束时间',
																								new Ext.form.DateField({hiddenName : 'ansTimeEnd',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ansRemark',
											'备注',
																								new Ext.form.TextField({name : 'ansRemark',allowBlank:true})
																						 ]
																			 								 							 											]
				var CtScrAnsSummaryAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CtScrAnsSummary]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CtScrAnsSummarySearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_scrId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listscrId.do',
															fields : [ 'scrId', 'scrIdName' ]
														}),
														displayField : 'scrIdName',
														valueField : 'scrId',
														id : 'scrId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ansUseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ansTimeSta_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ansTimeEnd_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ansRemark_S_EQ',
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
										handler :function(){ new CtScrAnsSummaryAdvancedSearchWin().show();}
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
									//text : __create+'[CtScrAnsSummary]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CtScrAnsSummary]',
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
					id:'CtScrAnsSummaryGrid',
					url : __ctxPath + "/comtech/listCtScrAnsSummary.do",
					fields : [{
									name : 'scrAnsId',
									type : 'int'
								}
																																																																			,'ctScrAnsSummary'
																																																																								,'ansUseId'
																																																																								,'ansTimeSta'
																																																																								,'ansTimeEnd'
																																																																								,'ansRemark'
																																																],
					columns:[
								{
									header : 'scrAnsId',
									dataIndex : 'scrAnsId',
									hidden : true
								}
																																																								,{
																	header : '话术',
																isExp : false,
																
																    dataIndex : 'scrId',
								    renderer:function(val){
								    	return val.scrIdName;
								    }
																}
																																																,{
																	header : '答卷人',
																isExp : false,
																
																	dataIndex : 'ansUseId'
																}
																																																,{
																	header : '答卷时间',
																isExp : false,
																
																	dataIndex : 'ansTimeSta'
																}
																																																,{
																	header : '答卷结束时间',
																isExp : false,
																
																	dataIndex : 'ansTimeEnd'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'ansRemark'
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
					new CtScrAnsSummaryForm({scrAnsId:rec.data.scrAnsId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CtScrAnsSummaryForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrAnsSummaryForm');
				if (aForm != null) {
					tabs.remove('CtScrAnsSummaryForm');
				}
				aForm = new CtScrAnsSummaryForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/comtech/multiDelCtScrAnsSummary.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/comtech/multiDelCtScrAnsSummary.do',
					grid:this.gridPanel,
					idName:'scrAnsId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CtScrAnsSummaryForm({
				//	scrAnsId : record.data.scrAnsId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrAnsSummaryForm');
				if (aForm != null) {
					tabs.remove('CtScrAnsSummaryForm');
				}
				aForm = new CtScrAnsSummaryForm({scrAnsId : record.data.scrAnsId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.scrAnsId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
