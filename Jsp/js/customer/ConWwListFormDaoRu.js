var ConWwListFormDaoRu = function(){
	var storeLine = null;
	var columnCount = 0;
	var idCount = 0;
	var intCount = 0;
	var getPanel = function(id){
		var CondPanel = new Ext.Panel({
		layout:'column',
		id:'wwListPanel'+id,
		border:false,
		style:'padding-top:3px',
		items:[{
				columnWidth:.3,
				xtype : 'mtdiccombo',
				editable : true,
				lazyInit : false,
				forceSelection : false,
				itemKey : 'CONFX',
				anchor:'100%'
			},{
				columnWidth:.3,
				xtype : 'mtdiccombo',
				editable : true,
				lazyInit : false,
				forceSelection : false,
				itemKey : 'CONFX',
				anchor:'100%'
			},{
				xtype:'textfield',
				columnWidth:.3
			},{
				columnWidth:.1,
				id:'wwListButton'+id,
				xtype:'button',
				iconCls:'btn-del',
				handler:function(){
					var ii = this.id.substring(6,this.id.length)
					Ext.getCmp('daorutiaojian1').remove('wwListPanel'+ii);
					Ext.getCmp('daorutiaojian1').doLayout();
				}
			}]
		
	})
	return CondPanel;
	}
	
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/loadColumnsDictionary.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : ['itemValue', 'itemIndex']
						}),
				listeners : {
					'load' : function() {
						columnCount = store.data.items.length;
						storeLine = ConWwListFormDaoRu.initFileColumn(columnCount);
						cm.columns[1].editor = new Ext.form.ComboBox({
//						cm.columns[1].editor = new Ext.form.TextField({
//							xtype : 'textfield'
							xtype : 'combo',
							editable : false,
							mode : 'local',
							triggerAction : 'all',
							store : storeLine,
							editable : true,
							valueField : 'columnId',
							displayField : 'columnId',
							anchor : '100%'
						})
					}
				},
				remoteSort : true
			});
		
		var cm = new Ext.grid.ColumnModel({
			columns : [ {
						header : '字段列',
						dataIndex : 'itemValue'
					},{
						header : '文件列',
						dataIndex : 'fileColumn',
						editor : new Ext.form.TextField({
							id : 'ConWwList.columnId',
							value : '',
							anchor : '100%'
						}),
						renderer : function() {
							var displayText = '';
							var value = Ext.getCmp('ConWwList.columnId');
							displayText = intCount+1;
							value.setValue(intCount+1);
							intCount++;
							return displayText;
						}
					}]
		});
	
		gridPanel = new Ext.grid.EditorGridPanel({
					id : 'ConWwListFormDaoRuGridPanel',
					store : store,
					shim : true,
					height:380,
					autocroll:true,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					clicksToEdit : 1,
					cm : cm,
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					}
				});
	var win = new Ext.Window({
		title : '导入白名单',
		height : 500,
		width : 700,
		layout : 'fit',
		id : 'ConWwListDaoRubmdWin',
		modal : true,
		buttonAlign:'right',
		buttons:[{
			text:'确定',
			iconCls:'btn-save',
			handler : function() {
				ConWwListFormDaoRu.toImport();
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler : function() {
				win.close();
			}
		}],
		items : [{
			border : false,
			xtype : 'container',
			defaults : {
				border : false,
				anchor : '100%,100%'
			},
			items : [{
				layout : 'column',
				style : 'padding:10px;background-color:#fff',
				items : [{
					columnWidth : .5,
					border : false,
					items : [{
								layout : 'column',
								border : false,
								style:'margin-bottom:10px',
								items : [{
											columnWidth:.2,
											html : '导入方案：',
											border : false,
											style : 'text-align:right;padding-top:3px'
										}, {
											xtype : 'mtdiccombo',
											id : 'ConWwListDaoRu.importTypeCombo',
											columnWidth : .8,
											editable : true,
											lazyInit : false,
											allowBlank : false,
											forceSelection : false,
											itemKey : 'BW_IMPORT_PROJECT',
											anchor : '100%',
											listeners : {
												'select' : function() {
													var combo = Ext.getCmp('ConWwListDaoRu.importTypeCombo');
													var paramObj = {
														itemName : combo.getRawValue()
													};
													store.url = __ctxPath
															+ '/system/loadColumnsDictionary.do';
													store.reload({
																params : paramObj
															});
												}
											}
										}]
							},gridPanel]
				},{
					columnWidth:.5,
					border:false,
					items:[{
//						xtype:'fieldset',
//						title : "导入条件",
//						collapsed : false,
//						tbar:[{
//							text:'添加',
//							iconCls:'btn-add',
//							handler:function(){
//								Ext.getCmp('daorutiaojian1').add(getPanel(idCount));
//								Ext.getCmp('daorutiaojian1').doLayout();
//								idCount++;
//							}
//						}],
//						//collapsible : true,
//						autoHeight : true,
//						//height:260,
//						defaults : {
//							anchor : '100%,100%'
//						},
//						items:[{
//							border:false,
//							height:215,
//							id:'daorutiaojian1',
//							items:[]
//							
//						}]
					},{
					xtype:'fieldset',
					title : "导入设置",
					collapsed : false,
					//collapsible : true,
					autoHeight : true,
					defaults : {
						anchor : '100%,100%'
					},
					items:[new Ext.FormPanel({
						id : 'ConWwListDaoRu.uploadForm',
						baseCls : 'x-plain',
						labelWidth : 75,
						fileUpload : true,
						method : 'POST',
						enctype : 'multipart/form-data',
						items : [{
									fieldLabel : '文件类型',
									id : 'ConWwListFormDaoRu.fileType',
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'DAORUWJ',
									anchor : '100%'
								}, {
									xtype : 'textfield',
									fieldLabel : '文件路径',
									id : 'ConWwListFormDaoRu.filePath',
									anchor : '80%',
									name : 'filePath',
									inputType : 'file',
									allowBlank : false
								}, {
									fieldLabel : '分隔符',
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'FENGEFU',
									anchor : '100%'
								}]
						})]
					}]
				}]
	
			}]
		}]
	})
//	Ext.getCmp('ConWwListDaoRu.importTypeCombo').setValue('1');

	win.show();
}

// 初始化文件列
ConWwListFormDaoRu.initFileColumn = function(columnCount) {
	var columnStr = '[{id:0},';
	for (var i = 0; i < columnCount; i++) {
		columnStr += '{id:' + (i + 1) + '}';
		if (i != columnCount - 1)
			columnStr += ',';
	}
	columnStr += ']';
	var jsonStore = new Ext.data.JsonStore({
				data : Ext.util.JSON.decode(columnStr),
				autoLoad : true,
				fields : [{
							name : 'columnId',
							mapping : 'id'
						}]
			});
	return jsonStore;
}

// 确定导入
ConWwListFormDaoRu.toImport = function() {
	var filePath = Ext.getCmp('ConWwListFormDaoRu.filePath').getValue();
	var fileType = Ext.getCmp('ConWwListFormDaoRu.fileType').getValue();
	if (fileType == 3) {// EXCEL格式
		var type = filePath.substring(filePath.lastIndexOf(".") + 1).trim();
		if (type != 'xls') {
			Ext.ux.Toast.msg("操作信息", "请选择EXCEL格式文件!");
			return;
		}
	} else {
		Ext.ux.Toast.msg("操作信息", "请选择文件类型中的EXCEL类型");
		return;
	}
	var store = Ext.getCmp('ConWwListFormDaoRuGridPanel').getStore();
	var colArray = new Array();
	var fileArray = new Array();
	if(store.data.items.length>0){
		for (var i = 0; i < store.data.items.length; i++) {
			var itemIndex = store.getAt(i).data.itemIndex;
//			var fileColumn = store.getAt(i).data.fileColumn;
//			if(fileColumn == undefined){
//				Ext.ux.Toast.msg("操作信息", "请配置文件列的值!");
//				return;
//			}
			colArray.push(itemIndex);
//			fileArray.push(fileColumn);
			fileArray.push(i+1);
		}
		//确认导入
		Ext.Msg.confirm('信息确认', '您确定开始导入吗？', function(btn){
			if (btn == 'yes') {
					Ext.getCmp('ConWwListDaoRu.uploadForm').getForm().submit({
						scope : this,
						url : __ctxPath + '/upload-file',
						method : 'post',
						params : {},
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							filePath = action.result.filename;
							$postSubForm({
								formPanel : Ext.getCmp('ConWwListDaoRu.uploadForm'),
								scope : this,
								url : __ctxPath + '/customer/doImportBwlistConBwList.do',
								params : {
									bwFlag : 2,  //表示白名单的导入类型
									columnData : colArray,
									fileData : fileArray,
									fileName : filePath
								},
								msgSuccess : '成功导入！',
								msgFailure : '请确认您选择的白名单模板是否正确,并检查导入值!',
								callback : function(fp, action) {
									if(action!='undefined'&action!=null){
										var win2 = new Ext.Window({
											title : '导入名单完成',
											height : 500,
											width : 700,
											id : 'ConWwListDaoRuInfoWin',
											layout : 'fit',
											modal : true,
											buttonAlign : 'center',
											buttons : [{
														text : '关闭',
														iconCls : 'btn-cancel',
														handler : function() {
															win2.close();
														}
													}],
											html : '<div style="margin-left:10px;margin-right:10px;width:100%;height:200px;background:white;" > '
													+ '<div style="color:#455e63;width:92%;margin-right:20px;height:40px;border:1px solid #cccecd;float:none;margin-top:25px;margin-left:20px;margin-right:20px;" >名单导入（操作完成）</div>'
													+ '<div style="color:#455e63;width:92%;margin-right:20px;border:1px solid #cccecd;margin-left:20px;margin-right:20px;">'
													+ '<div style="color:#455e63;float:right;height:30px;">开始时间:'+action.result.staDat+'  结束时间:'+action.result.endDat+'      时长(秒):'+action.result.impDur+'  </div>'
													+ '<div style="color:#455e63;">总导入数:<span  style="margin-left:20px;" >'+action.result.toltalCount+'</span>'
													+ '条</div></div>' + ' </div>'
										}).show();
										Ext.getCmp('ConWwListDaoRubmdWin').close();
									}
									var bwGrid = Ext.getCmp('ConBwListGrid');
									var wwGrid = Ext.getCmp('ConWwListGrid');
									if(bwGrid != null){
										bwGrid.getStore().reload();
									}
									if(wwGrid != null){
										wwGrid.getStore().reload();
									}
								}
							});
						},
						failure : function(fp, action) {
							Ext.ux.Toast.msg("操作信息", "操作失败!请联系管理员");
						}
					});
			}
		});
	}else{
		Ext.ux.Toast.msg("操作信息", "请选择导入方案,并配置文件列的值!");
	}
	

//	if (!confirm('确定开始导入吗？')) {
//		return;
//	}


}
