
GlobalTypeForm = Ext.extend(Ext.Window, {
			// 内嵌FormPanel
			formPanel : null,
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				GlobalTypeForm.superclass.constructor.call(this, {
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 170,
							labelAlign:'right',
							width : 400,
							maximizable : true,
							title : '分类详细信息',
							buttonAlign : 'center',
							buttons : this.buttons
						});
			},// end of the constructor
			// 初始化组件
			initUIComponents : function() {
			
				checkOrgName = function() {
					var orgName = Ext.get('typeName').dom.value;
					var orgId = Ext.get('proTypeId').dom.value;
					var parentId = Ext.get('parentId').dom.value;
					if(orgName=='' || orgName==null){
							Ext.getCmp('typeName').markInvalid('名称是必填项,请输入!');
							Ext.ux.Toast.msg('操作信息', '名称是必填项,请输入!');
							Ext.getCmp('btnSave').disable();
					}else{
						Ext.Ajax.request({
								url : __ctxPath + '/system/listGlobalType.do',
								params : {
									'Q_typeName_S_EQ' : orgName,
									'Q_proTypeId_L_NEQ' : orgId,
									'Q_parentId_L_EQ' : parentId
//									'Q_catKey_S_EQ' : 'FLOW'
								},
								success : function(form, action) {
									var info = Ext.decode(form.responseText);
									if (info.totalCounts > 0) {
										Ext.getCmp('typeName').markInvalid('对不起,该名称已存在,请重新输入!');
										Ext.ux.Toast.msg('操作信息', '对不起,该名称已存在,请重新输入!');
										Ext.getCmp('btnSave').disable();
									} else {
										Ext.getCmp('typeName').clearInvalid(true);
										Ext.getCmp('btnSave').enable();
									}
								}
							});
					}
				}
			
			checkNodeKey = function() {
					var nodeKey = Ext.get('nodeKey').dom.value;
					var orgId = Ext.get('proTypeId').dom.value;
					var reg = new RegExp("^[a-zA-Z_]{1,}$");
						Ext.Ajax.request({
						url : __ctxPath + '/system/listGlobalType.do',
						params : {
							'Q_nodeKey_S_EQ' : nodeKey,
							'Q_proTypeId_L_NEQ' : orgId
						},
						success : function(form, action) {
							if (nodeKey == '' || nodeKey == null) {
								Ext.getCmp('nodeKey')
										.markInvalid('编号是必填项,请输入!');
								Ext.ux.Toast.msg('操作信息', '编号是必填项,请输入!');
								Ext.getCmp('btnSave').disable();
							} else {
								if(!reg.test(nodeKey)){
									Ext.ux.Toast.msg('操作信息','只能输入字母和下划线!');
									Ext.getCmp('nodeKey').markInvalid('只能输入字母和下划线!');
									Ext.getCmp('btnSave').disable();
								}else{
									var info = Ext.decode(form.responseText);
									if (info.totalCounts > 0) {
										Ext.getCmp('nodeKey')
												.markInvalid('对不起,该编号已存在,请重新输入!');
										Ext.ux.Toast.msg('操作信息',
												'对不起,该编号已存在,请重新输入!');
										Ext.getCmp('btnSave').disable();
									} else {
										Ext.getCmp('nodeKey').clearInvalid(true);
										Ext.getCmp('btnSave').enable();
									}
								}
							}
						}
					});

		}
				
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							bodyStyle : 'padding:10px 10px 10px 10px',
							border : false,
							labelAlign:'right',
							url : __ctxPath + '/system/saveGlobalType.do',
							id : 'GlobalTypeForm',
							defaults : {
								anchor : '98%,98%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'globalType.proTypeId',
								id : 'proTypeId',
								xtype : 'hidden',
								value : this.proTypeId == null
										? ''
										: this.proTypeId
							}, {
								fieldLabel : '名称',
								name : 'globalType.typeName',
								id : 'typeName',
								maxLength : 64,
								validator : checkOrgName,
								validationEvent : 'blur',
								allowBlank:false
							}, {
								fieldLabel : '父节点',
								value:this.parentId,
								xtype:'hidden',
								name : 'globalType.parentId',
								id : 'parentId'
							}, {
								xtype:'hidden',
								value:this.flag,
								name : 'globalType.category'
							}, {
								fieldLabel : '键值编码',
								name : 'globalType.nodeKey',
								allowBlank:false,
								id : 'nodeKey',
								readOnly : this.proTypeId ? true : false,
								validator : checkNodeKey,
								validationEvent : 'blur'
							}, {
								fieldLabel : '节点分类Key',
								name : 'globalType.catKey',
								allowBlank:false,
								xtype:'hidden',
								maxLength : 64,
								id : 'catKey',
								value:this.catKey
							}, {
//								fieldLabel : '树形分类',
//								allowBlank:false,
//								id : 'isTree',
//								hiddenName : 'globalType.isTree',
								name : 'globalType.isTree',
								xtype : 'hidden',
//								editable : false,
//								mode : 'local',
//								triggerAction : 'all',
								value : 0
//								store : [ [ '1', '是' ],[ '0', '否' ] ]
							},{
								xtype : 'hidden',
								id : 'globalType.superSort_hid',
								name : 'globalType.superSort'
							},{
								fieldLabel : '上级分类',
								anchor : '98%',
								xtype : 'treecomboy',
								hideLabel : this.proTypeId ? false : true,
								editable : true,
								hidden : this.proTypeId ? false : true,
								lazyInit : true,
								tplId : 'tree_tplId',
//								hiddenName : 'globalType.superSort',
								id:'globalType.superSortId',
								rootVisible : false,
//								maxHeight : 300,
								url : __ctxPath+ '/system/treeGlobalType.do?catKey=DIC',
								forceSelection : false,
								listeners : {
									change : function(node) {
										this.selectedNode = node;
										//var parentId = node.id;
		                                var parentId  = Ext.getCmp('globalType.superSortId').getHiddenValue();
		                               	Ext.getCmp('globalType.superSort_hid').setValue(parentId);
									}
								}
							}
							]
						});

				// 加载表单对应的数据
				if (this.proTypeId != null && this.proTypeId != 'undefined') {
					this.formPanel.getForm().load({
						deferredRender : false,
						url : __ctxPath
								+ '/system/getGlobalType.do?proTypeId='
								+ this.proTypeId,
						waitMsg : '正在载入数据...',
						success : function(form, action) {
						},
						failure : function(form, action) {
						}
					});
				}
				// 初始化功能按钮
				this.buttons = [{
							text : '保存',
							iconCls : 'btn-save',
							id : 'btnSave',
							handler : this.save.createCallback(this.formPanel,
									this)
						}, {
							text : '重置',
							iconCls : 'btn-reset',
							handler : this.reset.createCallback(this.formPanel)
						}, {
							text : '取消',
							iconCls : 'btn-cancel',
							handler : this.cancel.createCallback(this)
						}];
			},// end of the initcomponents

			/**
			 * 重置
			 * 
			 * @param {}
			 *            formPanel
			 */
			reset : function(formPanel) {
				formPanel.getForm().reset();
			},
			/**
			 * 取消
			 * 
			 * @param {}
			 *            window
			 */
			cancel : function(window) {
				window.close();
			},
			/**
			 * 保存记录
			 */
			save : function(formPanel, window) {
				
				var callback=window.callback;
				
				if (formPanel.getForm().isValid()) {
					formPanel.getForm().submit({
								method : 'POST',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									var gridPanel = Ext.getCmp('GlobalTypeGrid');
									
									if (gridPanel != null) {
										gridPanel.getStore().reload();
									}
									
									if(callback!=null && callback!=undefined){
										callback.call(this);
									}
									
									window.close();
								},
								failure : function(fp, action) {
									Ext.MessageBox.show({
												title : '操作信息',
												msg : '信息保存出错，请联系管理员！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
									window.close();
								}
							});
				}
			}//end of save

		});