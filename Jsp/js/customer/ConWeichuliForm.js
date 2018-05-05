/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ConWeichuliForm
 * @extends Ext.Window
 * @description ConWeichuli表单
 * @company 优创融联科技
 */
ConWeichuliForm = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				ConWeichuliForm.superclass.constructor.call(this, {
							id : 'ConWeichuliFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ConWeichuli]详细信息',
							buttonAlign : 'center',
							buttons : [{
										text : __save,
										iconCls : 'btn-save',
										scope : this,
										handler : this.save
									}, {
										text : __reset,
										iconCls : 'btn-reset',
										scope : this,
										handler : this.reset
									}, {
										text : __cancel,
										iconCls : 'btn-cancel',
										scope : this,
										handler : this.cancel
									}]
						});
			},// end of the constructor
			// 初始化组件
			initUIComponents : function() {
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							bodyStyle : 'padding:10px',
							border : false,
							autoScroll : true,
							// id : 'ConWeichuliForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
										name : 'conWeichuli.conId',
										xtype : 'hidden',
										value : this.conId == null
												? ''
												: this.conId
									}

									, {
										fieldLabel : '来源类别&CONLYLB',
										hiddenName : 'conWeichuli.srcTypeId',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONLYLB'
									}

									, {
										fieldLabel : '方向&CONFX',
										hiddenName : 'conWeichuli.dirId',
										allowBlank : false,
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONFX'
									}

									, {
										fieldLabel : '联系类型&CONLXLX',
										hiddenName : 'conWeichuli.contactTypeId',
										allowBlank : false,
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONLXLX'
									}

									, {
										fieldLabel : '区号/地区号',
										name : 'conWeichuli.preContactNum',
										maxLength : 256
									}

									, {
										fieldLabel : '号码/详细地址',
										name : 'conWeichuli.mainContactNum',
										allowBlank : false,
										maxLength : 256
									}

									, {
										fieldLabel : '分机号/邮编',
										name : 'conWeichuli.lastContactNum',
										maxLength : 256
									}

									, {
										fieldLabel : '联络内容',
										name : 'conWeichuli.content',
										xtype : 'textarea',
										maxLength : 2000
									}

									, {
										fieldLabel : '创建时间',
										name : 'conWeichuli.creTime',
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date()
									}

									, {
										fieldLabel : '同步时间',
										name : 'conWeichuli.synTime',
										allowBlank : false,
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date()
									}

									, {
										fieldLabel : '分配人',
										name : 'conWeichuli.assignId',
										xtype : 'numberfield'
									}

									, {
										fieldLabel : '分配时间',
										name : 'conWeichuli.assignTime',
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date()
									}

									, {
										fieldLabel : '负责人',
										name : 'conWeichuli.ownerId',
										xtype : 'numberfield'
									}

									, {
										fieldLabel : '领用时间',
										name : 'conWeichuli.acceptTime',
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date()
									}

									, {
										fieldLabel : '处理状态&CONCLZT',
										hiddenName : 'conWeichuli.dealStaId',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONCLZT'
									}

									, {
										fieldLabel : '处理结果&CONLLJG',
										hiddenName : 'conWeichuli.dealResId',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONLLJG'
									}

									, {
										fieldLabel : '处理备注',
										name : 'conWeichuli.dealRemarks',
										xtype : 'textarea',
										maxLength : 2000
									}

							]
						});
				// 加载表单对应的数据
				if (this.conId != null && this.conId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath
										+ '/customer/getConWeichuli.do?conId='
										+ this.conId,
								root : 'data',
								preName : 'conWeichuli'
							});
				}

			},// end of the initcomponents

			/**
			 * 重置
			 * 
			 * @param {}
			 *            formPanel
			 */
			reset : function() {
				this.formPanel.getForm().reset();
			},
			/**
			 * 取消
			 * 
			 * @param {}
			 *            window
			 */
			cancel : function() {
				this.close();
			},
			/**
			 * 保存记录
			 */
			save : function() {
				$postForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/customer/saveConWeichuli.do',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('ConWeichuliGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
			}// end of save

		});