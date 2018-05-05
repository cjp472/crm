var cusPersonalFormTmpId = this.cusPersonalFormTmpId ? this.cusPersonalFormTmpId : 221; // 全局变量 用于动态调用VM
var cusPersonal_isHide = false;
var cusPersonal_flag = false;
CusPersonalForm = Ext.extend(Ext.form.FormPanel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		var kkid = this.customerId;
		CusPersonalForm.superclass.constructor.call(this, {
			id : 'CusPersonalFormWin',
			layout : 'form',
			items : [this.formPanel, this.vmFormPanel],
			modal : true,
//			height : 150,
			autoWidth : true,
			maximizable : true,
			title : '个人客户详细信息',
			buttonAlign : 'center',
			buttons : [{
						text : __save,
						iconCls : 'btn-save',
						id : 'btnSave',
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
		var tid = window.setInterval(function() {
			if (cusPersonal_flag) {
				start(kkid);
				window.clearInterval(tid)
				cusPersonal_flag = false;
			}
		}, 200);
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		checkCredNum = function(){
				var credNum = Ext.get('credNum').dom.value;
				var customerId = Ext.get('CusPersonalForm.customerId').dom.value;
				if(credNum=='' || credNum==null){
						//Ext.getCmp('credNum').markInvalid('证件号码是必填项,请输入!');
//						Ext.ux.Toast.msg('操作信息', '证件号码是必填项,请输入!');
						Ext.getCmp('btnSave').disable();
						return '证件号码是必填项,请输入!';
				}else{
						Ext.Ajax.request({
							url : __ctxPath + '/customer/listCusPersonal.do',
							params : {
								'Q_credNum_S_EQ' : credNum,
								'Q_customerId_L_NEQ' : customerId

							},
							success : function(form, action) {
								var info = Ext.decode(form.responseText);
								if (info.totalCounts > 0) {
									Ext.getCmp('credNum').markInvalid('对不起,该证件号码已存在,请重新输入!');
//									Ext.ux.Toast.msg('操作信息', '对不起,该证件号码已存在,请重新输入!');
									Ext.getCmp('btnSave').disable();
								} else {
									Ext.getCmp('credNum').clearInvalid(true);
									Ext.getCmp('btnSave').enable();
								}
							}
						});
				}
		}
		checkOrgName = function(val){
			var customerNo = Ext.get('cusPersonal.customerNo_vm').dom.value;
			var customerId = Ext.get('CusPersonalForm.customerId').dom.value;
			if(val.length<=0){
			   	Ext.getCmp('btnSave').disable();
			   	return '客户号不能为空!';
			}else{
				Ext.Ajax.request({
			    url : __ctxPath + '/customer/listCusPersonal.do',
				    params : {
				     'Q_customerNo_S_EQ' : customerNo,
					 'Q_customerId_L_NEQ' : customerId
				    },
				       success : function(form, action) {
						    var info = Ext.decode(form.responseText);
							if(info.totalCounts>0){
						    	Ext.getCmp('cusPersonal.customerNo_vm').markInvalid('客户号不能重复!');
						    	Ext.getCmp('btnSave').disable();
							}else{
						     	Ext.getCmp('cusPersonal.customerNo_vm').clearInvalid(true);
						     	Ext.getCmp('btnSave').enable();
							}
					   }
				   });
			 }
		}


		var topbar_conHis = new Ext.Toolbar({
			items : ['->',{
				iconCls : 'btn-del',
				text : '删除',
				xtype : 'button',
				scope : this,
				handler : this.removeSelRs_conHis
			}, '->',{
				iconCls : 'btn-add',
				text : '添加',
				xtype : 'button',
				scope : this,
				handler : this.createRs_conHis
			}]
		});
		
		//联络历史
		this.gridPanel_conHis = new HT.EditorGridPanel({
			id : 'ManageConHisGrid',
			tbar : topbar_conHis,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
//			height : 245,
			url : __ctxPath + "/customer/listConHis.do?customerId="+this.customerId,
			fields : [{
					name : 'conHisId',
					type : 'int'
				},  'cusLinkman', 'srcTypeId', 'dirId',
				'contactTypeId', 'preContactNum', 'mainContactNum',
				'lastContactNum', 'staTime', 'endTime', 'busTypId',
				'conResId', 'conResRemarks', 'content', 'dealStaId',
				'remarks', 'ownerId', 'statusId'],
			columns : [{
				header : 'conHisId',
				dataIndex : 'conHisId',
				hidden : true
			}, {
				header : '联系人',
				isExp : false,
				dataIndex : 'cusLinkman',
				renderer : function(val) {
					return val.fullname;
				}
			}, {
				header : '来源类别',
				isExp : false,
				dataIndex : 'srcTypeId',
				renderer : function(value) {
					return CONLYLB.value;
				}
			}, {
				header : '方向',
				isExp : false,
				dataIndex : 'dirId',
				renderer : function(value) {
					return CONFX.value;
				}
			}, {
				header : '联系类型',
				isExp : false,
				dataIndex : 'contactTypeId',
				renderer : function(value) {
					return CONLXLX.value;
				}
			}, {
				header : '区号/地区号',
				isExp : false,
				dataIndex : 'preContactNum'
			}, {
				header : '号码/详细地址',
				isExp : false,
				dataIndex : 'mainContactNum'
			}, {
				header : '分机号/邮编',
				isExp : false,
				dataIndex : 'lastContactNum'
			}, {
				header : '开始时间',
				isExp : false,
				dataIndex : 'staTime'
			}, {
				header : '结束时间',
				isExp : false,
				dataIndex : 'endTime'
			}, {
				header : '联络事项',
				hidden : true,
				isExp : false,
				dataIndex : 'busTypId',
				renderer : function(value) {
					return CONLLSX.value;
				}
			}, {
				header : '联络结果',
				hidden : true,
				isExp : false,
				dataIndex : 'conResId',
				renderer : function(value) {
					return CONLLJG.value;
				}
			}, {
				header : '联络结果备注',
				hidden : true,
				isExp : false,
				dataIndex : 'conResRemarks'
			}, {
				header : '联络内容',
				hidden : true,
				isExp : false,
				dataIndex : 'content'
			}, {
				header : '处理状态',
				hidden : true,
				isExp : false,
				dataIndex : 'dealStaId',
				renderer : function(value) {
					return CONCLZT.value;
				}
			}, {
				header : '备注',
				hidden : true,
				isExp : false,
				dataIndex : 'remarks'
			}, {
				header : '负责人',
				hidden : true,
				isExp : false,
				dataIndex : 'ownerId'
			}, {
				header : '状态',
				isExp : false,
				dataIndex : 'statusId',
				renderer : function(value) {
					return CONZT.value;
				}
			}, {
				header : '管理',
				dataIndex : 'linkmanId',
				width : 100,
				sortable : false,
				renderer : function(value, metadata, record, rowIndex,
						colIndex) {
					var editId = record.data.linkmanId;
					var str = '';
					if (isGranted('_CusLinkmanDel')) {
						str = '<button title="删除" value=" " class="btn-del" onclick="CustomerView.removeCusLinkman('
								+ editId + ')">&nbsp;</button>';
					}
					if (isGranted('_CusLinkmanEdit')) {
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="CusLinkmanView.edit('
								+ editId + ')">&nbsp</button>';
					}
					return str;
				}
			}]
		});
		
		
		this.formPanel = new Ext.Panel({
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					region:'north',
					height:120,
					autoScroll : true,
					// id : 'CusPersonalForm',
					defaults : {
						anchor : '98%,98%'
					},
					defaultType : 'textfield',
					items : [{
						name : 'CusPersonalForm.conLineIds',
						id : 'CusPersonalForm.conLineIds',
						xtype : 'hidden'
					}, {
						name : 'CusPersonalForm.linkLineIds',
						id : 'CusPersonalForm.linkLineIds',
						xtype : 'hidden'
					}, {
						name : 'cusPersonal.customerId',
						id : 'CusPersonalForm.customerId',
						xtype : 'hidden',
						value : this.customerId == null
								? ''
								: this.customerId
					}, {
						layout : "column",
						xtype : 'container',
						defaults : {
							border : false
						},
						items : [{
									columnWidth : .33,// 第1列
									layout : "form",
									items : [{
											fieldLabel : '姓名',
											xtype : 'textfield',
											name : 'cusPersonal.nameCn',
											allowBlank : false,
											anchor : '99%',
											maxLength : 128
										},{
											fieldLabel : '称谓',
											hiddenName : 'cusPersonal.cusTitId',
											id : 'cusPersonal.cusTitId_form',
											xtype : 'mtdiccombo',
											editable : true,
											lazyInit : false,
											anchor : '99%',
											forceSelection : false,
											itemKey : 'CONKHCW'
										}, {
											fieldLabel : '证件类型',
											hiddenName : 'cusPersonal.credTypId',
											id : 'cusPersonal.credTypId_form',
											xtype : 'mtdiccombo',
											editable : true,
											lazyInit : false,
											anchor : '99%',
											forceSelection : false,
											itemKey : 'GGZJLX'
										},{
											fieldLabel : '客户类别',
											hiddenName : 'cusPersonal.cusCatId',
											id : 'cusPersonal.cusCatId_form',
											xtype : 'mtdiccombo',
											editable : true,
											lazyInit : false,
											anchor : '99%',
											forceSelection : false,
											itemKey : 'CONKHLB'
										}]
									},{
									columnWidth : .33,// 第2列
									layout : "form",
									items : [{
											fieldLabel : '英文名',
											xtype : 'textfield',
											name : 'cusPersonal.nameEn',
											anchor : '99%',
											maxLength : 128
										}, {
											fieldLabel : '性别',
											hiddenName : 'cusPersonal.gender',
											id : 'cusPersonal.gender_form',
											xtype : 'mtdiccombo',
											editable : true,
											lazyInit : false,
											anchor : '99%',
											forceSelection : false,
											itemKey : 'XB001'
										}, {
											fieldLabel : '证件号码',
											xtype : 'textfield',
											name : 'cusPersonal.credNum',
											id : 'credNum',
											validator : checkCredNum,
											anchor : '99%',
											maxLength : 128
										},{
											fieldLabel : '级别',
											hiddenName : 'cusPersonal.cusGraId',
											id : 'cusPersonal.cusGraId_form',
											xtype : 'mtdiccombo',
											editable : true,
											anchor : '99%',
											lazyInit : false,
											forceSelection : false,
											itemKey : 'CONKHJB'
										}]
									},{
									columnWidth : .33,// 第3列
									layout : "form",
									items : [{
											fieldLabel : '简称',
											name : 'cusPersonal.nameAli',
											xtype : 'textfield',
											anchor : '99%',
											maxLength : 128
										},{
											fieldLabel : '出生日期',
											name : 'cusPersonal.birthday',
											xtype : 'datefield',
											anchor : '99%',
											format : 'Y-m-d',
											value : new Date()
										},{
											fieldLabel : '证件有效期',
											name : 'cusPersonal.credDurDat',
											xtype : 'datefield',
											anchor : '99%',
											format : 'Y-m-d',
											value : new Date()
										}]
								}]
					}
//					, {
//						xtype : 'tabpanel',
//						activeTab : 0,//激活第一个panel
//						plain:true,
//						height : 280,
//						defaultType : 'panel',
//						bodyStyle : 'padding:5px;',
//						items : [
//						         {
//									title : '基本信息',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : [{layout : "column",
//											xtype : 'container',
//											defaults : {
//												border : false
//											},
//											items : [{
//													columnWidth : .3333,// 第1列
//													layout : "form",
//													items : [{
//															fieldLabel : '客户号',
//															name : 'cusPersonal.customerNo',
//															xtype : 'textfield',
//															maxLength : 128,
//															anchor : '99%'
//														},{
//															fieldLabel : '收入范围',
//															name : 'cusPersonal.salaryId',
//															xtype : 'numberfield',
//															anchor : '99%'
//														},{
//															fieldLabel : '教育程度',
//															hiddenName : 'cusPersonal.cusEduId',
//															id : 'cusPersonal.cusEduId_form',
//															xtype : 'mtdiccombo',
//															editable : true,
//															lazyInit : false,
//															anchor : '99%',
//															forceSelection : false,
//															itemKey : 'YGXL0001'
//														},{
//															fieldLabel : '国籍',
//															hiddenName : 'cusPersonal.country',
//															id : 'cusPersonal.country_form',
//															xtype : 'mtdiccombo',
//															editable : true,
//															lazyInit : false,
//															anchor : '99%',
//															forceSelection : false,
//															itemKey : 'XZQH'
//														},{
//															fieldLabel : '行业',
//															hiddenName : 'cusPersonal.cusTraId',
//															id : 'cusPersonal.cusTraId_form',
//															xtype : 'mtdiccombo',
//															editable : true,
//															anchor : '99%',
//															lazyInit : false,
//															forceSelection : false,
//															itemKey : 'CONKHHY'
//														}]
//												},{
//													columnWidth : .33,// 第2列
//													layout : "form",
//													items : [{
//															fieldLabel : '业务编码',
//															name : 'cusPersonal.busiCode',
//															xtype : 'textfield',
//															anchor : '99%',
//															maxLength : 128
//														},{
//															fieldLabel : '客户来源',
//															hiddenName : 'cusPersonal.cusFromId',
//															id : 'cusPersonal.cusFromId_form',
//															xtype : 'mtdiccombo',
//															editable : true,
//															lazyInit : false,
//															anchor : '99%',
//															forceSelection : false,
//															itemKey : 'CONKHLY'
//														},{
//															fieldLabel : '工作单位',
//															name : 'cusPersonal.workCompany',
//															xtype : 'textfield',
//															anchor : '99%',
//															maxLength : 128
//														}, {
//															fieldLabel : '职位',
//															hiddenName : 'cusPersonal.jobTypId',
//															id : 'cusPersonal.jobTypId_form',
//															xtype : 'mtdiccombo',
//															editable : true,
//															lazyInit : false,
//															anchor : '99%',
//															forceSelection : false,
//															itemKey : 'CONKHZW'
//														}]
//												},{
//													columnWidth : .33,// 第3列
//													layout : "form",
//													items : [{
//															fieldLabel : '所在区域',
//															name : 'cusPersonal.regionId',
//															anchor : '99%',
//															xtype : 'numberfield'
//														}, {
//															fieldLabel : '是否已复核',
//															hiddenName : 'cusPersonal.hasChecked',
//															id : 'cusPersonal.hasChecked_form',
//															allowBlank : false,
//															xtype : 'mtdiccombo',
//															editable : true,
//															lazyInit : false,
//															anchor : '99%',
//															forceSelection : false,
//															itemKey : 'YorN'
//														},{
//															fieldLabel : '是否已婚',
//															hiddenName : 'cusPersonal.hasMarried',
//															id : 'cusPersonal.hasMarried_form',
//															xtype : 'mtdiccombo',
//															editable : true,
//															lazyInit : false,
//															anchor : '99%',
//															forceSelection : false,
//															itemKey : 'YorN'
//														},{
//															fieldLabel : '是否有子女',
//															hiddenName : 'cusPersonal.haveChild',
//															id : 'cusPersonal.haveChild_form',
//															xtype : 'mtdiccombo',
//															editable : true,
//															lazyInit : false,
//															anchor : '99%',
//															forceSelection : false,
//															itemKey : 'YorN'
//														},{
//															fieldLabel : '状态',
//															hiddenName : 'cusPersonal.staId',
//															id : 'cusPersonal.staId_form',
//															allowBlank : false,
//															xtype : 'mtdiccombo',
//															editable : true,
//															lazyInit : false,
//															anchor : '99%',
//															forceSelection : false,
//															itemKey : 'YHZT001'
//														}]
//													}]
//											
//										} 
//										,{
//											fieldLabel : '备注',
//											name : 'cusPersonal.remark',
//											xtype : 'textarea',
//											maxLength : 2048,
//											anchor : '100%'
//										}]
//						  },{
//									title : '联系方式',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : [this.gridPanel_contact]
//						  },{
//									title : '联系人',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : [this.gridPanel_linkman]
//						  },{
//									title : '影像文件',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : []
//						  },{
//									title : '账户信息',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : []
//						  },{
//									title : '特殊事项',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : []
//						  },{
//									title : '联络历史',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : [this.gridPanel_conHis]
//						  },{
//									title : '交易历史',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : []
//						  },{
//									title : '产品/服务',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : []
//						  },{
//									title : '相关合同',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : []
//						  },{
//									title : '变更记录',
//									layout : 'form',
//									defaultType : 'textfield',
//									defaults : {
//										anchor : '100%,100%'
//									},
//									items : []
//						  }]
//
//					}
//							, {
//								fieldLabel : '创建人ID',
//								name : 'cusPersonal.creUseId',
//								allowBlank : false,
//								xtype : 'numberfield'
//							}
//
//							, {
//								fieldLabel : '创建日期',
//								name : 'cusPersonal.creDat',
//								allowBlank : false,
//								xtype : 'datefield',
//								format : 'Y-m-d',
//								value : new Date()
//							}
//
//							, {
//								fieldLabel : '修改人ID',
//								name : 'cusPersonal.updUseId',
//								xtype : 'numberfield'
//							}
//
//							, {
//								fieldLabel : '修改日期',
//								name : 'cusPersonal.updDat',
//								xtype : 'datefield',
//								format : 'Y-m-d',
//								value : new Date()
//							}
//
//							, {
//								fieldLabel : '扩展字段1',
//								name : 'cusPersonal.ext1',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext2',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext3',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext4',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext5',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext6',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext8',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext7',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext9',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext10',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext11',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext12',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext13',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext14',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext15',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext16',
//								xtype : 'textarea',
//								maxLength : 2048
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext17',
//								xtype : 'textarea',
//								maxLength : 2048
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext18',
//								xtype : 'textarea',
//								maxLength : 2048
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext19',
//								xtype : 'textarea',
//								maxLength : 2048
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusPersonal.ext20',
//								xtype : 'textarea',
//								maxLength : 2048
//							}
				
			]
		});
		// 加载其对应的HTML或EXT表单
		this.vmFormPanel = new Ext.Panel({
					region : 'center',
					bodyStyle : 'padding:5px 5px 5px 5px',
					border : false,
					defaults : {
						anchor : '96%,100%'
					},
					autoLoad : {
						url : __ctxPath + "/customer/getVmCusPersonal.do?knowTmpId="
								+ cusPersonalFormTmpId,
						nocache : true,
						scope : this,
						callback : this.convertHtml
					}
				},this.customerId);
		// 加载表单对应的数据
		if (this.customerId != null && this.customerId != 'undefined') {
//			this.formPanel.loadData({
//						url : __ctxPath
//								+ '/customer/getCusPersonal.do?customerId='
//								+ this.customerId,
//						root : 'data',
//						preName : 'cusPersonal',
//						success : function(response, options) {
//							var thisObj = Ext.util.JSON.decode(response.responseText).dcustomerIdata;
//							Ext.getCmp('cusPersonal.cusTitId_form').setValue(thisObj.cusTitId);
//							Ext.getCmp('cusPersonal.credTypId_form').setValue(thisObj.credTypId);
//							Ext.getCmp('cusPersonal.cusCatId_form').setValue(thisObj.cusCatId);
//							Ext.getCmp('cusPersonal.gender_form').setValue(thisObj.gender);
//							Ext.getCmp('cusPersonal.cusGraId_form').setValue(thisObj.cusGraId);
//							Ext.getCmp('cusPersonal.cusEduId_form').setValue(thisObj.cusEduId);
//							Ext.getCmp('cusPersonal.country_form').setValue(thisObj.country);
//							Ext.getCmp('cusPersonal.cusTraId_form').setValue(thisObj.cusTraId);
//							Ext.getCmp('cusPersonal.cusFromId_form').setValue(thisObj.cusFromId);
//							Ext.getCmp('cusPersonal.jobTypId_form').setValue(thisObj.jobTypId);
//							Ext.getCmp('cusPersonal.hasChecked_form').setValue(thisObj.hasChecked);
//							Ext.getCmp('cusPersonal.hasMarried_form').setValue(thisObj.hasMarried);
//							Ext.getCmp('cusPersonal.haveChild_form').setValue(thisObj.haveChild);
//							Ext.getCmp('cusPersonal.staId_form').setValue(thisObj.staId);
//						},
//						failure : function(response, options) {
//							Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
//						}
//					});
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
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('CusPersonalFormWin');
		this.destroy();
	},
	/**
	 * 转化html
	 */
	convertHtml : function() {
		// 后加载文档的JS
			$ImportSimpleJs(
					[__ctxPath + '/js/core/ux/MTExt.js'],function(){
					var formExt = document.getElementById('formExt');
		if (formExt != null) {
			// 加上标识，表示是使用EXT模板进行
			this.useTemplate = true;
			var valExt = formExt.value;
			valExt = valExt.replace('Ext.form.FormPanel', 'Ext.Panel');
			this.formExtPanel = eval('new (' + valExt + ')(' + this.vmParams
					+ ');');
//			alert(valExt);
//			alert(this.customerId);
			this.vmFormPanel.add(this.formExtPanel);
			this.vmFormPanel.doLayout();
			cusPersonal_flag = true;
			return;
		}
		
		this.vmFormPanel.doLayout();
					}, this);
		
	},
	/**
	 * 保存记录
	 */
	save : function() {
		//获取增加的联系方式的store
		var store = Ext.getCmp('CusPerContactGrid_vm').getStore();
//		var store = this.gridPanel_contact.getStore();
		var rows = [];//定义数组
		for ( var i = 0; i < store.getCount(); i++) { //store.getCount()为store的长度
			rows.push(store.getAt(i).data);//放到数组里
		}
		//获取增加的联系人的store
		var store_link = Ext.getCmp('CusPerLinkmanGrid_vm').getStore();
		var rows_link = [];//定义数组
		for ( var i = 0; i < store_link.getCount(); i++) { //store.getCount()为store的长度
			rows_link.push(store_link.getAt(i).data);//放到数组里
		}
		//获取删除的联系方式的Ids
		var delContactLines = [];
		if(Ext.getCmp('CusPersonalForm.conLineIds').getValue()!=""){
			delContactLines.push(Ext.getCmp('CusPersonalForm.conLineIds').getValue());
		}
		//获取删除的联系人的Ids
		var delLinkLines = [];
		if(Ext.getCmp('CusPersonalForm.linkLineIds').getValue()!=""){
			delLinkLines.push(Ext.getCmp('CusPersonalForm.linkLineIds').getValue());
		}

		$postForm({
					formPanel : Ext.getCmp('CusPersonalFormWin'),
					scope : this,
					url : __ctxPath + '/customer/saveCusPersonal.do',
					params : {
						details : Ext.encode(rows),
						linkManLines : Ext.encode(rows_link),
						delContactLines : delContactLines,
						delLinkLines : delLinkLines
				    },
					callback : function(fp, action) {
						
						var gridPanel = Ext.getCmp('CusPersonalGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('CusPersonalFormWin');
						this.destroy();
					}
				});
	}// end of save
	
});

var start = function(customerId) {
	// 加载表单对应的数据
	if (customerId != null && customerId != 'undefined') {
		var CusPersonalFormWin = Ext.getCmp('CusPersonalFormWin');
		CusPersonalFormWin.loadData({
			url : __ctxPath + '/customer/getCusPersonal.do?customerId=' + customerId,
			root : 'data',
			preName : 'cusPersonal',
			success : function(response, options) {
				var thisObj = Ext.util.JSON.decode(response.responseText).data;
				Ext.getCmp('cusPersonal.cusTitId_form').setValue(thisObj.cusTitId);
				Ext.getCmp('cusPersonal.credTypId_form').setValue(thisObj.credTypId);
				Ext.getCmp('cusPersonal.cusCatId_form').setValue(thisObj.cusCatId);
				Ext.getCmp('cusPersonal.gender_form').setValue(thisObj.gender);
				Ext.getCmp('cusPersonal.cusGraId_form').setValue(thisObj.cusGraId);
				Ext.getCmp('cusPersonal.cusEduId_form').setValue(thisObj.cusEduId);
				Ext.getCmp('cusPersonal.country_form').setValue(thisObj.country);
				Ext.getCmp('cusPersonal.cusTraId_form').setValue(thisObj.cusTraId);
				Ext.getCmp('cusPersonal.cusFromId_form').setValue(thisObj.cusFromId);
				Ext.getCmp('cusPersonal.jobTypId_form').setValue(thisObj.jobTypId);
				Ext.getCmp('cusPersonal.hasChecked_form').setValue(thisObj.hasChecked);
				Ext.getCmp('cusPersonal.hasMarried_form').setValue(thisObj.hasMarried);
				Ext.getCmp('cusPersonal.haveChild_form').setValue(thisObj.haveChild);
				Ext.getCmp('cusPersonal.staId_form').setValue(thisObj.staId);
				var lianxiGrid = Ext.getCmp('CusPerLinkmanGrid_vm');
				var storeLinkMan = lianxiGrid.getStore();
				storeLinkMan.proxy.conn.url = __ctxPath + '/customer/listByCusIdCusLinkman.do?customerId='+customerId;
				storeLinkMan.reload();
				var contactGrid = Ext.getCmp('CusPerContactGrid_vm');
				var storeContact = contactGrid.getStore();
				storeContact.proxy.conn.url = __ctxPath + "/customer/listByCusIdCusContact.do?customerId="+customerId,
				storeContact.reload();
			}
		});
	}
}