/**
 * @author:cf0666@gmail.com
 * @class ConLanjieView
 * @extends Ext.Panel
 * @description [ConLanjie]管理
 * @company 优创融联科技
 * @createtime:
 */
ConLanjieView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ConLanjieView.superclass.constructor.call(this, {
							id : 'ConLanjieViewWin',
							title : '拦截记录',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['srcTypeId', '来源类别',
								new Ext.form.NumberField({
											name : 'srcTypeId',
											allowBlank : true
										})],
						['dirId', '方向', new Ext.form.NumberField({
											name : 'dirId',
											allowBlank : true
										})],
						['contactTypeId', '联系方式',
								new Ext.form.NumberField({
											name : 'contactTypeId',
											allowBlank : true
										})],
						['preContactNum', '区号/地区号', new Ext.form.TextField({
											name : 'preContactNum',
											allowBlank : true
										})],
						['mainContactNum', '号码/详细地址', new Ext.form.TextField({
											name : 'mainContactNum',
											allowBlank : true
										})],
						['lastContactNum', '分机号/邮编', new Ext.form.TextField({
											name : 'lastContactNum',
											allowBlank : true
										})],
						['content', '联络内容', new Ext.form.TextField({
											name : 'content',
											allowBlank : true
										})],
						['interceptTime', '拦截时间', new Ext.form.DateField({
											hiddenName : 'interceptTime',
											format : 'Y-m-d'
										})],
						['interceptReason', '拦截原因',
								new Ext.form.NumberField({
											name : 'interceptReason',
											allowBlank : true
										})],
						['synTime', '同步时间', new Ext.form.DateField({
											hiddenName : 'synTime',
											format : 'Y-m-d'
										})]]
				var ConLanjieAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ConLanjieSearchPanel',
							height : 35,
							items : [{
										text:'来源类别',
										style:'text-align:right'
									},{
										hiddenName : 'Q_srcTypeId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONLJJL_LYLB',
										width : 90
									},{
										text:'方向',
										style:'text-align:right'
									}, {
										hiddenName : 'Q_dirId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONLJJL_FX',
										width : 60
//									}, {
//
//										hiddenName : 'Q_contactTypeId_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONLJJL_LXFS'
//									}, {
//
//										name : 'Q_preContactNum_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_mainContactNum_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_lastContactNum_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_content_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_interceptTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//
//										hiddenName : 'Q_interceptReason_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONLJJL_LJYY'
//									}, {
//
//										name : 'Q_synTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
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
											new ConLanjieAdvancedSearchWin()
													.show();
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
							items : ['->', {
										iconCls : 'btn-mail_move',
										// text : __delete+'[ConLanjie]',
										text : '转移',
										xtype : 'button',
										scope : this,
										handler : this.moveToRs
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					printable : false,
					exportable : false,
					id : 'ConLanjieGrid',
					url : __ctxPath + "/customer/listConLanjie.do?Q_isMove_SN_EQ=0",
					fields : [{
								name : 'conId',
								type : 'int'
							}, 'srcTypeId', 'dirId', 'contactTypeId',
							'preContactNum', 'mainContactNum',
							'lastContactNum', 'content', 'interceptTime',
							'interceptReason', 'synTime'],
					columns : [{
								header : 'conId',
								dataIndex : 'conId',
								hidden : true
							}, {
								header : '来源类别',
								isExp : false,
								dataIndex : 'srcTypeId',
								renderer : function(value) {
									return CONLJJL_LYLB.get(value);
								}
							}, {
								header : '方向',
								isExp : false,
								dataIndex : 'dirId',
								renderer : function(value) {
									return CONLJJL_FX.get(value);
								}
							}, {
								header : '联系方式',
								isExp : false,
								dataIndex : 'contactTypeId',
								renderer : function(value) {
									return LXFS001.get(value);
								}
//							}, {
//								header : '区号/地区号',
//								isExp : false,
//								dataIndex : 'preContactNum'
							}, {
								header : '号码/详细地址',
								isExp : false,
								dataIndex : 'mainContactNum'
//							}, {
//								header : '分机号/邮编',
//								isExp : false,
//								dataIndex : 'lastContactNum'
							}, {
								header : '联络内容',
								isExp : false,
								dataIndex : 'content'
							}, {
								header : '拦截时间',
								isExp : false,
								dataIndex : 'interceptTime'
							}, {
								header : '拦截原因',
								isExp : false,
								dataIndex : 'interceptReason',
								renderer : function(value) {
									return CONLJJL_LJYY.get(value);
								}
//							}, {
//								header : '同步时间',
//								isExp : false,
//								dataIndex : 'synTime'
							}]
						// end of columns
				});

//				this.gridPanel.addListener('rowdblclick', this.rowClick);

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
				grid.getSelectionModel().each(function(rec) {
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('ConLanjieForm');
					if (aForm != null) {
						tabs.remove('ConLanjieForm');
					}
					aForm = new ConLanjieForm({
										conId : rec.data.conId
									}).show();
					tabs.add(aForm);
					tabs.activate(aForm);
				});
			},
			// 创建记录
			createRs : function() {
				// new ConLanjieForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConLanjieForm');
				if (aForm != null) {
					tabs.remove('ConLanjieForm');
				}
				aForm = new ConLanjieForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/customer/multiDelConLanjie.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/customer/multiDelConLanjie.do',
							grid : this.gridPanel,
							idName : 'conId'
						});
			},
			//转移
			moveToRs : function() {
					var rows = this.gridPanel.getSelectionModel().getSelections();
					var ids = '';
					var mygridpanel = 'ConLanjieGrid';
					if (rows != null && rows.length >= 1) {
						for (var i = 0; i < rows.length; i++) {
							if(i>0) ids+=',';
							ids += rows[i].data.conId;
						}
						new ConMoveLanjieForm({
							conId : ids,
							mygridpanel : mygridpanel
						}).show();
					} else {
						Ext.ux.Toast.msg(__toastMessage, '请选择要转移的记录!');
					}
			},
			// 编辑Rs
			editRs : function(record) {
				// new ConLanjieForm({
				// conId : record.data.conId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConLanjieForm');
				if (aForm != null) {
					tabs.remove('ConLanjieForm');
				}
				aForm = new ConLanjieForm({
							conId : record.data.conId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.conId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
