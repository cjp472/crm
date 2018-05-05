BankTypeForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BankTypeForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'BankTypeFormWin',
					//title :"添加上级"+nodeText+"的详细信息",
					title : '机构（总分支行）分类详细信息',
					iconCls : 'menu-BankType',
					width : 400,
					height : 300,
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
					layout : 'form',
					id : 'BankTypeForm',
					border:false,
					bodyStyle : 'padding:5px;',
					labelAlign : "right",
					labelWidth : 60,
					defaults : {
						anchor : '98%,98%'
					},
					formId : 'BankTypeFormId',
					defaultType : 'textfield',
					items : [{
								name : 'bankTypeForm.bankTypeId',
								id:'bankTypeId',
								xtype : 'hidden',
								value : this.bankTypeId == 'undefined'
									? '' : this.bankTypeId
							}, {
								name : 'bankTypeForm.parentId',
								id:'nodeId',
								xtype : 'hidden',
								value : this.nodeId == 'undefined' ? '' : this.nodeId,
								readOnly : true
								
							},{
								fieldLabel : '上级机构',
								anchor : '100%',
								id : 'bankTypeForm.ukKnowTypeName',
								allowBlank : false,
								readOnly : true,
								disabled:true,
								value : this.nodeText == 'undefined'
										? ''
										: this.nodeText,
								maxLength : 50
//							},{
//								xtype : 'compositefield',
//								fieldLabel : '上级名称',
//								items : [{
//										//fieldLabel : '所属省',
//										name : 'parentname',
//										id : 'parentname',
//										maxHeight : 200,
//										width : 127,
//										xtype : 'combo',
//										mode : 'local',
//										editable : false,
//										triggerAction : 'all',
//										store : new Ext.data.SimpleStore({
//													autoLoad : true,
//													url : __ctxPath + '/customer/listparentNameConHis.do?parentId='
//													+ this.parentId,
////													url : __ctxPath
////															+ '/system/listparentNameRegion.do',
//													fields : ['parentId', 'bankname']
//												}),
//										displayField : 'bankname',
//										valueField : 'parentId'
//										
//									}]
						},{
							fieldLabel : '机构名称',
							allowBlank : false,
							blankText: '温馨提示：机构名称不允许为空',
							id : 'bankname',
							anchor : '100%',
							name : 'bankTypeForm.bankname',
							maxLength : 50
						},{
						    id:'pan_thsj',
						    bodyStyle : 'padding:5px;',
							labelAlign : "right",
							labelWidth:55,
				             xtype:'panel',
				             baseCls:"x-plain",
				             layout:'form',
				             anchor:'98%',
				             items:[{
									fieldLabel : '<font style="color:red">&nbsp;&nbsp;*</font>网点号',
									
									anchor : '100%',
									xtype:'textfield',
									name : 'suoshuhang.branchId',
									id : 'suoshuhang.branchId',
									//readOnly : true,
									//value :'',
									maxLength : 50,
									listeners : {
										render : function(){
									       var nodeId = Ext.getCmp('nodeId').getValue();
									       var bankname = Ext.getCmp('bankTypeForm.ukKnowTypeName').getValue();
									          // alert("listeners"+nodeId);
									           if(nodeId==0 ||bankname=='电子银行部' ){
									        	   
									        	   Ext.getCmp("pan_thsj").hide();
									        	   //Ext.getCmp("pan_thsj").show();
									        	  // Ext.getCmp('suoshuhang.branchId').show();//当不为上级为总行时，显示网点号
									        	  
									           }else{
									        	   Ext.getCmp("pan_thsj").show();
									        	  // Ext.getCmp('suoshuhang.branchId').setVisible(false);//当为上级为总行时，不显示网点号
									           }
										}
									}

								}]
						},{					
								name : 'curDate',
								id:'cur_date',
								xtype : 'datefield',
								format : 'Y-m-d H:i:s',
								hidden : true,
								value : new Date()
							},{
								border : true,
								xtype : 'displayfield',
								hideLabel : true,
								hidden : true,
								id:'123456',
								html : '<font style="color:#FF0000;text-align:center;font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请不要跨级添加机构部门信息</font>'
							}]
							
							
				});
		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			scope:this,
			handler : this.save.createCallback(this)
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
		var grid = Ext.getCmp("BankTypeView");
		var fp = Ext.getCmp('BankTypeFormWin');
			var bankname = Ext.getCmp('bankname').getValue();
			var cur_date = Ext.getCmp('cur_date').getValue();
			var nodeId=Ext.getCmp('nodeId').getValue();
			var  parentName=Ext.getCmp('bankTypeForm.ukKnowTypeName').getValue();
			curDate=new Date().pattern("yyyy-MM-dd HH:mm:ss");
			var branchId = Ext.getCmp('suoshuhang.branchId').getValue();
			//alert(bankname+"===="+curDate+"==nodeId==="+nodeId+parentName);
			//add();
//			var str6='总行';
//			var str3='分行';
//			var str1='支行';
//			var str4='分类';
//			var str2 = bankname.substring(bankname.length-2,bankname.length);
//			var str5=parentName.substring(parentName.length-2,parentName.length);
//			alert("str2"+str2+"str5"+str5);
//			if(str5==str4 &&( str2==str3 || str2==str1)){//默认更目录，添加总行
//					 Ext.getCmp("123456").setValue("<font style='color:#FF0000;text-align:center;font-size:14px;font-weight:bold'>请您添加：</font>"+str6+'信息');
//			}else if(str5==str6 && str2!=str6 && str2!=str1){//总行----不能添加支行信息和总行
//				Ext.getCmp("123456").setValue("<font style='color:#FF0000;text-align:center;font-weight:bold'>请您添加：</font>"+str3+'信息');
//			}else
//			if(str5==str3 && str2!=str3 &&str2!=str6){//分行----只能添加支行信息
//				Ext.getCmp("123456").setValue("<font style='color:#FF0000;text-align:center;font-weight:bold'>请您添加：</font>"+str1+'信息');
////			}else{
////					Ext.getCmp("123456").setValue("默认机构部门名称下只能添加总行信息");
//
//			}
			
			Ext.Ajax.request({
				url : __ctxPath + '/customer/bankTypeSaveConHis.do?bankTypeId='
				+ this.bankTypeId,
				params : {
					name : bankname,
					id:curDate,
					nodeId:nodeId,
					branchId:branchId
				},
				method : 'post',
				waitMsg : '正在提交数据...',
				success : function(result, request) {
                    var res = Ext.util.JSON.decode(result.responseText);
                    if (res.success == true) {
                      // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
                      
                    Ext.ux.Toast.msg('温馨提示', '亲!恭喜您，添加成功！');
                    Ext.getCmp('BankTypeFormWin').close();
                    } else if(res.success==false){
                    	// Ext.ux.Toast.msg('温馨提示', '机构部门名称被占用！');
                    	//Ext.Msg.alert("温馨提示","亲！机构部门名称被占用！");
                    	Ext.ux.Toast.msg('操作信息', res.message);
                    	
                    }
                    Ext.getCmp('bankTypeTreePanel').root.reload();
					Ext.getCmp('UkKWTypeView').getStore().reload();
                }

			});
		

	}
	

	//end of save
});


var add=function(){
	var bankname = Ext.getCmp('bankname').getValue();
	var cur_date = Ext.getCmp('cur_date').getValue();
	var nodeId=Ext.getCmp('nodeId').getValue();
	Ext.Ajax.request({
		url : __ctxPath + '/customer/bankTypeSaveConHis.do?bankTypeId='
		+ this.bankTypeId,
		params : {
			name : bankname,
			id:curDate,
			nodeId:nodeId
		},
		method : 'post',
		waitMsg : '正在提交数据...',
		success : function(result, request) {
            var res = Ext.util.JSON.decode(result.responseText);
            if (res.success == true) {
              // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
              
            Ext.ux.Toast.msg('温馨提示', '亲!恭喜您，添加成功！');
            Ext.getCmp('BankTypeFormWin').close();
            } else if(res.success==false){
            	Ext.ux.Toast.msg('操作信息', res.message);
            	// Ext.ux.Toast.msg('温馨提示', '机构部门名称被占用！');
            	//Ext.Msg.alert("温馨提示","亲！机构部门名称被占用！");
           
            	
            }
            Ext.getCmp('bankTypeTreePanel').root.reload();
			Ext.getCmp('UkKWTypeView').getStore().reload();
        }

	});
	
	
	
	
	
};


