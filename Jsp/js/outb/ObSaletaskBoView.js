/**
 * @author:cf0666@gmail.com
 * @class ObSaletaskBoView
 * @extends Ext.Panel
 * @description [ObSaletaskBo]管理
 * @company 优创融联科技
 * @createtime:
 */
ObSaletaskBoView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObSaletaskBoView.superclass.constructor.call(this, {
							id : 'ObSaletaskBoViewWin',
							title : '[ObSaletaskBo]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'saletaskId',
											'营销任务内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listsaletaskId.do',
															fields : [ 'saletaskId', 'saletaskIdName' ]
														}),
														displayField : 'saletaskIdName',
														valueField : 'saletaskId',
														id : 'saletaskId'
														})
																																			 ]
																				,
																			 								 																																		[
											'booTim',
											'预约时间',
																								new Ext.form.DateField({hiddenName : 'booTim',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'conCusId',
											'被联络人内码',
																																																					new MT.DicComboBox({hiddenName : 'conCusId',itemKey : 'CONOB_SALETASK_BO_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'tasMetId',
											'联系方式：0-电话、1-传真、2-短信、3-电邮、4-邮寄&CONOB_SALETASK_BO_LXFS',
																																																					new MT.DicComboBox({hiddenName : 'tasMetId',itemKey : 'CONOB_SALETASK_BO_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'conNumber',
											'地址/号码',
																								new Ext.form.TextField({name : 'conNumber',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'booStaId',
											'状态：0-待执行、1-已执行、2-已取消&CONOB_SALETASK_BO_ZT',
																																																					new MT.DicComboBox({hiddenName : 'booStaId',itemKey : 'CONOB_SALETASK_BO_ZT'})
																																																	 ]
																			 								 							 											]
				var ObSaletaskBoAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObSaletaskBo]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObSaletaskBoSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_saletaskId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/outb/listsaletaskId.do',
															fields : [ 'saletaskId', 'saletaskIdName' ]
														}),
														displayField : 'saletaskIdName',
														valueField : 'saletaskId',
														id : 'saletaskId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_booTim_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_conCusId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_tasMetId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_SALETASK_BO_LXFS'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_conNumber_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_booStaId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CONOB_SALETASK_BO_ZT'
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
										handler :function(){ new ObSaletaskBoAdvancedSearchWin().show();}
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
									//text : __create+'[ObSaletaskBo]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ObSaletaskBo]',
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
					id:'ObSaletaskBoGrid',
					url : __ctxPath + "/outb/listObSaletaskBo.do",
					fields : [{
									name : 'saletaskBoId',
									type : 'int'
								}
																																																																			,'obSaletaskBo'
																																																																								,'booTim'
																																																																								,'conCusId'
																																																																								,'tasMetId'
																																																																								,'conNumber'
																																																																								,'remark'
																																																																								,'booStaId'
																																																],
					columns:[
								{
									header : 'saletaskBoId',
									dataIndex : 'saletaskBoId',
									hidden : true
								}
																																																								,{
																	header : '营销任务内码',
																isExp : false,
																
																    dataIndex : 'saletaskId',
								    renderer:function(val){
								    	return val.saletaskIdName;
								    }
																}
																																																,{
																	header : '预约时间',
																isExp : false,
																
																	dataIndex : 'booTim'
																}
																																																,{
																	header : '被联络人内码',
																isExp : false,
																
																	dataIndex : 'conCusId'
																}
																																																,{
																	header : '联系方式：0-电话、1-传真、2-短信、3-电邮、4-邮寄&CONOB_SALETASK_BO_LXFS',
																isExp : false,
																
																	dataIndex : 'tasMetId',
									renderer : function(value) {
										return CONOB_SALETASK_BO_LXFS.get(value);
									}
																}
																																																,{
																	header : '地址/号码',
																isExp : false,
																
																	dataIndex : 'conNumber'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '状态：0-待执行、1-已执行、2-已取消&CONOB_SALETASK_BO_ZT',
																isExp : false,
																
																	dataIndex : 'booStaId',
									renderer : function(value) {
										return CONOB_SALETASK_BO_ZT.get(value);
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
					new ObSaletaskBoForm({saletaskBoId:rec.data.saletaskBoId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ObSaletaskBoForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObSaletaskBoForm');
				if (aForm != null) {
					tabs.remove('ObSaletaskBoForm');
				}
				aForm = new ObSaletaskBoForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/outb/multiDelObSaletaskBo.do',
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
					url:__ctxPath + '/outb/multiDelObSaletaskBo.do',
					grid:this.gridPanel,
					idName:'saletaskBoId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ObSaletaskBoForm({
				//	saletaskBoId : record.data.saletaskBoId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObSaletaskBoForm');
				if (aForm != null) {
					tabs.remove('ObSaletaskBoForm');
				}
				aForm = new ObSaletaskBoForm({saletaskBoId : record.data.saletaskBoId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.saletaskBoId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
