Ext.ns('BankTypeView');

var BankTypeView = function() {
	return this.setup();
};

BankTypeView.prototype.setup = function() {
	var selected;
	var Tstatus;
	var TknowTmpId;
	var store = this.initData();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, {
					header :'编号',
					dataIndex : 'bankTypeId',
					hidden : true
				}, {
					header : '机构名称',
					sortable : true,
					dataIndex : 'bankname',
					width : 80
				},{
					header : '上级机构',
					dataIndex : 'parentName',
					sortable : false,
					menuDisabled : false
				},
				{

					header : '网点号',
					sortable : true,
					dataIndex : 'branchId',
					width : 60
				
				},{
					header : __ukKnowTypeKnowTypeStatus,
					dataIndex : 'bankTypeStatus'
					,renderer : function(value) {
						Tstatus = value;
						return KNOW_STATUS.get(value);
					},
					width : 50
				},
//				{
//
//					header : __ukKnowTypeCreateBy,
//					sortable : true,
//					dataIndex : 'createBy',
//					width : 60
//				
//				},{
//
//					header : __ukKnowTypeCreateDate,
//					sortable : true,
//					dataIndex : 'createDate',
//					width : 60
//				
//				},{
//
//					header : __ukKnowTypeUpdateBy,
//					sortable : true,
//					dataIndex : 'updateBy',
//					width : 60
//				
//				}
				
				{

					header : "路径",
					sortable : true,
					dataIndex : 'path',
					hidden : true,
					width : 60
				
				},
				{
					header : '管理',//__menuViewUkKnowTypes
					dataIndex : 'bankTypeId',
					sortable : true,
					width : 40,
					renderer : function(bankTypeId, metadata, record, rowIndex,
							colIndex, store) {
						var status = record.data.bankTypeStatus;
						var bankname = record.data.bankname;
						var parentName = record.data.parentName;
						var branchId = record.data.branchId;
						if (bankTypeId) {
							var str = '';
//							if (isGranted('_UknowTypeDel')) {
								if(status != 1){
									str += '&nbsp;<button title="启用" value=" " class="btn-setting" onclick="BankTypeView.remove('
									+ bankTypeId + ',1' + ')"></button>';
								} else {
									str += '<button title="删除" value=" " class="btn-del" onclick="BankTypeView.remove('+ bankTypeId + ',2' + ')"></button>';
								}
								
//							} else {
//								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
//							}
//							if (isGranted('_UknowTypeEdit')) {
								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="BankTypeView.edit('
									+ bankTypeId + ',\'' 
									+ parentName + '\''+',\''
									+ branchId + '\''+',\''
									+bankname+'\')"></button>';
								//str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="BankTypeView.edit('+ bankTypeId +')"></button>';
//							} else {
//								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
//							}
							
							return str;
						}
					}
				}],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
//		,
//		listeners : {
//			hiddenchange : function(cm, colIndex, hidden) {
//				saveConfig(colIndex, hidden);
//			}
//		}
	});

	var grid = new Ext.grid.GridPanel({
				// TODO grid数据展示
				region : 'center',
				id : 'UkKWTypeView',
				tbar : new Ext.Toolbar({
							defaultType : 'button',
							items : [ '->',{
										text : '增加',
										iconCls : 'btn-add',
										handler : function() {
											var node = Ext.getCmp('bankTypeTreePanel').getSelectionModel().getSelectedNode();
											
											if (node == null) {
												Ext.ux.Toast.msg("操作信息", "请选择所属行分类!");
												return;
											}else {
												 
												BankTypeView.add(node.id);
											}
//											if (rows != null && rows.length == 1) {
////												var ids = new Array();
////												for (var i = 0; i < rows.length; i++)
////												ids.push(rows[i].data.knowTypeId);
//												BankTypeView.add(rows[0].data.knowTypeId);
//											} else if(rows.length < 1){
//												BankTypeView.add(0);
//											} else {
//												Ext.ux.Toast.msg(__actioninfo, __ukKnowTypeCopyTishi);
//											}
										}
//									},{
//										text : '启用',
//										iconCls : 'btn-setting',
//										handler : function() {
//											BankTypeView.multiStart();
//										}
//									},{
//										text : '复制', // __ukKnowTypecopy,
//										iconCls : 'assets-type',
//										handler : function(){
//											BankTypeView.copyto();
//											//BankTypeView.copynode();
//										}
									}
									,{
										text : '删除', //
										iconCls : 'btn-del',
										handler : function(){
											var grid = Ext.getCmp('UkKWTypeView');
											var rows = grid.getSelectionModel().getSelections();
											if (rows != null && rows.length > 0) {
												var ids = '';
												for (var i = 0; i < rows.length; i++){
													ids+=rows[i].data.bankTypeId;
													ids+=',';
												}
												BankTypeView.remove(ids,2);
											} else {
												Ext.ux.Toast.msg('操作提示', '请选择需要注销的数据!');
											}
											
											
											//BankTypeView.movenode();
										}
									}
									]
						}),
				height : 800,
				title : '总行', //__ukKnowTypeListHeading,
				store : store,
				shim : true,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				cm : cm,
				sm : sm,
				stateful:true,  
			    stateId: 'cookieUkKWTypeViewgrid',
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				},
				// paging bar on the bottom
				bbar : new HT.PagingBar({
							store : store
						})
			}); // end of this grid
	//双击编辑该行
	grid.addListener('rowdblclick', rowdblclickFn);
	function rowdblclickFn(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			BankTypeView.edit(rec.data.bankTypeId,rec.data.parentName,rec.data.branchId,rec.data.bankname);
		});
	}
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	var treePanel = new Ext.tree.TreePanel({
				// TODO treePanel[机构信息列表]
				region : 'west',
				id : 'bankTypeTreePanel',
				title : '总行分类列表',//__ukKnowTypeListHeading,
				collapsible : true,
				autoScroll : true,
				split : true,
				height : 800,
				width : 180,
				tbar : new Ext.Toolbar({
							items : [{
										xtype : 'button',
										iconCls : 'btn-refresh',
										text : '刷新',
										handler : function() {
											treePanel.root.reload();
										}
									}, '-', {
										xtype : 'button',
										text : '展开',
										iconCls : 'btn-expand',
										handler : function() {
											treePanel.expandAll();
										}
									}, '-', {
										xtype : 'button',
										text : '收起',
										iconCls : 'btn-collapse',
										handler : function() {
											treePanel.collapseAll();
										}
									}]
						}),
				loader : new Ext.tree.TreeLoader({
					url : __ctxPath + "/customer/BankListTreeConHis.do"
							//url : __ctxPath + '/know/listUkKnowType.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					'click' : BankTypeView.clickNode
				}
			}); // end of this treePanel

//	if (isGranted('_UknowTypeAdd') || isGranted('_UknowTypeEdit')
//			|| isGranted('_UknowTypeDel')) {
		// 树的右键菜单
		//treePanel.on('contextmenu', contextmenu, treePanel);
//	}

	function contextmenu(node, e) {
		selected = new Ext.tree.TreeNode({
					id : node.id,
					text : node.text
				});
		// 创建右键菜单
		var treeMenu = new Ext.menu.Menu({
					// id : 'DepartmentTreeMenu',
					items : []
				});
		treeMenu.clearMons();
//		if (isGranted('_UknowTypeAdd')) {
			treeMenu.add({
						text : __create,
						iconCls : 'btn-add',
						scope : this,
						handler : createNode
					});
//		}
//		if (isGranted('_UknowTypeEdit')) {
//			treeMenu.add({
//						text : __edit,
//						iconCls : 'btn-edit',
//						scope : this,
//						handler : editNode
//					});
//		}
//		if (isGranted('_UknowTypeDel')) {
			treeMenu.add({
						text : __ukKnowTingyong,
						iconCls : 'btn-delete',
						scope : this,
						handler : deteleNode
					});

//		}

		treeMenu.showAt(e.getXY());
	}
	/**
	 * 菜单事件
	 
	function createNode() {
		var nodeId = selected.id;
		BankTypeView.add(nodeId);
	}
	
	
	function deteleNode() {
		var bankTypeId = selected.id;
		if (bankTypeId > 0) {
			BankTypeView.remove(bankTypeId, 2);
		} else {
			Ext.ux.Toast.msg(__actioninfo, "默认根分类不能被删除");//树形暂不提供增删改，暂时不国际化
		}
	}
	*/
	
//	function editNode() {
//		var bankTypeId = selected.id;
//		var node = Ext.getCmp('bankTypeTreePanel').getSelectionModel().getSelectedNode();
//		var bankname = node.text;
//		//alert(bankTypeId+node+bankname);
//		if (bankTypeId > 0) {
//																																(bankTypeId,parentName,bankname);
//		} else {
//			Ext.ux.Toast.msg(__actioninfo, "默认根分类不能修改！");
//		}
//
//	}

	var panel = new Ext.Panel({
				// TODO panel BankTypeView总面板
				id : 'BankTypeView',
				title : '总行分类列表',//__ukKnowTypeListHeading,
				closable : true,
				iconCls : 'menu-dutyRegister',
				layout : 'border',
				items : [treePanel, grid],//searchPanel
				keys : [{
							key : Ext.EventObject.ESC,
							fn : BankTypeView.reset,
							scope : this
						}, {
							key : Ext.EventObject.ENTER,
							fn : BankTypeView.search,
							scope : this
						}]
			});
	return panel;
};

/**
 * Store对象
 */
BankTypeView.prototype.initData = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : __ctxPath + "/customer/treeListConHis.do"
//							url : __ctxPath + '/know/list_child_detailUkKnowType.do'  //list_childDepUlDepartment.do
							//url : __ctxPath + '/know/treeListUkKnowType.do'  //list_childDepUlDepartment.do
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : [ {
								name : 'bankTypeId',
								type : 'int'
							}, 'bankname','parentId', 'branchId', 'path', 'bankTypeStatus', 'createBy',
									'createDate', 'parentName']
						}),
				remoteSort : true
			});
	store.setDefaultSort('id', 'desc');
	return store;
};



BankTypeView.add = function(bankTypeId) {
	var node = Ext.getCmp('bankTypeTreePanel').getSelectionModel().getSelectedNode();
	var text = node.text;
	var str=text;
	var str1='支行';
	var str5='营业部';
	 //var str1 = str.substring(0, str.lastIndexOf('支行'));
	var str2 = str.substring(str.length-2,str.length);
	var str6 = str.substring(str.length-3,str.length);
	if(str1==str2 || str5==str6 || text=='客服中心'){
		//Ext.MessageBox.alert("温馨提示框","支行\营业部没有权限添加下级部门！\n请选择支行或营业部以上的部门添加！"); 
		Ext.MessageBox.alert("温馨提示框","该部门下不能添加下级部门！");
	//}else if(str5==str6){
	//	Ext.MessageBox.alert("温馨提示框","支行\营业部没有权限添加下级部门！\n请选择支行或营业部以上的部门添加！"); 
	}else{	
	  if (bankTypeId > 0) {
		new BankTypeForm({//引用UkKnowTypeForm.js line9 声明的变量名
			nodeId : bankTypeId,
			nodeText : text
		}).show();
	 } else {
		new BankTypeForm({
			nodeId : 0,
			nodeText : text
		}).show();
	}
	
	
	
	
	
//			var node = Ext.getCmp('bankTypeTreePanel').getSelectionModel().getSelectedNode();
//			var text = node.text;
//			var str=text;
//			var str4='总行';
//			var str3='分行';
//			var str1='支行';
//			var str5='营业部';
//			var str2 = str.substring(str.length-2,str.length);
//			var str6 = str.substring(str.length-3,str.length);
//			if(str4==str2 && bankTypeId > 0){
//				Ext.MessageBox.alert('温馨提示框','总行下只能添加分行机构部门的信息！',function(btn){ 
//				 //Ext.MessageBox.alert("温馨提示框","总行下只能添加分行机构部门的信息！"); 
//				new BankTypeForm({//引用UkKnowTypeForm.js line9 声明的变量名
//					nodeId : bankTypeId,
//					nodeText : text
//				 }).show();
//				 }); 
//	        }else if(bankTypeId > 0 && str3==str2){
//	        	 Ext.MessageBox.alert('温馨提示框','分行下只能添加分行以下的机构部门信息！',function(btn){  
//	        	// Ext.MessageBox.alert("温馨提示框","分行下只能添加分行以下的机构部门信息！"); 
//	        	 new BankTypeForm({//引用UkKnowTypeForm.js line9 声明的变量名
//						nodeId : bankTypeId,
//						nodeText : text
//					}).show();
//	        	 }); 
//	       }else if(str1==str2 && bankTypeId > 0){
//	    	   Ext.MessageBox.alert("温馨提示框","支行\营业部没有权限添加下级部门！\n请选择支行或营业部以上的部门添加！"); 
//	      }else if(str5==str6 && bankTypeId > 0){
//	    	  Ext.MessageBox.alert("温馨提示框","支行\营业部没有权限添加下级部门！\n请选择支行或营业部以上的部门添加！");
//	    	  
//	      }else{
//	    	  
//	    	 // Ext.MessageBox.alert("温馨提示框","默认根分类下只能添加总行的机构部门的信息！"); 
//	    	  Ext.MessageBox.alert('温馨提示框','默认根分类下只能添加总行的机构部门的信息',function(btn){  
//	    		  new BankTypeForm({
//						nodeId : 0,
//						nodeText : text
//					}).show();  
//	    	   });  

				
	     }
			Ext.getCmp('bankTypeTreePanel').root.reload();
        	Ext.getCmp('UkKWTypeView').getStore().reload();
				
};

















//BankTypeView.add = function(bankTypeId) {
//		var node = Ext.getCmp('bankTypeTreePanel').getSelectionModel().getSelectedNode();
//		var text = node.text;
//		var str=text;
//		var str1='支行';
//		 //var str1 = str.substring(0, str.lastIndexOf('支行'));
//		var str2 = str.substring(str.length-2,str.length);
//		if(str1==str2){
//			alert("亲！支行没有权限添加下级部门！\n请选择支行以上的部门添加");
//			
//		}else{	
//		  if (bankTypeId > 0) {
//			new BankTypeForm({//引用UkKnowTypeForm.js line9 声明的变量名
//				nodeId : bankTypeId,
//				nodeText : text
//			}).show();
//		 } else {
//			new BankTypeForm({
//				nodeId : 0,
//				nodeText : text
//			}).show();
//		}
//		
//	}
//		Ext.getCmp('bankTypeTreePanel').root.reload();
//		Ext.getCmp('UkKWTypeView').getStore().reload();
//};
BankTypeView.edit = function(id,parentName,branchId,bankName){
	//alert("id"+id+"parentName"+parentName+"bankName"+bankName);
	new BankTypeeditWindow(id,parentName,branchId,bankName);
	
};



var BankTypeeditWindow = function(id,parentName,branchId,bankName){
	//alert("id"+id+"parentName"+parentName+"bankName"+bankName);
	var formPanel = new Ext.FormPanel({
		//url : __ctxPath + '/xitong/get3UlEmployee.do',
		layout : 'form',
		//id : 'xxx1',
		frame : true,
//	        	defaultType : 'textfield',
				items : [{
					       fieldLabel : '编号',
							//name : 'EId',
							id : 'eid_num',
							readOnly : true,
							xtype : 'hidden',
							width : 200,
							height : 25,
							value :id
							
						}, 
						{
							fieldLabel : '上级机构',
							//name:'equipmentId',
							id:'newparentName',
							allowBlank : false,
							//blankText: '温馨提示：机具号不允许为空',
							xtype : 'textfield',
						    readOnly : true,
						    width : 200,
							height : 25,
							disabled:true,
							value :parentName
						},
			
						{
							fieldLabel : '机构名称',
							allowBlank : false,
							blankText: '温馨提示：机构名称不允许为空',
							id:'newbankName',
							xtype : 'textfield',
							width : 200,
							height : 25,
//							readOnly : true,
							value :bankName
						},{
						    id:'pan_thsj',
						    //bodyStyle : 'padding:5px;',
							//labelAlign : "right",
							//labelWidth:50,
				             xtype:'panel',
				             baseCls:"x-plain",
				             layout:'form',
				            // anchor:'98%',
				             items:[{
				            	    fieldLabel : '网点号',
									allowBlank : false,
									blankText: '温馨提示：网点号不允许为空',
									id:'suoshuhang.branchId',
									xtype : 'textfield',
									width : 200,
									height : 25,
//									readOnly : true,
									value :branchId,
									listeners : {
										render : function(){
									       var nodeId = Ext.getCmp('newparentName').getValue();
									     
									           //alert("listeners"+nodeId);
									           if(nodeId=='总行' ||nodeId=='电子银行部' ){
									        	   Ext.getCmp("pan_thsj").hide();
									        	  
									        	  // Ext.getCmp('suoshuhang.branchId').show();//当为上级为总行时，显示网点号
									        	  
									           }else{
									        	   Ext.getCmp("pan_thsj").show();
									        	  // Ext.getCmp('suoshuhang.branchId').setVisible(false);//当不为上级为总行时，不显示网点号
									           }
										}
									}

								}]
						}
//						},{
//							fieldLabel : '<font style="color:red">*</font>网点号',
//							width : 300,
//							height : 25,
//							xtype:'textfield',
//							name : 'suoshuhang.branchId',
//							id : 'suoshuhang.branchId',
//							readOnly : true,
//							value :'',
//							listeners : {
//								render : function(){
//							       var nodeId = Ext.getCmp('newparentName').getValue();
//							           alert("listeners"+nodeId);
//							           if(nodeId!='总行'){
//							        	   Ext.getCmp('suoshuhang.branchId').show();//当不为上级为总行时，显示网点号
//							        	  
//							           }else{
//							        	   Ext.getCmp('suoshuhang.branchId').setVisible(false);//当为上级为总行时，不显示网点号
//							           }
//								}
//							}
//						}
						]
			});
			
	var setBankType = new Ext.Window({
		title :"修改机构的信息",
		iconCls:'btn-edit',
		width : 350,
		height : 280,
		minWidth : 400,
		minHeight : 300,
		modal: true,
		layout : 'fit',
		buttonAlign : 'center',
		items:[formPanel],
		buttons :  [{
			iconCls : 'btn-save',
			text : '保存',
			xtype : 'button',
        	handler : function() {
			var grid = Ext.getCmp("UkKWTypeView");
			    var fp = Ext.getCmp('editWindow');
			    var bankTypeId=Ext.getCmp('eid_num').getValue();
				var parentName = Ext.getCmp('newparentName').getValue();
				var bankName = Ext.getCmp('newbankName').getValue();
				var branchId = Ext.getCmp('suoshuhang.branchId').getValue();
      			var update_Date=new Date().pattern("yyyy-MM-dd HH:mm:ss");
      			//alert(update_Date);
				Ext.Ajax.request({
					url : __ctxPath + "/customer/updateBankTypeConHis.do",
					//url : __ctxPath + '/xitong/check3UlEmployee.do',
					params : {
					     bankTypeId:bankTypeId,
					     parentName:parentName,
					     bankName : bankName,
					     update_Date:update_Date,
					     branchId:branchId
					},
					method : 'post',
					waitMsg : '正在提交数据...',
					success : function(result, request) {
	                    var res = Ext.util.JSON.decode(result.responseText);
	                    if (res.success == true) {
	                      // Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
	                      
	                    Ext.ux.Toast.msg('温馨提示', '亲!，修改成功！');
	                    setBankType.close();
	                    //Ext.getCmp('EquipmentFormWin').close();
	                    } else if(res.success==false){
	                    	 Ext.ux.Toast.msg('温馨提示', '亲!机构名称为空，\n请输入！');
	                    	
	                    }
	                    Ext.getCmp('UkKWTypeView').getStore().reload();
	                }
							
				});
			}
		},{
			text : '取消',
			iconCls:'btn-cancel',
			handler : function() {
			setBankType.close();
			}
	}]

			});

	
	setBankType.show();
};















//BankTypeView.edit = function(bankTypeId) {
////	alert(bankTypeId);
////	var ukknowtypeFormWin = Ext.getCmp('BankTypeFormWin');
////	if (ukknowtypeFormWin == null) {//如果框不存在，则生成一个，然后获取它
////		//TODO 传递id给form页
////		new BankTypeForm({
////			bankTypeId : bankTypeId
//////			knowTypeStatus : knowTypeStatus,
//////			knowTmpId : knowTmpId
////		}).show();
////		ukknowtypeFormWin = Ext.getCmp('BankTypeFormWin');
//	}
	
//	var tabs = Ext.getCmp('centerTabPanel');
//	var aForm = Ext.getCmp('UkKnowTypeFormWin');
//	if (aForm != null) {
//		tabs.remove('UkKnowTypeFormWin');
//	}
//	aForm = new UkKnowTypeForm({
//		knowTypeId : knowTypeId
//	});
//	aForm.setTitle('模板:' + knowTypeId + '详情');
//	tabs.add(aForm);
//	tabs.activate(aForm);
//	ukknowtypeFormWin.formPanel.load({
//		url : __ctxPath + '/know/detailUkKnowType.do',
//		params : {
//			knowTypeId : knowTypeId	
//		},
//		method : 'post',
//		deferredRender : true,
//		layoutOnTabChange : true,
//		success : function() {
//
//		},
//		failure : function() {
//			Ext.ux.Toast.msg('编辑', '载入失败');
//		}
//	});
	
//	Ext.getCmp('bankTypeTreePanel').root.reload();
//	Ext.getCmp('UkKWTypeView').getStore().reload();
//};



/**
 * 停用/启用知识分类nk
 */
BankTypeView.remove = function(bankTypeId, opts) {//opts: 0--未启用； 1--启用；2--停止
	//alert(bankTypeId);
	var infos = '';
	if(opts == 1){
		infos = '你确定要启用该机构吗？';
	} else {
		infos = '你确定要删除该机构吗？';
	}
	Ext.Msg.confirm(__actioninfo, infos, function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/customer/multiDelBankConHis.do?bankTypeId='
					+ bankTypeId + '&opts=' + opts,
				//url : __ctxPath + "/customer/treeListConHis.do"
				success : function(result, request) {
					var res = Ext.util.JSON.decode(result.responseText);
					if (res.success == false) {
						Ext.ux.Toast.msg('操作信息', res.message);
					} else {
                        if(opts == 2){
                        	Ext.ux.Toast.msg('操作信息', res.message);
						 // Ext.ux.Toast.msg(__actioninfo,'你已成功删除该机构部门。' );
                        }else{
                          Ext.ux.Toast.msg(__actioninfo, '你已成功启用该机构。');
                        }
					}
					Ext.getCmp('bankTypeTreePanel').root.reload();
					Ext.getCmp('UkKWTypeView').getStore().reload();
				},
				failure : function(result, request) {}
			});
		}
	});
};

/**
 * 节点单击事件
 * 
 * @param node
 */
BankTypeView.clickNode = function(node) {
	//alert("BankTypeView.clickNode"+node);
	BankTypeView.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
BankTypeView.select = function(node) {
	var users = Ext.getCmp('UkKWTypeView');
	users.setTitle(node.text + '机构分类列表');
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






