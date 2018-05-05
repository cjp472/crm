/**
 * @author:cf0666@gmail.com
 * @class ObComSalerulView
 * @extends Ext.Panel
 * @description [ObComSalerul]管理
 * @company 优创融联科技
 * @createtime:
 */
ObComSalerulView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObComSalerulView.superclass.constructor.call(this, {
							id : 'ObComSalerulViewWin',
							title : '[ObComSalerul]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
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
											'rulNam',
											'规则名称',
																								new Ext.form.TextField({name : 'rulNam',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'rulTypeId',
											'规则类型：最大拨打次数、最小拨打次数等&CONOB_COM_SALERUL_GZLX',
																																																					new MT.DicComboBox({hiddenName : 'rulTypeId',itemKey : 'CONOB_COM_SALERUL_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'rulValMin',
											'最小值：只有一个值时填该字段',
																																																					new MT.DicComboBox({hiddenName : 'rulValMin',itemKey : 'CONOB_COM_SALERUL_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'rulValMax',
											'最大值',
																																																					new MT.DicComboBox({hiddenName : 'rulValMax',itemKey : 'CONOB_COM_SALERUL_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'rulDis',
											'顺序号&CONOB_COM_SALERUL_SXH',
																																																					new MT.DicComboBox({hiddenName : 'rulDis',itemKey : 'CONOB_COM_SALERUL_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'rulStaId',
											'状态&CONOB_COM_SALERUL_ZT',
																																																					new MT.DicComboBox({hiddenName : 'rulStaId',itemKey : 'CONOB_COM_SALERUL_ZT'})
																																																	 ]
																			 								 							 											]
				var ObComSalerulAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObComSalerul]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObComSalerulSearchPanel',
							height : 35,
													items:[
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
																																																													
																						
																																				name : 'Q_rulNam_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_rulTypeId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_COM_SALERUL_GZLX'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_rulValMin_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_rulValMax_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_rulDis_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_COM_SALERUL_SXH'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_rulStaId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_COM_SALERUL_ZT'
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
										handler :function(){ new ObComSalerulAdvancedSearchWin().show();}
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
									//text : __create+'[ObComSalerul]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObComSalerul]',
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
					id:'ObComSalerulGrid',
					url : __ctxPath + "/outb/listObComSalerul.do",
					fields : [{
									name : 'rulId',
									type : 'int'
								}
																																																																			,'obComSalerul'
																																																																								,'rulNam'
																																																																								,'rulTypeId'
																																																																								,'rulValMin'
																																																																								,'rulValMax'
																																																																								,'rulDis'
																																																																								,'rulStaId'
																																																],
					columns:[
								{
									header : 'rulId',
									dataIndex : 'rulId',
									hidden : true
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
																	header : '规则名称',
																isExp : false,
																
																	dataIndex : 'rulNam'
																}
																																																,{
																	header : '规则类型：最大拨打次数、最小拨打次数等&CONOB_COM_SALERUL_GZLX',
																isExp : false,
																
																	dataIndex : 'rulTypeId',
									renderer : function(value) {
										return CONOB_COM_SALERUL_GZLX.get(value);
									}
																}
																																																,{
																	header : '最小值：只有一个值时填该字段',
																isExp : false,
																
																	dataIndex : 'rulValMin'
																}
																																																,{
																	header : '最大值',
																isExp : false,
																
																	dataIndex : 'rulValMax'
																}
																																																,{
																	header : '顺序号&CONOB_COM_SALERUL_SXH',
																isExp : false,
																
																	dataIndex : 'rulDis',
									renderer : function(value) {
										return CONOB_COM_SALERUL_SXH.get(value);
									}
																}
																																																,{
																	header : '状态&CONOB_COM_SALERUL_ZT',
																isExp : false,
																
																	dataIndex : 'rulStaId',
									renderer : function(value) {
										return CONOB_COM_SALERUL_ZT.get(value);
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
				$search({
						searchPanel : this.searchPanel,
						gridPanel : this.gridPanel
					});
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new ObComSalerulForm({rulId:rec.data.rulId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObComSalerulForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObComSalerulForm');
				if (aForm != null) {
					tabs.remove('ObComSalerulForm');
				}
				aForm = new ObComSalerulForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/outb/multiDelObComSalerul.do',
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
					url:__ctxPath + '/outb/multiDelObComSalerul.do',
					grid:this.gridPanel,
					idName:'rulId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObComSalerulForm({
				//	rulId : record.data.rulId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObComSalerulForm');
				if (aForm != null) {
					tabs.remove('ObComSalerulForm');
				}
				aForm = new ObComSalerulForm({rulId : record.data.rulId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.rulId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
