//
///**
// * @author:nk
// * @class EquipmentView
// * @extends Ext.Panel
// * @description 设备管理列表
// * @company 科技有限公司
// * @createtime:2014-4-1
// */
EverySysWorkattendanceReport = Ext.extend(Ext.Panel, {
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
		EverySysWorkattendanceReport.superclass.constructor.call(this, {
					id : 'SysWorkattendancReport',
					title : '质检考勤信息',
					//iconCls : 'menu-role',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor

	// 初始化组件
	initUIComponents : function() {		
		this.store=new Ext.data.SimpleStore({
			
			url : __ctxPath + "/customer/SysWorkattendanceReportConHis.do",
			            //url:__ctxPath + '/xitong/listEquipment.do',
			           autoLoad : true,
			          // roleId : -1,
			          root : 'result',
					  totalProperty : 'totalCounts',
			           fields:[ "id","agentId",
						        "loginTime","loginCtiTime",
						        "logoutTime","status","reason","bsNum","remarks"]	
					        });

		// 初始化搜索条件Panel
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
			items : [ {
	            text : '登录系统时间'
	        }, {
	        	id:'login_day',
	        	name : 'start_Time',
				xtype:'datetimefield',
			    width : '100',
				format:'Y-m-d H'
	        }, {
	            text : '退出系统时间'
	        }, {
	        	id:'logout_day',
	        	name : 'end_Time',
				xtype:'datetimefield',
			    width : '100',
				format:'Y-m-d H'
	      
			},{
			    id:'pan_agentId',
			    bodyStyle : 'padding:5px;',
				labelAlign : "right",
			    labelWidth:55,
	             xtype:'panel',
	             baseCls:"x-plain",
	             layout:'form',
	             items:[{
						fieldLabel : '工号',
						
						//anchor : '100%',
						xtype:'textfield',
						name : 'agentId',
						id : 'agentId',
						width : '100',
						listeners : {
							render : function(){
						      // var nodeId = 0;
						           if(agentRole=="总行座席" ){
						        	   Ext.getCmp("pan_agentId").show();
						        	  
						 
						           }else{
						        	   Ext.getCmp("pan_agentId").hide();
						        	 
						           }
							}
						}

					}]
			},{
				xtype : 'button',
	        	text : '查询',
				iconCls : 'search',
				scope:this,
				handler:function(){
					var loginTime = Ext.get('login_day').getValue();
					var logoutTime = Ext.get('logout_day').getValue();
					alert(loginTime+logoutTime);
					//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
					this.gridPanel.getStore().addListener({
						beforeload:function(store,records,options){
							store.baseParams = {
									loginTime:loginTime,
									logoutTime:logoutTime
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
//		},{
//			xtype : 'button',
//			text : __reset,
//			scope : this,
//			iconCls : 'btn-reset',
//			handler : function() {
//				var searchPanel = Ext.getCmp('ExamineReportSearchForm');
//				searchPanel.getForm().reset();//清除SearchForm的值
//			}
		}]
		
		
		
//			
	
//						
		});// end of the searchPanel
		
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			//columns : [{
			columns : [new Ext.grid.RowNumberer(), sm, {
				header : 'id',
				dataIndex : 'id',
				hidden : true
			}, {
				header : "工号",
				dataIndex : 'agentId',
				width :50
			}, {
				header : '登录系统时间',
				width :50,
				dataIndex : 'loginTime'
			},{
				header : '电话登录时间',
				width :50,
				dataIndex : 'loginCtiTime'
			},{
				header : '退出系统时间',
				width :50,
				dataIndex : 'logoutTime'
			},{
				header : "退出状态 ",
				dataIndex : 'status',
				width :50
			}, {
				header : "退出原因",
				dataIndex : 'reason',
				width :50
			}, {
				header : "BS_Num",
				dataIndex : 'bsNum',
				hidden : true,
				width :50
			},  {
				header : "备注",
				dataIndex : 'remarks',
				hidden : true,
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
								 var strs =Ext.get('login_day').getValue()+"~"
						           +Ext.get('logout_day').getValue();
						           alert("strs"+strs);
			                   if(strs=="~"){  
			                	   //Ext.ux.Toast.msg('温馨提示:', '请你根据条件选择所要打印的数据！');
			                	   Ext.MessageBox.alert("温馨提示框","当前未选择时间段，请选择");  
			                   }else{
			                	   var agentId= Ext.getCmp('agentId').getValue();
			                	   if(agentRole=="总行座席" ){
			                		   if(Ext.getCmp('agentId').getValue() == ''){
			                			   Ext.MessageBox.alert('操作信息', '请填写工号！');
			                		        return;
			                		    }else{
			                		    	strs=strs+"~"+agentId;
			                		    	//alert(strs+"总行座席");
			                		    	window.open('http://localhost:8090/s2sh_pro/SysWorkattendance.jsp?day='+strs+'*ExamineReport');
			                		    }
						 
						           }else{
						        	   strs=strs+"~"+"";
						        	   window.open('http://localhost:8090/s2sh_pro/SysWorkattendance.jsp?day='+strs+'*ExamineReport');
						        	 
						           }
			                	  
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

