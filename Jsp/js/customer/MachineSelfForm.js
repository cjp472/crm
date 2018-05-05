/**
 * @author:cf0666@gmail.com
 * @class AgentReport
 * @extends Ext.Panel
 * @description [AgentReport]管理
 * @company 
 * @createtime:
 */
var store ;

MachineSelfForm = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
		
				//Ext.getCmp('new_dealnum1').setValue("胡杨胡杨");
				
				Ext.applyIf(this, _cfg);
				// 初始化组件
				//alert(machineSelfId);
				this.initUIComponents();
				// 调用父类构造
				MachineSelfForm.superclass.constructor.call(this, {
							id : 'MachineSelfForm',
							title : '详细信息',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel],
							listeners : {
								'beforeclose' :  function(p){

								}
							}
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				
				//加载后台所有报表数据
					var store =new Ext.data.SimpleStore({
					
       				 autoLoad : true,
       				 
       				 url : __ctxPath + "/customer/getMachineSelfAttachConHis.do?machSelfId=" + machineSelfId,
       				 
					 fields:["machineSelfid","filetype","filepath",
							 "createtime"
						 	]
					});
				

				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							region:'north',
							height : 35,
							frame : false,
							border:false,
							id : 'MachineSelfFormSearchPanel',
							layout : 'hbox',
							layoutConfig: {
				                    padding:'5',
				                    align:'middle'
				            },
							defaults : {
								xtype : 'label',
								border:false,
								margins:{top:0, right:4, bottom:4, left:4}
							},
							items : [{
								layout : 'column',
								border : false,
								items : [{
									columnWidth : .333,
									layout : 'form',
									border : false,
									defaults : {
										readOnly : true
									},
									items : [{
												xtype : 'textfield',
												fieldLabel : '联络方式',
												id : 'Id_form',
												xtype : 'mtdiccombo',
												editable : false,
												lazyInit : false,
												forceSelection : false,
												value:'ssss'
											}
											, {
												xtype : 'textfield',
												fieldLabel : "号码",
												editable : false,
												name : 'ontactNum',
												id : 'ontactNum',
												anchor : '95%',
												value:'ssss'
											}]
								}, {
									columnWidth : .33,
									layout : 'form',
									border : false,
									defaults : {
										readOnly : true
									},
									items : [{
												fieldLabel : '方向',
												id : 'd_form',
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
											}, {
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
							}]
						});// end of searchPanel

				
				this.gridPanel = new HT.GridPanel({
					
					region : 'center',
					
					height:750,
					
					tbar : this.topbar,
					
					store : store,
					
					width:1000, 
					
					columns:[
							{
								header:"mach_Self_Id",
								hidden:true,
								dataIndex:"machineSelfid"
							}, {
								header:"文件类型",
								dataIndex:"filetype",
								renderer : function(value) {
										if (value == "1") {
											return "客户信息";
										} else if (value == "2") {
											return "证件照片";
										} else if (value == "3") {
											return "扫描图片";
										} else if (value == "4") {
											return "PDF文档";
										}
									}
//							}, {
//								header:"时间",
//								dataIndex:"createtime"
							}, {
								header:"路径",
								dataIndex:"filepath",
								hidden:true,
							},{

								header : '客户姓名',	
							
								isExp : false,

							    dataIndex : 'dealnum',
								
								renderer : function(value) {
								//alert(value);
							   //return WDNAME001.get(value);
									var result;
									Ext.Ajax.request({
										url : __ctxPath + '/customer/selectQJTransferAccountConHis.do',
										method : 'post',
										async: false,
										params : {
										machineSelfid : busDealNum
										},
										method : 'post',
										success : function(response) {
					                        result = Ext.util.JSON.decode(response.responseText);
					                    }
									})
								    //alert(result);
									return result.data.customerName;
								
									
								}

							},{
								header:"身份证号",
								 dataIndex : 'dealnum',
									
									renderer : function(value) {
									//alert(value);
								   //return WDNAME001.get(value);
										var result;
										Ext.Ajax.request({
											url : __ctxPath + '/customer/selectQJTransferAccountConHis.do',
											method : 'post',
											async: false,
											params : {
											machineSelfid : busDealNum
											},
											method : 'post',
											success : function(response) {
						                        result = Ext.util.JSON.decode(response.responseText);
						                    }
										})
									    //alert(result);
										return result.data.idCardNumber;
									
										
									}
							},{
								header:"转出/入卡号",
								 dataIndex : 'dealnum',
								 renderer : function(value) {
									//alert(value);
								   //return WDNAME001.get(value);
										var result;
										Ext.Ajax.request({
											url : __ctxPath + '/customer/selectQJTransferAccountConHis.do',
											method : 'post',
											async: false,
											params : {
											machineSelfid : busDealNum
											},
											method : 'post',
											success : function(response) {
						                        result = Ext.util.JSON.decode(response.responseText);
						                    }
										})
									    //alert(result);
										
										return result.data.cardNumber;
										
									}
							}
							
					],
					listeners:{   
					       rowdblclick : function(grid,row){   
					           grid.getSelectionModel().each(function(rec){ 
					        	   var share = "";
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
					        	   //alert(share+rec.get('filepath'));
					        	   
					        	   if(rec.get('filetype') == "2"){
					        		   showPic("证件照片",share+rec.get('filepath'),500,500," ");
					        	   }else if(rec.get('filetype') == "3"){
					        		   showPic("扫描图片",share+rec.get('filepath'),800,500,"style=width:500");
					        	   }else if(rec.get('filetype') == "4"){
					        		   //alert("PDF文档  path:"+rec.get('filepath'));
					        		   
					        		   //window.open(rec.get('filepath'));
					        		   var str = "\\\\10.160.4.55\\FileStorage\\2015\\03\\03\\T001201503031548\\PT001201503031548.pdf";
					        		   //alert(str);
					        		   window.open(share+rec.get('filepath'));
					        		   //showPic("PDF图片",rec.get('filepath'),800,500,"style=width:500");
					        		   
					        		   
//					        		   pdfPath = '<p style="margin-top:-45px;margin-bottom:0px;margin-left:-40px;">  ' +
//					        		   			 '<object   classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" width="100%"   height="100%"   border="0"> ' +
//					        		   			 '<param   name="SRC"   value="' + rec.get("filepath") + '" />  </object></p>';
//					        		   showPDF(pdfPath);
					        	   }else{
					        		  	alert("此功能暂未开放，敬请期待."); 
					        	   }
								});
					       }  
					   },
					autoExpandColumn:2
					
						// end of columns
				});

			},// end of the initComponents()
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			search : function() {
				
				$search({
							//searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.useid);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					case 'btn-setting' :
						this.enableRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});

/**
 *  查看拍照照片
 * @param {Object} pInfo  
 * @memberOf {TypeName} 
 * 2015/01/23
 * Mr.Hu
 */
function showPic(title_X,picpath,heights,widths,style) {
	//alert(heights+","+widths+","+style);
	var picwin = new Ext.Window({
				id : "win",
				title : "图片详情",
				width : widths,
				height : heights,
				resizable:false,       //不可调整大小
				draggable:false,      //不可拖拽
				maximizable : true,
				html : '<div style="text-align:center;"><img '+style+' src="' + picpath + '"/></div>',
				buttons : [{
							text : '关闭',
							handler : function() {
								picwin.close();
							}
						}]
			});
	picwin.show();
}

/**
 *  查看拍照照片
 * @param {Object} pInfo  
 * @memberOf {TypeName} 
 * 2015/3/18
 * Mr.Hu
 */
function showPDF(obj) {
	alert(obj);
	var PDFwin = new Ext.Window({
				//id : "win",
				title : "PDF详情",
				width : 800,
				height : 500,
				resizable:false,       //不可调整大小
				draggable:false,      //不可拖拽
				maximizable : true,
				//html : '<div style="text-align:center;"><img '+style+' src="' + picpath + '"/></div>',
				html : obj,
				buttons : [{
							text : '关闭',
							handler : function() {
								PDFwin.close();
							}
						}]
			});
	PDFwin.show();
}


