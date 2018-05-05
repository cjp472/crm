/**
 * @author:cf0666@gmail.com
 * @class CusCompanyView
 * @extends Ext.Panel
 * @description [CusCompany]管理
 * @company 优创融联科技
 * @createtime:
 */
MyCusCompanyView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				MyCusCompanyView.superclass.constructor.call(this, {
							id : 'MyCusCompanyViewWin',
							title : '企业客户管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['busiCode', '业务编码', new Ext.form.TextField({
											name : 'busiCode',
											allowBlank : true
										})],
						['cusCatId', '客户类别：冠名客户', new Ext.form.NumberField({
											name : 'cusCatId',
											allowBlank : true
										})],
						['nameCn', '中文名称', new Ext.form.TextField({
											name : 'nameCn',
											allowBlank : true
										})],
						['nameEn', '英文名称', new Ext.form.TextField({
											name : 'nameEn',
											allowBlank : true
										})],
						['nameAli', '简称', new Ext.form.TextField({
											name : 'nameAli',
											allowBlank : true
										})],
						['simpleCode', '简码', new Ext.form.TextField({
											name : 'simpleCode',
											allowBlank : true
										})],
						['enrollCode', '组织结构代码证', new Ext.form.TextField({
											name : 'enrollCode',
											allowBlank : true
										})],
						['taxnumber', '税务登记号', new Ext.form.TextField({
											name : 'taxnumber',
											allowBlank : true
										})],
						['occupationId', '所属行业', new Ext.form.NumberField({
											name : 'occupationId',
											allowBlank : true
										})],
						['companyCharacterId', '企业性质，外企、国有、私营等',
								new Ext.form.NumberField({
											name : 'companyCharacterId',
											allowBlank : true
										})],
						['companyTypeId', '企业类型，小规模纳税人等',
								new Ext.form.NumberField({
											name : 'companyTypeId',
											allowBlank : true
										})],
						['companyCreditId', '供应商信用级别，AAA、BBB等',
								new Ext.form.NumberField({
											name : 'companyCreditId',
											allowBlank : true
										})],
						['regionId', '所在地区', new Ext.form.NumberField({
											name : 'regionId',
											allowBlank : true
										})],
						['tradeAddress', '企业经营地址(包括地区和详细信息)',
								new Ext.form.TextField({
											name : 'tradeAddress',
											allowBlank : true
										})],
						['tradeZipcode', '经营地址邮编', new Ext.form.TextField({
											name : 'tradeZipcode',
											allowBlank : true
										})],
						['tradeScope', '企业经营范围', new Ext.form.TextField({
											name : 'tradeScope',
											allowBlank : true
										})],
						['registerAddress', '企业注册地址(包括地区和详细信息)',
								new Ext.form.TextField({
											name : 'registerAddress',
											allowBlank : true
										})],
						['registerZipcode', '注册地址邮编', new Ext.form.TextField({
											name : 'registerZipcode',
											allowBlank : true
										})],
						['legalName', '法人名称', new Ext.form.TextField({
											name : 'legalName',
											allowBlank : true
										})],
						['registerMoney', '注册资金', new Ext.form.TextField({
											name : 'registerMoney',
											allowBlank : true
										})],
						['regTime', '注册日期', new Ext.form.DateField({
											hiddenName : 'regTime',
											format : 'Y-m-d'
										})],
						['companyUrl', '公司网址', new Ext.form.TextField({
											name : 'companyUrl',
											allowBlank : true
										})],
						['companyRemark', '公司简介', new Ext.form.TextField({
											name : 'companyRemark',
											allowBlank : true
										})],
						['hasChecked', '是否已复核：1=是、0=否',
								new Ext.form.NumberField({
											name : 'hasChecked',
											allowBlank : true
										})],
						['staId', '状态：有效、注销', new Ext.form.NumberField({
											name : 'staId',
											allowBlank : true
										})],
						['remark', '备注', new Ext.form.TextField({
											name : 'remark',
											allowBlank : true
										})],
						['creUseId', '创建人ID', new Ext.form.NumberField({
											name : 'creUseId',
											allowBlank : true
										})],
						['creDat', '创建日期', new Ext.form.DateField({
											hiddenName : 'creDat',
											format : 'Y-m-d'
										})],
						['updUseId', '修改人ID', new Ext.form.NumberField({
											name : 'updUseId',
											allowBlank : true
										})],
						['updDat', '修改日期', new Ext.form.DateField({
											hiddenName : 'updDat',
											format : 'Y-m-d'
										})],
						['ext1', '扩展字段1', new Ext.form.TextField({
											name : 'ext1',
											allowBlank : true
										})],
						['ext2', '扩展字段', new Ext.form.TextField({
											name : 'ext2',
											allowBlank : true
										})],
						['ext3', '扩展字段', new Ext.form.TextField({
											name : 'ext3',
											allowBlank : true
										})],
						['ext4', '扩展字段', new Ext.form.TextField({
											name : 'ext4',
											allowBlank : true
										})],
						['ext5', '扩展字段', new Ext.form.TextField({
											name : 'ext5',
											allowBlank : true
										})],
						['ext6', '扩展字段', new Ext.form.TextField({
											name : 'ext6',
											allowBlank : true
										})],
						['ext8', '扩展字段', new Ext.form.TextField({
											name : 'ext8',
											allowBlank : true
										})],
						['ext7', '扩展字段', new Ext.form.TextField({
											name : 'ext7',
											allowBlank : true
										})],
						['ext9', '扩展字段', new Ext.form.TextField({
											name : 'ext9',
											allowBlank : true
										})],
						['ext10', '扩展字段', new Ext.form.TextField({
											name : 'ext10',
											allowBlank : true
										})],
						['ext11', '扩展字段', new Ext.form.TextField({
											name : 'ext11',
											allowBlank : true
										})],
						['ext12', '扩展字段', new Ext.form.TextField({
											name : 'ext12',
											allowBlank : true
										})],
						['ext13', '扩展字段', new Ext.form.TextField({
											name : 'ext13',
											allowBlank : true
										})],
						['ext14', '扩展字段', new Ext.form.TextField({
											name : 'ext14',
											allowBlank : true
										})],
						['ext15', '扩展字段', new Ext.form.TextField({
											name : 'ext15',
											allowBlank : true
										})],
						['ext16', '扩展字段', new Ext.form.TextField({
											name : 'ext16',
											allowBlank : true
										})],
						['ext17', '扩展字段', new Ext.form.TextField({
											name : 'ext17',
											allowBlank : true
										})],
						['ext18', '扩展字段', new Ext.form.TextField({
											name : 'ext18',
											allowBlank : true
										})],
						['ext19', '扩展字段', new Ext.form.TextField({
											name : 'ext19',
											allowBlank : true
										})],
						['ext20', '扩展字段', new Ext.form.TextField({
											name : 'ext20',
											allowBlank : true
										})]]
				var CusCompanyAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
							title : '[CusCompany]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CusCompanySearchPanel',
							height : 35,
							items : [{text:'客户编码'},{

										name : 'Q_customerNo_S_EQ',
										xtype : 'textfield'
									}, {

										text:'中文名称'
									}, {

										name : 'Q_nameCn_S_EQ',
										xtype : 'textfield'
									}, {text:'英文名称'},{

										name : 'Q_nameEn_S_EQ',
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
										handler : function(){
											new CusCompanyAdvancedSearchWin().show()
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
							items : [{
										iconCls : 'btn-add',
										text : __create + '企业客户',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										text : __delete + '企业客户',
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
					id : 'CusCompanyGrid',
					url : __ctxPath + "/customer/listCusCompany.do",
					fields : [{
								name : 'customerId',
								type : 'int'
							},  'customerNo','busiCode', 'cusCatId', 'nameCn', 'nameEn',
							'nameAli', 'simpleCode', 'enrollCode', 'taxnumber',
							'occupationId', 'companyCharacterId',
							'companyTypeId', 'companyCreditId', 'regionId',
							'tradeAddress', 'tradeZipcode', 'tradeScope',
							'registerAddress', 'registerZipcode', 'legalName',
							'registerMoney', 'regTime', 'companyUrl',
							'companyRemark', 'hasChecked', 'staId', 'remark',
							'creUseId', 'creDat', 'updUseId', 'updDat', 'ext1',
							'ext2', 'ext3', 'ext4', 'ext5', 'ext6', 'ext8',
							'ext7', 'ext9', 'ext10', 'ext11', 'ext12', 'ext13',
							'ext14', 'ext15', 'ext16', 'ext17', 'ext18',
							'ext19', 'ext20'],
					columns : [{
								header : 'customerid',
								dataIndex : 'customerid',
								hidden : true
							}, {
								header : '客户编码',
								isExp : false,

								dataIndex : 'customerNo'
							}, {
								header : '业务编码',
								isExp : false,

								dataIndex : 'busiCode'
							}, {
								header : '客户类别：冠名客户',
								isExp : false,

								dataIndex : 'cusCatId'
							}, {
								header : '中文名称',
								isExp : false,

								dataIndex : 'nameCn'
							}, {
								header : '英文名称',
								isExp : false,

								dataIndex : 'nameEn'
							}, {
								header : '简称',
								isExp : false,

								dataIndex : 'nameAli'
							}, {
								header : '简码',
								isExp : false,

								dataIndex : 'simpleCode'
							}, {
								header : '组织结构代码证',
								isExp : false,
								hidden : true,
								dataIndex : 'enrollCode'
							}, {
								header : '税务登记号',
								isExp : false,
								hidden : true,
								dataIndex : 'taxnumber'
							}, {
								header : '所属行业',
								isExp : false,

								dataIndex : 'occupationId'
							}, {
								header : '企业性质，外企、国有、私营等',
								isExp : false,

								dataIndex : 'companyCharacterId'
							}, {
								header : '企业类型，小规模纳税人等',
								isExp : false,
								hidden : true,
								dataIndex : 'companyTypeId'
							}, {
								header : '供应商信用级别，AAA、BBB等',
								isExp : false,
								hidden : true,
								dataIndex : 'companyCreditId'
							}, {
								header : '所在地区',
								isExp : false,
								hidden : true,
								dataIndex : 'regionId'
							}, {
								header : '企业经营地址(包括地区和详细信息)',
								isExp : false,
								hidden : true,
								dataIndex : 'tradeAddress'
							}, {
								header : '经营地址邮编',
								isExp : false,
								hidden : true,
								dataIndex : 'tradeZipcode'
							}, {
								header : '企业经营范围',
								isExp : false,
								hidden : true,
								dataIndex : 'tradeScope'
							}, {
								header : '企业注册地址(包括地区和详细信息)',
								isExp : false,
								hidden : true,
								dataIndex : 'registerAddress'
							}, {
								header : '注册地址邮编',
								isExp : false,
								hidden : true,
								dataIndex : 'registerZipcode'
							}, {
								header : '法人名称',
								isExp : false,

								dataIndex : 'legalName'
							}, {
								header : '注册资金',
								isExp : false,

								dataIndex : 'registerMoney'
							}, {
								header : '注册日期',
								isExp : false,

								dataIndex : 'regTime'
							}, {
								header : '公司网址',
								isExp : false,
								hidden : true,
								dataIndex : 'companyUrl'
							}, {
								header : '公司简介',
								isExp : false,
								hidden : true,
								dataIndex : 'companyRemark'
							}, {
								header : '是否已复核：1=是、0=否',
								isExp : false,
								hidden : true,
								dataIndex : 'hasChecked'
							}, {
								header : '状态：有效、注销',
								isExp : false,

								dataIndex : 'staId'
//							}, {
//								header : '备注',
//								isExp : false,
//
//								dataIndex : 'remark'
//							}, {
//								header : '创建人ID',
//								isExp : false,
//
//								dataIndex : 'creUseId'
//							}, {
//								header : '创建日期',
//								isExp : false,
//
//								dataIndex : 'creDat'
//							}, {
//								header : '修改人ID',
//								isExp : false,
//
//								dataIndex : 'updUseId'
//							}, {
//								header : '修改日期',
//								isExp : false,
//
//								dataIndex : 'updDat'
//							}, {
//								header : '扩展字段1',
//								isExp : false,
//
//								dataIndex : 'ext1'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext2'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext3'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext4'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext5'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext6'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext8'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext7'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext9'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext10'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext11'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext12'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext13'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext14'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext15'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext16'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext17'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext18'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext19'
//							}, {
//								header : '扩展字段',
//								isExp : false,
//
//								dataIndex : 'ext20'
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 100,
										actions : [{
													iconCls : 'btn-del',
													qtip : __delete,
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-edit',
													qtip : __edit,
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-addCusLinkman',
													qtip : '添加联系人',
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-editCusLinkman',
													qtip : '管理联系人',
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
				grid.getSelectionModel().each(function(rec) {
							new CusCompanyForm({
										customerId : rec.data.customerId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new CusCompanyForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusCompanyForm');
				if (aForm != null) {
					tabs.remove('CusCompanyForm');
				}
				aForm = new CusCompanyForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/customer/multiDelCusCompany.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/customer/multiDelCusCompany.do',
							grid : this.gridPanel,
							idName : 'customerid'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusCompanyForm');
				if (aForm != null) {
					tabs.remove('CusCompanyForm');
				}
				aForm = new CusCompanyForm({
					customerId : record.data.customerId
				});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			/**
			 * 添加联系人
			 */
			addLinkman : function(customerId,customerName) {
				var cusForm = new CusLinkmanForm();
				cusForm.show();
				cusForm.getCmpByName('cusLinkman.customerId').setValue(customerId);
				cusForm.getCmpByName('customerName').setValue(customerName);
				Ext.getCmp('customerSelectButton').setDisabled(true);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.customerId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					case 'btn-addCusLinkman' :
						this.addLinkman.call(this, record);
						break;
					case 'btn-editCusLinkman' :
						this.editLinkman.call(this, record);
						break;
					default :
						break;
				}
			}
		});
