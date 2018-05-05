/**
 * @author:cf0666@gmail.com
 * @class QcCheckDetailView
 * @extends Ext.Panel
 * @description [QcCheckDetail]管理
 * @company 优创融联科技
 * @createtime:
 */
QcCheckDetailView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcCheckDetailView.superclass.constructor.call(this, {
							id : 'QcCheckDetailViewWin',
							title : '[QcCheckDetail]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'chkId',
											'考核结果ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listchkId.do',
															fields : [ 'chkId', 'chkIdName' ]
														}),
														displayField : 'chkIdName',
														valueField : 'chkId',
														id : 'chkId'
														})
																																			 ]
																				,
																			 								 																																		[
											'tmpTarId',
											'模板指标ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtmpTarId.do',
															fields : [ 'tmpTarId', 'tmpTarIdName' ]
														}),
														displayField : 'tmpTarIdName',
														valueField : 'tmpTarId',
														id : 'tmpTarId'
														})
																																			 ]
																				,
																			 								 																																		[
											'scoreOptId',
											'评分项ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listscoreOptId.do',
															fields : [ 'scoreOptId', 'scoreOptIdName' ]
														}),
														displayField : 'scoreOptIdName',
														valueField : 'scoreOptId',
														id : 'scoreOptId'
														})
																																			 ]
																				,
																			 								 																																		[
											'score',
											'分值,加分、减分时适用',
																																																					new Ext.form.NumberField({name : 'score',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var QcCheckDetailAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcCheckDetail]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcCheckDetailSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_chkId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listchkId.do',
															fields : [ 'chkId', 'chkIdName' ]
														}),
														displayField : 'chkIdName',
														valueField : 'chkId',
														id : 'chkId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_tmpTarId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtmpTarId.do',
															fields : [ 'tmpTarId', 'tmpTarIdName' ]
														}),
														displayField : 'tmpTarIdName',
														valueField : 'tmpTarId',
														id : 'tmpTarId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_scoreOptId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listscoreOptId.do',
															fields : [ 'scoreOptId', 'scoreOptIdName' ]
														}),
														displayField : 'scoreOptIdName',
														valueField : 'scoreOptId',
														id : 'scoreOptId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_score_S_EQ',
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
										handler :function(){ new QcCheckDetailAdvancedSearchWin().show();}
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
									//text : __create+'[QcCheckDetail]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcCheckDetail]',
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
					id:'QcCheckDetailGrid',
					url : __ctxPath + "/qucon/listQcCheckDetail.do",
					fields : [{
									name : 'checkDetailId',
									type : 'int'
								}
																																																																			,'qcCheckDetail'
																																																																								,'qcCheckDetail'
																																																																								,'qcCheckDetail'
																																																																								,'score'
																																																],
					columns:[
								{
									header : 'checkDetailId',
									dataIndex : 'checkDetailId',
									hidden : true
								}
																																																								,{
																	header : '考核结果ID',
																isExp : false,
																
																    dataIndex : 'chkId',
								    renderer:function(val){
								    	return val.chkIdName;
								    }
																}
																																																,{
																	header : '模板指标ID',
																isExp : false,
																
																    dataIndex : 'tmpTarId',
								    renderer:function(val){
								    	return val.tmpTarIdName;
								    }
																}
																																																,{
																	header : '评分项ID',
																isExp : false,
																
																    dataIndex : 'scoreOptId',
								    renderer:function(val){
								    	return val.scoreOptIdName;
								    }
																}
																																																,{
																	header : '分值,加分、减分时适用',
																isExp : false,
																
																	dataIndex : 'score'
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
					new QcCheckDetailForm({checkDetailId:rec.data.checkDetailId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcCheckDetailForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcCheckDetailForm');
				if (aForm != null) {
					tabs.remove('QcCheckDetailForm');
				}
				aForm = new QcCheckDetailForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/qucon/multiDelQcCheckDetail.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/qucon/multiDelQcCheckDetail.do',
					grid:this.gridPanel,
					idName:'checkDetailId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcCheckDetailForm({
				//	checkDetailId : record.data.checkDetailId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcCheckDetailForm');
				if (aForm != null) {
					tabs.remove('QcCheckDetailForm');
				}
				aForm = new QcCheckDetailForm({checkDetailId : record.data.checkDetailId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.checkDetailId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
