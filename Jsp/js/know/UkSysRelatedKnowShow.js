//var knowTmpId = '261'; // 全局变量 用于动态调用VM
//var knowTypeId = ''; // 全局变量用于接收分类
//var applyId = ''; // 全局变量 用于接收申请单号
var know_show_id = ''; //全局变量 用于vm接收知识 id
var _isHide = false;
var flag = false;
var folderSelector = "";
UkSysRelatedKnowShow = Ext.extend(Ext.form.FormPanel, {
			// 构造函数
			constructor : function(_cfg) {
				knowTypeId = _cfg.knowTypeId;
				applyId = _cfg.applyId;
				knowTmpId = _cfg.knowTmpId;
				know_show_id = _cfg.knowId;
				this.useTemplate = false; // 使用HTML表单模板
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				var kkId = this.knowId;
				var knowTitle = this.knowTitle ? this.knowTitle : '相关知识详细信息';
				UkSysRelatedKnowShow.superclass.constructor.call(this, {
					id : 'UkSysRelatedKnowShow',
					layout : 'form',
					items : [this.formPanel, this.vmFormPanel],
					// items : [this.formPanel],
					modal : true,
					// height : 200,
					// autoWidth : true,
					maximizable : true,
					title : '知识详细信息',
					buttonAlign : 'center'
						// tbar : this.initToolbar()
						// buttonAlign:'center',
						// buttons:[{
						// text : __cancel,
						// iconCls : 'btn-cancel',
						// scope : this,
						// handler : this.cancel
						// }]
					});
				var tid = window.setInterval(function() {
							if (flag) {
								startRelatedShow(kkId);
								window.clearInterval(tid)
							}
						}, 200);
				// this.start();
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
						'知识分类', 'UkSysRelatedKnowShow.knowTypeId', _isBlank, false,
						_isHide, 382);

				this.formPanel = new Ext.Panel({
					layout : 'form',
					// bodyStyle : 'padding:16px 4px 4px 20px',
					border : false,
					// autoScroll : true,
					// id : 'UkKnowCollectForm',
					defaults : {
						anchor : '96%,96%'
					},

					defaultType : 'textfield',
					items : [{
								name : 'sysKnowKeyWordIds',
								id : 'UkSysRelatedKnowShow.sysKnowKeyWord',
								xtype : 'hidden'
							}]

					});

				// 加载其对应的HTML或EXT表单
				this.vmFormPanel = new Ext.Panel({
							region : 'center',
							border : false,
							id : 'sysKnowShowVm',
							bodyStyle : 'padding:16px 4px 4px 20px',
							// style : 'padding-left:35px;',
							// autoScroll : true,
							autoScroll : false,
							anchor : '98.5%,100%',
							unstyled : true,
							defaults : {
								anchor : '96%,96%'
							},
							autoLoad : {
								url : __ctxPath
										+ "/know/getVmShowUkSysKnow.do?knowTmpId=261",
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
				tabs.remove('UkSysRelatedKnowShow');
				this.destroy();
				flag = false;
			},
			// 转化Html
			convertHtml : function() {
				var formExt = document.getElementById('knowTemplateShow');
				if (formExt != null) {
					// 加上标识，表示是使用EXT模板进行
					this.useTemplate = true;
					var valExt = formExt.value;
					valExt = valExt.replace('Ext.form.FormPanel', 'Ext.Panel');
					// alert(valExt);
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
				var keyWordId = Ext.getCmp('UkSysRelatedKnowShow.sysKnowKeyWord')
						.getValue();
				UkKnowKeywordSelector.getView(function(data) {
					// var fm = Ext.getCmp('UkSysRelatedKnowShow');
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
					Ext.getCmp('UkSysRelatedKnowShow.sysKnowKeyWord')
							.setValue(keywordId);
					Ext.getCmp('UkSysRelatedKnowShow.keyWord').setValue(keyWord);
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
//
// UkSysRelatedKnowShow.prototype.initToolbar = function() {
// var toolbar = new Ext.Toolbar({
// width : '100%',
// height : 30,
// items : ['->', {
// text : __cancel,
// iconCls : 'btn-cancel',
// scope : this,
// handler : this.cancel
// }]
// });
// return toolbar;
// };

var startRelatedShow = function(knowId) {
	Ext.getCmp('UkSysRelatedKnowShow').getForm().items.each(function(ctl) {
				ctl.setReadOnly(!ctl.readOnly);
			});
	// 加载表单对应的数据
	if (knowId != null && knowId != 'undefined') {
		var UkSysRelatedKnowShowWin = Ext.getCmp('UkSysRelatedKnowShow');
		UkSysRelatedKnowShowWin.loadData({
			url : __ctxPath + '/know/getCollectUkSysKnow.do?knowId=' + knowId,
			root : 'data',
			preName : 'ukSysKnow',
			success : function(response, options) {
				var thisObj = Ext.util.JSON.decode(response.responseText).data;

				// 如果不是发布状态,则评论 收藏,反馈按钮隐藏
				if (thisObj.sysKnowStatus != 5) {
					Ext.getCmp('fankuiBtn').hide();
					Ext.getCmp('pinglunBtn').hide();
					Ext.getCmp('shoucangBtn').hide();
					Ext.getCmp('tuijianBtn').hide();
				}

				// 开始加载关键字
				var keyWord = Ext.getCmp('UkSysRelatedKnowShow.keyword');
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

				// 开始加载相关知识
				var grid = Ext.getCmp('show-know-grid');
				var store = grid.getStore();
				var Plant = grid.getStore().recordType;
				var knows = thisObj.ukRelativeKnows; // 获得传递的相关知识
				if (knows != undefined) {
					for (var i = 0; i < knows.length; i++) {
						var knowId = '';
						var tiTle = '';
						var pastTime = '';
						var sysKnowStatus = '';
						var p = new Plant();
						knowId = knows[i].knowId
						tiTle = knows[i].tiTle;
						pastTime = knows[i].pastTime;
						sysKnowStatus = knows[i].sysKnowStatus;
						p.set('knowId', knowId);
						p.set('tiTle', tiTle);
						p.set('pastTime', pastTime);
						p.set('sysKnowStatus', sysKnowStatus);
						p.commit();
						store.insert(store.getCount(), p);
					}
				}
				// 开始加载附件
				var grid = Ext.getCmp('show-file-grid');
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
						var totalBytes = '';
						var p = new Plant();

						fileId = files[i].fileId;
						fileName = files[i].fileName;
						ext = files[i].ext;
						totalBytes = files[i].totalBytes;
						filePath = files[i].filePath;
						p.set('fileId', fileId);
						p.set('fileName', fileName);
						p.set('ext', ext);
						p.set('filePath', filePath);
						p.set('totalBytes', totalBytes);
						p.commit();
						store.insert(store.getCount(), p);
					}
				}
//				 Ext.getCmp('UkSysRelatedKnowShow.busiTypeId').setHValue(thisObj.busiType);
				var rec = Ext.getCmp('show-file-grid').getStore().getAt(0);
				if(rec!=undefined){
					if (thisObj.contentType == 2) {
						if (rec.data.filePath.split(".")[1] == "jpg"|| rec.data.filePath.split(".")[1] == "bmp"|| rec.data.filePath.split(".")[1] == "gif"|| rec.data.filePath.split(".")[1] == "png") {
							Ext.getCmp('UkSysRelatedKnowShow.sysKnowComment.s').setValue('<img src=' + __ctxPath+ "/attachFiles" + rec.data.filePath+ ' />');
						} else {
							Ext.getCmp('UkSysRelatedKnowShow.sysKnowComment.s').update('<iframe id="wenjianframe" style="background:white;" width="100%" height="100%" id="iexpro"  name="iexpro" src="'
																						+__ctxPath+'/weboffice/index.html?name=/attachFiles'+ rec.data.filePath+'&type='+rec.data.filePath.split(".")[1]
																						+ '" scrolling="no"  frameborder="0"> </iframe>');
						}
					}
				}
				
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