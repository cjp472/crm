Ext.ns('QJIssueCardView');
/**
 * @author:
 * @class EquipmentView
 * @extends Ext.Panel
 * @description 用户角色列表
 * @company 北京优创融联科技有限公司
 * @createtime:2010-04-12
 */
QJIssueCardView = Ext.extend(Ext.Panel, {
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
		QJIssueCardView.superclass.constructor.call(this, {
					id : 'QJIssueCardView',
					title : '远程智能柜员机重空明细清单',
					iconCls : 'menu-role',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
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
						params: {
							equipmentName : '',
							branchId : AddWDno,
							startimes : AddSDate, 
							endtimes : AddEDate,
							operatorId : AddGYno,
				    		start : '0',
				    		limit : '25'
			    	    },
						fields:[{
								name : 'IssueCardID',
								type : 'int'
							 },'tradeDate','transactionTime','printDate',
								 'printTime','businessType',
								 'businessResults','mediumType','numType','equipmentName',
								 'operatorId','branchId','operator','checkMember'
							 	]
					}),
			remoteSort : true
		});
		
		
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			height : 35,
			region : 'north',
			frame : false,
			layoutConfig : {
				padding : '5',
				align : 'middle'
			},
			id : 'QJIssueCardForm',
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
				 
				 id :'QJIsstartimes'
				 }
		
			, {text:'结束时间'},{

			 name : 'Q_endTime_DG_LE',
			 
			 xtype : 'datefield',
			 width : '80',
			 format : 'Y-m-d',
			 
			 id :'QJIsendtimes'

			 },{
	            text : '网点名称',
	            hidden : true
	        }, {
	        	id:'QJIsequipmentName',
	        	dataIndex : 'addcardNum',
	            name : 'Q_suoshuhang_S_LK',
	            xtype : 'textfield',
	            hidden : true
	        }, {
	            text : '网点号'
	        },{
	        	id:'QJIsbranchId',
	        	dataIndex : 'branchId',
	            name : 'Q_branchId_S_LK',
	            xtype : 'textfield'
				
	      
			},{
	            text : '柜员号'
	        }, {
	        	id:'QJIs_operatorId',
	        	dataIndex : 'addcardNum',
	            name : 'Q_operatorId_S_LK',
	            xtype : 'textfield'
				
			},{
				xtype : 'button',
	        	text : '查询',
				iconCls : 'search',
				scope:this,
				handler:function(){
					var branchId = Ext.getCmp('QJIsbranchId').getValue();
					var operatorId = Ext.getCmp('QJIs_operatorId').getValue();
					var equipmentName = Ext.getCmp('QJIsequipmentName').getValue();
					var startimes = Ext.get('QJIsstartimes').getValue();
					var endtimes = Ext.get('QJIsendtimes').getValue();
					//alert(startimes+endtimes+operatorId);
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
				var searchPanel = Ext.getCmp('QJIssueCardForm');
				searchPanel.getForm().reset();//清除SearchForm的值
		
			}
		}]
		});// end of the searchPanel
//		this.store.setDefaultSort('EId', 'desc');
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
					},{
						header : '业务类型',
						dataIndex : 'businessType',
						width : 30,
						renderer : function(value) {
							return QJIsYWLX.get(value);
						}
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

//		this.topbar = new Ext.Toolbar({
//			items : ['->','->','->','->','->','->','->',{
//						iconCls : 'btn-add',
//						text : '打印报表',
//						hidden : false,
//						xtype : 'button',
//						scope : this,
//						handler : function (){
////	               var strs =Ext.getCmp('new_dealNum').getValue()+"~"
////	               +Ext.getCmp('new_cusName').getValue() +"~"+ Ext.getCmp('new_transactP').getValue()
////	              +"~"+Ext.getCmp('new_examineP').getValue()+"~"+Ext.get('start_day').getValue() 
////	              +"~"+Ext.getCmp('new_examineR').getValue()+"";
//	               
//	                var strs = Ext.getCmp('QJIsbranchId').getValue()+"~"
//					 Ext.getCmp('QJIs_operatorId').getValue()+"~"
//					 Ext.getCmp('QJIsequipmentName').getValue()+"~"
//					 Ext.get('QJIsstartimes').getValue()+"~"
//					 Ext.get('QJIsendtimes').getValue()+"~";
//	         alert(strs);
//	          if(strs=="~"){
//	        	  
//	        	  window.open('http://localhost:8088/s2sh_pro/QJIssueCard.jsp?day='+strs+'*QJIssueCardReport');
//	        	  //Ext.MessageBox.alert("温馨提示框","请选择条件打印。。。。");
//         	  
//            }else{
//         	   window.open('http://localhost:8088/s2sh_pro/QJIssueCard.jsp?day='+strs+'*QJIssueCardReport');
//         	  // alert("请选择条件打印。。。。");
//            }
//	        
//						
//		}
//					}]
//		});
		
		
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

//		this.gridPanel.addListener('rowdblclick', function(grid, rowindex, e) {
//					grid.getSelectionModel().each(function(rec) {
//						if (rec.data.isDefaultIn == '0'
//								&& rec.data.EId != -1) {
//							EquipmentView.edit(rec.data.EId);
//						}
//					});
//				});

	}// end of the initUIComponents

});

/**
 * 建立操作的Toolbar
 */
//QJIssueCardView.prototype.topbar = function() {
//	var toolbar = new Ext.Toolbar({
//				id : 'QJIssueCardFootBar',
//				height : 30,
//				bodyStyle : 'text-align:right',
//				items : []
//			});
//	if (isGranted('_QJIssueCardAdd')) {
//		toolbar.add('->',new Ext.Button({
//					iconCls : 'btn-add',
//					text : '打印',
//					handler : function() {
////	               var strs =Ext.getCmp('new_dealNum').getValue()+"~"
////	               +Ext.getCmp('new_cusName').getValue() +"~"+ Ext.getCmp('new_transactP').getValue()
////	              +"~"+Ext.getCmp('new_examineP').getValue()+"~"+Ext.get('start_day').getValue() 
////	              +"~"+Ext.getCmp('new_examineR').getValue()+"";
//	               
//	                var strs = Ext.getCmp('QJIsbranchId').getValue()+"~"
//					 Ext.getCmp('QJIs_operatorId').getValue()+"~"
//					 Ext.getCmp('QJIsequipmentName').getValue()+"~"
//					 Ext.get('QJIsstartimes').getValue()+"~"
//					 Ext.get('QJIsendtimes').getValue()+"~";
//	         alert(strs);
//	          if(strs=="~"){
//	        	  
//	        	  window.open('http://localhost:8088/s2sh_pro/QJIssueCard.jsp?day='+strs+'*QJIssueCardReport');
//	        	  //Ext.MessageBox.alert("温馨提示框","请选择条件打印。。。。");
//            	  
//               }else{
//            	   window.open('http://localhost:8088/s2sh_pro/QJIssueCard.jsp?day='+strs+'*QJIssueCardReport');
//            	  // alert("请选择条件打印。。。。");
//               }
//	        
//						
//		}
//				}));
//	}
//	/*选中id之后，根据id批量删除  2014-4-16 nk
//	 * */
////	if (isGranted('_EquipmentDel')) {
////		toolbar.add('-',new Ext.Button({
////					iconCls : 'btn-del',
////					text : '删除',
////					handler:function(){
////			       var grid = Ext.getCmp("EquipmentGrid");
////			       var rows = grid.getSelectionModel().getSelections();
////                   //var rows = grid.getSelectionModel().getSelections();
////                   if (rows != null && rows.length > 0) {
////                   var ids = new Array();
////                   for (var i = 0; i < rows.length; i++)
////                       ids.push(rows[i].data.EId);
////               }
////			   Ext.Msg.confirm('删除信息确认', '亲！你确定批量删除信息吗？', function(btn) {
////				if (btn == 'yes') {
////          
////             Ext.Ajax.request({
////        	   url : __ctxPath + '/xitong/multiDelEquipmentUlEmployee.do',
////               params : {
////                   ids : ids
////               },
////               method : 'post',
////               success : function(result, request) {
////                    var res = Ext.util.JSON.decode(result.responseText);
////                    if (res.success == false) {
////                      // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
////                   Ext.ux.Toast.msg('操作信息', '亲！\n没有选中所要删除的信息！请您选中之后在删除');
////                    } else {
////                       Ext.ux.Toast.msg('操作信息', '删除成功!');
////                    }
////                    Ext.getCmp('EquipmentGrid').getStore().reload();
////               }
////          });
//////		
////	
////}
////});
////
////		}
////				}));
////	}
//
//	return toolbar;
//};

//
///*删除单个记录2014-4-5
// * */
//


