/**
 * @author:cf0666@gmail.com
 * @class ScProductComView
 * @extends Ext.Panel
 * @description [ScProductCom]管理
 * @company 优创融联科技
 * @createtime:
 */
ScProductComView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScProductComView.superclass.constructor.call(this, {
							id : 'ScProductComViewWin',
							title : '[ScProductCom]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'productId',
											'产品内码',
																																																					new Ext.form.NumberField({name : 'productId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'comboGoodsId',
											'组合内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listcomboGoodsId.do',
															fields : [ 'comboGoodsId', 'comboGoodsIdName' ]
														}),
														displayField : 'comboGoodsIdName',
														valueField : 'comboGoodsId',
														id : 'comboGoodsId'
														})
																																			 ]
																				,
																			 								 																																		[
											'procomCount',
											'数量',
																																																					new Ext.form.NumberField({name : 'procomCount',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var ScProductComAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScProductCom]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScProductComSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_productId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_comboGoodsId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/customer/listcomboGoodsId.do',
															fields : [ 'comboGoodsId', 'comboGoodsIdName' ]
														}),
														displayField : 'comboGoodsIdName',
														valueField : 'comboGoodsId',
														id : 'comboGoodsId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_procomCount_S_EQ',
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
										handler :function(){ new ScProductComAdvancedSearchWin().show();}
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
									//text : __create+'[ScProductCom]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScProductCom]',
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
					id:'ScProductComGrid',
					url : __ctxPath + "/customer/listScProductCom.do",
					fields : [{
									name : 'productComId',
									type : 'int'
								}
																																																																			,'productId'
																																																																								,'scProductCom'
																																																																								,'procomCount'
																																																],
					columns:[
								{
									header : 'productComId',
									dataIndex : 'productComId',
									hidden : true
								}
																																																								,{
																	header : '产品内码',
																isExp : false,
																
																	dataIndex : 'productId'
																}
																																																,{
																	header : '组合内码',
																isExp : false,
																
																    dataIndex : 'comboGoodsId',
								    renderer:function(val){
								    	return val.comboGoodsIdName;
								    }
																}
																																																,{
																	header : '数量',
																isExp : false,
																
																	dataIndex : 'procomCount'
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
//				var searchPanel = Ext.getCmp('ScProductComSearchPanel');
//				var gridPanel = Ext.getCmp('ScProductComGrid');
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
					new ScProductComForm({productComId:rec.data.productComId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScProductComForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScProductComForm');
				if (aForm != null) {
					tabs.remove('ScProductComForm');
				}
				aForm = new ScProductComForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/customer/multiDelScProductCom.do',
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
					url:__ctxPath + '/customer/multiDelScProductCom.do',
					grid:this.gridPanel,
					idName:'productComId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScProductComForm({
				//	productComId : record.data.productComId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScProductComForm');
				if (aForm != null) {
					tabs.remove('ScProductComForm');
				}
				aForm = new ScProductComForm({productComId : record.data.productComId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.productComId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
