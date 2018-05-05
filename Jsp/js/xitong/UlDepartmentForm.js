/**
 * @author
 * @createtime
 * @class DepartmentForm
 * @extends Ext.Window
 * @description DepartmentForm表单
 * @company 优创融联科技
 */
UlDepartmentForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UlDepartmentForm.superclass.constructor.call(this, {
					id : 'UlDepartmentFormWin',
					title : this.title,
					iconCls : 'menu-department',
					layout : 'fit',
					width : 700,
					height : 500,
					minWidth : 399,
					minHeight : 169,
					items : this.formPanel,
					border : false,
					modal : true,
					plain : true,
					keys : {
						key : Ext.EventObject.ENTER,
						fn : this.save,
						scope : this
					},
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								handler : this.save,
								scope : this
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								handler : function() {
									Ext.getCmp('UlDepartmentFormWin').close();
								}
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		
		var depid = this.depid
				? this.depid
				: -1; // 主表Id
				
		var topbar_contact = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						scope : this,
						handler : this.removeSelRs_contact
					}, '->', {
						iconCls : 'btn-add',
						text : '添加',
						xtype : 'button',
						scope : this,
						handler : this.createRs_contact
					}]
		});
		//将gridpanel 改为editirgridpanel
		this.gridPanel_contact = new HT.EditorGridPanel({							
			region : 'center',
			tbar : topbar_contact,
			showPaging : false,
//			height : 40,
//			autoScroll:true,
			//单击一下触发修改
			clicksToEdit : 1,														
			autoHeight : true,
			id : 'UlContactGrid_dep',
			url : __ctxPath + "/xitong/getContactUlDepartment.do?depId="
					+ this.depid,
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
				header : '类型',
				dataIndex : 'contactType',
				editor : new MT.DicComboBox({
					name : 'ulContactEmp.contactType',
					allowBlank : false,
					displayField : 'itemName',
					valueField : 'itemId',
					mode : 'local',
					triggerAction : 'all',
					forceSelection : false,
                    editable : false,
					hiddenName : 'ulContactEmp.contactType',
                    itemKey : 'LXFS001'
				}),
                renderer : function(value) {
//                    if (value != null) {
                        return LXFS001.get(value);
//                    }
                }
			}, {
				header : '地址/号码',
				dataIndex : 'contactValue',
				editor : new Ext.form.TextField({
//							allowBlank : false,
							id : 'contactValue',
                            maxLength : 20
						})
			}]// end of columns
		});
		this.formPanel = new Ext.FormPanel({
					frame : false,
					id : 'uldepartmentForm',
					bodyStyle : 'padding : 5px;',
					layout : 'form',
                    labelAlign:'right',
					defaultType : 'textfield',
					autoScroll : true,
					reader : new Ext.data.JsonReader({
								root : 'data'
							}, [{
										name : 'depId',
										mapping : 'depid'
									}, {
										name : 'depName',
										mapping : 'depname'
									}, {
										name : 'parentId',
										mapping : 'parentid'
									}, {
										name : 'type',
										mapping : 'type'
									}, {
										name : 'jingyingyewu',
										mapping : 'jingyingyewu'
									}, {
										name : 'yewushuoming',
										mapping : 'yewushuoming'
									}, {
										name : 'xiangxidizhi',
										mapping : 'xiangxidizhi'
									},{
										name : 'guojia',
										mapping : 'ulDepartmentguojia'
									},{
										name : 'sheng',
										mapping : 'ulDepartmentsheng'
									},{
										name : 'shi',
										mapping : 'ulDepartmentshi'
									},{
										name : 'qu',
										mapping : 'ulDepartmentqu'
									},{
										name : 'status',
										mapping : 'status'
									},{
										name : 'path',
										mapping : 'path'
									}]),

					defaults : {
						anchor : '95%,95%',
						selectOnFocus : true,
						msgTarget : 'side'
					},
					items : [{
								xtype : 'hidden',
								name : 'ulDepartment.depid',
								id : 'depId'
							}, {
								xtype : 'hidden',
								name : 'ulDepartment.status',
								id : 'status'
							},{
								xtype : 'hidden',
								name : 'ulDepartment.parentid',
								id : 'parentId',
								value : this.nodeId
							}, {
								xtype : 'hidden',
								name : 'ulDepartment.path',
								id : 'path'
							}, {
//								fieldLabel : '机构名称<font style="color:red">*</font>',
								fieldLabel : '机构名称',
								name : 'ulDepartment.depname',
								blankText : '机构名为必填!',
                                allowBlank : false,
								id : 'depName',
                                maxLength : 40
							}, {
//								fieldLabel : '机构类型<font style="color:red">*</font>',
								fieldLabel : '机构类型',
								hiddenName : 'ulDepartment.type',
								blankText : '机构类型为必填!',
								id : 'type',
								editable : false,
                                allowBlank : false,
								itemKey : 'ZZJGLX0001',
								xtype : 'mtdiccombolocal'
							}, {
								fieldLabel : '经营业务',
								hiddenName : 'ulDepartment.jingyingyewu',
								blankText : '经营业务为必填!',
								id : 'jingyingyewu',
								editable : false,
								itemKey : 'CONKHHY',
								xtype : 'mtdiccombolocal'
							}, {
								fieldLabel : '业务说明',
								name : 'ulDepartment.yewushuoming',
								blankText : '业务说明为必填!',
								id : 'yewushuoming',
								xtype : 'textarea',
                                maxLength : 200
							}, {
								name : 'ulDepartment.sheng', // 省隐藏域
								id : 'ulDepartmentsheng',
								xtype : 'hidden'
							}, {
								name : 'ulDepartment.shi', // 市隐藏域
								id : 'ulDepartmentshi',
								xtype : 'hidden'
							}, {
								name : 'ulDepartment.qu', // 地区隐藏域
								id : 'ulDepartmentqu',
								xtype : 'hidden'
							},{
								layout : 'column',
								xtype : 'container',
								defaults : {
									border : false
								},
								items : [{
									columnWidth : .36,
									layout : "form",
									items : [{
										fieldLabel : '所在地区',
										id : 'ulDepartmentsheng_combo',
                                        xtype : 'combo',
                                        lazyInit : false,
                                        mode : 'local',
                                        width : 125,
                                        editable : false,
                                        triggerAction : 'all',
                                        store : AppUtil.address2.getStore_region(0,'ulDepartment', this.adrList),
                                        displayField : 'regionName',
                                        valueField : 'regionId',
                                        listeners : AppUtil.address2.getListeners_region(0,'ulDepartment')
									}]
								}, {
									columnWidth : .2,
									layout : "form",
									items : [{
										// name :
										// 'ulDepartment.shi', //
										// 市
										id : 'ulDepartmentshi_combo',
										// hiddenName :
										// 'ulDepartment.shi',
										xtype : 'combo',
										width : 125,
										lazyInit : false,
										hideLabel:true,
										mode : 'local',
										editable : false,
										triggerAction : 'all',
										store :AppUtil.address2.getStore_region(1,'ulDepartment', this.adrList),
										displayField : 'regionName',
										valueField : 'regionId',
										listeners : AppUtil.address2.getListeners_region(1,'ulDepartment')

									}]
								}, {
									columnWidth : .2,
									layout : "form",
									items : [{
										// name :
										// 'ulDepartment.qu',
										id : 'ulDepartmentqu_combo',
										// hiddenName :
										// 'ulDepartment.qu',
										xtype : 'combo',
										mode : 'local',
										width : 125,
										hideLabel:true,
										editable : false,
										triggerAction : 'all',
										store :AppUtil.address2.getStore_region(2,'ulDepartment', this.adrList),
										displayField : 'regionName',
										valueField : 'regionId',
										listeners : AppUtil.address2.getListeners_region(2,'ulDepartment')
									}]
								}]
							},{
								fieldLabel : '详细地址',
								xtype : 'textarea',
								name : 'ulDepartment.xiangxidizhi',
								id : 'xiangxidizhi',
                                maxLength : 100
							}, {
								xtype : 'fieldset',
								title : '联系方式<font style="color:red">*</font>',
								collapsed : false,
								collapsible : true,
								autoHeight : true,
                                layout : 'fit',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.gridPanel_contact]
							}]
				});
		if (this.adrList != null && this.adrList != 'undefined') {
			Ext.getCmp('ulDepartmentsheng').setValue(this.sheng);
			Ext.getCmp('ulDepartmentshi').setValue(this.shi);
			Ext.getCmp('ulDepartmentqu').setValue(this.qu);
		}
	},

	createRs_contact : function() {
		var store = this.gridPanel_contact.getStore();
		var recordType = store.recordType;
		store.add(new recordType({})); // 添加一行空store
	},

	removeSelRs_contact : function() {
//		$delGridRs({
//					url : __ctxPath + '/xitong/multiDelContactUlDepartment.do',
//					grid : this.gridPanel_contact,
//					idName : 'contactEmplId'
//				});
//		this.gridPanel_contact.getStore().reload();
		//删除,只删store 不删除数据库
		var store = this.gridPanel_contact.getStore();
		var sm = this.gridPanel_contact.getSelectionModel();
		var cell = sm.getSelections();
		if(cell.length<1){
			Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
		} else {
			store.remove(cell);
		}						
	},

	/**
	 * 保存
	 */
	save : function() {
		//获得gridPanel_contact的store
		if (this.formPanel.getForm().isValid()) {
			var store = this.gridPanel_contact.getStore();
			//定义数组 row
			var rows = [];																	
			
			//store.getCount()为store的长度
			for (var i = 0; i < store.getCount(); i++) {
				// 将每一行store的值放入row数组里
				rows.push(store.getAt(i).data);												
			}
            var panel = this.formPanel;
			//判断grid提交的值是否为空
			if (store.getCount() > 0) {														
				$postForm({
					formPanel : panel,
					url : __ctxPath + '/xitong/addUlDepartment.do',
					params : {
						//将数组提交至后台  details
						details : Ext.encode(rows)									
					},
					callback : function(fp, action) {
						//获得view页面的grid 重新加载
						var gridPanel = Ext.getCmp('UlDepView');				
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						Ext.getCmp('uldepartmentTreePanel').root.reload();
						Ext.getCmp('UlDepartmentFormWin').close();
					}
				});
			} else {
				Ext.ux.Toast.msg('操作信息', '请至少添加一种联系方式！');
			}
		}		
	}
	
});