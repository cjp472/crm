/**
 * 车辆选择器
 */
var ULempEquipSelector = {
	/**
	 * @param callback
	 *            回调函数
	 * @param isSingle
	 *            是否单选
	 * @param status
	 *            状态：1,可用；2,维修中，3,报废
	 */
	getView : function(callback, isSingle, bankId) {
	               alert("getView"+bankId);
		// ---------------------------------start grid
		// panel--------------------------------
		var sm = null;
		if (isSingle) {
			var sm = new Ext.grid.CheckboxSelectionModel({
						singleSelect : true
					});
		} else {
			sm = new Ext.grid.CheckboxSelectionModel();
		}
		var cm = new Ext.grid.ColumnModel({
					columns : [new Ext.grid.RowNumberer(), sm, {
						header : 'EId',
						dataIndex : 'EId',
						hidden : true
					}, 
					{
						header : 'bankTypeId',
						dataIndex : 'bankTypeId',
						hidden : true
					}, 
					{
						header : 'parentId',
						dataIndex : 'parentId',
						hidden : true
					}, {
						header : "机具号",
						dataIndex : 'equipmentId',
						width : 70
					}, {
						header : "所属机构号",
						dataIndex : 'branchId',
						width : 70
					}, {
						header : "柜员号",
						dataIndex : 'operatorId',
						width : 70
					}
					]
				});
		var store=new Ext.data.SimpleStore({
				
			 url : __ctxPath + "/xitong/ulempEquipSelectUlEmployee.do?bankId="+bankId,
			            //url:__ctxPath + '/xitong/listEquipment.do',
			           autoLoad : true,
			          // roleId : -1,fields中的值与后台拼接的值对应的个数是一致的，注意的地方
			          root : 'result',
					  totalProperty : 'totalCounts',
					  //id : 'id',
					  fields : [{
							name : 'EId',
							type : 'int'
						}, 'bankTypeId','parentId','equipmentId','branchId',
						'equipmentName','bankname','parentName','operatorId',
						'curdate','ipAddress','address']	
					        });


		var gridPanel = new Ext.grid.GridPanel({
					id : 'ULempEquipSelectorGrid',
					width : 400,
					height : 300,
					region : 'center',
					title : '设备列表',
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
			id : 'ULempEquipSelectorForm',
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
						text : '请输入查询条件:'
					}, {
						text : '柜员号'
					}, {
						xtype : 'textfield',
						name : 'Q_carNo_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('CarSearchForm');
							var grid = Ext.getCmp('CarSelectorGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + "/xitong/ulempEquipSelectUlEmployee.do?bankId="+bankId,
									params : {
										start : 0,
										limit : 10
									},
									method : 'post',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					}]
		});

		var window = new Ext.Window({
			title : '设备选择',
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
							var grid = Ext.getCmp('ULempEquipSelectorGrid');
							var rows = grid.getSelectionModel().getSelections();		
							var equipmentIds = '';
							var branchIds = '';
							var operatorIds = '';
							if(isSingle == null || isSingle == true){
									for (var i = 0; i < rows.length; i++) {
		
										if (i > 0) {
											equipmentIds += ',';
											branchIds += ',';
											operatorIds += ',';
										}
		
										equipmentIds += rows[i].data.equipmentId;
										branchIds += rows[i].data.branchId;
										operatorIds += rows[i].data.operatorId;
		
									}
							 }
							if (callback != null) {
								callback.call(this, equipmentIds, branchIds,operatorIds);
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