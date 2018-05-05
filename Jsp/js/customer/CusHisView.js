/**
 * @author:cf0666@gmail.com
 * @class CusHisView
 * @extends Ext.Panel
 * @description [CusHis]管理
 * @company 优创融联科技
 * @createtime:
 */
CusHisView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CusHisView.superclass.constructor.call(this, {
							id : 'CusHisViewWin',
							title : '[CusHis]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'customerid',
											'客户ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/financial/combocustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
														})
																																			 ]
																				,
																			 								 																																		[
											'opeUseId',
											'操作人',
																																																					new Ext.form.NumberField({name : 'opeUseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'rowDat',
											'记录时间',
																								new Ext.form.DateField({hiddenName : 'rowDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'opeTypId',
											'操作类型：手工录入、导入、复制生成、修改、分配、回收、拨打',
																																																					new Ext.form.NumberField({name : 'opeTypId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'opeResDesc',
											'操作结果描述',
																								new Ext.form.TextField({name : 'opeResDesc',allowBlank:true})
																						 ]
																			 								 							 											]
				var CusHisAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CusHis]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CusHisSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_customerid_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/financial/combocustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
																																														}
																				,
																			 								 																																		 										 										{
																																																													
																						
																																				name : 'Q_opeUseId_N_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_rowDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_opeTypId_SN_EQ',
																																																																													xtype:'numberfield'
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
										handler : new CusHisAdvancedSearchWin().show()
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
									text : __create+'[CusHis]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : __delete+'[CusHis]',
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
					id:'CusHisGrid',
					url : __ctxPath + "/customer/listCusHis.do",
					fields : [{
									name : 'opeHisId',
									type : 'int'
								}
																																																																			,'cusHis'
																																																																								,'opeUseId'
																																																																								,'rowDat'
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
																	header : '客户ID',
																isExp : false,
																
																    dataIndex : 'customerid',
								    renderer:function(val){
								    	return val.customeridName;
								    }
																}
																																																,{
																	header : '操作人',
																isExp : false,
																
																	dataIndex : 'opeUseId'
																}
																																																,{
																	header : '记录时间',
																isExp : false,
																
																	dataIndex : 'rowDat'
																}
																																																,{
																	header : '操作类型：手工录入、导入、复制生成、修改、分配、回收、拨打',
																isExp : false,
																
																	dataIndex : 'opeTypId'
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
					new CusHisForm({opeHisId:rec.data.opeHisId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CusHisForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusHisForm');
				if (aForm != null) {
					tabs.remove('CusHisForm');
				}
				aForm = new CusHisForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/customer/multiDelCusHis.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/customer/multiDelCusHis.do',
					grid:this.gridPanel,
					idName:'opeHisId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new CusHisForm({
					opeHisId : record.data.opeHisId
				}).show();
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
