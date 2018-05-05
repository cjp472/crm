Ext.ns('QJTransferAccounts');
/**
 * @author:
 * @class AppRoleView
 * @extends Ext.Panel
 * @description 远程智能柜员易转账明细清单
 * @company 北京优创融联科技有限公司
 * @createtime:2010-04-12
 */
QJTransferAccountsView = Ext.extend(Ext.Panel, {
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
		QJTransferAccountsView.superclass.constructor.call(this, {
					id : 'TransferAccountsView',
					title : '远程智能柜员易转账明细清单',
					iconCls : 'menu-role',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor

	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		
		this.store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						//url : __ctxPath + '/system/listAppRole.do'
				      url : __ctxPath + "/customer/listTransferAccountsConHis.do"
					}),
			reader : new Ext.data.JsonReader({
						root : 'result',
						totalProperty : 'totalCounts',
						// id : 'id',
						 fields:[{
								name : 'traAccId',
								type : 'int'
							 },'businessResults','traAccTime','contractDate',
								 'printDate','printTime',
								 'customerName','idCardNumber','serialNumber','operatorId',
								 'cardNumber','money','certigier','equipmentName',
								 'branchId','realNumber','checkMember','operator'
							 	]
					}),
			remoteSort : true
		});
		
		
		
		
		
		this.searchPanel = new Ext.FormPanel({
			height : 35,
			region : 'north',
			frame : false,
			layoutConfig : {
				padding : '5',
				align : 'middle'
			},
			id : 'TransferAccountsSearchForm',
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
				 
				 id :'Trastartimes'
				 }
		
			, {text:'结束时间'},{

			 name : 'Q_endTime_DG_LE',
			 
			 xtype : 'datefield',

			 format : 'Y-m-d',
			 width : '80',
			 id :'Traendtimes'

			 },{
	            text : '网点名称',
	            hidden : true
	        }, {
	        	id:'TraequipmentName',
	        	dataIndex : 'addcardNum',
	            name : 'Q_suoshuhang_S_LK',
	            xtype : 'textfield',
	            hidden : true
	        }, {
	            text : '网点号'
	        },{
	        	id:'TrabranchId',
	        	dataIndex : 'branchId',
	            name : 'Q_branchId_S_LK',
	            xtype : 'textfield'
				
	      
			},{
	            text : '柜员号'
	        }, {
	        	id:'Tra_operatorId',
	        	dataIndex : 'addcardNum',
	            name : 'Q_operatorId_S_LK',
	            xtype : 'textfield'
				
	      
			},{
				xtype : 'button',
	        	text : '查询',
				iconCls : 'search',
				scope:this,
				handler:function(){
					var branchId = Ext.getCmp('TrabranchId').getValue();
					var operatorId = Ext.getCmp('Tra_operatorId').getValue();
					var equipmentName = Ext.getCmp('TraequipmentName').getValue();
					var startimes = Ext.get('Trastartimes').getValue();
					var endtimes = Ext.get('Traendtimes').getValue();
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
				var searchPanel = Ext.getCmp('TransferAccountsSearchForm');
				searchPanel.getForm().reset();//清除SearchForm的值
			}
		}]
		});// end of the searchPanel
		// end of store
//		this.store.setDefaultSort('roleId', 'desc');
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});
		//var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), //sm,
			           {
						header : 'traAccId',
						dataIndex : 'traAccId',
						hidden : true
					}, {
						header : "签约日期",
						dataIndex : 'contractDate',
						width : 30
					}, {
						header : '网点号',
						width : 30,
						dataIndex : 'branchId'
							
						//hidden : true
					}, {
						header : '网点号',
						width : 30,
						dataIndex : 'equipmentName'
						//hidden : true
					},
					{
						header : '柜员号',
						width : 30,
						dataIndex : 'operatorId'
						//hidden : true
					},{
						header : "客户姓名",
						dataIndex : 'customerName',
						width : 30
					},
						{
						header : "证件号码",
						dataIndex : 'idCardNumber',
						width : 30
					},
					
					{
							header : "流水号",
							dataIndex : 'serialNumber',
							width : 75
//				    },{
//						header : "柜员号",
//						dataIndex : 'operatorId',
//						width : 30
			      },{
						header : "金额",
						dataIndex : 'money',
						width : 30
			        },{
						header : "授权人",
						dataIndex : 'certigier',
						width : 30
			        },{
						header : "转出/转入卡号",
						dataIndex : 'cardNumber',
						width : 75
			        },{
						header : "业务处理结果",
                        isExp : false,
						//hidden : true,
						dataIndex : 'businessResults',
						width : 30,
						renderer : function(value) {
							return YZZ001.get(value);
						}

					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});// end of cm

//		this.topbar = new Ext.Toolbar({
//			items : ['->','->','->','->','->','->','->',{
//						iconCls : 'btn-add',
//						text : '打印报表',
//						hidden : false,
//						xtype : 'button',
//						scope : this,
//						handler : function (){
////	            var strs =Ext.getCmp('new_dealNum').getValue()+"~"
////	            +Ext.getCmp('new_cusName').getValue() +"~"+ Ext.getCmp('new_transactP').getValue()
////	           +"~"+Ext.getCmp('new_examineP').getValue()+"~"+Ext.get('start_day').getValue() 
////	           +"~"+Ext.getCmp('new_examineR').getValue()+"";
//				var strs = Ext.getCmp('TrabranchId').getValue()+"~"
//				 +Ext.getCmp('Tra_operatorId').getValue()+"~"
//				+ Ext.getCmp('TraequipmentName').getValue()+"~"
//				 +Ext.get('Trastartimes').getValue()+"~"
//				+ Ext.get('Traendtimes').getValue()+"";
//				
//	     // alert(strs);
//					
//	    //alert(strs);
//	      if(strs=="~~~~"){
//	     	  
//	     	 // window.open('http://localhost:8088/s2sh_pro/QJTransferAccounts.jsp?day='+strs+'*QJTransferAccountsReport');
//	     	  Ext.MessageBox.alert("温馨提示框","请选择条件打印。。。。");
//	     	  
//	        }else{
//	     	   window.open('http://localhost:8088/s2sh_pro/QJTransferAccounts.jsp?day='+strs+'*QJTransferAccountsReport');
//	     	  // alert("请选择条件打印。。。。");
//	      }
//	     
//						
//		}
//					}]
//		});
		this.gridPanel = new Ext.grid.GridPanel({
					id : 'TransferAccountsGrid',
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

/**
 * 建立操作的Toolbar
 */
//QJTransferAccountsView.prototype.topbar = function() {
//	var toolbar = new Ext.Toolbar({
//				id : 'QJTransferAccountsFootBar',
//				height : 30,
//				bodyStyle : 'text-align:right',
//				items : []
//			});
//	if (isGranted('_QJTransferAccountsAdd')) {
//		toolbar.add('->',new Ext.Button({
//					iconCls : 'btn-add',
//					text : '打印',
//					handler : function() {
////            var strs =Ext.getCmp('new_dealNum').getValue()+"~"
////            +Ext.getCmp('new_cusName').getValue() +"~"+ Ext.getCmp('new_transactP').getValue()
////           +"~"+Ext.getCmp('new_examineP').getValue()+"~"+Ext.get('start_day').getValue() 
////           +"~"+Ext.getCmp('new_examineR').getValue()+"";
//			var strs = Ext.getCmp('TrabranchId').getValue()+"~"
//			 Ext.getCmp('Tra_operatorId').getValue()+"~"
//			 Ext.getCmp('TraequipmentName').getValue()+"~"
//			 Ext.get('Trastartimes').getValue()+"~"
//			 Ext.get('Traendtimes').getValue()+"~";
//			
//    alert(strs);
//				
//    //alert(strs);
//      if(strs=="~"){
//     	  
//     	  window.open('http://localhost:8088/s2sh_pro/QJTransferAccounts.jsp?day='+strs+'*QJTransferAccountsReport');
//     	  //Ext.MessageBox.alert("温馨提示框","请选择条件打印。。。。");
//     	  
//        }else{
//     	   window.open('http://localhost:8088/s2sh_pro/QJTransferAccounts.jsp?day='+strs+'*QJTransferAccountsReport');
//     	  // alert("请选择条件打印。。。。");
//      }
//     
//					
//	}
//				}));
//	}
////	if (isGranted('_AppRoleDel')) {
////		toolbar.add('-',new Ext.Button({
////					iconCls : 'btn-del',
////					text : '删除',
////					handler : function() {
////						var grid = Ext.getCmp("AppRoleGrid");
////						var selectRecords = grid.getSelectionModel()
////								.getSelections();
////
////						if (selectRecords.length == 0) {
////							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
////							return;
////						}
////						var ids = Array();
////						var idsN = '';
////						for (var i = 0; i < selectRecords.length; i++) {
////							if (selectRecords[i].data.isDefaultIn == '0'
////									&& selectRecords[i].data.roleId != -1) {
////								ids.push(selectRecords[i].data.roleId);
////							} else {
////								idsN += selectRecords[i].data.roleName + ',';
////							}
////						}
////						if (idsN == '') {
////							AppRoleView.remove(ids);
////						} else {
////							Ext.ux.Toast.msg("信息", idsN + "不能被删除！");
////						}
////					}
////				}));
////	}
//
//	return toolbar;
//};




