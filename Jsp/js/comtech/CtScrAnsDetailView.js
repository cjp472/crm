/**
 * @author:cf0666@gmail.com
 * @class CtScrAnsDetailView
 * @extends Ext.Panel
 * @description [CtScrAnsDetail]管理
 * @company 优创融联科技
 * @createtime:
 */
CtScrAnsDetailView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CtScrAnsDetailView.superclass.constructor.call(this, {
							id : 'CtScrAnsDetailViewWin',
							title : '[CtScrAnsDetail]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'scrAnsId',
											'话术结果',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listscrAnsId.do',
															fields : [ 'scrAnsId', 'scrAnsIdName' ]
														}),
														displayField : 'scrAnsIdName',
														valueField : 'scrAnsId',
														id : 'scrAnsId'
														})
																																			 ]
																				,
																			 								 																																		[
											'scrQueId',
											'话术题目',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listscrQueId.do',
															fields : [ 'scrQueId', 'scrQueIdName' ]
														}),
														displayField : 'scrQueIdName',
														valueField : 'scrQueId',
														id : 'scrQueId'
														})
																																			 ]
																				,
																			 								 																																		[
											'optId',
											'题项编号',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listoptId.do',
															fields : [ 'optId', 'optIdName' ]
														}),
														displayField : 'optIdName',
														valueField : 'optId',
														id : 'optId'
														})
																																			 ]
																				,
																			 								 																																		[
											'ans',
											'答案',
																								new Ext.form.TextField({name : 'ans',allowBlank:true})
																						 ]
																			 								 							 											]
				var CtScrAnsDetailAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CtScrAnsDetail]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CtScrAnsDetailSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_scrAnsId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listscrAnsId.do',
															fields : [ 'scrAnsId', 'scrAnsIdName' ]
														}),
														displayField : 'scrAnsIdName',
														valueField : 'scrAnsId',
														id : 'scrAnsId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_scrQueId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listscrQueId.do',
															fields : [ 'scrQueId', 'scrQueIdName' ]
														}),
														displayField : 'scrQueIdName',
														valueField : 'scrQueId',
														id : 'scrQueId'
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
															url : __ctxPath + '/comtech/listoptId.do',
															fields : [ 'optId', 'optIdName' ]
														}),
														displayField : 'optIdName',
														valueField : 'optId',
														id : 'optId'
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
										handler :function(){ new CtScrAnsDetailAdvancedSearchWin().show();}
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
									//text : __create+'[CtScrAnsDetail]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CtScrAnsDetail]',
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
					id:'CtScrAnsDetailGrid',
					url : __ctxPath + "/comtech/listCtScrAnsDetail.do",
					fields : [{
									name : 'ctScrAnsDetailId',
									type : 'int'
								}
																																																																			,'ctScrAnsDetail'
																																																																								,'ctScrAnsDetail'
																																																																								,'ctScrAnsDetail'
																																																																								,'ans'
																																																],
					columns:[
								{
									header : 'ctScrAnsDetailId',
									dataIndex : 'ctScrAnsDetailId',
									hidden : true
								}
																																																								,{
																	header : '话术结果',
																isExp : false,
																
																    dataIndex : 'scrAnsId',
								    renderer:function(val){
								    	return val.scrAnsIdName;
								    }
																}
																																																,{
																	header : '话术题目',
																isExp : false,
																
																    dataIndex : 'scrQueId',
								    renderer:function(val){
								    	return val.scrQueIdName;
								    }
																}
																																																,{
																	header : '题项编号',
																isExp : false,
																
																    dataIndex : 'optId',
								    renderer:function(val){
								    	return val.optIdName;
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
					new CtScrAnsDetailForm({ctScrAnsDetailId:rec.data.ctScrAnsDetailId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CtScrAnsDetailForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrAnsDetailForm');
				if (aForm != null) {
					tabs.remove('CtScrAnsDetailForm');
				}
				aForm = new CtScrAnsDetailForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/comtech/multiDelCtScrAnsDetail.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/comtech/multiDelCtScrAnsDetail.do',
					grid:this.gridPanel,
					idName:'ctScrAnsDetailId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CtScrAnsDetailForm({
				//	ctScrAnsDetailId : record.data.ctScrAnsDetailId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrAnsDetailForm');
				if (aForm != null) {
					tabs.remove('CtScrAnsDetailForm');
				}
				aForm = new CtScrAnsDetailForm({ctScrAnsDetailId : record.data.ctScrAnsDetailId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.ctScrAnsDetailId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
