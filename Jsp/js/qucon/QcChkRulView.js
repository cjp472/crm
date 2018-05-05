/**
 * @author:cf0666@gmail.com
 * @class QcChkRulView
 * @extends Ext.Panel
 * @description [QcChkRul]管理
 * @company 优创融联科技
 * @createtime:
 */
QcChkRulView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcChkRulView.superclass.constructor.call(this, {
							id : 'QcChkRulViewWin',
							title : '[QcChkRul]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'rulName',
											'规则名称',
																								new Ext.form.TextField({name : 'rulName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'objTyeId',
											'考核对象类型:联络历史、工单等',
																																																					new Ext.form.NumberField({name : 'objTyeId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'objSubTyeId',
											'考核对象子类型:联络历史的录音、邮件等',
																																																					new Ext.form.NumberField({name : 'objSubTyeId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'rulTimeSta',
											'开始时间',
																								new Ext.form.DateField({hiddenName : 'rulTimeSta',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'rulTimeEnd',
											'结束时间',
																								new Ext.form.DateField({hiddenName : 'rulTimeEnd',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'rulStaId',
											'规则状态',
																																																					new Ext.form.NumberField({name : 'rulStaId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var QcChkRulAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcChkRul]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcChkRulSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_rulName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_objTyeId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_objSubTyeId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_rulTimeSta_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_rulTimeEnd_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_rulStaId_SN_EQ',
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
										handler :function(){ new QcChkRulAdvancedSearchWin().show();}
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
									//text : __create+'[QcChkRul]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcChkRul]',
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
					id:'QcChkRulGrid',
					url : __ctxPath + "/qucon/listQcChkRul.do",
					fields : [{
									name : 'chkRulId',
									type : 'int'
								}
																																																																			,'rulName'
																																																																								,'objTyeId'
																																																																								,'objSubTyeId'
																																																																								,'rulTimeSta'
																																																																								,'rulTimeEnd'
																																																																								,'rulStaId'
																																																],
					columns:[
								{
									header : 'chkRulId',
									dataIndex : 'chkRulId',
									hidden : true
								}
																																																								,{
																	header : '规则名称',
																isExp : false,
																
																	dataIndex : 'rulName'
																}
																																																,{
																	header : '考核对象类型:联络历史、工单等',
																isExp : false,
																
																	dataIndex : 'objTyeId'
																}
																																																,{
																	header : '考核对象子类型:联络历史的录音、邮件等',
																isExp : false,
																
																	dataIndex : 'objSubTyeId'
																}
																																																,{
																	header : '开始时间',
																isExp : false,
																
																	dataIndex : 'rulTimeSta'
																}
																																																,{
																	header : '结束时间',
																isExp : false,
																
																	dataIndex : 'rulTimeEnd'
																}
																																																,{
																	header : '规则状态',
																isExp : false,
																
																	dataIndex : 'rulStaId'
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
					new QcChkRulForm({chkRulId:rec.data.chkRulId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcChkRulForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkRulForm');
				if (aForm != null) {
					tabs.remove('QcChkRulForm');
				}
				aForm = new QcChkRulForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/qucon/multiDelQcChkRul.do',
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
					url:__ctxPath + '/qucon/multiDelQcChkRul.do',
					grid:this.gridPanel,
					idName:'chkRulId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcChkRulForm({
				//	chkRulId : record.data.chkRulId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkRulForm');
				if (aForm != null) {
					tabs.remove('QcChkRulForm');
				}
				aForm = new QcChkRulForm({chkRulId : record.data.chkRulId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.chkRulId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
