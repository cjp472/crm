/**
 * @author:cf0666@gmail.com
 * @class UlEmployeeView
 * @extends Ext.Panel
 * @description [UlEmployee]管理
 * @company 优创融联科技
 * @createtime:
 */

var picPath = "";
UlEmployeeView = Ext.extend(Ext.Panel, {
			// 构造函数
			    constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UlEmployeeView.superclass.constructor.call(this, {
							id : 'UlEmployeeViewWin',
							title : '员工档案管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData=[
					['fullname','姓名',new Ext.form.TextField({name : 'fullname',allowBlank:true})],
					['alias','别名',new Ext.form.TextField({name : 'alias',allowBlank:true})],
					['sex','性别',new MT.DicComboBox({hiddenName : 'sex',itemKey : 'XB001'})],
					['birthday','生日',new Ext.form.DateField({hiddenName : 'sex',format : 'Y-m-d'})]
				]
				var UlEmployeeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '员工管理高级查询',
					fieldData : fieldnameComboData
				});
						
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
//							layout : 'form',
//							region : 'north',
//							id : 'UlEmployeeSearchPanel',
//							colNums : 3,
							region:'north',
							height : 35,
							frame : false,
							border:false,
							id : 'UlEmployeeSearchPanel',
							layout : 'hbox',
							layoutConfig: {
				                    padding:'5',
				                    align:'middle'
				            },
							defaults : {
								xtype : 'label',
								border:false,
								margins:{top:0, right:4, bottom:4, left:4}
							},
							items : [{
                                        text : '工号'
                                    }, {
                                        name : 'Q_userNo_S_LK',
                                        id:'Q_userNo',
                                        xtype : 'textfield'
                                    }, {
										text : '姓名'
									}, {
										name : 'Q_fullname_S_LK',
										id:'Q_fullname',
										xtype : 'textfield'
									}, {
										text : '职务'
									}, {
										//fieldLabel : '所属省',
										name : 'roleName',
										id : 'Q_roleName',
										 width : 300,
										 height : 25,
										xtype : 'combo',
										mode : 'local',
										displayField : 'roleName',
										valueField : 'roleName',
										editable : false,
										triggerAction : 'all',
										store : new Ext.data.SimpleStore({
													autoLoad : true,
													url : __ctxPath + '/xitong/getRoleNameUlEmployee.do',
													fields : ['roleId', 'roleName']
												})
										
									},{
										xtype : 'button',
										text : '查询',
										iconCls : 'search',
										scope:this,
										handler: function(){
											var fullname = Ext.getCmp('Q_fullname').getValue();
											var userNo = Ext.getCmp('Q_userNo').getValue();
											var zhiwei = Ext.getCmp('Q_roleName').getValue();
											//alert(zhiwei);
											//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
											this.gridPanel.getStore().addListener({
												 beforeload:function(store,records,options){
													store.baseParams = {
															fullname:fullname,
															userNo:userNo,
															zhiwei:zhiwei
															
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
										text : '清空',
										iconCls : 'reset',
										scope:this,
										handler : this.reset
									}]
						});// end of searchPanel

				this.topbar = new Ext.Toolbar({
							items : ['->', {
										iconCls : 'btn-del',
										text : '删除',
										xtype : 'button',
										scope : this,
										handler : this.removeSelRs
										//handler:this.removemutlDel
									}, '->', {
										iconCls : 'btn-add',
										text : '添加',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									} ]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
                    //showSm:false,
                    showSm:true,
					// 使用RowActions
					rowActions : true,
					id : 'UlEmployeeGrid',
					url : __ctxPath + "/xitong/listUlEUlEmployee.do",
					fields : [{
								name : 'useid',
								type : 'int'
							}, 'fullname', 'sex', 'birthday', 'parent','education','alias','type','biyeyuanxiao',
								'ulDepartment', 'zhiwei', 'zhiji','bankTypeId', 'bankname','status','ruzhifangshi',
								'hetongdaoqishijian','zhuanzhengshijian','parent','parentName','ruzhishijian','note',
								'ulContactEmp','hujiGuojia','hujiSheng','hujiShi','hujiDiqu','gongzuodiGuojia',
								'gongzuodiSheng','gongzuodiShi','gongzuodiDiqu','userNo','idcard','phone'],
					columns : [{
								header : '工号',
								dataIndex : 'userNo',
								sortable : true
//								hidden : true
							}, {
								header : '姓名',
								dataIndex : 'fullname'
							}, {
								header : '性别',
								id:'sex',
								dataIndex : 'sex',
								renderer : function(value) {
									return XB001.get(value);
								}
							},
							{
								header : '身份证号',
								dataIndex : 'idcard'
								
							},{
								header : '手机号',
								dataIndex : 'phone'

//							},{
//								header : '生日',
//								hidden : true,
//								dataIndex : 'birthday',
//								renderer : function(value){
//										if(value != null && value != undefined)
//											return value.substring(0, 10);
//										else
//											return '';
//								}
//							}, {
//								header : '所属部门',
//								hidden : true,
//								dataIndex : 'ulDepartment',
//								renderer : function(value) {
//									if (value == null) {
//										return '';
//									} else {
//										return value.depname;
//									}
//								}
//							}, {
//								header : '上级',
//								hidden : true,
//								dataIndex : 'parentName'
//								renderer : function(value) {
//									if (value == null) {
//										return '';
//									} else {
//										return value.fullname;
//									}
//								}
//							},{	
//								header : '入职时间',
//								dataIndex : 'ruzhishijian',
//								hidden : true,
//								renderer : function(value){
//									if(value != null && value != undefined)
//										return value.substring(0, 10);
//									else
//										return '';
//								}
							}, {
								header : '职务',
								dataIndex : 'zhiwei'
//							}, {
//								header : '职级',
//								dataIndex : 'zhiji',
//								hidden : true,
//								renderer : function(value) {
//									return ZJ001.get(value);
//								}
							}, {
								header : '所属行',
								dataIndex : 'bankname',
								//hidden : true,
								width : 75
							},{

								header : '柜员号',	
								//hidden : true,
								isExp : false,
								dataIndex : 'userNo',
								width : 100,
								renderer : function(value) {
								   // alert(value);
									var result;
									Ext.Ajax.request({
										url : __ctxPath + "/xitong/selectEquipmentIdUlEmployee.do",
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
									return result.data.equipOperatorId;
								
									
								}

							},{
								header : '状态',
								dataIndex : 'status',
								hidden : true,
								renderer : function(value) {
									return ZT001.get(value);
								}
							}, new Ext.ux.grid.RowActions({
										header : '管理',
										width : 85,
										actions : [
										           {

//													iconCls : 'btn-readdocument',
//		
//													qtip : '查看',
//		
//													style : 'margin:0 1px 0 1px'
//												},{
//													iconCls : 'btn-setting',
//													qtip : '启用',
//													style : 'margin:0 3px 0 3px'
//												}, {
													iconCls : 'btn-edit',
													qtip : '编辑',
													style : 'margin:0 1px 0 1px'
												}, {
													iconCls : 'btn-del',
													qtip : '删除',
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});

				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
		
			
			
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			search : function() {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			// GridPanel行双击 处理事件
//			rowClick : function(grid, rowindex, e) {
//				grid.getSelectionModel().each(function(record) {
//							var tabs = Ext.getCmp('centerTabPanel');
//							var aForm = Ext.getCmp('UlEmployeeFormWin');
//							if (aForm != null) {
//								tabs.remove('UlEmployeeFormWin');
//							}
//							aForm = new UlEmployeeForm({
//										useid : record.data.useid,
//										huji : [0, record.data.hujiSheng, 
//										        record.data.hujiShi, record.data.hujiDiqu],
//										gongzuodi : [0, record.data.gongzuodiSheng, 
//												        record.data.gongzuodiShi, record.data.hujiDiqu ]
//									});
//							aForm.setTitle('员工:' + record.data.fullname + '详情');
//							tabs.add(aForm);
//							tabs.activate(aForm);
//						});
//			},
			// 创建记录
			createRs : function() {
				//new UlEmployeeForm().show();
				//var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UlEmployeeFormWin');
				if (aForm != null) {
					aForm.destroy();
				}
				aForm = new UlEmployeeForm().show();
				aForm.setTitle('添加员工信息');
				//tabs.add(aForm);
				//tabs.activate(aForm);
			},
			// 按ID删除记录  按行删除
			removeRs : function(id) {
                Ext.Ajax.request({
                    url : __ctxPath + '/xitong/multiDelUlEmployee.do',
                    params : {
                        ids : id
                    },
                    method : 'post',
                    success : function(result, request) {
                         var res = Ext.util.JSON.decode(result.responseText);
                         if (res.success == false) {
                            Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
                         } else {
                            Ext.ux.Toast.msg('操作信息', '删除成功!');
                         }
                         Ext.getCmp('UlEmployeeGrid').getStore().reload();
                    }
                });
			},
			// 把选中ID删除
//			removeSelRs : function() {
//                var grid = this.gridPanel;
//                var rows = grid.getSelectionModel().getSelections();
//                if (rows != null && rows.length > 0) {
//                    var ids = new Array();
//                    for (var i = 0; i < rows.length; i++)
//                        ids.push(rows[i].data.useid);
//                }
//                Ext.Ajax.request({
//                    url : __ctxPath + '/xitong/multiDel12UlEmployee.do',
//                    params : {
//                        ids : ids
//                    },
//                    method : 'post',
//                    success : function(result, request) {
//                         var res = Ext.util.JSON.decode(result.responseText);
//                         if (res.success == false) {
//                            Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
//                         } else {
//                            Ext.ux.Toast.msg('操作信息', '删除成功!');
//                         }
//                         Ext.getCmp('UlEmployeeGrid').getStore().reload();
//                    }
//                });
//			},
			// 按ID启用记录  按行启用
			enableRs : function(record) {
				Ext.Msg.confirm('启用操作', '你确定启用该员工?', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : __ctxPath + '/xitong/multiEnableUlEmployee.do',
							params : {
								ids : record.data.useid
							},
							success : function(result, request) {
								var res = Ext.util.JSON.decode(result.responseText);
								if (res.success == false) {
									Ext.ux.Toast.msg('操作信息', res.message);
								} else {
									Ext.ux.Toast.msg('操作信息', '启用成功!');
								}
								Ext.getCmp('UlEmployeeGrid').getStore().reload();
							},
							failure : function(result, request) {}
						});
					}
				});
			},
			// 把选中ID启用
			enableSelRs : function() {
				var grid = Ext.getCmp('UlEmployeeGrid');
				var rows = grid.getSelectionModel().getSelections();
				if (rows != null && rows.length > 0) {
					var ids = new Array();
					for (var i = 0; i < rows.length; i++)
						ids.push(rows[i].data.useid);
				}
				Ext.Msg.confirm('启用操作', '你确定启用该员工?', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : __ctxPath + '/xitong/multiEnableUlEmployee.do',
							params : {
								ids :ids
							},
							success : function(result, request) {
								var res = Ext.util.JSON.decode(result.responseText);
								if (res.success == false) {
									Ext.ux.Toast.msg('操作信息', res.message);
								} else {
									Ext.ux.Toast.msg('操作信息', '启用成功!');
								}
								Ext.getCmp('UlEmployeeGrid').getStore().reload();
							},
							failure : function(result, request) {}
						});
					}
				});
			},
	        // 2014/3/26根据选中的ID删除数据
			removeSelRs : function() {
				 var grid = this.gridPanel;
	                var rows = grid.getSelectionModel().getSelections();
	                if (rows != null && rows.length > 0) {
	                    var ids = new Array();
	                    for (var i = 0; i < rows.length; i++)
	                        ids.push(rows[i].data.useid);
	                }
				Ext.Msg.confirm('删除信息确认', '注意：删除该员工档案信息，该员工下的所有相关数据也一并删除，\n并不能恢复，您确认要删除该记录吗？', function(btn) {
					if (btn == 'yes') {
               
                Ext.Ajax.request({
                	url : __ctxPath + '/xitong/multideleteULMUlEmployee.do',
                    params : {
                        ids : ids
                    },
                    method : 'post',
                    success : function(result, request) {
                         var res = Ext.util.JSON.decode(result.responseText);
                         if (res.success == false) {
                           // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
                        Ext.ux.Toast.msg('操作信息', '亲！删除失败。');
                         } else {
                            Ext.ux.Toast.msg('操作信息', '删除成功!');
                         }
                         Ext.getCmp('UlEmployeeGrid').getStore().reload();
                    }
               });
//			
		
	}
});
},
			
			 //删除每行2014-3-17的记录
			removeDel : function(id) {
				//var ss=Ext.getCmp('uuu').getValue();
				//alert(id);
				Ext.Msg.confirm('删除信息确认', '注意：删除该员工档案信息，该员工下的所有相关数据也一并删除，\n并不能恢复，您确认要删除该记录吗？', function(btn) {
					if (btn == 'yes') {						
							 Ext.Ajax.request({
				                    url : __ctxPath + '/xitong/multideleteULMUlEmployee.do',
				                    params : {
								     ids : id
								     
				                    },
				                    method : 'post',
				                    success : function(result, request) {
				                         var res = Ext.util.JSON.decode(result.responseText);
				                         if (res.success == false) {
				                           // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
				                           
				                         Ext.ux.Toast.msg('操作信息', '亲！删除失败!');
				                        
				                         } else if(res.success==true){
				                            Ext.ux.Toast.msg('操作信息', '删除成功!');
				                         }
				                         Ext.getCmp('UlEmployeeGrid').getStore().reload();
				                     }
				                });
//							
						
					}
				});
			},

			// 编辑Rs
			editRs : function(record) {
	            var tabs = Ext.getCmp('centerTabPanel');
	            var aForm = Ext.getCmp('UlEmployeeForm');
	            if (aForm != null) {
	                tabs.remove('UlEmployeeForm');
	            }
	            aForm = new UlEmployeeForm({
	                        useid : record.data.useid,
	                        huji : [0, record.data.hujiSheng, 
	                                record.data.hujiShi, record.data.hujiDiqu],
	                        gongzuodi : [0, record.data.gongzuodiSheng, 
	                                        record.data.gongzuodiShi, record.data.hujiDiqu ]
	                    }).show();
	            aForm.setTitle('员工:' + record.data.fullname + '详情');
	            tabs.add(aForm);
	            tabs.activate(aForm);
	        },
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						//this.removeRs.call(this, record.data.useid);
						this.removeDel.call(this,record.data.useid);
						break;
					case 'btn-edit' :
						//this.editRs.call(this, record);
						UlEmployeeEdit(record.data);
						break;
					case 'btn-readdocument' :
						UlEmployeeInfo(record.data);
						break;
					default :
						break;
				}
			}
	        
	        
	        
	        
	        
	        
		});

var strEId="";//设备编号
var StrEquipOperatorId="";//柜员号
var UlEmployeeEdit = function(UlEmp){
//	var result;
//	var  equipmentId="";
//	Ext.Ajax.request({
//		url : __ctxPath + "/xitong/selectEquipmentIdUlEmployee.do",
//		method : 'post',
//		async: false,
//		params : {
//			useid : UlEmp.userNo
//		},
//		method : 'post',
//		success : function(response) {
//            result = Ext.util.JSON.decode(response.responseText);
//        }
//	});
//	equipmentId=result.data.equipOperatorId;
	
//	var  equipmentId="";
	 var userNo=UlEmp.userNo;//当前员工的id  "/201508/20150831104713.jpg"
		 Ext.Ajax.request({
			url : __ctxPath + '/xitong/SelecOperatorIdUlEmployee.do',
			method : 'post',
			async: false,
			params : {
				useid : UlEmp.userNo
			},
			success : function(result, request) {
			 StrEquipOperatorId=result.responseText.split('~')[0].split(':')[1];
			  strEId=result.responseText.split('~')[1].split('}')[0];
		    }
	  });
	  var EId=strEId;//重新定义局部的变量，是为了能获取值
	  var EquipOperatorId=StrEquipOperatorId; 
	 var str='总行座席';
	 var str1='总行座席班长';
	 var PicPath = "";
	 var sex="";
	 var userid=UlEmp.useid;//当前员工的id  "/201508/20150831104713.jpg"
		 Ext.Ajax.request({
			url : __ctxPath + '/xitong/selectPhotoUlEmployee.do?userid='+userid,
			method : 'post',
			async: false,
			//waitMsg : '正在提交数据...',
			success : function(result, request) {
				 PicPath = result.responseText.split(':')[1].split('}')[0];
		    }
	  });
	   
	  /***
	   * 1.判断 var display = Ext.getCmp('displayUserPhoto');是否是显示，如显示
	   * 2、把UlEmp.useid传给后台
	   * 3、判断path是否为null、判断性别
	   * 4、判断path是不否为null、显示path
	   * /  
	/**
	    var display = Ext.getCmp('displayUserPhoto');
	   	//判断path是否是空值
	   	
	   	//if是空...
	    //判断员工是否是男、女
		if (sex == '2') {
			display.body.update('<img src="'+ __ctxPath+ '/images/default_image_female.jpg"/>');
		} else {
			display.body.update('<img src="'
							+ __ctxPath
							+ '/images/default_image_male.jpg"/>');
		}
		
		display.body.update('<img src="' + __ctxPath + '/attachFiles/'
			+ Path + '"  width="100%" height="100%"/>');
		
	 */
	
	
	
	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/xitong/getUlEmployee.do?useid=' + this.useid,
		layout : 'form',
		frame : true,
		items : [{
			  name : 'ulEmployee.useid',
			  xtype : 'hidden',
			 id : 'useid',
			 value : UlEmp.useid
		 },  {
		        fieldLabel : '姓名',
				id : 'ulEmployee.fullname_form',
				name : 'ulEmployee.fullname',
				allowBlank : false,
				maxLength : 10,
				//anchor:'100%',
				xtype : 'textfield',
				width : 300,
				height : 25,
				value : UlEmp.fullname
			},{
				fieldLabel : '工号',
				width : 300,
				height : 25,
				id : 'ulEmployee.userNo_form',
				name : 'ulEmployee.userNo',
				maxLength : 50,
				allowBlank : false,
				xtype : 'textfield',
				value : UlEmp.userNo
			},{
				fieldLabel : '性别',
				id : 'sex',
				hiddenName : 'ulEmployee.sex',
				displayField : 'itemName',
				valueField : 'itemId',
				xtype : 'combo',
				mode : 'local',
				allowBlank : false,
				editable : false,
				triggerAction : 'all',
				value : UlEmp.sex,
				store : [['1', '男'], ['2', '女']],
				listeners : {
					select : function(combobox,record, index){
						if(index == 1){
							//jsLog_admin(logStrMsg("管理员填写-补录授权：男","INFO"));	
						}else{
							//jsLog_admin(logStrMsg("管理员填写-补录授权：女","INFO"));
						}
					}
				}
			},{
				
				xtype : 'compositefield',
				fieldLabel : '<font style="color:red">*</font>职务',
				 
				items : [{
						//fieldLabel : '所属省',
						//name : 'roleName',
						id : 'QsroleName',
						//maxHeight : 200,
						//width : 127,
						 width : 300,
						 height : 25,
						xtype : 'combo',
						mode : 'local',
						editable : false,
						value : UlEmp.zhiwei,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
									autoLoad : true,
									url : __ctxPath + '/xitong/getRoleNameUlEmployee.do',
									fields : ['roleId', 'roleName']
								}),
						displayField : 'roleName',
						valueField : 'roleName',
						listeners : {
							select  : function(combobox,record, index){
						       var nodeId = Ext.getCmp('QsroleName').getValue();
						       var strZH='支行操作员'; 
						         if(nodeId!=strZH){
						        	Ext.getCmp("equipmentedit").hide();
						        }else{
						            Ext.getCmp("equipmentedit").show();
						         }
					           if(nodeId!=str && nodeId!= str1){
					        	   Ext.getCmp("Photos").hide();
					           }else{
					        	   Ext.getCmp("Photos").show();
					           }
					           
							}
						}
					}]
					//value:'',
					
			}, {
				fieldLabel : '手机号',
				name : 'phone',
				id:'phone',
				allowBlank : false,
				xtype:'textfield',
				width : 300,
				height : 25,
				value : UlEmp.phone
			},{
				fieldLabel : '身份证号',
				name : 'idcard',
				id:'idcard',
				allowBlank : false,
				xtype:'textfield',
				width : 300,
				height : 25,
				value : UlEmp.idcard
			},{
				layout : 'column',
				xtype : 'container',
				fieldLabel : '<font style="color:red">*</font>所属行\\管理部',
				items : [{
							name : 'ulEmployee.bankTypeId',
							id : 'ulEmployee.bankTypeId_form_hid',
							xtype : 'hidden',
							value : UlEmp.bankTypeId
						}, {
							columnWidth : .5,
							xtype : 'textfield',
							 anchor:'100%',
							// width : '100px',
							id : 'ulEmployee.bankname_form',
                            editable : false,
                            maxLength : 10,
                            value : UlEmp.bankname
						}, {
							xtype : 'button',
							border : false,
							iconCls : 'btn-user-sel',
							text : '选择',
							handler : UlEmployeeForm.selectSuoShuHang
						}]
			
				},{
					id:'equipmentedit',
					layout : 'column',
					 xtype : 'container',
		             items:[{
							header : 'EId',
							//dataIndex : 'EId',
							id:'EId',
							xtype : 'textfield',
							hidden : true,
							value:EId
							
						 },{
							name : 'ulEmployee.equipmentId',
							id:'ulEmployee.equipmentId_form_hid',
							//id : 'ulEmployee.equipmentId_form_hid',
							xtype : 'hidden'
							//value : UlEmp.userNo
			
							
						},{
							name : 'ulEmployee.branchId',
							id : 'ulEmployee.branchId_form_hid',
							xtype : 'hidden',
							value : UlEmp.branchId
			
							
						 },{
							xtype : 'button',
							border : false,
							iconCls : 'btn-user-sel',
							text : '选择设备信息',
							handler:function(){
			            	    var bankId = Ext.getCmp('ulEmployee.bankTypeId_form_hid').getValue();
			            	     //alert("ee:"+bankId);
			            	       if(bankId!=null && bankId!='' ){//存在设备
			            	    	   UlEmployeeForm.selelctEquipment(bankId);
			            	    	   //new UlempEquipView(bankId).show();
			    					
			            	       }else{//不存在设备
			            	    	  alert("请选择所属行信息"); 
			            	       }
			            	    
							}
						},{
							fieldLabel : '<font style="color:red">&nbsp;&nbsp;*</font>柜员号',			
							columnWidth : .5,
							xtype : 'textfield',
							anchor:'100%',
							id:'operatorId',
							//id : 'ulEmployee.equipmentId_form_hid',
							value : EquipOperatorId,
                            editable : false,
                           // maxLength : 10,
							listeners : {
							  render : function(){
						               var nodeId = Ext.getCmp('QsroleName').getValue();
						               var str='支行操作员'; 
						              //alert(nodeId);
						             if(nodeId!="支行操作员"){
						        	    Ext.getCmp("equipmentedit").hide();
						             }else{
						        	    Ext.getCmp("equipmentedit").show();
						        	    
						           }
						             
					              }
							}

						}]
				
				},{
					filedLabel : '照片',
					xtype : 'hidden',
					id : 'appUser.photo',
					name : 'appUser.photo'
					
				},{
					id : 'Photos',
					xtype : "panel",
					bodyStyle : 'MARGIN-RIGHT: auto; MARGIN-LEFT: auto;',
					title : "个人照片",
					 width : 300,
					 height : 300,
					html : '<div style="MARGIN-RIGHT: auto; MARGIN-LEFT: auto;"><img src="'+ __ctxPath + '/images/default_image_male.jpg" style=""/></div>',
					tbar : new Ext.Toolbar({
								height : 20,
								items : [{
											text : '上传',
											iconCls : 'btn-upload',
											handler : function() {
									              uploadPhotoBtn(UlEmp.useid);
											}
										}, {
											text : '删除',
											iconCls : 'btn-delete',
											handler : function() {
											  deletePhotoBtn(UlEmp.useid);
											}
										}]
							}),
							listeners : {
								render : function(){
							       var nodeId = Ext.getCmp('QsroleName').getValue();
							           if(nodeId!=str && nodeId!= str1){
							        	   Ext.getCmp("Photos").hide();
							           }else{
							        	   Ext.getCmp("Photos").show();
							           }
								}
							}
				}
				]
		});
	
	var setUlEmployeeEdit = new Ext.Window({
		title :"修改员工的信息",
		iconCls:'btn-edit',
		width : 500,
		height : 600,
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
			    var grid = Ext.getCmp("UlEmployeeGrid");
			    var fp = Ext.getCmp('UlEmployeeFormWin');
			    var useid = Ext.getCmp('useid').getValue();
				var fullname = Ext.getCmp('ulEmployee.fullname_form').getValue();
				var sex1 = Ext.getCmp('sex').getValue();
				var zhiwei = Ext.getCmp('QsroleName').getValue();
				var userNo = Ext.getCmp('ulEmployee.userNo_form').getValue();
				var idcard = Ext.getCmp('idcard').getValue();
				var phone = Ext.getCmp('phone').getValue();
				var bankTypeId = Ext.getCmp('ulEmployee.bankTypeId_form_hid').getValue();
				var bankname = Ext.getCmp('ulEmployee.bankname_form').getValue();
				var photo = Ext.getCmp('appUser.photo').getValue();
				var operatorId=Ext.getCmp('operatorId').getValue();
				var equipmentId=Ext.getCmp('ulEmployee.equipmentId_form_hid').getValue();
				var eqEId= Ext.getCmp('EId').getValue();
				//alert("operatorId"+operatorId+"equipmentId:"+equipmentId+"eqEId "+eqEId);
				//alert("==photo=="+photo+"\nbankTypeId:"+bankTypeId+"\nbankname:"+bankname);
				Ext.Ajax.request({
					url : __ctxPath + '/xitong/UlemployeeEquipSaveUlEmployee.do',
					async: false,
					params : {
					            useid:useid,
						        fullname : fullname,
						        sex : sex1,
						        zhiwei : zhiwei,
						        userNo : userNo,
						        idcard : idcard,
								bankTypeId : bankTypeId,
								bankname : bankname,
								phone : phone,
								photo:photo,
								operatorId:operatorId,
								equipmentId:equipmentId,
								eqEId:eqEId
								
							
					},
					method : 'post',
					waitMsg : '正在提交数据...',
					success : function(result, request) {
	                    var res = Ext.util.JSON.decode(result.responseText);
	                    if (res.success == true) {
	                      // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
	                      
	                    Ext.ux.Toast.msg('温馨提示', '亲!恭喜您，保存成功！');
	                    setUlEmployeeEdit.close();
	                    //Ext.getCmp('EquipmentFormWin').close();
	                    } else if(res.success==false){
	                    	 Ext.ux.Toast.msg('温馨提示', '亲!机具号重复或网点名称或机具号为空，\n请重新输入！');
	                    }
	                    Ext.getCmp('UlEmployeeGrid').getStore().reload();
	                }

									
				});
			}
			},{
				text : '取消',
				iconCls:'btn-cancel',
				handler : function() {
				setUlEmployeeEdit.close();
				}
		}]

	});

	
	setUlEmployeeEdit.show();
	var display = Ext.getCmp('Photos');
	//alert("路径：\n" + picPath);
	if(PicPath==""){
		if (sex == '2') {
			display.body.update('<img src="'+ __ctxPath+ '/images/default_image_female.jpg"/>');
		} else {
			display.body.update('<img src="'
							+ __ctxPath
							+ '/images/default_image_male.jpg"/>');
		}
	}else{
		display.body.update('<img src="' + __ctxPath + '/attachFiles/'
				+ PicPath + '"  width="100%" height="100%"/>');
	}
	
	
	/**
	 * 上传账号图片按钮动作
	 * 
	 * @param {}
	 *            userId
	 */
	var uploadPhotoBtn = function(userId) {
		//alert("---");
		var photo = Ext.getCmp('appUser.photo');
		var dialog = App.createUploadDialog({
					file_cat : 'system/appUser',
					callback : uploadUserPhoto,
					permitted_extensions : ['jpg']
				});
		if (photo.value != '' && photo.value != null && photo.value != 'undefined') {
			var msg = '再次上传需要先删除原有图片,';
			Ext.Msg.confirm('信息确认', msg + '是否删除？', function(btn) {
				if (btn == 'yes') {
					// 删除图片
					Ext.Ajax.request({
						url : __ctxPath + '/xitong/deletePhUlEmployee.do',
						//url : __ctxPath + '/system/deletePhotoAppUser.do',deletePh
						method : 'post',
						params : {
							filePath : photo.value,
							userId : userId
						},
						success : function() {
							if (userId != '' && userId != null
									&& userId != 'undefined') {
								Ext.Ajax.request({
									//url : __ctxPath + '/system/photoAppUser.do',photoump
									url : __ctxPath + '/xitong/photoumpUlEmployee.do',
									
									method : 'post',
									params : {
										userId : userId
									},
									success : function() {
										photo.setValue('');
										var appUserTitle = Ext
												.getCmp('sex');
										var display = Ext
												.getCmp('Photos');
										if (appUserTitle.value == 1) {
											display.body
													.update('<img src="'
															+ __ctxPath
															+ '/images/default_image_male.jpg"  width="100%" height="100%"/>');
										} else {
											display.body
													.update('<img src="'
															+ __ctxPath
															+ '/images/default_image_female.jpg"  width="100%" height="100%"/>');
										}
										dialog.show('queryBtn');
									}
								});
							} else {
								photo.setValue('');
								var appUserTitle = Ext.getCmp('sex');
								var display = Ext.getCmp('Photos');
								if (appUserTitle.value == 1) {
									display.body
											.update('<img src="' + __ctxPath
													+ '/images/default_image_male.jpg"  width="100%" height="100%"/>');
								} else {
									display.body
											.update('<img src="' + __ctxPath + '/images/default_image_female.jpg"  width="100%" height="100%"/>');
								}
								dialog.show('queryBtn');
							}
						}
					});
				}
			});
		} else {
			dialog.show('queryBtn');
		}
	};

	/**
	 * 删除账号照片按钮动作
	 * 
	 * @param {}
	 *            userId
	 */
	var deletePhotoBtn = function(userId) {
		//alert(userId);
		var photo = Ext.getCmp('appUser.photo');
		if (photo.value != null && photo.value != '' && photo.value != 'undefined') {
			Ext.Msg.confirm('确认信息', '照片一旦删除将不可恢复, 是否删除?', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						//url : __ctxPath + '/system/deletePhotoAppUser.do',
						url : __ctxPath + '/xitong/deletePhUlEmployee.do',
						method : 'post',
						params : {
							filePath : photo.value,
							userId : userId
						},
						success : function() {
							if (userId != '' && userId != null
									&& userId != 'undefined') {
								Ext.Ajax.request({
									//url : __ctxPath + '/system/photoAppUser.do',
									url : __ctxPath + '/xitong/photoumpUlEmployee.do',
									method : 'post',
									params : {
										userId : userId
									},
									success : function() {
										photo.setValue('');
										var appUserTitle = Ext
												.getCmp('sex');
										var display = Ext
												.getCmp('Photos');
										if (appUserTitle.value == 1) {
											display.body
													.update('<img src="'
															+ __ctxPath
															+ '/images/default_image_male.jpg"  width="100%" height="100%"/>');
										} else {
											display.body
													.update('<img src="'
															+ __ctxPath
															+ '/images/default_image_female.jpg"  width="100%" height="100%"/>');
										}
									}
								});
							} else {
								photo.setValue('');
								var appUserTitle = Ext.getCmp('sex');
								var display = Ext.getCmp('Photos');
								if (appUserTitle.value == 1) {
									display.body
											.update('<img src="'
													+ __ctxPath
													+ '/images/default_image_male.jpg"  width="100%" height="100%"/>');
								} else {
									display.body
											.update('<img src="'
													+ __ctxPath
													+ '/images/default_image_female.jpg"  width="100%" height="100%"/>');
								}
							}
						}
					});
				}
			});
		}// end if
		else {
			Ext.ux.Toast.msg('提示信息', '您还未增加照片.');
		}
	};
	/**
	 * 上传照片
	 * 
	 * @param {}
	 *            data
	 */
	function uploadUserPhoto(data) {
		//alert("路径："+data[0].filePath);
		var photo = Ext.getCmp('appUser.photo');
		var display = Ext.getCmp('Photos');
		photo.setValue(data[0].filePath);
		display.body.update('<img src="' + __ctxPath + '/attachFiles/'
				+ data[0].filePath + '"  width="100%" height="100%"/>');
	};
	
};

