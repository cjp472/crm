/**
 * @author:cf0666@gmail.com
 * @class QcTempTarView
 * @extends Ext.Panel
 * @description [QcTempTar]管理
 * @company 优创融联科技
 * @createtime:
 */
QcTempTarView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcTempTarView.superclass.constructor.call(this, {
							id : 'QcTempTarViewWin',
							title : '[QcTempTar]管理',
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
											'tempCatId',
											'章节ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtempCatId.do',
															fields : [ 'tempCatId', 'tempCatIdName' ]
														}),
														displayField : 'tempCatIdName',
														valueField : 'tempCatId',
														id : 'tempCatId'
														})
																																			 ]
																				,
																			 								 																																		[
											'tarId',
											'指标ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtarId.do',
															fields : [ 'tarId', 'tarIdName' ]
														}),
														displayField : 'tarIdName',
														valueField : 'tarId',
														id : 'tarId'
														})
																																			 ]
																				,
																			 								 																																		[
											'score',
											'分值,加分、减分时适用',
																																																					new MT.DicComboBox({hiddenName : 'score',itemKey : 'QC_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'disorder',
											'序号',
																																																					new MT.DicComboBox({hiddenName : 'disorder',itemKey : 'QC_ZT'})
																																																	 ]
																				,
																			 								 																																		[
											'staId',
											'状态：有效、注销&QC_ZT',
																																																					new MT.DicComboBox({hiddenName : 'staId',itemKey : 'QC_ZT'})
																																																	 ]
																			 								 							 											]
				var QcTempTarAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcTempTar]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcTempTarSearchPanel',
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
																																																													
																						
																																				hiddenName : 'Q_tempCatId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtempCatId.do',
															fields : [ 'tempCatId', 'tempCatIdName' ]
														}),
														displayField : 'tempCatIdName',
														valueField : 'tempCatId',
														id : 'tempCatId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_tarId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/qucon/listtarId.do',
															fields : [ 'tarId', 'tarIdName' ]
														}),
														displayField : 'tarIdName',
														valueField : 'tarId',
														id : 'tarId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_score_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_disorder_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_staId_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'QC_ZT'
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
										handler :function(){ new QcTempTarAdvancedSearchWin().show();}
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
									//text : __create+'[QcTempTar]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcTempTar]',
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
					id:'QcTempTarGrid',
					url : __ctxPath + "/qucon/listQcTempTar.do",
					fields : [{
									name : 'tmpTarId',
									type : 'int'
								}
																																																																			,'qcTempTar'
																																																																								,'qcTempTar'
																																																																								,'qcTempTar'
																																																																								,'score'
																																																																								,'disorder'
																																																																								,'staId'
																																																],
					columns:[
								{
									header : 'tmpTarId',
									dataIndex : 'tmpTarId',
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
																	header : '章节ID',
																isExp : false,
																
																    dataIndex : 'tempCatId',
								    renderer:function(val){
								    	return val.tempCatIdName;
								    }
																}
																																																,{
																	header : '指标ID',
																isExp : false,
																
																    dataIndex : 'tarId',
								    renderer:function(val){
								    	return val.tarIdName;
								    }
																}
																																																,{
																	header : '分值,加分、减分时适用',
																isExp : false,
																
																	dataIndex : 'score'
																}
																																																,{
																	header : '序号',
																isExp : false,
																
																	dataIndex : 'disorder'
																}
																																																,{
																	header : '状态：有效、注销&QC_ZT',
																isExp : false,
																
																	dataIndex : 'staId',
									renderer : function(value) {
										return QC_ZT.value;
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
					new QcTempTarForm({tmpTarId:rec.data.tmpTarId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcTempTarForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcTempTarForm');
				if (aForm != null) {
					tabs.remove('QcTempTarForm');
				}
				aForm = new QcTempTarForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/qucon/multiDelQcTempTar.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/qucon/multiDelQcTempTar.do',
					grid:this.gridPanel,
					idName:'tmpTarId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcTempTarForm({
				//	tmpTarId : record.data.tmpTarId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcTempTarForm');
				if (aForm != null) {
					tabs.remove('QcTempTarForm');
				}
				aForm = new QcTempTarForm({tmpTarId : record.data.tmpTarId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.tmpTarId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
