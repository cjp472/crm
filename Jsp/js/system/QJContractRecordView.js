Ext.ns('QJContractRecordView');

/**
 *　Fernando·Hu
 *　QJContractRecordView　　
 */
QJContractRecordView = Ext.extend(Ext.Panel, {
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
		QJContractRecordView.superclass.constructor.call(this, {
					id : 'QJContractRecordView',
					title : '远程智能柜员机合约明细清单',
					iconCls : 'menu-role',
					region : 'center',
					layout : 'border',
					items : [this.gridPanel]
				});
	},// end of constructor

	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						//url : __ctxPath + '/system/listAppRole.do'
				      url : __ctxPath + "/customer/listContractRecordConHis.do"
					}),
			reader : new Ext.data.JsonReader({
						root : 'result',
						totalProperty : 'totalCounts',
						// id : 'id',
						 fields:[{
								name : 'contractID',
								type : 'int'
							 },'contracttime','printDate','printTime',
								 'businessType','businessResults',
								 'frame','customerName','idCardNumber',
								 'serialNumber','equipmentName','operatorId',
								 'branchId','realNumber','checkMember','operator','qjConHisId'
							 	]
					}),
			remoteSort : true,
			 baseParams : {
				equipmentName: '',
				branchId: ConWDno,
				startimes: ConSDate,
				endtimes: ConEDate,
				operatorId: ConGYno
	        }
		});// end of store
		
		
		
		
		this.searchPanel = new Ext.FormPanel({
			height : 35,
			region : 'north',
			frame : false,
			layoutConfig : {
				padding : '5',
				align : 'middle'
			},
			id : 'ContractRecordSearchForm',
			layout : 'hbox',
			defaults : {
				xtype : 'label',
				border : false,
				margins : {
					top : 2,
					right : 4,
					bottom : 2,
					left : 4
				}
			},
			items : [ {text:'开始时间'},{

				 name : 'Q_staTime_DL_GE',

				 xtype : 'datefield',

				 width : '80',
				 
				 format:'Y-m-d',
				 
				 id :'Contstartimes'
				 }
		
			, {text:'结束时间'},{

			 name : 'Q_endTime_DG_LE',
			 width : '80',
			 xtype : 'datefield',

			 format : 'Y-m-d',
			 
			 id :'Contendtimes'

			 },{
	            text : '网点名称',
	            hidden : true
	        }, {
	        	id:'ContquipmentName',
	        	dataIndex : 'addcardNum',
	            name : 'Q_suoshuhang_S_LK',
	            xtype : 'textfield',
	            hidden : true
	        }, {
	            text : '网点号'
	        },{
	        	id:'ContbranchId',
	        	dataIndex : 'branchId',
	            name : 'Q_branchId_S_LK',
	            xtype : 'textfield'
				
	      
			},{
	            text : '柜员号'
	        }, {
	        	id:'Cont_operatorId',
	        	dataIndex : 'addcardNum',
	            name : 'Q_operatorId_S_LK',
	            xtype : 'textfield'
				
	      
			},{
				xtype : 'button',
	        	text : '查询',
				iconCls : 'search',
				scope:this,
				handler:function(){
					var branchId = Ext.getCmp('ContbranchId').getValue();
					var operatorId = Ext.getCmp('Cont_operatorId').getValue();
					var equipmentName = Ext.getCmp('ContquipmentName').getValue();
					var startimes = Ext.get('Contstartimes').getValue();
					var endtimes = Ext.get('Contendtimes').getValue();
					//alert(startimes+endtimes);
					//alert(suoshuhang+branchId+operatorId);
					//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
					this.gridPanel.getStore().addListener({
						beforeload:function(store,records,options){
							store.baseParams = {
									equipmentName:equipmentName,
									branchId:branchId,
									startimes:startimes,
									endtimes:endtimes,
									operatorId:operatorId
									
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
		},{
			xtype : 'button',
			text : __reset,
			scope : this,
			iconCls : 'btn-reset',
			handler : function() {
				var searchPanel = Ext.getCmp('ContractRecordSearchForm');
				searchPanel.getForm().reset();//清除SearchForm的值
			}
		}]
		});// end of the searchPanel
		
//		this.store.setDefaultSort('roleId', 'desc');
		this.store.load({
					params : {
						equipmentName: '',
						branchId: ConWDno,
						startimes: ConSDate,
						endtimes: ConEDate,
						operatorId: ConGYno,
						start : 0,
						limit : 25
					},
		
		             add: true
				});
		////var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(),// sm,
			           {
						header : 'contractID',
						dataIndex : 'contractID',
						hidden : true
					}, {
						header : 'qjConHisId',
						dataIndex : 'qjConHisId',
						hidden : true
					},{
						header : "签约日期",
						dataIndex : 'contracttime',
						width : 30
					}, {
						header : '网名称',
						width : 30,
						dataIndex : 'equipmentName'
						//hidden : true
					},{
						header : '网点号',
						width : 30,
						dataIndex : 'branchId'
							
						//hidden : true
					},{
						header : "柜员号",
						dataIndex : 'operatorId',
						width : 30
//			          },{
//							header : '柜员号',
//							width : 30,
//							dataIndex : 'operatorId'
					//hidden : true
				    },{
						header : "客户姓名",
						dataIndex : 'customerName',
						width : 50
					},
						{
						header : "证件号码",
						dataIndex : 'idCardNumber',
						width : 75
					},
					
					{
							header : "流水号",
							dataIndex : 'serialNumber',
							width : 30
				    },{
						header : "合约张数",
						dataIndex : 'frame',
						width : 30
			        },{
						header : "业务类型",
						dataIndex : 'businessType',
						width : 30,
						renderer : function(value) {
							return QJIsYWLX.get(value);
						}
						
					},{
						header : "业务处理结果",
						dataIndex : 'businessResults',
						width : 30,
						renderer : function(value) {
							return QJYWZKMXR.get(value);
						}
						
					},{
						header : "附件",
						dataIndex : '',
						width : 30,
						renderer : function(value) {
							return '<button title="制作" style="width:60px" class="" onclick="clickBtn();">查看</buttion>'
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});// end of cm
		
		this.gridPanel = new Ext.grid.GridPanel({
					id : 'QJContractRecordViewGrid',
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
	},// end of the initUIComponents
	
	
	onRowAction : function(grid, record, action, row, col) {
		//alert("action");
		switch (action) {

			case 'btn-del' :
				break;

			case 'btn-readdocument' :
				//this.editRs.call(this, record);
				//alert("btn-readdocumen");
				break;

			case 'add' :
				
				break;
			default :

				break;

		}
	}

});

function clickBtn()
{
	var grid = Ext.getCmp('QJContractRecordViewGrid');  
    var rowSelectionModel = grid.getSelectionModel(); 
    var record = rowSelectionModel.getSelected();  
    var conhisid = record.get('qjConHisId'); 
	//alert("查看资料conhisid=" + conhisid);
    //alert("查看资料信息");
	var tabs = Ext.getCmp('centerTabPanel');
	var aForm = Ext.getCmp('ConHisForm');
	if (aForm != null) {
		tabs.remove('ConHisForm');
	}

	aForm = new ConHisForm({
		conHisId : conhisid,
		flag:flag
	});

	tabs.add(aForm);

	tabs.activate(aForm);
}

/**
 * 建立操作的Toolbar
 */


