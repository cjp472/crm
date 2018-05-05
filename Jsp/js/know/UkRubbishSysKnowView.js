
UkRubbishSysKnowView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UkRubbishSysKnowView.superclass.constructor.call(this, {
					id : 'UkRubbishSysKnowViewWin',
					title : '垃圾箱',// '[UkSysKnow]管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {

				/**
				 * 注销高级查询
				 */

				// var fieldnameComboData = [
				// ['knowTmpId', '知识模板编号', new Ext.form.ComboBox({
				// editabel : false,
				// lazyInit : false,
				// triggerAction : 'all',
				// store : new Ext.data.SimpleStore({
				// autoLoad : true,
				// url : __ctxPath
				// + '/financial/comboknowTmpId.do',
				// fields : ['knowTmpId', 'knowTmpIdName']
				// }),
				// displayField : 'knowTmpIdName',
				// valueField : 'knowTmpId',
				// id : 'knowTmpId'
				// })],
				// ['knowApproveId', '知识审批单内码', new Ext.form.ComboBox({
				// editabel : false,
				// lazyInit : false,
				// triggerAction : 'all',
				// store : new Ext.data.SimpleStore({
				// autoLoad : true,
				// url : __ctxPath
				// + '/financial/comboknowApproveId.do',
				// fields : ['knowApproveId',
				// 'knowApproveIdName']
				// }),
				// displayField : 'knowApproveIdName',
				// valueField : 'knowApproveId',
				// id : 'knowApproveId'
				// })], ['tiTle', '标题', new Ext.form.TextField({
				// name : 'tiTle',
				// allowBlank : true
				// })],
				// ['busiType', '业务分类&BUSI_TYPE', new Ext.form.NumberField({
				// name : 'busiType',
				// allowBlank : true
				// })],
				// ['enableTime', '生效时间', new Ext.form.DateField({
				// hiddenName : 'enableTime',
				// format : 'Y-m-d'
				// })],
				// ['pastTime', '过期时间', new Ext.form.DateField({
				// hiddenName : 'pastTime',
				// format : 'Y-m-d'
				// })],
				// ['sysKnowStatus', '状态&KNOW_STATUS', new
				// Ext.form.NumberField({
				// name : 'sysKnowStatus',
				// allowBlank : true
				// })],
				// ['viewCount', '浏览数', new Ext.form.NumberField({
				// name : 'viewCount',
				// allowBlank : true
				// })],
				// ['sysKnowComment', '摘要', new Ext.form.TextField({
				// name : 'sysKnowComment',
				// allowBlank : true
				// })],
				// ['plus1', '附加字段1', new Ext.form.TextField({
				// name : 'plus1',
				// allowBlank : true
				// })],
				// ['plus2', '附加字段2', new Ext.form.TextField({
				// name : 'plus2',
				// allowBlank : true
				// })],
				// ['plus3', '附加字段3', new Ext.form.TextField({
				// name : 'plus3',
				// allowBlank : true
				// })],
				// ['plus4', '附加字段4', new Ext.form.TextField({
				// name : 'plus4',
				// allowBlank : true
				// })],
				// ['plus5', '附加字段5', new Ext.form.TextField({
				// name : 'plus5',
				// allowBlank : true
				// })],
				// ['plus6', '附加字段6', new Ext.form.TextField({
				// name : 'plus6',
				// allowBlank : true
				// })],
				// ['plus7', '附加字段7', new Ext.form.TextField({
				// name : 'plus7',
				// allowBlank : true
				// })],
				// ['plus8', '附加字段8', new Ext.form.TextField({
				// name : 'plus8',
				// allowBlank : true
				// })],
				// ['sysKnowVersion', '版本号', new Ext.form.NumberField({
				// name : 'sysKnowVersion',
				// allowBlank : true
				// })],
				// ['createBy', '创建人', new Ext.form.NumberField({
				// name : 'createBy',
				// allowBlank : true
				// })],
				// ['updateBy', '修改人', new Ext.form.NumberField({
				// name : 'updateBy',
				// allowBlank : true
				// })],
				// ['createDate', '创建时间', new Ext.form.DateField({
				// hiddenName : 'createDate',
				// format : 'Y-m-d'
				// })],
				// ['updateDate', '修改时间', new Ext.form.DateField({
				// hiddenName : 'updateDate',
				// format : 'Y-m-d'
				// })],
				// ['userid', '创建人内码', new Ext.form.NumberField({
				// name : 'userid',
				// allowBlank : true
				// })]]
				// var UkSysKnowAdvancedSearchWin =
				// Ext.extend(MT.AdvancedSearchWin, {
				// title : '[UkSysKnow]高级查询',
				// fieldData : fieldnameComboData
				// });
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkRubblishSearchPanel',
					height : 35,
					items : [{
								text : '标题:',
								style:'margin-top:-3px'
							}, {
								name : 'Q_tiTle_S_LK',
								xtype : 'textfield'
							}, {
								text : '知识维度:',
								style:'margin-top:-3px'
							}, {
//								name : 'Q_ukDimensionalityKnows.dimName_S_LK',
//								xtype : 'textfield'
								hiddenName : 'Q_busiType_L_EQ',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'KNOW_CATE',
								width : 120
							}, {
								text : "关键字:",
								style:'margin-top:-3px'
							}, {
								name : 'Q_ukKnowKeywords.keyWord_S_LK',
								xtype : 'textfield'
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : this.onSearch
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						border : false,
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					border : false,
					frame : false
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({
					items : ['->', 
						{
							iconCls : 'btn-mail_back',
							text : '恢复',// __create + '[UkSysKnow]'
							xtype : 'button',
							scope : this,
							handler : this.recoverRs
						}, 
						{
							iconCls : 'btn-del',
							text : __delete,// '[UkSysKnow]'
							xtype : 'button',
							scope : this,
							handler : this.removeSelRs
						}]
					});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					printable : false,
					exportable : false,
					id : 'UkRubbishSysKnowGrid',
					url : __ctxPath + "/know/rubbishListUkSysKnow.do",
//					url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
//					baseParams :{
//						status : 6
//					}, 
					fields : [{
								name : 'knowId',
								type : 'int'
							}, 'ukSysKnow', 'ukKnowTypes', 'tiTle', 'busiType',
							'enableTime', 'pastTime', 'sysKnowStatus',
							'viewCount', 'sysKnowComment', 'plus1', 'plus2',
							'plus3', 'plus4', 'plus5', 'plus6', 'plus7',
							'plus8', 'sysKnowVersion', 'createBy', 'updateBy',
							'createDate', 'updateDate', 'userid',
							'ukKnowTemplate', 'ukKnowApprove', 'ukKnowKeywords'],
					columns : [{
								header : __ukSysKnowKnowId,// 'knowId',
								dataIndex : 'knowId',
								hidden : true
							}, {
								header : __ukSysKnowKnowTmpId,// '知识模板编号',
								isExp : false,
								dataIndex : 'ukKnowTemplate',
								hidden : true,
								renderer : function(val) {
									return val != null ? val.tmpName : '';
								}
							}, {
								header : __ukSysKnowKnowApproveId,// '知识审批单内码',
								isExp : false,
								dataIndex : 'ukKnowApprove',
								hidden : true,
								renderer : function(val) {
									if (val != null) {
										return val.knowApproveIdName;
									} else {
										return '';
									}
								}
							}, {
								header : __ukSysKnowTiTle,// '标题',
								isExp : false,
								width:350,
								dataIndex : 'tiTle'
							}, {
								header : __ukSysKnowSysKnowComment,// '摘要',
								isExp : false,
								hidden : true,
								dataIndex : 'sysKnowComment'
							}, {
								header : "关键字",
								isExp : false,
								hidden:true,
								dataIndex : 'knowKeyWords'
//								,
//								renderer : function(value) {
//									if (value == null) {
//										return '';
//									} else {
//										var str = "";
//										for (var i = 0; i < value.length; i++) {
//											if (i > 0)
//												str += ",";
//											str += value[i].keyWord;
//										}
//										return str;
//									}
//								}
							}, {
								header : '知识分类',
								isExp : false,
								hidden:true,
								dataIndex : 'ukKnowTypes',
								renderer : function(value) {
									''
									if (value == null) {
										return '';
									} else {
										var str = "";
										for (var i = 0; i < value.length; i++) {
											if (i > 0)
												str += ",";
											str += value[i].name;
										}
										return str;
									}
								}
							}, {
								header : '类型',// '业务分类&BUSI_TYPE',
								isExp : false,
								dataIndex : 'busiType',
								renderer : function(value) {
									if (value != null){
										return KNOW_CATE.get(value);
									}else {
										return '';	
									}
								}
							}, {
								header : '开始时间',// '生效时间',
								isExp : false,
								dataIndex : 'enableTime'
							}, {
								header : '结束时间',// '过期时间',
								isExp : false,

								dataIndex : 'pastTime'
							}, {
								header : '回收时间',
								isExp : false,

								dataIndex : 'pastTime'
							}, {
								header : __ukSysKnowViewCount,// '浏览数',
								isExp : false,
								dataIndex : 'viewCount'
							}, {
								header : '评价',// '浏览数',
								isExp : false,
								dataIndex : 'viewCount'
							}, {
								header : __ukSysKnowSysKnowStatus,// '状态&KNOW_STATUS',
								isExp : false,
								hidden:true,
								dataIndex : 'sysKnowStatus',
								renderer : function(value) {
									return KNOW_STATUS.get(value);
								}
							}, {
								header : '回收人',
								isExp : false,
								hidden:true,
								dataIndex : 'createBy',
								renderer : function(value) {
									if (value == null) {
										return '';
									} else {
										return value.fullname;
									}
								}
							}, {
								header : '回收原因',
								isExp : false,
								hidden:true

							}, {
								header : '回收时间',
								isExp : false,
								hidden:true,
								dataIndex : 'pastTime'
							}, {
								header : __ukSysKnowSysKnowVersion,// '版本号',
								isExp : false,
								hidden : true,
								dataIndex : 'sysKnowVersion'
							}, {
								header : __ukSysKnowCreateBy,// '创建人内码',
								isExp : false,
								dataIndex : 'createBy',
								hidden : true,
								renderer : function(value) {
									if (value == null) {
										return '';
									} else {
										return value.fullname;
									}
								}
							}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 60,
								actions : [{
									// iconCls : 'btn-del',
									// qtip : __delete,
									// style : 'margin:0 3px 0
									// 3px'
									// }, {
									iconCls : 'btn-readdocument',
									qtip : '查看',
									style : 'margin:0 3px 0 3px'
								}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
						// end of columns
				});

				 this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			onSearch : function(obj) {
				 $search({
						searchPanel : this.searchPanel,
						gridPanel : this.gridPanel
					});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(record) {
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
				});
			},
			// 恢复记录
			recoverRs : function() {
				// 这里将相应的条目 恢复到相应的地方
				var grid = Ext.getCmp('UkRubbishSysKnowGrid');
				var rows = grid.getSelectionModel().getSelections();
				if (rows != null && rows.length > 0) {
					Ext.Msg.confirm('信息确认', '您确认要恢复所选记录吗？', function(btn) {
						if (btn == 'yes') {
							var ids = Array();
							for (var i = 0; i < rows.length; i++) {
								ids.push(rows[i].data.knowId);
							}
							Ext.Ajax.request({
								url : __ctxPath
										+ "/know/recoverUkSysKnow.do",
								params : {
									ids : ids
								},
								method : 'POST',
								success : function(response,
										options) {
									Ext.ux.Toast.msg('操作信息',
											'成功恢复该记录!');
									// for ( var i = 0; i <
									// rows.length; i++) {
									// grid.getStore().remove(rows[i]);
									// //执行删除
									// }
									grid.getStore().reload();
								},
								failure : function(response,
										options) {
									Ext.ux.Toast.msg('操作信息',
											'操作出错，请联系管理员!');
								}
							});
						}
					});
				} else {
					Ext.ux.Toast.msg(__toastMessage, "请选择要恢复的记录!");
				}
			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
					url : __ctxPath + '/know/multiDelRsUkSysKnow.do',
					ids : id,
					grid : this.gridPanel
				});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url : __ctxPath + '/know/multiDelRsUkSysKnow.do',
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
