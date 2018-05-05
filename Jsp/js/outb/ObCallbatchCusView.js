/**
 * @author:cf0666@gmail.com
 * @class ObCallbatchCusView
 * @extends Ext.Panel
 * @description [ObCallbatchCus]管理
 * @company 优创融联科技
 * @createtime:
 */
ObCallbatchCusView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObCallbatchCusView.superclass.constructor.call(this, {
							id : 'ObCallbatchCusViewWin',
							title : '[ObCallbatchCus]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 															 															 																																		[
											'assStaId',
											'分配状态&CONOB_CALLBATCH_CUS_FPZT',
																																																					new Ext.form.NumberField({name : 'assStaId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'assStepId',
											'阶段&CONOB_CALLBATCH_CUS_JD',
																																																					new Ext.form.NumberField({name : 'assStepId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'callbatchAssId',
											'分配历史内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcallbatchAssId.do',
															fields : [ 'callbatchAssId', 'callbatchAssIdName' ]
														}),
														displayField : 'callbatchAssIdName',
														valueField : 'callbatchAssId',
														id : 'callbatchAssId'
														})
																																			 ]
																				,
																			 								 																																		[
											'fromUseId',
											'分配人内码',
																																																					new Ext.form.NumberField({name : 'fromUseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'toUseId',
											'接收人内码',
																																																					new Ext.form.NumberField({name : 'toUseId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var ObCallbatchCusAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObCallbatchCus]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObCallbatchCusSearchPanel',
							height : 35,
													items:[
																						 															 															 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_assStaId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_CALLBATCH_CUS_FPZT'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_assStepId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_CALLBATCH_CUS_JD'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_callbatchAssId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcallbatchAssId.do',
															fields : [ 'callbatchAssId', 'callbatchAssIdName' ]
														}),
														displayField : 'callbatchAssIdName',
														valueField : 'callbatchAssId',
														id : 'callbatchAssId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_fromUseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_toUseId_L_EQ',
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
										handler :function(){ new ObCallbatchCusAdvancedSearchWin().show();}
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
									//text : __create+'[ObCallbatchCus]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObCallbatchCus]',
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
					id:'ObCallbatchCusGrid',
					url : __ctxPath + "/outb/listObCallbatchCus.do",
					fields : [{
									name : 'callbatchId',
									type : 'int'
								}
																																																																																																	,'assStaId'
																																																																								,'assStepId'
																																																																								,'obCallbatchCus'
																																																																								,'fromUseId'
																																																																								,'toUseId'
																																																],
					columns:[
								{
									header : 'callbatchId',
									dataIndex : 'callbatchId',
									hidden : true
								}
																																																																																								,{
																	header : '分配状态&CONOB_CALLBATCH_CUS_FPZT',
																isExp : false,
																
																	dataIndex : 'assStaId',
									renderer : function(value) {
										return CONOB_CALLBATCH_CUS_FPZT.get(value);
									}
																}
																																																,{
																	header : '阶段&CONOB_CALLBATCH_CUS_JD',
																isExp : false,
																
																	dataIndex : 'assStepId',
									renderer : function(value) {
										return CONOB_CALLBATCH_CUS_JD.get(value);
									}
																}
																																																,{
																	header : '分配历史内码',
																isExp : false,
																
																    dataIndex : 'callbatchAssId',
								    renderer:function(val){
								    	return val.callbatchAssIdName;
								    }
																}
																																																,{
																	header : '分配人内码',
																isExp : false,
																
																	dataIndex : 'fromUseId'
																}
																																																,{
																	header : '接收人内码',
																isExp : false,
																
																	dataIndex : 'toUseId'
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
					new ObCallbatchCusForm({callbatchId:rec.data.callbatchId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObCallbatchCusForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchCusForm');
				if (aForm != null) {
					tabs.remove('ObCallbatchCusForm');
				}
				aForm = new ObCallbatchCusForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/outb/multiDelObCallbatchCus.do',
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
					url:__ctxPath + '/outb/multiDelObCallbatchCus.do',
					grid:this.gridPanel,
					idName:'callbatchId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObCallbatchCusForm({
				//	callbatchId : record.data.callbatchId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchCusForm');
				if (aForm != null) {
					tabs.remove('ObCallbatchCusForm');
				}
				aForm = new ObCallbatchCusForm({callbatchId : record.data.callbatchId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.callbatchId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
