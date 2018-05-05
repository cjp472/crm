/**
 * @author:cf0666@gmail.com
 * @class UkPerKnowView
 * @extends Ext.Panel
 * @description [UkPerKnow]管理
 * @company 优创融联科技
 * @createtime:
 */
UkPerKnowView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UkPerKnowView.superclass.constructor.call(this, {
							id : 'UkPerKnowViewWin',
							title : '[UkPerKnow]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'knowId',
											'系统知识内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/financial/comboknowId.do',
															fields : [ 'knowId', 'knowIdName' ]
														}),
														displayField : 'knowIdName',
														valueField : 'knowId',
														id : 'knowId'
														})
																																			 ]
																				,
																			 								 																																		[
											'userid',
											'用户',
																																																					new Ext.form.NumberField({name : 'userid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'operateType',
											'操作类型&KNOW_OPERATE_TYPE',
																																																					new Ext.form.NumberField({name : 'operateType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'operateTime',
											'操作时间',
																								new Ext.form.DateField({hiddenName : 'operateTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'status',
											'状态&KNOW_STATUS',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'readTime',
											'阅读时间',
																								new Ext.form.DateField({hiddenName : 'readTime',format : 'Y-m-d'})
																						 ]
																			 								 							 											]
				var UkPerKnowAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UkPerKnow]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UkPerKnowSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_knowId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/financial/comboknowId.do',
															fields : [ 'knowId', 'knowIdName' ]
														}),
														displayField : 'knowIdName',
														valueField : 'knowId',
														id : 'knowId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_userid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_operateType_L_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : false,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'KNOW_OPERATE_TYPE'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_operateTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_status_L_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : false,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'KNOW_STATUS'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_readTime_D_EQ',
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
										handler : new UkPerKnowAdvancedSearchWin().show()
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
									text : __create+'[UkPerKnow]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : __delete+'[UkPerKnow]',
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
					id:'UkPerKnowGrid',
					url : __ctxPath + "/know/listUkPerKnow.do",
					fields : [{
									name : 'perKnowId',
									type : 'int'
								}
																																																																			,'ukPerKnow'
																																																																								,'userid'
																																																																								,'operateType'
																																																																								,'operateTime'
																																																																								,'status'
																																																																								,'readTime'
																																																],
					columns:[
								{
									header : 'perKnowId',
									dataIndex : 'perKnowId',
									hidden : true
								}
																																																								,{
																	header : '系统知识内码',
																isExp : false,
																
																    dataIndex : 'knowId',
								    renderer:function(val){
								    	return val.knowIdName;
								    }
																}
																																																,{
																	header : '用户',
																isExp : false,
																
																	dataIndex : 'userid'
																}
																																																,{
																	header : '操作类型&KNOW_OPERATE_TYPE',
																isExp : false,
																
																	dataIndex : 'operateType',
									renderer : function(value) {
										return KNOW_OPERATE_TYPE.value;
									}
																}
																																																,{
																	header : '操作时间',
																isExp : false,
																
																	dataIndex : 'operateTime'
																}
																																																,{
																	header : '状态&KNOW_STATUS',
																isExp : false,
																
																	dataIndex : 'status',
									renderer : function(value) {
										return KNOW_STATUS.value;
									}
																}
																																																,{
																	header : '阅读时间',
																isExp : false,
																
																	dataIndex : 'readTime'
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
					new UkPerKnowForm({perKnowId:rec.data.perKnowId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UkPerKnowForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkPerKnowForm');
				if (aForm != null) {
					tabs.remove('UkPerKnowForm');
				}
				aForm = new UkPerKnowForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/know/multiDelUkPerKnow.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/know/multiDelUkPerKnow.do',
					grid:this.gridPanel,
					idName:'perKnowId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new UkPerKnowForm({
					perKnowId : record.data.perKnowId
				}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.perKnowId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
