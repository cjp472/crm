/**
 * @author:cf0666@gmail.com
 * @class UkQiusuoHuifuView
 * @extends Ext.Panel
 * @description [UkQiusuoHuifu]管理
 * @company 优创融联科技
 * @createtime:
 */
UkQiusuoHuifuView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UkQiusuoHuifuView.superclass.constructor.call(this, {
							id : 'UkQiusuoHuifuViewWin',
							title : '[UkQiusuoHuifu]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'qiusuoId',
											'求索内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/know/listqiusuoId.do',
															fields : [ 'qiusuoId', 'qiusuoIdName' ]
														}),
														displayField : 'qiusuoIdName',
														valueField : 'qiusuoId',
														id : 'qiusuoId'
														})
																																			 ]
																				,
																			 								 																																		[
											'content',
											'回复内容',
																								new Ext.form.TextField({name : 'content',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'reply',
											'回复人',
																								new Ext.form.TextField({name : 'reply',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'replytime',
											'回复时间',
																								new Ext.form.DateField({hiddenName : 'replytime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'isdelete',
											'删除标记',
																																																					new Ext.form.NumberField({name : 'isdelete',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updatetime',
											'修改时间',
																								new Ext.form.DateField({hiddenName : 'updatetime',format : 'Y-m-d'})
																						 ]
																			 								 							 											]
				var UkQiusuoHuifuAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UkQiusuoHuifu]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UkQiusuoHuifuSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_qiusuoId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/know/listqiusuoId.do',
															fields : [ 'qiusuoId', 'qiusuoIdName' ]
														}),
														displayField : 'qiusuoIdName',
														valueField : 'qiusuoId',
														id : 'qiusuoId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_content_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_reply_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_replytime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																							hiddenName : 'Q_isdelete_L_EQ'
																							 												,xtype:'combo'
												,editable : false
												,mode : 'local'
												,triggerAction : 'all'
												,store : [['1',__yes],['0',__no]]
																					}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updatetime_D_EQ',
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
										handler :function(){ new UkQiusuoHuifuAdvancedSearchWin().show();}
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
									//text : __create+'[UkQiusuoHuifu]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[UkQiusuoHuifu]',
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
					id:'UkQiusuoHuifuGrid',
					url : __ctxPath + "/know/listUkQiusuoHuifu.do",
					fields : [{
									name : 'qiusuoHuifuId',
									type : 'int'
								}
																																																																			,'ukQiusuoHuifu'
																																																																								,'content'
																																																																								,'reply'
																																																																								,'replytime'
																																																																								,'isdelete'
																																																																								,'updatetime'
																																																],
					columns:[
								{
									header : 'qiusuoHuifuId',
									dataIndex : 'qiusuoHuifuId',
									hidden : true
								}
																																																								,{
																	header : '求索内码',
																isExp : false,
																
																    dataIndex : 'qiusuoId',
								    renderer:function(val){
								    	return val.qiusuoIdName;
								    }
																}
																																																,{
																	header : '回复内容',
																isExp : false,
																
																	dataIndex : 'content'
																}
																																																,{
																	header : '回复人',
																isExp : false,
																
																	dataIndex : 'reply'
																}
																																																,{
																	header : '回复时间',
																isExp : false,
																
																	dataIndex : 'replytime'
																}
																																																,{
																	header : '删除标记',
																isExp : false,
																
																	dataIndex : 'isdelete',
									renderer : function(value) {
										return value == '0'?__no:__yes;
									}
																}
																																																,{
																	header : '修改时间',
																isExp : false,
																
																	dataIndex : 'updatetime'
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
//				var searchPanel = Ext.getCmp('UkQiusuoHuifuSearchPanel');
//				var gridPanel = Ext.getCmp('UkQiusuoHuifuGrid');
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
					new UkQiusuoHuifuForm({qiusuoHuifuId:rec.data.qiusuoHuifuId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UkQiusuoHuifuForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkQiusuoHuifuForm');
				if (aForm != null) {
					tabs.remove('UkQiusuoHuifuForm');
				}
				aForm = new UkQiusuoHuifuForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/know/multiDelUkQiusuoHuifu.do',
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
					url:__ctxPath + '/know/multiDelUkQiusuoHuifu.do',
					grid:this.gridPanel,
					idName:'qiusuoHuifuId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new UkQiusuoHuifuForm({
				//	qiusuoHuifuId : record.data.qiusuoHuifuId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkQiusuoHuifuForm');
				if (aForm != null) {
					tabs.remove('UkQiusuoHuifuForm');
				}
				aForm = new UkQiusuoHuifuForm({qiusuoHuifuId : record.data.qiusuoHuifuId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.qiusuoHuifuId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
