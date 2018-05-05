/**
 * @author:cf0666@gmail.com
 * @class CusDeliveryView
 * @extends Ext.Panel
 * @description [CusDelivery]管理
 * @company 优创融联科技
 * @createtime:
 */
CusDeliveryView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CusDeliveryView.superclass.constructor.call(this, {
							id : 'CusDeliveryViewWin',
							title : '[CusDelivery]管理',
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
											'客户内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listcustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
														})
																																			 ]
																				,
																			 								 																																		[
											'regionid',
											'地区内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listregionid.do',
															fields : [ 'regionid', 'regionidName' ]
														}),
														displayField : 'regionidName',
														valueField : 'regionid',
														id : 'regionid'
														})
																																			 ]
																				,
																			 								 																																		[
											'deliveryAddress',
											'地址',
																								new Ext.form.TextField({name : 'deliveryAddress',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'deliveryName',
											'姓名',
																								new Ext.form.TextField({name : 'deliveryName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'deliveryPhone',
											'电话',
																								new Ext.form.TextField({name : 'deliveryPhone',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'creUseId',
											'创建人ID',
																																																					new Ext.form.NumberField({name : 'creUseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'creDat',
											'创建日期',
																								new Ext.form.DateField({hiddenName : 'creDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'updUseId',
											'修改人ID',
																																																					new Ext.form.NumberField({name : 'updUseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updDat',
											'修改日期',
																								new Ext.form.DateField({hiddenName : 'updDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'note',
											'备注',
																								new Ext.form.TextField({name : 'note',allowBlank:true})
																						 ]
																			 								 							 											]
				var CusDeliveryAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CusDelivery]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CusDeliverySearchPanel',
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
															url : __ctxPath + '/customer/listcustomerid.do',
															fields : [ 'customerid', 'customeridName' ]
														}),
														displayField : 'customeridName',
														valueField : 'customerid',
														id : 'customerid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_regionid_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listregionid.do',
															fields : [ 'regionid', 'regionidName' ]
														}),
														displayField : 'regionidName',
														valueField : 'regionid',
														id : 'regionid'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_deliveryAddress_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_deliveryName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_deliveryPhone_S_EQ',
																																																xtype : 'textfield'
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
																																																													
																						
																																				name : 'Q_updUseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_note_S_EQ',
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
										handler :function(){ new CusDeliveryAdvancedSearchWin().show();}
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
									//text : __create+'[CusDelivery]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CusDelivery]',
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
					id:'CusDeliveryGrid',
					url : __ctxPath + "/customer/listCusDelivery.do",
					fields : [{
									name : 'deliveryId',
									type : 'int'
								}
																																																																			,'cusDelivery'
																																																																								,'cusDelivery'
																																																																								,'deliveryAddress'
																																																																								,'deliveryName'
																																																																								,'deliveryPhone'
																																																																								,'creUseId'
																																																																								,'creDat'
																																																																								,'updUseId'
																																																																								,'updDat'
																																																																								,'note'
																																																],
					columns:[
								{
									header : 'deliveryId',
									dataIndex : 'deliveryId',
									hidden : true
								}
																																																								,{
																	header : '客户内码',
																isExp : false,
																
																    dataIndex : 'customerid',
								    renderer:function(val){
								    	return val.customeridName;
								    }
																}
																																																,{
																	header : '地区内码',
																isExp : false,
																
																    dataIndex : 'regionid',
								    renderer:function(val){
								    	return val.regionidName;
								    }
																}
																																																,{
																	header : '地址',
																isExp : false,
																
																	dataIndex : 'deliveryAddress'
																}
																																																,{
																	header : '姓名',
																isExp : false,
																
																	dataIndex : 'deliveryName'
																}
																																																,{
																	header : '电话',
																isExp : false,
																
																	dataIndex : 'deliveryPhone'
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
																	header : '修改人ID',
																isExp : false,
																
																	dataIndex : 'updUseId'
																}
																																																,{
																	header : '修改日期',
																isExp : false,
																
																	dataIndex : 'updDat'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'note'
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
//				var searchPanel = Ext.getCmp('CusDeliverySearchPanel');
//				var gridPanel = Ext.getCmp('CusDeliveryGrid');
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
					new CusDeliveryForm({deliveryId:rec.data.deliveryId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CusDeliveryForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusDeliveryForm');
				if (aForm != null) {
					tabs.remove('CusDeliveryForm');
				}
				aForm = new CusDeliveryForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/customer/multiDelCusDelivery.do',
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
					url:__ctxPath + '/customer/multiDelCusDelivery.do',
					grid:this.gridPanel,
					idName:'deliveryId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CusDeliveryForm({
				//	deliveryId : record.data.deliveryId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusDeliveryForm');
				if (aForm != null) {
					tabs.remove('CusDeliveryForm');
				}
				aForm = new CusDeliveryForm({deliveryId : record.data.deliveryId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.deliveryId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
