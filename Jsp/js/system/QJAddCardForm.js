Ext.ns('QJAddCardForm');
/**
 * @author:
 * @class EquipmentView
 * @extends Ext.Panel
 * @description 用户角色列表
 * @company 北京优创融联科技有限公司
 * @createtime:2010-04-12
 */
QJAddCardForm = Ext.extend(Ext.Panel, {
	// 条件搜索Panel
	searchPanel : null,
	// 数据展示Panel
	gridPanel : null,
	// GridPanel的数据Store
	store : null,
	// 头部工具栏
	topbar : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QJAddCardForm.superclass.constructor.call(this, {
					id : 'QJAddCardForm',
					title : '远程智能柜员机重空明细清单',
					iconCls : 'menu-role',
					region : 'center',
					layout : 'border',
					items : [ this.gridPanel]
				});
	},// end of constructor

	// 初始化组件
	initUIComponents : function() {
		this.store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						//url : __ctxPath + '/system/listAppRole.do'
				url : __ctxPath + "/customer/listQJIssueCardConHis.do"
					}),
			         reader : new Ext.data.JsonReader({
						root : 'result',
						totalProperty : 'totalCounts',
						// id : 'id',
						 fields:[{
								name : 'IssueCardID',
								type : 'int'
							 },'tradeDate','transactionTime','printDate',
								 'printTime','businessType',
								 'businessResults','mediumType','numType','equipmentName',
								 'operatorId','branchId','operator','checkMember'
							 	]
					}),
			remoteSort : true,
			 baseParams : {
				equipmentName: '',
				branchId: AddWDno,
				startimes: AddSDate,
				endtimes: AddEDate,
				operatorId: AddGYno
	        }
		});
		
		
		
		
		
//		this.store.setDefaultSort('EId', 'desc');
		this.store.reload({
				params : {
					equipmentName: '',
					branchId: AddWDno,
					startimes: AddSDate,
					endtimes: AddEDate,
					operatorId: AddGYno,
					start : 0,
					limit : 25
				},
				add: true
		});
	
		//var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), //sm,
			           {
						header : 'addcardID',
						dataIndex : 'addcardID',
						hidden : true
					}, 
					 {
						header : "交易日期",
						dataIndex : 'tradeDate',
						width : 30
					}, {
						header : "交易时间",
						dataIndex : 'transactionTime',
						width : 30
					}, {
						header : '网点名称',
						width : 30,
						dataIndex : 'equipmentName'
						//hidden : true
					},{
						header : '网点号',
						width : 30,
						dataIndex : 'branchId'
							
						//hidden : true
					}, 
					{
						header : '柜员号',
						width : 30,
						dataIndex : 'operatorId'
						//hidden : true
					},{
						header : "IC卡号/电子密盾设备编号",
						dataIndex : 'numType',
						width : 50
//					},{
//						header : '业务类型',
//						dataIndex : 'businessType',
//						width : 30,
//						renderer : function(value) {
//							return QJIsYWLX.get(value);
//						}
					},{
						header : '介质类型',
						dataIndex : 'mediumType',
						width : 30,
						renderer : function(value) {
							return QJIsJZLX.get(value);
						}
					},{
						header : "业务处理结果",
                        isExp : false,
						//hidden : true,
						dataIndex : 'businessResults',
						width : 50,
						renderer : function(value) {
							return QJIsCLJG.get(value);
						}

					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});// end of cm

		
		
		this.gridPanel = new Ext.grid.GridPanel({
					id : 'QJIssueCardGrid',
					region : 'center',
					tbar : this.topbar,
					store : this.store,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					// fbar : this.footbar(),
					cm : cm,
					//sm : sm,
					// customize view config
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					},

					// paging bar on the bottom
					bbar : new HT.PagingBar({store : this.store})
				});

	               
		
					
		
		
					
	}// end of the initUIComponents
	
	

});

function showAddCard(){
	//alert(suoshuhang+branchId+operatorId);
	//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
	this.gridPanel.getStore().addListener({
		beforeload:function(store,records,options){
			store.baseParams = {
					equipmentName: '',
					branchId: AddWDno,
					startimes: AddSDate,
					endtimes: AddEDate,
					operatorId: AddGYno
					
			};
		}
	});
	this.gridPanel.getStore().reload({
    	params: {
    		start:0,
    		limit:25
	    }
});

}

