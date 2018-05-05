/**
 * @description 用户列表分类选择器
 * @class UserSelector
 * @author 优创融联科技
 * @updater YHZ
 * @createtime 2011-1-19PM
 */
var usergroupId = 0;
var ugUserSelector = {
		
	/**
	 * 
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} isSingle 是否单选
	 * @param {} isForFlow 是否为工作流的配置选择
	 *  * @param {} isSelected true不显示查询条件
	 * @return {}
	 */
	getView : function(callbackOrConf,isSingle,isForFlow,mobileFlag,_pkUsergroupId,isSelected) {
		this.usergroupId = _pkUsergroupId;
		//单选
		if(typeof(callbackOrConf) == 'object'){
			this.scope = callbackOrConf.scope;
			this.callback = callbackOrConf.callback;
		} else {
			this.scope = this;
			this.callback = callbackOrConf;
		}
		this.isSingle=(isSingle!=null)?isSingle:true;
		this.mobileFlag=(mobileFlag!=null)?mobileFlag:false;
		this.isSelected = isSelected;
		var panel = this.initPanel(isSingle,isSelected);
		// window
//		var window = new Ext.Window({
		var ugwindow = new Ext.Panel({
			id : 'ugUserSelectorWin',
//			title : '选择用户',
//			iconCls : 'menu-appuser',
//			width : 955,
//			minWidth : 600,
//			height : 480,
//			minHeight : 480,
			anchor : '100%',
			minWidth : '90%',
			height : 400,
			minHeight : 400,
			layout : 'fit',
			border : false,
			maximizable : true,
			resizable : true,
			modal : true,
			items : [panel]
//			buttonAlign : 'center',
//			buttons : [{
//				text : '确认',
//				iconCls : 'btn-ok',
//				scope : this,
//				handler : this.submit
//			}, {
//				text : '关闭',
//				iconCls:'btn-cancel',
//				scope : this,
//				handler : this.close
//			}]
		});
		
		if(isForFlow){
			ugwindow.addButton(new Ext.Button({
				text : '发起人',
				iconCls : 'menu-subuser',
				scope : this,
				handler : function(){
					this.callback.call(this, '__start', '[发起人]');
					ugwindow.close();
				}
			}));
		}
		
		return ugwindow;
	},

	/**
	 * 组件初始化
	 * @param isSingle 是否单选,默认单选
	 */
	initPanel : function(isSingle,isSelected) {
		////////////////store[获取数据] start////////////////////////////
		var store = new Ext.data.Store({
			baseParams : {
					pkUsergroupId : this.usergroupId
			},
			proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/system/findByUgroupAppUser.do'
				}),
			reader : new Ext.data.JsonReader({
				root : 'result',
				totalProperty : 'totalCounts',
				id : 'id',
				fields : [{
					name : 'userId',
					type : 'int'
				},'username','employeeid','mobile','ulEmployee','title','fullname']
			}),
			remoteSort : true
		});
		store.setDefaultSort('id', 'desc');
		store.load({
			params : {
				start : 0,
				limit : 10
			}
		});
		var sm = null;
		if(isSingle){
			sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
		}else{
			sm = new Ext.grid.CheckboxSelectionModel();
		}
		var cm = new Ext.grid.ColumnModel({
			columns : [sm, new Ext.grid.RowNumberer(),{
					header : "用户名",
					dataIndex : 'username',
					width : 30
				},{
					header : "姓名",
					dataIndex : 'fullname',
					renderer : function(value,meta,record){
//						var title = record.data.title;
						if(value != null){
							return value;
						}else{
							if (record.data.ulEmployee != null && record.data.ulEmployee != '' && record.data.ulEmployee != 'null'){
								return record.data.ulEmployee.fullname;
							}else {
								return ' ';
							}
						}
					},
					width : 40
			},{
				header : "工号",
				dataIndex : 'employeeid',
				width : 30,
				renderer : function(value,meta,record){
					if(value != null){
						return value;
					}else{
						if (record.data.ulEmployee != null && record.data.ulEmployee != '' && record.data.ulEmployee != 'null'){
							return record.data.ulEmployee.userNo;
						}else {
							return ' ';
						}
					}
				}
			}],
			defaults : {
				sortable : true,
				menuDisabled : true,
				width :20
			},
			listeners : {
				hiddenchange : function(cm, colIndex, hidden) {
					saveConfig(colIndex, hidden);
				}
			}
		}); // end of cm
		///////////////////////store end///////////////////////////////////
		
		////////////////////treePanel[left节点] start/////////////////////////////
		//treePanel
		var usergroupPanel = new Ext.tree.TreePanel({
			// TODO left节点treePanel
			id : 'usergroupPanels',
			autoScroll : true,
			title : '按用户组分类 ',
			iconCls : 'dep-user',
			loader : new Ext.tree.TreeLoader({
				url : __ctxPath + '/xitong/treeLoadUlUsergroup.do'
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			rootVisible : false,
			listeners : {
				'click' : this.clickUsergroupNode
			}
		});
		////////////////////treePanel[left节点] end/////////////////////////////

		////////////////////treePanel[left节点] start/////////////////////////////
		//treePanel
		var treePanel = new Ext.tree.TreePanel({
			// TODO left节点treePanel
			id : 'treePanels',
			autoScroll : true,
			title : '按组织机构分类 ',
			iconCls : 'dep-user',
			loader : new Ext.tree.TreeLoader({
				url : __ctxPath + '/system/listDepartment.do'
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			rootVisible : false,
			listeners : {
				'click' : this.clickNode
			}
		});
		////////////////////treePanel[left节点] end/////////////////////////////

		///////////////////rolePanel start///////////////////////////
		var rolePanel = new Ext.tree.TreePanel({
			// TODO rolePanel
			id : 'rolePanel',
			autoScroll : true,
			iconCls : 'role-user',
			title : '按角色分类 ',
			loader : new Ext.tree.TreeLoader({
						url : __ctxPath + '/system/treeAppRole.do'
					}),
			root : new Ext.tree.AsyncTreeNode({
						expanded : true
					}),
			rootVisible : false,
			listeners : {
				'click' : this.clickRoleNode
			}
		}); // end of this rolePanel
		//////////////////////rolePanel end////////////////////////////
		
		//////////////////onlinePanel start////////////////////////////////
		var onlinePanel = new Ext.Panel({
			id : 'onlinePanel',
			autoScroll : true,
			iconCls : 'online-user',
			title : '在线人员  ',
			listeners : {
				'expand' : this.clickOnlinePanel
			}
		}); // end of this onlinePanel
		///////////////////onlinePanel end/////////////////////////////

		///////////////////contactGrid[用户列表] start///////////////////
		var contactGrid = new Ext.grid.EditorGridPanel({
			// TODO EditorGridPanel用户列表
			title : '用户列表',
			autoScroll : true,
			id : 'contactGrid',
			region : 'center',
			height : 380,
			width : 180,
			autoWidth:false,
			store : store,
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
			bbar : new HT.PagingBar({store : store,pageSize : 10})
		}); // end of this contactGrid
		
		contactGrid.on('rowdblclick',function(grid,rowIndex,e){
			var contactGrid = Ext.getCmp('contactGrid');
			var selGrid = Ext.getCmp('selectedUserGrid');
			var selStore = selGrid.getStore();
			var rows = contactGrid.getSelectionModel().getSelections();
			for(var i= 0 ; i<rows.length ; i++){
				var userId = rows[i].data.userId;
				var username = rows[i].data.username;
				var fullname = rows[i].data.fullname;
				var userNo = rows[i].data.employeeid;
				var isExist = false;
				//查找是否存在该记录
				for(var j=0;j<selStore.getCount();j++){
					if(selStore.getAt(j).data.userId == userId){
						isExist = true;
						break;
					}
				}
				if(!isExist){
					var newData = {userId : userId,username : username,fullname : fullname,userNo : userNo};
					var newRecord = new selStore.recordType(newData);
					selGrid.stopEditing();
					selStore.add(newRecord);
				} else {
					Ext.ux.Toast.msg("信息", "用户重复，请选择其它用户！");
				}
			}
		});	//end of contact grid
		//////////////////////contactGrid[用户列表] end///////////////////////
		///////////////////searchPanel[搜索面板] start//////////////////////
		var searchPanel = new Ext.Panel({
			// TODO searchPanel[搜索面板]
			id : 'userSelectorSearchPanel',
			height : 38,
			region : 'north',
			style:isSelected==true?'display:none':'',
			layout : 'hbox',
			bodyStyle : 'padding:6px 2px 2px 2px',
			layoutConfigs : {
				align : 'middle'
			},
			keys : {
				key : Ext.EventObject.ENTER,
				scope : this,
				fn : this.search
			},
			defaultType : 'label',
			defaults : {
				margins : '0 0 0 8'
			},
			items : [{
					text : '用户名'
				}, {
					xtype : 'textfield',
					name : 'Q_username_S_LK',
					id : 'ugUserSelector.username',
					width : 180,
					maxLength : 256
				},{
					text : '姓名'
				}, {
					xtype : 'textfield',
					name : 'Q_ulEmployee.fullname_S_LK',
					id : 'ugUserSelector.fullname',
					width : 180,
					maxLength : 256
				},{
					text : '工号'
				}, {
					xtype : 'textfield',
					name : 'Q_ulEmployee.userNo_S_LK',
					id : 'ugUserSelector.userNo',
					width : 180,
					maxLength : 256
				}, {
					xtype : 'button',
					text : '查询',
					iconCls : 'btn-search',
					scope : this,
					handler : this.search
				}]
			}
		); // end of this searchPanel
		//////////////////////searchPanel[搜索面板] end//////////////////////////////////
		
		//////////////////////selectedUserGrid[已选用户列表] start/////////////////////
		var csm = new Ext.grid.CheckboxSelectionModel();
		var selectedUserGrid = new Ext.grid.EditorGridPanel({
			// TODO selectedUserGrid[已选用户列表]
			id : 'selectedUserGrid',
			title : '已选用户',
			layout : 'form',
			region : 'center',
			width : '100%',
			autoWidth : true,
			height : '100%',
			autoHeight : true,
			autoScroll : true,
			border : false,
			store : new Ext.data.ArrayStore({
				autoLoad : true,
				baseParams : {
					pkUsergroupId : this.usergroupId
				},
				url : __ctxPath + '/xitong/selectedUsersUlUsergroup.do',
    			fields : ['userId', 'username' , 'fullname' , 'userNo']
			}),
			displayField : 'username,fullname,userNo',
			valueField : 'userId',
			trackMouseOver : true,
			sm : csm,
			columns : [ csm, new Ext.grid.RowNumberer(), {
				header : "用户名",
				dataIndex : 'username'
			},{
				header : "姓名",
				dataIndex : 'fullname'
			},{
				header : "工号",
				dataIndex : 'userNo'
			}]
		}); // end of this selectedUserGrid
		selectedUserGrid.addListener('rowdblclick',function(grid,e){
			var grid = Ext.getCmp('selectedUserGrid');
			var store = grid.getStore();
			var rows = grid.getSelectionModel().getSelections();
			for(var i =0; i<rows.length; i++){
				grid.stopEditing();
				store.remove(rows[i]);
			}
		});
		/////////////////////selectedUserGrid[已选用户列表] end //////////////
		
		/////////////////////selectedPanel[多选面板] start/////////////////////
		//多选添加的面板
		var selectedPanel = new Ext.Panel({
			layout : 'border',
			region : 'east',
			width : '350',
			height : '100%',
			border : false,
			autoScroll : true,
			items : [new Ext.Panel({
				region : 'west',
				frame : true,
				width : 35,
				layout : {
                    type : 'vbox',
                    pack : 'center',
                    align : 'stretch'
                },
                defaultType : 'button',
                items : [{
                	iconCls : 'add-all',
                	text : '',
                	scope : this,
                	handler : this.addAll
                },{
                	iconCls : 'rem-all',
                	text : '',
                	scope : this,
                	handler : this.removeAll
                }]
			}),{
				region : 'center',
				autoScroll : true,
				items : [selectedUserGrid]
			}]
		}); // selectedPanel
		///////////////////////selectedPanel end//////////////////////////////
		
		/////////////////westPanel start///////////////////////
		var westPanel = new Ext.Panel({
			layout : 'accordion',
			region : 'west',
			width : 200,
			split : true,
			header : false,
			collapsible : true,
			items : [usergroupPanel ,treePanel, rolePanel, onlinePanel]
		}); // end of this westPanel
		/////////////////westPanel end///////////////////////
		
		var panel = new Ext.Panel({
			// TODO panel总面板
			id : 'contactPanel',
			layout : 'border',
			region : 'center',
			border : false,
			anchor : '100%,100%',
			items : [searchPanel,westPanel,contactGrid]
		}); // end of this contactPanel
		//添加：多选面板
		if(isSingle != null && isSingle == false){
			panel.add(selectedPanel);
			panel.doLayout();
		}
		return panel;
	}, // init

	
	
	
	////////////////###方法###///////////////////////
	/**
	 * 用户组查询用户信息
	 */
	clickUsergroupNode : function(node) {
		if (node != null) {
			var users = Ext.getCmp('contactGrid');
			var store = users.getStore();
			store.proxy.conn.url =__ctxPath + '/system/findByUgroupAppUser.do';
			store.baseParams = {
				pkUsergroupId : node.id
			};
			store.load({
				params : {
					start : 0,
					limit : 10
				}
			});
		}
	},
	/*
	 * 按组织机构查询用户信息
	 * @param {Object} node
	 */
	clickNode : function(node) {
		if (node != null) {
			var users = Ext.getCmp('contactGrid');
			var store = users.getStore();
			store.proxy.conn.url = __ctxPath + '/system/selectAppUser.do';
			store.baseParams = {
				depId : node.id
			};
			store.load({
				params : {
					start : 0,
					limit : 10
				}
			});
		}
	},
	
	/**
	 * 角色查询用户信息
	 */
	clickRoleNode : function(node) {
		if (node != null) {
			var users = Ext.getCmp('contactGrid');
			var store = users.getStore();
			store.baseParams = {
				roleId : node.id
			};
			store.proxy.conn.url =__ctxPath + '/system/findAppUser.do';
			store.load({
				params : {
					start : 0,
					limit : 10
				}
			});
		}
	},
	
	/**
	 * 在线用户
	 */
	clickOnlinePanel:function(){
		var users = Ext.getCmp('contactGrid');
		var store = users.getStore();
		store.proxy.conn.url =__ctxPath + '/system/onlineAppUser.do';
		store.load({
			params : {
				start : 0,
				limit : 10
			}
		});
	},
	
	/**
	 * 添加所有
	 */
	addAll : function(){
		var contactGrid = Ext.getCmp('contactGrid');
		var selGrid = Ext.getCmp('selectedUserGrid');
		var selStore = selGrid.getStore();
		var rows = contactGrid.getSelectionModel().getSelections();
		if(rows.length == 0){
			Ext.ux.Toast.msg("信息", "请选择用户！");
		} else {
			for(var i = 0; i<rows.length; i++){
				var userId = rows[i].data.userId;
				var username = rows[i].data.username;
				var fullname = rows[i].data.ulEmployee.fullname;
				var userNo = rows[i].data.ulEmployee.userNo;
				var isExist = false;
				//查找是否存在该记录
				for(var j=0; j<selStore.getCount(); j++){
					if(selStore.getAt(j).data.userId== userId){
						isExist = true;
						break;
					}
				}
				if(!isExist){
					var newData = {userId:userId,username:username,fullname:fullname,userNo:userNo};
					var newRecord = new selStore.recordType(newData);
					selGrid.stopEditing();
					selStore.add(newRecord);
				} else {
					Ext.ux.Toast.msg("信息", "用户重复，请选择其它用户！");
				}
			}
		}
		
		
	},
	
	/**
	 * 移除所有
	 */
	removeAll : function(){
		var selGrid=Ext.getCmp('selectedUserGrid');
		var rows = selGrid.getSelectionModel().getSelections();
		if(rows.length == 0){
			Ext.ux.Toast.msg("信息", "请选择用户！");
		} else {
			var selStore = selGrid.getStore();
			for(var i=0 ;i<rows.length; i++){
				selGrid.stopEditing();
				selStore.remove(rows[i]);
			}
		}
		
	},
	
	/**
	 * 搜索
	 */
	search : function(){
//		var searchPanel = Ext.getCmp('userSelectorSearchPanel');
//		var contactGrid = Ext.getCmp('contactGrid');
//		searchPanel.getForm().submit({
//			url : __ctxPath+'/system/listAppUser.do',
//			method : 'post',
//			success : function(formPanel, action) {
//				contactGrid.getStore().proxy.conn.url=__ctxPath+'/system/listAppUser.do';
//				var result = Ext.util.JSON.decode(action.response.responseText);
//				contactGrid.getStore().loadData(result);
//			}
//		});
		var contactGrid = Ext.getCmp('contactGrid');
		Ext.Ajax.request({
			url : __ctxPath + '/system/listAppUser.do?Q_status_SN_EQ=1',
			scope : this,
			params : {
				'Q_username_S_LK' : Ext.getCmp('ugUserSelector.username').getValue(),
				'Q_ulEmployee.fullname_S_LK' : Ext.getCmp('ugUserSelector.fullname').getValue(),
				'Q_ulEmployee.userNo_S_LK' : Ext.getCmp('ugUserSelector.userNo').getValue(),
				'start' : 0,
				'limit' : 10
			},
			method : 'post',
			success : function(response, options) {
				contactGrid.getStore().proxy.conn.url = __ctxPath
						+ '/system/listAppUser.do';
				var result = Ext.decode(response.responseText);
				contactGrid.getStore().loadData(result);
			}
		});
	},
	
	/**
	 * 确定，提交
	 * @param isSingle 是否单选
	 * @param callback 回传函数
	 */
	submit : function(){
		var userIds = '';
		var usernames = '';
		var fullnames = '';
		var employeeids = '';
		
		if(this.isSingle == null || this.isSingle){//选择单个用户
			var grid = Ext.getCmp('contactGrid');
			var rows = grid.getSelectionModel().getSelections();
			
			for (var i = 0; i < rows.length; i++) {
				if (i > 0) {
					userIds += ',';
					usernames = ',';
					fullnames += ',';
					employeeids += ',';
				}
				userIds += rows[i].data.userId;
				if(this.mobileFlag){
					usernames += rows[i].data.username+'('+rows[i].data.mobile+')';
					fullnames += rows[i].data.fullname+'('+rows[i].data.mobile+')';
					employeeids += rows[i].data.employeeid+'('+rows[i].data.mobile+')';
				}else{
					usernames += rows[i].data.username;
					fullnames += rows[i].data.fullname;
					employeeids += rows[i].data.employeeid;
				}
			}
		} else {
			var selStore = Ext.getCmp('selectedUserGrid').getStore();
			for(var i = 0 ; i<selStore.getCount(); i++){
				if (i > 0) {
					userIds += ',';
					fullnames += ',';
					employeeids += ',';
				}
				userIds += selStore.getAt(i).data.userId;
				if(this.mobileFlag){
					usernames += selStore.getAt(i).data.username+'('+selStore.getAt(i).data.mobile+')';
					fullnames += selStore.getAt(i).data.fullname+'('+selStore.getAt(i).data.mobile+')';
					employeeids += selStore.getAt(i).data.employeeid+'('+selStore.getAt(i).data.mobile+')';
				}else{
					fullnames += selStore.getAt(i).data.fullname;
					usernames += selStore.getAt(i).data.username;
					employeeids += selStore.getAt(i).data.employeeid;
				}
			}
		}

		if (this.callback != null)
			this.callback.call(this.scope, userIds, usernames, fullnames , employeeids);
//		Ext.getCmp('ugUserSelectorWin').close();
	},
	
	/**
	 * 关闭当前窗口
	 */
	close : function(){
		Ext.getCmp('ugUserSelectorWin').close();
	}
};
