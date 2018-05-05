/**
 * prigram:    营销项目选择器
 * @class MarketprogramSelector
 * @extends Ext.Window
 */
MaketProgramSelector=Ext.extend(Ext.Window,{
    searchFormPanel:null,
    gridPanel:null,
	constructor:function(_cfg){
	   Ext.applyIf(this,_cfg);
	   this.initUI();
	   MaketProgramSelector.superclass.constructor.call(this,{
	        layout:'border',
	        width : 630,
			height : 380,
			iconCls:'menu-seal',
			title:'营销项目选择',
	        border : false,
	        modal : true,
	        buttonAlign : 'center',
			buttons : [{
						iconCls : 'btn-ok',
						text : '确定',
						scope:this,
						handler : function() {
							var grid = this.gridPanel;
							var rows = grid.getSelectionModel().getSelections();
							var store = grid.getStore();
							if (this.callback != null) {
								this.callback.call(this,grid,rows,store);
							}
						}
					}, {
						text : '取消',
						iconCls : 'btn-cancel',
						scope:this,
						handler : function() {
							this.close();
						}
					}],
	        items:[this.searchFormPanel,this.gridPanel]
	   });
	},
	initUI:function(){
		var ObProjectAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '营销项目高级查询'
							//fieldData : fieldnameComboData
						});
		this.searchFormPanel=new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'MaketProgramSelectorSearchPanel',
							height : 35,
							items : [{
								xtype:'panel',
								width:40,
								style:'text-align:right',
								html:'名称：'
							},{

										name : 'Q_projNam_S_LK',
										xtype : 'textfield'
									}, {
								xtype:'panel',
								width:60,
								style:'text-align:right',
								html:'负责人：'
							},{

										hiddenName : 'Q_projTypId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false
										//itemKey : 'CONOB_PROJECT_XMLB'
									}, {
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
									}, {
										xtype : 'button',
										text : __advancedSearch,
										iconCls : 'search',
										scope : this,
										handler : function() {
											new ObProjectAdvancedSearchWin()
													.show();
										}
									}],
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
						});
	    this.gridPanel = new HT.GridPanel({
					region : 'center',
					//tbar : this.topbar,
					// 使用RowActions
					rowActions : false,
					printable : false,
					exportable : false,
					id : 'ObProjectGrid',
					url : __ctxPath + "/outb/listObProject.do",
					fields : [{
								name : 'projId',
								type : 'int'
							}, 'projNam', 'projAliNam', 'projCod', 'projTypId',
							'ownerTeam', 'perIncharge', 'srouceId', 'staDat',
							'endDat', 'busiTypId', 'execTypId', 'projJianjie',
							'projConFile', 'remark', 'creUseId', 'creTime',
							'updUseId', 'updTime', 'projStaId', 'runid',
							'nodeName','ownerTeamName','perInchargeName'],
					columns : [{
								header : 'projId',
								dataIndex : 'projId',
								hidden : true
							}, {
								header : '名称',
								isExp : false,

								dataIndex : 'projNam'
							}, {
								header : '编号',
								isExp : false,

								dataIndex : 'projCod'
							}, {
								header : '项目类型',
								isExp : false,

								dataIndex : 'busiTypId',
								renderer : function(value) {
									return CONOB_PROJECT_YWLX.get(value);
								}
							}, {
								header : '阶段',
								isExp : false,

								dataIndex : 'projTypId',
								renderer : function(value) {
									return CONOB_PROJECT_XMLB.get(value);
								}
							}, {
								header : '负责人',
								isExp : false,

//								dataIndex : 'perIncharge'
								dataIndex : 'perInchargeName'
							}]
						// end of columns
				});
	}
	
});