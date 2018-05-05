Ext.ns('QJAddCardView');
/**
 * @author:
 * @class 
 * @extends Ext.Panel
 * @description 
 * @company 
 * @createtime:2010-04-12
 */
QJAddCardView = Ext.extend(Ext.Panel, {
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
		QJAddCardView.superclass.constructor.call(this, {
					id : 'QJAddCardView',
					title : '远程智能柜员机重空汇总清单',
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
				url : __ctxPath + "/customer/listQJAddCardConHis.do"
			}),
			reader : new Ext.data.JsonReader({
						root : 'result',
						totalProperty : 'totalCounts',
						
			    	    fields:[{
								name : 'addcardID',
								type : 'int'
							 },'addcardDate','addcardTime','printDate',
								 'printTime','addcardNum','addUkNum',
								 'branchId','equipmentName','operatorId',
								 'operator','bankIccardNum','spareIccardNum',
								 'checkMember','bankUkeyNum','spareUkeyNum',
								 'thiscardnum','thisukeynum','issuecardNum','issueUkeynum'
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
			id : 'QJAddCardSearchForm',
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

				 //name : 'Q_staTime_DL_GE',

				 xtype : 'datefield',

				 width : '80',
				 
				 format:'Y-m-d',
				 
				 id :'QJastartimes'
				 }
		
			, {text:'结束时间'},{

			// name : 'Q_endTime_DG_LE',
			 
			 xtype : 'datefield',

			 format : 'Y-m-d',
			 
			 id :'QJaendtimes'

			 },{
	            text : '网点名称',
	            hidden : true
	        }, {
	        	id:'QJaequipmentName',
	        	dataIndex : 'addcardNum',
	            name : 'Q_suoshuhang_S_LK',
	            xtype : 'textfield',
	            hidden : true
	        }, {
	            text : '网点号'
	        },{
	        	id:'QJabranchId',
	        	dataIndex : 'branchId',
	            name : 'Q_branchId_S_LK',
	            xtype : 'textfield'
				
	      
			},{
	            text : '柜员号'
	        }, {
	        	id:'QJa_operatorId',
	        	dataIndex : 'addcardNum',
	            name : 'Q_operatorId_S_LK',
	            xtype : 'textfield'
				
	      
			},{
				xtype : 'button',
	        	text : '查询',
				iconCls : 'search',
				scope:this,
				handler:function(){
					var branchId = Ext.getCmp('QJabranchId').getValue();
					var operatorId = Ext.getCmp('QJa_operatorId').getValue();
					var equipmentName = Ext.getCmp('QJaequipmentName').getValue();
					var startimes = Ext.get('QJastartimes').getValue();
					var endtimes = Ext.get('QJaendtimes').getValue();
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
				var searchPanel = Ext.getCmp('QJAddCardSearchForm');
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
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), sm,
			           {
						header : 'addcardID',
						dataIndex : 'addcardID',
						hidden : true
					},{
						header : '清机日期',
						dataIndex : 'addcardDate',
						width :30
					},{
						header : "清机时间",
						dataIndex : 'addcardTime',
						width :30
					},{
						header : '网点名称',
						width : 30,
						dataIndex : 'equipmentName'
						//hidden : true
					},{
						header : '网点号',
						width : 30,
						dataIndex : 'branchId'
					}, 
					{
						header : '柜员号',
						width : 30,
						dataIndex : 'operatorId'
					}, 
					{
						header : '上次加卡数',
						dataIndex : 'addcardNum',
							width : 30
						//hidden : true
					},{
						header : '发卡数',
						dataIndex : 'issuecardNum',
						width : 30
						//hidden : true
					}, 
					{
						header : '剩余卡数',
						dataIndex : 'spareIccardNum',
						width : 30
						//hidden : true
					},{
						header : '加卡数',
						dataIndex : 'thiscardnum',
						width : 30
					}, {
						header : "回收箱卡数",
						dataIndex : 'bankIccardNum',
						width : 30
					},{
						header : "上次加KEY数",
						dataIndex : 'addUkNum',
						width : 30
					},{
						header : '发KEY数',
						dataIndex : 'issueUkeynum',
						width : 30
						//hidden : true
					}, {
						header : "剩余KEY数",
						dataIndex : 'spareUkeyNum',
						width : 30
					},{
						header : "加ukey数",
						dataIndex : 'thisukeynum',
						width : 30
					},{
						header : "回收箱ukey数",
						dataIndex : 'bankUkeyNum',
						width : 30
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});// end of cm

		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-add',
								text : '生成Excel文件',
								hidden : false,
								xtype : 'button',
								scope : this,
								handler : function (){
									Ext.Msg.confirm('信息确认', '是否将当前选中数据生成Excel文件？', function(btn) {
					     				if (btn == 'yes') {
					     					//alert("");
					     					var grid = Ext.getCmp('QJAddCardGrid');  
					     				    var rowSelectionModel = grid.getSelectionModel(); 
					     				    var record = rowSelectionModel.getSelected();  
					     				    var equipmentName = record.get('equipmentName'); 
					     				    var branchId = record.get('branchId'); 
					     				    var addId = record.get('addcardID');
					     				    var operatorId = record.get('operatorId');
					     				    
					     					Ext.Ajax.request({
												url : __ctxPath + '/customer/SelectAddMXConHis.do',
												params : {
												  operatorId : operatorId,
												  addId : addId ,
												  branchId : branchId
												},
												method : 'post',
												waitMsg : '正在提交数据...',
												success : function(result, request) {
													//alert("后台查询出的数据：   "+result.responseText);
										            var str1=result.responseText.split('~')[0].split(':')[1];
										            var str2=result.responseText.split('~')[1];
										            var str3=result.responseText.split('~')[2].split('}')[0];
										            var strs = addId+"~"+branchId+"~"+str3+"~"+str2+"~"+operatorId;
										            alert(str2+"\n"+str3);
									                if (str1 == "01") {
									                	//没有有重空明细记录，一个Excel生成一个页签
									                	window.open('http://10.160.4.88:8090/s2sh_pro/QJAddCard.jsp?day='+strs+'*QJAddCardReport_0');
									                	
									                }else if(str1 == "2"){
									                	//有重空明细记录，一个Excel生成两个页签
									                	window.open('http://10.160.4.88:8090/s2sh_pro/QJAddCard.jsp?day='+strs+'*QJAddCardReport_1');	
									                }else{
									                	window.open('http://10.160.4.88:8090/s2sh_pro/QJAddCard.jsp?day='+strs+'*QJAddCardReport_1');	
									                }
										        }
											});
					     				}
					     			});
								}
							}]
				});
		
		
		this.gridPanel = new Ext.grid.GridPanel({
					id : 'QJAddCardGrid',
					region : 'center',
					tbar : this.topbar,
					store : this.store,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					// fbar : this.footbar(),
					cm : cm,
					sm : sm,
					// customize view config
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					},

					// paging bar on the bottom
					bbar : new HT.PagingBar({store : this.store}),
					listeners:{
				       rowdblclick : function(grid,row){
				           grid.getSelectionModel().each(function(rec){    

				        	   var addcardDate = rec.get('addcardDate');
				        	   ///---------------------------------------
				        	   AddGYno = rec.get('operatorId');
				        	   AddWDno = rec.get('branchId');
				        	   var addId = rec.get('addcardID');
				        	   var equipmentName = rec.get('equipmentName');
				        	   ///---------------------------------------
				        	   
				        	   //alert("日期："+addcardDate+"\n柜员号："+operatorId+"\n网点号："+branchId);
				        	   
				        	   Ext.Ajax.request({
									url : __ctxPath + '/customer/SelectAddMXConHis.do',
									params : {
									  operatorId : AddGYno,
									  addId : addId,
									  branchId : AddWDno
									},
									method : 'post',
									waitMsg : '正在提交数据...',
									success : function(result, request) {
										//alert("后台查询出的数据：   "+result.responseText);{success:2~2015-08-21 16:14:55~2015-08-21 }
							            var str1=result.responseText.split('~')[0].split(':')[1];
							            ///---------------------------------------
							            AddEDate=result.responseText.split('~')[1];
							            AddSDate=result.responseText.split('~')[2].split('}')[0];
							            ///---------------------------------------
							            alert("str1:"+str1+"\nstr2:"+AddSDate+"\nstr3:"+AddEDate);
							            //01没有清机明细记录  -  只有一条重控记录
							            // 2存在清机明细记录  -  
						                if (str1 == "02" || str1 == "01") {
						                	//Ext.ux.Toast.msg('操作信息', '没有清机明细记录，无法查看数据...');
						                	Ext.Msg.alert('温馨提示', '没有清机明细记录，无法查看数据...');
						                }else{
						                	//准备打开QJIssueCardView.js，显示对应的数据
							        	    var tabs = Ext.getCmp('centerTabPanel');
											var aForm = Ext.getCmp('QJAddCardForm');
											tabs.remove(aForm);
											aForm = new QJAddCardForm({
													});
											tabs.add(aForm);
											tabs.activate(aForm);
						                }
						                
							        }
								});
				        	    
				        	    
								
							});
				       }  
				   }
				});


	}// end of the initUIComponents

});

/**
 * 建立操作的Toolbar
 */
//QJAddCardView.prototype.topbar = function() {
//	var toolbar = new Ext.Toolbar({
//				id : 'QJAddCardFootBar',
//				height : 30,
//				bodyStyle : 'text-align:right',
//				items : []
//			});
//	if (isGranted('_QJAddCardAdd')) {
//		toolbar.add('->',new Ext.Button({
//					iconCls : 'btn-add',
//					text : '打印',
//					handler : function() {
//
//            
//             var strs = 
//            	 Ext.getCmp('QJabranchId').getValue()+"~"
//				 Ext.getCmp('QJa_operatorId').getValue()+"~"
//				 Ext.getCmp('QJaequipmentName').getValue()+"~"
//				 Ext.get('QJastartimes').getValue()+"~"
//				 Ext.get('QJaendtimes').getValue()+"~";
//      alert(strs);
//       if(strs=="~"){
//     	  
//     	  window.open('http://localhost:8088/s2sh_pro/QJAddCard.jsp?day='+strs+'*QJAddCardReport');
//     	  //Ext.MessageBox.alert("温馨提示框","请选择条件打印。。。。");
//     	  
//        }else{
//     	   window.open('http://localhost:8088/s2sh_pro/QJAddCard.jsp?day='+strs+'*QJAddCardReport');
//     	  // alert("请选择条件打印。。。。");
//        }
//     
//					
//	}
//				}));
//	}
//	/*选中id之后，根据id批量删除  2014-4-16 nk
//	 * */
//	if (isGranted('_EquipmentDel')) {
//		toolbar.add('-',new Ext.Button({
//					iconCls : 'btn-del',
//					text : '删除',
//					handler:function(){
//			       var grid = Ext.getCmp("EquipmentGrid");
//			       var rows = grid.getSelectionModel().getSelections();
//                   //var rows = grid.getSelectionModel().getSelections();
//                   if (rows != null && rows.length > 0) {
//                   var ids = new Array();
//                   for (var i = 0; i < rows.length; i++)
//                       ids.push(rows[i].data.EId);
//               }
//			   Ext.Msg.confirm('删除信息确认', '亲！你确定批量删除信息吗？', function(btn) {
//				if (btn == 'yes') {
//          
//             Ext.Ajax.request({
//        	   url : __ctxPath + '/xitong/multiDelEquipmentUlEmployee.do',
//               params : {
//                   ids : ids
//               },
//               method : 'post',
//               success : function(result, request) {
//                    var res = Ext.util.JSON.decode(result.responseText);
//                    if (res.success == false) {
//                      // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
//                   Ext.ux.Toast.msg('操作信息', '亲！\n没有选中所要删除的信息！请您选中之后在删除');
//                    } else {
//                       Ext.ux.Toast.msg('操作信息', '删除成功!');
//                    }
//                    Ext.getCmp('EquipmentGrid').getStore().reload();
//               }
//          });
////		
//	
//}
//});
//
//		}
//				}));
//	}
//
//	return toolbar;
//};

//
///*删除单个记录2014-4-5
// * */
//


