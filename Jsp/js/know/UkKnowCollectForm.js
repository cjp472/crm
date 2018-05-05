/**
 * @author zhangyl
 * @createtime
 * @class UkKnowCollectForm
 * @extends Ext.Window
 * @description UkSysKnow表单
 * @company 优创融联科技
 */
var knowTmpId_ = this.knowTmpId ? this.knowTmpId : -1; // 全局变量 用于动态调用VM
var knowTypeId_ = this.knowTypeId ? this.knowTypeId : -1; // 全局变量用于接收分类
var applyId_ = this.applyId ? this.applyId : -1; // 全局变量 用于接收申请单号
var _isHide_ = false;
var flag_ = false;
UkKnowCollectForm = Ext.extend(Ext.form.FormPanel, {
			// 构造函数
			constructor : function(_cfg) {
				knowTypeId_ = _cfg.knowTypeId;
				applyId_ = _cfg.applyId;
				this.useTemplate = false; // 使用HTML表单模板
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				var kkId = this.knowId;
				UkKnowCollectForm.superclass.constructor.call(this, {
					id : 'UkKnowCollectFormWin',
					layout : 'form',
					items : [this.formPanel, this.vmFormPanel],
					// items : [this.formPanel],
					modal : true,
					height : 200,
//					autoWidth : true,
					bodyStyle:'overflow-y:auto;overflow-x:hidden',
					maximizable : true,
					title : '知识采集详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : '提交',
//								iconCls : 'btn-save',
								scope : this,
								handler : this.submit
							},{
								text : __save,
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
				var tid = window.setInterval(function() {
					if (flag_) {
						start(kkId);
						window.clearInterval(tid)
					}
				}, 200);
				// this.start();
			},// end of the constructor
			// 初始化组件
			initUIComponents : function() {
				var knowTmpId = this.knowTmpId ? this.knowTmpId : -1; // 全局变量
				// 用于动态调用VM
				// var _url = __ctxPath + '/know/listUkKnowType.do';//
				// // 不把根目录显示出来
				// // // ?method=1
				// if (knowTypeId != '') {
				// _isHide = true;
				// _isBlank = true;
				// } else {
				// _isHide = false;
				// _isBlank = false;
				// }
				// var folderSelector = new TreeSelector('knowTypeIdSelector',
				// _url, '知识分类', 'selector.knowTypeId', _isBlank, false,
				// _isHide, 150);

				this.formPanel = new Ext.Panel({
					layout : 'form',
					// bodyStyle : 'padding:16px 4px 4px 20px',
					border : false,
					autoScroll : true,
					// id : 'UkKnowCollectForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
								name : 'knowTypeId',
								id : 'selector.knowTypeId',
								xtype : 'hidden',
								value : knowTypeId_
							}, {
								name : 'applyId',
								xtype : 'hidden',
								value : applyId_
							}, {
								name : 'ukSysKnow.knowId',
								xtype : 'hidden',
								value : this.knowId == null ? '' : this.knowId
							}, {
								name : 'ukSysKnow.knowTmpId',
								xtype : 'hidden',
								// value : this.knowTmpId == null ? '' :
								// this.knowTmpId
								value : knowTmpId
							}

					]
						// items : [{
						// name : 'knowTypeId',
						// id : 'selector.knowTypeId',
						// xtype : 'hidden',
						// value : knowTypeId
						// }, {
						// name : 'applyId',
						// xtype : 'hidden',
						// value : applyId
						// }, {
						// name : 'ukSysKnow.knowId',
						// xtype : 'hidden',
						// value : this.knowId == null ? '' : this.knowId
						// }, {
						// xtype : 'fieldset',
						// title : '采集基本信息',
						// // defaultType : 'textfield',
						// layout : 'form',
						// defaults : {
						// anchor : '100%,100%'
						// },
						// items : [{
						// name : 'ukSysKnow.knowTmpId',
						// xtype : 'hidden',
						// value : this.knowTmpId == null
						// ? ''
						// : this.knowTmpId
						// }, {
						// fieldLabel : '标题',
						// name : 'ukSysKnow.tiTle',
						// maxLength : 30,
						// width : 550,
						// xtype : 'textfield'
						// }, {
						// layout : "column",
						// xtype : 'container',
						// defaults : {
						// border : false
						// },
						// items : [ {
						// columnWidth : .5,
						// layout : "form",
						// border : false,
						// items : [{
						// fieldLabel : __ukKnowApplyBusiType,
						// id : 'ukSysKnow.busiType',
						// hiddenName : 'ukSysKnow.busiType',
						// displayField : 'itemName',
						// valueField : 'itemId',
						// xtype : 'combo',
						// mode : 'local',
						// width : 382,
						// editable : false,
						// allowBlank : false,
						// triggerAction : 'all',
						// store : new Ext.data.SimpleStore({
						// url : __ctxPath
						// + '/system/loadItemDictionary.do',
						// baseParams : {
						// itemName : '知识库业务类别'
						// },
						// fields : ['itemId', 'itemName'],
						// autoLoad : true,
						// method : "post",
						// listeners : {
						// load : function() {
						// var combo = Ext
						// .getCmp('ukSysKnow.busiType');
						// var store = combo
						// .getStore();
						// var rows = [];// 定义数组
						// for (var i = 0; i < store
						// .getCount(); i++) { // store.getCount()为store的长度
						// if (store.getAt(i).data['itemId'] == combo
						// .getValue()) {
						// combo
						// .setValue(store
						// .getAt(i).data['itemName']);
						// break;
						// }
						// }
						//
						// }
						// }
						// })
						// }]
						// },{
						// columnWidth : .5,
						// layout : "form",
						// items : [folderSelector]
						// }]
						// }, {
						// layout : "column",
						// xtype : 'container',
						// defaults : {
						// border : false
						// },
						// items : [{
						// columnWidth : .5,
						// layout : "form",
						// items : [{
						// fieldLabel : '生效时间',
						// name : 'ukSysKnow.enableTime',
						// xtype : 'datefield',
						// width : 383,
						// format : 'Y-m-d',
						// value : new Date()
						// }]
						// }, {
						// columnWidth : .5,
						// layout : "form",
						// border : false,
						// items : [{
						// fieldLabel : '过期时间',
						// width : 383,
						// name : 'ukSysKnow.pastTime',
						// xtype : 'datefield',
						// format : 'Y-m-d',
						// value : new Date()
						// }]
						// }]
						// }, {
						// xtype : 'compositefield',
						// fieldLabel : '关键字',
						// items : [{
						// xtype : 'textarea',
						// id : 'keyWord',
						// name : 'keyWord',
						// width : 800,
						// allowBlank : false,
						// readOnly : true
						// }, {
						// columnWidth : .5,
						// xtype : 'button',
						// autoWidth : true,
						// text : '选择关键字',
						// // iconCls : 'menu-hrm',
						// id : 'sysKnowKeyWordSelector',
						// handler : this.setKeyValue
						// }
						//
						// ]
						//
						// }, {
						// fieldLabel : '摘要',
						// name : 'ukSysKnow.sysKnowComment',
						// maxLength : 200,
						// xtype : 'textarea'
						// }, {
						// name : 'sysKnowKeyWordIds',
						// id : 'sysKnowKeyWord',
						// xtype : 'hidden'
						// }
						// // , {
						// // xtype : 'container',
						// // layout : 'column',
						// // border : false,
						// // defaults : {
						// // border : false,
						// // anchor : '98%'
						// // },
						// // items : [{
						// // columnWidth : .92,
						// // layout : 'form',
						// // border : false,
						// // items : [{
						// // fieldLabel : '附件',
						// // xtype : 'panel',
						// // id : 'ukSysKnowPanel',
						// // frame : false,
						// // border : true,
						// // bodyStyle : 'padding:4px 4px 4px 4px',
						// // height : 80,
						// // autoScroll : true,
						// // html : ''
						// // }]
						// // }, {
						// // columnWidth : .08,
						// // border : false,
						// // items : [{
						// // xtype : 'button',
						// // text : '添加附件',
						// // border : false,
						// // iconCls : 'menu-attachment',
						// // handler : function() {
						// // var dialog = App.createUploadDialog({
						// // file_cat : 'know/ukSysKnow',
						// // callback : function(data) {
						// // var fileIds = Ext
						// // .getCmp("fileAttachsIds");
						// // var filePanel = Ext
						// // .getCmp('ukSysKnowPanel');
						// //
						// // for (var i = 0; i < data.length; i++) {
						// // if (fileIds.getValue() != '') {
						// // fileIds
						// // .setValue(fileIds
						// // .getValue()
						// // + ',');
						// // }
						// // fileIds.setValue(fileIds
						// // .getValue()
						// // + data[i].fileId);
						// // Ext.DomHelper
						// // .append(
						// // filePanel.body,
						// // '<span><a href="#"
						// onclick="FileAttachDetail.show('
						// // + data[i].fileId
						// // + ')">'
						// // + data[i].fileName
						// // + '</a> <img class="img-delete" src="'
						// // + __ctxPath
						// // + '/images/system/delete.gif"
						// // onclick="removeResumeFile(this,'
						// // + data[i].fileId
						// // + ')"/>&nbsp;|&nbsp;</span>');
						// // }
						// // }
						// // });
						// // dialog.show(this);
						// // }
						// // }, {
						// // xtype : 'button',
						// // border : false,
						// // text : '清除附件',
						// // iconCls : 'reset',
						// // handler : function() {
						// // var fileAttaches = Ext
						// // .getCmp("fileAttachsIds");
						// // var filePanel = Ext
						// // .getCmp('ukSysKnowPanel');
						// // filePanel.body.update('');
						// // fileAttaches.setValue('');
						// // }
						// // }, {
						// // xtype : 'hidden',
						// // id : 'fileAttachsIds',
						// // name : 'fileIds'
						// // }]
						// // }]
						// // }
						// ]
						// }
						//
						// // , {
						// // fieldLabel : '附加字段1',
						// // name : 'ukSysKnow.plus1',
						// // xtype : 'textarea',
						// // maxLength : 4000
						// // }
						// //
						// // , {
						// // fieldLabel : '附加字段2',
						// // name : 'ukSysKnow.plus2',
						// // xtype : 'textarea',
						// // maxLength : 4000
						// // }
						// //
						// // , {
						// // fieldLabel : '附加字段3',
						// // name : 'ukSysKnow.plus3',
						// // xtype : 'textarea',
						// // maxLength : 4000
						// // }
						// //
						// // , {
						// // fieldLabel : '附加字段4',
						// // name : 'ukSysKnow.plus4',
						// // xtype : 'textarea',
						// // maxLength : 4000
						// // }
						// //
						// // , {
						// // fieldLabel : '附加字段5',
						// // name : 'ukSysKnow.plus5',
						// // xtype : 'textarea',
						// // maxLength : 4000
						// // }
						// //
						// // , {
						// // fieldLabel : '附加字段6',
						// // name : 'ukSysKnow.plus6',
						// // xtype : 'textarea',
						// // maxLength : 4000
						// // }
						// //
						// // , {
						// // fieldLabel : '附加字段7',
						// // name : 'ukSysKnow.plus7',
						// // xtype : 'textarea',
						// // maxLength : 4000
						// // }
						// //
						// // , {
						// // fieldLabel : '附加字段8',
						// // name : 'ukSysKnow.plus8',
						// // xtype : 'textarea',
						// // maxLength : 4000
						// // }
						//
						// ]
					});

				// 加载其对应的HTML或EXT表单
				this.vmFormPanel = new Ext.Panel({
					region : 'center',
					border : false,
					id : 'sysKnowFormVm',
					layout:'fit',
					bodyStyle : 'padding:16px 4px 4px 20px;overflow-y:auto;overflow-x:hidden',
					autoScroll : true,
					defaults : {
						anchor : '96%,96%'
					},
					autoLoad : {
						url : __ctxPath+ "/know/getVmUkSysKnow.do?knowTmpId=" + knowTmpId,
						nocache : true,
						scope : this,
						callback : this.convertHtml
					}
				});

			},// end of the initcomponents
			start : function() {
			},
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
				tabs.remove('UkKnowCollectFormWin');
				this.destroy();
				flag_ = false;
			},
			//提交知识
			submit : function() {
				var weidu = Ext.getCmp('ukKnowType.grantAccess_weidu').getValue();
				var weiduname = Ext.getCmp('ukKnowColl.grantAccess_name').getValue();
				var knowGrid = Ext.getCmp('know-grid');
				var knowStore = knowGrid.getStore();
				var knowRows = [];// 定义知识数组
				var fileGrid = Ext.getCmp('file-grid');
				var fileStore = fileGrid.getStore();
				var fileRows = [] // 定义附件数组
				
				for (var i = 0; i < knowStore.getCount(); i++) { // store.getCount()为store的长度
					knowRows.push(knowStore.getAt(i).data);// 放到数组里
				}
				for (var i = 0; i < fileStore.getCount(); i++) { // store.getCount()为store的长度
					fileRows.push(fileStore.getAt(i).data);// 放到数组里
				}
				if(knowTypeId_==""){
					knowTypeId_ = Ext.getCmp('selector.knowTypeId').getValue();
				}
				$postForm({
					formPanel : Ext.getCmp('UkKnowCollectFormWin'),
					scope : this,
					url : __ctxPath + '/know/submitCollectUkSysKnow.do',
					params : {
						knowDetails : Ext.encode(knowRows),
						fileDetails : Ext.encode(fileRows),
						knowTypeId_ : knowTypeId_,
						weiduname : weiduname,
						weidu : weidu
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UkKnowCollectGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('UkKnowCollectFormWin');
						this.destroy();
					}
				});
			},
			/**
			 * 保存记录
			 */
			save : function() {
				// Ext.getCmp('UkKnowCollectFormWin').getForm().submit({
				// url : __ctxPath + '/know/saveCollectUkSysKnow.do',
				// method : 'post',
				// callback : function(fp, action) {
				// var gridPanel = Ext.getCmp('UkSysKnowGrid');
				// if (gridPanel != null) {
				// gridPanel.getStore().reload();
				// }
				// var tabs = Ext.getCmp('centerTabPanel');
				// tabs.remove('UkKnowCollectFormWin');
				// this.destroy();
				// }
				// })
				var weidu = Ext.getCmp('ukKnowType.grantAccess_weidu').getValue();
				var weiduname = Ext.getCmp('ukKnowColl.grantAccess_name').getValue();
				var dimensionality_know_id = Ext.getCmp('ukKnowType.dimensionality_know').getValue();
				var knowGrid = Ext.getCmp('know-grid');
				var knowStore = knowGrid.getStore();
				var knowRows = [];// 定义知识数组
				var fileGrid = Ext.getCmp('file-grid');
				var fileStore = fileGrid.getStore();
				var fileRows = [] // 定义附件数组
				// alert('knowGrid : '+knowGrid +'knowStore : '+knowStore
				// +'fileGrid : ' + fileGrid + 'fileStore : ' + fileStore);
				for (var i = 0; i < knowStore.getCount(); i++) { // store.getCount()为store的长度
					knowRows.push(knowStore.getAt(i).data);// 放到数组里
				}
				for (var i = 0; i < fileStore.getCount(); i++) { // store.getCount()为store的长度
					fileRows.push(fileStore.getAt(i).data);// 放到数组里
				}
				// alert('knowRows : '+knowRows +'fileRows : ' + fileRows);
				//不知道有没有用，先注掉，不然报错 2012.10.22
//				var busiTypeItemIndex = Ext.getCmp("ukSysKnow.busiTypeId").getItemIndex();
//				var busiTypeMapName = Ext.getCmp("ukSysKnow.busiTypeId").getMapName();

				// alert(itemIndex);
				// alert(mapName);
				// return;
				
				if(knowTypeId_==""){
					knowTypeId_ = Ext.getCmp('selector.knowTypeId').getValue();
				}
				$postForm({
					formPanel : Ext.getCmp('UkKnowCollectFormWin'),
					scope : this,
					url : __ctxPath + '/know/saveCollectUkSysKnow.do',
					params : {
						knowDetails : Ext.encode(knowRows),
						fileDetails : Ext.encode(fileRows),
						knowTypeId_ : knowTypeId_,
//						busiTypeItemIndex : knowTypeId_,
//						busiTypeMapName : knowTypeId_,
						weiduname : weiduname,
						weidu : weidu,
						dimensionality_know_id : dimensionality_know_id
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UkKnowCollectGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('UkKnowCollectFormWin');
						this.destroy();
					}
				});
			}// end of save
			// 转化Html
			,
			convertHtml : function() {
				var formExt = document.getElementById('formExt');
				if (formExt != null) {
					// 加上标识，表示是使用EXT模板进行
					this.useTemplate = true;
					var valExt = formExt.value;
					valExt = valExt.replace('Ext.form.FormPanel', 'Ext.Panel');
					this.formExtPanel = eval('new (' + valExt + ')('+ this.vmParams + ');');
					this.vmFormPanel.add(this.formExtPanel);
					this.vmFormPanel.doLayout();
					flag_ = true;
					return;
				}
				this.vmFormPanel.doLayout();
			},
			/**
			 * 关键字选择器
			 */
			setKeyValue : function() {
				var keyWordId = Ext.getCmp('sysKnowKeyWord').getValue();
				UkKnowKeywordSelector.getView(function(data) {
					// var fm = Ext.getCmp('UkKnowCollectFormWin');
					var keywordId = '';
					var keyWord = '';
					for (var i = 0; i < data.length; i++) {
						if (i > 0) {
							keywordId += ',';
							keyWord += ',';
						}
						keywordId += data[i].keywordId;
						keyWord += data[i].keyWord;
					}
					Ext.getCmp('sysKnowKeyWord').setValue(keywordId);
					Ext.getCmp('keyWord').setValue(keyWord);
				}, false, null, keyWordId).show();
			}

		});
// 删除附件
function removeResumeFile(obj, fileId) {
	var fileIds = Ext.getCmp("fileAttachsIds");
	var value = fileIds.getValue();
	if (value.indexOf(',') < 0) {// 仅有一个附件
		fileIds.setValue('');
	} else {
		value = value.replace(',' + fileId, '').replace(fileId + ',', '');
		fileIds.setValue(value);
	}
	var el = Ext.get(obj.parentNode);
	el.remove();
};

/**
 * 顶部保存 取消按钮()
 * 
 * @return {}
 */
UkKnowCollectForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
		width : '100%',
		height : 30,
		items : ['->', {
					text : __cancel,
					iconCls : 'btn-cancel',
					scope : this,
					handler : this.cancel
				}, '->', {
					text : __save,
					iconCls : 'btn-save',
					scope : this,
					handler : this.save
				}
		// , {
		// text : __reset,
		// iconCls : 'btn-reset',
		// scope : this,
		// handler : this.reset
		// }
		]
	});
	return toolbar;
};

var start = function(knowId) {
	// 加载表单对应的数据
	if (knowId != null && knowId != 'undefined') {
		var UkKnowCollectFormWin = Ext.getCmp('UkKnowCollectFormWin');
		UkKnowCollectFormWin.loadData({
			url : __ctxPath + '/know/getCollectUkSysKnow.do?knowId=' + knowId,
			root : 'data',
			preName : 'ukSysKnow',
			success : function(response, options) {
				var thisObj = Ext.util.JSON.decode(response.responseText).data;
				
				var accessManage = Ext.getCmp('knowCate_accessManage');
				accessManage.setValue(thisObj.accessManage);
				var busiType = Ext.getCmp('knowCate_busssiType');
				busiType.setValue(thisObj.busiType);
				
				//开始加载知识维度
				var ukKnowDimensionality = Ext.getCmp('ukKnowColl.grantAccess_name');
				var knowDimensionalityIds = Ext.getCmp('ukKnowType.grantAccess_weidu');
				var dimensionalityKnows = thisObj.ukDimensionalityKnows;
				
				if (dimensionalityKnows != 'undefined'){
					for (var i = 0; i < dimensionalityKnows.length; i++) {
						Ext.getCmp('ukKnowType.dimensionality_know').setValue(dimensionalityKnows[i].dimensionalityKnowId);
						if (dimensionalityKnows[i].ukKnowDimensionality != null){
							knowDimensionalityIds.setValue(knowDimensionalityIds.getValue()+'[['+dimensionalityKnows[i].ukKnowDimensionality.dimensionalityId + ','+ busiType.getValue()+']]');//
						}else if (dimensionalityKnows[i].ulDepartment){
							knowDimensionalityIds.setValue(knowDimensionalityIds.getValue()+'[['+dimensionalityKnows[i].ulDepartment.depid + ','+ busiType.getValue()+']]');
						}else if (dimensionalityKnows[i].dictionary){
							knowDimensionalityIds.setValue(knowDimensionalityIds.getValue()+'[['+dimensionalityKnows[i].dictionary.dicId + ','+ busiType.getValue()+']]');
						}
						
						if (ukKnowDimensionality.getValue() != '') {
							ukKnowDimensionality.setValue(ukKnowDimensionality.getValue() + ',');
						}
						ukKnowDimensionality.setValue(ukKnowDimensionality.getValue() + dimensionalityKnows[i].dimName);
					}
				}
				
				// 开始加载知识分类
				var knowtype = Ext.getCmp('selector.knowTypeId');
				var types = thisObj.ukKnowTypes;
				if (types != undefined) {
					for (var i = 0; i < types.length; i++) {
						if (knowtype.getValue() != '') {
							knowtype.setValue(knowtype.getValue() + ',');
						}
						knowtype.setValue(knowtype.getValue()
								+ types[i].knowTypeId);
					}
				}

				/**
				 * 关键字加载作废  ----------------------------begin
				 */
				// 开始加载关键字
//				var keyWord = Ext.getCmp('UkSysKnow.keyWord');
//				var sysKnowKeyWordIds = Ext.getCmp("UkSysKnow.sysKnowKeyWord");
//				var words = thisObj.ukKnowKeywords;
//				if (words != undefined) {
//					for (var i = 0; i < words.length; i++) {
//						if (sysKnowKeyWordIds.getValue() != '') {
//							sysKnowKeyWordIds.setValue(sysKnowKeyWordIds
//									.getValue()
//									+ ',');
//						}
//						sysKnowKeyWordIds.setValue(sysKnowKeyWordIds.getValue()+ words[i].keywordId);
//						if (keyWord.getValue() != '') {
//							keyWord.setValue(keyWord.getValue() + ',');
//						}
//						keyWord.setValue(keyWord.getValue() + words[i].keyWord);
//					}
//				}
				/**
				 * 关键字加载作废 -------------------------------end
				 */
//				eval('debugger');
//				// 开始加载维度
//				var weiDu = Ext.getCmp('ukKnowColl.grantAccess_name');
//				var grantAccess_weidus = Ext.getCmp("ukKnowType.grantAccess_weidu");
//				var weidus = thisObj.ukDimensionalityKnows;
//				if (weidus != undefined) {
//					for (var i = 0; i < weidus.length; i++) {
//						if (grantAccess_weidus.getValue() != '') {
//							grantAccess_weidus.setValue(grantAccess_weidus.getValue() + ',');
//						}
//						grantAccess_weidus.setValue(grantAccess_weidus.getValue()+ weidus[i].dimensionalityId);
//						if (weiDu.getValue() != '') {
//							weiDu.setValue(weiDu.getValue() + ',');
//						}
//						weiDu.setValue(weiDu.getValue() + weidus[i].weiDu);
//					}
//				}

				// 开始加载相关知识
				var grid = Ext.getCmp('know-grid');
				var store = grid.getStore();
				var Plant = grid.getStore().recordType;
				var knows = thisObj.ukRelativeKnows; // 获得传递的相关知识
				if (knows != undefined) {
					for (var i = 0; i < knows.length; i++) {
						var knowId = '';
						var tiTle = '';
						var p = new Plant();
						knowId = knows[i].knowId
						tiTle = knows[i].tiTle;
						p.set('knowId', knowId);
						p.set('tiTle', tiTle);
						p.commit();
						store.insert(store.getCount(), p);
					}
				}
				// 开始加载附件
				var grid = Ext.getCmp('file-grid');
				var store = grid.getStore();
				var Plant = grid.getStore().recordType;
				var files = thisObj.fileAttachs; // 获得传递的附件
				if (files != undefined) {
					for (var i = 0; i < files.length; i++) {
						var flag = 0;
						var fileId = '';
						var fileName = '';
						var ext = '';
						var filePath = '';
						var p = new Plant();

						fileId = files[i].fileId;
						fileName = files[i].fileName;
						ext = files[i].ext;
						filePath = files[i].filePath;
						p.set('fileId', fileId);
						p.set('fileName', fileName);
						p.set('ext', ext);
						p.set('filePath', filePath);
						p.commit();
						store.insert(store.getCount(), p);
					}
				};

//				Ext.getCmp('ukSysKnow.busiTypeId').setHValue(thisObj.busiType);
				// // 开始加载附件
				// var filePanel = Ext.getCmp('ukSysKnowPanel');
				// var fileIds = Ext.getCmp("fileAttachsIds");
				// var af = thisObj.fileAttachs;
				// if (af != undefined) {
				// for (var i = 0; i < af.length; i++) {
				// if (fileIds.getValue() != '') {
				// fileIds.setValue(fileIds.getValue() + ',');
				// }
				// fileIds.setValue(fileIds.getValue() + af[i].fileId);
				// Ext.DomHelper
				// .append(
				// filePanel.body,
				// '<span><a href="#" onclick="FileAttachDetail.show('
				// + af[i].fileId
				// + ')">'
				// + af[i].fileName
				// + '</a><img class="img-delete" src="'
				// + __ctxPath
				// + '/images/system/delete.gif"
				// onclick="removeResumeFile(this,'
				// + af[i].fileId
				// + ')"/>&nbsp;|&nbsp;</span>');
				// }
				// }
			}
		});
	}
};