/**
 * @author:cf0666@gmail.com
 * @class QcTempReObjView
 * @extends Ext.Panel
 * @description [QcTempReObj]管理
 * @company 优创融联科技
 * @createtime:
 */
QcTempReObjView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcTempReObjView.superclass.constructor.call(this, {
							id : 'QcTempReObjViewWin',
							title : '[QcTempReObj]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'tempReleId',
											'发布模板ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtempReleId.do',
															fields : [ 'tempReleId', 'tempReleIdName' ]
														}),
														displayField : 'tempReleIdName',
														valueField : 'tempReleId',
														id : 'tempReleId'
														})
																																			 ]
																				,
																			 								 																																		[
											'usrId',
											'用户',
																																																					new Ext.form.NumberField({name : 'usrId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'usrGrpId',
											'用户组',
																																																					new Ext.form.NumberField({name : 'usrGrpId',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var QcTempReObjAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcTempReObj]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcTempReObjSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_tempReleId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtempReleId.do',
															fields : [ 'tempReleId', 'tempReleIdName' ]
														}),
														displayField : 'tempReleIdName',
														valueField : 'tempReleId',
														id : 'tempReleId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_usrId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_usrGrpId_L_EQ',
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
										handler :function(){ new QcTempReObjAdvancedSearchWin().show();}
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
									//text : __create+'[QcTempReObj]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcTempReObj]',
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
					id:'QcTempReObjGrid',
					url : __ctxPath + "/qucon/listQcTempReObj.do",
					fields : [{
									name : 'tempReObjId',
									type : 'int'
								}
																																																																			,'qcTempReObj'
																																																																								,'usrId'
																																																																								,'usrGrpId'
																																																],
					columns:[
								{
									header : 'tempReObjId',
									dataIndex : 'tempReObjId',
									hidden : true
								}
																																																								,{
																	header : '发布模板ID',
																isExp : false,
																
																    dataIndex : 'tempReleId',
								    renderer:function(val){
								    	return val.tempReleIdName;
								    }
																}
																																																,{
																	header : '用户',
																isExp : false,
																
																	dataIndex : 'usrId'
																}
																																																,{
																	header : '用户组',
																isExp : false,
																
																	dataIndex : 'usrGrpId'
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
					new QcTempReObjForm({tempReObjId:rec.data.tempReObjId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcTempReObjForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcTempReObjForm');
				if (aForm != null) {
					tabs.remove('QcTempReObjForm');
				}
				aForm = new QcTempReObjForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/qucon/multiDelQcTempReObj.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/qucon/multiDelQcTempReObj.do',
					grid:this.gridPanel,
					idName:'tempReObjId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcTempReObjForm({
				//	tempReObjId : record.data.tempReObjId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcTempReObjForm');
				if (aForm != null) {
					tabs.remove('QcTempReObjForm');
				}
				aForm = new QcTempReObjForm({tempReObjId : record.data.tempReObjId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.tempReObjId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});