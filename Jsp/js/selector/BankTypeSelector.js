/**
 * 机构部门管理选择器
 */
var BankTypeSelector= {
		/**
		 * @param callback
		 *            回调函数
		 * @param isSingle
		 *            是否单选
		 */
		getView : function(callback, isSingle) {
			var treeCustomer = new Ext.tree.TreePanel({
						title : '机构部门信息',
						region : 'west',
						width : 180,
						height : 300,
						id : 'BankTypeSelectorPanel',
						split : true,
						collapsible : true,
						autoScroll : true,
						bbar : new Ext.Toolbar({
									items : [{
												xtype : 'button',
												text : '展开',
												iconCls : 'btn-expand',
												handler : function() {
													treeCustomer.expandAll();
												}
											}, {
												xtype : 'button',
												text : '收起',
												iconCls : 'btn-collapse',
												handler : function() {
													treeCustomer.collapseAll();
												}
											}]
								}),
						loader : new Ext.tree.TreeLoader({
							//url : __ctxPath + "/xitong/BankListTreeConHis.do"
									//url : __ctxPath + '/system/treeRegion.do'
							url : __ctxPath + '/xitong/BankListRoleTreeUlEmployee.do'
								}),
						root : new Ext.tree.AsyncTreeNode({
									expanded : true
								}),
						rootVisible : false,
										listeners : {
								'click' : BankTypeSelector.clickNode
								}
					});
			// ---------------------------------start grid
			// -------------------------------- panel start
			var sm = null;
			if (isSingle) {
				var sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true
						});
			} 
			else {
				sm = new Ext.grid.CheckboxSelectionModel();
			}
			var cm = new Ext.grid.ColumnModel({
						columns : [sm, new Ext.grid.RowNumberer(), {
									header : 'bankTypeId',
									dataIndex : 'bankTypeId',
									hidden : true
								}, {
									header : "上级编号",
									dataIndex : 'parentId',
									width : 60,
									hidden : true
								},{

									header : '网点号',
									sortable : true,
									dataIndex : 'branchId',
									width : 60
								
								},{
									header : '机构部门名称',
									dataIndex : 'bankname',
									width : 60
								},{
									header : '上级机构部门名称',
									dataIndex : 'parentName',
									sortable : false,
									menuDisabled : false
								}]
					});

			var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
				 //url : __ctxPath + "/customer/treeListConHis.do"
							//url : __ctxPath + '/customer/listCustomer.do'
					url : __ctxPath + '/xitong/treeRoleListUlEmployee.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'bankTypeId',
							fields : [{
										name : 'bankTypeId',
										type : 'int'
									}, 'parentId', 'bankname','parentName','branchId']
						})
					// remoteSort : true
				});

			var gridPanel = new Ext.grid.GridPanel({
						id : 'CustomerSelectorGrid',
						width : 400,
						height : 300,
						region : 'center',
						title : '机构部门信息列表',
						store : store,
						shim : true,
						trackMouseOver : true,
						disableSelection : false,
						loadMask : true,
						singleSelect : true,//单选
						cm : cm,
						sm : sm,
						viewConfig : {
							forceFit : true,
							enableRowBody : false,
							showPreview : false
						},
						// paging bar on the bottom
						bbar : new HT.PagingBar({store : store})
					});

			store.load({
						params : {
							start : 0,
							limit : 25
						}
					});
			// --------------------------------end panel

			// --------------------------------form panel start

			var formPanel = new Ext.FormPanel({
				width : 400,
				region : 'north',
				id : 'DeviceManagementForm',
				height : 40,
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
				items : [
//				         {
//							text : '请输入查询条件:'
//						}, {
//							text : '客户号'
//						}, {
//							xtype : 'textfield',
//							name : 'Q_customerNo_S_LK'
//						}, {
							//text : '机构部门名称'
//						}, {
//							xtype : 'textfield',
//							id:'bankname',
//							name : 'Q_bankname_S_LK'
//						}, {
//							xtype : 'button',
//							text : '查询',
//							iconCls : 'search',
//							handler : function() {
//							    var  bankname=Ext.getCmp('bankname').getValue();
//							    alert(bankname);
//								var searchPanel = Ext.getCmp('DeviceManagementForm');
//								var grid = Ext.getCmp('CustomerSelectorGrid');
//								if (searchPanel.getForm().isValid()) {
//									searchPanel.getForm().submit({
//										waitMsg : '正在提交查询',
//										url : __ctxPath + '/customer/treeListConHis.do',
//										params : {
//											bankname:bankname
//											//'Q_bankTypeStatus_SN_EQ' : bankTypeStatus
//										},
//										method : 'post',
//										// url : __ctxPath + "/customer/treeListConHis.do?bankname="+bankname,
////										url : __ctxPath
////												+ '/customer/listCustomer.do',
//										success : function(formPanel, action) {
//											var result = Ext.util.JSON
//													.decode(action.response.responseText);
//											grid.getStore().loadData(result);
//										}
//									});
//								}
//
//							}
						//}
			]
			});
			// --------------------------------form panel end

			// --------------------------------window start
			var window = new Ext.Window({
				title : '机构部门管理信息选择器',
				iconCls : 'menu-customerView',
				width : 630,
				height : 380,
				layout : 'border',
				border : false,
				items : [treeCustomer, formPanel, gridPanel],
				modal : true,
				buttonAlign : 'center',
				buttons : [{
							iconCls : 'btn-ok',
							text : '确定',
							handler : function() {
								var grid = Ext.getCmp('CustomerSelectorGrid');
//								var node = Ext.getCmp('CustomerSelectorGrid').getSelectionModel().getSelectedNode();
//								alert("-----"+node);
								var rows = grid.getSelectionModel().getSelections();
								var bankTypeIds = '';
								var banknames = '';
								var parentIds='';
								var parentNames='';
								var branchIds='';
								if(isSingle == null || isSingle == true){
									for (var i = 0; i < rows.length; i++) {
										if (i > 0) {
											bankTypeIds += ',';
											banknames += ',';
											parentIds+=',';
											branchIds+=',';
										}
										bankTypeIds += rows[i].data.bankTypeId;
										banknames += rows[i].data.bankname;
										parentIds+=rows[i].data.parentId;
										parentNames+=rows[i].data.parentName;
										branchIds+=rows[i].data.branchId;
									}
									
//								}else{
//
//									var store = Ext.getCmp('CustomerSelectorGrid').getStore();
//									for(var i=0; i<store.getCount(); i++){
//										bankTypeIds += rows[i].data.bankTypeId+',';
//										banknames += rows[i].data.bankname+'//';
//										parentIds+=rows[i].data.parentId+',';
//									}
////									bankTypeIds = bankTypeIds.substring(0, bankTypeIds.length-1);
////									banknames = banknames.substring(0, banknames.length-1);
////									parentIds=parentIds.substring(0, parentIds.length-1);
////									for (var i = 0; i < rows.length; i++) {
////										if (i > 0) {
////											bankTypeIds += ',';
////											banknames += ',';
////											parentIds+=',';
////										}
////										bankTypeIds += rows[i].data.bankTypeId;
////										banknames += rows[i].data.bankname;
////										parentIds+=rows[i].data.parentId;
////									}
									
								}
								
								if (callback != null) {
									callback.call(this, bankTypeIds, banknames,parentIds,parentNames,branchIds);
									//callback.call(this, bankTypeIds, banknames,parentIds);
								}
								//alert(bankTypeIds+banknames+parentIds);
								window.close();
							}
				         
						}, {
							text : '取消',
							iconCls : 'btn-cancel',
							handler : function() {
								window.close();
							}
						}]
			});

			// --------------------------------window end
			return window;
		}

};


/**
 * 节点单击事件
 * 
 * @param node
 */
BankTypeSelector.clickNode = function(node) {
	//alert("BankTypeSelector.clickNode"+node);
	BankTypeSelector.select(node);
};



/**
 * 条件查询
 * 
 * @param node
 */
BankTypeSelector.select = function(node) {
	//alert("BankTypeSelector.select"+node);
	var users = Ext.getCmp('CustomerSelectorGrid');
	users.setTitle(node.text + '机构部门分类列表');
//	users.title = node.text + '--子机构列表';
	var store = users.getStore();
	//alert(suoshuhang+branchId+operatorId);
	//通过监听重新刷新数据，在分页实现的查询的时候，为了防止点击下一页查询的时候条件丢失，借用监听
	store.addListener({
		beforeload:function(store,records,options){
			store.baseParams = {
					bankTypeId:node.id
				
					
			};
		}
	});
	store.reload({
    	params: {
    		start:0,
    		limit:25
	    }
});		
};
