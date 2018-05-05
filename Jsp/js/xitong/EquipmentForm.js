/**
 * @author
 * @createtime
 * @class CustomerForm
 * @extends Ext.Window
 * @description CustomerForm表单
 * @company 优创融联科技
 */
var g_device_UEF = '';
EquipmentForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		EquipmentForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'EquipmentFormWin',
					title : '设备管理详细信息',
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
					layout : 'form',
					id : 'EquipmentForm',
					border:false,
					bodyStyle : 'padding:5px;',
					labelAlign : 'right',
					formId : 'EquipmentFormId',
					defaultType : 'textfield',
					items : [{
								name : 'Equipment.EId',
								id:'Equipment.EId',
								xtype : 'hidden',
								value : this.EId == null ? '' : this.EId
							}, {
								fieldLabel : '机具号',
								name : 'Equipment.equipmentId',
								id:'equipmentId',
								allowBlank : false,
								xtype:'textfield',
								width : 300,
								height : 25
							}, {
								fieldLabel : '所属机构号',
								name : 'suoshuhang.branchId',
								id : 'suoshuhang.branchId',
								allowBlank : false,//显示的*
								disabled:true,
								readOnly : true,
								xtype:'textfield',
								width : 300,
								height : 25
							}, 
							{
								fieldLabel : '柜员号',
								name : 'Equipment.operatorId',
								id:'Equipment.operatorId',
								allowBlank : false,
								xtype:'textfield',
								width : 300,
								height : 25
							},{ 
								xtype : 'container',
								fieldLabel : '<font style="color:red">*</font>所属机构',
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
								disabled:true,
								readOnly : true
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
								xtype : 'hidden'
							},
							{
								fieldLabel : '上级编号',
								name : 'suoshuhang.parentId',
								id : 'suoshuhang.parentId',
								readOnly : true,
								xtype : 'hidden'
							},{
								fieldLabel : '<font style="color:red">*</font>所属分行\\管理部',
								name : 'suoshuhang.parentName',
								id : 'suoshuhang.parentName',
								disabled:true,
								readOnly : true,
								xtype:'textfield',
								width : 300,
								height : 25	
							},{
								fieldLabel : 'ip地址',
								//xtype : 'textarea',
								name : 'Equipment.ip',
								id:'ip',
								allowBlank : false,
								xtype:'textfield',
								width : 300,
								height : 25
							},{
								fieldLabel : '创建日期',
								//xtype : 'textarea',
								name : 'Equipment.curdate',
								id:'Equipment.curdate',
								xtype : 'datefield',
								format : 'Y-m-d',
								xtype : 'hidden'
							},{
								fieldLabel : '布放地点',
								//xtype : 'textarea',
								name : 'Equipment.equipmentName',
								id:'Equipment.equipmentName',
								allowBlank : false,
								xtype:'textfield',
								width : 300,
								height : 25
							},{
								fieldLabel : '姓名',
								name : 'ulEmployee.name',
								id : 'ulEmployee.name',
								readOnly : true,
								xtype : 'hidden'
							},{
								fieldLabel : '编号',
								name : 'ulEmployee.useid',
								id : 'ulEmployee.useid',
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
								layout : 'column',
								items : [{
								columnWidth : .7,
								xtype : 'textfield',
								name : 'Equipment.bankname',
								id : 'UlEmpEquip',
								allowBlank : false,
								editable : false,
								disabled:true,
								readOnly : true
							},{
							    xtype:'button',
							    iconCls:'btn-dep-sel',
							    text:'选择员工',
								handler:function(){	
			            	    var UlEmpBTypeId = Ext.getCmp('suoshuhang.bankTypeId').getValue();
			            	     alert("ee:"+UlEmpBTypeId);
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
							   handler : function(){
								Ext.getCmp("UlEmpEquip").setValue('');
				                Ext.getCmp("ulEmployee.useid").setValue('');
				               // Ext.getCmp("ulEmployee.zhiwei").setValue('');
							   }
							}]},{
								fieldLabel : '地址',
								//xtype : 'textarea',
								name : 'Equipment.address',
								id:'address',
								//allowBlank : false,
								xtype:'textfield',
								width : 300,
								height : 25
							}]
				});

		if (this.EId != null && this.EId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/xitong/get3UlEmployee.do?EId=' + this.EId,
				//url:__ctxPath + '/customer/getEquipment.do?EId=' + this.EId,
				root:'data',
				preName:'Equipment',
				success : function(response, options) {
				//var thisObj = Ext.util.JSON.decode(response.responseText).data;
				//g_device_UEF = thisObj.EId;
                    var thisObj = Ext.util.JSON.decode(response.responseText).data;
                   // Ext.getCmp('Equipment.EId').setValue(thisObj.EId);
                    Ext.getCmp('Equipment.equipmentId').setValue(thisObj.equipmentId);
                    Ext.getCmp('Equipment.equipmentName').setValue(thisObj.equipmentName);
				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			scope:this,
			handler : this.save
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			scope:this,
			handler : function() {
					this.close();
			}
		}]
	},
	save:function(){
		var extIpVal = Ext.getCmp("ip").getValue();
		var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
	    if(!reg.test(extIpVal)) { 
	         Ext.Msg.alert("信息提示","请输入合法的IP地址！");
	        return;
        }
        
		var grid = Ext.getCmp("EquipmentGrid");
		var fp = Ext.getCmp('EquipmentFormWin');
			var equipmentId = Ext.getCmp('equipmentId').getValue();
			var operatorId = Ext.getCmp('Equipment.operatorId').getValue();
			var equipmentName = Ext.getCmp('Equipment.equipmentName').getValue();
			var branchId = Ext.getCmp('suoshuhang.branchId').getValue();
			//var curdate = Ext.get('Equipment.curdate').getValue();
			var curdate = new Date().format("yyyy-MM-dd");
			var ip = Ext.getCmp('ip').getValue();
			var bankTypeName = Ext.getCmp('suoshuhang').getValue();
			var bankTypeId = Ext.getCmp('suoshuhang.bankTypeId').getValue();
			var parentId = Ext.getCmp('suoshuhang.parentId').getValue();
			var parentName = Ext.getCmp('suoshuhang.parentName').getValue();
			var address = Ext.getCmp('address').getValue();
			var UlEmpEquip = Ext.getCmp('UlEmpEquip').getValue();
			var useid= Ext.getCmp("ulEmployee.useid").getValue();
			//alert(equipmentId+"---"+operatorId+equipmentName+branchId+curdate+bankTypeId+bankTypeName+parentId
			//+ip+'parentName=='+parentName);
			//alert("useid "+useid);
			 if(equipmentId!='' &&　operatorId!=''&& equipmentName!=''
			    	&& branchId!=''　&&　ip!=''&& bankTypeName!='' && bankTypeName!='' ){
				 Ext.Ajax.request({
						//url : __ctxPath + '/customer/addlistEquipment.do',
						url : __ctxPath + '/xitong/addlistEquipmentUlEmployee.do',
						params : {
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
							var equipmentId = Ext.getCmp('equipmentId').getValue();
							var operatorId = Ext.getCmp('Equipment.operatorId').getValue();
							var ip = Ext.getCmp('ip').getValue();
		                    var res = Ext.util.JSON.decode(result.responseText);
		                    var str="";
		                    //alert(res.success);
		                    if(equipmentId!=""&& operatorId!="" && ip!=""){//不为空
		                    	if(res.success == true ){
		                    		  Ext.ux.Toast.msg('温馨提示', '添加成功！');
			  	                      Ext.getCmp('EquipmentFormWin').close();
			  	                      Ext.getCmp('EquipmentGrid').getStore().reload();
			                    }else{
			                    		if(res.success==0){
				                           	 str += "您添加机具号重复，请重新输入！\n";
				                       
				                           }else if(res.success==8){
				                           	 str += "您添加柜员号重复，请重新输入！\n";
				                        
				                           }else if(res.success==2){
				                           	 str += "您添加ip地址号重复，请重新输入！\n";
				                       
				                           }else if(res.success==4){
				                        	   str+="温馨提示:机具号、柜员号、IP地址均重复，请确认！";
				                        
				                           }else if(res.success==5){
				                        	   str+="温馨提示:ip 地址、机具号均重复，请确认！";
				                        	  
				                           }else if(res.success==6){
				                        	   str+="温馨提示：柜员号、 机具号均重复，请确认！";
				                        
				                           }else if(res.success==7){
				                        	   str+="温馨提示:ip 地址、柜员号均重复，请确认！";
				          
				                           }
				                        Ext.Msg.alert("温馨提示",str);
			                    	}
		                    }else if(res.success==false){//为空
		                    	Ext.Msg.alert("温馨提示","带*号均不能为空，请确认！");
		                    	
		                    }
		                    
		                    
						}    		
					});
			 }else{
				 Ext.ux.Toast.msg('温馨提示', '带*不能为空！');
			}
			


	
	}//end of save
});
EquipmentForm.selelctUlemployee = function(UlEmpBTypeId){
	  // alert("UlEmployeeForm.selelctUlemployee"+UlEmpBTypeId);
	   EquipmentULempSelector.getView(
	            function(userNo, fullname,zhiwei,useid){
	            	Ext.getCmp("UlEmpEquip").setValue(userNo);
	                Ext.getCmp("ulEmployee.name").setValue(fullname);
	                Ext.getCmp("ulEmployee.zhiwei").setValue(zhiwei);
	                Ext.getCmp("ulEmployee.useid").setValue(useid);
	               
	            },UlEmpBTypeId    //1表示可用的车
	        ).show();
	   
	
};
EquipmentForm.isRepeat = function(equipmentId) {
	var responsea = Ext.lib.Ajax.getConnectionObject().conn;
	responsea.open("POST",  __ctxPath + '/customer/isRepeatEquipment.do?equipmentId='+equipmentId, false);
	responsea.send(null);
	var result = Ext.util.JSON.decode(responsea.responseText);//解析数据
	if(result.success==true) {
		Ext.getCmp("equipmentId").focus();
		return true;
	} else {
		return false;
	}
}