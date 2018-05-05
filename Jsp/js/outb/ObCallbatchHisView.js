/**
 * @author:cf0666@gmail.com
 * @class ObCallbatchHisView
 * @extends Ext.Panel
 * @description [ObCallbatchHis]管理
 * @company 优创融联科技
 * @createtime:
 */
ObCallbatchHisView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObCallbatchHisView.superclass.constructor.call(this, {
							id : 'ObCallbatchHisViewWin',
							title : '[ObCallbatchHis]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'callbatchId',
											'名单批次内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcallbatchId.do',
															fields : [ 'callbatchId', 'callbatchIdName' ]
														}),
														displayField : 'callbatchIdName',
														valueField : 'callbatchId',
														id : 'callbatchId'
														})
																																			 ]
																				,
																			 								 																																		[
											'calllistId',
											'名单列表内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcalllistId.do',
															fields : [ 'calllistId', 'calllistIdName' ]
														}),
														displayField : 'calllistIdName',
														valueField : 'calllistId',
														id : 'calllistId'
														})
																																			 ]
																				,
																			 								 																																		[
											'comId',
											'活动内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcomId.do',
															fields : [ 'comId', 'comIdName' ]
														}),
														displayField : 'comIdName',
														valueField : 'comId',
														id : 'comId'
														})
																																			 ]
																				,
																			 								 																																		[
											'rowDat',
											'记录时间',
																								new Ext.form.DateField({hiddenName : 'rowDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'opeUseId',
											'操作人',
																																																					new Ext.form.NumberField({name : 'opeUseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'opeTypId',
											'操作类型：0-创建、1-分配、2-回收&OB_CALLBATCH_HIS_CZLX',
																																																					new Ext.form.NumberField({name : 'opeTypId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'opeResDesc',
											'操作结果描述',
																								new Ext.form.TextField({name : 'opeResDesc',allowBlank:true})
																						 ]
																			 								 							 											]
				var ObCallbatchHisAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObCallbatchHis]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObCallbatchHisSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_callbatchId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcallbatchId.do',
															fields : [ 'callbatchId', 'callbatchIdName' ]
														}),
														displayField : 'callbatchIdName',
														valueField : 'callbatchId',
														id : 'callbatchId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_calllistId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcalllistId.do',
															fields : [ 'calllistId', 'calllistIdName' ]
														}),
														displayField : 'calllistIdName',
														valueField : 'calllistId',
														id : 'calllistId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_comId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listcomId.do',
															fields : [ 'comId', 'comIdName' ]
														}),
														displayField : 'comIdName',
														valueField : 'comId',
														id : 'comId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_rowDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_opeUseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_opeTypId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'OB_CALLBATCH_HIS_CZLX'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_opeResDesc_S_EQ',
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
										handler :function(){ new ObCallbatchHisAdvancedSearchWin().show();}
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
									//text : __create+'[ObCallbatchHis]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObCallbatchHis]',
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
					id:'ObCallbatchHisGrid',
					url : __ctxPath + "/outb/listObCallbatchHis.do",
					fields : [{
									name : 'opeHisId',
									type : 'int'
								}
																																																																			,'obCallbatchHis'
																																																																								,'obCallbatchHis'
																																																																								,'obCallbatchHis'
																																																																								,'rowDat'
																																																																								,'opeUseId'
																																																																								,'opeTypId'
																																																																								,'opeResDesc'
																																																],
					columns:[
								{
									header : 'opeHisId',
									dataIndex : 'opeHisId',
									hidden : true
								}
																																																								,{
																	header : '名单批次内码',
																isExp : false,
																
																    dataIndex : 'callbatchId',
								    renderer:function(val){
								    	return val.callbatchIdName;
								    }
																}
																																																,{
																	header : '名单列表内码',
																isExp : false,
																
																    dataIndex : 'calllistId',
								    renderer:function(val){
								    	return val.calllistIdName;
								    }
																}
																																																,{
																	header : '活动内码',
																isExp : false,
																
																    dataIndex : 'comId',
								    renderer:function(val){
								    	return val.comIdName;
								    }
																}
																																																,{
																	header : '记录时间',
																isExp : false,
																
																	dataIndex : 'rowDat'
																}
																																																,{
																	header : '操作人',
																isExp : false,
																
																	dataIndex : 'opeUseId'
																}
																																																,{
																	header : '操作类型：0-创建、1-分配、2-回收&OB_CALLBATCH_HIS_CZLX',
																isExp : false,
																
																	dataIndex : 'opeTypId',
									renderer : function(value) {
										return OB_CALLBATCH_HIS_CZLX.get(value);
									}
																}
																																																,{
																	header : '操作结果描述',
																isExp : false,
																
																	dataIndex : 'opeResDesc'
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
					new ObCallbatchHisForm({opeHisId:rec.data.opeHisId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObCallbatchHisForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchHisForm');
				if (aForm != null) {
					tabs.remove('ObCallbatchHisForm');
				}
				aForm = new ObCallbatchHisForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/outb/multiDelObCallbatchHis.do',
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
					url:__ctxPath + '/outb/multiDelObCallbatchHis.do',
					grid:this.gridPanel,
					idName:'opeHisId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObCallbatchHisForm({
				//	opeHisId : record.data.opeHisId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchHisForm');
				if (aForm != null) {
					tabs.remove('ObCallbatchHisForm');
				}
				aForm = new ObCallbatchHisForm({opeHisId : record.data.opeHisId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.opeHisId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
