Ext.ns('QJIssueCardView');
/**
 * @author:
 * @class EquipmentView
 * @extends Ext.Panel
 * @description 用户角色列表
 * @company 北京优创融联科技有限公司
 * @createtime:2010-04-12
 */
QJContractRecord = Ext.extend(Ext.Panel, {
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
		QJContractRecord.superclass.constructor.call(this, {
					id : 'QJContractRecord',
					title : '合约汇总数据',
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
				url : __ctxPath + "/customer/listCountConHis.do"
					}),
			reader : new Ext.data.JsonReader({
						root : 'result',
						totalProperty : 'totalCounts',
						// id : 'id',
						 fields:[{
								name : 'conId',
								type : 'int'
							 },'conDate','conTime','equipmentName',
								 'operatorId','branchId',
								 'field1','field2','field3','field4',
								 'field5','field6','field7','field8','field9',
								 'field10','total'
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
			id : 'QJContractRecordForm',
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
				 
				 id :'QJConstartimes'
				 }
		
			, {text:'结束时间'},{

			 name : 'Q_endTime_DG_LE',
			 
			 xtype : 'datefield',
			 width : '80',		 
			 format : 'Y-m-d',
			 
			 id :'QJConendtimes'

			 },{
	            text : '网点名称',
	            hidden : true
	        }, {
	        	id:'QJConequipmentName',
	        	dataIndex : 'addcardNum',
	            name : 'Q_suoshuhang_S_LK',
	            xtype : 'textfield',
	            hidden : true
	        }, {
	            text : '网点号'
	        },{
	        	id:'QJConbranchId',
	        	dataIndex : 'branchId',
	            name : 'Q_branchId_S_LK',
	            xtype : 'textfield'
				
	      
			},{
	            text : '柜员号'
	        }, {
	        	id:'QJCon_operatorId',
	        	dataIndex : 'addcardNum',
	            name : 'Q_operatorId_S_LK',
	            xtype : 'textfield'
				
	      
			},{
				xtype : 'button',
	        	text : '查询',
				iconCls : 'search',
				scope:this,
				handler:function(){
					var branchId = Ext.getCmp('QJConbranchId').getValue();
					var operatorId = Ext.getCmp('QJCon_operatorId').getValue();
					var equipmentName = Ext.getCmp('QJConequipmentName').getValue();
					var startimes = Ext.get('QJConstartimes').getValue();
					var endtimes = Ext.get('QJConendtimes').getValue();
					//alert(startimes+endtimes);
					//alert(branchId+equipmentName+operatorId);
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
				var searchPanel = Ext.getCmp('QJContractRecordForm');
				searchPanel.getForm().reset();//清除SearchForm的值
		
			}
		}]
		});// end of the searchPanel
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), sm,   //conId

			           {
							header : 'conId',
							dataIndex : 'conId',
							hidden : true
						},{
							header : "清机日期",
							id:'QJDate',
							dataIndex : 'conDate',
							//text:'count1',
							width : 30
						},{
							header : "清机时间",
							id:'QJTime',
							dataIndex : 'conTime',
							//text:'count1',
							width : 30
					    },{
							header : "网点名称",
							id:'equipmentName',
							dataIndex : 'equipmentName',
							//text:'count1',
							width : 30,
							renderer : function(value) {
								if(value == "null"){
									return "";
								}else{
									return value;
								}
							}
					},{
						header : "网点号",
						id:'sum4',
						dataIndex : 'branchId',
						//text:'count1',
						width : 30,
						renderer : function(value) {
							if(value == "null"){
								return "";
							}else{
								return value;
							}
						}
					},{
						header : "柜员号",
						id:'sum3',
						dataIndex : 'operatorId',
						//text:'count1',
						width : 30,
					
						renderer : function(value) {
							if(value == "null"){
								return "";
							}else{
								return value;
							}
						}
					},{
						header : '开借记卡(合约张数)',
						dataIndex : 'field1',
						width : 45
					},{
						header : "电子渠道(合约张数)",
						id:'field2',
						dataIndex : 'field2',
						width : 45
					
					},{
						header : "理财签约(合约张数)",
						id:'field3',
						dataIndex : 'field3',
						//text:'count1',
						width : 45
					}, {
						header : '基金签约(合约张数)',
						dataIndex : 'field4',
						width : 45
					},{
						header : "易转账(合约张数)",
						id:'field5',
						dataIndex : 'field5',
						//text:'count1',
						width : 45
					},{
						header : "总计",
						id:'total',
						dataIndex : 'total',
						//text:'count1',
						width : 45
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
			     					var grid = Ext.getCmp('QJContractRecordGrid');  
			     				    var rowSelectionModel = grid.getSelectionModel(); 
			     				    var record = rowSelectionModel.getSelected();  
			     				    var equipmentName = record.get('equipmentName'); 
			     				    var branchId = record.get('branchId'); 
			     				    var conId = record.get('conId');
			     				    var operatorId = record.get('operatorId');
			     				    //alert();
			     				   Ext.Ajax.request({
					        			url : __ctxPath + '/customer/SelectHYZKConHis.do',
					        			params : {
					        			  operatorId : operatorId,
					        			  conId : conId,
					        			  branchId:branchId
					        			},
					        			method : 'post',
					        			waitMsg : '正在提交数据...',
					        			success : function(result, request) {
					        				var str1=result.responseText.split('~')[0].split(':')[1];
					        	            var str2=result.responseText.split('~')[1];
					        	            var str3=result.responseText.split('~')[2].split('}')[0];
					        	            var strs =conId+"~"+branchId+"~"+str3+"~"+str2+"~"+operatorId+"";
					        	            //alert(strs);
					        	            window.open('http://10.160.4.88:8088/s2sh_pro/QJContractRecord.jsp?day='+strs+'*QJContractRecordReport');
					        	        }

					        		});
			     				}
			     			});
						}
					}]
		});
		
		
		this.gridPanel = new Ext.grid.GridPanel({
					id : 'QJContractRecordGrid',
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

		this.gridPanel.addListener('rowdblclick', function(grid, rowindex, e) {
					grid.getSelectionModel().each(function(rec) {
//						if (rec.data.isDefaultIn == '0'
//								&& rec.data.EId != -1) {
//							EquipmentView.edit(rec.data.EId);
//						}
						ConGYno = rec.get('operatorId');
		        	    ConWDno = rec.get('branchId');
		        	    var conId = rec.get('conId');
		        	    var equipmentName = rec.get('equipmentName');
		        	    //alert("网点名称："+equipmentName+"\n柜员号："+operatorId+"\n网点号："+branchId);
						
		        	    
		        	    Ext.Ajax.request({
		        			url : __ctxPath + '/customer/SelectHYZKConHis.do',
		        			params : {
		        			  operatorId : ConGYno,
		        			  conId : conId,
		        			  branchId:ConWDno
		        			},
		        			method : 'post',
		        			waitMsg : '正在提交数据...',
		        			success : function(result, request) {
		        				var str1=result.responseText.split('~')[0].split(':')[1];
		        				ConSDate=result.responseText.split('~')[1];
		        				ConEDate=result.responseText.split('~')[2].split('}')[0];
	        		            if(str1 == '0'){
	        		            	Ext.Msg.alert('温馨提示', '没有合约明细记录，无法查看数据...');
	        		            }else{
	        		            	var tabs = Ext.getCmp('centerTabPanel');
									var aForm = Ext.getCmp('QJContractRecordView');
									tabs.remove(aForm);
									aForm = new QJContractRecordView({
											});
									tabs.add(aForm);
									tabs.activate(aForm);
	        		            }
		        		           
		        	        }

		        		});
		        	    
					});
				});

	}// end of the initUIComponents

});






