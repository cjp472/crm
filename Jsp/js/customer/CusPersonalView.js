/**
 * @author:cf0666@gmail.com
 * @class CusPersonalView
 * @extends Ext.Panel
 * @description [CusPersonal]管理
 * @company 优创融联科技
 * @createtime:
 */
CusPersonalView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CusPersonalView.superclass.constructor.call(this, {
							id : 'CusPersonalViewWin',
							title : '个人客户管理',
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
						['gender', '性别', new Ext.form.TextField({
											name : 'gender',
											allowBlank : true
										})],
						['country', '国籍', new Ext.form.NumberField({
											name : 'country',
											allowBlank : true
										})],
						['regionId', '所在区域', new Ext.form.NumberField({
											name : 'regionId',
											allowBlank : true
										})],
						['credTypId', '证件类型', new Ext.form.NumberField({
											name : 'credTypId',
											allowBlank : true
										})],
						['credNum', '证件号码', new Ext.form.TextField({
											name : 'credNum',
											allowBlank : true
										})],
						['credDurDat', '证件有效期', new Ext.form.DateField({
											hiddenName : 'credDurDat',
											format : 'Y-m-d'
										})],
						['birthday', '生日', new Ext.form.DateField({
											hiddenName : 'birthday',
											format : 'Y-m-d'
										})],
						['workCompany', '工作单位', new Ext.form.TextField({
											name : 'workCompany',
											allowBlank : true
										})],
						['cusTitId', '客户称谓',
								new Ext.form.NumberField({
											name : 'cusTitId',
											allowBlank : true
										})],
						['cusEduId', '教育程度', new Ext.form.NumberField({
											name : 'cusEduId',
											allowBlank : true
										})],
						['cusTraId', '客户行业',
								new Ext.form.NumberField({
											name : 'cusTraId',
											allowBlank : true
										})],
						['jobTypId', '客户职位',
								new Ext.form.NumberField({
											name : 'jobTypId',
											allowBlank : true
										})],
						['cusGraId', '客户等级',
								new Ext.form.NumberField({
											name : 'cusGraId',
											allowBlank : true
										})],
						['hasMarried', '婚姻', new Ext.form.NumberField({
											name : 'hasMarried',
											allowBlank : true
										})],
						['haveChild', '子女', new Ext.form.NumberField({
											name : 'haveChild',
											allowBlank : true
										})],
						['salaryId', '收入范围', new Ext.form.NumberField({
											name : 'salaryId',
											allowBlank : true
										})],
						['cusFromId', '客户来源', new Ext.form.NumberField({
											name : 'cusFromId',
											allowBlank : true
										})],
						['hasChecked', '是否已复核',
								new Ext.form.NumberField({
											name : 'hasChecked',
											allowBlank : true
										})],
						['staId', '状态', new Ext.form.NumberField({
											name : 'staId',
											allowBlank : true
										})],
						['remark', '备注', new Ext.form.TextField({
											name : 'remark',
											allowBlank : true
										})],
						['creUseId', '创建人', new Ext.form.NumberField({
											name : 'creUseId',
											allowBlank : true
										})],
						['creDat', '创建日期', new Ext.form.DateField({
											hiddenName : 'creDat',
											format : 'Y-m-d'
										})],
						['updUseId', '修改人', new Ext.form.NumberField({
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
				var CusPersonalAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'CusPersonalSearchPanel',
							height : 35,
							items : [{text:'客户编码'},{

										name : 'Q_customerNo_S_EQ',
										xtype : 'textfield'
									}, {

										text:'业务编号'
									},{

										name : 'Q_busiCode_S_EQ',
										xtype : 'textfield'
									},{

										text:'中文姓名'
									}, {

										name : 'Q_nameCn_S_EQ',
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
											new CusPersonalAdvancedSearchWin().show()
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
							items : ['->',{
										iconCls : 'btn-add',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									},'-',{
										iconCls : 'btn-del',
										text : __delete,
										xtype : 'button',
										scope : this,
										handler : this.removeSelRs
									},'-', {
										iconCls : 'btn-del',
										text : '名单抽取',
										xtype : 'button',
										scope : this,
										handler : function(){
										
										}
									},'-', {
										iconCls : 'btn-del',
										text : '导入',
										xtype : 'button',
										scope : this,
										handler : function(){
											
										}
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					printable : false,
					exportable : true,
					id : 'CusPersonalGrid',
					url : __ctxPath + "/customer/listCusPersonal.do",
					fields : [{
								name : 'customerId',
								type : 'int'
							}, 'customerNo','busiCode', 'cusCatId', 'nameCn', 'nameEn',
							'nameAli', 'gender', 'country', 'regionId',
							'credTypId', 'credNum', 'credDurDat', 'birthday',
							'workCompany', 'cusTitId', 'cusEduId', 'cusTraId',
							'jobTypId', 'cusGraId', 'hasMarried', 'haveChild',
							'salaryId', 'cusFromId', 'hasChecked', 'staId',
							'remark', 'creUseId', 'creDat', 'updUseId',
							'updDat', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5',
							'ext6', 'ext8', 'ext7', 'ext9', 'ext10', 'ext11',
							'ext12', 'ext13', 'ext14', 'ext15', 'ext16',
							'ext17', 'ext18', 'ext19', 'ext20'],
					columns : [{
								header : '客户内码',
								dataIndex : 'customerId',
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
								header : '客户类别',
								isExp : false,
								dataIndex : 'cusCatId',
								renderer : function(value) {
									return CONKHLB.get(value);
								}
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
								header : '性别',
								isExp : false,
								hidden : true,
								dataIndex : 'gender',
								renderer : function(value) {
									return XB001.get(value);
								}
							}, {
								header : '国籍',
								isExp : false,
								hidden : true,
								dataIndex : 'country',
								renderer : function(value) {
									return XZQH.get(value);
								}
							}, {
								header : '所在区域',
								isExp : false,
								hidden : true,
								dataIndex : 'regionId',
								renderer : function(value) {
									return XB001.get(value);
								}
							}, {
								header : '证件类型',
								isExp : false,
								hidden : true,
								dataIndex : 'credTypId',
								renderer : function(value) {
									return GGZJLX.get(value);
								}
							}, {
								header : '证件号码',
								isExp : false,
								hidden : true,
								dataIndex : 'credNum'
							}, {
								header : '证件有效期',
								isExp : false,
								hidden : true,
								dataIndex : 'credDurDat'
							}, {
								header : '生日',
								isExp : false,
								hidden : true,
								dataIndex : 'birthday'
							}, {
								header : '工作单位',
								isExp : false,
								hidden : true,
								dataIndex : 'workCompany'
							}, {
								header : '称谓',
								isExp : false,
								hidden : true,
								dataIndex : 'cusTitId',
								renderer : function(value) {
									return CONKHCW.get(value);
								}
							}, {
								header : '教育程度',
								isExp : false,
								hidden : true,
								dataIndex : 'cusEduId',
								renderer : function(value) {
									return YGXL0001.get(value);
								}
							}, {
								header : '客户行业',
								isExp : false,
								hidden : true,
								dataIndex : 'cusTraId',
								renderer : function(value) {
									return CONKHHY.get(value);
								}
							}, {
								header : '客户职位',
								isExp : false,
								hidden : true,
								dataIndex : 'jobTypId',
								renderer : function(value) {
									return CONKHZW.get(value);
								}
							}, {
								header : '客户等级',
								isExp : false,
								hidden : true,
								dataIndex : 'cusGraId',
								renderer : function(value) {
									return CONKHJB.get(value);
								}
							}, {
								header : '婚姻',
								isExp : false,
								hidden : true,
								dataIndex : 'hasMarried',
								renderer : function(value) {
									return YorN.get(value);
								}
							}, {
								header : '子女',
								isExp : false,
								hidden : true,
								dataIndex : 'haveChild',
								renderer : function(value) {
									return YorN.get(value);
								}
							}, {
								header : '收入范围',
								isExp : false,
								hidden : true,
								dataIndex : 'salaryId',
								renderer : function(value) {
									return XB001.get(value);
								}
							}, {
								header : '客户来源',
								isExp : false,
								hidden : true,
								dataIndex : 'cusFromId',
								renderer : function(value) {
									return CONKHLY.get(value);
								}
							}, {
								header : '复核',
								isExp : false,
								hidden : true,
								dataIndex : 'hasChecked',
								renderer : function(value) {
									return YorN.get(value);
								}
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'staId',
								renderer : function(value) {
									return YHZT001.get(value);
								}
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
							var tabs = Ext.getCmp('centerTabPanel');
							var aForm = Ext.getCmp('CusPersonalFormWin');
							if (aForm != null) {
								tabs.remove(aForm);
								aForm.destroy();
							}
							aForm = new CusPersonalForm({
										customerId : rec.data.customerId
									});
							tabs.add(aForm);
							tabs.activate(aForm);
						});
			},
			// 创建记录
			createRs : function() {
				// new CusPersonalForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusPersonalForm');
				if (aForm != null) {
					tabs.remove('CusPersonalForm');
				}
				aForm = new CusPersonalForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录改成注销记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath
									+ '/customer/multiDelCusPersonal.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除改成注销记录
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath
									+ '/customer/multiDelCusPersonal.do',
							grid : this.gridPanel,
							idName : 'customerid'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('CusPersonalFormWin');
				if (aForm != null) {
					tabs.remove(aForm);
					aForm.destroy();
				}
				aForm = new CusPersonalForm({
							customerId : record.data.customerId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
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
					default :
						break;
				}
			}
		});
