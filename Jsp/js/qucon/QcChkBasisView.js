/**
 * @author:cf0666@gmail.com
 * @class QcChkBasisView
 * @extends Ext.Panel
 * @description [QcChkBasis]管理
 * @company 优创融联科技
 * @createtime:
 */
QcChkBasisView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				QcChkBasisView.superclass.constructor.call(this, {
							id : 'QcChkBasisViewWin',
							title : '[QcChkBasis]管理',
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
											'考核结果',
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
											'chkBasisType',
											'考核依据&QC_KHYJ',
																																																					new Ext.form.NumberField({name : 'chkBasisType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'chkBasisObj',
											'依据对象',
																								new Ext.form.TextField({name : 'chkBasisObj',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'chkBasisRemark',
											'依据备注',
																								new Ext.form.TextField({name : 'chkBasisRemark',allowBlank:true})
																						 ]
																			 								 							 											]
				var QcChkBasisAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcChkBasis]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'QcChkBasisSearchPanel',
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
																																																													
																						
																																				hiddenName : 'Q_chkBasisType_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'QC_KHYJ'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_chkBasisObj_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_chkBasisRemark_S_EQ',
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
										handler :function(){ new QcChkBasisAdvancedSearchWin().show();}
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
									//text : __create+'[QcChkBasis]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[QcChkBasis]',
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
					id:'QcChkBasisGrid',
					url : __ctxPath + "/qucon/listQcChkBasis.do",
					fields : [{
									name : 'chkBasId',
									type : 'int'
								}
																																																																			,'qcChkBasis'
																																																																								,'chkBasisType'
																																																																								,'chkBasisObj'
																																																																								,'chkBasisRemark'
																																																],
					columns:[
								{
									header : 'chkBasId',
									dataIndex : 'chkBasId',
									hidden : true
								}
																																																								,{
																	header : '考核结果',
																isExp : false,
																
																    dataIndex : 'chkId',
								    renderer:function(val){
								    	return val.chkIdName;
								    }
																}
																																																,{
																	header : '考核依据&QC_KHYJ',
																isExp : false,
																
																	dataIndex : 'chkBasisType',
									renderer : function(value) {
										return QC_KHYJ.value;
									}
																}
																																																,{
																	header : '依据对象',
																isExp : false,
																
																	dataIndex : 'chkBasisObj'
																}
																																																,{
																	header : '依据备注',
																isExp : false,
																
																	dataIndex : 'chkBasisRemark'
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
					new QcChkBasisForm({chkBasId:rec.data.chkBasId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new QcChkBasisForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkBasisForm');
				if (aForm != null) {
					tabs.remove('QcChkBasisForm');
				}
				aForm = new QcChkBasisForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/qucon/multiDelQcChkBasis.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/qucon/multiDelQcChkBasis.do',
					grid:this.gridPanel,
					idName:'chkBasId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new QcChkBasisForm({
				//	chkBasId : record.data.chkBasId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcChkBasisForm');
				if (aForm != null) {
					tabs.remove('QcChkBasisForm');
				}
				aForm = new QcChkBasisForm({chkBasId : record.data.chkBasId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.chkBasId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
