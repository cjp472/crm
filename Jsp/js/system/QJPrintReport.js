/**
 * @author cf0666@gmail.com
 * @createtime
 * @class CusPersonalForm
 * @extends Ext.Window
 * @description CusPersonal表单
 * @company 优创融联科技
 */
QJPrintReport = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QJPrintReport.superclass.constructor.call(this, {
			id : 'QJPrintReport',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 400,
			width : 500,
			maximizable : true,
			title : '打印报表详细信息'
			
			
		});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		 this.store=new Ext.data.SimpleStore({
			   url : __ctxPath + '/customer/listEquipmentRoleConHis.do',
			 //url : __ctxPath + "/xitong/listEquipmentUlEmployee.do",
			            //url:__ctxPath + '/xitong/listEquipment.do',
			           autoLoad : true,
			          // roleId : -1,fields中的值与后台拼接的值对应的个数是一致的，注意的地方
			          root : 'result',
					  totalProperty : 'totalCounts',
					  //id : 'id',
					  fields : [{
							name : 'EId',
							type : 'int'
						}, 'bankTypeId','parentId','equipmentId','branchId','equipmentName','bankname','parentName','operatorId',
						'curdate',
						'ipAddress','address']	
					        });
		 
		 var topbar_linkman = new Ext.Toolbar({
				items : [{
		              text : '所属行',
		              hidden : true
		           }, {
		        	id:'suoshuhang',
		        	dataIndex : 'suoshuhang',
		            name : 'Q_suoshuhang_S_LK',
		            xtype : 'textfield',
		            hidden : true
		          }, {
		            text : '网点号'
		        },{
		        	id:'branchId',
		        	dataIndex : 'branchId',
		            name : 'Q_branchId_S_LK',
		            xtype : 'textfield'
					
		      
				},{
		            text : '柜员号'
		        }, {
		        	id:'new_operatorId',
		        	dataIndex : 'operatorId',
		            name : 'Q_operatorId_S_LK',
		            xtype : 'textfield'
					
		      
				},{
					xtype : 'button',
		        	text : '查询',
					iconCls : 'search',
					scope:this,
					handler : function(){
					var branchId = Ext.getCmp('branchId').getValue();
					var operatorId = Ext.getCmp('new_operatorId').getValue();
					var suoshuhang = Ext.getCmp('suoshuhang').getValue();
					//alert(suoshuhang+branchId+operatorId);
					//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
					this.gridPanel_equipment.getStore().addListener({
						beforeload:function(store,records,options){
							store.baseParams = {
									suoshuhang:suoshuhang,
									branchId:branchId,
									operatorId:operatorId
									
							};
						}
					});
					this.gridPanel_equipment.getStore().reload({
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
					   Ext.getCmp('branchId').setValue('');
				     // Ext.getCmp('branchId').setValue('');
				      Ext.getCmp('new_operatorId').setValue('');
					}
				}]
			});
		 
		this.gridPanel_equipment = new HT.GridPanel({
			id : 'QJPrintReportGrid',
			region : 'center',
			height : 300,
			tbar : topbar_linkman,
			store : this.store,
			trackMouseOver : true,
			singleSelect : true,//单选
			loadMask : true,
			columns : [{
				header : 'EId',
				dataIndex : 'EId',
				hidden : true
			}, 
			{
				header : 'bankTypeId',
				dataIndex : 'bankTypeId',
				hidden : true
			}, 
			{
				header : 'parentId',
				dataIndex : 'parentId',
				hidden : true
			}, {
				header : "机具号",
				dataIndex : 'equipmentId',
				width : 30
			}, {
				header : "所属机构号",
				dataIndex : 'branchId',
				width : 30
			}, {
				header : "柜员号",
				dataIndex : 'operatorId',
				width : 50
			},{
				header : '所属支行',
				dataIndex : 'bankname',
				width :75
			},{
				header : "属分行",
				dataIndex : 'parentName',
				width :75
//			},{
//				header : 'IP地址',
//				dataIndex : 'ipAddress',
//				width : 50
			},{
				header : "网点名称",
				dataIndex : 'equipmentName',
				width : 70
//			},{
//				header : "地址",
//				dataIndex : 'address',
//				width : 50,
//				hidden : true
//			}, {
//				header : "创建日期",
//				dataIndex : 'curdate',
//				width : 50
//			}, {
//				header : '管理',
//				dataIndex : 'EId',
//				width : 20,
//				renderer : function(value, metadata, record, rowIndex,
//						colIndex) {
//					var editId = record.data.EId;
//					var bankTypeId = record.data.bankTypeId;
//					var parentId = record.data.parentId;
//					var equipmentId = record.data.equipmentId;
//					var branchId = record.data.branchId;
//					var equipmentName = record.data.equipmentName;
//					var bankname = record.data.bankname;
//					var operatorId = record.data.operatorId;
//					var curdate = record.data.curdate;
//					var ipAddress = record.data.ipAddress;
//					var parentName = record.data.parentName;
//					var address=record.data.address;
//					var str = '';
//					//alert(bankTypeId+parentId+equipmentId);
//				if (editId != -1) {
//					if(isGranted('_EquipmentEdit')){
//						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="EquipmentView.edit('
//							+ editId + ',\''
//							+ bankTypeId + '\''+ ',\'' 
//							+ parentId + '\''+ ',\'' 
//							+ equipmentId + '\''+ ',\'' 
//							+ branchId + '\''+',\''
//							+ equipmentName + '\''+',\''
//							+ bankname + '\''+',\''
//							+ parentName + '\''+',\''
//							+ operatorId+'\''+',\''
//							+ curdate+'\''+',\''
//							+ address+'\''+',\''
//							+ ipAddress+'\')"></button>';
//					}
//						if (isGranted('_EquipmentDel'))
//							str += '<button title="删除" value=" " class="btn-del" onclick="EquipmentView.remove('
//									+ editId + ')"></button>';
//
//					
//					}
//					return str;
//				}
			}]
		});
		
		
		this.formPanel = new Ext.FormPanel({
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll : true,
					// id : 'CusPersonalForm',
					defaults : {
						anchor : '98%,98%'
					},
					defaultType : 'textfield',
					items : [{
						
						xtype : 'tabpanel',
						activeTab : 0,//激活第一个panel
						plain:true,
						//height : 200,
						defaultType : 'panel',
						bodyStyle : 'padding:5px;',
						items : [{
							title : '打印报表信息',
							region:'center',
							layout : {
								type : 'hbox',
								anchor : 'middle',
								pack:'center'
								
							},
							//align:'center',
							buttonAlign: 'center',
//							defaults : {
//								width : 300,
//								//anchor : '100%,100%'
//								
//							},
							 buttons: [{
								 height : 40,
								 width : 80,
								 id:'button4',
								 text: '打印重空汇总清机记录',
								 style : 'margin-left:50px',
								 //text : '<font style="font-size:16px;margin-top:0px ">打印重空汇总清机记录</font>',
							       handler: function()
							                {
								                     
								              selectAddcard();
								 
//								                 //Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//												    var grid = Ext.getCmp('QJPrintReportGrid');
//												    var rowSelectionModel = grid.getSelectionModel(); 
//												    var record = rowSelectionModel.getSelected();
//												    var equipmentName = record.get('equipmentName'); 
//											        var branchId = record.get('branchId'); 
//											        var operatorId = record.get('operatorId'); 
//											      
//											       if(operatorId=='undefined'){
//											    	   Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//											       }else{
//											    	   var strs =equipmentName+"~"+branchId+"~"+"~"+"~"+operatorId+"";
//											    	   if(strs=="~~~~"){
//													     	  //alert(qinghchhf);
//													     	 // window.open('http://localhost:8088/s2sh_pro/QJAddCard.jsp?day='+strs+'*QJAddCardReport');
//															 Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//													     	  
//													        }else{
//													     	   window.open('http://10.160.4.88:8088/s2sh_pro/QJAddCard.jsp?day='+strs+'*QJAddCardReport');
//													     	  // alert("请选择条件打印。。。。");
//													        }
//											       }
													
													
													
												 
							                 }
								        },{
								             height : 40,
											 width : 80,
											 id:'button3',
											 style : 'margin-left:50px',
										   //  margin: '150 100 150 100',
									         text: '打印重空明细清单记录',
									         style : 'margin-left:50px',
									          handler: function()
									               {
								        	          selectAddMXR();
//								        	           Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//														 var grid = Ext.getCmp('QJPrintReportGrid');  
//													     var rowSelectionModel = grid.getSelectionModel(); 
//													     var record = rowSelectionModel.getSelected();  
//												         var tableName = record.get('operatorId');  
//														 var strs ="~"+"~"+"~"+"~"+tableName+"";
//											            //alert(strs);
//												          if(strs=="~~~~"){
//												        	  
//												        	  //window.open('http://localhost:8088/s2sh_pro/QJIssueCard.jsp?day='+strs+'*QJIssueCardReport');
//												        	  Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//											         	  
//											            }else{
//											         	   window.open('http://10.160.4.88:8088/s2sh_pro/QJIssueCard.jsp?day='+strs+'*QJIssueCardReport');
//											         	  // alert("请选择条件打印。。。。");
//											            }
//								        
													
									    
										           }
										     },{
										    	 height : 40,
												 width : 80,
												 id:'button2',
												 //margin: '150px 100px 150px 100px',
										    	 text: '打印合约明细清单记录',
										    	 style : 'margin-left:50px',
										    	
										    	 handler: function()
										    	    {
										    	                selectHYMXR();
//										    	       Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//														var grid = Ext.getCmp('QJPrintReportGrid');  
//													    var rowSelectionModel = grid.getSelectionModel(); 
//													    var record = rowSelectionModel.getSelected();  
//													    var equipmentName = record.get('equipmentName'); 
//												        var branchId = record.get('branchId'); 
//												        var operatorId = record.get('operatorId'); 
//												      
//												       if(operatorId=='undefined'){
//												    	   Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//												       }else{
//												    	   var strs =equipmentName+"~"+branchId+"~"+"~"+"~"+operatorId+"";
//													     	  //window.open('http://localhost:8088/s2sh_pro/QJContractRecordView.jsp?day='+strs+'*QJContractRecordView');
//													    	  // Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//													     	   window.open('http://10.160.4.88:8088/s2sh_pro/QJContractRecordView.jsp?day='+strs+'*QJContractRecordView');
//													     	  // alert("请选择条件打印。。。。");
//													        }
										     
															
											
										    	   
										    	    }
										     },{
										    	 height : 40,
												 width : 80,
												 id:'button1',
												 //margin: '150 100 150 100',
										    	 text: '打印合约汇总清机记录',
										    	 style : 'margin-left:50px',
										    	 handler: function()
										    	    {
										    	 
										    	 selectQJContractR();
//										    	   Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//													var grid = Ext.getCmp('QJPrintReportGrid');  
//												    var rowSelectionModel = grid.getSelectionModel(); 
//												    var record = rowSelectionModel.getSelected();  
//												    var equipmentName = record.get('equipmentName'); 
//											        var branchId = record.get('branchId'); 
//											        var operatorId = record.get('operatorId'); 
//											      
//											       if(branchId=='undefined'){
//											    	   Ext.MessageBox.alert("温馨提示框","请选择打印网点。。。。");
//											       }else{
//											    	   var strs =equipmentName+"~"+branchId+"~"+"~"+"~"+operatorId+"";
//												        	  window.open('http://10.160.4.88:8088/s2sh_pro/QJContractRecord.jsp?day='+strs+'*QJContractRecordReport');
//												     	  // alert("请选择条件打印。。。。");
//												        }
												     
																	
													}
										     }]							                
				   }]
					}, {
						xtype : 'tabpanel',
						activeTab : 0,//激活第一个panel
						plain:true,
						height : 350,
						defaultType : 'panel',
						bodyStyle : 'padding:5px;',
					items : [{
									title : '设备信息',
									layout : 'form',
									defaultType : 'textfield',
									defaults : {
										width : 500,
										anchor : '100%,100%'
									},
									items : [this.gridPanel_equipment]
						 }]
						  

					}
			]
		});
		

	}// end of the initcomponents
			
	
	


});
/**
 * 打印合约汇总清机记录
 * */
var selectQJContractR=function(){//重空清机记录打印
	var grid = Ext.getCmp('QJPrintReportGrid');  
    var rowSelectionModel = grid.getSelectionModel(); 
    var record = rowSelectionModel.getSelected();  
    var equipmentName = record.get('equipmentName'); 
    var branchId = record.get('branchId'); 
    var operatorId = record.get('operatorId'); 
	Ext.Ajax.request({
		url : __ctxPath + '/customer/SelectHYZKConHis.do',
		params : {
		  operatorId : operatorId,
		 // branchId:branchId,
		  branchId:branchId
		},
		method : 'post',
		waitMsg : '正在提交数据...',
		success : function(result, request) {
            var res = Ext.util.JSON.decode(result.responseText);
            var strs =equipmentName+"~"+branchId+"~"+"~"+"~"+operatorId+"";
            if (res.success == 1 || res.success==2 ) {
            	 Ext.Msg.confirm('信息确认', '有合约汇总请机机记录，是否打印？', function(btn) {
     				if (btn == 'yes') {
     					window.open('http://10.160.4.88:8088/s2sh_pro/QJContractRecord.jsp?day='+strs+'*QJContractRecordReport');
     				}
     			});
            } 
            if(res.success==0){
            	Ext.Msg.alert('温馨提示', '没有重空汇总清机记录，不能打印！');
            }
            
        }

	});
};


/**
 * 打印重空汇总清机记录
 * */
var selectAddcard=function(){
	var grid = Ext.getCmp('QJPrintReportGrid');  
    var rowSelectionModel = grid.getSelectionModel(); 
    var record = rowSelectionModel.getSelected();  
    var equipmentName = record.get('equipmentName'); 
    var branchId = record.get('branchId'); 
    var operatorId = record.get('operatorId'); 
	Ext.Ajax.request({
		url : __ctxPath + '/customer/SelectAddCardConHis.do',
		params : {
		  operatorId : operatorId,
		 // branchId:branchId,
		  branchId:branchId
		},
		method : 'post',
		waitMsg : '正在提交数据...',
		success : function(result, request) {
			//alert(result+"request"+request);
			
            var res = Ext.util.JSON.decode(result.responseText);
            //alert(res.success+"-"+result.responseText);
            var strs =equipmentName+"~"+branchId+"~"+"~"+"~"+operatorId+"";
            if (res.success == 1 || res.success==2 ) {
            	 Ext.Msg.confirm('信息确认', '有重空汇总清机记录，是否打印？', function(btn) {
     				if (btn == 'yes') {
     					window.open('http://10.160.4.88:8088/s2sh_pro/QJAddCard.jsp?day='+strs+'*QJAddCardReport');	
     				}
     			});
            	
            } 
            if(res.success==0){
            	Ext.Msg.alert('温馨提示', '没有重空汇总清机记录，不能打印！');
            }
            
            
//            if(){//重空记录返回大于一条
//            	window.open('http://10.160.4.88:8088/s2sh_pro/QJAddCard.jsp?day='+strs+'*QJAddCardReport');
//            	Ext.Msg.alert('温馨提示', '记录条数大于一条！');
//            }
           
        }

	});
};



/**
 * 打印重空清机明细清单记录
 * */
var selectAddMXR=function(){
	var grid = Ext.getCmp('QJPrintReportGrid');  
    var rowSelectionModel = grid.getSelectionModel(); 
    var record = rowSelectionModel.getSelected();  
    var equipmentName = record.get('equipmentName'); 
    var branchId = record.get('branchId'); 
    var operatorId = record.get('operatorId'); 
	Ext.Ajax.request({
		url : __ctxPath + '/customer/SelectAddMXConHis.do',
		params : {
		  operatorId : operatorId,
		 // branchId:branchId,
		  branchId:branchId
		},
		method : 'post',
		waitMsg : '正在提交数据...',
		success : function(result, request) {
			//{success:0}
			//var str=result.responseText.split(':')[1].split('}')[0];
            var str1=result.responseText.split('~')[0].split(':')[1];
            var str2=result.responseText.split('~')[1];
            var str3=result.responseText.split('~')[2].split('}')[0];
            //alert("str1="+str1+"str2="+str2+"str3="+str3);
            //alert(result.responseText.split('~')[0]+"----"+result.responseText.split('~')[1]+"==="+result.responseText.split('~')[2]);
            //strs = result.responseText.split(':')[1].split('}')[0];
            var strs =equipmentName+"~"+branchId+"~"+str3+"~"+str2+"~"+operatorId+"";
            if (str1 == 2) {//存在数据
            	
            	 Ext.Msg.confirm('信息确认', '有重空明细清机记录，是否打印？', function(btn) {
     				if (btn == 'yes') {
     					window.open('http://10.160.4.87:8088/s2sh_pro/QJIssueCard.jsp?day='+strs+'*QJIssueCardReport');
     				}
     			});
            	
            }else if (str1 == 0) {//存在数据
                	
            	Ext.Msg.alert('温馨提示', '没有重空明细清机记录，不能打印！');
            	
            }else if (str1 == 01) {//存在数据
            	
            	Ext.Msg.alert('温馨提示', '没有重空明细清机记录，不能打印！');
            	
            }else if (str1 == 02) {//存在数据
            	
            	Ext.Msg.alert('温馨提示', '没有重空汇总清机记录，不能打印！');
            	
            }
        }

	});
	
	
	
	
	
};

/**
 * 打印合约汇总明细清单记录
 * */
var selectHYMXR=function(){
	var grid = Ext.getCmp('QJPrintReportGrid');  
    var rowSelectionModel = grid.getSelectionModel(); 
    var record = rowSelectionModel.getSelected();  
    var equipmentName = record.get('equipmentName'); 
    var branchId = record.get('branchId'); 
    var operatorId = record.get('operatorId'); 
	Ext.Ajax.request({
		url : __ctxPath + '/customer/SelectZHMXConHis.do',
		params : {
		  operatorId : operatorId,
		 // branchId:branchId,
		  branchId:branchId
		},
		method : 'post',
		success : function(result, request) {
			
			//var str=result.responseText;
            var HYMXR=result.responseText.split('~')[0].split(':')[1];
            var str2=result.responseText.split('~')[1];
            var str3=result.responseText.split('~')[2].split('}')[0];
           // alert("str1="+HYMXR+"str2="+str2+"str3="+str3);
            //alert(result.responseText.split('~')[0]+"----"+result.responseText.split('~')[1]+"==="+result.responseText.split('~')[2]);
            //strs = result.responseText.split(':')[1].split('}')[0];
            if (HYMXR == 2) {//存在数据
            	var strs =equipmentName+"~"+branchId+"~"+str3+"~"+str2+"~"+operatorId+"";
            	 Ext.Msg.confirm('信息确认', '有合约明细记录，是否打印？', function(btn) {
     				if (btn == 'yes') {
     					 window.open('http://10.160.4.88:8088/s2sh_pro/QJContractRecordView.jsp?day='+strs+'*QJContractRecordView');
     				}
     			});
            	
            }
            if (HYMXR == 0) {//存在数据
            	
            	Ext.Msg.alert('温馨提示', '没有合约明细记录，不能打印！');
            	
            }
            if (HYMXR == 01) {//存在数据
            	
            	Ext.Msg.alert('温馨提示', '没有合约明记录，不能打印！');
            	
            }
            if (HYMXR == 02) {//存在数据
            	
            	Ext.Msg.alert('温馨提示', '没有合约明细记录，不能打印！');
            	
            }
           
            
     
           
        }

	});
	
	
	
	
	
};












