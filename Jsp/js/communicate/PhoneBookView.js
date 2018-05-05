/**
 * @author lyy
 * @description 2010年4月14日
 * @class PhoneBookView
 * @extends Ext.Panel
 */
PhoneBookView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	phoneBookPanel : null,
	store : null,
	dataView : null,
	toolbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		PhoneBookView.superclass.constructor.call(this, {
					id : 'PhoneBookView',
					title : '联系人列表',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},
	initUIComponents : function() {
		this.searchPanel = new Ext.FormPanel({
					id : 'PhoneBookSearchForm',
					height : 40,
					region : 'north',
					frame : false,
					border : false,
					layout : 'hbox',
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					items : [ {
								text : '工号'
							},
						    {
								xtype : 'textfield',
								name : 'Q_userNo_S_LK'
							}
						    , {
								text : '部门'
							}, {
								fieldLabel : '所属部门',
								name : 'Q_ulDepartment.depname_S_LK',
//								flex : 1,
								xtype : 'textfield'

							},
						    {
								text : '姓名'
							}, {
								xtype : 'textfield',
								name : 'Q_fullname_S_LK'
							}, {
								xtype : 'button',
								text : '查询',
								iconCls : 'search',
								scope:this,
								handler : this.search
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}]
				});
		this.store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url :__ctxPath + "/xitong/listBookUlEmployee.do"
							}),
					baseParams:{
//					       'Q_appUser.userId_L_EQ':curUserInfo.userId
//					       'Q_phoneGroup.isPublic_SN_EQ':0
					},
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'id',
								fields : [{
								name : 'useid',
								type : 'int'
							}, 'fullname', 'sex', 'birthday', 'parent',
							'ulDepartment', 'zhiwei', 'zhiji', 'status',
							'parent','parentName','ruzhishijian',
							'hujiGuojia','hujiSheng','hujiShi','hujiDiqu',
							'gongzuodiGuojia','gongzuodiSheng','gongzuodiShi','gongzuodiDiqu','userNo','contacts']
							}),
					remoteSort : true
				});
//		this.store.setDefaultSort('useid', 'desc');
		this.store.load();

		this.toolbar = new Ext.Toolbar({
					id : 'PhoneBookFootBar',
					height : 28,
					bodyStyle : 'text-align:left',
					items : [ '->',
						new Ext.Button({
								text : '发送信息',
								iconCls : 'btn-sendM',
								handler : this.addSendFormPanel
										.createCallback(this)
							}),{
						text : '发邮件',
						iconCls : 'btn-mail_send',
						handler : this.qunfa.createCallback()
			
				     },
					 {
						text : __add,
						iconCls : 'add-user',
						handler : function() {
							var node = Ext.getCmp('leftBookPanel').getSelectionModel().getSelectedNode();
							if(node==null || node.id == 0){
							   Ext.ux.Toast.msg("信息提示","请选择分组的子节点添加联系人！");
							}else{
								UlEmployeeSelectors.getView(
									function(useIds) { // UlEmployeeSelectors调用UlEmployeeSelectors这个JS
										Ext.Ajax.request({
											url : __ctxPath
													+ '/communicate/savePhoneGroup.do',
											method : 'post',
											async : true,
											params : {
												  useid : useIds,
												  groupId : node.id
												},
											success : function(response, opts) {
												var ret = Ext.util.JSON.decode(response.responseText).data;
												Ext.getCmp('UlEmployeeGrid1').getStore().reload();
											},

											failure : function(response, opts) {

											}

										});
										
									},false).show();
							}
//							Ext.getCmp('UlEmployeeGrid1').getStore().reload();
						}
					},
							
							{
							     iconCls:'btn-del',
							     xtype:'button',
							     text:'删除',
							     handler:this.deleteRecord.createCallback(this)
							}]
				});

     				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.toolbar,
					// 使用RowActions
					//rowActions : true,
					id : 'UlEmployeeGrid1',
//					url : __ctxPath + "/xitong/listUlEmployee.do",
					store:this.store,
					fields : [{
								name : 'useid',
								type : 'int'
							}, 'fullname', 'sex', 'birthday', 'parent',
							'ulDepartment', 'zhiwei', 'zhiji', 'status',
							'parent','parentName','ruzhishijian',
							'hujiGuojia','hujiSheng','hujiShi','hujiDiqu',
							'gongzuodiGuojia','gongzuodiSheng','gongzuodiShi','gongzuodiDiqu','userNo'],
					columns : [{
								header : '工号',
								dataIndex : 'userNo',
								sortable : true
//								hidden : false
							}, {
								header : '姓名',
								dataIndex : 'fullname'
							},{
								header : '所属部门',
								dataIndex : 'ulDepartment',
								renderer : function(value) {
									if (value == null) {
										return '';
									} else {
										return value.depname;
									}
								}
							}, {
								header : '性别',
								dataIndex : 'sex',
								renderer : function(value) {
									return XB001.get(value);
								}
							}, { 
								header : '职位',
								dataIndex : 'zhiwei',
								renderer : function(value) {
									return ZW001.get(value);
								}
							},
						    { 
								header : 'Email',
								dataIndex : 'contacts',
								renderer : function(value) {
								var typeValue='';
									for(i=0;i<value.length;i++){
										if(value[i].contactType==4){
											typeValue =  value[i].contactValue;
										}
									}
							     return typeValue;
									}
			
						   },
					    	{ 
								header : '电话',
								dataIndex : 'contacts',
								renderer : function(value) {
								var typeValue='';
									for(i=0;i<value.length;i++){
										if(value[i].contactType==1){
											typeValue =  value[i].contactValue;
										}
									}
							     return typeValue;
									}
			
							}, {
								header : 'IM',
								dataIndex : 'createBy'
							}
							]
						// end of columns
				});
		
	},// 初始化结束
	search : function(self) {
		var searchPanel = self.searchPanel;
		if (searchPanel.getForm().isValid()) {
			var store = self.dataView.getStore();
			var baseParam = Ext.Ajax.serializeForm(searchPanel.getForm().getEl());
			var deParams = Ext.urlDecode(baseParam);
			deParams.start = 0;
			deParams.limit = store.baseParams.limit;
			store.baseParams = deParams;
			self.phoneBookPanel.getBottomToolbar().moveFirst();
		}
	},// 查询
	showMenu : function(view, index, node, e) {
		var nodes = view.getSelectedNodes();
		if(nodes.length<2){
			view.all.each(function(el) {
						view.deselect(el);
					});
			view.select(index, true);
		}
		nodes = view.getSelectedNodes();
		if (nodes != '' && nodes != null && nodes != 'undefined') {
			var menuItems=new Array();
			if(nodes.length==1){
			menuItems.push({
							text : '修改',
							scope : this,
							iconCls : 'btn-edit',
							handler : this.editRecord.createCallback(this)
						});
			}
			menuItems.push({
								text : '删除',
								scope : this,
								iconCls : 'btn-delete',
								handler : this.deleteRecord
										.createCallback(this)
							});
			var menus = new Ext.menu.Menu({
					items : menuItems
				});
			menus.showAt(e.getXY());
		}

	},// 显示菜单
	createRecord : function() {
		new PhoneBookForm().show();
	},// 创建新记录
	editRecord : function(self) {
		var nodes = self.dataView.getSelectedNodes();
		if (nodes != '' && nodes != null && nodes != 'undefined') {
			var phoneId = nodes[0].id;
			new PhoneBookForm({phoneId:phoneId}).show();
		}
	},
		// 按条件搜索
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	//清空
	reset : function(){
		this.searchPanel.getForm().reset();
	},
	//发送消息面板
   addSendFormPanel : function(panel) {
//		var tabs = Ext.getCmp('centerTabPanel');
//				var aForm = Ext.getCmp('MessageForm');
//				if (aForm != null) {
//					tabs.remove('MessageForm');
//				}
//				aForm = new MessageForm();
//				tabs.add(aForm);
//				tabs.activate(aForm);
		MessageForm.getView().show();
		
			},
		//群发消息或邮件
	qunfa: function(){
		var useIds = '';
		var usename='';
		var store=Ext.getCmp('UlEmployeeGrid1').getStore()
		var rows=Ext.getCmp('UlEmployeeGrid1').getSelectionModel().getSelections();
		for (var i = 0; i < rows.length; i++) {
				if (i > 0) {
					useIds += ',';
					usename+=',';
					
				}
			useIds += rows[i].data.useid;
			usename += rows[i].data.fullname;
		
		}
		var tab = Ext.getCmp('centerTabPanel');
			var mailForm = Ext.getCmp('MailForm');
			
			if (mailForm == null) {
				mailForm = new MailForm('', '', '',useIds, usename);
				tab.add(mailForm);
				tab.activate(mailForm);
			} else {
				tab.remove(mailForm);
				mailForm = new MailForm('', '', '',useIds, usename);
				tab.add(mailForm);
				tab.activate(mailForm);
			}
			
		
	},
	// 删除记录
	deleteRecord : function(self) {
		var useIds = '';
		var deleteId='1';
		var nodes = Ext.getCmp('leftBookPanel').getSelectionModel().getSelectedNode();
		var store=Ext.getCmp('UlEmployeeGrid1').getStore()
		var rows=Ext.getCmp('UlEmployeeGrid1').getSelectionModel().getSelections();
		for (var i = 0; i < rows.length; i++) {
				if (i > 0) {
					useIds += ',';
				}
			useIds += rows[i].data.useid;
		
		}
		if (nodes != '' && nodes != null && nodes != 'undefined' && nodes.id!=0) {
			if(rows.length>0){
				Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/communicate/savePhoneGroup.do',
									params : {
										useid : useIds,
										groupId:nodes.id,
										deleteId:deleteId
									},
									method : 'post',
									success : function() {
										Ext.ux.Toast.msg("信息提示",
												"成功删除所选记录！");
										store.reload();
									}
								});
					}
				});
			} else {
				Ext.ux.Toast.msg("信息提示","请选择要删除的记录!");
			}
		}else{
		    Ext.ux.Toast.msg("信息提示","请在左侧分组中选择该条记录对应的分组信息!");
		}
	}// 删除记录
});
