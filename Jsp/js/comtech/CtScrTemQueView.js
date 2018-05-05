/**
 * @author:cf0666@gmail.com
 * @class CtScrTemQueView
 * @extends Ext.Panel
 * @description [CtScrTemQue]管理
 * @company 优创融联科技
 * @createtime:
 */
CtScrTemQueView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CtScrTemQueView.superclass.constructor.call(this, {
							id : 'CtScrTemQueViewWin',
							title : '[CtScrTemQue]管理',
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
											'话术模板',
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
											'queCatId',
											'章节',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listqueCatId.do',
															fields : [ 'queCatId', 'queCatIdName' ]
														}),
														displayField : 'queCatIdName',
														valueField : 'queCatId',
														id : 'queCatId'
														})
																																			 ]
																				,
																			 								 																																		[
											'queId',
											'题目',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listqueId.do',
															fields : [ 'queId', 'queIdName' ]
														}),
														displayField : 'queIdName',
														valueField : 'queId',
														id : 'queId'
														})
																																			 ]
																				,
																			 								 																																		[
											'disorder',
											'序号',
																																																					new Ext.form.NumberField({name : 'disorder',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var CtScrTemQueAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CtScrTemQue]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CtScrTemQueSearchPanel',
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
																																																													
																						
																																				hiddenName : 'Q_queCatId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listqueCatId.do',
															fields : [ 'queCatId', 'queCatIdName' ]
														}),
														displayField : 'queCatIdName',
														valueField : 'queCatId',
														id : 'queCatId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_queId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/comtech/listqueId.do',
															fields : [ 'queId', 'queIdName' ]
														}),
														displayField : 'queIdName',
														valueField : 'queId',
														id : 'queId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_disorder_SN_EQ',
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
										handler :function(){ new CtScrTemQueAdvancedSearchWin().show();}
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
									//text : __create+'[CtScrTemQue]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[CtScrTemQue]',
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
					id:'CtScrTemQueGrid',
					url : __ctxPath + "/comtech/listCtScrTemQue.do",
					fields : [{
									name : 'scrQueId',
									type : 'int'
								}
																																																																			,'ctScrTemQue'
																																																																								,'ctScrTemQue'
																																																																								,'ctScrTemQue'
																																																																								,'disorder'
																																																],
					columns:[
								{
									header : 'scrQueId',
									dataIndex : 'scrQueId',
									hidden : true
								}
																																																								,{
																	header : '话术模板',
																isExp : false,
																
																    dataIndex : 'tmpId',
								    renderer:function(val){
								    	return val.tmpIdName;
								    }
																}
																																																,{
																	header : '章节',
																isExp : false,
																
																    dataIndex : 'queCatId',
								    renderer:function(val){
								    	return val.queCatIdName;
								    }
																}
																																																,{
																	header : '题目',
																isExp : false,
																
																    dataIndex : 'queId',
								    renderer:function(val){
								    	return val.queIdName;
								    }
																}
																																																,{
																	header : '序号',
																isExp : false,
																
																	dataIndex : 'disorder'
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
					new CtScrTemQueForm({scrQueId:rec.data.scrQueId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new CtScrTemQueForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrTemQueForm');
				if (aForm != null) {
					tabs.remove('CtScrTemQueForm');
				}
				aForm = new CtScrTemQueForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/comtech/multiDelCtScrTemQue.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/comtech/multiDelCtScrTemQue.do',
					grid:this.gridPanel,
					idName:'scrQueId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new CtScrTemQueForm({
				//	scrQueId : record.data.scrQueId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CtScrTemQueForm');
				if (aForm != null) {
					tabs.remove('CtScrTemQueForm');
				}
				aForm = new CtScrTemQueForm({scrQueId : record.data.scrQueId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.scrQueId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
