/**
 * @author:cf0666@gmail.com
 * @class UkRelativeKnowView
 * @extends Ext.Panel
 * @description [UkRelativeKnow]管理
 * @company 优创融联科技
 * @createtime:
 */
UkRelativeKnowView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UkRelativeKnowView.superclass.constructor.call(this, {
							id : 'UkRelativeKnowViewWin',
							title : '[UkRelativeKnow]管理',
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
											'ukKnowId',
											'关联系统知识内码',
																																																					new Ext.form.NumberField({name : 'ukKnowId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				UkRelativeKnowAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UkRelativeKnow]高级查询',
					fieldData : fieldnameComboData
					
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UkRelativeKnowSearchPanel',
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
																																																													
																						
																																				name : 'Q_ukKnowId_L_EQ',
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
										handler : new UkRelativeKnowAdvancedSearchWin().show()
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
									text : __create+'[UkRelativeKnow]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : __delete+'[UkRelativeKnow]',
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
					id:'UkRelativeKnowGrid',
					url : __ctxPath + "/know/listUkRelativeKnow.do",
					fields : [{
									name : 'relativeId',
									type : 'int'
								}
																																																																			,'ukRelativeKnow'
																																																																								,'ukKnowId'
																																																],
					columns:[
								{
									header : 'relativeId',
									dataIndex : 'relativeId',
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
																	header : '关联系统知识内码',
																isExp : false,
																
																	dataIndex : 'ukKnowId'
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
					new UkRelativeKnowForm({relativeId:rec.data.relativeId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UkRelativeKnowForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkRelativeKnowForm');
				if (aForm != null) {
					tabs.remove('UkRelativeKnowForm');
				}
				aForm = new UkRelativeKnowForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/know/multiDelUkRelativeKnow.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/know/multiDelUkRelativeKnow.do',
					grid:this.gridPanel,
					idName:'relativeId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new UkRelativeKnowForm({
					relativeId : record.data.relativeId
				}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.relativeId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
