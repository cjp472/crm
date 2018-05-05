/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QcTemplateAddForm
 * @extends Ext.Window
 * @description QcTemplate表单
 * @company 优创融联科技
 */
QcTemplateAddForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QcTemplateAddForm.superclass.constructor.call(this, {
					id : 'QcTemplateAddFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '考核模板详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
								iconCls : 'btn-save',
								scope : this,
								id : 'btn-save',
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
		var topbar_pingFenXiang = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function(){
									var store = gridPanel_pingFenXiang.getStore();
									var sm = gridPanel_pingFenXiang.getSelectionModel();
									var cell = sm.getSelections();
									if(cell.length<1){
										Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
									} else {
										store.remove(cell);
									}
								}
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								handler : function(){
								var store = gridPanel_pingFenXiang.getStore();
								var recordType = store.recordType;
								store.add(new recordType({})); // 添加一行空store
							}
							}]
				});
		gridPanel_pingFenXiang = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_pingFenXiang,
			height:150,
			scrollHeight:true,
			viewConfig:{
				forceFit:true
			},
			clicksToEdit : 1,
			//id : 'UlContactGrid_empl',
//			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'scoreOptId',
						type : 'long'
					}, 'optName', 'optScore', 'disorder'],
			columns : [{
				header : '名称',
				dataIndex : 'optName',
				editor : new Ext.form.TextField({
						})
			}, {
				header : '分数',
				dataIndex : 'optScore',
				editor : new Ext.form.TextField({
						})
			},{
				header : '序号',
				dataIndex : 'disorder',
				editor : new Ext.form.TextField({

						})
			}]
				// end of columns
		});
		var topbar_zhangjie = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function(){
									var store = gridPanel_zhangjie.getStore();
									var sm = gridPanel_zhangjie.getSelectionModel();
									var cell = sm.getSelections();
									if(cell.length<1){
										Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
									} else {
										store.remove(cell);
									}
								}
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								handler : function(){
								var store = gridPanel_zhangjie.getStore();
								var recordType = store.recordType;
								store.add(new recordType({})); // 添加一行空store
							}
							}]
				});
		gridPanel_zhangjie = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_zhangjie,
			height:150,
			scrollHeight:true,
			clicksToEdit : 1,
			id : 'zhangjie',
//			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'tempCatId',
						type : 'long'
					}, 'catName', 'remark', 'score', 'type', 'disorder'],
			columns : [{
				header : '名称',
				dataIndex : 'catName',
				editor : new Ext.form.TextField({
						})
			},{
				header : '备注',
				dataIndex : 'remark',
				editor : new Ext.form.TextArea({
							height:50
						})
			}, {
				header : '分数',
				dataIndex : 'score',
				editor : new Ext.form.TextField({

						})
			},{
				header : '类型',
				dataIndex : 'type',
				editor :  new Ext.form.ComboBox({
					allowBlank : false,
					displayField : 'itemName',
					valueField : 'itemId',
					mode : 'local',
					triggerAction : 'all',
					forceSelection : false,
					store : new Ext.data.SimpleStore({
						url : __ctxPath + '/system/loadItemDictionary.do',
						baseParams : {
							itemName : '章节类型'
						},
						fields : ['itemId', 'itemName'],
						autoLoad : true,
						method : "post"
					})
				}),
				renderer : function(value) {
					if (value != null) {
						return Qc_ZJLX.get(value);
					} else {
						return ' ';
					}
				}
			},{
				header : '序号',
				dataIndex : 'disorder',
				editor : new Ext.form.TextField({

						})
			}]
				// end of columns
		});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign:'right',
			// id : 'QcTemplateAddForm',
			defaults : {
				anchor : '98%,98%'
			},
			items : [{
						name : 'qcTemplate.tmpId',
						xtype : 'hidden',
						value : this.tmpId == null ? '' : this.tmpId
					}, {
						layout : 'column',
						border : false,
						items : [{
									columnWidth : .66,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '名称',
												xtype:'textfield',
												name : 'qcTemplate.tmpName',
												allowBlank : false,
												maxLength : 256,
												anchor:'100%'
											}]

								}, {
									columnWidth : .34,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '考评方式',
												hiddenName : 'qcTemplate.chkTypeId',
												allowBlank : false,
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'QC_PFFS',
												anchor:'100%',
												listeners:{
													'select':function(combo,record,index){
														if(combo.getValue() == 2 ){//严重耦合
															Ext.get('pingfenxiangpeizhi').dom.style.display = 'block';
														}else{
															Ext.get('pingfenxiangpeizhi').dom.style.display = 'none';
														}
														
													}
												}
											}]

								}]

					}

					, {
						fieldLabel : '描述',
						name : 'qcTemplate.tmpContent',
						xtype : 'textarea',
						maxLength : 2048,
						anchor:'98%'
					}, {
						layout : 'column',
						border : false,
						items : [{
									columnWidth : .33,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '是否备注',
												hiddenName : 'qcTemplate.allowRemark',
												allowBlank : false,
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'YorN',
												anchor:'100%'
											}]

								}, {
									columnWidth : .33,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '是否复议',
												hiddenName : 'qcTemplate.allowRecheck',
												allowBlank : false,
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'YorN',
												anchor:'100%'
											}]
								},{
									columnWidth : .33,
									border : false,
									layout : 'form',
									items : [{
										fieldLabel : '是否说明',
										hiddenName : 'qcTemplate.allowTarRemark',
										allowBlank : false,
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'YorN',
										anchor:'100%'
								}]}]
					}, {
						layout : 'column',
						border : false,
						items : [{
									columnWidth : .33,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '基础分',
												name : 'qcTemplate.baseScore',
												id : 'baseScore',
												xtype:'textfield',
												allowBlank : false,
												anchor:'100%'
											}]

								}, {
									columnWidth : .33,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '最低分',
												name : 'qcTemplate.minScore',
												xtype:'textfield',
												id : 'minScore',
												allowBlank : false,
												anchor:'100%'
											}]

								}, {
									columnWidth : .34,
									border : false,
									layout : 'form',
									items : [{
												fieldLabel : '最高分',
												name : 'qcTemplate.maxScore',
												xtype:'textfield',
												id : 'maxScore',
												allowBlank : false,
												anchor:'100%'
											}]

								}]

					}, {
						fieldLabel : '备注',
						name : 'qcTemplate.remark',
						xtype : 'textarea',
						maxLength : 2048,
						anchor:'98%'
					},{
						xtype:'fieldset',
						title : "评分项配置",
						collapsed : false,
						//collapsible : true,
						collapsible : true,
						autoHeight : true,
						id:'pingfenxiangpeizhi',
						//style:'display:none',
						defaults : {
							anchor : '100%,100%'
						},
						items:[gridPanel_pingFenXiang]
					},{
						xtype:'fieldset',
						title : "章节配置",
						collapsible : true,
						collapsed : false,
						//collapsible : true,
						autoHeight : true,
						id:'zhangjie',
						defaults : {
							anchor : '100%,100%'
						},
						items:[gridPanel_zhangjie]
					}]
		});
		// 加载表单对应的数据
		if (this.tmpId != null && this.tmpId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/qucon/getQcTemplate.do?tmpId=' + this.tmpId,
				root : 'data',
				preName : 'qcTemplate'
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
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('QcTemplateAddFormWin');
		this.destroy();
	},
	/**
	 * 验证输入的数字
	 */
	validateScore : function(){
		var base = Number(Ext.getCmp('baseScore').getValue());
		var min = Number(Ext.getCmp('minScore').getValue()); 
		var max = Number(Ext.getCmp('maxScore').getValue());
		if(isNaN(base) || isNaN(min) || isNaN(max) ){
			Ext.ux.Toast.msg('操作信息', '分值项必须为数字!');
			return false;
		}
		if(min > max){
			Ext.ux.Toast.msg('操作信息', '最高分最低分填写错误!');
			return false;
		}
		if(base < min || base > max){
			Ext.ux.Toast.msg('操作信息', '基础分填写错误!');
			return false;
		}
		return true;
	},
	/**
	 * 保存记录
	 */
	save : function() {
		if(this.validateScore() == false){
			return;
		}
		// 评分项部分验证
		var rows = [];
		if(Ext.get('pingfenxiangpeizhi').dom.style.display == 'block'){
			var store = gridPanel_pingFenXiang.getStore();
			if(store.getCount() < 2){
				Ext.ux.Toast.msg('提示信息', '评分项的填写至少有两项!');
				return;
			}
			for(var x = 0; x < store.getCount(); x++){
				var optName = store.getAt(x).data.optName;
				var optScore = Number(store.getAt(x).data.optScore);
				var disorder = Number(store.getAt(x).data.disorder);
				if(optName == ''){
					Ext.ux.Toast.msg('提示信息', '评分项名称不能为空!');
					return;
				}
				if(isNaN(optScore) || isNaN(disorder)){
					Ext.ux.Toast.msg('提示信息', '分值和序号必须为数字!');
					return;
				}
			}
		}
		//章节部分验证
		var store2 = gridPanel_zhangjie.getStore();
		var rows2 = [];
		for (var y = 0; y < store2.getCount(); y++) {
			var catName = store2.getAt(y).data.catName;
			var score = Number(store2.getAt(y).data.score);
			var disorder = Number(store2.getAt(y).data.disorder);
			var type = Number(store2.getAt(y).data.type);
			if(catName == ''){
				Ext.ux.Toast.msg('提示信息', '章节名称不能为空!');
				return;
			}
//			alert(type);
			if(type == undefined || type == null || isNaN(type)){
				Ext.ux.Toast.msg('提示信息', '章节类型不能为空!');
				return;
			}
			if(isNaN(score) || isNaN(disorder)){
				Ext.ux.Toast.msg('提示信息', '分值和序号必须为数字!');
				return;
			}
			rows2.push(store2.getAt(y).data);
		}
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/qucon/saveQcTemplate.do',
					params : {
						// 将数组提交至后台 details
						pingFenXiangDetails : Ext.encode(rows),
						zhangJieDetails : Ext.encode(rows2)
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('QcTemplateGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('QcTemplateAddFormWin');
						this.destroy();
					}
				});
	}// end of save

});