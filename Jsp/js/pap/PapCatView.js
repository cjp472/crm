/**
 * @author:cf0666@gmail.com
 * @class PapCatView
 * @extends Ext.Panel
 * @description [PapCat]管理
 * @company 优创融联科技
 * @createtime:
 */
PapCatView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				PapCatView.superclass.constructor.call(this, {
							id : 'PapCatViewWin',
							title : '[PapCat]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'parQueCatId',
											'父级题库',
																																																					new MT.DicComboBox({hiddenName : 'parQueCatId',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'queCatName',
											'名称',
																								new Ext.form.TextField({name : 'queCatName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'disorder',
											'序号',
																																																					new MT.DicComboBox({hiddenName : 'disorder',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'creUseId',
											'创建人ID',
																																																					new MT.DicComboBox({hiddenName : 'creUseId',itemKey : 'PAP_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'creDat',
											'创建日期',
																								new Ext.form.DateField({hiddenName : 'creDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'staId',
											'状态：有效、注销&PAP_ZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'PAP_ZT'})
																																																	 ]
																			 								 							 											]
				var PapCatAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[PapCat]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'PapCatSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_parQueCatId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_queCatName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_disorder_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creUseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_staId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'PAP_ZT'
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
										handler :function(){ new PapCatAdvancedSearchWin().show();}
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
									//text : __create+'[PapCat]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[PapCat]',
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
					id:'PapCatGrid',
					url : __ctxPath + "/pap/listPapCat.do",
					fields : [{
									name : 'queCatId',
									type : 'int'
								}
																																																																			,'parQueCatId'
																																																																								,'queCatName'
																																																																								,'disorder'
																																																																								,'creUseId'
																																																																								,'creDat'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'queCatId',
									dataIndex : 'queCatId',
									hidden : true
								}
																																																								,{
																	header : '父级题库',
																isExp : false,
																
																	dataIndex : 'parQueCatId'
																}
																																																,{
																	header : '名称',
																isExp : false,
																
																	dataIndex : 'queCatName'
																}
																																																,{
																	header : '序号',
																isExp : false,
																
																	dataIndex : 'disorder'
																}
																																																,{
																	header : '创建人ID',
																isExp : false,
																
																	dataIndex : 'creUseId'
																}
																																																,{
																	header : '创建日期',
																isExp : false,
																
																	dataIndex : 'creDat'
																}
																																																,{
																	header : '状态：有效、注销&PAP_ZT',
																isExp : false,
																
																	dataIndex : 'staId',
									renderer : function(value) {
										return PAP_ZT.value;
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
					new PapCatForm({queCatId:rec.data.queCatId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new PapCatForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('PapCatForm');
				if (aForm != null) {
					tabs.remove('PapCatForm');
				}
				aForm = new PapCatForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/pap/multiDelPapCat.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/pap/multiDelPapCat.do',
					grid:this.gridPanel,
					idName:'queCatId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new PapCatForm({
				//	queCatId : record.data.queCatId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('PapCatForm');
				if (aForm != null) {
					tabs.remove('PapCatForm');
				}
				aForm = new PapCatForm({queCatId : record.data.queCatId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.queCatId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});