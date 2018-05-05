/**
 * @author:cf0666@gmail.com
 * @class SysParaOptView
 * @extends Ext.Panel
 * @description [SysParaOpt]管理
 * @company 优创融联科技
 * @createtime:
 */
SysParaOptView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				SysParaOptView.superclass.constructor.call(this, {
							id : 'SysParaOptViewWin',
							title : '[SysParaOpt]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'sysParaId',
											'系统参数内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listsysParaId.do',
															fields : [ 'sysParaId', 'sysParaIdName' ]
														}),
														displayField : 'sysParaIdName',
														valueField : 'sysParaId',
														id : 'sysParaId'
														})
																																			 ]
																				,
																			 								 																																		[
											'sysParaOptName',
											'系统参数选项名称',
																								new Ext.form.TextField({name : 'sysParaOptName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'sysParaOptValue',
											'系统参数选项值',
																								new Ext.form.TextField({name : 'sysParaOptValue',allowBlank:true})
																						 ]
																			 								 							 											]
				var SysParaOptAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[SysParaOpt]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'SysParaOptSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_sysParaId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listsysParaId.do',
															fields : [ 'sysParaId', 'sysParaIdName' ]
														}),
														displayField : 'sysParaIdName',
														valueField : 'sysParaId',
														id : 'sysParaId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_sysParaOptName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_sysParaOptValue_S_EQ',
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
										handler :function(){ new SysParaOptAdvancedSearchWin().show();}
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
									//text : __create+'[SysParaOpt]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[SysParaOpt]',
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
					id:'SysParaOptGrid',
					url : __ctxPath + "/customer/listSysParaOpt.do",
					fields : [{
									name : 'sysParaOptId',
									type : 'int'
								}
																																																																			,'sysParaOpt'
																																																																								,'sysParaOptName'
																																																																								,'sysParaOptValue'
																																																],
					columns:[
								{
									header : 'sysParaOptId',
									dataIndex : 'sysParaOptId',
									hidden : true
								}
																																																								,{
																	header : '系统参数内码',
																isExp : false,
																
																    dataIndex : 'sysParaId',
								    renderer:function(val){
								    	return val.sysParaIdName;
								    }
																}
																																																,{
																	header : '系统参数选项名称',
																isExp : false,
																
																	dataIndex : 'sysParaOptName'
																}
																																																,{
																	header : '系统参数选项值',
																isExp : false,
																
																	dataIndex : 'sysParaOptValue'
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
//				var searchPanel = Ext.getCmp('SysParaOptSearchPanel');
//				var gridPanel = Ext.getCmp('SysParaOptGrid');
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
					new SysParaOptForm({sysParaOptId:rec.data.sysParaOptId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new SysParaOptForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('SysParaOptForm');
				if (aForm != null) {
					tabs.remove('SysParaOptForm');
				}
				aForm = new SysParaOptForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/customer/multiDelSysParaOpt.do',
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
					url:__ctxPath + '/customer/multiDelSysParaOpt.do',
					grid:this.gridPanel,
					idName:'sysParaOptId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new SysParaOptForm({
				//	sysParaOptId : record.data.sysParaOptId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('SysParaOptForm');
				if (aForm != null) {
					tabs.remove('SysParaOptForm');
				}
				aForm = new SysParaOptForm({sysParaOptId : record.data.sysParaOptId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.sysParaOptId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
