/**
 * @author:cf0666@gmail.com
 * @class UnimChaTarParView
 * @extends Ext.Panel
 * @description [UnimChaTarPar]管理
 * @company 优创融联科技
 * @createtime:
 */
UnimChaTarParView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimChaTarParView.superclass.constructor.call(this, {
							id : 'UnimChaTarParViewWin',
							title : '[UnimChaTarPar]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'targetId',
											'指标ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listtargetId.do',
															fields : [ 'targetId', 'targetIdName' ]
														}),
														displayField : 'targetIdName',
														valueField : 'targetId',
														id : 'targetId'
														})
																																			 ]
																				,
																			 								 																																		[
											'channelId',
											'渠道ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listchannelId.do',
															fields : [ 'channelId', 'channelIdName' ]
														}),
														displayField : 'channelIdName',
														valueField : 'channelId',
														id : 'channelId'
														})
																																			 ]
																				,
																			 								 																																		[
											'paraName',
											'参数名称',
																								new Ext.form.TextField({name : 'paraName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'paraValue',
											'参数值',
																								new Ext.form.TextField({name : 'paraValue',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'orderno',
											'顺序号',
																																																					new Ext.form.NumberField({name : 'orderno',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'status',
											'状态：启用、注销',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var UnimChaTarParAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UnimChaTarPar]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimChaTarParSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_targetId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listtargetId.do',
															fields : [ 'targetId', 'targetIdName' ]
														}),
														displayField : 'targetIdName',
														valueField : 'targetId',
														id : 'targetId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_channelId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listchannelId.do',
															fields : [ 'channelId', 'channelIdName' ]
														}),
														displayField : 'channelIdName',
														valueField : 'channelId',
														id : 'channelId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_paraName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_paraValue_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_orderno_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_status_SN_EQ',
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
										handler :function(){ new UnimChaTarParAdvancedSearchWin().show();}
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
									//text : __create+'[UnimChaTarPar]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[UnimChaTarPar]',
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
					id:'UnimChaTarParGrid',
					url : __ctxPath + "/unim/listUnimChaTarPar.do",
					fields : [{
									name : 'paraId',
									type : 'int'
								}
																																																																			,'unimChaTarPar'
																																																																								,'unimChaTarPar'
																																																																								,'paraName'
																																																																								,'paraValue'
																																																																								,'remark'
																																																																								,'orderno'
																																																																								,'status'
																																																],
					columns:[
								{
									header : 'paraId',
									dataIndex : 'paraId',
									hidden : true
								}
																																																								,{
																	header : '指标ID',
																isExp : false,
																
																    dataIndex : 'targetId',
								    renderer:function(val){
								    	return val.targetIdName;
								    }
																}
																																																,{
																	header : '渠道ID',
																isExp : false,
																
																    dataIndex : 'channelId',
								    renderer:function(val){
								    	return val.channelIdName;
								    }
																}
																																																,{
																	header : '参数名称',
																isExp : false,
																
																	dataIndex : 'paraName'
																}
																																																,{
																	header : '参数值',
																isExp : false,
																
																	dataIndex : 'paraValue'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '顺序号',
																isExp : false,
																
																	dataIndex : 'orderno'
																}
																																																,{
																	header : '状态：启用、注销',
																isExp : false,
																
																	dataIndex : 'status'
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
//				var searchPanel = Ext.getCmp('UnimChaTarParSearchPanel');
//				var gridPanel = Ext.getCmp('UnimChaTarParGrid');
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
					new UnimChaTarParForm({paraId:rec.data.paraId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UnimChaTarParForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimChaTarParForm');
				if (aForm != null) {
					tabs.remove('UnimChaTarParForm');
				}
				aForm = new UnimChaTarParForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/unim/multiDelUnimChaTarPar.do',
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
					url:__ctxPath + '/unim/multiDelUnimChaTarPar.do',
					grid:this.gridPanel,
					idName:'paraId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new UnimChaTarParForm({
				//	paraId : record.data.paraId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimChaTarParForm');
				if (aForm != null) {
					tabs.remove('UnimChaTarParForm');
				}
				aForm = new UnimChaTarParForm({paraId : record.data.paraId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.paraId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
