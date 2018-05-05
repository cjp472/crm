
//
Ext.apply(Ext.form.VTypes, {
    BeginEndCheck :  function(value, field) {
    	var beginId = field.bedate.begin;
    	var endId = field.bedate.end;
    	var bdate = Ext.getCmp(beginId).getValue();
    	var edate = Ext.getCmp(endId).getValue();
    	if(bdate != '' && edate != ''){
    		return bdate <= edate;
    	} 
    	return true;
    },
    BeginEndCheckText: '开始日期大于等于结束日期！'
});

var dic_query = new Array();
var getDicValueByName = function(dicFind_paramName,value_param){
//	alert("getDicValueByName code!");
	var dicFind_paramValue;
	var role_appuser_Storeser_Stores;
	var dicRecord = Ext.data.Record.create(
			[	{ name: 'dicId', mapping: 'dicId'}, 
		        { name: 'itemValue', mapping: 'itemValue'}, 
		        { name: 'itemIndex', mapping: 'itemIndex'}
		    ]
			);
	    	var dicMemoryProxy = new Ext.data.HttpProxy({
	    				url: __ctxPath+ '/system/loadItemRecordDictionary.do'
	    			});
	    	var dicJsonReader = new Ext.data.JsonReader(
	    			{  
	    				root:'data',
//	    				totalProperty : 'totalCounts',
	    				id : 'dicId'},dicRecord
	    				
	    					);
	    	var pwd_store = new Ext.data.Store({
	    				proxy : dicMemoryProxy,
	    				reader : dicJsonReader,
	    				autoLoad : true
	    			});
	    	pwd_store.on('beforeload', function(pwd_store) {
	    					pwd_store.baseParams = {
	    							itemName : dicFind_paramName
	    				};
	    			});	
		pwd_store.load({
				callback : function(r, options, success) {
					if (success == false) {
						Ext.Msg.alert("ERROR","There was an error parsing the Country Combo.");
					} else {
						if (pwd_store.getCount() > 0) {
							dic_query[value_param] = pwd_store.getAt(0).data['itemIndex'];
						}
					}
				}
			}
		);

	    	
};
getDicValueByName('密码',0);
getDicValueByName('密码有效间隔',1);
var AppUserForm = function(_title, _userId,_depId,_depName) {
	return this.setup(_title, _userId,_depId,_depName);
};
var curDate = new Date().format('Y-m-d');
	//alert(new Date(curDate).add(Date.DAY, 60).format('Y-m-d'));
AppUserForm.prototype.setup = function(_title, userId,_depId,_depName) {
		//	var depSelectPanel = this.initDepSelectPanel(userId);
		//	var depGrid = depSelectPanel.findByType('editorgrid')[0];
	
	
	var groupsSelectPanel = this.initGroupSelectPanel(userId);
	var groupGrid = groupsSelectPanel.findByType('editorgrid')[0];
	
	var footToolbar = this.initFooterToolbar(userId,groupGrid);
	role_appuser_Stores = new Ext.data.SimpleStore({
							autoLoad : true,
							baseParams : {
								userId : userId
							},
							url : __ctxPath + '/system/selectedRolesAppUser.do',
							fields : ['roleId', 'roleName']
						});
	var userform = new Ext.form.FormPanel({
		reader : new Ext.data.JsonReader({
					root : 'data'
				}, [{
							name : 'appUser.userId',
							mapping : 'userId'
						},
						 {
							name : 'appUser.jobId',
							mapping : 'jobId'
						}, {
							name : 'appUser.jobName',
							mapping : 'jobName'
						}, {
							name : 'appUser.username',
							mapping : 'username'
						}, {
							name : 'appUser.password',
							mapping : 'password'
						}, {
							name : 'appUser.fullname',
							mapping : 'fullname'
						}, {
							name : 'appUser.email',
							mapping : 'email'
						}, 
						{
							name : 'appUser.depName',
							mapping : 'depName'
						}, 
						
						{
							name : 'appUser.ulEmployee',
							mapping : 'ulEmployee'
						},
						{
							name : 'appUser.accessionTime',
							mapping : 'accessionTime'
						},  {
							name : 'appUser.beginDate',
							mapping : 'beginDate'
						},  {
							name : 'appUser.endDate',
							mapping : 'endDate'
						}, {
							name : 'appUser.note',
							mapping : 'note'
						},
//						{
//							name : 'appUser.useid',
//							mapping : 'useid'
//						},
						{
							name : 'appUserUserType',
							mapping : 'userType'
						},{
							name : 'appUserStatus',
							mapping : 'status'
						}, {
							name : 'appUser.Title',
							mapping : 'title'
						}, {
							name : 'appUser.phone',
							mapping : 'phone'
						}, {
							name : 'appUser.mobile',
							mapping : 'mobile'
						}, {
							name : 'appUser.fax',
							mapping : 'fax'
						}, {
							name : 'appUser.address',
							mapping : 'address'
						}, {
							name : 'appUser.zip',
							mapping : 'zip'
						}, {
							name : 'appUser.photo',
							mapping : 'photo'
						}, {
							name : 'appUser.dynamicPwd',
							mapping : 'dynamicpwd'
						}, {
							name : 'appUser.dyPwdStatus',
							mapping : 'dyPwdStatus'
						}, {
							name : 'appUser.buLu',
							mapping : 'buLu'
						}]),
		id : 'AppUserForm',
		title : _title,
		iconCls : 'menu-customer',
		border : false,
		autoScroll : true,
		bodyStyle : "background-color: transparent;",
		labelAlign : "right",
		tbar : footToolbar,
		defaults : {
			anchor : '98%,100%',
			xtype : 'panel'
		},
		url : __ctxPath + '/system/saveAppUser.do',
		layout : 'form',
		items : [{
			xtype : 'fieldset',
			title : "用户信息",
			collapsible : true,
			autoHeight : true,
			defaults : {
				anchor : '100%,100%'
			},
			items : {
				xtype : 'panel',
				border : false,
				layout : 'hbox',
				layoutConfig : {
					padding : '5',
					align : 'middle'
				},
				defaults : {
					style : 'padding:0px 5px 0px 5px;',
					anchor : '98%,98%',
					height : 245,
					width : '38%'
				},
				items : [{
					id : 'displayUserPhoto',
					xtype : "panel",
					bodyStyle : 'MARGIN-RIGHT: auto; MARGIN-LEFT: auto;',
					title : "个人照片",
					width : '20%',
					//flex : 1,
					html : '<div style="MARGIN-RIGHT: auto; MARGIN-LEFT: auto;"><img src="'+ __ctxPath + '/images/default_image_male.jpg" style=""/></div>',
					tbar : new Ext.Toolbar({
								height : 30,
								items : [{
											text : '上传',
											iconCls : 'btn-upload',
											handler : function() {
												AppUserForm
														.uploadPhotoBtn(userId);
											}
										}, {
											text : '删除',
											iconCls : 'btn-delete',
											handler : function() {
												AppUserForm
														.deletePhotoBtn(userId);
											}
										}]
							})
				}, {
					id : 'AppUserMustInfo',
					xtype : "panel",
					title : "用户信息",
					labelWidth : 100,
					defaults : {
						anchor : '98%,98%'
					},
					bodyStyle:'padding:5px;',
					layout : 'form',
					defaultType : "textfield",
					labelAlign : "right",
					hideLabels : false,
					//flex : 1.5,
					//padding : '5',
					items : [{
								xtype : 'hidden',
								fieldLabel : '账号ID',
								name : 'appUser.userId',
								id : 'appUser.userId'
							}, {
//								fieldLabel : '登录账号'
								fieldLabel : '用户名',
								name : 'appUser.username',
								id : 'appUser.username',
								regex : /^[A-Za-z0-9]+$/,
								regexText : '只能输入英文和数字！',
								maxLength : '30',
								maxLengthText : '最多输入30个字符！',
//								value : '1',
								allowBlank : false,
								blankText : '用户名不能为空!',
								validationEvent : {
									keyup : function() {
										jsLog_admin(logStrMsg("管理员填写-用户名："+Ext.getCmp("appUser.username").getValue() ,"INFO"));
									}
								}
							}, 
							
							{
//								fieldLabel : '登录密码',
								name : 'appUser.password',
								id : 'appUser.password',
//								hidden : true,
								xtype : 'hidden',
//								inputType : 'password',
								blankText : '默认登录密码不允许修改!'
							}, 
							{
//								fieldLabel : '登录密码间隔',
								name : 'interval',
								id : 'interval',
								xtype : 'hidden'
							}, 
							{
								fieldLabel : '类型',
								id : 'appUserUserType',
								hiddenName : 'appUser.userType',
								displayField : 'itemName',
								valueField : 'itemId',
								xtype : 'combo',
								mode : 'local',
								editable : false,
								allowBlank : false,
								blankText : '类型不能为空!',
								triggerAction : 'all',
//								store : [['1', '临时'], ['0', '正式']],
								store : new Ext.data.SimpleStore({
									url : __ctxPath
											+ '/system/loadItemDictionary.do',
									baseParams : {
										itemName : '用户类型'
									},
									fields : ['itemId', 'itemName'],
									autoLoad : true,
									method : "post",
									listeners : {
										load : function() {
											
											var combo = Ext.getCmp('appUserUserType');
											var store = combo.getStore();
											var rows = [];// 定义数组
											for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
												if (store.getAt(i).data['itemId'] == combo.getValue()) {
													combo.setValue(store.getAt(i).data['itemName']);
													break;
												}
											}

										}
									}
								}),
								listeners : {
									select : function(combobox,record, index) {
										if(index == 0){
											jsLog_admin(logStrMsg("管理员填写-类型：临时","INFO"));
										}else{
											jsLog_admin(logStrMsg("管理员填写-类型：正式","INFO"));
										}
										
									}
								}
							},
							 {
								
								fieldLabel : '状态',
								id : 'appUserStatus',
								hiddenName : 'appUser.status',
								displayField : 'itemName',
								valueField : 'itemId',
								xtype : 'combo',
								mode : 'local',
								allowBlank : false,
								blankText : '状态不能为空!',
								editable : false,
								triggerAction : 'all',
//								store : [['1', '临时'], ['0', '正式']],
								store : new Ext.data.SimpleStore({
									url : __ctxPath
											+ '/system/loadItemDictionary.do',
									baseParams : {
										itemName : '用户状态'
									},
									fields : ['itemId', 'itemName'],
									autoLoad : true,
									method : "post",
									listeners : {
										load : function() {
											
											var combo = Ext.getCmp('appUserStatus');
											var store = combo.getStore();
											var rows = [];// 定义数组
											for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
												if (store.getAt(i).data['itemId'] == combo.getValue()) {
													combo.setValue(store.getAt(i).data['itemName']);
													break;
												}
											}

										}
									}
								}),
								listeners : {
									select : function(combobox,record, index) {
										if(index == 0){
											jsLog_admin(logStrMsg("管理员填写-状态：正常","INFO"));
										}else if(index == 1){
											jsLog_admin(logStrMsg("管理员填写-状态：注销","INFO"));
										}else if(index == 2){
											jsLog_admin(logStrMsg("管理员填写-状态：停用","INFO"));
										}else{
											jsLog_admin(logStrMsg("管理员填写-状态：未启用","INFO"));
										}
										
									}
								}
							},{
								fieldLabel : '开始时间',
								xtype : 'datefield',
								format : 'Y-m-d',
								name : 'appUser.beginDate',
								id : 'appUser.beginDate',//非
								allowBlank : false,
								blankText : '开始日期不能为空!',
								length : 50,
								bedate : {begin : 'appUser.beginDate' , end : 'appUser.endDate'},
								vtype : 'BeginEndCheck',
								listeners : {
									select : function(){
										jsLog_admin(logStrMsg("管理员填写-开始时间："+Ext.getCmp("appUser.beginDate").getValue().format("yyyy-MM-dd hh:mm:ss") ,"INFO"));
										var begindate = Ext.getCmp('appUser.beginDate').getValue();
										var tDinterval = parseInt(dic_query[1]);
										Ext.getCmp('appUser.endDate').setValue(new Date(begindate).add(Date.DAY, tDinterval));
									}
								}
							},
							{
								fieldLabel : '结束时间',
								xtype : 'datefield',
								format : 'Y-m-d',
								name : 'appUser.endDate',
								id : 'appUser.endDate',//非
								allowBlank : false,
								length : 50,
								blankText : '结束日期不能为空!'
								,bedate : {
									begin : 'appUser.beginDate',end : 'appUser.endDate'
								},
								vtype : 'BeginEndCheck',
								listeners : {
									select : function(){
										jsLog_admin(logStrMsg("管理员填写-结束时间："+Ext.getCmp("appUser.endDate").getValue().format("yyyy-MM-dd hh:mm:ss") ,"INFO"));
									}
								}
									
							},{
								//2014/6/18  am 10：30 增加补录授权的功能；
								fieldLabel : '补录授权',
								id : 'buLu',
								hiddenName : 'appUser.buLu',
								displayField : 'itemName',
								valueField : 'itemId',
								xtype : 'combo',
								mode : 'local',
								allowBlank : false,
								editable : false,
								triggerAction : 'all',
								store : [['1', '可补录'], ['0', '不可补录']],
								listeners : {
									select : function(combobox,record, index){
										if(index == 0){
											jsLog_admin(logStrMsg("管理员填写-补录授权：可补录","INFO"));	
										}else{
											jsLog_admin(logStrMsg("管理员填写-补录授权：不可补录","INFO"));
										}
									}
								}
							},{
								fieldLabel : '备注',
								xtype : 'textarea',
								name : 'appUser.note',
								id : 'note',
								maxLength : '500',
								maxLengthText : '最多输入500个字符！'
									
							},{
//								fieldLabel : '创建人',
								xtype : 'textfield',
								name : 'appUser.createBy',
								id : 'createBy',
								hidden : true,
								listeners : {
									render : function(){
										this.value = curUserInfo.fullname;
									}
								}
									
							},
							{
//								fieldLabel : '创建时间',
								xtype : 'datefield',
								format : 'Y-m-d',
								name : 'appUser.createDate',
								id : 'createDate',//非
								length : 50,
								hidden : true,
								listeners : {
									render : function(){
										this.value = curDate;
									}
								}
							},{
//								fieldLabel : '修改人',
								xtype : 'textfield',
								name : 'appUser.updateBy',
								id : 'updateBy'
								,hidden : true
									
							},
							{
//								fieldLabel : '修改时间',
								xtype : 'datefield',
								format : 'Y-m-d',
								name : 'appUser.updateDate',
								id : 'updateDate',//非
								length : 50
								,hidden : true
							}
							]
				}, {
					xtype : "panel",
					title : "员工信息",
					id : 'empContacts',
					//padding : '5',
					layout : 'form',
					defaultType : 'textfield',
					labelWidth : 65,
					defaults : {
						anchor : '98%,98%'
					},
					hideLabel : false,
					labelAlign : "right",
					//flex : 1.5,
					items : [
					        {
					        xtype : 'container',
							layout : 'column', 
							style : 'padding:5px 0px 0px 0px;',
//							flex : 1.5,
							items : [{
								columnWidth : 0.93, 
								xtype : 'container',
								layout : 'form',
								height : 25,
								items : [{
									xtype : 'hidden',
									name : 'appUser.useid',
									id : 'appUser.useid'
								},{
									fieldLabel : '工号',
									name : 'appUser.userNo',
									id : 'appUser.userNo',
									xtype : 'textfield',
//									columnWidth : 1.1,
									anchor : '98%',
									readOnly  : true,
									allowBlank : false,
									blankText : '员工信息不能为空!'
									}]
							 } ,{	
							 	columnWidth : 0.07, 
								xtype : 'container',
								layout : 'form',
								items : [{
										xtype:'button',		
										border:false,
										iconCls:'btn-user-sel',
										handler:function(){
										
										UlEmployeeSelector.getView(function(userId,fullname,sex,useid,zhiwei,depName,depId, userNo,bankTypeId,bankname){			//UlEmployeeSelectors调用UlEmployeeSelectors这个JS
//													Ext.getCmp("userId").setValue(userId);						给隐藏域  用户ID赋值
													Ext.getCmp("appUser.empName").setValue(fullname);   // 给显示域  用户名赋值
													Ext.getCmp("Title").setValue(sex);
													var photo = Ext.getCmp('appUser.photo');
													if (photo.value == ''|| photo.value == 'undefined'
															|| photo.value == null) {
														var display = Ext.getCmp('displayUserPhoto');
														if (sex == '2') {
															display.body.update('<img src="'+ __ctxPath+ '/images/default_image_female.jpg"/>');
														} else {
															display.body.update('<img src="'
																			+ __ctxPath
																			+ '/images/default_image_male.jpg"/>');
														}
													}
													
													Ext.getCmp("appUser.useid").setValue(useid);
													Ext.getCmp("appUser.userNo").setValue(userNo);
													if(zhiwei !='null'){
													Ext.getCmp("appUser.zhiwei").setValue(ZW001.get(zhiwei));
													}
													Ext.getCmp("appUser.depName").setValue(depName);
//													alert(depId);
													Ext.getCmp("appUser.depId").setValue(depId);
													Ext.getCmp("appUser.bankname").setValue(bankname);
													Ext.getCmp("appUser.bankTypeId").setValue(bankTypeId);
													//联系方式
													Ext.Ajax.request( {
														url : __ctxPath + '/xitong/contactsUlEmployee.do?employeeid='+useid,
														method : 'get',
														async : true,
														success : function(response, opts) {
															var ret = Ext.util.JSON.decode(response.responseText).data;
//															var btn = new Ext.Button({
//											                    text:'hi 你好'
//											                });
//															Ext.getCmp('empContacts').add(btn);
//															var empContacts = Ext.getCmp('empContacts');
//															var makeTextField = function(mid, mlabelname, mvalue){
//																var mtf = new Ext.form.TextField({
//																	id : mid,
//																	name : mlabelname,
//																	value : mvalue
//																});
//																return mtf;
//															};
															for(var i=0;i< ret.length;i++){
																if(ret[i].contactType == 1){//手机
																	Ext.getCmp('empMobile').setValue(ret[i].contactValue);
//																	var mp = makeTextField('empMobilePhone','移动电话',ret[i].contactValue);
//																	empContacts.add(mp);
																} else if(ret[i].contactType == 2){//电话
																	Ext.getCmp('empPhone').setValue(ret[i].contactValue);
																} else if(ret[i].contactType == 3){//邮箱
																	Ext.getCmp('empZip').setValue(ret[i].contactValue);

																}
//																empContacts.doLayout();
															}},
														failure : function(response, opts) {

														}
													
													});
												}).show();
											}
										}]}
								
						 ]}
						,{
							fieldLabel : '姓名',
							name : 'appUser.empName',
							id : 'appUser.empName',
							readOnly : true
						},
						{
						fieldLabel : '性别',
						name : 'appUser.Title',
						id : 'Title',
						allowBlank : true,
						displayField : 'itemName',
						valueField : 'itemId',
						xtype : 'combo',
						mode : 'local',
						triggerAction : 'all',
						forceSelection : false,
						hiddenName : 'appUser.Title',
						readOnly : true,
						store : new Ext.data.SimpleStore({

							url : __ctxPath
									+ '/system/loadItemDictionary.do',
							baseParams : {
								itemName : '性别'
							},
							fields : ['itemId', 'itemName'],
							autoLoad : true,
							method : "post",
							listeners : {
								load : function() {
									var combo = Ext.getCmp('Title');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['itemId'] == combo.getValue()) {
											combo.setValue(store.getAt(i).data['itemName']);
											break;
										}
									}

								}
//							,
//								render : function() {
//									alert('gaga');
//									var photo = Ext.getCmp('appUser.photo');
//									if (photo.value == ''
//											|| photo.value == 'undefined'
//											|| photo.value == null) {
//										var display = Ext
//												.getCmp('displayUserPhoto');
//										if (combo.value == '0') {
//											display.body
//													.update('<img src="'
//															+ __ctxPath
//															+ '/images/default_image_female.jpg"/>');
//										} else {
//											display.body
//													.update('<img src="'
//															+ __ctxPath
//															+ '/images/default_image_male.jpg"/>');
//										}
//									}
//								}
							}
						})

					
						
						},
						

						{
						fieldLabel : '所属机构',
						name : 'appUser.depName',
						id : 'appUser.depName',
						readOnly  : true
						},

					{
						fieldLabel : '职位',
						name : 'appUser.zhiwei',
						id : 'appUser.zhiwei',
						readOnly  : true
//					},{
//						fieldLabel : '办公电话',
//						name : 'empPhone',
//						id : 'empPhone',
//						readOnly  : true

					},{
						fieldLabel : '所属行',
						name : 'appUser.bankname',
						id : 'appUser.bankname',
						readOnly  : true
						},
						{
							fieldLabel : '编号',
							name : 'appUser.bankTypeId',
							xtype : 'hidden',
							id : 'appUser.bankTypeId',
							readOnly  : true
							},
                          {
						fieldLabel : '移动电话',
						name : 'empMobile',
						id : 'empMobile',
						readOnly  : true

					},{
						fieldLabel : '邮箱',
						name : 'empZip',
						id : 'empZip',
						readOnly  : true
					},
					{
						filedLabel : '照片',
						xtype : 'hidden',
						id : 'appUser.photo',
						name : 'appUser.photo'
					},{
						filedLabel : '部门编号',
						xtype : 'hidden',
						id : 'appUser.depId',
						name : 'appUser.depId'
					}]
				}]

			}
		},
//		{
//			xtype : 'fieldset',
//			id : 'depFieldset',
//			columnWidth : 0.5,
//			title : "待屏蔽部门信息",
//			collapsed : true,
//			collapsible : true,
//			autoHeight : true,
//			defaults : {
//				anchor : '100%,100%'
//			},
//			items : depSelectPanel
//		}, 
		{
			xtype : 'fieldset',
			id : 'groupsFieldset',
			columnWidth : 0.5,
			title : '<font style="color:red">*</font>用户组信息',
			collapsed : true,
			collapsible : true,
			autoHeight : true,
			defaults : {
				anchor : '100%,100%'
			},
			items : groupsSelectPanel
		}, 
//		{
//			xtype : 'fieldset',
//			id : 'jobFieldset',
//			columnWidth : 0.5,
//			title : "待屏蔽职位信息",
//			collapsed : true,
//			collapsible : true,
//			autoHeight : true,
//			defaults : {
//				anchor : '100%,100%'
//			},
//			items : jobSelectPanel
//		},
		{
			xtype : 'fieldset',
			id : 'appUser_rolesFieldset',
			columnWidth : 0.5,
			title : "角色信息",
			collapsed : true,
			collapsible : true,
			autoHeight : true,
			defaults : {
				anchor : '100%,100%'
			},
			items : {
				xtype : 'panel',
				height : 220,
				border : false,

				items : [{
					xtype : 'itemselector',
					id : 'AppUserRoles',
					name : 'AppUserRoles',
					fromLegend : '',
					flex : 1,
					imagePath : __ctxPath + '/ext3/ux/images/',
					defaults : {
						anchor : '100%,100%'
					},
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					multiselects : [{
						id : 'chooseAppUser_Roles',
						title : '可选角色',
						height : 220,
						width : Ext.getCmp('centerTabPanel').getInnerWidth()
								/ 2,
						autoWidth : true,
						store : new Ext.data.SimpleStore({
									autoLoad : true,
									baseParams : {
										userId : userId
									},
									url : __ctxPath
											+ '/system/chooseRolesAppUser.do',
									fields : ['roleId', 'roleName']
								}),
						displayField : 'roleName',
						valueField : 'roleId'
					}, {
						id : 'selectedAppUser_Roles',
						name : 'selectedRoles',
						title : '已有角色',
						height : 220,
						width : Ext.getCmp('centerTabPanel').getInnerWidth()
								/ 2,
						store : role_appuser_Stores,
						tbar : [{
							text : '清除所选',
							handler : function() {
								Ext.getCmp('AppUserForm').getForm()
										.findField('AppUserRoles').reset();
							}
						}],
						displayField : 'roleName',
						valueField : 'roleId'
					}]

				}]

			}
		}
//		,{
//			xtype : 'textfield',
//			id : 'dic_find_temp',
//			name : 'dic_find_temp'
//		}
		/*
		 * , { xtype : 'fieldset', columnWidth : 0.5, title : "其它信息", collapsed :
		 * true, collapsible : true, autoHeight : true, defaults : { anchor :
		 * '100%,100%' }, items : { xtype : 'panel',
		 * 
		 * height : 220, flex : 1, items : [] } }
		 */
		]
	});
if(_depId){
	Ext.getCmp('appUser.depId').setValue(_depId);
}	
	return userform;
};


// 初始化操作菜单
AppUserForm.prototype.initFooterToolbar = function(userId, groupGrid) {
								
	
	var toolbar = new Ext.Toolbar({
		id : 'AppUserFormToolbar',
		height : 30,
		items : [
		         
		         "->",{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var userform = Ext.getCmp('AppUserForm');
				if (userform.getForm().isValid()) {
					//appUser.password 系统默认密码选择器	   
					if(userform.getForm().findField('appUser.password')) {
						var userform = Ext.getCmp('AppUserForm');
//						userform.getForm().findField('appUser.password').setValue(getDicValueByName('密码'));
						userform.getForm().findField('appUser.password').setValue(dic_query[0]);
//						makeDefaultPwd('密码','appUser.password');
					}
					//添加用户组
					var groupStore = groupGrid.getStore();
					var groupcnt = groupStore.getCount();  //用户组可以为空
					var roleCount = role_appuser_Stores.getCount();
					if(groupcnt > 0){
						var groupParams = [];
						var insertGroup = true;
//						if(groupcnt > 0){
						for (i = 0; i < groupcnt; i++) {
							var rec = groupStore.getAt(i);
							groupParams.push(rec.data.pkUsergroupId);
						}
//						}
						///end
						userform.getForm().submit({
									waitMsg : '正在提交用户信息',
									params : {
	//									depParams : Ext.encode(depParams),
	//									jobParams : Ext.encode(jobParams),
										groupParams : Ext.encode(groupParams)
									},
									success : function(userform, o) {
										Ext.ux.Toast.msg('操作信息', '保存成功！');
										var userview = Ext.getCmp('AppUserGrid');
										if (userview != null) {// 假如账号列表不为空,则重载数据
											userview.getStore().reload({
														start : 0,
														limit : 25
													});
										}
										AppUtil.removeTab('AppUserForm');
									},
									failure : function(userform, o) {
										Ext.ux.Toast.msg('错误信息', o.result.msg);
										Ext.getCmp('appUser.username').setValue('');
									}
								});
					} else {
						Ext.ux.Toast.msg('操作信息', '请选择该用户所在的用户组信息！');
					}
				}
			}

		}, {
			text : '取消',
			iconCls : 'btn-del',
			handler : function() {
				var tabs = Ext.getCmp('centerTabPanel');
				tabs.remove('AppUserForm');
			}
		}, {
			text : '修改密码',
			id : 'resetPassword',
			iconCls : 'btn-password',
			hidden : true,
			handler : function() {
				new ResetPasswordForm(userId);
			}
		}, {
			text : '令牌设置',
			iconCls : 'btn-dynamic-pwd',
			hidden : sysConfigInfo.dynamicPwd=='2'?true:false,
			handler : function() {
				new DynamicPwdForm({
							userId : userId
						}).show();
			}
		}]
	});
	return toolbar;
};
/**
 * 上传账号图片按钮动作
 * 
 * @param {}
 *            userId
 */
AppUserForm.uploadPhotoBtn = function(userId) {
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
					url : __ctxPath + '/system/deletePhotoAppUser.do',
					method : 'post',
					params : {
						filePath : photo.value,
						userId : userId
					},
					success : function() {
						if (userId != '' && userId != null
								&& userId != 'undefined') {
							Ext.Ajax.request({
								url : __ctxPath + '/system/photoAppUser.do',
								method : 'post',
								params : {
									userId : userId
								},
								success : function() {
									photo.setValue('');
									var appUserTitle = Ext
											.getCmp('Title');
									var display = Ext
											.getCmp('displayUserPhoto');
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
							var appUserTitle = Ext.getCmp('Title');
							var display = Ext.getCmp('displayUserPhoto');
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
AppUserForm.deletePhotoBtn = function(userId) {
	var photo = Ext.getCmp('appUser.photo');
	if (photo.value != null && photo.value != '' && photo.value != 'undefined') {
		Ext.Msg.confirm('确认信息', '照片一旦删除将不可恢复, 是否删除?', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath + '/system/deletePhotoAppUser.do',
					method : 'post',
					params : {
						filePath : photo.value,
						userId : userId
					},
					success : function() {
						if (userId != '' && userId != null
								&& userId != 'undefined') {
							Ext.Ajax.request({
								url : __ctxPath + '/system/photoAppUser.do',
								method : 'post',
								params : {
									userId : userId
								},
								success : function() {
									photo.setValue('');
									var appUserTitle = Ext
											.getCmp('Title');
									var display = Ext
											.getCmp('displayUserPhoto');
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
							var appUserTitle = Ext.getCmp('Title');
							var display = Ext.getCmp('displayUserPhoto');
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
	var photo = Ext.getCmp('appUser.photo');
	var display = Ext.getCmp('displayUserPhoto');
	photo.setValue(data[0].filePath);
	display.body.update('<img src="' + __ctxPath + '/attachFiles/'
			+ data[0].filePath + '"  width="100%" height="100%"/>');
};




//用户组选择
AppUserForm.prototype.initGroupSelectPanel = function(userId) {
	Ext.QuickTips.init();
	/* 用户组树 */
	var selectNode = null;
	var Group_url = __ctxPath + '/system/treeLoadAppUser.do';
	var GroupTree = new Ext.tree.TreePanel({
			height : 220,
			flex : 7,
			useArrows : false,
			autoScroll : true,
			animate : false,
			enableDD : false,
			containerScroll : true,
			border : true,
			dataUrl : Group_url,
			rootVisible : false,
			root : {
				nodeType : 'async',
				text : 'Ext JS',
				draggable : false

			},
			listeners : {
				'click' : function(node) {
					selectNode = node;
				},
				'beforeload' : function(node) {
					// node.setText('<font
					// qtip="双击添加">'+node.text+'</font>');
					// node.eachChild( function(args){
					//							
					// }, this);
					node.attributes.qtip = '双击添加';
					node.attributes.description = '双击添加';
					// alert(Ext.encode(node.attributes));
				}

			}
		});

var dellTrue = function(ids) {

	Ext.Ajax.request({
				url : __ctxPath + '/system/multiDelGroupsAppUser.do',
				params : {
					ids : ids,
					userId : userId
					
				},
				method : 'POST',
				success : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '成功删除该明细！');

				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
			});

	

};
/* 选择按钮 */
var add = function() {
	if (selectNode == null) {
		Ext.ux.Toast.msg("信息", "请选择要添加的用户组！");
		return;
	}

	var isRe = false;
	for (i = 0; i < groupStore.getCount(); i++) {
		var r = groupStore.getAt(i);
		if (r.data.pkUsergroupId == selectNode.id) {
			isRe = true;
		}
	}
	if (isRe == true) {

		Ext.ux.Toast.msg("信息", "用户组重复，请选择其它用户组！");
		return;

	}

	var ulUsergroup = {};
	Ext.apply(ulUsergroup, {
				pkUsergroupId : selectNode.id,
				usergroupName : selectNode.text
				
			});

	var recrod = new groupStore.recordType();

	recrod.data = {};
//	recrod.data.ismain = 0;

	Ext.apply(recrod.data, {
//				ulUsergroup : ulUsergroup   
				pkUsergroupId : selectNode.id,
				usergroupName : selectNode.text
			});

	groupStore.insert(0, recrod);

	groupStore.commitChanges();
	//selectNode = null;

};
var del = function() {

	var selectRecords = GroupGrid.getSelectionModel().getSelections();
	if (selectRecords.length == 0) {
		Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
		return;
	}

	if (selectRecords[0].data.pkUsergroupId != null//ugUid
			&& selectRecords[0].data.pkUsergroupId != '') {
		
//		dellTrue(selectRecords[0].data.pkUsergroupId);
	}

	groupStore.remove(selectRecords[0]);
	groupStore.commitChanges();

};
var selectPanel = new Ext.Panel({
			frame : false,
			border : false,
			hideBorders : true,
			height : 220,
			flex : 0.4,
			layout : {
				type : 'vbox',
				pack : 'center',
				align : 'stretch'
			},
			defaults : {
				anchor : '100%,100%'
			},
			defaults : {
				margins : '0 3 0 0'
			},
			items : [{
						xtype : 'button',
						iconCls : 'btn-right',
						scope : this,
						handler : add
					}, {
						xtype : 'button',
						iconCls : 'btn-left',
						scope : this,
						handler : del
					}]
		});
/* 职位grid */
var dellAll = function() {

	// jobStore.removeAll();
	var ids = Array();
//	alert(groupStore.getCount());
	for (i = 0; i < groupStore.getCount(); i++) {
		var r = groupStore.getAt(i);
		if (r.data.pkUsergroupId != null && r.data.pkUsergroupId != '') {
			ids.push(r.data.pkUsergroupId);
//			alert(r.data.pkUsergroupId);
		};

	}
	if (ids.length > 0) {
//		alert(ids.length);
//		dellTrue(ids);

	}
	groupStore.removeAll();
	groupStore.commitChanges();

};
var gridTopbar = new Ext.Toolbar({
			items : [{
						text : '清除所选',
						scope : this,
						handler : dellAll
					}]
		});


var groupRecord = Ext.data.Record.create([{
	name : 'pkUsergroupId',
	type : 'int'
}, 'parentId','usergroupName','ulUsergroup']);

var gridMemoryProxy = new Ext.data.HttpProxy({
			url : __ctxPath + "/system/showgridAppUser.do"
		});

var gridJsonReader = new Ext.data.JsonReader({
			root : 'result',
			totalProperty : 'totalCounts',
			idProperty : "pkUsergroupId"
		}, groupRecord);

var groupStore = new Ext.data.Store({
			id : 'AppUserForm.GroupStore',
			proxy : gridMemoryProxy,
			reader : gridJsonReader
		});

groupStore.on('beforeload', function(store) {
				store.baseParams = {
				start : 0,
				limit : 10000,
				'Q_appUser.userId_L_EQ' : userId  
			};
		});
groupStore.setDefaultSort('pkUsergroupId');

if (userId != '' && userId != null && userId != 'undefined') {
	groupStore.load();
}

var sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true

		});
///





var GroupGrid = new Ext.grid.EditorGridPanel({
			frame : false,
			border : true,
			flex : 6,
			height : 220,
			tbar : gridTopbar,
			store : groupStore,
			clicksToEdit : 1,
			sm : sm,
			viewConfig : {
				forceFit : true,
				autoFill : true
			},
			columns : [{
						header : '用户组ID',
						dataIndex : 'pkUsergroupId',
//						renderer : ulUsergroup.pkUsergroupId,
//						renderer : function(userId) {
//							if (userId)
//								return '<font qtip="双击删除">' + userId + '</font>';
//						},
						sortable : true,
						hidden : false
					}
//			,
//					{
//						header : '上级ID',
//						dataIndex : 'parentId',
////						renderer : pkUsergroupId,
////						renderer : function(userId) {
////							if (userId)
////								return '<font qtip="双击删除">' + userId + '</font>';
////						},
//						sortable : true,
//						hidden : false
//					}
					,{
						header : '用户组名称',
						sortable : true,
						dataIndex : 'usergroupName',
						renderer : function(usergroupName) {
							if (usergroupName)
								return '<font qtip="双击删除">' + usergroupName + '</font>';
						}
					}
					
//					, {//用户组不分主次
//						header : '是否主职位',
//						sortable : true,
//						width : 55,
//						dataIndex : 'isMain',
//						editable : true,
//						renderer : function(isMain) {
//							return isMain == 1 ? '是' : '否';
//						}
//					}
			]
		});
Ext.QuickTips.init();

GroupGrid.on('dblclick', function(e) {

			var selectRecords = GroupGrid.getSelectionModel().getSelections();
			if (selectRecords.length == 0) {
				Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
				return;
			}

			if (selectRecords[0].data.pkUsergroupId != null
					&& selectRecords[0].data.pkUsergroupId != '') {
				
//				dellTrue(selectRecords[0].data.pkUsergroupId);
			}

			groupStore.remove(selectRecords[0]);
			groupStore.commitChanges();

		}, this);
GroupTree.on('dblclick', function(selectNode) {
			
			if (selectNode == null) {
				Ext.ux.Toast.msg("信息", "请选择要添加的用户组！");
				return;
			}

			var isRe = false;
			for (i = 0; i < groupStore.getCount(); i++) {
				var r = groupStore.getAt(i);
				if (r.data.pkUsergroupId == selectNode.id) {
					isRe = true;
				}
			}
			if (isRe == true) {

				Ext.ux.Toast.msg("信息", "用户组重复，请选择其它部门！");
				return;

			}

//			var ulUsergroup = {};
//			Ext.apply(ulUsergroup, {
//						pkUsergroupId : selectNode.id,//用户组的id、name
//						usergroupName : selectNode.text
//					});

			var recrod = new groupStore.recordType();

			recrod.data = {};
//			recrod.data.ismain = 0;

			Ext.apply(recrod.data, {
						pkUsergroupId : selectNode.id, 
						usergroupName : selectNode.text
					});

			groupStore.insert(0, recrod);
			groupStore.commitChanges();
			selectNode = null;
		}, this);

/* 总容器 */

var panel = new Ext.Panel({
			xtype : 'panel',
			height : 220,
			border : false,
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			height : 220,
			items : [GroupTree, selectPanel, GroupGrid]
		});

return panel;
};
