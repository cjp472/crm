Ext.ns('EquipmentView');
/**
 * @author:
 * @class EquipmentView
 * @extends Ext.Panel
 * @description 用户角色列表
 * @company 北京优创融联科技有限公司
 * @createtime:2010-04-12
 */
var ulEmployeeNo="";
var useid="";
EquipmentView = Ext.extend(Ext.Panel, {
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
		EquipmentView.superclass.constructor.call(this, {
					id : 'EquipmentView',
					title : '设备管理',
					iconCls : 'menu-role',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor

	// 初始化组件
	initUIComponents : function() {
           this.store=new Ext.data.SimpleStore({
			
			 url : __ctxPath + "/xitong/listEquipmentUlEmployee.do",
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
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			height : 35,
			region : 'north',
			frame : false,
			layoutConfig : {
				padding : '5',
				align : 'middle'
			},
			id : 'EquipmentSearchForm',
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
	            text : '所属行'
	        }, {
	        	id:'suoshuhang',
	        	dataIndex : 'suoshuhang',
	            name : 'Q_suoshuhang_S_LK',
	            xtype : 'textfield'
	        }, {
	            text : '所属机构号'
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
				handler:function(){
					var branchId = Ext.getCmp('branchId').getValue();
					var operatorId = Ext.getCmp('new_operatorId').getValue();
					var suoshuhang = Ext.getCmp('suoshuhang').getValue();
					//alert(suoshuhang+branchId+operatorId);
					//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
					this.gridPanel.getStore().addListener({
						beforeload:function(store,records,options){
							store.baseParams = {
									suoshuhang:suoshuhang,
									branchId:branchId,
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
					var searchPanel = Ext.getCmp('EquipmentSearchForm');
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
			columns : [new Ext.grid.RowNumberer(), sm, {
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
						width : 25
					}, {
						header : "所属机构号",
						dataIndex : 'branchId',
						width : 25
					}, {
						header : "柜员号",
						dataIndex : 'operatorId',
						width : 25
					},{
						header : '所属支行',
						dataIndex : 'bankname',
						width :70
					},{
						header : "属分行",
						dataIndex : 'parentName',
						width :50
					},{
						header : 'IP地址',
						dataIndex : 'ipAddress',
						width : 50
					},{
						header : "布放地点",
						dataIndex : 'equipmentName',
						width : 75
					},{
						header : "地址",
						dataIndex : 'address',
						width : 50,
						hidden : true
					}, {
						header : "员工工号",
						dataIndex : 'equipmentId',
						width : 100,
						renderer : function(value) {
								   // alert(value);
							Ext.Ajax.request({
									url : __ctxPath + "/xitong/selectUserNoUlEmployee.do",
									method : 'post',
									async: false,
									params : {
										useid : value
									},
									method : 'post',
									success : function(response) {
							            result = Ext.util.JSON.decode(response.responseText);
							        }
							    })
							
								return result.data.ulEmployeeNo;
							
								
							}
					}, {
						header : "创建日期",
						dataIndex : 'curdate',
						width : 50
					}, {
						header : '管理',
						dataIndex : 'EId',
						width : 20,
						renderer : function(value, metadata, record, rowIndex,
								colIndex) {
							var editId = record.data.EId;
							var bankTypeId = record.data.bankTypeId;
							var parentId = record.data.parentId;
							var equipmentId = record.data.equipmentId;
							var branchId = record.data.branchId;
							var equipmentName = record.data.equipmentName;
							var bankname = record.data.bankname;
							var operatorId = record.data.operatorId;
							var curdate = record.data.curdate;
							var ipAddress = record.data.ipAddress;
							var parentName = record.data.parentName;
							var address=record.data.address;
							var str = '';
							//alert(bankTypeId+parentId+equipmentId);
						if (editId != -1) {
							if(isGranted('_EquipmentEdit')){
								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="EquipmentView.edit('
									+ editId + ',\''
									+ bankTypeId + '\''+ ',\'' 
									+ parentId + '\''+ ',\'' 
									+ equipmentId + '\''+ ',\'' 
									+ branchId + '\''+',\''
									+ equipmentName + '\''+',\''
									+ bankname + '\''+',\''
									+ parentName + '\''+',\''
									+ operatorId+'\''+',\''
									+ curdate+'\''+',\''
									+ address+'\''+',\''
									+ ipAddress+'\')"></button>';
							}
								if (isGranted('_EquipmentDel'))
									str += '<button title="删除" value=" " class="btn-del" onclick="EquipmentView.remove('
											+ editId + ')"></button>';

							
							}
							return str;
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});// end of cm

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'EquipmentGrid',
					region : 'center',
					tbar : this.topbar(),
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
EquipmentView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'EquipmentFootBar',
				height : 30,
				bodyStyle : 'text-align:right',
				items : []
			});
	if (isGranted('_EquipmentAdd')) {
		toolbar.add('->',new Ext.Button({
					iconCls : 'btn-add',
					text : '添加',
					handler : function() {
						new EquipmentForm().show();
					}
				}));
	}
	/*选中id之后，根据id批量删除  2014-4-16 nk
	 * */
	if (isGranted('_EquipmentDel')) {
		toolbar.add('-',new Ext.Button({
					iconCls : 'btn-del',
					text : '删除',
					handler:function(){
			       var grid = Ext.getCmp("EquipmentGrid");
			       var rows = grid.getSelectionModel().getSelections();
                   //var rows = grid.getSelectionModel().getSelections();
                   if (rows != null && rows.length > 0) {
                   var ids = new Array();
                   for (var i = 0; i < rows.length; i++)
                       ids.push(rows[i].data.EId);
               }
			   Ext.Msg.confirm('删除信息确认', '亲！你确定批量删除信息吗？', function(btn) {
				if (btn == 'yes') {
          
             Ext.Ajax.request({
        	   url : __ctxPath + '/xitong/multiDelEquipmentUlEmployee.do',
               params : {
                   ids : ids
               },
               method : 'post',
               success : function(result, request) {
                    var res = Ext.util.JSON.decode(result.responseText);
                    if (res.success == false) {
                      // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
                   Ext.ux.Toast.msg('操作信息', '亲！\n没有选中所要删除的信息！请您选中之后在删除');
                    } else {
                       Ext.ux.Toast.msg('操作信息', '删除成功!');
                    }
                    Ext.getCmp('EquipmentGrid').getStore().reload();
               }
          });
//		
	
}
});

		}
				}));
	}

	return toolbar;
};

//
///*删除单个记录2014-4-5
// * */
//
EquipmentView.remove = function(id) {
	//alert(id);
	var grid = Ext.getCmp("EquipmentGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						        url : __ctxPath + '/xitong/multiDelEquipmentUlEmployee.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
									grid.getStore().reload({params : {start : 0,limit : 25}});
								}
							});
				}
			});
};
//设备管理的编辑
EquipmentView.edit = function(id,bankTypeId,parentId,equipmentId,
		branchId,equipmentName,bankname,parentName,peratorId,curdate,address,ipAddress){
	new EquipmenteditWindow(id,bankTypeId,parentId,equipmentId,
			branchId,equipmentName,bankname,parentName,peratorId,curdate,address,ipAddress);
	
};


var EquipmenteditWindow = function(id,bankTypeId,parentId,equipmentId,
		branchId,equipmentName,bankname,parentName,peratorId,curdate,address,ipAddress){
//alert(id+'======'+equipmentId+'---------'+branchId+"----"
		//+equipmentName+"---"+bankname+"===="+peratorId+"---"+curdate+"---"+ipAddress+parentId+bankTypeId);
	
	//var result;
	
	Ext.Ajax.request({
		url : __ctxPath + '/xitong/SelectEmployeeNoUlEmployee.do',
		params : {
		  useid : equipmentId
		},
		method : 'post',
		async: false,
		waitMsg : '正在提交数据...',
		success : function(result, request) {
			//alert("后台查询出的数据：   "+result.responseText);
            ulEmployeeNo=result.responseText.split('~')[0].split(':')[1];
            useid=result.responseText.split('~')[1].split('}')[0];
                 //alert("str1"+str1+"str2"+str2+"---");
            //alert("ulEmployeeNo "+ulEmployeeNo+"\n useid"+useid);
           
        }
	});
	var str=ulEmployeeNo;
	var str1=useid;
//	Ext.Ajax.request({
//		url : __ctxPath + "/xitong/selectUserNoUlEmployee.do",
//		method : 'post',
//		async: false,
//		params : {
//			useid : equipmentId
//		},
//		method : 'post',
//		success : function(response) {
//            result = Ext.util.JSON.decode(response.responseText);
//        }
//	});
//	
//	ulEmployeeNo=result.data.ulEmployeeNo;----方法有一个没有解决的问题，当两个传值过来时，就接受不到值
	
	
	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/xitong/get3UlEmployee.do',
		
		layout : 'form',
		//id : 'xxx',
		frame : true,
//	        	defaultType : 'textfield',
				items : [{
					name : 'Equipment.EId',
					id:'Equipment.EId',
					xtype : 'hidden',
					value : id
				}, {
					fieldLabel : '机具号',
					name : 'Equipment.equipmentId',
					id:'equipmentId',
					allowBlank : false,
					width : 300,
					height : 25,
					xtype:'textfield',
					value : equipmentId
				},{
					fieldLabel : '<font style="color:red">*</font>所属机构号',
					width : 300,
					height : 25,
					xtype:'textfield',
					name : 'suoshuhang.branchId',
					id : 'suoshuhang.branchId',
					disabled:true,
					readOnly : true,
					value : branchId
				}, 
				{
					fieldLabel : '柜员号',
					name : 'Equipment.operatorId',
					id:'Equipment.operatorId',
					allowBlank : false,
					width : 300,
					height : 25,
					xtype:'textfield',
					value : peratorId
				}, 
				 { 
					xtype : 'container',
					fieldLabel : '<font style="color:red">*</font>所属支行',
					style : 'padding-left:0px;margin-bottom:7px;',
					id : 'depContainer',
					layout : 'column',
					items : [{
					columnWidth : .7,
					xtype : 'textfield',
					name : 'Equipment.bankname',
					id : 'suoshuhang',
					allowBlank : false,
					editable : false,
					readOnly : true,
					disabled:true,
					value : bankname
				},{
				    xtype:'button',
				    iconCls:'btn-dep-sel',
				    text:'选择部门',
				    handler:function(){
					BankTypeSelector.getView(
							 function(bankTypeId,bankname,parentId,parentName,branchId){
					                Ext.getCmp('suoshuhang').setValue(bankname);
					                Ext.getCmp('suoshuhang.bankTypeId').setValue(bankTypeId);
					                Ext.getCmp('suoshuhang.parentId').setValue(parentId);
					                Ext.getCmp('suoshuhang.parentName').setValue(parentName);
					                Ext.getCmp('suoshuhang.branchId').setValue(branchId);
					             }
				       ).show();
				    }
				},{
				   xtype : 'button',
				   text : '清除记录',
				   iconCls : 'reset',
				   handler : function(){
				      Ext.getCmp('suoshuhang').setValue('');
				      Ext.getCmp('suoshuhang.parentName').setValue('');
				      Ext.getCmp('suoshuhang.branchId').setValue('');
				   }
				}]},{
					fieldLabel : '编号',
					name : 'suoshuhang.bankTypeId',
					id : 'suoshuhang.bankTypeId',
					readOnly : true,
					xtype : 'hidden',
					value : bankTypeId
				},
				{
					fieldLabel : '上级编号',
					name : 'suoshuhang.parentId',
					id : 'suoshuhang.parentId',
					readOnly : true,
					xtype : 'hidden',
					value : parentId
					//hidden : true
				},{
					fieldLabel : '<font style="color:red">*</font>所属分行\\管理部',
					name : 'suoshuhang.parentName',
					xtype : 'textfield',
					id : 'suoshuhang.parentName',
					width : 300,
					height : 25,
					readOnly : true,
					disabled:true,
					value : parentName
					
				},{
					fieldLabel : '布放地点',
					//xtype : 'textarea',
					name : 'Equipment.equipmentName',
					id:'Equipment.equipmentName',
					allowBlank : false,
					width : 300,
					height : 25,
					xtype:'textfield',
					value : equipmentName
				},{
					fieldLabel : 'ip地址',
					//xtype : 'textarea',
					name : 'Equipment.ipAddress',
					id:'ip',
					allowBlank : false,
					width : 300,
					height : 25,
					xtype:'textfield',
					value : ipAddress
				},
				{
					fieldLabel : '日期',
					//xtype : 'textarea',
					name : 'Equipment.curdate',
					id:'Equipment.curdate',
					xtype : 'datefield',
					format : 'Y-m-d',
					allowBlank : false,
					editable : false,
					width : 300,
					height : 25,
					xtype : 'hidden',
					value : curdate
					//hidden : true
				},{
					fieldLabel : '编号',
					name : 'ulEmployee.useid',
					id : 'ulEmployee.useid',
					readOnly : true,
					xtype : 'hidden',
					value:str1
				},{
					fieldLabel : '姓名',
					name : 'ulEmployee.name',
					id : 'ulEmployee.name',
					readOnly : true,
					xtype : 'hidden'
				},{
					fieldLabel : '职务',
					name : 'ulEmployee.zhiwei',
					id : 'ulEmployee.zhiwei',
					readOnly : true,
					xtype : 'hidden'
				},{
					 
					xtype : 'container',
					fieldLabel : '<font style="color:red"></font>维护人员',
					style : 'padding-left:0px;margin-bottom:7px;',
					//id : 'UlEmpEquip',
					layout : 'column',
					items : [{
					columnWidth : .7,
					xtype : 'textfield',
					name : 'Equipment.UlEmployeeId',
					id:'UlEmpEquip',
					allowBlank : false,
					editable : false,
					disabled:true,
					readOnly : true,
					value:str
				},{
				    xtype:'button',
				    iconCls:'btn-dep-sel',
				    text:'维护人员',
					handler:function(){	
	            	    var UlEmpBTypeId = Ext.getCmp('suoshuhang.bankTypeId').getValue();
	            	     //alert("ee:"+UlEmpBTypeId);
	            	       if(UlEmpBTypeId!=null && UlEmpBTypeId!='' ){//存在设备
	            	    	   EquipmentForm.selelctUlemployee(UlEmpBTypeId);
	    					
	            	       }else{//不存在设备
	            	    	  alert("请选择所机构信息"); 
	            	       }
	            	    
					}
				},{
				   xtype : 'button',
				   text : '清除记录',
				   iconCls : 'reset',
				   id:'QCJL',
				   handler : function(){
						Ext.getCmp("UlEmpEquip").setValue('');
		                //Ext.getCmp("ulEmployee.name").setValue('');
		                //Ext.getCmp("ulEmployee.zhiwei").setValue('');
		                //Ext.getCmp("ulEmployee.useid").setValue('');
				   }
				}]
				},{
					fieldLabel : '地址',
					name : 'address',
					id : 'address',
					width : 300,
					height : 25,
					//readOnly : true,
					xtype : 'textfield',
					//xtype : 'hidden',
					value : address
					//hidden : true
				}
				]
			});
			
	var setEquipment = new Ext.Window({
		title :"修改设备的信息",
		iconCls:'btn-edit',
		width : 500,
		height : 480,
		minWidth : 599,
		minHeight : 479,
		modal: true,
		layout : 'fit',
		buttonAlign : 'center',
		items:[formPanel],
		buttons :  [{
			iconCls : 'btn-save',
			text : '保存',
			xtype : 'button',
			//scope : this,
			handler : function() {
			//alert("_____");
			var grid = Ext.getCmp("EquipmentGrid");
			    var fp = Ext.getCmp('editWindow');
			    var EId = Ext.getCmp('Equipment.EId').getValue();
			    var equipmentId = Ext.getCmp('equipmentId').getValue();
				var operatorId = Ext.getCmp('Equipment.operatorId').getValue();
				var equipmentName = Ext.getCmp('Equipment.equipmentName').getValue();
				var branchId = Ext.getCmp('suoshuhang.branchId').getValue();
				//var curdate = Ext.get('Equipment.curdate').getValue();
				var curdate = new Date().format("yyyy-MM-dd");
				var ip = Ext.getCmp('ip').getValue();
				var bankTypeName = Ext.getCmp('suoshuhang').getValue();
				var bankTypeId = Ext.getCmp('suoshuhang.bankTypeId').getValue();
				var parentName = Ext.getCmp('suoshuhang.parentName').getValue();
				var parentId = Ext.getCmp('suoshuhang.parentId').getValue();
				var address = Ext.getCmp('address').getValue();
				var UlEmpEquip = Ext.getCmp('UlEmpEquip').getValue();
				var useid= Ext.getCmp("ulEmployee.useid").getValue();
			//	alert(equipmentId+"---"+operatorId+equipmentName+branchId+curdate+bankTypeId+bankTypeName+parentId
				//		+ip);
				//alert("UlEmpEquip "+UlEmpEquip+"=="+useid);
			    if(equipmentId!='' &&　operatorId!=''&& equipmentName!=''
			    	&& branchId!=''　&&　ip!=''&& bankTypeName!='' && bankTypeName!='' ){  
					Ext.Ajax.request({
						url : __ctxPath + '/xitong/updatelistEquipmentUlEmployee.do',
						params : {
							     EId:EId,
							     equipmentId : equipmentId,
								operatorId : operatorId,
								equipmentName : equipmentName,
								branchId : branchId,
								curdate : curdate,
								bankTypeId : bankTypeId,
								bankTypeName : bankTypeName,
								address : address,
								ip : ip,
								parentId:parentId,
								parentName:parentName,
								UlEmpEquip:UlEmpEquip,
								useid:useid
						},
						method : 'post',
						waitMsg : '正在提交数据...',
						success : function(result, request) {
		                    var res = Ext.util.JSON.decode(result.responseText);
		                    if (res.success == true) {
		                      // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
		                      
		                    Ext.ux.Toast.msg('温馨提示', '亲!恭喜您，保存成功！');
		                    setEquipment.close();
		                    //Ext.getCmp('EquipmentFormWin').close();
		                    } else if(res.success==false){
		                    	 Ext.ux.Toast.msg('温馨提示', '亲!机具号重复或网点名称或机具号为空，\n请重新输入！');

		                    	
		                    }
		                    Ext.getCmp('EquipmentGrid').getStore().reload();
		                }

										
					}); 
				  
			    }else{
			    	Ext.ux.Toast.msg('温馨提示', '带*不能为空！');
			    }
			}
		},{
			text : '取消',
			iconCls:'btn-cancel',
			handler : function() {
			setEquipment.close();
			}
	}]

			});

	
	setEquipment.show();
};

