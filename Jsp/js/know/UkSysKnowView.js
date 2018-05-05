
UkSysKnowView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkSysKnowView.superclass.constructor.call(this, {
					id : 'UkSysKnowViewWin',
					title : '知识搜索',// '[UkSysKnow]管理',
					iconCls : 'mod-know', 
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});

	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var searchContent = this.Q_search_S_LK ? this.Q_search_S_LK : '';
		
		var fieldnameComboData = [
				['knowTmpId', '知识模板编号', new Ext.form.ComboBox({
					editabel : false,
					lazyInit : false,
					triggerAction : 'all',
					store : new Ext.data.SimpleStore({
								autoLoad : true,
								url : __ctxPath + '/know/listUkKnowTemplate.do',
								fields : ['knowTmpId', 'knowTmpIdName']
							}),
					displayField : 'knowTmpIdName',
					valueField : 'knowTmpId',
					id : 'knowTmpId'
				})],
				['knowApproveId', '知识审批单内码', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/know/listUkKnowApprove.do',
										fields : ['knowApproveId',
												'knowApproveIdName']
									}),
							displayField : 'knowApproveIdName',
							valueField : 'knowApproveId',
							id : 'knowApproveId'
						})], ['tiTle', '标题', new Ext.form.TextField({
									name : 'tiTle',
									allowBlank : true
								})],
				['busiType', '业务分类&BUSI_TYPE', new Ext.form.NumberField({
									name : 'busiType',
									allowBlank : true
								})],
				['enableTime', '生效时间', new Ext.form.DateField({
									hiddenName : 'enableTime',
									format : 'Y-m-d'
								})],
				['pastTime', '过期时间', new Ext.form.DateField({
									hiddenName : 'pastTime',
									format : 'Y-m-d'
								})],
				['sysKnowStatus', '状态&KNOW_STATUS', new Ext.form.NumberField({
									name : 'sysKnowStatus',
									allowBlank : true
								})],
				['viewCount', '浏览数', new Ext.form.NumberField({
									name : 'viewCount',
									allowBlank : true
								})],
				['sysKnowComment', '摘要', new Ext.form.TextField({
									name : 'sysKnowComment',
									allowBlank : true
								})],
				['plus1', '附加字段1', new Ext.form.TextField({
									name : 'plus1',
									allowBlank : true
								})],
				['plus2', '附加字段2', new Ext.form.TextField({
									name : 'plus2',
									allowBlank : true
								})],
				['plus3', '附加字段3', new Ext.form.TextField({
									name : 'plus3',
									allowBlank : true
								})],
				['plus4', '附加字段4', new Ext.form.TextField({
									name : 'plus4',
									allowBlank : true
								})],
				['plus5', '附加字段5', new Ext.form.TextField({
									name : 'plus5',
									allowBlank : true
								})],
				['plus6', '附加字段6', new Ext.form.TextField({
									name : 'plus6',
									allowBlank : true
								})],
				['plus7', '附加字段7', new Ext.form.TextField({
									name : 'plus7',
									allowBlank : true
								})],
				['plus8', '附加字段8', new Ext.form.TextField({
									name : 'plus8',
									allowBlank : true
								})],
				['sysKnowVersion', '版本号', new Ext.form.NumberField({
									name : 'sysKnowVersion',
									allowBlank : true
								})],
				['createBy', '创建人', new Ext.form.NumberField({
									name : 'createBy',
									allowBlank : true
								})],
				['updateBy', '修改人', new Ext.form.NumberField({
									name : 'updateBy',
									allowBlank : true
								})],
				['createDate', '创建时间', new Ext.form.DateField({
									hiddenName : 'createDate',
									format : 'Y-m-d'
								})],
				['updateDate', '修改时间', new Ext.form.DateField({
									hiddenName : 'updateDate',
									format : 'Y-m-d'
								})],
				['userid', '创建人内码', new Ext.form.NumberField({
									name : 'userid',
									allowBlank : true
								})]]
		var UkSysKnowAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UkSysKnow]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		var type_url = __ctxPath + '/know/listUkKnowType.do?opt=UlDep';
		var typeSelector = new TreeSelector('typeTreeSelector', type_url, null,
				'typeId', true, '50px');
		var titChk = new Ext.form.RadioGroup({	//CheckboxGroup
			border : false,
			width : 300,
			flex : 1,
			value : 3,
			id : 'Q_tiTle_S_LK_',
			items : [{
//				name : 'Q_title_S_LK',
				name : 'radio',
//				id : 'Q_title_S_LK',
				boxLabel : '标题',
				xtype : 'radio',
//				disabled : true,
				inputValue:'1'
//				,
//				value : 1
//				,
//				listeners : {
//					check : function() {
//						var title = Ext.getCmp('Q_title_S_LK').getValue();
////						var type = Ext.getCmp('Q_type_S_LK').getValue();
//						var keyword = Ext.getCmp('Q_keyword_S_LK').getValue();
//						if (title == true) {
//							Ext.getCmp('Q_fullTextSearch_S_LK').setDisabled(true);
//							Ext.getCmp('Q_fullTextSearch_S_LK').setValue('off');
//						}else{
//							Ext.getCmp('Q_title_S_LK').setValue('off');
//						} 
////						if(title != true && type != true && keyword != true){
//						if(title != true && keyword != true){
//							Ext.getCmp('Q_fullTextSearch_S_LK').setDisabled(false);
//						}
//					}
//				}
			}
//			, {
//				name : 'Q_type_S_LK',
//				id : 'Q_type_S_LK',
//				boxLabel : '业务分类',
//				disabled : true,
//				inputValue:'on',
//				xtype : 'checkbox',
//				value : 2,
//				listeners : {
//					check : function() {
//						var title = Ext.getCmp('Q_title_S_LK').getValue();
//						var type = Ext.getCmp('Q_type_S_LK').getValue();
//						var keyword = Ext.getCmp('Q_keyword_S_LK').getValue();
//						if (type == true) {
//							Ext.getCmp('Q_fullTextSearch_S_LK').setDisabled(true);
//							Ext.getCmp('Q_fullTextSearch_S_LK').setValue('off');
//						}else{
//							Ext.getCmp('Q_type_S_LK').setValue('off');
//						}  
//						if (title != true && type != true && keyword != true){
//							Ext.getCmp('Q_fullTextSearch_S_LK').setDisabled(false);
//						}
//					}
//				}
//			}
			, {
//				name : 'Q_keyword_S_LK',
				boxLabel : '关键字',
				name : 'radio',
//				id : 'Q_keyword_S_LK',
//				disabled : true,
				inputValue:'2',
				xtype : 'radio'
//				,
//				value : 3
//				,
//				listeners : {
//					check : function() {
//						var title = Ext.getCmp('Q_title_S_LK').getValue();
////						var type = Ext.getCmp('Q_type_S_LK').getValue();
//						var keyword = Ext.getCmp('Q_keyword_S_LK').getValue();
//						if (keyword == true) {
//							Ext.getCmp('Q_fullTextSearch_S_LK').setDisabled(true);
//							Ext.getCmp('Q_fullTextSearch_S_LK').setValue('off');
//						}else{
//							Ext.getCmp('Q_keyword_S_LK').setValue('off');
//						}   
////						if(title != true && type != true && keyword != true){
//						if(title != true && keyword != true){
//							Ext.getCmp('Q_fullTextSearch_S_LK').setDisabled(false);
//						}
//					}
//				}
			}, {
//				name : 'Q_fullTextSearch_S_LK',
				name : 'radio',
				boxLabel : '全文检索',
				id : 'Q_fullTextSearch_S_LK',
				xtype : 'radio',
				inputValue:'3',
				value : 3
				,checked : true
//				,
//				listeners : {
//					check : function() {
//						if (Ext.getCmp('Q_fullTextSearch_S_LK').getValue() == true) {
//							Ext.getCmp('Q_title_S_LK').setValue('off');
////							Ext.getCmp('Q_type_S_LK').setValue('off');
//							Ext.getCmp('Q_keyword_S_LK').setValue('off');
//							Ext.getCmp('Q_title_S_LK').setDisabled(true);
////							Ext.getCmp('Q_type_S_LK').setDisabled(true);
//							Ext.getCmp('Q_keyword_S_LK').setDisabled(true);
//
//						} else {
//							Ext.getCmp('Q_title_S_LK').setDisabled(false);
////							Ext.getCmp('Q_type_S_LK').setDisabled(false);
//							Ext.getCmp('Q_keyword_S_LK').setDisabled(false);
//						}
//
//					}
//				}
			}]

		});
		this.searchPanel = new Ext.FormPanel({
			region : 'north',
			id : 'UkSysKnowSearchPanel',
			height : 50,
			unStyle : true,
			border : false,
			style : 'padding-left:10px;padding-top:6px;background:white;',
			layout : 'column',
			labelAlign : 'left',
			items : [{
						layout : 'column',
						border : false,
						columnWidth : .99,
						items : [{
									layout : 'column',
									border : false,
									columnWidth : .8,
									items : [titChk, {
												name : 'Q_search_S_LK',// 查询输入框
												xtype : 'textfield',
												width : 200,
												anchor : '100%',
												value : this.Q_search_S_LK ? this.Q_search_S_LK : ''
											}, {
												xtype : 'button',
												text : __search,
												iconCls : 'search',
												scope : this,
												handler : this.onSearch
											}]
								}]
					}
//			, {
//						layout : 'column',
//						border : false,
//						columnWidth : .99,
//						items : [{
//							xtype : 'label',
//							width : 300,
//							height : 20,
//							hidden : false,
//							html : '<div style="width:200px;float:left;" ></div>'
//						}, {
//							xtype : 'checkboxgroup',
//							border : false,
//							width : 150,
//							flex : 1,
//							items : [{
//										name : 'Q_old_S_LK',
//										id : 'Q_old_S_LK',
//										boxLabel : '过期',
//										inputValue:'on',
//										xtype : 'checkbox'
//									}, {
//										name : 'Q_drop_S_LK',
//										id : 'Q_drop_S_LK',
//										boxLabel : '废弃',
//										xtype : 'checkbox',
//										inputValue:'on'
//									}]
//						}]
//
//					}
					]
		});// end of searchPanel
		// this.topbar = new Ext.Toolbar({
		// items : [{
		// iconCls : 'btn-add',
		// text : __create,
		// xtype : 'button',
		// scope : this,
		// handler : this.createRs
		// }, {
		// iconCls : 'btn-del',
		// text : __delete,
		// xtype : 'button',
		// scope : this,
		// handler : this.removeSelRs
		// }]
		// });
		function renderTopic(value, p, record) {
			var knowId = record.data.sysKnowComment;
			return String.format('<a href="#" >{1}</a>', knowId, value);
		}
		
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			sortable : false,
			showSm:false,
			unStyle : true,
			printable : false,
			exportable : false,
			border : false,
			id : 'UkSysKnowGrid',
			showPreview : true,
			// autoExpandColumn : 'tiTle',// 自动填补窗口大小的字段
			viewConfig : {
				forceFit : true,
				enableRowBody : true,
				showPreview : true,
				getRowClass : function(record, rowIndex, p, store) {
					if (this.showPreview) {
						p.body = '<p style="margin-left:48px;" > '
								+ record.data.sysKnowComment + '</p>';
						return 'x-grid3-row-expanded';
					}
					return 'x-grid3-row-collapsed';
				}
			},
			url : __ctxPath + "/know/searchUkSysKnow.do",
			baseParams :{
					Q_search_S_LK : searchContent
				}, 
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukKnowTemplate', 'ukKnowApprove', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid', 'ukKnowTypes', 'ukKnowKeywords','accessManage'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : __ukSysKnowKnowTmpId,// '知识模板编号',
						isExp : false,
						hidden : true,
						dataIndex : 'ukKnowTemplate',
						renderer : function(val) {
							return val != null ? val.tmpName : '';
						}
					}, {
						header : __ukSysKnowKnowApproveId,// '知识审批单内码',
						isExp : false,
						hidden : true,
						dataIndex : 'ukKnowApprove',
						renderer : function(val) {
							return val != null ? val.knowApproveIdName : '';
						}
					}, {
						header : __ukSysKnowTiTle,// '标题',
						isExp : false,
						width : 420,
//						renderer : renderTopic,
						dataIndex : 'tiTle'
					},
					{
						header : '状态',// '状态&KNOW_STATUS',
						isExp : false,
						dataIndex : 'sysKnowStatus',
						renderer : function(value) {
							if (value != null) {
								return KNOW_FLOW.get(value);
							} else {
								return '无';
							}
						}
					},
					// {
					// header : __ukSysKnowSysKnowComment,// '摘要',
					// isExp : false,
					// dataIndex : 'sysKnowComment'
					// },
					// {
					// header : "知识分类",
					// isExp : false,
					// dataIndex : 'ukKnowTypes',
					// renderer : function(value) {''
					// if (value == null) {
					// return '';
					// } else {
					// var str= "";
					// for(var i = 0; i < value.length; i++){
					// if(i>0)str+=",";
					// str += value[i].name;
					// }
					// return str;
					// }
					// }
					// },
					// {
					// header : "关键字",
					// isExp : false,
					// dataIndex : 'ukKnowKeywords',
					// renderer : function(value) {
					// if (value == null) {
					// return '';
					// } else {
					// var str = "";
					// for (var i = 0; i < value.length; i++) {
					// if (i > 0)
					// str += ",";
					// str += value[i].keyWord;
					// }
					// return str;
					// }
					// }
					// }, {
					// header : __ukSysKnowBusiType,// '业务分类&BUSI_TYPE',
					// isExp : false,
					// dataIndex : 'busiType',
					// renderer : function(value) {
					// return BUSI_TYPE.get(value);
					// }
					// }, {
					// header : '发布时间',// '生效时间',__ukSysKnowEnableTime
					// isExp : false,
					// dataIndex : 'enableTime'
					// },
					 {
						header : '发布时间',// '过期时间',
						isExp : false,
						width : 100,
						dataIndex : 'enableTime'
					}, {
						header : '结束时间',// '过期时间',
						isExp : false,
						width : 100,
						dataIndex : 'pastTime'
					},{
						header : __ukSysKnowViewCount,// '浏览数',
						isExp : false,
						width : 80,
						dataIndex : 'viewCount'
					},
					// {
					// header : __ukSysKnowSysKnowStatus,// '状态&KNOW_STATUS',
					// isExp : false,
					// dataIndex : 'sysKnowStatus',
					// renderer : function(value) {
					// return KNOW_STATUS.get(value);
					// }
					// },
					{
						header : __ukSysKnowSysKnowVersion,// '版本号',
						isExp : false,
						hidden : true,
						dataIndex : 'sysKnowVersion'
					},
					// {
					// header : __ukSysKnowCreateBy,// '创建人内码',
					// isExp : false,
					// dataIndex : 'createBy',
					// renderer : function(value) {
					// if (value == null) {
					// return '';
					// } else {
					// return value.fullname;
					// }
					// }
					// },
					new Ext.ux.grid.RowActions({
								header : __action,
								width : 50,
								hidden : true,
								actions : [{
											iconCls : 'btn-readdocument',
											qtip : '查看',
											style : 'margin:0 3px 0 3px'
										}
								// {
								// iconCls : 'btn-edit',
								// qtip : __edit,
								// style : 'margin:0 3px 0 3px'
								// }
								],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			},searchContent);

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		var searchPanel = this.searchPanel;
		var gridPanel = this.gridPanel;
		if (searchPanel.getForm().isValid()) {// 如果合法
			var store = gridPanel.getStore();
			var baseParam = Ext.Ajax.serializeForm(searchPanel.getForm().getEl());
			var deParams = Ext.urlDecode(baseParam);
			deParams.start = 0;
			deParams.limit = store.baseParams.limit;
			store.baseParams = deParams;
			gridPanel.getBottomToolbar().moveFirst();
		}
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		var record = grid.getStore().getAt(rowindex);// Get the Record
		if(record.get('accessManage')==1){
			var tabs = Ext.getCmp('centerTabPanel');
			var aForm = Ext.getCmp('UkSysKnowShow');
			if (aForm != null) {
				tabs.remove('UkSysKnowShow');
			}
			var collForm = Ext.getCmp('UkKnowCollectFormWin');
			if (collForm != null) {
				tabs.remove(collForm);
			}
	
			aForm = new UkSysKnowShow({
						knowId : record.get('knowId'),
						knowTmpId : record.get('knowTmpId'),
						knowTitle : record.get('tiTle')
					});
			tabs.add(aForm);
			tabs.activate(aForm);
		}else{
			Ext.Ajax.request({
				method : 'post',
				url : __ctxPath + '/know/hasReadKnowUkKnowDianping.do',
				params : {
					knowId : record.get('knowId'),
					busiType : record.get('busiType')
				},
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText);
					var hasRead = thisObj.hasRead;
					if (hasRead) {
						var tabs = Ext.getCmp('centerTabPanel');
						var aForm = Ext.getCmp('UkSysKnowShow');
						if (aForm != null) {
							tabs.remove('UkSysKnowShow');
						}
						var collForm = Ext.getCmp('UkKnowCollectFormWin');
						if (collForm != null) {
							tabs.remove(collForm);
						}
				
						aForm = new UkSysKnowShow({
									knowId : record.get('knowId'),
									knowTmpId : record.get('knowTmpId'),
									knowTitle : record.get('tiTle')
								});
						tabs.add(aForm);
						tabs.activate(aForm);
					} else {
						Ext.ux.Toast.msg("操作信息","对不起，您没有权限查看该知识!");
					}
				},
				failure : function(request) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员!');
				}
			});
		}
	},
	// 创建记录
	createRs : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if (aForm != null) {
			tabs.remove('UkSysKnowShow');
		}

		aForm = new UkSysKnowShow({
					knowId : record.data.knowId,
					knowTmpId : record.data.ukKnowTemplate.knowTmpId,
					knowTitle : record.data.tiTle
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/know/multiDelUkSysKnow.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkSysKnow.do',
					grid : this.gridPanel,
					idName : 'knowId'
				});
	},
	// 编辑Rs
	showRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if (aForm != null) {
			tabs.remove('UkSysKnowShow');
		}
		var collForm = Ext.getCmp('UkKnowCollectFormWin');
				if (collForm != null) {
					tabs.remove(collForm);
				}
		aForm = new UkSysKnowShow({
					knowId : record.data.knowId,
					knowTmpId : record.data.ukKnowTemplate.knowTmpId,
					knowTitle : record.data.tiTle
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.knowId);
				break;
			case 'btn-readdocument' :
				this.showRs.call(this, record);
				break;
			default :
				break;
		}
	}

});
