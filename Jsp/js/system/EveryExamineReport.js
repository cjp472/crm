//
///**
// * @author:nk
// * @class EquipmentView
// * @extends Ext.Panel
// * @description 设备管理列表
// * @company 科技有限公司
// * @createtime:2014-4-1
// */
EveryExamineReport = Ext.extend(Ext.Panel, {
	// 条件搜索Panel
	searchPanel : null,
	// 数据展示Panel
	gridPanel : null,
	// GridPanel的数据Store
	store : null,
	// 头部工具栏
	//topbar : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		EveryExamineReport.superclass.constructor.call(this, {
					id : 'EveryExamineReport',
					title : '补录报表信息',
					//iconCls : 'menu-role',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor

	// 初始化组件
	initUIComponents : function() {		
		this.store=new Ext.data.SimpleStore({
			
			url : __ctxPath + "/customer/ExamineReportConHis.do",
			            //url:__ctxPath + '/xitong/listEquipment.do',
			           autoLoad : true,
			          // roleId : -1,
			          root : 'result',
					  totalProperty : 'totalCounts',
			           fields:[ "id","dealNum",
						        "cusName","transactP",
						        "examineP","examineD","examineR"]	
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
			id : 'ExamineReportSearchForm',
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
			items : [{
	            text : '流水号'
	        }, {
	        	id:'new_dealNum',
	        	dataIndex : 'dealNum',
	            name : 'Q_dealNum_S_LK',
	            xtype : 'textfield'
	        },{
	            text : '客户姓名'
	        }, {
	        	id:'new_cusName',
	        	dataIndex : 'cusName',
	            name : 'Q_cusName_S_LK',
	            xtype : 'textfield'
	        },{
	            text : '办理人'
	        }, {
	        	id:'new_transactP',
	        	dataIndex : 'transactP',
	            name : 'Q_transactP_S_LK',
	            xtype : 'textfield'
	        },{
	            text : '补录人'
	        }, {
	        	id:'new_examineP',
	        	dataIndex : 'examineP',
	            name : 'Q_examineP_S_LK',
	            xtype : 'textfield'
	        },{
	            text : '补录时间'
	        }, {
	        	id:'start_day',
	        	name : 'start_Time',
				xtype:'datetimefield',
			    width : '100',
				format:'Y-m-d H'
	        }, {
				text : '补录结果'
			},{
				id:'new_examineR',
				dataIndex : 'examineR',
				name : 'Q_examineR_S_LK',
				xtype : 'textfield'
			},{
			xtype : 'button',
			text : __reset,
			scope : this,
			iconCls : 'btn-reset',
			handler : function() {
				var searchPanel = Ext.getCmp('ExamineReportSearchForm');
				searchPanel.getForm().reset();//清除SearchForm的值
			}
		},{
				xtype : 'button',
	        	text : '查询',
				iconCls : 'search',
				scope:this,
				handler:function(){
					var dealNum = Ext.getCmp('new_dealNum').getValue();
					var cusName = Ext.getCmp('new_cusName').getValue();
					var transactP = Ext.getCmp('new_transactP').getValue();
					var examineP = Ext.getCmp('new_examineP').getValue();
					var examineD = Ext.get('start_day').getValue();
					var examineR = Ext.getCmp('new_examineR').getValue();
					//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
					this.gridPanel.getStore().addListener({
						beforeload:function(store,records,options){
							store.baseParams = {
									dealNum:dealNum,
									cusName:cusName,
									transactP:transactP,
									examineP:examineP,
									examineD:examineD,
									examineR:examineR
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
		}]
		
		
		
//			
	
//						
		});// end of the searchPanel
		var agentRole="";
		Ext.Ajax.request({
			url : __ctxPath + '/customer/SelectRoleConHis.do',
			method : 'post',
			//waitMsg : '正在提交数据...',
			async: false,
			success : function(result, request) {
				agentRole = result.responseText.split(':')[1].split('}')[0];
	       
	        }
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			//columns : [{
			columns : [new Ext.grid.RowNumberer(), sm, {
				header : 'id',
				dataIndex : 'id',
				hidden : true
			}, {
				header : "流水号",
				dataIndex : 'dealNum',
				width :50
			}, {
				header : "客户姓名",
				dataIndex : 'cusName',
				width :50
			}, {
				header : "办理人",
				dataIndex : 'transactP',
				width :50
			}, {
				header : "补录人",
				dataIndex : 'examineP',
				width :50
			}, {
				header : '补录时间',
				
				isExp : false,
				
				sortable : true ,

				dataIndex : 'examineD'
			}, {
				header : "补录结果",
				dataIndex : 'examineR',
				width :50
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
						text : '打印报表',
						hidden : false,
						xtype : 'button',
						scope : this,
						handler : function (){
					          var strs =Ext.getCmp('new_dealNum').getValue()+"~"
					          +Ext.getCmp('new_cusName').getValue() +"~"+ Ext.getCmp('new_transactP').getValue()
					          +"~"+Ext.getCmp('new_examineP').getValue()+"~"+Ext.get('start_day').getValue() +"~"+Ext.getCmp('new_examineR').getValue()+"";
			                   if(strs!=""){
			                	   if(agentRole=="总行座席" ){
			                		   if(Ext.getCmp('new_examineP').getValue() == ''){
			                			   Ext.MessageBox.alert('操作信息', '补录人不为空！');
			                		        return;
			                		    }else{
			                		    	window.open('http://localhost:8088/s2sh_pro/Examine.jsp?day='+strs+'*ExamineReport');
			                		    }
						 
						           }else{
						        	   window.open('http://localhost:8088/s2sh_pro/Examine.jsp?day='+strs+'*ExamineReport');
						        	 
						           }
			                	  // window.open('http://localhost:8088/s2sh_pro/Examine.jsp?day='+strs+'*ExamineReport');
			                   }else{
			                	   alert("条件不存在！请选择您所需的条件。。。。");
			                   }
					        
										
						}
					}]
		});
		
		this.gridPanel = new Ext.grid.GridPanel({
			id : 'ExamineReportGrid',
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
			bbar : new HT.PagingBar({store : this.store})
		});
		

	}// end of the initUIComponents



});

///**
// * 建立操作的Toolbar
// */
//EveryExamineReport.prototype.topbar = function() {
//	var toolbar = new Ext.Toolbar({
//				id : 'ExamineReportFootBar',
//				height : 30,
//				bodyStyle : 'text-align:right',
//				items : []
//			});
//	if (isGranted('_ExamineReportAdd')) {
//		toolbar.add('->',new Ext.Button({
//					iconCls : 'btn-add',
//					text : '打印补录报表',
//					hidden : false,
//					scope : this,
//					handler : function() {
////					  var dealNum = Ext.getCmp('new_dealNum').getValue();
////					  var cusName = Ext.getCmp('new_cusName').getValue();
////					  var transactP = Ext.getCmp('new_transactP').getValue();
////					  var examineP = Ext.getCmp('new_examineP').getValue();
////					  var examineD = Ext.getCmp('new_examineD').getValue();
////					  var examineR = Ext.getCmp('new_examineR').getValue();
////					  "listReport.action?start="+star+"&end="+end+""
//					 // window.open('http://10.160.4.168:8088/s2sh_pro/Examine.jsp?dealNum="''"');
//			          var strs =Ext.getCmp('new_dealNum').getValue()+"~"
//			          +Ext.getCmp('new_cusName').getValue() +"~"+ Ext.getCmp('new_transactP').getValue()
//			          +"~"+Ext.getCmp('new_examineP').getValue()+"~"+Ext.get('start_day').getValue() +"~"+Ext.getCmp('new_examineR').getValue()+"";
//			      
////			        var strs =Ext.getCmp('new_dealNum').getValue()+"~"
////			                 +Ext.getCmp('new_cusName').getValue() +"~"
////			                 +Ext.getCmp('new_transactP').getValue()+"~"
////			                 +Ext.getCmp('new_examineP').getValue()+"~"
////			                 +Ext.get('start_day').getValue() +"~"
////			                 +Ext.getCmp('new_examineR').getValue();  
//			          
//			         // alert(strs);
//			    window.open('http://10.160.4.168:8088/s2sh_pro/Examine.jsp?day='+strs+'*ExamineReport');
//					}
//				}));
//	}
//	return toolbar;
//};












































