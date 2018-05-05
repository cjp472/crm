/**
 * @author:cf0666@gmail.com
 * @class PapAnsDetailView
 * @extends Ext.Panel
 * @description [PapAnsDetail]管理
 * @company 优创融联科技
 * @createtime:
 */
PapAnsDetailView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				PapAnsDetailView.superclass.constructor.call(this, {
							id : 'PapAnsDetailViewWin',
							title : '[PapAnsDetail]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'papQueId',
											'问卷题目ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/pap/listpapQueId.do',
															fields : [ 'papQueId', 'papQueIdName' ]
														}),
														displayField : 'papQueIdName',
														valueField : 'papQueId',
														id : 'papQueId'
														})
																																			 ]
																				,
																			 								 																																		[
											'optId',
											'题项编号ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/pap/listoptId.do',
															fields : [ 'optId', 'optIdName' ]
														}),
														displayField : 'optIdName',
														valueField : 'optId',
														id : 'optId'
														})
																																			 ]
																				,
																			 								 																																		[
											'papAnsId',
											'问卷结果内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/pap/listpapAnsId.do',
															fields : [ 'papAnsId', 'papAnsIdName' ]
														}),
														displayField : 'papAnsIdName',
														valueField : 'papAnsId',
														id : 'papAnsId'
														})
																																			 ]
																				,
																			 								 																																		[
											'ans',
											'答案',
																								new Ext.form.TextField({name : 'ans',allowBlank:true})
																						 ]
																			 								 							 											]
				var PapAnsDetailAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[PapAnsDetail]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'PapAnsDetailSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_papQueId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/pap/listpapQueId.do',
															fields : [ 'papQueId', 'papQueIdName' ]
														}),
														displayField : 'papQueIdName',
														valueField : 'papQueId',
														id : 'papQueId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_optId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/pap/listoptId.do',
															fields : [ 'optId', 'optIdName' ]
														}),
														displayField : 'optIdName',
														valueField : 'optId',
														id : 'optId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_papAnsId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/pap/listpapAnsId.do',
															fields : [ 'papAnsId', 'papAnsIdName' ]
														}),
														displayField : 'papAnsIdName',
														valueField : 'papAnsId',
														id : 'papAnsId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ans_S_EQ',
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
										handler :function(){ new PapAnsDetailAdvancedSearchWin().show();}
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
									//text : __create+'[PapAnsDetail]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[PapAnsDetail]',
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
					id:'PapAnsDetailGrid',
					url : __ctxPath + "/pap/listPapAnsDetail.do",
					fields : [{
									name : 'ansDetailId',
									type : 'int'
								}
																																																																			,'papAnsDetail'
																																																																								,'papAnsDetail'
																																																																								,'papAnsDetail'
																																																																								,'ans'
																																																],
					columns:[
								{
									header : 'ansDetailId',
									dataIndex : 'ansDetailId',
									hidden : true
								}
																																																								,{
																	header : '问卷题目ID',
																isExp : false,
																
																    dataIndex : 'papQueId',
								    renderer:function(val){
								    	return val.papQueIdName;
								    }
																}
																																																,{
																	header : '题项编号ID',
																isExp : false,
																
																    dataIndex : 'optId',
								    renderer:function(val){
								    	return val.optIdName;
								    }
																}
																																																,{
																	header : '问卷结果内码',
																isExp : false,
																
																    dataIndex : 'papAnsId',
								    renderer:function(val){
								    	return val.papAnsIdName;
								    }
																}
																																																,{
																	header : '答案',
																isExp : false,
																
																	dataIndex : 'ans'
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
					new PapAnsDetailForm({ansDetailId:rec.data.ansDetailId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new PapAnsDetailForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('PapAnsDetailForm');
				if (aForm != null) {
					tabs.remove('PapAnsDetailForm');
				}
				aForm = new PapAnsDetailForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/pap/multiDelPapAnsDetail.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/pap/multiDelPapAnsDetail.do',
					grid:this.gridPanel,
					idName:'ansDetailId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new PapAnsDetailForm({
				//	ansDetailId : record.data.ansDetailId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('PapAnsDetailForm');
				if (aForm != null) {
					tabs.remove('PapAnsDetailForm');
				}
				aForm = new PapAnsDetailForm({ansDetailId : record.data.ansDetailId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.ansDetailId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
