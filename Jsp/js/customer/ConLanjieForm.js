/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ConLanjieForm
 * @extends Ext.Window
 * @description ConLanjie表单
 * @company 优创融联科技
 */
ConLanjieForm = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				ConLanjieForm.superclass.constructor.call(this, {
							id : 'ConLanjieFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '拦截记录详细信息',
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
							labelAlign:'right',
							border : false,
							autoScroll : true,
							// id : 'ConLanjieForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
										name : 'conLanjie.conId',
										xtype : 'hidden',
										value : this.conId == null
												? ''
												: this.conId
									}

									, {
										fieldLabel : '来源类别',
										hiddenName : 'conLanjie.srcTypeId',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONLYLB'
									}

									, {
										fieldLabel : '方向',
										hiddenName : 'conLanjie.dirId',
										allowBlank : false,
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONFX'
									}

									, {
										fieldLabel : '联系类型',
										hiddenName : 'conLanjie.contactTypeId',
										allowBlank : false,
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONLXLX'
									}

									, {
										fieldLabel : '区号/地区号',
										name : 'conLanjie.preContactNum',
										maxLength : 256
									}

									, {
										fieldLabel : '号码/详细地址',
										name : 'conLanjie.mainContactNum',
										allowBlank : false,
										maxLength : 256
									}

									, {
										fieldLabel : '分机号/邮编',
										name : 'conLanjie.lastContactNum',
										maxLength : 256
									}

									, {
										fieldLabel : '联络内容',
										name : 'conLanjie.content',
										xtype : 'textarea',
										maxLength : 2000
									}

									, {
										fieldLabel : '拦截时间',
										name : 'conLanjie.interceptTime',
										allowBlank : false,
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date()
									}

									, {
										fieldLabel : '拦截原因',
										hiddenName : 'conLanjie.interceptReason',
										allowBlank : false,
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONLJYY'
									}

									, {
										fieldLabel : '同步时间',
										name : 'conLanjie.synTime',
										allowBlank : false,
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date()
									}

							]
						});
				// 加载表单对应的数据
				if (this.conId != null && this.conId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath
										+ '/customer/getConLanjie.do?conId='
										+ this.conId,
								root : 'data',
								preName : 'conLanjie'
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
							url : __ctxPath + '/customer/saveConLanjie.do',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('ConLanjieGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
			}// end of save

		});