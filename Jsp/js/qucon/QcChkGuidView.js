/**
 * @author:cf0666@gmail.com
 * @class QcChkGuidView
 * @extends Ext.Panel
 * @description [QcChkGuid]管理
 * @company 优创融联科技
 * @createtime:
 */
QcChkGuidView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcChkGuidView.superclass.constructor.call(this, {
							id : 'QcChkGuidViewWin',
							title : '[QcChkGuid]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'chkId',
											'考核结果内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listchkId.do',
															fields : [ 'chkId', 'chkIdName' ]
														}),
														displayField : 'chkIdName',
														valueField : 'chkId',
														id : 'chkId'
														})
																																			 ]
																				,
																			 								 																																		[
											'guidUseId',
											'辅导人',
																																																					new Ext.form.NumberField({name : 'guidUseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'guidContent',
											'辅导说明',
																								new Ext.form.TextField({name : 'guidContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'guidRemark',
											'辅导备注',
																								new Ext.form.TextField({name : 'guidRemark',allowBlank:true})
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
																			 								 							 											]
				var QcChkGuidAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcChkGuid]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcChkGuidSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_chkId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listchkId.do',
															fields : [ 'chkId', 'chkIdName' ]
														}),
														displayField : 'chkIdName',
														valueField : 'chkId',
														id : 'chkId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_guidUseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_guidContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_guidRemark_S_EQ',
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
										handler :function(){ new QcChkGuidAdvancedSearchWin().show();}
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
									//text : __create+'[QcChkGuid]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcChkGuid]',
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
					id:'QcChkGuidGrid',
					url : __ctxPath + "/qucon/listQcChkGuid.do",
					fields : [{
									name : 'chkGuidId',
									type : 'int'
								}
																																																																			,'qcChkGuid'
																																																																								,'guidUseId'
																																																																								,'guidContent'
																																																																								,'guidRemark'
																																																																								,'creUseId'
																																																																								,'creDat'
																																																																								,'updUseId'
																																																																								,'updDat'
																																																],
					columns:[
								{
									header : 'chkGuidId',
									dataIndex : 'chkGuidId',
									hidden : true
								}
																																																								,{
																	header : '考核结果内码',
																isExp : false,
																
																    dataIndex : 'chkId',
								    renderer:function(val){
								    	return val.chkIdName;
								    }
																}
																																																,{
																	header : '辅导人',
																isExp : false,
																
																	dataIndex : 'guidUseId'
																}
																																																,{
																	header : '辅导说明',
																isExp : false,
																
																	dataIndex : 'guidContent'
																}
																																																,{
																	header : '辅导备注',
																isExp : false,
																
																	dataIndex : 'guidRemark'
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
					new QcChkGuidForm({chkGuidId:rec.data.chkGuidId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcChkGuidForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkGuidForm');
				if (aForm != null) {
					tabs.remove('QcChkGuidForm');
				}
				aForm = new QcChkGuidForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/qucon/multiDelQcChkGuid.do',
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
					url:__ctxPath + '/qucon/multiDelQcChkGuid.do',
					grid:this.gridPanel,
					idName:'chkGuidId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcChkGuidForm({
				//	chkGuidId : record.data.chkGuidId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkGuidForm');
				if (aForm != null) {
					tabs.remove('QcChkGuidForm');
				}
				aForm = new QcChkGuidForm({chkGuidId : record.data.chkGuidId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.chkGuidId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});