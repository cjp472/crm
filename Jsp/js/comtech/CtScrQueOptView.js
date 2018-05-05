/**
 * @author:cf0666@gmail.com
 * @class CtScrQueOptView
 * @extends Ext.Panel
 * @description [CtScrQueOpt]管理
 * @company 优创融联科技
 * @createtime:
 */
CtScrQueOptView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CtScrQueOptView.superclass.constructor.call(this, {
							id : 'CtScrQueOptViewWin',
							title : '[CtScrQueOpt]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'queId',
											'题目',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listqueId.do',
															fields : [ 'queId', 'queIdName' ]
														}),
														displayField : 'queIdName',
														valueField : 'queId',
														id : 'queId'
														})
																																			 ]
																				,
																			 								 																																		[
											'optContent',
											'题项',
																								new Ext.form.TextField({name : 'optContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'disorder',
											'序号',
																																																					new MT.DicComboBox({hiddenName : 'disorder',itemKey : 'CT_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'isDefault',
											'是否默认&YorN',
																																																					new MT.DicComboBox({hiddenName : 'isDefault',itemKey : 'CT_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'staId',
											'状态：有效、注销&CT_ZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'CT_ZT'})
																																																	 ]
																			 								 							 											]
				var CtScrQueOptAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CtScrQueOpt]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CtScrQueOptSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_queId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listqueId.do',
															fields : [ 'queId', 'queIdName' ]
														}),
														displayField : 'queIdName',
														valueField : 'queId',
														id : 'queId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_optContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_disorder_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																							hiddenName : 'Q_isDefault_SN_EQ'
																																			,allowBlank:true
												 												,xtype:'combo'
												,editable : false
												,mode : 'local'
												,triggerAction : 'all'
												,store : [['1',__yes],['0',__no]]
																					}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_staId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CT_ZT'
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
										handler :function(){ new CtScrQueOptAdvancedSearchWin().show();}
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
									//text : __create+'[CtScrQueOpt]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CtScrQueOpt]',
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
					id:'CtScrQueOptGrid',
					url : __ctxPath + "/comtech/listCtScrQueOpt.do",
					fields : [{
									name : 'optId',
									type : 'int'
								}
																																																																			,'ctScrQueOpt'
																																																																								,'optContent'
																																																																								,'disorder'
																																																																								,'isDefault'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'optId',
									dataIndex : 'optId',
									hidden : true
								}
																																																								,{
																	header : '题目',
																isExp : false,
																
																    dataIndex : 'queId',
								    renderer:function(val){
								    	return val.queIdName;
								    }
																}
																																																,{
																	header : '题项',
																isExp : false,
																
																	dataIndex : 'optContent'
																}
																																																,{
																	header : '序号',
																isExp : false,
																
																	dataIndex : 'disorder'
																}
																																																,{
																	header : '是否默认&YorN',
																isExp : false,
																
																	dataIndex : 'isDefault',
									renderer : function(value) {
										return value == '0'?__no:__yes;
									}
																}
																																																,{
																	header : '状态：有效、注销&CT_ZT',
																isExp : false,
																
																	dataIndex : 'staId',
									renderer : function(value) {
										return CT_ZT.value;
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
					new CtScrQueOptForm({optId:rec.data.optId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CtScrQueOptForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrQueOptForm');
				if (aForm != null) {
					tabs.remove('CtScrQueOptForm');
				}
				aForm = new CtScrQueOptForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/comtech/multiDelCtScrQueOpt.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/comtech/multiDelCtScrQueOpt.do',
					grid:this.gridPanel,
					idName:'optId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CtScrQueOptForm({
				//	optId : record.data.optId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrQueOptForm');
				if (aForm != null) {
					tabs.remove('CtScrQueOptForm');
				}
				aForm = new CtScrQueOptForm({optId : record.data.optId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.optId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
