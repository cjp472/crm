/**
 * @author wangzj
 * @createtime 2012年6月6日 11:20:27
 * @class UkSysKnowShow
 * @description 知识的查看页面
 * @company 优创融联科技
 */
var knowTmpId = '261'; // 全局变量 用于动态调用VM
var knowTypeId = ''; // 全局变量用于接收分类
var applyId = ''; // 全局变量 用于接收申请单号
var _isHide = false;
var flag = false;
var folderSelector = "";
UkSysKnowShow_win = Ext.extend(Ext.Window, {
			// 构造函数
			constructor : function(_cfg) {
				knowTypeId = _cfg.knowTypeId;
				applyId = _cfg.applyId;
				knowTmpId = _cfg.knowTmpId;
				this.useTemplate = false; // 使用HTML表单模板
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				var kkId = this.knowId;
				var knowTitle = this.knowTitle ? this.knowTitle : '知识详细信息';
				UkSysKnowShow_win.superclass.constructor.call(this, {
					id : 'UkSysKnowShow_winWin',
					layout : 'form',
					items : [this.formPanel, this.vmFormPanel],
					// items : [this.formPanel],
					modal : true,
					height : 500,
                    width : 700,
//					autoWidth : true,
//					maximizable : true,
					title : '知识详细信息',
					buttonAlign : 'center',
					tbar : this.initToolbar()
					});
					var tid = window.setInterval(function() {
							if (flag) {
								startShow(kkId);
								window.clearInterval(tid)
							}
						}, 200);
//				 this.start();
			},// end of the constructor
			// 初始化组件
			initUIComponents : function() {
				var knowTmpId = this.knowTmpId ? this.knowTmpId : -1; // 全局变量
				// 用于动态调用VM
				var _url = __ctxPath + '/know/listUkKnowType.do';//
				// 不把根目录显示出来
				// // ?method=1
				if (knowTypeId != '') {
					_isHide = true;
					_isBlank = true;
				} else {
					_isHide = false;
					_isBlank = false;
				}
				folderSelector = new TreeSelector('knowTypeIdSelector', _url,
						'知识分类', 'UkSysKnowShow_win.knowTypeId', _isBlank, false,
						_isHide, 382);

				this.formPanel = new Ext.FormPanel({
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
								name : 'sysKnowKeyWordIds',
								id : 'ukSysKnowShow.sysKnowKeyWord',
								xtype : 'hidden'
							}]
						// items : [
						// {
						// name : 'knowTypeId',
						// id : 'UkSysKnowShow_win.knowTypeId',
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
						// title : '知识基本信息',
						// border : false,
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
						// id : 'UkSysKnowShow_win.busiType',
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
						// .getCmp('UkSysKnowShow_win.busiType');
						// var store = combo
						// .getStore();
						// var rows = [];// 定义数组
						// for (var i = 0; i < store
						// .getCount(); i++) { // store.getCount()为store的长度
						// if (store.getAt(i).data['itemId'] == combo
						// .getValue()) {
						// combo.setValue(store.getAt(i).data['itemName']);
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
						// id : 'UkSysKnowShow_win.keyWord',
						// name : 'keyWord',
						// width : 800,
						// //allowBlank : false,
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
						// id : 'ukSysKnowShow.sysKnowKeyWord',
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
				this.vmFormPanel = new Ext.FormPanel({
							region : 'center',
							border : false,
							id : 'sysKnowShowVm',
							// bodyStyle : 'padding:16px 4px 4px 20px',
							style : 'padding-left:35px;',
							autoScroll : true,
							defaults : {
								anchor : '96%,96%'
							},
							autoLoad : {
								url : __ctxPath
										+ "/know/getVmUkSysKnow.do?knowTmpId=261",
								// + knowTmpId,
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
				tabs.remove('UkSysKnowShow_winWin');
				this.destroy();
				flag = false;
			},
			// 转化Html
			convertHtml : function() {
				var formExt = document.getElementById('formExt');
				if (formExt != null) {
					// 加上标识，表示是使用EXT模板进行
					this.useTemplate = true;
					var valExt = formExt.value;
					valExt = valExt.replace('Ext.form.FormPanel', 'Ext.Panel');
					this.formExtPanel = eval('new (' + valExt + ')('
							+ this.vmParams + ');');
					this.vmFormPanel.add(this.formExtPanel);
					this.vmFormPanel.doLayout();
					flag = true;
					return;
				}
				this.vmFormPanel.doLayout();

			},
			/**
			 * 关键字选择器
			 */
			setKeyValue : function() {
				var keyWordId = Ext.getCmp('ukSysKnowShow.sysKnowKeyWord')
						.getValue();
				UkKnowKeywordSelector.getView(function(data) {
					// var fm = Ext.getCmp('UkSysKnowShow_winWin');
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
					Ext.getCmp('ukSysKnowShow.sysKnowKeyWord')
							.setValue(keywordId);
					Ext.getCmp('UkSysKnowShow_win.keyWord').setValue(keyWord);
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

UkSysKnowShow_win.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : ['->', {
							text : __cancel,
							iconCls : 'btn-cancel',
							scope : this,
							handler : this.cancel
						}]
			});
	return toolbar;
};

var startShow = function(knowId) {
	Ext.getCmp('UkSysKnowShow_winWin').items.each(function(ctl) {
				//ctl.setReadOnly(true);
                //alert(ctl);
                ctl.getForm().items.each(function(ctls) {
                   ctls.setReadOnly(true);
               });
			});
	// 加载表单对应的数据
	if (knowId != null && knowId != 'undefined') {
		var UkSysKnowShow_winWin = Ext.getCmp('UkSysKnowShow_winWin');
		UkSysKnowShow_winWin.loadData({
			url : __ctxPath + '/know/getCollectUkSysKnow.do?knowId=' + knowId,
			root : 'data',
			preName : 'ukSysKnow',
			success : function(response, options) {
				var thisObj = Ext.util.JSON.decode(response.responseText).data;
				
				//如果不是发布状态,则评论 收藏,反馈按钮隐藏
				if(thisObj.sysKnowStatus!=5){
					Ext.getCmp('fankuiBtn').hide();
					Ext.getCmp('pinglunBtn').hide();
					Ext.getCmp('shoucangBtn').hide();
				}
				
				// 开始加载关键字
				var keyWord = Ext.getCmp('ukSysKnowShow.keyword');
				var words = thisObj.ukKnowKeywords;
				if (words != undefined) {
					for (var i = 0; i < words.length; i++) {
						if (keyWord.getValue() != '') {
							keyWord.setValue(keyWord.getValue() + ',');
						}
						keyWord.setValue(keyWord.getValue() + words[i].keyWord);
					}
				}
				
				// 开始加载知识分类
//				var knowtype = Ext.getCmp('ukSysKnowTypes');
//				var types = thisObj.ukKnowTypes;
//				if (types != undefined) {
//					for (var i = 0; i < types.length; i++) {
//						if (knowtype.getValue() != '') {
//							knowtype.setValue(knowtype.getValue() + ',');
//						}
//						knowtype.setValue(knowtype.getValue() + types[i].name);
//					}
//				}
				
				//开始加载相关知识
				var grid = Ext.getCmp('show-know-grid');
				var store = grid.getStore();
				var Plant = grid.getStore().recordType;
				var knows = thisObj.ukRelativeKnows;			//获得传递的相关知识
				if (knows != undefined) {
					for (var i = 0; i < knows.length; i++) {
						var knowId = '';
						var tiTle = '';
						var pastTime = '';
						var sysKnowStatus = '';
						var p = new Plant();
						knowId = knows[i].knowId
						tiTle = knows[i].tiTle;
						p.set('knowId', knowId);
						p.set('tiTle', tiTle);
						p.set('pastTime', pastTime);
						p.set('sysKnowStatus', sysKnowStatus);
						p.commit();
						store.insert(store.getCount(), p);
					}
				}
				//开始加载附件
				var grid = Ext.getCmp('show-file-grid');
				var store = grid.getStore();
				var Plant = grid.getStore().recordType;
				var files = thisObj.fileAttachs;			//获得传递的附件
				if (files != undefined) {
					for (var i = 0; i < files.length; i++) {
						var flag = 0;
						var fileId = '';
						var fileName = '';
						var ext = '';
						var filePath = '';
						var totalBytes = '';
						var p = new Plant();
						
						fileId = files[i].fileId;
						fileName = files[i].fileName;
						ext = files[i].ext;
						filePath = files[i].filePath;
						totalBytes = files[i].totalBytes;
						
						p.set('fileId', fileId);
						p.set('fileName', fileName);
						p.set('ext', ext);
						p.set('filePath', filePath);
						p.set('totalBytes', totalBytes);
						p.commit();
						store.insert(store.getCount(), p);
					}}
				

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
}