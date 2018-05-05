var ObCallbatchFormDaoRu = function(calllistId,comId) {
	var store2 = null;
	var store3 = null;
	var delArray = new Array();
	var columnCount = 0;
	var idCount = 0;
	var getPanel = function(id) {
		var CondPanel = new Ext.Panel({
					layout : 'column',
					id : 'panel' + id,
					border : false,
					style : 'padding-top:3px',
					items : [{
								columnWidth : .3,
								hiddenName : 'conWeichuli.srcTypeId',
								id : 'col1' + id,
								xtype : 'combo',
								editable : true,
								mode : 'local',
								store : store2,
								triggerAction : 'all',
								valueField : 'dicId',
								displayField : 'itemValue',
								anchor : '100%'
							}, {
								hiddenName : 'conWeichuli.srcTypeId',
								id : 'col2' + id,
								xtype : 'mtdiccombo',
								columnWidth : .3,
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'IMPORT_RELATION',
								anchor : '100%'
							}, {
								xtype : 'textfield',
								id : 'col3' + id,
								columnWidth : .3
							}, {
								columnWidth : .1,
								id : 'button' + id,
								xtype : 'button',
								iconCls : 'btn-del',
								handler : function() {
									var ii = this.id.substring(6,
											this.id.length)
									Ext.getCmp('daorutiaojian').remove('panel'
											+ ii);
									delArray.push(ii);
									Ext.getCmp('daorutiaojian').doLayout();
								}
							}]

				})
		return CondPanel;
	}

	var store1 = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath
									+ '/system/loadColumnsDictionary.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : ['itemValue', 'itemIndex','sn']
						}),
//				remoteSort : true,
//				params:{
//				    sort:'sn',
//				    dir:'ASC' 
//				},
				
//				sortInfo: {
//					field: 'sn',
//                    direction: 'ASC' 
//				},
				listeners : {
					'load' : function() {
						columnCount = store1.data.items.length;
						store3 = ObCallbatchFormDaoRu
								.initFileColumn(columnCount);
						cm.columns[1].editor = new Ext.form.ComboBox({
									xtype : 'combo',
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									store : store3,
									hiddenName : 'conWeichuli.srcTypeId',
									editable : true,
									valueField : 'columnId',
									displayField : 'columnNam',
									anchor : '100%'
								})

					}
				}
				//remoteSort : true
			});
	store1.setDefaultSort('sn', 'ASC');

	// store.load();
	var cm = new Ext.grid.ColumnModel({
				columns : [{
							header : '字段列',
							dataIndex : 'itemValue'
						}, {
							header : '文件列',
							dataIndex : 'itemName',
							editor : new Ext.form.ComboBox({
										xtype : 'combo',
										editable : false,
										mode : 'local',
										triggerAction : 'all',
										store : store3,
										hiddenName : 'conWeichuli.srcTypeId',
										editable : true,
										valueField : 'columnId',
										displayField : 'columnNam',
										anchor : '100%'
									})
						}]
			});

	gridPanel = new Ext.grid.EditorGridPanel({
				id : 'obCallbatchFormDaoRuGridPanel',
				store : store1,
				shim : true,
				height : 380,
				autocroll : true,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				cm : cm,
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				}
			});
	var win = new Ext.Window({
		title : '批次导入名单',
		height : 500,
		width : 700,
		id : 'step2',
		closable:false,
		layout : 'fit',
		buttonAlign : 'right',
		buttons : [{
					text : '上一步',
					id : 'preBtn',
					iconCls : 'rem-all',
					handler : function() {
						Ext.getCmp('step2').hide();
						Ext.getCmp('step1').show();
					}
				}, {
					text : '确定',
					id : 'impBtn',
					iconCls : 'btn-save',
					handler : function() {
						ObCallbatchFormDaoRu.toImport(idCount, delArray,comId);
					}

				}, {
					text : '取消',
					iconCls : 'btn-cancel',
					handler : function() {
						win.close();
						win1.close();
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
						style : 'margin-bottom:10px',
						items : [{
									columnWidth : .2,
									html : '导入方案：',
									border : false,
									style : 'text-align:right;padding-top:3px'
								}, {

									xtype : 'mtdiccombo',
									id : 'importTypeCombo',
									columnWidth : .8,
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'IMPORT_TYPE',
									anchor : '100%',
									listeners : {
										'select' : function() {
											var combo = Ext
													.getCmp('importTypeCombo');
											var paramObj = {
												itemName : combo.getRawValue()
											};
											// paramObj["itemName"]=combo.getRawValue();
											store1.url = __ctxPath
													+ '/system/loadColumnsDictionary.do';
											store1.reload({
														params : paramObj
													});
											store2 = ObCallbatchFormDaoRu
													.initData(combo
															.getRawValue());

										}
									}
								}]
					}, gridPanel]
				}, {
					columnWidth : .5,
					border : false,
					items : [
							// {
							// xtype : 'fieldset',
							// title : "导入条件",
							// collapsed : false,
							// tbar : [{
							// text : '添加',
							// iconCls : 'btn-add',
							// handler : function() {
							// Ext.getCmp('daorutiaojian')
							// .add(getPanel(idCount));
							// Ext.getCmp('daorutiaojian').doLayout();
							// idCount++;
							// }
							// }],
							// // collapsible : true,
							// autoHeight : true,
							// // height:260,
							// defaults : {
							// anchor : '100%,100%'
							// },
							// items : [{
							// border : false,
							// height : 215,
							// id : 'daorutiaojian',
							// items : []
							//
							// }]
							// },
							{
						xtype : 'fieldset',
						title : "导入设置",
						collapsed : false,
						// collapsible : true,
						autoHeight : true,
						defaults : {
							anchor : '100%,100%'
						},
						items : [new Ext.FormPanel({
									id : 'uploadForm',
									baseCls : 'x-plain',
									labelWidth : 75,
									fileUpload : true,
									method : 'POST',
									enctype : 'multipart/form-data',
									items : [{
												fieldLabel : '文件类型',
												id : 'fileType',
												hiddenName : 'conWeichuli.srcTypeId',
												allowBlank : false,
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'DAORUWJ',
												anchor : '100%'
											}, {
												xtype : 'textfield',
												fieldLabel : '文件路径',
												id : 'fileName',
												anchor : '80%',
												name : 'filePath',
												inputType : 'file',
												uploadFile:true
												//allowBlank : false
											}
//											, {
//												fieldLabel : '分隔符',
//												hiddenName : 'conWeichuli.srcTypeId',
//												xtype : 'mtdiccombo',
//												editable : true,
//												lazyInit : false,
//												forceSelection : false,
//												itemKey : 'FENGEFU',
//												anchor : '100%'
//											}
											, {
												name : 'calllistId',
												xtype : 'hidden',
												value : calllistId == null
														? ''
														: calllistId
											}, {
												name : 'obCalllist.calllistId',
												id : 'obCalllist.calllistId',
												xtype : 'hidden',
												value : calllistId == null
														? ''
														: calllistId
											}, {
												name : 'obCallbatch.callbatchNam',
												id : 'obCallbatch.callbatchNam',
												xtype : 'hidden',
												value : ''
											}, {
												name : 'obCallbatch.callbatchTypId',
												id : 'obCallbatch.callbatchTypId',
												xtype : 'hidden',
												value : ''
											}, {
												name : 'obCallbatch.callbatchSrcId',
												id : 'obCallbatch.callbatchSrcId',
												xtype : 'hidden',
												value : ''
											}, {
												name : 'obCallbatch.callbatchRegion',
												id : 'obCallbatch.callbatchRegion',
												xtype : 'hidden',
												value : ''
											}, {
												name : 'obCallbatch.callbatchDes',
												id : 'obCallbatch.callbatchDes',
												xtype : 'hidden',
												value : ''
											}]
								})
						// {
						// layout : 'form',
						// id:'uploadForm',
						// labelWidth : 70,
						// enctype:'multipart/form-data',
						// baseCls: 'x-plain',
						// fileUpload: true,
						// //method:'POST',
						// border : false,
						// items : [{
						// fieldLabel : '文件类型',
						// hiddenName : 'conWeichuli.srcTypeId',
						// xtype : 'mtdiccombo',
						// editable : true,
						// lazyInit : false,
						// forceSelection : false,
						// itemKey : 'DAORUWJ',
						// anchor : '100%'
						// }, {
						// xtype : 'textfield',
						// fieldLabel : '文件路径',
						// id:'fileName',
						// anchor : '80%',
						// name : 'userfile',
						// inputType : 'file',
						// allowBlank : false
						// }, {
						// fieldLabel : '分隔符',
						// hiddenName : 'conWeichuli.srcTypeId',
						// xtype : 'mtdiccombo',
						// editable : true,
						// lazyInit : false,
						// forceSelection : false,
						// itemKey : 'FENGEFU',
						// anchor : '100%'
						// }]
						// }
						]
					}]
				}]

			}]
		}]
	})
	var win1 = new Ext.Window({
		title : '批次导入名单',
		height : 500,
		width : 700,
		id : 'step1',
		layout : 'fit',
		buttonAlign : 'center',
		buttons : [{
					text : '下一步',
					iconCls : 'add-all',
					id : 'nextb',
					handler : function() {
						ObCallbatchFormDaoRu.nextStep();
					}
				}, {
					text : '确定',
					iconCls : 'btn-save',
					id : 'saveall',
					handler : function() {

					}
				}, {
					text : '取消',
					iconCls : 'btn-cancel',
					handler : function() {
						win1.close();

					}
				}],
		items : [new Ext.FormPanel({
			layout : 'form',
			id : 'importForm',
			style : 'padding:20px 10px;background-color:#fff',
			labelAlign : 'right',
			border : false,
			items : [{
				layout : 'column',
				border : false,
				items : [{
					columnWidth : .5,
					border : false,
					items : [{
								name : 'obCalllist.calllistId',
								xtype : 'hidden',
								value : calllistId == null ? '' : calllistId
							}, {
								layout : 'form',
								border : false,
								items : [{
											fieldLabel : '呼叫名单',
											name : 'obCalllist.calllistNam',
											allowBlank : false,
											id : 'calllistNm_daoru',
											xtype : 'textfield',
											readOnly : true,
											anchor : '100%'
										}]
							}, {
								layout : 'form',
								border : false,
								items : [{
									fieldLabel : '批次类型',
									name : 'obCallbatch.callbatchTypId',
									hiddenName : 'obCallbatch.callbatchTypId',
									id : 'callbatchTypId_daoru',
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONOB_CALLBATCH_PCLX',
									allowBlank : false,
									anchor : '100%',
									listeners : {
										'select' : function(combo, record,
												index) {
												Ext.getCmp('timesd')
														.setVisible(false);
												// Ext.getCmp('calllistly').setVisible(true);
												Ext.getCmp('nextb')
														.setVisible(true);
												Ext.getCmp('saveall')
														.setVisible(false)			
//											if (index == 0) {
//												Ext.getCmp('timesd')
//														.setVisible(true);
//												// Ext.getCmp('calllistly').setVisible(false);
//												Ext.getCmp('nextb')
//														.setVisible(false);
//												Ext.getCmp('saveall')
//														.setVisible(true)
//
//											} else {
//												Ext.getCmp('timesd')
//														.setVisible(false);
//												// Ext.getCmp('calllistly').setVisible(true);
//												Ext.getCmp('nextb')
//														.setVisible(true);
//												Ext.getCmp('saveall')
//														.setVisible(false)
//											}
										}
									}

								}]
							}]
				}, {
					columnWidth : .5,
					border : false,
					items : [{
								layout : 'form',
								border : false,
								items : [{
											fieldLabel : '批次名称',
											id : 'callbatchNm_daoru',
											name : 'obCallbatch.callbatchNam',
											hiddenName : 'obCallbatch.callbatchNam',
											value : 'B'
													+ new Date()
															.format('YmdHis'),
											xtype : 'textfield',
											allowBlank : false,
											maxLength : 512,
											anchor : '100%'
										}]
							}]
				}]
			}, {
				layout : 'column',
				id : 'timesd',
				border : false,
				items : [{
							columnWidth : .5,
							border : false,
							layout : 'form',
							items : [{
										fieldLabel : '开始段',
										name : 'obCalllist.calllistNam',
										xtype : 'textfield',
										anchor : '100%'
									}]
						}, {
							columnWidth : .5,
							border : false,
							layout : 'form',
							items : [{
										fieldLabel : '结束段',
										name : 'obCalllist.calllistNam',
										xtype : 'textfield',
										anchor : '100%'
									}]
						}]
			}, {
				name : 'obCallbatch.districtsheng', // 国家隐藏域
				id : 'obCallbatch.districtsheng',
				xtype : 'hidden'
			}, {
				name : 'obCallbatch.districtshi', // 省隐藏域
				id : 'obCallbatch.districtshi',
				xtype : 'hidden'
			}, {
				name : 'obCallbatch.districtqu', // 市隐藏域
				id : 'obCallbatch.districtqu',
				xtype : 'hidden'
			}
//			, {
//				name : 'obCallbatch.districtDiqu', // 地区隐藏域
//				id : 'obCallbatch.districtDiqu',
//				xtype : 'hidden'
//			}
			, {
				layout : 'column',
				xtype : 'container',
				defaults : {
					border : false
				},
				items : [{
					columnWidth : .4,
					layout : "form",
					items : [{
						fieldLabel : '所属地区', // 国家
						// name : 'ulEmployee.gongzuodiGuojia',
						id : 'obCallbatch.districtsheng_combo',
						// hiddenName :
						// 'ulEmployee.gongzuodiGuojia',
						xtype : 'combo',
						lazyInit : false,
						allowBlank : true,
						anchor : '100%',
						mode : 'local',
						editable : false,
						triggerAction : 'all',
						store : AppUtil.address2.getStore_region(0, 'obCallbatch.district',
								this.district),
						displayField : 'regionName',
						valueField : 'regionName',
						listeners : AppUtil.address2.getListeners_region(0,
								'obCallbatch.district')
					}]
				}, {
					columnWidth : .2,
					layout : "form",
					items : [{
						// name :
						// 'ulEmployee.gongzuodiSheng',
						// // 省
						id : 'obCallbatch.districtshi_combo',
						// hiddenName :
						// 'ulEmployee.gongzuodiSheng',
						xtype : 'combo',
						lazyInit : false,
						hideLabel : true,
						allowBlank : true,
						mode : 'local',
						anchor : '100%',
						editable : false,
						triggerAction : 'all',
						store : AppUtil.address2.getStore_region(1, 'obCallbatch.district',
								this.district),
						displayField : 'regionName',
						valueField : 'regionName',
						listeners : AppUtil.address2.getListeners_region(1,
								'obCallbatch.district')
					}]
				}, {
					columnWidth : .2,
					layout : "form",
					items : [{
						// name :
						// 'ulEmployee.gongzuodiShi', //
						// 市
						id : 'obCallbatch.districtqu_combo',
						// hiddenName :
						// 'ulEmployee.gongzuodiShi',
						xtype : 'combo',
						lazyInit : false,
						mode : 'local',
						hideLabel : true,
						anchor : '100%',
						editable : false,
						allowBlank : true,
						triggerAction : 'all',
						store : AppUtil.address2.getStore_region(2, 'obCallbatch.district',
								this.district),
						displayField : 'regionName',
						valueField : 'regionName'
//						listeners : getListeners_region(2,
//								'obCallbatch.district')

					}]
				}
//				, {
//					columnWidth : .2,
//					layout : "form",
//					items : [{
//						// name :
//						// 'ulEmployee.gongzuodiDiqu',
//						id : 'obCallbatch.districtDiqu_combo',
//						// hiddenName :
//						// 'ulEmployee.gongzuodiDiqu',
//						xtype : 'combo',
//						mode : 'local',
//						anchor : '100%',
//						allowBlank : true,
//						hideLabel : true,
//						editable : false,
//						triggerAction : 'all',
//						store : getStore_region(3, 'obCallbatch.district',
//								this.district),
//						displayField : 'regionName',
//						valueField : 'regionName',
//						listeners : getListeners_region(3,
//								'obCallbatch.district')
//					}]
//				}
				]
			}, {
				fieldLabel : '备注',
				name : 'obCallbatch.callbatchDes',
				id : 'remarks_daoru',
				xtype : 'textarea',
				maxLength : 4000,
				anchor : '100%'
			}]
		})]
	})
	win1.show();
	// 加载表单对应的数据--导入第一步
	if (calllistId != null && calllistId != 'undefined') {
		win1.loadData({
			url : __ctxPath + '/outb/getObCalllist.do?calllistId=' + calllistId,
			root : 'data',
			preName : 'obCalllist'
				/**
				 * success:function(response, options) { var thisObj =
				 * Ext.util.JSON.decode(response.responseText).data; //
				 * alert(thisObj.obProject.projId);
				 * Ext.getCmp('calllistNm').setValue(thisObj.calllistNam);
				 * Ext.getCmp('district').setValue('');
				 * //Ext.getCmp('callbatchNm').setValue('');
				 * Ext.getCmp('remark').setValue(''); }, failure :
				 * function(response, options) { Ext.ux.Toast.msg('操作信息',
				 * '操作出错，请联系管理员！'); }
				 */
		});
		Ext.getCmp('timesd').setVisible(false);
		// Ext.getCmp('calllistly').setVisible(false);
		Ext.getCmp('nextb').setVisible(false);
		Ext.getCmp('saveall').setVisible(false)
	}
  return win1;
}
ObCallbatchFormDaoRu.initData = function(itemNm) {
	var store = new Ext.data.SimpleStore({
				url : __ctxPath + '/system/loadItemDictionary.do',
				autoLoad : true,
				baseParams : {
					itemName : itemNm
				},
				fields : ['dicId', 'itemValue']

			});
	// store.setDefaultSort('tarId', 'desc');
	return store;
};

// 下一步
ObCallbatchFormDaoRu.nextStep = function() {
	// var projId= Ext.getCmp('obCom.projId').getValue();
	$postSubForm({
				formPanel : Ext.getCmp('importForm'),
				scope : this,
				url : __ctxPath + '/outb/importCalllist2ObCalllist.do',
				params : {},
				msgSuccess : '成功进入导入第二步！',
				msgFailure : '操作出错，请联系管理员！',
				callback : function(fp, action) {
					Ext.getCmp('step1').hide();
					Ext.getCmp('step2').show();

					Ext.getCmp('obCallbatch.callbatchNam').setValue(Ext
							.getCmp('callbatchNm_daoru').getValue());
					Ext.getCmp('obCallbatch.callbatchTypId').setValue(Ext
							.getCmp('callbatchTypId_daoru').getValue());
//					Ext.getCmp('obCallbatch.callbatchSrcId').setValue(Ext
//							.getCmp('callbatchSrcId').getValue());

					var guojia = Ext.getCmp('obCallbatch.districtsheng_combo')
							.getValue();
					if (guojia == '请选择')
						guojia = '';
					var sheng = Ext.getCmp('obCallbatch.districtshi_combo')
							.getValue();
					if (sheng == '请选择')
						sheng = '';
					var shi = Ext.getCmp('obCallbatch.districtqu_combo')
							.getValue();
					if (shi == '请选择')
						shi = '';
//					var diqu = Ext.getCmp('obCallbatch.districtDiqu_combo')
//							.getValue();
//					if (diqu == '请选择')
//						diqu = '';
					//var district = guojia + sheng + shi + diqu;
					var district = guojia + sheng + shi;
					Ext.getCmp('obCallbatch.callbatchRegion')
							.setValue(district);
					Ext.getCmp('obCallbatch.callbatchDes').setValue(Ext
							.getCmp('remarks_daoru').getValue());
				}
			});
}// end of nextStep

// 初始化文件列
ObCallbatchFormDaoRu.initFileColumn = function(columnCount) {
	var columnStr = '[{id:0,name:"不选择"},';
	for (var i = 0; i < columnCount; i++) {
		columnStr += '{id:' + (i + 1) + ',name:"第'+(i+1)+'列"}';
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
						},{
						    name: 'columnNam',
						    mapping: 'name'
						}]
			});
	return jsonStore;
}

// 确定导入
ObCallbatchFormDaoRu.toImport = function(idCount, delArray,comId) {
	var filename = Ext.getCmp('fileName').getValue();
	var fileType = Ext.getCmp('fileType').getValue();
	if (fileType == 3) {// EXCEL格式
		var type = filename.substring(filename.lastIndexOf(".") + 1).trim();
		if (type != 'xls') {
			Ext.Msg.alert("请选择EXCEL格式文件!");
			return;
		}
	} else {
		Ext.Msg.alert("请选择EXCEL类型!");
		return;
	}
	var store = Ext.getCmp('obCallbatchFormDaoRuGridPanel').getStore();
	var colArray = new Array();
	var fileArray = new Array();
	for (var i = 0; i < store.data.items.length; i++) {
		var itemIndex = store.getAt(i).data.itemIndex;
		var itemName = store.getAt(i).data.itemName;
//	    if(itemName == undefined){
//	    
//	    	//alert("sdf");
//	    }
		itemName = itemName == undefined ? 0 : itemName;
		if (((itemIndex == "'CUS_CODE'" || itemIndex == "'NAME_CN'")
				&& itemName == 0)) {
			Ext.Msg.alert("名称文件列不能为空!");
			return;
		}
		colArray.push(itemIndex);
		fileArray.push(itemName);
	}
//	if (!confirm('确定开始导入吗？')) {
//		return;
//	}
	Ext.Msg.confirm('系统提示','确定开始导入吗？',
	      function(btn){if(btn=='yes'){
	Ext.getCmp('uploadForm').getForm().submit({
		scope : this,
		url : __ctxPath + '/upload-file',
		method : 'post',
		params : {},
		waitMsg : '正在提交数据...',
		success : function(fp, action) {
			filename = action.result.filename;
			$postSubForm({
				formPanel : Ext.getCmp('uploadForm'),
				scope : this,
				url : __ctxPath + '/outb/doImportCalllistObCalllist.do',
				params : {
					columnData : colArray.join(','),
					fileData : fileArray.join(','),
					fileName : filename,
					comId:comId
					// col1Array:col1Array,
					// col2Array:col2Array,
					// col3Array:col3Array
				},
				msgSuccess : '成功导入！',
				msgFailure : '操作出错，请联系管理员！',
				callback : function(fp, action) {
					// alert(action.result.toltalCount);
					var win2 = new Ext.Window({
						title : '导入名单完成',
						height : 300,
						width : 700,
						id : 'step3',
						layout : 'fit',
						buttonAlign : 'center',
						modal : true,
						bodyStyle:'background-color:#fff;padding:20px;',
						buttons : [{
									text : '关闭',
									iconCls : 'btn-cancel',
									handler : function() {
										win2.close();
										Ext.getCmp('step1').close();
										Ext.getCmp('step2').close();
									}
								}],
//						html : '<div style="margin-left:10px;margin-right:10px;width:100%;height:100%;background-color:white;" > '
//								+ '<div style="color:#455e63;width:92%;margin-right:20px;height:40px;border:1px solid #cccecd;float:none;margin-top:25px;margin-left:20px;margin-right:20px;" >名单导入（操作完成）</div>'
//								+ '<div style="color:#455e63;width:92%;margin-right:20px;margin-left:20px;margin-right:20px; color: green; font-weight: bold;font-size:14px">'
//								+ '<div style="color:#455e63;float:right;height:30px;">开始时间:'+action.result.staDat+'  结束时间:'+action.result.endDat+'      时长(秒):'+action.result.impDur+'  </div>'
//								+ '<div style="color:#455e63;">总导入数:<span  style="margin-left:30px;" >'+action.result.toltalCount+'</span> </br>有效数量:<span style="margin-left:30px;" >'+action.result.avlidCount+'</span></br>无效数量:<span style="margin-left:30px;" >'+action.result.inavlidCount+'</span> </br>'
//								+ '</div></div>' + ' </div>'
						html:'<table style="">' +
								'<tr style="line-height:30px;height:30px">' +
									'<td style="color:green;font-weight:bold;font-size:14px" align="center" colspan="3">名单导入（操作完成）</td>'+
								'</tr>'+
								'<tr style="line-height:30px;height:30px">' +
									'<td style="color:gray;width:200px">开始时间：'+action.result.staDat+'</td>'+
									'<td style="color:gray;width:200px">结束时间：'+action.result.endDat+'</td>'+
									'<td style="color:gray;width:200px">时长(秒):'+action.result.impDur+'</td>'+
								'</tr>'+
								'<tr style="line-height:30px;height:30px">' +
									'<td style="color:gray;width:200px">总导入数：'+action.result.toltalCount+'</td>'+
									'<td style="color:gray;width:200px">有效数量：'+action.result.avlidCount+'</td>'+
									'<td style="color:gray;width:200px">无效数量:'+action.result.inavlidCount+'</td>'+
								'</tr>'+
							 '</table>'
					}).show();
					Ext.getCmp('step2').hide();
					//Ext.getCmp('step3').show();

				}
			});

		},

		failure : function(fp, action) {
			Ext.Msg.alert('操作失败');
		}
	});
						
	        }else{
	           return;
	        }
	        
	      },this);	
	// alert(Ext.getCmp('fileName').getValue());

	// 导入条件
	// var col1Array=new Array();
	// var col2Array=new Array();
	// var col3Array=new Array();
	// var colCouArry=new Array();
	// for(var i=0;i<idCount;i++) {
	// colCouArry.push(i);
	// }
	// for(var i=0;i<delArray.length;i++) {
	// colCouArry.splice(delArray[i],1);
	// }
	//	
	// for(var i=0;i<colCouArry.length;i++) {
	// col1Array.push(Ext.getCmp("col1"+colCouArry[i]).getValue());
	// col2Array.push(Ext.getCmp("col2"+colCouArry[i]).getValue());
	// col3Array.push(Ext.getCmp("col3"+colCouArry[i]).getValue());
	// }

	// $postSubForm({
	// formPanel : Ext.getCmp('uploadForm'),
	// scope : this,
	// url : __ctxPath + '/upload-file',
	// params : {},
	// //msgSuccess : '名单模板成功上传至服务器！',
	// msgFailure : '操作出错，请联系管理员！',
	// callback : function(scope,fp, action) {
	// alert("!"+action.result.data);
	// $postSubForm({
	// formPanel : Ext.getCmp('uploadForm'),
	// scope : this,
	// url : __ctxPath + '/outb/doImportCalllistObCalllist.do',
	// params : {
	// columnData:colArray,
	// fileData:fileArray,
	// fileName:Ext.getCmp('fileName').getValue(),
	// col1Array:col1Array,
	// col2Array:col2Array,
	// col3Array:col3Array
	// },
	// msgSuccess : '成功导入！',
	// msgFailure : '操作出错，请联系管理员！',
	// callback : function(fp, action) {
	//			                       
	// }
	// });
	// // Ext.Ajax.request({
	// // url:__ctxPath+"/outb/doImportCalllistObCalllist.do",
	// // params:{
	// // columnData:colArray,
	// // fileData:fileArray,
	// // fileName:Ext.getCmp('fileName').getValue(),
	// // col1Array:col1Array,
	// // col2Array:col2Array,
	// // col3Array:col3Array
	// // },
	// // success:function(response){
	// // //Ext.decode(response.responseText)
	// // },
	// // failure:function(response){
	// // Ext.Msg.alert("操作出错!");
	// // }
	// // });
	// }
	// });

	// $postSubForm({
	// formPanel : Ext.getCmp('uploadForm'),
	// scope : this,
	// url : __ctxPath + '/file-upload',
	// params : {
	// // uploadPath:'C:\名单导入模板.xls'
	// },
	// msgSuccess : '成功进入导入第二步！',
	// msgFailure : '操作出错，请联系管理员！',
	// callback : function(fp, action) {
	//                       
	// }
	// });
}
/*
ObCallbatchFormDaoRu.regionList = ['Guojia', 'Sheng', 'Shi', 'Diqu'];

function getStore_region(flag, idText, parentList) {
	if (parentList == null || parentList == undefined)
		if (flag != 0) {
			return new Ext.data.SimpleStore({
						fields : ['regionId', 'regionName']
					});
		} else {
			parentList = [0];
		}
	return new Ext.data.SimpleStore({
				autoLoad : true,
				url : __ctxPath + '/system/listDetailRegion.do?regionId='
						+ parentList[flag],
				fields : ['regionId', 'regionName'],
				listeners : {
					load : function() { // 加载数据
						Ext.getCmp(idText
								+ ObCallbatchFormDaoRu.regionList[flag]
								+ '_combo').setValue(Ext.getCmp(idText
								+ ObCallbatchFormDaoRu.regionList[flag])
								.getValue());
					}
				}
			})
}

function getListeners_region(flag, idText) {
	return {
		select : function(combo, record, index) {
			if (flag < ObCallbatchFormDaoRu.regionList.length - 1) {
				var next = Ext.getCmp(idText
						+ ObCallbatchFormDaoRu.regionList[flag + 1] + '_combo')
				next.clearValue();
				var nextStore = next.getStore();
				Ext.Ajax.request({
							url : __ctxPath + '/system/listDetailRegion.do',
							params : {
								regionId : record.data['regionId']
							},
							method : 'post',
							success : function(response) {
								var result = Ext.util.JSON
										.decode(response.responseText)
								nextStore.loadData(result);
								next.setValue('请选择');
							}
						});
			}
			// 给隐藏域赋值
			Ext.getCmp(idText + ObCallbatchFormDaoRu.regionList[flag])
					.setValue(record.get('regionId'));
		}
	}
}
*/