/**
 * 用户管理
 * @class AppUserView
 * @extends Ext.Panel
 */
AppUserView=Ext.extend(Ext.Panel,{
	constructor:function(config){
		Ext.applyIf(this,config);
		this.initUIComponents();
		AppUserView.superclass.constructor.call(this,{
			id : 'AppUserView',
			title : '用户管理',
			iconCls:'menu-appuser',
			layout:'border',
			autoScroll : true
		});
	},
	initUIComponents:function(){
		this.initSearchPanel();
		this.initGridPanel();

		this.items=[this.searchPanel,this.gridPanel];
	},
	onSearch:function(obj){
		var searchPanel = Ext.getCmp('AppUserSearchForm');

		var gridPanel = Ext.getCmp('AppUserGrid');
		if (searchPanel.getForm().isValid()) {
			$search({
				searchPanel :searchPanel,
				gridPanel : gridPanel
			});
		}
	}
});

/**
 * 初始化SearchPanel
 */
AppUserView.prototype.initSearchPanel=function(){
	this.searchPanel=new Ext.FormPanel({
			region:'north',
			height : 35,
			frame : false,
			border:false,
			id : 'AppUserSearchForm',
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
			
			items : [
//			        {
//						text : '用户账号'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_username_S_LK'
//					}, {
//						text : '用户姓名'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_fullname_S_LK'
//					},
//					{
//						text : '入职时间:从'
//					}, {
//						xtype : 'datefield',
//						format: 'Y-m-d',
//						name : 'Q_accessionTime_D_GT'
//					}, {
//						text : '至'
//					},{
//						xtype : 'datefield',
//						format: 'Y-m-d',
//						name : 'Q_accessionTime_D_LT'
//					},
//					{
////						fieldLabel : '状态',
//						id : 'queryAppuser',
////						hiddenName : 'appUser.status',
//						xtype : 'combo',
//						mode : 'local',
//						editable : false,
//						triggerAction : 'all',
////						store : [['0', '姓名'], ['1', '用户名'], ['2', '部门'], ['3', '员工'], ['4', '用户组']],
//						store : [['0', '姓名'], ['1', '用户名'], ['2', '员工']],
//						value : 0
//					},
					{
						text : '用户名'
					},{
						xtype : 'textfield',
						name : 'Q_username_S_LK',
						id : 'Q_username_S_LK'
					},{
						text : '姓名'
					},
					{
						xtype : 'textfield',
						name : 'Q_ulEmployee.fullname_S_LK',
						id : 'Q_fullname_S_LK',
						hidden : false,
						disabled : false
					},{
						text : '工号'
					},{
						xtype : 'textfield',
						name : 'Q_ulEmployee.userNo_S_LK',
						id : 'Q_ulEmployee.userNo_S_LK'
					},{
						text : '状态'
					}, {
						hiddenName : 'Q_status_SN_EQ',
						xtype : 'mtdiccombo',
						id:'status',
						editable : false,
						lazyInit : false,
						forceSelection : false,
					     itemKey : 'YHZT001'
					},
//					{
//						xtype : 'textfield',
//						name : 'Q_employeeid_S_LK',
//						id : 'Q_employeeid_S_LK',
//						hidden : true,
//						disabled : true
//					},{
//						xtype : 'textfield',
//						name : 'Q_ugname_S_LK',
//						id : 'Q_ugname_S_LK',
//						hidden : true,
//						disabled : true
//					},
//					{
//						xtype : 'textfield',
//						name : 'queryAppUserFlag',
//						id : 'queryAppUserFlag',
//						hidden : true,
//						value : 1
//					},
					{
						xtype : 'button',
						id : 'queryButton',
						text : '查询',
						iconCls : 'search',
						scope:this,
						handler:function(){
						var username= Ext.getCmp('Q_username_S_LK').getValue();
						var fullname = Ext.getCmp('Q_fullname_S_LK').getValue();
						var userNo = Ext.getCmp('Q_ulEmployee.userNo_S_LK').getValue();
						var status = Ext.getCmp('status').getValue();
						//alert(username+fullname+userNo+status);
						//alert(suoshuhang+branchId+operatorId);
						//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
						this.gridPanel.getStore().addListener({
							beforeload:function(store,records,options){
								store.baseParams = {
										username:username,
										fullname:fullname,
										userNo:userNo,
										//endtimes:endtimes,
										status:status
										
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
						//handler : this.onSearch.createCallback(this)
					}, {
						xtype : 'button',
						text : __reset,
						scope : this,
						iconCls : 'btn-reset',
						handler : function() {
							var searchPanel = Ext.getCmp('AppUserSearchForm');
							searchPanel.getForm().reset();
						}
					}, {
						xtype : 'button',
						id : 'GJqueryButton',
						text : '高级查询',
						iconCls : 'search',
						disable : true,
						scope:this,
						handler : this.onSearch.createCallback(this)
					}
					]
			
//			items : [
////{
////	text : '用户账号'
////}, {
////	xtype : 'textfield',
////	name : 'Q_username_S_LK'
////}, {
////	text : '用户姓名'
////}, {
////	xtype : 'textfield',
////	name : 'Q_fullname_S_LK'
////},
////{
////	text : '入职时间:从'
////}, {
////	xtype : 'datefield',
////	format: 'Y-m-d',
////	name : 'Q_accessionTime_D_GT'
////}, {
////	text : '至'
////},{
////	xtype : 'datefield',
////	format: 'Y-m-d',
////	name : 'Q_accessionTime_D_LT'
////},
//{
////	fieldLabel : '状态',
//	id : 'queryAppuser',
////	hiddenName : 'appUser.status',
//	xtype : 'combo',
//	mode : 'local',
//	editable : false,
//	triggerAction : 'all',
//	store : [['0', '姓名'], ['1', '用户名'], ['2', '用户组']],
//	listeners : {
//		select : function(){
//			var sv = this.value;
//			if(sv == 0){
//				Ext.getCmp('queryParamsname').setValue('Q_fullname_S_LK');
//			} else if(sv == 1){
//				Ext.getCmp('queryParamsname').setValue('Q_username_S_LK');
//			} else if(sv == 2){
//				Ext.getCmp('queryParamsname').setValue('Q_usergroup_S_LK');
//			}
//		}
//	},
//	value : 0
//},
//{
//	xtype : 'textfield',
//	name : 'queryParamsvalue'
//},{
//	xtype : 'textfield',
//	name : 'queryParamsname',
//	id : 'queryParamsname',
//	hidden : true
////	disabled : true
//},{
//	xtype : 'textfield',
//	name : 'queryAppUserFlag',
//	hidden : true,
//	value : 1
////	disabled : true
//},
//{
//	xtype : 'button',
//	text : '查询',
//	iconCls : 'search',
//	scope:this,
//	handler : this.onSearch.createCallback(this)
//}
//]
		});//end of search panel
	//原型中高级查询:名称、用户组、登录名、姓名、工号、部门、状态
//	var fieldnameComboData=[
//	                        ['username', '用户名', new Ext.form.TextField({name : 'username',allowBlank:true})],
//	    					['fullname', '姓名', new Ext.form.TextField({name : 'fullname',allowBlank:true})],
//	    					['employeeid', '工号',new Ext.form.TextField({name : 'employeeid',allowBlank:true})]
////	    					,['sex', '性别',new MT.DicComboBox({hiddenName : 'sex',itemKey : 'XB001'})],
////	    					['birthday', '生日',new Ext.form.DateField({hiddenName : 'sex',format : 'Y-m-d'})]
//	    				];
//	    				var UlEmployeeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
//	    					title : '员工管理高级查询',
//	    					fieldData : fieldnameComboData
//	    				});
//	    						
//	    				// 初始化搜索条件Panel
//	    				this.searchPanel = new Ext.FormPanel({
////	    							layout : 'form',
////	    							region : 'north',
////	    							id : 'UlEmployeeSearchPanel',
////	    							colNums : 3,
//	    							region:'north',
//	    							height : 35,
//	    							frame : false,
//	    							border:false,
//	    							id : 'UlEmployeeSearchPanel',
//	    							layout : 'hbox',
//	    							layoutConfig: {
//	    				                    padding:'5',
//	    				                    align:'middle'
//	    				            },
//	    							defaults : {
//	    								xtype : 'label',
//	    								border:false,
//	    								margins:{top:0, right:4, bottom:4, left:4}
//	    							},
//	    							items : [{
//	    										text : '姓名'
//	    									}, {
//	    										name : 'Q_fullname_S_LK',
//	    										xtype : 'textfield'
//	    									}, {
//	    										text : '别名'
//	    									}, {
//	    										name : 'Q_alias_S_LK',
//	    										xtype : 'textfield'
//	    									}, {
//	    										text : '性别'
//	    									}, {
//	    										hiddenName : 'Q_sex_L_EQ',
//	    										xtype : 'mtdiccombo',
//	    										editable : true,
//	    										lazyInit : false,
//	    										forceSelection : false,
//	    										itemKey : 'XB001'
//	    /*									}, {
////	    										text : '生日'
////	    									}, {
////	    										fieldLabel : '生日',
////	    										name : 'Q_birthday_D_EQ',
////	    										flex : 1,
////	    										xtype : 'datefield',
////	    										format : 'Y-m-d'
////	    									}, {
////	    										fieldLabel : '类型',
////	    										hiddenName : 'Q_type_L_EQ',
////	    										flex : 1,
////	    										xtype : 'mtdiccombo',
////	    										editable : true,
////	    										lazyInit : false,
////	    										forceSelection : false,
////	    										itemKey : 'YGLX0001'
////	    									}, {
////	    										fieldLabel : '户籍所在地国家',
////	    										name : 'Q_hujiGuojia_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '户籍所在地省',
////	    										name : 'Q_hujiSheng_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '户籍所在地市',
////	    										name : 'Q_hujiShi_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '户籍所在地区',
////	    										name : 'Q_hujiDiqu_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '学历',
////	    										hiddenName : 'Q_education_L_EQ',
////	    										flex : 1,
////	    										xtype : 'mtdiccombo',
////	    										editable : true,
////	    										lazyInit : false,
////	    										forceSelection : false,
////	    										itemKey : 'YGXL0001'
////	    									}, {
////	    										fieldLabel : '毕业院校',
////	    										name : 'Q_biyeyuanxiao_S_EQ',
////	    										flex : 1,
////	    										xtype : 'textfield'
////	    									}, {
////	    										fieldLabel : '入职方式',
////	    										hiddenName : 'Q_ruzhifangshi_L_EQ',
////	    										flex : 1,
////	    										xtype : 'mtdiccombo',
////	    										editable : true,
////	    										lazyInit : false,
////	    										forceSelection : false,
////	    										itemKey : 'RZFS001'
////	    									}, {
////	    										fieldLabel : '上级',
////	    										name : 'Q_parent_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '所属部门',
////	    										name : 'Q_depid_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '邮件',
////	    										name : 'Q_email_S_EQ',
////	    										flex : 1,
////	    										xtype : 'textfield'
////	    									}, {
////	    										fieldLabel : '职位',
////	    										hiddenName : 'Q_zhiwei_L_EQ',
////	    										flex : 1,
////	    										xtype : 'mtdiccombo',
////	    										editable : true,
////	    										lazyInit : false,
////	    										forceSelection : false,
////	    										itemKey : 'ZW001'
////	    									}, {
////	    										fieldLabel : '职级',
////	    										hiddenName : 'Q_zhiji_L_EQ',
////	    										flex : 1,
////	    										xtype : 'mtdiccombo',
////	    										editable : true,
////	    										lazyInit : false,
////	    										forceSelection : false,
////	    										itemKey : 'ZJ001'
////	    									}, {
////	    										fieldLabel : '状态',
////	    										hiddenName : 'Q_status_L_EQ',
////	    										flex : 1,
////	    										xtype : 'mtdiccombo',
////	    										editable : true,
////	    										lazyInit : false,
////	    										forceSelection : false,
////	    										itemKey : 'ZT001'
////	    									}, {
////	    										fieldLabel : '转正时间',
////	    										name : 'Q_zhuanzhengshijian_D_EQ',
////	    										flex : 1,
////	    										xtype : 'datefield',
////	    										format : 'Y-m-d'
////	    									}, {
////	    										fieldLabel : '合同到期时间',
////	    										name : 'Q_hetongdaoqishijian_D_EQ',
////	    										flex : 1,
////	    										xtype : 'datefield',
////	    										format : 'Y-m-d'
////	    									}, {
////	    										fieldLabel : '工作所在地国家',
////	    										name : 'Q_gongzuodiGuojia_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '工作所在地省',
////	    										name : 'Q_gongzuodiSheng_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '工作所在地市',
////	    										name : 'Q_gongzuodiShi_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '工作所在地区',
//	    //
////	    										name : 'Q_gongzuodiDiqu_L_EQ',
////	    										flex : 1,
////	    										xtype : 'numberfield'
////	    									}, {
////	    										fieldLabel : '备注',
//	    //
////	    										name : 'Q_note_S_EQ',
////	    										flex : 1,
////	    										xtype : 'textfield'
////	    									}],
////	    							buttons : [{
////	    										text : '查询',
////	    										scope : this,
////	    										iconCls : 'btn-search',
////	    										handler : this.search
////	    									}, {
////	    										text : '重置',
////	    										scope : this,
////	    										iconCls : 'btn-reset',
////	    										handler : this.reset  */
//	    									},{
//	    										xtype : 'button',
//	    										text : '查询',
//	    										iconCls : 'search',
//	    										scope:this,
//	    										handler : this.search
//	    									},{
//	    										xtype : 'button',
//	    										text : '清空',
//	    										iconCls : 'reset',
//	    										scope:this,
//	    										handler : this.reset
//	    									},{
//	    										xtype : 'button',
//	    										text : '高级查询',
//	    										iconCls : 'search',
//	    										scope:this,
//	    										handler : function(){new UlEmployeeAdvancedSearchWin().show();}
//	    									}]
//	    						});// end of searchPanel
};

AppUserView.prototype.initGridPanel=function(){
		
	this.toolbar = new Ext.Toolbar({
			height : 30,
			items : []
		});
	if (isGranted('_AppUserAdd')) {
		this.toolbar.add(
				"->",new Ext.Button({
					text : '增加',
					iconCls : 'btn-add',
					handler : function() {
						var tabs = Ext.getCmp('centerTabPanel');
						var addUser = Ext.getCmp('AppUserForm');
						//Ext.getCmp('appUserStatus').hide();
						if (addUser == null) {
							addUser = new AppUserForm('用户增加');
							tabs.add(addUser);
						} else {
							tabs.remove(addUser);
							addUser = new AppUserForm('用户增加');
							tabs.add(addUser);
						}
						tabs.activate(addUser);
					}
				}));
	}
	
	if (isGranted('_AppUserDel')) {
		this.toolbar.add(new Ext.Button({
				iconCls : 'btn-del',
				text : '删除',
				handler : function() {
					var grid = Ext.getCmp("AppUserGrid");

					var selectRecords = grid.getSelectionModel()
							.getSelections();

					if (selectRecords.length == 0) {
						Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
						return;
					}
					var ids = Array();
					var idsN = '';
					for (var i = 0; i < selectRecords.length; i++) {
						if (selectRecords[i].data.userId != 1) {
							ids.push(selectRecords[i].data.userId);
						} else {
							idsN += selectRecords[i].data.fullname + ',';
						}
					}
					if (idsN == '') {
						//AppUserView.remove(ids);//与单个删除关联删除的语句
						AppUserView.del(ids);
						
					} else {
						Ext.ux.Toast.msg("信息", idsN + "不能被删除！");
					}
				}
			}));
}
	
	
	
	
	
	
	
//	if (isGranted('_AppUserDel')) {
//			this.toolbar.add(new Ext.Button({
//					iconCls : 'btn-del',
//					text : '注销',
//					handler : function() {
//						var grid = Ext.getCmp("AppUserGrid");
//
//						var selectRecords = grid.getSelectionModel()
//								.getSelections();
//
//						if (selectRecords.length == 0) {
//							Ext.ux.Toast.msg("信息", "请选择要注销的记录！");
//							return;
//						}
//						var ids = Array();
//						var idsN = '';
//						for (var i = 0; i < selectRecords.length; i++) {
//							if (selectRecords[i].data.userId != 1) {
//								ids.push(selectRecords[i].data.userId);
//							} else {
//								idsN += selectRecords[i].data.fullname + ',';
//							}
//						}
//						if (idsN == '') {
//							AppUserView.remove(ids);
//						} else {
//							Ext.ux.Toast.msg("信息", idsN + "不能被删除！");
//						}
//					}
//				}));
//	}
		
		var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							//url : __ctxPath + '/system/listAppUser.do'userList
					         url : __ctxPath + '/system/userListAppUser.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : [{
										name : 'userId',
										type : 'int'
									}, 'username', 'password', 'fullname','address',
									'email','bankname', 'userType', 'title',// 性别
									'position', 'dynamicPwd','dyPwdStatus','yonghuzu','employeeid','depName','ulEmployee','note',
									{
										name : 'beginDate'
									},
									{
										name : 'endDate'
									},
									{
										name : 'accessionTime'
									}, {
										name : 'status',
										type : 'int'
									}]
						}),
				remoteSort : true
			});
//		store.setDefaultSort('userId', 'desc');
		
		store.load({
					params : {
						start : 0,
						limit : 25
					}
		});
    var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), sm, {
						header : '编号',
						dataIndex : 'userId',
						width : 60,
						hidden : true
					},{
						header : '用户名',
						dataIndex : 'username',
						width : 60
					},
					/**add 类型*/
					{
						header : '类型',
						dataIndex : 'userType',
						width : 30,
//						renderer : function(value) {
//							var str = '';
//							if(value == '1'){//激活用户
//								str = '临时';
//							}else{//禁用用户
//								str = '正式';
//							}
//							return str;
//						}
						renderer : function(value) {
						
							if (value != null ){
								
								return UTP001.get(value);
							}
							else{
								return ' ';
							}
						}
					
					},
					
					/**add 用户组*/
					{
						header : '用户组',
						dataIndex : 'yonghuzu',
//						renderer : function(value) {
//							if(value==null){
//								return '';
//							}else{
//								//不清楚这里返回的数据格式？暂时按照数字方式调
//								
//								return value[0].pkUsergroupId;
//							}
//						},
						hidden : true,
						sortable : false,
						width : 60
					},
					 {
						header:'地址',
						dataIndex:'address',
						hidden:true,
						exprint:true
						,width : 60
					}, {
						header : '邮箱',
						dataIndex : 'email',
						hidden : true,
						width : 120
					}, 
					{
						header : '所属行',
						dataIndex : 'bankname',
						hidden : true,
						width : 120
					}, 
					{
						header : '所在职位',
						dataIndex : 'position',
						hidden : true,
						width : 60
					}, {
						header : '开始时间',
						dataIndex : 'beginDate',
						format: 'Y-m-d',
						hidden : false,
						width : 80
						
					}, {
						header : '结束时间',
						dataIndex : 'endDate',
						format: 'Y-m-d',
						hidden : false,
						width : 80
						
					}, 
//					{
//						header : '入职时间',
//						dataIndex : 'accessionTime',
//						hidden : false,
//						width : 100
//						
//					}, 
					
					/**add 工号*/
					{
						header : '姓名',
						dataIndex : 'ulEmployee',
						renderer : function(value) {
							if(value==null){
							  return '';
							}else{
							  return value.fullname;
							}
						},
						width : 60
					},
					{
						header : '工号',
						dataIndex : 'ulEmployee',
						renderer : function(value) {
							if(value==null){
							  return '';
							}else{
							  return value.userNo;
							}
						},
						width : 60
					},
					{
						header : '部门',
						dataIndex : 'ulEmployee',
						renderer : function(value) {
							if(value==null){
							  return '';
							}else{
							  return value.ulDepartment.depname;
							}
						},
						width : 60
					},
					
					/**隐藏令牌*/
					 {
						header : '令牌序列',
						dataIndex : 'dynamicPwd',
						width : 100,
						hidden :true
						
					}, {
						header : '令牌绑定',
						dataIndex : 'dyPwdStatus',
						width : 60,
						hidden : true,
						renderer : function(value){
							if(value !=null && value == 0){
								return '<font color="red">未绑定</font>';
							}else if(value !=null && value == 1){
								return '<font color="green">已绑定</font>';
							}
						}
					}, {
						header : '状态',
						dataIndex : 'status',
						width : 30,
						renderer : function(value) {
						  //if(value!='' && value ==1){
						//alert(YHZT001.get(value));
							return YHZT001.get(value);
						 // }
//							}var str = '';
//							if(value == '1'){//激活用户
//								str += '<img title=' + YHZT001.get(value) + ' src="'+ __ctxPath +'/images/flag/customer/effective.png"/>';
//							}else{//禁用用户
//								str += '<img title=' + YHZT001.get(value) + ' src="'+ __ctxPath +'/images/flag/customer/invalid.png"/>';
//							}
//							return str;
						}
//					YHZT001
					},{
						header : '管理',
						dataIndex : 'userId',
						sortable:false,
						width : 50,
						renderer : function(value, metadata, record, rowIndex,
								colIndex) {
							var editId = record.data.userId;
							var editName = record.data.username;
							var str='';
							if(editId!=1 && editId!=0){
								if(isGranted('_AppUserEdit')){
									str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="AppUserView.edit('
											+ editId + ',\'' + editName + '\')"></button>';
								}
								if(isGranted('_AppUserReset')){
									str += '&nbsp;<button title="重置" value=" " class="btn-password" onclick="AppUserView.reset('
											+ editId + ')"></button>';
								}
//								if (isGranted('_AppUserDel')) {
//									str += '<button title="注销" value=" " class="btn-del" onclick="AppUserView.remove('
//											+ editId + ')"></button>';
//								}
								/*
								 *2014/06/12
								 * */
								if (isGranted('_AppUserDel')) {
									str += '<button title="删除" value=" " class="btn-del" onclick="AppUserView.del('
											+ editId + ')"></button>';
								}
								
							}
							return str;
						}
					}],
			defaults : {
//				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});
	
		this.gridPanel = new Ext.grid.GridPanel({  
					id : 'AppUserGrid',
					// title:'账号基本信息',
					tbar : this.toolbar,
					store : store,
					region:'center',
					//autoHeight:true,
					shim : true,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					cm : cm,
					sm : sm,
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					},
					bbar : new HT.PagingBar({store : store})
				});
				
		AppUtil.addPrintExport(this.gridPanel);
		// 为Grid增加双击事件,双击行可编辑
		this.gridPanel.addListener('rowdblclick', rowdblclickFn);
		var gridPanel=this.gridPanel;
		function rowdblclickFn(gridPanel, rowindex, e) {
			gridPanel.getSelectionModel().each(function(rec) {
			   var userId=rec.data.userId;
			        if(isGranted('_AppUserEdit')&&userId!=1){
					AppUserView.edit(userId, rec.data.username);
			        }
				});
		}
		
};//end of the init GridPanel


/**
 * 用户删除
 * 
 * @param {}
 *            userId
 */
AppUserView.remove = function(_ids) {
	Ext.Msg.confirm('注销操作', '你确定要注销该用户吗?', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/system/multiDelAppUser.do',
								method : 'post',
								params : {
									ids : _ids
								},
								success : function(response) {
									var result = Ext.util.JSON.decode(response.responseText);
									if(result.msg == ''){
										Ext.ux.Toast.msg("操作信息", "用户注销成功");
									}else{
										Ext.ux.Toast.msg("操作信息", result.msg);
									}
									Ext.getCmp('AppUserGrid').getStore().reload();
								},
								failure : function() {
									Ext.ux.Toast.msg("操作信息", "用户注销失败");
								}
							});
				}
			});

};



/*
 *2014/06/18 */
 
AppUserView.del = function(_ids) {
	//alert(_ids);
	Ext.Msg.confirm('删除操作', '你确定要删除该用户吗?', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/system/multiDelUserAppUser.do',
								method : 'post',
								params : {
									ids : _ids
								},
								method : 'post',
								  method : 'post',
					               success : function(result, request) {
					                    var res = Ext.util.JSON.decode(result.responseText);
					                    if (res.success == false) {
					                      Ext.ux.Toast.msg('操作信息', '业务资料'+res.data+'存在关联，删除失败。\n其余用户成功删除');
					                  // Ext.ux.Toast.msg('操作信息', '亲！\n没有选中所要删除的信息！请您选中之后在删除');
					                    } else {
					                       Ext.ux.Toast.msg('操作信息', '删除成功!');
					                    }
					                    Ext.getCmp('AppUserGrid').getStore().reload();
					               }
//								success : function(response) {
//									var result = Ext.util.JSON.decode(response.responseText);
//									if(result.msg == ''){
//										Ext.ux.Toast.msg("操作信息", "用户删除成功");
//									}else{
//										Ext.ux.Toast.msg("操作信息", result.msg);
//									}
//									Ext.getCmp('AppUserGrid').getStore().reload();
//								
//								},
//								failure : function() {
//									Ext.ux.Toast.msg("操作信息", "用户删除失败");
//								}
								
							});
					
				}
			});

};

















/**
 * 重置密码
 * */
AppUserView.reset = function(userId){
//	new setPasswordForm(userId);
	new resetPwdWindow(userId);
};

/**
 * 用户编辑
 * 
 * @param {}
 *            userId
 */
AppUserView.edit = function(userId, username) {
	// 只允许有一个编辑窗口
	var tabs = Ext.getCmp('centerTabPanel');
	var edit = Ext.getCmp('AppUserForm');
	if (edit == null) {
		edit = new AppUserForm(username + '-详细信息', userId);
		tabs.add(edit);
	} else {
		tabs.remove('AppUserForm');
		edit = new AppUserForm(username + '-详细信息', userId);
		tabs.add(edit);
	}
	tabs.activate(edit);
	// 不可显示密码,不能修改账号
	var appUserMustInfo = Ext.getCmp('AppUserMustInfo');
	appUserMustInfo.remove('appUser.password');
	Ext.getCmp('appUser.username').getEl().dom.readOnly = true;
	appUserMustInfo.doLayout(true);
	
//	Ext.getCmp('createBy').hide();
//	Ext.getCmp('createBy').hideLabel = true; 
//	Ext.getCmp('createDate').hide();
//	Ext.getCmp('createDate').setVisible(false);
//	Ext.getCmp('updateBy').show();
	
	Ext.getCmp('createBy').setValue(); 
	Ext.getCmp('createDate').setValue();
	Ext.getCmp('updateBy').setValue(curUserInfo.fullname);
	Ext.getCmp('updateDate').setValue(curDate);
	// 显示修改密码按钮
	var appUserFormToolbar = Ext.getCmp('AppUserFormToolbar');
//	Ext.getCmp('resetPassword').show();
	appUserFormToolbar.doLayout(true);
	
	// 往编辑窗口中填充新闻数据
	
	edit.form.load({
				url : __ctxPath + '/system/getAppUser.do',
				params : {
					userId : userId
				},
				method : 'post',
//				waitMsg : '正在载入数据...',
				success : function(edit, o) {
					// 载入照片
					var photo = Ext.getCmp('appUser.photo');
					var display = Ext.getCmp('displayUserPhoto');
					var appUserTitle = Ext.getCmp('Title');
					if (photo.value != '' && photo.value !=null && photo.value !='undefined') {
						display.body.update('<img src="' + __ctxPath
								+ '/attachFiles/' + photo.value + '" width="100%" height="100%"/>');
					}else if(appUserTitle.value == '2'){
						display.body.update('<img src="' + __ctxPath
								+ '/images/default_image_female.jpg" />');
					}
					var user = Ext.util.JSON.decode(o.response.responseText).data[0];
//					Ext.getCmp('appUserStatus').setValue(user.status);
					var accessionTime = getDateFromFormat(user.accessionTime,'yyyy-MM-dd HH:mm:ss');
//					Ext.getCmp('appUser.accessionTime').setValue(new Date(accessionTime));
					// 载入部门信息
//					Ext.getCmp('appUser.depId').setValue(user.department.depId);
//					Ext.getCmp('depTreeSelector').setValue(user.department.depName);
					//员工信息
//					alert(user.ulEmployee.useid);
					if(user.ulEmployee != null){
						Ext.getCmp('appUser.useid').setValue(user.ulEmployee.useid);
						Ext.getCmp('appUser.empName').setValue(user.ulEmployee.fullname);
						Ext.getCmp('appUser.zhiwei').setValue(ZW001.get(user.ulEmployee.zhiwei));
						Ext.getCmp('appUser.userNo').setValue(user.ulEmployee.userNo);
						Ext.getCmp('appUser.bankname').setValue(user.ulEmployee.bankname);
						Ext.getCmp('appUser.bankTypeId').setValue(user.ulEmployee.bankTypeId);
//						Ext.getCmp('appUser.empMobile').setValue(user.ulEmployee);
//						Ext.getCmp('appUser.empZip').setValue(user.ulEmployee);
//						alert(user.ulEmployee.sex);
//						alert(user.ulEmployee.ulDepartment.depname);
						//添加员工的电话、邮编
						
						
						Ext.Ajax.request( {
						url : __ctxPath + '/xitong/contactsUlEmployee.do?employeeid='+user.ulEmployee.useid,
						method : 'get',
						async : true,
						success : function(response, opts) {
							var ret = Ext.util.JSON.decode(response.responseText).data;
//							Ext.getCmp('empPhone').setValue('暂无');
							Ext.getCmp('empZip').setValue('暂无');
							Ext.getCmp('empMobile').setValue('暂无');
							for(var i=0;i< ret.length;i++){
								if(ret[i].contactType == 1){//手机
									Ext.getCmp('empMobile').setValue(ret[i].contactValue);
								} else if(ret[i].contactType == 1){//电话
									//Ext.getCmp('empPhone').setValue(ret[i].contactValue);
								} else if(ret[i].contactType == 3){//邮箱
									Ext.getCmp('empZip').setValue(ret[i].contactValue);

								}
							}
						},

						failure : function(response, opts) {

						}
					
					});
					}
					
					var beginDate = getDateFromFormat(user.beginDate,'yyyy-MM-dd HH:mm:ss');
					Ext.getCmp('appUser.beginDate').setValue(new Date(beginDate));
//					alert(Ext.getCmp('appUser.beginDate').getValue());
					var endDate = getDateFromFormat(user.endDate,'yyyy-MM-dd HH:mm:ss');
					Ext.getCmp('appUser.endDate').setValue(new Date(endDate));
//					Ext.getCmp('appUser.jobId').setValue(user.jobId);
					
					// 载入职位信息
//					Ext.Ajax.timeout = 90000; //90秒 
//					Ext.Ajax.request( {
//						url : __ctxPath + '/hrm/getJob.do?jobId='+user.jobId,
//						method : 'get',
//						async : true,
//						success : function(response, opts) {
////							var obj = Ext.decode(response.responseText);
////							Ext.getCmp('jobTreeSelector').setValue(obj.data.jobName);
//						},
//
//						failure : function(response, opts) {
//
//						}
//					
//					});
					
					
				},
				failure : function() {
					Ext.ux.Toast.msg('编辑', '载入失败');
				}
				});
};
