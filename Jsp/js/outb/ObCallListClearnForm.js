/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCallListClearnForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
var washHisId = '';
var callbatchId = '';
var isCallbatchEnable = '';
ObCallListClearnForm = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				// 必须先初始化组件
				this.initUIComponents(_cfg);
				ObCallListClearnForm.superclass.constructor.call(this, {
							id : 'ObCallListClearnFormWin',
							layout : 'fit',
							items : this.panel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '名单清洗详细信息',
							buttonAlign : 'center'
						});
			},// end of the constructor
			// 初始化组件
			initUIComponents : function(_cfg) {
				washHisId = _cfg.washHisId;
				callbatchId = _cfg.callbatchId;
				isCallbatchEnable = _cfg.isCallbatchEnable;
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							region : 'north',
							height : 150,
							bodyStyle : 'padding:10px',
							border : false,
							autoScroll : true,
							labelAlign : 'right',
							// id : 'ObCallbatchForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obCallbatch.callbatchId',
								xtype : 'hidden',
								value : this.callbatchId == null
										? ''
										: this.callbatchId
							}, {
								layout : 'column',
								border : false,
								xtype : 'panel',
								items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : .33,
											border : false,
											items : [{
														fieldLabel : '营销项目',
														name : 'projName',
														anchor : '100%',
														readOnly : true,
														xtype : 'textfield',
														value : _cfg.projName
													}, {
														fieldLabel : '批次 ',
														name : 'callbatchName',
														anchor : '100%',
														readOnly : true,
														xtype : 'textfield',
														value : _cfg.callbatchName
													}, {
														fieldLabel : '处理人',
														name : 'clearnOptName',
														anchor : '100%',
														readOnly : true,
														xtype : 'textfield',
														value : _cfg.clearnOptName
													}]

										}, {
											layout : 'form',
											xtype : 'panel',
											border : false,
											columnWidth : .33,
											items : [{
														fieldLabel : '营销活动 ',
														name : 'comName',
														anchor : '100%',
														readOnly : true,
														xtype : 'textfield',
														value : _cfg.comName
													}, {
														fieldLabel : '清洗时间',
														name : 'clearnDat',
														anchor : '100%',
														readOnly : true,
														xtype : 'textfield',
														value : _cfg.clearnDat
													}, {
														fieldLabel : '批次 ',
														name : 'callbatchName',
														anchor : '100%',
														readOnly : true,
														xtype : 'textfield',
														value : _cfg.callbatchName
													}]

										}, {
											xtype : 'panel',
											layout : 'form',
											columnWidth : .33,
											border : false,
											items : [{
														fieldLabel : '呼入名单',
														name : 'calllistName',
														anchor : '100%',
														xtype : 'textfield',
														readOnly : true,
														value : _cfg.calllistName
													}, {
														fieldLabel : '清洗方式 ',
														name : 'clearnTyp',
														anchor : '100%',
														readOnly : true,
														xtype : 'textfield',
														value : _cfg.clearnTyp,
														renderer : function(value) {
															return CONOB_BATCH_QXFS.get(value);
														}
													}]

										}]
							}, {
								fieldLabel : '清洗规则 ',
								name : 'clearnRual',
								anchor : '95%',
								height : 50,
								readOnly : true,
								xtype : 'textarea',
								value : _cfg.clearnRual
							}]
						});
				this.gridPanel2 = new HT.GridPanel({
							scrollHeight : true,
							region : 'center',
							id : 'ObCallListClearnFormGrid',
							tbar : ['->', {
										text : '恢复',
										iconCls : 'btn-refresh',
										id : 'OB_CallListClearn_Form_recover',
										handler : this.recover
									}, {
										text : '删除',
										iconCls : 'btn-del',
										handler : this.removeSelRs
										
									}],
							lazyLoad : true,
							url : __ctxPath
									+ "/outb/listObCallbatchImpWash.do?Q_washHisId_L_EQ="
									+ _cfg.washHisId,
							fields : ['washCusId','nameCn', 'gender', 'credTypId',
									'birthday', 'credNum', 'credDurDat'],
							columns : [
									{
										header : 'washCusId',
										dataIndex : 'washCusId',
										hidden : true
									},
									{
										header : '姓名',
										isExp : false,
										dataIndex : 'nameCn'
									}, {
										header : '性别',
										isExp : false,
										dataIndex : 'gender',
										renderer : function(value) {
											return XB001.get(value);
										}
									}, {
										header : '证件类型',
										isExp : false,
										dataIndex : 'credTypId',
										renderer : function(value) {
											return CONOB_CALLBATCH_IMP_TMP_ZJLX
													.get(value);
										}
									}, {
										header : '生日',
										isExp : false,
										dataIndex : 'birthday'
									}, {
										header : '证件号码',
										isExp : false,
										dataIndex : 'credNum'
									}, {
										header : '证件有效期',
										isExp : false,
										dataIndex : 'credDurDat'
									}
									]
						});
				this.searchPanel2 = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							height : 35,
							items : [{
										xtype : 'panel',
										width : 50,
										style : 'text-align:right',
										html : '姓名：'
									}, {

										name : 'Q_nameCn_S_LK',
										xtype : 'textfield'
									}, {
										xtype : 'panel',
										width : 50,
										style : 'text-align:right',
										html : '性别：'
									}, {

										hiddenName : 'Q_gender_S_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'XB001'
									}, {
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
										handler : function() {
											$search({
												searchPanel : this.searchPanel2,
												gridPanel : this.gridPanel2
											});
										}
									}],
							layoutConfig : {
								padding : '5',
								align : 'middle'
							},
							defaults : {
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
				this.tabpanel = new Ext.TabPanel({
							activeTab : 0,// 激活第一个panel
							region : 'center',
							border : false,
							plain : true,
							defaultType : 'panel',
							items : [{
										title : '清洗名单',
										border : false,
										layout : 'border',
										items : [this.gridPanel2, {
													xtype : 'hidden',
													value : true
												}, this.searchPanel2]
									}],
							listeners : {
								'tabchange' : function(p) {
									if (p.activeTab.get(1).getValue() == 'true') {
										p.activeTab.get(0).getStore().load();
										p.activeTab.get(1).setValue(false);
									}

								}
							}
						});
				this.panel = new Ext.Panel({
							layout : 'border',
							border : false,
							items : [this.tabpanel, this.formPanel]
						})
				// 加载表单对应的数据
				if (_cfg.callbatchName != null && _cfg.callbatchName != 'undefined') {
					//对于已经启用的批次，不能再进行恢复操作
					if(isCallbatchEnable != '0') {
						Ext.getCmp("OB_CallListClearn_Form_recover").setVisible(false);
					}
				}
			},// end of the initcomponents

			recover : function() {
				$gridRs({
							url : __ctxPath + '/outb/recoverObCallbatchImpWash.do?washHisId='+washHisId+"&&callbatchId="+callbatchId,
							grid : Ext.getCmp("ObCallListClearnFormGrid"),
							idName : 'washCusId',
							msgNull : '请选择要恢复的记录！',
							msgTip : '您确认要恢复所选记录吗？',
							msgSuccess : '成功恢复所选记录！',
							msgFailure : '操作出错，请联系管理员！'
				});
			},
			
			// 把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath + '/outb/multiDelObCallbatchImpWash.do',
							grid : Ext.getCmp("ObCallListClearnFormGrid"),
							idName : 'washCusId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除所选记录！',
							msgFailure : '操作出错，请联系管理员！'
				});
			},
			cancel : function() {
			},
			save : function() {
			}
		});