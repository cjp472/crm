/**
 * @author
 * @createtime
 * @class CustomerForm
 * @extends Ext.Window
 * @description CustomerForm表单
 * @company 优创融联科技
 */
var g_extCode_UEF = '';
UlEmployeeForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UlEmployeeForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'UlEmployeeFormWin',
					title : '员工档案信息',
					iconCls : 'menu-role',
					width : 500,
					height : 480,
					minWidth : 599,
					minHeight : 479,
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		
		
		
		

		this.formPanel = new Ext.FormPanel({
					//url : __ctxPath + '/customer/saveEquipment.do?isCopy='+ this.isCopy,
					layout : 'form',
					id : 'UlEmployeeForm',
					border:false,
					bodyStyle : 'padding:5px;',
					labelAlign : "right",
//					labelWidth : 70,
//					labelHeight:100,
//					defaults : {
//						anchor : '98%,98%'
//					},
					formId : 'UlEmployeeFormId',
					defaultType : 'textfield',
					items : [{
						  name : 'ulEmployee.useid',
						  xtype : 'hidden',
						 id : 'useid',
						 value : this.useid == null ? '' : this.useid
					 },  {
//							fieldLabel : '姓名<font style="color:red">*</font>',
					        fieldLabel : '姓名',
							id : 'ulEmployee.fullname_form',
							name : 'ulEmployee.fullname',
							allowBlank : false,
							maxLength : 10,
							//anchor:'100%',
							xtype : 'textfield',
							width : 300,
							height : 25
						},{
//							fieldLabel : '工号<font style="color:red">*</font>',
							fieldLabel : '工号',
							//anchor:'100%',
							width : 300,
							height : 25,
							id : 'ulEmployee.userNo_form',
							name : 'ulEmployee.userNo',
							maxLength : 50,
							allowBlank : false,
							xtype : 'textfield'
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
									id : 'QS_roleName',
									//maxHeight : 200,
									//width : 127,
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
											}),
											listeners : {
								                   select  : function(combobox,record, index){
								                   var str='支行操作员'; 
											       var nodeId = Ext.getCmp('QS_roleName').getValue();
											           if(nodeId!=str){
											        	   Ext.getCmp("equipment").hide();
											           }else{
											        	   Ext.getCmp("equipment").show();
											           }
												}
											}
									
									
								}]
					},  {
							fieldLabel : '手机号',
							name : 'phone',
							id:'phone',
							allowBlank : false,
							xtype:'textfield',
							width : 300,
							height : 25
						},{
							fieldLabel : '身份证号',
							name : 'idcard',
							id:'idcard',
							regex : /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/,
							regexText : '输入正确的身份号码',
							//maxLength : '30',
							maxLengthText : '最多输入18个字符！',
							allowBlank : false,
							xtype:'textfield',
							width : 300,
							height : 25
						},{
							layout : 'column',
							xtype : 'container',
							fieldLabel : '<font style="color:red">*</font>所属行\\管理部',
							items : [{
										name : 'ulEmployee.bankTypeId',
										id : 'ulEmployee.bankTypeId_form_hid',
										xtype : 'hidden'
									}, {
										columnWidth : .5,
										xtype : 'textfield',
										 anchor:'100%',
										// width : '100px',
										id : 'ulEmployee.bankname_form',
                                        editable : false,
                                        maxLength : 10
									},{
										xtype : 'button',
										border : false,
										iconCls : 'btn-user-sel',
										text : '选择',
										handler : UlEmployeeForm.selectSuoShuHang
										
									}]
								
										
						
							},{
								id:'equipment',
								layout : 'column',
								 xtype : 'container',
					             items:[{
										header : 'EId',
										id:'EId',
										xtype : 'textfield',
										hidden : true
									 },{
										name : 'ulEmployee.equipmentId',
										id : 'ulEmployee.equipmentId_form_hid',
										xtype : 'hidden'
										
										
									},{
										name : 'ulEmployee.branchId',
										id : 'ulEmployee.branchId_form_hid',
										xtype : 'hidden'
						
										
									 },{
										xtype : 'button',
										border : false,
										iconCls : 'btn-user-sel',
										text : '选择设备信息',
										handler:function(){
						            	    var bankId = Ext.getCmp('ulEmployee.bankTypeId_form_hid').getValue();
						            	    // alert("ee:"+bankId);
						            	       if(bankId!=null && bankId!='' ){//存在设备
						            	    	   UlEmployeeForm.selelctEquipment(bankId);
						            	    	   //new UlempEquipView(bankId).show();
						    					
						            	       }else{//不存在设备
						            	    	  alert("请选择所属行信息"); 
						            	       }
						            	    
										}
									},{
										fieldLabel : '<font style="color:red">&nbsp;&nbsp;*</font>机具号',			
										columnWidth : .5,
										xtype : 'textfield',
										anchor:'100%',
										id:'operatorId',
										//id : 'ulEmployee.equipmentId_form_hid',
                                        editable : false,
                                       // maxLength : 10,
										listeners : {
										   render : function(){
									               var nodeId = Ext.getCmp('QS_roleName').getValue();
									               var str='支行操作员'; 
									              //alert(nodeId);
									             if(nodeId!="支行操作员"){
									        	    Ext.getCmp("equipment").hide();
									             }else{
									        	    Ext.getCmp("equipment").show();
									        	    
									           }
								              }
										}

									}]
							}
//							{
//                                id:'equipment',
//								xtype : 'tabpanel',
//								activeTab : 0,//激活第一个panel
//								plain:true,
//								height : 350,
//								defaultType : 'panel',
//								bodyStyle : 'padding:5px;',
//							    items : [{
//											title : '设备信息',
//											layout : 'form',
//											//defaultType : 'textfield',
//											defaults : {
//												width : 300,
//												//anchor : '100%,100%'
//											},
//											//items : []
//							              items : [{
//												xtype:'button',
//												name : 'custoemrSelect',
//												//id:'customerSelectButton',
//												text:'选择设备',
//												iconCls:'btn-mail_recipient',
//												handler:function(){
//							            	    var bankId = Ext.getCmp('ulEmployee.bankTypeId_form_hid').getValue();
//							            	     alert("ee:"+bankId);
//							            	       if(bankId!=null && bankId!='' ){//存在设备
//							            	    	   UlEmployeeForm.selelctEquipment(bankId);
//							            	    	   //new UlempEquipView(bankId).show();
//							    					
//							            	       }else{//不存在设备
//							            	    	  alert("请选择所属行信息"); 
//							            	       }
//							            	    
//												}
//											}]
//								 }],
//									listeners : {
//								         render : function(){
//							              var nodeId = Ext.getCmp('QS_roleName').getValue();
//							              var bankTypeId = Ext.getCmp('ulEmployee.bankTypeId_form_hid').getValue();
//							      		  var bankname = Ext.getCmp('ulEmployee.bankname_form').getValue();
//							              var str='支行操作员'; 
//							              //alert(nodeId);
//							             if(nodeId!="支行操作员"){
//							        	    Ext.getCmp("equipment").hide();
//							             }else{
//							        	    Ext.getCmp("equipment").show();
//							        	    
//							           }
//								}
//							}
//					
//							}
							]
				});
              
		
		
		
		
		
		
		if (this.useid != null && this.useid != 'undefined') {
			this.formPanel.loadData({
				// TODO 加载数据
				url : __ctxPath + '/xitong/getUlEmployee.do?useid='
						+ this.useid,
				root : 'data',
				preName : 'ulEmployee',
				success : function(response, options) {

					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					Ext.getCmp('ulEmployee.gonghao').setText('工号：'
							+ thisObj.useid);
					Ext.getCmp('ulEmployee.sex_form').setValue(thisObj.sex);
                    Ext.getCmp('ulEmployee.status_form').setValue(thisObj.status);
					Ext.getCmp('ulEmployee.zhiwei_form')
							.setValue(thisObj.zhiwei);
					g_extCode_UEF = thisObj.userNo;
				   var combo_zhiji = Ext.getCmp('ulEmployee.zhiji_form');
                    
                            
				   Ext.getCmp("ulEmployee.bankname_form").setValue(thisObj.bankname);
				   Ext.getCmp("operatorId").setValue(thisObj.equipOperatorId);
					
				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			scope:this,
			//handler : this.save
			handler : function() {
			    UlEmployeeForm.save();
		}
		    
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			scope:this,
			handler : function() {
					this.close();
			}
		}]
	}
	
	

});





UlEmployeeForm.save =function(){
	var phone = Ext.getCmp("phone").getValue();
	 //UlEmployeeEdit(phone);
	var reg =/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if(!reg.test(phone)) { 
         Ext.Msg.alert("信息提示","输入正确的手机");
        return;
    }
    var idcard = Ext.getCmp("idcard").getValue();
	var reg =/^(\d{18,18}|\d{15,15}|\d{17,17}x)$/;
    if(!reg.test(idcard)) { 
         Ext.Msg.alert("信息提示","输入正确的身份号码");
        return;
    }
    var userNo = Ext.getCmp("ulEmployee.userNo_form").getValue();
   // var extCode = Ext.getCmp("Unim_ExtF_Txt_extCode").getValue();
	if (userNo == null || userNo == 'undefined') {
		//if(UlEmployeeForm.isRepeat(userNo)){
			Ext.Msg.alert("信息提示","工号不能空，请填写！");
			//return;
		//}
	} else if(g_extCode_UEF!=userNo){
		if(UlEmployeeForm.isRepeat(userNo)){
			Ext.Msg.alert("信息提示","该工号已被占用，请修改！");
			return;
		}
	}
	var reg =/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if(Ext.getCmp('ulEmployee.fullname_form').getValue() == ''){
        Ext.ux.Toast.msg('操作信息', '用户名不能为空！');
        return;
    }
    if(Ext.getCmp('ulEmployee.bankTypeId_form_hid').getValue() == ''){
        Ext.ux.Toast.msg('操作信息', '请指定员工的所属行\\管理部！');
        return;
    }
    
	var grid = Ext.getCmp("UlEmployeeGrid");
	var fp = Ext.getCmp('UlEmployeeFormWin');
		var fullname = Ext.getCmp('ulEmployee.fullname_form').getValue();
		var sex = Ext.getCmp('sex').getValue();
		var zhiwei = Ext.getCmp('QS_roleName').getValue();
		var userNo = Ext.getCmp('ulEmployee.userNo_form').getValue();
		var idcard = Ext.getCmp('idcard').getValue();
		var phone = Ext.getCmp('phone').getValue();
		var bankTypeId = Ext.getCmp('ulEmployee.bankTypeId_form_hid').getValue();
		var bankname = Ext.getCmp('ulEmployee.bankname_form').getValue();
		//alert(fullname+"---"+sex+zhiwei+userNo+idcard+phone+bankTypeId+bankname);
		var operatorId=Ext.getCmp('operatorId').getValue();
		var equipmentId=Ext.getCmp('ulEmployee.equipmentId_form_hid').getValue();
		var eqEId= Ext.getCmp('EId').getValue();
		//alert("operatorId"+operatorId+"equipmentId:"+equipmentId);
		Ext.Ajax.request({
			url : __ctxPath + '/xitong/UlemployeeEquipSaveUlEmployee.do',
			params : {
			fullname : fullname,
	        sex : sex,
	        zhiwei : zhiwei,
	        userNo : userNo,
	        idcard : idcard,
			bankTypeId : bankTypeId,
			bankname : bankname,
			phone : phone,
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
                  
                 Ext.ux.Toast.msg('温馨提示', '亲!恭喜您，添加成功！');
                 Ext.getCmp('UlEmployeeFormWin').close();
                 //UlEmployeeForm.saveUser();
                 //UlEmployeeForm.saveUser();
                } else if(res.success==false){
                	// Ext.ux.Toast.msg('温馨提示', '机构部门名称被占用！');
                	//Ext.Msg.alert("温馨提示","亲！机构部门名称被占用！");
                	Ext.ux.Toast.msg('操作信息', res.message);
                	
                }
               // Ext.getCmp('bankTypeTreePanel').root.reload();
				Ext.getCmp('UlEmployeeGrid').getStore().reload();
            }

		});
	


};

UlEmployeeForm.selectSuoShuHang = function(){
	BankTypeSelector.getView(
             function(bankTypeId,bankname,parentId,parentName){
            	 Ext.getCmp("ulEmployee.bankTypeId_form_hid").setValue(bankTypeId);
                 Ext.getCmp("ulEmployee.bankname_form").setValue(bankname);
             }
       ).show();
	
	
	
	
	
};
  


UlEmployeeForm.isRepeat = function(userNo) {
	var responsea = Ext.lib.Ajax.getConnectionObject().conn;
	responsea.open("POST",  __ctxPath + '/xitong/isRepeatfullnameUlEmployee.do?userNo='+userNo, false);
	responsea.send(null);
	var result = Ext.util.JSON.decode(responsea.responseText);//解析数据
	if(result.success==true) {
		//Ext.getCmp("ulEmployee.fullname_form").focus();
		Ext.getCmp("ulEmployee.userNo_form").focus();	
		return true;
	} else {
		return false;
	}
};

UlEmployeeForm.selelctEquipment = function(bankId){
	   //alert("UlEmployeeForm.selelctEquipment"+bankId);
	   ULempEquipSelector.getView(
	            function(equipmentId,branchId,operatorId,EId){
	            	Ext.getCmp("ulEmployee.equipmentId_form_hid").setValue(equipmentId);
	            	Ext.getCmp("operatorId").setValue(operatorId);
	                Ext.getCmp("ulEmployee.branchId_form_hid").setValue(branchId);
	                Ext.getCmp("EId").setValue(EId);
	               
	            },bankId    //1表示可用的车
	        ).show();
	
};	 











