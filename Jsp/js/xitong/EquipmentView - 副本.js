//
///**
// * @author:nk
// * @class EquipmentView
// * @extends Ext.Panel
// * @description 设备管理列表
// * @company 科技有限公司
// * @createtime:2014-4-1
// */
EquipmentView = Ext.extend(Ext.Panel, {
	// 条件搜索Panel
	searchPanel : null,
	// 数据展示Panel
	gridPanel : null,
	// GridPanel的数据Store
	store : null,
	// 头部工具栏
	topbar : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		EquipmentView.superclass.constructor.call(this, {
					id : 'EquipmentView',
					title : '设备管理',
					//iconCls : 'menu-role',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor

	// 初始化组件
	initUIComponents : function() {		
		this.store=new Ext.data.SimpleStore({
		
			   url : __ctxPath + "/xitong/list4UlEmployee.do",
	          // url:__ctxPath + '/system/listEquipment.do',
	           autoLoad : true,
	          //roleId : -1
	           root : 'result',
			   totalProperty : 'totalCounts',
	           
	           fields:["EId", "equipmentId",
				        "equipmentName"
			       
			       ]		
			        });

		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			height : 35,
			region : 'north',
			frame : false,
			layoutConfig : {
				padding : '5',
				align : 'middle'
			},
			id : 'EquipmentSearchForm',
			layout : 'hbox',
			defaults : {
				xtype : 'label',
				border : false,
				margins : {
					top : 2,
					right : 4,
					bottom : 2,
					left : 4
				}
			},
			items : [{
            text : '机具号'
        }, {
        	id:'new_equipmentId',
        	dataIndex : 'equipmentId',
            name : 'Q_equipmentId_S_LK',
            xtype : 'textfield'
        }, {
			text : '网点名称'
		},{
			id:'new_equipmentName',
			dataIndex : 'equipmentName',
			name : 'Q_equipmentName_S_LK',
			xtype : 'textfield'
		},{
			xtype : 'button',
			text : __reset,
			scope : this,
			iconCls : 'btn-reset',
			handler : function() {
				var searchPanel = Ext.getCmp('EquipmentSearchForm');
				searchPanel.getForm().reset();
			}
		},{
				xtype : 'button',
	        	text : '查询',
				iconCls : 'search',
				scope:this,
				handler:function(){
					var equipmentId = Ext.getCmp('new_equipmentId').getValue();
					var equipmentName = Ext.getCmp('new_equipmentName').getValue();
					this.store.load({// 刷新数据，并传值
						params:{
							id:equipmentId,
							name:equipmentName
						}
					});
			
			
			
		}
		}
		
		
		]
//			
	
//						
		});// end of the searchPanel
		
		this.store.load({
			params : {
				start : 0,
				limit : 25
			}
});
		
		
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			//columns : [{
			columns : [new Ext.grid.RowNumberer(), sm, {
				header : 'EId',
				dataIndex : 'EId',
				hidden : true
			}, {
				header : "机具号",
				dataIndex : 'equipmentId',
				width :50
			}, {
				header : "网点名称",
				dataIndex : 'equipmentName',
				width :50
			},{
				header : '管理',
				dataIndex : 'EId',
				width : 20,
				renderer : function(value, metadata, record, rowIndex,
						colIndex) {
					var editId = record.data.EId;
					var equipmentId = record.data.equipmentId;
					var equipmentName = record.data.equipmentName;
					//var isDefaultIn = record.data.isDefaultIn;
					var str = '';
					
				if (editId != -1) {
					if(isGranted('_EquipmentEdit')){
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="EquipmentView.edit('
							+ editId + ',\'' + equipmentId + '\''+',\''+equipmentName+'\')"></button>';
					}
//						if (isGranted('_EquipmentEdit'))
//							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="EquipmentView.edit('
//								+ editId + ',\''
//								+ equipmentName
//								+ '\')"></button>';
//						if (isGranted('_EquipmentGrant'))
//							str += '&nbsp;<button title="授权" value=" " class="btn-grant" onclick="EquipmentView.grant('
//									+ editId
//									+ ',\''
//									+ roleName
//									+ '\')">&nbsp;</button>';
						if (isGranted('_EquipmentDel'))
							str += '<button title="删除" value=" " class="btn-del" onclick="EquipmentView.remove('
									+ editId + ')"></button>';

					
					}
					return str;
				}
			}],
			  defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});// end of cm
		
		this.gridPanel = new Ext.grid.GridPanel({
			id : 'EquipmentGrid',
			region : 'center',
			tbar : this.topbar(),
			store : this.store,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			// fbar : this.footbar(),
			cm : cm,
			sm : sm,
			// customize view config
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			},

			// paging bar on the bottom
			//bbar : new HT.PagingBar({store : this.store})
			bbar : new HT.PagingBar({store : this.store})
		});
		this.gridPanel.addListener('rowdblclick', function(grid, rowindex, e) {
					grid.getSelectionModel().each(function(rec) {
						if (rec.data.EId != -1) {
							EquipmentView.edit(rec.data.EId);
						}
					});
				});

	}// end of the initUIComponents


});
//
///**
// * 建立操作的Toolbar
// */
EquipmentView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'EquipmentFootBar',
				height : 30,
				bodyStyle : 'text-align:right',
				items : []
			});
	if (isGranted('_EquipmentAdd')) {
		toolbar.add('->',new Ext.Button({
					iconCls : 'btn-add',
					text : '添加',
					handler : function() {
						new EquipmentForm().show();
					}
				}));
	}

	/*选中id之后，根据id批量删除  2014-4-16 nk
	 * */
	if (isGranted('_EquipmentDel')) {
		toolbar.add('-',new Ext.Button({
					iconCls : 'btn-del',
					text : '删除',
					handler:function(){
			       var grid = Ext.getCmp("EquipmentGrid");
			       var rows = grid.getSelectionModel().getSelections();
                   //var rows = grid.getSelectionModel().getSelections();
                   if (rows != null && rows.length > 0) {
                   var ids = new Array();
                   for (var i = 0; i < rows.length; i++)
                       ids.push(rows[i].data.EId);
               }
			   Ext.Msg.confirm('删除信息确认', '亲！你确定批量删除信息吗？', function(btn) {
				if (btn == 'yes') {
          
             Ext.Ajax.request({
        	   url : __ctxPath + '/xitong/multiDel3UlEmployee.do',
               params : {
                   ids : ids
               },
               method : 'post',
               success : function(result, request) {
                    var res = Ext.util.JSON.decode(result.responseText);
                    if (res.success == false) {
                      Ext.ux.Toast.msg('操作信息', '业务资料'+res.data+'存在关联，删除失败。\n其余用户成功删除');
                  // Ext.ux.Toast.msg('操作信息', '亲！\n没有选中所要删除的信息！请您选中之后在删除');
                    } else {
                       Ext.ux.Toast.msg('操作信息', '删除成功!');
                    }
                    Ext.getCmp('EquipmentGrid').getStore().reload();
               }
          });
//		
	
}
});

		}
				}));
	}

	return toolbar;
};

//
///*删除单个记录2014-4-5
// * */
//
EquipmentView.remove = function(id) {
	//alert(id);
	var grid = Ext.getCmp("EquipmentGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						        url : __ctxPath + '/xitong/multiDel3UlEmployee.do',
								//url : __ctxPath + '/flow/multiDelProcessRun.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
									grid.getStore().reload({params : {start : 0,limit : 25}});
								}
							});
				}
			});
};


//
///**
// * 编辑设备管理 2014-4-13
// * */
EquipmentView.edit = function(id,equipmentId,equipmentName){
	new editWindow(id,equipmentId,equipmentName);
	
};
//EquipmentView.edit = function(id,equipmentId,equipmentName){
//	alert(id+'===='+equipmentId+'====='+equipmentName);
//	new EquipmentShowForm(id,equipmentId,equipmentName).show();
//	
//};

var editWindow = function(id,equipmentId,equipmentName){
	//alert(id+'======'+equipmentId+'---------'+equipmentName);
	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/xitong/get3UlEmployee.do',
		// url : __ctxPath + "/xitong/list3UlEmployee.do",
				//url : __ctxPath+ '/system/createPasswordAppUser.do',
		layout : 'form',
		id : 'xxx',
		frame : true,
//	        	defaultType : 'textfield',
				items : [{
					       fieldLabel : '编号',
							//name : 'EId',
							id : 'eid_num',
							readOnly : true,
							xtype:'textfield',
							value :id
							
						}, 
						{
							fieldLabel : '机具号',
							//name:'equipmentId',
							id:'newequipmentId',
							allowBlank : false,
							blankText: '温馨提示：机具号不允许为空',
							xtype : 'textfield',
						    //readOnly : true,
							value :equipmentId
						},
			
						{
							fieldLabel : '网点名称',
							allowBlank : false,
							blankText: '温馨提示：网点名称不允许为空',
							id:'newequipmentName',
							xtype : 'textfield',
//							readOnly : true,
							value :equipmentName
						}
						]
			});
			
	var setPassword = new Ext.Window({
		title :"修改设备的信息",
		iconCls:'btn-edit',
		width : 350,
		height : 200,
		modal: true,
		layout : 'fit',
		buttonAlign : 'center',
		items:[formPanel],
		buttons :  [{
			iconCls : 'btn-save',
			text : '保存',
			xtype : 'button',
			//scope : this,
			handler : function() {
			//alert("_____");
			var grid = Ext.getCmp("EquipmentGrid");
			    var fp = Ext.getCmp('editWindow');
			    var EId=Ext.getCmp('eid_num').getValue();
				var equipmentId = Ext.getCmp('newequipmentId').getValue();
				var equipmentName = Ext.getCmp('newequipmentName').getValue();
//				alert(equipmentName+"---"+equipmentId);
				Ext.Ajax.request({
					url : __ctxPath + '/xitong/check3UlEmployee.do',
					params : {
					     EId:EId,
						 id:equipmentId,
						 name : equipmentName
					},
					method : 'post',
					waitMsg : '正在提交数据...',
					success : function(result, request) {
	                    var res = Ext.util.JSON.decode(result.responseText);
	                    if (res.success == true) {
	                      // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
	                      
	                    Ext.ux.Toast.msg('温馨提示', '亲!恭喜您，修改成功！');
	                    setPassword.close();
	                    //Ext.getCmp('EquipmentFormWin').close();
	                    } else if(res.success==false){
	                    	 Ext.ux.Toast.msg('温馨提示', '亲!机具号重复或网点名称或机具号为空，\n请重新输入！');
	                    	//var flag=0;
	                    	//var flag=1;
	                      // Ext.ux.Toast.msg('操作信息', '亲！\n网点名称或机具号重复，请您重新添加！!');
//	                    	if(flag==){
//	                    		Ext.Msg.alert("信息提示","该机具号或网点名称重复，请修改！");
//	                    	}else if(flag==1){
//	                    		Ext.Msg.alert("信息提示","该网点名称重复，请修改！");
//	                    	}
	                    	
	                    	
	                    }
	                    Ext.getCmp('EquipmentGrid').getStore().reload();
	                }
//					success : function(fp,action) {
//						Ext.ux.Toast.msg('操作信息', '亲！恭喜您 ！修改成功！');
//						setPassword.close();
//						Ext.getCmp('EquipmentGrid').getStore().reload();//刷新页面
//					},
//					failure : function(fp,action) {
//						Ext.ux.Toast.msg('错误提示',action.result.msg);
//						Ext.getCmp('editWindow').getForm().reset();
//					}
									
				});
			}
		},{
			text : '取消',
			iconCls:'btn-cancel',
			handler : function() {
				setPassword.close();
			}
	}]

			});

	
	setPassword.show();
};











































