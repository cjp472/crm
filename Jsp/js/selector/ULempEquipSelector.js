/**
 *  
 * 员工维护设备选择器
 */
var ULempEquipSelector = {
	getView : function(callback, bankId) {
				var sm = null;
				sm = new Ext.grid.CheckboxSelectionModel();
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
							width : 70,
							hidden : true
						}, {
							header : "布放地点",
							dataIndex : 'equipmentName',
							width : 70
						},  {
							header : "柜员号",
							dataIndex : 'operatorId',
							width : 70
						},{
							header : "所属机构号",
							dataIndex : 'branchId',
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
            		text : '布放地点'
        		},{
	                name : 'equipmentName_S_LK',
	                id:'equipmentName',
	                xtype : 'textfield'
        		},{
        			text : '柜员号'
        		},{
					name : 'Q_operatorId_S_LK',
					id:'Q_operatorId',
					xtype : 'textfield'
	            },{
					xtype : 'button',
					text : '查询',
					iconCls : 'search',
					handler : function() {
					var equipmentName = Ext.getCmp('equipmentName').getValue();
					var operatorId = Ext.getCmp('Q_operatorId').getValue();
					//alert(equipmentName+operatorId);
					//通过监听重新刷新数据，在分页实现的查询的时候，为了防止第二遍查询的时候条件丢失，借用监听
					gridPanel.getStore().addListener({
						beforeload:function(store,records,options){
							store.baseParams = {
									equipmentName:equipmentName,
									operatorId:operatorId
									
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
							var searchPanel = Ext.getCmp('ULempEquipSelectorForm');
							searchPanel.getForm().reset();//清除SearchForm的值
						}
					
					}
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
								var grid = Ext.getCmp('ULempEquipSelectorGrid');
								var rows = grid.getSelectionModel().getSelections();
								var equipmentIds = '';
								var branchIds = '';
								var operatorIds = '';
								var EIds='';
									for (var i = 0; i < rows.length; i++) {
										if (i > 0) {
											equipmentIds += ',';
											branchIds += ',';
											operatorIds += ',';
											EIds += ',';
										}
										equipmentIds += rows[i].data.equipmentId;
										branchIds += rows[i].data.branchId;
										operatorIds += rows[i].data.operatorId;
										EIds += rows[i].data.EId;
									}								
								if (callback != null) {
									callback.call(this, equipmentIds, branchIds,operatorIds,EIds);
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