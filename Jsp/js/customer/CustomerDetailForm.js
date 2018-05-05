
CustomerDetailForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		CustomerDetailForm.superclass.constructor.call(this, {
					id : 'CustomerDetailFormWin',
					layout : 'fit',
					items : this.panel,
					border:false
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.showDetailForm = new Ext.form.FormPanel({
						layout:'form',
						border:false,
						id:'Cuspersonal_Detail_Form',
						items:[{
							layout : "column",
							xtype : 'container',
							style : 'padding:10px',
							defaults : {
								border : false,
								anchor : '100%,100%'
							},
							items : [{
								columnWidth : .5,// 第1列
								layout : "form",
								labelAlign : 'right',
								labelWidth : 70,
								anchor : '100%',
								items : [{
											fieldLabel : '客户姓名',
											name : 'cusPersonal.nameCn',
											id : 'cusPersonal.nameCn_form',
											xtype : 'textfield',
											readOnly : true,
											editable : false,
											maxLength : 128,
											anchor : '100%'
										}, {
											fieldLabel : '性别',
											xtype : 'mtdiccombo',
											name : 'cusPersonal.gender',
											id : 'cusPersonal.gender_form',
											editable : false,
											lazyInit : false,
											forceSelection : false,
											readOnly : true,
											itemKey : 'XB001',
											anchor : '100%'
										}, {
											fieldLabel : '证件类型',
											xtype : 'mtdiccombo',
											name : 'cusPersonal.credTypId',
											id : 'cusPersonal.credTypId_form',
											editable : false,
											lazyInit : false,
											itemKey : 'GGZJLX',
											forceSelection : false,
											readOnly : true,
											anchor : '100%'
										},{
											xtype : 'hidden',
											id : 'cusPersonalCallin.gender_hid'
										},{
											xtype : 'hidden',
											id : 'cusPersonal.cusGraId_hid'
										}, {
											fieldLabel : '客户等级',
											xtype : 'mtdiccombo',
											name : 'cusPersonal.cusGraId',
											id : 'cusPersonal.cusGraId_form',
											editable : false,
											lazyInit : false,
											forceSelection : true,
											readOnly : true,
											itemKey : 'CONKHJB',
											anchor : '100%'
										}
										]
							}, {
								columnWidth : .5,// 第2列
								layout : "form",
								labelAlign : 'right',
								labelWidth : 70,
								items : [{
											fieldLabel : '客户编号',
											xtype : 'textfield',
											name : 'cusPersonal.customerNo',
											id : 'cusPersonal.customerNo_form',
											allowBlank : false,
											editable : false,
											readOnly : true,
											maxLength : 128,
											anchor : '100%'
										}, {
											xtype : 'datefield',
											fieldLabel : '生日',
											name : 'cusPersonal.birthday',
											id : 'cusPersonal.birthday_baseForm',
											readOnly : true,
											anchor:'100%',
											format : 'Y-m-d'
										}, {
											fieldLabel : '证件号码',
											xtype : 'textfield',
											name : 'cusPersonal.credNum',
											readOnly : true,
											editable : false,
											maxLength : 128,
											anchor : '100%'
										}
//										, {
//											fieldLabel : '来源',
//											xtype : 'mtdiccombo',
//											name : 'cusPersonal.cusFromId',
//											id : 'cusPersonal.cusFromId_form',
//											editable : false,
//											lazyInit : false,
//											forceSelection : false,
//											readOnly : true,
//											itemKey : 'CONLYLB',
//											anchor : '100%'
//										}
										]
							}]
						}]
					})
		this.gridPanel = new HT.GridPanel({
					printable : false,
					showPaging:false,
					showSm:false,
					showNum:false,
					viewConfig:{
						forceFit:true
					},
					lazyLoad:true,
					exportable : false,
					clicksToEdit : 1,
//					url : __ctxPath
//							+ "/outb/listCalBthObCalllist.do?calllistID="
//							+ this.calllistId,
					height : 200,
					scrollHeight : true,
					fields : [{
								name : ' callbatchId',
								type : 'Long'
							}, 'callbatchNam', 'callbatchTypId',
							'obCalllist.calllistResouce', 'callbatchRegion', 'totalCount',
							'avlidCount', 'callbatchStaId'],
					columns : [{
								header : '类型',
								isExp : false,
								dataIndex : 'callbatchNam'
							}, {
								header : '账号',
								isExp : false,
								dataIndex : 'callbatchTypId',
								renderer : function(value) {
									return CONOB_CALLBATCH_PCLX.get(value);
								}
							}, {
								header : '总金额',
								isExp : false,
								dataIndex : 'totalCount'
							}, {
								header : '可用金额',
								isExp : false,
								dataIndex : 'obCalllist.calllistResouce',
								renderer : function(value) {
									return CONOB_MDLY.get(value);
								}
							}, {
								header : '冻结金额',
								isExp : false,
								dataIndex : 'callbatchRegion'
							}, {
								header : '状态',
								isExp : false,
								dataIndex : 'avlidCount'
							}]
				});
				
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			region:'center',
			id : 'customerDetailForm_panel',
			bodyStyle : 'padding:10px',
			labelAlign : 'right',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			labelWidth : 70,
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
							layout : "column",
							xtype : 'container',
							defaults : {
								border : false,
								anchor : '100%,100%'
							},
							items : [{
								columnWidth : .5,// 第1列
								layout : "form",
								labelAlign : 'right',
								labelWidth : 70,
								anchor : '100%',
								items : [{
											fieldLabel : '客户号',
											xtype : 'textfield',
											name : 'cusPersonal.customerNo',
											editable : false,
											readOnly : true,
											maxLength : 128,
											anchor : '100%'
										}, {
											fieldLabel : '证件类型',
											xtype : 'mtdiccombo',
											name : 'cusPersonal.credTypId',
											id : 'customerDetail.credTypId',
											editable : false,
											lazyInit : false,
											itemKey : 'GGZJLX',
											forceSelection : false,
											readOnly : true,
											anchor : '100%'
										},{
											xtype : 'hidden',
											id : 'cusPersonalCallin.gender_hid'
										}, {
											fieldLabel : '性别',
											xtype : 'mtdiccombo',
											name : 'cusPersonal.gender',
											id : 'customerDetail.gender',
											editable : false,
											lazyInit : false,
											forceSelection : false,
											readOnly : true,
											itemKey : 'XB001',
											anchor : '100%'
										}, {
											layout : 'column',
											border : false,
											items : [{
														columnWidth : .7,
														border : false,
														layout : 'form',
														labelWidth : 70,
														labelAlign : 'right',
														items : [{
																	xtype : 'datefield',
																	fieldLabel : '出生日期',
																	name : 'cusPersonal.birthday',
																	readOnly : true,
																	format : 'Y-m-d'
																}]
													}, {
														columnWidth : .15,
														xtype : 'radio',
														name : 'cusPersonal.birthdayType',
														readOnly : true,
														disabled : true,
														boxLabel : '阴历',
														inputValue : 1

													}, {
														columnWidth : .15,
														xtype : 'radio',
														name : 'cusPersonal.birthdayType',
														readOnly : true,
														disabled : true,
														boxLabel : '阳历',
														inputValue : 2

													}]
										}
										]
							}, {
								columnWidth : .5,// 第2列
								layout : "form",
								labelAlign : 'right',
								labelWidth : 70,
								items : [{
											fieldLabel : '客户姓名',
											name : 'cusPersonal.nameCn',
											xtype : 'textfield',
											readOnly : true,
											editable : false,
											maxLength : 128,
											anchor : '100%'
										}, {
											fieldLabel : '证件号码',
											xtype : 'textfield',
											name : 'cusPersonal.credNum',
											readOnly : true,
											editable : false,
											maxLength : 128,
											anchor : '100%'
										},{
											xtype : 'hidden',
											id : 'cusPersonal.cusGraId_hid'
										}, {
											fieldLabel : '客户等级',
											xtype : 'mtdiccombo',
											name : 'cusPersonal.cusGraId',
											id : 'customerDetail.cusGraId',
											editable : false,
											lazyInit : false,
											forceSelection : true,
											readOnly : true,
											itemKey : 'CONKHJB',
											anchor : '100%'
										}, {
											fieldLabel : '来源',
											xtype : 'mtdiccombo',
											name : 'cusPersonal.cusFromId',
											id : 'customerDetail.cusFromId',
											editable : false,
											lazyInit : false,
											forceSelection : false,
											readOnly : true,
											itemKey : 'CONLYLB',
											anchor : '100%'
										}]
							}]
//				},{
//					xtype:'compositefield',
//					fieldLabel:'所属地区',
//					defaults:{
//						flex:1
//					},
//					items:[{
//						xtype:'textfield',
//						style:Ext.isIE?'margin-top:-0.5px':''
//					},{
//						xtype:'textfield',
//						style:Ext.isIE?'margin-top:-0.5px':''
//					},{
//						xtype:'textfield',
//						style:Ext.isIE?'margin-top:-0.5px':''
////					},{
////						xtype:'textfield',
////						style:Ext.isIE?'margin-top:-0.5px':''
//					}]
				},{
					xtype:'textarea',
					fieldLabel:'备注',
					name : 'cusPersonal.remark',
					height:50
				},{
						layout:'column',
						border:false,
						items:[{
							columnWidth:.5,
							border:false,
							layout:'form',
							items:[{
								xtype:'checkbox',
								name : 'cusPersonal.isMail',
								disabled : true,
								boxLabel:'接收邮件'
							},{
								xtype:'checkbox',
								disabled : true,
								boxLabel:'接收交易明细'
							}]
						},{
							columnWidth:.5,
							border:false,
							layout:'form',
							items:[{
								xtype:'checkbox',
								name : 'cusPersonal.happyCall',
								disabled : true,
								boxLabel:'happy_call'
							},{
								xtype:'checkbox',
								name : 'cusPersonal.isDm',
								disabled : true,
								boxLabel:'接收DM'
							}]
						}]
					},{
					xtype:'fieldset',
					collapsible:true,
					title:'交易信息',
					labelAlign : 'right',
					labelWidth : 100,
					layout:'form',
					items:[{
						xtype:'compositefield',
						fieldLabel:'订单金额/数量',
						defaults:{
							flex:1
						},
						items:[{
							xtype:'textfield',
							name : 'cusPersonal.ext12',
							style:Ext.isIE?'margin-top:-0.5px':''
						},{
							xtype:'textfield',
							name : 'cusPersonal.ext11',
							style:Ext.isIE?'margin-top:-0.5px':''
						}]
					},{
						xtype:'compositefield',
						fieldLabel:'取消金额/数量',
						defaults:{
							flex:1
						},
						items:[{
							xtype:'textfield',
							name : 'cusPersonal.ext14',
							style:Ext.isIE?'margin-top:-0.5px':''
						},{
							xtype:'textfield',
							name : 'cusPersonal.ext13',
							style:Ext.isIE?'margin-top:-0.5px':''
						}]
					},{
						xtype:'compositefield',
						fieldLabel:'退货金额/数量',
						defaults:{
							flex:1
						},
						items:[{
							xtype:'textfield',
							name : 'cusPersonal.ext17',
							style:Ext.isIE?'margin-top:-0.5px':''
						},{
							xtype:'textfield',
							name : 'cusPersonal.ext16',
							style:Ext.isIE?'margin-top:-0.5px':''
						}]
					}]
				},{
//					xtype:'fieldset',
//					collapsible:true,
//					title:'爱好信息',
//					layout:'form',
//					items:[{
//						xtype:'checkboxgroup',
//						columns: 5,
//						fieldLabel:'爱好',
//						items:[{
//							boxLabel:'爱好1'
//						},{
//							boxLabel:'爱好2'
//						},{
//							boxLabel:'爱好3'
//						},{
//							boxLabel:'爱好4'
//						},{
//							boxLabel:'爱好5'
//						},{
//							boxLabel:'爱好6'
//						}]
//					},{
//						layout:'column',
//						border:false,
//						items:[{
//							columnWidth:.5,
//							border:false,
//							layout:'form',
//							items:[{
//								xtype:'checkbox',
//								boxLabel:'接收邮件'
//							},{
//								xtype:'checkbox',
//								boxLabel:'接收交易明细'
//							}]
//						},{
//							columnWidth:.5,
//							border:false,
//							layout:'form',
//							items:[{
//								xtype:'checkbox',
//								boxLabel:'happy_call'
//							},{
//								xtype:'checkbox',
//								boxLabel:'接收DM'
//							}]
//						}]
//					}]},{
					xtype:'fieldset',
					collapsible:true,
					collapsed : true,
					title:'客户账号',
					layout:'fit',
					items:[this.gridPanel]}
				]
		});
		this.panel = new Ext.Panel({
			layout:'border',
			border:false,
			items:[{
				region:'west',
				width:100,
//				border:false,
				items:[{
					border:false,
					bodyStyle:'margin-top:100px;margin-left:10px',
					items:[{
						xtype:'button',
						bodyStyle:'margin-top:10px;margin-left:10px',
						width:80,
						text:'收货地址'
					}]
//				},{
//					border:false,
//					bodyStyle:'margin-top:10px;margin-left:10px',
//					items:[{
//						xtype:'button',
//						bodyStyle:'margin-top:10px;margin-left:10px',
//						width:80,
//						text:'客户积分'
//					}]
				}
//				,{
//					border:false,
//					bodyStyle:'margin-top:10px;margin-left:10px',
//					items:[{
//						xtype:'button',
//						bodyStyle:'margin-top:10px;margin-left:10px',
//						width:80,
//						text:'暂存款'
//					}]
//				},{
//					border:false,
//					bodyStyle:'margin-top:10px;margin-left:10px',
//					items:[{
//						xtype:'button',
//						bodyStyle:'margin-top:10px;margin-left:10px',
//						width:80,
//						text:'礼金'
//					}]
//				}
				]
			},this.formPanel]
		})

	}

});