/*
 * 对音频的处理
 */

function dealSound() {

}

var dName = ""; // 业务名称
var pName = ""; // 客户姓名
var cardID = "";// 身份证号码
var result = "";// 核查结果
var wangID = "";// 网点号
var cp = ""; // 操作号
var yearMD = "";// 日期
var time = ""; // 时间
var agentName = "";

var SZ_dName = ""; // 业务名称
var SZ_pName = ""; // 客户姓名
var SZ_cardID = "";// 身份证号码
var SZ_time = "";
var SZ_wangID = "";// 网点号
var SZ_cp = ""; // 操作号
var SZ_money = "";// 日期
var SZ_ID = ""; // 时间

var zhengjianImg = "";  //存储证件照片

ConHisForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConHisForm.superclass.constructor.call(this, {
					id : 'ConHisFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					// frame:true,
					// height : 400,
					autoHeigh : true,
					width : 500,
					maximizable : true,
					title : '联络记录详细信息',
					buttonAlign : 'center',
					buttons : this.conHisId ? [{
								text : '关闭',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}] : [{
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
			bodyStyle : 'padding:10px',
			border : false,
			labelAlign : 'right',
			labelWidth : 70,
			autoScroll : true,
			id : 'ConHisForm',
			defaults : {
				anchor : '96%,96%',
				readOnly : true
			},
			// defaultType : 'textfield',
			items : [{
				layout : 'column',
				border : false,
				items : [{
					columnWidth : .333,
					layout : 'form',
					border : false,
					// xtype:'fieldset',
					// collapsible: false,
					// autoHeight:true,
					defaults : {
						readOnly : true
					},
					items : [{
								name : 'conHis.conHisId',
								xtype : 'hidden',
								id : 'conHisId',
								value : this.conHisId == null
										? ''
										: this.conHisId
							}, {
								name : 'conHis.statusId',
								xtype : 'hidden',
								id : 'statusId'
							}, {
								name : 'conHis.ownerId',
								xtype : 'hidden',
								id : 'ownerId'
							}, {
								name : 'conHis.customer.customerId',
								xtype : 'hidden',
								id : 'cusId'
							}, {
								name : 'conHis.statusId',
								xtype : 'hidden',
								id : 'statusId'
							}, {
								xtype : 'hidden',
								name : 'conHis.contactTypeId',
								id : 'conHis.contactTypeId_hid'
							}, {
								xtype : 'textfield',
								fieldLabel : '联络方式',
								id : 'conHis.contactTypeId_form',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'LXFS001',// 对应到相应的联络方式
								anchor : '95%',
								store : getDicStore('联络方式',
										'conHis.contactTypeId_form'),
								listeners : getDicListeners(
										'conHis.contactTypeId_form',
										'conHis.contactTypeId')
							}
							// , {
							// xtype : 'textfield',
							// fieldLabel : '联系人',
							// editable : false,
							// id : 'conHis.cusLinkman_form',
							// name : 'conHis.cusLinkman',
							// anchor : '95%'
							//									
							// }
							, {
								xtype : 'textfield',
								fieldLabel : "号码",
								editable : false,
								name : 'conHis.mainContactNum',
								id : 'conHis.mainContactNum',
								anchor : '95%'
							}]
				}, {
					columnWidth : .33,
					layout : 'form',
					border : false,
					defaults : {
						readOnly : true
					},
					items : [{
								xtype : 'hidden',
								name : 'conHis.dirId',
								id : 'conHis.dirId_hid'
							}, {
								fieldLabel : '方向',
								id : 'conHis.dirId_form',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONFX',
								anchor : '96%',
								store : getDicStore('方向', 'conHis.dirId_form'),
								listeners : getDicListeners(
										'conHis.dirId_form', 'conHis.dirId')
							}, {
								fieldLabel : '开始时间',
								id : 'conHis_form_staTime',
								name : 'conHis.staTime',
								anchor : '96%',
								xtype : 'datefield',
								editable : false,
								format : 'Y-m-d H:i:s'
								// ,
							// allowBlank : false
						}	, {
								xtype : 'hidden',
								fieldLabel : "",
								editable : false,
								id : 'conHis.content',
								name : 'conHis.content',
								anchor : '95%'
							}]
				}, {
					columnWidth : .33,
					border : false,
					layout : 'form',
					defaults : {
						readOnly : true
					},
					items : [{
								xtype : 'hidden',
								name : 'conHis.srcTypeId',
								id : 'conHis.srcTypeId_hid'
							}
							// , {
							// fieldLabel : '来源',
							// id : 'conHis.srcTypeId_form',
							// xtype : 'mtdiccombo',
							// editable : false,
							// lazyInit : false,
							// forceSelection : false,
							// itemKey : 'CONLYLB',
							// anchor : '96%',
							// store : getDicStore('来源',
							// 'conHis.srcTypeId_form'),
							// listeners : getDicListeners(
							// 'conHis.srcTypeId_form',
							// 'conHis.srcTypeId')
							// }
							, {
								fieldLabel : '截止时间',
								id : 'conHis_form_endTime',
								name : 'conHis.endTime',
								xtype : 'datefield',
								format : 'Y-m-d H:i:s',
								// allowBlank : false,
								editable : false,
								anchor : '96%'
							}, {
								xtype : 'hidden',
								name : 'tmpfilepath',
								id : 'tmpfilepath'
							}]
				}]
			}, {
				xtype : 'hidden',
				name : 'conHis.busTypId',
				id : 'conHis.busTypId_hid'
			}
					// , {
					// layout : 'column',
					// border : false,
					// items : [
					// {
					// columnWidth : .5,
					// border : false,
					// layout : 'form',
					// defaults : {
					// anchor : '63%,63%',
					// readOnly : true
					// },
					// items : [{
					// border : false,
					// layout : 'form',
					// xtype : 'mtdiccombo',
					// id : 'conHis.busTypId_form',
					// editable : true,
					// lazyInit : false,
					// forceSelection : false,
					// itemKey : 'CONLLSX',
					// fieldLabel : "联络事项",
					// width:100,
					// store : getDicStore('来源',
					// 'conHis.busTypId_form'),
					// listeners : getDicListeners(
					// 'conHis.busTypId_form',
					// 'conHis.busTypId')
					// }]
					//
					// },
					// {
					// columnWidth : .5,
					// border : false,
					// layout : 'form',
					// defaults : {
					// anchor : '15%,15%'
					// },
					// items : [{
					// border : false,
					// layout : 'form',
					// text:'最大化',
					// xtype : 'button',
					// width : 100,
					// style : 'float:right;padding-right:25px;',
					// handler : function() {
					// // alert(Ext.getCmp("conHis.content").value);
					// new
					// ConHisMaxWindow({html:Ext.getCmp('conHis.content').value}).show();
					// }
					// }]
					//
					// }]
					//
					//					
					// }, {
					// layout : 'column',
					// border : false,
					// items : [{
					// columnWidth : 1.0,
					// border : false,
					// layout : 'form',
					// defaults : {
					// anchor : '100%',
					// readOnly : true
					// },
					// items : [{
					// fieldLabel : '联络内容',
					// name : 'conHis.conAttachs.filePath',
					// id : 'conHis.content',
					// xtype : 'displayfield',
					// autoScroll : true,
					// // anchor:'20%',
					// layout : 'form',
					// readOnly : false,
					// style : 'width:96.5%;',
					//								
					// height : 80
					//								
					// }]
					//
					// }]
					// }
					// ,{
					// xtype : 'textarea',
					// fieldLabel : "备注",
					// name : 'conHis.remarks',
					// readOlny : false,
					// anchor : '93.7%'
					// ,height : 40
					// }
					, {
						xtype : 'htgrid',
						region : 'center',
						height : 300,
						split : true,
						layout : 'fit',
						rowActions : false,
						printable : false,
						showSm : false,
						// showPaging : false,
						collapsible : true,
						width : '99%',
						showNum : false,
						id : 'show-con_his-grid',
						// hideHeaders : true,
						title : '联络文件',
						exportable : false,
						fields : [{
									name : 'conAttachId',
									type : 'int'
								}, 'fileType', 'fileSource', 'filePath',
								'createBy', 'createDate', 'cusName', 'credNum',
								'terminalId'],
						columns : [{
									header : '联络文件',
									isExp : false,
									hidden : true,
									dataIndex : 'conAttachId'
								}, {
									header : '设备编号',
									isExp : false,
									dataIndex : 'terminalId'
								}, {
									header : '文件类型',
									isExp : false,
									dataIndex : 'fileType',
									renderer : function(value) {
										if (value == "1") {
											return "录音";
										} else if (value == "2") {
											return "证件照片";
										} else if (value == "10") {
											return "扫描图片";
										} else if (value == "7") {
											return "拍照图片";
										} else if (value == "5") {
											return "视频";
										} else if (value == "6") {
											return "签字视频";
										} else if (value == "13") {
											return "协议文档";
										} else if (value == "88") {
											return "高清录音";
										}else if (value == "99") {
											return "身份核查";
										} else {
											return "其他";
										}
									}
								}, {
									header : '文件来源',
									isExp : false,
									hidden : true,
									dataIndex : 'fileSource'
								}, {
									header : '文件路径',
									hidden : true,
									isExp : false,
									dataIndex : 'filePath'
								}, {
									header : '客户姓名',
									isExp : false,
									dataIndex : 'cusName'
								}, {
									header : '证件号码',
									isExp : false,
									dataIndex : 'credNum'
								}, {
									header : 'agentno',
									isExp : false,
									hidden : true,
									dataIndex : 'createBy'
								}, {
									header : '办理时间',
									isExp : false,
									dataIndex : 'createDate',
									format : 'Y-m-d'
								}],
						listeners : {
							'rowdblclick' : function(grid, rowIndex, e) {
								var hidd = 0; // 判断隐藏播放视频的窗体
								var record = grid.getStore().getAt(rowIndex);
								// 在这里生成对应类型的content
								var type = record.data.fileType;
								var tmpContent = record.data.filePath;
								// tmpContent =
								// "/2013/08/08/T0bh01201308081400/demo.txt";
								var playerAVI = record.data.filePath; // 当前视频

								// 读取js获取${share}
								//alert("路径"+tmpContent);
								var share = "";
								if (tmpContent != "") {
									tmpContent = tmpContent.substring(1,
											tmpContent.length);

									var pdftmp = "";
									try {
										var fso = new ActiveXObject("scripting.filesystemobject");
										var txtstream = fso.openTextFile('c:\\agent.config');
										while (!txtstream.atEndOfLine) {
											var line = txtstream.ReadLine();
											if (line.indexOf('share=') == 0) {
												share = line.substring('share='.length,line.length);
											}
										}
										txtstream.close();
										txtstream = null;
										fso = null;
									} catch (e) {
										alert("读取配置文件c:\\agent.config的share信息失败!");
									}
									pdftmp = tmpContent;
									tmpContent = share + tmpContent;// 可能存在叠加路径分隔符的问题。\\或\/
									//alert(tmpContent);
									// ----------------------------------------------------------------------------
									// 判断查看文件的类型，如果是99：身份核查资料就将对应tmpContent路径的txt文件里面的文字读到变量中；
									if (type == "99") {
										//alert("路径" + tmpContent);
										try {
											dName = "";       pName = ""; // 客户姓名
											cardID = "";   	  result = "";// 核查结果
											wangID = "";  	  cp = ""; // 操作号
											yearMD = ""; 	  time = ""; // 时间
											agentName = "";
											//tmpContent = "C://ddd.txt";
											// tmpContent = "D://demo.txt";
											// //测试；暂时给固定值
											var fso = new ActiveXObject("Scripting.FileSystemObject");
											var f = fso.OpenTextFile(tmpContent, 1);// 只读
											var line;
											while (!f.AtEndOfStream) {
												line = f.ReadLine();
												if (line.indexOf('dName=') == 0) {
													dName = line.substring('dName='.length,line.length);
													if(dName == ""){
														dName = "null";
													}
												}
												if (line.indexOf('pName=') == 0) {
													pName = line.substring('pName='.length,line.length);
													if(pName == ""){
														pName = "null";
													}
												}
												if (line.indexOf('ID=') == 0) {
													cardID = line.substring('ID='.length,line.length);
													if(cardID == ""){
														cardID = "null";
													}
												}
												if (line.indexOf('result=') == 0) {
													result = line.substring('result='.length,line.length);
													if(result == ""){
														result = "null";
													}
												}
												if (line.indexOf('wangID=') == 0) {
													wangID = line.substring('wangID='.length,line.length);
												}
												if (line.indexOf('cp=') == 0) {
													cp = line.substring('cp='.length,line.length);
												}
												if (line.indexOf('yearMD=') == 0) {
													yearMD = line.substring('yearMD='.length,line.length);
												}
												if (line.indexOf('time=') == 0) {
													time = line.substring('time='.length,line.length);
												}
												if (line.indexOf('agentName=') == 0) {
													agentName = line.substring('agentName='.length,line.length);
												}
											}
											f.Close();
										} catch (ex) {
											alert("读取配置文件" + tmpContent + "失败!");
										}
									}
									
									if (type == "1000") {
										//alert("路径" + tmpContent);
										try {
											tmpContent = "C://ddd.txt";
											// //测试；暂时给固定值
											var fso = new ActiveXObject("Scripting.FileSystemObject");
											var f = fso.OpenTextFile(tmpContent, 1);// 只读
											var line;
											while (!f.AtEndOfStream) {
												line = f.ReadLine();
												if (line.indexOf('dName=') == 0) {
													dName = line.substring('dName='.length,line.length);
//													if(dName == ""){
//														dName = "null";
//													}
												}
												if (line.indexOf('pName=') == 0) {
													pName = line.substring('pName='.length,line.length);
													if(pName == ""){
														pName = "null";
													}
												}
												if (line.indexOf('ID=') == 0) {
													cardID = line.substring('ID='.length,line.length);
													if(cardID == ""){
														cardID = "null";
													}
												}
												if (line.indexOf('cardID=') == 0) {
													result = line.substring('cardID='.length,line.length);
													if(result == ""){
														result = "null";
													}
												}
												if (line.indexOf('wangID=') == 0) {
													wangID = line.substring('wangID='.length,line.length);
												}
												if (line.indexOf('cp=') == 0) {
													cp = line.substring('cp='.length,line.length);
												}
												if (line.indexOf('yearMD=') == 0) {
													yearMD = line.substring('yearMD='.length,line.length);
												}
												if (line.indexOf('time=') == 0) {
													time = line.substring('time='.length,line.length);
												}
											}
											f.Close();
										} catch (ex) {
											alert("读取配置文件" + tmpContent + "失败!");
										}
									}
									// ----------------------------------------------------------------------------
								}

								if (type == '7' || type == '2' || type == '10') {// 如果为图片格式则
									// tmpContent = '<img src=' + tmpContent + '
									// />';
									// tmpContent =
									// "D:\\filemapp\\2012\\12\\14\\T001201212141551\\CT001201212141551.bmp";
									if(type == '7'){
										//alert(zhengjianImg);
										tmpContent = '<div align="center"  style="margin: 0 auto; text-align:center"><img  src="'
											+ tmpContent
											+ '" style="margin: 0 auto;"/><img  src="'
											+ share+zhengjianImg
											+ '" style="margin: 0 auto;"/></div>';
									}else{
										tmpContent = '<div align="center"  style="margin: 0 auto; text-align:center"><img  src="'
											+ tmpContent
											+ '" style="margin: 0 auto;"/></div>';
									}
									
								} else if (type == '1' || type == '10' || type == '88') {// 如果为音频格式则
									if (tmpContent != '' || tmpContent != null) {
										/**
										 * tmpContent = '<object
										 * classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
										 * codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"
										 * width="165" height="37"
										 * id="niftyPlayer1" align="">' + '<param
										 * name=movie
										 * value="js/sound/niftyplayer.swf?file=' +
										 * tmpContent + '&as=0">' + '<param
										 * name=quality value=high>' + '<param
										 * name=bgcolor value=#FFFFFF>' + '<embed
										 * src="js/sound/niftyplayer.swf?file=' +
										 * tmpContent + '&as=0" quality=high
										 * bgcolor=#FFFFFF width="165"
										 * height="37" name="niftyPlayer1"
										 * align=""
										 * type="application/x-shockwave-flash"
										 * swLiveConnect="true"
										 * pluginspage="http://www.macromedia.com/go/getflashplayer">' + '</embed>' + '</object>';
										 */
										tmpContent = '<EMBED src="'
												+ tmpContent
												+ '" width="200" height="25" border= 0 autostart= true loop= true ></EMBED>';
									} else {
										tmpContent = "内容为空！";
									}
									// Ext.getCmp('conHis.content').setSize('92%',200);
									// ----------------------------------------------------------------------------
								} else if (type == "99") {

									tmpContent = '<div align="center" style="margin: 100 auto"><table width="690" height="218" border="1" style="font-size:18px"><tr><td align="right" width="298">业务名称：</td><td width="366" align="left">'
											+ dName
											+ '</td> </tr><tr><td align="right">核对人姓名：</td> <td align="left">'
											+ pName
											+ '</td></tr><tr><td align="right">身份证号：</td><td align="left">'
											+ cardID
											+ '</td></tr><tr><td align="right">核对结果：</td><td align="left">'
											+ result
											+ '</td></tr><tr align="center"><td colspan="2">网点号：'
											+ wangID
											+ '&nbsp;&nbsp;&nbsp;&nbsp;座席员号：'
											+ agentName
											+ '&nbsp;&nbsp;&nbsp;&nbsp;操作员：'
											+ cp
											+ '&nbsp;&nbsp;&nbsp;&nbsp;日期：'
											+ yearMD
											+ '&nbsp;&nbsp;&nbsp;&nbsp;时间：'
											+ time + '</td></tr></table></div>'; 

									// ----------------------------------------------------------------------------
								} else if (type == "1000") {

									tmpContent = '<div align="center" style="margin: 100 auto"><table width="700" height="230" border="1">'
											+ '<tr><td colspan="4" align="center">北京银行-挂失业务-特殊操作记录单</td></tr>'
											+ '<tr><td width="133">业务类型</td><td width="417">'+dName+'</td><td width="133">存款人</td><td width="319">'+dName+'</td></tr>'
											+ '<tr><td>卡号</td><td>'+dName+'</td><td>账号</td><td>'+dName+'</td></tr>'
											+ '<tr><td>日期</td><td>'+dName+'</td><td>金额</td><td>'+dName+'</td></tr>'
											+ '<tr><td>存款人证件</td><td>'+dName+'</td><td>证件号码</td><td>'+dName+'</td></tr>'
											+ '<tr><td>授权人</td><td>'+dName+'</td><td>操作员</td><td>'+dName+'</td></tr>'
											+ '<tr><td>网点号</td><td>'+dName+'</td><td>批号</td><td>'+dName+'</td></tr>'
											+ '<tr><td>备注</td><td colspan="3">'+dName+'</td></tr>'
											+ '</table></div>';

									// ----------------------------------------------------------------------------
								}else if (type == '5') {// 
									var onlywav = "";
									var allVideo = "";
									try {
										onlywav = Ext.getCmp('tmpfilepath').getValue().split("<>")[0];
										onlywav = onlywav.split(",")[1];
										allVideo = Ext.getCmp('tmpfilepath').getValue().split("<>")[1];
										var video = allVideo.split(",")[1];
										if (video == playerAVI) {
											video = allVideo.split(",")[2];
										}
										// 曲晓视频和音频同步控件。
										alert("录音文件" + onlywav + "\n当前视频路径:"
												+ playerAVI + "\n另一视频路径："
												+ video + "\n待添加曲晓的接口。");
										// videoPlayer.AddVideoFile(playerAVI,0);
										// videoPlayer.AttachAudioFile(onlywav);
										var all = video + "$=" + playerAVI;
										window.open("Player.html?onlywav=" + onlywav + "&allVideo=" + all);
										hidd = 1;
										/**
										 * tmpContent = '<object
										 * type="video/x-ms-wmv" width="760"
										 * height="460" align="left"> '+ '<param
										 * name="autostart" value="true" /> '+ '<param
										 * name="controller" value="true" /> '+ '<param
										 * name="FileName" value=" ' +
										 * tmpContent + '"> '+ '<param
										 * name="ShowStatusBar" value="-1"> '+ '<param
										 * name="ShowTracker" value="-1"> '+ '</object> ' + '<div>' + '<EMBED
										 * src="' + share + onlywav + '"
										 * width="200" height="25" border= 0
										 * autostart= true loop= 1 ></EMBED>' + '</div>' ;
										 */
									} catch (e) {
										alert("录音文件不存在！");
										tmpContent = '<object type="video/x-ms-wmv" width="760" height="460" align="left">  '
												+ '<param name="autostart" value="true" />  '
												+ '<param name="controller" value="true" /> '
												+ '<param name="FileName" value=" '
												+ tmpContent
												+ '"> '
												+ '<param name="ShowStatusBar" value="-1">  '
												+ '<param name="ShowTracker" value="-1">  '
												+ '</object> ';
									}
									// alert(tmpContent);
									// '<object
									// classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"
									// ' +
									// 'width="500" height="400"><param
									// name="autostart" value="0" />' +
									// '<param name="url" value=" ' + tmpContent
									// + '" />' +
									// '<embed src=" ' + tmpContent + '"
									// autostart="0" ' +
									// 'type="video/x-ms-wmv" width="500"
									// height="400"></embed></object>';
								} else if (type == '6') {
									tmpContent = '<iframe style="background:white;" width="100%" height="100%" id="iexpro"  name="iexpro" src="'
											+ tmpContent
											+ '"   frameborder="0"> </iframe>';
								} else if (type == '3') {// E-mail --> .eml
									// Ext.getCmp('conHis.content')
									// .setValue("");
									// alert(encodeURI(encodeURI(tmpContent)));
									// Ext.Ajax.request( {
									// url : __ctxPath +
									// '/customer/getEmlContentConHis.do?content='
									// +
									// tmpContent,
									// method : 'get',
									// async : true,
									// success : function(response, opts) {
									// var content =
									// Ext.util.JSON.decode(response.responseText).content;
									// var lines =
									// Ext.util.JSON.decode(response.responseText).lines;
									// var str = '';
									// if(lines != 0){
									// for(var i=0;i<lines;i++){
									// str += content[i].line + '';
									// }
									// Ext.getCmp('conHis.content').setValue(str);
									// }
									// },
									// failure : function(response, opts) {
									// }
									//										
									// });
									tmpContent = "不支持email";
								} else if (type == '8' || type == '4'
										|| type == '9' || type == '12'
										|| type == '11') {// qq --> .txt
									// Ext.getCmp('conHis.content').setValue("");
									// alert(encodeURI(encodeURI(tmpContent)));
									// Ext.Ajax.request( {
									// url : __ctxPath +
									// '/customer/getContentConHis.do?content='
									// +
									// tmpContent,
									// method : 'get',
									// async : true,
									// success : function(response, opts) {
									// var content =
									// Ext.util.JSON.decode(response.responseText).content;
									//												
									// var lines =
									// Ext.util.JSON.decode(response.responseText).lines;
									// var str = '';
									// if(lines != 0){
									// for(var i=0;i<lines;i++){
									// str += content[i].line + '<br>';
									// }
									// Ext.getCmp('conHis.content').setValue(str);
									// }
									// },
									// failure : function(response, opts) {
									// }
									// });
									tmpContent = "不支持qq";
								} else if (type == "13") {// 扩展北京银行业务。pdf
//									pdftmp = "C:\\PT001201306081006.pdf";
									//alert(pdftmp);
									//pdftmp=share+pdftmp;
									//2014/03/06/T002201402271107/ET00202271107.pdf
									try{
										pdftmp = pdftmp.split('/')[0]+"\\"+pdftmp.split('/')[1]+"\\"+pdftmp.split('/')[2]+"\\"+pdftmp.split('/')[3]+"\\"+pdftmp.split('/')[4];
										//alert(share+pdftmp);
										window.open(share+pdftmp);
									}catch (ex) {
										alert(share+pdftmp+"\n没有找到此PDF文件");	
									}
									
//									tmpContent = '<p style="margin-top:-45px;margin-bottom:0px;margin-left:-40px;">  <object   classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" ' +
//												' width="100%"   height="100%"   border="0"> <param   name="SRC"   value="' + share+pdftmp + '">  </object><p>';
//									tmpContent = '<p style="margin-top:-45px;margin-bottom:0px;margin-left:-40px;">  <object   classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" '
//											+ ' width="100%"   height="100%"   border="0"> <param   name="SRC"   value="'
//											+ pdftmp + '">  </object><p>';
									// tmpContent = '<embed src = "' + pdftmp +
									// '"></embed>';
								} else {
									tmpContent = "没有此类型的附件";
								}
								// alert("tmpcontent:" + tmpContent);

								ConHisMaxWindow_bob = Ext.extend(Ext.Window, {
									// 构造函数
									constructor : function(_cfg) {
										// Ext.applyIf(this, _cfg);

										ConHisMaxWindow.superclass.constructor
												.call(this, {
													id : 'ConHisMaxWindow',
													layout : 'fit',
													html : _cfg.bob,
													modal : true,
													autoScroll : true,
													width : 800,
													height : 500,
													maximizable : true,
													title : '详情',
													closeAction : 'close',
													// plain:true,
													// layout:'form',
													buttonAlign : 'center',
													buttons : [{
														text : '返回',
														iconCls : 'btn-back',
														scope : this,
														handler : function() {
															// Ext.getCmp('bob_wmv').setDisabled(true);
															if (ConHisMaxWindow22) {
																// Ext.getCmp('ConHisMaxWindow').destroy();
																ConHisMaxWindow22
																		.close();
															}
															// Ext.getCmp('ConHisMaxWindow').close();
															// Ext.getCmp('ConHisMaxWindow').destory();
														}
													}]
												})

										;

									}// end of the constructor

								});// ConHisMaxWindow_bob~
								var ConHisMaxWindow22;
								// alert(tmpContent);
								// alert(Ext.getCmp('ConHisMaxWindow'));
								// document.getElementById('ssss').setAttribute('width',1200);
								// tmpContent = '<p
								// style="margin-top:-45px;margin-bottom:0px;margin-left:-40px;">
								// <object
								// classid="clsid:CA8A9780-280D-11CF-A24D-444553540000"
								// ' +
								// ' height="100%" width="100%" border="0">
								// <param name="SRC"
								// value="././attachFiles/PT002201305211007.pdf">
								// </object><p>';

								if (hidd == 0) { // 如果不是播放视频那么就显示‘详情窗体’
									if (!ConHisMaxWindow22) {
										ConHisMaxWindow22 = new ConHisMaxWindow_bob(
												{
													html : record.data.filePath,
													bob : tmpContent
												});
										ConHisMaxWindow22.show();
									} else {
										ConHisMaxWindow22.close();
										ConHisMaxWindow22 = new ConHisMaxWindow_bob(
												{
													html : record.data.filePath,
													bob : tmpContent
												});
										ConHisMaxWindow22.show();
									}
								}
								// window.location.href = "././start.jsp?bob=" +
								// tmpContent;
								// window.open("././start.jsp?bob=" +
								// tmpContent);
								// window.showModalDialog("././start.jsp?bob=" +
								// tmpContent)
							}
						}
					}, {
						xtype : 'hidden',
						name : 'conHis.conResId',
						id : 'conHis.conResId_hid'
					}, {
						xtype : 'fieldset',
						title : "处理信息",
						collapsed : false,
						collapsible : true,
						autoHeight : true,
						hidden : true,
						anchor : '94.7%',
						defaults : {
							anchor : '93.7%',
							readOnly : true
						},
						items : [{
							layout : 'column',
							border : false,
							items : [{
								columnWidth : .5,
								border : false,
								layout : 'form',
								items : [{
									fieldLabel : "联络类型",
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONLLJG',// 对应相对的联络结果
									anchor : '100%',
									store : getDicStore('联络结果',
											'conHisForm.conResId_form'),
									listeners : getDicListeners(
											'conHisForm.conResId_form',
											'conHis.conResId')
								}]
							}, {
								columnWidth : .5,
								border : false,
								layout : 'form',
								items : [{
									fieldLabel : "联络事项",
									xtype : 'mtdiccombo',
									name : 'conHis.busTypId',
									id : 'conHis.busTypId_form',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONLLJG',// 对应相对的联络结果
									anchor : '100%',
									store : getDicStore('联络结果',
											'conHisForm.conResId_form'),
									listeners : getDicListeners(
											'conHisForm.conResId_form',
											'conHis.conResId')
								}]
							}]
						}, {
							layout : 'column',
							border : false,
							items : [{
								columnWidth : .5,
								border : false,
								hidden : true,
								layout : 'form',
								items : [{
									fieldLabel : "联络结果",
									id : 'conHisForm.conResId_form',
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONLLJG',// 对应相对的联络结果
									anchor : '30.2%',
									store : getDicStore('联络结果',
											'conHisForm.conResId_form'),
									listeners : getDicListeners(
											'conHisForm.conResId_form',
											'conHis.conResId')
								}]
							}, {
								columnWidth : .5,
								border : false,
								layout : 'form',
								items : [{
									fieldLabel : "处理状态",
									id : 'conHis.dealStaId_form',
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONCLZT',// 对应相对的处理状态
									anchor : '100%',
									store : getDicStore('处理状态',
											'conHis.dealStaId_form'),
									listeners : getDicListeners(
											'conHis.dealStaId_form',
											'conHis.dealStaId')
								}]
							}]
						}, {
							xtype : 'hidden',
							name : 'conHis.dealStaId',
							id : 'conHis.dealStaId_hid'
						}, {
							xtype : 'textarea',
							fieldLabel : "处理说明",
							name : 'conHis.conResRemarks',
							anchor : '93.7%',
							height : 40
						}, {
							layout : 'column',
							border : false,
							items : [{
										columnWidth : .5,
										border : false,
										layout : 'form',
										items : [{
													xtype : 'textfield',
													fieldLabel : "受理人",
													id : 'conHis.owner_form',
													name : 'conHis.owner.fullname',
													anchor : '100%',
													allowBlank : true
												}]
									}, {
										columnWidth : .5,
										border : false,
										layout : 'form',
										items : [{
													xtype : 'datefield',
													fieldLabel : "受理时间",
													name : 'conHis.owner',
													anchor : '100%',
													allowBlank : true
												}]
									}]
						}]
					}

			]
		});
		// 加载表单对应的数据
		if (this.conHisId != null && this.conHisId != 'undefined') {
			// alert("sdf");
			this.formPanel.loadData({
				url : __ctxPath + '/customer/getConHis.do?conHisId='
						+ this.conHisId + '&bobShare=' + this.bobShare,
				root : 'data',
				preName : 'conHis',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					var cona_wav = Ext.util.JSON.decode(response.responseText).wav;// 此conhis的唯一录音文件。
					var allVideo = Ext.util.JSON.decode(response.responseText).allVideo;//
					// alert("录音和视频:\n"+cona_wav+"\n<----->\n"+allVideo);
					Ext.getCmp('tmpfilepath').setValue(cona_wav + "<>"
							+ allVideo);
					// alert("cona_wav is :" + cona_wav);
					// Ext.getCmp('conHis.content').resumeEvents();
					// Ext.getCmp('conHis.content').on({
					// 'click' : {
					// fn : function() {
					// //alert("dsf");
					// Ext.getCmp('conHis.content')
					// .setSize('92%', 500);
					// },
					// scope : this
					// }
					// });
					// 开始加载联络文件
					var grid = Ext.getCmp('show-con_his-grid');
					var store = grid.getStore();
					var Plant = grid.getStore().recordType;
					var conAttachs = thisObj.conAttachs; // 获得传递的相关知识
					//alert("总"+conAttachs[0].filePath+conAttachs[1].filePath+conAttachs[2].filePath+conAttachs[3].filePath);
					if (conAttachs != undefined) {
						for (var i = 0; i < conAttachs.length; i++) {
							var conAttachId = '';
							var fileType = '';
							var fileSource = '';
							var filePath = '';
							var createBy = '';
							var createDate = '';
							var cusName = '';
							var credNum = '';
							var terminalId = '';
							var p = new Plant();
							var typeNew = conAttachs[i].filePath.split(".");
							if (typeNew[1] == "avi") {
								var typeNew1 = typeNew[0].split("_");
								if (typeNew1[6] == "0") {
									fileType = 6;
								} else {
									fileType = conAttachs[i].fileType;
								}
							} else if (typeNew[1] == "bmp") {
								var t = typeNew[0].split("T");
								if (t.length >= 4) {
									fileType = conAttachs[i].fileType;
								} else {
									fileType = 7;
								}
							} else if (typeNew[1] == "jpg") {
								fileType = 10;
							} else {
								fileType = conAttachs[i].fileType;
							}
							conAttachId = conAttachs[i].conAttachId
							fileSource = conAttachs[i].fileSource;
							filePath = conAttachs[i].filePath;
							if (fileType == "13") {
								if (filePath.indexOf("defined") > 0) {
									filePath = filePath.split("defined")[1];
								}
							}
							//----------------
							if(fileType == "2"){
								//alert(conAttachs[i].filePath);
								zhengjianImg=conAttachs[i].filePath;
							}
							//alert(filePath);
							createBy = conAttachs[i].createBy;
							createDate = conAttachs[i].createDate;
							cusName = conAttachs[i].cusName;
							credNum = conAttachs[i].credNum;
							//terminalId = conAttachs[i].terminalId;
							terminalId = thisObj.mainContactNum;
							p.set('conAttachId', conAttachId);
							p.set('fileType', fileType);
							p.set('fileSource', fileSource);
							p.set('filePath', filePath);
							p.set('createBy', createBy);
							p.set('createDate', createDate);
							p.set('cusName', cusName);
							p.set('credNum', credNum);
							p.set('terminalId', terminalId);
							p.commit();
							store.insert(store.getCount(), p);
						}
					}
					// var swit = thisObj.conResRemarks.toString();
					var swit = thisObj.contactTypeId.toString();
					var tmpContent = "";
					if (thisObj.content != null) {
						tmpContent = thisObj.content.toString();
					}
					// alert(tmpContent);
					// alert(swit);
					// [['12','WebChat'],['11','网络门户'],['10',''手机终端],['9','MSN'],['8','QQ'],['7','邮件'],
					// ['6','微博'],['5','视频'],['4','短信'],['3','E-MAIL'],['2','传真'],['1','电话']]
					if (swit == null) {
						Ext.getCmp('conHis.content').setValue("没有此类型的附件");
					} else {
						if (swit == '7' || swit == '2') {// 如果为图片格式则
							Ext.getCmp('conHis.content').setSize('92%', 500);
							Ext.getCmp('conHis.content').setValue('<img src='
									+ tmpContent + ' />');
						} else if (swit == '1' || swit == '10') {// 如果为音频格式则
							if (tmpContent != '' || tmpContent != null) {
								var ten = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="165" height="37" id="niftyPlayer1" align="">'
										+ '<param name=movie value="js/sound/niftyplayer.swf?file='
										+ tmpContent
										+ '&as=0">'
										+ '<param name=quality value=high>'
										+ '<param name=bgcolor value=#FFFFFF>'
										+ '<embed src="js/sound/niftyplayer.swf?file='
										+ tmpContent
										+ '&as=0" quality=high bgcolor=#FFFFFF width="165" height="37" name="niftyPlayer1" align="" type="application/x-shockwave-flash" swLiveConnect="true" pluginspage="http://www.macromedia.com/go/getflashplayer">'
										+ '</embed>' + '</object>';
								Ext.getCmp('conHis.content').setValue(ten);
							} else {
								Ext.getCmp('conHis.content').setValue("内容为空！");
							}
							// Ext.getCmp('conHis.content').setSize('92%', 200);
						} else if (swit == '5') {// 
							// var ttte = '<object id="video" width="400"
							// height="200" border="0"
							// classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA">'
							// + '<param name="ShowDisplay" value="0">'
							// + '<param name="ShowControls" value="1">'
							// + '<param name="AutoStart" value="1">'
							// + '<param name="AutoRewind" value="0">'
							// + '<param name="PlayCount" value="0">'
							// + '<param name="Appearance value="0 value=""">'
							// + '<param name="BorderStyle value="0 value=""">'
							// + '<param name="MovieWindowHeight" value="240">'
							// + '<param name="MovieWindowWidth" value="320">'
							// + '<param name="FileName" value="/Mbar.avi">'
							// + '<embed width="400" height="200" border="0"
							// showdisplay="0" showcontrols="1" autostart="1"
							// autorewind="0" playcount="0"
							// moviewindowheight="240"
							// moviewindowwidth="320" filename="'+tmpContent+'"
							// src="'+tmpContent+'">'
							// + '</embed>' + '</object>';

							var ttte = '<object type="video/x-ms-wmv" width="600" height="380" align="center">  '
									+ '<param name="autostart" value="true" />  '
									+ '<param name="controller" value="true" /> '
									+ '<param name="FileName" value="D:/ulaneWork/test.avi"> '
									+ '<param name="ShowStatusBar" value="-1">  '
									+ '<param name="ShowTracker" value="-1">  '
									+ '</object> ';
							Ext.getCmp('conHis.content').setValue(ttte);
							Ext.getCmp('conHis.content').setSize('92%', 200);
						} else if (swit == '6') {
							Ext
									.getCmp('conHis.content')
									.setValue('<iframe style="background:white;" width="100%" height="100%" id="iexpro"  name="iexpro" src="'
											+ tmpContent
											+ '"   frameborder="0"> </iframe>');
							Ext.getCmp('conHis.content').setSize('92%', 500);
						} else if (swit == '3') {// E-mail --> .eml
							// Ext.getCmp('conHis.content')
							// .setValue("");
							// alert(encodeURI(encodeURI(tmpContent)));
							Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/getEmlContentConHis.do?content='
										+ tmpContent,
								method : 'get',
								async : true,
								success : function(response, opts) {
									var content = Ext.util.JSON
											.decode(response.responseText).content;
									var lines = Ext.util.JSON
											.decode(response.responseText).lines;
									var str = '';
									if (lines != 0) {
										for (var i = 0; i < lines; i++) {
											str += content[i].line + '';
										}
										Ext.getCmp('conHis.content')
												.setValue(str);
									}
								},
								failure : function(response, opts) {
								}

							});
						} else if (swit == '8' || swit == '4' || swit == '9'
								|| swit == '12' || swit == '11') {// qq -->
							// .txt
							// Ext.getCmp('conHis.content').setValue("");
							// alert(encodeURI(encodeURI(tmpContent)));
							Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/getContentConHis.do?content='
										+ tmpContent,
								method : 'get',
								async : true,
								success : function(response, opts) {
									var content = Ext.util.JSON
											.decode(response.responseText).content;

									var lines = Ext.util.JSON
											.decode(response.responseText).lines;
									var str = '';
									if (lines != 0) {
										for (var i = 0; i < lines; i++) {
											str += content[i].line + '<br>';
										}
										Ext.getCmp('conHis.content')
												.setValue(str);
									}
								},
								failure : function(response, opts) {
								}
							});
						} else if (swit == '10') {// 手机终端
							// alert(tmpContent);
							Ext.getCmp('conHis.content').setValue(tmpContent);
						}

					}

					Ext.getCmp('conHis.contactTypeId_form')
							.setValue(thisObj.contactTypeId);
					Ext.getCmp('conHis.dirId_form').setValue(thisObj.dirId);
					// Ext.getCmp('conHis.srcTypeId_form')
					// .setValue(thisObj.srcTypeId);
					Ext.getCmp('conHis.busTypId_form').setValue(CONTPCLJG
							.get(thisObj.busTypId));
					Ext.getCmp('conHisForm.conResId_form')
							.setValue(thisObj.conResId);
					Ext.getCmp('conHis.dealStaId_form')
							.setValue(CON_REQ_SUBSTATUS.get(thisObj.dealStaId));
					if (thisObj.cusLinkman != null)
						Ext.getCmp('conHis.cusLinkman_form')
								.setValue(thisObj.cusLinkman.fullname);
					if (thisObj.owner != null)
						Ext.getCmp('conHis.owner_form')
								.setValue(thisObj.owner.fullname);

				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
			});
		} else {
			Ext.getCmp('statusId').setValue(1);
			Ext.getCmp('ownerId').setValue(1);
			Ext.getCmp('cusId').setValue(1);
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
		var tabs = Ext.getCmp('centerTabPanel');// 获得tab
		tabs.remove('ConHisFormWin');// 移除创建的窗口
		// ConHisForm.close();
	},
	// 双击查看附件
	rowClick : function(grid, rowindex, e) {

		// alert(record.data.filePath);
		var record = grid.getSelectionModel().each(function(record) {
					new ConHisMaxWindow({
								html : record.data.filePath
							}).show();
				});
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveConHis.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ConHisGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						// this.close();
					}
				});
	}// end of save

});

function getDicStore(name, id) {
	return new Ext.data.SimpleStore({
				url : __ctxPath + '/system/loadItemDictionary.do',
				baseParams : {
					itemName : name
				},
				fields : ['itemId', 'itemName'],
				autoLoad : true,
				method : "post",
				listeners : {
					load : function() {
						var combo = Ext.getCmp(id);
						var store = combo.getStore();
						var rows = [];// 定义数组
						for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
							if (store.getAt(i).data['itemId'] == combo
									.getValue()) {
								combo.setValue(store.getAt(i).data['itemName']);
								break;
							}
						}
					}
				}
			});
};

function getDicListeners(comId, hidName) {
	return {
		select : function(cbo, record, index) {
			var fm = Ext.getCmp(comId);
			Ext.getCmp(hidName + '_hid').setValue(cbo.value);
		}
	};
};