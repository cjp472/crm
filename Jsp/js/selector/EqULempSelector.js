/**
 * 车辆选择器
 */
var EqULempSelector = {
	/**
	 * @param callback
	 *            回调函数
	 * @param isSingle
	 *            是否单选
	 * @param status
	 *            状态：1,可用；2,维修中，3,报废
	 */
	getView : function(callback,UlEmpBTypeId) {
				var sm = null;			
				sm = new Ext.grid.CheckboxSelectionModel();

				var cm = new Ext.grid.ColumnModel({
						columns : [new Ext.grid.RowNumberer(), sm, {
							header : '工号',
							dataIndex : 'userNo',
							sortable : true
						}, {
							header : '姓名',
							dataIndex : 'fullname'
						},{
							header : '职务',
							dataIndex : 'zhiwei'
						}
						]
					});
				   var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						 url : __ctxPath + "/xitong/EquipmentULEmploySelectUlEmployee.do?UlEmpBTypeId="+UlEmpBTypeId
					}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',	
					    	    fields:[{
									name : 'useid',
									type : 'int'
								},  'fullname', 'sex', 'birthday', 'parent','education','alias','type','biyeyuanxiao',
									'ulDepartment', 'zhiwei', 'zhiji','bankTypeId', 'bankname','status','ruzhifangshi',
									'hetongdaoqishijian','zhuanzhengshijian','parent','parentName','ruzhishijian','note',
									'ulContactEmp','hujiGuojia','hujiSheng','hujiShi','hujiDiqu','gongzuodiGuojia',
									'gongzuodiSheng','gongzuodiShi','gongzuodiDiqu','userNo','idcard','phone']
							}),
					remoteSort : true
				});
				var gridPanel = new Ext.grid.GridPanel({
						id : 'EquipULempSelectorGrid',
						width : 400,
						height : 300,
						region : 'center',
						title : '员工列表',
						store : store,
						shim : true,
						trackMouseOver : true,
						disableSelection : false,
						loadMask : true,
						//singleSelect : true,//单选
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
				id : 'EquipULempSelectorForm',
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
				//         {
				//			text : '请输入查询条件:'
				//		}, {
				//			text : '客户号'
				//		}, {
				//			xtype : 'textfield',
				//			name : 'Q_customerNo_S_LK'
				//		}, {
							//text : '机构部门名称'
				//		}, {
				//			xtype : 'textfield',
				//			id:'bankname',
				//			name : 'Q_bankname_S_LK'
				//		}, {
				//			xtype : 'button',
				//			text : '查询',
				//			iconCls : 'search',
				//			handler : function() {
				//			    var  bankname=Ext.getCmp('bankname').getValue();
				//			    alert(bankname);
				//				var searchPanel = Ext.getCmp('DeviceManagementForm');
				//				var grid = Ext.getCmp('CustomerSelectorGrid');
				//				if (searchPanel.getForm().isValid()) {
				//					searchPanel.getForm().submit({
				//						waitMsg : '正在提交查询',
				//						url : __ctxPath + '/customer/treeListConHis.do',
				//						params : {
				//							bankname:bankname
				//							//'Q_bankTypeStatus_SN_EQ' : bankTypeStatus
				//						},
				//						method : 'post',
				//						// url : __ctxPath + "/customer/treeListConHis.do?bankname="+bankname,
				////						url : __ctxPath
				////								+ '/customer/listCustomer.do',
				//						success : function(formPanel, action) {
				//							var result = Ext.util.JSON
				//									.decode(action.response.responseText);
				//							grid.getStore().loadData(result);
				//						}
				//					});
				//				}
				//
				//			}
						//}
				]
				});
				// --------------------------------form panel end
				
				// --------------------------------window start
				var window = new Ext.Window({
				title : '设备信息选择器',
				iconCls : 'menu-customerView',
				width : 630,
				height : 380,
				layout : 'border',
				border : false,
				items : [formPanel, gridPanel],
				modal : true,
				buttonAlign : 'center',
				buttons : [{
							iconCls : 'btn-ok',
							text : '确定',
							handler : function() {
								var grid = Ext.getCmp('EquipULempSelectorGrid');
				//				var node = Ext.getCmp('CustomerSelectorGrid').getSelectionModel().getSelectedNode();
				//				alert("-----"+node);
								var rows = grid.getSelectionModel().getSelections();
								var userNos = '';
								var fullnames = '';
								var zhiweis = '';
									for (var i = 0; i < rows.length; i++) {
										if (i > 0) {
											userNos += ',';
											fullnames += ',';
											zhiweis += ',';
										}
										userNos += rows[i].data.userNo;
										fullnames += rows[i].data.fullname;
										zhiweis += rows[i].data.zhiwei;
									}
							
								if (callback != null) {
									callback.call(this,userNos,fullnames,zhiweis);
								}
							
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