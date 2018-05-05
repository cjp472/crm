/**
 * @author:cf0666@gmail.com
 * @class CtScrTemGotoRuleView
 * @extends Ext.Panel
 * @description [CtScrTemGotoRule]管理
 * @company 优创融联科技
 * @createtime:
 */
CtScrTemGotoRuleView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CtScrTemGotoRuleView.superclass.constructor.call(this, {
							id : 'CtScrTemGotoRuleViewWin',
							title : '[CtScrTemGotoRule]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'tmpId',
											'话术',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
														})
																																			 ]
																				,
																			 								 																																		[
											'queId',
											'题目',
																																																					new Ext.form.NumberField({name : 'queId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'optVal',
											'题项编号：对应数据字典或题项表ID',
																								new Ext.form.TextField({name : 'optVal',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'tarQueId',
											'目标题目',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listtarQueId.do',
															fields : [ 'tarQueId', 'tarQueIdName' ]
														}),
														displayField : 'tarQueIdName',
														valueField : 'tarQueId',
														id : 'tarQueId'
														})
																																			 ]
																			 								 							 											]
				var CtScrTemGotoRuleAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CtScrTemGotoRule]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CtScrTemGotoRuleSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_tmpId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_queId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_optVal_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_tarQueId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listtarQueId.do',
															fields : [ 'tarQueId', 'tarQueIdName' ]
														}),
														displayField : 'tarQueIdName',
														valueField : 'tarQueId',
														id : 'tarQueId'
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
										handler :function(){ new CtScrTemGotoRuleAdvancedSearchWin().show();}
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
									//text : __create+'[CtScrTemGotoRule]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CtScrTemGotoRule]',
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
					id:'CtScrTemGotoRuleGrid',
					url : __ctxPath + "/comtech/listCtScrTemGotoRule.do",
					fields : [{
									name : 'scrTemGotoRuleId',
									type : 'int'
								}
																																																																			,'ctScrTemGotoRule'
																																																																								,'queId'
																																																																								,'optVal'
																																																																								,'ctScrTemGotoRule'
																																																],
					columns:[
								{
									header : 'scrTemGotoRuleId',
									dataIndex : 'scrTemGotoRuleId',
									hidden : true
								}
																																																								,{
																	header : '话术',
																isExp : false,
																
																    dataIndex : 'tmpId',
								    renderer:function(val){
								    	return val.tmpIdName;
								    }
																}
																																																,{
																	header : '题目',
																isExp : false,
																
																	dataIndex : 'queId'
																}
																																																,{
																	header : '题项编号：对应数据字典或题项表ID',
																isExp : false,
																
																	dataIndex : 'optVal'
																}
																																																,{
																	header : '目标题目',
																isExp : false,
																
																    dataIndex : 'tarQueId',
								    renderer:function(val){
								    	return val.tarQueIdName;
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
					new CtScrTemGotoRuleForm({scrTemGotoRuleId:rec.data.scrTemGotoRuleId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CtScrTemGotoRuleForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrTemGotoRuleForm');
				if (aForm != null) {
					tabs.remove('CtScrTemGotoRuleForm');
				}
				aForm = new CtScrTemGotoRuleForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/comtech/multiDelCtScrTemGotoRule.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/comtech/multiDelCtScrTemGotoRule.do',
					grid:this.gridPanel,
					idName:'scrTemGotoRuleId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CtScrTemGotoRuleForm({
				//	scrTemGotoRuleId : record.data.scrTemGotoRuleId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrTemGotoRuleForm');
				if (aForm != null) {
					tabs.remove('CtScrTemGotoRuleForm');
				}
				aForm = new CtScrTemGotoRuleForm({scrTemGotoRuleId : record.data.scrTemGotoRuleId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.scrTemGotoRuleId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
