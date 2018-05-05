
var str = '';
var productids = '';
var ctscr = '';
var paprelease = '';
var usergroupids = '';
var bocomstatus='';
var thisobj=false;
var zxfsOfProjectData = [];
ObComTaskDelForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents(_cfg);
		ObComTaskDelForm.superclass.constructor.call(this, {
					id : 'ObComTaskDelFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '营销活动详细信息'
				});
	},// end of the constructor
	// 初始化组件

	initUIComponents : function(_cfg) {
		var value = [];
		Ext.Ajax.request( {
			url : __ctxPath+ '/system/loadKeyDictionary.do?itemKey=LXFS001',
			method : 'post',
			success : function(response, opts) {
 					zxfsOfProjectData = Ext.util.JSON.decode(response.responseText);
 					var flag = true;
 					for(var i=0;i<zxfsOfProjectData.length;i++){
 						if(zxfsOfProjectData[i][0] == _cfg.execTypId){
 							value.push(zxfsOfProjectData[i]);
 							flag = false;
 						}
 					}
 					if(flag) value.push(_cfg.execTypId,_cfg.execTypId)
 					Ext.getCmp('obCom.execTypId_form11').getStore().loadData(value);
 					Ext.getCmp('obCom.execTypId_form11').setValue(_cfg.execTypId);
 					
			},
			failure : function(response, opts) {
			}
		
		});
		
		var groupsSelectPanel = this.initGroupSelectPanel(this.comId);
		        var projid=null;
				var obCom_execTypId = new Ext.form.ComboBox({
					fieldLabel : '执行方式',
					name : 'obCom.execTypId_form',
					id:'obCom.execTypId_form11',
					triggerAction : 'all',
					readOnly:true,
					editable : false,
					mode:'local',
					allowBlank : false,
					lazyInit : false,
					store :new Ext.data.ArrayStore({
 								fields : ['key', 'name'],
 								data:[]
 							}),
					displayField : 'name',
					valueField : 'key',
					hiddenName : 'obCom.execTypId',
					anchor : '100%',
					itemKey : 'CONOB_COM_ZXQDFS',
					value : CONOB_COM_ZXQDFS.get(this.execTypId)
				});
		var obCom_obComStaId = new MT.DicComboBox({
			fieldLabel : '状态',
			id : 'hdzhuangtai',
			readOnly : true,
			hiddenName : 'obCom.obComStaId',
			mode : 'local',
			anchor : '100%',
			editable : false,
			lazyInit : false,
			forceSelection : false,
			itemKey : 'CONOB_COM_HDZT',
			value : CONOB_COM_HDZT.get(this.obComStaId)
		});
		
		var status_form = new Ext.form.ComboBox({
					xtype : 'combo',
					mode : 'local',
					id : 'comStaId_form',
					fieldLabel : '状态',
					editable : false,
					allowBlank : false,
					readOnly : true,
					triggerAction : 'all',
					anchor : '100%',
					name:'comStaId_form',
					valueField:'obComStaId',//设置隐藏的value值字段
					displayField:'obComStaName',//设置显示的value值字段
					store:new Ext.data.SimpleStore({//new一个SimpleStore
						fields:['obComStaId','obComStaName'],	//设定键/值
						data:[]					//默认的data必须提供
					})
					,listeners : {
						'select' : function(combo,record,index) {
                         bocomstatus=Ext.getCmp("comStaId_form").getValue();
						}
					}
		});

		var gridPanel_contact1 = new HT.GridPanel({
					region : 'center',
					height : 150,
					showSm : false,
					scrollHeight : true,
					url : __ctxPath + '/outb/callBDNamlistObCalllist.do?comId='
							+ _cfg.comId,
					fields : [{
								name : ' calllistId',
								type : 'Long'
							}, 'calllistNam', 'cusTypId', 'ownerTeam',
							'calllistId', 'calllistTypId', 'calllistResouce',
							'ownerTeamName','calllistStaId'],
					columns : [{
								header : '名称',
								isExp : false,
								dataIndex : 'calllistNam'
							}, {
								header : '来源',
								isExp : false,

								dataIndex : 'calllistResouce',
								renderer : function(value) {
									return CONOB_MDLY.get(value);
								}
							}, {
								header : '名单类型',
								isExp : false,

								dataIndex : 'calllistTypId',
								renderer : function(value) {
									return CONOB_CALLLIST_MDLX.get(value);
								}
							}, {
								header : '所属机构',
								isExp : false,
								dataIndex : 'ownerTeamName'
							},
							{
								header : '状态',
								isExp : false,
								dataIndex : 'calllistStaId',
								renderer : function(value) {
									return CONOB_CALLLIST_ZT.get(value);
								}
							}
							]
				});


		
		var gridPanel_contact2 = new HT.EditorGridPanel({
			region : 'center',
			height : 150,
			scrollHeight : true,
			url : __ctxPath + '/comtech/ctScrBDNamlistCtScrTemplate.do?comId='
					+ _cfg.comId,
			fields : [{
						name : 'tmpId',
						type : 'Long'
					}, 'tmpName', 'tmpContent'],
			columns : [
					{
				header : '名称',
				dataIndex : 'tmpName'
			}, {
				header : '描述',
				dataIndex : 'tmpContent'
				}]
				// end of columns
			});
		var gridPanel_contact8 = new HT.EditorGridPanel({
			region : 'center',
			height : 150,
			scrollHeight : true,
			url : __ctxPath + '/comtech/ctScrBDNamlistCtScrTemplate.do?comId='
					+ _cfg.comId,
			fields : [{
						name : 'tmpId',
						type : 'Long'
					}, 'tmpName', 'tmpType', 'tmpContent'],
			columns : [
					{
				header : '名称',
				dataIndex : 'tmpName'
			}, {
				header : '类型',
				dataIndex : 'tmpType'
				}, {
				header : '描述',
				dataIndex : 'tmpContent'
				}]
			});
		
		var gridPanel_contact3 = new HT.GridPanel({
			region : 'center',
			height : 150,
			scrollHeight : true,
			showSm : false,
			url : __ctxPath + '/supply/productBDNamlistScGoods.do?comId='
					+ _cfg.comId,
			fields : [{
						name : ' goodsId',
						type : 'Long'
					}, 'goodsName','goodsId','goodsDesc','retailPrice','numbers','comSta','ext1','goodtype','reportPrice'],
			columns : [
						 {
						header : '商品ID',
						dataIndex : 'goodsId',
						hidden:true
					},
				    {
						header : '商品编号',
						dataIndex : 'numbers'
					}, {
						header : '商品名称',
						dataIndex : 'goodsName'
					},{
						header : '商品类型',
						dataIndex : 'goodtype'
					},
					{
						header : '零售价',
						dataIndex : 'retailPrice'
					},
					{
						header : '市场价',
						dataIndex : 'reportPrice'
					},
					{
						header : '状态',
						dataIndex : 'comSta',
						renderer : function(value) {
							return CONOB_COM_BSSPZT.get(value);
						}
					}

			]
				// end of columns
			});
		
		var gridPanel_contact4 = new HT.GridPanel({
			region : 'center',
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + '/pap/papReleasesBDNamlistPapRelease.do?comId='
					+ _cfg.comId,
			fields : [{
						name : ' papId',
						type : 'Long'
					}, 'papId', 'papName', 'papContent','staId','papstaid'],
			columns : [
					{
				header : '编号',
				dataIndex : 'papId'

			}, {
				header : '名称',
				dataIndex : 'papName'

			}, {
				header : '描述',
				dataIndex : 'papContent'

			}, {
				header : '状态',
				dataIndex : 'staId'

			}]
				// end of columns
			});
		

		var gridPanel_contact5 = new HT.EditorGridPanel({
			region : 'center',
			id:'guize',  
			height : 150,
			scrollHeight : true,
			shim : true,
			showSm : false,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			stripeRows : true,
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			},
			url : __ctxPath+ '/outb/salerulBDNamlistObComSalerul.do?comId='+ _cfg.comId,
			fields : [  'rulTypeId', 'rulValMax','rulId' ],
			columns : [
				{
						header : '规则Id',
						dataIndex : 'rulId',
					    hidden:true
					},
				{
						header : '规则名称',
						dataIndex : 'rulTypeId',
						renderer : function(value) {
							return CONOB_COM_TYPENAME.get(value);
						}
					},
					{
						header : '规则值',
						id : 'rulValMax',
						dataIndex : 'rulValMax',
						renderer : function(value,style,record) {
					    if(record.data.rulTypeId==1){
					        return CONOB_CALLBATCH_ASS_FPFS.get(value);
					     }else{
					        return value;
					     }
						}
					}]
			});
		
		var gridPanel_contact6 = new HT.GridPanel({
			region : 'center',
			height : 150,
			scrollHeight : true,
			url : __ctxPath + '/xitong/userGroupBDNamlistUlUsergroup.do?comId='
					+ _cfg.comId,
			fields : [{
						name : ' pkUsergroupId',
						type : 'Long'
					}, 'pkUsergroupId', 'usergroupName'],
			columns : [{
				header : '执行组ID',
				dataIndex : 'pkUsergroupId'
				}, {
				header : '执行人组名称',
				dataIndex : 'usergroupName'
				}]
			});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			// id : 'ObProjectForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [

				     {
						id : 'obCom.obComBizTypeTree.nodeId',
						xtype : 'hidden'
					},
				{
						id : 'obCom.obProject.projNam',
						xtype : 'hidden'
					}, {
						id : 'obCom.projId',
						xtype : 'hidden',
						value : this.projId == null ? '' : this.projId
					},
					{
						id : 'obCom.ownerTeam',
						xtype : 'hidden',
						value : this.ownerTeam == null ? '' : this.ownerTeam
					},
					{
						fieldLabel : '开始时间',
						id : 'obCom.staDat_hid',
						xtype : 'hidden',
						format : 'Y-m-d',
						anchor : '100%'
					},
					{
						fieldLabel : '结束时间',
						id : 'obCom.endDat_hid',
						xtype : 'hidden',
						format : 'Y-m-d',
						anchor : '100%'
					},
					{
						id : 'obCom.perIncharge',
						xtype : 'hidden',
						value : this.useid == null ? '' : this.useid
					}

					, {
						id : 'obCom.comId',
						xtype : 'hidden',
						value : this.comId == null ? '' : this.comId
					}, {
						fieldLabel : '活动主题',
						xtype : 'textfield',
						readOnly : true,
						name : 'obCom.obComNam',
						allowBlank : false,
						maxLength : 128,
						anchor : '96%'
					}, {
						layout : 'column',
						border : false,
						items : [{
							columnWidth : .33,
							border : false,
							layout : 'form',
							items : [{
										fieldLabel : '活动编码',
										name : 'obCom.comCod',
										maxLength : 128,
										xtype : 'textfield',
										readOnly : true,
										anchor : '100%'
									}, {
										fieldLabel : '开始时间',
										name : 'obCom.staDat',
										id:'obCom.staDat',
										xtype : 'datefield',
										readOnly : true,
										format : 'Y-m-d',
										value : new Date(),
										allowBlank : false,
										anchor : '100%'
									}, {
										layout : 'column',
										border : false,
										anchor : '100%',
										items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : 1,
											border : false,
											items : [{
														fieldLabel : '所属机构',
														id : 'obCom.ownerTeamNam',
														xtype : 'textfield',
														readOnly : true,
														allowBlank : false,
														anchor : '100%'
													}]
										}]
									}

							]

						}, {
							columnWidth : .33,
							layout : 'form',
							border : false,
							items : [{
								layout : 'column',
								border : false,
								anchor : '100%',
								items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : 1,
											border : false,
											items : [{
														fieldLabel : '营销项目',
														xtype : 'textfield',
														readOnly : true,
														id : 'obProject.projNam',
														allowBlank : false,
														anchor : '100%'
													}]
										}]
							},
									{
										fieldLabel : '结束时间',
										name : 'obCom.endDat',
										id:'obCom.endDat',
										xtype : 'datefield',
										readOnly : true,
										format : 'Y-m-d',
//										allowBlank : false,
										value : new Date(),
										anchor : '100%'
									}, {
										layout : 'column',
										border : false,
										anchor : '100%',
										items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : 1,
											border : false,
											items : [{
														fieldLabel : '负责人',
														id : 'obCom.perInchargeNam',
														xtype : 'textfield',
														readOnly : true,
														allowBlank : false,
														anchor : '100%'
													}]
										}]
									}

							]

						}, {
							columnWidth : .34,
							layout : 'form',
							border : false,
							items : [
								 {
									    fieldLabel : '业务类型',
										hiddenName : 'obCom.busiTypId',
										id:'obCom.busiTypId11',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										allowBlank : false,
										readOnly:true,
										triggerAction : 'all',
										forceSelection : false,
										itemKey : 'CONTPJYLX',
										anchor : '100%'
											
									}, obCom_execTypId, status_form
							]

						}]
					}

					, {
						fieldLabel : '活动内容',
						name : 'obCom.obComDes',
						xtype : 'textarea',
						readOnly : true,
						maxLength : 4000,
						anchor : '96%'
					}, {
						xtype : 'fieldset',
						title : "呼叫名单",
						collapsible : true,
						collapsed : true,
						bodyStyle : 'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						}
					,
						items : [gridPanel_contact1]
					}, 
					{
						xtype : 'fieldset',
						title : "产品",
						collapsible : true,
						collapsed : true,
						bodyStyle : 'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						}
					,
						items : [gridPanel_contact3]
					}, 
					{
						xtype : 'fieldset',
						title : "规则",
						collapsible : true,
						collapsed : true,
						bodyStyle : 'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						}
					,
						items : [gridPanel_contact5]
					}, {
						xtype : 'fieldset',
						title : "执行组",
						collapsible : true,
						collapsed : true,
						bodyStyle : 'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						}
					,
						items : [groupsSelectPanel]
					}]
		});
		// 加载表单对应的数据
		if (this.comId != null && this.comId != 'undefined') {
			
			this.formPanel.loadData({
				url : __ctxPath + '/outb/getObCom.do?comId=' + this.comId,
				root : 'data',
				preName : 'obCom',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
                    //获得项目截止日期
					Ext.getCmp('obCom.endDat_hid').setValue(thisObj.obProject.endDat.toString());
					Ext.getCmp('obCom.staDat_hid').setValue(thisObj.obProject.staDat.toString());
                    
					var status=thisObj.obComStaId;
					//隐藏保存、重置按钮
					if((status == 6 || status == 5)) {
						Ext.getCmp("com_save_id").setVisible(false);
						Ext.getCmp("com_reset_id").setVisible(false);
					}
					bocomstatus =thisObj.obComStaId;
					Ext.getCmp("comStaId_form").setValue(CONOB_COM_HDZT.get(status));
					Ext.getCmp("comStaId_form").store.loadData(ObComTaskDelForm.getStatusData(status,''));
					Ext.getCmp('obCom.busiTypId11').setValue(thisObj.obProject.busiTypId);
					Ext.getCmp('obCom.obComBizTypeTree.nodeId').setValue(thisObj.obProject.busiTypId);
				}
			});
		}

		// 执行方式 的选择 为电话 则显示话术 其她隐藏话术
		obCom_execTypId.on('select', function() {
				});

	},// end of the initcomponents


	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
//		//业务类型
//        Ext.getCmp("obCom.obComBizTypeTree.nodeName").setNameValue('');
//        Ext.getCmp('obCom.obComBizTypeTree.nodeId').setValue('');
        		//活动截至日期
		//Ext.getCmp('obCom.endDat').dom.value = "";
		document.getElementById('obCom.endDat').value = "";
		document.getElementById('obCom.staDat').value = "";
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
		tabs.remove('ObComTaskDelFormWin');// 移除创建的窗口
	},
	/**
	 * 保存记录
	 */
	save : function() {
		var usergroupid = '';
		var projId = Ext.getCmp('obCom.projId').getValue();
		var perIncharge = Ext.getCmp("obCom.perIncharge").getValue();
		var ownerTeam = Ext.getCmp("obCom.ownerTeam").getValue();
		var storegourp = Ext.getCmp("yixuanzezhixingzu").getStore();
		var ywlxid=Ext.getCmp('obCom.obComBizTypeTree.nodeId').getValue();
		if(ywlxid!=''){
	        ywlxid=Ext.getCmp('obCom.obComBizTypeTree.nodeId').getValue();
		}else{
			ywlxid=Ext.getCmp('obCom.obComBizTypeTree.nodeId').getValue();
		}
		
		//执行组
		for (var j = 0; j < storegourp.getCount(); j++) {
			usergroupid += storegourp.getAt(j).data.pkUsergroupId + ",";
		}

		var store = Ext.getCmp('guize').getStore();
		//验证活动的截至日期要在项目截止日期的范围内
		//获得项目截止日期
		var enddate = Ext.getCmp('obCom.endDat_hid').getValue();
		var stadate = Ext.getCmp('obCom.staDat_hid').getValue();
		//活动截至日期
		var inputenddate = Ext.getCmp('obCom.endDat')
				.getValue();
		var inputstadate = Ext.getCmp('obCom.staDat')
				.getValue();
		var rulkeys ='';
		var rulvalues='';
		var rulids='';

		//规则
		for (var j = 0; j < store.getCount(); j++) {
			if(store.getAt(j).data.rulValMax!=undefined && store.getAt(j).data.rulTypeId!=undefined){
				//不重复规则
				if(store.getAt(j).data.rulTypeId == 0 || rulkeys.indexOf(store.getAt(j).data.rulTypeId)==-1){
					var bool2,bool1 = true;
					//结束时间为空
					if(inputstadate != ''){
						if(inputenddate){
							var dt = new Date(inputenddate);
							var date1 = dt.format('Y-m-d');
							bool1 = Date.parseDate(date1, "Y-m-d").between(
											Date.parseDate(stadate, "Y-m-d"),
											Date.parseDate(enddate, "Y-m-d"));
						}
						var dt1 = new Date(inputstadate);
						var date2 = dt1.format('Y-m-d');
						var bool2 = Date.parseDate(date2, "Y-m-d").between(
								Date.parseDate(stadate, "Y-m-d"),
								Date.parseDate(enddate, "Y-m-d"));
						if (!bool1||!bool2) {
							Ext.ux.Toast.msg('操作信息', '活动截至日期要在项目的截止日期内！');
							return;
						}
					}else{
							Ext.ux.Toast.msg('操作信息', '请填写活动所属的项目！');
							return;
					 }
					
					rulkeys+=  store.getAt(j).data.rulTypeId+',';
					rulvalues+=  store.getAt(j).data.rulValMax+','
					rulids+=store.getAt(j).data.rulId+',';	
					}else{
						Ext.ux.Toast.msg("信息", "请检查规则是否重复！");
						return;
					}
				
				}else{
					Ext.ux.Toast.msg("信息", "请检查规则值添加是否正确！");
					return;
				}
	
		}
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/outb/saveObCom.do',
					params : {
						rulids:rulids,
						pid : str,
						projId : projId,
						ownerTeam : ownerTeam,
						perIncharge : perIncharge,
						productids : productids,
						ctscr : ctscr,
						paprelease : paprelease,
						usergroupids : usergroupid,
						rulkeys:rulkeys,
						rulvalues:rulvalues,
						status:bocomstatus,
		                ywlx : ywlxid
					},
					msgSuccess : '修改活动成功！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObComGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('ObComTaskDelFormWin');
		
					}
				});
	},// end of save
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.projId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-setting' :
				this.doneRs.call(this, record.data.projId);
				break;
			case 'btn-newFlow' :
				this.newFlow.call(this, record);
				break;
			default :
				break;
		}
	}
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
			})
};

function getDicListeners(comId, hidName) {
	return {
		select : function(cbo, record, index) {
			var fm = Ext.getCmp(comId);
			Ext.getCmp(hidName + '_hid').setValue(cbo.value);
		}
	}
};
// 用户组选择 usergroupids
ObComTaskDelForm.prototype.initGroupSelectPanel = function(userId) {
	
	

	var groupRecord = Ext.data.Record.create([{
				name : 'pkUsergroupId',
				type : 'int'
			}, 'parentId', 'usergroupName', 'ulUsergroup']);

	var gridMemoryProxy = new Ext.data.HttpProxy({
				url : __ctxPath
						+ '/xitong/userGroupBDNamlistUlUsergroup.do?comId='
						+ this.comId
			});

	var gridJsonReader = new Ext.data.JsonReader({
				root : 'result',
				totalProperty : 'totalCounts',
				idProperty : "pkUsergroupId"
			}, groupRecord);

	var groupStore = new Ext.data.Store({
				id : 'AppUserForm.GroupStore',
				proxy : gridMemoryProxy,
				reader : gridJsonReader
			});

	groupStore.on('beforeload', function(store) {
				store.baseParams = {
					start : 0,
					limit : 10000,
					'Q_appUser.userId_L_EQ' : userId
				};
			});
	groupStore.setDefaultSort('pkUsergroupId');

	if (userId != '' && userId != null && userId != 'undefined') {
		groupStore.load();
	}

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true

			});
	var GroupGrid = new Ext.grid.EditorGridPanel({
				frame : false,
				border : true,
				flex : 6,
				id : 'yixuanzezhixingzu',
				height : 220,
				store : groupStore,
				sm : sm,
				viewConfig : {
					forceFit : true,
					autoFill : true
				},
				columns : [{
							header : '用户组ID',
							dataIndex : 'pkUsergroupId',
							sortable : true,
							hidden : false
						}, {
							header : '用户组名称',
							sortable : true,
							dataIndex : 'usergroupName',
							renderer : function(usergroupName) {
								if (usergroupName)
									return usergroupName;
							}
						}]
			});

	/* 总容器 */

	var panel = new Ext.Panel({
				xtype : 'panel',
				height : 220,
				border : false,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				height : 220,
				items : [GroupGrid]
			});

	return panel;
};

	ObComTaskDelForm.getStatusData = function(projTypeId,projStatus) {
	var statusArray = new Array();
	statusArray[1] = [[2,"执行中"]]; //未启用
	statusArray[2] = [[3,"暂停"],[6,"取消"],[5,"关闭"]]; //启用
//	statusArray[3] = [[4,"执行中"],[6,"取消"],[4,"关闭"]];  //暂停
	statusArray[3] = [[2,"执行中"]];//恢复
	statusArray[6] = [[6,"取消"]];//取消
	statusArray[5] = [[5,"关闭"]];//关闭
	

	switch(projTypeId) {
	    case 6 :	//注销
			return statusArray[6];
		case 5 :	//关闭
			return statusArray[5];
//		case 4 :	//恢复
//			return statusArray[4];
		case 3 :	//暂停
			return statusArray[3];
		case 2 :	//启用
			return statusArray[2];
		case 1 :	//启用
			return statusArray[1];
//		default :	//未启用
//			return statusArray[1];		
	}
}