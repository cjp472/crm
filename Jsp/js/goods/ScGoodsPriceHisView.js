/**
 * @author:cf0666@gmail.com
 * @class ScGoodsPriceHisView
 * @extends Ext.Panel
 * @description [ScGoodsPriceHis]管理
 * @company 优创融联科技
 * @createtime:
 */
ScGoodsPriceHisView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScGoodsPriceHisView.superclass.constructor.call(this, {
							id : 'ScGoodsPriceHisViewWin',
							title : '[ScGoodsPriceHis]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'goodsId',
											'商品标识',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/goods/listgoodsId.do',
															fields : [ 'goodsId', 'goodsIdName' ]
														}),
														displayField : 'goodsIdName',
														valueField : 'goodsId',
														id : 'goodsId'
														})
																																			 ]
																				,
																			 								 																																		[
											'purchasePrice',
											'进货价格',
																																																					new Ext.form.NumberField({name : 'purchasePrice',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'reportPrice',
											'上报价格',
																																																					new Ext.form.NumberField({name : 'reportPrice',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'retailPrice',
											'零售价格',
																																																					new Ext.form.NumberField({name : 'retailPrice',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'wholesalePrice',
											'平台直供价格',
																																																					new Ext.form.NumberField({name : 'wholesalePrice',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'defaultSubsidyAmount',
											'缺省平台补贴金额',
																																																					new Ext.form.NumberField({name : 'defaultSubsidyAmount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updateTime',
											'更新时间',
																								new Ext.form.DateField({hiddenName : 'updateTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'optUserId',
											'操作员内码',
																																																					new Ext.form.NumberField({name : 'optUserId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var ScGoodsPriceHisAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScGoodsPriceHis]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScGoodsPriceHisSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_goodsId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/goods/listgoodsId.do',
															fields : [ 'goodsId', 'goodsIdName' ]
														}),
														displayField : 'goodsIdName',
														valueField : 'goodsId',
														id : 'goodsId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_purchasePrice_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_reportPrice_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_retailPrice_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_wholesalePrice_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_defaultSubsidyAmount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updateTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_optUserId_L_EQ',
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
										handler :function(){ new ScGoodsPriceHisAdvancedSearchWin().show();}
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
									//text : __create+'[ScGoodsPriceHis]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScGoodsPriceHis]',
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
					id:'ScGoodsPriceHisGrid',
					url : __ctxPath + "/goods/listScGoodsPriceHis.do",
					fields : [{
									name : 'goodsPriceHisSeq',
									type : 'int'
								}
																																																																			,'scGoodsPriceHis'
																																																																								,'purchasePrice'
																																																																								,'reportPrice'
																																																																								,'retailPrice'
																																																																								,'wholesalePrice'
																																																																								,'defaultSubsidyAmount'
																																																																								,'updateTime'
																																																																								,'optUserId'
																																																],
					columns:[
								{
									header : 'goodsPriceHisSeq',
									dataIndex : 'goodsPriceHisSeq',
									hidden : true
								}
																																																								,{
																	header : '商品标识',
																isExp : false,
																
																    dataIndex : 'goodsId',
								    renderer:function(val){
								    	return val.goodsIdName;
								    }
																}
																																																,{
																	header : '进货价格',
																isExp : false,
																
																	dataIndex : 'purchasePrice'
																}
																																																,{
																	header : '上报价格',
																isExp : false,
																
																	dataIndex : 'reportPrice'
																}
																																																,{
																	header : '零售价格',
																isExp : false,
																
																	dataIndex : 'retailPrice'
																}
																																																,{
																	header : '平台直供价格',
																isExp : false,
																
																	dataIndex : 'wholesalePrice'
																}
																																																,{
																	header : '缺省平台补贴金额',
																isExp : false,
																
																	dataIndex : 'defaultSubsidyAmount'
																}
																																																,{
																	header : '更新时间',
																isExp : false,
																
																	dataIndex : 'updateTime'
																}
																																																,{
																	header : '操作员内码',
																isExp : false,
																
																	dataIndex : 'optUserId'
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
//				var searchPanel = Ext.getCmp('ScGoodsPriceHisSearchPanel');
//				var gridPanel = Ext.getCmp('ScGoodsPriceHisGrid');
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
					new ScGoodsPriceHisForm({goodsPriceHisSeq:rec.data.goodsPriceHisSeq}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScGoodsPriceHisForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScGoodsPriceHisForm');
				if (aForm != null) {
					tabs.remove('ScGoodsPriceHisForm');
				}
				aForm = new ScGoodsPriceHisForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/goods/multiDelScGoodsPriceHis.do',
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
					url:__ctxPath + '/goods/multiDelScGoodsPriceHis.do',
					grid:this.gridPanel,
					idName:'goodsPriceHisSeq',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScGoodsPriceHisForm({
				//	goodsPriceHisSeq : record.data.goodsPriceHisSeq
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScGoodsPriceHisForm');
				if (aForm != null) {
					tabs.remove('ScGoodsPriceHisForm');
				}
				aForm = new ScGoodsPriceHisForm({goodsPriceHisSeq : record.data.goodsPriceHisSeq});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.goodsPriceHisSeq);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
