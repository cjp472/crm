/**
 * @author:cf0666@gmail.com
 * @class QcScoreOptView
 * @extends Ext.Panel
 * @description [QcScoreOpt]管理
 * @company 优创融联科技
 * @createtime:
 */
QcScoreOptView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcScoreOptView.superclass.constructor.call(this, {
							id : 'QcScoreOptViewWin',
							title : '[QcScoreOpt]管理',
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
											'模板ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
														})
																																			 ]
																				,
																			 								 																																		[
											'optName',
											'名称',
																																																					new Ext.form.NumberField({name : 'optName',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'optScore',
											'分数',
																																																					new Ext.form.NumberField({name : 'optScore',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'disorder',
											'序号',
																																																					new Ext.form.NumberField({name : 'disorder',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var QcScoreOptAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcScoreOpt]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcScoreOptSearchPanel',
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
															url : __ctxPath + '/qucon/listtmpId.do',
															fields : [ 'tmpId', 'tmpIdName' ]
														}),
														displayField : 'tmpIdName',
														valueField : 'tmpId',
														id : 'tmpId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_optName_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_optScore_S_EQ',
																																																																													xtype:'numberfield'
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
										handler :function(){ new QcScoreOptAdvancedSearchWin().show();}
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
									//text : __create+'[QcScoreOpt]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcScoreOpt]',
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
					id:'QcScoreOptGrid',
					url : __ctxPath + "/qucon/listQcScoreOpt.do",
					fields : [{
									name : 'scoreOptId',
									type : 'int'
								}
																																																																			,'qcScoreOpt'
																																																																								,'optName'
																																																																								,'optScore'
																																																																								,'disorder'
																																																],
					columns:[
								{
									header : 'scoreOptId',
									dataIndex : 'scoreOptId',
									hidden : true
								}
																																																								,{
																	header : '模板ID',
																isExp : false,
																
																    dataIndex : 'tmpId',
								    renderer:function(val){
								    	return val.tmpIdName;
								    }
																}
																																																,{
																	header : '名称',
																isExp : false,
																
																	dataIndex : 'optName'
																}
																																																,{
																	header : '分数',
																isExp : false,
																
																	dataIndex : 'optScore'
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
					new QcScoreOptForm({scoreOptId:rec.data.scoreOptId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcScoreOptForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcScoreOptForm');
				if (aForm != null) {
					tabs.remove('QcScoreOptForm');
				}
				aForm = new QcScoreOptForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/qucon/multiDelQcScoreOpt.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/qucon/multiDelQcScoreOpt.do',
					grid:this.gridPanel,
					idName:'scoreOptId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcScoreOptForm({
				//	scoreOptId : record.data.scoreOptId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcScoreOptForm');
				if (aForm != null) {
					tabs.remove('QcScoreOptForm');
				}
				aForm = new QcScoreOptForm({scoreOptId : record.data.scoreOptId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.scoreOptId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
