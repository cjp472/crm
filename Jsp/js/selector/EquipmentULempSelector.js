/**
 * 设备维护员工选择器
 */
var EquipmentULempSelector = {
	/**
	 * @param callback
	 *            回调函数
	 * @param isSingle
	 *            是否单选
	 * @param status
	 *            状态：1,可用；2,维修中，3,报废
	 */
	getView : function(callback,UlEmpBTypeId) {
		// ---------------------------------start grid
		// panel--------------------------------
		var sm = null;	
			sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), sm, {
				  header : 'useid',
				  dataIndex : 'useid',
				  hidden : true
		       },{
				header : '工号',
				dataIndex : 'userNo',
				sortable : true
			  }, {
				header : '姓名',
				dataIndex : 'fullname'
			 },{
				header : '职务',
				dataIndex : 'zhiwei'
			}]
			
		});

		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : __ctxPath + '/xitong/EquipmentULEmploySelectUlEmployee.do?UlEmpBTypeId='+UlEmpBTypeId
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'useid',
								fields : [{
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
					id : 'EquipmentULempGrid',
					width : 400,
					height : 300,
					region : 'center',
					title : '员工信息列表',
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
					// paging bar on the bottom
					bbar : new HT.PagingBar({store : store})
				});

		      store.load({
					params : {
						start : 0,
						limit : 10
					}
				});
		// --------------------------------end grid
		// panel-------------------------------------

		var formPanel = new Ext.FormPanel({
			width : 400,
			region : 'north',
			id : 'EquipmentULempForm',
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
				items : [{
	                		text : '工号'
	            		},{
			                name : 'Q_userNo_S_LK',
			                id:'Q_userNo',
			                xtype : 'textfield'
	            		},{
	            			text : '姓名'
	            		},{
							name : 'Q_fullname_S_LK',
							id:'Q_fullname',
							xtype : 'textfield'
			            },{
								xtype : 'button',
								text : '查询',
								iconCls : 'search',
								handler : function() {
			            	            var fullname = Ext.getCmp('Q_fullname').getValue();
										var userNo = Ext.getCmp('Q_userNo').getValue();
										//alert(" userNo "+userNo+"fullname "+fullname);
										//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
										gridPanel.getStore().addListener({
											 beforeload:function(store,records,options){
												store.baseParams = {
														fullname:fullname,
														userNo:userNo
														
												};
											}
										});
										gridPanel.getStore().reload({
										    	params: {
										    		start:0,
										    		limit:25
									    	    }
						                });		
		
				              
							    }
							},{

								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext.getCmp('EquipmentULempForm');
									searchPanel.getForm().reset();//清除SearchForm的值
								}
							
							}]
		});

		var window = new Ext.Window({
			title : '员工列表信息选择',
			iconCls : 'menu-car',
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
							var grid = Ext.getCmp('EquipmentULempGrid');
							var rows = grid.getSelectionModel().getSelections();
							var userNos = '';
							var fullnames = '';
							var zhiweis = '';
							var useids='';
							for (var i = 0; i < rows.length; i++) {

								if (i > 0) {
									userNos += ',';
									fullnames += ',';
									zhiweis += ',';
									useids +=',';
								}

								userNos += rows[i].data.userNo;
								fullnames += rows[i].data.fullname;
								zhiweis += rows[i].data.zhiwei;
								useids += rows[i].data.useid;

							}

							if (callback != null) {
								callback.call(this, userNos,fullnames,zhiweis,useids);
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
		return window;
	}

};